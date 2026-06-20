<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveEnumEdge


# MoveEnumEdge

An edge in a connection.
[code] 
    type MoveEnumEdge {  
      cursor: String!  
      node: MoveEnum!  
    }  
    
[/code]

### Fields​

#### `MoveEnumEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `MoveEnumEdge.**node**` ● [`**MoveEnum!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum>) non-null object​

The item at the end of the edge

### Member Of​

[`MoveEnumConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-edge.mdx>)
