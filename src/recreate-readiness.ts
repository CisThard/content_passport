import { calculateAASE } from "./aase.js";
import { assertValidParticipants } from "./escrow.js";
import {
  AASEGrade,
  AgentScore,
  RecreateReadiness,
  RecreateTerms,
  RoyaltyParticipant,
} from "./types.js";

export interface BuildReadinessInput {
  passportId: string;
  agentScores: AgentScore[];
  participants: RoyaltyParticipant[];
  escrowAmountMist: bigint;
  minimumGrade?: AASEGrade;
}

export function buildRecreateReadiness(input: BuildReadinessInput): RecreateReadiness {
  const minimumGrade = input.minimumGrade ?? "A";
  const assessment = calculateAASE(input.agentScores, minimumGrade);
  const terms: RecreateTerms = {
    passportId: input.passportId,
    minimumGrade,
    escrowAmountMist: input.escrowAmountMist,
    participants: input.participants.map((p) => ({
      address: p.address.trim(),
      weight: p.weight,
    })),
    trigger: {
      type: "grade-and-escrow",
      description:
        "Consent is granted automatically when the original passes the minimum AASE grade and escrow is funded.",
    },
  };

  try {
    assertValidParticipants(terms.participants);
  } catch (error) {
    return {
      ready: false,
      reason: error instanceof Error ? error.message : String(error),
      assessment,
      terms,
    };
  }

  if (!input.passportId.trim()) {
    return { ready: false, reason: "Genesis Passport ID is required.", assessment, terms };
  }

  if (input.escrowAmountMist <= 0n) {
    return { ready: false, reason: "Escrow must be funded before recreate consent is active.", assessment, terms };
  }

  if (!assessment.recreateReady) {
    return {
      ready: false,
      reason: `AASE grade ${assessment.grade} is below the recreate threshold ${minimumGrade}.`,
      assessment,
      terms,
    };
  }

  return {
    ready: true,
    reason: "Recreate consent is programmable and active.",
    assessment,
    terms,
  };
}
