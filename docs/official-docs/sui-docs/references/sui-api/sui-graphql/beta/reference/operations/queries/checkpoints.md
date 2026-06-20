<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/checkpoints -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * checkpoints


# checkpoints

Paginate checkpoints in the network, optionally bounded to checkpoints in the given epoch.
[code] 
    checkpoints(  
      first: Int  
      after: String  
      last: Int  
      before: String  
      filter: CheckpointFilter  
    ): CheckpointConnection  
    
[/code]

### Arguments​

#### `checkpoints.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `checkpoints.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `checkpoints.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `checkpoints.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `checkpoints.**filter**` ● [`**CheckpointFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/checkpoint-filter>) input​

### Type​

#### [`**CheckpointConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint-connection>) object​

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/checkpoints.mdx>)
