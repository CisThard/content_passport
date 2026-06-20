import { AgentId, CoCreationMemoryRecord, MemWalClue, RecreateReadiness } from "./types.js";

export const SHARED_CONTEXT_NAMESPACE = "shared-context";
export const MEMWAL_BOARD_NAMESPACE = "memwal-board";

export interface AuthenticityMemoryClient {
  remember(namespace: string, key: string, value: unknown): Promise<void>;
  recall<T = unknown>(namespace: string, key: string): Promise<T | undefined>;
  list?<T = unknown>(namespace: string): Promise<Array<{ key: string; value: T }>>;
}

export class InMemoryAuthenticityMemoryClient implements AuthenticityMemoryClient {
  private readonly store = new Map<string, unknown>();

  async remember(namespace: string, key: string, value: unknown): Promise<void> {
    this.store.set(memoryKey(namespace, key), value);
  }

  async recall<T = unknown>(namespace: string, key: string): Promise<T | undefined> {
    return this.store.get(memoryKey(namespace, key)) as T | undefined;
  }

  async list<T = unknown>(namespace: string): Promise<Array<{ key: string; value: T }>> {
    const prefix = `${namespace}:`;
    return Array.from(this.store.entries())
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, value]) => ({ key: key.slice(prefix.length), value: value as T }));
  }
}

export class HttpAuthenticityMemoryClient implements AuthenticityMemoryClient {
  private readonly endpoint: string;
  private readonly delegateKey?: string;
  private readonly fetchImpl: typeof fetch;

  constructor(
    endpointOrOptions: string | { endpoint: string; delegateKey?: string },
    fetchImpl: typeof fetch = fetch,
  ) {
    if (typeof endpointOrOptions === "string") {
      this.endpoint = endpointOrOptions;
    } else {
      this.endpoint = endpointOrOptions.endpoint;
      this.delegateKey = endpointOrOptions.delegateKey;
    }
    this.fetchImpl = fetchImpl;
  }

  async remember(namespace: string, key: string, value: unknown): Promise<void> {
    const response = await this.fetchImpl(`${this.endpoint.replace(/\/$/, "")}/memory/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`, {
      method: "PUT",
      headers: this.headers(),
      body: JSON.stringify(value),
    });
    if (!response.ok) throw new Error(`MemWal remember failed: ${response.status} ${response.statusText}`);
  }

  async recall<T = unknown>(namespace: string, key: string): Promise<T | undefined> {
    const response = await this.fetchImpl(`${this.endpoint.replace(/\/$/, "")}/memory/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`, {
      headers: this.headers(),
    });
    if (response.status === 404) return undefined;
    if (!response.ok) throw new Error(`MemWal recall failed: ${response.status} ${response.statusText}`);
    return response.json() as Promise<T>;
  }

  async list<T = unknown>(namespace: string): Promise<Array<{ key: string; value: T }>> {
    const response = await this.fetchImpl(`${this.endpoint.replace(/\/$/, "")}/memory/${encodeURIComponent(namespace)}`, {
      headers: this.headers(),
    });
    if (!response.ok) throw new Error(`MemWal list failed: ${response.status} ${response.statusText}`);
    return response.json() as Promise<Array<{ key: string; value: T }>>;
  }

  private headers(): Record<string, string> {
    return {
      "content-type": "application/json",
      ...(this.delegateKey ? { authorization: `Bearer ${this.delegateKey}` } : {}),
    };
  }
}

export async function writeAgentClue(
  client: AuthenticityMemoryClient,
  clue: Omit<MemWalClue, "id" | "createdAt"> & { id?: string; createdAt?: string },
): Promise<MemWalClue> {
  const record: MemWalClue = {
    ...clue,
    id: clue.id ?? `${clue.agentId}:${Date.now()}:${Math.random().toString(16).slice(2)}`,
    createdAt: clue.createdAt ?? new Date().toISOString(),
  };
  await client.remember(MEMWAL_BOARD_NAMESPACE, record.id, record);
  return record;
}

export async function recallAgentClue(
  client: AuthenticityMemoryClient,
  clueId: string,
): Promise<MemWalClue | undefined> {
  return client.recall<MemWalClue>(MEMWAL_BOARD_NAMESPACE, clueId);
}

export async function buildMemWalInspectorSnapshot(
  client: AuthenticityMemoryClient,
  clueIds?: string[],
): Promise<{
  clues: MemWalClue[];
  reputation: Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }>;
}> {
  const clues = (clueIds
    ? (await Promise.all(clueIds.map((id) => recallAgentClue(client, id)))).filter((clue): clue is MemWalClue => Boolean(clue))
    : client.list
      ? (await client.list<MemWalClue>(MEMWAL_BOARD_NAMESPACE)).map((entry) => entry.value)
      : [])
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  const reputation = clues.reduce(
    (acc, clue) => {
      const current = acc[clue.agentId] ?? { clueCount: 0, totalImpact: 0, criticalCount: 0 };
      current.clueCount += 1;
      current.totalImpact += clue.scoreImpact;
      if (clue.severity === "critical") current.criticalCount += 1;
      acc[clue.agentId] = current;
      return acc;
    },
    {} as Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }>,
  );

  return { clues, reputation };
}

export function coCreationMemoryKey(passportId: string): string {
  const normalized = passportId.trim();
  if (!normalized) throw new Error("Genesis Passport ID is required.");
  return `co-creation:${normalized}`;
}

export function buildCoCreationMemoryRecord(
  readiness: RecreateReadiness,
  options: { policyId?: string; now?: Date } = {},
): CoCreationMemoryRecord {
  return {
    namespace: SHARED_CONTEXT_NAMESPACE,
    key: coCreationMemoryKey(readiness.terms.passportId),
    passportId: readiness.terms.passportId,
    policyId: options.policyId,
    ready: readiness.ready,
    reason: readiness.reason,
    score: readiness.assessment.score,
    grade: readiness.assessment.grade,
    escrowAmountMist: readiness.terms.escrowAmountMist.toString(),
    participants: readiness.terms.participants,
    trigger: readiness.terms.trigger,
    createdAt: (options.now ?? new Date()).toISOString(),
  };
}

export async function archiveCoCreationContext(
  client: AuthenticityMemoryClient,
  readiness: RecreateReadiness,
  options: { policyId?: string; now?: Date } = {},
): Promise<CoCreationMemoryRecord> {
  const record = buildCoCreationMemoryRecord(readiness, options);
  await client.remember(record.namespace, record.key, record);
  return record;
}

export async function recallCoCreationContext(
  client: AuthenticityMemoryClient,
  passportId: string,
): Promise<CoCreationMemoryRecord | undefined> {
  return client.recall<CoCreationMemoryRecord>(SHARED_CONTEXT_NAMESPACE, coCreationMemoryKey(passportId));
}

function memoryKey(namespace: string, key: string): string {
  return `${namespace}:${key}`;
}
