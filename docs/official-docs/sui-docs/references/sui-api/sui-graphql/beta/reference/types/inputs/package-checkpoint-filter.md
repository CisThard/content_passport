<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/inputs/package-checkpoint-filter -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Inputs
  * PackageCheckpointFilter


# PackageCheckpointFilter

Filter for paginating packages published within a range of checkpoints.
[code] 
    input PackageCheckpointFilter {  
      afterCheckpoint: UInt53  
      beforeCheckpoint: UInt53  
    }  
    
[/code]

### Fields​

#### `PackageCheckpointFilter.**afterCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Filter to packages that were published strictly after this checkpoint, defaults to fetching from the earliest checkpoint known to this RPC (this could be the genesis checkpoint, or some later checkpoint if data has been pruned).

#### `PackageCheckpointFilter.**beforeCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Filter to packages published strictly before this checkpoint, defaults to fetching up to the latest checkpoint (inclusive).

### Member Of​

[`packages`](</references/sui-api/sui-graphql/beta/reference/operations/queries/packages>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/inputs/package-checkpoint-filter.mdx>)
