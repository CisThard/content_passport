import exifr from 'exifr'
import type { AgentScore } from '../engine'

// Browser-side REAL authenticity analysis (no server):
//   - SHA-256 via Web Crypto
//   - EXIF via exifr (browser build)
//   - Error Level Analysis via <canvas> recompression diff
// These feed the real calculateAASE engine.

export interface AnalysisResult {
  hash: string
  previewUrl: string
  width: number
  height: number
  elaAvg: number
  exif: Record<string, unknown> | null
  scores: AgentScore[]
  seenBefore: boolean
}

const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v))

export async function sha256Hex(buf: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('not an image'))
    img.src = url
  })
}

function blobToImage(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob)
  return loadImage(url).finally(() => setTimeout(() => URL.revokeObjectURL(url), 1000))
}

// Mean absolute pixel delta after a quality-90 JPEG round-trip. Low ⇒ authentic.
async function canvasELA(img: HTMLImageElement): Promise<{ avg: number; w: number; h: number }> {
  const scale = Math.min(1, 512 / Math.max(img.naturalWidth, img.naturalHeight))
  const w = Math.max(1, Math.round(img.naturalWidth * scale))
  const h = Math.max(1, Math.round(img.naturalHeight * scale))
  const c = document.createElement('canvas')
  c.width = w; c.height = h
  const ctx = c.getContext('2d')!
  ctx.drawImage(img, 0, 0, w, h)
  const orig = ctx.getImageData(0, 0, w, h).data
  const jpeg = await new Promise<Blob>((res, rej) =>
    c.toBlob((b) => (b ? res(b) : rej(new Error('encode failed'))), 'image/jpeg', 0.9))
  const reImg = await blobToImage(jpeg)
  ctx.drawImage(reImg, 0, 0, w, h)
  const re = ctx.getImageData(0, 0, w, h).data
  let sum = 0, n = 0
  for (let i = 0; i < orig.length; i += 4) {
    sum += Math.abs(orig[i] - re[i]) + Math.abs(orig[i + 1] - re[i + 1]) + Math.abs(orig[i + 2] - re[i + 2])
    n += 3
  }
  return { avg: n ? sum / n : 0, w, h }
}

const AI_SOFTWARE = /photoshop|gimp|midjourney|stable diffusion|dall|firefly|generated|gan/i

function metadataScore(exif: Record<string, unknown> | null): AgentScore {
  if (!exif || Object.keys(exif).length === 0) {
    return { agentId: 'metadata-agent', score: 45, confidence: 0.5, evidence: ['No EXIF metadata (typical of exports / AI output)'] }
  }
  const ev: string[] = []
  let s = 60
  if (exif.Make || exif.Model) { s += 18; ev.push(`Camera ${String(exif.Make ?? '')} ${String(exif.Model ?? '')}`.trim()) }
  if (exif.DateTimeOriginal) { s += 10; ev.push('Capture timestamp present') }
  const sw = String(exif.Software ?? '')
  if (AI_SOFTWARE.test(sw)) { s -= 45; ev.push(`Editing/AI software: ${sw}`) }
  const orig = exif.DateTimeOriginal ? Date.parse(String(exif.DateTimeOriginal)) : NaN
  const mod = exif.ModifyDate ? Date.parse(String(exif.ModifyDate)) : NaN
  if (!Number.isNaN(orig) && !Number.isNaN(mod) && Math.abs(mod - orig) > 60_000) {
    s -= 30; ev.push(`Capture↔modify mismatch ${Math.round(Math.abs(mod - orig) / 1000)}s`)
  }
  return { agentId: 'metadata-agent', score: clamp(Math.round(s)), confidence: 0.9, evidence: ev }
}

export async function analyzeFile(file: File): Promise<AnalysisResult> {
  const buf = await file.arrayBuffer()
  const hash = await sha256Hex(buf)

  const seen = JSON.parse(localStorage.getItem('cr:hashes') ?? '[]') as string[]
  const seenBefore = seen.includes(hash)
  if (!seenBefore) localStorage.setItem('cr:hashes', JSON.stringify([hash, ...seen].slice(0, 50)))

  const previewUrl = URL.createObjectURL(file)
  let exif: Record<string, unknown> | null = null
  try { exif = (await exifr.parse(file)) as Record<string, unknown> | null } catch { exif = null }

  let elaAvg = 0, width = 0, height = 0
  let forensic: AgentScore
  try {
    const img = await loadImage(previewUrl)
    width = img.naturalWidth; height = img.naturalHeight
    const ela = await canvasELA(img)
    elaAvg = ela.avg
    forensic = {
      agentId: 'forensic-agent',
      score: clamp(Math.round(100 - elaAvg * 14)),
      confidence: 0.95,
      evidence: [`ELA mean delta ${elaAvg.toFixed(3)} @ ${ela.w}×${ela.h}`],
    }
  } catch {
    forensic = { agentId: 'forensic-agent', score: 50, confidence: 0.2, evidence: ['ELA unavailable for this file type'] }
  }

  const metadata = metadataScore(exif)

  // AI detection (no model in-browser): consensus heuristic from local agents.
  const localAvg = (forensic.score + metadata.score) / 2
  const ai: AgentScore = {
    agentId: 'ai-detection-agent',
    score: clamp(Math.round(localAvg < 50 ? localAvg - 10 : localAvg)),
    confidence: 0.6,
    evidence: ['Heuristic consensus of forensic + metadata signals'],
  }

  const memory: AgentScore = seenBefore
    ? { agentId: 'memory-bonus', score: 20, confidence: 0.7, evidence: ['MemWal: this exact hash was seen before (possible duplicate)'] }
    : { agentId: 'memory-bonus', score: 100, confidence: 0.7, evidence: ['MemWal: no prior clash in history'] }

  return { hash, previewUrl, width, height, elaAvg, exif, seenBefore, scores: [forensic, metadata, ai, memory] }
}
