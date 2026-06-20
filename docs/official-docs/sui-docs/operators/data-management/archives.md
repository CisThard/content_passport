<!-- Source: https://docs.sui.io/operators/data-management/archives -->

* [](</>)
  * [Data Indexing and Archives](</operators/data-management/>)
  * Archive Data


On this page

# Sui Archive Data

A Sui archive is a history of all transaction data on Sui. In some cases, peer nodes might not catch up with all transactions and effects through synchronization if they lag behind the current epoch by more than the latest few epochs. In such cases, instead of relying on synchronization, peer nodes can fall back to downloading the relevant information from an archive.

info

Starting with the 1.51 release, the default archive bucket for Mainnet switches to a requester-pays model. See the following section for a configuration example.

`https://checkpoints.mainnet.sui.io` and `https://checkpoints.testnet.sui.io` retain only the most recent 30 days of checkpoints and are not suitable for full-retention backfill. For full checkpoint retention, use `gs://mysten-mainnet-checkpoints-use4` for Mainnet or `gs://mysten-testnet-checkpoints-use4` for Testnet with Requester Pays enabled. For standing up a new fullnode, always start it from a snapshot.

## Set up archival fallback​

To enable your node to fall back to an archive in case of lag, add the following to your `fullnode.yaml` file:

  * Mainnet
  * Testnet


[code]
    state-archive-read-config:  
      - ingestion-url: "https://s3.us-west-2.amazonaws.com/mysten-mainnet-checkpoints"  
        # How many objects to read ahead when catching up  
        concurrency: 5  
        remote-store-options:  
          - ["aws_access_key_id", <YOUR_AWS_ACCESS_KEY_ID|PATH_TO_AWS_ACCESS_KEY>]  
          - ["aws_secret_access_key", <AWS_SECRET_ACCESS_KEY|PATH_TO_AWS_SECRET_ACCESS_KEY>]  
    
[/code]
[code]
    state-archive-read-config:  
      - ingestion-url: "https://checkpoints.testnet.sui.io"  
        # How many objects to read ahead when catching up  
        concurrency: 5  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/operators/data-management/archives.mdx>)

[PreviousRunning the Archival Store and Service](</operators/data-management/archival-stack-setup>)[NextSui Validators](</operators/validator/>)

  * Set up archival fallback
