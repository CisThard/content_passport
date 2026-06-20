<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/simulate-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * simulateTransaction


# simulateTransaction

Simulate a transaction to preview its effects without executing it on chain.

Accepts a JSON transaction matching the [Sui gRPC API schema](<https://docs.sui.io/references/fullnode-protocol#sui-rpc-v2-Transaction>). The JSON format allows for partial transaction specification where certain fields can be automatically resolved by the server.

Alternatively, for already serialized transactions, you can pass BCS-encoded data: `{"bcs": {"value": "<base64>"}}`

Unlike `executeTransaction`, this does not require signatures since the transaction is not committed to the blockchain. This allows for previewing transaction effects, estimating gas costs, and testing transaction logic without spending gas or requiring valid signatures.

  * `checksEnabled`: If true, enables transaction validation checks during simulation. Defaults to true.
  * `doGasSelection`: If true, enables automatic gas coin selection and budget estimation. Defaults to false.


[code] 
    simulateTransaction(  
      transaction: JSON!  
      checksEnabled: Boolean  
      doGasSelection: Boolean  
    ): SimulationResult!  
    
[/code]

### Arguments​

#### `simulateTransaction.**transaction**` ● [`**JSON!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/json>) non-null scalar​

#### `simulateTransaction.**checksEnabled**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

#### `simulateTransaction.**doGasSelection**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

### Type​

#### [`**SimulationResult**`](</references/sui-api/sui-graphql/beta/reference/types/objects/simulation-result>) object​

The result of simulating a transaction, including the predicted effects.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/simulate-transaction.mdx>)
