<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/enums/withdraw-from -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Enums
  * WithdrawFrom


# WithdrawFrom

The account to withdraw funds from.
[code] 
    enum WithdrawFrom {  
      SENDER  
      SPONSOR  
    }  
    
[/code]

### Values​

#### `WithdrawFrom.**SENDER**`​

The funds are withdrawn from the transaction sender's account.

#### `WithdrawFrom.**SPONSOR**`​

The funds are withdrawn from the sponsor's account.

### Member Of​

[`BalanceWithdraw`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-withdraw>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/enums/withdraw-from.mdx>)
