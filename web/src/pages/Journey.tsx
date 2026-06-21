import { Link } from 'react-router-dom'
import { buildInspectorArtifacts, buildJourneyNodes, readLastVerification } from '../lib/judgeMode'
import { readOnchainState, shortId } from '../lib/suiNetwork'

const AGENTS = [
  {
    name: 'Forensic Agent',
    memory: 'Writes ELA, DCT pHash, and frequency artifact clues.',
    trigger: 'Upload image in Forensics Lab',
  },
  {
    name: 'Provenance Agent',
    memory: 'Adds EXIF/C2PA evidence to the same verification packet.',
    trigger: 'Runs inside SSE verification',
  },
  {
    name: 'Memory Agent',
    memory: 'Recalls prior MemWal clues to flag near-duplicate or derivative content.',
    trigger: 'Compares pHash and clue history',
  },
  {
    name: 'Rights Agent',
    memory: 'Turns AASE grade + content hash into a GenesisPassport mint.',
    trigger: 'Wallet-signed Sui PTB',
  },
  {
    name: 'Settlement Agent',
    memory: 'Creates funded CoCreationPolicy and triggers royalty distribution.',
    trigger: 'Blueprint live control panel',
  },
  {
    name: 'Archivist Agent',
    memory: 'Stores media/report artifacts on Walrus for portable recovery.',
    trigger: 'Walrus archive step',
  },
]

const METHOD_ROWS = [
  ['ELA pixel residual', 'Recompress image and measure pixel delta', 'Transparent manipulation signal, not a final verdict'],
  ['EXIF / C2PA provenance', 'Read capture metadata and Content Credentials', 'Rewards signed provenance and penalizes missing/inconsistent capture context'],
  ['DCT pHash', 'Resize, grayscale, DCT, median-threshold low-frequency coefficients', '0-8 near duplicate, 9-16 likely derivative, 17+ distinct candidate'],
  ['Frequency artifact score', 'High-frequency DCT energy + directional grid anisotropy', 'Objective synthetic/compression feature for AASE context'],
  ['MemWal memory', 'Persist agent clues across sessions and tools', 'Converts one-off verification into long-running agent memory'],
  ['Sui PTB evidence', 'Wallet-signed Passport, policy, and settlement transactions', 'Makes the demo inspectable through Suiscan digests'],
]

