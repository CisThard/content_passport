<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/transaction-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * TransactionConnection


# TransactionConnection
[code]
    type TransactionConnection {  
      edges: [TransactionEdge!]!  
      nodes: [Transaction!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `TransactionConnection.**edges**` ● [`**[TransactionEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-edge>) non-null object​

A list of edges.

#### `TransactionConnection.**nodes**` ● [`**[ Transaction!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) non-null object​

A list of nodes.

#### `TransactionConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Returned By​

[`transactions`](</references/sui-api/sui-graphql/beta/reference/operations/queries/transactions>) query

### Member Of​

[`Address`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object ● [`Checkpoint`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint>) object ● [`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`Epoch`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object ● [`IObject`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iobject>) interface ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object ● [`TransactionEffects`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/transaction-connection.mdx>)
