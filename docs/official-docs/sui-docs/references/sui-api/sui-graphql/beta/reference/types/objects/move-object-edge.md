<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-object-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveObjectEdge


# MoveObjectEdge

An edge in a connection.
[code] 
    type MoveObjectEdge {  
      cursor: String!  
      node: MoveObject!  
    }  
    
[/code]

### Fields​

#### `MoveObjectEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `MoveObjectEdge.**node**` ● [`**MoveObject!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) non-null object​

The item at the end of the edge

### Member Of​

[`MoveObjectConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-object-edge.mdx>)