export default function Journey() {
  const nodes = buildJourneyNodes()
  const artifacts = buildInspectorArtifacts()
  const verification = readLastVerification()
  const onchain = readOnchainState()
  const completed = nodes.filter((node) => node.status === 'ready').length

  return (
    <div className="dashboard-container" style={{ maxWidth: '1220px', display: 'flex', flexDirection: 'column', gap: '38px' }}>
      <section className="judge-hero">
        <div>
          <span className="header-badge badge-gold">Judge Mode</span>
          <h2 className="cyber-title" style={{ marginTop: '12px' }}>Passport Journey Graph</h2>
          <p className="cyber-subtitle" style={{ marginTop: '10px', maxWidth: '760px' }}>
            One inspectable path from streamed agent verification to Walrus artifacts, MemWal memory, Sui passport issuance, escrow policy creation, and royalty settlement.
          </p>
        </div>
        <div className="judge-score">
          <span>{completed}/6</span>
          <small>proof stages ready</small>
        </div>
      </section>

      <section className="journey-graph">
        {nodes.map((node, index) => (
          <div key={node.id} className={`journey-node ${node.status}`}>
            <div className="journey-node-index">{index + 1}</div>
            <div>
              <div className="journey-node-head">
                <strong>{node.label}</strong>
                <span>{node.status.toUpperCase()}</span>
              </div>
              <p>{node.detail}</p>
              <div className="journey-node-meta">
                <span>{node.agent}</span>
                {node.proof && <code>{node.proof}</code>}
              </div>
              {node.href && (
                node.href.startsWith('http') ? (
                  <a href={node.href} target="_blank" rel="noreferrer">Open proof</a>
                ) : (
                  <Link to={node.href}>Open step</Link>
                )
              )}
            </div>
          </div>
        ))}
      </section>

      <section className="grid-layout-2" style={{ alignItems: 'stretch' }}>
        <div className="cyber-card">
          <span className="header-badge">Walrus Artifact Inspector</span>
          <h3 className="card-title" style={{ marginTop: '14px' }}>Portable Evidence Packets</h3>
          <p className="card-subtitle">
            Shows what can be recovered without app-local state: Walrus blobs, MemWal clues, and Sui transaction proofs.
          </p>
          <div className="artifact-list">
            {artifacts.length ? artifacts.map((artifact, index) => (
              <div key={`${artifact.kind}-${artifact.location}-${index}`} className="artifact-row">
                <div>
                  <span>{artifact.kind}</span>
                  <strong>{artifact.name}</strong>
                  <code>{shortId(artifact.location, 16, 10)}</code>
                </div>
                <div>
                  <small>{artifact.source}</small>
                  {artifact.size && <small>{(artifact.size / 1024).toFixed(1)} KB</small>}
                  {artifact.href && <a href={artifact.href} target="_blank" rel="noreferrer">Inspect</a>}
                </div>
              </div>
            )) : (
              <div className="empty-panel">Run a streamed verification first. Walrus artifacts and memory clues will appear here.</div>
            )}
          </div>
        </div>

        <div className="cyber-card">
          <span className="header-badge badge-emerald">Memory-First Agents</span>
          <h3 className="card-title" style={{ marginTop: '14px' }}>Long-running Context</h3>
          <p className="card-subtitle">
            Each agent reads prior state, reasons over it, writes back a durable clue, then triggers the next workflow step.
          </p>
          <div className="agent-grid">
            {AGENTS.map((agent) => (
              <div key={agent.name} className="linear-card-recessed agent-tile">
                <strong>{agent.name}</strong>
                <p>{agent.memory}</p>
                <span>{agent.trigger}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid-layout-2" style={{ alignItems: 'stretch' }}>
        <div className="cyber-card">
          <span className="header-badge badge-rose">60-second Judge Run</span>
          <h3 className="card-title" style={{ marginTop: '14px' }}>Demo Script</h3>
          <div className="judge-actions">
            <Link to="/verify" className="cyber-btn cyber-btn-indigo">1. Run streamed verification</Link>
            <Link to="/register" className="cyber-btn cyber-btn-indigo">2. Mint GenesisPassport</Link>
            <Link to="/blueprint" className="cyber-btn cyber-btn-indigo">3. Create policy + settle</Link>
            <Link to="/vault" className="cyber-btn cyber-btn-emerald">4. Show SEAL vault</Link>
          </div>
          <div className="linear-card-recessed" style={{ padding: '14px', marginTop: '18px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>CURRENT PROOF SUMMARY</div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '8px' }}>
              Verification: {verification?.assessment?.grade || 'not run'} · Passport tx: {onchain.passportTxDigest ? shortId(onchain.passportTxDigest, 10, 8) : 'missing'} · Policy tx: {onchain.policyTxDigest ? shortId(onchain.policyTxDigest, 10, 8) : 'missing'}
            </p>
          </div>
        </div>

        <div className="cyber-card">
          <span className="header-badge badge-emerald">SEAL Privacy UX</span>
          <h3 className="card-title" style={{ marginTop: '14px' }}>Public Blob, Private Draft</h3>
          <div className="privacy-flow">
            <div><strong>1</strong><span>Raw proof package encrypted in browser</span></div>
            <div><strong>2</strong><span>Ciphertext stored on Walrus; blob remains portable</span></div>
            <div><strong>3</strong><span>SEAL policy/session approval gates decrypt capability</span></div>
            <div><strong>4</strong><span>Settlement can unlock the draft without exposing key material</span></div>
          </div>
          <Link to="/vault" className="cyber-btn cyber-btn-emerald" style={{ marginTop: '18px' }}>Open vault flow</Link>
        </div>
      </section>

      <section className="cyber-card">
        <span className="header-badge">Methodology</span>
        <h3 className="card-title" style={{ marginTop: '14px' }}>Explainable Scoring, Not Magic Numbers</h3>
        <div className="method-table">
          {METHOD_ROWS.map(([signal, method, reason]) => (
            <div key={signal} className="method-row">
              <strong>{signal}</strong>
              <span>{method}</span>
              <p>{reason}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
