<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/object-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ObjectConnection


# ObjectConnection
[code]
    type ObjectConnection {  
      edges: [ObjectEdge!]!  
      nodes: [Object!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `ObjectConnection.**edges**` ● [`**[ObjectEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-edge>) non-null object​

A list of edges.

#### `ObjectConnection.**nodes**` ● [`**[ Object!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) non-null object​

A list of nodes.

#### `ObjectConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Returned By​

[`objects`](</references/sui-api/sui-graphql/beta/reference/operations/queries/objects>) query ● [`objectVersions`](</references/sui-api/sui-graphql/beta/reference/operations/queries/object-versions>) query

### Member Of​

[`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`GasInput`](</references/sui-api/sui-graphql/beta/reference/types/objects/gas-input>) object ● [`GenesisTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/genesis-transaction>) object ● [`IObject`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iobject>) interface ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/object-connection.mdx>)
