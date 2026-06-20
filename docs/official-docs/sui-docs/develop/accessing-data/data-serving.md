<!-- Source: https://docs.sui.io/develop/accessing-data/data-serving -->

* [](</>)
  * [Accessing Data](</develop/accessing-data/>)
  * Data Access Interfaces


On this page

# Data Access Interfaces

Using an agent? Try this prompt
[code]
    Review this app's data access needs and recommend GraphQL, gRPC, or both. Consider frontend/backend use, historical queries, subscriptions, latency, and retention.
[/code]

Copy prompt

Open in agent▾

Access Sui network data, like [transactions](</develop/transactions/txn-overview>), [checkpoints](</develop/sui-architecture/checkpoint-verification>), [objects](</develop/sui-architecture/object-model>), and [events](</develop/accessing-data/using-events>), through different interfaces to build applications, analyze network behavior, or audit network activity.

Primary interfaces to access Sui data include:

  * [GraphQL RPC](</develop/accessing-data/graphql/graphql-rpc>): A generally available RPC service for flexible reads, transaction submission, and transaction simulation. GraphQL is backed by the General-purpose Indexer, Consistent Store, full nodes, and, when configured, the Archival Service.

  * [gRPC API](</develop/accessing-data/grpc>): A generally available, type-safe full node API that replaces JSON-RPC on full nodes. Use it when you need generated clients, low-latency point lookups, transaction submission, simulation, or streaming subscriptions.

  * [Archival Store and Service](</develop/accessing-data/archival-store>): Provides long-term storage and access to historical network data that might no longer be available on full nodes because of pruning. GraphQL can route supported historical lookups to Archival when the GraphQL operator configures it. Full node gRPC does not implicitly fall back to Archival; gRPC clients must query an Archival Service endpoint directly.

  * [Custom indexers](</develop/accessing-data/custom-indexer/custom-indexers>): [Build your own pipelines](</develop/accessing-data/custom-indexer/build>) for application-specific data with the custom indexing framework. PostgreSQL is the default storage path, but custom indexers can write to any storage layer by implementing the framework storage traits.


## Latest data access interfaces​

![Future state data serving stack](/assets/images/access-interfaces_accessing-data_v1-ac73a55a4128a0ab18137b0e097cbb95.svg)

info

View the video below for a comparison of the latest and legacy Sui data stacks.

## Supported SDKs​

You can use the following SDKs to interact with data on Sui.

  * [TypeScript SDK](<https://sdk.mystenlabs.com/sui/migrations/sui-2.0/json-rpc-migration>)

  * [Rust SDK - gRPC](<https://github.com/MystenLabs/sui-rust-sdk>)

  * [Rust SDK - GraphQL](<https://docs.rs/sui-graphql/latest/sui_graphql/>)

  * Community-maintained [Python SDK](<https://github.com/FrankC01/pysui>)


## When to use GraphQL or gRPC​

Choose the RPC interface based on the client you are building and the data access pattern you need. GraphQL offers the broadest query surface and can combine data from multiple sources in one request. gRPC offers strongly typed generated clients, lower protocol overhead, and streaming subscriptions.

Dimension| Prefer GraphQL RPC| Prefer gRPC API  
---|---|---  
Client type| Frontends, dashboards, developer tools, scripts, and apps in dynamic languages.| Backends, indexers, exchanges, low-latency services, and apps in typed systems languages.  
Query patterns| Flexible, nested, filtered, or historical queries that combine transactions, objects, events, balances, and checkpoints in one request.| Point lookups, transaction execution, simulation, or workflows where the client is already modeled around protobuf messages.  
Historical access| GraphQL can use configured Archival Service backends for supported historical lookups and supports filtered pagination over historical transactions and events.| Full node gRPC is limited by the node's retention. For higher retention, query the Archival Service gRPC endpoint directly.  
Streaming needs| Use for query flexibility. Subscription support is not yet available on GraphQL.| Use gRPC when you need live checkpoint subscriptions or other streaming workflows.  
Consistency| GraphQL scopes queries to checkpoints and can return read-after-write data from execution- or simulation-attached query scopes when fields do not require indexed history.| Use gRPC for low-latency full node reads, then wait or retry when subsequent reads depend on data being indexed elsewhere.  
  
A good default is GraphQL for frontends, tools, and flexible query workloads, and gRPC for backend systems, indexers, streaming, and performance-sensitive typed clients. You can use both interfaces in one application when different components have different requirements.

Refer to the following articles outlining general differences between gRPC and GraphQL. Validate the accuracy and authenticity of the differences using your own experiments.

  * <https://stackoverflow.blog/2022/11/28/when-to-use-grpc-vs-graphql/>
  * <https://blog.postman.com/grpc-vs-graphql/>


## Legacy data access interfaces​

info

**JSON-RPC is deprecated**. Migrate to either [gRPC](</develop/accessing-data/grpc>) or [GraphQL RPC](</develop/accessing-data/graphql/graphql-rpc>) by July 2026. For a method mapping, decision criteria, and common migration gotchas, see the [JSON-RPC Migration Guide](</develop/accessing-data/json-rpc-migration>).

Refer to the [list of RPC or data providers](<https://www.notion.so/mystenlabs/RPC-providers-offering-future-Sui-data-primitives-2466d9dcb4e980a99a36e9aafd8c17e0?source=copy_link>) that have enabled gRPC on their full nodes or offer GraphQL RPC. Contact a provider directly to request access. If your RPC or data provider doesn’t yet support these data access methods, ask them to enable support or contact the Sui Foundation team on Discord, Telegram, or Slack for help.

Directly connect to [JSON-RPC](</references/sui-api>) hosted on Sui [full nodes](</operators/full-node/sui-full-node>) that are operated by [RPC providers](<https://sui.io/developers#dev-tools>) (filter by `RPC`) or [data indexer operators](<https://github.com/sui-foundation/awesome-sui?tab=readme-ov-file#indexers--data-services>). The Mainnet, Testnet, or Devnet load balancer URLs abstract the Sui Foundation-managed full nodes. Do not use those for production.

You can get real-time or historical data using JSON-RPC while it remains available. The retention period for historical data depends on the [pruning strategy](</operators/data-management/managing-data#sui-full-node-pruning-policies>) that node operators implement. Do not assume a full node implicitly falls back to the Archival Store; use GraphQL with Archival configured by the operator, or query an Archival Service endpoint directly.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/accessing-data/data-serving.mdx>)

[PreviousAccessing Data](</develop/accessing-data/>)[NextJSON-RPC Migration Guide](</develop/accessing-data/json-rpc-migration>)

  * Latest data access interfaces
  * Supported SDKs
  * When to use GraphQL or gRPC
  * Legacy data access interfaces
