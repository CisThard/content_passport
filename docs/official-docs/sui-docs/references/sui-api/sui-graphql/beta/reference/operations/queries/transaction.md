<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * transaction


# transaction

Fetch a transaction by its digest.

Returns `null` if the transaction does not exist in the store, either because it never existed or because it was pruned.
[code] 
    transaction(  
      digest: String!  
    ): Transaction  
    
[/code]

### Arguments​

#### `transaction.**digest**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

### Type​

#### [`**Transaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object​

Description of a transaction, the unit of activity on Sui.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/transaction.mdx>)
