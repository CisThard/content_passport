<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-transactions -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * multiGetTransactions


# multiGetTransactions

Fetch transactions by their digests.

Returns a list of transactions that is guaranteed to be the same length as `keys`. If a digest in `keys` could not be found in the store, its corresponding entry in the result will be `null`. This could be because the transaction never existed, or because it was pruned.
[code] 
    multiGetTransactions(  
      keys: [String!]!  
    ): [Transaction]!  
    
[/code]

### Arguments​

#### `multiGetTransactions.**keys**` ● [`**[String!]!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

### Type​

#### [`**Transaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object​

Description of a transaction, the unit of activity on Sui.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-transactions.mdx>)
