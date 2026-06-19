import {
  InMemoryAuthenticityMemoryClient,
  prepareCoCreationActivation,
  recallCoCreationContext,
} from "./index.js";

const memory = new InMemoryAuthenticityMemoryClient();

const authenticActivation = await prepareCoCreationActivation({
  passportId: "0xpassport",
  minimumGrade: "A",
  escrowAmountMist: 100_000_000_000n,
  policyId: "0xco_creation_policy",
  memoryClient: memory,
  participants: [
    { address: "0xoriginal_creator", weight: 60 },
    { address: "0xremix_creator", weight: 40 },
  ],
  agentScores: [
    { agentId: "forensic-agent", score: 96, confidence: 0.95 },
    { agentId: "metadata-agent", score: 92, confidence: 0.9 },
    { agentId: "ai-detection-agent", score: 94, confidence: 0.85 },
    { agentId: "memory-bonus", score: 100, confidence: 0.7 },
  ],
});

console.log("Authentic content readiness:", {
  ready: authenticActivation.readiness.ready,
  reason: authenticActivation.readiness.reason,
  score: authenticActivation.readiness.assessment.score,
  grade: authenticActivation.readiness.assessment.grade,
  archivedKey: authenticActivation.memoryRecord?.key,
});

console.log("Royalty payout preview:", authenticActivation.payoutPreview.map((p) => ({
    address: p.address,
    weight: `${p.weight}%`,
    amountMist: p.amountMist.toString(),
  })),
);

console.log("Recalled shared-context:", await recallCoCreationContext(memory, "0xpassport"));

const blockedActivation = await prepareCoCreationActivation({
  passportId: "0xsynthetic",
  minimumGrade: "A",
  escrowAmountMist: 100_000_000_000n,
  memoryClient: memory,
  participants: [
    { address: "0xoriginal_creator", weight: 60 },
    { address: "0xremix_creator", weight: 40 },
  ],
  agentScores: [
    { agentId: "forensic-agent", score: 28, confidence: 0.95 },
    { agentId: "metadata-agent", score: 18, confidence: 0.9 },
    { agentId: "ai-detection-agent", score: 12, confidence: 0.95 },
    { agentId: "memory-bonus", score: 20, confidence: 0.7 },
  ],
});

console.log("Synthetic content readiness:", {
  ready: blockedActivation.readiness.ready,
  reason: blockedActivation.readiness.reason,
  score: blockedActivation.readiness.assessment.score,
  grade: blockedActivation.readiness.assessment.grade,
  archived: Boolean(blockedActivation.memoryRecord),
});
