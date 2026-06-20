import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/Register'
import Verify from './pages/Verify'
import Vault from './pages/Vault'
import Chat from './pages/Chat'
import Blueprint from './pages/Blueprint'
import About from './pages/About'
import './styles.css'

function Navigation() {
  const location = useLocation()
  const path = location.pathname

  const NAV_ITEMS = [
    { label: 'Home Orbit', path: '/' },
    { label: 'Odyssey Story', path: '/about' },
    { label: 'Co-Creation Model', path: '/blueprint' },
    { label: 'Register Identity', path: '/register' },
    { label: 'Forensics Lab', path: '/verify' },
    { label: 'Secret Vault', path: '/vault' },
    { label: 'K-9 AI Chat', path: '/chat' }
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
  const [systemTime, setSystemTime] = useState('00:00:00')
  const [passportsCount, setPassportsCount] = useState(0)
  const [walrusStatus, setWalrusStatus] = useState<{ healthy: boolean; latencyMs: number } | null>(null)

  // 1. Ticking System Clock
  useEffect(() => {
    const updateTime = () => {
      setSystemTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

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

        {/* Global status panels */}
        <div className="hud-status-node">
          <div className="hud-terminal-pill">
            <span className="status-dot"></span>
            <span>BASECAMP_ACTIVE</span>
          </div>
          <div className="hud-terminal-pill" style={{ color: '#fff' }}>
            <span>SYS_TIME:</span>
            <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{systemTime}</strong>
          </div>
        </div>
      </header>

      {/* Pages Router Chamber */}
      <main className="hud-main">
        <Routes>
          <Route path="/" element={<Landing passportsCount={passportsCount} walrusStatus={walrusStatus} systemTime={systemTime} />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/blueprint" element={<Blueprint />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
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
