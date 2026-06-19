export type AgentId =
  | "forensic-agent"
  | "metadata-agent"
  | "ai-detection-agent"
  | "memory-bonus";

export type AASEGrade = "AAA" | "AA" | "A" | "B" | "C" | "D" | "F";

export interface AgentScore {
  agentId: AgentId;
  score: number;
  confidence: number;
  evidence?: string[];
}

export interface AASEContribution {
  agentId: AgentId;
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
  missingAgents: AgentId[];
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
  digest: string;
  threshold: number;
  shares: string[];
  sessionKey: {
    publicKey: string;
    expiresAt: string;
  };
}

export interface WalrusStoredBlob {
  blobId: string;
  digest: string;
  size: number;
  storedAt: string;
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
}
