<!-- Source: https://docs.sui.io/operators/data-management/indexer-stack-setup -->

* [](</>)
  * [Data Indexing and Archives](</operators/data-management/>)
  * GraphQL and General-Purpose Indexer


On this page

# GraphQL and General-Purpose Indexer

The GraphQL and `sui-indexer-alt` (Indexer) stack are part of the [Sui data access infrastructure](</develop/accessing-data/data-serving>). The stack provides access to onchain data through a high-performance GraphQL service backed by a scalable and general-purpose indexer. This stack is optimized for developers who need flexible queries, structured output, and historical access to data (with configurable retention) across the Sui network.

GraphQL is ideal for applications that require rich query patterns over structured data, such as fetching owned objects, transaction history, specific onchain attributes, and more. The GraphQL service runs on top of a Postgres-compatible database that is updated by different Indexer pipelines in parallel.

The General-purpose Indexer includes configurable checkpoint-based pipelines that extract data from the Sui remote checkpoint store and full nodes. The pipelines write processed data to a database optimized for GraphQL query access.

Together, the GraphQL service and Indexer offer a modular and production-ready data stack for builders, wallet developers, explorers, and indexer/data providers.

info

**JSON-RPC is deprecated**. Migrate to either [gRPC](</develop/accessing-data/grpc>) or [GraphQL RPC](</develop/accessing-data/graphql/graphql-rpc>) by July 2026. For a method mapping, decision criteria, and common migration gotchas, see the [JSON-RPC Migration Guide](</develop/accessing-data/json-rpc-migration>).

