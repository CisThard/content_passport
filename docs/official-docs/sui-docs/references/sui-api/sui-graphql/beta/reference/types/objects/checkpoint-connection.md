<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * CheckpointConnection


# CheckpointConnection
[code]
    type CheckpointConnection {  
      edges: [CheckpointEdge!]!  
      nodes: [Checkpoint!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `CheckpointConnection.**edges**` ● [`**[CheckpointEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint-edge>) non-null object​

A list of edges.

#### `CheckpointConnection.**nodes**` ● [`**[ Checkpoint!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint>) non-null object​

A list of nodes.

#### `CheckpointConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Returned By​

[`checkpoints`](</references/sui-api/sui-graphql/beta/reference/operations/queries/checkpoints>) query

### Member Of​

[`Epoch`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint-connection.mdx>)
