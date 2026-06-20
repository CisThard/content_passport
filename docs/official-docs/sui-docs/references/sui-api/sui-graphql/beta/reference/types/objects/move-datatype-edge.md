<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveDatatypeEdge


# MoveDatatypeEdge

An edge in a connection.
[code] 
    type MoveDatatypeEdge {  
      cursor: String!  
      node: MoveDatatype!  
    }  
    
[/code]

### Fields​

#### `MoveDatatypeEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `MoveDatatypeEdge.**node**` ● [`**MoveDatatype!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype>) non-null object​

The item at the end of the edge

### Member Of​

[`MoveDatatypeConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-edge.mdx>)
