import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  getOrSetEphemeralSession,
  buildGoogleAuthUrl,
  getJwtFromUrlHash,
  clearEphemeralSession,
} from '../lib/zklogin'
import { clearZkLoginSessionStorage, emitZkLoginSessionChanged } from '../lib/authSession'
import { getZkLoginSignature, generateNonce, getExtendedEphemeralPublicKey } from '@mysten/sui/zklogin'
import {
  CONTENT_RIGHT_PACKAGE_ID,
  firstCreatedObjectId,
  lastVerification,
  rememberOnchainState,
  shortId,
  suiscanTxUrl,
} from '../lib/suiNetwork'

function decodeJwt(token: string) {
  const parts = token.split('.')
  if (parts.length !== 3) {
    throw new Error('Invalid JWT format')
  }
  const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
  const padded = payload.padEnd(payload.length + ((4 - (payload.length % 4)) % 4), '=')
  const decoded = atob(padded)
  return JSON.parse(decoded)
}

export default function Register() {
  const navigate = useNavigate()
  const [suinsName, setSuinsName] = useState('')
  const [isMinting, setIsMinting] = useState(false)
  const [mintLogs, setMintLogs] = useState<string[]>([])
  const [passportData, setPassportData] = useState<{
    suins: string
    address: string
    issuedAt: string
    serial: string
    txDigest: string
    explorerUrl: string
  } | null>(null)

  const [googleClientId, setGoogleClientId] = useState('')
  const [serverPackageId, setServerPackageId] = useState('')
  const [zkLoginSaltStrategy, setZkLoginSaltStrategy] = useState('not-configured')
  const [currentEpoch, setCurrentEpoch] = useState(100)
  const [zkUserAddress, setZkUserAddress] = useState<string | null>(null)
  const [zkProof, setZkProof] = useState<any | null>(null)
  const [zkAddressSeed, setZkAddressSeed] = useState<string | null>(null)
  const [jwt, setJwt] = useState<string | null>(null)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const [mintProgress, setMintProgress] = useState(0)
  const [mintStatusText, setMintStatusText] = useState('')

  // Fetch configs on load
  useEffect(() => {
    fetch('/api/auth/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.googleClientId) setGoogleClientId(data.googleClientId)
        if (data.packageId) setServerPackageId(data.packageId)
        if (data.epoch) setCurrentEpoch(data.epoch)
        if (data.zkLoginSaltStrategy) setZkLoginSaltStrategy(data.zkLoginSaltStrategy)
      })
      .catch((err) => console.error('Failed to load auth config:', err))
  }, [])

  // Handle URL redirect or session restoration
  useEffect(() => {
    const savedAddress = sessionStorage.getItem('cp_zk_address')
    const savedProof = sessionStorage.getItem('cp_zk_proof')
    const savedAddressSeed = sessionStorage.getItem('cp_zk_address_seed')
    const savedJwt = sessionStorage.getItem('cp_zk_jwt')

    if (savedAddress && savedProof && savedAddressSeed && savedJwt) {
      setZkUserAddress(savedAddress)
      setZkProof(JSON.parse(savedProof))
      setZkAddressSeed(savedAddressSeed)
      setJwt(savedJwt)
      return
    }

    const urlJwt = getJwtFromUrlHash()
    if (urlJwt) {
      // Clean hash and rewrite path to /register
      navigate('/register', { replace: true })
      setJwt(urlJwt)
      sessionStorage.setItem('cp_zk_jwt', urlJwt)
      try {
        const decoded = decodeJwt(urlJwt)
        if (decoded.picture) sessionStorage.setItem('cp_zk_picture', decoded.picture)
        if (decoded.name) sessionStorage.setItem('cp_zk_name', decoded.name)
      } catch (e) {
        console.warn('Failed to extract Google user metadata:', e)
      }
      handleZkLogin(urlJwt)
    }
  }, [currentEpoch])

  const handleZkLogin = async (token: string) => {
    setIsLoggingIn(true)
    setMintLogs((prev) => [...prev, 'OIDC Token captured. Deriving zkLogin address seed...'])
    try {
      const session = getOrSetEphemeralSession(currentEpoch)
      const ephemeralPublicKeyB64 = getExtendedEphemeralPublicKey(session.keypair.getPublicKey())

      const response = await fetch('/api/auth/zklogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jwt: token,
          ephemeralPublicKeyB64,
          maxEpoch: session.maxEpoch,
          randomness: session.randomness,
        }),
      })

      const data = await response.json()
      if (!data.success) {
        throw new Error(data.error || 'zkLogin API returned failure')
      }

      setZkUserAddress(data.address)
      setZkProof(data.proof)
      setZkAddressSeed(data.addressSeed)

      sessionStorage.setItem('cp_zk_address', data.address)
      sessionStorage.setItem('cp_zk_proof', JSON.stringify(data.proof))
      sessionStorage.setItem('cp_zk_address_seed', data.addressSeed)
      emitZkLoginSessionChanged()

      setMintLogs((prev) => [
        ...prev,
        `Derived zkLogin address: ${shortId(data.address)}`,
        `Salt service strategy: ${data.saltStrategy || zkLoginSaltStrategy}`,
        'zkLogin validation complete. Privacy-safe auth receipt queued for MemWal memory.'
      ])
    } catch (err: any) {
      setMintLogs((prev) => [...prev, `[ERROR] zkLogin Address derivation failed: ${err.message || String(err)}`])
      console.error(err)
    } finally {
      setIsLoggingIn(false)
    }
  }

  const handleGoogleLogin = () => {
    if (!googleClientId) {
      setMintLogs((prev) => [...prev, '[CONFIG] AUTH_GOOGLE_ID is required for real Google zkLogin. Mock login is disabled.'])
      return
    }
    const session = getOrSetEphemeralSession(currentEpoch)
    const nonce = generateNonce(session.keypair.getPublicKey(), session.maxEpoch, session.randomness)
    const redirectUri = window.location.origin + '/login-callback'

    const authUrl = buildGoogleAuthUrl({
      clientId: googleClientId,
      redirectUri,
      nonce,
    })

    setMintLogs((prev) => [...prev, 'Redirecting to Google Account Authentication...'])
    window.location.href = authUrl
  }

  const handleLogout = () => {
    clearEphemeralSession()
    clearZkLoginSessionStorage()
    emitZkLoginSessionChanged()
    setZkUserAddress(null)
    setZkProof(null)
    setZkAddressSeed(null)
    setJwt(null)
    setMintLogs([])
    setPassportData(null)
  }

  const handleMintPassport = async () => {
    const activePackageId = serverPackageId || CONTENT_RIGHT_PACKAGE_ID
    if (!suinsName.trim() || !zkUserAddress || !activePackageId) return
    setIsMinting(true)
    setPassportData(null)
    setMintLogs([])
    setMintProgress(10)
    setMintStatusText('INITIATING')

    try {
      const verification = lastVerification()
      const contentHash = verification?.objective?.sha256 || `manual:${suinsName.trim().toLowerCase()}`
      const grade = verification?.assessment?.grade || 'A'
      const mediaBlobId = verification?.objective?.perceptualHash?.hash || `suins:${suinsName.trim()}`
      const evidenceBlobId = verification?.clueIds?.[0] || verification?.objective?.perceptualHash?.hash || 'local-evidence'

      setMintLogs((prev) => [...prev, `[10%] Initializing transaction schema for zkLogin identity: ${shortId(zkUserAddress)}`])
      setMintLogs((prev) => [...prev, '[30%] Contacting backend to construct transaction block (PTB) with Gas Sponsor... (Est. time: ~0.8s)'])
      setMintProgress(30)
      setMintStatusText('BUILDING PTB')

      const buildRes = await fetch('/api/gas/build-mint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: zkUserAddress,
          recipient: zkUserAddress,
          contentHash,
          grade,
          mediaBlobId,
          evidenceBlobId,
        })
      })

      const buildData = await buildRes.json()
      if (!buildData.success) {
        throw new Error(buildData.error || 'Failed to construct sponsored transaction')
      }

      setMintProgress(55)
      setMintStatusText('SIGNING')

      let txDigest = ''
      let explorerUrl = ''
      let passportObjectId = ''

      if (buildData.mockMode) {
        setMintLogs((prev) => [...prev, '[55%] [SANDBOX] Sponsor is in Mock Mode. Executing simulated state change...'])
        setMintProgress(75)
        setMintStatusText('BROADCASTING (SIMULATED)')
        
        const sponsorRes = await fetch('/api/gas/sponsor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            txBytesB64: buildData.txBytesB64,
            userSignature: 'mock_signature',
          })
        })

        const sponsorData = await sponsorRes.json()
        if (!sponsorData.success) {
          throw new Error(sponsorData.error || 'Simulated sponsor execution failed')
        }

        txDigest = sponsorData.digest
        explorerUrl = '#'
        passportObjectId = '0x_mock_passport_id_' + Math.random().toString(36).substring(7)
        setMintProgress(100)
        setMintStatusText('SUCCESS')
        setMintLogs((prev) => [...prev, `[100%] Simulated registration SUCCESS. Digest: ${txDigest}`])
      } else {
        setMintLogs((prev) => [...prev, '[55%] Sponsor transaction block received. Creating signature from Ephemeral Session Key...'])

        const txBytes = Uint8Array.from(atob(buildData.txBytesB64), (c) => c.charCodeAt(0))
        const session = getOrSetEphemeralSession(currentEpoch)
        const ephemeralSignature = await session.keypair.signTransaction(txBytes)

        if (!jwt) {
          throw new Error('OAuth JWT session missing or expired')
        }
        if (!zkAddressSeed) {
          throw new Error('zkLogin address seed missing. Please login again.')
        }

        const userZkSignature = getZkLoginSignature({
          inputs: {
            ...zkProof,
            addressSeed: zkAddressSeed,
          },
          maxEpoch: session.maxEpoch,
          userSignature: ephemeralSignature.signature,
        })

        setMintProgress(75)
        setMintStatusText('BROADCASTING')
        setMintLogs((prev) => [...prev, '[75%] Broadcasting combined signatures to Sui Blockchain network... (Est. time: ~2.0s)'])

        const sponsorRes = await fetch('/api/gas/sponsor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            txBytesB64: buildData.txBytesB64,
            userSignature: userZkSignature,
          })
        })

        const sponsorData = await sponsorRes.json()
        if (!sponsorData.success) {
          throw new Error(sponsorData.error || 'Sponsor transaction broadcast failed')
        }

        txDigest = sponsorData.digest
        explorerUrl = suiscanTxUrl(txDigest)
        passportObjectId = firstCreatedObjectId(sponsorData) || ''

        setMintProgress(100)
        setMintStatusText('SUCCESS')
        setMintLogs((prev) => [...prev, `[100%] Transaction confirmed on Sui! Digest: ${shortId(txDigest, 12, 8)}`])
        if (passportObjectId) {
          setMintLogs((prev) => [...prev, `[100%] Passport NFT object created: ${shortId(passportObjectId)}`])
        }
      }

      const timestamp = new Date().toUTCString()
      rememberOnchainState({
        passportId: passportObjectId,
        passportTxDigest: txDigest,
        suins: suinsName.endsWith('.sui') ? suinsName : suinsName + '.sui',
      })

      setPassportData({
        suins: suinsName.endsWith('.sui') ? suinsName : suinsName + '.sui',
        address: passportObjectId || zkUserAddress,
        issuedAt: timestamp,
        serial: `SUI-${txDigest.slice(0, 10).toUpperCase()}`,
        txDigest,
        explorerUrl,
      })

    } catch (error: any) {
      setMintLogs((prev) => [...prev, `[ERROR] Mint failed: ${error.message || String(error)}`])
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '1000px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="header-badge">Prologue · Identity Gate</span>
        <h2 className="cyber-title">On-chain Identity Registry</h2>
        <p className="cyber-subtitle" style={{ margin: '10px auto 0' }}>
          Declare your sovereign SuiNS (Sui Name Service) identity using your Google account to instantly mint a creator passport with zero gas fees.
        </p>
      </div>

      <div className="grid-layout-2">
        {/* Registration Form & Console */}
        <div className="cyber-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 className="card-title">Passport Authority Form</h3>
            <p className="card-subtitle" style={{ margin: '4px 0 0 0' }}>Follow the sequential pipeline below to establish your sovereign creator identity.</p>
          </div>

          {/* STEP 1: Google Identity Verification */}
          <div className="linear-card-recessed" style={{ 
            padding: '20px', 
            borderRadius: '8px', 
            border: '1px solid rgba(255, 255, 255, 0.05)', 
            background: 'rgba(255, 255, 255, 0.02)',
            opacity: isMinting ? 0.6 : 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span className="header-badge badge-indigo" style={{ padding: '2px 8px', fontSize: '9px' }}>Step 1</span>
              <strong style={{ color: '#fff', fontSize: '13px' }}>Google Identity Verification (zkLogin)</strong>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
              Authenticate with your Google account. The system generates an ephemeral session key pair in browser memory and maps your Google ID securely to a derived Sui address on-chain.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
              <div>
                <strong style={{ color: zkUserAddress ? 'var(--neon-emerald)' : 'var(--neon-rose)', fontSize: '12px', fontFamily: 'var(--mono)', display: 'block' }}>
                  {zkUserAddress ? `✓ Verified: ${shortId(zkUserAddress)}` : '✗ Authentication Required'}
                </strong>
                {zkUserAddress && (
                  <div style={{ color: 'var(--text-muted)', fontSize: '10px', marginTop: '4px', fontFamily: 'var(--mono)' }}>
                    Salt Service: {zkLoginSaltStrategy === 'hkdf-master-seed' ? 'Per-User HKDF' : zkLoginSaltStrategy}
                  </div>
                )}
              </div>
              {zkUserAddress ? (
                <button 
                  onClick={handleLogout} 
                  disabled={isMinting}
                  className="cyber-btn cyber-btn-rose"
                  style={{ padding: '8px 16px', fontSize: '11px' }}
                >
                  Logout
                </button>
              ) : (
                <button 
                  onClick={handleGoogleLogin} 
                  disabled={isLoggingIn}
                  className="cyber-btn cyber-btn-indigo"
                  style={{ 
                    padding: '10px 18px', 
                    fontSize: '11px', 
                    fontWeight: 700, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    boxShadow: '0 0 15px rgba(99, 102, 241, 0.3)'
                  }}
                >
                  {isLoggingIn ? 'Connecting...' : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                      </svg>
                      Sign In with Google
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* STEP 2: Choose SuiNS Name */}
          <div className="linear-card-recessed" style={{ 
            padding: '20px', 
            borderRadius: '8px', 
            border: '1px solid rgba(255, 255, 255, 0.05)', 
            background: 'rgba(255, 255, 255, 0.02)',
            opacity: !zkUserAddress || isMinting ? 0.5 : 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span className={`header-badge ${zkUserAddress ? 'badge-indigo' : 'badge-secondary'}`} style={{ padding: '2px 8px', fontSize: '9px' }}>Step 2</span>
              <strong style={{ color: '#fff', fontSize: '13px' }}>Identity Name Selection (SuiNS)</strong>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
              Provide a username/alias. The system registers this name as a unique SuiNS identity mapping on the blockchain, representing your creative signature.
            </p>
            <div className="cyber-input-wrap" style={{ margin: 0 }}>
              <input
                type="text"
                placeholder="e.g. charles.sui"
                value={suinsName}
                onChange={(e) => setSuinsName(e.target.value)}
                disabled={isMinting || !zkUserAddress}
                style={{ width: '100%', padding: '10px 14px' }}
              />
            </div>
          </div>

          {/* STEP 3: Sponsored Passport Mint */}
          <div className="linear-card-recessed" style={{ 
            padding: '20px', 
            borderRadius: '8px', 
            border: '1px solid rgba(255, 255, 255, 0.05)', 
            background: 'rgba(255, 255, 255, 0.02)',
            opacity: !zkUserAddress || !suinsName.trim() || isMinting ? 0.5 : 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span className={`header-badge ${zkUserAddress && suinsName.trim() ? 'badge-indigo' : 'badge-secondary'}`} style={{ padding: '2px 8px', fontSize: '9px' }}>Step 3</span>
              <strong style={{ color: '#fff', fontSize: '13px' }}>Sovereign Passport Minting (Gasless)</strong>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
              Construct and broadcast the on-chain minting transaction. The backend sponsor wallet pays 100% of the gas fee ($0.00 cost for you).
            </p>
            <button
              onClick={handleMintPassport}
              disabled={isMinting || !suinsName.trim() || !zkUserAddress}
              className="cyber-btn cyber-btn-indigo"
              style={{ width: '100%', padding: '12px 0', fontWeight: 'bold', fontSize: '12px' }}
            >
              {isMinting ? 'Minting in progress...' : 'Mint Creator Passport'}
            </button>

            {/* Hologram Terminal Logs inside Step 3 */}
            {(isMinting || mintLogs.length > 0) && (
              <div style={{ marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="header-badge" style={{ fontSize: '9px' }}>Minting Terminal</span>
                  {isMinting && (
                    <span style={{ fontSize: '10px', color: 'var(--neon-cyan)', fontFamily: 'var(--mono)', fontWeight: 'bold' }}>
                      {mintStatusText} ({mintProgress}%)
                    </span>
                  )}
                </div>
                
                {isMinting && (
                  <div style={{ marginBottom: '12px', background: 'rgba(255, 255, 255, 0.02)', padding: '8px', borderRadius: '6px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${mintProgress}%`, 
                          height: '100%', 
                          background: 'linear-gradient(90deg, var(--neon-cyan) 0%, var(--neon-emerald) 100%)', 
                          boxShadow: '0 0 8px var(--neon-cyan)', 
                          transition: 'width 0.4s ease' 
                        }} 
                      />
                    </div>
                  </div>
                )}

                <div className="console-container" style={{ height: '140px', fontSize: '10.5px' }}>
                  {mintLogs.map((log, idx) => (
                    <div key={idx} className="console-line">
                      <span className="console-time">[{new Date().toLocaleTimeString()}]</span>
                      <span className={`console-tag ${log.startsWith('[ERROR]') ? 'tag-rose' : log.includes('SUCCESS') || log.includes('confirmed') || log.includes('object created') ? 'tag-success' : 'tag-system'}`}>
                        {log.startsWith('[ERROR]') ? '[FAIL]' : log.includes('SUCCESS') || log.includes('confirmed') || log.includes('object created') ? '[TX]' : '[PROCESS]'}
                      </span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: Next Stage Flow Link */}
          {passportData && (
            <div className="linear-card-recessed" style={{ 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid rgba(16, 185, 129, 0.25)', 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(14, 165, 233, 0.06) 100%)',
              animation: 'fadeIn 0.5s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className="header-badge badge-emerald" style={{ padding: '2px 8px', fontSize: '9px' }}>Step 4</span>
                <strong style={{ color: 'var(--neon-emerald)', fontSize: '13px' }}>Identity Registry SUCCESS</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
                Your sovereign Sui Creator Passport is minted! Proceed to the **Authenticity Audit** stage to audit your media files (images) and establish their on-chain provenance.
              </p>
              <Link 
                to="/verify" 
                className="cyber-btn cyber-btn-emerald"
                style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '10px 16px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                  textDecoration: 'none'
                }}
              >
                🔍 Proceed to Authenticity Audit (Verify)
              </Link>
            </div>
          )}
        </div>

        {/* 3D Holographic Passport Card Widget */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {passportData ? (
            <div className="holo-passport-container" style={{ animation: 'fadeInUp 0.6s ease' }}>
              <div className={`holo-passport certified ${isMinting ? 'scanning' : ''}`} style={{ backgroundImage: "url('/digital-passport.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {isMinting && <div className="holo-laser-scanner"></div>}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 800, color: 'var(--neon-gold)', letterSpacing: '1px' }}>
                    SUI CREATOR PASSPORT
                  </span>
                </div>

                <div className="holo-seal-emblem"></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>SOVEREIGN IDENTITY</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', fontFamily: 'var(--sans)' }}>{passportData.suins}</div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '8px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>OBJECT ADDRESS</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--mono)' }}>{shortId(passportData.address)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '8px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>SERIAL NUMBER</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--mono)' }}>{shortId(passportData.serial, 10, 0)}</div>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '7px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>ISSUED TIMESTAMP</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px', whiteSpace: 'nowrap' }}>{passportData.issuedAt}</div>
                    </div>
                    {passportData.txDigest !== 'mock' && passportData.explorerUrl !== '#' ? (
                      <a href={passportData.explorerUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none', color: 'var(--neon-cyan)', fontSize: '8px', fontFamily: 'var(--mono)', border: '1px solid rgba(14, 165, 233, 0.3)', borderRadius: '4px', padding: '2px 6px', background: 'rgba(14, 165, 233, 0.05)' }}>
                        Suiscan 🔗
                      </a>
                    ) : (
                      <span style={{ color: 'var(--neon-gold)', fontSize: '8px', fontFamily: 'var(--mono)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: '4px', padding: '2px 6px', background: 'rgba(234, 179, 8, 0.05)' }}>
                        Mock Sandbox
                      </span>
                    )}
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
              <span style={{ fontSize: '40px', marginBottom: '16px' }}></span>
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
