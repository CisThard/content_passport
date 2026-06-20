import { useMemo, useState } from 'react'
import { buildRecreateReadiness, calculateRoyaltyPayouts, prepareCoCreationActivation } from './engine'
import type { AASEGrade, RoyaltyPayout, VisaStamp, CoCreationMemoryRecord } from './engine'
import { analyzeFile, type AnalysisResult } from './lib/analyze'
import { Uploader } from './components/Uploader'
import { HowItWorks } from './components/HowItWorks'
import { AuthenticityReport } from './components/AuthenticityReport'
import { ConsentGate } from './components/ConsentGate'
import { Settlement } from './components/Settlement'
import { PassportCard, type PassportView } from './components/PassportCard'

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

  async function handleFile(f: File) {
    setError(null); setAnalyzing(true); setPublished(false); setArchived(undefined)
    try { setAnalysis(await analyzeFile(f)) }
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
                  <button className="act ghost" style={{ marginTop: 10 }} onClick={() => { setAnalysis(null); setPublished(false) }}>← Verify another</button>
                </div>
              </div>
              {passport && <PassportCard p={passport} ready={!!readiness?.ready} />}
            </div>
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
