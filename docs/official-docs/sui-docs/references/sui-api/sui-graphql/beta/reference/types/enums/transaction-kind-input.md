<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/enums/transaction-kind-input -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Enums
  * TransactionKindInput


# TransactionKindInput

An input filter selecting for either system or programmable transactions.
[code] 
    enum TransactionKindInput {  
      SYSTEM_TX  
      PROGRAMMABLE_TX  
    }  
    
[/code]

### Values​

#### `TransactionKindInput.**SYSTEM_TX**`​

A system transaction can be one of several types of transactions. See [unions/transaction-block-kind] for more details.

#### `TransactionKindInput.**PROGRAMMABLE_TX**`​

A user submitted transaction block.

### Member Of​

[`TransactionFilter`](</references/sui-api/sui-graphql/beta/reference/types/inputs/transaction-filter>) input

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/enums/transaction-kind-input.mdx>)
