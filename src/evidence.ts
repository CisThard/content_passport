import { createHash, randomBytes } from "node:crypto";
import { ProofOfEffort, SealedProofOfEffort } from "./types.js";

export interface SealOptions {
  threshold?: number;
  totalShares?: number;
  ttlMinutes?: number;
  now?: Date;
}

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

  const plainText = packProofOfEffort(poe);
  const key = randomBytes(32);
  const cipherText = xor(plainText, key);
  const now = options.now ?? new Date();
  const expiresAt = new Date(now.getTime() + (options.ttlMinutes ?? 10) * 60_000);

  return {
    cipherText,
    digest: sha256(cipherText),
    threshold,
    shares: Array.from({ length: totalShares }, (_, index) =>
      `share-${index + 1}:${sha256(Buffer.concat([key, Buffer.from(String(index + 1))])).slice(0, 24)}`,
    ),
    sessionKey: {
      publicKey: sha256(key).slice(0, 64),
      expiresAt: expiresAt.toISOString(),
    },
  };
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
}

export function sha256(data: Uint8Array | string): string {
  return createHash("sha256").update(data).digest("hex");
}

function xor(data: Uint8Array, key: Uint8Array): Uint8Array {
  return data.map((value, index) => value ^ key[index % key.length]!);
}
