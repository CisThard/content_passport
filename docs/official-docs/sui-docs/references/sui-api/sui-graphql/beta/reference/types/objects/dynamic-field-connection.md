<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * DynamicFieldConnection


# DynamicFieldConnection
[code]
    type DynamicFieldConnection {  
      edges: [DynamicFieldEdge!]!  
      nodes: [DynamicField!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `DynamicFieldConnection.**edges**` ● [`**[DynamicFieldEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-edge>) non-null object​

A list of edges.

#### `DynamicFieldConnection.**nodes**` ● [`**[DynamicField!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) non-null object​

A list of nodes.

#### `DynamicFieldConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`Address`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object ● [`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`IMoveObject`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-object>) interface ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-connection.mdx>)
