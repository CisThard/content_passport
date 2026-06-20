<!-- Source: https://docs.sui.io/references/sui-sdks -->

* [](</>)
  * Sui SDKs


On this page

# Sui and Community SDKs

Sui provides developer kits that act as wrappers for the Sui API. The Sui community broadens the code coverage with its own set of developer kits targeting the Sui blockchain.

## Sui SDKs​

caution

`sui-rust-sdk` does not support JSON RPC. If you need JSON RPC access, use the [legacy Rust SDK](</references/rust-sdk>). It is forward and backward compatible.

**JSON-RPC is deprecated**. Migrate to either [gRPC](</develop/accessing-data/grpc>) or [GraphQL RPC](</develop/accessing-data/graphql/graphql-rpc>) by July 2026. For a method mapping, decision criteria, and common migration gotchas, see the [JSON-RPC Migration Guide](</develop/accessing-data/json-rpc-migration>).

Refer to the [list of RPC or data providers](<https://www.notion.so/mystenlabs/RPC-providers-offering-future-Sui-data-primitives-2466d9dcb4e980a99a36e9aafd8c17e0?source=copy_link>) that have enabled gRPC on their full nodes or offer GraphQL RPC. Contact a provider directly to request access. If your RPC or data provider doesn’t yet support these data access methods, ask them to enable support or contact the Sui Foundation team on Discord, Telegram, or Slack for help.

## dApp Kit

A web frontend SDK that interacts with the Sui API. It is available as an NPM package.

## Rust SDK

SDK configuration and examples of using the Sui API with Rust, using the `sui-rust-sdk` crate.

## Legacy Rust SDK

Supports JSON RPC access. It is forward and backward compatible.

## TypeScript SDK

TypeScript SDK for integrating Sui in your TS apps.

## zkSend SDK

zkSend SDK to enable you to incorporate Stashed functionality.

## Community SDKs​

info

While the community projects are expertly developed, their maintenance and community support vary. You might want to research a project's history and support level before committing to using its utilities.

## dApp Kit (Vue)

Sui dApp Kit for the Vue framework.

## Dart SDK

A cross-platform Sui SDK for mobile, web, and desktop.

## Go SDK

SDK for developing for Sui using Golang.

## Kotlin SDK

Ksui is a collection of Kotlin Multiplatform JSON-RPC wrapper and crypto utilities for interacting with a Sui full node.

## Python SDK

pysui is a Python client for developing on the Sui blockchain.

## Swift SDK

SuiKit is a Swift SDK natively designed for developing on the Sui blockchain.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-sdks.mdx>)

[NextSDK Comparison](</references/sdk-comparison>)

  * Sui SDKs
  * Community SDKs
