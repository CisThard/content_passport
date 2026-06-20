<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ActiveJwkEdge


# ActiveJwkEdge

An edge in a connection.
[code] 
    type ActiveJwkEdge {  
      cursor: String!  
      node: ActiveJwk!  
    }  
    
[/code]

### Fields​

#### `ActiveJwkEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `ActiveJwkEdge.**node**` ● [`**ActiveJwk!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk>) non-null object​

The item at the end of the edge

### Member Of​

[`ActiveJwkConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk-edge.mdx>)
