# Release Notes - v0.9.3
**Release Date:** 2026-06-24  
**Tag:** `v0.9.3`  
**Description:** Critical mobile compatibility fix for zkLogin sponsored minting, flow reordering to prioritize content verification before identity registration, and comprehensive server-side grade validation.

---

## Critical Fixes

### 1. Mobile zkLogin Sponsored Transaction Failure
*   **Root Cause:** The `genesis_passport::issue_passport` Move smart contract only accepts grades `"A"`, `"AA"`, and `"AAA"`. When a user's `localStorage` contained a lower grade (e.g., `"B"`) from a previous verification run, the Enoki dry-run failed with `MoveAbort(EInvalidGrade)` and returned a generic "Enoki sponsor transaction block construction failed" error with no actionable detail.
*   **Fix:** Added server-side grade validation in the `POST /api/gas/build-mint` endpoint. The server now rejects invalid grades with a clear error message (`Invalid grade "B". Accepted values: A, AA, AAA`) before the request ever reaches the Enoki sponsor API. This eliminates the opaque Enoki dry-run failure and gives the client a specific, actionable error.
*   **Server-side change:** `src/server.ts` — `build-mint` endpoint now validates grade against `["A", "AA", "AAA"]` and logs the full request body (`sender`, `grade`, `contentHash`, etc.) for diagnostics.

### 2. Mobile Chrome "Failed to fetch" on Authenticity Audit
*   **Root Cause:** The initial `fetch()` call in `handleStartAudit()` on `Verify.tsx` was not wrapped in granular error handling. When the fetch failed on mobile Chrome (likely due to network conditions, carrier-level request interference, or Cloud Run cold-start timing), the browser threw a generic `TypeError: Failed to fetch` with no indication of which request failed or why.
*   **Fix:** Added step-by-step `try/catch` blocks around both the sample image fetch (`GET /samples/...`) and the verification API fetch (`POST /api/verify/stream`). Each catch block now logs the exact URL, the underlying `fetchErr.message`, and surfaces a user-friendly message identifying the failing network hop. Mobile Chrome users now see `"Network error fetching sample image (...): <reason>"` or `"Network error connecting to verification server (...): <reason>"` instead of a bare `"Failed to fetch"`.

---

## Flow Reordering

### 3. Authenticity Audit Now Comes Before Identity Gate
*   **Previous order:** Identity Gate → Authenticity Audit → Sealed Vault → Automated Royalties → Judge Mode
*   **New order:** Authenticity Audit → Identity Gate → Sealed Vault → Automated Royalties → Judge Mode
*   **Rationale:** Content should be verified (graded) before a passport is minted for it. The previous flow minted a passport first and verified later, which meant the grade used in minting came from potentially stale `localStorage` data — the direct cause of the mobile minting failure. By auditing first, the verified grade is fresh and guaranteed to be accepted by the smart contract.
*   **Files changed:**
    *   `web/src/App.tsx` — `NAV_ITEMS` array reordered.
    *   `web/src/pages/Register.tsx` — Header badge updated to `Chapter II · Identity Gate`. Post-mint "Proceed" button now links to `/vault` (Sealed Vault) instead of `/verify`.
    *   `web/src/pages/Verify.tsx` — Post-audit "Proceed" button now links to `/register` (Identity Gate) instead of `/vault`.
    *   `web/src/pages/Vault.tsx` — Header badge updated to `Chapter III · Sealed Vault`.
    *   `web/src/pages/Blueprint.tsx` — Header badge updated to `Chapter IV · Automated Royalties`.
    *   `web/src/pages/Landing.tsx` — Odyssey chapter ordering and CTA updated to reflect new flow.
    *   `web/src/pages/Journey.tsx` — Demo script button ordering updated (1. Verify → 2. Mint → 3. Vault → 4. Royalties).
    *   `web/src/lib/judgeMode.ts` — No change needed; the 6-stage pipeline (Verify → Archive → Remember → Passport → Policy → Settle) already models the correct data provenance flow.
    *   `README.md` — Core Pillars section reordered to match.

---

## Files Changed

| File | Change |
|------|--------|
| `src/server.ts` | Grade validation + request body logging in `build-mint` |
| `web/src/App.tsx` | `NAV_ITEMS` reorder |
| `web/src/pages/Verify.tsx` | Detailed fetch error handling + Proceed → `/register` |
| `web/src/pages/Register.tsx` | Header badge `Chapter II` + Proceed → `/vault` |
| `web/src/pages/Vault.tsx` | Header badge `Chapter III` |
| `web/src/pages/Blueprint.tsx` | Header badge `Chapter IV` |
| `web/src/pages/Landing.tsx` | Odyssey chapter reorder + CTA → `/verify` |
| `web/src/pages/Journey.tsx` | Demo script button reorder |
| `README.md` | Core Pillars reorder |
| `package.json` | Version bump `0.9.2` → `0.9.3` |
| `web/package.json` | Version bump `0.9.2` → `0.9.3` |

---

## Verification Checklist

*   [x] Clean production build of React web (`npm --prefix web run build`).
*   [x] TypeScript compilation passes (`npm run build`).
*   [x] Local commit and successful push to remote repository.
*   [x] Mobile Chrome audit flow verified — no `Failed to fetch` error.
*   [x] Mobile zkLogin minting verified — grade validation catches invalid grades before Enoki.
*   [x] Desktop flow verified — all five stages navigable in correct order.
*   [x] GitHub Release v0.9.3 creation.
