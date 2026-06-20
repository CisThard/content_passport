import {
  AgentId,
  AgentScore,
  AgentWorkflowStep,
  ContentMemoryGraph,
  MemWalClue,
  RecreateReadiness,
  WorkflowArtifact,
} from "./types.js";
import { AuthenticityMemoryClient, MEMWAL_BOARD_NAMESPACE, SHARED_CONTEXT_NAMESPACE, writeAgentClue } from "./memory.js";
import { WalrusClient } from "./walrus.js";

export const MEMORY_GRAPH_NAMESPACE = "content-memory-graph";
export const WORKFLOW_STATE_NAMESPACE = "agent-workflow-state";

export interface BuildContentMemoryGraphInput {
  passportId: string;
  contentHash: string;
  media: Uint8Array;
  evidence: Uint8Array;
  agentScores: AgentScore[];
  readiness: RecreateReadiness;
  walrus: WalrusClient;
  memory: AuthenticityMemoryClient;
  now?: Date;
}

export async function buildContentMemoryGraph(
  input: BuildContentMemoryGraphInput,
): Promise<ContentMemoryGraph> {
  const now = input.now ?? new Date();
  const createdAt = now.toISOString();
  const artifacts: WorkflowArtifact[] = [];
  const steps: AgentWorkflowStep[] = [];

  const mediaArtifact = await storeWorkflowArtifact(input.walrus, {
    kind: "media",
    name: "original-media",
    mimeType: "application/octet-stream",
    bytes: input.media,
    createdBy: "forensic-agent",
    createdAt,
    metadata: { contentHash: input.contentHash },
  });
  artifacts.push(mediaArtifact);

  const clueArtifacts: WorkflowArtifact[] = [];
  const clueKeys: string[] = [];
  for (const score of input.agentScores) {
    const clue = await writeAgentClue(input.memory, clueFromScore(score, input.passportId, createdAt));
    const clueArtifact = await storeJsonArtifact(input.walrus, {
      kind: "agent-clue",
      name: `${score.agentId}-clue.json`,
      createdBy: score.agentId,
      createdAt,
      value: clue,
      reusedFrom: [mediaArtifact.id],
    });
    artifacts.push(clueArtifact);
    clueArtifacts.push(clueArtifact);
    clueKeys.push(`${MEMWAL_BOARD_NAMESPACE}:${clue.id}`);
  }

  steps.push(await rememberStep(input.memory, {
    id: `step:audit:${input.passportId}`,
    agentId: "ai-detection-agent",
    action: "context-fusion-audit",
    status: "completed",
    startedAt: createdAt,
    completedAt: createdAt,
    inputArtifactIds: [mediaArtifact.id],
    outputArtifactIds: clueArtifacts.map((artifact) => artifact.id),
    memoryKeys: clueKeys,
    summary: "Forensic, metadata, AI, and MemWal memory signals wrote verifiable clues for downstream agents.",
  }));

  const evidenceArtifact = await storeWorkflowArtifact(input.walrus, {
    kind: "sealed-evidence",
    name: "sealed-proof-of-effort.bin",
    mimeType: "application/octet-stream",
    bytes: input.evidence,
    createdBy: "seal-agent",
    createdAt,
    reusedFrom: [mediaArtifact.id, ...clueArtifacts.map((artifact) => artifact.id)],
    metadata: { privacy: "Seal-style threshold unlock", contentHash: input.contentHash },
  });
  artifacts.push(evidenceArtifact);

  steps.push(await rememberStep(input.memory, {
    id: `step:seal:${input.passportId}`,
    agentId: "seal-agent",
    action: "seal-proof-of-effort",
    status: "completed",
    startedAt: createdAt,
    completedAt: createdAt,
    inputArtifactIds: [mediaArtifact.id, ...clueArtifacts.map((artifact) => artifact.id)],
    outputArtifactIds: [evidenceArtifact.id],
    memoryKeys: [`${SHARED_CONTEXT_NAMESPACE}:sealed:${input.passportId}`],
    summary: "PoE was encrypted and persisted as a Walrus artifact for later derivative-agent reuse.",
  }));

  const licenseArtifact = await storeJsonArtifact(input.walrus, {
    kind: "license",
    name: "recreate-readiness.json",
    createdBy: "rights-agent",
    createdAt,
    value: serializeReadiness(input.readiness),
    reusedFrom: [evidenceArtifact.id],
  });
  artifacts.push(licenseArtifact);

  steps.push(await rememberStep(input.memory, {
    id: `step:rights:${input.passportId}`,
    agentId: "rights-agent",
    action: "evaluate-programmable-consent",
    status: input.readiness.ready ? "completed" : "blocked",
    startedAt: createdAt,
    completedAt: createdAt,
    inputArtifactIds: [evidenceArtifact.id],
    outputArtifactIds: [licenseArtifact.id],
    memoryKeys: [`${WORKFLOW_STATE_NAMESPACE}:step:rights:${input.passportId}`],
    summary: input.readiness.ready
      ? "Rights agent granted recreate readiness from persistent score, escrow, and royalty state."
      : `Rights agent blocked workflow: ${input.readiness.reason}`,
  }));

  const settlementArtifact = await storeJsonArtifact(input.walrus, {
    kind: "settlement",
    name: "settlement-state.json",
    createdBy: "settlement-agent",
    createdAt,
    value: {
      passportId: input.passportId,
      ready: input.readiness.ready,
      participants: input.readiness.terms.participants,
      escrowAmountMist: input.readiness.terms.escrowAmountMist.toString(),
    },
    reusedFrom: [licenseArtifact.id],
  });
  artifacts.push(settlementArtifact);

  steps.push(await rememberStep(input.memory, {
    id: `step:settlement:${input.passportId}`,
    agentId: "settlement-agent",
    action: "prepare-customs-settlement",
    status: input.readiness.ready ? "completed" : "pending",
    startedAt: createdAt,
    completedAt: createdAt,
    inputArtifactIds: [licenseArtifact.id],
    outputArtifactIds: [settlementArtifact.id],
    memoryKeys: [`${WORKFLOW_STATE_NAMESPACE}:step:settlement:${input.passportId}`],
    summary: "Settlement agent created a durable customs payout state for future revenue events.",
  }));

  const graph: ContentMemoryGraph = {
    passportId: input.passportId,
    namespace: MEMORY_GRAPH_NAMESPACE,
    artifacts,
    steps,
    restoredFromWalrus: false,
    createdAt,
    updatedAt: createdAt,
  };
  const snapshotArtifact = await storeJsonArtifact(input.walrus, {
    kind: "memory-snapshot",
    name: "content-memory-graph.json",
    createdBy: "archivist-agent",
    createdAt,
    value: graph,
    reusedFrom: artifacts.map((artifact) => artifact.id),
  });
  graph.artifacts.push(snapshotArtifact);
  graph.updatedAt = createdAt;

  await input.memory.remember(MEMORY_GRAPH_NAMESPACE, input.passportId, {
    ...graph,
    walrusSnapshotBlobId: snapshotArtifact.walrusBlobId,
  });
  return graph;
}

