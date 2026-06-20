import { useMemo, useState } from 'react'
import {
  buildMemWalInspectorSnapshot,
  buildRecreateReadiness,
  calculateRoyaltyPayouts,
  InMemoryAuthenticityMemoryClient,
  prepareCoCreationActivation,
  writeAgentClue,
} from './engine'
import type { AASEGrade, AgentId, CoCreationMemoryRecord, ContentMemoryGraph, MemWalClue, RoyaltyPayout, VisaStamp } from './engine'
import { analyzeFile, type AnalysisResult } from './lib/analyze'
import { Uploader } from './components/Uploader'
import { HowItWorks } from './components/HowItWorks'
import { AuthenticityReport } from './components/AuthenticityReport'
import { ConsentGate } from './components/ConsentGate'
import { Settlement } from './components/Settlement'
import { PassportCard, type PassportView } from './components/PassportCard'
import { MemWalInspector } from './components/MemWalInspector'
import { DecryptModal } from './components/DecryptModal'
import { MemoryGraph } from './components/MemoryGraph'

const YOU = '0xyou_origin_creator'
const REMIX = '0xrecreator'
const LABELS = { [YOU]: 'You · origin creator', [REMIX]: 'Recreator · 2nd creator' }

function makeSample(kind: 'authentic' | 'synthetic'): Promise<File> {
  const c = document.createElement('canvas'); c.width = 320; c.height = 320
  const ctx = c.getContext('2d')!
  if (kind === 'authentic') {
    const g = ctx.createLinearGradient(0, 0, 320, 320)
    g.addColorStop(0, '#2b6cff'); g.addColorStop(1, '#ff9a3d')
    ctx.fillStyle = g; ctx.fillRect(0, 0, 320, 320)
  } else {
    const img = ctx.createImageData(320, 320)
    for (let i = 0; i < img.data.length; i += 4) {
      img.data[i] = Math.random() * 255; img.data[i + 1] = Math.random() * 255
      img.data[i + 2] = Math.random() * 255; img.data[i + 3] = 255
    }
    ctx.putImageData(img, 0, 0)
  }
  return new Promise((res) => c.toBlob((b) => res(new File([b!], `${kind}.png`, { type: 'image/png' })), 'image/png'))
}

