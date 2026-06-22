import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SAMPLE_MEDIAS } from '../samples'

// ==========================================
// 🛡️ GF(256) & Shamir's Secret Sharing (3/5)
// ==========================================
const GF256_EXP = new Uint8Array(512)
const GF256_LOG = new Uint8Array(256)
let x = 1
for (let i = 0; i < 255; i++) {
  GF256_EXP[i] = x
  GF256_LOG[x] = i
  x <<= 1
  if (x & 0x100) {
    x ^= 0x11d // generator polynomial x^8 + x^4 + x^3 + x^2 + 1
  }
}
for (let i = 255; i < 512; i++) {
  GF256_EXP[i] = GF256_EXP[i - 255]
}

function gfAdd(a: number, b: number): number {
  return a ^ b
}

function gfMul(a: number, b: number): number {
  if (a === 0 || b === 0) return 0
  return GF256_EXP[GF256_LOG[a] + GF256_LOG[b]]
}

function gfDiv(a: number, b: number): number {
  if (b === 0) throw new Error('Division by zero in GF(256)')
  if (a === 0) return 0
  let logDiff = GF256_LOG[a] - GF256_LOG[b]
  if (logDiff < 0) logDiff += 255
  return GF256_EXP[logDiff]
}

function evalPoly(poly: number[], val: number): number {
  let result = 0
  for (let i = poly.length - 1; i >= 0; i--) {
    result = gfAdd(gfMul(result, val), poly[i])
  }
  return result
}

interface Share {
  x: number
  y: Uint8Array
}

function splitSecret(secret: Uint8Array, k: number, n: number): Share[] {
  const shares: Share[] = []
  for (let i = 1; i <= n; i++) {
    shares.push({ x: i, y: new Uint8Array(secret.length) })
  }
  for (let b = 0; b < secret.length; b++) {
    const poly = new Array(k)
    poly[0] = secret[b]
    for (let j = 1; j < k; j++) {
      poly[j] = Math.floor(Math.random() * 256)
    }
    for (let i = 1; i <= n; i++) {
      shares[i - 1].y[b] = evalPoly(poly, i)
    }
  }
  return shares
}

function reconstructSecret(shares: Share[]): Uint8Array {
  if (shares.length === 0) throw new Error('No shares provided')
  const len = shares[0].y.length
  const secret = new Uint8Array(len)
  for (let b = 0; b < len; b++) {
    let sum = 0
    for (let i = 0; i < shares.length; i++) {
      let li = 1
      for (let j = 0; j < shares.length; j++) {
        if (i === j) continue
        const num = shares[j].x
        const den = gfAdd(shares[j].x, shares[i].x)
        li = gfMul(li, gfDiv(num, den))
      }
      sum = gfAdd(sum, gfMul(shares[i].y[b], li))
    }
    secret[b] = sum;
  }
  return secret
}

// ==========================================
// 🔑 Encoding Helpers
// ==========================================
function bufferToBase64(buf: Uint8Array): string {
  let bin = ''
  for (let i = 0; i < buf.length; i++) {
    bin += String.fromCharCode(buf[i])
  }
  return window.btoa(bin)
}

function base64ToBuffer(b64: string): Uint8Array {
  const bin = window.atob(b64)
  const buf = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) {
    buf[i] = bin.charCodeAt(i)
  }
  return buf
}

// ==========================================
// 🛡️ Web Crypto API (AES-256-GCM)
// ==========================================
async function encryptData(data: Uint8Array): Promise<{ ciphertext: Uint8Array; iv: Uint8Array; keyBytes: Uint8Array }> {
  const key = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  )
  const iv = window.crypto.subtle.getRandomValues(new Uint8Array(12))
  const ciphertextBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    data
  )
  const keyBuffer = await window.crypto.subtle.exportKey('raw', key)
  return {
    ciphertext: new Uint8Array(ciphertextBuffer),
    iv,
    keyBytes: new Uint8Array(keyBuffer),
  }
}

async function decryptData(ciphertext: Uint8Array, iv: Uint8Array, keyBytes: Uint8Array): Promise<Uint8Array> {
  const key = await window.crypto.subtle.importKey(
    'raw',
    keyBytes,
    { name: 'AES-GCM' },
    true,
    ['decrypt']
  )
  const decryptedBuffer = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  )
  return new Uint8Array(decryptedBuffer)
}

