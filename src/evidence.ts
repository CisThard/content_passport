import {
  createCipheriv,
  createDecipheriv,
  createHash,
  generateKeyPairSync,
  randomBytes,
} from "node:crypto";
import { ProofOfEffort, SealedProofOfEffort } from "./types.js";

export interface SealOptions {
  threshold?: number;
  totalShares?: number;
  ttlMinutes?: number;
  now?: Date;
}

const SHARE_PREFIX = "seal-v1";

export function packProofOfEffort(poe: ProofOfEffort): Uint8Array {
  const payload = {
    title: poe.title,
    creatorAddress: poe.creatorAddress,
    mediaHash: poe.mediaHash,
    createdAt: poe.createdAt,
    artifacts: poe.artifacts.map((artifact) => ({
      name: artifact.name,
      mimeType: artifact.mimeType,
      bytesBase64: Buffer.from(artifact.bytes).toString("base64"),
    })),
  };
  return Buffer.from(JSON.stringify(payload), "utf8");
}

export function unpackProofOfEffort(bytes: Uint8Array): ProofOfEffort {
  const payload = JSON.parse(Buffer.from(bytes).toString("utf8")) as {
    title: string;
    creatorAddress: string;
    mediaHash: string;
    createdAt: string;
    artifacts: Array<{ name: string; mimeType: string; bytesBase64: string }>;
  };
  return {
    title: payload.title,
    creatorAddress: payload.creatorAddress,
    mediaHash: payload.mediaHash,
    createdAt: payload.createdAt,
    artifacts: payload.artifacts.map((artifact) => ({
      name: artifact.name,
      mimeType: artifact.mimeType,
      bytes: Buffer.from(artifact.bytesBase64, "base64"),
    })),
  };
}

export function sealProofOfEffort(poe: ProofOfEffort, options: SealOptions = {}): SealedProofOfEffort {
  const threshold = options.threshold ?? 3;
  const totalShares = options.totalShares ?? 5;
  if (threshold <= 0 || totalShares <= 0 || threshold > totalShares) {
    throw new Error("Invalid SEAL threshold configuration.");
  }
  if (totalShares > 255) {
    throw new Error("SEAL totalShares must be 255 or less for GF(256) sharing.");
  }

  const plainText = packProofOfEffort(poe);
  const key = randomBytes(32);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const cipherText = Buffer.concat([cipher.update(plainText), cipher.final()]);
  const authTag = cipher.getAuthTag();
  const now = options.now ?? new Date();
  const expiresAt = new Date(now.getTime() + (options.ttlMinutes ?? 10) * 60_000);
  const sessionKey = createSealSessionKey({ expiresAt });

  return {
    cipherText,
    iv,
    authTag,
    digest: sha256(Buffer.concat([iv, cipherText, authTag])),
    algorithm: "AES-256-GCM+Shamir-GF256",
    threshold,
    shares: splitSecretShamir(key, threshold, totalShares),
    sessionKey,
  };
}

export function decryptProofOfEffort(
  sealed: SealedProofOfEffort,
  providedShares: string[],
  now: Date = new Date(),
): ProofOfEffort {
  assertSealCanDecrypt(sealed, providedShares, now);
  const key = recoverSecretShamir(providedShares.slice(0, sealed.threshold), sealed.threshold);
  const decipher = createDecipheriv("aes-256-gcm", key, sealed.iv);
  decipher.setAuthTag(Buffer.from(sealed.authTag));
  const plainText = Buffer.concat([decipher.update(sealed.cipherText), decipher.final()]);
  return unpackProofOfEffort(plainText);
}

export function assertSealCanDecrypt(
  sealed: SealedProofOfEffort,
  providedShares: string[],
  now: Date = new Date(),
): void {
  if (providedShares.length < sealed.threshold) {
    throw new Error(`At least ${sealed.threshold} SEAL key shares are required.`);
  }
  if (now.getTime() > Date.parse(sealed.sessionKey.expiresAt)) {
    throw new Error("SEAL session key expired.");
  }
  const uniqueShareIds = new Set(providedShares.map((share) => parseShare(share).x));
  if (uniqueShareIds.size < sealed.threshold) {
    throw new Error(`At least ${sealed.threshold} unique SEAL key shares are required.`);
  }
}

export function sha256(data: Uint8Array | string): string {
  return createHash("sha256").update(data).digest("hex");
}