Refer to the [list of RPC or data providers](<https://www.notion.so/mystenlabs/RPC-providers-offering-future-Sui-data-primitives-2466d9dcb4e980a99a36e9aafd8c17e0?source=copy_link>) that have enabled gRPC on their full nodes or offer GraphQL RPC. Contact a provider directly to request access. If your RPC or data provider doesn’t yet support these data access methods, ask them to enable support or contact the Sui Foundation team on Discord, Telegram, or Slack for help.

info

Refer to [Access Sui Data](</develop/accessing-data/data-serving>) for an overview of options to access Sui network data.

See [GraphQL and General-Purpose Indexer](</develop/accessing-data/custom-indexer/custom-indexers>) for more information on the stack.

## Indexer setup​

The indexer consists of multiple pipelines that each read, transform, and write checkpoint data to various Postgres tables. Multiple instances of the indexer can run in parallel, each configured by its own TOML file.

#### Hardware requirements​

  * **CPU:** 2 cores per instance
  * **Memory:** 4GB per instance


Internally at Mysten Labs, indexer instances use 8 CPUs and 16 GiB of memory for backfill, and scale down to 0.5 CPU and 1 GiB of memory for normal operation at network tip.

#### Storage requirements​

The general-purpose indexer writes to a Postgres database. The storage footprint estimations outlined below are based on the network as of early 2026, and might fluctuate in relation to network growth. These numbers should be seen as directional rather than exact figures.

The bulk of the storage is consumed by `obj_versions` at 8.2 TB. A pruning strategy is in development.

The unpruned `tx_balance_changes` table adds another 1.2 TB.

A 30-day retention adds 1.8 TB on top, while a 90-day retention contributes up to an additional 3.1 TB.

30-day retention:

Table| Heap (GB)| Idx (GB)  
---|---|---  
tx_affected_objects| 64–70| 276–397  
tx_calls| 27–30| 239–366  
ev_struct_inst| 15–19| 174–267  
tx_affected_addresses| 17–18| 63–92  
ev_emit_mod| 8–9| 54–85  
tx_digests| 8| 21–25  
tx_kinds| 5| 14–16  
cp_sequence_numbers| 10| 5  
**TOTAL**| **426–430**| **1,822–1,836**  
  
90-day retention:

Table| Heap (GB)| Idx (GB)  
---|---|---  
tx_affected_objects| 188–202| 580–752  
tx_calls| 82–87| 560–715  
ev_struct_inst| 45–50| 432–531  
tx_affected_addresses| 50–54| 151–183  
ev_emit_mod| 22–24| 129–167  
tx_digests| 24–26| 45–55  
tx_kinds| 15–16| 30–36  
cp_sequence_numbers| 10| 5  
**TOTAL**| **698–779**| **2,430–3,165**  
  
### Run `sui-indexer-alt`​

Use full node gRPC as the default source for steady-state operation. Use a checkpoint bucket only for backfill, recovery, or fallback when historical checkpoints are required.

For steady-state operation, use the public full node gRPC endpoint pattern `https://fullnode.<network>.sui.io:443`, for example:

  * Mainnet: `https://fullnode.mainnet.sui.io:443`
  * Testnet: `https://fullnode.testnet.sui.io:443`


Run an indexer instance using this command for each of the configuration files. The command varies based on whether the pipeline is prunable or unprunable:

#### For unprunable pipelines (must start from genesis)​
[code] 
    $ sui-indexer-alt indexer \  
        --config <CONFIG_FILE> \  
        --database-url <DATABASE_URL> \  
        --remote-store-gcs <REMOTE_STORE_GCS_BUCKET>  
    
[/code]

#### For prunable pipelines with retention period​
[code] 
    $ sui-indexer-alt indexer \  
        --config <CONFIG_FILE> \  
        --database-url <DATABASE_URL> \  
        --remote-store-gcs <REMOTE_STORE_GCS_BUCKET> \  
        --first-checkpoint <CHECKPOINT_NUMBER>  
    
[/code]

For prunable pipelines, calculate the `first-checkpoint` based on your retention period:

  * **30-day retention** : Start from checkpoint `current_checkpoint - 10368000`
  * **90-day retention** : Start from checkpoint `current_checkpoint - 31104000`

**CLI param**| **Description**  
---|---  
`<CONFIG_FILE>`| Path to indexer configuration file.  
`<DATABASE_URL>`| Postgres database connection string.  
`<REMOTE_STORE_GCS_BUCKET>`| GCS bucket name to index from. Recommended for backfill because it uses the GCS API directly instead of HTTPS. See [Checkpoint Data Sources](</develop/accessing-data/custom-indexer/indexer-data-integration#checkpoint-data-sources>).  
`<CHECKPOINT_NUMBER>`| (Optional) For prunable pipelines only, the checkpoint to start indexing from based on retention requirements.  
  
#### Examples​

**Unprunable pipeline (from genesis through GCS bucket):**
[code] 
    $ sui-indexer-alt indexer \  
        --config unpruned.toml \  
        --database-url postgres://username:password@localhost:5432/database \  
        --remote-store-gcs mysten-mainnet-checkpoints-use4  
    
[/code]

**Prunable pipeline with 30-day retention (assuming current checkpoint is 100,000,000):**
[code] 
    $ sui-indexer-alt indexer \  
        --config events.toml \  
        --database-url postgres://username:password@localhost:5432/database \  
        --remote-store-gcs mysten-mainnet-checkpoints-use4 \  
        --first-checkpoint 89632000  
    
[/code]

**HTTPS remote store URL (alternative to GCS bucket access):**
[code] 
    $ sui-indexer-alt indexer \  
        --config events.toml \  
        --database-url postgres://username:password@localhost:5432/database \  
        --remote-store-url https://checkpoints.mainnet.sui.io \  
        --first-checkpoint 89632000  
    
[/code]

**Steady-state operation from a full node gRPC endpoint (recommended):**
[code] 
    $ sui-indexer-alt indexer \  
        --config events.toml \  
        --database-url postgres://username:password@localhost:5432/database \  
        --rpc-api-url https://fullnode.mainnet.sui.io:443 \  
        --streaming-url https://fullnode.mainnet.sui.io:443  
    
[/code]

info

`https://checkpoints.mainnet.sui.io` and `https://checkpoints.testnet.sui.io` retain only the most recent 30 days of checkpoints. For full-retention backfills older than 30 days or from genesis, use `gs://mysten-mainnet-checkpoints-use4` through `--remote-store-gcs mysten-mainnet-checkpoints-use4` for Mainnet or `gs://mysten-testnet-checkpoints-use4` through `--remote-store-gcs mysten-testnet-checkpoints-use4` for Testnet.

If the checkpoint bucket you are using has Requester Pays enabled, configure GCS credentials and a billing project when using `--remote-store-gcs`. In Sui's object store config, the relevant fields are `google_service_account` and `google_project_id`. `google_project_id` is sent as the `x-goog-user-project` header required by GCS Requester Pays.

For more on Requester Pays, see [Use Requester Pays](<https://cloud.google.com/storage/docs/using-requester-pays>). For source selection and steady-state operation guidance, see [Running a Remote Store](</operators/data-management/remote-store-setup>) and [Archival Stack Setup](</operators/data-management/archival-stack-setup>). In general, public HTTPS checkpoint endpoints should not be your default source in steady state if a full node gRPC endpoint is available.

### Run config recommendations​

Use the TOML files below; they are grouped by pipeline speed. All pipelines in an instance are limited by the slowest pipeline in that instance so these files each contain pipelines that run at approximately the same speed.

info

The example configurations linked below use a fixed concurrency of 20 for simplicity, but this leads to longer backfill times. When backfilling a pipeline, consider setting the `ingest-concurrency` to a higher initial concurrency, such as `{ kind = "adaptive", initial = 200, min = 50, max = 2000 }`. The indexer automatically adjusts concurrency based on current load and performance. Once caught up to network tip, you can manually set the max concurrency to a lower value. Mysten-internal indexers are capped at 20.

Config TOML| Type| Description| Pipelines| Backfill time| Data retention| Start checkpoint  
---|---|---|---|---|---|---  
`events.toml`| **Prunable**|  Lightweight event tables.| 

  * `ev_emit_mod`
  * `ev_struct_inst`

| 1-2 days| Configurable (for example, 30 or 90 days)| Based on retention period  
Click to open`events.toml`[examples/prod-config/indexer/events.toml](<https://github.com/MystenLabs/sui/blob/main/examples/prod-config/indexer/events.toml>)
[code]
    [pruner]  
    retention = 31104000  
      
    [pipeline.ev_emit_mod.pruner]  
      
    [pipeline.ev_struct_inst.pruner]  
    
[/code]  
  
`obj_versions.toml`| **Unprunable**|  Object versions table containing complete object version to checkpoint mappings.| `obj_versions`| 10-14 days| Must retain all data| Genesis (checkpoint 0)  
Click to open`obj_versions.toml`[examples/prod-config/indexer/obj_versions.toml](<https://github.com/MystenLabs/sui/blob/main/examples/prod-config/indexer/obj_versions.toml>)
[code]
    [ingestion]  
    ingest-concurrency = { kind = "fixed", value = 20 }  
      
    [committer]  
    write-concurrency = 10  
      
    # obj_versions pipeline pruning not yet supported  
      
    [pipeline.obj_versions]  
    
[/code]  
  
`tx_affected_addresses.toml`| **Prunable**|  Midweight transaction table.| `tx_affected_addresses`| 1-2 days| Configurable (for example, 30 or 90 days)| Based on retention period  
Click to open`tx_affected_addresses.toml`[examples/prod-config/indexer/tx_affected_addresses.toml](<https://github.com/MystenLabs/sui/blob/main/examples/prod-config/indexer/tx_affected_addresses.toml>)
[code]
    [ingestion]  
    ingest-concurrency = { kind = "fixed", value = 20 }  
      
    [committer]  
    write-concurrency = 10  
      
    [pruner]  
    retention = 31104000  
      
    [pipeline.tx_affected_addresses.pruner]  
    
[/code]  
  
`tx_affected_objects.toml`| **Prunable**|  Midweight transaction table.| `tx_affected_objects`| 1-2 days| Configurable (for example, 30 or 90 days)| Based on retention period  
Click to open`tx_affected_objects.toml`[examples/prod-config/indexer/tx_affected_objects.toml](<https://github.com/MystenLabs/sui/blob/main/examples/prod-config/indexer/tx_affected_objects.toml>)
[code]
    [committer]  
    write-concurrency = 20  
      
    [pruner]  
    retention = 31104000  
      
    [pipeline.tx_affected_objects.pruner]  
    
[/code]  
  
`tx_calls.toml`| **Prunable**|  Midweight transaction table.| `tx_calls`| 1-2 days| Configurable (for example, 30 or 90 days)| Based on retention period  
Click to open`tx_calls.toml`[examples/prod-config/indexer/tx_calls.toml](<https://github.com/MystenLabs/sui/blob/main/examples/prod-config/indexer/tx_calls.toml>)
[code]
    [committer]  
    write-concurrency = 10  
      
    [pruner]  
    retention = 31104000  
      
    [pipeline.tx_calls.pruner]  
    
[/code]  
  
`tx_kinds.toml`| **Prunable**|  Midweight transaction table.| `tx_kinds`| 1-2 days| Configurable (for example, 30 or 90 days)| Based on retention period  
Click to open`tx_kinds.toml`[examples/prod-config/indexer/tx_kinds.toml](<https://github.com/MystenLabs/sui/blob/main/examples/prod-config/indexer/tx_kinds.toml>)
[code]
    [pruner]  
    retention = 31104000  
      
    [pipeline.tx_kinds.pruner]  
    
[/code]  
  
`unpruned.toml`| **Unprunable**|  Foundational reference data that other queries depend on.| 

  * `cp_sequence_numbers`
  * `kv_epoch_ends`
  * `kv_epoch_starts`
  * `kv_feature_flags`
  * `kv_packages`
  * `kv_protocol_configs`
  * `sum_displays`
  * `tx_balance_changes`
  * `tx_digests`

| 2-4 days| Must retain all data| Genesis (checkpoint 0)  
Click to open`unpruned.toml`[examples/prod-config/indexer/unpruned.toml](<https://github.com/MystenLabs/sui/blob/main/examples/prod-config/indexer/unpruned.toml>)
[code]
    [ingestion]  
    ingest-concurrency = { kind = "fixed", value = 20 }  
      
    [pipeline.cp_sequence_numbers]  
      
    [pipeline.kv_epoch_ends]  
      
    [pipeline.kv_epoch_starts]  
      
    [pipeline.kv_feature_flags]  
      
    [pipeline.kv_packages]  
      
    [pipeline.kv_protocol_configs]  
      
    [pipeline.sum_displays]  
      
    [pipeline.tx_balance_changes]  
      
    [pipeline.tx_digests]  
    
[/code]  
  
## Consistent store setup​

All consistent store pipelines run in the same instance based on a single configuration file. Like the indexer, the pipelines run in parallel and throughput is limited by the slowest pipeline.

#### Hardware requirements​

  * **CPU:** 8 cores
  * **Memory:** 32GB


### Restore command​

When you add a new pipeline to the consistent store, the service backfills from genesis by default. To avoid this, use the `restore` command to construct the consistent state at the latest epoch, or a specific epoch with the `--epoch` flag.
[code] 
    $ sui-indexer-alt-consistent-store restore \  
        --azure <AZURE_BUCKET> \  
        --database-path <DATABASE_PATH> \  
        --gcs <GCS_BUCKET> \  
        --http <HTTP_ENDPOINT> \  
        --object-file-concurrency <OBJECT_FILE_CONCURRENCY> \  
        --pipeline <PIPELINE_NAME> \  
        --remote-store-url <REMOTE_STORE_URL> \  
        --s3 <S3_BUCKET>  
    
[/code]

CLI parameter| Description  
---|---  
`<AZURE_BUCKET>` *| Name or URL of Azure bucket containing [managed snapshots](<https://docs.sui.io/operators/snapshots#mysten-labs-managed-snapshots>).  
`<DATABASE_PATH>`| Path to RocksDB database.  
`<GCS_ACCOUNT>` *| Name or URL of GCS bucket containing [managed snapshots](<https://docs.sui.io/operators/snapshots#mysten-labs-managed-snapshots>).  
`<HTTP_ENDPOINT>` *| URL of formal snapshot API.  
`<OBJECT_FILE_CONCURRENCY>`| Path to indexer configuration file.  
`<PIPELINE_NAME>`| Name of pipeline to restore. Can be set multiple times; once per pipeline.  
`<REMOTE_STORE_URL>`| URL of a checkpoint bucket to index from, one of multiple possible [data sources](</develop/accessing-data/custom-indexer/custom-indexers#data-sources>).  
`<S3_BUCKET>` *| Name or URL of AWS S3 bucket containing [managed snapshots](<https://docs.sui.io/operators/snapshots#mysten-labs-managed-snapshots>).  
  
* Must specify one of `<AZURE_BUCKET>`, `<GCS_ACCOUNT>`, `<HTTP_ENDPOINT>`, or `<S3_BUCKET>`.

Example:
[code] 
    $ sui-indexer-alt-consistent-store restore \  
        --database-path /path/to/rocksdb \  
        --http https://formal-snapshot.mainnet.sui.io \  
        --object-file-concurrency 5 \  
        --pipeline balances \  
        --pipeline object_by_owner \  
        --pipeline object_by_type \  
        --remote-store-url https://checkpoints.mainnet.sui.io  
    
[/code]

`https://checkpoints.mainnet.sui.io` and `https://checkpoints.testnet.sui.io` retain only the most recent 30 days of checkpoints. For full-retention backfills older than 30 days, use `gs://mysten-mainnet-checkpoints-use4` through `--remote-store-gcs mysten-mainnet-checkpoints-use4` for Mainnet or `gs://mysten-testnet-checkpoints-use4` through `--remote-store-gcs mysten-testnet-checkpoints-use4` for Testnet instead of `--remote-store-url`.

### Run command​

Run a consistent store instance using this command for the configuration file that follows:
[code] 
    $ sui-indexer-alt-consistent-store run \  
        --config <CONFIG_FILE> \  
        --database-path <DATABASE_PATH> \  
        --remote-store-url <REMOTE_STORE_URL>  
    
[/code]

CLI param| Description  
---|---  
`<CONFIG_FILE>`| Path to consistent store configuration file.  
`<DATABASE_PATH>`| Path to RocksDB database.  
`<REMOTE_STORE_URL>`| URL of a checkpoint bucket to index from, one of multiple possible [data sources](</develop/accessing-data/custom-indexer/custom-indexers#data-sources>). Public HTTPS checkpoint endpoints retain only the most recent 30 days of checkpoints.  
  
Example:
[code] 
    $ sui-indexer-alt-consistent-store run \  
        --config consistent-store.toml \  
        --database-path /path/to/rocksdb \  
        --remote-store-url https://checkpoints.mainnet.sui.io  
    
[/code]

For full-retention backfill, use `gs://mysten-mainnet-checkpoints-use4` through `--remote-store-gcs mysten-mainnet-checkpoints-use4` for Mainnet or `gs://mysten-testnet-checkpoints-use4` through `--remote-store-gcs mysten-testnet-checkpoints-use4` for Testnet rather than `--remote-store-url`.

### Run config recommendations​

Config TOML| Description| Pipelines| Backfill time| Data retention  
---|---|---|---|---  
`consistent-store.toml`| Consistent store API configuration and event tables.| 

  * `balances`
  * `object-by-owner`
  * `object-by-type`

| 1-2 hours| Must retain all data  
  
Click to open`consistent-store.toml`

[examples/prod-config/consistent_store.toml](<https://github.com/MystenLabs/sui/blob/main/examples/prod-config/consistent_store.toml>)
[code]
    [ingestion]  
    ingest-concurrency = { kind = "fixed", value = 20 }  
      
    [pipeline.address-balances]  
      
    [pipeline.balances]  
      
    [pipeline.object-by-owner]  
      
    [pipeline.object-by-type]  
    
[/code]

## GraphQL RPC server setup​

GraphQL RPC server reads data from the general-purpose indexer's database (Postgres), the consistent store, and the [archival service](</develop/accessing-data/archival-store>).

  * Prerequisites


  * Ensure that **all unprunable indexer pipelines** (`obj_versions.toml` and `unpruned.toml`) have fully caught up to the network tip before starting the GraphQL RPC server. The GraphQL service only operates normally once these pipelines are complete.


#### Hardware requirements​

  * **CPU:** 2 cores per instance
  * **Memory:** 4GB per instance


Scale the number of nodes based on the desired read throughput requirements of your client applications.

### GraphQL RPC server dependencies​

The GraphQL RPC server relies on multiple backend services to fulfill different types of queries:

  * Archival service (`--ledger-grpc-url`) provides historical data for most queries involving checkpoints, objects, and transactions.
  * Consistent store (`--consistent-store-url`) serves live data for queries related to current object and balance ownership.
  * Postgres database (`--database-url`) is the primary store for most queries, except for direct object and transaction lookups handled by the Archival service.
  * Fullnode RPC (`--fullnode-rpc-url`) powers transaction simulation and execution.


Set the appropriate service URLs in your run command based on the query types your GraphQL RPC server needs to support.

### Run `sui-indexer-alt-graphql`​

info

If you use the Sui Foundation-hosted public good archival service on Testnet or Mainnet, you might encounter performance issues. The team plans to address these before the GraphQL RPC and Archival Service reach general availability.

Use the following command to run a GraphQL RPC server node:
[code] 
    sui-indexer-alt-graphql rpc \  
        --config <PATH_TO_GRAPHQL_CONFIG_FILE> \  
        --indexer-config <PATH_TO_INDEXER_CONFIG_FILE_1> \  
        --indexer-config <PATH_TO_INDEXER_CONFIG_FILE_2> \  
        --indexer-config <PATH_TO_INDEXER_CONFIG_FILE_3> \  
        --ledger-grpc-url <LEDGER_GRPC_URL> \  
        --consistent-store-url <CONSISTENT_STORE_URL> \  
        --database-url <DATABASE_URL> \  
        --fullnode-rpc-url <FULLNODE_RPC_URL>  
    
[/code]

Multiple `--indexer-config` parameters can be provided, one for each general-purpose indexer instance.

CLI parameter| Description  
---|---  
`CONFIG_FILE`| Path to the optional GraphQL RPC server configuration file  
`INDEXER_CONFIG_FILE`| Path to general-purpose indexer configuration file; can be set multiple times for different pipelines  
`LEDGER_GRPC_URL`| URL to Archival service's `LedgerService` gRPC API  
`CONSISTENT_STORE_URL`| URL to Consistent store API  
`DATABASE_URL`| Postgres database connection string  
`FULLNODE_RPC_URL`| URL to full node RPC  
  
Example:
[code] 
    sui-indexer-alt-graphql rpc \  
        --config graphql.toml \  
        --indexer-config events.toml \  
        --indexer-config obj_versions.toml \  
        --indexer-config tx_affected_addresses.toml \  
        --indexer-config tx_affected_objects.toml \  
        --indexer-config tx_calls.toml \  
        --indexer-config tx_kinds.toml \  
        --indexer-config unpruned.toml \  
        --ledger-grpc-url https://archive.mainnet.sui.io:443 \  
        --consistent-store-url https://localhost:7001 \  
        --database-url postgres://username:password@localhost:5432/database \  
        --fullnode-rpc-url https://localhost:9000  
    
[/code]

### Generating configuration​

You can run the GraphQL RPC server without a configuration file, which uses default values. To customize settings, generate a configuration file using the following command and edit it as needed:
[code] 
      
    sui-indexer-alt-graphql generate-config > <PATH_TO_GRAPHQL_CONFIG_FILE>  
    
[/code]

This produces output similar to the following:

Click to open`graphql.toml`

[examples/prod-config/graphql.toml](<https://github.com/MystenLabs/sui/blob/main/examples/prod-config/graphql.toml>)
[code]
    [limits]  
    mutation-timeout-ms = 74000  
    query-timeout-ms = 40000  
    max-query-depth = 20  
    max-query-nodes = 300  
    max-output-nodes = 1000000  
    max-tx-payload-size = 174763  
    max-query-payload-size = 5000  
    default-page-size = 20  
    max-page-size = 50  
    max-multi-get-size = 200  
    page-size-override-fx-object-changes = 1024  
    page-size-override-packages = 200  
    max-type-argument-depth = 16  
    max-type-argument-width = 32  
    max-type-nodes = 256  
    max-move-value-depth = 128  
    max-move-value-bound = 1048576  
    max-display-field-depth = 10  
    max-display-output-size = 1048576  
    max-disassembled-module-size = 1048576  
      
    [health]  
    max-checkpoint-lag-ms = 300000  
      
    [name-service]  
    package-address = "0xd22b24490e0bae52676651b4f56660a5ff8022a2576e0089f79b3c88d44e08f0"  
    registry-id = "0xe64cd9db9f829c6cc405d9790bd71567ae07259855f4fba6f02c84f52298c106"  
    reverse-registry-id = "0x2fd099e17a292d2bc541df474f9fafa595653848cbabb2d7a4656ec786a1969f"  
      
    [watermark]  
    watermark-polling-interval-ms = 500  
      
    [zklogin]  
    env = "Prod"  
    max-epoch-upper-bound-delta = 30  
    
[/code]

## Indexer/GraphQL Postgres-compatible database setup​

Both the indexer and GraphQL server require a Postgres-compatible database shared between them.

These GraphQL request throughputs were tested against the following recommended specs:

  * 500 requests per second when the indexer is backfilling from genesis or running a restore
  * 1000 requests per second when the indexer is indexing from the network tip (~4.25 checkpoints per second)


### AlloyDB Omni​

AlloyDB Omni recommends 8GB RAM per vCPU. See the [AlloyDB Omni hardware requirements](<https://docs.cloud.google.com/alloydb/omni/containers/current/docs/plan-installation#hardware>) for details. Allocating less than this results in the database closing indexer and GraphQL connections during load testing.

#### Hardware requirements​

  * **CPU:** 6 cores
  * **Memory:** 48GB


### Vanilla Postgres​

You can also use a standard Postgres installation.

#### Hardware requirements​

  * **CPU:** 6 cores
  * **Memory:** 48GB


## Adding a new pipeline​

Adding a new pipeline to an existing indexer currently requires these steps:

  1. Start a new pipeline in its own indexer instance, optionally with the `--first-checkpoint <checkpoint>` flag set if you want to start from a checkpoint after genesis.
     * The `--first-checkpoint` flag is only respected if no watermark record exists for the pipeline (the pipeline has not run before). You must manually remove the watermark record if you want to run the pipeline with a different value of `--first-checkpoint`, or it is ignored.
  2. After the new pipeline catches up to the tip of the network, you can optionally merge it into another indexer instance.


## Re-indexing from a different checkpoint​

Once the pipeline starts indexing data and the indexer starts recording watermarks, future runs of the pipeline ignore the `--first-checkpoint` flag and always resume from the last recorded checkpoint.

To restart and index from a different initial checkpoint, delete the watermark record for that pipeline. Delete the existing data for that pipeline as well to avoid any data inconsistencies.

Use the following template for the general-purpose indexer to write to Postgres.
[code] 
    BEGIN;  
      
    -- One statement per pipeline to re-index  
    TRUNCATE TABLE ev_emit_mod;  
      
      
    DELETE FROM watermarks  
    WHERE pipeline IN (  
    -- List all pipelines to re-index  
      'ev_emit_mod'  
    );  
      
    SELECT * FROM WATERMARKS; -- Verify that the watermark record(s) have been deleted  
      
    -- Verify that the tables have been cleared  
      
    COMMIT;  
    
[/code]

## Reducing indexer pipeline table and index bloat​

Bloat occurs when dead rows from deletes accumulate faster than autovacuum can reclaim them. This happens in two cases:

  * You enable pruning on a previously unpruned pipeline.
  * You reduce the retention period on an already-pruned pipeline.


Mysten Labs uses the following autovacuum settings for a 32-vCPU, 256 GiB Postgres instance. Adjust these proportionally for your setup:

Parameter| Value  
---|---  
`autovacuum_max_workers`| `8`  
`autovacuum_vacuum_cost_limit`| `8000`  
`autovacuum_vacuum_scale_factor`| `0.01`  
`maintenance_work_mem`| `13GB`  
`max_parallel_maintenance_workers`| `4`  
  
While autovacuum enables reusing dead rows for future inserts, it does not return reclaimed disk space to the operating system. The on-disk footprint remains until you compact tables and indexes using one of the following tools:

Tool| Type| `ACCESS EXCLUSIVE` locking| Schedulable| Link  
---|---|---|---|---  
`VACUUM FULL`| Built-in| Entire operation| No| [PostgreSQL VACUUM documentation](<https://www.postgresql.org/docs/current/sql-vacuum.html>)  
pg_repack| Extension| Briefly during initial and final step| No| [pg_repack documentation](<https://reorg.github.io/pg_repack/>)  
pg_squeeze| Extension| Briefly during final step| Yes| [pg_squeeze on GitHub](<https://github.com/cybertec-postgresql/pg_squeeze>)  
  
[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/operators/data-management/indexer-stack-setup.mdx>)

[PreviousData Management](</operators/data-management/managing-data>)[NextRunning a Remote Store](</operators/data-management/remote-store-setup>)

  * Indexer setup
    * Run `sui-indexer-alt`
    * Run config recommendations
  * Consistent store setup
    * Restore command
    * Run command
    * Run config recommendations
  * GraphQL RPC server setup
    * GraphQL RPC server dependencies
    * Run `sui-indexer-alt-graphql`
    * Generating configuration
  * Indexer/GraphQL Postgres-compatible database setup
    * AlloyDB Omni
    * Vanilla Postgres
  * Adding a new pipeline
  * Re-indexing from a different checkpoint
  * Reducing indexer pipeline table and index bloat
