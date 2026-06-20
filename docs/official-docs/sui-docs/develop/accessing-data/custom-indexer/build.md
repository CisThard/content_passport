<!-- Source: https://docs.sui.io/develop/accessing-data/custom-indexer/build -->

* [](</>)
  * [Accessing Data](</develop/accessing-data/>)
  * [Custom Indexing Framework](</develop/accessing-data/custom-indexer/>)
  * Build a Custom Indexer


On this page

# Build a Custom Indexer

This guide provides a practical example for building a custom indexer. Refer to [Custom Indexing Framework](</develop/accessing-data/custom-indexer/custom-indexers>) and [Indexer Pipeline Architecture](</develop/accessing-data/custom-indexer/pipeline-architecture>) for a conceptual overview of the indexer framework.

To build a complete custom indexer, use the `sui-indexer-alt-framework`. The steps that follow demonstrate how to create a sequential pipeline that extracts transaction digests from Sui checkpoints and stores them in a local PostgreSQL database. PostgreSQL is the default example backend, not a requirement of the framework. You can find the [source code for the framework](<https://github.com/MystenLabs/sui/tree/main/crates/sui-indexer-alt-framework>) in the Sui repo on GitHub.

tip

While this example uses PostgreSQL with [Diesel](<https://diesel.rs/guides/getting-started>) (a popular Rust ORM and query builder) for minimalism and out-of-the-box support, the `sui-indexer-alt-framework` is designed for flexible storage. You can use different databases (such as [MongoDB](<https://www.mongodb.com/>), [CouchDB](<https://couchdb.apache.org/>), or similar) or utilize other database clients if you prefer not to use Diesel. To achieve this, implement the framework's `Store` and `Connection` traits and define your database write logic directly within your `Handler::commit()` method.

  * Prerequisites


  * [Rust and Cargo](<https://rustup.rs/>)
  * [PostgreSQL](<https://www.postgresql.org/download/>)
  * [Diesel CLI](<https://diesel.rs/guides/getting-started#installing-diesel-cli>)


Click to open

Check installation

If you're unsure whether your system has the necessary software properly installed, you can verify installation with the following commands.
[code]
    $ psql --version  
    $ diesel --version  
    
[/code]

The following steps show how to create an indexer that:

  * Connects to a Sui checkpoint source: Uses gRPC streaming from a full node as the primary source, with the durable GCS checkpoint bucket as the recommended production fallback. The public HTTPS endpoint at <https://checkpoints.testnet.sui.io> is available as a convenience for recent data only (most recent 30 days).
  * Processes checkpoints: Streams checkpoint data continuously.
  * Extracts transaction data: Pulls transaction digests from each checkpoint.
  * Stores in local PostgreSQL: Commits data to a local PostgreSQL database as the default example storage layer. For other storage systems, implement the framework's `Store` and `Connection` traits.
  * Implements sequential pipeline: Uses in-order processing with batching for optimal consistency and performance.


In the end, you have a working indexer that demonstrates all core framework concepts and can serve as a foundation for more complex custom indexers.

info

Sui provides checkpoint data through multiple sources:

  * **GCS buckets (recommended for production and backfill):** `gs://mysten-testnet-checkpoints-use4` for Testnet or `gs://mysten-mainnet-checkpoints-use4` for Mainnet. These buckets have full checkpoint retention and are Requester Pays enabled, so configure GCS credentials and a billing project before using them.
  * **HTTPS endpoints (recent data only, most recent 30 days):** `https://checkpoints.testnet.sui.io` for Testnet or `https://checkpoints.mainnet.sui.io` for Mainnet.


## Step 1: Project setup​

First, open your console to the directory you want to store your indexer project. Use the `cargo new` command to create a new Rust project and then navigate to its directory.
[code] 
    $ cargo new simple-sui-indexer  
    $ cd simple-sui-indexer  
    
[/code]

## Step 2: Configure dependencies​

Replace your `Cargo.toml` code with the following configuration and save.

[examples/rust/basic-sui-indexer/Cargo.toml](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/Cargo.toml>)
[code]
    [package]  
    name = "basic-sui-indexer"  
    version = "0.1.0"  
    edition = "2024"  
      
    [dependencies]  
    # Core framework dependencies  
    sui-indexer-alt-framework = { git = "https://github.com/MystenLabs/sui.git", branch = "testnet" }  
      
    # Async runtime  
    tokio = { version = "1.0", features = ["full"] }  
      
    # Error handling  
    anyhow = "1.0"  
      
    # Diesel PostgreSQL  
    diesel = { version = "2.0", features = ["postgres", "r2d2"] }  
    diesel-async = { version = "0.5", features = ["bb8", "postgres", "async-connection-wrapper"] }  
    diesel_migrations = "2.0"  
      
    # Async traits  
    async-trait = "0.1"  
      
    # URL parsing  
    url = "2.0"  
      
    # Use .env file  
    dotenvy = "0.15"  
      
    # Command line parsing  
    clap = { version = "4.0", features = ["derive"] }  
    
[/code]

The manifest now includes the following dependencies:

  * `sui-indexer-alt-framework`: Core framework providing pipeline infrastructure.
  * `diesel/diesel-async`: Type-safe database ORM with asynchronous support.
  * `tokio`: Async runtime required by the framework.
  * `clap`: Command-line argument parsing for configuration.
  * `anyhow`: Error handling and async-trait for trait implementations.
  * `dotenvy`: Ingest `.env` file that stores your PostgreSQL URL.


## Step 3: Create database​

Before configuring migrations, create and verify your local PostgreSQL database:
[code] 
    $ createdb sui_indexer  
    
[/code]

Get your connection details:
[code] 
    $ psql sui_indexer -c "\conninfo"  
    
[/code]

If successful, your console should display a message similar to the following:
[code] 
    You are connected to database "sui_indexer" as user "username" via socket in "/tmp" at port "5432".  
    
[/code]

If you receive a `createdb` error similar to
[code] 
    createdb: error: connection to server on socket "/tmp/.s.PGSQL.5432" failed: FATAL:  role "username" does not exist  
    
[/code]

This means you need to create the user (replace `username` with the name provided in your error message).
[code] 
    $ sudo -u postgres createuser --superuser username  
    
[/code]

Enter the password for your pgAdmin account when prompted, then try the `createdb` command again.

You can now set a variable to your database URL as it's used in following commands. Make sure to change `username` to your actual username.
[code] 
    $ PSQL_URL=postgres://username@localhost:5432/sui_indexer  
    
[/code]

You can now test your connection with the following command:
[code] 
    $ psql $PSQL_URL -c "SELECT 'Connected';"  
    
[/code]

If successful, your console or terminal should respond with a message similar to the following:
[code] 
    ?column?  
    -----------  
     Connected  
    (1 row)  
    
[/code]

## Step 4: Database setup​

Before you start coding, make sure you set up a local PostgreSQL database from the previous step. This is required for the indexer to store the extracted transaction data.

The following database setup steps have you:

  1. Create a database table to store the data.
  2. Use Diesel to manage the process.
  3. Generate Rust code that maps to the database table.


### Step 4.1: Configure Diesel​

First, create a `diesel.toml` file (within the same folder as `cargo.toml`) to configure database migrations.
[code] 
    $ touch diesel.toml  
    
[/code]

Update and save the file with the following code:

[examples/rust/basic-sui-indexer/diesel.toml](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/diesel.toml>)
[code]
    [print_schema]  
    file = "src/schema.rs"  
      
    [migrations_directory]  
    dir = "migrations"  
    
[/code]

### Step 4.2: Create database table using Diesel migrations​

Diesel migrations are a way of creating and managing database tables using SQL files. Each migration has two files:

  * `up.sql`: Creates and changes the table.
  * `down.sql`: Removes and undoes the changes.


Use the `diesel setup` command to create the necessary directory structure, passing your database URL with the `--database-url` argument.
[code] 
    $ diesel setup --database-url $PSQL_URL  
    
[/code]

Use the `diesel migration` command at the root of your project to then generate the migration files.
[code] 
    $ diesel migration generate transaction_digests  
    
[/code]

You should now have a `migrations` folder in your project. There should be a subdirectory in this folder with the name format `YYYY-MM-DD-HHMMSS_transaction_digests`. This folder should contain the `up.sql` and `down.sql` files.

Open `up.sql` and replace its contents with the following code (using the actual folder name):

[examples/rust/basic-sui-indexer/migrations/YYYY-MM-DD-HHMMSS_transaction_digests/up.sql](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/migrations/YYYY-MM-DD-HHMMSS_transaction_digests/up.sql>)
[code]
    CREATE TABLE IF NOT EXISTS transaction_digests (  
        tx_digest TEXT PRIMARY KEY,  
        checkpoint_sequence_number BIGINT NOT NULL  
    );  
    
[/code]

tip

This example uses the `TEXT` data type for `tx_digest`, but best practice for a production indexer is to use the `BYTEA` data type.

The `TEXT` type is used to make the transaction digest easily readable and directly usable with external tools. Digests are `Base58` encoded, and because PostgreSQL cannot natively display `BYTEA` data in this format, storing it as `TEXT` allows you to copy the digest from a query and paste it into an explorer like [SuiScan](<https://suiscan.xyz/testnet/home>).

For a production environment, however, `BYTEA` is strongly recommended. It offers superior storage and query efficiency by storing the raw byte representation, which is more compact and significantly faster for comparisons than a string. Refer to [Binary data performance in PostgreSQL](<https://www.cybertec-postgresql.com/en/binary-data-performance-in-postgresql/>) on the CYBERTEC website for more information.

Save `up.sql`, then open `down.sql` to edit. Replace the contents of the file with the following code and save it:

[examples/rust/basic-sui-indexer/migrations/YYYY-MM-DD-HHMMSS_transaction_digests/down.sql](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/migrations/YYYY-MM-DD-HHMMSS_transaction_digests/down.sql>)
[code]
    DROP TABLE IF EXISTS transaction_digests;  
    
[/code]

### Step 4.3: Apply migration and generate Rust schema​

From the root of your project, use the `diesel migration` command to create tables.
[code] 
    $ diesel migration run --database-url $PSQL_URL  
    
[/code]

Then use the `diesel print-schema` command to generate the `schema.rs` file from the actual database.
[code] 
    $ diesel print-schema --database-url $PSQL_URL > src/schema.rs  
    
[/code]

Your `src/schema.rs` file should now look like the following:

[examples/rust/basic-sui-indexer/src/schema.rs](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/src/schema.rs>)
[code]
    // @generated automatically by Diesel CLI.  
      
    diesel::table! {  
        transaction_digests (tx_digest) {  
            tx_digest -> Text,  
            checkpoint_sequence_number -> Int8,  
        }  
    }  
    
[/code]

After running the previous commands, your project is set up for the next steps:

  * PostgreSQL now has a `transaction_digests` table with the defined columns.

  * `src/schema.rs` contains automatically generated Rust code that represents this table structure.

  * You can now write type-safe Rust code that talks to this specific table.


The Diesel's migration system evolves the database schema over time in a structured and version-controlled way. For a complete walkthrough, see the official Diesel [Getting Started guide](<https://diesel.rs/guides/getting-started>).

## Step 5: Create data structure​

To simplify writes to Diesel, you can define a struct that represents a record on the `transaction_digests` table.

[examples/rust/basic-sui-indexer/src/models.rs](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/src/models.rs>)
[code]
    use diesel::prelude::*;  
    use sui_indexer_alt_framework::FieldCount;  
    use crate::schema::transaction_digests;  
      
    #[derive(Insertable, Debug, Clone, FieldCount)]  
    #[diesel(table_name = transaction_digests)]  
    pub struct StoredTransactionDigest {  
        pub tx_digest: String,  
        pub checkpoint_sequence_number: i64,  
    }  
    
[/code]

Key annotations:

  * `FieldCount`: Required by `sui-indexer-alt-framework` for memory optimization and batch processing efficiency. It is used to limit the max size of a batch so that we don't exceed the postgres limit on the number of bind parameters a single SQL statement can have.
  * `diesel(table_name = transaction_digests)`: Maps this Rust struct to the `transaction_digests` table, whose schema is generated in a previous step.
  * `Insertable`: Allows this struct to be inserted into the database using Diesel.


## Step 6: Define the `Handler` struct in `handler.rs`​

Create a `handlers.rs` file in your `src` directory.
[code] 
    $ touch ./src/handlers.rs  
    
[/code]

Open the file and define a concrete struct to implement the `Processor` and `Handler` traits:

[examples/rust/basic-sui-indexer/src/handlers.rs](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/src/handlers.rs>)
[code]
    pub struct TransactionDigestHandler;  
    #[async_trait::async_trait]  
    impl Processor for TransactionDigestHandler {  
        const NAME: &'static str = "transaction_digest_handler";  
      
        type Value = StoredTransactionDigest;  
      
        async fn process(&self, checkpoint: &Arc<Checkpoint>) -> Result<Vec<Self::Value>> {  
            let checkpoint_seq = checkpoint.summary.sequence_number as i64;  
      
            let digests = checkpoint  
                .transactions  
                .iter()  
                .map(|tx| StoredTransactionDigest {  
                    tx_digest: tx.transaction.digest().to_string(),  
                    checkpoint_sequence_number: checkpoint_seq,  
                })  
                .collect();  
      
            Ok(digests)  
        }  
    }  
    
[/code]

Save the file but keep it open as the next steps add to its code.

## Step 7: Implement the `Processor`​

The `Processor` trait defines how to extract and transform data from checkpoints. The resulting data is then passed to `Handler::commit`.

Add the necessary dependencies at the top of the file.

[examples/rust/basic-sui-indexer/src/handlers.rs](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/src/handlers.rs>)
[code]
    use anyhow::Result;  
    use std::sync::Arc;  
    use sui_indexer_alt_framework::pipeline::Processor;  
    use sui_indexer_alt_framework::types::full_checkpoint_content::Checkpoint;  
      
    use crate::models::StoredTransactionDigest;  
    use crate::schema::transaction_digests::dsl::*;  
    
[/code]

After the `TransactionDigestHandler` struct, add the `Processor` code:

[examples/rust/basic-sui-indexer/src/handlers.rs](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/src/handlers.rs>)
[code]
    #[async_trait::async_trait]  
    impl Processor for TransactionDigestHandler {  
        const NAME: &'static str = "transaction_digest_handler";  
      
        type Value = StoredTransactionDigest;  
      
        async fn process(&self, checkpoint: &Arc<Checkpoint>) -> Result<Vec<Self::Value>> {  
            let checkpoint_seq = checkpoint.summary.sequence_number as i64;  
      
            let digests = checkpoint  
                .transactions  
                .iter()  
                .map(|tx| StoredTransactionDigest {  
                    tx_digest: tx.transaction.digest().to_string(),  
                    checkpoint_sequence_number: checkpoint_seq,  
                })  
                .collect();  
      
            Ok(digests)  
        }  
    }  
    
[/code]

Key concepts:

  * `NAME`: Unique identifier for this processor used in monitoring and logging.
  * `type Value`: Defines what data flows through the pipeline, which ensures type safety.
  * `process()`: Core logic that transforms checkpoint data into your custom data structure.


Save the `handlers.rs` file.

Click to open

Processor trait definition

[crates/sui-indexer-alt-framework/src/pipeline/processor.rs](<https://github.com/MystenLabs/sui/blob/main/crates/sui-indexer-alt-framework/src/pipeline/processor.rs>)
[code]
    /// Implementors of this trait are responsible for transforming checkpoint into rows for their  
    /// table.  
    #[async_trait]  
    pub trait Processor: Send + Sync + 'static {  
        /// Used to identify the pipeline in logs and metrics.  
        const NAME: &'static str;  
      
        /// The type of value being inserted by the handler.  
        type Value: Send + Sync + 'static;  
      
        /// The processing logic for turning a checkpoint into rows of the table.  
        ///  
        /// All errors returned from this method are treated as transient and will be retried  
        /// indefinitely with exponential backoff.  
        ///  
        /// If you encounter a permanent error that will never succeed on retry (e.g., invalid data  
        /// format, unsupported protocol version), you should panic! This stops the indexer and alerts  
        /// operators that manual intervention is required. Do not return permanent errors as they will  
        /// cause infinite retries and block the pipeline.  
        ///  
        /// For transient errors (e.g., network issues, rate limiting), simply return the error and  
        /// let the framework retry automatically.  
        async fn process(&self, checkpoint: &Arc<Checkpoint>) -> anyhow::Result<Vec<Self::Value>>;  
    }  
    
[/code]

## Step 8: Implement the `Handler`​

The `Handler` trait defines how to commit data to the database. Append the `Handler` dependencies to bottom of the dependency list you created in the previous step.

[examples/rust/basic-sui-indexer/src/handlers.rs](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/src/handlers.rs>)
[code]
    use diesel_async::RunQueryDsl;  
    use sui_indexer_alt_framework::{  
        pipeline::sequential::Handler,  
        postgres::{Connection, Db},  
    };  
    
[/code]

Add the logic for `Handler` after the `Processor` code. The complete code is available at the end of this step.

[examples/rust/basic-sui-indexer/src/handlers.rs](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/src/handlers.rs>)
[code]
    #[async_trait::async_trait]  
    impl Handler for TransactionDigestHandler {  
        type Store = Db;  
        type Batch = Vec<Self::Value>;  
      
        fn batch(&self, batch: &mut Self::Batch, values: std::vec::IntoIter<Self::Value>) {  
            batch.extend(values);  
        }  
      
        async fn commit<'a>(&self, batch: &Self::Batch, conn: &mut Connection<'a>) -> Result<usize> {  
            let inserted = diesel::insert_into(transaction_digests)  
                .values(batch)  
                .on_conflict(tx_digest)  
                .do_nothing()  
                .execute(conn)  
                .await?;  
      
            Ok(inserted)  
        }  
    }  
    
[/code]

How sequential batching works:

  1. `process()` returns values for each checkpoint.
  2. `batch()` accumulates values from multiple checkpoints.
  3. `commit()` writes the batch when framework reaches limits (`H::MAX_BATCH_CHECKPOINTS`).


[crates/sui-indexer-alt-framework/src/pipeline/sequential/collector.rs](<https://github.com/MystenLabs/sui/blob/main/crates/sui-indexer-alt-framework/src/pipeline/sequential/collector.rs>)
[code]
    while batch_checkpoints < max_batch_checkpoints {  
        let Some(entry) = pending.first_entry() else {  
            break;  
        };  
      
        match next_checkpoint.cmp(entry.key()) {  
            // Next pending checkpoint is from the future.  
            Ordering::Less => break,  
      
            // This is the next checkpoint -- include it.  
            Ordering::Equal => {  
                let indexed = entry.remove();  
                batch_rows += indexed.len();  
                batch_checkpoints += 1;  
                handler.batch(&mut batch, indexed.values.into_iter());  
                watermark = Some(indexed.watermark);  
                next_checkpoint += 1;  
            }  
      
            // Next pending checkpoint is in the past, ignore it to avoid double  
            // writes.  
            Ordering::Greater => {  
                metrics  
                    .total_watermarks_out_of_order  
                    .with_label_values(&[H::NAME])  
                    .inc();  
      
                let indexed = entry.remove();  
                pending_rows -= indexed.len();  
            }  
        }  
    }  
    
[/code]

tip

You can override the default batch limits by implementing constants in your `Handler`.

The `handlers.rs` file is now complete. Save the file.

Click to open

Complete `handler.rs` file

[examples/rust/basic-sui-indexer/src/handlers.rs](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/src/handlers.rs>)
[code]
    use anyhow::Result;  
    use std::sync::Arc;  
    use sui_indexer_alt_framework::pipeline::Processor;  
    use sui_indexer_alt_framework::types::full_checkpoint_content::Checkpoint;  
      
    use crate::models::StoredTransactionDigest;  
    use crate::schema::transaction_digests::dsl::*;  
    use diesel_async::RunQueryDsl;  
    use sui_indexer_alt_framework::{  
        pipeline::sequential::Handler,  
        postgres::{Connection, Db},  
    };  
      
    pub struct TransactionDigestHandler;  
    #[async_trait::async_trait]  
    impl Processor for TransactionDigestHandler {  
        const NAME: &'static str = "transaction_digest_handler";  
      
        type Value = StoredTransactionDigest;  
      
        async fn process(&self, checkpoint: &Arc<Checkpoint>) -> Result<Vec<Self::Value>> {  
            let checkpoint_seq = checkpoint.summary.sequence_number as i64;  
      
            let digests = checkpoint  
                .transactions  
                .iter()  
                .map(|tx| StoredTransactionDigest {  
                    tx_digest: tx.transaction.digest().to_string(),  
                    checkpoint_sequence_number: checkpoint_seq,  
                })  
                .collect();  
      
            Ok(digests)  
        }  
    }  
    #[async_trait::async_trait]  
    impl Handler for TransactionDigestHandler {  
        type Store = Db;  
        type Batch = Vec<Self::Value>;  
      
        fn batch(&self, batch: &mut Self::Batch, values: std::vec::IntoIter<Self::Value>) {  
            batch.extend(values);  
        }  
      
        async fn commit<'a>(&self, batch: &Self::Batch, conn: &mut Connection<'a>) -> Result<usize> {  
            let inserted = diesel::insert_into(transaction_digests)  
                .values(batch)  
                .on_conflict(tx_digest)  
                .do_nothing()  
                .execute(conn)  
                .await?;  
      
            Ok(inserted)  
        }  
    }  
    
[/code]

Click to open

Handler trait definition

[crates/sui-indexer-alt-framework/src/pipeline/sequential/mod.rs](<https://github.com/MystenLabs/sui/blob/main/crates/sui-indexer-alt-framework/src/pipeline/sequential/mod.rs>)
[code]
    /// Handlers implement the logic for a given indexing pipeline: How to process checkpoint data (by  
    /// implementing [Processor]) into rows for their table, how to combine multiple rows into a single  
    /// DB operation, and then how to write those rows atomically to the database.  
    ///  
    /// The handler is also responsible for tuning the various parameters of the pipeline (provided as  
    /// associated values).  
    ///  
    /// Sequential handlers can only be used in sequential pipelines, where checkpoint data is  
    /// processed out-of-order, but then gathered and written in order. If multiple checkpoints are  
    /// available, the pipeline will attempt to combine their writes taking advantage of batching to  
    /// avoid emitting redundant writes.  
    ///  
    /// Back-pressure is handled by the bounded subscriber channel from the ingestion service, the  
    /// same as concurrent pipelines: the channel blocks broadcaster sends when full, and the adaptive  
    /// ingestion controller cuts fetch concurrency as the channel fills up.  
    #[async_trait]  
    pub trait Handler: Processor {  
        type Store: SequentialStore;  
      
        /// If at least this many rows are pending, the committer will commit them eagerly.  
        const MIN_EAGER_ROWS: usize = 50;  
      
        /// Soft cap: once this many rows are pending, the collector stops eagerly draining  
        /// its input channel and yields to the flush phase. Receive is never hard-gated — unlike  
        /// concurrent pipelines, a missing predecessor may be buried in the input channel, and  
        /// blocking receive would risk deadlock. The cap only bounds receive-to-flush latency in  
        /// the happy path.  
        const MAX_PENDING_ROWS: usize = 5000;  
      
        /// Maximum number of checkpoints to try and write in a single batch. The larger this number  
        /// is, the more chances the pipeline has to merge redundant writes, but the longer each write  
        /// transaction is likely to be.  
        const MAX_BATCH_CHECKPOINTS: usize = 5 * 60;  
      
        /// A type to combine multiple `Self::Value`-s into. This can be used to avoid redundant writes  
        /// by combining multiple rows into one (e.g. if one row supersedes another, the latter can be  
        /// omitted).  
        type Batch: Default + Send + Sync + 'static;  
      
        /// Add `values` from processing a checkpoint to the current `batch`. Checkpoints are  
        /// guaranteed to be presented to the batch in checkpoint order. The handler takes ownership  
        /// of the iterator and consumes all values.  
        ///  
        /// Returns `BatchStatus::Ready` if the batch is full and should be committed,  
        /// or `BatchStatus::Pending` if the batch can accept more values.  
        ///  
        /// Note: The handler can signal batch readiness via `BatchStatus::Ready`, but the framework  
        /// may also decide to commit a batch based on the trait parameters above.  
        fn batch(&self, batch: &mut Self::Batch, values: std::vec::IntoIter<Self::Value>);  
      
        /// Take a batch of values and commit them to the database, returning the number of rows  
        /// affected.  
        async fn commit<'a>(  
            &self,  
            batch: &Self::Batch,  
            conn: &mut <Self::Store as Store>::Connection<'a>,  
        ) -> anyhow::Result<usize>;  
    }  
    
[/code]

## Step 9: Create `.env` file​

The main function you create in the next step needs the value you stored to the shell variable `$PSQL_URL`. To make it available, create a `.env` file with that data.

  * Bash/zsh
  * fish
  * PowerShell


[code]
    echo "DATABASE_URL=$PSQL_URL" > .env  
    
[/code]
[code]
    echo "DATABASE_URL=$PSQL_URL" > .env  
    
[/code]
[code]
    "DATABASE_URL=$env:PSQL_URL" | Out-File -Encoding UTF8 .env  
    
[/code]

After running the command for your environment, make sure the `.env` file exists at your project root with the correct data.

## Step 10: Create main function​

Now, to tie everything together in the main function, open your `main.rs` file. Replace the default code with the following and save the file:

[examples/rust/basic-sui-indexer/src/main.rs](<https://github.com/MystenLabs/sui/blob/main/examples/rust/basic-sui-indexer/src/main.rs>)
[code]
    mod handlers;  
    mod models;  
      
    use handlers::TransactionDigestHandler;  
      
    pub mod schema;  
      
    use anyhow::{Result, bail};  
    use clap::Parser;  
    use diesel_migrations::{EmbeddedMigrations, embed_migrations};  
    use sui_indexer_alt_framework::{  
        cluster::{Args, IndexerCluster},  
        pipeline::sequential::SequentialConfig,  
        service::Error,  
    };  
    use tokio;  
    use url::Url;  
      
    // Embed database migrations into the binary so they run automatically on startup  
    const MIGRATIONS: EmbeddedMigrations = embed_migrations!("migrations");  
      
    #[tokio::main]  
    async fn main() -> Result<()> {  
        // Load .env data  
        dotenvy::dotenv().ok();  
      
        // Local database URL created in step 3 above  
        let database_url = std::env::var("DATABASE_URL")  
            .expect("DATABASE_URL must be set in the environment")  
            .parse::<Url>()  
            .expect("Invalid database URL");  
      
        // Parse command-line arguments (checkpoint range, URLs, performance settings)  
        let args = Args::parse();  
      
        // Build and configure the indexer cluster  
        let mut cluster = IndexerCluster::builder()  
            .with_args(args) // Apply command-line configuration  
            .with_database_url(database_url) // Set up database URL  
            .with_migrations(&MIGRATIONS) // Enable automatic schema migrations  
            .build()  
            .await?;  
      
        // Register our custom sequential pipeline with the cluster  
        cluster  
            .sequential_pipeline(  
                TransactionDigestHandler,    // Our processor/handler implementation  
                SequentialConfig::default(), // Use default batch sizes and checkpoint lag  
            )  
            .await?;  
      
        // Start the indexer and wait for completion  
        match cluster.run().await?.main().await {  
            Ok(()) | Err(Error::Terminated) => Ok(()),  
            Err(Error::Aborted) => {  
                bail!("Indexer aborted due to an unexpected error")  
            }  
            Err(Error::Task(e)) => {  
                bail!(e)  
            }  
        }  
    }  
    
[/code]

Key components explained:

  * `embed_migrations!`: Includes your migration files in the binary so the indexer automatically updates the database schema on startup.
  * `Args::parse()`: Provides command-line configuration like `--first-checkpoint`, `--remote-store-url`, and so on.
  * `IndexerCluster::builder()`: Sets up the framework infrastructure (database connections, checkpoint streaming, monitoring).
  * `sequential_pipeline()`: Registers a sequential pipeline that processes checkpoints in order with smart batching.
  * `SequentialConfig::default()`: Uses framework defaults for batch sizes and checkpoint lag (how many checkpoints to batch together).
  * `cluster.run()`: Starts processing checkpoints and blocks until completion.


Your indexer is now complete. The next steps walk you through running the indexer and checking its functionality.

## Step 11: Run your indexer​

Use the `cargo run` command to run your indexer against Testnet. For production use, prefer gRPC streaming from a full node as your primary source with the durable GCS bucket as a fallback. See [Checkpoint Data Sources](</develop/accessing-data/custom-indexer/indexer-data-integration#checkpoint-data-sources>) for details on each option.

Before using a Requester Pays GCS bucket, configure GCS credentials and set your billing project with `--remote-store-header x-goog-user-project:YOUR_PROJECT_ID`.

**Recommended for production: gRPC streaming with GCS-backed fallback:**
[code] 
    $ cargo run -- \  
        --remote-store-gcs mysten-testnet-checkpoints-use4 \  
        --remote-store-header x-goog-user-project:YOUR_PROJECT_ID \  
        --streaming-url https://fullnode.testnet.sui.io:443  
    
[/code]

**GCS checkpoint bucket only (full retention, suitable for backfill):**
[code] 
    $ cargo run -- \  
        --remote-store-gcs mysten-testnet-checkpoints-use4 \  
        --remote-store-header x-goog-user-project:YOUR_PROJECT_ID  
    
[/code]

**HTTPS checkpoint endpoint (recent data only, most recent 30 days):**
[code] 
    $ cargo run -- \  
        --remote-store-url https://checkpoints.testnet.sui.io \  
        --first-checkpoint RECENT_CHECKPOINT  
    
[/code]

The public HTTPS checkpoint endpoints (`https://checkpoints.testnet.sui.io` and `https://checkpoints.mainnet.sui.io`) retain only the most recent 30 days of checkpoints and are suitable as a convenience for quick testing or recent-data workloads. When using one with a fresh database, set `--first-checkpoint` to a checkpoint that is still within the retained range; otherwise, the indexer starts at checkpoint 0 and retries missing checkpoints indefinitely. For production deployments and full-retention backfills, use the GCS buckets through `--remote-store-gcs`: `mysten-testnet-checkpoints-use4` for Testnet or `mysten-mainnet-checkpoints-use4` for Mainnet. These buckets are Requester Pays enabled. See [Use Requester Pays](<https://cloud.google.com/storage/docs/using-requester-pays>) and [Running a Remote Store](</operators/data-management/remote-store-setup>) for more information.

info

Allow incoming network requests if your operating system requests it for the `basic-sui-indexer` application.

If successful, your console informs you that the indexer is running.

## Step 12: Verify results​

Open a new terminal or console and connect to your database to check the results:
[code] 
    $ psql sui_indexer  
    
[/code]

After connecting, run a few queries to verify your indexer is working:

Check how many transaction digests are indexed:
[code] 
    $ SELECT COUNT(*) FROM transaction_digests;  
    
[/code]

View sample records:
[code] 
    $ SELECT * FROM transaction_digests LIMIT 5;  
    
[/code]

To confirm your data is accurate, copy any transaction digest from your database and verify it on SuiScan: <https://suiscan.xyz/testnet/home>

The key concepts covered here apply to any custom indexer: define your data structure, implement the `Processor` and `Handler` traits, and let the framework handle the infrastructure.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/accessing-data/custom-indexer/build.mdx>)

[PreviousIndexer Pipeline Architecture](</develop/accessing-data/custom-indexer/pipeline-architecture>)[NextBring Your Own Store (BYOS)](</develop/accessing-data/custom-indexer/bring-your-own-store>)

  * Step 1: Project setup
  * Step 2: Configure dependencies
  * Step 3: Create database
  * Step 4: Database setup
    * Step 4.1: Configure Diesel
    * Step 4.2: Create database table using Diesel migrations
    * Step 4.3: Apply migration and generate Rust schema
  * Step 5: Create data structure
  * Step 6: Define the `Handler` struct in `handler.rs`
  * Step 7: Implement the `Processor`
  * Step 8: Implement the `Handler`
  * Step 9: Create `.env` file
  * Step 10: Create main function
  * Step 11: Run your indexer
  * Step 12: Verify results
