# 🌐 Content Passport

Content Passport is an ultra-premium, verifiable decentralized border control and persistent memory ecosystem for creators and autonomous AI agents. Built on the **Sui blockchain** and **Walrus sharded blob storage**, it establishes on-chain identity, audits digital media authenticity, splits co-creation royalties, and secures raw evidence blobs using threshold cryptography.

---

## ⚡ Core Pillars & Capabilities

The ecosystem is divided into four distinct cryptographic chambers:

### 1. 🎫 2.7 Gate Chamber (On-chain Identity)
*   **Sovereign Namespaces:** Claim unique subdomains via SuiNS (Sui Name Service) directly written into Move identity objects.
*   **Sponsored Session Keys:** Generate local, ephemeral Ed25519 SessionKeys with 10-minute TTLs, enabling gasless, pop-up-free sponsored transaction block (PTB) pipelines.

### 2. 🦁 Aurelius Forensic Lab (AASE Checkpoint)
*   **Error Level Analysis (ELA):** Detect local pixel manipulation by re-compressing images at 90% quality using `sharp` modules and measuring error metrics.
*   **EXIF Metadata Audit:** Read hardware profiles and sensor pattern timestamps via `exifr` parsers to check for modification consistency.
*   **AI Sniffer (Gemini 3.5 Flash):** Pipeline parsed forensic clues as strict context to Gemini cognitive visual models to audit synthetic lights, Light Refractions, and neural net artifact patterns.

### 3. 🔐 Sharded Secret Vault (SEAL Cryptography)
*   **Shamir Secret Sharing:** AES-256 symmetric keys encrypting raw drafts are sharded into 5 shares $(k=3, n=5)$ over GF(256).
*   **Decentralized Custody:** Shards are stored across 5 global node guardians. Any 3 shards aggregate to reconstruct the decryption key in-memory on the client-side.
*   **Walrus Aggregator Blobs:** Sealed file packages are uploaded as secure, decentralized blobs locked under global digest registries.

### 4. 🚂 Escrow Stamp Junction (Odyssey Ledger)
*   **Sui Move Smart Contract:** Declares creative weights on-chain using `co_creation_policy.move` registers.
*   **Atomic Royalty Splits:** Routes royalties directly into participants' wallets in a single transaction block when downstream remixed works are stamped, ensuring zero custodial risk.

---

## 🏗️ Technical Architecture & Protocol Workflow

```mermaid
graph TD
    A[Original Masterpiece] --> B[AASE Auditing Lab]
    B --> C[ForensicAgent - JPEG ELA]
    B --> D[MetadataAgent - EXIF]
    B --> E[AI Sniffer - Gemini Vision]
    C & D & E -->|Verification Clues| F[MemWal Memory Namespace]
    F -->|Consensus Verdict| G[Genesis Passport Sui Object]
    A -->|AES-256-GCM + Shamir| H[Sealed Sharded Key Shards]
    H -->|Upload Blobs| I[Walrus Aggregator / Publisher]
    G & I --> J[Royalty Escrow Stamp Route]
    J -->|Co-creation Policy Weights| K[Move Atomic Split Escrow]
    K -->|Proportional Royalty Split| L[Sui Wallets]
```

### 1. AASE Forensic Scoring Formula
Authenticity grades are computed dynamically by weighting individual forensic agents against standard deviation anomalies:

$$w_{\text{final}} = (0.35 \times C_{\text{forensic}}) + (0.30 \times C_{\text{metadata}}) + (0.25 \times C_{\text{ai}}) + (0.10 \times C_{\text{memory}})$$

If the standard deviation of noise distribution across segments exceeds threshold tolerances $(\sigma > 20)$, a strict synthetic penalty is applied:

$$Score_{\text{final}} = w_{\text{final}} - (\sigma - 20) \times 1.5$$

### 2. Shamir Key Reconstruction Protocol
A symmetric encryption key $S$ is hidden in a random polynomial $f(x)$ of degree $k-1$:

$$f(x) = S + a_1x + a_2x^2 + \dots + a_{k-1}x^{k-1} \pmod{p}$$

