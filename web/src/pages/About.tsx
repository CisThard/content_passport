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
      id: 'gate',
      title: 'Prologue: Identity Gate',
      subtitle: 'Identity gate · blank passport',
      icon: '',
      story: 'Step through the identity gate and you’re issued a blank Content Passport — claim your sovereign name and start signing gaslessly.',
      tech: 'genesis_passport.move mints the Passport NFT; SuiNS + ephemeral Ed25519 session keys enable gasless transactions.',
      linkText: 'Enter Identity Gate',
      linkPath: '/register',
      glowClass: 'cyber-card-glow-indigo'
    },
    {
      id: 'audit',
      title: 'Chapter I: Authenticity Audit',
      subtitle: 'Forensics before issuance',
      icon: '',
      story: 'Every upload is checked for manipulation before it earns a passport.',
      tech: 'AASE combines ELA (forensics), EXIF (metadata) and a Gemini AI-sniffer. Visual media is live; audio/video/text domains are on the roadmap.',
      linkText: 'Run forensics',
      linkPath: '/verify',
      glowClass: 'cyber-card-glow-gold'
    },
    {
      id: 'vault',
      title: 'Chapter II: Sealed Vault',
      subtitle: 'Threshold-encrypted drafts',
      icon: '',
      story: 'Seal raw drafts so only you can reopen them — the key is split into 5 shards and recombined in your browser.',
      tech: 'Shamir 3-of-5 secret sharing + AES-256; sealed blobs stored on Walrus.',
      linkText: 'Open vault',
      linkPath: '/vault',
      glowClass: 'cyber-card-glow-emerald'
    },
    {
      id: 'royalties',
      title: 'Chapter III: Automated Royalties',
      subtitle: 'Set the split once',
      icon: '',
      story: 'Set your royalty split once; when a remix earns, revenue routes to every contributor in a single transaction.',
      tech: 'co_creation_policy.move records weights and runs atomic distribute_royalties payouts.',
      linkText: 'View blueprint',
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
               AURELIUS CREATIVE ACADEMY
            </span>
            <span className="header-badge" style={{ background: 'rgba(255, 255, 255, 0.05)', color: 'var(--text-muted)' }}>
              A magical-realism Web3 world
            </span>
          </div>
          <h2 className="cyber-title" style={{ fontSize: '42px', marginTop: '10px' }}>The Content Passport Odyssey</h2>
          <p className="cyber-subtitle" style={{ margin: '15px auto 0', fontSize: '15px', maxWidth: '700px', lineHeight: 1.6 }}>
            A four-chapter journey that maps creative provenance — issuance, forensic audit, sealed vaults, and automated royalties — directly to Sui smart contracts, threshold cryptography, and Walrus storage.
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
                   Web3 Technical Matrix
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
          <span style={{ fontSize: '36px', display: 'block', marginBottom: '16px' }}></span>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>Epilogue: Sovereign by Default</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '650px', margin: '0 auto 24px', fontStyle: 'italic' }}>
            "Creative provenance, bound to the immutable Sui ledger. Pass through the Identity Gate, prove your work, and own your sovereignty forever."
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            <Link to="/" className="cyber-btn cyber-btn-gold" style={{ padding: '10px 30px', fontSize: '12px', fontWeight: 700 }}>
               Open Cockpit
            </Link>
            <Link to="/register" className="cyber-btn" style={{ padding: '10px 30px', fontSize: '12px' }}>
               Get your passport
            </Link>
          </div>
        </div>

        {/* Inspiration note */}
        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
          A magical-realism world built for the Sui Overflow 2026 Hackathon. Names, places, and characters are original to this project.
        </div>
      </div>
    </div>
  )
}
