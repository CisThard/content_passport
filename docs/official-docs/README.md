# Official Documentation (Offline Reference)

> Fetched: 2026-06-15 | Total: 1,000+ pages

This folder contains curated, offline copies of official documentation for all core infrastructure technologies used in Content Passport.

## Contents

| Folder | Source | Pages | Description |
|--------|--------|-------|-------------|
| `sui-docs/` | [docs.sui.io](https://docs.sui.io) | 682 | Sui blockchain: Move language, Object model, PTB, GraphQL API, DeepBook, zkLogin, validators |
| `walrus-docs/` | [docs.wal.app](https://docs.wal.app) | 147 | Walrus: distributed blob storage, Sites (decentralized web), operator guides |
| `walrus-memory-docs/` | [docs.wal.app/walrus-memory](https://docs.wal.app/walrus-memory) | 62 | Walrus Memory: AI agent memory layer — SDK, Relayer, MCP, Smart Contract, Indexer |
| `seal-docs/` | [seal-docs.wal.app](https://seal-docs.wal.app) | 13 | Seal: decentralized secrets management, threshold encryption, Key Server operations |
| `android-docs/` | [developer.android.com](https://developer.android.com) | 98 | Android: Jetpack Compose, CameraX, networking, security/crypto, Google Sign-In, location services |

## How to Use

Each folder has its own `README.md` with:
- Full directory tree
- Quick reference table (frequently accessed pages)
- Page count by section

To find a specific topic, check the relevant README or use `grep`:
```bash
grep -rl "transfer policy" docs/official-docs/sui-docs/
grep -rl "CameraX" docs/official-docs/android-docs/
```