Any subset of $k$ nodes can aggregate their key shares $(x_i, y_i)$ to reconstruct the secret key $S$ via Lagrange Interpolation:

$$S = f(0) = \sum_{i=1}^{k} y_i \prod_{j \neq i} \frac{-x_j}{x_i - x_j} \pmod{p}$$

---

## 📁 Repository Directory Structure

```bash
├── contracts/               # Sui Move Smart Contracts
│   ├── Move.toml            # Package configuration
│   └── sources/
│       ├── genesis_passport.move    # Issues Content Passports with AAA-C grades
│       ├── seal_policy.move         # Shamir key-sharing access controls
│       └── co_creation_policy.move  # Royalty escrow split and visa stamp registry
│
├── src/                     # Core TypeScript SDK (Backend & CLI Engine)
│   ├── aase.ts              # AASE grade formulas & scoring nodes
│   ├── agents.ts            # Forensic, EXIF, and AI detection agent scripts
│   ├── evidence.ts          # Shamir threshold cryptography & AES envelope seal
│   ├── memory.ts            # MemWal namespace storage client wrappers
│   ├── sui.ts               # Move contract transaction package builders
│   ├── walrus.ts            # Walrus aggregator/publisher HTTP wrappers
│   └── workflow.ts          # Multi-agent Memory Graph compiler
│
├── web/                     # React + Vite Premium Frontend Portal
│   ├── src/App.tsx          # Main HUD shell, navigation routes & backdrop nebulae
│   ├── src/styles.css       # Core design tokens, aurora glows & 3D card matrices
│   ├── src/samples.ts       # Test specimens for DSLR raw & SD generated data
│   ├── src/engine.ts        # Progress reporting simulator engine for ELA scans
│   └── src/pages/           # Chamber UI Modules
│       ├── Landing.tsx      # Unified cockpit dashboard & Basecamp metrics
│       ├── Register.tsx     # Session key log console & holographic passport
│       ├── Verify.tsx       # Forensic scanner laser & AASE verdict report
│       ├── Vault.tsx        # File drag-and-drop dropzone & key shards orbit
│       ├── Remix.tsx        # Escrow weights sliders & active stamp ledger
│       └── Chat.tsx         # AI K-9 Sniffer assistant chatbot terminal
│
└── scripts/
    └── memwal.ts            # CLI utility for command-line MemWal operations
```

---

## 🛠️ Installation & Execution Guide

### Prerequisites
*   Node.js (v18 or higher)
*   Sui CLI (for on-chain package deployment)

### Install Dependencies
Set up the backend SDK and the Web portal dependencies:
```bash
npm install
cd web && npm install && cd ..
```

### Build Verification & Compilation
Confirm the TypeScript SDK and the Web portal compile without any linter or type errors:
```bash
# Compile and build typescript packages
npm run build
```

### Run Multi-Agent CLI Demo
To run a local terminal simulation of forensics verification, Sui Move passport minting, sharded key sealing, and atomic escrow split settlement:
```bash
npm run demo
```

### Launch the Premium Web Portal
To boot up the cockpit dashboard with glow backdrops, scan lasers, sharding orbits, and K-9 chatbot:
```bash
cd web
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

---

## 🔌 Environment Parameters

Configure a `.env` file in the project root directory or supply these in your shell environment:

```env
# Sui Smart Contracts
CONTENT_RIGHT_PACKAGE_ID=0x...          # Deployed package object ID
SUI_PRIVATE_KEY=suiprivkey1...          # Funding wallet key for sponsored gas

# Walrus & MemWal Relayers
WALRUS_PUBLISHER=https://publisher.walrus-testnet.walrus.space
WALRUS_AGGREGATOR=https://aggregator.walrus-testnet.walrus.space
MEMWAL_SERVER_URL=https://relayer.memory.walrus.xyz
MEMWAL_ACCOUNT_ID=0x...
MEMWAL_PRIVATE_KEY=...
MEMWAL_NAMESPACE=content-passport-space

# AI Verification
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...   # Gemini Flash cognitive API key
```

*Note: The local SDK is equipped with high-fidelity in-memory mock adapters that automatically boot up if external RPC credentials or Gemini keys are missing, allowing offline pilot tests.*
