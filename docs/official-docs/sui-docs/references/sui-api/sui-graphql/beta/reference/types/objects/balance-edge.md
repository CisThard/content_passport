<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/balance-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * BalanceEdge


# BalanceEdge

An edge in a connection.
[code] 
    type BalanceEdge {  
      cursor: String!  
      node: Balance!  
    }  
    
[/code]

### Fields​

#### `BalanceEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `BalanceEdge.**node**` ● [`**Balance!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) non-null object​

The item at the end of the edge

### Member Of​

[`BalanceConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/balance-edge.mdx>)
