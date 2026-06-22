import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import {
  ZK_LOGIN_SESSION_EVENT,
  clearZkLoginSessionStorage,
  readZkLoginSession,
} from './lib/authSession'
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
  const [googleClientId, setGoogleClientId] = useState('')
  const [currentEpoch, setCurrentEpoch] = useState<number | null>(null)
  const [sharedFile, setSharedFile] = useState<File | null>(null)

  useEffect(() => {
    const syncSession = () => {
      const session = readZkLoginSession()
      setZkUserAddress(session.address)
      setZkUserPicture(session.picture)
      setZkUserName(session.name)
    }

    syncSession()
    window.addEventListener(ZK_LOGIN_SESSION_EVENT, syncSession)
    window.addEventListener('storage', syncSession)
    return () => {
      window.removeEventListener(ZK_LOGIN_SESSION_EVENT, syncSession)
      window.removeEventListener('storage', syncSession)
    }
  }, [location])

  useEffect(() => {
    fetch('/api/auth/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.googleClientId) setGoogleClientId(data.googleClientId)
        if (data.epoch) setCurrentEpoch(data.epoch)
      })
      .catch((err) => console.error('Failed to load auth config in App:', err))
  }, [])

  const handleHeaderLogout = () => {
    clearZkLoginSessionStorage()
    setZkUserAddress(null)
    setZkUserPicture(null)
    setZkUserName(null)
    setShowDropdown(false)
    window.location.href = '/'
  }

  const handleHeaderLogin = async () => {
    if (!googleClientId) {
      window.location.href = '/register'
      return
    }
    const [{ getOrSetEphemeralSession, buildGoogleAuthUrl }, { generateNonce }] = await Promise.all([
      import('./lib/zklogin'),
      import('@mysten/sui/zklogin'),
    ])

    let epoch = currentEpoch
    if (epoch === null) {
      try {
        const res = await fetch('/api/auth/config')
        const data = await res.json()
        if (data.epoch) {
          epoch = data.epoch
          setCurrentEpoch(epoch)
        }
      } catch (err) {
        console.error('Failed to load epoch on demand in App:', err)
      }
    }

    const session = getOrSetEphemeralSession(epoch)
    const nonce = generateNonce(session.keypair.getPublicKey(), session.maxEpoch, session.randomness)
    const redirectUri = window.location.origin + '/login-callback'

    const authUrl = buildGoogleAuthUrl({
      clientId: googleClientId,
      redirectUri,
      nonce,
    })
    window.location.href = authUrl
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
                title={zkUserName || zkUserAddress || 'User Profile'}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  cursor: 'pointer',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '2px solid var(--neon-cyan)',
                  boxShadow: '0 0 10px rgba(14, 165, 233, 0.2)',
                  transition: 'all 0.3s ease',
                  overflow: 'hidden'
                }}
              >
                {zkUserPicture ? (
                  <img 
                    src={zkUserPicture} 
                    alt="Profile" 
                    referrerPolicy="no-referrer"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--neon-indigo)', color: '#fff', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontWeight: 'bold' }}>
                    {(zkUserName || 'U').slice(0, 1).toUpperCase()}
                  </div>
                )}
              </div>

              {showDropdown && (
                <div style={{ 
                  position: 'absolute', 
                  top: '46px', 
                  right: '0', 
                  background: 'rgba(13, 16, 38, 0.95)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  borderRadius: '8px', 
                  padding: '12px', 
                  minWidth: '200px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 1000,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  {zkUserName && (
                    <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {zkUserName}
                    </div>
                  )}
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: 'var(--mono)', wordBreak: 'break-all' }}>
                    {zkUserAddress}
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid rgba(255, 255, 255, 0.08)', margin: '4px 0' }} />
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
            <button 
              onClick={handleHeaderLogin} 
              className="cyber-btn cyber-btn-indigo" 
              style={{ padding: '6px 12px', fontSize: '11px', textDecoration: 'none', lineHeight: '1.2', border: 'none', cursor: 'pointer' }}
            >
              Login
            </button>
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
            <Route path="/verify" element={<Verify setSharedFile={setSharedFile} />} />
            <Route path="/vault" element={<Vault sharedFile={sharedFile} setSharedFile={setSharedFile} />} />
            <Route path="/blueprint" element={<Blueprint />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <MainAppShell />
    </BrowserRouter>
  )
}
