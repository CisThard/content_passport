import { calculateAASE } from "../src/aase.js";

describe("calculateAASE", () => {
  it("marks high confidence authentic work as recreate-ready", () => {
    const assessment = calculateAASE([
      { agentId: "forensic-agent", score: 96, confidence: 0.95 },
      { agentId: "metadata-agent", score: 93, confidence: 0.9 },
      { agentId: "ai-detection-agent", score: 95, confidence: 0.9 },
      { agentId: "memory-bonus", score: 100, confidence: 0.7 },
    ]);

    expect(assessment.grade).toBe("AAA");
    expect(assessment.recreateReady).toBe(true);
    expect(assessment.contributions).toHaveLength(4);
    expect(assessment.missingAgents).toEqual([]);
    expect(assessment.decision).toBe("recreate-ready");
  });

  it("penalizes inconsistent evidence before granting consent", () => {
    const assessment = calculateAASE([
      { agentId: "forensic-agent", score: 96, confidence: 1 },
      { agentId: "metadata-agent", score: 92, confidence: 1 },
      { agentId: "ai-detection-agent", score: 8, confidence: 1 },
      { agentId: "memory-bonus", score: 80, confidence: 1 },
    ]);

    expect(assessment.stdDev).toBeGreaterThan(20);
    expect(assessment.penalty).toBeGreaterThan(0);
    expect(assessment.recreateReady).toBe(false);
    expect(assessment.warnings[0]).toContain("Agent disagreement penalty");
  });

  it("surfaces missing agent warnings for partial pipelines", () => {
    const assessment = calculateAASE([{ agentId: "forensic-agent", score: 88, confidence: 1 }]);

    expect(assessment.missingAgents).toEqual([
      "metadata-agent",
      "ai-detection-agent",
      "memory-bonus",
    ]);
    expect(assessment.warnings).toHaveLength(3);
  });
});
