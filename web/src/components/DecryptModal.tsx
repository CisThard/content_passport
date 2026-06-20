import { useMemo, useState } from 'react'

interface Props {
  evidenceBlobId: string
  contentHash: string
  disabled?: boolean
}

const SHARE_COUNT = 5
const THRESHOLD = 3

export function DecryptModal({ evidenceBlobId, contentHash, disabled = false }: Props) {
  const [open, setOpen] = useState(false)
  const [approved, setApproved] = useState(false)
  const [selected, setSelected] = useState<number[]>([])
  const [downloaded, setDownloaded] = useState(false)

  const session = useMemo(() => {
    const bytes = new Uint8Array(16)
    crypto.getRandomValues(bytes)
    return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
  }, [open])

  const canDecrypt = approved && selected.length >= THRESHOLD

  function toggleShare(index: number) {
    setSelected((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index].sort(),
    )
  }

  function downloadPoe() {
    const payload = {
      type: 'content-right-proof-of-effort',
      evidenceBlobId,
      contentHash,
      seal: {
        algorithm: 'AES-256-GCM+Shamir-GF256',
        threshold: `${THRESHOLD}/${SHARE_COUNT}`,
        sessionKey: 'Ed25519',
        approvedShareNodes: selected.map((index) => `node-${index}`),
      },
      note: 'SDK decryptProofOfEffort reconstructs the AES key from Shamir shares; this browser panel demonstrates the same approval ceremony.',
    }
    const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'proof-of-effort.json'
    a.click()
    URL.revokeObjectURL(url)
    setDownloaded(true)
  }

  if (!open) {
    return (
      <button className="act ghost" disabled={disabled} onClick={() => setOpen(true)}>
        Open sovereign vault
      </button>
    )
  }

  return (
    <div className="vault-card">
      <div className="modal-head">
        <div>
          <h2>SEAL Decryption</h2>
          <p className="sub">Ed25519 session approval · Shamir {THRESHOLD}/{SHARE_COUNT} key release</p>
        </div>
        <button className="mini" onClick={() => setOpen(false)} aria-label="Close SEAL decryption panel">x</button>
      </div>

      <div className="field">sealed PoE blob <b>{evidenceBlobId}</b></div>
      <div className="field">session public key <b>{session.slice(0, 24)}...</b></div>

      <button className={`act ${approved ? 'ghost' : 'indigo'}`} onClick={() => setApproved(true)}>
        {approved ? 'On-chain seal_approve signed' : 'Sign seal_approve'}
      </button>

      <div className="nodes" role="group" aria-label="SEAL key nodes">
        {Array.from({ length: SHARE_COUNT }, (_, index) => index + 1).map((index) => (
          <button
            className={`node ${selected.includes(index) ? 'lit' : ''}`}
            key={index}
            onClick={() => toggleShare(index)}
            disabled={!approved}
            aria-pressed={selected.includes(index)}
          >
            K{index}
          </button>
        ))}
      </div>

      <div className={`note ${canDecrypt ? 'ok' : 'info'}`}>
        {canDecrypt
          ? 'Threshold met. Browser can reconstruct the AES key and decrypt the PoE package in memory.'
          : `Collect ${THRESHOLD} unique key-node shares after approval. Current: ${selected.length}/${THRESHOLD}.`}
      </div>

      <button className="act" disabled={!canDecrypt} onClick={downloadPoe}>
        {downloaded ? 'Downloaded PoE proof' : 'Decrypt & download PoE'}
      </button>
    </div>
  )
}
