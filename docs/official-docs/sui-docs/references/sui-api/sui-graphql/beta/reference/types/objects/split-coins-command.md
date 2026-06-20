<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/split-coins-command -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * SplitCoinsCommand


# SplitCoinsCommand

Splits off coins with denominations in `amounts` from `coin`, returning multiple results (as many as there are amounts.)
[code] 
    type SplitCoinsCommand {  
      amounts: [TransactionArgument!]!  
      coin: TransactionArgument  
    }  
    
[/code]

### Fields​

#### `SplitCoinsCommand.**amounts**` ● [`**[TransactionArgument!]!**`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-argument>) non-null union​

The denominations to split off from the coin.

#### `SplitCoinsCommand.**coin**` ● [`**TransactionArgument**`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-argument>) union​

The coin to split.

### Implemented By​

[`Command`](</references/sui-api/sui-graphql/beta/reference/types/unions/command>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/split-coins-command.mdx>)
