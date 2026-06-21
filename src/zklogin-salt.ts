import { createHash, hkdfSync } from "node:crypto";

const MAX_SALT = 2n ** 128n;

export interface ZkLoginJwtClaims {
  iss?: unknown;
  sub?: unknown;
  aud?: unknown;
  nonce?: unknown;
}

export interface ZkLoginSaltResult {
  salt: string;
  audience: string;
  strategy: "static-env" | "hkdf-master-seed";
}

export function selectZkLoginAudience(aud: unknown, preferredAudience?: string): string {
  if (typeof aud === "string" && aud.trim()) return aud.trim();
  if (Array.isArray(aud)) {
    const values = aud.filter((value): value is string => typeof value === "string" && value.trim().length > 0);
    if (preferredAudience && values.includes(preferredAudience)) return preferredAudience;
    if (values.length > 0) return values[0]!;
  }
  throw new Error("JWT is missing a supported audience claim");
}

export function getZkLoginSaltForClaims(
  claims: ZkLoginJwtClaims,
  env: NodeJS.ProcessEnv = process.env,
): ZkLoginSaltResult {
  if (typeof claims.iss !== "string" || !claims.iss.trim()) {
    throw new Error("JWT is missing issuer claim");
  }
  if (typeof claims.sub !== "string" || !claims.sub.trim()) {
    throw new Error("JWT is missing subject claim");
  }

  const audience = selectZkLoginAudience(claims.aud, env.AUTH_GOOGLE_ID);
  const staticSalt = env.ZKLOGIN_USER_SALT || env.ZKLOGIN_SALT;
  if (staticSalt) {
    return {
      salt: normalizeZkLoginSalt(staticSalt),
      audience,
      strategy: "static-env",
    };
  }

  const seed = env.ZKLOGIN_SALT_MASTER_SEED || env.ZKLOGIN_SALT_SEED;
  if (!seed) {
    throw new Error(
      "ZKLOGIN_SALT_MASTER_SEED is required for the per-user zkLogin salt service. Set a stable private seed, or set ZKLOGIN_USER_SALT for legacy testnet-only static salt.",
    );
  }

  const saltBytes = Buffer.from(hkdfSync(
    "sha256",
    Buffer.from(seed),
    Buffer.from(`${claims.iss}:${audience}`),
    Buffer.from(`content-passport:zklogin:user-salt:${claims.sub}`),
    16,
  ));

  return {
    salt: normalizeZkLoginSalt(`0x${saltBytes.toString("hex")}`),
    audience,
    strategy: "hkdf-master-seed",
  };
}

export function describeZkLoginSaltStrategy(env: NodeJS.ProcessEnv = process.env): "static-env" | "hkdf-master-seed" | "not-configured" {
  if (env.ZKLOGIN_USER_SALT || env.ZKLOGIN_SALT) return "static-env";
  if (env.ZKLOGIN_SALT_MASTER_SEED || env.ZKLOGIN_SALT_SEED) return "hkdf-master-seed";
  return "not-configured";
}

export function buildZkLoginMemoryReceipt(input: {
  address: string;
  claims: Required<Pick<ZkLoginJwtClaims, "iss" | "sub">> & { aud: string };
  maxEpoch: number;
  saltStrategy: ZkLoginSaltResult["strategy"];
  proverUrl: string;
  now?: Date;
}) {
  const createdAt = (input.now ?? new Date()).toISOString();
  return {
    type: "zklogin-auth-receipt",
    address: input.address,
    issuer: input.claims.iss,
    audienceHash: digestString(input.claims.aud),
    subjectHash: digestString(`${input.claims.iss}:${input.claims.aud}:${input.claims.sub}`),
    maxEpoch: input.maxEpoch,
    saltStrategy: input.saltStrategy,
    proverHost: safeHost(input.proverUrl),
    createdAt,
  };
}

function normalizeZkLoginSalt(value: string): string {
  const normalized = value.trim();
  const salt = normalized.startsWith("0x") ? BigInt(normalized) : BigInt(normalized);
  if (salt < 0n || salt >= MAX_SALT) {
    throw new Error("zkLogin salt must be a 16-byte value or an integer smaller than 2^128.");
  }
  return salt.toString();
}

function digestString(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function safeHost(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return "custom-prover";
  }
}

