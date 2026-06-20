<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/unions/transaction-object -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Unions
  * TransactionObject


# TransactionObject

An object as it appears in a specific transaction. The variant discriminates whether the object was changed by the transaction or read as an unchanged consensus (shared) input.
[code] 
    union TransactionObject = ObjectChange | ConsensusObjectRead  
    
[/code]

### Possible types​

#### [`TransactionObject.**ObjectChange**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-change>) object​

#### [`TransactionObject.**ConsensusObjectRead**`](</references/sui-api/sui-graphql/beta/reference/types/objects/consensus-object-read>) object​

### Member Of​

[`Address`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/unions/transaction-object.mdx>)
