// Thin barrel over the REAL Content Right engine (browser-safe subgraph only:
// no node:crypto). The UI computes scores, consent, and payouts with the exact
// same functions the contracts/CLI use — nothing is faked here.
export {
  calculateAASE,
  gradeFor,
  gradeMeets,
  BASE_WEIGHTS,
  AASE_AGENT_ORDER,
} from '../../src/aase.js'
export { calculateRoyaltyPayouts, assertValidParticipants } from '../../src/escrow.js'
export { buildRecreateReadiness } from '../../src/recreate-readiness.js'
export { prepareCoCreationActivation } from '../../src/co-creation.js'
export {
  InMemoryAuthenticityMemoryClient,
  writeAgentClue,
  buildMemWalInspectorSnapshot,
  recallCoCreationContext,
} from '../../src/memory.js'

export type {
  AgentId,
  AgentScore,
  AASEGrade,
  AASEAssessment,
  AASEContribution,
  RoyaltyParticipant,
  RoyaltyPayout,
  RecreateReadiness,
  MemWalClue,
  CoCreationMemoryRecord,
  VisaStamp,
} from '../../src/types.js'
