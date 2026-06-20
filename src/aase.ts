import { AASEAgentId, AASEAssessment, AASEContribution, AASEGrade, AgentScore } from "./types.js";

export const AASE_AGENT_ORDER: AASEAgentId[] = [
  "forensic-agent",
  "metadata-agent",
  "ai-detection-agent",
  "memory-bonus",
];

export const BASE_WEIGHTS: Record<AASEAgentId, number> = {
  "forensic-agent": 0.35,
  "metadata-agent": 0.30,
  "ai-detection-agent": 0.25,
  "memory-bonus": 0.10,
};

const GRADE_FLOORS: Record<AASEGrade, number> = {
  AAA: 95,
  AA: 85,
  A: 70,
  B: 50,
  C: 30,
  D: 20,
  F: 0,
};

export function gradeFor(score: number): AASEGrade {
  if (score >= GRADE_FLOORS.AAA) return "AAA";
  if (score >= GRADE_FLOORS.AA) return "AA";
  if (score >= GRADE_FLOORS.A) return "A";
  if (score >= GRADE_FLOORS.B) return "B";
  if (score >= GRADE_FLOORS.C) return "C";
  if (score >= GRADE_FLOORS.D) return "D";
  return "F";
}

export function gradeMeets(actual: AASEGrade, minimum: AASEGrade): boolean {
  return GRADE_FLOORS[actual] >= GRADE_FLOORS[minimum];
}

export function calculateAASE(
  results: AgentScore[],
  requiredMinimumGrade: AASEGrade = "A",
): AASEAssessment {
  if (results.length === 0) {
    return {
      score: 0,
      grade: "F",
      recreateReady: false,
      requiredMinimumGrade,
      penalty: 0,
      stdDev: 0,
      baseWeightedScore: 0,
      confidenceAdjustedWeight: 0,
      contributions: [],
      missingAgents: [...AASE_AGENT_ORDER],
      decision: "blocked",
      warnings: ["No authenticity agent results were provided."],
    };
  }

  let totalWeightedScore = 0;
  let totalDynamicWeight = 0;
  const scores: number[] = [];
  const contributions: AASEContribution[] = [];
  const seenAgents = new Set<AASEAgentId>();

  for (const result of results) {
    const boundedScore = clamp(result.score, 0, 100);
    const confidence = clamp(result.confidence, 0, 1);
    const weight = BASE_WEIGHTS[result.agentId] * confidence;

    totalWeightedScore += boundedScore * weight;
    totalDynamicWeight += weight;
    scores.push(boundedScore);
    seenAgents.add(result.agentId);
    contributions.push({
      agentId: result.agentId,
      rawScore: result.score,
      boundedScore,
      confidence,
      baseWeight: BASE_WEIGHTS[result.agentId],
      dynamicWeight: Number(weight.toFixed(4)),
      weightedScore: Number((boundedScore * weight).toFixed(4)),
    });
  }

  let score = totalDynamicWeight > 0 ? totalWeightedScore / totalDynamicWeight : 0;
  const stdDev = standardDeviation(scores);
  const penalty = stdDev > 20 ? (stdDev - 20) * 1.5 : 0;
  const baseWeightedScore = score;
  score = clamp(score - penalty, 0, 100);

  const rounded = Math.round(score);
  const grade = gradeFor(rounded);
  const recreateReady = gradeMeets(grade, requiredMinimumGrade);
  const missingAgents = AASE_AGENT_ORDER.filter((agentId) => !seenAgents.has(agentId));
  const warnings = [
    ...missingAgents.map((agentId) => `${agentId} result is missing from AASE calculation.`),
    ...(penalty > 0 ? [`Agent disagreement penalty applied: -${penalty.toFixed(2)}.`] : []),
  ];

  return {
    score: rounded,
    grade,
    recreateReady,
    requiredMinimumGrade,
    penalty: Number(penalty.toFixed(2)),
    stdDev: Number(stdDev.toFixed(2)),
    baseWeightedScore: Number(baseWeightedScore.toFixed(2)),
    confidenceAdjustedWeight: Number(totalDynamicWeight.toFixed(4)),
    contributions,
    missingAgents,
    decision: recreateReady ? "recreate-ready" : "blocked",
    warnings,
  };
}

function standardDeviation(values: number[]): number {
  if (values.length <= 1) return 0;
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance = values.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
