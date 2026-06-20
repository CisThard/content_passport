import { useState } from 'react'

export default function Register() {
  const [suinsName, setSuinsName] = useState('')
  const [isMinting, setIsMinting] = useState(false)
  const [mintLogs, setMintLogs] = useState<string[]>([])
  const [passportData, setPassportData] = useState<{
    suins: string
    address: string
    issuedAt: string
    serial: string
  } | null>(null)

  const handleMintPassport = async () => {
    if (!suinsName.trim()) return
    setIsMinting(true)
    setPassportData(null)
    setMintLogs([])

    const logs = [
      'Initializing Sui Move Session Key contract connection...',
      'Mapping SuiNS registry lookup: searching for available subdomain node...',
      `Resource claimed: [${suinsName.endsWith('.sui') ? suinsName : suinsName + '.sui'}] confirmed available.`,
      'Generating browser-local ephemeral SessionKey (Ed25519)...',
      'SessionKey locked: TTL 10m. Executing gasless sponsored PTB transacting on-chain...',
      'Calling genesis_passport::mint_passport(session_proof, metadata)...',
      'Transaction confirmed. Gas spent: 0.0024 SUI. Registering object index...'
    ]

    for (let i = 0; i < logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 300))
      setMintLogs((prev) => [...prev, logs[i]])
    }

    const timestamp = new Date().toUTCString()
    const mockAddr = '0x32b502...' + Array.from(suinsName).map(c => c.charCodeAt(0).toString(16)).join('').slice(-8)
    const mockSerial = 'CP-' + Math.floor(100000 + Math.random() * 900000) + '-SUI'

    setPassportData({
      suins: suinsName.endsWith('.sui') ? suinsName : suinsName + '.sui',
      address: mockAddr,
      issuedAt: timestamp,
      serial: mockSerial
    })
    setIsMinting(false)
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '1000px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="header-badge">Gate 2.7</span>
        <h2 className="cyber-title">On-chain Identity Registry</h2>
        <p className="cyber-subtitle" style={{ margin: '10px auto 0' }}>
          Declare your sovereign SuiNS (Sui Name Service) identity and generate local ephemeral session keys to mint your tamper-proof creator passport NFT.
        </p>
      </div>

      <div className="grid-layout-2">
        {/* Registration Form & Console */}
        <div className="cyber-card">
          <h3 className="card-title">Passport Authority Form</h3>
          <p className="card-subtitle">Input your desired creator subdomain namespace below.</p>

          <div className="cyber-input-wrap">
            <label>Declare SuiNS Identity Name</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                placeholder="e.g. charles.sui"
                value={suinsName}
                onChange={(e) => setSuinsName(e.target.value)}
                disabled={isMinting}
                style={{ flex: 1 }}
              />
              <button
                onClick={handleMintPassport}
                disabled={isMinting || !suinsName.trim()}
                className="cyber-btn cyber-btn-indigo"
                style={{ padding: '0 28px', whiteSpace: 'nowrap' }}
              >
                {isMinting ? 'Minting Registry...' : 'Apply Passport'}
              </button>
            </div>
          </div>

          {/* Hologram Terminal Logs */}
          {(isMinting || mintLogs.length > 0) && (
            <div style={{ marginTop: '30px' }}>
              <span className="header-badge" style={{ marginBottom: '10px', fontSize: '9px' }}>Minting Terminal</span>
              <div className="console-container" style={{ height: '200px' }}>
                {mintLogs.map((log, idx) => (
                  <div key={idx} className="console-line">
                    <span className="console-time">[{new Date().toLocaleTimeString()}]</span>
                    <span className={`console-tag ${log.startsWith('Transaction') ? 'tag-success' : 'tag-system'}`}>
                      {log.startsWith('Transaction') ? '[VERDICT]' : '[PROCESS]'}
                    </span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3D Holographic Passport Card Widget */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {passportData ? (
            <div className="holo-passport-container" style={{ animation: 'fadeInUp 0.6s ease' }}>
              <div className="holo-passport certified scanning" style={{ backgroundImage: "url('/digital-passport.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="holo-laser-scanner"></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 800, color: 'var(--neon-gold)', letterSpacing: '1px' }}>
                    SUI CREATOR PASSPORT
                  </span>
                  <span style={{ fontSize: '18px' }}>🌐</span>
                </div>

                <div className="holo-seal-emblem">🦁</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>SOVEREIGN IDENTITY</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', fontFamily: 'var(--sans)' }}>{passportData.suins}</div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '8px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>OBJECT ADDRESS</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--mono)' }}>{passportData.address}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '8px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>SERIAL NUMBER</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--mono)' }}>{passportData.serial}</div>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '7px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>ISSUED TIMESTAMP</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px', whiteSpace: 'nowrap' }}>{passportData.issuedAt}</div>
                    </div>
                    <span style={{ fontSize: '14px' }}>🐕</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="cyber-card" 
              style={{ 
                width: '280px', 
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
              <span style={{ fontSize: '40px', marginBottom: '16px' }}>🛂</span>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '0 20px', lineHeight: 1.5 }}>
                Your holographic gold passport card will materialize here once identity registration completes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
