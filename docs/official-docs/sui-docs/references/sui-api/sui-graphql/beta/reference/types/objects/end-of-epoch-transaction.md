<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * EndOfEpochTransaction


# EndOfEpochTransaction

System transaction that supersedes `ChangeEpochTransaction` as the new way to run transactions at the end of an epoch. Behaves similarly to `ChangeEpochTransaction` but can accommodate other optional transactions to run at the end of the epoch.
[code] 
    type EndOfEpochTransaction {  
      transactions(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): EndOfEpochTransactionKindConnection  
    }  
    
[/code]

### Fields​

#### `EndOfEpochTransaction.**transactions**` ● [`**EndOfEpochTransactionKindConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction-kind-connection>) object​

The list of system transactions that are allowed to run at the end of the epoch.

##### `EndOfEpochTransaction.transactions.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `EndOfEpochTransaction.transactions.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `EndOfEpochTransaction.transactions.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `EndOfEpochTransaction.transactions.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

### Implemented By​

[`TransactionKind`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-kind>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction.mdx>)
