<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * TransactionEffects


# TransactionEffects

The results of executing a transaction.
[code] 
    type TransactionEffects {  
      balanceChanges(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): BalanceChangeConnection  
      balanceChangesJson: JSON  
      checkpoint: Checkpoint  
      dependencies(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): TransactionConnection  
      digest: String!  
      effectsBcs: Base64  
      effectsDigest: String  
      effectsJson: JSON  
      epoch: Epoch  
      events(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): EventConnection  
      executionError: ExecutionError  
      gasEffects: GasEffects  
      lamportVersion: UInt53  
      objectChanges(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): ObjectChangeConnection  
      status: ExecutionStatus  
      timestamp: DateTime  
      transaction: Transaction  
      unchangedConsensusObjects(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): UnchangedConsensusObjectConnection  
      version: Int  
    }  
    
[/code]

### Fields​

#### `TransactionEffects.**balanceChanges**` ● [`**BalanceChangeConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-change-connection>) object​

The effect this transaction had on the balances (sum of coin values per coin type) of addresses and objects.

##### `TransactionEffects.balanceChanges.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `TransactionEffects.balanceChanges.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `TransactionEffects.balanceChanges.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `TransactionEffects.balanceChanges.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `TransactionEffects.**balanceChangesJson**` ● [`**JSON**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/json>) scalar​

The balance changes as a JSON array, matching the gRPC proto format.

#### `TransactionEffects.**checkpoint**` ● [`**Checkpoint**`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint>) object​

The checkpoint this transaction was finalized in.

#### `TransactionEffects.**dependencies**` ● [`**TransactionConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-connection>) object​

Transactions whose outputs this transaction depends upon.

##### `TransactionEffects.dependencies.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `TransactionEffects.dependencies.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `TransactionEffects.dependencies.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `TransactionEffects.dependencies.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `TransactionEffects.**digest**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A 32-byte hash that uniquely identifies the transaction contents, encoded in Base58.

Note that this is different from the execution digest, which is the unique hash of the transaction effects.

#### `TransactionEffects.**effectsBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64-encoded BCS serialization of these effects, as `TransactionEffects`.

#### `TransactionEffects.**effectsDigest**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

A 32-byte hash that uniquely identifies the effects contents, encoded in Base58.

#### `TransactionEffects.**effectsJson**` ● [`**JSON**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/json>) scalar​

The effects as a JSON blob, matching the gRPC proto format (excluding BCS).

#### `TransactionEffects.**epoch**` ● [`**Epoch**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object​

The epoch this transaction was finalized in.

#### `TransactionEffects.**events**` ● [`**EventConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/event-connection>) object​

Events emitted by this transaction.

##### `TransactionEffects.events.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `TransactionEffects.events.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `TransactionEffects.events.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `TransactionEffects.events.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `TransactionEffects.**executionError**` ● [`**ExecutionError**`](</references/sui-api/sui-graphql/beta/reference/types/objects/execution-error>) object​

Rich execution error information for failed transactions.

#### `TransactionEffects.**gasEffects**` ● [`**GasEffects**`](</references/sui-api/sui-graphql/beta/reference/types/objects/gas-effects>) object​

Effects related to the gas object used for the transaction (costs incurred and the identity of the smashed gas object returned).

#### `TransactionEffects.**lamportVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The latest version of all objects (apart from packages) that have been created or modified by this transaction, immediately following this transaction.

#### `TransactionEffects.**objectChanges**` ● [`**ObjectChangeConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-change-connection>) object​

The before and after state of objects that were modified by this transaction.

##### `TransactionEffects.objectChanges.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `TransactionEffects.objectChanges.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `TransactionEffects.objectChanges.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `TransactionEffects.objectChanges.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `TransactionEffects.**status**` ● [`**ExecutionStatus**`](</references/sui-api/sui-graphql/beta/reference/types/enums/execution-status>) enum​

Whether the transaction executed successfully or not.

#### `TransactionEffects.**timestamp**` ● [`**DateTime**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/date-time>) scalar​

Timestamp corresponding to the checkpoint this transaction was finalized in.

`null` for executed/simulated transactions that have not been included in a checkpoint.

#### `TransactionEffects.**transaction**` ● [`**Transaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object​

The transaction that ran to produce these effects.

#### `TransactionEffects.**unchangedConsensusObjects**` ● [`**UnchangedConsensusObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/unchanged-consensus-object-connection>) object​

The unchanged consensus-managed objects that were referenced by this transaction.

##### `TransactionEffects.unchangedConsensusObjects.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `TransactionEffects.unchangedConsensusObjects.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `TransactionEffects.unchangedConsensusObjects.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `TransactionEffects.unchangedConsensusObjects.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `TransactionEffects.**version**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

The schema version of the effects struct.

### Returned By​

[`multiGetTransactionEffects`](</references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-transaction-effects>) query ● [`transactionEffects`](</references/sui-api/sui-graphql/beta/reference/operations/queries/transaction-effects>) query

### Member Of​

[`ExecutionResult`](</references/sui-api/sui-graphql/beta/reference/types/objects/execution-result>) object ● [`SimulationResult`](</references/sui-api/sui-graphql/beta/reference/types/objects/simulation-result>) object ● [`Transaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects.mdx>)
