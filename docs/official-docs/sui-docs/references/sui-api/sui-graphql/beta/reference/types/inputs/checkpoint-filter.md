<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/inputs/checkpoint-filter -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Inputs
  * CheckpointFilter


# CheckpointFilter
[code]
    input CheckpointFilter {  
      afterCheckpoint: UInt53  
      atCheckpoint: UInt53  
      atEpoch: UInt53  
      beforeCheckpoint: UInt53  
    }  
    
[/code]

### Fields​

#### `CheckpointFilter.**afterCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Limit query results to checkpoints that occured strictly after the given checkpoint.

#### `CheckpointFilter.**atCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Limit query results to checkpoints that occured at the given checkpoint.

#### `CheckpointFilter.**atEpoch**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Limit query results to checkpoints at this epoch.

#### `CheckpointFilter.**beforeCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Limit query results to checkpoints that occured strictly before the given checkpoint.

### Member Of​

[`checkpoints`](</references/sui-api/sui-graphql/beta/reference/operations/queries/checkpoints>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/inputs/checkpoint-filter.mdx>)