export function createSealSessionKey(options: { ttlMinutes?: number; now?: Date; expiresAt?: Date } = {}): SealedProofOfEffort["sessionKey"] {
  const now = options.now ?? new Date();
  const expiresAt = options.expiresAt ?? new Date(now.getTime() + (options.ttlMinutes ?? 10) * 60_000);
  const { publicKey } = generateKeyPairSync("ed25519");
  return {
    algorithm: "Ed25519",
    publicKey: publicKey.export({ type: "spki", format: "der" }).toString("hex"),
    expiresAt: expiresAt.toISOString(),
  };
}

function splitSecretShamir(secret: Uint8Array, threshold: number, totalShares: number): string[] {
  const points = Array.from({ length: totalShares }, (_, index) => ({
    x: index + 1,
    y: Buffer.alloc(secret.byteLength),
  }));

  for (let byteIndex = 0; byteIndex < secret.byteLength; byteIndex++) {
    const coefficients = [
      secret[byteIndex]!,
      ...Array.from(randomBytes(threshold - 1)),
    ];
    for (const point of points) {
      point.y[byteIndex] = evaluatePolynomial(coefficients, point.x);
    }
  }

  return points.map(({ x, y }) => `${SHARE_PREFIX}:${threshold}:${totalShares}:${x}:${Buffer.from(y).toString("hex")}`);
}

function recoverSecretShamir(shares: string[], threshold: number): Buffer {
  const parsed = shares.map(parseShare);
  if (parsed.length < threshold) throw new Error(`At least ${threshold} SEAL key shares are required.`);
  const unique = new Map<number, Uint8Array>();
  for (const share of parsed) unique.set(share.x, share.y);
  const selected = Array.from(unique.entries()).slice(0, threshold).map(([x, y]) => ({ x, y }));
  if (selected.length < threshold) throw new Error(`At least ${threshold} unique SEAL key shares are required.`);
  const secretLength = selected[0]!.y.byteLength;
  if (!selected.every((share) => share.y.byteLength === secretLength)) {
    throw new Error("SEAL key shares have inconsistent lengths.");
  }

  const secret = Buffer.alloc(secretLength);
  for (let byteIndex = 0; byteIndex < secretLength; byteIndex++) {
    let value = 0;
    for (let i = 0; i < selected.length; i++) {
      const xi = selected[i]!.x;
      const yi = selected[i]!.y[byteIndex]!;
      let basis = 1;
      for (let j = 0; j < selected.length; j++) {
        if (i === j) continue;
        const xj = selected[j]!.x;
        basis = gfMul(basis, gfDiv(xj, xi ^ xj));
      }
      value ^= gfMul(yi, basis);
    }
    secret[byteIndex] = value;
  }
  return secret;
}

function parseShare(share: string): { threshold: number; totalShares: number; x: number; y: Uint8Array } {
  const [prefix, thresholdRaw, totalRaw, xRaw, yRaw] = share.split(":");
  if (prefix !== SHARE_PREFIX || !thresholdRaw || !totalRaw || !xRaw || !yRaw) {
    throw new Error("Invalid SEAL key share format.");
  }
  const threshold = Number(thresholdRaw);
  const totalShares = Number(totalRaw);
  const x = Number(xRaw);
  if (!Number.isInteger(threshold) || !Number.isInteger(totalShares) || !Number.isInteger(x) || x <= 0 || x > 255) {
    throw new Error("Invalid SEAL key share metadata.");
  }
  return { threshold, totalShares, x, y: Buffer.from(yRaw, "hex") };
}

function evaluatePolynomial(coefficients: number[], x: number): number {
  let result = 0;
  for (let index = coefficients.length - 1; index >= 0; index--) {
    result = gfMul(result, x) ^ coefficients[index]!;
  }
  return result;
}

function gfMul(a: number, b: number): number {
  let product = 0;
  let left = a;
  let right = b;
  while (right > 0) {
    if (right & 1) product ^= left;
    left <<= 1;
    if (left & 0x100) left ^= 0x11b;
    right >>= 1;
  }
  return product & 0xff;
}

function gfPow(a: number, power: number): number {
  let result = 1;
  let base = a;
  let exponent = power;
  while (exponent > 0) {
    if (exponent & 1) result = gfMul(result, base);
    base = gfMul(base, base);
    exponent >>= 1;
  }
  return result;
}

function gfDiv(a: number, b: number): number {
  if (b === 0) throw new Error("Invalid SEAL share interpolation denominator.");
  return gfMul(a, gfPow(b, 254));
}
