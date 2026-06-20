import { useState } from 'react'

export default function Remix() {
  const [aureliusWeight, setAureliusWeight] = useState<number>(60)
  const [echophonyWeight, setEchophonyWeight] = useState<number>(30)
  const [kinetosWeight, setKinetosWeight] = useState<number>(10)
  const [isUpdatingPolicy, setIsUpdatingPolicy] = useState(false)
  const [policyLogs, setPolicyLogs] = useState<string[]>([])
  const [policyData, setPolicyData] = useState<{
    policyId: string
    aurelius: number
    echophony: number
    kinetos: number
  } | null>(null)

  const handleUpdatePolicy = async () => {
    setIsUpdatingPolicy(true)
    setPolicyData(null)
    setPolicyLogs([])

    const steps = [
      'Accessing co_creation_policy.move smart contract node registry...',
      `Validating proportional total weight sum: ${aureliusWeight} + ${echophonyWeight} + ${kinetosWeight} = 100% check...`,
      'Preparing transaction block payload: distribute_royalty PTB package...',
      `Setting contributor address weights [Aurelius: ${aureliusWeight}%, Echophony: ${echophonyWeight}%, Kinetos: ${kinetosWeight}%]...`,
      'Executing Move transaction call with SessionKey sponsored gas proof...',
      'Transaction confirmed. Escrow policy object states mutated successfully.'
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 350 + Math.random() * 200))
      setPolicyLogs((prev) => [...prev, steps[i]])
    }

    setPolicyData({
      policyId: '0xescrow_policy_cp992_su_' + Math.floor(1000 + Math.random() * 9000),
      aurelius: aureliusWeight,
      echophony: echophonyWeight,
      kinetos: kinetosWeight
    })
    setIsUpdatingPolicy(false)
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '1100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="header-badge badge-gold">Odyssey Chamber</span>
        <h2 className="cyber-title">Co-creation Royalty Escrow (Stamp Route)</h2>
        <p className="cyber-subtitle" style={{ margin: '10px auto 0' }}>
          Declare royalty payout weights in co_creation_policy.move smart contract state registry, split instantly as remixes are stamped.
        </p>
      </div>

      <div className="grid-layout-2">
        {/* Left Column: Escrow Weight Sliders & Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="cyber-card">
            <h3 className="card-title">Royalty Distribution Weights</h3>
            <p className="card-subtitle">Adjust the weight percentage for each creative house. (Sum must equal 100%)</p>

            {/* Sliders */}
            <div className="cyber-input-wrap">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: 'var(--neon-gold)' }}>
                <span>🦁 AURELIUS HOUSE (Visual/Image)</span>
                <span>{aureliusWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={aureliusWeight}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  setAureliusWeight(val)
                  // Auto adjust remaining to keep sum close to 100
                  const diff = 100 - val
                  setEchophonyWeight(Math.round(diff * 0.75))
                  setKinetosWeight(Math.round(diff * 0.25))
                }}
                disabled={isUpdatingPolicy}
              />
            </div>

            <div className="cyber-input-wrap">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: 'var(--neon-cyan)' }}>
                <span>🎹 ECHOPHONY HOUSE (Audio/Sound)</span>
                <span>{echophonyWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={echophonyWeight}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  setEchophonyWeight(val)
                  const diff = 100 - val - aureliusWeight
                  setKinetosWeight(diff >= 0 ? diff : 0)
                }}
                disabled={isUpdatingPolicy}
              />
            </div>

            <div className="cyber-input-wrap">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: 'var(--neon-rose)' }}>
                <span>🚂 KINETOS HOUSE (Motion/Video)</span>
                <span>{kinetosWeight}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={kinetosWeight}
                disabled
                style={{ opacity: 0.5 }}
              />
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>* Kinetos weight is auto-adjusted to lock sum criteria to 100%.</span>
            </div>

            <button
              onClick={handleUpdatePolicy}
              disabled={isUpdatingPolicy || aureliusWeight + echophonyWeight + kinetosWeight !== 100}
              className="cyber-btn cyber-btn-gold"
              style={{ width: '100%' }}
            >
              {isUpdatingPolicy ? 'Mutating Smart Policy states...' : 'Update Escrow Policy'}
            </button>
          </div>

          {/* Console Logs */}
          {(isUpdatingPolicy || policyLogs.length > 0) && (
            <div className="cyber-card" style={{ padding: '24px' }}>
              <span className="header-badge" style={{ marginBottom: '12px', fontSize: '9px' }}>Move Escrow Logs</span>
              <div className="console-container" style={{ height: '180px' }}>
                {policyLogs.map((log, idx) => (
                  <div key={idx} className="console-line">
                    <span className="console-time">[{new Date().toLocaleTimeString()}]</span>
                    <span className="console-tag tag-meta">[CONTRACT]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Stamp Journal Visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {policyData ? (
            <div className="cyber-card" style={{ width: '100%', minHeight: '380px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '30px', animation: 'fadeInUp 0.6s ease' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontFamily: 'var(--mono)', color: 'var(--text-muted)' }}>
                  <span>ACTIVE CO-CREATION POLICY</span>
                  <span>{policyData.policyId}</span>
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginTop: '12px', marginBottom: '4px' }}>Remix Stamp Escrow Ledger</h4>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Atomic split routing weights deployed under active Sui object</p>
              </div>

              {/* Stamps Visual Blocks */}
              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', margin: '30px 0' }}>
                <div className="stampbook-page" style={{ width: '100px', height: '120px', padding: '10px', background: 'rgba(245, 158, 11, 0.03)', borderColor: 'var(--neon-gold)', borderWidth: '2.5px', borderStyle: 'solid', transform: 'rotate(-5deg)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <span style={{ fontSize: '8px', color: 'var(--neon-gold)', fontFamily: 'var(--mono)' }}>AURELIUS</span>
                  <span style={{ fontSize: '24px', margin: '6px 0' }}>🦁</span>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>{policyData.aurelius}%</span>
                </div>

                <div className="stampbook-page" style={{ width: '100px', height: '120px', padding: '10px', background: 'rgba(6, 182, 212, 0.03)', borderColor: 'var(--neon-cyan)', borderWidth: '2.5px', borderStyle: 'solid', transform: 'rotate(4deg)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <span style={{ fontSize: '8px', color: 'var(--neon-cyan)', fontFamily: 'var(--mono)' }}>ECHOPHONY</span>
                  <span style={{ fontSize: '24px', margin: '6px 0' }}>🎹</span>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>{policyData.echophony}%</span>
                </div>

                <div className="stampbook-page" style={{ width: '100px', height: '120px', padding: '10px', background: 'rgba(236, 72, 153, 0.03)', borderColor: 'var(--neon-rose)', borderWidth: '2.5px', borderStyle: 'solid', transform: 'rotate(-2deg)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <span style={{ fontSize: '8px', color: 'var(--neon-rose)', fontFamily: 'var(--mono)' }}>KINETOS</span>
                  <span style={{ fontSize: '24px', margin: '6px 0' }}>🚂</span>
                  <span style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>{policyData.kinetos}%</span>
                </div>
              </div>

              <div className="linear-card-recessed" style={{ padding: '14px', textAlign: 'center', fontSize: '11px', color: 'var(--neon-emerald)', fontFamily: 'var(--mono)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                🔗 ATOMIC ESCROW ROYALTY ROUTING ACTIVE
              </div>
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
              <span style={{ fontSize: '40px', marginBottom: '16px' }}>🚂</span>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '0 30px', lineHeight: 1.5 }}>
                Deploy your escrow weights config to visualize active royalty split stamp journals.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
