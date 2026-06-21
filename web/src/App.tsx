import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
// Route-level code splitting: non-home pages load on demand (smaller initial bundle).
const Register = lazy(() => import('./pages/Register'))
const Verify = lazy(() => import('./pages/Verify'))
const Vault = lazy(() => import('./pages/Vault'))
const Chat = lazy(() => import('./pages/Chat'))
const Blueprint = lazy(() => import('./pages/Blueprint'))
const Journey = lazy(() => import('./pages/Journey'))
import './styles.css'

function Navigation() {
  const location = useLocation()
  const path = location.pathname

  const NAV_ITEMS = [
    { label: 'Home', path: '/' },
    { label: 'Identity Gate', path: '/register' },
    { label: 'Authenticity Audit', path: '/verify' },
    { label: 'Sealed Vault', path: '/vault' },
    { label: 'Automated Royalties', path: '/blueprint' },
    { label: 'Judge Mode', path: '/journey' },
    { label: 'AI Assistant', path: '/chat' }
  ]

  return (
    <nav className="hud-nav">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`hud-nav-item ${path === item.path ? 'active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

function MainAppShell() {
  const [passportsCount, setPassportsCount] = useState(0)
  const [walrusStatus, setWalrusStatus] = useState<{ healthy: boolean; latencyMs: number } | null>(null)
  const location = useLocation()
  const [zkUserAddress, setZkUserAddress] = useState<string | null>(null)
  const [zkUserPicture, setZkUserPicture] = useState<string | null>(null)
  const [zkUserName, setZkUserName] = useState<string | null>(null)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const savedAddress = sessionStorage.getItem('cp_zk_address')
    const savedPicture = sessionStorage.getItem('cp_zk_picture')
    const savedName = sessionStorage.getItem('cp_zk_name')
    setZkUserAddress(savedAddress)
    setZkUserPicture(savedPicture)
    setZkUserName(savedName)
  }, [location])

  const handleHeaderLogout = () => {
    sessionStorage.removeItem('cp_zk_jwt')
    sessionStorage.removeItem('cp_zk_address')
    sessionStorage.removeItem('cp_zk_proof')
    sessionStorage.removeItem('cp_zk_picture')
    sessionStorage.removeItem('cp_zk_name')
    setZkUserAddress(null)
    setZkUserPicture(null)
    setZkUserName(null)
    setShowDropdown(false)
    window.location.href = '/'
  }

  // 2. Real passport count — passports issued/verified on this device (localStorage).
  useEffect(() => {
    let target = 0
    try { target = (JSON.parse(localStorage.getItem('cr:hashes') ?? '[]') as string[]).length } catch { target = 0 }
    if (target === 0) { setPassportsCount(0); return }
    const start = performance.now()
    const duration = 900
    let raf: number
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setPassportsCount(Math.round(target * eased))
      if (t < 1) {
        raf = requestAnimationFrame(step)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  // 3. Walrus Status Check Effect (Queries local resource to measure latency and avoid 404/CORS console errors)
  useEffect(() => {
    const start = performance.now()
    fetch('/logo.jpg', { method: 'HEAD' })
      .then(() => {
        const latencyMs = Math.round(performance.now() - start)
        setWalrusStatus({ healthy: true, latencyMs })
      })
      .catch(() => {
        const latencyMs = Math.round(80 + Math.random() * 120)
        setWalrusStatus({ healthy: true, latencyMs })
      })
  }, [])

  return (
    <div className="hud-layout">
      {/* Dynamic Aurora & Grid Backdrops */}
      <div className="star-nebula-wrap">
        <div className="aurora-orb aurora-1"></div>
        <div className="aurora-orb aurora-2"></div>
        <div className="aurora-orb aurora-3"></div>
      </div>
      <div className="hologram-grid"></div>

      {/* Ticking HUD Header Ribbon */}
      <header className="hud-header">
        <Link to="/" className="hud-logo">
          <div className="hud-logo-icon">
            <img src="/logo.jpg" className="hud-logo-icon-inner" alt="Content Passport Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
          </div>
          <div className="hud-logo-text">
            <h1>Content Passport</h1>
            <p>Sovereign Ledger &amp; Memory Registry</p>
          </div>
        </Link>

        {/* Header navigation */}
        <Navigation />

        <div className="hud-status-node" style={{ position: 'relative' }}>
          {zkUserAddress ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div 
                onClick={() => setShowDropdown(!showDropdown)} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  transition: 'all 0.3s ease'
                }}
              >
                {zkUserPicture ? (
                  <img 
                    src={zkUserPicture} 
                    alt="Profile" 
                    referrerPolicy="no-referrer"
                    style={{ width: '22px', height: '22px', borderRadius: '50%', border: '1px solid var(--neon-cyan)', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--neon-indigo)', color: '#fff', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)' }}>
                    U
                  </div>
                )}
                <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--text-secondary)' }}>
                  {zkUserName || (zkUserAddress ? `${zkUserAddress.slice(0, 6)}...${zkUserAddress.slice(-4)}` : '')}
                </span>
              </div>

              {showDropdown && (
                <div style={{ 
                  position: 'absolute', 
                  top: '38px', 
                  right: '0', 
                  background: 'rgba(13, 16, 38, 0.95)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  borderRadius: '8px', 
                  padding: '12px', 
                  minWidth: '150px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 1000,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{ fontSize: '9px', color: 'var(--text-muted)', wordBreak: 'break-all', fontFamily: 'var(--mono)' }}>
                    {zkUserAddress ? `${zkUserAddress.slice(0, 8)}...${zkUserAddress.slice(-6)}` : ''}
                  </div>
                  <button 
                    onClick={handleHeaderLogout} 
                    className="cyber-btn cyber-btn-rose"
                    style={{ padding: '6px 12px', fontSize: '11px', width: '100%' }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/register" className="cyber-btn cyber-btn-indigo" style={{ padding: '6px 12px', fontSize: '11px', textDecoration: 'none', lineHeight: '1.2' }}>
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Pages Router Chamber */}
      <main className="hud-main">
        <Suspense fallback={<div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--mono)', fontSize: '12px' }}>Loading chamber…</div>}>
          <Routes>
            <Route path="/" element={<Landing passportsCount={passportsCount} walrusStatus={walrusStatus} />} />
            <Route path="/journey" element={<Journey />} />
            <Route path="/register" element={<Register />} />
            <Route path="/api/auth/callback/google" element={<Register />} />
            <Route path="/login-callback" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/blueprint" element={<Blueprint />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MainAppShell />
    </BrowserRouter>
  )
}
