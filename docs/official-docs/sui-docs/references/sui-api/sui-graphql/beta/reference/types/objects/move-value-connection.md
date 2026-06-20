<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-value-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveValueConnection


# MoveValueConnection
[code]
    type MoveValueConnection {  
      edges: [MoveValueEdge!]!  
      nodes: [MoveValue!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `MoveValueConnection.**edges**` ● [`**[MoveValueEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value-edge>) non-null object​

A list of edges.

#### `MoveValueConnection.**nodes**` ● [`**[MoveValue!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) non-null object​

A list of nodes.

#### `MoveValueConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`MoveValue`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-value-connection.mdx>)
