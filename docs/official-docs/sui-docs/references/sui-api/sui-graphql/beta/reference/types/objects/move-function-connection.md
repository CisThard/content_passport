<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-function-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveFunctionConnection


# MoveFunctionConnection
[code]
    type MoveFunctionConnection {  
      edges: [MoveFunctionEdge!]!  
      nodes: [MoveFunction!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `MoveFunctionConnection.**edges**` ● [`**[MoveFunctionEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function-edge>) non-null object​

A list of edges.

#### `MoveFunctionConnection.**nodes**` ● [`**[MoveFunction!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function>) non-null object​

A list of nodes.

#### `MoveFunctionConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`MoveModule`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-function-connection.mdx>)
