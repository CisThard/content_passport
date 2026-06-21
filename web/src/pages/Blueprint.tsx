import { useState } from 'react'

export default function Blueprint() {
  // State for Remix Chain Simulator
  const [anyaFee, setAnyaFee] = useState<number>(30)
  const [benFee, setBenFee] = useState<number>(50)
  const [chloeFee, setChloeFee] = useState<number>(20)

  // State for Bounty Quest Simulator
  const [totalBounty, setTotalBounty] = useState<number>(120)
  const [anyaClaim, setAnyaClaim] = useState<number>(40)
  const [benClaim, setBenClaim] = useState<number>(50)
  const [chloeClaim, setChloeClaim] = useState<number>(30)

  // Calculations for Remix Chain
  const totalRemixCost = anyaFee + benFee + chloeFee
  const anyaRemixWeight = totalRemixCost > 0 ? Math.round((anyaFee / totalRemixCost) * 100) : 0
  const benRemixWeight = totalRemixCost > 0 ? Math.round((benFee / totalRemixCost) * 100) : 0
  const chloeRemixWeight = totalRemixCost > 0 ? 100 - anyaRemixWeight - benRemixWeight : 0

  // Calculations for Bounty Quest
  const totalClaimed = anyaClaim + benClaim + chloeClaim
  const remainingBounty = totalBounty - totalClaimed
  const claimProgressPercent = Math.min((totalClaimed / totalBounty) * 100, 100)

  const anyaBountyWeight = totalBounty > 0 ? Math.round((anyaClaim / totalBounty) * 100) : 0
  const benBountyWeight = totalBounty > 0 ? Math.round((benClaim / totalBounty) * 100) : 0
  const chloeBountyWeight = totalBounty > 0 ? 100 - anyaBountyWeight - benBountyWeight : 0

  return (
    <div className="dashboard-container" style={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <span className="header-badge badge-gold">Chamber Blueprint</span>
        <h2 className="cyber-title">Co-Creation Economic Architecture</h2>
        <p className="cyber-subtitle" style={{ margin: '10px auto 0' }}>
          Explore the business workflows powered by Content Passport's smart contracts, threshold cryptography, and decentralized file registry.
        </p>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', display: 'block', marginTop: '8px' }}>
          [CURRENT DEVELOPMENT FOCUS: Visual Media // Support for Audio, Video, and Text to roll out sequentially]
        </span>
      </div>

      {/* ==================== SECTION 1: Supply-Side Remix Chain ==================== */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <h3 className="cyber-title" style={{ fontSize: '22px', margin: 0, color: 'var(--neon-gold)' }}>
             1. Supply-Side Flow: Paid Remix Chain
          </h3>
          <span className="header-badge" style={{ background: 'var(--neon-emerald)', color: '#fff', border: 'none', padding: '3px 8px', fontSize: '9px', fontWeight: 700 }}>ACTIVE / IMPLEMENTED</span>
        </div>

        <div className="grid-layout-2" style={{ gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)', gap: '40px' }}>
          {/* Left Column: Visual Timeline Card */}
          <div className="cyber-card" style={{ padding: '30px', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <span className="header-badge" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--neon-gold)' }}>Forward Model Ledger</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>anya.sui → ben.sui → chloe.sui</span>
            </div>

            <p className="card-subtitle" style={{ marginBottom: '30px', lineHeight: 1.5 }}>
              Creators set non-negotiable minimum licensing fees. As intermediate remixes are stamped and published, fees aggregate dynamically. The final buyer's purchase triggers instant splits atomically.
            </p>

            {/* Visual Timeline Flow */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', paddingLeft: '15px' }}>
              <div style={{ position: 'absolute', left: '19px', top: '15px', bottom: '15px', width: '2px', background: 'linear-gradient(180deg, var(--neon-gold) 0%, var(--neon-cyan) 50%, var(--neon-rose) 100%)', zIndex: 1 }}></div>

              {/* Anya - Origin */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', zIndex: 2 }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--neon-gold)', boxShadow: '0 0 10px var(--neon-gold-glow)', marginLeft: '-4px' }}></div>
                <div className="linear-card-recessed" style={{ flex: 1, padding: '12px 18px', borderLeft: '3px solid var(--neon-gold)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                    <span>ORIGIN CREATOR</span>
                    <span>anya.sui</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Anya's Photography Template</span>
                    <span className="header-badge badge-gold" style={{ fontSize: '10px' }}>{anyaFee} SUI Min. License</span>
                  </div>
                </div>
              </div>

              {/* Ben - Remix 1 */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', zIndex: 2 }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--neon-cyan)', boxShadow: '0 0 10px var(--neon-cyan-glow)', marginLeft: '-4px' }}></div>
                <div className="linear-card-recessed" style={{ flex: 1, padding: '12px 18px', borderLeft: '3px solid var(--neon-cyan)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                    <span>1ST REMIXER</span>
                    <span>ben.anya.sui</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Ben's Visual Design Layers</span>
                    <span className="header-badge" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--neon-cyan)', fontSize: '10px' }}>+{benFee} SUI Added Value</span>
                  </div>
                </div>
              </div>

              {/* Chloe - Remix 2 */}
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center', zIndex: 2 }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--neon-rose)', boxShadow: '0 0 10px var(--neon-rose-glow)', marginLeft: '-4px' }}></div>
                <div className="linear-card-recessed" style={{ flex: 1, padding: '12px 18px', borderLeft: '3px solid var(--neon-rose)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)' }}>
                    <span>2ND REMIXER</span>
                    <span>chloe.ben.anya.sui</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>Chloe's Soundscape Overlay</span>
                    <span className="header-badge" style={{ background: 'rgba(236, 72, 153, 0.1)', color: 'var(--neon-rose)', fontSize: '10px' }}>+{chloeFee} SUI Added Value</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Atomic Escrow Settlement */}
            <div className="linear-card-recessed" style={{ marginTop: '30px', padding: '18px', background: 'rgba(16, 185, 129, 0.02)', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--neon-emerald)', letterSpacing: '0.5px' }}> ATOMIC ESCROW SETTLEMENT ACTIVE</span>
                <span className="header-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--neon-emerald)', fontSize: '11px' }}>Total Price: {totalRemixCost} SUI</span>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '15px' }}>
                Dave (Buyer) buys the final asset for <strong>{totalRemixCost} SUI</strong>. The smart contract triggers, splitting the SUI atomically among collaborators based on relative contributions:
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <div style={{ textAlign: 'center', flex: 1, padding: '10px 8px', background: 'rgba(245, 158, 11, 0.04)', border: '1px solid rgba(245, 158, 11, 0.1)', borderRadius: '4px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--neon-gold)' }}>Anya ({anyaRemixWeight}%)</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginTop: '3px' }}>{((totalRemixCost * anyaRemixWeight) / 100).toFixed(1)} SUI</div>
                </div>
                <div style={{ textAlign: 'center', flex: 1, padding: '10px 8px', background: 'rgba(6, 182, 212, 0.04)', border: '1px solid rgba(6, 182, 212, 0.1)', borderRadius: '4px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--neon-cyan)' }}>Ben ({benRemixWeight}%)</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginTop: '3px' }}>{((totalRemixCost * benRemixWeight) / 100).toFixed(1)} SUI</div>
                </div>
                <div style={{ textAlign: 'center', flex: 1, padding: '10px 8px', background: 'rgba(236, 72, 153, 0.04)', border: '1px solid rgba(236, 72, 153, 0.1)', borderRadius: '4px' }}>
                  <div style={{ fontSize: '9px', color: 'var(--neon-rose)' }}>Chloe ({chloeRemixWeight}%)</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginTop: '3px' }}>{((totalRemixCost * chloeRemixWeight) / 100).toFixed(1)} SUI</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simulator Inputs */}
          <div className="cyber-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '15px', color: '#fff', fontWeight: 700, marginBottom: '8px' }}>Remix Value Configurator</h4>
              <p className="card-subtitle" style={{ marginBottom: '25px' }}>Adjust licensing fees of the collaborators to see how the total price and smart contract weights adapt.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="cyber-input-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--neon-gold)' }}>
                    <span> Anya's Template Base Fee</span>
                    <span>{anyaFee} SUI</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={anyaFee}
                    onChange={(e) => setAnyaFee(parseInt(e.target.value))}
                  />
                </div>

                <div className="cyber-input-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--neon-cyan)' }}>
                    <span> Ben's Design Added Value</span>
                    <span>{benFee} SUI</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={benFee}
                    onChange={(e) => setBenFee(parseInt(e.target.value))}
                  />
                </div>

                <div className="cyber-input-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--neon-rose)' }}>
                    <span> Chloe's Sound Added Value</span>
                    <span>{chloeFee} SUI</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={chloeFee}
                    onChange={(e) => setChloeFee(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="linear-card-recessed" style={{ padding: '15px', marginTop: '30px', fontSize: '11.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Contract Total Value:</span>
                <strong style={{ color: '#fff' }}>{totalRemixCost} SUI</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Dynamic Weight Vector:</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--neon-gold)', fontWeight: 600 }}>
                  [{anyaRemixWeight}%, {benRemixWeight}%, {chloeRemixWeight}%]
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: Demand-Side Bounty Quest ==================== */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <h3 className="cyber-title" style={{ fontSize: '22px', margin: 0, color: 'var(--neon-cyan)' }}>
             2. Demand-Side Flow: Co-Creation Quest
          </h3>
          <span className="header-badge" style={{ background: 'var(--neon-cyan)', color: '#000', border: 'none', padding: '3px 8px', fontSize: '9px', fontWeight: 700 }}>PLANNED / UNDER DEVELOPMENT</span>
        </div>

        <div className="grid-layout-2" style={{ gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)', gap: '40px' }}>
          {/* Left Column: Visual Quest Claims Card */}
          <div className="cyber-card" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span className="header-badge" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--neon-cyan)' }}>Bounty Quest Claims Ledger</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Quest Status: Open for Claims</span>
            </div>

            <div className="linear-card-recessed" style={{ marginBottom: '25px', padding: '12px 16px', background: 'rgba(6, 182, 212, 0.02)', borderColor: 'rgba(6, 182, 212, 0.15)', borderStyle: 'dashed', display: 'flex', alignItems: 'center', gap: '10px' }}>
              
              <span style={{ fontSize: '11px', color: 'var(--neon-cyan)', fontWeight: 600 }}>Development Status: Scheduled for core protocol upgrade. (Escrow UI coming soon)</span>
            </div>

            <p className="card-subtitle" style={{ marginBottom: '25px', lineHeight: 1.5 }}>
              A buyer posts a target bounty (escrowed on-chain). Collaborators apply to specific milestones, claiming portions. Escrow unlocks atomically upon full allocation and buyer verification.
            </p>

            {/* Allocation Progress Tracker */}
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                <span>Bounty Escrow Allocation</span>
                <span style={{ color: remainingBounty >= 0 ? 'var(--neon-cyan)' : 'var(--neon-rose)' }}>
                  {totalClaimed} / {totalBounty} SUI ({claimProgressPercent.toFixed(0)}%)
                </span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${claimProgressPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--neon-cyan) 0%, var(--neon-indigo) 100%)', transition: 'width 0.4s ease' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '6px' }}>
                <span>Deposited by Dave (Bounty Owner)</span>
                <span>{remainingBounty >= 0 ? `${remainingBounty} SUI Unallocated` : `Overallocated by ${Math.abs(remainingBounty)} SUI!`}</span>
              </div>
            </div>

            {/* Claim Slots List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="linear-card-recessed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderLeft: '3px solid var(--neon-indigo)' }}>
                <div>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>SLOT 1: ILLUSTRATOR (ANYA.SUI)</span>
                  <h5 style={{ color: '#fff', fontSize: '13px', margin: '2px 0 0 0' }}>Vector Character Storyboard</h5>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>{anyaClaim} SUI</div>
                  <span style={{ fontSize: '9px', color: 'var(--neon-emerald)' }}>✓ AASE Verified</span>
                </div>
              </div>

              <div className="linear-card-recessed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderLeft: '3px solid var(--neon-cyan)' }}>
                <div>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>SLOT 2: VOICE ACTOR (BEN.SUI)</span>
                  <h5 style={{ color: '#fff', fontSize: '13px', margin: '2px 0 0 0' }}>Voiceover Overlay narration</h5>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>{benClaim} SUI</div>
                  <span style={{ fontSize: '9px', color: 'var(--neon-emerald)' }}>✓ AASE Verified</span>
                </div>
              </div>

              <div className="linear-card-recessed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderLeft: '3px solid var(--neon-rose)' }}>
                <div>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>SLOT 3: COMPOSER (CHLOE.SUI)</span>
                  <h5 style={{ color: '#fff', fontSize: '13px', margin: '2px 0 0 0' }}>3D Scene Rigging &amp; Render Sync</h5>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>{chloeClaim} SUI</div>
                  <span style={{ fontSize: '9px', color: 'var(--neon-rose)' }}>Awaiting Proof Upload</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simulator Inputs */}
          <div className="cyber-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '15px', color: '#fff', fontWeight: 700, marginBottom: '8px' }}>Bounty Quest Simulator</h4>
              <p className="card-subtitle" style={{ marginBottom: '25px' }}>Modify the total bounty size and claims slices to simulate crowd-sourced milestone payouts.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="cyber-input-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    <span> Total Escrow Bounty Pool</span>
                    <span>{totalBounty} SUI</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={totalBounty}
                    onChange={(e) => setTotalBounty(parseInt(e.target.value))}
                  />
                </div>

                <div className="cyber-input-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--neon-indigo)' }}>
                    <span>Milestone 1 Claim (Anya)</span>
                    <span>{anyaClaim} SUI</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max={totalBounty - 20}
                    value={anyaClaim}
                    onChange={(e) => setAnyaClaim(parseInt(e.target.value))}
                  />
                </div>

                <div className="cyber-input-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--neon-cyan)' }}>
                    <span>Milestone 2 Claim (Ben)</span>
                    <span>{benClaim} SUI</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max={totalBounty - anyaClaim - 10}
                    value={benClaim}
                    onChange={(e) => setBenClaim(parseInt(e.target.value))}
                  />
                </div>

                <div className="cyber-input-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--neon-rose)' }}>
                    <span>Milestone 3 Claim (Chloe)</span>
                    <span>{chloeClaim} SUI</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max={totalBounty - anyaClaim - benClaim}
                    value={chloeClaim}
                    onChange={(e) => setChloeClaim(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="linear-card-recessed" style={{ padding: '15px', marginTop: '30px', fontSize: '11.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Remaining Bounty Escrow:</span>
                <strong style={{ color: remainingBounty >= 0 ? 'var(--neon-cyan)' : 'var(--neon-rose)' }}>
                  {remainingBounty} SUI
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Simulated Escrow Weights:</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--neon-cyan)', fontWeight: 600 }}>
                  [{anyaBountyWeight}%, {benBountyWeight}%, {chloeBountyWeight}%]
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: Embedded Chamber Technologies ==================== */}
      <section style={{ paddingBottom: '20px' }}>
        <div className="cyber-card" style={{ padding: '30px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '20px', letterSpacing: '0.5px' }}> Embedded Chamber Technologies Mapping</h4>
          <div className="grid-layout-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            
            <div className="linear-card-recessed" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                
                <h5 style={{ fontSize: '13px', color: '#fff', fontWeight: 700 }}>SuiNS &amp; SessionKeys</h5>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Establishes cryptographic, human-readable identity for licensing nodes and allows frictionless background signing during claims.
              </p>
            </div>
            
            <div className="linear-card-recessed" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                
                <h5 style={{ fontSize: '13px', color: '#fff', fontWeight: 700 }}>Aurelius Forensic Lab</h5>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Automates ELA, EXIF, and AI Sniffer checks on submissions, protecting the network from plagiarized content or duplicate file hacks.
              </p>
            </div>

            <div className="linear-card-recessed" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                
                <h5 style={{ fontSize: '13px', color: '#fff', fontWeight: 700 }}>Sharded Secret Vault</h5>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Uses Shamir (3/5) threshold keys to keep raw creative draft packages locked on Walrus sharded storage until buyer payment settling confirmations.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
