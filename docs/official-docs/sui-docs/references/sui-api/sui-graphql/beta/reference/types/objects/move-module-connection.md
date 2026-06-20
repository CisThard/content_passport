<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-module-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveModuleConnection


# MoveModuleConnection
[code]
    type MoveModuleConnection {  
      edges: [MoveModuleEdge!]!  
      nodes: [MoveModule!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `MoveModuleConnection.**edges**` ● [`**[MoveModuleEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module-edge>) non-null object​

A list of edges.

#### `MoveModuleConnection.**nodes**` ● [`**[MoveModule!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) non-null object​

A list of nodes.

#### `MoveModuleConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`MoveModule`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-module-connection.mdx>)
