import {
  buildContentMemoryGraph,
  buildRecreateReadiness,
  InMemoryAuthenticityMemoryClient,
  InMemoryWalrusClient,
  restoreContentMemoryGraph,
  sha256,
} from "../src/index.js";

const scores = [
  { agentId: "forensic-agent" as const, score: 96, confidence: 0.95, evidence: ["ELA clean"] },
  { agentId: "metadata-agent" as const, score: 92, confidence: 0.9, evidence: ["EXIF coherent"] },
  { agentId: "ai-detection-agent" as const, score: 94, confidence: 0.85, evidence: ["fusion pass"] },
  { agentId: "memory-bonus" as const, score: 100, confidence: 0.7, evidence: ["no prior clash"] },
];

describe("Walrus/MemWal content memory graph", () => {
  it("persists multi-agent workflow artifacts and restores the graph from Walrus", async () => {
    const walrus = new InMemoryWalrusClient();
    const memory = new InMemoryAuthenticityMemoryClient();
    const readiness = buildRecreateReadiness({
      passportId: "passport:abc",
      agentScores: scores,
      participants: [
        { address: "0xorigin", weight: 30 },
        { address: "0xremix", weight: 70 },
      ],
      escrowAmountMist: 100n,
    });

    const graph = await buildContentMemoryGraph({
      passportId: "passport:abc",
      contentHash: sha256("media"),
      media: Buffer.from("media"),
      evidence: Buffer.from("sealed evidence"),
      agentScores: scores,
      readiness,
      walrus,
      memory,
      now: new Date("2026-06-20T00:00:00.000Z"),
    });

    expect(graph.steps.map((step) => step.agentId)).toEqual([
      "ai-detection-agent",
      "seal-agent",
      "rights-agent",
      "settlement-agent",
    ]);
    expect(graph.artifacts.some((artifact) => artifact.kind === "memory-snapshot")).toBe(true);
    expect(graph.artifacts.every((artifact) => artifact.walrusBlobId.startsWith("walrus://"))).toBe(true);

    const snapshot = graph.artifacts.find((artifact) => artifact.kind === "memory-snapshot")!;
    const restored = await restoreContentMemoryGraph(walrus, snapshot.walrusBlobId);
    expect(restored.restoredFromWalrus).toBe(true);
    expect(restored.passportId).toBe("passport:abc");
  });
});
