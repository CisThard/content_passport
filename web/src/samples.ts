import type { AgentScore, RoyaltyParticipant } from './engine'

export interface Scenario {
  id: 'authentic' | 'synthetic'
  label: string
  filename: string
  agentScores: AgentScore[]
}

// Authentic original — consistent high agent scores → AAA, recreate-ready.
export const AUTHENTIC: Scenario = {
  id: 'authentic',
  label: 'Authentic original photograph',
  filename: 'sovereign_sunrise.raw.jpg',
  agentScores: [
    { agentId: 'forensic-agent', score: 96, confidence: 0.95, evidence: ['ELA AvgDiff 0.04 — no localized recompression'] },
    { agentId: 'metadata-agent', score: 92, confidence: 0.9, evidence: ['EXIF capture time matches filesystem mtime'] },
    { agentId: 'ai-detection-agent', score: 94, confidence: 0.85, evidence: ['No diffusion fingerprint detected'] },
    { agentId: 'memory-bonus', score: 100, confidence: 0.7, evidence: ['No prior clash in MemWal history'] },
  ],
}

// Synthetic / manipulated — low + divergent scores → D, blocked (+ disagreement penalty).
export const SYNTHETIC: Scenario = {
  id: 'synthetic',
  label: 'AI-synthesized image with forged EXIF',
  filename: 'too_perfect_portrait.png',
  agentScores: [
    { agentId: 'forensic-agent', score: 28, confidence: 0.95, evidence: ['ELA AvgDiff 0.72 — heavy global resynthesis'] },
    { agentId: 'metadata-agent', score: 18, confidence: 0.9, evidence: ['Capture time forged 41m after file mtime'] },
    { agentId: 'ai-detection-agent', score: 12, confidence: 0.95, evidence: ['Gemini: diffusion artifacts in hair/edges'] },
    { agentId: 'memory-bonus', score: 20, confidence: 0.7, evidence: ['Matches a previously blocked submission'] },
  ],
}

// Royalty split: origin 30 + Country B 20 + reserved future travel pages 50 = 100.
export const PARTICIPANTS: RoyaltyParticipant[] = [
  { address: '0xorigin_creator', weight: 30 },
  { address: '0xcountry_b_remix', weight: 20 },
  { address: '0xreserved_travel_pages', weight: 50 },
]

export const ESCROW_MIST = 100_000_000_000n // 100 SUI
export const REVENUE_MIST = 100_000_000_000n // 100 SUI travel-essay royalty

export const PARTICIPANT_LABEL: Record<string, string> = {
  '0xorigin_creator': 'Origin creator (origin.sui)',
  '0xcountry_b_remix': 'Country B remixer (remix.sui)',
  '0xreserved_travel_pages': 'Reserved · remaining travel pages',
}
