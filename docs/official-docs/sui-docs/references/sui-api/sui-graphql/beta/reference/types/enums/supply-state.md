<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/enums/supply-state -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Enums
  * SupplyState


# SupplyState

Future behavior of a currency's supply.
[code] 
    enum SupplyState {  
      BURN_ONLY  
      FIXED  
    }  
    
[/code]

### Values​

#### `SupplyState.**BURN_ONLY**`​

The supply can only decrease.

#### `SupplyState.**FIXED**`​

The supply can neither increase nor decrease.

### Member Of​

[`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/enums/supply-state.mdx>)
