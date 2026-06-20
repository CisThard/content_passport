<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-checkpoints -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * multiGetCheckpoints


# multiGetCheckpoints

Fetch checkpoints by their sequence numbers.

Returns a list of checkpoints that is guaranteed to be the same length as `keys`. If a checkpoint in `keys` could not be found in the store, its corresponding entry in the result will be `null`. This could be because the checkpoint does not exist yet, or because it was pruned.
[code] 
    multiGetCheckpoints(  
      keys: [UInt53!]!  
    ): [Checkpoint]!  
    
[/code]

### Arguments​

#### `multiGetCheckpoints.**keys**` ● [`**[UInt53!]!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) non-null scalar​

### Type​

#### [`**Checkpoint**`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint>) object​

Checkpoints contain finalized transactions and are used for node synchronization and global transaction ordering.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-checkpoints.mdx>)
