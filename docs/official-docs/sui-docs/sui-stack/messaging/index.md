<!-- Source: https://docs.sui.io/sui-stack/messaging/ -->

* [](</>)
  * Messaging SDK


# Messaging SDK

The Messaging SDK provides end-to-end encrypted, permissioned group messaging on Sui. Messages are encrypted client-side with AES-256-GCM, keys are managed through Seal threshold encryption, and ciphertext is archived to Walrus for decentralized persistence. Onchain Move contracts manage group membership, granular permissions, and versioned encryption keys.

The SDK includes a canonical Move package, a TypeScript client, and reference implementations for a Rust relayer and a TypeScript discovery indexer.

## [Getting StartedIn this section

  * Installation
  * Developer Setup
  * Example Patterns

→](</sui-stack/messaging/installation>)## [ArchitectureIn this section

  * Encryption
  * Security
  * Relayer

→](</sui-stack/messaging/encryption>)## [GuidesIn this section

  * Attachments
  * Archive and Recovery
  * Group Discovery
  * Extending

→](</sui-stack/messaging/attachments>)## [ReferenceIn this section

  * SDK API reference
  * Testing
  * Community Contributed

→](</sui-stack/messaging/api-reference>)## [ExamplesIn this section

  * Messaging Chat

→](</sui-stack/messaging/chat-app>)## [GitHub Repo↗](<https://github.com/MystenLabs/sui-stack-messaging>)

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/sui-stack/messaging/index.mdx>)

[PreviousEncryption with Seal](</sui-stack/seal/sui-stack-seal>)[NextInstallation](</sui-stack/messaging/installation>)
