<!-- Source: https://docs.sui.io/develop/accessing-data/custom-indexer/indexer-data-integration -->

* [](</>)
  * [Accessing Data](</develop/accessing-data/>)
  * [Custom Indexing Framework](</develop/accessing-data/custom-indexer/>)
  * Integrate Data Sources


On this page

# Integrate Custom Data Sources with a Custom Indexer

Building a custom indexer on Sui lets you take full control of data ingestion, storage, and processing. You can choose from multiple checkpoint data sources such as remote store, local files, or direct RPC API access, depending on whether you're indexing Mainnet data, testing against known checkpoints, or working on a local network.

For storage, PostgreSQL is the default path through `IndexerCluster`, but it is not required. You can implement your own `Store` and `Connection` traits to integrate a different database or storage backend. After you connect it, you can wire up a manual indexer, add your custom pipelines, and handle watermark coordination to keep data in sync.

Finally, you need to deserialize Move events from raw BCS bytes into Rust structs, using `bcs` and `serde`, so that your pipelines can work with strongly-typed data. This gives you a reproducible, end-to-end setup that you can tune for performance, reliability, and custom analytics.

## Checkpoint data sources​

The `sui-indexer-alt-framework` supports multiple data sources for accessing Sui blockchain data. You configure these sources through command-line arguments. They fall into two categories: **push-based** and **polling-based**.

### Push-based data sources​

Push-based sources deliver real-time checkpoint data as it becomes available, offering lower latency than polling.

#### Recommended: gRPC streaming​

gRPC streaming from a full node should be the default choice for production indexers and backend pipelines that need low-latency checkpoint ingestion. This recommendation is specific to indexer data ingestion, not general application RPC selection. Streaming delivers real-time checkpoint data pushed from full nodes for the latest checkpoints. Because it only streams latest data, you must configure a polling-based fallback source (remote store, local path, or full node RPC) to retrieve historical checkpoints and ensure reliability:
[code] 
    $ cargo run -- --remote-store-url https://checkpoints.testnet.sui.io --streaming-url https://fullnode.testnet.sui.io:443  
    
[/code]

**Endpoint format:** `https://fullnode.NETWORK.sui.io:443` where `NETWORK` is one of the available networks:

  * `testnet`
  * `devnet`
  * `mainnet`


**When to use gRPC streaming:**

  * Production indexers that require minimal latency
  * Real-time data processing pipelines
  * Applications that need immediate checkpoint updates


info

  * Use full node gRPC as your primary source by default for production indexer ingestion.
  * Always configure a polling-based fallback source to ensure reliability and access to historical data.
  * Use `https://checkpoints.<network>.sui.io` only as a fallback, not as your default steady-state source.
  * `https://checkpoints.mainnet.sui.io` and `https://checkpoints.testnet.sui.io` retain only the most recent 30 days of checkpoints. For full retention, use `gs://mysten-mainnet-checkpoints-use4` or `gs://mysten-testnet-checkpoints-use4` with Requester Pays enabled.
  * The streaming connection automatically falls back to the polling source when streaming is unavailable or when historical checkpoints are needed.


### Polling-based data sources​

Polling-based sources periodically check for new checkpoints using the polling mechanism provided by the [indexing framework](</develop/accessing-data/custom-indexer/custom-indexers>).

#### Remote store​

Remote checkpoint stores are intended for fallback and backfill. Sui provides the following endpoints:

  * **Testnet** : `https://checkpoints.testnet.sui.io` for the most recent 30 days only
  * **Mainnet** : `https://checkpoints.mainnet.sui.io` for the most recent 30 days only


[code] 
    $ cargo run -- --remote-store-url https://checkpoints.testnet.sui.io  
    
[/code]

Do not use `https://checkpoints.<network>.sui.io` as your default steady-state source if you have access to a full node gRPC endpoint. The public HTTPS endpoints retain only the latest 30 days of checkpoints. If you need full-retention backfill, use `gs://mysten-mainnet-checkpoints-use4` through `--remote-store-gcs mysten-mainnet-checkpoints-use4` for Mainnet or `gs://mysten-testnet-checkpoints-use4` through `--remote-store-gcs mysten-testnet-checkpoints-use4` for Testnet. These buckets are Requester Pays enabled and are intended to be accessed through the indexing framework's `--remote-store-gcs` option rather than `--remote-store-url`. See [Running a Remote Store](</operators/data-management/remote-store-setup>) and Google Cloud [Use Requester Pays](<https://cloud.google.com/storage/docs/using-requester-pays>).

#### Local path​

Local checkpoint files are useful for development and testing scenarios:
[code] 
    $ cargo run -- --local-ingestion-path /path/to/checkpoints  
    
[/code]

**Common use cases:**

  * Unit and integration testing with known checkpoint data
  * Development workflows with reproducible datasets


#### Full node RPC​

Full node RPC queries use gRPC:
[code] 
    $ cargo run -- --rpc-api-url https://fullnode.testnet.sui.io:443  
    
[/code]

**Endpoint format:** `https://fullnode.NETWORK.sui.io:443` where `NETWORK` is one of the available networks:

  * `testnet`
  * `devnet`
  * `mainnet`


**When to use RPC API:**

  * Default polling source for steady-state indexing
  * Networks without official remote store (Devnet, Localnet, custom networks)
  * Development against local Sui networks


[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/accessing-data/custom-indexer/indexer-data-integration.mdx>)

[PreviousBring Your Own Store (BYOS)](</develop/accessing-data/custom-indexer/bring-your-own-store>)[NextOptimize Runtime and Performance](</develop/accessing-data/custom-indexer/indexer-runtime-perf>)

  * Checkpoint data sources
    * Push-based data sources
    * Polling-based data sources
