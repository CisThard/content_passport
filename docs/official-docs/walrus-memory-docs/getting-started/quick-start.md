# Quick Start

The fastest way to get Walrus Memory running is through the TypeScript SDK.

- **Prerequisites**
  - [Node.js](https://nodejs.org/) v18+ or [Bun](https://bun.sh/) v1+

## Install the SDK

```bash
# pnpm
pnpm add @mysten-incubation/memwal

# npm
npm install @mysten-incubation/memwal

# yarn
yarn add @mysten-incubation/memwal

# bun
bun add @mysten-incubation/memwal
```

**Optional packages**

For AI middleware with [Vercel AI SDK](https://sdk.vercel.ai/) (`@mysten-incubation/memwal/ai`):

```bash
pnpm add ai
```

For the [manual client flow](choose-your-path.md) (`@mysten-incubation/memwal/manual`):

```bash
pnpm add @mysten/sui @mysten/seal @mysten/walrus
```

## Generate your account ID and delegate key

Create a Walrus Memory account ID and delegate private key for your SDK client using one of the hosted endpoints below.

> **Note:** The following endpoints are provided as a public good by Walrus Foundation.

| App | URL |
|-----|-----|
| **Walrus Memory Playground** | [memory.walrus.xyz](https://memory.walrus.xyz) |

For the contract-based setup flow, see [Delegate Key Management](../contract/delegate-key-management.md) and [Walrus Memory smart contract](../contract/overview.md).

## Choose a relayer

Use a hosted relayer, or deploy your own [self-hosted relayer](../relayer/self-hosting.md) with access to a wallet funded with WAL and SUI:

> **Note:** Following endpoints are provided as public good by Walrus Foundation.

| Network | Relayer URL |
|---------|-------------|
| **Production** (Mainnet) | `https://relayer.memory.walrus.xyz` |
| **Staging** (Testnet) | `https://relayer-staging.memory.walrus.xyz` |

## Configure the SDK

Set up the SDK with your delegate key, account ID, and relayer URL:

```typescript
import { MemWal } from "@mysten-incubation/memwal";

const memwal = MemWal.create({
  key: "<your-ed25519-private-key>",
  accountId: "<your-memwal-account-id>",
  serverUrl: "https://relayer.memory.walrus.xyz",
  namespace: "my-app",
});
```

## Verify your connection

Run a health check to confirm everything is working:

```typescript
await memwal.health();
```

## Store and recall your first memory

```typescript
const job = await memwal.remember("User prefers dark mode and works in TypeScript.");
await memwal.waitForRememberJob(job.job_id);

const result = await memwal.recall({ query: "What do we know about this user?" });
console.log(result.results);
```

That's it - you're up and running.
