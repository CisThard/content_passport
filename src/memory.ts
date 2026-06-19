import { AgentId, CoCreationMemoryRecord, MemWalClue, RecreateReadiness } from "./types.js";

export const SHARED_CONTEXT_NAMESPACE = "shared-context";
export const MEMWAL_BOARD_NAMESPACE = "memwal-board";

export interface AuthenticityMemoryClient {
  remember(namespace: string, key: string, value: unknown): Promise<void>;
  recall<T = unknown>(namespace: string, key: string): Promise<T | undefined>;
}

export class InMemoryAuthenticityMemoryClient implements AuthenticityMemoryClient {
  private readonly store = new Map<string, unknown>();

  async remember(namespace: string, key: string, value: unknown): Promise<void> {
    this.store.set(memoryKey(namespace, key), value);
  }

  async recall<T = unknown>(namespace: string, key: string): Promise<T | undefined> {
    return this.store.get(memoryKey(namespace, key)) as T | undefined;
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
  clueIds: string[],
): Promise<{
  clues: MemWalClue[];
  reputation: Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }>;
}> {
  const clues = (await Promise.all(clueIds.map((id) => recallAgentClue(client, id))))
    .filter((clue): clue is MemWalClue => Boolean(clue))
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