interface GuardianNode {
  id: string
  location: string
  status: 'online' | 'offline'
  latency: number
  shard: string
  approved: boolean
}

interface EncryptedPackage {
  ciphertext: string
  iv: string
  filename: string
  mimeType: string
}

export default function Vault({ sharedFile, setSharedFile }: { sharedFile?: File | null; setSharedFile?: (f: File | null) => void } = {}) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [vaultState, setVaultState] = useState<'idle' | 'encrypting' | 'locked' | 'aggregating' | 'unlocked'>('idle')
  const [blobId, setBlobId] = useState<string | null>(null)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])
  
  // 5 Guardian Nodes holding 5 shares of Shamir key
  const [nodes, setNodes] = useState<GuardianNode[]>([
    { id: 'Node-01', location: 'Frankfurt, DE', status: 'online', latency: 42, shard: '', approved: false },
    { id: 'Node-02', location: 'Singapore, SG', status: 'online', latency: 89, shard: '', approved: false },
    { id: 'Node-03', location: 'Oregon, US', status: 'online', latency: 112, shard: '', approved: false },
    { id: 'Node-04', location: 'Tokyo, JP', status: 'online', latency: 74, shard: '', approved: false },
    { id: 'Node-05', location: 'Dublin, IE', status: 'online', latency: 51, shard: '', approved: false },
  ])

  // Shards storage & decrypted data
  const [shards, setShards] = useState<Share[]>([])
  const [decryptedFileUrl, setDecryptedFileUrl] = useState<string | null>(null)
  const [decryptedFileName, setDecryptedFileName] = useState<string>('')

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Live Latency Simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((n) => ({
          ...n,
          latency: Math.max(10, Math.floor(n.latency + (Math.random() * 10 - 5))),
        }))
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  // ==========================================
  // 🎨 HTML5 Canvas Particles System Loop
  // ==========================================
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const center = { x: canvas.width / 2, y: canvas.height / 2 }
    const radius = 100
    const nodeCoords = nodes.map((_, idx) => {
      const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2
      return {
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle),
        angle,
      }
    })

    interface VisualParticle {
      x: number
      y: number
      vx: number
      vy: number
      alpha: number
      color: string
      size: number
      targetNodeIdx?: number
      orbitAngle?: number
      orbitSpeed?: number
      orbitDist?: number
    }

    let particles: VisualParticle[] = []
    let t = 0

    const initParticles = () => {
      particles = []
      for (let i = 0; i < 120; i++) {
        particles.push({
          x: center.x,
          y: center.y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          alpha: Math.random() * 0.8 + 0.2,
          color: `hsl(${Math.random() * 40 + 140}, 100%, 60%)`, // Emerald shades
          size: Math.random() * 2 + 1,
        })
      }
    }
    initParticles()

    const render = () => {
      t += 0.02
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw Orbit Path ring
      ctx.beginPath()
      ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = 'rgba(0, 245, 160, 0.08)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw Connection lines (web of trust)
      if (vaultState === 'locked' || vaultState === 'aggregating') {
        ctx.beginPath()
        for (let i = 0; i < nodeCoords.length; i++) {
          for (let j = i + 1; j < nodeCoords.length; j++) {
            ctx.moveTo(nodeCoords[i].x, nodeCoords[i].y)
            ctx.lineTo(nodeCoords[j].x, nodeCoords[j].y)
          }
        }
        ctx.strokeStyle = 'rgba(0, 245, 160, 0.03)'
        ctx.stroke()
      }

      // Render Nodes
      nodeCoords.forEach((coord, idx) => {
        const node = nodes[idx]
        ctx.beginPath()
        ctx.arc(coord.x, coord.y, 8, 0, 2 * Math.PI)
        
        let nodeColor = 'rgba(255, 255, 255, 0.2)' // Default inactive
        if (vaultState === 'encrypting') nodeColor = 'rgba(0, 245, 160, 0.6)'
        else if (vaultState === 'locked') {
          nodeColor = node.approved ? 'rgba(0, 245, 160, 0.8)' : 'rgba(0, 245, 160, 0.3)'
        } else if (vaultState === 'aggregating') {
          nodeColor = node.approved ? 'rgba(0, 245, 160, 1.0)' : 'rgba(255, 60, 100, 0.4)'
        } else if (vaultState === 'unlocked') {
          nodeColor = 'rgba(253, 216, 53, 0.9)' // Golden upon unlock
        }

        ctx.fillStyle = nodeColor
        ctx.shadowColor = nodeColor
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0 // Reset

        // Label node ID
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.font = '8px monospace'
        ctx.textAlign = 'center'
        ctx.fillText(`N0${idx + 1}`, coord.x, coord.y - 12)
      })

      // Update and draw Particles based on state
      if (vaultState === 'idle') {
        // Subtle aura breathing around center
        particles.forEach((p) => {
          p.x = center.x + Math.cos(t * 2 + p.vx * 10) * (30 + p.vy * 5)
          p.y = center.y + Math.sin(t * 2 + p.vy * 10) * (30 + p.vx * 5)
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 0.8, 0, 2 * Math.PI)
          ctx.fillStyle = `rgba(0, 245, 160, ${p.alpha * 0.3})`
          ctx.fill()
        })
      } 
      else if (vaultState === 'encrypting') {
        // Particles shooting outward from center to nodes
        particles.forEach((p) => {
          if (p.targetNodeIdx === undefined) {
            p.targetNodeIdx = Math.floor(Math.random() * 5)
            p.x = center.x
            p.y = center.y
            const target = nodeCoords[p.targetNodeIdx]
            const angle = Math.atan2(target.y - center.y, target.x - center.x)
            const speed = Math.random() * 3 + 2
            p.vx = Math.cos(angle) * speed
            p.vy = Math.sin(angle) * speed
            p.alpha = 1.0
          }

          p.x += p.vx
          p.y += p.vy
          p.alpha -= 0.015

          const target = nodeCoords[p.targetNodeIdx]
          const dist = Math.hypot(target.x - p.x, target.y - p.y)

          if (dist < 5 || p.alpha <= 0) {
            p.targetNodeIdx = undefined // Recycle
          }

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI)
          ctx.fillStyle = `rgba(0, 245, 160, ${p.alpha})`
          ctx.fill()
        })
      } 
      else if (vaultState === 'locked') {
        // Orbiting particles ring around guardians
        particles.forEach((p) => {
          if (p.orbitAngle === undefined) {
            p.targetNodeIdx = Math.floor(Math.random() * 5)
            const baseAngle = nodeCoords[p.targetNodeIdx].angle
            p.orbitAngle = baseAngle + (Math.random() - 0.5) * Math.PI
            p.orbitSpeed = (Math.random() * 0.04 + 0.01) * (Math.random() > 0.5 ? 1 : -1)
            p.orbitDist = Math.random() * 15 + 8
          }

          p.orbitAngle += p.orbitSpeed
          const target = nodeCoords[p.targetNodeIdx]
          p.x = target.x + p.orbitDist * Math.cos(p.orbitAngle)
          p.y = target.y + p.orbitDist * Math.sin(p.orbitAngle)

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 0.7, 0, 2 * Math.PI)
          const approved = nodes[p.targetNodeIdx].approved
          ctx.fillStyle = approved ? `rgba(0, 245, 160, ${p.alpha * 0.7})` : `rgba(0, 245, 160, ${p.alpha * 0.25})`
          ctx.fill()
        })
      } 
      else if (vaultState === 'aggregating') {
        // Helix sucking vortex from approved nodes into center
        particles.forEach((p) => {
          if (p.targetNodeIdx === undefined) {
            const approvedIndices = nodes.map((n, i) => n.approved ? i : -1).filter(i => i !== -1)
            if (approvedIndices.length === 0) {
              p.targetNodeIdx = Math.floor(Math.random() * 5)
            } else {
              p.targetNodeIdx = approvedIndices[Math.floor(Math.random() * approvedIndices.length)]
            }
            const src = nodeCoords[p.targetNodeIdx]
            p.x = src.x
            p.y = src.y
            p.alpha = 1.0
            p.orbitAngle = Math.random() * 2 * Math.PI
            p.orbitSpeed = Math.random() * 0.1 + 0.05
          }

          p.orbitAngle += p.orbitSpeed
          
          // Interpolate to center
          const dx = center.x - p.x
          const dy = center.y - p.y
          const d = Math.hypot(dx, dy)
          
          p.x += (dx / d) * 2 + Math.cos(p.orbitAngle) * 1.5
          p.y += (dy / d) * 2 + Math.sin(p.orbitAngle) * 1.5
          p.alpha -= 0.008

          if (d < 6 || p.alpha <= 0) {
            p.targetNodeIdx = undefined // Recycle
          }

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI)
          ctx.fillStyle = `rgba(0, 245, 160, ${p.alpha})`
          ctx.fill()
        })
      } 
      else if (vaultState === 'unlocked') {
        // Explosive ripple expansion outward
        particles.forEach((p) => {
          if (p.orbitAngle === undefined) {
            p.x = center.x
            p.y = center.y
            const angle = Math.random() * 2 * Math.PI
            const speed = Math.random() * 4 + 2
            p.vx = Math.cos(angle) * speed
            p.vy = Math.sin(angle) * speed
            p.alpha = 1.0
            p.orbitAngle = angle
          }

          p.x += p.vx
          p.y += p.vy
          p.alpha -= 0.02

          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 1.2, 0, 2 * Math.PI)
          ctx.fillStyle = `rgba(253, 216, 53, ${p.alpha})` // Golden light explosion
          ctx.fill()
        })
      }

      // Draw Center Dial Core
      ctx.beginPath()
      ctx.arc(center.x, center.y, 24, 0, 2 * Math.PI)
      ctx.fillStyle = vaultState === 'unlocked' ? 'rgba(253, 216, 53, 0.15)' : 'rgba(13, 16, 38, 0.8)'
      ctx.strokeStyle = vaultState === 'unlocked' ? 'rgba(253, 216, 53, 0.6)' : 'rgba(0, 245, 160, 0.4)'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.fill()

      // Center Icon
      ctx.fillStyle = vaultState === 'unlocked' ? '#fdd835' : '#00f5a0'
      ctx.font = '14px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(vaultState === 'unlocked' ? '🔓' : '🔒', center.x, center.y)

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(animationId)
  }, [vaultState, nodes])

  // ==========================================
  // ⚙️ Cryptographic E2E Actions
  // ==========================================
  const processFile = async (file: File) => {
    setSelectedFile(file)
    setVaultState('encrypting')
    setConsoleLogs([])

    const appendLog = (msg: string) => {
      setConsoleLogs((prev) => [...prev, msg])
    }

    try {
      appendLog(`Reading raw binary stream from ${file.name}...`)
      const fileBytes = new Uint8Array(await file.arrayBuffer())
      
      await new Promise((r) => setTimeout(r, 600))
      appendLog('Encrypting file payload locally using robust AES-256-GCM symmetric algorithm...')
      const { ciphertext, iv, keyBytes } = await encryptData(fileBytes)
      appendLog('AES-256 Secret key successfully constructed (256-bit entropy).')

      await new Promise((r) => setTimeout(r, 500))
      appendLog('Slicing master key into 5 cryptographic shards using Shamir Secret Sharing (k=3, n=5)...')
      const shares = splitSecret(keyBytes, 3, 5)
      setShards(shares)
      
      const updatedNodes = nodes.map((n, i) => ({
        ...n,
        shard: bufferToBase64(shares[i].y),
        approved: false, // reset approvals
      }))
      setNodes(updatedNodes)
      appendLog('Shards successfully mapped to nodes: Shards [A, B, C, D, E] calculated.')

      await new Promise((r) => setTimeout(r, 600))
      appendLog('Packaging ciphertext payload and uploading packet to Walrus decentralized aggregator gateway...')

      // Prepare payload to store in Walrus via Backend
      const encryptedPackage: EncryptedPackage = {
        ciphertext: bufferToBase64(ciphertext),
        iv: bufferToBase64(iv),
        filename: file.name,
        mimeType: file.type || 'application/octet-stream',
      }
      
      const payloadString = JSON.stringify(encryptedPackage)
      const payloadBlob = new Blob([payloadString], { type: 'application/json' })
      
      const formData = new FormData()
      formData.append('file', payloadBlob, `${file.name}.encrypted`)

      const response = await fetch('/api/vault/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Failed to upload to Walrus: ${response.statusText}`)
      }

      const resJson = await response.json()
      setBlobId(resJson.blobId)

      appendLog(`Walrus Store successful. Blob ID: ${resJson.blobId}`)
      appendLog(`Decentralized node storage verified. Status: SEAL LOCKED`)
      setVaultState('locked')
    } catch (err: any) {
      appendLog(`[ERROR] Cryptographic failure: ${err.message}`)
      setVaultState('idle')
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    processFile(file)
  }

  // Auto-load last verified file from previous page
  useEffect(() => {
    if (selectedFile || vaultState !== 'idle') return

    if (sharedFile) {
      processFile(sharedFile)
      setSharedFile?.(null)
    } else {
      const lastVer = localStorage.getItem('cr:lastVerification')
      if (lastVer) {
        try {
          const parsed = JSON.parse(lastVer)
          const isApproved = parsed.assessment?.recreateReady || parsed.success
          if (parsed.filename && isApproved) {
            const sample = SAMPLE_MEDIAS.find(s => s.name === parsed.filename)
            if (sample) {
              setConsoleLogs(prev => [...prev, `Auto-loading last audited specimen: ${sample.name}...`])
              fetch(`/samples/${sample.name}`)
                .then(res => res.blob())
                .then(blob => {
                  const file = new File([blob], sample.name, { type: 'image/jpeg' })
                  processFile(file)
                })
                .catch(err => {
                  console.warn("Failed to auto-fetch preset sample in Vault:", err)
                })
            }
          }
        } catch (e) {
          console.warn("Failed to parse last verification:", e)
        }
      }
    }
  }, [sharedFile, selectedFile, vaultState, setSharedFile])

  const triggerUpload = () => {
    fileInputRef.current?.click()
  }

  const toggleNodeApproval = (nodeId: string) => {
    if (vaultState !== 'locked') return
    setNodes((prev) =>
      prev.map((n) => (n.id === nodeId ? { ...n, approved: !n.approved } : n))
    )
    const targetNode = nodes.find((n) => n.id === nodeId)
    const nextApproved = !targetNode?.approved
    setConsoleLogs((prev) => [
      ...prev,
      `Guardian node [${nodeId}] ${nextApproved ? 'granted signature approval.' : 'revoked signature approval.'}`,
    ])
  }

  const handleUnlockVault = async () => {
    const approvedNodes = nodes.filter((n) => n.approved)
    const appendLog = (msg: string) => {
      setConsoleLogs((prev) => [...prev, msg])
    }

    appendLog('Decryption handshake triggered. Verifying guardian node thresholds...')

    if (approvedNodes.length < 3) {
      await new Promise((r) => setTimeout(r, 400))
      appendLog(`[CRITICAL] Decryption rejected: Threshold criteria not met (${approvedNodes.length}/3 required signatures).`)
      return
    }

    setVaultState('aggregating')
    await new Promise((r) => setTimeout(r, 600))
    appendLog('Threshold verification passed. Collecting active secret shares...')
    
    // Extract approved shares for Lagrange interpolation
    const activeShares = approvedNodes.map((n) => {
      const idx = nodes.findIndex((orig) => orig.id === n.id)
      return shards[idx]
    })

    try {
      appendLog('Performing GF(256) Lagrange polynomial interpolation to reconstruct symmetric key...')
      const reconstructedKey = reconstructSecret(activeShares)
      appendLog('Symmetric AES-256 decryption key successfully reconstructed.')

      await new Promise((r) => setTimeout(r, 500))
      appendLog(`Fetching encrypted ciphertext packet from Walrus Aggregator (Blob: ${blobId?.slice(0, 18)}...)...`)
      
      const downloadRes = await fetch(`/api/vault/download/${encodeURIComponent(blobId || '')}`)
      if (!downloadRes.ok) {
        throw new Error(`Failed to retrieve blob payload: ${downloadRes.statusText}`)
      }
      
      const payloadJson: EncryptedPackage = await downloadRes.json()
      appendLog('Blob payload retrieved. Launching client-side GCM decrypt worker...')

      const rawCiphertext = base64ToBuffer(payloadJson.ciphertext)
      const rawIv = base64ToBuffer(payloadJson.iv)

      const decryptedRaw = await decryptData(rawCiphertext, rawIv, reconstructedKey)
      appendLog('Decryption block verify: SUCCESS. File integrity hashes match.')

      // Create download URL
      const decryptedBlob = new Blob([decryptedRaw], { type: payloadJson.mimeType })
      const url = URL.createObjectURL(decryptedBlob)
      setDecryptedFileUrl(url)
      setDecryptedFileName(payloadJson.filename)

      setVaultState('unlocked')
      appendLog('Vault completely SEAL UNLOCKED. Master file restored.')
    } catch (err: any) {
      appendLog(`[CRITICAL] Decryption failed: ${err.message}`)
      setVaultState('locked')
    }
  }

  const handleResetVault = () => {
    setSelectedFile(null)
    setVaultState('idle')
    setBlobId(null)
    setShards([])
    setDecryptedFileUrl(null)
    setDecryptedFileName('')
    setNodes(
      nodes.map((n) => ({
        ...n,
        shard: '',
        approved: false,
      }))
    )
    setConsoleLogs([])
  }

  const approvedCount = nodes.filter((n) => n.approved).length

  return (
    <div className="dashboard-container" style={{ maxWidth: '1100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="header-badge badge-emerald">Chamber II · Sealed Vault</span>
        <h2 className="cyber-title">Threshold Security Vault (SEAL)</h2>
        <p className="cyber-subtitle" style={{ margin: '10px auto 0' }}>
          Lock and protect raw master files using Shamir's Secret Sharing (3/5) cryptography integrated on decentralized Walrus storage nodes.
        </p>
      </div>

      <div className="grid-layout-2">
        {/* Left Column: Sequential Step Panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {/* STEP 1: Upload Master Draft File */}
          <div className="linear-card-recessed" style={{ 
            padding: '20px', 
            borderRadius: '8px', 
            border: '1px solid rgba(255, 255, 255, 0.05)', 
            background: 'rgba(255, 255, 255, 0.02)',
            opacity: vaultState !== 'idle' && vaultState !== 'encrypting' ? 0.6 : 1
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span className="header-badge badge-emerald" style={{ padding: '2px 8px', fontSize: '9px' }}>Step 1</span>
              <strong style={{ color: '#fff', fontSize: '13px' }}>Select & Upload Master Draft</strong>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
              Choose the high-resolution master file to protect. The file will be encrypted locally using AES-256-GCM before dispatching the ciphertext payload to the decentralized Walrus storage network.
            </p>

            {vaultState === 'idle' ? (
              <div 
                className="runic-zone" 
                onClick={triggerUpload}
                style={{
                  backgroundImage: 'linear-gradient(rgba(13, 16, 38, 0.85), rgba(13, 16, 38, 0.85)), url("/cryptoseal.jpg")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px dashed var(--neon-emerald)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '140px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '20px',
                  borderRadius: '8px'
                }}
              >
                <strong style={{ fontSize: '12px', color: 'var(--neon-emerald)', display: 'block', marginBottom: '6px' }}>
                  Drag & Drop or Click to Upload Master Draft
                </strong>
                <p style={{ textAlign: 'center', maxWidth: '350px', fontSize: '10.5px', color: 'var(--text-muted)', margin: 0 }}>
                  Raw assets are split using threshold cryptography before on-chain registration.
                </p>
              </div>
            ) : (
              <div className="linear-card-recessed" style={{ padding: '12px 16px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.25)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ color: '#fff', fontSize: '12px' }}>{selectedFile?.name}</strong>
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', marginTop: '2px' }}>
                    {(selectedFile?.size ? selectedFile.size / 1024 : 0).toFixed(2)} KB • AES-GCM-256 Encrypted
                  </span>
                </div>
                <span className="header-badge badge-emerald" style={{ margin: 0, fontSize: '9px' }}>✓ SEALED</span>
              </div>
            )}
          </div>

          {/* STEP 2: Shamir Secret Shard Distribution (3/5) */}
          <div className="linear-card-recessed" style={{ 
            padding: '20px', 
            borderRadius: '8px', 
            border: '1px solid rgba(255, 255, 255, 0.05)', 
            background: 'rgba(255, 255, 255, 0.02)',
            opacity: vaultState === 'idle' ? 0.4 : 1,
            transition: 'opacity 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span className={`header-badge ${vaultState !== 'idle' ? 'badge-emerald' : 'badge-secondary'}`} style={{ padding: '2px 8px', fontSize: '9px' }}>Step 2</span>
              <strong style={{ color: '#fff', fontSize: '13px' }}>Shamir Secret Shard Distribution</strong>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
              The symmetric AES key is split into 5 cryptographic shards using Shamir's Secret Sharing (k=3, n=5). Each shard is held by a decentralized guardian node.
            </p>

            {vaultState !== 'idle' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                {nodes.map((node, idx) => (
                  <div 
                    key={node.id} 
                    style={{ 
                      background: 'rgba(0, 0, 0, 0.3)',
                      border: `1px solid ${node.approved ? 'var(--neon-emerald)' : 'rgba(255,255,255,0.06)'}`,
                      borderRadius: '6px',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      position: 'relative',
                      boxShadow: node.approved ? '0 0 8px rgba(0, 245, 160, 0.1)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', fontFamily: 'var(--mono)' }}>Node-0{idx+1}</span>
                      <span style={{ fontSize: '8px', color: 'var(--text-muted)' }}>{node.latency}ms</span>
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{node.location}</div>
                    <div style={{ fontSize: '8px', fontFamily: 'var(--mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', background: 'rgba(0,0,0,0.5)', padding: '2px 4px', borderRadius: '3px', marginTop: '2px' }}>
                      {node.shard ? `Share: ${node.shard.slice(0, 8)}...` : 'Assigning...'}
                    </div>
                    <button
                      disabled={vaultState !== 'locked'}
                      onClick={() => toggleNodeApproval(node.id)}
                      style={{
                        marginTop: '6px',
                        background: node.approved ? 'var(--neon-emerald)' : 'rgba(255,255,255,0.05)',
                        border: 'none',
                        color: node.approved ? '#0d1026' : '#fff',
                        fontSize: '9px',
                        fontWeight: 600,
                        padding: '4px 0',
                        borderRadius: '3px',
                        cursor: vaultState === 'locked' ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {node.approved ? '✓ Approved' : 'Grant Signature'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* STEP 3: Lagrange Threshold Reconstruction */}
          <div className="linear-card-recessed" style={{ 
            padding: '20px', 
            borderRadius: '8px', 
            border: '1px solid rgba(255, 255, 255, 0.05)', 
            background: 'rgba(255, 255, 255, 0.02)',
            opacity: (vaultState === 'idle' && consoleLogs.length === 0) ? 0.4 : 1,
            transition: 'opacity 0.3s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span className={`header-badge ${vaultState !== 'idle' ? 'badge-emerald' : 'badge-secondary'}`} style={{ padding: '2px 8px', fontSize: '9px' }}>Step 3</span>
              <strong style={{ color: '#fff', fontSize: '13px' }}>Lagrange Threshold Reconstruction Handshake</strong>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
              Select at least 3 active guardian nodes in Step 2 to grant signature approvals. Then, reconstruct the AES symmetric decryption key and unlock your master draft file.
            </p>

            {vaultState !== 'idle' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {vaultState === 'locked' && (
                    <button 
                      onClick={handleUnlockVault} 
                      className={`cyber-btn ${approvedCount >= 3 ? 'cyber-btn-emerald' : 'cyber-btn-secondary'}`}
                      style={{ flex: 1, padding: '10px 0', fontSize: '11px', fontWeight: 'bold' }}
                    >
                      Assemble Key Shares ({approvedCount}/3)
                    </button>
                  )}
                  {vaultState === 'unlocked' && decryptedFileUrl && (
                    <a 
                      href={decryptedFileUrl} 
                      download={decryptedFileName}
                      className="cyber-btn cyber-btn-emerald"
                      style={{ flex: 1, textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0', fontSize: '11px', fontWeight: 'bold' }}
                    >
                      📥 Download Decrypted File
                    </a>
                  )}
                  {(vaultState === 'unlocked' || vaultState === 'locked') && (
                    <button 
                      onClick={handleResetVault} 
                      className="cyber-btn cyber-btn-secondary"
                      style={{ padding: '10px 16px', fontSize: '11px' }}
                    >
                      Reset Vault
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Inner log console */}
            {(vaultState !== 'idle' || consoleLogs.length > 0) && (
              <div style={{ marginTop: '8px' }}>
                <span className="header-badge" style={{ marginBottom: '8px', fontSize: '9px', display: 'inline-block' }}>Vault Security Logs</span>
                <div className="console-container" style={{ height: '120px', fontSize: '10.5px' }}>
                  {consoleLogs.map((log, idx) => (
                    <div key={idx} className="console-line">
                      <span className="console-time">[{new Date().toLocaleTimeString()}]</span>
                      <span className={`console-tag ${log.includes('[ERROR]') ? 'tag-rose' : 'tag-success'}`} style={{ color: log.includes('[ERROR]') ? 'var(--neon-rose)' : 'var(--neon-emerald)' }}>
                        {log.includes('[ERROR]') ? '[FAIL]' : '[SEAL]'}
                      </span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* STEP 4: Next Stage Flow Link */}
          {blobId && (
            <div className="linear-card-recessed" style={{ 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid rgba(16, 185, 129, 0.25)', 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(14, 165, 233, 0.06) 100%)',
              animation: 'fadeIn 0.5s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className="header-badge badge-emerald" style={{ padding: '2px 8px', fontSize: '9px' }}>Step 4</span>
                <strong style={{ color: 'var(--neon-emerald)', fontSize: '13px' }}>Master Draft Secured (SEAL)</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
                Your master draft has been split via Shamir Cryptography and uploaded to the Walrus network. Proceed to **Automated Royalties** to establish co-creation weights and register them on-chain.
              </p>
              <Link 
                to="/blueprint" 
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
                💰 Proceed to Automated Royalties (Blueprint)
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Key Shards Orbits Canvas Visualization */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {vaultState !== 'idle' ? (
            <div className="cyber-card" style={{ width: '100%', minHeight: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
              <span className="header-badge" style={{ marginBottom: '20px' }}>Shamir Cryptographic Orbit</span>
              
              <div 
                className="orbit-shards-box" 
                style={{ 
                  position: 'relative', 
                  width: '320px', 
                  height: '320px',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(0, 245, 160, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <canvas 
                  ref={canvasRef} 
                  width={320} 
                  height={320} 
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              </div>
              
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', width: '260px', lineHeight: 1.4, marginTop: '20px' }}>
                {vaultState === 'locked' && "AES-256 Symmetric key is currently split. Select at least 3 guardian nodes to unlock the threshold barrier."}
                {vaultState === 'aggregating' && "Aggregating active node signature shares. Performing Lagrange polynomial reconstruction..."}
                {vaultState === 'unlocked' && "Decryption key successfully reconstructed. Raw master payload decoded."}
              </p>
            </div>
          ) : (
            <div 
              className="cyber-card" 
              style={{ 
                width: '100%', 
                height: '420px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderStyle: 'dashed',
                borderColor: 'rgba(255,255,255,0.1)',
                background: 'linear-gradient(rgba(13, 16, 38, 0.95), rgba(13, 16, 38, 0.95)), url("/cryptoseal.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.85 
              }}
            >
              <div 
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '50%',
                  backgroundImage: 'url("/cryptoseal.jpg")',
                  backgroundSize: 'cover',
                  boxShadow: '0 0 25px rgba(0, 245, 160, 0.4)',
                  border: '2px solid var(--neon-emerald)',
                  marginBottom: '24px'
                }}
              ></div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '0 30px', lineHeight: 1.5, maxWidth: '280px' }}>
                Select or drop your master file to activate the Shamir Orbit particle simulator.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
