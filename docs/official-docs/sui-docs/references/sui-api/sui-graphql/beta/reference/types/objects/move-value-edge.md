<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-value-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveValueEdge


# MoveValueEdge

An edge in a connection.
[code] 
    type MoveValueEdge {  
      cursor: String!  
      node: MoveValue!  
    }  
    
[/code]

### Fields​

#### `MoveValueEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `MoveValueEdge.**node**` ● [`**MoveValue!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) non-null object​

The item at the end of the edge

### Member Of​

[`MoveValueConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-value-edge.mdx>)
