import type { AgentId, MemWalClue } from '../engine'

interface Props {
  clues: MemWalClue[]
  reputation: Record<AgentId, { clueCount: number; totalImpact: number; criticalCount: number }>
}

export function MemWalInspector({ clues, reputation }: Props) {
  return (
    <div className="card">
      <h2>MemWal Inspector</h2>
      <p className="sub">developer tool · shared blackboard · live clue + reputation feed</p>

      <p className="section-title">Agent reputation</p>
      <div className="rep">
        {Object.entries(reputation).map(([agent, r]) => (
          <span className="pill" key={agent}>
            {agent.replace('-agent', '')} · {r.clueCount} clues · Σ{r.totalImpact}
            {r.criticalCount > 0 ? ` · ${r.criticalCount}🔴` : ''}
          </span>
        ))}
        {clues.length === 0 && <span className="pill">no clues recorded yet</span>}
      </div>

      <p className="section-title" style={{ marginTop: 14 }}>Blackboard clues</p>
      <div>
        {clues.map((c) => (
          <div className="clue" key={c.id}>
            <span className={`dot ${c.severity}`} />
            <div>
              <div className="msg">{c.message}</div>
              <div className="meta">{c.agentId} · {new Date(c.createdAt).toLocaleTimeString()}</div>
            </div>
            <span className={`impact ${c.scoreImpact < 0 ? 'neg' : 'pos'}`}>
              {c.scoreImpact > 0 ? '+' : ''}{c.scoreImpact}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
