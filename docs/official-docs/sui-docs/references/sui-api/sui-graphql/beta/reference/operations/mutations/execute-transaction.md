<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/mutations/execute-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Mutations
  * executeTransaction


# executeTransaction

Execute a transaction, committing its effects on chain.

  * `transactionDataBcs` contains the BCS-encoded transaction data (Base64-encoded).
  * `signatures` are a list of `flag || signature || pubkey` bytes, Base64-encoded.


Waits until the transaction has reached finality on chain to return its transaction digest, or returns the error that prevented finality if that was not possible. A transaction is final when its effects are guaranteed on chain (it cannot be revoked).

There may be a delay between transaction finality and when GraphQL requests (including the request that issued the transaction) reflect its effects. As a result, queries that depend on indexing the state of the chain (e.g. contents of output objects, address-level balance information at the time of the transaction), must wait for indexing to catch up by polling for the transaction digest using `Query.transaction`.
[code] 
    executeTransaction(  
      transactionDataBcs: Base64!  
      signatures: [Base64!]!  
    ): ExecutionResult!  
    
[/code]

### Arguments​

#### `executeTransaction.**transactionDataBcs**` ● [`**Base64!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) non-null scalar​

#### `executeTransaction.**signatures**` ● [`**[Base64!]!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) non-null scalar​

### Type​

#### [`**ExecutionResult**`](</references/sui-api/sui-graphql/beta/reference/types/objects/execution-result>) object​

The execution result of a transaction, including the transaction effects.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/mutations/execute-transaction.mdx>)
