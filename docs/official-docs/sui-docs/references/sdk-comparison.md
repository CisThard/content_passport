<!-- Source: https://docs.sui.io/references/sdk-comparison -->

* [](</>)
  * [Sui SDKs](</references/sui-sdks>)
  * SDK Comparison


On this page

# SDK Comparison

This page provides a high-level comparison of the SDKs available for building on Sui. Use it to find the kit that best matches your language, platform, and use case. For links to each SDK and a fuller list of community projects, see [Sui and Community SDKs](</references/sui-sdks>).

Contribute to this page

This comparison currently lists the SDKs maintained by Mysten Labs. If you maintain a Sui SDK and want to add it, contributions are welcome. See Add your SDK for how to submit a row.

## Sui SDKs​

The following SDKs are developed and maintained by Mysten Labs.

SDK| Language / platform| Maintainer| Primary use case| Transport| Status  
---|---|---|---|---|---  
[TypeScript SDK](<https://sdk.mystenlabs.com/typescript>)| TypeScript / JavaScript| Mysten Labs| General-purpose client for building apps, scripts, and services| gRPC (recommended), GraphQL, JSON-RPC (deprecated, do not use)| Stable  
[dApp Kit](<https://sdk.mystenlabs.com/dapp-kit>)| TypeScript / React| Mysten Labs| Web frontends: wallet connection, hooks, and UI components| Builds on TypeScript SDK| Stable  
[Rust SDK](<https://github.com/MystenLabs/sui-rust-sdk>)| Rust| Mysten Labs| Backend services and high-performance clients| gRPC| Active development  
[zkSend SDK](<https://sdk.mystenlabs.com/zksend>)| TypeScript| Mysten Labs| Creating and claiming zkSend links and Stashed functionality| Builds on TypeScript SDK| Stable  
[DeepBookV3 SDK](</onchain-finance/deepbookv3-sdk/>)| TypeScript| Mysten Labs| Interacting with the DeepBook onchain order book| Builds on TypeScript SDK| Stable  
  
## Choosing an SDK​

  * **Building a web app or wallet integration?** Start with the [dApp Kit](<https://sdk.mystenlabs.com/dapp-kit>), which builds on the TypeScript SDK and adds React hooks and components for wallet connection.
  * **Writing scripts, services, or a Node.js backend in TypeScript?** Use the [TypeScript SDK](<https://sdk.mystenlabs.com/typescript>) directly. Prefer its gRPC client (`SuiGrpcClient`) for new projects; the JSON-RPC client is deprecated.
  * **Building a performance-sensitive backend in Rust?** Use the [Rust SDK](<https://github.com/MystenLabs/sui-rust-sdk>) (gRPC).
  * **Working with DeepBook or zkSend?** Use the purpose-built [DeepBookV3 SDK](</onchain-finance/deepbookv3-sdk/>) or [zkSend SDK](<https://sdk.mystenlabs.com/zksend>), which layer on top of the TypeScript SDK.
  * **Need another language (Python, Go, Kotlin, Swift, Dart, Vue)?** See the community SDKs on the [Sui and Community SDKs](</references/sui-sdks#community-sdks>) page.


## Add your SDK​

This comparison is intended to grow with the ecosystem. If you maintain a Sui SDK, you can add it to a future "Community SDKs" comparison table by opening a pull request against the [Sui repository](<https://github.com/MystenLabs/sui>).

When you submit a row, please include the following so the comparison stays consistent and useful:

Column| What to provide  
---|---  
SDK| Name of the SDK, linked to its documentation or repository.  
Language / platform| The primary language(s) and platform(s) the SDK targets.  
Maintainer| The individual or organization that maintains the SDK.  
Primary use case| A short phrase describing what the SDK is best suited for.  
Transport| The API the SDK uses to communicate with Sui (for example, GraphQL, JSON-RPC, gRPC), or the SDK it builds on.  
Status| The maturity of the SDK (for example, Stable, Active development, Maintenance, Experimental).  
  
For guidance on contributing to Sui documentation, see [Contribute to Sui](</references/contribute/contribution-process>) and the [Style Guide](</references/contribute/style-guide>).

info

Maintenance and community support vary. Research a project's history and support level before committing to using its utilities.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sdk-comparison.mdx>)

[PreviousSui and Community SDKs](</references/sui-sdks>)[NextLegacy Rust SDK](</references/rust-sdk>)

  * Sui SDKs
  * Choosing an SDK
  * Add your SDK
