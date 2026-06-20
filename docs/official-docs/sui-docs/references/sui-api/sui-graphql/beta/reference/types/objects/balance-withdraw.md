<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/balance-withdraw -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * BalanceWithdraw


# BalanceWithdraw

Input for withdrawing funds from an accumulator.
[code] 
    type BalanceWithdraw {  
      reservation: WithdrawalReservation  
      type: MoveType  
      withdrawFrom: WithdrawFrom  
    }  
    
[/code]

### Fields​

#### `BalanceWithdraw.**reservation**` ● [`**WithdrawalReservation**`](</references/sui-api/sui-graphql/beta/reference/types/unions/withdrawal-reservation>) union​

How much to withdraw from the accumulator.

#### `BalanceWithdraw.**type**` ● [`**MoveType**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-type>) object​

The type of the funds accumulator to withdraw from (e.g. `0x2::balance::Balance<0x2::sui::SUI>`).

#### `BalanceWithdraw.**withdrawFrom**` ● [`**WithdrawFrom**`](</references/sui-api/sui-graphql/beta/reference/types/enums/withdraw-from>) enum​

The account to withdraw funds from.

### Implemented By​

[`TransactionInput`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-input>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/balance-withdraw.mdx>)
