import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { homedir } from "node:os";
import { AuthenticityMemoryClient } from "./memory.js";

export interface MemWalRuntimeConfig {
  key: string;
  accountId: string;
  serverUrl: string;
  namespace: string;
}

export interface MemWalStoreResult {
  blobId: string;
  owner: string;
  namespace: string;
}

export interface MemWalRecallHit {
  blobId: string;
  text: string;
  distance: number;
}

export async function loadMemWalConfig(
  env: NodeJS.ProcessEnv = process.env,
): Promise<MemWalRuntimeConfig | undefined> {
  const envKey = env.MEMWAL_PRIVATE_KEY ?? env.MEMWAL_KEY;
  const envAccountId = env.MEMWAL_ACCOUNT_ID;
  if (envKey && envAccountId) {
    let key = envKey.trim();
    if (key.length === 44 || (!/^[0-9a-fA-F]+$/.test(key) && /^[A-Za-z0-9+/=]+$/.test(key))) {
      try {
        const decoded = Buffer.from(key, "base64");
        if (decoded.length === 33 && decoded[0] === 0) {
          key = decoded.subarray(1).toString("hex");
        } else if (decoded.length === 32) {
          key = decoded.toString("hex");
        }
      } catch {}
    }
    return {
      key,
      accountId: envAccountId.trim(),
      serverUrl: (env.MEMWAL_SERVER_URL ?? "https://relayer.memory.walrus.xyz").trim(),
      namespace: (env.MEMWAL_NAMESPACE ?? "content-right-hackathon").trim(),
    };
  }

  const credentialsPath = env.MEMWAL_CREDENTIALS_PATH ?? join(homedir(), ".memwal", "credentials.json");
  try {
    const credentials = JSON.parse(await readFile(credentialsPath, "utf8")) as {
      delegatePrivateKey?: string;
      privateKey?: string;
      accountId?: string;
      relayerUrl?: string;
      serverUrl?: string;
      namespace?: string;
    };
    const key = credentials.delegatePrivateKey ?? credentials.privateKey;
    if (!key || !credentials.accountId) return undefined;
    return {
      key,
      accountId: credentials.accountId,
      serverUrl: env.MEMWAL_SERVER_URL ?? credentials.relayerUrl ?? credentials.serverUrl ?? "https://relayer.memory.walrus.xyz",
      namespace: env.MEMWAL_NAMESPACE ?? credentials.namespace ?? "content-right-hackathon",
    };
  } catch {
    return undefined;
  }
}

export class MemWalSemanticMemoryClient implements AuthenticityMemoryClient {
  constructor(private readonly config: MemWalRuntimeConfig) {}

  async remember(namespace: string, key: string, value: unknown): Promise<void> {
    await this.rememberText(memoryText(namespace, key, value), namespace);
  }

  async recall<T = unknown>(namespace: string, key: string): Promise<T | undefined> {
    const hits = await this.recallText(`${namespace}:${key}`, namespace, 3);
    for (const hit of hits) {
      const parsed = parseMemoryText(hit.text);
      if (parsed?.namespace === namespace && parsed.key === key) return parsed.value as T;
    }
    return undefined;
  }

  async rememberText(text: string, namespace = this.config.namespace): Promise<MemWalStoreResult> {
    const { MemWal } = await import("@mysten-incubation/memwal");
    const memwal = MemWal.create({
      key: this.config.key,
      accountId: this.config.accountId,
      serverUrl: this.config.serverUrl,
      namespace,
    });
    const result = await memwal.rememberAndWait(text, namespace, { timeoutMs: 120_000 });
    return { blobId: result.blob_id, owner: result.owner, namespace: result.namespace };
  }

  async recallText(query: string, namespace = this.config.namespace, topK = 10): Promise<MemWalRecallHit[]> {
    const { MemWal } = await import("@mysten-incubation/memwal");
    const memwal = MemWal.create({
      key: this.config.key,
      accountId: this.config.accountId,
      serverUrl: this.config.serverUrl,
      namespace,
    });
    const result = await memwal.recall({ query, namespace, topK, maxDistance: 0.85 });
    return result.results.map((hit) => ({
      blobId: hit.blob_id,
      text: hit.text,
      distance: hit.distance,
    }));
  }

  async restore(namespace = this.config.namespace, limit = 25): Promise<{ restored: number; skipped: number; total: number }> {
    const { MemWal } = await import("@mysten-incubation/memwal");
    const memwal = MemWal.create({
      key: this.config.key,
      accountId: this.config.accountId,
      serverUrl: this.config.serverUrl,
      namespace,
    });
    const result = await memwal.restore(namespace, limit);
    return { restored: result.restored, skipped: result.skipped, total: result.total };
  }

  async health(): Promise<{ status: string; version: string }> {
    const { MemWal } = await import("@mysten-incubation/memwal");
    const memwal = MemWal.create({
      key: this.config.key,
      accountId: this.config.accountId,
      serverUrl: this.config.serverUrl,
      namespace: this.config.namespace,
    });
    const result = await memwal.health();
    return { status: result.status, version: result.version };
  }
}

export function redactMemWalConfig(config: MemWalRuntimeConfig): Omit<MemWalRuntimeConfig, "key"> & { key: string } {
  return {
    ...config,
    key: `${config.key.slice(0, 6)}...redacted`,
  };
}

function memoryText(namespace: string, key: string, value: unknown): string {
  return JSON.stringify({
    type: "content-right-memory",
    namespace,
    key,
    value,
  });
}

function parseMemoryText(text: string): { namespace: string; key: string; value: unknown } | undefined {
  try {
    const parsed = JSON.parse(text) as { type?: string; namespace?: string; key?: string; value?: unknown };
    if (parsed.type !== "content-right-memory" || !parsed.namespace || !parsed.key) return undefined;
    return { namespace: parsed.namespace, key: parsed.key, value: parsed.value };
  } catch {
    return undefined;
  }
}
