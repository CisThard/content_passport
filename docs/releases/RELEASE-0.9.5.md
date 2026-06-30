# Release Notes - v0.9.5
**Release Date:** 2026-06-30  
**Tag:** `v0.9.5`  
**Description:** Important stability update fixing the automatic recovery and cryptographic pipeline execution of custom verified specimen files in the Threshold Security Vault (SEAL) stage when React state is lost due to zkLogin Google OIDC redirects.

---

## Changes in This Release (v0.9.4 → v0.9.5)

### 🛡️ Threshold Security Vault (SEAL) Stability Fix
- **OIDC Redirection Recovery Support**: When users log in with Google (zkLogin) on the *Identity Gate* stage, a full-browser redirect to Google OIDC takes place. This reset the in-memory React state (`sharedFile` inside `App.tsx`).
- **Walrus-Based Custom Specimen Recovery**: Added a fallback in `Vault.tsx` that inspects the `localStorage` payload `cr:lastVerification`. If the verified specimen is a custom file (not in the predefined `SAMPLE_MEDIAS` list), the vault will identify its stored `blobId` and corresponding URL on the **Walrus decentralized storage network**, automatically fetch it, and initialize the AES-256-GCM encryption and Shamir (3/5) key slicing workflow.
- **Improved User Log Feedback**: Added console panel warning logs (`[WARNING] ...`) to guide the user in case both local state and Walrus recovery fail, suggesting a manual file upload instead of remaining silently idle.

---

## Verification & Build Compliance
- Verified build and compilation consistency (`npm run build` succeeds).
- Package versions bumped to `0.9.5` in:
  - Root `package.json`
  - React frontend `web/package.json`
  - Documentation indices
