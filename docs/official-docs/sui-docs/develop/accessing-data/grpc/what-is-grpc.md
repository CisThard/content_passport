<!-- Source: https://docs.sui.io/develop/accessing-data/grpc/what-is-grpc -->

* [](</>)
  * [Accessing Data](</develop/accessing-data/>)
  * [gRPC](</develop/accessing-data/grpc/>)
  * What is gRPC?


On this page

# What is gRPC?

The [Sui Full Node gRPC API](</references/fullnode-protocol>) provides a fast, type-safe, and efficient interface for interacting with the Sui blockchain. Designed for power users, indexers, explorers, and decentralized apps, this API enables access to Sui data with high performance and low latency.

info

**JSON-RPC is deprecated**. Migrate to either [gRPC](</develop/accessing-data/grpc>) or [GraphQL RPC](</develop/accessing-data/graphql/graphql-rpc>) by July 2026. For a method mapping, decision criteria, and common migration gotchas, see the [JSON-RPC Migration Guide](</develop/accessing-data/json-rpc-migration>).

Refer to the [list of RPC or data providers](<https://www.notion.so/mystenlabs/RPC-providers-offering-future-Sui-data-primitives-2466d9dcb4e980a99a36e9aafd8c17e0?source=copy_link>) that have enabled gRPC on their full nodes or offer GraphQL RPC. Contact a provider directly to request access. If your RPC or data provider doesn’t yet support these data access methods, ask them to enable support or contact the Sui Foundation team on Discord, Telegram, or Slack for help.

gRPC offers a high-performance, efficient communication protocol that uses [Protocol Buffers](<https://protobuf.dev/overview/>) for fast, compact data serialization. Its strongly typed interfaces reduce runtime errors and simplify client and server development across multiple languages.

The [gRPC API](</references/fullnode-protocol>) replaces JSON-RPC on full nodes. JSON-RPC is **deprecated** and the gRPC API is generally available. Apart from the message and request format changes between the two, the gRPC API comes with a couple of key functional differences:

  * Use streaming or subscription API endpoints to consume real-time streaming data in your application without polling for those records. This support replaces the deprecated WebSocket support in JSON-RPC.

  * There is no implicit fallback from a full node gRPC endpoint to the [Archival Store for historical data](</develop/accessing-data/archival-store>). If your gRPC client needs high-retention data, query an Archival Service endpoint directly. GraphQL can route supported historical lookups to Archival when the GraphQL operator configures it.


## Release status​

gRPC polling and streaming APIs are generally available. JSON-RPC is deprecated, and applications should migrate to gRPC or GraphQL RPC by July 2026, when JSON-RPC is planned for deactivation. For decision criteria, a JSON-RPC method mapping, and common migration gotchas, see the [JSON-RPC Migration Guide](</develop/accessing-data/json-rpc-migration>).

warning

The gRPC and GraphQL RPC APIs have replaced JSON-RPC. View the video below to learn more about the migration timeline and which API to use.

## When to use​

With built-in support for code generation, you can scaffold clients in TypeScript, Go, Rust, and more. This makes gRPC a strong fit for scalable backend systems, indexers, exchanges, and typed systems-language clients.

In addition to request-response calls, gRPC supports server-side streaming, enabling real-time data delivery without constant polling. Use gRPC when you need subscriptions, generated protobuf clients, low protocol overhead, or low-latency point lookups. For frontends, developer tools, scripts, dynamic-language clients, or flexible filtered historical queries, consider [GraphQL RPC](</develop/accessing-data/graphql/graphql-rpc>) first. GraphQL currently supports filtered pagination over historical transactions and events, while gRPC is the interface that currently supports streaming subscriptions.

## How gRPC fits into the application stack​

The following gRPC services are available on Sui. Protocol buffers define the gRPC interface. You can find the relevant `.proto` files at [`sui-apis` on GitHub](<https://github.com/MystenLabs/sui-apis/tree/main/proto>), which apart from the gRPC messages (request and response payloads), include the following services:

Service| `.proto` file| Purpose  
---|---|---  
`TransactionExecutionService`| `sui/rpc/v2/transaction_execution_service.proto`| Submit and execute signed transactions on the Sui network. Wallets and apps use this service to send user actions to the network.  
`LedgerService`| `sui/rpc/v2/ledger_service.proto`| Look up specific checkpoints, transactions, objects, and more from the current state and recent history of the Sui network. History refers to the recent past, limited to what a full node retains.  
`StateService`| `sui/rpc/v2/state_service.proto`| Query up-to-date onchain data like balances, coin metadata, dynamic fields, or owned objects. It also supports dry-run simulations for transactions.  
`SubscriptionService`| `sui/rpc/v2/subscription_service.proto`| Stream live updates for checkpoints. Ideal for building reactive systems such as indexers, bots, and dashboards. See Subscriptions for streaming data.  
`MovePackageService`| `sui/rpc/v2/move_package_service.proto`| Access metadata and the content of Move packages deployed on the Sui network. Useful for tooling, analysis, and smart contract introspection.  
`SignatureVerificationService`| `sui/rpc/v2/signature_verification_service.proto`| Validate signatures outside transaction execution. Helps pre-verify payloads that might include [zkLogin](</sui-stack/zklogin-integration>) or other signatures, simulate authentication, or build custom signing workflows.  
`NameService`| `sui/rpc/v2/name_service.proto`| Resolve human-readable SuiNS names to their underlying name records, and perform reverse lookups from Sui addresses back to linked names.  
  
Use these definitions to generate client libraries in various programming languages.

info

If you were using the `v2beta2` `.proto` files previously, the latest definitions are now under the `v2` version. Also, the `LiveDataService` has been renamed to `StateService`, and the `SimulateTransaction` API has been moved to the `TransactionExecutionService`.

## Subscriptions for streaming data​

The `SubscriptionService` provides real-time streaming updates for onchain activity through gRPC server-side streaming APIs. For example, the `SubscribeCheckpoint` RPC lets you subscribe to the global stream of executed checkpoints. When a subscription is initialized, the stream begins at the latest checkpoint known to the server. Checkpoints are guaranteed to arrive in order and without gaps. This allows clients to track exactly which checkpoint they last processed.

If the stream is interrupted due to client disconnect or network error, you can resume from the last known checkpoint using other APIs to backfill any missed data before resubscribing.

Streaming APIs are useful for building indexers, dashboards, or bots that need to react to real-time Sui activity with minimal latency.

## Handling pruned data​

If a full node does not return a specific object, transaction, or checkpoint, the data might have been pruned based on the node's retention configuration. Full node gRPC does not automatically fall back to Archival. To access high-retention data, configure your application to query the [Archival Store and Service](</develop/accessing-data/archival-store>) directly.

You can reuse the same gRPC `LedgerService` methods for this lookup, but you must point the client at an Archival Service endpoint such as `archive.mainnet.sui.io:443` or your provider's archival URL instead of the full node's URL.

## Best practices​

  1. Always use field masks when applicable to reduce response size and latency, especially for large resources.

  2. Use `TLS (port 443)` for production traffic to ensure encrypted transport and prevent downgrade attacks.

  3. Use streaming subscriptions for real-time use cases instead of polling repeatedly.

  4. Generate client code from the official `.proto` definitions in [`sui-apis`](<https://github.com/MystenLabs/sui-apis/tree/main/proto>) to ensure compatibility and type safety.

  5. Paginate carefully. Always check `next_page_token` and do not assume all data is returned at once.

  6. Retry transient failures with [exponential backoff](<https://en.wikipedia.org/wiki/Exponential_backoff>), especially for streaming APIs or busy public nodes.

  7. Validate all input data, including encodings and message formats, to prevent hard-to-debug API rejections.


## Frequently asked questions​

#### Can I use field masks in batch requests?​

Only the top-level `read_mask` field is respected in batch requests like `BatchGetObjects`. Any [field masks](</develop/accessing-data/grpc/using-grpc#field-masks>) within individual `GetObjectRequest` items are ignored.

#### Why does the API return fewer results than the requested `page_size`?​

Even if you request a specific `page_size`, the server might return fewer items. This could be due to full node specific limits, filtered results, or reaching the end of available data.

#### Why do some fields say `optional` if they're required?​

In `proto3`, marking a field as `optional` gives the API the ability to detect [field presence](</develop/accessing-data/grpc/using-grpc#field-presence>), that is, whether a field value is explicitly set or defaulted. This doesn't mean the field is optional in practice. You still need to follow the API contract to ensure the request is valid.

#### Are all services and related data guaranteed to be available on all full nodes?​

Full nodes might vary in which services and retention they support. Some services might not be supported yet or some APIs might return `NOT_FOUND` depending on the node's configuration and data availability.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/accessing-data/grpc/what-is-grpc.mdx>)

[PreviousgRPC](</develop/accessing-data/grpc/>)[NextQuerying Data with gRPC](</develop/accessing-data/grpc/using-grpc>)

  * Release status
  * When to use
  * How gRPC fits into the application stack
  * Subscriptions for streaming data
  * Handling pruned data
  * Best practices
  * Frequently asked questions
