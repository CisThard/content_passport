import { useState, useRef } from 'react'
import { SAMPLE_MEDIAS } from '../samples'

interface ScanProgressStep {
  status: 'idle' | 'forensic_ela' | 'exifr_audit' | 'k9_sniffer' | 'complete'
  progress: number
  logLine: string
}

const API_BASE = window.location.origin.includes('localhost') ? 'http://localhost:3000' : '';

export default function Verify() {
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(SAMPLE_MEDIAS[0].id)
  const [customFile, setCustomFile] = useState<File | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [progressStep, setProgressStep] = useState<ScanProgressStep | null>(null)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])
  const [verdictResult, setVerdictResult] = useState<any | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

  const handleStartAudit = async () => {
    setIsVerifying(true)
    setVerdictResult(null)
    setConsoleLogs([])

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
        
        const response = await fetch(`/samples/${sample.name}`)
        if (!response.ok) {
          throw new Error(`Failed to load specimen image. Make sure it exists in web/public/samples/`)
        }
        fileToUpload = await response.blob()
        fileName = sample.name
      }

      // Step 1: Forensic Error Level Analysis (ELA)
      setProgressStep({ status: 'forensic_ela', progress: 25, logLine: 'ForensicAgent initialized. Accessing image pixel arrays...' })
      setConsoleLogs((prev) => [...prev, 'ForensicAgent initialized. Accessing image pixel arrays...'])
      await delay(500)
      
      setProgressStep({ status: 'forensic_ela', progress: 40, logLine: 'Re-compressing image at 90% JPEG density quality...' })
      setConsoleLogs((prev) => [...prev, 'Re-compressing image at 90% JPEG density quality...'])
      await delay(400)

      // Step 2: Metadata Audit
      setProgressStep({ status: 'exifr_audit', progress: 60, logLine: 'MetadataAgent parsing EXIF headers. Accessing manufacturers metadata...' })
      setConsoleLogs((prev) => [...prev, 'MetadataAgent parsing EXIF headers. Accessing manufacturers metadata...'])
      await delay(500)

      // Step 3: Send request to the live backend api
      setProgressStep({ status: 'k9_sniffer', progress: 80, logLine: 'K-9 Sniffer invoking Gemini cognitive verification and MemWal relayer...' })
      setConsoleLogs((prev) => [...prev, 'K-9 Sniffer invoking Gemini cognitive verification and MemWal relayer...'])

      const formData = new FormData()
      formData.append('file', fileToUpload, fileName)

      const apiResponse = await fetch(`${API_BASE}/api/verify`, {
        method: 'POST',
        body: formData,
      })

      if (!apiResponse.ok) {
        const errPayload = await apiResponse.json().catch(() => ({}))
        throw new Error(errPayload.error || `Server verification failed with status: ${apiResponse.status}`)
      }

      const data = await apiResponse.json()
      
      // Step 4: Complete
      setProgressStep({ status: 'complete', progress: 100, logLine: `AASE Verification completed. Verdict: ${data.assessment.recreateReady ? 'APPROVED' : 'REJECTED'}` })
      setConsoleLogs((prev) => [...prev, `AASE Verification completed. Verdict: ${data.assessment.recreateReady ? 'APPROVED' : 'REJECTED'}`])

      setVerdictResult(data)
    } catch (err: any) {
      console.error(err)
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
  const noteText = aiAgent ? aiAgent.evidence.join('. ') : 'AI K-9 Sniffer audit completed.';

  const metadataAgent = verdictResult?.scores?.find((s: any) => s.agentId === 'metadata-agent');
  const cameraSpec = metadataAgent?.evidence?.find((e: string) => e.startsWith('Camera'))?.replace('Camera ', '') || 'Camera Hardware Undefined';
  const softwareSpec = metadataAgent?.evidence?.find((e: string) => e.startsWith('Editing/AI software')) || 'No modification signature';
  const stampSpec = metadataAgent?.evidence?.find((e: string) => e.includes('timestamp') || e.includes('capture')) || 'Original timestamp present';

  return (
    <div className="dashboard-container" style={{ maxWidth: '1200px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="header-badge badge-rose">Aurelius Lab</span>
        <h2 className="cyber-title">AI Media Authenticity Checkpoint</h2>
        <p className="cyber-subtitle" style={{ margin: '10px auto 0' }}>
          Evaluate media artifacts using Error Level Analysis (ELA) pixel compression metrics, EXIF hardware consistency verification, and Gemini 3.5 Flash Vision cognitive sniffer audits.
        </p>
      </div>

      {/* Roadmap Phase-in Notice */}
      <div className="linear-card-recessed" style={{ marginBottom: '35px', padding: '16px 20px', background: 'rgba(99, 102, 241, 0.02)', borderColor: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', gap: '15px', borderRadius: '4px' }}>
        <span style={{ fontSize: '20px' }}>🚧</span>
        <div style={{ fontSize: '12px', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--neon-indigo)' }}>Active Roadmap Phase:</strong> Aurelius Lab is currently optimized for <strong style={{ color: '#fff' }}>Visual Media (Images)</strong>. Forensic verification suites for Audio, Video, and Text Text (Text/Code) Code are scheduled for development and will be deployed sequentially in upcoming protocol upgrades.
        </div>
      </div>

      <div className="grid-layout-2">
        {/* Verification Controls & Visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Sample Select & File Upload */}
          <div className="cyber-card">
            <h3 className="card-title">Select Audit Specimen</h3>
            <p className="card-subtitle">Choose a test specimen image to trigger the verification agents.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              {SAMPLE_MEDIAS.map((sample) => (
                <div
                  key={sample.id}
                  onClick={() => {
                    if (!isVerifying) {
                      setSelectedSampleId(sample.id)
                      setCustomFile(null)
                      setVerdictResult(null)
                      setProgressStep(null)
                      setConsoleLogs([])
                    }
                  }}
                  className="cyber-card"
                  style={{
                    padding: '20px',
                    margin: 0,
                    cursor: isVerifying ? 'not-allowed' : 'pointer',
                    borderColor: selectedSampleId === sample.id ? 'var(--neon-indigo)' : 'var(--border-light)',
                    background: selectedSampleId === sample.id ? 'rgba(99, 102, 241, 0.05)' : 'var(--bg-panel)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: sample.type === 'real' ? 'var(--neon-emerald)' : 'var(--neon-rose)' }}>
                      {sample.type === 'real' ? '📸 CAMERA RAW' : '🤖 GENERATED AI'}
                    </span>
                    <span style={{ fontSize: '14px' }}>{sample.type === 'real' ? '🏔️' : '🏙️'}</span>
                  </div>
                  <strong style={{ fontSize: '13px', color: '#fff', display: 'block', marginBottom: '4px' }}>{sample.title}</strong>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>{sample.name}</span>
                </div>
              ))}
            </div>

            {/* Custom file upload */}
            <div style={{ borderTop: '1px dashed var(--border-light)', paddingTop: '20px', marginTop: '20px', marginBottom: '24px' }}>
              <strong style={{ fontSize: '12px', color: '#fff', display: 'block', marginBottom: '8px' }}>
                Or Upload Custom Specimen
              </strong>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setCustomFile(e.target.files[0])
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
                  border: '1px dashed var(--border-light)',
                  padding: '20px',
                  borderRadius: '4px',
                  textAlign: 'center',
                  cursor: isVerifying ? 'not-allowed' : 'pointer',
                  borderColor: customFile ? 'var(--neon-indigo)' : 'var(--border-light)',
                  background: customFile ? 'rgba(99, 102, 241, 0.03)' : 'transparent',
                  transition: 'all 0.3s ease'
                }}
              >
                {customFile ? (
                  <div>
                    <span style={{ fontSize: '20px', display: 'block', marginBottom: '6px' }}>🖼️</span>
                    <strong style={{ fontSize: '12px', color: '#fff', display: 'block' }}>{customFile.name}</strong>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {(customFile.size / 1024 / 1024).toFixed(2)} MB • Click to change
                    </span>
                  </div>
                ) : (
                  <div>
                    <span style={{ fontSize: '20px', display: 'block', marginBottom: '6px' }}>📤</span>
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

            <button
              onClick={handleStartAudit}
              disabled={isVerifying}
              className={`cyber-btn ${
                (customFile || (selectedSampleId && SAMPLE_MEDIAS.find(s => s.id === selectedSampleId)?.type === 'real')) 
                  ? 'cyber-btn-indigo' 
                  : 'cyber-btn-rose'
              }`}
              style={{ width: '100%' }}
            >
              {isVerifying ? 'Performing Forensics Audit...' : 'Start Audit'}
            </button>
          </div>

          {/* Forensic Laser Scanner Animation */}
          {isVerifying && progressStep && (
            <div className="cyber-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--neon-emerald)' }}>
                  {progressStep.status === 'forensic_ela' && '🔍 SCANNING PIXEL MATRIX (ELA)...'}
                  {progressStep.status === 'exifr_audit' && '📂 AUDITING EXIF METADATA HEADERS...'}
                  {progressStep.status === 'k9_sniffer' && '🐕 SNIFFING SYNTHETIC ARTIFACTS...'}
                </span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px' }}>{progressStep.progress}%</span>
              </div>
              
              <div className="forensic-scanner-box">
                <div className="laser-grid-overlay"></div>
                <div className="laser-scanning-bar"></div>
                <div style={{ zIndex: 10, textAlign: 'center' }}>
                  <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>
                    {progressStep.status === 'forensic_ela' && '🎛️'}
                    {progressStep.status === 'exifr_audit' && '📂'}
                    {progressStep.status === 'k9_sniffer' && '🐕'}
                  </span>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--mono)', color: '#fff' }}>
                    REAL-TIME MULTI-AGENT INQUEST IN PROGRESS
                  </span>
                </div>
              </div>
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
                  <span style={{ fontSize: '36px' }}>{isApproved ? '🛂' : '❌'}</span>
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
                  present:     { color: 'var(--neon-gold)',    label: '⚠ Manifest present (signature unverified)' },
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
                          <span>Timestamp: {new Date(clue.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))}
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
              <span style={{ fontSize: '40px', marginBottom: '16px', filter: 'drop-shadow(0 0 10px rgba(99,102,241,0.5))' }}>🛂</span>
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
