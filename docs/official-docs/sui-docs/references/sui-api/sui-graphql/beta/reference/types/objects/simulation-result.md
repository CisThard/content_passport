<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/simulation-result -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * SimulationResult


# SimulationResult

The result of simulating a transaction, including the predicted effects.
[code] 
    type SimulationResult {  
      effects: TransactionEffects  
      outputs: [CommandResult!]  
    }  
    
[/code]

### Fields​

#### `SimulationResult.**effects**` ● [`**TransactionEffects**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object​

The predicted effects of the transaction if it were executed.

#### `SimulationResult.**outputs**` ● [`**[CommandResult!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-result>) list object​

The intermediate outputs for each command of the transaction simulation, including contents of mutated references and return values.

### Returned By​

[`simulateTransaction`](</references/sui-api/sui-graphql/beta/reference/operations/queries/simulate-transaction>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/simulation-result.mdx>)
