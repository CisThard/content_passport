<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/merge-coins-command -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MergeCoinsCommand


# MergeCoinsCommand

Merges `coins` into the first `coin` (produces no results).
[code] 
    type MergeCoinsCommand {  
      coin: TransactionArgument  
      coins: [TransactionArgument!]!  
    }  
    
[/code]

### Fields​

#### `MergeCoinsCommand.**coin**` ● [`**TransactionArgument**`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-argument>) union​

The coin to merge into.

#### `MergeCoinsCommand.**coins**` ● [`**[TransactionArgument!]!**`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-argument>) non-null union​

The coins to be merged.

### Implemented By​

[`Command`](</references/sui-api/sui-graphql/beta/reference/types/unions/command>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/merge-coins-command.mdx>)
