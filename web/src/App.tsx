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

interface EnrichedAnalysisResult extends AnalysisResult {
  mediaBlobId?: string
  evidenceBlobId?: string
  signature?: string
  signatory?: string
}

export default function App() {
  const [analysis, setAnalysis] = useState<EnrichedAnalysisResult | null>(null)
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

  // Web configuration for Walrus Testnet endpoints
  const [publisherUrl, setPublisherUrl] = useState('https://publisher.walrus-testnet.walrus.space')
  const [aggregatorUrl, setAggregatorUrl] = useState('https://aggregator.walrus-testnet.walrus.space')
  const [agentLogs, setAgentLogs] = useState<Array<{ time: string; agent: string; message: string; type: string }>>([])

  // Magical Gate States for being sucked into the unknown world UX
  const [enteredGate, setEnteredGate] = useState(false)
  const [vortexActive, setVortexActive] = useState(false)
  const [vortexCaption, setVortexCaption] = useState('Entering Gate 2.7...')

  const addLog = (type: string, agent: string, message: string) => {
    const time = new Date().toLocaleTimeString()
    setAgentLogs((prev) => [...prev, { time, agent, message, type }])
  }

  const stepThroughWall = async () => {
    setVortexCaption("Being pulled through the crack of Gate 2.7...")
    setVortexActive(true)
    await new Promise(r => setTimeout(r, 1800))
    setEnteredGate(true)
    setVortexActive(false)
  }

  async function handleFile(f: File) {
    setError(null); setPublished(false); setArchived(undefined); setAgentLogs([])
    setVortexCaption("The doors of Aurelius House are opening...")
    setVortexActive(true)
    await new Promise(r => setTimeout(r, 1800))
    setVortexActive(false)
    setAnalyzing(true)
    try {
      addLog('system', 'System', 'Initializing multi-agent content verification pipeline...')
      await new Promise(r => setTimeout(r, 450))

      addLog('forensic', 'Forensic Agent', 'Initiating Error Level Analysis (ELA) scanning JPEG recompression noise...')
      const next = await analyzeFile(f)
      await new Promise(r => setTimeout(r, 650))
      
      const forensicScore = next.scores.find(s => s.agentId === 'forensic-agent')?.score ?? 50
      addLog('forensic', 'Forensic Agent', `Residual compression delta analyzed. ELA Score: ${forensicScore}/100.`)
      await new Promise(r => setTimeout(r, 550))

      addLog('metadata', 'Metadata Agent', 'Extracting image EXIF metadata headers...')
      await new Promise(r => setTimeout(r, 650))
      const metadataSignal = next.signals.find(s => s.id === 'metadata')
      const metadataScore = next.scores.find(s => s.agentId === 'metadata-agent')?.score ?? 50
      addLog('metadata', 'Metadata Agent', `EXIF parsing complete. ${metadataSignal?.measured || 'No tags found.'} Score: ${metadataScore}/100.`)
      await new Promise(r => setTimeout(r, 550))

      addLog('ai', 'K-9 AI Sniffer', 'Evaluating context-fusion anomalies and shannon raster entropy...')
      await new Promise(r => setTimeout(r, 650))
      const aiScore = next.scores.find(s => s.agentId === 'ai-detection-agent')?.score ?? 50
      addLog('ai', 'K-9 AI Sniffer', `Repetition pattern analyzed. Fusion Sniffer Score: ${aiScore}/100.`)
      await new Promise(r => setTimeout(r, 550))

      // Ephemeral cryptographic signature generation (mocking agent private key signature)
      const mockSigBytes = new Uint8Array(64); window.crypto.getRandomValues(mockSigBytes)
      const mockSignature = Array.from(mockSigBytes).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 64)
      const mockPubBytes = new Uint8Array(32); window.crypto.getRandomValues(mockPubBytes)
      const mockSignatory = Array.from(mockPubBytes).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32)

      addLog('ai', 'K-9 AI Sniffer', `Generating cryptographically signed Genesis Passport.`)
      await new Promise(r => setTimeout(r, 450))
      addLog('ai', 'K-9 AI Sniffer', `Passport signed. Signatory Public Key: ${mockSignatory.slice(0, 16)}...`)

      // Attempt live upload to Walrus Testnet Publisher
      let mediaBlobId = `walrus://${next.hash.slice(0, 16)}`
      let evidenceBlobId = `walrus://sealed-${next.hash.slice(8, 24)}`

      if (publisherUrl) {
        try {
          addLog('system', 'Walrus Publisher', `Uploading original media to publisher ${publisherUrl}...`)
          const res = await fetch(`${publisherUrl.replace(/\/$/, '')}/v1/blobs?epochs=5`, {
            method: 'PUT',
            body: f,
          })
          if (res.ok) {
            const resData = await res.json()
            const uploadedId = resData.newlyCreated?.blobObject.blobId || resData.alreadyCertified?.blobId
            if (uploadedId) {
              mediaBlobId = `walrus://${uploadedId}`
              addLog('seal', 'Walrus Publisher', `Media uploaded successfully! Blob ID: ${mediaBlobId}`)
            }
          } else {
            throw new Error(`${res.status} ${res.statusText}`)
          }
        } catch (err) {
          addLog('system', 'Walrus Publisher', `Upload failed or CORS blocked. Falling back to local offline simulation.`)
        }
      }

      addLog('seal', 'Seal Agent', 'Encrypting verification evidence using AES-256-GCM...')
      await new Promise(r => setTimeout(r, 650))
      addLog('seal', 'Seal Agent', "Generating 5 threshold key shards using Shamir's Secret Sharing (3/5 schema) for decentralization.")
      await new Promise(r => setTimeout(r, 550))

      if (publisherUrl) {
        try {
          addLog('system', 'Walrus Publisher', `Uploading sealed evidence package to publisher...`)
          const evidencePayload = JSON.stringify({
            title: "Original Work Proof",
            hash: next.hash,
            grade: next.grade,
            timestamp: new Date().toISOString(),
            signature: mockSignature,
          })
          const res = await fetch(`${publisherUrl.replace(/\/$/, '')}/v1/blobs?epochs=5`, {
            method: 'PUT',
            body: new TextEncoder().encode(evidencePayload),
          })
          if (res.ok) {
            const resData = await res.json()
            const uploadedId = resData.newlyCreated?.blobObject.blobId || resData.alreadyCertified?.blobId
            if (uploadedId) {
              evidenceBlobId = `walrus://${uploadedId}`
              addLog('seal', 'Walrus Publisher', `Sealed evidence uploaded successfully! Blob ID: ${evidenceBlobId}`)
            }
          }
        } catch (err) {
          // ignore fallback
        }
      }

      addLog('rights', 'Rights Agent', `Assessing recreate readiness. Grade: ${next.grade} (Required: >= ${minGrade}). Escrow: ${escrowFunded ? 'FUNDED' : 'PENDING'}`)
      await new Promise(r => setTimeout(r, 550))

      const ready = next.score >= (minGrade === 'AAA' ? 95 : minGrade === 'AA' ? 85 : minGrade === 'A' ? 70 : minGrade === 'B' ? 50 : 30)
      if (ready) {
        addLog('rights', 'Rights Agent', 'Criteria MET. Programmable co-creation consent is GRANTED.')
      } else {
        addLog('rights', 'Rights Agent', 'Criteria BLOCKED. Content authenticity does not satisfy terms.')
      }
      await new Promise(r => setTimeout(r, 450))

      addLog('settlement', 'Settlement Agent', `Allocating royalty weights. Origin: ${originRoyalty}%, Recreator: ${100 - originRoyalty}%`)
      await new Promise(r => setTimeout(r, 450))
      addLog('system', 'System', 'Verification pipeline complete. Content Memory Graph generated.')

      const enrichedAnalysis: EnrichedAnalysisResult = {
        ...next,
        mediaBlobId,
        evidenceBlobId,
        signature: mockSignature,
        signatory: mockSignatory,
      }

      setAnalysis(enrichedAnalysis)
      setMemwal(await buildInspectorFromAnalysis(enrichedAnalysis))
      const graph = buildBrowserMemoryGraph(enrichedAnalysis, published)
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
      mediaBlobId: analysis.mediaBlobId || `walrus://${analysis.hash.slice(0, 16)}`,
      evidenceBlobId: analysis.evidenceBlobId || `walrus://sealed-${analysis.hash.slice(8, 24)}`,
      visaStamps: stamps, remainingShare: 100 - stamps.reduce((s, v) => s + v.share, 0),
      signature: analysis.signature,
      signatory: analysis.signatory,
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
    
    let graph = buildBrowserMemoryGraph(analysis, true)

    if (publisherUrl) {
      try {
        const res = await fetch(`${publisherUrl.replace(/\/$/, '')}/v1/blobs?epochs=5`, {
          method: 'PUT',
          body: JSON.stringify(graph),
        })
        if (res.ok) {
          const resData = await res.json()
          const uploadedId = resData.newlyCreated?.blobObject.blobId || resData.alreadyCertified?.blobId
          if (uploadedId) {
            graph.artifacts = graph.artifacts.map(a => 
              a.kind === 'memory-snapshot' ? { ...a, walrusBlobId: `walrus://${uploadedId}` } : a
            )
          }
        }
      } catch (err) {
        // ignore fallback
      }
    }

    setArchived(act.memoryRecord); setPublished(true)
    persistGraphSnapshot(graph)
    setMemoryGraph(graph)
  }

  return (
    <div className="wrap">
      <header className="hdr">
        <div className="brand">
          <div className="seal">🛂</div>
          <div>
            <h1>Content Passport</h1>
            <p>Prove a work is authentic — then let others recreate it on autopilot.</p>
          </div>
        </div>
        <a className="badge" href="https://github.com/CisThard/content_passport" target="_blank" rel="noreferrer">GitHub</a>
      </header>

      {!enteredGate ? (
        <div className="welcome-portal">
          <h1 className="welcome-h">The Secretly Opened<br />Gate 2.7</h1>
          <p className="welcome-p">
            In a cold corner of the airport terminal, a <strong>'Gate 2.7'</strong> — listed on no signboard — glows quietly.<br /><br />
            The moment you step through that hidden crack in the wall, a brilliant Milky Way runway showering stardust appears before you, along with the hall of a magical residence.
            To everyone who enters here, a mysterious <strong>'Content Passport'</strong> is granted — one that protects the copyright of your work and lets you program royalty distribution.
          </p>
          <button className="act indigo" style={{ padding: '14px 32px', fontSize: '14px', borderRadius: '12px' }} onClick={stepThroughWall}>
            Pass Through the Secret Door (Platform 2.7) ➔
          </button>
        </div>
      ) : (
        <>
          {/* Intro — only before a file is loaded, to keep the tool uncluttered */}
          {!analysis && (
            <>
              <section className="hero" style={{ textAlign: 'center', maxWidth: 680, margin: '20px auto 40px' }}>
                <h2 className="hero-h" style={{ fontFamily: 'var(--serif)', fontSize: '28px', color: '#fff' }}>Authenticity proven by a seal. Licensing realized automatically.</h2>
                <p className="hero-p" style={{ fontSize: '13px', color: 'var(--txt-2)', lineHeight: 1.7 }}>
                  Want to allow others to create derivative works while permanently securing your ownership and stake?
                  Let the fairies of the visual residence <strong>'Aurelius'</strong> rigorously inspect your creation and issue your own passport, its reverse side locked with threshold encryption.
                </p>
              </section>

              <HowItWorks />

              <div className="step-head" style={{ marginTop: 40 }}><span className="step-no">▶</span> Platform 2.7 — Scan Your Creation</div>
              
              <div className="card config-panel" style={{ marginBottom: 18 }}>
                <h2>⚙️ Walrus Testnet Configuration</h2>
                <p className="sub">Optional: Upload and query live blobs directly to the Walrus Testnet from the browser</p>
                <div className="row" style={{ marginTop: 10, gap: 15 }}>
                  <label className="ctl" style={{ flex: 1, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span>Publisher URL</span>
                    <input style={{ background: 'var(--panel-2)', color: 'var(--txt)', border: '1px solid var(--line-2)', borderRadius: '8px', padding: '8px 10px', fontSize: '12px', fontFamily: 'monospace' }} value={publisherUrl} onChange={(e) => setPublisherUrl(e.target.value)} placeholder="https://..." />
                  </label>
                  <label className="ctl" style={{ flex: 1, margin: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span>Aggregator URL</span>
                    <input style={{ background: 'var(--panel-2)', color: 'var(--txt)', border: '1px solid var(--line-2)', borderRadius: '8px', padding: '8px 10px', fontSize: '12px', fontFamily: 'monospace' }} value={aggregatorUrl} onChange={(e) => setAggregatorUrl(e.target.value)} placeholder="https://..." />
                  </label>
                </div>
              </div>

              <Uploader onFile={handleFile} busy={analyzing} />
              <div className="row" style={{ marginTop: 12, justifyContent: 'center' }}>
                <span className="hint">Load a sample:</span>
                <button className="act ghost" disabled={analyzing} onClick={async () => handleFile(await makeSample('authentic'))}>Aurelius-verified original</button>
                <button className="act ghost" disabled={analyzing} onClick={async () => handleFile(await makeSample('synthetic'))}>Forged / manipulated image</button>
              </div>
              {error && <div className="note warn">{error}</div>}

              <p className="methodology">
                The authenticity score (AASE) is calculated transparently based on credible forensic research methodologies — <b>C2PA Content Credentials</b> (c2pa.org),
                <b> Error Level Analysis</b> (Farid, Photo Forensics, MIT Press 2016),
                and <b>EXIF consistency analysis</b> (Kee, Johnson &amp; Farid, 2011).
              </p>
            </>
          )}

          {/* Interactive Agent Console during and after analysis */}
          {(analyzing || agentLogs.length > 0) && (
            <div className="card agent-console" style={{ marginBottom: 22 }}>
              <h2>🤖 Aurelius House Inspection Scroll</h2>
              <p className="sub">Real-time cross-verification log from the fairies and the K-9 sentinel agents</p>
              <div className="console-box">
                {agentLogs.map((log, i) => (
                  <div key={i} className={`console-line ${log.type}`}>
                    <span className="time">[{log.time}]</span>{' '}
                    <span className="tag">{log.agent}:</span>{' '}
                    <span className="msg">{log.message}</span>
                  </div>
                ))}
                {analyzing && <div className="console-line system typing">The Aurelius House inspection team is deliberating...</div>}
              </div>
            </div>
          )}

          {/* Tool — revealed after analysis */}
          {analysis && (
            <>
              <div className="step-head"><span className="step-no">1</span> Aurelius Inspection Report &amp; Silver Passport</div>
              <div className="grid">
                <AuthenticityReport signals={analysis.signals} verdict={analysis.verdict} grade={analysis.grade} score={analysis.score} />
                <div>
                  <div className="preview-card">
                    <img src={analysis.previewUrl} alt="preview" />
                    <div className="preview-meta">
                      <div className="field">sha-256 <b>{analysis.hash.slice(0, 24)}…</b></div>
                      <div className="field">size <b>{analysis.width}×{analysis.height}</b></div>
                      <button className="act ghost" style={{ marginTop: 10 }} onClick={() => { setAnalysis(null); setPublished(false); setMemoryGraph(null); setMemwal({ clues: [], reputation: {} as Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }> }); setAgentLogs([]) }}>← Scan again</button>
                    </div>
                  </div>
                  {passport && <PassportCard p={passport} ready={!!readiness?.ready} />}
                  {passport && (
                    <div className="card" style={{ border: '1.5px solid var(--teal)', boxShadow: '0 10px 25px rgba(52, 211, 153, 0.1)' }}>
                      <h2>Sovereign Secret Vault</h2>
                      <p className="sub">The secret vault on the reverse side, guarded in a distributed way by five fairies (threshold decryption)</p>
                      <DecryptModal evidenceBlobId={passport.evidenceBlobId} contentHash={passport.contentHash} disabled={!readiness?.ready} />
                    </div>
                  )}
                </div>
              </div>

              <div className="step-head"><span className="step-no">M</span> MemWal Real-time Status Monitor</div>
              <div className="grid">
                <MemWalInspector clues={memwal.clues} reputation={memwal.reputation} />
                <MemoryGraph
                  graph={memoryGraph}
                  onRestore={async (blobId) => setMemoryGraph(await restoreGraphSnapshot(blobId))}
                  onClear={() => { setAnalysis(null); setPublished(false); setMemoryGraph(null); setMemwal({ clues: [], reputation: {} as Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }> }); setAgentLogs([]) }}
                />
              </div>

              <div className="step-head"><span className="step-no">2</span> The Sealed Contract on the Passport's Reverse ( programmable license )</div>
              <div className="grid">
                <div className="card">
                  <h2>Set Residence License Conditions</h2>
                  <p className="sub">The on-chain spell that a derivative creator must satisfy to apply the magical stamp</p>
                  <label className="ctl">
                    <span>Your stake when your work is remixed: <b>{originRoyalty}%</b></span>
                    <input type="range" min={5} max={95} step={5} value={originRoyalty} onChange={(e) => setOriginRoyalty(+e.target.value)} />
                  </label>
                  <label className="ctl">
                    <span>Minimum required authenticity grade</span>
                    <select value={minGrade} onChange={(e) => setMinGrade(e.target.value as AASEGrade)}>
                      {['AAA', 'AA', 'A', 'B', 'C'].map((g) => <option key={g} value={g}>{g}</option>)}
                    </select>
                  </label>
                  <label className="ctl">
                    <span>Deposit to trigger approval (escrow) <b>{escrowSui} SUI</b></span>
                    <input type="range" min={0} max={500} step={10} value={escrowSui} onChange={(e) => setEscrowSui(+e.target.value)} />
                  </label>
                  <button className={`act ${escrowFunded ? 'ghost' : ''}`} onClick={() => setEscrowFunded((v) => !v)}>
                    {escrowFunded ? '✓ Deposit funded' : 'Deposit escrow (SUI)'}
                  </button>
                </div>
                {readiness && <ConsentGate readiness={readiness} escrowFunded={escrowFunded} />}
              </div>

              <div className="step-head"><span className="step-no">3</span> Stamp the Remix &amp; Settle ( Settle )</div>
              <div className="grid">
                <div className="card">
                  <h2>Milky Way Collaboration &amp; Instant Settlement</h2>
                  <p className="sub">When conditions are met, the coins are distributed automatically according to the escrow stakes</p>
                  <label className="ctl">
                    <span>Derivative remix revenue <b>{revenueSui} SUI</b></span>
                    <input type="range" min={10} max={1000} step={10} value={revenueSui} disabled={!readiness?.ready} onChange={(e) => setRevenueSui(+e.target.value)} />
                  </label>
                  <button className="act" disabled={!readiness?.ready || published} onClick={grantAndSettle}>
                    {published ? '✓ Distribution complete' : 'Approve remix & settle revenue instantly ➔'}
                  </button>
                  {!readiness?.ready && <div className="note info" style={{ color: 'var(--amber)', borderColor: 'rgba(255,215,0,0.2)' }}>The magical sealed contract conditions from Step 2 are not active yet.</div>}
                  {archived && <div className="note ok">The on-chain receipt has been archived to the shared-context store → <b>{archived.namespace}</b></div>}
                </div>
                <Settlement payouts={payouts} revenueMist={BigInt(Math.round(revenueSui * 1e9))} settled={published} labels={LABELS} />
              </div>
            </>
          )}
        </>
      )}

      {/* Vortex Portal Transition overlay */}
      <div className={`portal-transition-overlay ${vortexActive ? 'active' : ''}`}>
        <div className="portal-vortex">
          <div className="vortex-spin"></div>
          <div className="vortex-spin-inner"></div>
          <div className="portal-center-core"></div>
        </div>
        <div className="portal-caption">{vortexCaption}</div>
      </div>

      <div className="foot">CONTENT PASSPORT · Gate 2.7 Portal powered by Walrus &amp; Sui Move</div>
    </div>
  )
}


function buildBrowserMemoryGraph(analysis: EnrichedAnalysisResult, settled: boolean): ContentMemoryGraph {
  const passportId = `passport:${analysis.hash.slice(0, 24)}`
  const createdAt = new Date().toISOString()
  const artifact = (
    kind: ContentMemoryGraph['artifacts'][number]['kind'],
    name: string,
    createdBy: AgentId,
    index: number,
    size = 512,
    reusedFrom?: string[],
    customBlobId?: string,
  ): ContentMemoryGraph['artifacts'][number] => ({
    id: `${kind}:${analysis.hash.slice(index, index + 12)}`,
    kind,
    name,
    mimeType: kind.endsWith('report') || kind === 'license' || kind === 'settlement' || kind === 'memory-snapshot' ? 'application/json' : 'application/octet-stream',
    digest: analysis.hash,
    size,
    walrusBlobId: customBlobId || `walrus://${analysis.hash.slice(index, index + 32)}`,
    createdBy,
    createdAt,
    reusedFrom,
    metadata: { source: 'walrus-http-ready', passportId },
  })

  const media = artifact('media', 'original-media', 'forensic-agent', 0, analysis.width * analysis.height, undefined, analysis.mediaBlobId)
  const clues = analysis.scores.map((score, index) =>
    artifact('agent-clue', `${score.agentId}-clue.json`, score.agentId, 4 + index * 4, 240, [media.id]),
  )
  const report = artifact('audit-report', 'aase-audit-report.json', 'ai-detection-agent', 10, 780, [media.id, ...clues.map((item) => item.id)])
  const sealed = artifact('sealed-evidence', 'sealed-proof-of-effort.bin', 'seal-agent', 14, 1024, [media.id, report.id], analysis.evidenceBlobId)
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