export default function App() {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [minGrade, setMinGrade] = useState<AASEGrade>('A')
  const [originRoyalty, setOriginRoyalty] = useState(30)
  const [escrowFunded, setEscrowFunded] = useState(false)
  const [escrowSui, setEscrowSui] = useState(50)
  const [revenueSui, setRevenueSui] = useState(100)
  const [published, setPublished] = useState(false)
  const [archived, setArchived] = useState<CoCreationMemoryRecord | undefined>()
  const [memwal, setMemwal] = useState<{
    clues: MemWalClue[]
    reputation: Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }>
  }>({ clues: [], reputation: {} as Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }> })
  const [memoryGraph, setMemoryGraph] = useState<ContentMemoryGraph | null>(null)

  async function handleFile(f: File) {
    setError(null); setAnalyzing(true); setPublished(false); setArchived(undefined)
    try {
      const next = await analyzeFile(f)
      setAnalysis(next)
      setMemwal(await buildInspectorFromAnalysis(next))
      const graph = buildBrowserMemoryGraph(next, published)
      persistGraphSnapshot(graph)
      setMemoryGraph(graph)
    }
    catch (e) { setError(e instanceof Error ? e.message : String(e)) }
    finally { setAnalyzing(false) }
  }

  const participants = useMemo(
    () => [{ address: YOU, weight: originRoyalty }, { address: REMIX, weight: 100 - originRoyalty }],
    [originRoyalty],
  )

  const readiness = useMemo(() => {
    if (!analysis) return null
    return buildRecreateReadiness({
      passportId: `passport:${analysis.hash.slice(0, 24)}`,
      agentScores: analysis.scores,
      participants,
      escrowAmountMist: escrowFunded ? BigInt(Math.round(escrowSui * 1e9)) : 0n,
      minimumGrade: minGrade,
    })
  }, [analysis, participants, escrowFunded, escrowSui, minGrade])

  const passport: PassportView | null = useMemo(() => {
    if (!analysis) return null
    const stamps: VisaStamp[] = [{ creatorAddress: YOU, countryCode: 'ORIGIN', share: originRoyalty, stampedAt: '' }]
    if (published) stamps.push({ creatorAddress: REMIX, countryCode: 'B', share: 100 - originRoyalty, stampedAt: '' })
    return {
      passportId: `passport:${analysis.hash.slice(0, 16)}…`,
      contentHash: analysis.hash, grade: analysis.grade, score: analysis.score,
      mediaBlobId: `walrus://${analysis.hash.slice(0, 16)}`,
      evidenceBlobId: `walrus://sealed-${analysis.hash.slice(8, 24)}`,
      visaStamps: stamps, remainingShare: 100 - stamps.reduce((s, v) => s + v.share, 0),
    }
  }, [analysis, originRoyalty, published])

  const payouts: RoyaltyPayout[] = useMemo(
    () => (published && readiness?.ready ? calculateRoyaltyPayouts(BigInt(Math.round(revenueSui * 1e9)), participants) : []),
    [published, readiness, revenueSui, participants],
  )

  async function grantAndSettle() {
    if (!analysis || !readiness?.ready) return
    const act = await prepareCoCreationActivation({
      passportId: `passport:${analysis.hash.slice(0, 24)}`,
      agentScores: analysis.scores, participants,
      escrowAmountMist: BigInt(Math.round(escrowSui * 1e9)), minimumGrade: minGrade, policyId: '0xpolicy',
    })
    setArchived(act.memoryRecord); setPublished(true)
    const graph = buildBrowserMemoryGraph(analysis, true)
    persistGraphSnapshot(graph)
    setMemoryGraph(graph)
  }

  return (
    <div className="wrap">
      <header className="hdr">
        <div className="brand">
          <div className="seal">🛂</div>
          <div>
            <h1>Content Right</h1>
            <p>Prove a work is authentic — then let others recreate it on autopilot.</p>
          </div>
        </div>
        <a className="badge" href="https://github.com/CisThard/content_passport" target="_blank" rel="noreferrer">GitHub</a>
      </header>

      {/* Intro — only before a file is loaded, to keep the tool uncluttered */}
      {!analysis && (
        <>
          <section className="hero">
            <h2 className="hero-h">Authenticity you can prove. Licensing that runs itself.</h2>
            <p className="hero-p">
              Creators waste hours chasing permission and royalties. Content Right verifies a work with
              open forensic standards, then turns your license into a smart contract: when a second creator
              meets your terms, consent and the revenue split happen automatically.
            </p>
          </section>

          <HowItWorks />

          <div className="step-head" style={{ marginTop: 30 }}><span className="step-no">▶</span> Try it — verify a work</div>
          <Uploader onFile={handleFile} busy={analyzing} />
          <div className="row" style={{ marginTop: 12, justifyContent: 'center' }}>
            <span className="hint">No image?</span>
            <button className="act ghost" disabled={analyzing} onClick={async () => handleFile(await makeSample('authentic'))}>Authentic sample</button>
            <button className="act ghost" disabled={analyzing} onClick={async () => handleFile(await makeSample('synthetic'))}>Synthetic sample</button>
          </div>
          {error && <div className="note warn">{error}</div>}

          <p className="methodology">
            Scoring is grounded in published methods — <b>C2PA Content Credentials</b> (c2pa.org),
            <b> Error Level Analysis</b> (Farid, Photo Forensics, MIT Press 2016), and
            <b> EXIF/JPEG-header forensics</b> (Kee, Johnson &amp; Farid, IEEE TIFS 2011). Every score shows its raw measurement.
          </p>
        </>
      )}

      {/* Tool — revealed after analysis */}
      {analysis && (
        <>
          <div className="step-head"><span className="step-no">1</span> Authenticity report</div>
          <div className="grid">
            <AuthenticityReport signals={analysis.signals} verdict={analysis.verdict} grade={analysis.grade} score={analysis.score} />
            <div>
              <div className="preview-card">
                <img src={analysis.previewUrl} alt="preview" />
                <div className="preview-meta">
                  <div className="field">sha-256 <b>{analysis.hash.slice(0, 24)}…</b></div>
                  <div className="field">size <b>{analysis.width}×{analysis.height}</b></div>
                  <button className="act ghost" style={{ marginTop: 10 }} onClick={() => { setAnalysis(null); setPublished(false); setMemoryGraph(null); setMemwal({ clues: [], reputation: {} as Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }> }) }}>← Verify another</button>
                </div>
              </div>
              {passport && <PassportCard p={passport} ready={!!readiness?.ready} />}
              {passport && (
                <div className="card">
                  <h2>Sovereign Vault</h2>
                  <p className="sub">sealed proof-of-effort · Walrus blob · threshold unlock</p>
                  <DecryptModal evidenceBlobId={passport.evidenceBlobId} contentHash={passport.contentHash} disabled={!readiness?.ready} />
                </div>
              )}
            </div>
          </div>

          <div className="step-head"><span className="step-no">M</span> MemWal Inspector</div>
          <div className="grid">
            <MemWalInspector clues={memwal.clues} reputation={memwal.reputation} />
            <MemoryGraph
              graph={memoryGraph}
              onRestore={async (blobId) => setMemoryGraph(await restoreGraphSnapshot(blobId))}
              onClear={() => { setAnalysis(null); setPublished(false); setMemoryGraph(null); setMemwal({ clues: [], reputation: {} as Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }> }) }}
            />
          </div>

          <div className="step-head"><span className="step-no">2</span> Set your recreate license</div>
          <div className="grid">
            <div className="card">
              <h2>Your terms</h2>
              <p className="sub">set once — enforced for every recreator</p>
              <label className="ctl">
                <span>You keep <b>{originRoyalty}%</b> · recreator gets {100 - originRoyalty}%</span>
                <input type="range" min={5} max={95} step={5} value={originRoyalty} onChange={(e) => setOriginRoyalty(+e.target.value)} />
              </label>
              <label className="ctl">
                <span>Require at least grade</span>
                <select value={minGrade} onChange={(e) => setMinGrade(e.target.value as AASEGrade)}>
                  {['AAA', 'AA', 'A', 'B', 'C'].map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </label>
              <label className="ctl">
                <span>Escrow to unlock consent <b>{escrowSui} SUI</b></span>
                <input type="range" min={0} max={500} step={10} value={escrowSui} onChange={(e) => setEscrowSui(+e.target.value)} />
              </label>
              <button className={`act ${escrowFunded ? 'ghost' : ''}`} onClick={() => setEscrowFunded((v) => !v)}>
                {escrowFunded ? '✓ Escrow funded' : 'Fund escrow'}
              </button>
            </div>
            {readiness && <ConsentGate readiness={readiness} escrowFunded={escrowFunded} />}
          </div>

          <div className="step-head"><span className="step-no">3</span> Recreate &amp; settle</div>
          <div className="grid">
            <div className="card">
              <h2>Recreate &amp; settle</h2>
              <p className="sub">consent active ⇒ revenue splits automatically</p>
              <label className="ctl">
                <span>Recreation revenue <b>{revenueSui} SUI</b></span>
                <input type="range" min={10} max={1000} step={10} value={revenueSui} disabled={!readiness?.ready} onChange={(e) => setRevenueSui(+e.target.value)} />
              </label>
              <button className="act" disabled={!readiness?.ready || published} onClick={grantAndSettle}>
                {published ? '✓ Settled' : 'Grant recreate & settle'}
              </button>
              {!readiness?.ready && <div className="note info">Meet your own terms in step 2 to enable settlement.</div>}
              {archived && <div className="note ok">On-chain consent archived → <b>{archived.namespace}</b></div>}
            </div>
            <Settlement payouts={payouts} revenueMist={BigInt(Math.round(revenueSui * 1e9))} settled={published} labels={LABELS} />
          </div>
        </>
      )}

      <div className="foot">CONTENT RIGHT · open forensic standards + programmable consent on Sui</div>
    </div>
  )
}

