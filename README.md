# Content Right

Content Right is a Walrus Track project: a persistent, verifiable memory graph for
creative AI agents. It lets specialized agents prove content authenticity, seal
proof-of-effort artifacts, remember decisions across sessions, and coordinate
royalty settlement through portable Walrus/MemWal state.

**Live demo:** https://contentright-three.vercel.app

## Why this fits the Walrus Track

- **Long-term memory:** every agent clue, workflow step, and recreate decision is
  written into a shared MemWal-style namespace and can be restored later.
- **Persistent data and file access:** media, sealed evidence, audit reports,
  readiness records, settlement state, and graph snapshots are modeled as Walrus
  artifacts with blob IDs and digests.
- **Multi-agent coordination:** forensic, metadata, AI detection, Seal, rights,
  settlement, and archivist agents pass state through the same memory graph.
- **Artifact-driven workflow:** downstream agents reuse prior Walrus artifacts
  instead of recomputing or trusting local app state.
- **Developer tooling:** the app includes a MemWal Inspector plus a Walrus Memory
  Graph view for debugging memory keys, agent steps, and artifact lineage.

References:

- Walrus HTTP API: publisher `PUT /v1/blobs`, aggregator `GET /v1/blobs/<blobId>`
- Walrus TypeScript SDK: `writeBlob/readBlob` plus resumable step persistence
- Walrus Memory: portable, owner-controlled memory with delegate access
- Seal: privacy layer for encrypted Walrus/MemWal data

## Frontend (`web/`)

A Vite + React SPA wired to the **real** engine (no mocks) — `calculateAASE`,
`buildRecreateReadiness`, `calculateRoyaltyPayouts`, and the MemWal client are
imported straight from `src/`. The walkthrough now shows authenticity audit,
Genesis Passport, Sovereign Vault, MemWal Inspector, Walrus Memory Graph,
programmable consent, and royalty settlement.

```bash
cd web && npm install && npm run dev
```

## Real authenticity agents (`src/agents.ts`)

`analyzeImage(buffer)` computes AASE signals from an actual image:
`forensicAgent` (ELA via sharp recompression), `metadataAgent` (EXIF/timestamp
consistency via exifr), and `aiDetectionAgent` (Gemini when
`GOOGLE_GENERATIVE_AI_API_KEY` is set, else a transparent clue heuristic).

## What is implemented

- AASE scoring engine for Forensic, Metadata, AI Detection, and MemWal memory signals.
- Explainable AASE contributions, missing-agent warnings, and disagreement penalties.
- Objective evidence panels grounded in C2PA provenance, ELA/JPEG recompression,
  EXIF consistency, entropy/repetition checks, and context-fusion scoring.
- AES-256-GCM sealed proof-of-effort packages with Shamir GF(256) threshold key
  sharing and Ed25519 session-key metadata.
- Walrus HTTP adapter aligned to publisher `/v1/blobs` and aggregator
  `/v1/blobs/<blobId>` APIs, plus an in-memory test adapter.
- MemWal-compatible memory adapter with `remember`, `recall`, and namespace
  listing, plus an HTTP relayer adapter for delegate-key deployments.
- Content Memory Graph SDK for multi-agent workflow state, Walrus artifact
  lineage, and restore-from-Walrus snapshots.
- Recreate-readiness gate that checks authenticity, funded escrow, and 100% royalty allocation.
- Royalty payout calculator that preserves integer dust by assigning the remainder to the final participant.
- Shared-context memory archiving for ready co-creation agreements.
- Sui Move contracts for Genesis Passport, Seal approval policy, visa stamps,
  atomic create-and-fund escrow, and royalty distribution.
- TypeScript transaction builders for passport issuance, Seal approval, visa
  stamping, escrow funding, and distribution.

## Local commands

```bash
npm install
npm run build
npm test
npm run demo
```

## Walrus Memory CLI

Use the local CLI wrapper to create or verify the MemWal setup without leaking
secrets into the repository:

```bash
npm run memwal:login
npm run memwal:health
npm run memwal:remember -- "Content Right setup verification succeeded."
npm run memwal:recall -- "setup verification succeeded"
npm run memwal:restore
```

If browser login is unavailable, use the on-chain account flow:

```bash
npm run memwal:delegate
npm run memwal:create-account
npm run memwal:add-delegate
```

`memwal:delegate` prints a delegate private key once. Store it in
`~/.memwal/credentials.json` or a private `.env`, never in git.

## Environment

```bash
CONTENT_RIGHT_PACKAGE_ID=0x...
WALRUS_PUBLISHER=https://publisher.walrus-testnet.walrus.space
WALRUS_AGGREGATOR=https://aggregator.walrus-testnet.walrus.space
MEMWAL_ACCOUNT_ID=0x...
MEMWAL_PRIVATE_KEY=...
MEMWAL_SERVER_URL=https://relayer.memory.walrus.xyz
MEMWAL_NAMESPACE=content-right-hackathon
MEMWAL_PACKAGE_ID=0x...
MEMWAL_REGISTRY_ID=0x...
SUI_PRIVATE_KEY=suiprivkey1...
```

`CONTENT_RIGHT_PACKAGE_ID` is used by the Sui transaction helpers after the Move
package is published. Walrus/MemWal variables are optional for local tests, which
use deterministic in-memory adapters, but they turn the graph into persistent
testnet storage for the hackathon demo.

## Core flow

1. Original content is scored by the AASE engine.
2. Agents write durable clues into the MemWal board namespace.
3. PoE, reports, readiness, and settlement states are stored as Walrus artifacts.
4. The Content Memory Graph records step-by-step agent coordination and artifact reuse.
5. Recreate terms define participants and royalty weights.
6. Escrow funding activates programmable consent.
7. Ready agreements are archived into the `shared-context` namespace.
8. The Sui policy distributes revenue according to predefined weights.

## Demo scenarios

`npm run demo` prints both sides of the hackathon story:

- Authentic content reaches `AAA`, activates programmable consent, previews payouts, and archives shared context.
- Synthetic or manipulated content is blocked before any co-creation context is archived.
