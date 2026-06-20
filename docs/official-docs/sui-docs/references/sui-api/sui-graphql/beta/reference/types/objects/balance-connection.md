<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/balance-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * BalanceConnection


# BalanceConnection
[code]
    type BalanceConnection {  
      edges: [BalanceEdge!]!  
      nodes: [Balance!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `BalanceConnection.**edges**` ● [`**[BalanceEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-edge>) non-null object​

A list of edges.

#### `BalanceConnection.**nodes**` ● [`**[Balance!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) non-null object​

A list of nodes.

#### `BalanceConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`Address`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object ● [`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`IAddressable`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iaddressable>) interface ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/balance-connection.mdx>)
