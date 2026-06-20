<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveEnumConnection


# MoveEnumConnection
[code]
    type MoveEnumConnection {  
      edges: [MoveEnumEdge!]!  
      nodes: [MoveEnum!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `MoveEnumConnection.**edges**` ● [`**[MoveEnumEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-edge>) non-null object​

A list of edges.

#### `MoveEnumConnection.**nodes**` ● [`**[MoveEnum!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum>) non-null object​

A list of nodes.

#### `MoveEnumConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`MoveModule`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-connection.mdx>)
