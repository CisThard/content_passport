# Content Right

Content Right turns creator permission into programmable consent: once authenticity, escrow, and royalty terms are satisfied, a second creator can recreate without manual back-and-forth.

**Live demo:** https://contentright-three.vercel.app

## Frontend (`web/`)

A Vite + React SPA wired to the **real** engine (no mocks) — `calculateAASE`,
`buildRecreateReadiness`, `calculateRoyaltyPayouts`, and the MemWal client are
imported straight from `src/`. Three-stage walkthrough: authenticity audit &
block → Genesis Passport + Sovereign Vault → programmable consent & royalty
settlement, plus a MemWal Inspector developer view.

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
- Recreate-readiness gate that checks authenticity, funded escrow, and 100% royalty allocation.
- Royalty payout calculator that preserves integer dust by assigning the remainder to the final participant.
- Shared-context memory archiving for ready co-creation agreements.
- Sui Move `co_creation_policy` contract for policy creation, atomic create-and-fund escrow, and royalty distribution.
- TypeScript transaction builders for creating, atomically funding, funding existing, and distributing a co-creation policy.

## Local commands

```bash
npm install
npm run build
npm test
npm run demo
```

## Environment

```bash
CONTENT_RIGHT_PACKAGE_ID=0x...
```

`CONTENT_RIGHT_PACKAGE_ID` is used by the Sui transaction helpers after the Move package is published.

## Core flow

1. Original content is scored by the AASE engine.
2. Recreate terms define participants and royalty weights.
3. Escrow funding activates the automated consent condition.
4. Ready agreements are archived into the `shared-context` namespace.
5. The Sui policy distributes revenue according to predefined weights.

## Demo scenarios

`npm run demo` prints both sides of the hackathon story:

- Authentic content reaches `AAA`, activates programmable consent, previews payouts, and archives shared context.
- Synthetic or manipulated content is blocked before any co-creation context is archived.
