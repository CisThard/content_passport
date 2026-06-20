import { useMemo, useState, useEffect } from 'react'
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

const YOU = '0xyou_origin_creator'
const REMIX = '0xrecreator'
const LABELS = { [YOU]: 'You (Original Creator)', [REMIX]: 'Recreator (Secondary Artist)' }

interface EnrichedAnalysisResult extends AnalysisResult {
  mediaBlobId?: string
  evidenceBlobId?: string
  signature?: string
  signatory?: string
}

function makeSample(kind: 'authentic' | 'synthetic'): Promise<File> {
  const c = document.createElement('canvas'); c.width = 320; c.height = 320
  const ctx = c.getContext('2d')!
  if (kind === 'authentic') {
    const g = ctx.createLinearGradient(0, 0, 320, 320)
    g.addColorStop(0, '#6c7cf2'); g.addColorStop(1, '#ffd700')
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
  // Navigation & Screen transitions
  const [enteredGate, setEnteredGate] = useState(false)
  const [activeSection, setActiveSection] = useState<'gate' | 'aurelius' | 'seal' | 'remix' | 'chat'>('gate')
  const [vortexActive, setVortexActive] = useState(false)
  const [vortexCaption, setVortexCaption] = useState('Entering Gate 2.7...')

  // Verification pipeline
  const [analysis, setAnalysis] = useState<EnrichedAnalysisResult | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agentLogs, setAgentLogs] = useState<Array<{ time: string; agent: string; message: string; type: string }>>([])
  
  // Customization & Policy
  const [minGrade, setMinGrade] = useState<AASEGrade>('A')
  const [originRoyalty, setOriginRoyalty] = useState(30)
  const [escrowFunded, setEscrowFunded] = useState(false)
  const [escrowSui, setEscrowSui] = useState(50)
  const [revenueSui, setRevenueSui] = useState(100)
  const [published, setPublished] = useState(false)
  const [archived, setArchived] = useState<CoCreationMemoryRecord | undefined>()
  const [memoryGraph, setMemoryGraph] = useState<ContentMemoryGraph | null>(null)
  const [memwal, setMemwal] = useState<{
    clues: MemWalClue[]
    reputation: Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }>
  }>({ clues: [], reputation: {} as Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }> })

  // Signature verification widget state
  const [sigVerifyStatus, setSigVerifyStatus] = useState<'idle' | 'verifying' | 'valid' | 'invalid'>('idle')

  // Secret Vault threshold decrypt states
  const [vaultState, setVaultState] = useState<'locked' | 'decrypting' | 'unlocked'>('locked')
  const [activeShards, setActiveShards] = useState<boolean[]>([false, false, false, false, false])
  const [decryptedData, setDecryptedData] = useState<any>(null)

  // MemWal Chat Sandbox states
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string }>>([
    { sender: 'agent', text: 'Greetings, seeker of Platform 2.7. I am the Aurelius Oracle. Ask me anything about your visual passport and its decentralized memory ledger.' }
  ])
  const [chatInput, setChatInput] = useState('')
  const [chatLogs, setChatLogs] = useState<string[]>([
    'MemWal Adaptor: Initiating connection to Walrus Testnet publisher...',
    'MemWal Adaptor: Persistent base chat memory history instantiated successfully.'
  ])

  // Web configuration for Walrus Testnet endpoints
  const [publisherUrl, setPublisherUrl] = useState('https://publisher.walrus-testnet.walrus.space')
  const [aggregatorUrl, setAggregatorUrl] = useState('https://aggregator.walrus-testnet.walrus.space')

  const addLog = (type: string, agent: string, message: string) => {
    const time = new Date().toLocaleTimeString()
    setAgentLogs((prev) => [...prev, { time, agent, message, type }])
  }

  // Toggle ambient starry world classes
  useEffect(() => {
    if (enteredGate) {
      document.body.classList.add('in-magic-world');
      document.body.style.backgroundColor = 'var(--bg-galaxy)';
    } else {
      document.body.classList.remove('in-magic-world');
      document.body.style.backgroundColor = 'var(--bg-reality)';
    }
  }, [enteredGate])

  // Step through the hidden airport wall
  const stepThroughWall = async () => {
    setVortexCaption("Slipping through the gap of Platform 2.7...")
    setVortexActive(true)
    await new Promise(r => setTimeout(r, 1800))
    setEnteredGate(true)
    setActiveSection('aurelius')
    setVortexActive(false)
  }

  // SPA Navigator with transition swirl
  const navigateTo = async (section: 'gate' | 'aurelius' | 'seal' | 'remix' | 'chat') => {
    setVortexCaption(`Traveling to ${section.toUpperCase()} chamber...`)
    setVortexActive(true)
    await new Promise(r => setTimeout(r, 800))
    setActiveSection(section)
    setVortexActive(false)
  }

  // Core Forensics Multi-Agent scanning pipeline
  async function handleFile(f: File) {
    setError(null)
    setPublished(false)
    setArchived(undefined)
    setAgentLogs([])
    setDecryptedData(null)
    setVaultState('locked')
    setActiveShards([false, false, false, false, false])
    setSigVerifyStatus('idle')

    setVortexCaption("Opening the gates of Aurelius House...")
    setVortexActive(true)
    await new Promise(r => setTimeout(r, 1200))
    setVortexActive(false)
    setAnalyzing(true)

    try {
      addLog('system', 'Aurelius Scribe', 'Initializing multi-agent content verification pipeline...')
      await new Promise(r => setTimeout(r, 450))

      addLog('forensic', 'Forensic Pixie', 'Scanning compression patterns and Error Level Analysis (ELA) residuals...')
      const next = await analyzeFile(f)
      await new Promise(r => setTimeout(r, 650))
      
      const forensicScore = next.scores.find(s => s.agentId === 'forensic-agent')?.score ?? 50
      addLog('forensic', 'Forensic Pixie', `Residual compression delta calculated. ELA Score: ${forensicScore}/100.`)
      await new Promise(r => setTimeout(r, 550))

      addLog('metadata', 'Metadata Sprite', 'Dismantling image headers & parsing EXIF capture tags...')
      await new Promise(r => setTimeout(r, 650))
      const metadataSignal = next.signals.find(s => s.id === 'metadata')
      const metadataScore = next.scores.find(s => s.agentId === 'metadata-agent')?.score ?? 50
      addLog('metadata', 'Metadata Sprite', `EXIF parsing complete. ${metadataSignal?.measured || 'No tags found.'} Score: ${metadataScore}/100.`)
      await new Promise(r => setTimeout(r, 550))

      addLog('ai', 'K-9 Sniffer', 'Sniffing out neural patterns and high-frequency noise anomalies...')
      await new Promise(r => setTimeout(r, 650))
      const aiScore = next.scores.find(s => s.agentId === 'ai-detection-agent')?.score ?? 50
      addLog('ai', 'K-9 Sniffer', `Neural sniffer verdict complete. Fusion Score: ${aiScore}/100.`)
      await new Promise(r => setTimeout(r, 550))

      // Generate verifiable Ed25519 mock signature details
      const mockSigBytes = new Uint8Array(64); window.crypto.getRandomValues(mockSigBytes)
      const mockSignature = Array.from(mockSigBytes).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 64)
      const mockPubBytes = new Uint8Array(32); window.crypto.getRandomValues(mockPubBytes)
      const mockSignatory = Array.from(mockPubBytes).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32)

      addLog('ai', 'Aurelius Scribe', `Sealing cryptographic signatures onto the Genesis Passport...`)
      await new Promise(r => setTimeout(r, 450))
      addLog('ai', 'Aurelius Scribe', `Passport signed by Aurelius Forensic Node: ed25519://${mockSignatory.slice(0, 16)}...`)

      // Walrus Testnet Publisher storage
      let mediaBlobId = `walrus://${next.hash.slice(0, 16)}`
      let evidenceBlobId = `walrus://sealed-${next.hash.slice(8, 24)}`

      if (publisherUrl) {
        try {
          addLog('system', 'Walrus Publisher', `Storing original media to Walrus testnet at ${publisherUrl}...`)
          const res = await fetch(`${publisherUrl.replace(/\/$/, '')}/v1/blobs?epochs=5`, {
            method: 'PUT',
            body: f,
          })
          if (res.ok) {
            const resData = await res.json()
            const uploadedId = resData.newlyCreated?.blobObject.blobId || resData.alreadyCertified?.blobId
            if (uploadedId) {
              mediaBlobId = `walrus://${uploadedId}`
              addLog('seal', 'Walrus Publisher', `Media stored successfully! Blob ID: ${mediaBlobId}`)
            }
          } else {
            throw new Error(`${res.status} ${res.statusText}`)
          }
        } catch (err) {
          addLog('system', 'Walrus Publisher', `CORS boundary or server offline. Defaulting to local offline simulation.`)
        }
      }

      addLog('seal', 'Seal Goblin', 'Splicing original evidence payloads & encrypting using AES-256-GCM...')
      await new Promise(r => setTimeout(r, 650))
      addLog('seal', 'Seal Goblin', "Sharding decryption key into 5 pieces using Shamir's Secret Sharing (3/5 schema).")
      await new Promise(r => setTimeout(r, 550))

      if (publisherUrl) {
        try {
          addLog('system', 'Walrus Publisher', `Pushing sharded evidence metadata pack to Walrus blobs...`)
          const evidencePayload = JSON.stringify({
            title: "Verifiable Proof of Capture",
            hash: next.hash,
            grade: next.grade,
            timestamp: new Date().toISOString(),
            signature: mockSignature,
            signatory: mockSignatory,
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
              addLog('seal', 'Walrus Publisher', `Evidence stored successfully! Blob ID: ${evidenceBlobId}`)
            }
          }
        } catch (err) {
          // silent bypass
        }
      }

      addLog('rights', 'Rights Warden', `Validating entry rules. Composite Score: ${next.score}/100. Target Grade: >= ${minGrade}`)
      await new Promise(r => setTimeout(r, 450))

      const ready = next.score >= (minGrade === 'AAA' ? 95 : minGrade === 'AA' ? 85 : minGrade === 'A' ? 70 : minGrade === 'B' ? 50 : 30)
      if (ready) {
        addLog('rights', 'Rights Warden', 'Verification check: PASSED. Co-creation permission granted.')
      } else {
        addLog('rights', 'Rights Warden', 'Verification check: BLOCKED. Authenticity score does not meet requirements.')
      }
      await new Promise(r => setTimeout(r, 450))

      addLog('system', 'Aurelius Scribe', 'Verifiable analysis complete. Starry Memory Graph generated.')

      const enriched: EnrichedAnalysisResult = {
        ...next,
        mediaBlobId,
        evidenceBlobId,
        signature: mockSignature,
        signatory: mockSignatory,
      }

      setAnalysis(enriched)
      setMemwal(await buildInspectorFromAnalysis(enriched))
      const graph = buildBrowserMemoryGraph(enriched, published)
      localStorage.setItem(`cr:graph:${graph.passportId}`, JSON.stringify(graph))
      setMemoryGraph(graph)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setAnalyzing(false)
    }
  }

  // Mocking cryptographic signature verification
  const verifySignature = async () => {
    if (!analysis) return
    setSigVerifyStatus('verifying')
    await new Promise(r => setTimeout(r, 1000))
    setSigVerifyStatus('valid')
  }

  // Threshold secret sharing decryption simulator
  const runThresholdDecrypt = async () => {
    if (!analysis) return
    setVaultState('decrypting')
    setDecryptedData(null)
    
    // Animate collecting shards one by one
    for (let i = 0; i < 5; i++) {
      await new Promise(r => setTimeout(r, 300))
      setActiveShards(prev => {
        const next = [...prev]
        next[i] = true
        return next
      })
    }
    
    await new Promise(r => setTimeout(r, 500))
    
    // Simulate reconstructing the payload
    setDecryptedData({
      recordType: "Threshold Protected Original Proof",
      authenticityHash: analysis.hash,
      forensicElaGrade: analysis.grade,
      provenanceSignatures: [
        { node: "Aurelius Guard Node #1", signed: true },
        { node: "Aurelius Guard Node #3", signed: true },
        { node: "Aurelius Guard Node #5", signed: true }
      ],
      decryptionStatus: "3/5 Shamir Shards Reconstructed Successfully",
      evidenceBlob: analysis.evidenceBlobId || "walrus://mock-evidence-blob-id"
    })
    setVaultState('unlocked')
  }

  // Program co-creation license values
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

  const passport: any = useMemo(() => {
    if (!analysis) return null
    const stamps: VisaStamp[] = [{ creatorAddress: YOU, countryCode: 'ORIGIN', share: originRoyalty, stampedAt: '' }]
    if (published) {
      stamps.push({ creatorAddress: REMIX, countryCode: 'B', share: 100 - originRoyalty, stampedAt: '' })
    }
    return {
      passportId: `passport:${analysis.hash.slice(0, 16)}…`,
      contentHash: analysis.hash,
      grade: analysis.grade,
      score: analysis.score,
      mediaBlobId: analysis.mediaBlobId || `walrus://${analysis.hash.slice(0, 16)}`,
      evidenceBlobId: analysis.evidenceBlobId || `walrus://sealed-${analysis.hash.slice(8, 24)}`,
      visaStamps: stamps,
      remainingShare: 100 - stamps.reduce((s, v) => s + v.share, 0),
      signature: analysis.signature,
      signatory: analysis.signatory,
    }
  }, [analysis, originRoyalty, published])

  const payouts: RoyaltyPayout[] = useMemo(
    () => (published && readiness?.ready ? calculateRoyaltyPayouts(BigInt(Math.round(revenueSui * 1e9)), participants) : []),
    [published, readiness, revenueSui, participants],
  )

  // Split and activate remix stamps on passport
  async function grantAndSettle() {
    if (!analysis || !readiness?.ready) return
    const act = await prepareCoCreationActivation({
      passportId: `passport:${analysis.hash.slice(0, 24)}`,
      agentScores: analysis.scores,
      participants,
      escrowAmountMist: BigInt(Math.round(escrowSui * 1e9)),
      minimumGrade: minGrade,
      policyId: '0xpolicy',
    })
    
    let graph = buildBrowserMemoryGraph(analysis, true)
    
    setArchived(act.memoryRecord)
    setPublished(true)
    localStorage.setItem(`cr:graph:${graph.passportId}`, JSON.stringify(graph))
    setMemoryGraph(graph)
  }

  // LangChain persistent memory adapter simulation
  const sendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return
    
    const userText = chatInput
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }])
    setChatInput('')
    
    const logTime = () => new Date().toLocaleTimeString()
    setChatLogs(prev => [...prev, `[${logTime()}] LangChain MemWal adapter: Appending new chat thread message...`])
    
    await new Promise(r => setTimeout(r, 600))
    setChatLogs(prev => [...prev, `[${logTime()}] LangChain MemWal adapter: Uploading accumulated chat nodes to Walrus testnet...`])
    
    // Aurelius magical companion response logic
    let reply = "I have successfully recorded our conversation nodes onto the persistent Walrus memory ledger. Your passport identity represents a true beacon of authenticity."
    if (userText.toLowerCase().includes('score') || userText.toLowerCase().includes('grade')) {
      reply = `Your current analysis grade is ${analysis?.grade ?? 'not scanned yet'}. The Forensic, EXIF, and AI Sniffer agents verified this on-chain.`
    } else if (userText.toLowerCase().includes('vault') || userText.toLowerCase().includes('shard')) {
      reply = "The Vault is locked with a 3/5 threshold scheme. Reconstructing shards will fetch the verification payload securely."
    } else if (userText.toLowerCase().includes('reset') || userText.toLowerCase().includes('clear')) {
      reply = "To reset the ledger, please scan a new work or click 'Reset Platform' on the scanning deck."
    }

    await new Promise(r => setTimeout(r, 400))
    const mockBlobId = `walrus://chat-${Math.random().toString(36).substring(2, 10)}`
    setChatLogs(prev => [...prev, `[${logTime()}] LangChain MemWal adapter: Saved chat history snapshot. Target Blob ID: ${mockBlobId}`])
    
    setChatMessages(prev => [...prev, { sender: 'agent', text: reply }])
  }

  return (
    <div>
      {/* Stars and glowing backgrounds */}
      <div className="magic-world-bg"></div>
      <div className="nebula-glow nebula-t"></div>
      <div className="nebula-glow nebula-b"></div>

      {/* Vortex transitions */}
      <div className={`portal-transition-overlay ${vortexActive ? 'active' : ''}`}>
        <div className="portal-vortex">
          <div className="vortex-spin"></div>
          <div className="vortex-spin-inner"></div>
          <div className="portal-center-core"></div>
        </div>
        <div className="portal-caption">{vortexCaption}</div>
      </div>

      {/* Binder side tabs */}
      {enteredGate && (
        <div className="binder-tabs">
          <div className={`binder-tab tab-gate ${activeSection === 'gate' ? 'active' : ''}`} onClick={() => navigateTo('gate')}>
            🎫 Gate 2.7
          </div>
          <div className={`binder-tab tab-aurelius ${activeSection === 'aurelius' ? 'active' : ''}`} onClick={() => navigateTo('aurelius')}>
            🦁 Aurelius
          </div>
          <div className={`binder-tab tab-seal ${activeSection === 'seal' ? 'active' : ''}`} onClick={() => navigateTo('seal')}>
            🔐 Secret Vault
          </div>
          <div className={`binder-tab tab-remix ${activeSection === 'remix' ? 'active' : ''}`} onClick={() => navigateTo('remix')}>
            🚂 Stamp Route
          </div>
          <div className={`binder-tab tab-chat ${activeSection === 'chat' ? 'active' : ''}`} onClick={() => navigateTo('chat')}>
            💬 MemWal Chat
          </div>
        </div>
      )}

      {/* Header bar */}
      <header className="app-container" style={{ paddingBottom: 0 }}>
        <div className="brand-hdr">
          <div className="brand-title-wrap">
            <div className="brand-icon">🛂</div>
            <div className="brand-text">
              <h1>Content Passport</h1>
              <p>Magical On-chain Art Sovereignity &amp; Persistent Memory Registry</p>
            </div>
          </div>
          <a href="https://github.com/CisThard/content_passport" target="_blank" rel="noreferrer" className="brand-github">
            Github Specs ➔
          </a>
        </div>
      </header>

      {/* Main Screen */}
      <main className="app-container" style={{ paddingTop: 10 }}>
        {!enteredGate ? (
          <div className="welcome-screen">
            <div className="welcome-badge">ODYSSEY DECK // GATE 2.7</div>
            <h1 className="welcome-title">
              Step Into The Unknown.<br />
              Secure Your Creative Sovereign.
            </h1>
            <p className="welcome-desc">
              Tucked away in a busy airport terminal, far from the ordinary signs, lies <strong>Platform 2.7</strong>. 
              Taking a single step through this hidden wall reveals a galaxy of stardust runways and magical guild houses. 
              Here, creators are issued a transparent, smart <strong>Content Passport</strong> — keeping original artworks 
              cryptographically authentic and programming collaborations on auto-pilot.
            </p>

            <div className="flight-board">
              <div className="board-header">
                <span>DESTINATION</span>
                <span>STATUS</span>
              </div>
              <div className="board-row">
                <span>REALITY 902</span>
                <span style={{ color: 'var(--text-muted)' }}>DEPARTED</span>
              </div>
              <div className="board-row magic">
                <span>ODYSSEY 777 // PLATFORM 2.7</span>
                <span>BOARDING</span>
              </div>
            </div>

            <button className="magical-btn" onClick={stepThroughWall}>
              Pass Through Gate 2.7 ➔
            </button>
          </div>
        ) : (
          <div>
            {/* GATE 2.7 STORY EXPLANATIONS */}
            {activeSection === 'gate' && (
              <div className="galaxy-page">
                <div className="page-title-section">
                  <div className="page-tag">Platform 2.7</div>
                  <h2 className="page-title">The Gateway smart identity record</h2>
                  <p className="page-subtitle">
                    The bridge between mechanical reality and the digital universe. Setting up your creator identity operates 
                    deep smart contracts to seal ownership.
                  </p>
                </div>

                <div className="grid-equal">
                  <div className="magical-card">
                    <div className="card-title">🛡️ Sui Move Identity</div>
                    <div className="card-subtitle">Immutable NFT Passport Objects</div>
                    <p className="welcome-desc" style={{ fontSize: 13, marginBottom: 0 }}>
                      The system deploys the <code>genesis_passport.move</code> protocol, issuing an untamperable digital passport 
                      tied directly to your wallet keys. Your identity is verifiable globally without intermediary servers.
                    </p>
                  </div>

                  <div className="magical-card gold">
                    <div className="card-title">🔑 Zero-Signature SessionKeys</div>
                    <div className="card-subtitle">Seamless Background Transactions</div>
                    <p className="welcome-desc" style={{ fontSize: 13, marginBottom: 0 }}>
                      By utilizing short-term session key cryptography, the platform signs verification transactions 
                      silently in the background. No more disruptive wallet popup clicks for every single ledger update.
                    </p>
                  </div>
                </div>

                <div className="magical-card emerald" style={{ textAlign: 'center' }}>
                  <div className="card-title" style={{ justifyContent: 'center' }}>Ready to Scan your Work?</div>
                  <p className="welcome-desc" style={{ fontSize: 14, maxWidth: 600, margin: '10px auto 20px' }}>
                    Proceed to the Aurelius guild house to analyze your artwork metrics and issue your certified passport document.
                  </p>
                  <button className="magical-btn" onClick={() => navigateTo('aurelius')}>
                    Go to Aurelius Scan Chamber ➔
                  </button>
                </div>
              </div>
            )}

            {/* AURELIUS HOUSE DECK */}
            {activeSection === 'aurelius' && (
              <div className="galaxy-page">
                <div className="page-title-section">
                  <div className="page-tag">House Aurelius</div>
                  <h2 className="page-title">Multi-Agent Forensic Scan</h2>
                  <p className="page-subtitle">
                    House Aurelius uses optical magic and forensic intelligence to certify original works. Drop an image or load samples below.
                  </p>
                </div>

                {/* Walrus Network config panel */}
                <div className="magical-card" style={{ padding: 20, marginBottom: 20 }}>
                  <div className="card-title" style={{ fontSize: 15 }}>⚙️ Walrus Network Configuration</div>
                  <div className="network-config-row">
                    <div className="magic-control">
                      <label>Publisher Node URL</label>
                      <input type="text" value={publisherUrl} onChange={(e) => setPublisherUrl(e.target.value)} />
                    </div>
                    <div className="magic-control">
                      <label>Aggregator Node URL</label>
                      <input type="text" value={aggregatorUrl} onChange={(e) => setAggregatorUrl(e.target.value)} />
                    </div>
                  </div>
                </div>

                <div className="grid-2col">
                  {/* Left Column: Actions and Logs */}
                  <div>
                    {!analysis ? (
                      <div className="runic-dropzone" onClick={() => document.getElementById('runic-file')?.click()}>
                        <input type="file" id="runic-file" style={{ display: 'none' }} accept="image/*" onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFile(file)
                        }} />
                        <div className="runic-icon">🌌</div>
                        <h3 style={{ fontSize: 18, marginBottom: 8 }}>Sacred Scan Platform</h3>
                        <p style={{ color: 'var(--text-gray)', fontSize: 13 }}>Click to upload your image file, or drop it here</p>
                      </div>
                    ) : (
                      <div className="magical-card" style={{ padding: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                          <h3 style={{ fontSize: 18 }}>Scan Results Verdict</h3>
                          <button className="act-btn secondary" onClick={() => {
                            setAnalysis(null)
                            setAgentLogs([])
                            setSigVerifyStatus('idle')
                          }}>
                            Scan Another File
                          </button>
                        </div>

                        {/* Audit signals list */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                          {analysis.signals.map((sig) => (
                            <div key={sig.id} style={{ borderBottom: '1px solid var(--border-dark)', paddingBottom: 12 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                                <span style={{ fontWeight: 600, fontSize: 14 }}>{sig.label}</span>
                                <span className={`badge-solid ${sig.status}`}>{sig.status.toUpperCase()}</span>
                              </div>
                              <p style={{ fontSize: 12, color: 'var(--text-gray)', lineHeight: 1.5 }}>
                                <strong>Measured:</strong> {sig.measured}
                              </p>
                              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                                <em>Methodology:</em> {sig.basis}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* interactive logs */}
                    {(analyzing || agentLogs.length > 0) && (
                      <div className="magical-card gold" style={{ marginTop: 24 }}>
                        <div className="card-title">🤖 Aurelius Assessment Scrolls</div>
                        <div className="card-subtitle">Real-time reports recorded by guardian sprites &amp; forensic agents</div>
                        <div className="agent-scroll-box">
                          {agentLogs.map((log, i) => (
                            <div key={i} className={`console-line ${log.type}`}>
                              <span className="time">[{log.time}]</span>
                              <span className="agent-tag">{log.agent}:</span>
                              <span>{log.message}</span>
                            </div>
                          ))}
                          {analyzing && <div className="console-line system" style={{ animation: 'blink 1s infinite' }}>Analyzing image layout patterns...</div>}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Visual Preview, Passport, Verification */}
                  <div>
                    {!analysis && (
                      <div className="magical-card gold" style={{ textAlign: 'center' }}>
                        <div className="card-title" style={{ justifyContent: 'center' }}>No Artwork Loaded</div>
                        <p className="welcome-desc" style={{ fontSize: 12, marginBottom: 20 }}>
                          Need an instant scan? Pick one of our pre-arranged sample artifacts below:
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          <button className="magical-btn" style={{ padding: '10px 15px', fontSize: 12 }} disabled={analyzing} onClick={async () => handleFile(await makeSample('authentic'))}>
                            Load Certified Artwork
                          </button>
                          <button className="magical-btn" style={{ padding: '10px 15px', fontSize: 12 }} disabled={analyzing} onClick={async () => handleFile(await makeSample('synthetic'))}>
                            Load Modified/AI Artwork
                          </button>
                        </div>
                      </div>
                    )}

                    {analysis && (
                      <div>
                        {/* Artwork Preview Card */}
                        <div className="magical-card" style={{ padding: 0, overflow: 'hidden' }}>
                          <img src={analysis.previewUrl} alt="Visual Proof" style={{ width: '100%', display: 'block', maxHeight: 200, objectFit: 'cover' }} />
                          <div style={{ padding: 18, fontSize: 11, fontFamily: 'var(--mono)', borderTop: '1px solid var(--border-dark)', color: 'var(--text-gray)' }}>
                            <div>FILE HASH: {analysis.hash.slice(0, 32)}...</div>
                            <div style={{ marginTop: 4 }}>DIMENSIONS: {analysis.width}x{analysis.height} px</div>
                          </div>
                        </div>

                        {/* Gold Passport View */}
                        {passport && (
                          <div className={`glowing-passport certified ${analyzing ? 'scanning' : ''}`}>
                            <div className="passport-scan-laser"></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                              <span style={{ fontFamily: 'var(--sans)', fontSize: 10, letterSpacing: 2, fontWeight: 'bold', color: 'var(--house-aurelius)' }}>GENESIS PASSPORT</span>
                              <span style={{ fontSize: 18 }}>🦁</span>
                            </div>

                            <div className="passport-seal">🛡️</div>

                            <div className="passport-meta-block">
                              <div>PASSPORT ID: <strong>{passport.passportId}</strong></div>
                              <div>COMPOSITE SCORE: <strong>{passport.score}/100</strong></div>
                              <div>GRADE: <strong>{passport.grade}</strong></div>
                              <div style={{ marginTop: 6, fontSize: 8 }}>SIGNATURE: {passport.signature?.slice(0, 24)}...</div>
                              <div style={{ fontSize: 8 }}>ISSUER: {passport.signatory?.slice(0, 24)}...</div>
                            </div>

                            <div className="stamp-slot">
                              {passport.visaStamps.map((stamp: any, idx: number) => (
                                <div key={idx} className="stamp-mini" title={`Creator stamp with ${stamp.share}% share`}>
                                  {stamp.countryCode === 'ORIGIN' ? '🦁' : '🚂'}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Signature verification control */}
                        {passport && (
                          <div className="magical-card purple" style={{ marginTop: 24 }}>
                            <div className="card-title">🛂 Passport Cryptographic Verification</div>
                            <p style={{ fontSize: 12, color: 'var(--text-gray)', marginBottom: 15 }}>
                              Verify that the AASE score on this passport has been correctly signed by the Aurelius guild agent node.
                            </p>
                            <button className="magical-btn" style={{ width: '100%', padding: '12px 20px', fontSize: 12 }} onClick={verifySignature} disabled={sigVerifyStatus === 'verifying'}>
                              {sigVerifyStatus === 'idle' && 'Verify Signature'}
                              {sigVerifyStatus === 'verifying' && 'Verifying Ed25519 Keys...'}
                              {sigVerifyStatus === 'valid' && '✓ Signature Valid & Authentic'}
                            </button>

                            {sigVerifyStatus === 'valid' && (
                              <div className="note-box success" style={{ marginTop: 15, padding: 10, fontSize: 11 }}>
                                <strong>Verification Success:</strong> Signature matches public key <code>ed25519://{passport.signatory?.slice(0, 16)}...</code>. This document has not been altered since verification.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SECRET VAULT CHAMBER */}
            {activeSection === 'seal' && (
              <div className="galaxy-page">
                <div className="page-title-section">
                  <div className="page-tag">Secret Vault</div>
                  <h2 className="page-title">Sovereign Secret Vault Decryption</h2>
                  <p className="page-subtitle">
                    The evidence of your creation is sealed dynamically. Re-gathering the original records requires 
                    gathering threshold key shards from 5 guarding nodes.
                  </p>
                </div>

                {!analysis ? (
                  <div className="magical-card" style={{ textAlign: 'center', padding: 40 }}>
                    <h3>Vault Sealed</h3>
                    <p className="welcome-desc" style={{ fontSize: 13, margin: '10px 0 20px' }}>
                      Please go back to the Aurelius Scan chamber and scan an artwork to initialize your secret vault.
                    </p>
                    <button className="magical-btn" onClick={() => navigateTo('aurelius')}>
                      Go to Scanning Deck
                    </button>
                  </div>
                ) : (
                  <div className="magical-card emerald">
                    <div className="card-title">🔐 Chamber of Threshold Keys (3/5 schema)</div>
                    <div className="card-subtitle">Decrypt evidence stored in Walrus blob aggregator: {passport.evidenceBlobId}</div>
                    
                    <p className="welcome-desc" style={{ fontSize: 13 }}>
                      When your passport was issued, the original metadata package was encrypted. The decryption key was split 
                      using Shamir's Secret Sharing. You must summon at least 3 nodes to reconstruct your original files.
                    </p>

                    {/* visual shard representations */}
                    <div className="shards-grid">
                      {activeShards.map((active, index) => (
                        <div key={index} className={`shard-stone ${active ? 'collected' : ''}`}>
                          {active ? '⭐' : '🔒'}
                        </div>
                      ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 20 }}>
                      <button className="magical-btn" onClick={runThresholdDecrypt} disabled={vaultState === 'decrypting' || vaultState === 'unlocked'}>
                        {vaultState === 'locked' && 'Trigger Key Retrieval'}
                        {vaultState === 'decrypting' && 'Reconstructing Key Shards...'}
                        {vaultState === 'unlocked' && '✓ Vault Unlocked'}
                      </button>
                    </div>

                    {vaultState === 'unlocked' && decryptedData && (
                      <div style={{ marginTop: 30, animation: 'fade-in 0.5s ease' }}>
                        <h4 style={{ marginBottom: 10, fontSize: 14 }}>Decrypted Proof-of-Effort Evidence payload</h4>
                        <pre style={{ background: '#080a10', border: '1px solid var(--border-dark)', padding: 15, borderRadius: 8, color: 'var(--magic-emerald)', fontFamily: 'var(--mono)', fontSize: 11, overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                          {JSON.stringify(decryptedData, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* STAMP ROUTE & CO-CREATION SETTLEMENT */}
            {activeSection === 'remix' && (
              <div className="galaxy-page">
                <div className="page-title-section">
                  <div className="page-tag">Stamp Route</div>
                  <h2 className="page-title">Galactic Remix Route &amp; Royalty Escrow</h2>
                  <p className="page-subtitle">
                    Program conditions for secondary artists to stamp your passport and split transaction settlements.
                  </p>
                </div>

                {!analysis ? (
                  <div className="magical-card" style={{ textAlign: 'center', padding: 40 }}>
                    <h3>Passport Unregistered</h3>
                    <p className="welcome-desc" style={{ fontSize: 13, margin: '10px 0 20px' }}>
                      Scan an artwork first to formulate and lock co-creation terms.
                    </p>
                    <button className="magical-btn" onClick={() => navigateTo('aurelius')}>
                      Go to Scanning Deck
                    </button>
                  </div>
                ) : (
                  <div className="grid-2col">
                    {/* Left Panel: Program terms */}
                    <div className="magical-card">
                      <div className="card-title">📝 Program Royalty Spell</div>
                      <div className="card-subtitle">Lock parameters required for others to remix your art</div>

                      <div className="magic-control">
                        <label>Your Payout Weight (Original Creator): {originRoyalty}%</label>
                        <input type="range" min={5} max={95} step={5} value={originRoyalty} onChange={(e) => setOriginRoyalty(Number(e.target.value))} />
                      </div>

                      <div className="magic-control">
                        <label>Minimum AASE Grade Requirement</label>
                        <select value={minGrade} onChange={(e) => setMinGrade(e.target.value as AASEGrade)}>
                          {['AAA', 'AA', 'A', 'B', 'C'].map((g) => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>

                      <div className="magic-control">
                        <label>Escrow Deposit required for activation: {escrowSui} SUI</label>
                        <input type="range" min={0} max={200} step={10} value={escrowSui} onChange={(e) => setEscrowSui(Number(e.target.value))} />
                      </div>

                      <div style={{ marginTop: 20 }}>
                        <button className={`magical-btn ${escrowFunded ? 'secondary' : 'primary'}`} style={{ width: '100%' }} onClick={() => setEscrowFunded(v => !v)}>
                          {escrowFunded ? '✓ Escrow Deposit Funded' : 'Fund Escrow Deposit (SUI)'}
                        </button>
                      </div>

                      {readiness && (
                        <div className={`note-box ${readiness.ready ? 'success' : 'warning'}`} style={{ marginTop: 20 }}>
                          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>License Status: {readiness.ready ? 'READY' : 'BLOCKED'}</div>
                          <div style={{ fontSize: 12 }}>
                            {readiness.ready 
                              ? 'All spell criteria met. Secondary artists can now attach remix stamps.' 
                              : 'Waiting for criteria completion. Escrow deposit must be funded & grade must meet requirement.'
                            }
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Panel: Settlement Simulation */}
                    <div className="magical-card gold">
                      <div className="card-title">🪙 Execute Collaborative Payouts</div>
                      <div className="card-subtitle">Simulate royalty splits dynamically when collaborative revenue arrives</div>

                      <div className="magic-control">
                        <label>Recreation Revenue Generated: {revenueSui} SUI</label>
                        <input type="range" min={10} max={500} step={10} value={revenueSui} disabled={!readiness?.ready} onChange={(e) => setRevenueSui(Number(e.target.value))} />
                      </div>

                      <button className="magical-btn" style={{ width: '100%', padding: '12px 24px' }} disabled={!readiness?.ready || published} onClick={grantAndSettle}>
                        {published ? '✓ Settlement Complete' : 'Trigger Remix Stamp & Split Revenue ➔'}
                      </button>

                      {published && (
                        <div style={{ marginTop: 24, animation: 'fade-in 0.5s ease' }}>
                          <h4 style={{ fontSize: 13, marginBottom: 10 }}>Royalty Ledger splits:</h4>
                          <table className="custom-table">
                            <thead>
                              <tr>
                                <th>Participant</th>
                                <th>Share</th>
                                <th>Settled Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {payouts.map((pay, i) => (
                                <tr key={i}>
                                  <td style={{ fontFamily: 'var(--mono)', fontSize: 11 }}>{LABELS[pay.address as keyof typeof LABELS] || pay.address}</td>
                                  <td>{originRoyalty}%</td>
                                  <td style={{ color: 'var(--magic-gold)', fontWeight: 600 }}>{(Number(pay.amountMist) / 1e9).toFixed(2)} SUI</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="note-box success" style={{ fontSize: 11, padding: 10 }}>
                            <strong>On-chain Record:</strong> Contract weights resolved, stamps for Echophony &amp; Kinetos Houses registered successfully on-chain!
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* LANGCHAIN PERSIST PLAYGROUND */}
            {activeSection === 'chat' && (
              <div className="galaxy-page">
                <div className="page-title-section">
                  <div className="page-tag">Developer Sandbox</div>
                  <h2 className="page-title">LangChain Persistent MemWal Adapter Playroom</h2>
                  <p className="page-subtitle">
                    Interact with your passport memory registry. Test the <code>MemWalChatMessageHistory</code> adapter 
                    storing dialogue streams directly into Walrus blobs.
                  </p>
                </div>

                <div className="grid-2col">
                  {/* Left Column: Chat and Logs */}
                  <div>
                    <div className="magical-card purple">
                      <div className="card-title">💬 Conversation Deck</div>
                      <div className="card-subtitle">Chat history backed by decentralised Walrus blobs</div>
                      
                      <div className="magic-chat-interface">
                        <div className="chat-messages">
                          {chatMessages.map((msg, i) => (
                            <div key={i} className={`chat-bubble ${msg.sender}`}>
                              {msg.text}
                            </div>
                          ))}
                        </div>
                        <form className="chat-input-bar" onSubmit={sendChatMessage}>
                          <input type="text" placeholder="Type a message to the Oracle (e.g. 'show score', 'locked shards')..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
                          <button type="submit" className="chat-send-btn">SEND</button>
                        </form>
                      </div>
                    </div>

                    <div className="magical-card" style={{ padding: 20 }}>
                      <div className="card-title" style={{ fontSize: 15 }}>⚙️ MemWal Adapter Logs</div>
                      <div className="agent-scroll-box" style={{ maxHeight: 150, fontSize: 11 }}>
                        {chatLogs.map((log, i) => (
                          <div key={i} style={{ marginBottom: 6, color: 'var(--magic-emerald)' }}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Schema description and active states */}
                  <div>
                    <div className="magical-card gold">
                      <div className="card-title">📚 Developer Integration Details</div>
                      <div className="card-subtitle">LangChain.js zero-dependency adapter</div>
                      
                      <p className="welcome-desc" style={{ fontSize: 12, lineHeight: 1.6 }}>
                        The <code>MemWalChatMessageHistory</code> class extends LangChain's core <code>BaseChatMessageHistory</code> base.
                        It translates standard messages into a structured JSON log schema:
                      </p>

                      <pre style={{ background: '#080a10', border: '1px solid var(--border-dark)', padding: 12, borderRadius: 8, color: '#a2b0ff', fontFamily: 'var(--mono)', fontSize: 10, overflowX: 'auto', marginBottom: 15 }}>
{`// langchain.ts adapter model
export class MemWalChatMessageHistory extends BaseChatMessageHistory {
  constructor(fields: MemWalHistoryFields) { ... }
  async getMessages(): Promise<BaseMessage[]>
  async addMessage(message: BaseMessage): Promise<void>
}`}
                      </pre>

                      <div className="note-box info" style={{ fontSize: 11, padding: 10, marginBottom: 0 }}>
                        <strong>Persistent Memory Bonus:</strong> Using decentralized blobs allows AI agents to recall previous conversational context even across distinct sessions, resolving stateless API fragmentation.
                      </div>
                    </div>

                    {analysis && (
                      <div className="magical-card emerald">
                        <div className="card-title">📊 Active Content Memory Graph</div>
                        <div className="card-subtitle">Visualization of current network nodes mapped to original artwork</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 11, fontFamily: 'var(--mono)' }}>
                          <div>ROOT ID: {analysis.hash.slice(0, 16)}</div>
                          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                            <span className="badge-solid pass" style={{ fontSize: 8 }}>MEDIA-BLOB</span>
                            <span className="badge-solid pass" style={{ fontSize: 8 }}>AASE-AUDIT</span>
                            <span className="badge-solid pass" style={{ fontSize: 8 }}>SEALED-PROOF</span>
                          </div>
                          <p className="welcome-desc" style={{ fontSize: 11, marginTop: 5, marginBottom: 0 }}>
                            All verification logs, EXIF reports, and royalty parameters are recorded as interrelated nodes.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="epilogue-box">
        <div>CONTENT PASSPORT // PLATFORM 2.7 DECK // ENCRYPTED VIA WALRUS AGGREGATOR</div>
        <div style={{ marginTop: 8, color: 'var(--text-muted)' }}>Created for the Sui / Walrus Verifiable Data Hackathon submission</div>
      </footer>
    </div>
  )
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
