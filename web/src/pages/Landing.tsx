import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

interface LandingProps {
  passportsCount: number
  walrusStatus: { healthy: boolean; latencyMs: number } | null
}

// Particle class for the Galaxy Vortex
interface Star {
  x: number
  y: number
  z: number
  color: string
}

export default function Landing({ passportsCount, walrusStatus }: LandingProps) {
  const [activePortal, setActivePortal] = useState<number | null>(null)
  const [showIntro, setShowIntro] = useState<boolean>(false)
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Star Wars/Galaxy Vortex animation logic
  useEffect(() => {
    if (!showIntro) return

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

    // Generate stars for vortex
    const stars: Star[] = []
    const colors = ['#6366f1', '#06b6d4', '#f59e0b', '#ec4899', '#ffffff']
    for (let i = 0; i < 400; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    const speed = 2.5 // Speed of flying into the center

    const draw = () => {
      // Create a fading black trail for travel illusion
      ctx.fillStyle = 'rgba(4, 5, 13, 0.15)'
      ctx.fillRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2

      stars.forEach((star) => {
        // Move stars closer (simulating moving forward through space)
        star.z -= speed

        // If star passes the camera, reset it to the back
        if (star.z <= 0) {
          star.z = width
          star.x = Math.random() * width - width / 2
          star.y = Math.random() * height - height / 2
        }

        // Perspective projection
        const px = (star.x / star.z) * width + cx
        const py = (star.y / star.z) * height + cy
        const size = ((width - star.z) / width) * 4

        // Draw star with spiral rotation effect
        const angle = star.z * 0.002 // Rotation angle based on depth
        const rotatedX = (px - cx) * Math.cos(angle) - (py - cy) * Math.sin(angle) + cx
        const rotatedY = (px - cx) * Math.sin(angle) + (py - cy) * Math.cos(angle) + cy

        if (rotatedX >= 0 && rotatedX <= width && rotatedY >= 0 && rotatedY <= height) {
          ctx.beginPath()
          ctx.arc(rotatedX, rotatedY, Math.max(0.5, size), 0, Math.PI * 2)
          ctx.fillStyle = star.color
          ctx.shadowBlur = size * 2
          ctx.shadowColor = star.color
          ctx.fill()
        }
      })

      // Draw faint center nebula glow
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, width * 0.3)
      grad.addColorStop(0, 'rgba(99, 102, 241, 0.15)')
      grad.addColorStop(0.5, 'rgba(6, 182, 212, 0.05)')
      grad.addColorStop(1, 'rgba(4, 5, 13, 0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, width * 0.3, 0, Math.PI * 2)
      ctx.fill()

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [showIntro])

  const handleEnterDashboard = () => {
    sessionStorage.setItem('cp_intro_seen', 'true')
    setShowIntro(false)
  }

  const PORTALS = [
    {
      id: 0,
      title: 'Identity Gate',
      badge: 'Identity Registry',
      desc: 'Declare your sovereign SuiNS identity, establish ephemeral cryptographic session keys, and mint an immutable, tamper-proof creator passport NFT.',
      icon: '',
      path: '/register',
      colorClass: 'cyber-card-glow-indigo'
    },
    {
      id: 1,
      title: 'Authenticity Lab',
      badge: 'Forensics & EXIF Audit',
      desc: 'Execute multi-agent forensics check including Error Level Analysis (ELA) pixel compression metrics, EXIF header consistency, and Gemini AISniffer verification.',
      icon: '',
      path: '/verify',
      colorClass: 'cyber-card-glow-gold',
      badgeColor: 'badge-gold'
    },
    {
      id: 2,
      title: 'Sharded Secret Vault',
      badge: 'Threshold Encryption',
      desc: 'Lock and seal raw digital masterpieces in decentralized Walrus blobs using Shamir Secret Sharing (3/5) cryptography and multi-party sign approvals.',
      icon: '',
      path: '/vault',
      colorClass: 'cyber-card-glow-emerald',
      badgeColor: 'badge-emerald'
    },
    {
      id: 3,
      title: 'Co-Creation Model',
      badge: 'Sui Move Smart Escrow',
      desc: 'Deploy co_creation_policy.move smart contracts to automatically route and atomic-split royalties among contributors as works are remixed and stamped.',
      icon: '',
      path: '/blueprint',
      colorClass: 'cyber-card-glow-rose',
      badgeColor: 'badge-rose'
    }
  ]

  if (showIntro) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: '#04050d',
        zIndex: 9999,
        overflow: 'hidden',
        fontFamily: 'var(--sans)',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Particle Canvas */}
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }} />

        {/* Ambient Dark Stars Vignette Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 20%, #04050d 80%)',
          zIndex: 2,
          pointerEvents: 'none'
        }} />

        {/* Concise static intro */}
        <div style={{ position: 'relative', zIndex: 3, width: '90%', maxWidth: '760px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'var(--neon-cyan)', marginBottom: '18px', letterSpacing: '4px' }}>
            CONTENT PASSPORT
          </p>
          <h4 style={{ fontSize: '34px', color: '#fff', fontWeight: 800, lineHeight: 1.2, marginBottom: '18px' }}>
            Prove your work. License it on autopilot.
          </h4>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Verify authenticity with open forensic standards, seal your drafts, and let approved
            recreations split royalties automatically — all on Sui &amp; Walrus.
          </p>
        </div>

        {/* Action Controls */}
        <div style={{ position: 'relative', zIndex: 4, marginTop: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={handleEnterDashboard}
            className="cyber-btn cyber-btn-gold"
            style={{
              padding: '16px 36px',
              fontSize: '14px',
              borderRadius: '30px',
              fontWeight: 800,
              boxShadow: '0 0 25px var(--neon-gold-glow)',
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}
          >
             Enter Basecamp Cockpit
          </button>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
            Establishing gasless SessionKey tunnel to Sui network...
          </span>
        </div>

        {/* Global Star Wars Crawl CSS Injection */}
        <style>{`
          @keyframes crawl {
            0% {
              top: 100%;
              opacity: 0;
            }
            3% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              top: -120%;
              opacity: 0;
            }
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="dashboard-container">
      {/* Premium Hero Intro Header */}
      <div style={{ textAlign: 'center', margin: '40px auto 60px', maxWidth: '820px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <span className="header-badge">Magical Border Control Ecosystem</span>
          <a href="#odyssey-section" className="header-badge badge-gold" style={{ textDecoration: 'none', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
             Read Odyssey Story
          </a>
          <Link to="/journey" className="header-badge badge-emerald" style={{ textDecoration: 'none', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
             Judge Mode
          </Link>
          <button 
            onClick={() => setShowIntro(true)} 
            className="header-badge" 
            style={{ border: '1px solid rgba(255, 255, 255, 0.15)', cursor: 'pointer', background: 'rgba(255,255,255,0.03)' }}
          >
             Watch Trailer
          </button>
        </div>
        <h2 className="cyber-title" style={{ fontSize: '52px' }}>
          Sovereign Media Verification <br />
          <span style={{ background: 'linear-gradient(135deg, var(--neon-indigo), var(--neon-cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            &amp; Art On-chain Border
          </span>
        </h2>
        <p className="cyber-subtitle" style={{ margin: '20px auto 0', fontSize: '16px' }}>
          Content Passport is an integrated creator protection ecosystem merging on-chain identity, cryptographic sharded storage, and multi-agent AI verification. Step into any chamber below to pilot the sub-systems.
        </p>
        <div style={{
          margin: '40px auto 0',
          maxWidth: '720px',
          width: '100%',
          aspectRatio: '16/9',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 40px rgba(99, 102, 241, 0.15)',
          background: '#000'
        }}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/RcnUwCv1lic"
            title="Content Passport Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
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

      {/* ==================== THE ODYSSEY & SECURITY TRUST MATRIX ==================== */}
      <div id="odyssey-section" className="grid-layout-2" style={{ gap: '40px', margin: '40px 0 60px' }}>
        {/* Left Column: The Odyssey Narrative Saga */}
        <div className="cyber-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <span className="header-badge badge-gold" style={{ marginBottom: '8px' }}>THE CREATOR PROVENANCE SAGA</span>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', margin: 0 }}>The Odyssey Chapters</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
              A sequential workflow mapping creative ownership and trust directly to Sui smart contracts and distributed storage.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderLeft: '1px dashed var(--border-light)', paddingLeft: '20px', marginLeft: '10px' }}>
            <div style={{ position: 'relative' }}>
              <span className="status-dot" style={{ position: 'absolute', left: '-26px', top: '4px', backgroundColor: 'var(--neon-indigo)' }}></span>
              <strong style={{ fontSize: '14px', color: '#fff', display: 'block' }}>Prologue: Identity Gate</strong>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                Declare your sovereign SuiNS name, establish ephemeral cryptographic session keys, and mint your immutable Genesis Passport NFT.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <span className="status-dot" style={{ position: 'absolute', left: '-26px', top: '4px', backgroundColor: 'var(--neon-gold)' }}></span>
              <strong style={{ fontSize: '14px', color: '#fff', display: 'block' }}>Chapter I: Authenticity Audit</strong>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                Perform multi-agent forensic audits. Evaluate image pixel compression (ELA), EXIF header profiles, and Gemini Visual AI patterns.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <span className="status-dot" style={{ position: 'absolute', left: '-26px', top: '4px', backgroundColor: 'var(--neon-emerald)' }}></span>
              <strong style={{ fontSize: '14px', color: '#fff', display: 'block' }}>Chapter II: Sealed Vault</strong>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                Lock raw high-fidelity drafts under browser-level AES-256 envelope encryption, splitting keys into 5 sharded shares across Walrus nodes.
              </p>
            </div>

            <div style={{ position: 'relative' }}>
              <span className="status-dot" style={{ position: 'absolute', left: '-26px', top: '4px', backgroundColor: 'var(--neon-rose)' }}></span>
              <strong style={{ fontSize: '14px', color: '#fff', display: 'block' }}>Chapter III: Automated Royalties</strong>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.5 }}>
                Deploy co-creation policy registers on-chain to instantly route and split atomic payouts to creators upon licensing.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Security & Infrastructure Trust Grid */}
        <div className="cyber-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '24px', borderColor: 'rgba(16, 185, 129, 0.15)' }}>
          <div>
            <span className="header-badge badge-emerald" style={{ marginBottom: '8px' }}>ENTERPRISE DEPLOYMENT SECURITY</span>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', margin: 0 }}>Infrastructure Trust Matrix</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>
              High-level cryptographic protocols and cloud design patterns securing the server environment.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div className="linear-card-recessed" style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '13px', color: '#fff' }}>OIDC Federated Trust</strong>
                <span className="header-badge badge-emerald" style={{ margin: 0, fontSize: '9px' }}>ACTIVE (Keyless WIF)</span>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Stateless deployments authenticated keylessly via short-lived GitHub-GCP federated tokens. Zero permanent credentials.
              </p>
            </div>

            <div className="linear-card-recessed" style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '13px', color: '#fff' }}>Sovereign AI Runtime</strong>
                <span className="header-badge badge-emerald" style={{ margin: 0, fontSize: '9px' }}>ACTIVE (Vertex AI IAM)</span>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                AI visual analysis is routed via Vertex AI utilizing direct Service Account IAM bindings. Zero static AI API keys stored.
              </p>
            </div>

            <div className="linear-card-recessed" style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ fontSize: '13px', color: '#fff' }}>Isolated Secrets Injection</strong>
                <span className="header-badge badge-emerald" style={{ margin: 0, fontSize: '9px' }}>ACTIVE (GCP Secret Manager)</span>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Blockchain private keys are securely sealed in GCP Secret Manager and mounted only in the ephemeral memory space of the container.
              </p>
            </div>
          </div>
        </div>
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
              <span className="indicator-card-label">PASSPORTS (THIS DEVICE)</span>
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
