import type { RecreateReadiness } from '../engine'

interface Props {
  readiness: RecreateReadiness
  escrowFunded: boolean
}

export function ConsentGate({ readiness, escrowFunded }: Props) {
  const a = readiness.assessment
  const gradeOk = a.recreateReady
  const royaltyOk = readiness.terms.participants.reduce((s, p) => s + p.weight, 0) === 100

  const checks = [
    { on: gradeOk, label: `Authenticity ≥ ${readiness.terms.minimumGrade} (got ${a.grade}, score ${a.score})` },
    { on: escrowFunded, label: `Escrow funded (${(Number(readiness.terms.escrowAmountMist) / 1e9).toFixed(0)} SUI locked)` },
    { on: royaltyOk, label: 'Royalty allocation sums to 100%' },
  ]

  return (
    <div className="card">
      <h2>Programmable Recreate Consent</h2>
      <p className="sub">no manual approval — the trigger grants consent automatically</p>

      <div className={`gate ${readiness.ready ? 'ready' : 'blocked'}`}>
        <div className="verdict">{readiness.ready ? '✓ AUTO-APPROVED' : '✕ CONSENT WITHHELD'}</div>
        <div className="reason">{readiness.reason}</div>
      </div>

      <div className="checklist">
        {checks.map((c, i) => (
          <div className={`check ${c.on ? 'on' : 'off'}`} key={i}>
            <span className="mk">{c.on ? '✓' : '✕'}</span>
            <span>{c.label}</span>
          </div>
        ))}
      </div>

      <div className="note info">
        Trigger: <b>{readiness.terms.trigger.description}</b>
      </div>
    </div>
  )
}
