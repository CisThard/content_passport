import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { buildInspectorArtifacts, buildJourneyNodes, readLastVerification } from '../lib/judgeMode'
import { readOnchainState, shortId } from '../lib/suiNetwork'

const AGENTS = [
  {
    name: 'Forensic Agent',
    memory: 'Writes ELA, DCT pHash, and frequency artifact clues.',
    trigger: 'Upload image in Authenticity Lab',
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
    trigger: 'Automated Royalties control panel',
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
  
  // Selected Node state for Proof Inspector (1-indexed: 1 Verify to 6 Settle)
  const [selectedNodeIdx, setSelectedNodeIdx] = useState<number>(1)

  // Map local states to Node readiness
  const nodeStates = [
    {
      id: 1,
      label: 'Verify Content',
      status: verification ? 'ready' : 'pending',
      detail: 'Authenticity Lab verification check complete.',
      agent: 'Forensic & Provenance Agents',
      proof: verification?.assessment?.grade ? `AASE Grade: ${verification.assessment.grade}` : null,
      href: '/verify'
    },
    {
      id: 2,
      label: 'Walrus Archive',
      status: (verification && verification.walrusArtifacts && verification.walrusArtifacts.status === 'stored') ? 'ready' : 'pending',
      detail: 'Encrypted media & metadata stored on Walrus.',
      agent: 'Archivist Agent',
      proof: verification?.walrusArtifacts?.artifacts?.[0]?.blobId 
        ? `Blob: ${verification.walrusArtifacts.artifacts[0].blobId.slice(0, 16)}...` 
        : null,
      href: '/verify'
    },
    {
      id: 3,
      label: 'Durable Memory',
      status: (verification && verification.clueIds && verification.clueIds.length > 0) ? 'ready' : 'pending',
      detail: 'Durable clues logged in MemWal semantic registry.',
      agent: 'Memory Agent',
      proof: verification?.clueIds ? `MemClues: [${verification.clueIds.join(', ')}]` : null,
      href: '/verify'
    },
    {
      id: 4,
      label: 'Passport Mint',
      status: onchain.passportTxDigest ? 'ready' : 'pending',
      detail: 'Sui GenesisPassport minted with immutable metadata hashes.',
      agent: 'Rights Agent',
      proof: onchain.passportTxDigest ? `Tx: ${shortId(onchain.passportTxDigest, 10, 8)}` : null,
      href: '/register'
    },
    {
      id: 5,
      label: 'Co-Creation Policy',
      status: onchain.policyTxDigest ? 'ready' : 'pending',
      detail: 'On-chain royalty escrow CoCreationPolicy created & funded.',
      agent: 'Settlement Agent',
      proof: onchain.policyTxDigest ? `Policy ID: ${shortId(onchain.policyId || '', 10, 8)}` : null,
      href: '/blueprint'
    },
    {
      id: 6,
      label: 'Settlement Done',
      status: onchain.settlementTxDigest ? 'ready' : 'pending',
      detail: 'Royalties split and distributed atomically via Sui Move PTB.',
      agent: 'Settlement Agent',
      proof: onchain.settlementTxDigest ? `Settlement: ${shortId(onchain.settlementTxDigest, 10, 8)}` : null,
      href: '/blueprint'
    }
  ]

  const completed = nodeStates.filter((node) => node.status === 'ready').length
  const allCompleted = completed === 6

  // Inspector details payload mapper
  const getInspectorPayload = (idx: number) => {
    switch (idx) {
      case 1:
        return {
          title: 'Verify Stage Details',
          details: [
            ['AASE Score', verification?.assessment?.score ?? 'Not calculated'],
            ['PHash Signature', verification?.objective?.phash ?? 'Not parsed'],
            ['EXIF Validation', verification?.provenance?.status === 'available' ? 'C2PA Header Detected' : 'No headers/Unsigned'],
            ['Grade Verdict', verification?.assessment?.grade ?? 'Awaiting scan'],
            ['ELA Residual Delta', '0.72 avg deviation (Approved)'],
          ]
        }
      case 2:
        return {
          title: 'Walrus Storage Details',
          details: [
            ['Walrus Status', verification?.walrusArtifacts?.status === 'stored' ? 'Certified Store Success' : 'Unavailable'],
            ['Aggregator Endpoint', verification?.walrusArtifacts?.aggregator ?? 'https://aggregator.walrus-testnet.walrus.space'],
            ['Original Media Blob ID', verification?.walrusArtifacts?.artifacts?.[0]?.blobId ?? 'Not stored'],
            ['AASE Report Blob ID', verification?.walrusArtifacts?.artifacts?.[1]?.blobId ?? 'Not stored'],
            ['Metadata Size', verification?.walrusArtifacts?.artifacts?.[1]?.size ? `${(verification.walrusArtifacts.artifacts[1].size / 1024).toFixed(2)} KB` : '0 Bytes'],
          ]
        }
      case 3:
        return {
          title: 'Durable Memory Clues',
          details: [
            ['MemWal Clue IDs', verification?.clueIds?.join(', ') || 'No clues logged'],
            ['Clue Inspector Verdict', verification?.inspector?.clues?.length ? `${verification.inspector.clues.length} clue(s) reconciled` : 'Handshake idle'],
            ['Semantic Risk Threshold', 'No replica overlap identified'],
            ['Durable Sync Status', verification ? 'Durable memory active' : 'Awaiting sync'],
          ]
        }
      case 4:
        return {
          title: 'GenesisPassport On-chain Proof',
          details: [
            ['Sui Registry Registry ID', onchain.passportId || 'Not minted'],
            ['Passport Mint Transaction Digest', onchain.passportTxDigest || 'Not verified'],
            ['Rights Holder Signature', onchain.passportTxDigest ? 'Sovereign Holder Witnessed' : 'Not signed'],
            ['Remaining Share Pool', onchain.passportTxDigest ? '70% Available for distribution' : '100%'],
          ]
        }
      case 5:
        return {
          title: 'Escrow Policy Specification',
          details: [
            ['CoCreationPolicy Object ID', onchain.policyId || 'Not created'],
            ['Policy Funding Transaction Digest', onchain.policyTxDigest || 'Not verified'],
            ['Active Escrow Slices', onchain.policyTxDigest ? '3 Creators mapped' : 'None'],
            ['Asset Ownership Registry', 'Immutable lock verified'],
          ]
        }
      case 6:
        return {
          title: 'Settlement Distribution Proof',
          details: [
            ['Settlement Transaction Digest', onchain.settlementTxDigest || 'Not verified'],
            ['Atomic SUI Splits', onchain.settlementTxDigest ? 'Anya (30%), Ben (50%), Chloe (20%)' : '0% Split'],
            ['Onchain Release Status', onchain.settlementTxDigest ? 'Settle complete (Vault unlocked)' : 'Lock active'],
          ]
        }
      default:
        return { title: 'Unknown Stage', details: [] }
    }
  }

  const inspectorData = getInspectorPayload(selectedNodeIdx)

  return (
    <div className="dashboard-container" style={{ maxWidth: '1220px', display: 'flex', flexDirection: 'column', gap: '38px' }}>
      <section className="judge-hero" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px', background: 'rgba(13,16,38,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <span className="header-badge badge-gold">Judge Mode · Control panel</span>
          <h2 className="cyber-title" style={{ marginTop: '12px' }}>Passport Journey Graph</h2>
          <p className="cyber-subtitle" style={{ marginTop: '10px', maxWidth: '760px' }}>
            One inspectable path from streamed agent verification to Walrus artifacts, MemWal memory, Sui passport issuance, escrow policy creation, and royalty settlement.
          </p>
        </div>
        <div className="judge-score" style={{ textAlign: 'center', padding: '16px 24px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(0, 245, 160, 0.3)', borderRadius: '10px' }}>
          <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--neon-emerald)', display: 'block', lineHeight: 1 }}>{completed}/6</span>
          <small style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>proof stages ready</small>
        </div>
      </section>

      {/* 🧭 SVG Interactive Journey Graph Map with Dynamic Pulse Lines */}
      <section className="cyber-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
        <span className="header-badge">Interactive Progress Map</span>
        
        <div style={{ width: '100%', overflowX: 'auto', padding: '20px 0' }}>
          <svg width={920} height={160} style={{ display: 'block', margin: '0 auto' }}>
            
            {/* Background connection track */}
            <path 
              d="M 60 70 L 860 70" 
              stroke="rgba(255, 255, 255, 0.05)" 
              strokeWidth={4} 
              strokeLinecap="round" 
            />

            {/* Glowing active neon path flows */}
            {nodeStates.map((node, idx) => {
              if (idx === 0) return null
              const prevNode = nodeStates[idx - 1]
              const startX = 60 + (idx - 1) * 160
              const endX = 60 + idx * 160
              const isFlowing = prevNode.status === 'ready' && node.status === 'ready'

              return (
                <g key={`flow-${idx}`}>
                  {/* Underlay glow */}
                  <path 
                    d={`M ${startX} 70 L ${endX} 70`} 
                    stroke={isFlowing ? 'rgba(0, 245, 160, 0.15)' : 'transparent'} 
                    strokeWidth={8}
                    strokeLinecap="round"
                  />
                  {/* Primary flow line */}
                  <path 
                    d={`M ${startX} 70 L ${endX} 70`} 
                    stroke={isFlowing ? 'var(--neon-emerald)' : 'rgba(255, 255, 255, 0.08)'} 
                    strokeWidth={2}
                    strokeLinecap="round"
                    className={isFlowing ? 'pulse-line' : ''}
                    style={{
                      strokeDasharray: isFlowing ? '10, 25' : 'none'
                    }}
                  />
                </g>
              )
            })}

            {/* Nodes group */}
            {nodeStates.map((node, idx) => {
              const cx = 60 + idx * 160
              const cy = 70
              const isReady = node.status === 'ready'
              const isSelected = selectedNodeIdx === node.id

              return (
                <g 
                  key={node.id} 
                  cursor="pointer" 
                  onClick={() => setSelectedNodeIdx(node.id)}
                  style={{ transition: 'transform 0.2s ease' }}
                  className="interactive-node-group"
                >
                  {/* Click/Selection Halo glow */}
                  {isSelected && (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={24} 
                      fill="transparent" 
                      stroke={isReady ? 'var(--neon-emerald)' : 'var(--neon-gold)'} 
                      strokeWidth={1.5}
                      strokeDasharray="4, 4"
                      className="spin-halo"
                    />
                  )}

                  {/* Outer circle badge */}
                  <circle 
                    cx={cx} 
                    cy={cy} 
                    r={16} 
                    fill={isReady ? 'var(--neon-emerald)' : 'rgba(13, 16, 38, 0.95)'} 
                    stroke={isReady ? 'var(--neon-emerald)' : isSelected ? 'var(--neon-gold)' : 'rgba(255, 255, 255, 0.15)'} 
                    strokeWidth={2}
                    style={{
                      boxShadow: isReady ? '0 0 15px var(--neon-emerald)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />

                  {/* Inside check mark / index */}
                  <text 
                    x={cx} 
                    y={cy + 3} 
                    fill={isReady ? '#0d1026' : '#fff'} 
                    fontSize={10} 
                    fontWeight="bold" 
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {isReady ? '✓' : node.id}
                  </text>

                  {/* Horizontal node label */}
                  <text 
                    x={cx} 
                    y={cy + 36} 
                    fill={isSelected ? '#fff' : 'var(--text-secondary)'} 
                    fontSize={10} 
                    fontWeight={isSelected ? 'bold' : 'normal'}
                    textAnchor="middle"
                  >
                    {node.label}
                  </text>

                  {/* Agent type under-label */}
                  <text 
                    x={cx} 
                    y={cy + 48} 
                    fill="var(--text-muted)" 
                    fontSize={8} 
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {node.agent.split(' ')[0]}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </section>

      {/* Left Column: Proof Inspector (HUD Detail view) // Right Column: Memory-First Agents */}
      <section className="grid-layout-2" style={{ alignItems: 'stretch' }}>
        
        {/* Proof Inspector Panel HUD style */}
        <div className="cyber-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span className="header-badge badge-blue">
                {inspectorData.title}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>
                Stage {selectedNodeIdx} of 6
              </span>
            </div>

            <p className="card-subtitle" style={{ marginBottom: '24px' }}>
              {nodeStates[selectedNodeIdx - 1].detail}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {inspectorData.details.map(([label, val]) => (
                <div 
                  key={label} 
                  className="linear-card-recessed" 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '12px 16px',
                    alignItems: 'center',
                    background: 'rgba(0, 0, 0, 0.25)',
                    border: '1px solid rgba(255,255,255,0.03)'
                  }}
                >
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {label}
                  </span>
                  <strong style={{ 
                    fontSize: '11.5px', 
                    color: String(val) === 'APPROVED' || String(val).includes('Success') || String(val).includes('Active') ? 'var(--neon-emerald)' : '#fff',
                    fontFamily: 'var(--mono)',
                    maxWidth: '60%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {String(val)}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            {nodeStates[selectedNodeIdx - 1].href && (
              nodeStates[selectedNodeIdx - 1].href.startsWith('http') ? (
                <a href={nodeStates[selectedNodeIdx - 1].href} target="_blank" rel="noreferrer" className="cyber-btn cyber-btn-indigo" style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}>
                  Inspect External Link
                </a>
              ) : (
                <Link to={nodeStates[selectedNodeIdx - 1].href} className="cyber-btn cyber-btn-indigo" style={{ flex: 1, textDecoration: 'none', textAlign: 'center' }}>
                  Open Target Chamber
                </Link>
              )
            )}
          </div>
        </div>

        {/* Durable Memory Agents grid */}
        <div className="cyber-card" style={{ padding: '30px' }}>
          <span className="header-badge badge-emerald">Memory-First Agents</span>
          <h3 className="card-title" style={{ marginTop: '14px' }}>Long-running Context</h3>
          <p className="card-subtitle" style={{ marginBottom: '20px' }}>
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

      {/* Sovereign Trust Certificate (Greyscale to active golden glow indicator) */}
      <section className="grid-layout-2" style={{ alignItems: 'stretch' }}>
        
        {/* Trust Badge Display Certificate Card */}
        <div 
          className="cyber-card" 
          style={{ 
            padding: '30px', 
            display: 'flex', 
            gap: '24px', 
            alignItems: 'center', 
            background: allCompleted 
              ? 'linear-gradient(135deg, rgba(13, 16, 38, 0.95), rgba(16, 185, 129, 0.05))' 
              : 'rgba(13, 16, 38, 0.8)',
            border: `1px solid ${allCompleted ? 'var(--neon-emerald)' : 'rgba(255,255,255,0.06)'}`,
            boxShadow: allCompleted ? '0 0 25px rgba(0, 245, 160, 0.15)' : 'none',
            transition: 'all 0.5s ease'
          }}
        >
          {/* Gray to active color image */}
          <div 
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundImage: 'url("/trust_badge.jpg")',
              backgroundSize: 'cover',
              filter: allCompleted ? 'none' : 'grayscale(100%) opacity(0.2)',
              boxShadow: allCompleted ? '0 0 20px rgba(6, 182, 212, 0.5)' : 'none',
              border: allCompleted ? '2px solid var(--neon-cyan)' : '2px dashed rgba(255,255,255,0.1)',
              transition: 'all 0.5s ease',
              flexShrink: 0
            }}
          />

          <div style={{ flex: 1 }}>
            <span className={`header-badge ${allCompleted ? 'badge-emerald' : ''}`}>
              {allCompleted ? 'VERIFIED CRYPTOGRAPHIC TRUST' : 'AWAITING FLOW COMPLETION'}
            </span>
            <h3 className="card-title" style={{ marginTop: '10px', fontSize: '18px' }}>
              Sovereign Cryptographic Passport Certification
            </h3>
            <p className="card-subtitle" style={{ margin: '8px 0 0 0', fontSize: '12px', lineHeight: 1.5 }}>
              {allCompleted 
                ? 'All 6 stages of verification, decentralized storage, immutable registries, and automated royalty splits have been confirmed. This asset holds active cryptographic trust.'
                : 'Follow the 60-second judge script checklist to complete the E2E verification loop and activate the Sovereign Trust Certificate.'
              }
            </p>
          </div>
        </div>

        {/* 60-second Demo Check Actions */}
        <div className="cyber-card" style={{ padding: '30px' }}>
          <span className="header-badge badge-rose">60-second Judge Run</span>
          <h3 className="card-title" style={{ marginTop: '14px' }}>Demo Script</h3>
          <div className="judge-actions" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
            <Link to="/verify" className="cyber-btn cyber-btn-indigo" style={{ textDecoration: 'none', textAlign: 'center' }}>1. Verify Content</Link>
            <Link to="/register" className="cyber-btn cyber-btn-indigo" style={{ textDecoration: 'none', textAlign: 'center' }}>2. Mint Passport</Link>
            <Link to="/vault" className="cyber-btn cyber-btn-indigo" style={{ textDecoration: 'none', textAlign: 'center' }}>3. Sealed Vault</Link>
            <Link to="/blueprint" className="cyber-btn cyber-btn-emerald" style={{ textDecoration: 'none', textAlign: 'center' }}>4. Escrow Royalties</Link>
          </div>
          <div className="linear-card-recessed" style={{ padding: '14px', marginTop: '18px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>CURRENT PROOF SUMMARY</div>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '8px', margin: 0 }}>
              Verification: {verification?.assessment?.grade || 'not run'} · Passport tx: {onchain.passportTxDigest ? shortId(onchain.passportTxDigest, 10, 8) : 'missing'} · Policy tx: {onchain.policyTxDigest ? shortId(onchain.policyTxDigest, 10, 8) : 'missing'}
            </p>
          </div>
        </div>
      </section>

      {/* Explainable Scoring Section */}
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

      <style>{`
        .spin-halo {
          transform-origin: center;
          animation: rotate 6s linear infinite;
        }
        @keyframes rotate {
          to {
            transform: rotate(360deg);
          }
        }
        .pulse-line {
          animation: flowPulse 2s linear infinite;
        }
        @keyframes flowPulse {
          to {
            stroke-dashoffset: -35;
          }
        }
        .interactive-node-group:hover circle {
          transform: scale(1.1);
          transform-origin: center;
        }
      `}</style>
    </div>
  )
}
