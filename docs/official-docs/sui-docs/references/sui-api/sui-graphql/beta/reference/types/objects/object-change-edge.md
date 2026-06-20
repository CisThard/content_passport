<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/object-change-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ObjectChangeEdge


# ObjectChangeEdge

An edge in a connection.
[code] 
    type ObjectChangeEdge {  
      cursor: String!  
      node: ObjectChange!  
    }  
    
[/code]

### Fields​

#### `ObjectChangeEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `ObjectChangeEdge.**node**` ● [`**ObjectChange!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-change>) non-null object​

The item at the end of the edge

### Member Of​

[`ObjectChangeConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-change-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/object-change-edge.mdx>)
