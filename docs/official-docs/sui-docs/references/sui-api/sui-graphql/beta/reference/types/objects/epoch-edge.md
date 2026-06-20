<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/epoch-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * EpochEdge


# EpochEdge

An edge in a connection.
[code] 
    type EpochEdge {  
      cursor: String!  
      node: Epoch!  
    }  
    
[/code]

### Fields​

#### `EpochEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `EpochEdge.**node**` ● [`**Epoch!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) non-null object​

The item at the end of the edge

### Member Of​

[`EpochConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/epoch-edge.mdx>)