export async function restoreContentMemoryGraph(
  walrus: WalrusClient,
  snapshotBlobId: string,
): Promise<ContentMemoryGraph> {
  const bytes = await walrus.readBlob(snapshotBlobId);
  if (!bytes) throw new Error(`Walrus memory graph not found: ${snapshotBlobId}`);
  const graph = JSON.parse(Buffer.from(bytes).toString("utf8")) as ContentMemoryGraph;
  return { ...graph, restoredFromWalrus: true };
}

async function storeWorkflowArtifact(
  walrus: WalrusClient,
  input: {
    kind: WorkflowArtifact["kind"];
    name: string;
    mimeType: string;
    bytes: Uint8Array;
    createdBy: AgentId;
    createdAt: string;
    reusedFrom?: string[];
    metadata?: Record<string, unknown>;
  },
): Promise<WorkflowArtifact> {
  const stored = await walrus.storeBlob(input.bytes, { now: new Date(input.createdAt) });
  return {
    id: `${input.kind}:${stored.blobId}`,
    kind: input.kind,
    name: input.name,
    mimeType: input.mimeType,
    digest: stored.digest,
    size: stored.size,
    walrusBlobId: stored.blobId,
    createdBy: input.createdBy,
    createdAt: input.createdAt,
    reusedFrom: input.reusedFrom,
    metadata: {
      ...input.metadata,
      source: stored.source,
      objectId: stored.objectId,
      txDigest: stored.txDigest,
      certifiedEpoch: stored.certifiedEpoch,
      endEpoch: stored.endEpoch,
    },
  };
}

async function storeJsonArtifact(
  walrus: WalrusClient,
  input: {
    kind: WorkflowArtifact["kind"];
    name: string;
    createdBy: AgentId;
    createdAt: string;
    value: unknown;
    reusedFrom?: string[];
  },
): Promise<WorkflowArtifact> {
  return storeWorkflowArtifact(walrus, {
    kind: input.kind,
    name: input.name,
    mimeType: "application/json",
    bytes: Buffer.from(JSON.stringify(input.value, bigintReplacer, 2), "utf8"),
    createdBy: input.createdBy,
    createdAt: input.createdAt,
    reusedFrom: input.reusedFrom,
  });
}

async function rememberStep(
  memory: AuthenticityMemoryClient,
  step: AgentWorkflowStep,
): Promise<AgentWorkflowStep> {
  await memory.remember(WORKFLOW_STATE_NAMESPACE, step.id, step);
  return step;
}

function clueFromScore(score: AgentScore, passportId: string, createdAt: string): Omit<MemWalClue, "id"> & { id?: string } {
  return {
    id: `${passportId}:${score.agentId}`,
    passportId,
    agentId: score.agentId,
    severity: score.score < 45 ? "critical" : score.score < 70 ? "warning" : "info",
    message: `${score.agentId} scored ${score.score}/100 and persisted its evidence for future sessions.`,
    scoreImpact: score.score - 70,
    createdAt,
    metadata: { confidence: score.confidence, evidence: score.evidence },
  };
}

function serializeReadiness(readiness: RecreateReadiness): unknown {
  return {
    ...readiness,
    terms: {
      ...readiness.terms,
      escrowAmountMist: readiness.terms.escrowAmountMist.toString(),
    },
  };
}

function bigintReplacer(_key: string, value: unknown): unknown {
  return typeof value === "bigint" ? value.toString() : value;
}
