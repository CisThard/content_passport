import { useState } from 'react'
import type { ContentMemoryGraph } from '../engine'

export function MemoryGraph({
  graph,
  onRestore,
  onClear,
}: {
  graph: ContentMemoryGraph | null
  onRestore?: (blobId: string) => Promise<void>
  onClear?: () => void
}) {
  const [blobId, setBlobId] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  async function restore() {
    if (!blobId.trim() || !onRestore) return
    setStatus('Restoring graph...')
    try {
      await onRestore(blobId.trim())
      setStatus('Restored from Walrus memory snapshot.')
    } catch (error) {
      setStatus(error instanceof Error ? error.message : String(error))
    }
  }

  const verified = graph
    ? graph.artifacts.every((artifact) => artifact.digest && artifact.walrusBlobId && artifact.createdBy)
    : false

  if (!graph) {
    return (
      <div className="card">
        <h2>Walrus Memory Graph</h2>
        <p className="sub">persistent agent state · Walrus artifacts · cross-session restore</p>
        <div className="restore-row">
          <input
            value={blobId}
            onChange={(event) => setBlobId(event.target.value)}
            placeholder="walrus://... or blob ID"
            aria-label="Walrus memory snapshot blob ID"
          />
          <button className="act ghost" disabled={!blobId.trim() || !onRestore} onClick={restore}>Restore</button>
        </div>
        {status && <div className="note info">{status}</div>}
        <div className="note info">Run an authenticity audit to create the memory graph.</div>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Walrus Memory Graph</h2>
      <p className="sub">persistent agent state · Walrus artifacts · cross-session restore</p>

      <div className="kpi graph-kpi">
        <div className="k">
          <div className="label">Artifacts</div>
          <div className="val">{graph.artifacts.length}</div>
        </div>
        <div className="k">
          <div className="label">Agent steps</div>
          <div className="val">{graph.steps.length}</div>
        </div>
        <div className="k">
          <div className="label">Restore</div>
          <div className="val">{graph.restoredFromWalrus ? 'YES' : 'READY'}</div>
        </div>
        <div className="k">
          <div className="label">Integrity</div>
          <div className="val">{verified ? 'OK' : 'CHECK'}</div>
        </div>
      </div>

      <div className="restore-row">
        <input
          value={blobId}
          onChange={(event) => setBlobId(event.target.value)}
          placeholder="Restore another graph snapshot blob ID"
          aria-label="Restore another Walrus memory graph"
        />
        <button className="act ghost" disabled={!blobId.trim() || !onRestore} onClick={restore}>Restore</button>
        {onClear && <button className="act ghost" onClick={onClear}>Clear local state</button>}
      </div>
      {status && <div className="note info">{status}</div>}
      <div className={`note ${verified ? 'ok' : 'warn'}`}>
        {verified
          ? 'Graph integrity check passed: every artifact has a digest, creator, and Walrus blob reference.'
          : 'Graph integrity check needs attention.'}
      </div>

      <p className="section-title" style={{ marginTop: 16 }}>Workflow timeline</p>
      <div className="timeline">
        {graph.steps.map((step) => (
          <div className={`timeline-step ${step.status}`} key={step.id}>
            <div className="ts-head">
              <span>{step.agentId}</span>
              <b>{step.status}</b>
            </div>
            <div className="ts-action">{step.action}</div>
            <div className="ts-summary">{step.summary}</div>
            <div className="ts-meta">
              inputs {step.inputArtifactIds.length} · outputs {step.outputArtifactIds.length} · memory {step.memoryKeys.length}
            </div>
          </div>
        ))}
      </div>

      <p className="section-title" style={{ marginTop: 16 }}>Walrus artifact lineage</p>
      <div className="artifact-list">
        {graph.artifacts.map((artifact) => (
          <div className="artifact" key={artifact.id}>
            <div>
              <div className="artifact-name">{artifact.name}</div>
              <div className="artifact-meta">
                {artifact.kind} · {artifact.createdBy} · {artifact.size} bytes
              </div>
              {artifact.reusedFrom?.length ? (
                <div className="artifact-meta">reuses {artifact.reusedFrom.length} prior artifact(s)</div>
              ) : null}
            </div>
            <code>{artifact.walrusBlobId}</code>
          </div>
        ))}
      </div>
    </div>
  )
}
