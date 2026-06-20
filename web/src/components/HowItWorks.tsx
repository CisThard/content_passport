const STEPS = [
  { n: '1', t: 'Verify', d: 'Upload your work. We check provenance, compression, and metadata against published forensic standards — right in your browser.' },
  { n: '2', t: 'License', d: 'Set your terms once: how much royalty you keep and the minimum authenticity you require. No paperwork.' },
  { n: '3', t: 'Recreate', d: 'When a second creator meets your terms, consent and the royalty split execute on-chain automatically.' },
]

export function HowItWorks() {
  return (
    <div className="how">
      {STEPS.map((s) => (
        <div className="how-card" key={s.n}>
          <div className="how-n">{s.n}</div>
          <div className="how-t">{s.t}</div>
          <div className="how-d">{s.d}</div>
        </div>
      ))}
    </div>
  )
}
