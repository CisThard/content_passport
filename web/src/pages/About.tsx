import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

interface Star {
  x: number
  y: number
  z: number
  color: string
}

export default function About() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Floating magic sparks particle system
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    const stars: Star[] = []
    const colors = ['rgba(147, 51, 234, 0.25)', 'rgba(234, 179, 8, 0.25)', 'rgba(16, 185, 129, 0.25)', 'rgba(236, 72, 153, 0.25)']
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    const speed = 0.4

    const draw = () => {
      ctx.fillStyle = 'rgba(4, 5, 13, 0.15)'
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      stars.forEach((star) => {
        star.z -= speed
        if (star.z <= 0) {
          star.z = width
          star.x = Math.random() * width - width / 2
          star.y = Math.random() * height - height / 2
        }

        const px = (star.x / star.z) * width + cx
        const py = (star.y / star.z) * height + cy
        const size = ((width - star.z) / width) * 2.5

        const angle = star.z * 0.0003
        const rotatedX = (px - cx) * Math.cos(angle) - (py - cy) * Math.sin(angle) + cx
        const rotatedY = (px - cx) * Math.sin(angle) + (py - cy) * Math.cos(angle) + cy

        if (rotatedX >= 0 && rotatedX <= width && rotatedY >= 0 && rotatedY <= height) {
          ctx.beginPath()
          ctx.arc(rotatedX, rotatedY, Math.max(0.4, size), 0, Math.PI * 2)
          ctx.fillStyle = star.color
          ctx.fill()
        }
      })

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  const CHAPTERS = [
    {
      id: 'platform934',
      title: 'Prologue: Platform 9 ¾',
      subtitle: 'The Secret Platform // Acceptance Letter',
      icon: '🎫',
      story: 'Platform 9 ¾ is a magical brick barrier hidden at the terminal of the digital world. Creators who run through the wall with their creative wands instantly receive their Hogwarts Acceptance Letter—a blank, transparent SUI Passport NFT. Here, you declare your sovereign wizarding name (SuiNS) and ignite sponsored session keys to cast spells gaslessly.',
      tech: 'Deploys Sui Move Smart Contracts (genesis_passport.move) to issue dynamic Passport NFTs. Connects SuiNS domains (e.g., harry.sui) and sets ephemeral Ed25519 SessionKeys for gasless transactions.',
      linkText: 'Enter Platform 9 ¾',
      linkPath: '/register',
      glowClass: 'cyber-card-glow-indigo'
    },
    {
      id: 'sortinghat',
      title: 'Chapter I: The Houses & The Marauder\'s Map',
      subtitle: 'Sorting Hat & Marauder\'s Map // The Creative Houses',
      icon: '🦁',
      story: 'Hogwarts sorts creators into specialized houses based on content types: Gryffindor (🦁 Visual Media) for bold graphic sorcerers, Ravenclaw (🦅 Audio/Sound) for wise acoustic composers, Slytherin (🐍 Video/Motion) for ambitious video designers, and Hufflepuff (🦡 Text/Code) for dedicated builders. To ensure no visual dark magic (AI deepfakes or image forgery) passes, the Gryffindor Dormitory deploys the "Marauder\'s Map"—revealing every hidden pixel manipulation, metadata anomaly, and synthetic footprint.',
      tech: 'Mapped to the AASE (Agentic Authenticity Scoring Engine) where the ForensicAgent checks pixel compression (ELA), the MetadataAgent checks EXIF headers, and the K-9 AI Sniffer (Gemini 3.5 Flash) audits synthetic lighting. (Roadmap Note: Gryffindor/Visual Media checks are currently active. Audit workflows for Ravenclaw/Audio, Slytherin/Video, and Hufflepuff/Text content domains are being researched and will roll out sequentially.)',
      linkText: 'Cast Forensics Scan',
      linkPath: '/verify',
      glowClass: 'cyber-card-glow-gold'
    },
    {
      id: 'horcruxes',
      title: 'Chapter II: The Sharded Horcruxes',
      subtitle: 'Horcrux Splitting & Seal // Gringotts Lock',
      icon: '🔐',
      story: 'For your raw sketches and secrets not yet ready to be revealed, you can seal them inside the Gringotts vaults. Using the "Horcrux" spell, the secret decryption key is shattered into five distinct star fragments (Shards) and distributed to five Gringotts Node Guardians. No Dark Wizard can steal your secret; the Horcruxes will merge client-side and decrypt only when the true owner casts the unlocking spell.',
      tech: 'Secured via Shamir\'s Secret Sharing (3/5 threshold scheme) client-side key reconstruction. Raw evidence packages are encrypted and locked on Walrus sharded blob storage.',
      linkText: 'Seal Secret Vault',
      linkPath: '/vault',
      glowClass: 'cyber-card-glow-emerald'
    },
    {
      id: 'gringotts',
      title: 'Chapter III: Gringotts Automated Escrow',
      subtitle: 'Hogwarts Stamp Book // Dual-Mode Escrow Splits',
      icon: '🚂',
      story: 'Under Gringotts Automated Escrow, co-creation runs in two directions. In the Paid Remix Chain (Supply-Side), creators stamp their license fees in the Hogwarts Stamp Book to aggregate a final purchase price. In the Co-Creation Quest (Demand-Side), a buyer locks SUI Galleons in escrow as a bounty pool, and contributors modularly claim milestone shares. In both cases, the Gringotts vault splits and releases the coins atomically to all recorded contributors.',
      tech: 'Executed via co_creation_policy.move smart contracts. Integrates create_stamp_book and stamp_visa to register proportional contribution weights for Remix Chains, and create_and_fund_policy to hold Reverse Quest bounties, finalized by distribute_royalties atomic payouts.',
      linkText: 'View Escrow Blueprint',
      linkPath: '/blueprint',
      glowClass: 'cyber-card-glow-rose'
    }
  ]

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      {/* Background Sparkles */}
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }} />

      <div className="dashboard-container" style={{ position: 'relative', zIndex: 2, maxWidth: '900px', paddingBottom: '80px' }}>
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
            <span className="header-badge badge-gold" style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'var(--neon-gold)', color: 'var(--neon-gold)' }}>
              🧙‍♂️ HOGWARTS CREATIVE ACADEMY
            </span>
            <span className="header-badge" style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}>
              Web3 Tribute &amp; Parody
            </span>
          </div>
          <h2 className="cyber-title" style={{ fontSize: '42px', marginTop: '10px' }}>The Hogwarts Odyssey</h2>
          <p className="cyber-subtitle" style={{ margin: '15px auto 0', fontSize: '15px', maxWidth: '700px', lineHeight: 1.6 }}>
            An interactive Web3 parody mapping Harry Potter lore (Platform 9 ¾, Gringotts vaults, Horcrux shards, Marauder's Map) directly to Sui blockchain smart contracts, cryptographical algorithms, and Walrus storage.
          </p>
        </div>

        {/* Story Chapters List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
          {CHAPTERS.map((chap, idx) => (
            <div 
              key={chap.id} 
              className={`cyber-card ${chap.glowClass}`} 
              style={{ 
                padding: '36px', 
                background: 'rgba(8, 10, 22, 0.8)', 
                backdropFilter: 'blur(20px)',
                animation: `fadeInUp 0.6s ease both`,
                animationDelay: `${idx * 0.15}s`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#fff' }}>{chap.title}</h3>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', marginTop: '4px', display: 'block' }}>
                    {chap.subtitle}
                  </span>
                </div>
                <span style={{ fontSize: '32px' }}>{chap.icon}</span>
              </div>

              {/* Story Narrative */}
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '24px', letterSpacing: '0.3px' }}>
                "{chap.story}"
              </p>

              {/* Tech Underpinnings Box */}
              <div className="linear-card-recessed" style={{ padding: '15px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '4px', marginBottom: '20px' }}>
                <span style={{ display: 'block', fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '5px' }}>
                  ⚡ Hogwarts Web3 Technical Matrix
                </span>
                <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {chap.tech}
                </p>
              </div>

              {/* Action Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to={chap.linkPath} className="cyber-btn" style={{ padding: '8px 20px', fontSize: '11px' }}>
                  {chap.linkText} ➔
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Epilogue Card */}
        <div 
          className="cyber-card cyber-card-glow-indigo" 
          style={{ 
            marginTop: '60px', 
            padding: '40px', 
            textAlign: 'center', 
            background: 'rgba(8, 10, 22, 0.85)', 
            backdropFilter: 'blur(20px)',
            borderStyle: 'dashed' 
          }}
        >
          <span style={{ fontSize: '36px', display: 'block', marginBottom: '16px' }}>🏰</span>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>Epilogue: The Sovereign Wand</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '650px', margin: '0 auto 24px', fontStyle: 'italic' }}>
            "The magic of Hogwarts is now bound to the immutable Sui blockchain ledger. Run through Platform 9 ¾, sorting your visual creation, and secure your wizarding sovereignty forever."
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <Link to="/" className="cyber-btn cyber-btn-gold" style={{ padding: '10px 30px', fontSize: '12px', fontWeight: 700 }}>
              🚀 Open Gringotts Cockpit
            </Link>
            <Link to="/register" className="cyber-btn" style={{ padding: '10px 30px', fontSize: '12px' }}>
              🎫 Get Acceptance Letter
            </Link>
          </div>
        </div>

        {/* Parody Declaration Footer */}
        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
          ⚠️ <strong>Parody Disclaimer:</strong> This application is a creative non-commercial fan homage and parody submitted for the Sui Overflow 2026 Hackathon. All trademarks and characters related to "Harry Potter", "Gringotts", "Hogwarts", and "Marauder's Map" belong to their respective owners (J.K. Rowling and Warner Bros. Entertainment Inc.).
        </div>
      </div>
    </div>
  )
}
