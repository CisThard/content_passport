import { useState } from 'react'
import { SAMPLE_MEDIAS, MediaSample } from '../samples'
import { simulateVerification, ScanProgressStep } from '../engine'

export default function Verify() {
  const [selectedSampleId, setSelectedSampleId] = useState<string>(SAMPLE_MEDIAS[0].id)
  const [isVerifying, setIsVerifying] = useState(false)
  const [progressStep, setProgressStep] = useState<ScanProgressStep | null>(null)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([])
  const [verdictResult, setVerdictResult] = useState<MediaSample | null>(null)

  const handleStartAudit = async () => {
    setIsVerifying(true)
    setVerdictResult(null)
    setConsoleLogs([])

    await simulateVerification(selectedSampleId, (step) => {
      setProgressStep(step)
      setConsoleLogs((prev) => [...prev, step.logLine])
    })

    const sample = SAMPLE_MEDIAS.find((s) => s.id === selectedSampleId) || SAMPLE_MEDIAS[0]
    setVerdictResult(sample)
    setIsVerifying(false)
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '1200px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="header-badge badge-rose">Aurelius Lab</span>
        <h2 className="cyber-title">AI Media Authenticity Checkpoint</h2>
        <p className="cyber-subtitle" style={{ margin: '10px auto 0' }}>
          Evaluate media artifacts using Error Level Analysis (ELA) pixel compression metrics, EXIF hardware consistency verification, and Gemini 3.5 Flash Vision cognitive sniffer audits.
        </p>
      </div>

      <div className="grid-layout-2">
        {/* Verification Controls & Visualizer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {/* Sample Select */}
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

            <button
              onClick={handleStartAudit}
              disabled={isVerifying}
              className={`cyber-btn ${SAMPLE_MEDIAS.find(s => s.id === selectedSampleId)?.type === 'real' ? 'cyber-btn-indigo' : 'cyber-btn-rose'}`}
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
                    ELA COMPRESSION ERROR ANALYSIS IN PROGRESS
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
                    <span className={`console-tag ${log.includes('completed') || log.includes('Verdict') ? 'tag-success' : log.includes('Audit') ? 'tag-meta' : 'tag-forensic'}`}>
                      {log.includes('completed') ? '[SUCCESS]' : '[AGENT]'}
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
                <span className={`header-badge ${verdictResult.type === 'real' ? 'badge-emerald' : 'badge-rose'}`}>
                  VERDICT SUMMARY
                </span>
                <span style={{ fontSize: '28px', color: verdictResult.type === 'real' ? 'var(--neon-emerald)' : 'var(--neon-rose)', fontWeight: 800 }}>
                  {verdictResult.forensics.elaGrade} Grade
                </span>
              </div>

              <div style={{ textAlign: 'center', margin: '30px 0', borderBottom: '1px solid var(--border-light)', paddingBottom: '30px' }}>
                <div style={{ 
                  display: 'inline-flex', 
                  width: '100px', 
                  height: '100px', 
                  borderRadius: '50%', 
                  background: verdictResult.type === 'real' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(236, 72, 153, 0.1)', 
                  border: '2px solid',
                  borderColor: verdictResult.type === 'real' ? 'var(--neon-emerald)' : 'var(--neon-rose)',
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: verdictResult.type === 'real' ? '0 0 25px var(--neon-emerald-glow)' : '0 0 25px var(--neon-rose-glow)'
                }}>
                  <span style={{ fontSize: '36px' }}>{verdictResult.type === 'real' ? '🛂' : '❌'}</span>
                </div>
                <h4 style={{ fontSize: '22px', color: '#fff', marginTop: '16px', fontWeight: 800 }}>
                  {verdictResult.type === 'real' ? 'Audit Approved' : 'Synthetic Alert'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', padding: '0 20px', marginTop: '8px', lineHeight: 1.5 }}>
                  {verdictResult.note}
                </p>
              </div>

              {/* Forensic Metrics Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', fontFamily: 'var(--mono)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Avg Error Level Analysis (ELA) Ratio</span>
                    <span style={{ color: verdictResult.type === 'real' ? 'var(--neon-emerald)' : 'var(--neon-rose)' }}>{verdictResult.forensics.avgErrorRatio}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${verdictResult.forensics.avgErrorRatio}%`, 
                      height: '100%', 
                      background: verdictResult.type === 'real' ? 'var(--neon-emerald)' : 'var(--neon-rose)',
                      borderRadius: '3px' 
                    }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', fontFamily: 'var(--mono)' }}>
                    <span style={{ color: 'var(--text-muted)' }}>AI Sniffer Generated Probability</span>
                    <span style={{ color: verdictResult.aiProbability > 50 ? 'var(--neon-rose)' : 'var(--neon-emerald)' }}>{verdictResult.aiProbability}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${verdictResult.aiProbability}%`, 
                      height: '100%', 
                      background: verdictResult.aiProbability > 50 ? 'var(--neon-rose)' : 'var(--neon-emerald)',
                      borderRadius: '3px' 
                    }} />
                  </div>
                </div>
              </div>

              {/* Hardware Stamp Header Specs */}
              <div className="linear-card-recessed" style={{ padding: '20px' }}>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--neon-gold)', display: 'block', marginBottom: '10px', letterSpacing: '1px' }}>
                  [EXIF METADATA SPECIFICATIONS]
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '11px', fontFamily: 'var(--mono)' }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Device Model</div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{verdictResult.meta.camera}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Lens</div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{verdictResult.meta.lens}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Software Signature</div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{verdictResult.meta.software}</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Capture/Mint Time</div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>{verdictResult.meta.creationDate}</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="cyber-card" 
              style={{ 
                height: '100%', 
                minHeight: '400px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundImage: "linear-gradient(rgba(8, 10, 22, 0.85), rgba(8, 10, 22, 0.95)), url('/c-pass.jpg')",
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
