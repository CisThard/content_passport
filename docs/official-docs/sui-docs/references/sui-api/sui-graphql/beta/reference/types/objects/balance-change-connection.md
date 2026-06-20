<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/balance-change-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * BalanceChangeConnection


# BalanceChangeConnection
[code]
    type BalanceChangeConnection {  
      edges: [BalanceChangeEdge!]!  
      nodes: [BalanceChange!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `BalanceChangeConnection.**edges**` ● [`**[BalanceChangeEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-change-edge>) non-null object​

A list of edges.

#### `BalanceChangeConnection.**nodes**` ● [`**[BalanceChange!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-change>) non-null object​

A list of nodes.

#### `BalanceChangeConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`TransactionEffects`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/balance-change-connection.mdx>)
