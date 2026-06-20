<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/tx-result -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * TxResult


# TxResult

The result of another command.
[code] 
    type TxResult {  
      cmd: Int  
      ix: Int  
    }  
    
[/code]

### Fields​

#### `TxResult.**cmd**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

The index of the command that produced this result.

#### `TxResult.**ix**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

For nested results, the index within the result.

### Implemented By​

[`TransactionArgument`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-argument>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/tx-result.mdx>)
