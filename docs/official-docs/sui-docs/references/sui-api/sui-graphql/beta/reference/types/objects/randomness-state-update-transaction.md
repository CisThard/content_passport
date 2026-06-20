<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/randomness-state-update-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * RandomnessStateUpdateTransaction


# RandomnessStateUpdateTransaction

System transaction to update the source of on-chain randomness.
[code] 
    type RandomnessStateUpdateTransaction {  
      epoch: Int  
      randomBytes: Base64  
      randomnessObjInitialSharedVersion: Int  
      randomnessRound: Int  
    }  
    
[/code]

### Fields​

#### `RandomnessStateUpdateTransaction.**epoch**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Epoch of the randomness state update transaction.

#### `RandomnessStateUpdateTransaction.**randomBytes**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

Updated random bytes, Base64 encoded.

#### `RandomnessStateUpdateTransaction.**randomnessObjInitialSharedVersion**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

The initial version of the randomness object that it was shared at.

#### `RandomnessStateUpdateTransaction.**randomnessRound**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Randomness round of the update.

### Implemented By​

[`TransactionKind`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-kind>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/randomness-state-update-transaction.mdx>)
