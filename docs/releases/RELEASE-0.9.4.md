# Release Notes - v0.9.4
**Release Date:** 2026-06-24  
**Tag:** `v0.9.4`  
**Description:** Comprehensive release capturing the full Content Passport ecosystem — zkLogin identity, multi-agent authenticity forensics, threshold cryptography vaults, automated royalty escrow, and the Judge Mode audit dashboard. Includes all mobile compatibility fixes, flow reordering, grade validation, and Docker build hardening since v0.9.0.

---

## Ecosystem Overview

Content Passport is a verifiable decentralized border control and persistent memory ecosystem for creators and autonomous AI agents. Built on the **Sui blockchain** and **Walrus sharded blob storage**, it establishes on-chain identity, audits digital media authenticity, splits co-creation royalties, and secures raw evidence blobs using threshold cryptography.

**Live at:** `https://content-passport.xyz/`  
**Network:** Sui Testnet  
**Package ID:** [`0xac28432a...0704061da`](https://testnet.suivision.xyz/package/0xac28432a557d52d7079930a82a5c1732a3709da3c6cb2991ce0332b0704061da)

---

## User Flow (5 Stages)

```
Authenticity Audit → Identity Gate → Sealed Vault → Automated Royalties → Judge Mode
```

| # | Stage | Route | What Happens |
|---|-------|-------|-------------|
| 1 | **Authenticity Audit** | `/verify` | Multi-agent forensic verification: ELA, EXIF, AI Sniffer, MemWal memory. Produces grade (AAA–F). |
| 2 | **Identity Gate** | `/register` | Google OIDC zkLogin → ephemeral keypair → ZK proof → gasless Genesis Passport NFT mint via Enoki. |
| 3 | **Sealed Vault** | `/vault` | AES-256-GCM encryption → Shamir Secret Sharing (3/5) → Walrus decentralized blob storage. |
| 4 | **Automated Royalties** | `/blueprint` | Deploy `co_creation_policy.move` → fund escrow → atomic royalty splits on remix. |
| 5 | **Judge Mode** | `/journey` | 6-node journey graph, inspector artifacts, forensic methods, agent registry. |

---

## Smart Contracts (Sui Move)

### `genesis_passport.move` — On-Chain Passport Issuance
- **Struct:** `GenesisPassport` — `content_hash`, `grade`, `media_blob_id`, `evidence_blob_id`, `owner`
- **Entry:** `issue_passport()` — validates grade (`A`/`AA`/`AAA`), creates NFT, emits `PassportIssued`
- **Errors:** `EInvalidGrade` (0), `EEmptyHash` (1)

### `seal_policy.move` — Threshold Cryptography Access Control
- **Struct:** `SealPolicy` (shared) — `evidence_blob_id`, `authorized_creators`, `threshold`, `key_nodes`
- **Entry:** `create_policy()` → `seal_approve()` with time-limited session keys
- **Errors:** `EInvalidThreshold` (0), `ENoKeyNodes` (1), `ENotAuthorized` (2)

### `co_creation_policy.move` — Royalty Escrow & Visa Stamp Registry
- **Struct:** `CoCreationPolicy` (shared) — `passport_id`, `participants`, `weights`, `escrow_balance`
- **Entry:** `create_and_fund_policy()` → `stamp_visa()` → `distribute_royalties()`
- **Errors:** `EInvalidWeightsSum` (0), `ELengthMismatch` (1), `EInsufficientFunds` (2), `ENoParticipants` (3), `EInvalidStampShare` (4)

---

## Server Architecture (Express + TypeScript)

### API Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/health` | Health check + MemWal status |
| POST | `/api/verify` | Synchronous AASE forensic verification |
| POST | `/api/verify/stream` | SSE streaming verification with heartbeat |
| POST | `/api/vault/upload` | Walrus blob upload |
| GET | `/api/vault/download/:blobId` | Walrus blob retrieval |
| GET | `/api/auth/config` | Client config (Google Client ID, package ID, epoch) |
| POST | `/api/auth/zklogin` | zkLogin address derivation + ZK proof via Enoki |
| POST | `/api/gas/build-mint` | Build sponsored PTB via Enoki (with grade validation) |
| POST | `/api/gas/sponsor` | Execute sponsored transaction via Enoki |

### Core Modules

| Module | Purpose |
|--------|---------|
| `aase.ts` | AASE scoring: 4 agents (forensic 35%, metadata 30%, AI 25%, memory 10%), σ penalty, grade assignment |
| `agents.ts` | Forensic ELA (sharp), EXIF (exifr), AI Sniffer (Gemini 2.5 Flash / Vertex AI) |
| `evidence.ts` | Shamir Secret Sharing over GF(256), AES-256-GCM, Lagrange interpolation |
| `forensics.ts` | DCT perceptual hashing (pHash-64), Hamming distance, frequency artifact scoring |
| `memory.ts` | Multi-backend: InMemory / Firestore / HTTP / Timed fallback |
| `memwal.ts` | Walrus MemWal semantic memory: remember/recall/restore |
| `passport.ts` | Passport issuance: AASE validation, PoE sealing, Walrus storage, Ed25519 signing |
| `sui.ts` | PTB builders for all Move contract interactions |
| `zklogin-salt.ts` | Per-user HKDF-SHA256 salt derivation, privacy-safe auth receipts |
| `server.ts` | Express server: all endpoints, SSE streaming, Enoki integration |

---

## Frontend (React + Vite)

### Pages

| Page | Route | Description |
|------|-------|-------------|
| `Landing.tsx` | `/` | Hero + galaxy vortex, 4 portal cards, Odyssey narrative, infrastructure trust matrix |
| `Verify.tsx` | `/verify` | Image upload/drop, SSE streaming, ELA split slider, EXIF display, AI sniffer, grade assessment |
| `Register.tsx` | `/register` | Google OIDC → SuiNS → gasless passport mint with holographic card widget |
| `Vault.tsx` | `/vault` | Shamir 3/5 encryption, Walrus upload/download, share visualization |
| `Blueprint.tsx` | `/blueprint` | Wallet connection, policy creation, fund deposit, royalty distribution |
| `Journey.tsx` | `/journey` | 6-node journey graph, inspector artifacts, forensic methods |
| `Chat.tsx` | `/chat` | AI Sniffer Agent chatbot |

### Key Libraries

| File | Purpose |
|------|---------|
| `lib/zklogin.ts` | Ephemeral session keypair management, Google OAuth URL builder |
| `lib/authSession.ts` | zkLogin session persistence (sessionStorage), cross-tab sync |
| `lib/suiNetwork.ts` | Network constants, Suiscan URLs, on-chain state persistence |
| `lib/judgeMode.ts` | Journey node builder, inspector artifact aggregator |

---

## Infrastructure & Deployment

### Docker
- Multi-stage build: `node:20-alpine` builder + runner
- `npm ci --ignore-scripts && npm rebuild` (ETXTBSY fix)
- Port 8080, `npx tsx src/server.ts`

### Cloud Run
- Service: `content-passport-service` (us-central1)
- Secrets: GCP Secret Manager (9 secrets)
- CPU: 1000m, Memory: 512Mi, Concurrency: 80

### CI/CD (GitHub Actions)
- Verify job: typecheck + build + 52 unit tests
- Deploy job: OIDC WIF auth → Docker build → Artifact Registry push → Cloud Run deploy
- Docker push: 3x retry loop for transient network timeouts

### AI / ML
- Gemini 2.5 Flash with Thinking Configuration (Vertex AI keyless)
- C2PA Content Credentials verification (optional)
- Per-user zkLogin salt via HKDF-SHA256

---

## Test Suite (52 Cases)

| File | Tests | Coverage |
|------|-------|----------|
| `aase.test.ts` | 3 | Scoring, penalty, missing agents |
| `agents.test.ts` | 4 | ELA, EXIF, full pipeline, MemWal |
| `co-creation.test.ts` | 2 | Activation, memory archiving |
| `escrow.test.ts` | 2 | Weight validation, dust handling |
| `google-auth.test.ts` | 14 | Config, zkLogin, OAuth, E2E flow |
| `memory.test.ts` | 3 | Firestore, factory, client types |
| `passport-vault.test.ts` | 4 | Issuance, SEAL, signature verify |
| `recreate-readiness.test.ts` | 3 | Consent, grade block, escrow block |
| `sui.test.ts` | 3 | PTB builders, validation |
| `workflow.test.ts` | 1 | Memory graph + Walrus restore |
| `zklogin-salt.test.ts` | 6 | HKDF, isolation, receipt |

---

## Changes in This Release (v0.9.3 → v0.9.4)

### Bug Fixes
*   **Docker build ETXTBSY:** Changed `npm ci` to `npm ci --ignore-scripts && npm rebuild` in Dockerfile to resolve esbuild binary race condition during container builds.
*   **Grade validation:** Added server-side grade validation in `POST /api/gas/build-mint`. Rejects grades other than `"A"`, `"AA"`, `"AAA"` before they reach the Enoki sponsor API, preventing opaque dry-run failures.
*   **Mobile fetch error logging:** Added granular `try/catch` blocks around both the sample image fetch and the verification API fetch in `Verify.tsx`. Each failure now surfaces the exact URL and underlying error instead of a generic `"Failed to fetch"`.
*   **SSE proxy buffering:** Added `X-Accel-Buffering: no` header and 15-second heartbeat to prevent Cloud Run and mobile carrier proxies from buffering or killing SSE connections.

### Flow Reordering
*   **Authenticity Audit now comes first.** The previous flow minted a passport before verifying content, which caused grade mismatches (the smart contract only accepts `A`/`AA`/`AAA`). The new flow verifies first, then mints with the confirmed grade.
*   Updated: `NAV_ITEMS` in `App.tsx`, "Proceed" buttons in `Register.tsx` and `Verify.tsx`, header badges across all pages, Landing narrative, Journey demo script buttons.

### Documentation
*   **README.md:** Core Pillars reordered to match new flow.
*   **Release notes:** Comprehensive v0.9.3 release notes with full change details.

### Infrastructure
*   Dockerfile hardened against `ETXTBSY` race condition.
*   Server-side request body logging added to `build-mint` endpoint for production diagnostics.

---

## Verification Checklist

*   [x] Clean production build of React web (`npm --prefix web run build`).
*   [x] TypeScript compilation passes (`npm run build`).
*   [x] 52 unit tests pass (`npm test`).
*   [x] Docker build succeeds without ETXTBSY.
*   [x] Mobile Chrome audit flow verified.
*   [x] Mobile zkLogin minting verified (grade validation).
*   [x] Desktop flow verified — all 5 stages navigable in correct order.
*   [x] GitHub Release v0.9.4 creation.