function buildBrowserMemoryGraph(analysis: AnalysisResult, settled: boolean): ContentMemoryGraph {
  const passportId = `passport:${analysis.hash.slice(0, 24)}`
  const createdAt = new Date().toISOString()
  const artifact = (
    kind: ContentMemoryGraph['artifacts'][number]['kind'],
    name: string,
    createdBy: AgentId,
    index: number,
    size = 512,
    reusedFrom?: string[],
  ): ContentMemoryGraph['artifacts'][number] => ({
    id: `${kind}:${analysis.hash.slice(index, index + 12)}`,
    kind,
    name,
    mimeType: kind.endsWith('report') || kind === 'license' || kind === 'settlement' || kind === 'memory-snapshot' ? 'application/json' : 'application/octet-stream',
    digest: analysis.hash,
    size,
    walrusBlobId: `walrus://${analysis.hash.slice(index, index + 32)}`,
    createdBy,
    createdAt,
    reusedFrom,
    metadata: { source: 'walrus-http-ready', passportId },
  })

  const media = artifact('media', 'original-media', 'forensic-agent', 0, analysis.width * analysis.height)
  const clues = analysis.scores.map((score, index) =>
    artifact('agent-clue', `${score.agentId}-clue.json`, score.agentId, 4 + index * 4, 240, [media.id]),
  )
  const report = artifact('audit-report', 'aase-audit-report.json', 'ai-detection-agent', 10, 780, [media.id, ...clues.map((item) => item.id)])
  const sealed = artifact('sealed-evidence', 'sealed-proof-of-effort.bin', 'seal-agent', 14, 1024, [media.id, report.id])
  const license = artifact('license', 'recreate-readiness.json', 'rights-agent', 18, 620, [sealed.id])
  const settlement = artifact('settlement', 'customs-settlement-state.json', 'settlement-agent', 22, 360, [license.id])
  const snapshot = artifact('memory-snapshot', 'content-memory-graph.json', 'archivist-agent', 26, 2100, [media.id, ...clues.map((item) => item.id), report.id, sealed.id, license.id, settlement.id])
  const artifacts = [media, ...clues, report, sealed, license, settlement, snapshot]

  return {
    passportId,
    namespace: 'content-memory-graph',
    artifacts,
    restoredFromWalrus: true,
    createdAt,
    updatedAt: createdAt,
    steps: [
      {
        id: `step:audit:${passportId}`,
        agentId: 'ai-detection-agent',
        action: 'context-fusion-audit',
        status: 'completed',
        startedAt: createdAt,
        completedAt: createdAt,
        inputArtifactIds: [media.id],
        outputArtifactIds: [...clues.map((item) => item.id), report.id],
        memoryKeys: analysis.scores.map((score) => `memwal-board:${passportId}:${score.agentId}`),
        summary: 'Forensic, metadata, AI, and memory agents persist clues for future sessions.',
      },
      {
        id: `step:seal:${passportId}`,
        agentId: 'seal-agent',
        action: 'seal-proof-of-effort',
        status: 'completed',
        startedAt: createdAt,
        completedAt: createdAt,
        inputArtifactIds: [media.id, report.id],
        outputArtifactIds: [sealed.id],
        memoryKeys: [`shared-context:sealed:${passportId}`],
        summary: 'Proof-of-effort is sealed and stored as a reusable Walrus artifact.',
      },
      {
        id: `step:rights:${passportId}`,
        agentId: 'rights-agent',
        action: 'evaluate-programmable-consent',
        status: analysis.score >= 70 ? 'completed' : 'blocked',
        startedAt: createdAt,
        completedAt: createdAt,
        inputArtifactIds: [sealed.id],
        outputArtifactIds: [license.id],
        memoryKeys: [`agent-workflow-state:step:rights:${passportId}`],
        summary: analysis.score >= 70 ? 'Rights agent grants recreate readiness.' : 'Rights agent blocks recreate readiness until authenticity improves.',
      },
      {
        id: `step:settlement:${passportId}`,
        agentId: 'settlement-agent',
        action: 'prepare-customs-settlement',
        status: settled ? 'completed' : 'pending',
        startedAt: createdAt,
        completedAt: settled ? createdAt : undefined,
        inputArtifactIds: [license.id],
        outputArtifactIds: [settlement.id],
        memoryKeys: [`agent-workflow-state:step:settlement:${passportId}`],
        summary: settled ? 'Settlement state is complete and ready for revenue replay.' : 'Settlement state is persisted and waiting for revenue.',
      },
    ],
  }
}

