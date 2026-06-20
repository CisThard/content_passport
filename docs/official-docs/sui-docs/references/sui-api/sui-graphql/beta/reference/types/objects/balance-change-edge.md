<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/balance-change-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * BalanceChangeEdge


# BalanceChangeEdge

An edge in a connection.
[code] 
    type BalanceChangeEdge {  
      cursor: String!  
      node: BalanceChange!  
    }  
    
[/code]

### Fields​

#### `BalanceChangeEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `BalanceChangeEdge.**node**` ● [`**BalanceChange!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-change>) non-null object​

The item at the end of the edge

### Member Of​

[`BalanceChangeConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-change-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/balance-change-edge.mdx>)
