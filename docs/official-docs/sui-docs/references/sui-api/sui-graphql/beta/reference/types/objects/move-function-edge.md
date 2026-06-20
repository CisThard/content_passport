<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-function-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveFunctionEdge


# MoveFunctionEdge

An edge in a connection.
[code] 
    type MoveFunctionEdge {  
      cursor: String!  
      node: MoveFunction!  
    }  
    
[/code]

### Fields​

#### `MoveFunctionEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `MoveFunctionEdge.**node**` ● [`**MoveFunction!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function>) non-null object​

The item at the end of the edge

### Member Of​

[`MoveFunctionConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-function-edge.mdx>)
