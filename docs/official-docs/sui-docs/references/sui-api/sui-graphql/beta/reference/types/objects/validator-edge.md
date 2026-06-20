<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/validator-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ValidatorEdge


# ValidatorEdge

An edge in a connection.
[code] 
    type ValidatorEdge {  
      cursor: String!  
      node: Validator!  
    }  
    
[/code]

### Fields​

#### `ValidatorEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `ValidatorEdge.**node**` ● [`**Validator!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator>) non-null object​

The item at the end of the edge

### Member Of​

[`ValidatorConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/validator-edge.mdx>)
