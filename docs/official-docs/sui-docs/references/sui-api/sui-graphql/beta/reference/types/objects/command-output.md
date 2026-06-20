<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/command-output -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * CommandOutput


# CommandOutput

A value produced or modified during command execution.

This can represent either a return value from a command or an argument that was mutated by reference.
[code] 
    type CommandOutput {  
      argument: TransactionArgument  
      value: MoveValue  
    }  
    
[/code]

### Fields​

#### `CommandOutput.**argument**` ● [`**TransactionArgument**`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-argument>) union​

The transaction argument that this value corresponds to (if any).

#### `CommandOutput.**value**` ● [`**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

The structured Move value, if available.

### Member Of​

[`CommandResult`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-result>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/command-output.mdx>)
