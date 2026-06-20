<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/enums/regulated-state -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Enums
  * RegulatedState


# RegulatedState

Whether the currency is regulated or not.
[code] 
    enum RegulatedState {  
      REGULATED  
      UNREGULATED  
    }  
    
[/code]

### Values​

#### `RegulatedState.**REGULATED**`​

A `DenyCap` or a `RegulatedCoinMetadata` exists for this currency.

#### `RegulatedState.**UNREGULATED**`​

The currency was created without a deny list.

### Member Of​

[`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/enums/regulated-state.mdx>)
