export type AgentId =
  | AASEAgentId
  | "rights-agent"
  | "seal-agent"
  | "settlement-agent"
  | "archivist-agent";

export type AASEAgentId =
  | "forensic-agent"
  | "metadata-agent"
  | "ai-detection-agent"
  | "memory-bonus";

export type AASEGrade = "AAA" | "AA" | "A" | "B" | "C" | "D" | "F";

export interface AgentScore {
  agentId: AASEAgentId;
  score: number;
  confidence: number;
  evidence?: string[];
}

export interface AASEContribution {
  agentId: AASEAgentId;
  rawScore: number;
  boundedScore: number;
  confidence: number;
  baseWeight: number;
  dynamicWeight: number;
  weightedScore: number;
}

export interface AASEAssessment {
  score: number;
  grade: AASEGrade;
  recreateReady: boolean;
  requiredMinimumGrade: AASEGrade;
  penalty: number;
  stdDev: number;
  baseWeightedScore: number;
  confidenceAdjustedWeight: number;
  contributions: AASEContribution[];
  missingAgents: AASEAgentId[];
  decision: "recreate-ready" | "blocked";
  warnings: string[];
}

export interface RoyaltyParticipant {
  address: string;
  weight: number;
}

export interface VisaStamp {
  creatorAddress: string;
  countryCode: string;
  share: number;
  stampedAt: string;
}

export interface RecreateTerms {
  passportId: string;
  minimumGrade: AASEGrade;
  escrowAmountMist: bigint;
  participants: RoyaltyParticipant[];
  trigger: {
    type: "grade-and-escrow";
    description: string;
  };
}

export interface RecreateReadiness {
  ready: boolean;
  reason: string;
  assessment: AASEAssessment;
  terms: RecreateTerms;
}

export interface RoyaltyPayout {
  address: string;
  amountMist: bigint;
  weight: number;
}

export interface CoCreationMemoryRecord {
  namespace: "shared-context";
  key: string;
  passportId: string;
  policyId?: string;
  ready: boolean;
  reason: string;
  score: number;
  grade: AASEGrade;
  escrowAmountMist: string;
  participants: RoyaltyParticipant[];
  trigger: RecreateTerms["trigger"];
  createdAt: string;
}

export interface MemWalClue {
  id: string;
  agentId: AgentId;
  passportId?: string;
  severity: "info" | "warning" | "critical";
  message: string;
  scoreImpact: number;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export interface ProofOfEffort {
  title: string;
  creatorAddress: string;
  mediaHash: string;
  artifacts: Array<{
    name: string;
    mimeType: string;
    bytes: Uint8Array;
  }>;
  createdAt: string;
}

export interface SealedProofOfEffort {
  cipherText: Uint8Array;
  iv: Uint8Array;
  authTag: Uint8Array;
  digest: string;
  algorithm: "AES-256-GCM+Shamir-GF256";
  threshold: number;
  shares: string[];
  sessionKey: {
    algorithm: "Ed25519";
    publicKey: string;
    expiresAt: string;
  };
}

export interface WalrusStoredBlob {
  blobId: string;
  digest: string;
  size: number;
  storedAt: string;
  objectId?: string;
  txDigest?: string;
  certifiedEpoch?: number;
  endEpoch?: number;
  source: "memory" | "walrus-http" | "walrus-sdk";
  metadata?: Record<string, string | number | boolean>;
}

export interface GenesisPassport {
  passportId: string;
  contentHash: string;
  grade: AASEGrade;
  score: number;
  mediaBlobId: string;
  evidenceBlobId: string;
  evidenceLink: string;
  visaStamps: VisaStamp[];
  remainingShare: number;
  issuedAt: string;
  signature?: string;
  signatory?: string;
}

export interface WorkflowArtifact {
  id: string;
  kind:
    | "media"
    | "sealed-evidence"
    | "agent-clue"
    | "audit-report"
    | "passport"
    | "license"
    | "settlement"
    | "memory-snapshot";
  name: string;
  mimeType: string;
  digest: string;
  size: number;
  walrusBlobId: string;
  createdBy: AgentId;
  createdAt: string;
  reusedFrom?: string[];
  metadata?: Record<string, unknown>;
}

export interface AgentWorkflowStep {
  id: string;
  agentId: AgentId;
  action: string;
  status: "pending" | "running" | "completed" | "blocked";
  startedAt: string;
  completedAt?: string;
  inputArtifactIds: string[];
  outputArtifactIds: string[];
  memoryKeys: string[];
  summary: string;
  walrusBlobId?: string;
}

export interface ContentMemoryGraph {
  passportId: string;
  namespace: string;
  artifacts: WorkflowArtifact[];
  steps: AgentWorkflowStep[];
  restoredFromWalrus: boolean;
  createdAt: string;
  updatedAt: string;
}
