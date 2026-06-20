<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-module-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveModuleEdge


# MoveModuleEdge

An edge in a connection.
[code] 
    type MoveModuleEdge {  
      cursor: String!  
      node: MoveModule!  
    }  
    
[/code]

### Fields​

#### `MoveModuleEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `MoveModuleEdge.**node**` ● [`**MoveModule!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) non-null object​

The item at the end of the edge

### Member Of​

[`MoveModuleConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-module-edge.mdx>)
