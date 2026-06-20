import { useEffect, useMemo, useState } from 'react'
import {
  calculateAASE, buildRecreateReadiness, calculateRoyaltyPayouts,
  prepareCoCreationActivation, InMemoryAuthenticityMemoryClient,
  writeAgentClue, buildMemWalInspectorSnapshot,
} from './engine'
import type {
  AASEGrade, AgentId, MemWalClue, RoyaltyPayout, VisaStamp, CoCreationMemoryRecord,
} from './engine'
import { analyzeFile, type AnalysisResult } from './lib/analyze'
import { Uploader } from './components/Uploader'
import { AaseAudit } from './components/AaseAudit'
import { MemWalInspector } from './components/MemWalInspector'
import { ConsentGate } from './components/ConsentGate'
import { Settlement } from './components/Settlement'
import { PassportCard, type PassportView } from './components/PassportCard'

type Snapshot = {
  clues: MemWalClue[]
  reputation: Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }>
}
const EMPTY: Snapshot = { clues: [], reputation: {} as Snapshot['reputation'] }

const YOU = '0xyou_origin_creator'
const REMIX = '0xrecreator'
const LABELS = { [YOU]: 'You · origin creator', [REMIX]: 'Recreator · 2nd creator' }

// Synthesize a sample image (no bundled assets) and run the real pipeline on it.
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
  return new Promise((res) => c.toBlob((b) => res(new File([b!], `${kind}-sample.png`, { type: 'image/png' })), 'image/png'))
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
  const [snap, setSnap] = useState<Snapshot>(EMPTY)

  async function handleFile(f: File) {
    setError(null); setAnalyzing(true); setPublished(false); setArchived(undefined)
    try {
      setAnalysis(await analyzeFile(f))
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setAnalyzing(false)
    }
  }

  const participants = useMemo(
    () => [{ address: YOU, weight: originRoyalty }, { address: REMIX, weight: 100 - originRoyalty }],
    [originRoyalty],
  )

  const assessment = useMemo(
    () => (analysis ? calculateAASE(analysis.scores, minGrade) : null),
    [analysis, minGrade],
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
    if (!analysis || !assessment) return null
    const stamps: VisaStamp[] = [{ creatorAddress: YOU, countryCode: 'ORIGIN', share: originRoyalty, stampedAt: '' }]
    if (published) stamps.push({ creatorAddress: REMIX, countryCode: 'B', share: 100 - originRoyalty, stampedAt: '' })
    const used = stamps.reduce((s, v) => s + v.share, 0)
    return {
      passportId: `passport:${analysis.hash.slice(0, 16)}…`,
      contentHash: analysis.hash,
      grade: assessment.grade,
      score: assessment.score,
      mediaBlobId: `walrus://${analysis.hash.slice(0, 16)}`,
      evidenceBlobId: `walrus://sealed-${analysis.hash.slice(8, 24)}`,
      visaStamps: stamps,
      remainingShare: 100 - used,
    }
  }, [analysis, assessment, originRoyalty, published])

  const payouts: RoyaltyPayout[] = useMemo(
    () => (published && readiness?.ready ? calculateRoyaltyPayouts(BigInt(Math.round(revenueSui * 1e9)), participants) : []),
    [published, readiness, revenueSui, participants],
  )

  useEffect(() => {
    if (!analysis) { setSnap(EMPTY); return }
    let alive = true
    ;(async () => {
      const client = new InMemoryAuthenticityMemoryClient()
      const ids: string[] = []
      for (const a of analysis.scores) {
        const clue = await writeAgentClue(client, {
          agentId: a.agentId,
          severity: a.score < 30 ? 'critical' : a.score < 70 ? 'warning' : 'info',
          message: a.evidence?.[0] ?? `${a.agentId} → ${a.score}`,
          scoreImpact: a.score - 70,
        })
        ids.push(clue.id)
      }
      const s = await buildMemWalInspectorSnapshot(client, ids)
      if (alive) setSnap(s)
    })()
    return () => { alive = false }
  }, [analysis])

  async function grantAndSettle() {
    if (!analysis || !readiness?.ready) return
    const act = await prepareCoCreationActivation({
      passportId: `passport:${analysis.hash.slice(0, 24)}`,
      agentScores: analysis.scores,
      participants,
      escrowAmountMist: BigInt(Math.round(escrowSui * 1e9)),
      minimumGrade: minGrade,
      policyId: '0xco_creation_policy',
    })
    setArchived(act.memoryRecord)
    setPublished(true)
  }

  return (
    <div className="wrap">
      <header className="hdr">
        <div className="brand">
          <div className="seal">🛂</div>
          <div>
            <h1>Content Right</h1>
            <p>Register your work, set the terms once — recreators get programmable consent + auto royalties.</p>
          </div>
        </div>
        <a className="badge" href="https://github.com/CisThard/content_passport" target="_blank" rel="noreferrer">Sui · SEAL · Walrus · MemWal</a>
      </header>

      <section className="hero">
        <h2 className="hero-h">Prove it’s yours. Let others recreate it — on your terms.</h2>
        <p className="hero-p">
          Upload an original, get an authenticity passport, and define a recreate license once.
          When a second creator meets your terms, consent and the royalty split happen automatically — no DMs, no contracts.
        </p>
      </section>

      {/* STEP 1 — Register */}
      <div className="step-head"><span className="step-no">1</span> Register your original</div>
      <div className="grid">
        <div>
          {!analysis && <Uploader onFile={handleFile} busy={analyzing} />}
          {!analysis && (
            <div className="row" style={{ marginTop: 12, justifyContent: 'center' }}>
              <span className="hint">No image handy?</span>
              <button className="act ghost" disabled={analyzing} onClick={async () => handleFile(await makeSample('authentic'))}>Try an authentic sample</button>
              <button className="act ghost" disabled={analyzing} onClick={async () => handleFile(await makeSample('synthetic'))}>Try a synthetic sample</button>
            </div>
          )}
          {error && <div className="note warn">{error}</div>}
          {analysis && assessment && (
            <>
              <div className="preview-card">
                <img src={analysis.previewUrl} alt="upload preview" />
                <div className="preview-meta">
                  <div className="field">sha-256 <b>{analysis.hash.slice(0, 28)}…</b></div>
                  <div className="field">size <b>{analysis.width}×{analysis.height}</b></div>
                  <div className="field">EXIF <b>{analysis.exif ? `${Object.keys(analysis.exif).length} tags` : 'none'}</b></div>
                  <div className="field">ELA δ <b>{analysis.elaAvg.toFixed(2)}</b></div>
                  <button className="act ghost" style={{ marginTop: 10 }} onClick={() => { setAnalysis(null); setPublished(false) }}>Upload another</button>
                </div>
              </div>
              <AaseAudit assessment={assessment} />
            </>
          )}
        </div>
        <div>
          {analysis && passport && <PassportCard p={passport} />}
          {analysis && <MemWalInspector clues={snap.clues} reputation={snap.reputation} />}
          {!analysis && (
            <div className="card placeholder">
              <h2>What happens here</h2>
              <p className="sub">100% in your browser</p>
              <ul className="bullets">
                <li><b>SHA-256</b> fingerprint of your file</li>
                <li><b>EXIF</b> camera/timestamp consistency</li>
                <li><b>Error-Level-Analysis</b> via canvas recompression</li>
                <li>Combined by the real <b>AASE</b> engine into a grade</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* STEP 2 — License */}
      <div className="step-head"><span className="step-no">2</span> Set your recreate license</div>
      <div className="grid">
        <div className="card">
          <h2>License terms</h2>
          <p className="sub">define once — the trigger enforces it for every recreator</p>

          <label className="ctl">
            <span>Your royalty share <b>{originRoyalty}%</b> · recreator gets {100 - originRoyalty}%</span>
            <input type="range" min={5} max={95} step={5} value={originRoyalty} disabled={!analysis}
              onChange={(e) => setOriginRoyalty(Number(e.target.value))} />
          </label>

          <label className="ctl">
            <span>Minimum authenticity grade</span>
            <select value={minGrade} disabled={!analysis} onChange={(e) => setMinGrade(e.target.value as AASEGrade)}>
              {['AAA', 'AA', 'A', 'B', 'C'].map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </label>

          <label className="ctl">
            <span>Escrow to unlock consent <b>{escrowSui} SUI</b></span>
            <input type="range" min={0} max={500} step={10} value={escrowSui} disabled={!analysis}
              onChange={(e) => setEscrowSui(Number(e.target.value))} />
          </label>

          <div className="row" style={{ marginTop: 6 }}>
            <button className={`act ${escrowFunded ? 'ghost' : ''}`} disabled={!analysis}
              onClick={() => setEscrowFunded((v) => !v)}>
              {escrowFunded ? '✓ Escrow funded' : 'Fund escrow'}
            </button>
          </div>
        </div>
        <div>
          {readiness
            ? <ConsentGate readiness={readiness} escrowFunded={escrowFunded} />
            : <div className="card placeholder"><h2>Consent preview</h2><p className="sub">register a work first</p></div>}
        </div>
      </div>

      {/* STEP 3 — Recreate */}
      <div className="step-head"><span className="step-no">3</span> A recreator publishes & settles</div>
      <div className="grid">
        <div className="card">
          <h2>Recreate & settle</h2>
          <p className="sub">when consent is active, revenue splits on-chain automatically</p>
          <label className="ctl">
            <span>Recreation revenue <b>{revenueSui} SUI</b></span>
            <input type="range" min={10} max={1000} step={10} value={revenueSui} disabled={!readiness?.ready}
              onChange={(e) => setRevenueSui(Number(e.target.value))} />
          </label>
          <div className="row">
            <button className="act" disabled={!readiness?.ready || published} onClick={grantAndSettle}>
              {published ? '✓ Settled' : 'Grant recreate & settle'}
            </button>
          </div>
          {!readiness?.ready && analysis && <div className="note info">Meet the license terms in step 2 to enable settlement.</div>}
          {archived && <div className="note ok">Shared-context archived → <b>{archived.namespace}:{archived.key}</b></div>}
        </div>
        <div>
          <Settlement payouts={payouts} revenueMist={BigInt(Math.round(revenueSui * 1e9))} settled={published} labels={LABELS} />
        </div>
      </div>

      <div className="foot">CONTENT RIGHT · authenticity → escrow → automatic royalty split · runs on the real AASE / consent engine</div>
    </div>
  )
}
