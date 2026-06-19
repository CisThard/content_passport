import { buildRecreateReadiness } from "../src/recreate-readiness.js";

const validParticipants = [
  { address: "0xoriginal", weight: 60 },
  { address: "0xremixer", weight: 40 },
];

describe("recreate readiness", () => {
  it("activates programmable consent when grade and escrow conditions are met", () => {
    const readiness = buildRecreateReadiness({
      passportId: "0xpassport",
      escrowAmountMist: 100n,
      participants: validParticipants,
      agentScores: [
        { agentId: "forensic-agent", score: 96, confidence: 1 },
        { agentId: "metadata-agent", score: 95, confidence: 1 },
        { agentId: "ai-detection-agent", score: 94, confidence: 1 },
        { agentId: "memory-bonus", score: 100, confidence: 1 },
      ],
    });

    expect(readiness.ready).toBe(true);
    expect(readiness.reason).toContain("programmable");
  });

  it("blocks recreate consent for low authenticity", () => {
    const readiness = buildRecreateReadiness({
      passportId: "0xpassport",
      escrowAmountMist: 100n,
      participants: validParticipants,
      agentScores: [
        { agentId: "forensic-agent", score: 10, confidence: 1 },
        { agentId: "metadata-agent", score: 30, confidence: 1 },
        { agentId: "ai-detection-agent", score: 15, confidence: 1 },
        { agentId: "memory-bonus", score: 20, confidence: 1 },
      ],
    });

    expect(readiness.ready).toBe(false);
    expect(readiness.reason).toContain("below");
  });

  it("blocks recreate consent until escrow is funded", () => {
    const readiness = buildRecreateReadiness({
      passportId: "0xpassport",
      escrowAmountMist: 0n,
      participants: validParticipants,
      agentScores: [
        { agentId: "forensic-agent", score: 96, confidence: 1 },
        { agentId: "metadata-agent", score: 95, confidence: 1 },
        { agentId: "ai-detection-agent", score: 94, confidence: 1 },
        { agentId: "memory-bonus", score: 100, confidence: 1 },
      ],
    });

    expect(readiness.ready).toBe(false);
    expect(readiness.reason).toContain("Escrow");
  });
});
