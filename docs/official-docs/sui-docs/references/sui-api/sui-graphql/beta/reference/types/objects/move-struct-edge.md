<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-struct-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveStructEdge


# MoveStructEdge

An edge in a connection.
[code] 
    type MoveStructEdge {  
      cursor: String!  
      node: MoveStruct!  
    }  
    
[/code]

### Fields​

#### `MoveStructEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `MoveStructEdge.**node**` ● [`**MoveStruct!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct>) non-null object​

The item at the end of the edge

### Member Of​

[`MoveStructConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-struct-edge.mdx>)
