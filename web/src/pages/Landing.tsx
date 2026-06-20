import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface LandingProps {
  passportsCount: number
  walrusStatus: { healthy: boolean; latencyMs: number } | null
  systemTime: string
}

export default function Landing({ passportsCount, walrusStatus, systemTime }: LandingProps) {
  const [activePortal, setActivePortal] = useState<number | null>(null)

  const PORTALS = [
    {
      id: 0,
      title: '2.7 Gate Chamber',
      badge: 'On-chain Identity',
      desc: 'Declare your sovereign SuiNS identity, establish ephemeral cryptographic session keys, and mint an immutable, tamper-proof creator passport NFT.',
      icon: '🎫',
      path: '/register',
      colorClass: 'cyber-card-glow-indigo',
      badgeColor: ''
    },
    {
      id: 1,
      title: 'Aurelius Forensic Lab',
      badge: 'AI Detection & EXIF Audit',
      desc: 'Execute multi-agent forensics check including Error Level Analysis (ELA) pixel compression metrics, EXIF header consistency, and Gemini AISniffer verification.',
      icon: '🦁',
      path: '/verify',
      colorClass: 'cyber-card-glow-gold',
      badgeColor: 'badge-gold'
    },
    {
      id: 2,
      title: 'Sharded Secret Vault',
      badge: 'Threshold Encryption',
      desc: 'Lock and seal raw digital masterpieces in decentralized Walrus blobs using Shamir Secret Sharing (3/5) cryptography and multi-party sign approvals.',
      icon: '🔐',
      path: '/vault',
      colorClass: 'cyber-card-glow-emerald',
      badgeColor: 'badge-emerald'
    },
    {
      id: 3,
      title: 'Escrow Stamp Junction',
      badge: 'Move Smart Escrow',
      desc: 'Deploy co_creation_policy.move smart contracts to automatically route and atomic-split royalties among contributors as works are remixed and stamped.',
      icon: '🚂',
      path: '/remix',
      colorClass: 'cyber-card-glow-rose',
      badgeColor: 'badge-rose'
    }
  ]

  return (
    <div className="dashboard-container">
      {/* Premium Hero Intro Header */}
      <div style={{ textAlign: 'center', margin: '40px auto 60px', maxWidth: '820px' }}>
        <span className="header-badge">Magical Border Control Ecosystem</span>
        <h2 className="cyber-title" style={{ fontSize: '52px' }}>
          Sovereign Media Verification <br />
          <span style={{ background: 'linear-gradient(135deg, var(--neon-indigo), var(--neon-cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            &amp; Art On-chain Border
          </span>
        </h2>
        <p className="cyber-subtitle" style={{ margin: '20px auto 0', fontSize: '16px' }}>
          Content Passport is an integrated creator protection ecosystem merging on-chain identity, cryptographic sharded storage, and multi-agent AI verification. Step into any chamber below to pilot the sub-systems.
        </p>
      </div>

      {/* Grid of 4 Portal Chambers */}
      <div className="grid-equal-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '60px' }}>
        {PORTALS.map((portal) => (
          <div
            key={portal.id}
            className={`cyber-card ${portal.colorClass}`}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              minHeight: '340px',
              borderWidth: activePortal === portal.id ? '1.5px' : '1px'
            }}
            onMouseEnter={() => setActivePortal(portal.id)}
            onMouseLeave={() => setActivePortal(null)}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <span className={`header-badge ${portal.badgeColor}`} style={{ margin: 0, fontSize: '10px' }}>
                  {portal.badge}
                </span>
                <span style={{ fontSize: '28px', filter: activePortal === portal.id ? 'drop-shadow(0 0 10px #fff)' : 'none', transition: 'filter 0.3s' }}>
                  {portal.icon}
                </span>
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '14px' }}>
                {portal.title}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300 }}>
                {portal.desc}
              </p>
            </div>
            
            <div style={{ marginTop: '24px' }}>
              <Link 
                to={portal.path} 
                className="cyber-btn cyber-btn-secondary" 
                style={{ 
                  width: '100%', 
                  fontSize: '11px',
                  borderColor: activePortal === portal.id ? 'rgba(255,255,255,0.2)' : 'var(--border-light)'
                }}
              >
                ENTER CHAMBER ➔
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dynamic Network Status & Stats Widget */}
      <div className="cyber-card" style={{ padding: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '30px', alignItems: 'center' }}>
          <div>
            <span className="header-badge badge-emerald" style={{ marginBottom: '10px' }}>Global Stats</span>
            <h4 style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>Basecamp Network Node Metrics</h4>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Real-time transaction status of the Sui blockchain network and Walrus sharded storage nodes</p>
          </div>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div className="indicator-card" style={{ minWidth: '180px' }}>
              <span className="indicator-card-label">ISSUED PASSPORTS</span>
              <span className="indicator-card-value">{passportsCount.toLocaleString()}</span>
            </div>
            <div className="indicator-card" style={{ minWidth: '180px' }}>
              <span className="indicator-card-label">WALRUS STORAGE</span>
              <span className="indicator-card-value" style={{ color: 'var(--neon-emerald)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="status-dot"></span>
                {walrusStatus ? `${walrusStatus.latencyMs} ms` : 'Pinging...'}
              </span>
            </div>
            <div className="indicator-card" style={{ minWidth: '180px' }}>
              <span className="indicator-card-label">SECURE VAULT TYPE</span>
              <span className="indicator-card-value" style={{ color: 'var(--neon-gold)' }}>SEAL 3/5 V2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
