<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/object-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ObjectEdge


# ObjectEdge

An edge in a connection.
[code] 
    type ObjectEdge {  
      cursor: String!  
      node: Object!  
    }  
    
[/code]

### Fields​

#### `ObjectEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `ObjectEdge.**node**` ● [`**Object!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) non-null object​

The item at the end of the edge

### Member Of​

[`ObjectConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/object-edge.mdx>)
