<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/page-info -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * PageInfo


# PageInfo

Information about pagination in a connection
[code] 
    type PageInfo {  
      endCursor: String  
      hasNextPage: Boolean!  
      hasPreviousPage: Boolean!  
      startCursor: String  
    }  
    
[/code]

### Fields​

#### `PageInfo.**endCursor**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

When paginating forwards, the cursor to continue.

#### `PageInfo.**hasNextPage**` ● [`**Boolean!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) non-null scalar​

When paginating forwards, are there more items?

#### `PageInfo.**hasPreviousPage**` ● [`**Boolean!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) non-null scalar​

When paginating backwards, are there more items?

#### `PageInfo.**startCursor**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

When paginating backwards, the cursor to continue.

### Member Of​

[`ActiveJwkConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk-connection>) object ● [`BalanceChangeConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-change-connection>) object ● [`BalanceConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-connection>) object ● [`CheckpointConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint-connection>) object ● [`CommandConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-connection>) object ● [`DynamicFieldConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-connection>) object ● [`EndOfEpochTransactionKindConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction-kind-connection>) object ● [`EpochConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch-connection>) object ● [`EventConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/event-connection>) object ● [`MoveDatatypeConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-connection>) object ● [`MoveEnumConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-connection>) object ● [`MoveFunctionConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function-connection>) object ● [`MoveModuleConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module-connection>) object ● [`MoveObjectConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object-connection>) object ● [`MovePackageConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package-connection>) object ● [`MoveStructConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct-connection>) object ● [`MoveValueConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value-connection>) object ● [`ObjectChangeConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-change-connection>) object ● [`ObjectConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object ● [`TransactionConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-connection>) object ● [`TransactionInputConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-input-connection>) object ● [`UnchangedConsensusObjectConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/unchanged-consensus-object-connection>) object ● [`ValidatorConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/page-info.mdx>)
