<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/execution-result -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ExecutionResult


# ExecutionResult

The execution result of a transaction, including the transaction effects.
[code] 
    type ExecutionResult {  
      effects: TransactionEffects  
    }  
    
[/code]

### Fields​

#### `ExecutionResult.**effects**` ● [`**TransactionEffects**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object​

The effects of the transaction execution.

### Returned By​

[`executeTransaction`](</references/sui-api/sui-graphql/beta/reference/operations/mutations/execute-transaction>) mutation

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/execution-result.mdx>)
