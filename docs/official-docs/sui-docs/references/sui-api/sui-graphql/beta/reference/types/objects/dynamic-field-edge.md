<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * DynamicFieldEdge


# DynamicFieldEdge

An edge in a connection.
[code] 
    type DynamicFieldEdge {  
      cursor: String!  
      node: DynamicField!  
    }  
    
[/code]

### Fields​

#### `DynamicFieldEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `DynamicFieldEdge.**node**` ● [`**DynamicField!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) non-null object​

The item at the end of the edge

### Member Of​

[`DynamicFieldConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-edge.mdx>)
