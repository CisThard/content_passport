# Release Notes - v0.9.1
**Release Date:** 2026-06-23  
**Tag:** `v0.9.1`  
**Description:** Refinements to the Odyssey storytelling interface on the landing page, clean-up of navigation menu hierarchies, and version bump to 0.9.1.

---

## 🚀 Key Upgrades in v0.9.1

### 1. Value-Oriented Odyssey Storytelling
*   **Plain Language Refinements:** Simplified the technical explanations in `The Odyssey Chapters` section of the landing page. Removed complex cryptographic jargon (e.g., cryptographic session keys, envelope encryption, specific mathematical algorithms) and replaced them with user-focused benefits:
    *   **Prologue:** Emphasizes keyless verification using Google OAuth zkLogin and creator sovereignty.
    *   **Chapter I:** Focuses on protecting masterpieces against forgery and certifying authenticity using AI.
    *   **Chapter II:** Explains decentralized protection against unauthorized leaks before public release.
    *   **Chapter III:** Explains fair and transparent royalty distribution to collaborators down to the smallest fraction when remixed.

### 2. Navigation Clean-up
*   **AI Assistant Removal:** Removed the unused `AI Assistant` item from the navigation bar.
*   **Odyssey Anchor Scroll:** Restored the `Odyssey` menu link, connecting it to a smooth-scroll anchor (`#odyssey-section`) on the homepage. Added custom route listening to correctly detect the URL hash and scroll the page automatically.

---

## 🛠️ Verification Checklist
*   [x] Clean production build of React web (`npm --prefix web run build`).
*   [x] Local commit and successful push to remote repository.
*   [x] Smooth scroll verify from internal pages to the `#odyssey-section`.
