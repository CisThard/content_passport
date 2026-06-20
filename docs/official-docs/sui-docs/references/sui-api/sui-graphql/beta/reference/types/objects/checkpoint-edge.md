<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * CheckpointEdge


# CheckpointEdge

An edge in a connection.
[code] 
    type CheckpointEdge {  
      cursor: String!  
      node: Checkpoint!  
    }  
    
[/code]

### Fields​

#### `CheckpointEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `CheckpointEdge.**node**` ● [`**Checkpoint!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint>) non-null object​

The item at the end of the edge

### Member Of​

[`CheckpointConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint-edge.mdx>)
