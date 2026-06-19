import {
  InMemoryAuthenticityMemoryClient,
  prepareCoCreationActivation,
  recallCoCreationContext,
} from "../src/index.js";

const authenticScores = [
  { agentId: "forensic-agent" as const, score: 96, confidence: 0.95 },
  { agentId: "metadata-agent" as const, score: 94, confidence: 0.9 },
  { agentId: "ai-detection-agent" as const, score: 97, confidence: 0.92 },
  { agentId: "memory-bonus" as const, score: 100, confidence: 0.8 },
];

describe("prepareCoCreationActivation", () => {
  it("archives ready co-creation context into shared-context memory", async () => {
    const memory = new InMemoryAuthenticityMemoryClient();
    const activation = await prepareCoCreationActivation({
      passportId: "0x123",
      agentScores: authenticScores,
      escrowAmountMist: 101n,
      policyId: "0xpolicy",
      memoryClient: memory,
      now: new Date("2026-06-19T00:00:00.000Z"),
      participants: [
        { address: "0xoriginal", weight: 60 },
        { address: "0xpartner", weight: 40 },
      ],
    });

    expect(activation.readiness.ready).toBe(true);
    expect(activation.payoutPreview.map((payout) => payout.amountMist)).toEqual([60n, 41n]);

    const recalled = await recallCoCreationContext(memory, "0x123");
    expect(recalled?.namespace).toBe("shared-context");
    expect(recalled?.policyId).toBe("0xpolicy");
    expect(recalled?.grade).toBe("AAA");
  });

  it("does not archive blocked co-creation context", async () => {
    const memory = new InMemoryAuthenticityMemoryClient();
    const activation = await prepareCoCreationActivation({
      passportId: "0xblocked",
      agentScores: [{ agentId: "ai-detection-agent", score: 12, confidence: 1 }],
      escrowAmountMist: 100n,
      memoryClient: memory,
      participants: [
        { address: "0xoriginal", weight: 70 },
        { address: "0xpartner", weight: 30 },
      ],
    });

    expect(activation.readiness.ready).toBe(false);
    expect(activation.memoryRecord).toBeUndefined();
    await expect(recallCoCreationContext(memory, "0xblocked")).resolves.toBeUndefined();
  });
});
