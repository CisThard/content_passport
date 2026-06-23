# Release Notes - v0.9.0
**Release Date:** 2026-06-23  
**Tag:** `v0.9.0`  
**Description:** Mysten Labs Enoki SaaS integration for gasless social logins, high-resolution royalty units, and production deployment stabilization on GCP.

---

## 🚀 Key Features & Upgrades

### 1. Mysten Labs Enoki SDK & API Integration
*   **zkLogin Social Onboarding:** Upgraded identity layer from local salt generation to Enoki OIDC flow. Users can sign in using their Google account keylessly, mapping dynamically to a secure, stable address derived by Enoki.
*   **SaaS Gas Sponsorship:** Deployed full integration with Enoki's sponsored transaction APIs (`/v1/transaction-blocks/sponsor` & `/v1/transaction-blocks/sponsor/{digest}`). Users can sign transactions locally in browser memory and submit them to Enoki for zero-cost execution on the Sui network.
*   **Automatic Target Verification:** Added dynamic retrieval logic on the backend via fullnode RPC retries to ensure transaction blocks and object creation changes are fully indexed before responding to the frontend.

### 2. High-Precision Co-Creation Royalty Splitting
*   **0.01 SUI Limit Resolution:** Fine-tuned local float-to-MIST arithmetic calculations (`Math.round`) to support royalty increments from 0.01 SUI up to 1.00 SUI.
*   **Atomic Escrow Splits:** Ensures that co-collaborators receive exact MIST units directly into their target addresses under atomic Sui PTB logic without rounding errors.

### 3. CI/CD & Infrastructure Security Hardening
*   **Deployment Secret Bindings:** Configured `.github/workflows/ci.yml` deployment pipeline to inject `ENOKI_PUBLIC_KEY` in environment variables and hook `ENOKI_SECRET_KEY` into GCP Secret Manager.
*   **TypeScript Compiler Stabilization:** Fixed compiler warnings and strict typing errors (specifically `executionResult` typing logic) to ensure 100% clean builds in CI environments.

---

## 🛠️ Configuration Update Requirements

The following environment variables must be appended to your deployment environments:
*   `ENOKI_PUBLIC_KEY` (Action Secrets / Frontend Build Environment)
*   `ENOKI_SECRET_KEY` (GCP Secret Manager `latest` Version)

---

## 📈 Verification Checklist
*   [x] Clean `npm run build` execution locally.
*   [x] Continuous integration build success in GitHub Actions.
*   [x] Keyless Google zkLogin address derivation test.
*   [x] Gas sponsor transaction execution on Sui Testnet.
*   [x] Multi-party royalty atomic escrow splits verify.
