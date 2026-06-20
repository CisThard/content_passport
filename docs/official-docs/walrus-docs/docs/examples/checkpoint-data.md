<!-- Source: https://docs.wal.app/docs/examples/checkpoint-data -->

* [](</>)
  * [Examples](</docs/examples>)
  * Sui Archival System


# Sui Archival System

The Sui Archival application demonstrates how Sui blockchain checkpoint data can be archived on Walrus in a reliable, deterministic, and resilient manner.

The application is accessible at <https://walrus-sui-archival.wal.app/>

The application's code is [open source and available on GitHub](<https://github.com/MystenLabs/walrus-sui-archival>).

## How it worksâ

The application polls data from Sui by subscribing to checkpoint sources such as the ingestion framework. It continuously receives live checkpoints as they are created. Once the application obtains a checkpoint, it creates a checkpoint blob based on a deterministic algorithm. The application then uploads blobs to Walrus. The application stores blob metadata in its local database. When blobs are close to expiration, the system automatically extends their lifetime to ensure continuous availability.

Additional technical details can be found in the [application's documentation](<https://walrus-sui-archival.wal.app/tech/>).

The application uses the following code for the main archival functionality:

File not found in manifest: `crates/walrus-sui-archival/src/archival.rs`. You probably need to run `pnpm prebuild` and restart the site.

[View the application's full code on GitHub](<https://github.com/MystenLabs/walrus-sui-archival>).

[Edit this page](<https://github.com/MystenLabs/walrus/tree/main/docs/site/../content/examples/checkpoint-data.mdx>)

[PreviousWalrus Examples](</docs/examples>)[NextUsing Walrus with JavaScript](</docs/examples/javascript>)
