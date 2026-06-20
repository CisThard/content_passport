<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/gas-effects -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * GasEffects


# GasEffects

Effects related to gas (costs incurred and the identity of the smashed gas object returned).
[code] 
    type GasEffects {  
      gasObject: Object  
      gasSummary: GasCostSummary  
    }  
    
[/code]

### Fields​

#### `GasEffects.**gasObject**` ● [`**Object**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object​

The gas object used to pay for this transaction. If multiple gas coins were provided, this represents the combined coin after smashing.

#### `GasEffects.**gasSummary**` ● [`**GasCostSummary**`](</references/sui-api/sui-graphql/beta/reference/types/objects/gas-cost-summary>) object​

Breakdown of the gas costs for this transaction.

### Member Of​

[`TransactionEffects`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/gas-effects.mdx>)
