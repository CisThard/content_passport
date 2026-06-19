import { calculateRoyaltyPayouts } from "./escrow.js";
import {
  archiveCoCreationContext,
  AuthenticityMemoryClient,
  InMemoryAuthenticityMemoryClient,
} from "./memory.js";
import { buildRecreateReadiness } from "./recreate-readiness.js";
import {
  AASEGrade,
  AgentScore,
  CoCreationMemoryRecord,
  RecreateReadiness,
  RoyaltyParticipant,
  RoyaltyPayout,
} from "./types.js";

export interface PrepareCoCreationInput {
  passportId: string;
  agentScores: AgentScore[];
  participants: RoyaltyParticipant[];
  escrowAmountMist: bigint;
  minimumGrade?: AASEGrade;
  policyId?: string;
  memoryClient?: AuthenticityMemoryClient;
  now?: Date;
}

export interface CoCreationActivation {
  readiness: RecreateReadiness;
  payoutPreview: RoyaltyPayout[];
  memoryRecord?: CoCreationMemoryRecord;
}

export async function prepareCoCreationActivation(
  input: PrepareCoCreationInput,
): Promise<CoCreationActivation> {
  const readiness = buildRecreateReadiness(input);
  const payoutPreview = readiness.ready
    ? calculateRoyaltyPayouts(input.escrowAmountMist, readiness.terms.participants)
    : [];

  const memoryClient = input.memoryClient ?? new InMemoryAuthenticityMemoryClient();
  const memoryRecord = readiness.ready
    ? await archiveCoCreationContext(memoryClient, readiness, {
        policyId: input.policyId,
        now: input.now,
      })
    : undefined;

  return {
    readiness,
    payoutPreview,
    memoryRecord,
  };
}
