<!-- Source: https://docs.wal.app/ -->

[GitHub](<https://github.com/MystenLabs/walrus>)[Discord](<https://discord.gg/walrusprotocol>)Ask Walrus AI[Get Started â](</docs/getting-started>)

A verifiable data platform for high-stakes systems that require provable, programmable, always-available data with no performance tradeoffs.

Modern financial systems and AI agents depend on fast, reliable, and verifiable data. Traditional storage assumes integrity and pushes trust outside the data layer. Walrus embeds availability, integrity, and programmability directly into storage itself.

  * Highly available
  * Cryptographically verifiable
  * Programmable through smart contracts


### [Data StorageCLI tools, environment setup, and core storage operations for developers.Get started ](</docs/getting-started>)### [Walrus SitesDeploy decentralized static websites with true decentralization.Learn more ](</docs/sites/introduction/components>)### [Service ProvidersOperate storage nodes, aggregators, and publishers on the network.View guide ](</docs/operator-guide>)### [ExamplesReference applications and integration patterns using Walrus.Explore ](</docs/examples/checkpoint-data>)

* * *

01

## Core capabilities

### Storage & retrieval

Walrus supports writing and reading large blobs of unstructured data. Data is content-addressed. Any change to the data produces a new identifier. This makes integrity tamper-evident and enables independent verification of stored content. Walrus also enables anyone to prove that a blob has been stored and remains available for retrieval.

### Data availability and fault tolerance

Walrus uses erasure coding and high redundancy (~4.5x) to maintain availability even under partial node failure.

  * Reads remain available with up to 2/3 responsive nodes.
  * Writes tolerate up to 1/3 unavailable nodes.


This model is more robust than partial-replication systems and more cost-efficient than full replication.

### Cost efficiency

Through erasure coding, Walrus maintains storage overhead at approximately 5x the size of stored data while delivering strong durability and Byzantine fault tolerance. This enables production-grade availability without full replication costs.

### Integration with Sui

Walrus leverages Sui for coordination, attesting availability, and payments. Storage space is represented as a resource on Sui, which can be owned, split, merged, and transferred. Stored blobs are also represented by objects on Sui, which means that smart contracts can check whether a blob is available and for how long, extend its lifetime, or optionally delete it.

### Epochs & WAL

Walrus is operated by a committee of storage nodes that evolve between epochs. A native token, WAL (and its subdivision FROST, where 1 WAL is equal to 1 billion FROST), is used to delegate stake to storage nodes, and those with high stake become part of the epoch committee. The WAL token is also used for payments for storage. At the end of each epoch, rewards for selecting storage nodes, storing, and serving blobs are distributed to storage nodes and those that stake with them. All these processes are mediated by smart contracts on the Sui platform.

### Flexible access

You can interact with Walrus through a command-line interface (CLI), software development kits (SDKs), and Web2 HTTP technologies. Walrus is designed to work well with traditional caches and content distribution networks (CDNs), while ensuring all operations can also be run using local tools to maximize decentralization.

Interfaces: CLI Â· SDK Â· HTTP API

* * *

02

## When to use Walrus

#### Independently verifiable

You need to prove where data came from, confirm it has not been altered, or anchor workflows to specific dataset versions.

  * AI model artifacts & agent memory
  * Execution logs for exchanges
  * Onchain governance data
  * Audit trails for financial systems


#### Highly available under failure

Your system cannot tolerate downtime, partial node failure, or data loss.

  * Market infrastructure
  * Autonomous agents coordinating state
  * Financial protocols with real risk


#### Programmable at the data layer

You need smart contracts to manage, verify, or automate around stored data.

  * Versioned datasets in AI workflows
  * Contract-controlled storage lifetimes
  * Onchain verification of offchain artifacts


#### Cost-efficient at scale

You require strong durability and Byzantine fault tolerance without full-replication overhead.

* * *

03

## When not to use Walrus

Walrus is not optimized for:

  * Small, ephemeral application state better suited for direct onchain storage
  * Ultra-low-latency in-memory databases
  * Pure archival storage without verification requirements


Walrus is designed for high-stakes systems where availability, integrity, and programmability are structural requirements, not optional features.

Â© 2026 Walrus Foundation

[GitHub](<https://github.com/MystenLabs/walrus>)[Discord](<https://discord.gg/walrusprotocol>)[X](<https://x.com/walrusprotocol>)[Privacy](<https://docs.wal.app/docs/legal/privacy>)[Terms](<https://docs.wal.app/docs/legal/walrus_general_tos>)
