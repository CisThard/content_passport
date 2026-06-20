<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/transaction-effects -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * transactionEffects


# transactionEffects

Fetch transaction effects by its transaction's digest.

Returns `null` if the transaction effects do not exist in the store, either because that transaction was not executed, or it was pruned.
[code] 
    transactionEffects(  
      digest: String!  
    ): TransactionEffects  
    
[/code]

### Arguments​

#### `transactionEffects.**digest**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

### Type​

#### [`**TransactionEffects**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object​

The results of executing a transaction.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/transaction-effects.mdx>)
