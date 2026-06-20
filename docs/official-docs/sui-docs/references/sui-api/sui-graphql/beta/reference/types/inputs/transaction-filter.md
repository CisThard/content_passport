<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/inputs/transaction-filter -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Inputs
  * TransactionFilter


# TransactionFilter
[code]
    input TransactionFilter {  
      affectedAddress: SuiAddress  
      affectedObject: SuiAddress  
      afterCheckpoint: UInt53  
      atCheckpoint: UInt53  
      beforeCheckpoint: UInt53  
      function: String  
      kind: TransactionKindInput  
      sentAddress: SuiAddress  
    }  
    
[/code]

### Fields​

#### `TransactionFilter.**affectedAddress**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

Limit to transactions that interacted with the given address. The address could be a sender, sponsor, or recipient of the transaction.

#### `TransactionFilter.**affectedObject**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

Limit to transactions that interacted with the given object. The object could have been created, read, modified, deleted, wrapped, or unwrapped by the transaction. Objects that were passed as a `Receiving` input are not considered to have been affected by a transaction unless they were actually received.

#### `TransactionFilter.**afterCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Filter to transactions that occurred strictly after the given checkpoint.

#### `TransactionFilter.**atCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Filter to transactions in the given checkpoint.

#### `TransactionFilter.**beforeCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Filter to transaction that occurred strictly before the given checkpoint.

#### `TransactionFilter.**function**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Filter transactions by move function called. Calls can be filtered by the `package`, `package::module`, or the `package::module::name` of their function.

#### `TransactionFilter.**kind**` ● [`**TransactionKindInput**`](</references/sui-api/sui-graphql/beta/reference/types/enums/transaction-kind-input>) enum​

An input filter selecting for either system or programmable transactions.

#### `TransactionFilter.**sentAddress**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

Limit to transactions that were sent by the given address.

### Member Of​

[`transactions`](</references/sui-api/sui-graphql/beta/reference/operations/queries/transactions>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/inputs/transaction-filter.mdx>)
