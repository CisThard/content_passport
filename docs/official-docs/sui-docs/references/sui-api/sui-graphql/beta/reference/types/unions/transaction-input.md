<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/unions/transaction-input -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Unions
  * TransactionInput


# TransactionInput

Input argument to a Programmable Transaction Block (PTB) command.
[code] 
    union TransactionInput = Pure | MoveValue | OwnedOrImmutable | SharedInput | Receiving | BalanceWithdraw  
    
[/code]

### Possible types​

#### [`TransactionInput.**Pure**`](</references/sui-api/sui-graphql/beta/reference/types/objects/pure>) object​

BCS encoded primitive value (not an object or Move struct).

#### [`TransactionInput.**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

#### [`TransactionInput.**OwnedOrImmutable**`](</references/sui-api/sui-graphql/beta/reference/types/objects/owned-or-immutable>) object​

A Move object, either immutable, or owned mutable.

#### [`TransactionInput.**SharedInput**`](</references/sui-api/sui-graphql/beta/reference/types/objects/shared-input>) object​

A Move object that's shared.

#### [`TransactionInput.**Receiving**`](</references/sui-api/sui-graphql/beta/reference/types/objects/receiving>) object​

A Move object that can be received in this transaction.

#### [`TransactionInput.**BalanceWithdraw**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-withdraw>) object​

Input for withdrawing funds from an accumulator.

### Member Of​

[`TransactionInputConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-input-connection>) object ● [`TransactionInputEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-input-edge>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/unions/transaction-input.mdx>)
