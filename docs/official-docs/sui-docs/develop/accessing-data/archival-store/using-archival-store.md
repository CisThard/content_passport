<!-- Source: https://docs.sui.io/develop/accessing-data/archival-store/using-archival-store -->

* [](</>)
  * [Accessing Data](</develop/accessing-data/>)
  * [Archival Service](</develop/accessing-data/archival-store/>)
  * Querying Historical Data with Archival Service


On this page

# Querying Historical Data with Archival Service

The Archival Service provides access to historical Sui network data through the same [`LedgerService`](</references/fullnode-protocol>) gRPC API available on full nodes. Use it as an explicit gRPC endpoint when a full node has pruned the data you need, or as a dedicated source for historical queries. Full node gRPC endpoints do not automatically fall back to Archival Service endpoints.

For core concepts, see the [Archival Store and Service concepts page](</develop/accessing-data/archival-store>).

info

**JSON-RPC is deprecated**. Migrate to either [gRPC](</develop/accessing-data/grpc>) or [GraphQL RPC](</develop/accessing-data/graphql/graphql-rpc>) by July 2026. For a method mapping, decision criteria, and common migration gotchas, see the [JSON-RPC Migration Guide](</develop/accessing-data/json-rpc-migration>).

Refer to the [list of RPC or data providers](<https://www.notion.so/mystenlabs/RPC-providers-offering-future-Sui-data-primitives-2466d9dcb4e980a99a36e9aafd8c17e0?source=copy_link>) that have enabled gRPC on their full nodes or offer GraphQL RPC. Contact a provider directly to request access. If your RPC or data provider doesn’t yet support these data access methods, ask them to enable support or contact the Sui Foundation team on Discord, Telegram, or Slack for help.

## Public endpoints​

The Sui Foundation operates an Archival Service as a public good:

  * Testnet: `archive.testnet.sui.io`
  * Mainnet: `archive.mainnet.sui.io`


These endpoints have strict rate limits.

## Querying the service​

The Archival Service exposes the same [`LedgerService`](</references/fullnode-protocol>) gRPC API as a Sui full node. Query it using any gRPC client by pointing at an Archival Service endpoint instead of a full node. GraphQL deployments can route supported historical lookups to Archival when the operator configures it; gRPC clients must choose the Archival Service URL explicitly.

See [Using gRPC](</develop/accessing-data/grpc/using-grpc>) for detailed examples with `grpcurl`, Buf CLI, TypeScript, Go, and Python.

For example, to fetch a historical transaction using `grpcurl`:
[code] 
    grpcurl -d '{  
      "digest": "BASE58_TX_DIGEST"  
    }' archive.testnet.sui.io:443 sui.rpc.v2.LedgerService/GetTransaction  
    
[/code]

## Using the Archival Service as a fallback​

Apps can query the Archival Service when a full node returns retention-related errors. This application-level fallback does not implicitly happen inside the full node.

If the full node returns `NOT_FOUND` for data that should exist, retry against an Archival Service endpoint such as `archive.mainnet.sui.io:443`.

## Running your own instance​

For production use or to avoid rate limits, you can run the full archival stack yourself. See the [Archival Stack Setup](</operators/data-management/archival-stack-setup>) operator guide for instructions on setting up Bigtable, the indexer, and the gRPC service.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/accessing-data/archival-store/using-archival-store.mdx>)

[PreviousWhat is Archival Store and Service?](</develop/accessing-data/archival-store/what-is-archival-store>)[NextEmitting Events](</develop/accessing-data/using-events>)

  * Public endpoints
  * Querying the service
  * Using the Archival Service as a fallback
  * Running your own instance
