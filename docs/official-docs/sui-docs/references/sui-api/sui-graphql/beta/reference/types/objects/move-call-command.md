<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-call-command -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveCallCommand


# MoveCallCommand
[code]
    type MoveCallCommand {  
      arguments: [TransactionArgument!]!  
      function: MoveFunction!  
    }  
    
[/code]

### Fields​

#### `MoveCallCommand.**arguments**` ● [`**[TransactionArgument!]!**`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-argument>) non-null union​

The actual function parameters passed in for this move call.

#### `MoveCallCommand.**function**` ● [`**MoveFunction!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function>) non-null object​

The function being called.

### Implemented By​

[`Command`](</references/sui-api/sui-graphql/beta/reference/types/unions/command>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-call-command.mdx>)
