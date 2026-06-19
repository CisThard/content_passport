import { useEffect, useMemo, useState } from 'react'
import {
  calculateAASE,
  buildRecreateReadiness,
  calculateRoyaltyPayouts,
  prepareCoCreationActivation,
  InMemoryAuthenticityMemoryClient,
  writeAgentClue,
  buildMemWalInspectorSnapshot,
} from './engine'
import type {
  AgentId, MemWalClue, RoyaltyPayout, VisaStamp, CoCreationMemoryRecord,
} from './engine'
import { AUTHENTIC, SYNTHETIC, PARTICIPANTS, ESCROW_MIST, REVENUE_MIST, type Scenario } from './samples'
import { AaseAudit } from './components/AaseAudit'
import { MemWalInspector } from './components/MemWalInspector'
import { PassportCard, type PassportView } from './components/PassportCard'
import { ConsentGate } from './components/ConsentGate'
import { Settlement } from './components/Settlement'

type Snapshot = {
  clues: MemWalClue[]
  reputation: Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }>
}

const EMPTY: Snapshot = { clues: [], reputation: {} as Snapshot['reputation'] }

function severityOf(score: number): MemWalClue['severity'] {
  if (score < 30) return 'critical'
  if (score < 70) return 'warning'
  return 'info'
}

// Build a real MemWal blackboard snapshot from a scenario's agent findings.
async function snapshotFor(scenario: Scenario): Promise<Snapshot> {
  const client = new InMemoryAuthenticityMemoryClient()
  const ids: string[] = []
  for (const a of scenario.agentScores) {
    const clue = await writeAgentClue(client, {
      agentId: a.agentId,
      severity: severityOf(a.score),
      message: a.evidence?.[0] ?? `${a.agentId} returned score ${a.score}`,
      scoreImpact: a.score - 70,
      metadata: { confidence: a.confidence },
    })
    ids.push(clue.id)
  }
  return buildMemWalInspectorSnapshot(client, ids)
}

const STAGES = [
  { n: 'STAGE 1', t: 'Authenticity audit & block' },
  { n: 'STAGE 2', t: 'Passport + Sovereign Vault' },
  { n: 'STAGE 3', t: 'Consent → settlement' },
]

