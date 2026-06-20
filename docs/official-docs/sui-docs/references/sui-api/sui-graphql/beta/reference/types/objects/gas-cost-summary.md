<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/gas-cost-summary -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * GasCostSummary


# GasCostSummary

Summary of charges from transactions.

Storage is charged in three parts -- `storage_cost`, `-storage_rebate`, and `non_refundable_storage_fee` \-- independently of `computation_cost`.

The overall cost of a transaction, deducted from its gas coins, is its `computation_cost + storage_cost - storage_rebate`. `non_refundable_storage_fee` is collected from objects being mutated or deleted and accumulated by the system in storage funds, the remaining storage costs of previous object versions are what become the `storage_rebate`. The ratio between `non_refundable_storage_fee` and `storage_rebate` is set by the protocol.
[code] 
    type GasCostSummary {  
      computationCost: UInt53  
      nonRefundableStorageFee: UInt53  
      storageCost: UInt53  
      storageRebate: UInt53  
    }  
    
[/code]

### Fields​

#### `GasCostSummary.**computationCost**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The sum cost of computation/execution

#### `GasCostSummary.**nonRefundableStorageFee**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Amount that is retained by the system in the storage fund from the cost of the previous versions of objects being mutated or deleted.

#### `GasCostSummary.**storageCost**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Cost for storage at the time the transaction is executed, calculated as the size of the objects being mutated in bytes multiplied by a storage cost per byte (part of the protocol).

#### `GasCostSummary.**storageRebate**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Amount the user gets back from the storage cost of the previous versions of objects being mutated or deleted.

### Member Of​

[`Checkpoint`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint>) object ● [`GasEffects`](</references/sui-api/sui-graphql/beta/reference/types/objects/gas-effects>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/gas-cost-summary.mdx>)
