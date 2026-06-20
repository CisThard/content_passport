<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveDatatypeConnection


# MoveDatatypeConnection
[code]
    type MoveDatatypeConnection {  
      edges: [MoveDatatypeEdge!]!  
      nodes: [MoveDatatype!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `MoveDatatypeConnection.**edges**` ● [`**[MoveDatatypeEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-edge>) non-null object​

A list of edges.

#### `MoveDatatypeConnection.**nodes**` ● [`**[MoveDatatype!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype>) non-null object​

A list of nodes.

#### `MoveDatatypeConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`MoveModule`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-connection.mdx>)
