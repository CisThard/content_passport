import type { VisaStamp } from '../engine'

export interface PassportView {
  passportId: string
  contentHash: string
  grade: string
  score: number
  mediaBlobId: string
  evidenceBlobId: string
  visaStamps: VisaStamp[]
  remainingShare: number
}

export function PassportCard({ p }: { p: PassportView }) {
  const origin = p.visaStamps.find((s) => s.countryCode === 'ORIGIN')
  const countryB = p.visaStamps.find((s) => s.countryCode === 'B')
  return (
    <div className="passport">
      <div className="pp-h">
        <div>
          <div className="id">GENESIS PASSPORT</div>
          <div className="pp-title">Recreate-Ready · Grade {p.grade}</div>
        </div>
        <span className={`gradechip g-${p.grade}`}>{p.score}</span>
      </div>

      <div className="field">passport: <b>{p.passportId}</b></div>
      <div className="field">content sha-256: <b>{p.contentHash.slice(0, 40)}…</b></div>
      <div className="field">media blob: <b>{p.mediaBlobId}</b></div>
      <div className="field">sealed evidence (PoE): <b>{p.evidenceBlobId}</b></div>

      <div className="stampbar">
        <div className="track">
          {origin && <div className="seg origin" style={{ width: `${origin.share}%` }}>{origin.share}%</div>}
          {countryB && <div className="seg b" style={{ width: `${countryB.share}%` }}>{countryB.share}%</div>}
          <div className="seg free" style={{ width: `${p.remainingShare}%` }}>
            {p.remainingShare}% open
          </div>
        </div>
        <div className="stamps">
          {origin && <span className="stamp origin">ORIGIN VISA · {origin.share}% · {origin.creatorAddress.slice(0, 12)}</span>}
          {countryB && <span className="stamp b">COUNTRY B VISA · {countryB.share}% · {countryB.creatorAddress.slice(0, 12)}</span>}
        </div>
      </div>
    </div>
  )
}
