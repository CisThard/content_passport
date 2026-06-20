import type { Signal, SignalStatus, Verdict } from '../lib/analyze'

const VERDICT: Record<Verdict, { label: string; tone: string; note: string }> = {
  'verified': { label: 'Likely authentic', tone: 'ok', note: 'Signals are consistent with an unaltered original.' },
  'inconclusive': { label: 'Inconclusive', tone: 'warn', note: 'Some signals are missing or borderline.' },
  'likely-manipulated': { label: 'Likely manipulated', tone: 'bad', note: 'Signals point to editing or synthesis.' },
}

const STATUS_ICON: Record<SignalStatus, string> = { pass: '✓', warn: '!', fail: '✕', absent: '—' }

export function AuthenticityReport({
  signals, verdict, grade, score,
}: { signals: Signal[]; verdict: Verdict; grade: string; score: number }) {
  const v = VERDICT[verdict]
  return (
    <div className="card">
      <div className={`verdict-banner v-${v.tone}`}>
        <div>
          <div className="vb-label">{v.label}</div>
          <div className="vb-note">{v.note}</div>
        </div>
        <div className="vb-score">
          <span className="num">{score}</span>
          <span className="grade">grade {grade}</span>
        </div>
      </div>

      <p className="section-title" style={{ marginTop: 16 }}>Evidence</p>
      {signals.map((s) => (
        <div className="evi" key={s.id}>
          <span className={`evi-st st-${s.status}`}>{STATUS_ICON[s.status]}</span>
          <div className="evi-body">
            <div className="evi-h"><b>{s.label}</b><span className={`evi-tag st-${s.status}`}>{s.status.toUpperCase()}</span></div>
            <div className="evi-measured">{s.measured}</div>
            <div className="evi-basis">Rule: {s.threshold}</div>
            <div className="evi-basis cite">Basis: {s.basis}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
