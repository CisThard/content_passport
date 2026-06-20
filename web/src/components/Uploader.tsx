import { useRef, useState } from 'react'

export function Uploader({ onFile, busy }: { onFile: (f: File) => void; busy: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [drag, setDrag] = useState(false)

  function pick(files: FileList | null) {
    const f = files?.[0]
    if (f) onFile(f)
  }

  return (
    <div
      className={`uploader ${drag ? 'drag' : ''} ${busy ? 'busy' : ''}`}
      onClick={() => !busy && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDrag(true) }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => { e.preventDefault(); setDrag(false); if (!busy) pick(e.dataTransfer.files) }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => pick(e.target.files)}
      />
      <div className="up-icon">{busy ? '◌' : '⬆'}</div>
      <div className="up-title">{busy ? 'Analyzing…' : 'Drop an image or click to upload'}</div>
      <div className="up-sub">
        {busy ? 'SHA-256 · EXIF · Error-Level-Analysis running in your browser' : 'Your file never leaves the browser — hashing, EXIF, and ELA run locally'}
      </div>
    </div>
  )
}
