<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/checkpoint -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * checkpoint


# checkpoint

Fetch a checkpoint by its sequence number or digest, or the latest checkpoint if neither is provided.

It is an error to specify both `sequenceNumber` and `digest`.

Returns `null` if the checkpoint does not exist in the store, either because it never existed or because it was pruned.
[code] 
    checkpoint(  
      sequenceNumber: UInt53  
      digest: String  
    ): Checkpoint  
    
[/code]

### Arguments​

#### `checkpoint.**sequenceNumber**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `checkpoint.**digest**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

### Type​

#### [`**Checkpoint**`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint>) object​

Checkpoints contain finalized transactions and are used for node synchronization and global transaction ordering.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/checkpoint.mdx>)
