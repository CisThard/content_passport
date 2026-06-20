<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/balance -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Balance


# Balance

The total balance for a particular coin type.
[code] 
    type Balance {  
      addressBalance: BigInt  
      coinBalance: BigInt  
      coinType: MoveType  
      totalBalance: BigInt  
    }  
    
[/code]

### Fields​

#### `Balance.**addressBalance**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The balance as tracked by the accumulator object for the address.

#### `Balance.**coinBalance**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

Total balance across all owned coin objects of the coin type.

#### `Balance.**coinType**` ● [`**MoveType**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-type>) object​

Coin type for the balance, such as `0x2::sui::SUI`.

#### `Balance.**totalBalance**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The sum total of the accumulator balance and individual coin balances owned by the address.

### Member Of​

[`Address`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object ● [`BalanceConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-connection>) object ● [`BalanceEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-edge>) object ● [`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`IAddressable`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iaddressable>) interface ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/balance.mdx>)
