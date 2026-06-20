<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/balance-change -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * BalanceChange


# BalanceChange

Effects to the balance (sum of coin values per coin type) of addresses and objects.
[code] 
    type BalanceChange {  
      amount: BigInt  
      coinType: MoveType  
      owner: Address  
    }  
    
[/code]

### Fields​

#### `BalanceChange.**amount**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The signed balance change.

#### `BalanceChange.**coinType**` ● [`**MoveType**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-type>) object​

The inner type of the coin whose balance has changed (e.g. `0x2::sui::SUI`).

#### `BalanceChange.**owner**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

The address or object whose balance has changed.

### Member Of​

[`BalanceChangeConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-change-connection>) object ● [`BalanceChangeEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-change-edge>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/balance-change.mdx>)
