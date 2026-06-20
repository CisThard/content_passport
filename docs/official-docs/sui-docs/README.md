# Sui Documentation (Local Mirror)

> Source: https://docs.sui.io/ | Fetched: 2026-06-15
> Total: 682 pages | 6.7MB

## Directory Structure

```
sui-docs/
├── getting-started/              # Onboarding & setup
│   ├── onboarding/               # Install, address creation, client config
│   ├── examples/                 # Example apps (NFT, Staking, zkLogin, etc.)
│   ├── tooling/                  # Developer tools
│   ├── dev-cheat-sheet/          # Developer cheat sheet
│   ├── sui-for-ethereum/         # Ethereum developer guide
│   └── sui-for-solana/           # Solana developer guide
│
├── develop/                      # Core development guides
│   ├── sui-architecture/         # Architecture (consensus, epochs, object model)
│   ├── objects/                  # Object model
│   │   ├── display/              # Display objects
│   │   ├── object-ownership/     # Ownership types (shared, wrapped, immutable...)
│   │   ├── transfers/            # Transfer policies & rules
│   │   ├── dynamic-fields/       # Dynamic fields
│   │   └── derived-objects/      # Derived objects
│   ├── write-move/               # Writing Move packages
│   ├── publish-upgrade-packages/ # Package publish/upgrade
│   ├── manage-packages/          # Package management
│   ├── transactions/             # Transactions
│   │   ├── ptbs/                 # Programmable Transaction Blocks
│   │   └── transaction-auth/     # Auth (multisig, intent signing, etc.)
│   ├── transaction-payment/      # Gas & fees
│   ├── accessing-data/           # Data access
│   │   ├── graphql/              # GraphQL API
│   │   ├── grpc/                 # gRPC API
│   │   ├── custom-indexer/       # Custom indexers
│   │   └── archival-store/       # Archival store
│   ├── cryptography/             # Crypto (signing, hashing, passkeys)
│   └── testing-debugging/        # Testing & debugging
│
├── onchain-finance/              # Onchain finance
│   ├── fungible-tokens/          # FT (Coin, Currency, Vesting)
│   ├── tokenized-assets/         # Tokenized assets (NFT)
│   ├── closed-loop-token/        # Closed loop tokens
│   ├── kiosk/                    # Kiosk
│   ├── pas/                      # Permissioned Asset Standard
│   ├── deepbookv3/               # DeepBook V3
│   ├── deepbookv3-sdk/           # DeepBook V3 SDK
│   ├── deepbook-margin/          # DeepBook margin
│   ├── deepbook-margin-sdk/      # DeepBook margin SDK
│   ├── deepbook-predict/         # DeepBook predict
│   ├── examples-patterns/        # Example patterns
│   ├── asset-custody/            # Asset custody (wallets)
│   ├── payment-kit/              # Payment kit
│   └── payments/                 # Payments
│
├── sui-stack/                    # Sui ecosystem tools
│   ├── zklogin-integration/      # zkLogin (social login)
│   ├── nautilus/                 # Nautilus (oracle framework)
│   ├── seal/                     # Seal (encrypted access control)
│   ├── walrus/                   # Walrus (distributed storage)
│   ├── suins/                    # SuiNS (name service)
│   ├── messaging/                # Messaging protocol
│   ├── enoki/                    # Enoki
│   ├── suiplay0x1/               # SuiPlay0X1 (gaming)
│   ├── sagat/                    # Sagat
│   └── on-chain-primitives/      # Onchain primitives (Time, Randomness)
│
├── references/                   # References
│   ├── cli/                      # Sui CLI commands
│   ├── sui-api/                  # Sui RPC & GraphQL API
│   │   └── sui-graphql/          # GraphQL schema reference
│   │       └── beta/reference/types/  # Type reference (objects, enums, inputs...)
│   ├── framework/                # Move framework
│   │   ├── sui_sui/              # sui package (Coin, Transfer, Display...)
│   │   ├── sui_std/              # std package (option, vector, bcs...)
│   │   ├── sui_sui_system/       # sui_system package (Validator, Staking)
│   │   └── sui_bridge/           # sui_bridge package
│   ├── ide/                      # IDE setup
│   ├── package-managers/         # Package managers
│   ├── sui-glossary/             # Glossary
│   ├── sui-move/                 # Move language reference
│   └── release-notes/            # Release notes
│
└── operators/                    # Node operation
    ├── full-node/                # Full node setup
    ├── validator/                # Validator nodes
    └── data-management/          # Data management
```

## Quick Reference

### Frequently Accessed

| Topic | Path |
|-------|------|
| Hello World | `getting-started/onboarding/hello-world.md` |
| Move syntax | `develop/write-move/sui-move-concepts.md` |
| Object model | `develop/objects/index.md` |
| Building PTBs | `develop/transactions/ptbs/building-ptb.md` |
| Gas & fees | `develop/transaction-payment/gas-in-sui.md` |
| GraphQL API | `develop/accessing-data/graphql/query-with-graphql.md` |
| CLI reference | `references/cli/index.md` |
| Transfer policies | `develop/objects/transfers/transfer-policies.md` |
| Coin / Currency | `onchain-finance/fungible-tokens/coin.md` |
| NFT (Display) | `develop/objects/display/display-overview.md` |
| DeepBook | `onchain-finance/deepbookv3/deepbook.md` |
| zkLogin | `sui-stack/zklogin-integration/zklogin.md` |
| Error handling | `develop/testing-debugging/common-errors.md` |

### Pages by Section

| Section | Pages |
|---------|-------|
| getting-started | 27 |
| develop | 88 |
| onchain-finance | 95 |
| sui-stack | 49 |
| references | 413 |
| operators | 28 |
| root / misc | 3 |
| **Total** | **682** |
