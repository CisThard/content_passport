<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/unions/transaction-argument -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Unions
  * TransactionArgument


# TransactionArgument

An argument to a programmable transaction command.
[code] 
    union TransactionArgument = GasCoin | Input | TxResult  
    
[/code]

### Possible types​

#### [`TransactionArgument.**GasCoin**`](</references/sui-api/sui-graphql/beta/reference/types/objects/gas-coin>) object​

Access to the gas inputs, after they have been smashed into one coin. The gas coin can only be used by reference, except for with `TransferObjectsTransaction` that can accept it by value.

#### [`TransactionArgument.**Input**`](</references/sui-api/sui-graphql/beta/reference/types/objects/input>) object​

#### [`TransactionArgument.**TxResult**`](</references/sui-api/sui-graphql/beta/reference/types/objects/tx-result>) object​

The result of another command.

### Member Of​

[`CommandOutput`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-output>) object ● [`MakeMoveVecCommand`](</references/sui-api/sui-graphql/beta/reference/types/objects/make-move-vec-command>) object ● [`MergeCoinsCommand`](</references/sui-api/sui-graphql/beta/reference/types/objects/merge-coins-command>) object ● [`MoveCallCommand`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-call-command>) object ● [`SplitCoinsCommand`](</references/sui-api/sui-graphql/beta/reference/types/objects/split-coins-command>) object ● [`TransferObjectsCommand`](</references/sui-api/sui-graphql/beta/reference/types/objects/transfer-objects-command>) object ● [`UpgradeCommand`](</references/sui-api/sui-graphql/beta/reference/types/objects/upgrade-command>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/unions/transaction-argument.mdx>)