export default function App() {
  const [stage, setStage] = useState(0)
  const [escrowFunded, setEscrowFunded] = useState(false)
  const [published, setPublished] = useState(false)
  const [snap, setSnap] = useState<Snapshot>(EMPTY)
  const [archived, setArchived] = useState<CoCreationMemoryRecord | undefined>()

  const activeScenario: Scenario = stage === 0 ? SYNTHETIC : AUTHENTIC

  // Real AASE assessments
  const blockedAssessment = useMemo(() => calculateAASE(SYNTHETIC.agentScores, 'A'), [])
  const authenticAssessment = useMemo(() => calculateAASE(AUTHENTIC.agentScores, 'A'), [])

  // Real recreate-readiness (consent trigger)
  const readiness = useMemo(
    () => buildRecreateReadiness({
      passportId: '0xpassport_sovereign_sunrise',
      agentScores: AUTHENTIC.agentScores,
      participants: PARTICIPANTS,
      escrowAmountMist: escrowFunded ? ESCROW_MIST : 0n,
      minimumGrade: 'A',
    }),
    [escrowFunded],
  )

  // Passport view: origin visa always; Country B visa appears in stage 3
  const passport: PassportView = useMemo(() => {
    const stamps: VisaStamp[] = [
      { creatorAddress: '0xorigin_creator', countryCode: 'ORIGIN', share: 30, stampedAt: new Date().toISOString() },
    ]
    if (stage === 2) {
      stamps.push({ creatorAddress: '0xcountry_b_remix', countryCode: 'B', share: 20, stampedAt: new Date().toISOString() })
    }
    const used = stamps.reduce((s, v) => s + v.share, 0)
    return {
      passportId: '0xpassport_sovereign_sunrise',
      contentHash: 'a3f9c1e7b22d4f8e6c0a91b5d7e3f240c8a1b6e4f9d2c7a05e8b3f6d1c4a7e90',
      grade: authenticAssessment.grade,
      score: authenticAssessment.score,
      mediaBlobId: 'walrus://b1c3...sunrise',
      evidenceBlobId: 'walrus://e7a2...sealed-poe',
      visaStamps: stamps,
      remainingShare: 100 - used,
    }
  }, [stage, authenticAssessment])

  const payouts: RoyaltyPayout[] = useMemo(
    () => (published && readiness.ready ? calculateRoyaltyPayouts(REVENUE_MIST, PARTICIPANTS) : []),
    [published, readiness.ready],
  )

  // MemWal snapshot per active scenario
  useEffect(() => {
    let alive = true
    snapshotFor(activeScenario).then((s) => { if (alive) setSnap(s) })
    return () => { alive = false }
  }, [activeScenario])

  async function publishAndSettle() {
    const activation = await prepareCoCreationActivation({
      passportId: passport.passportId,
      agentScores: AUTHENTIC.agentScores,
      participants: PARTICIPANTS,
      escrowAmountMist: ESCROW_MIST,
      minimumGrade: 'A',
      policyId: '0xco_creation_policy',
    })
    setArchived(activation.memoryRecord)
    setPublished(true)
  }

  function goto(s: number) {
    setStage(s)
    if (s < 2) setPublished(false)
  }

  return (
    <div className="wrap">
      <header className="hdr">
        <div className="brand">
          <div className="seal">🛂</div>
          <div>
            <h1>Content Right</h1>
            <p>Programmable recreate consent — authenticity → escrow → automatic royalty split</p>
          </div>
        </div>
        <span className="badge">Sui · SEAL · Walrus · MemWal</span>
      </header>

      <div className="steps">
        {STAGES.map((s, i) => (
          <div className={`step ${stage === i ? 'active' : ''}`} key={i} onClick={() => goto(i)}>
            <div className="n">{s.n}</div>
            <div className="t">{s.t}</div>
          </div>
        ))}
      </div>

      {stage === 0 && (
        <div className="grid">
          <AaseAudit assessment={blockedAssessment} />
          <div>
            <MemWalInspector clues={snap.clues} reputation={snap.reputation} />
            <div className="card">
              <h2>Recreate gate</h2>
              <p className="sub">synthetic upload — consent never activates</p>
              <div className="note warn">
                Grade <b>{blockedAssessment.grade}</b> (score {blockedAssessment.score}) is below the <b>A</b>
                threshold. No co-creation context is archived; the second creator is blocked before any escrow.
              </div>
              <div className="row" style={{ marginTop: 14 }}>
                <button className="act indigo" onClick={() => goto(1)}>Now register an authentic original →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {stage === 1 && (
        <div className="grid">
          <div>
            <AaseAudit assessment={authenticAssessment} />
            <SovereignVault />
          </div>
          <div>
            <PassportCard p={passport} />
            <div className="card">
              <h2>Sovereign Vault</h2>
              <p className="sub">Proof-of-Effort sealed (SEAL 3-of-5) → Walrus blob</p>
              <div className="note ok">
                Original + sketches packaged as a PoE artifact, threshold-encrypted, and stored on Walrus as
                <b> {passport.evidenceBlobId}</b>. Future creators reuse this artifact.
              </div>
              <div className="row" style={{ marginTop: 14 }}>
                <button className="act indigo" onClick={() => goto(2)}>Travel to Country B & recreate →</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {stage === 2 && (
        <div className="grid">
          <div>
            <ConsentGate readiness={readiness} escrowFunded={escrowFunded} />
            <div className="card">
              <h2>Activate the trigger</h2>
              <p className="sub">fund escrow → consent flips automatically (no sign-off)</p>
              <div className="row">
                <button
                  className={`act ${escrowFunded ? 'ghost' : ''}`}
                  onClick={() => setEscrowFunded((v) => !v)}
                >
                  {escrowFunded ? 'Withdraw escrow' : 'Fund 100 SUI escrow'}
                </button>
                <button className="act" disabled={!readiness.ready || published} onClick={publishAndSettle}>
                  Publish travel essay & settle
                </button>
              </div>
              {archived && (
                <div className="note ok">
                  Shared-context archived → <b>{archived.namespace}:{archived.key}</b> (policy {archived.policyId}).
                </div>
              )}
            </div>
          </div>
          <div>
            <PassportCard p={passport} />
            <Settlement payouts={payouts} revenueMist={REVENUE_MIST} settled={published} />
          </div>
        </div>
      )}

      <div className="foot">CONTENT RIGHT · SUI OVERFLOW 2026 · WIRED TO THE REAL AASE / ESCROW / MEMWAL ENGINE</div>
    </div>
  )
}

function SovereignVault() {
  const [lit, setLit] = useState(0)
  useEffect(() => {
    setLit(0)
    const t = setInterval(() => setLit((n) => (n >= 5 ? 5 : n + 1)), 280)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="card">
      <h2>SEAL Threshold Encryption</h2>
      <p className="sub">5 key shares · 3-of-5 to decrypt · 10-min session key</p>
      <div className="nodes">
        {[1, 2, 3, 4, 5].map((i) => (
          <div className={`node ${i <= lit ? 'lit' : ''}`} key={i}>N{i}</div>
        ))}
      </div>
      <div className="note info">Proof-of-Effort split into 5 shares and distributed to independent SEAL nodes.</div>
    </div>
  )
}
