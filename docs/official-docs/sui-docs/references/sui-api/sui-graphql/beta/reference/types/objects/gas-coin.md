<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/gas-coin -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * GasCoin


# GasCoin

Access to the gas inputs, after they have been smashed into one coin. The gas coin can only be used by reference, except for with `TransferObjectsTransaction` that can accept it by value.
[code] 
    type GasCoin {  
      _: Boolean  
    }  
    
[/code]

### Fields​

#### `GasCoin.**_**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

Placeholder field (gas coin has no additional data)

### Implemented By​

[`TransactionArgument`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-argument>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/gas-coin.mdx>)