function persistGraphSnapshot(graph: ContentMemoryGraph) {
  const snapshot = graph.artifacts.find((artifact) => artifact.kind === 'memory-snapshot')
  if (!snapshot) return
  localStorage.setItem(`cr:graph:${snapshot.walrusBlobId}`, JSON.stringify(graph))
}

async function restoreGraphSnapshot(blobId: string): Promise<ContentMemoryGraph> {
  const normalized = blobId.startsWith('walrus://') ? blobId : `walrus://${blobId}`
  const local = localStorage.getItem(`cr:graph:${normalized}`)
  if (local) return { ...(JSON.parse(local) as ContentMemoryGraph), restoredFromWalrus: true }

  const aggregator = import.meta.env.VITE_WALRUS_AGGREGATOR as string | undefined
  if (!aggregator) {
    throw new Error('No local snapshot found. Set VITE_WALRUS_AGGREGATOR to restore from a real Walrus aggregator.')
  }
  const id = normalized.replace(/^walrus:\/\//, '')
  const response = await fetch(`${aggregator.replace(/\/$/, '')}/v1/blobs/${encodeURIComponent(id)}`)
  if (!response.ok) throw new Error(`Walrus restore failed: ${response.status}`)
  return { ...await response.json() as ContentMemoryGraph, restoredFromWalrus: true }
}

async function buildInspectorFromAnalysis(analysis: AnalysisResult) {
  const memory = new InMemoryAuthenticityMemoryClient()
  const clueIds: string[] = []
  for (const score of analysis.scores) {
    const firstEvidence = score.evidence?.[0] ?? 'No evidence string supplied'
    const clue = await writeAgentClue(memory, {
      agentId: score.agentId,
      severity: score.score < 45 ? 'critical' : score.score < 70 ? 'warning' : 'info',
      message: `${score.agentId} -> ${score.score}/100. ${firstEvidence}`,
      scoreImpact: score.score - 70,
      metadata: { confidence: score.confidence, hash: analysis.hash },
    })
    clueIds.push(clue.id)
  }
  return buildMemWalInspectorSnapshot(memory, clueIds)
}
