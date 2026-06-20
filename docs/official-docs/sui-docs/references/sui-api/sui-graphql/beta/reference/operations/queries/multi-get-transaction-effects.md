<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-transaction-effects -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * multiGetTransactionEffects


# multiGetTransactionEffects

Fetch transaction effects by their transactions' digests.

Returns a list of transaction effects that is guaranteed to be the same length as `keys`. If a digest in `keys` could not be found in the store, its corresponding entry in the result will be `null`. This could be because the transaction effects never existed, or because it was pruned.
[code] 
    multiGetTransactionEffects(  
      keys: [String!]!  
    ): [TransactionEffects]!  
    
[/code]

### Arguments​

#### `multiGetTransactionEffects.**keys**` ● [`**[String!]!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

### Type​

#### [`**TransactionEffects**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object​

The results of executing a transaction.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-transaction-effects.mdx>)
