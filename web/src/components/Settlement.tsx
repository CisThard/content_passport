import type { RoyaltyPayout } from '../engine'
import { PARTICIPANT_LABEL } from '../samples'

interface Props {
  payouts: RoyaltyPayout[]
  revenueMist: bigint
  settled: boolean
}

const sui = (mist: bigint) => (Number(mist) / 1e9).toFixed(0)

export function Settlement({ payouts, revenueMist, settled }: Props) {
  return (
    <div className="card">
      <h2>Customs Settlement</h2>
      <p className="sub">co_creation_policy::distribute_royalties · dust-safe integer split</p>

      <div className="kpi" style={{ marginBottom: 8 }}>
        <div className="k">
          <div className="label">Travel essay revenue</div>
          <div className="val">{sui(revenueMist)} SUI</div>
        </div>
        <div className="k">
          <div className="label">Status</div>
          <div className="val" style={{ color: settled ? 'var(--green)' : 'var(--txt-3)' }}>
            {settled ? 'PAID' : 'pending'}
          </div>
        </div>
      </div>

      {payouts.length === 0 && <div className="note info">Fund escrow & pass consent to preview the on-chain split.</div>}

      {payouts.map((p) => (
        <div className={`payout ${settled ? 'flash' : ''}`} key={p.address}>
          <span className="addr">{PARTICIPANT_LABEL[p.address] ?? p.address}</span>
          <span className="pct">{p.weight}%</span>
          <span className="amt">{sui(p.amountMist)} SUI</span>
        </div>
      ))}
    </div>
  )
}
