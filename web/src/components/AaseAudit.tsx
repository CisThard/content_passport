import { BASE_WEIGHTS } from '../engine'
import type { AASEAssessment, AgentId } from '../engine'

const AGENT_LABEL: Record<AgentId, { name: string; role: string }> = {
  'forensic-agent': { name: 'Forensic', role: '🔍 X-Ray Scanner · ELA' },
  'metadata-agent': { name: 'Metadata', role: '🛂 Passport Officer · EXIF' },
  'ai-detection-agent': { name: 'AI Detection', role: '🐕 K-9 Sniffer · Gemini' },
  'memory-bonus': { name: 'MemWal Recall', role: '📂 Prior-journey history' },
}

export function AaseAudit({ assessment }: { assessment: AASEAssessment }) {
  return (
    <div className="card">
      <h2>AASE Authenticity Audit</h2>
      <p className="sub">advanced authenticity scoring engine · blackboard consensus</p>

      <div className="score-hero">
        <span className="score">{assessment.score}</span>
        <span className={`gradechip g-${assessment.grade}`}>{assessment.grade}</span>
        <span style={{ color: 'var(--txt-2)', fontSize: 12, fontFamily: 'var(--mono)' }}>
          min&nbsp;{assessment.requiredMinimumGrade} · {assessment.decision === 'recreate-ready' ? 'PASS' : 'BLOCKED'}
        </span>
      </div>

      <div style={{ marginTop: 16 }}>
        {assessment.contributions.map((c) => (
          <div className="agent" key={c.agentId}>
            <div className="name">
              {AGENT_LABEL[c.agentId].name}
              <small>{AGENT_LABEL[c.agentId].role}</small>
            </div>
            <div>
              <div className="bar"><span style={{ width: `${c.boundedScore}%` }} /></div>
              <div className="w">
                weight {Math.round(BASE_WEIGHTS[c.agentId] * 100)}% × conf {c.confidence.toFixed(2)} → {c.dynamicWeight}
              </div>
            </div>
            <div className="v">{c.boundedScore}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 14, fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--txt-2)' }}>
        <span>σ (disagreement): <b style={{ color: 'var(--txt)' }}>{assessment.stdDev}</b></span>
        <span>penalty: <b style={{ color: assessment.penalty > 0 ? 'var(--red)' : 'var(--txt)' }}>−{assessment.penalty}</b></span>
        <span>base: <b style={{ color: 'var(--txt)' }}>{assessment.baseWeightedScore}</b></span>
      </div>

      {assessment.warnings.map((w, i) => (
        <div className={`note ${assessment.decision === 'blocked' ? 'warn' : 'info'}`} key={i}>{w}</div>
      ))}
    </div>
  )
}
