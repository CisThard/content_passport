import { useState } from 'react'

export default function Vault() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)
  const [vaultState, setVaultState] = useState<'idle' | 'encrypting' | 'locked' | 'aggregating' | 'unlocked'>('idle')
  const [shardsStatus, setShardsStatus] = useState<boolean[]>([false, false, false, false, false])
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])

  const handleFileDrop = async () => {
    setSelectedFile('masterpiece_sketch_v3_unsigned.png')
    setVaultState('encrypting')
    setConsoleLogs([])

    const steps = [
      'Reading binary blob array buffer from file...',
      'Encrypting raw file buffer using AES-256-GCM symmetric algorithm...',
      'AES key generated successfully.',
      'Executing Shamir Secret Sharing threshold algorithm (k=3, n=5)...',
      'Slicing key into 5 cryptographic sharded elements...',
      'Assigning shards to decentralized border node guardians...',
      'Uploading encrypted payload blobs to Walrus storage network...'
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 350 + Math.random() * 200))
      setConsoleLogs((prev) => [...prev, steps[i]])
    }

    setShardsStatus([true, true, true, true, true])
    setVaultState('locked')
  }

  const handleUnlockVault = async () => {
    setVaultState('aggregating')
    setConsoleLogs((prev) => [...prev, 'Decryption requested. Accessing session credentials...', 'Contacting border guardian nodes to request threshold signatures...'])

    const collected = [false, false, false, false, false]
    for (let i = 0; i < 5; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      collected[i] = true
      setShardsStatus([...collected])
      setConsoleLogs((prev) => [...prev, `Border node guardian [Node-0${i + 1}] signature validated. Share acquired.`])
    }

    await new Promise((resolve) => setTimeout(resolve, 600))
    setConsoleLogs((prev) => [...prev, 'Threshold criteria met (5/5). Reconstructing symmetric decryption key...', 'Decrypting Walrus block payload... Complete!'])
    setVaultState('unlocked')
  }

  const handleResetVault = () => {
    setSelectedFile(null)
    setVaultState('idle')
    setShardsStatus([false, false, false, false, false])
    setConsoleLogs([])
  }

  const WALRUS_NODES = [
    { id: 'Node-01', location: 'Frankfurt, DE', status: 'online', shards: 'Shard-A', weight: '20%' },
    { id: 'Node-02', location: 'Singapore, SG', status: 'online', shards: 'Shard-B', weight: '20%' },
    { id: 'Node-03', location: 'Oregon, US', status: 'online', shards: 'Shard-C', weight: '20%' },
    { id: 'Node-04', location: 'Tokyo, JP', status: 'online', shards: 'Shard-D', weight: '20%' },
    { id: 'Node-05', location: 'Dublin, IE', status: 'online', shards: 'Shard-E', weight: '20%' }
  ]

  return (
    <div className="dashboard-container" style={{ maxWidth: '1100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="header-badge badge-emerald">Shamir Chamber</span>
        <h2 className="cyber-title">Threshold Security Vault (SEAL)</h2>
        <p className="cyber-subtitle" style={{ margin: '10px auto 0' }}>
          Lock and protect raw master files using Shamir\'s Secret Sharing (3/5) cryptography integrated on decentralized Walrus storage nodes.
        </p>
      </div>

      <div className="grid-layout-2">
        {/* Left Column: Dropzone & Terminal Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {vaultState === 'idle' ? (
            <div className="runic-zone" onClick={handleFileDrop}>
              <div className="runic-zone-icon"></div>
              <h4>Upload raw file to encrypt &amp; seal</h4>
              <p>Drag and drop or click to upload your high-fidelity draft files, sketches, or metadata to encrypt and seal in the passport.</p>
            </div>
          ) : (
            <div className="cyber-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h4 style={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}>
                    {selectedFile}
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>AES-256 / Shamir Shards Cryptography</span>
                </div>
                <span className="header-badge badge-emerald" style={{ margin: 0 }}>
                  {vaultState === 'encrypting' && 'ENCRYPTING'}
                  {vaultState === 'locked' && 'SEAL LOCKED'}
                  {vaultState === 'aggregating' && 'COLLECTING SHARDS'}
                  {vaultState === 'unlocked' && 'UNLOCKED'}
                </span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                {vaultState === 'locked' && (
                  <button onClick={handleUnlockVault} className="cyber-btn cyber-btn-emerald" style={{ flex: 1 }}>
                     Request Decryption Key Shares
                  </button>
                )}
                {(vaultState === 'unlocked' || vaultState === 'locked') && (
                  <button onClick={handleResetVault} className="cyber-btn cyber-btn-secondary">
                    Reset Vault
                  </button>
                )}
              </div>

              {/* Inner log console */}
              <span className="header-badge" style={{ marginBottom: '10px', fontSize: '9px' }}>Vault Security Logs</span>
              <div className="console-container" style={{ height: '180px' }}>
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className="console-line">
                    <span className="console-time">[{new Date().toLocaleTimeString()}]</span>
                    <span className="console-tag tag-success">[SEAL]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Decentralized Guardian node status table */}
          {vaultState !== 'idle' && (
            <div className="cyber-card">
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>Decentralized Key Node Guardians</h4>
              <div className="table-wrap">
                <table className="cyber-table">
                  <thead>
                    <tr>
                      <th>Node ID</th>
                      <th>Location</th>
                      <th>Acquired Shard</th>
                      <th>Weight</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WALRUS_NODES.map((node, idx) => (
                      <tr key={node.id}>
                        <td style={{ fontFamily: 'var(--mono)', fontWeight: 600 }}>{node.id}</td>
                        <td>{node.location}</td>
                        <td style={{ fontFamily: 'var(--mono)', color: shardsStatus[idx] ? 'var(--neon-emerald)' : 'var(--text-muted)' }}>
                          {shardsStatus[idx] ? node.shards : 'Not Loaded'}
                        </td>
                        <td style={{ fontFamily: 'var(--mono)' }}>{node.weight}</td>
                        <td>
                          <span className="status-dot" style={{ backgroundColor: node.status === 'online' ? 'var(--neon-emerald)' : 'var(--text-muted)' }} />
                          <span style={{ fontSize: '12px', marginLeft: '6px', color: 'var(--text-secondary)' }}>{node.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Key Shards Orbits Visualization */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {vaultState !== 'idle' ? (
            <div className="cyber-card" style={{ width: '100%', minHeight: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span className="header-badge" style={{ marginBottom: '20px' }}>Shamir Cryptographic Orbit</span>
              
              <div className="orbit-shards-box">
                {/* Center dial core */}
                <div className={`orbit-center-node ${vaultState === 'unlocked' ? 'unlocked' : ''}`}>
                  {vaultState === 'unlocked' ? '' : ''}
                </div>

                {/* Shards rotating */}
                {[0, 1, 2, 3, 4].map((idx) => {
                  const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2
                  const dist = vaultState === 'unlocked' ? 0 : 85
                  const x = Math.cos(angle) * dist
                  const y = Math.sin(angle) * dist
                  const collected = shardsStatus[idx]

                  return (
                    <div
                      key={idx}
                      className={`orbiting-shard-item ${collected ? 'collected' : ''} ${vaultState === 'unlocked' ? 'converged' : ''}`}
                      style={{
                        transform: `translate(${x}px, ${y}px)`
                      }}
                    >
                      
                    </div>
                  )
                })}
              </div>
              
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', width: '240px', lineHeight: 1.4, marginTop: '20px' }}>
                {vaultState === 'locked' && 'Symmetric key slices are currently sharded and held across decentralized nodes.'}
                {vaultState === 'aggregating' && 'Retrieving and validating key shares from participating node guardians...'}
                {vaultState === 'unlocked' && 'Symmetric key reconstructed from shards. Master blob decryption successful.'}
              </p>
            </div>
          ) : (
            <div 
              className="cyber-card" 
              style={{ 
                width: '320px', 
                height: '420px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderStyle: 'dashed',
                background: 'rgba(13, 16, 38, 0.1)',
                opacity: 0.6 
              }}
            >
              <span style={{ fontSize: '40px', marginBottom: '16px' }}></span>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '0 30px', lineHeight: 1.5 }}>
                Select a draft file to encrypt and visualize the key orbit mechanics.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
