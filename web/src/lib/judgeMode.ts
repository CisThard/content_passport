import { readOnchainState, shortId, suiscanTxUrl } from './suiNetwork'

export interface JourneyNode {
  id: string
  label: string
  agent: string
  status: 'ready' | 'active' | 'missing'
  detail: string
  proof?: string
  href?: string
}

export interface InspectorArtifact {
  kind: string
  name: string
  location: string
  digest?: string
  size?: number
  href?: string
  source: string
}

export function readLastVerification(): any | null {
  try {
    const raw = localStorage.getItem('cr:lastVerification')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function buildJourneyNodes(): JourneyNode[] {
  const verification = readLastVerification()
  const onchain = readOnchainState()
  const hasVerification = Boolean(verification?.objective?.sha256)
  const hasPassport = Boolean(onchain.passportTxDigest)
  const hasPolicy = Boolean(onchain.policyTxDigest)
  const hasSettlement = Boolean(onchain.settlementTxDigest)
  const walrusArtifacts = verification?.walrusArtifacts?.artifacts || []

  return [
    {
      id: 'verify',
      label: '1. Verify',
      agent: 'Forensic + Provenance Agents',
      status: hasVerification ? 'ready' : 'missing',
      detail: hasVerification
        ? `${verification.assessment?.grade || 'N/A'} grade, pHash ${verification.objective?.perceptualHash?.hash || 'N/A'}`
        : 'Run Forensics Lab to create the first durable evidence packet.',
      proof: verification?.objective?.sha256 ? shortId(verification.objective.sha256, 10, 8) : undefined,
      href: '/verify',
    },
    {
      id: 'walrus',
      label: '2. Archive',
      agent: 'Archivist Agent',
      status: walrusArtifacts.length ? 'ready' : hasVerification ? 'active' : 'missing',
      detail: walrusArtifacts.length
        ? `${walrusArtifacts.length} Walrus artifact(s) stored for media/report recovery.`
        : 'Walrus artifact links appear after a streamed verification completes.',
      proof: walrusArtifacts[0]?.blobId ? shortId(walrusArtifacts[0].blobId, 10, 8) : undefined,
      href: walrusArtifacts[0]?.url,
    },
    {
      id: 'memory',
      label: '3. Remember',
      agent: 'Memory Agent',
      status: verification?.inspector?.clues?.length ? 'ready' : hasVerification ? 'active' : 'missing',
      detail: verification?.inspector?.clues?.length
        ? `${verification.inspector.clues.length} MemWal clue(s) available for future duplicate/rights checks.`
        : 'MemWal clues are written during the verification pipeline.',
      proof: verification?.clueIds?.[0] ? shortId(verification.clueIds[0], 14, 8) : undefined,
      href: '/verify',
    },
    {
      id: 'passport',
      label: '4. Mint Passport',
      agent: 'Rights Agent',
      status: hasPassport ? 'ready' : hasVerification ? 'active' : 'missing',
      detail: hasPassport
        ? `GenesisPassport ${onchain.passportId ? shortId(onchain.passportId) : 'issued'} on Sui.`
        : 'Connect wallet and mint a real GenesisPassport from Register.',
      proof: onchain.passportTxDigest ? shortId(onchain.passportTxDigest, 12, 8) : undefined,
      href: onchain.passportTxDigest ? suiscanTxUrl(onchain.passportTxDigest) : '/register',
    },
    {
      id: 'policy',
      label: '5. Create Policy',
      agent: 'Settlement Agent',
      status: hasPolicy ? 'ready' : hasPassport ? 'active' : 'missing',
      detail: hasPolicy
        ? `CoCreationPolicy ${onchain.policyId ? shortId(onchain.policyId) : 'created'} with funded escrow.`
        : 'Create and fund the remix policy from Blueprint.',
      proof: onchain.policyTxDigest ? shortId(onchain.policyTxDigest, 12, 8) : undefined,
      href: onchain.policyTxDigest ? suiscanTxUrl(onchain.policyTxDigest) : '/blueprint',
    },
    {
      id: 'settle',
      label: '6. Settle',
      agent: 'Royalty Agent',
      status: hasSettlement ? 'ready' : hasPolicy ? 'active' : 'missing',
      detail: hasSettlement
        ? 'Royalty distribution transaction executed and linked.'
        : 'Run distribute_royalties when escrow is ready.',
      proof: onchain.settlementTxDigest ? shortId(onchain.settlementTxDigest, 12, 8) : undefined,
      href: onchain.settlementTxDigest ? suiscanTxUrl(onchain.settlementTxDigest) : '/blueprint',
    },
  ]
}

export function buildInspectorArtifacts(): InspectorArtifact[] {
  const verification = readLastVerification()
  const onchain = readOnchainState()
  const artifacts: InspectorArtifact[] = []

  for (const artifact of verification?.walrusArtifacts?.artifacts || []) {
    artifacts.push({
      kind: artifact.kind,
      name: artifact.name,
      location: artifact.blobId,
      digest: artifact.digest,
      size: artifact.size,
      href: artifact.url,
      source: artifact.source || 'walrus-http',
    })
  }

  if (verification?.objective?.sha256) {
    artifacts.push({
      kind: 'objective-signal',
      name: 'DCT pHash + frequency report',
      location: verification.objective.perceptualHash?.hash || verification.objective.sha256,
      digest: verification.objective.sha256,
      source: 'AASE local objective model',
    })
  }

  if (verification?.clueIds?.length) {
    for (const clueId of verification.clueIds) {
      artifacts.push({
        kind: 'memwal-clue',
        name: clueId.split(':')[0] || 'agent-clue',
        location: clueId,
        source: 'MemWal long-term memory',
      })
    }
  }

  if (onchain.passportTxDigest) {
    artifacts.push({
      kind: 'sui-tx',
      name: 'GenesisPassport mint',
      location: onchain.passportTxDigest,
      href: suiscanTxUrl(onchain.passportTxDigest),
      source: 'Sui transaction',
    })
  }

  if (onchain.policyTxDigest) {
    artifacts.push({
      kind: 'sui-tx',
      name: 'CoCreationPolicy funding',
      location: onchain.policyTxDigest,
      href: suiscanTxUrl(onchain.policyTxDigest),
      source: 'Sui transaction',
    })
  }

  if (onchain.settlementTxDigest) {
    artifacts.push({
      kind: 'sui-tx',
      name: 'Royalty distribution',
      location: onchain.settlementTxDigest,
      href: suiscanTxUrl(onchain.settlementTxDigest),
      source: 'Sui transaction',
    })
  }

  return artifacts
}
