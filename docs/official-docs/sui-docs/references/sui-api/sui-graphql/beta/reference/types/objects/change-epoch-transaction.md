<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/change-epoch-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ChangeEpochTransaction


# ChangeEpochTransaction

A system transaction that updates epoch information on-chain (increments the current epoch). Executed by the system once per epoch, without using gas. Epoch change transactions cannot be submitted by users, because validators will refuse to sign them.

This transaction kind is deprecated in favour of `EndOfEpochTransaction`.
[code] 
    type ChangeEpochTransaction {  
      computationCharge: UInt53  
      epoch: Epoch  
      epochStartTimestamp: DateTime  
      nonRefundableStorageFee: UInt53  
      protocolConfigs: ProtocolConfigs  
      storageCharge: UInt53  
      storageRebate: UInt53  
      systemPackages(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): MovePackageConnection  
    }  
    
[/code]

### Fields​

#### `ChangeEpochTransaction.**computationCharge**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The total amount of gas charged for computation during the epoch.

#### `ChangeEpochTransaction.**epoch**` ● [`**Epoch**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object​

The next (to become) epoch.

#### `ChangeEpochTransaction.**epochStartTimestamp**` ● [`**DateTime**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/date-time>) scalar​

Unix timestamp when epoch started.

#### `ChangeEpochTransaction.**nonRefundableStorageFee**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The non-refundable storage fee.

#### `ChangeEpochTransaction.**protocolConfigs**` ● [`**ProtocolConfigs**`](</references/sui-api/sui-graphql/beta/reference/types/objects/protocol-configs>) object​

The epoch's corresponding protocol configuration.

#### `ChangeEpochTransaction.**storageCharge**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The total amount of gas charged for storage during the epoch.

#### `ChangeEpochTransaction.**storageRebate**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The amount of storage rebate refunded to the transaction senders.

#### `ChangeEpochTransaction.**systemPackages**` ● [`**MovePackageConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package-connection>) object​

System packages that will be written by validators before the new epoch starts, to upgrade them on-chain. These objects do not have a "previous transaction" because they are not written on-chain yet. Consult `effects.objectChanges` for this transaction to see the actual objects written.

##### `ChangeEpochTransaction.systemPackages.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `ChangeEpochTransaction.systemPackages.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `ChangeEpochTransaction.systemPackages.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `ChangeEpochTransaction.systemPackages.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

### Implemented By​

[`EndOfEpochTransactionKind`](</references/sui-api/sui-graphql/beta/reference/types/unions/end-of-epoch-transaction-kind>) union ● [`TransactionKind`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-kind>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/change-epoch-transaction.mdx>)
