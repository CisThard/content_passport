<!-- Source: https://docs.sui.io/develop/accessing-data/graphql/graphql-rpc -->

* [](</>)
  * [Accessing Data](</develop/accessing-data/>)
  * [GraphQL](</develop/accessing-data/graphql/>)
  * GraphQL for Sui RPC


On this page

# GraphQL for Sui RPC

GraphQL provides a flexible way to query the Sui network, submit transactions, and simulate transactions. This page covers the core concepts for working with GraphQL on Sui RPC, including request headers, query composition with variables and fragments, pagination strategies, query scope, and service limits.

For practical examples, see [Querying Sui RPC with GraphQL](</develop/accessing-data/graphql/query-with-graphql>). For comprehensive GraphQL fundamentals, consult the introductory documentation from [GraphQL](<https://graphql.org/learn/>) and [GitHub](<https://docs.github.com/en/graphql/guides/introduction-to-graphql>).

info

**JSON-RPC is deprecated**. Migrate to either [gRPC](</develop/accessing-data/grpc>) or [GraphQL RPC](</develop/accessing-data/graphql/graphql-rpc>) by July 2026. For a method mapping, decision criteria, and common migration gotchas, see the [JSON-RPC Migration Guide](</develop/accessing-data/json-rpc-migration>).

Refer to the [list of RPC or data providers](<https://www.notion.so/mystenlabs/RPC-providers-offering-future-Sui-data-primitives-2466d9dcb4e980a99a36e9aafd8c17e0?source=copy_link>) that have enabled gRPC on their full nodes or offer GraphQL RPC. Contact a provider directly to request access. If your RPC or data provider doesn’t yet support these data access methods, ask them to enable support or contact the Sui Foundation team on Discord, Telegram, or Slack for help.

The GraphQL RPC Service reads data from the General-purpose Indexer's Postgres-compatible database, Archival Store and Service, and a full node. GraphQL RPC is an alternative to the gRPC API. The General-purpose Indexer is a scalable implementation of the [custom indexing framework](</develop/accessing-data/custom-indexer/custom-indexers>). The framework ingests data using the remote checkpoint store and full node RPCs. It lets you configure it to load different types of Sui network data into Postgres tables in parallel, improving data ingestion performance. You can also configure pruning for different tables to balance performance and cost.

#### Release status​

GraphQL RPC Server and the General-purpose Indexer are generally available. JSON-RPC is deprecated, and applications should migrate to GraphQL RPC or gRPC by July 2026, when JSON-RPC is planned for deactivation.

info

Refer to [Access Sui Data](</develop/accessing-data/data-serving>) for an overview of options to access Sui network data.

## Components​

The key components of the GraphQL and General-purpose Indexer stack include the following:

  * **General-purpose Indexer :** Ingests and transforms Sui checkpoint data using configurable and parallel pipelines, then writes it into a Postgres-compatible database. It can be configured to use the Sui remote checkpoint store and a full node as its sources.

  * **Postgres-compatible database:** Stores indexed data for GraphQL queries. It is tested using [GCP AlloyDB](<https://cloud.google.com/products/alloydb>), but you can run any Postgres-compatible database. Test alternative databases and share feedback on performance, cost, and operational characteristics.

  * **GraphQL service:** Serves structured queries over indexed data, routes supported historical lookups to Archival when configured, and forwards transaction execution and simulation to a full node. It follows the [GraphQL specification](<https://graphql.org/>) and the supported schema is documented in the [GraphQL API reference](</references/sui-graphql>).

  * **Archival Service :** Enables point lookups for historical data from a key-value store. If unavailable, the GraphQL service falls back to the Postgres-compatible database for lookups, which might be limited by that database's retention policy. See [Archival Store and Service](</develop/accessing-data/archival-store>) for more information.

  * **Consistent Store:** Answers queries about the latest state of the network within the last hour (objects owned by addresses, objects by type, balances by address and type). Consistency is guaranteed by pinning queries to a specific (recent) checkpoint.

  * **Full node :** Enables transaction execution and simulation.


## When to use​

Use GraphQL RPC with the General-purpose Indexer as a flexible and ergonomic data API to build rich dashboards, explorers, and data-driven apps. The API is powered by an indexer created using the custom indexing framework.

Use GraphQL if your application:

  * Requires historical data with configurable retention or filtered access to data, such as all transactions sent by an address.

  * Needs to display structured results in a frontend, such as wallets and dashboards.

  * Benefits from flexible, composable queries that reduce overfetching.

  * Relies on multiple data entities, such as transactions, objects, or events, in a single request, or in a consistent fashion when spread over multiple requests as if the responses came from a snapshot at some checkpoint.


## How GraphQL RPC and General-purpose Indexer fit into the application stack​

If you are using the **deprecated** JSON-RPC in your application, you can migrate to GraphQL RPC by either self-operating the combined stack of General-purpose Indexer, Postgres-compatible database, and GraphQL RPC server, or by utilizing it as a service from an RPC provider or indexer operator.

You can run or use the GraphQL and Indexer data stack in the following configurations.

### Fully managed service​

As a developer, you can access GraphQL as a service from an indexer operator or data provider who runs and operates the full stack behind the scenes. Reach out to your data provider and ask if they already offer or plan to offer this service.

### Partial self-managed​

As a developer, you can:

  * Run the Indexer pipelines and GraphQL service, while using the Archival Service and a full node from an RPC provider or indexer operator.

  * Configure and manage a Postgres-compatible database (local Postgres, AlloyDB, and so on) as the primary data store.

  * Deploy the self-managed components on cloud infrastructure or baremetal.


### Fully self-managed​

As a developer, indexer operator, or RPC provider, you can:

  * Run the complete stack: Indexer pipelines, GraphQL service, Postgres-compatible database, Archival Service, Consistent Store and full node on cloud infrastructure or bare metal.

  * Serve GraphQL to your own applications or to other builders and third-party services.


## Working with the GraphQL service​

The GraphQL service exposes query and mutation surfaces conforming to GraphQL concepts. It allows pagination, filtering, consistent snapshot queries, transaction execution, and transaction simulation. The service also supports runtime configuration for schema, query cost limits, and logging. The GraphQL schema is defined in the [GraphQL reference](</references/sui-graphql>). You can explore supported types and fields there, use the GraphiQL IDE to test queries and mutations, and read documentation on the up-to-date schema.

The GraphQL service is deployed as a single binary implementing a stateless, horizontally scalable service. Queries are served with data from one or more of a Postgres-compatible database (filters over historical data), Archival Service (point lookups), Consistent Store (live data), or full node (execution and simulation), based on need. Access to these stores must be configured with the service on start-up, otherwise the service might fail to respond correctly to requests. More details on how to set up, configure, and run the service are available in its [README](<https://github.com/MystenLabs/sui/tree/main/crates/sui-indexer-alt-graphql>).

Requests to GraphQL are subject to various limits, to ensure resources are shared fairly between clients. Each limit is configurable, and the values configured for an instance can be queried through `Query.serviceConfig`. Requests that do not meet limits return with an error. The following limits are in effect:

  * **Request size:** Requests might not exceed a certain size in bytes. The limit is spread across a transaction payload limit, which applies to all values and variable bindings that are parameters to transaction signing, execution, and simulation fields (default: 175KB), and a query payload limit which applies to all other parts of the query (default: 5KB).

  * **Request timeout:** Time spent on each request is bounded, with different bounds for execution (default: 74s) and regular reads (default: 40s).

  * **Query input nodes and depth:** The query cannot be too complex, meaning it cannot contain too many input nodes or field names (default: 300) or be too deeply nested (default: 20).

  * **Output nodes:** The service estimates the maximum number of output nodes the query might produce, assuming every requested field is present, every paginated field returns full pages, and every multi-get finds all requested keys. This estimate must be bounded (default: 1,000,000).

  * **Page and multi-get size:** Each paginated field (default: 50) and multi-get (default: 200) is subject to a maximum size. Certain paginated fields might override this to provide a higher or lower maximum.

  * **(TBD) Rich queries:** A request can contain only a bounded number (default: 5) of queries that require dedicated access to the database (cannot be grouped with other requests).


## Working with General-purpose Indexer​

General-purpose Indexer fetches checkpoints data from either a remote object store, local files, or a full node RPC, and indexes data into multiple database tables through a set of specialized pipelines. PostgreSQL-compatible storage is the default deployment path for the general-purpose GraphQL stack. Custom indexers built on the same framework can write to other storage layers by implementing the framework's storage traits. Each pipeline is responsible for extracting specific data and writing to its target tables.

Click to open

Full list of tables and their schemas

[crates/sui-indexer-alt-schema/src/schema.rs](<https://github.com/MystenLabs/sui/blob/main/crates/sui-indexer-alt-schema/src/schema.rs>)
[code]
    // @generated automatically by Diesel CLI.  
      
    diesel::table! {  
        cp_bloom_blocks (cp_block_index, bloom_block_index) {  
            cp_block_index -> Int8,  
            bloom_block_index -> Int2,  
            bloom_filter -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        cp_blooms (cp_sequence_number) {  
            cp_sequence_number -> Int8,  
            bloom_filter -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        cp_digests (cp_sequence_number) {  
            cp_sequence_number -> Int8,  
            cp_digest -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        cp_sequence_numbers (cp_sequence_number) {  
            cp_sequence_number -> Int8,  
            tx_lo -> Int8,  
            epoch -> Int8,  
        }  
    }  
      
    diesel::table! {  
        ev_emit_mod (package, module, tx_sequence_number) {  
            package -> Bytea,  
            module -> Text,  
            tx_sequence_number -> Int8,  
            sender -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        ev_struct_inst (package, module, name, instantiation, tx_sequence_number) {  
            package -> Bytea,  
            module -> Text,  
            name -> Text,  
            instantiation -> Bytea,  
            tx_sequence_number -> Int8,  
            sender -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        kv_checkpoints (sequence_number) {  
            sequence_number -> Int8,  
            checkpoint_contents -> Bytea,  
            checkpoint_summary -> Bytea,  
            validator_signatures -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        kv_epoch_ends (epoch) {  
            epoch -> Int8,  
            cp_hi -> Int8,  
            tx_hi -> Int8,  
            end_timestamp_ms -> Int8,  
            safe_mode -> Bool,  
            total_stake -> Nullable<Int8>,  
            storage_fund_balance -> Nullable<Int8>,  
            storage_fund_reinvestment -> Nullable<Int8>,  
            storage_charge -> Nullable<Int8>,  
            storage_rebate -> Nullable<Int8>,  
            stake_subsidy_amount -> Nullable<Int8>,  
            total_gas_fees -> Nullable<Int8>,  
            total_stake_rewards_distributed -> Nullable<Int8>,  
            leftover_storage_fund_inflow -> Nullable<Int8>,  
            epoch_commitments -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        kv_epoch_starts (epoch) {  
            epoch -> Int8,  
            protocol_version -> Int8,  
            cp_lo -> Int8,  
            start_timestamp_ms -> Int8,  
            reference_gas_price -> Int8,  
            system_state -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        kv_feature_flags (protocol_version, flag_name) {  
            protocol_version -> Int8,  
            flag_name -> Text,  
            flag_value -> Bool,  
        }  
    }  
      
    diesel::table! {  
        kv_genesis (genesis_digest) {  
            genesis_digest -> Bytea,  
            initial_protocol_version -> Int8,  
        }  
    }  
      
    diesel::table! {  
        kv_objects (object_id, object_version) {  
            object_id -> Bytea,  
            object_version -> Int8,  
            serialized_object -> Nullable<Bytea>,  
        }  
    }  
      
    diesel::table! {  
        kv_packages (package_id, package_version) {  
            package_id -> Bytea,  
            package_version -> Int8,  
            original_id -> Bytea,  
            is_system_package -> Bool,  
            serialized_object -> Bytea,  
            cp_sequence_number -> Int8,  
        }  
    }  
      
    diesel::table! {  
        kv_protocol_configs (protocol_version, config_name) {  
            protocol_version -> Int8,  
            config_name -> Text,  
            config_value -> Nullable<Text>,  
        }  
    }  
      
    diesel::table! {  
        kv_transactions (tx_digest) {  
            tx_digest -> Bytea,  
            cp_sequence_number -> Int8,  
            timestamp_ms -> Int8,  
            raw_transaction -> Bytea,  
            raw_effects -> Bytea,  
            events -> Bytea,  
            user_signatures -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        obj_versions (object_id, object_version) {  
            object_id -> Bytea,  
            object_version -> Int8,  
            object_digest -> Nullable<Bytea>,  
            cp_sequence_number -> Int8,  
        }  
    }  
      
    diesel::table! {  
        sum_displays (object_type) {  
            object_type -> Bytea,  
            display_id -> Bytea,  
            display_version -> Int2,  
            display -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        tx_affected_addresses (affected, tx_sequence_number) {  
            affected -> Bytea,  
            tx_sequence_number -> Int8,  
            sender -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        tx_affected_objects (affected, tx_sequence_number) {  
            tx_sequence_number -> Int8,  
            affected -> Bytea,  
            sender -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        tx_balance_changes (tx_sequence_number) {  
            tx_sequence_number -> Int8,  
            balance_changes -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        tx_calls (package, module, function, tx_sequence_number) {  
            package -> Bytea,  
            module -> Text,  
            function -> Text,  
            tx_sequence_number -> Int8,  
            sender -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        tx_digests (tx_sequence_number) {  
            tx_sequence_number -> Int8,  
            tx_digest -> Bytea,  
        }  
    }  
      
    diesel::table! {  
        tx_kinds (tx_kind, tx_sequence_number) {  
            tx_kind -> Int2,  
            tx_sequence_number -> Int8,  
        }  
    }  
      
    diesel::table! {  
        watermarks (pipeline) {  
            pipeline -> Text,  
            epoch_hi_inclusive -> Int8,  
            checkpoint_hi_inclusive -> Int8,  
            tx_hi -> Int8,  
            timestamp_ms_hi_inclusive -> Int8,  
            reader_lo -> Int8,  
            pruner_timestamp -> Timestamp,  
            pruner_hi -> Int8,  
            chain_id -> Nullable<Bytea>,  
        }  
    }  
      
    diesel::allow_tables_to_appear_in_same_query!(  
        cp_bloom_blocks,  
        cp_blooms,  
        cp_digests,  
        cp_sequence_numbers,  
        ev_emit_mod,  
        ev_struct_inst,  
        kv_checkpoints,  
        kv_epoch_ends,  
        kv_epoch_starts,  
        kv_feature_flags,  
        kv_genesis,  
        kv_objects,  
        kv_packages,  
        kv_protocol_configs,  
        kv_transactions,  
        obj_versions,  
        sum_displays,  
        tx_affected_addresses,  
        tx_affected_objects,  
        tx_balance_changes,  
        tx_calls,  
        tx_digests,  
        tx_kinds,  
        watermarks,  
    );  
    
[/code]

Below are brief descriptions of the various categories of pipelines based on the type of data they handle:

### Blockchain raw content pipelines​

These pipelines capture the core blockchain data in its raw form, preserving complete checkpoint information, full transaction and objects contents, and Move package bytecode and metadata. They ensure the complete blockchain state is available for direct lookup by key (such as object ID and version, transaction digest, checkpoint sequence number). Some production deployments use the Archival Store for looking up checkpoints, transactions, and objects contents instead of the corresponding `kv_` tables.

The following pipelines create indexed views that allow efficient filtering and querying based on different attributes (such as object owner, transaction type, affected addresses, event type). These indexes help identify the keys of interest, which can then fetch detailed content from the raw content `kv_` tables:

**Tables:** `kv_checkpoints`, `kv_transactions`, `kv_objects`, `kv_packages`

### Transaction pipelines​

These pipelines extract and index key transaction attributes to support efficient filtering and querying. `tx_kinds`, `tx_calls`, `tx_affected_addresses`, and `tx_affected_objects` enable fast lookups of transactions based on types, function calls, sender and receiver addresses, and changed objects. `tx_digests` enable conversions between transaction sequence numbers and transaction digests needed for looking up transactions in `kv_` tables by digests and `tx_balance_changes` stores balance changes information of each transaction.

**Tables** : `tx_digests`, `tx_kinds`, `tx_calls`, `tx_affected_addresses`, `tx_affected_objects`, `tx_balance_changes`

### Object pipelines​

`obj_versions` tracks the version history of all blockchain objects, storing object ID, version number, digest, and checkpoint sequence number. The GraphQL service uses this table as an efficient index to resolve object queries by version bounds, checkpoint bounds, or exact versions without loading full object data, enabling features like version pagination and temporal consistency.

**Tables** : `obj_versions`

### Epoch information pipelines​

These pipelines capture protocol upgrades and epoch transition points. They track the system state, reward distribution, validator committee and protocol configurations of each epoch, providing a historical record of network evolution.

**Tables** : `kv_epoch_starts`, `kv_epoch_ends`, `kv_feature_flags`, `kv_protocol_configs`

### Event processing pipelines​

These pipelines index blockchain events for efficient querying by sender, emitting module, or event type.

**Tables** : `ev_emit_mod`, `ev_struct_inst`

### Utility and support pipelines​

These pipelines provide support infrastructure, such as checkpoint sequence number tracking for pruning and watermark tracking for ensuring consistent reads across different tables in a GraphQL query.

**Tables** : `cp_sequence_numbers`, `watermarks`

### Other pipelines​

`sum_displays` tables stores the latest version of the `Display` object for each object type, used for rendering [the offchain representation (display) for a type](</develop/objects/display/display-overview>).

## Working with Consistent Store​

The Consistent Store is a combined indexer and RPC service that is responsible for indexing live data onchain, and serving queries about it for recent checkpoints. Retention is configurable and is typically measured in minutes or hours. Its indexer fetches checkpoints from the same sources as the General-purpose Indexer, and writes data to an embedded RocksDB store, while requests are served through gRPC, answering the following queries:

  * Owner's live objects at a recent checkpoint, optionally filtered by type

  * Live objects for a given type at a recent checkpoint

  * Address balance at a recent checkpoint


This service is not stateless as it maintains its own database. A new instance can be spun up similar to the indexer by syncing it from genesis, or possibly by restoring it from a formal snapshot.

## For RPC providers and data operators​

If you're running the GraphQL RPC and General-purpose Indexer stack as a service, here are a few key considerations for configuring your setup to offer builders a performant and cost-effective experience. For step-by-step setup and operations instructions, see the [GraphQL and General-Purpose Indexer guide](</operators/data-management/indexer-stack-setup>).

### How much data to index and retain​

You should retain 30 to 90 days of recent checkpoint data in your Postgres-compatible database. This provides a strong default for most apps without incurring the high storage costs of full historical indexing.

  * 30 days serves as a baseline for dashboards and explorers that need recent activity and assets.

  * 90 days improves support for longer-range pagination, historical lookups, or apps with slower engagement cycles.


You can configure your indexing pipelines to scope which data you include, such as events, objects, and transactions, and disable any components that are not needed.

note

Avoid retaining long-term historical data in Postgres unless required for specific apps.

### Use the Archival Service and Store for historical lookups​

For production GraphQL deployments, pair Postgres-compatible storage with the [Archival Service](</develop/accessing-data/archival-store>) to support point lookups of transactions, objects, and checkpoints when relevant data does not exist in Postgres. The Archival Service serves as the backend for historical versions and checkpoint data, reducing pressure on your Postgres instance. For gRPC workloads, full nodes do not implicitly route to Archival; clients that need high-retention data must query an Archival Service endpoint directly.

Current implementation supports [GCP Bigtable](<https://cloud.google.com/bigtable>) which is a highly scalable and performant data store. If you plan to operate your own archival store, refer to `sui-kvstore` and `sui-kv-rpc` for indexer setup and RPC service implementation respectively. For the indexer setup, make sure to use the [custom indexing framework](</develop/accessing-data/custom-indexer/custom-indexers>). If you're interested in contributing support for other scalable data stores, reach out on GitHub by creating a new issue.

Click to open

`lib.rs` in `sui-kvstore`

[crates/sui-kvstore/src/lib.rs](<https://github.com/MystenLabs/sui/blob/main/crates/sui-kvstore/src/lib.rs>)
[code]
    mod bigtable;  
    pub mod config;  
    mod handlers;  
    mod rate_limiter;  
    mod store;  
    pub mod tables;  
    pub mod testing;  
      
    use std::sync::Arc;  
    use std::sync::OnceLock;  
      
    use anyhow::Result;  
    use async_trait::async_trait;  
    use prometheus::Registry;  
    use serde::Deserialize;  
    use serde::Serialize;  
    use sui_futures::service::Service;  
    use sui_indexer_alt_framework::Indexer;  
    use sui_indexer_alt_framework::IndexerArgs;  
    use sui_indexer_alt_framework::ingestion::ClientArgs;  
    use sui_indexer_alt_framework::pipeline::CommitterConfig;  
    use sui_indexer_alt_framework::pipeline::concurrent::ConcurrentConfig;  
      
    use crate::rate_limiter::CompositeRateLimiter;  
    use crate::rate_limiter::RateLimiter;  
    use sui_protocol_config::Chain;  
    use sui_types::balance_change::BalanceChange;  
    use sui_types::base_types::ObjectID;  
    use sui_types::committee::EpochId;  
    use sui_types::crypto::AuthorityStrongQuorumSignInfo;  
    use sui_types::digests::CheckpointDigest;  
    use sui_types::digests::TransactionDigest;  
    use sui_types::effects::TransactionEffects;  
    use sui_types::effects::TransactionEvents;  
    use sui_types::event::Event;  
    use sui_types::messages_checkpoint::CheckpointContents;  
    use sui_types::messages_checkpoint::CheckpointSequenceNumber;  
    use sui_types::messages_checkpoint::CheckpointSummary;  
    use sui_types::object::Object;  
    use sui_types::signature::GenericSignature;  
    use sui_types::storage::ObjectKey;  
    use sui_types::transaction::SenderSignedData;  
    use sui_types::transaction::Transaction;  
      
    pub use crate::bigtable::client::BigTableClient;  
    pub use crate::bigtable::client::PoolConfig;  
    pub use crate::bigtable::client::bitmap_query::BigTableBitmapSource;  
    pub use crate::bigtable::client::bitmap_query::BitmapIndexSpec;  
    pub use crate::bigtable::proto::bigtable::v2::RowFilter;  
    pub use crate::handlers::BigTableHandler;  
    pub use crate::handlers::BitmapIndexHandler;  
    pub use crate::handlers::BitmapIndexProcessor;  
    pub use crate::handlers::CheckpointsByDigestPipeline;  
    pub use crate::handlers::CheckpointsPipeline;  
    pub use crate::handlers::EpochEndPipeline;  
    pub use crate::handlers::EpochStartPipeline;  
    pub use crate::handlers::EventBitmapProcessor;  
    pub use crate::handlers::ObjectsPipeline;  
    pub use crate::handlers::PackagesByCheckpointPipeline;  
    pub use crate::handlers::PackagesByIdPipeline;  
    pub use crate::handlers::PackagesPipeline;  
    pub use crate::handlers::ProtocolConfigsPipeline;  
    pub use crate::handlers::SystemPackagesPipeline;  
    pub use crate::handlers::TransactionBitmapProcessor;  
    pub use crate::handlers::TransactionsPipeline;  
    pub use crate::handlers::TxSeqDigestPipeline;  
    pub use crate::store::BigTableConnection;  
    pub use crate::store::BigTableStore;  
    pub use config::BigtablePoolLayer;  
    pub use config::CommitterLayer;  
    pub use config::ConcurrentLayer;  
    pub use config::IndexerConfig;  
    pub use config::IngestionConfig;  
    pub use config::PipelineLayer;  
    pub use config::SequentialLayer;  
    pub use sui_inverted_index::BitmapLiteral;  
    pub use sui_inverted_index::BitmapQuery;  
    pub use sui_inverted_index::BitmapTerm;  
    pub use sui_inverted_index::ScanDirection;  
      
    pub const BITMAP_INDEX_PIPELINE: &str =  
        <BitmapIndexHandler<TransactionBitmapProcessor> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const CHECKPOINTS_PIPELINE: &str =  
        <BigTableHandler<CheckpointsPipeline> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const CHECKPOINTS_BY_DIGEST_PIPELINE: &str =  
        <BigTableHandler<CheckpointsByDigestPipeline> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const TRANSACTIONS_PIPELINE: &str =  
        <BigTableHandler<TransactionsPipeline> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const OBJECTS_PIPELINE: &str =  
        <BigTableHandler<ObjectsPipeline> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const EPOCH_START_PIPELINE: &str =  
        <BigTableHandler<EpochStartPipeline> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const EPOCH_END_PIPELINE: &str =  
        <BigTableHandler<EpochEndPipeline> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const PROTOCOL_CONFIGS_PIPELINE: &str =  
        <BigTableHandler<ProtocolConfigsPipeline> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const PACKAGES_PIPELINE: &str =  
        <BigTableHandler<PackagesPipeline> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const PACKAGES_BY_ID_PIPELINE: &str =  
        <BigTableHandler<PackagesByIdPipeline> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const PACKAGES_BY_CHECKPOINT_PIPELINE: &str =  
        <BigTableHandler<PackagesByCheckpointPipeline> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const SYSTEM_PACKAGES_PIPELINE: &str =  
        <BigTableHandler<SystemPackagesPipeline> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const TX_SEQ_DIGEST_PIPELINE: &str =  
        <BigTableHandler<TxSeqDigestPipeline> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
    pub const EVENT_BITMAP_INDEX_PIPELINE: &str =  
        <BitmapIndexHandler<EventBitmapProcessor> as sui_indexer_alt_framework::pipeline::Processor>::NAME;  
      
    pub const ALPHA_PIPELINE_NAMES: [&str; 3] = [  
        TX_SEQ_DIGEST_PIPELINE,  
        BITMAP_INDEX_PIPELINE,  
        EVENT_BITMAP_INDEX_PIPELINE,  
    ];  
      
    /// All pipeline names known to the indexer.  
    pub const ALL_PIPELINE_NAMES: [&str; 14] = [  
        CHECKPOINTS_PIPELINE,  
        CHECKPOINTS_BY_DIGEST_PIPELINE,  
        TRANSACTIONS_PIPELINE,  
        OBJECTS_PIPELINE,  
        EPOCH_START_PIPELINE,  
        EPOCH_END_PIPELINE,  
        PROTOCOL_CONFIGS_PIPELINE,  
        PACKAGES_PIPELINE,  
        PACKAGES_BY_ID_PIPELINE,  
        PACKAGES_BY_CHECKPOINT_PIPELINE,  
        SYSTEM_PACKAGES_PIPELINE,  
        TX_SEQ_DIGEST_PIPELINE,  
        BITMAP_INDEX_PIPELINE,  
        EVENT_BITMAP_INDEX_PIPELINE,  
    ];  
      
    pub fn validate_pipeline_name(value: &str) -> Result<&'static str, String> {  
        ALL_PIPELINE_NAMES  
            .iter()  
            .copied()  
            .find(|name| *name == value)  
            .ok_or_else(|| {  
                format!(  
                    "unknown pipeline `{value}`; expected one of: {}",  
                    ALL_PIPELINE_NAMES.join(", ")  
                )  
            })  
    }  
      
    pub fn parse_alpha_pipeline_name(value: &str) -> Result<&'static str, String> {  
        ALPHA_PIPELINE_NAMES  
            .iter()  
            .copied()  
            .find(|name| *name == value)  
            .ok_or_else(|| {  
                format!(  
                    "unknown alpha pipeline `{value}`; expected one of: {}",  
                    ALPHA_PIPELINE_NAMES.join(", ")  
                )  
            })  
    }  
      
    static WRITE_LEGACY_DATA: OnceLock<bool> = OnceLock::new();  
      
    /// Set whether to write legacy data (deprecated combined tx column).  
    /// Must be called before creating any pipelines. Panics if called more than once.  
    pub fn set_write_legacy_data(value: bool) {  
        WRITE_LEGACY_DATA  
            .set(value)  
            .expect("write_legacy_data already set");  
    }  
      
    pub fn write_legacy_data() -> bool {  
        *WRITE_LEGACY_DATA.get_or_init(|| false)  
    }  
      
    pub struct BigTableIndexer {  
        indexer: Indexer<BigTableStore>,  
        /// Background tasks owned by the store. Merged into the framework  
        /// indexer's Service by [`Self::run`] so bitmap committer tasks are  
        /// supervised for panic propagation and coordinated shutdown.  
        store_service: Service,  
    }  
      
    #[derive(Clone, Debug)]  
    pub struct CheckpointData {  
        pub summary: Option<CheckpointSummary>,  
        pub contents: Option<CheckpointContents>,  
        pub signatures: Option<AuthorityStrongQuorumSignInfo>,  
    }  
      
    #[derive(Clone, Debug)]  
    pub struct TransactionData {  
        pub digest: TransactionDigest,  
        pub transaction_data: Option<sui_types::transaction::TransactionData>,  
        pub signatures: Option<Vec<GenericSignature>>,  
        pub effects: Option<TransactionEffects>,  
        pub events: Option<TransactionEvents>,  
        pub checkpoint_number: CheckpointSequenceNumber,  
        pub timestamp: u64,  
        pub balance_changes: Vec<BalanceChange>,  
        pub unchanged_loaded_runtime_objects: Vec<ObjectKey>,  
    }  
      
    impl TransactionData {  
        /// Reconstruct the full Transaction when both data and signatures are present.  
        pub fn transaction(&self) -> Option<Transaction> {  
            let data = self.transaction_data.clone()?;  
            let sigs = self.signatures.clone().unwrap_or_default();  
            Some(Transaction::new(SenderSignedData::new(data, sigs)))  
        }  
    }  
      
    /// Partial transaction and events for when we only need transaction content for events  
    #[derive(Clone, Debug)]  
    pub struct TransactionEventsData {  
        pub events: Vec<Event>,  
        pub timestamp_ms: u64,  
    }  
      
    #[derive(Clone, Copy, Debug, Eq, Ord, PartialEq, PartialOrd)]  
    pub struct TxSeqDigestData {  
        pub tx_sequence_number: u64,  
        pub digest: TransactionDigest,  
        pub event_count: u32,  
        /// Zero-based position of this transaction within its checkpoint.  
        pub tx_offset: u32,  
        pub checkpoint_number: CheckpointSequenceNumber,  
    }  
      
    /// Epoch data returned by reader methods.  
    /// All fields are optional to support partial column queries.  
    #[derive(Clone, Debug, Default)]  
    pub struct EpochData {  
        pub epoch: Option<u64>,  
        pub protocol_version: Option<u64>,  
        pub start_timestamp_ms: Option<u64>,  
        pub start_checkpoint: Option<u64>,  
        pub reference_gas_price: Option<u64>,  
        pub system_state: Option<sui_types::sui_system_state::SuiSystemState>,  
        pub end_timestamp_ms: Option<u64>,  
        pub end_checkpoint: Option<u64>,  
        pub cp_hi: Option<u64>,  
        pub tx_hi: Option<u64>,  
        pub safe_mode: Option<bool>,  
        pub total_stake: Option<u64>,  
        pub storage_fund_balance: Option<u64>,  
        pub storage_fund_reinvestment: Option<u64>,  
        pub storage_charge: Option<u64>,  
        pub storage_rebate: Option<u64>,  
        pub stake_subsidy_amount: Option<u64>,  
        pub total_gas_fees: Option<u64>,  
        pub total_stake_rewards_distributed: Option<u64>,  
        pub leftover_storage_fund_inflow: Option<u64>,  
        pub epoch_commitments: Option<Vec<u8>>,  
    }  
      
    /// Package metadata returned by reader methods.  
    /// The actual serialized object is stored in the `objects` table.  
    #[derive(Clone, Debug)]  
    pub struct PackageData {  
        pub package_id: Vec<u8>,  
        pub package_version: u64,  
        pub original_id: Vec<u8>,  
        pub is_system_package: bool,  
        pub cp_sequence_number: u64,  
    }  
      
    /// Protocol config data returned by reader methods.  
    #[derive(Clone, Debug, Default)]  
    pub struct ProtocolConfigData {  
        /// Legacy scalar-only attributes map, BCS-encoded on disk. New readers should prefer the  
        /// lossless `configs` map instead.  
        pub attributes: std::collections::BTreeMap<String, Option<String>>,  
        pub flags: std::collections::BTreeMap<String, bool>,  
        /// Lossless view of every protocol-config attribute (scalar and non-scalar) and feature  
        /// flag rendered to `prost_types::Value`. Fields unset at this protocol version are  
        /// preserved as explicit `NullValue` entries so the keyset is stable across versions.  
        pub configs: std::collections::BTreeMap<String, prost_types::Value>,  
    }  
      
    /// Serializable watermark for per-pipeline tracking in BigTable. BCS-encoded into the `w`  
    /// column. The `BigTableConnection` write paths keep this column in sync alongside the new  
    /// per-field schema (see `WatermarkV1`) so existing readers continue to work.  
    #[derive(Clone, Debug, Serialize, Deserialize)]  
    pub struct WatermarkV0 {  
        pub epoch_hi_inclusive: u64,  
        pub checkpoint_hi_inclusive: u64,  
        pub tx_hi: u64,  
        pub timestamp_ms_hi_inclusive: u64,  
    }  
      
    /// New watermark for per-pipeline tracking in BigTable. Written as per-field u64 BE cells,  
    /// tagged by a schema-version cell `v = 1`.  
    ///  
    /// `checkpoint_hi_inclusive` is `Option<u64>` so the post-`init_watermark(None)` state ("pipeline  
    /// initialised but no checkpoint observed yet") can be persisted directly (the `chi` column is  
    /// absent in that state).  
    #[derive(Clone, Debug, Serialize, Deserialize)]  
    pub struct WatermarkV1 {  
        pub epoch_hi_inclusive: u64,  
        pub checkpoint_hi_inclusive: Option<u64>,  
        pub tx_hi: u64,  
        pub timestamp_ms_hi_inclusive: u64,  
        pub reader_lo: u64,  
        pub pruner_hi: u64,  
        pub pruner_timestamp_ms: u64,  
        /// Bitmap-only replay-floor checkpoint for the active bucket. `None` for  
        /// non-bitmap pipelines and rows written before the column existed.  
        #[serde(default)]  
        pub bucket_start_cp: Option<u64>,  
    }  
      
    #[async_trait]  
    pub trait KeyValueStoreReader {  
        async fn get_objects(&mut self, objects: &[ObjectKey]) -> Result<Vec<Object>>;  
        async fn get_transactions(  
            &mut self,  
            transactions: &[TransactionDigest],  
        ) -> Result<Vec<TransactionData>>;  
        async fn get_checkpoints(  
            &mut self,  
            sequence_numbers: &[CheckpointSequenceNumber],  
        ) -> Result<Vec<CheckpointData>>;  
        async fn get_checkpoint_by_digest(  
            &mut self,  
            digest: CheckpointDigest,  
        ) -> Result<Option<CheckpointData>>;  
        /// Return the minimum watermark across the given pipelines, selecting the whole  
        /// watermark with the lowest `checkpoint_hi_inclusive`. Returns `None` if any  
        /// pipeline is missing a watermark or has `checkpoint_hi_inclusive < reader_lo`.  
        async fn get_watermark_for_pipelines(  
            &mut self,  
            pipelines: &[&str],  
        ) -> Result<Option<WatermarkV1>>;  
        async fn get_latest_object(&mut self, object_id: &ObjectID) -> Result<Option<Object>>;  
        async fn get_epoch(&mut self, epoch_id: EpochId) -> Result<Option<EpochData>>;  
        async fn get_latest_epoch(&mut self) -> Result<Option<EpochData>>;  
        async fn get_protocol_configs(  
            &mut self,  
            protocol_version: u64,  
        ) -> Result<Option<ProtocolConfigData>>;  
        async fn get_events_for_transactions(  
            &mut self,  
            keys: &[TransactionDigest],  
        ) -> Result<Vec<(TransactionDigest, TransactionEventsData)>>;  
      
        /// Resolve package_ids to their original_ids.  
        async fn get_package_original_ids(  
            &mut self,  
            package_ids: &[ObjectID],  
        ) -> Result<Vec<(ObjectID, ObjectID)>>;  
      
        /// Get packages by (original_id, version) pairs.  
        async fn get_packages_by_version(  
            &mut self,  
            keys: &[(ObjectID, u64)],  
        ) -> Result<Vec<PackageData>>;  
      
        /// Get the latest version of a package at or before `cp_bound`.  
        async fn get_package_latest(  
            &mut self,  
            original_id: ObjectID,  
            cp_bound: u64,  
        ) -> Result<Option<PackageData>>;  
      
        /// Paginate package versions for an original_id, filtered by cp_bound.  
        async fn get_package_versions(  
            &mut self,  
            original_id: ObjectID,  
            cp_bound: u64,  
            after_version: Option<u64>,  
            before_version: Option<u64>,  
            limit: usize,  
            descending: bool,  
        ) -> Result<Vec<PackageData>>;  
      
        /// Get packages created in a checkpoint range, ordered by checkpoint.  
        async fn get_packages_by_checkpoint_range(  
            &mut self,  
            cp_after: Option<u64>,  
            cp_before: Option<u64>,  
            limit: usize,  
            descending: bool,  
        ) -> Result<Vec<PackageData>>;  
      
        /// Get all system packages with their latest version at or before `cp_bound`.  
        async fn get_system_packages(  
            &mut self,  
            cp_bound: u64,  
            after_original_id: Option<ObjectID>,  
            limit: usize,  
        ) -> Result<Vec<PackageData>>;  
    }  
      
    impl BigTableIndexer {  
        pub async fn new(  
            store: BigTableStore,  
            indexer_args: IndexerArgs,  
            client_args: ClientArgs,  
            ingestion_config: IngestionConfig,  
            committer: CommitterConfig,  
            config: IndexerConfig,  
            pipeline: PipelineLayer,  
            chain: Chain,  
            alpha_pipelines: &[&str],  
            registry: &Registry,  
        ) -> Result<Self> {  
            let mut indexer = Indexer::new(  
                store.clone(),  
                indexer_args,  
                client_args,  
                ingestion_config.into(),  
                Some("kvstore_alt_indexer"),  
                registry,  
            )  
            .await?;  
      
            let global = config.total_max_rows_per_second.map(RateLimiter::new);  
            let base_rps = config.max_rows_per_second;  
      
            fn build_rate_limiter(  
                layer_rps: Option<u64>,  
                base_rps: Option<u64>,  
                global: &Option<Arc<RateLimiter>>,  
            ) -> Arc<CompositeRateLimiter> {  
                let mut limiters = Vec::new();  
                if let Some(rps) = layer_rps.or(base_rps) {  
                    limiters.push(RateLimiter::new(rps));  
                }  
                if let Some(g) = global {  
                    limiters.push(g.clone());  
                }  
                Arc::new(CompositeRateLimiter::new(limiters))  
            }  
      
            let base = ConcurrentConfig {  
                committer,  
                pruner: None,  
                ..Default::default()  
            };  
            let mut store_runtime_builder = store.runtime_builder();  
      
            if alpha_pipelines.contains(&BITMAP_INDEX_PIPELINE) {  
                let tx_bitmap_rate_limiter = build_rate_limiter(  
                    pipeline.transaction_bitmap_index.max_rows_per_second,  
                    base_rps,  
                    &global,  
                );  
                store_runtime_builder = store_runtime_builder  
                    .with_bitmap_committer::<TransactionBitmapProcessor>(  
                        pipeline.transaction_bitmap_index.max_rows_or_default(),  
                        pipeline  
                            .transaction_bitmap_index  
                            .write_concurrency  
                            .unwrap_or(base.committer.write_concurrency),  
                        tx_bitmap_rate_limiter,  
                        Some(registry),  
                    );  
                let tx_bitmap_handler = BitmapIndexHandler::new(TransactionBitmapProcessor);  
                indexer  
                    .sequential_pipeline(  
                        tx_bitmap_handler,  
                        pipeline  
                            .transaction_bitmap_index  
                            .clone()  
                            .finish(base.clone()),  
                    )  
                    .await?;  
            }  
            indexer  
                .concurrent_pipeline(  
                    BigTableHandler::new(  
                        CheckpointsPipeline,  
                        &pipeline.checkpoints,  
                        build_rate_limiter(pipeline.checkpoints.max_rows_per_second, base_rps, &global),  
                    ),  
                    pipeline.checkpoints.finish(base.clone()),  
                )  
                .await?;  
            indexer  
                .concurrent_pipeline(  
                    BigTableHandler::new(  
                        CheckpointsByDigestPipeline,  
                        &pipeline.checkpoints_by_digest,  
                        build_rate_limiter(  
                            pipeline.checkpoints_by_digest.max_rows_per_second,  
                            base_rps,  
                            &global,  
                        ),  
                    ),  
                    pipeline.checkpoints_by_digest.finish(base.clone()),  
                )  
                .await?;  
            indexer  
                .concurrent_pipeline(  
                    BigTableHandler::new(  
                        TransactionsPipeline,  
                        &pipeline.transactions,  
                        build_rate_limiter(  
                            pipeline.transactions.max_rows_per_second,  
                            base_rps,  
                            &global,  
                        ),  
                    ),  
                    pipeline.transactions.finish(base.clone()),  
                )  
                .await?;  
            indexer  
                .concurrent_pipeline(  
                    BigTableHandler::new(  
                        ObjectsPipeline,  
                        &pipeline.objects,  
                        build_rate_limiter(pipeline.objects.max_rows_per_second, base_rps, &global),  
                    ),  
                    pipeline.objects.finish(base.clone()),  
                )  
                .await?;  
            indexer  
                .concurrent_pipeline(  
                    BigTableHandler::new(  
                        EpochStartPipeline,  
                        &pipeline.epoch_start,  
                        build_rate_limiter(pipeline.epoch_start.max_rows_per_second, base_rps, &global),  
                    ),  
                    pipeline.epoch_start.finish(base.clone()),  
                )  
                .await?;  
            indexer  
                .concurrent_pipeline(  
                    BigTableHandler::new(  
                        EpochEndPipeline,  
                        &pipeline.epoch_end,  
                        build_rate_limiter(pipeline.epoch_end.max_rows_per_second, base_rps, &global),  
                    ),  
                    pipeline.epoch_end.finish(base.clone()),  
                )  
                .await?;  
            indexer  
                .concurrent_pipeline(  
                    BigTableHandler::new(  
                        ProtocolConfigsPipeline(chain),  
                        &pipeline.protocol_configs,  
                        build_rate_limiter(  
                            pipeline.protocol_configs.max_rows_per_second,  
                            base_rps,  
                            &global,  
                        ),  
                    ),  
                    pipeline.protocol_configs.finish(base.clone()),  
                )  
                .await?;  
            indexer  
                .concurrent_pipeline(  
                    BigTableHandler::new(  
                        PackagesPipeline,  
                        &pipeline.packages,  
                        build_rate_limiter(pipeline.packages.max_rows_per_second, base_rps, &global),  
                    ),  
                    pipeline.packages.finish(base.clone()),  
                )  
                .await?;  
            indexer  
                .concurrent_pipeline(  
                    BigTableHandler::new(  
                        PackagesByIdPipeline,  
                        &pipeline.packages_by_id,  
                        build_rate_limiter(  
                            pipeline.packages_by_id.max_rows_per_second,  
                            base_rps,  
                            &global,  
                        ),  
                    ),  
                    pipeline.packages_by_id.finish(base.clone()),  
                )  
                .await?;  
            indexer  
                .concurrent_pipeline(  
                    BigTableHandler::new(  
                        PackagesByCheckpointPipeline,  
                        &pipeline.packages_by_checkpoint,  
                        build_rate_limiter(  
                            pipeline.packages_by_checkpoint.max_rows_per_second,  
                            base_rps,  
                            &global,  
                        ),  
                    ),  
                    pipeline.packages_by_checkpoint.finish(base.clone()),  
                )  
                .await?;  
            indexer  
                .concurrent_pipeline(  
                    BigTableHandler::new(  
                        SystemPackagesPipeline,  
                        &pipeline.system_packages,  
                        build_rate_limiter(  
                            pipeline.system_packages.max_rows_per_second,  
                            base_rps,  
                            &global,  
                        ),  
                    ),  
                    pipeline.system_packages.finish(base.clone()),  
                )  
                .await?;  
            if alpha_pipelines.contains(&TX_SEQ_DIGEST_PIPELINE) {  
                indexer  
                    .concurrent_pipeline(  
                        BigTableHandler::new(  
                            TxSeqDigestPipeline,  
                            &pipeline.tx_seq_digest,  
                            build_rate_limiter(  
                                pipeline.tx_seq_digest.max_rows_per_second,  
                                base_rps,  
                                &global,  
                            ),  
                        ),  
                        pipeline.tx_seq_digest.finish(base.clone()),  
                    )  
                    .await?;  
            }  
            if alpha_pipelines.contains(&EVENT_BITMAP_INDEX_PIPELINE) {  
                let ev_bitmap_rate_limiter = build_rate_limiter(  
                    pipeline.event_bitmap_index.max_rows_per_second,  
                    base_rps,  
                    &global,  
                );  
                store_runtime_builder = store_runtime_builder  
                    .with_bitmap_committer::<EventBitmapProcessor>(  
                        pipeline.event_bitmap_index.max_rows_or_default(),  
                        pipeline  
                            .event_bitmap_index  
                            .write_concurrency  
                            .unwrap_or(base.committer.write_concurrency),  
                        ev_bitmap_rate_limiter,  
                        Some(registry),  
                    );  
                let ev_bitmap_handler = BitmapIndexHandler::new(EventBitmapProcessor);  
                indexer  
                    .sequential_pipeline(  
                        ev_bitmap_handler,  
                        pipeline.event_bitmap_index.clone().finish(base.clone()),  
                    )  
                    .await?;  
            }  
            Ok(Self {  
                indexer,  
                store_service: store_runtime_builder.into_service(),  
            })  
        }  
      
        pub fn pipeline_names(&self) -> Vec<&'static str> {  
            self.indexer.pipelines().collect()  
        }  
      
        /// Run the indexer and return a composed [`Service`] that supervises  
        /// both the framework's pipeline tasks and every bitmap handler's  
        /// background tasks (shards, generation, write loop, watermark  
        /// writer). Panics in any supervised task propagate through the  
        /// Service's `main()`; shutdown is coordinated across both groups.  
        pub async fn run(self) -> Result<Service> {  
            Ok(self.indexer.run().await?.merge(self.store_service))  
        }  
    }  
      
    impl From<WatermarkV0> for sui_indexer_alt_framework_store_traits::CommitterWatermark {  
        fn from(w: WatermarkV0) -> Self {  
            Self {  
                epoch_hi_inclusive: w.epoch_hi_inclusive,  
                checkpoint_hi_inclusive: w.checkpoint_hi_inclusive,  
                tx_hi: w.tx_hi,  
                timestamp_ms_hi_inclusive: w.timestamp_ms_hi_inclusive,  
            }  
        }  
    }  
    
[/code]

Click to open

`main.rs` in `sui-kv-rpc`

[crates/sui-kv-rpc/src/main.rs](<https://github.com/MystenLabs/sui/blob/main/crates/sui-kv-rpc/src/main.rs>)
[code]
    use std::path::PathBuf;  
      
    use anyhow::Context;  
    use anyhow::Result;  
    use axum::Router;  
    use axum::routing::get;  
    use clap::Parser;  
    use sui_kv_rpc::KvRpcConfig;  
    use sui_kv_rpc::KvRpcServer;  
    use sui_kv_rpc::ServerConfig;  
    use sui_kvstore::validate_pipeline_name;  
    use sui_rpc_api::ServerVersion;  
    use telemetry_subscribers::TelemetryConfig;  
      
    bin_version::bin_version!();  
      
    #[derive(Parser)]  
    struct App {  
        /// Path to a YAML config file ([`KvRpcConfig`]). New tunables (concurrency,  
        /// scan budgets, per-endpoint list limits, experimental query APIs) are  
        /// configured here. Run with --config-schema to print the file format.  
        #[clap(long)]  
        config_path: Option<PathBuf>,  
      
        /// Print the JSON Schema for the --config-path file (with field docs) and  
        /// exit.  
        #[clap(long)]  
        config_schema: bool,  
      
        // The flags below are deprecated. They remain for backwards compatibility:  
        // each takes precedence over the config file when set, and logs a  
        // deprecation warning. Prefer setting them in the config file.  
        /// (deprecated) Path to GCP service account JSON key file. If not provided,  
        /// uses Application Default Credentials.  
        #[clap(long)]  
        credentials: Option<String>,  
        /// (deprecated) BigTable instance id.  
        instance_id: Option<String>,  
        /// (deprecated) gRPC listen address.  
        address: Option<String>,  
        /// (deprecated) Prometheus metrics host.  
        metrics_host: Option<String>,  
        /// (deprecated) Prometheus metrics port.  
        metrics_port: Option<u16>,  
        /// (deprecated) PEM TLS certificate path.  
        #[clap(long = "tls-cert")]  
        tls_cert: Option<String>,  
        /// (deprecated) PEM TLS private key path.  
        #[clap(long = "tls-key")]  
        tls_key: Option<String>,  
        /// (deprecated) GCP project id for the BigTable instance.  
        #[clap(long = "bigtable-project")]  
        bigtable_project: Option<String>,  
        /// (deprecated)  
        #[clap(long = "app-profile-id")]  
        app_profile_id: Option<String>,  
        /// (deprecated)  
        #[clap(long = "checkpoint-bucket")]  
        checkpoint_bucket: Option<String>,  
        /// (deprecated) Pipeline watermark to include in GetServiceInfo checkpoint  
        /// height. Repeat to include multiple pipelines.  
        #[clap(  
            long = "watermark-pipeline",  
            value_name = "PIPELINE",  
            value_delimiter = ',',  
            value_parser = validate_pipeline_name  
        )]  
        watermark_pipeline: Vec<&'static str>,  
        /// (deprecated) Channel-level timeout in milliseconds for BigTable gRPC calls.  
        #[clap(long = "bigtable-channel-timeout-ms")]  
        bigtable_channel_timeout_ms: Option<u64>,  
        /// (deprecated) Number of gRPC channels to create at startup.  
        #[clap(long = "bigtable-initial-pool-size")]  
        bigtable_initial_pool_size: Option<usize>,  
        /// (deprecated) Minimum number of channels the pool will maintain.  
        #[clap(long = "bigtable-min-pool-size")]  
        bigtable_min_pool_size: Option<usize>,  
        /// (deprecated) Maximum number of channels the pool can scale to.  
        #[clap(long = "bigtable-max-pool-size")]  
        bigtable_max_pool_size: Option<usize>,  
    }  
      
    fn warn_deprecated(flag: &str) {  
        tracing::warn!(  
            "the `{flag}` CLI flag is deprecated; configure it via --config-path instead \  
             (run with --config-schema to see the file format; the CLI value takes \  
             precedence over the config file for now)"  
        );  
    }  
      
    /// Apply a deprecated CLI override on top of the loaded config: when `src` is  
    /// set it wins over the config file and logs a deprecation warning.  
    fn override_field<T>(flag: &str, src: Option<T>, dst: &mut Option<T>) {  
        if src.is_some() {  
            warn_deprecated(flag);  
            *dst = src;  
        }  
    }  
      
    /// Apply the deprecated CLI flags on top of a loaded config: each set flag wins  
    /// over the config file and emits a deprecation warning.  
    fn apply_deprecated_overrides(app: App, config: &mut KvRpcConfig) {  
        override_field("--credentials", app.credentials, &mut config.credentials);  
        override_field("instance_id", app.instance_id, &mut config.instance_id);  
        override_field("address", app.address, &mut config.address);  
        override_field("metrics_host", app.metrics_host, &mut config.metrics_host);  
        override_field("metrics_port", app.metrics_port, &mut config.metrics_port);  
        override_field("--tls-cert", app.tls_cert, &mut config.tls_cert);  
        override_field("--tls-key", app.tls_key, &mut config.tls_key);  
        override_field(  
            "--bigtable-project",  
            app.bigtable_project,  
            &mut config.bigtable_project,  
        );  
        override_field(  
            "--app-profile-id",  
            app.app_profile_id,  
            &mut config.app_profile_id,  
        );  
        override_field(  
            "--checkpoint-bucket",  
            app.checkpoint_bucket,  
            &mut config.checkpoint_bucket,  
        );  
        override_field(  
            "--bigtable-channel-timeout-ms",  
            app.bigtable_channel_timeout_ms,  
            &mut config.bigtable_channel_timeout_ms,  
        );  
        override_field(  
            "--bigtable-initial-pool-size",  
            app.bigtable_initial_pool_size,  
            &mut config.bigtable_initial_pool_size,  
        );  
        override_field(  
            "--bigtable-min-pool-size",  
            app.bigtable_min_pool_size,  
            &mut config.bigtable_min_pool_size,  
        );  
        override_field(  
            "--bigtable-max-pool-size",  
            app.bigtable_max_pool_size,  
            &mut config.bigtable_max_pool_size,  
        );  
      
        if !app.watermark_pipeline.is_empty() {  
            warn_deprecated("--watermark-pipeline");  
            config.watermark_pipeline = Some(  
                app.watermark_pipeline  
                    .iter()  
                    .map(|s| s.to_string())  
                    .collect(),  
            );  
        }  
    }  
      
    async fn health_check() -> &'static str {  
        "OK"  
    }  
      
    #[tokio::main]  
    async fn main() -> Result<()> {  
        let _guard = TelemetryConfig::new().with_env().init();  
        rustls::crypto::ring::default_provider()  
            .install_default()  
            .expect("Failed to install CryptoProvider");  
      
        let app = App::parse();  
        if app.config_schema {  
            println!("{}", KvRpcConfig::schema_json()?);  
            return Ok(());  
        }  
        let mut config = match &app.config_path {  
            Some(path) => KvRpcConfig::load(path)?,  
            None => KvRpcConfig::default(),  
        };  
        apply_deprecated_overrides(app, &mut config);  
      
        let instance_id = config.instance_id.clone().context(  
            "instance_id must be set via the config file (--config-path) or the \  
             deprecated positional argument",  
        )?;  
        let server_version = Some(ServerVersion::new("sui-kv-rpc", VERSION));  
        let registry_service = mysten_metrics::start_prometheus_server(  
            format!("{}:{}", config.metrics_host(), config.metrics_port()).parse()?,  
        );  
        let registry = registry_service.default_registry();  
        mysten_metrics::init_metrics(&registry);  
      
        let server = KvRpcServer::new(  
            instance_id,  
            config.bigtable_project.clone(),  
            config.app_profile_id.clone(),  
            config.checkpoint_bucket.clone(),  
            config.channel_timeout(),  
            server_version,  
            &registry,  
            config.credentials.clone(),  
            config.pool_config(),  
            config.service_info_watermark_pipelines()?,  
            config.ledger_history(),  
        )  
        .await?;  
      
        let server_config = ServerConfig {  
            tls_identity: config.tls_identity()?,  
            metrics_registry: Some(registry),  
            enable_reflection: true,  
            enable_experimental_query_apis: config.enable_experimental_query_apis(),  
        };  
      
        tokio::spawn(async {  
            let web_server = Router::new().route("/health", get(health_check));  
            let listener = tokio::net::TcpListener::bind("0.0.0.0:8081")  
                .await  
                .expect("can't bind to the healthcheck port");  
            axum::serve(listener, web_server.into_make_service())  
                .await  
                .expect("healh check service failed");  
        });  
      
        let addr = config.address().parse()?;  
        server  
            .start_service(addr, server_config)  
            .await?  
            .main()  
            .await?;  
        Ok(())  
    }  
    
[/code]

### Deployment strategies and trade-offs​

You don't need to index everything to provide a reliable and performant GraphQL RPC service. In fact, many developers might need only the latest object and transaction data plus a few weeks to months of history. You can reduce operational overhead and improve query performance by:

  * Configuring a clear retention window, such as 30 to 90 days in Postgres.

  * Using the Archival Service to handle deep historical queries, rather than retaining all versions in Postgres.


When designing your deployment, consider the trade-offs between cost, reliability, and feature completeness:

  * Postgres-only with short-retention results in lower storage cost and faster performance, but limited historical coverage.

  * Postgres-only with high retention results in broader data coverage, but relatively higher storage cost and slower performance at scale.

  * Postgres with short-retention and Archival Service results in optimization for cost and completeness, ideal for production deployments.


### Best practices​

To improve performance and reliability, also consider these operational best practices:

  * Try and co-locate your database, indexing pipelines, GraphQL RPC service, and archival service in the same region as your users to minimize latency.

  * Use replication and staged deployments to ensure SLA during upgrades or failures.

  * Consider offering different tiers of service to meet different developer needs. For example:

    * A basic tier that serves recent data (30 days, for example) through GraphQL RPC or gRPC.

    * A premium tier with full GraphQL or gRPC and Archival Service access, suited to apps that need historical lookups.

    * Optionally, offer region-specific instances or throughput-based pricing to support diverse client footprints.


[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/accessing-data/graphql/graphql-rpc.mdx>)

[PreviousGraphQL](</develop/accessing-data/graphql/>)[NextQuerying Data with GraphQL RPC](</develop/accessing-data/graphql/query-with-graphql>)

  * Components
  * When to use
  * How GraphQL RPC and General-purpose Indexer fit into the application stack
    * Fully managed service
    * Partial self-managed
    * Fully self-managed
  * Working with the GraphQL service
  * Working with General-purpose Indexer
    * Blockchain raw content pipelines
    * Transaction pipelines
    * Object pipelines
    * Epoch information pipelines
    * Event processing pipelines
    * Utility and support pipelines
    * Other pipelines
  * Working with Consistent Store
  * For RPC providers and data operators
    * How much data to index and retain
    * Use the Archival Service and Store for historical lookups
    * Deployment strategies and trade-offs
    * Best practices
