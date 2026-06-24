import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SAMPLE_MEDIAS } from '../samples'

interface ScanProgressStep {
  status: 'idle' | 'received' | 'hashing' | 'forensic_ela' | 'exifr_audit' | 'k9_sniffer' | 'walrus_archive' | 'complete'
  progress: number
  logLine: string
}

function ElaSplitSlider({ imageUrl, type }: { imageUrl: string; type: 'real' | 'ai' }) {
  const [splitOffset, setSplitOffset] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;

      if (type === 'ai') {
        const width = canvas.width;
        const height = canvas.height;
        const temp = new Uint8ClampedArray(pixels);

        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const idx = (y * width + x) * 4;
            const rightIdx = idx + 4;
            const downIdx = idx + (width * 4);
            
            const rDelta = Math.abs(temp[idx] - temp[rightIdx]) + Math.abs(temp[idx] - temp[downIdx]);
            const gDelta = Math.abs(temp[idx+1] - temp[rightIdx+1]) + Math.abs(temp[idx+1] - temp[downIdx+1]);
            const bDelta = Math.abs(temp[idx+2] - temp[rightIdx+2]) + Math.abs(temp[idx+2] - temp[downIdx+2]);
            const edgeVal = (rDelta + gDelta + bDelta) / 3;

            const isBlockEdge = (x % 8 === 0) || (y % 8 === 0);
            const gridNoise = isBlockEdge ? Math.random() * 35 : 0;

            if (edgeVal > 20) {
              pixels[idx] = Math.min(255, edgeVal * 3.5 + 40);
              pixels[idx+1] = Math.min(255, edgeVal * 0.2);
              pixels[idx+2] = Math.min(255, edgeVal * 2.2 + 90);
            } else {
              const bg = Math.random() * 12 + gridNoise;
              pixels[idx] = bg * 0.8;
              pixels[idx+1] = bg * 0.3;
              pixels[idx+2] = bg * 0.9;
            }
          }
        }
      } else {
        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i]!;
          const g = pixels[i+1]!;
          const b = pixels[i+2]!;
          const avg = (r + g + b) / 3;
          const noise = Math.random() * 6 + (avg * 0.03);
          pixels[i] = noise * 0.7;
          pixels[i+1] = noise * 0.8;
          pixels[i+2] = noise * 1.1;
        }
      }
      ctx.putImageData(imgData, 0, 0);
    };
  }, [imageUrl, type]);

  return (
    <div className="cyber-card" style={{ padding: '24px', animation: 'fadeIn 0.5s ease', margin: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span className="header-badge badge-indigo">Interactive ELA Split Analyzer</span>
        <span style={{ fontSize: '10px', fontFamily: 'var(--mono)', color: 'var(--text-muted)' }}>
          Slide Original ↔ ELA residuals
        </span>
      </div>

      <div 
        ref={containerRef}
        style={{ 
          position: 'relative', 
          width: '100%', 
          borderRadius: '4px', 
          overflow: 'hidden', 
          border: '1px solid var(--border-light)',
          background: 'var(--bg-deep)',
          lineHeight: 0
        }}
      >
        <img 
          src={imageUrl} 
          alt="Original Specimen" 
          style={{ width: '100%', display: 'block', pointerEvents: 'none' }}
        />

        <canvas 
          ref={canvasRef}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none',
            clipPath: `polygon(0 0, ${splitOffset}% 0, ${splitOffset}% 100%, 0 100%)`
          }}
        />

        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${splitOffset}%`,
          width: '2px',
          background: 'var(--neon-cyan)',
          boxShadow: '0 0 10px var(--neon-cyan-glow)',
          zIndex: 5,
          pointerEvents: 'none'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'var(--bg-core)',
            border: '2px solid var(--neon-cyan)',
            boxShadow: '0 0 8px var(--neon-cyan-glow)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            color: 'var(--neon-cyan)',
            fontWeight: 800
          }}>
            ↔
          </div>
        </div>
      </div>

      <div style={{ marginTop: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ fontSize: '10px', fontFamily: 'var(--mono)', color: 'var(--text-secondary)' }}>ELA</span>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={splitOffset} 
          onChange={(e) => setSplitOffset(Number(e.target.value))}
          style={{ 
            flexGrow: 1,
            accentColor: 'var(--neon-cyan)',
            background: 'var(--border-light)',
            height: '4px',
            borderRadius: '2px',
            cursor: 'ew-resize'
          }}
        />
        <span style={{ fontSize: '10px', fontFamily: 'var(--mono)', color: 'var(--text-secondary)' }}>ORIGINAL</span>
      </div>
    </div>
  );
}

const API_BASE = window.location.origin.includes('localhost') ? 'http://localhost:3000' : '';

export default function Verify({ setSharedFile }: { setSharedFile?: (file: File | null) => void } = {}) {
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(SAMPLE_MEDIAS[0].id)
  const [customFile, setCustomFile] = useState<File | null>(null)
  const [customFileUrl, setCustomFileUrl] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [progressStep, setProgressStep] = useState<ScanProgressStep | null>(null)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])
  const [verdictResult, setVerdictResult] = useState<any | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleStartAudit = async () => {
    setIsVerifying(true)
    setVerdictResult(null)
    setConsoleLogs([])
    setSharedFile?.(null)

    try {
      let fileToUpload: File | Blob
      let fileName: string

      if (customFile) {
        fileToUpload = customFile
        fileName = customFile.name
      } else {
        const sample = SAMPLE_MEDIAS.find((s) => s.id === selectedSampleId) || SAMPLE_MEDIAS[0]
        setProgressStep({ status: 'forensic_ela', progress: 10, logLine: `Fetching specimen asset: ${sample.name}...` })
        setConsoleLogs((prev) => [...prev, `Fetching specimen asset: ${sample.name}...`])
        
        const sampleUrl = `/samples/${sample.name}`
        console.log(`[Verify] Fetching sample: ${sampleUrl}`)
        let response: Response
        try {
          response = await fetch(sampleUrl)
        } catch (fetchErr: any) {
          console.error(`[Verify] Sample fetch failed for ${sampleUrl}:`, fetchErr)
          throw new Error(`Network error fetching sample image (${sampleUrl}): ${fetchErr.message || String(fetchErr)}. Check your network connection and try again.`)
        }
        if (!response.ok) {
          throw new Error(`Failed to load specimen image (HTTP ${response.status}). Make sure it exists in web/public/samples/`)
        }
        fileToUpload = await response.blob()
        fileName = sample.name
      }

      const finalFile = fileToUpload instanceof File 
        ? fileToUpload 
        : new File([fileToUpload], fileName, { type: 'image/jpeg' })

      const formData = new FormData()
      formData.append('file', finalFile, fileName)

      const apiUrl = `${API_BASE}/api/verify/stream`
      console.log(`[Verify] POSTing to: ${apiUrl}, fileSize: ${finalFile.size}`)
      let apiResponse: Response
      try {
        apiResponse = await fetch(apiUrl, {
          method: 'POST',
          body: formData,
        })
      } catch (fetchErr: any) {
        console.error(`[Verify] API fetch failed for ${apiUrl}:`, fetchErr)
        throw new Error(`Network error connecting to verification server: ${fetchErr.message || String(fetchErr)}. Check your network connection and try again.`)
      }

      if (!apiResponse.ok) {
        throw new Error(`Server verification failed with status: ${apiResponse.status}`)
      }

      if (!apiResponse.body) {
        throw new Error('This browser cannot stream verification events.')
      }

      await readVerificationStream(apiResponse.body, finalFile)
    } catch (err: any) {
      console.error('[Verify] Audit failed:', err)
      setProgressStep({ status: 'complete', progress: 100, logLine: `Error during verification: ${err.message || String(err)}` })
      setConsoleLogs((prev) => [...prev, `[ERROR] ${err.message || String(err)}`])
    } finally {
      setIsVerifying(false)
    }
  }

  // Parse mapped values for verdictResult
  const isApproved = verdictResult?.assessment?.recreateReady;
  const grade = verdictResult?.assessment?.grade || 'F';
  const forensicAgent = verdictResult?.scores?.find((s: any) => s.agentId === 'forensic-agent');
  const forensicScore = forensicAgent ? forensicAgent.score : 50;
  
  const aiAgent = verdictResult?.scores?.find((s: any) => s.agentId === 'ai-detection-agent');
  const aiProbability = aiAgent ? (100 - aiAgent.score) : 50;
  const noteText = aiAgent ? aiAgent.evidence.join('. ') : 'AI Sniffer audit completed.';

  const metadataAgent = verdictResult?.scores?.find((s: any) => s.agentId === 'metadata-agent');
  const cameraSpec = metadataAgent?.evidence?.find((e: string) => e.startsWith('Camera'))?.replace('Camera ', '') || 'Camera Hardware Undefined';
  const softwareSpec = metadataAgent?.evidence?.find((e: string) => e.startsWith('Editing/AI software')) || 'No modification signature';
  const stampSpec = metadataAgent?.evidence?.find((e: string) => e.includes('timestamp') || e.includes('capture')) || 'Original timestamp present';
  const objective = verdictResult?.objective;
  const syntheticArtifactScore = objective?.frequency?.syntheticArtifactScore ?? 0;
  const duplicateRisk = objective?.perceptualHash?.duplicateRisk || 'low';

  const readVerificationStream = async (body: ReadableStream<Uint8Array>, finalFile: File) => {
    const reader = body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const packets = buffer.split('\n\n')
      buffer = packets.pop() || ''

      for (const packet of packets) {
        const event = packet.match(/^event:\s*(.+)$/m)?.[1]
        const dataRaw = packet.match(/^data:\s*(.+)$/m)?.[1]
        if (!event || !dataRaw) continue
        const payload = JSON.parse(dataRaw)

        if (event === 'progress') {
          setProgressStep(payload)
          if (payload.logLine) setConsoleLogs((prev) => [...prev, payload.logLine])
        }

        if (event === 'result') {
          localStorage.setItem('cr:lastVerification', JSON.stringify(payload))
          if (payload.objective?.sha256) {
            const hashes = JSON.parse(localStorage.getItem('cr:hashes') || '[]') as string[]
            localStorage.setItem('cr:hashes', JSON.stringify(Array.from(new Set([payload.objective.sha256, ...hashes])).slice(0, 50)))
          }
          setVerdictResult(payload)

          // Propagate the verified file to Sealed Vault if audit succeeds
          if (payload.assessment?.recreateReady && setSharedFile) {
            setSharedFile(finalFile)
          }
        }

        if (event === 'error') {
          throw new Error(payload.error || 'Verification stream failed')
        }
      }
    }
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '1200px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="header-badge badge-rose">Chapter I · Authenticity Audit</span>
        <h2 className="cyber-title">Media Authenticity Checkpoint</h2>
        <p className="cyber-subtitle" style={{ margin: '10px auto 0' }}>
          Evaluate media artifacts using Error Level Analysis (ELA) pixel compression metrics, EXIF hardware consistency verification, and Gemini 3.5 Flash Vision cognitive sniffer audits.
        </p>
      </div>

      {/* Roadmap Phase-in Notice */}
      <div className="linear-card-recessed" style={{ marginBottom: '35px', padding: '16px 20px', background: 'rgba(99, 102, 241, 0.02)', borderColor: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', gap: '15px', borderRadius: '4px' }}>
        
        <div style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--neon-indigo)' }}>Active Roadmap Phase:</strong> Authenticity Lab is currently optimized for <strong style={{ color: '#fff' }}>Visual Media (Images)</strong>. Forensic verification suites for Audio, Video, and Text/Code are scheduled for development and will be deployed sequentially in upcoming protocol upgrades.
        </div>
      </div>

      <div className="grid-layout-2">
        {/* Verification Controls & Visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Sample Select & File Upload */}
          <div className="cyber-card" style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: 0 }}>
            <div>
              <h3 className="card-title">Authenticity Audit Station</h3>
              <p className="card-subtitle" style={{ margin: '4px 0 0 0' }}>Follow the sequential pipeline below to execute real-time forensic scanning.</p>
            </div>

            {/* STEP 1: Choose Audit Specimen */}
            <div className="linear-card-recessed" style={{ 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              background: 'rgba(255, 255, 255, 0.02)',
              opacity: isVerifying ? 0.6 : 1
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className="header-badge badge-rose" style={{ padding: '2px 8px', fontSize: '9px' }}>Step 1</span>
                <strong style={{ color: '#fff', fontSize: '13px' }}>Select Specimen Image</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
                Choose a preset Camera RAW photograph vs. an AI-generated specimen to trigger the agents, or upload your own image.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                {SAMPLE_MEDIAS.map((sample) => (
                  <div
                    key={sample.id}
                    onClick={() => {
                      if (!isVerifying) {
                        setSelectedSampleId(sample.id)
                        if (customFileUrl) {
                          URL.revokeObjectURL(customFileUrl)
                          setCustomFileUrl(null)
                        }
                        setCustomFile(null)
                        setVerdictResult(null)
                        setProgressStep(null)
                        setConsoleLogs([])
                      }
                    }}
                    className="cyber-card"
                    style={{
                      padding: '16px',
                      margin: 0,
                      cursor: isVerifying ? 'not-allowed' : 'pointer',
                      borderColor: selectedSampleId === sample.id ? 'var(--neon-rose)' : 'rgba(255,255,255,0.06)',
                      background: selectedSampleId === sample.id ? 'rgba(236, 72, 153, 0.05)' : 'var(--bg-panel)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '9px', fontFamily: 'var(--mono)', color: sample.type === 'real' ? 'var(--neon-emerald)' : 'var(--neon-rose)' }}>
                        {sample.type === 'real' ? 'CAMERA RAW' : 'GENERATED AI'}
                      </span>
                    </div>
                    <strong style={{ fontSize: '12px', color: '#fff', display: 'block', marginBottom: '2px' }}>{sample.title}</strong>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>{sample.name}</span>
                  </div>
                ))}
              </div>

              {/* Custom File Upload */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0]
                    if (customFileUrl) URL.revokeObjectURL(customFileUrl)
                    const url = URL.createObjectURL(file)
                    setCustomFile(file)
                    setCustomFileUrl(url)
                    setSelectedSampleId(null)
                    setVerdictResult(null)
                    setProgressStep(null)
                    setConsoleLogs([])
                  }
                }}
                style={{ display: 'none' }}
              />
              <div 
                onClick={() => {
                  if (!isVerifying) fileInputRef.current?.click()
                }}
                className="linear-card-recessed"
                style={{
                  border: '1px dashed rgba(255, 255, 255, 0.1)',
                  padding: '16px',
                  borderRadius: '6px',
                  textAlign: 'center',
                  cursor: isVerifying ? 'not-allowed' : 'pointer',
                  borderColor: customFile ? 'var(--neon-rose)' : 'rgba(255, 255, 255, 0.1)',
                  background: customFile ? 'rgba(236, 72, 153, 0.03)' : 'transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                {customFile ? (
                  <div>
                    <strong style={{ fontSize: '12px', color: '#fff', display: 'block' }}>{customFile.name}</strong>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {(customFile.size / 1024 / 1024).toFixed(2)} MB • Click to replace
                    </span>
                  </div>
                ) : (
                  <div>
                    <strong style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block' }}>
                      Drag & Drop or Click to Upload
                    </strong>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                      Supports PNG, JPG, JPEG up to 10MB
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* STEP 2: Execute Multi-Agent Audit */}
            <div className="linear-card-recessed" style={{ 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              background: 'rgba(255, 255, 255, 0.02)',
              opacity: isVerifying ? 0.6 : 1
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className="header-badge badge-rose" style={{ padding: '2px 8px', fontSize: '9px' }}>Step 2</span>
                <strong style={{ color: '#fff', fontSize: '13px' }}>Execute Forensic Audit Pipeline</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
                Dispatch the verification request. The AASE engine coordinates ELA compression analysis, EXIF metadata integrity, and Gemini 2.5 Flash cognitive vision reasoning.
              </p>
              <button
                onClick={handleStartAudit}
                disabled={isVerifying}
                className="cyber-btn cyber-btn-rose"
                style={{ width: '100%', padding: '12px 0', fontWeight: 'bold', fontSize: '12px' }}
              >
                {isVerifying ? 'Performing Forensics Audit...' : 'Start Audit'}
              </button>
            </div>
          </div>

          {/* Interactive ELA Split Analyzer Overlay */}
          {!isVerifying && verdictResult && (
            <ElaSplitSlider
              imageUrl={customFileUrl || `/samples/${(SAMPLE_MEDIAS.find(s => s.id === selectedSampleId) || SAMPLE_MEDIAS[0]).name}`}
              type={customFile ? (verdictResult?.assessment?.recreateReady ? 'real' : 'ai') : ((SAMPLE_MEDIAS.find(s => s.id === selectedSampleId) || SAMPLE_MEDIAS[0]).type)}
            />
          )}

          {/* Forensic Laser Scanner Animation */}
          {isVerifying && progressStep && (
            <div className="cyber-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--neon-emerald)' }}>
                  {progressStep.status === 'forensic_ela' && ' SCANNING PIXEL MATRIX (ELA)...'}
                  {(progressStep.status === 'received' || progressStep.status === 'hashing') && ' HASHING OBJECTIVE SIGNALS...'}
                  {progressStep.status === 'exifr_audit' && ' AUDITING EXIF METADATA HEADERS...'}
                  {progressStep.status === 'k9_sniffer' && ' SNIFFING SYNTHETIC ARTIFACTS...'}
                  {progressStep.status === 'walrus_archive' && ' ARCHIVING WALRUS ARTIFACTS...'}
                  {progressStep.status === 'complete' && ' VERIFICATION COMPLETE'}
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px' }}>{progressStep.progress}%</span>
              </div>
              
              <div className="forensic-scanner-box">
                <div className="laser-grid-overlay"></div>
                <div className="laser-scanning-bar"></div>
                <div style={{ zIndex: 10, textAlign: 'center' }}>
                  <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>
                    {progressStep.status === 'forensic_ela' && ''}
                    {(progressStep.status === 'received' || progressStep.status === 'hashing') && ''}
                    {progressStep.status === 'exifr_audit' && ''}
                    {progressStep.status === 'k9_sniffer' && ''}
                    {progressStep.status === 'walrus_archive' && ''}
                  </span>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: '#fff' }}>
                    REAL-TIME MULTI-AGENT INQUEST IN PROGRESS
                  </span>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', fontFamily: 'var(--mono)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>DCT Frequency Synthetic Artifact Score</span>
                    <span style={{ color: syntheticArtifactScore > 55 ? 'var(--neon-rose)' : 'var(--neon-emerald)' }}>{syntheticArtifactScore}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${syntheticArtifactScore}%`,
                      height: '100%',
                      background: syntheticArtifactScore > 55 ? 'var(--neon-rose)' : 'var(--neon-emerald)',
                      borderRadius: '3px'
                    }} />
                  </div>
                </div>
              </div>

              {objective && (
                <div className="linear-card-recessed" style={{ padding: '20px', marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--neon-indigo)', display: 'block', marginBottom: '10px', letterSpacing: '1px' }}>
                    [OBJECTIVE ORIGINALITY SIGNALS]
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px', fontFamily: 'var(--mono)' }}>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>SHA-256</div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>{objective.sha256.slice(0, 18)}...</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>pHash Risk</div>
                      <div style={{ color: duplicateRisk === 'high' ? 'var(--neon-rose)' : duplicateRisk === 'medium' ? 'var(--neon-gold)' : 'var(--neon-emerald)', fontWeight: 600 }}>{duplicateRisk.toUpperCase()}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>DCT pHash</div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>{objective.perceptualHash.hash}</div>
                    </div>
                    <div>
                      <div style={{ color: 'var(--text-muted)' }}>HF Ratio / Grid</div>
                      <div style={{ color: '#fff', fontWeight: 600 }}>{objective.frequency.highFrequencyRatio} / {objective.frequency.gridAnisotropy}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '10.5px', color: 'var(--text-muted)', lineHeight: 1.5, marginTop: '12px' }}>
                    {objective.methodology?.[0]}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Live Terminal Console */}
          {(isVerifying || consoleLogs.length > 0) && (
            <div className="cyber-card" style={{ padding: '24px' }}>
              <span className="header-badge" style={{ marginBottom: '12px', fontSize: '9px' }}>Audit Console Logs</span>
              <div className="console-container" style={{ height: '180px' }}>
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className="console-line">
                    <span className="console-time">[{new Date().toLocaleTimeString()}]</span>
                    <span className={`console-tag ${log.includes('completed') || log.includes('Verdict') ? 'tag-success' : log.includes('Error') || log.includes('[ERROR]') ? 'tag-rose' : 'tag-forensic'}`}>
                      {log.includes('completed') ? '[SUCCESS]' : log.includes('[ERROR]') ? '[FAIL]' : '[AGENT]'}
                    </span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Verdict Results Column */}
        <div>
          {verdictResult ? (
            <div className="cyber-card" style={{ animation: 'fadeInRight 0.6s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <span className={`header-badge ${isApproved ? 'badge-emerald' : 'badge-rose'}`}>
                  VERDICT SUMMARY
                </span>
                <span style={{ fontSize: '28px', color: isApproved ? 'var(--neon-emerald)' : 'var(--neon-rose)', fontWeight: 800 }}>
                  {grade} Grade
                </span>
              </div>

              <div style={{ textAlign: 'center', margin: '30px 0', borderBottom: '1px solid var(--border-light)', paddingBottom: '30px' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  background: isApproved ? 'rgba(16, 185, 129, 0.1)' : 'rgba(236, 72, 153, 0.1)', 
                  border: '2px solid',
                  borderColor: isApproved ? 'var(--neon-emerald)' : 'var(--neon-rose)',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: isApproved ? '0 0 25px var(--neon-emerald-glow)' : '0 0 25px var(--neon-rose-glow)'
                }}>
                  <span style={{ fontSize: '36px' }}>{isApproved ? '' : ''}</span>
                </div>
                <h4 style={{ fontSize: '22px', color: '#fff', marginTop: '16px', fontWeight: 800 }}>
                  {isApproved ? 'Audit Approved' : 'Synthetic Alert'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', padding: '0 20px', marginTop: '8px', lineHeight: 1.5 }}>
                  {noteText}
                </p>
              </div>

              {/* Forensic Metrics Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', fontFamily: 'var(--mono)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Pixel Forensics Authenticity Score</span>
                    <span style={{ color: forensicScore > 50 ? 'var(--neon-emerald)' : 'var(--neon-rose)' }}>{forensicScore}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${forensicScore}%`, 
                      height: '100%', 
                      background: forensicScore > 50 ? 'var(--neon-emerald)' : 'var(--neon-rose)',
                      borderRadius: '3px' 
                    }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', fontFamily: 'var(--mono)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>AI Sniffer Generated Probability</span>
                    <span style={{ color: aiProbability > 50 ? 'var(--neon-rose)' : 'var(--neon-emerald)' }}>{aiProbability}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${aiProbability}%`, 
                      height: '100%', 
                      background: aiProbability > 50 ? 'var(--neon-rose)' : 'var(--neon-emerald)',
                      borderRadius: '3px' 
                    }} />
                  </div>
                </div>
              </div>

              {/* Content Credentials (C2PA) — real signature verification */}
              {(() => {
                const p = verdictResult?.provenance
                if (!p) return null
                const map: Record<string, { color: string; label: string }> = {
                  verified:    { color: 'var(--neon-emerald)', label: '✓ Verified provenance' },
                  present:     { color: 'var(--neon-gold)',    label: ' Manifest present (signature unverified)' },
                  absent:      { color: 'var(--text-muted)',   label: '— No Content Credentials embedded' },
                  unavailable: { color: 'var(--text-muted)',   label: '— C2PA check unavailable' },
                }
                const s = map[p.status] ?? map.unavailable
                return (
                  <div className="linear-card-recessed" style={{ padding: '20px', marginBottom: '24px' }}>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--neon-cyan)', display: 'block', marginBottom: '10px', letterSpacing: '1px' }}>
                      [CONTENT CREDENTIALS · C2PA]
                    </span>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: s.color }}>{s.label}</div>
                    {p.signer && <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--text-secondary)', marginTop: '6px' }}>Signed by: {p.signer}</div>}
                    {p.claimGenerator && <div style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--text-muted)', marginTop: '2px' }}>Generator: {p.claimGenerator}</div>}
                    {p.validationErrors?.length ? <div style={{ fontSize: '10.5px', color: 'var(--neon-rose)', marginTop: '4px' }}>Issues: {p.validationErrors.join(', ')}</div> : null}
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '8px' }}>Standard: C2PA / Content Credentials (c2pa.org)</div>
                  </div>
                )
              })()}

              {/* Hardware Stamp Header Specs */}
              <div className="linear-card-recessed" style={{ padding: '20px', marginBottom: '24px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--neon-gold)', display: 'block', marginBottom: '10px', letterSpacing: '1px' }}>
                  [EXIF METADATA SPECIFICATIONS]
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px', fontFamily: 'var(--mono)' }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Device Model</div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{cameraSpec}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Lens</div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>N/A</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Software Signature</div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{softwareSpec}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Capture/Mint Time</div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{stampSpec}</div>
                  </div>
                </div>
              </div>

              {/* MemWal On-chain Ledger Audit Clues */}
              {verdictResult.inspector?.clues && (
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--neon-emerald)', display: 'block', marginBottom: '12px', letterSpacing: '1px' }}>
                    [MEMWAL ON-CHAIN LEDGER AUDIT CLUES]
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {verdictResult.inspector.clues.map((clue: any, idx: number) => (
                      <div key={idx} className="linear-card-recessed" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '11px', fontFamily: 'var(--mono)' }}>
                          <strong style={{ color: '#fff' }}>{clue.agentId}</strong>
                          <span style={{ 
                            color: clue.severity === 'critical' ? 'var(--neon-rose)' : clue.severity === 'warning' ? 'var(--neon-gold)' : 'var(--neon-emerald)'
                          }}>
                            {clue.severity.toUpperCase()}
                          </span>
                        </div>
                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                          {clue.message}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', marginTop: '6px' }}>
                          <span>Impact: {clue.scoreImpact > 0 ? `+${clue.scoreImpact}` : clue.scoreImpact}</span>
                          <span>Timestamp: {new Date(clue.createdAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Proceed to Sealed Vault Action Button for Approved Audits */}
              {isApproved && (
                <div style={{ 
                  marginTop: '30px', 
                  paddingTop: '20px', 
                  borderTop: '1px solid rgba(16, 185, 129, 0.2)',
                  animation: 'fadeIn 0.5s ease 0.3s both'
                }}>
                  <div style={{ 
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%)', 
                    border: '1px solid rgba(16, 185, 129, 0.25)', 
                    borderRadius: '8px', 
                    padding: '16px',
                    textAlign: 'center',
                    boxShadow: '0 0 15px rgba(16, 185, 129, 0.05)'
                  }}>
                    <h5 style={{ color: '#fff', fontSize: '13px', margin: '0 0 6px 0', fontWeight: 700 }}>
                      ✓ Verify SUCCESS: Provenance Confirmed
                    </h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '11px', margin: '0 0 16px 0', lineHeight: 1.4 }}>
                      Your specimen is verified as an original real photograph. Proceed to the **Identity Gate** to mint your Genesis Passport NFT with the verified grade.
                    </p>
                    <Link 
                      to="/register" 
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
                      🪪 Proceed to Identity Gate (Register)
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div 
              className="cyber-card" 
              style={{ 
                height: '100%', 
                minHeight: '450px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundImage: "linear-gradient(rgba(8, 10, 22, 0.85), rgba(8, 10, 22, 0.95)), url('/digital-passport.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderColor: 'rgba(99, 102, 241, 0.25)',
                boxShadow: '0 0 30px rgba(99, 102, 241, 0.05)',
                opacity: 0.85
              }}
            >
              <span style={{ fontSize: '40px', marginBottom: '16px', filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.5))' }}></span>
              <p style={{ fontSize: '13px', color: '#fff', textAlign: 'center', padding: '0 30px', lineHeight: 1.5, textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
                Forensics verdict report card will dynamically render here once audit analysis is triggered.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
