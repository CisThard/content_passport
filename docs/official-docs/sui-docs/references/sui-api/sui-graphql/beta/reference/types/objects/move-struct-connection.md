<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-struct-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveStructConnection


# MoveStructConnection
[code]
    type MoveStructConnection {  
      edges: [MoveStructEdge!]!  
      nodes: [MoveStruct!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `MoveStructConnection.**edges**` ● [`**[MoveStructEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct-edge>) non-null object​

A list of edges.

#### `MoveStructConnection.**nodes**` ● [`**[MoveStruct!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct>) non-null object​

A list of nodes.

#### `MoveStructConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`MoveModule`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-struct-connection.mdx>)
