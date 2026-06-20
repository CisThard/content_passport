<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/epoch -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Epoch


# Epoch

Activity on Sui is partitioned in time, into epochs.

Epoch changes are opportunities for the network to reconfigure itself (perform protocol or system package upgrades, or change the committee) and distribute staking rewards. The network aims to keep epochs roughly the same duration as each other.

During a particular epoch the following data is fixed:

  * protocol version,
  * reference gas price,
  * system package versions,
  * validators in the committee.


[code] 
    type Epoch implements Node {  
      checkpoints(  
        first: Int  
        after: String  
        last: Int  
        before: String  
        filter: CheckpointFilter  
      ): CheckpointConnection  
      coinDenyList: Object  
      endTimestamp: DateTime  
      epochId: UInt53!  
      fundInflow: BigInt  
      fundOutflow: BigInt  
      fundSize: BigInt  
      id: ID!  
      liveObjectSetDigest: String  
      netInflow: BigInt  
      protocolConfigs: ProtocolConfigs  
      referenceGasPrice: BigInt  
      startTimestamp: DateTime  
      systemPackages(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): MovePackageConnection  
      systemState: MoveValue  
      totalCheckpoints: UInt53  
      totalGasFees: BigInt  
      totalStakeRewards: BigInt  
      totalStakeSubsidies: BigInt  
      totalTransactions: UInt53  
      transactions(  
        first: Int  
        after: String  
        last: Int  
        before: String  
        filter: TransactionFilter  
      ): TransactionConnection  
      validatorSet: ValidatorSet  
    }  
    
[/code]

### Fields​

#### `Epoch.**checkpoints**` ● [`**CheckpointConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint-connection>) object​

The epoch's corresponding checkpoints.

##### `Epoch.checkpoints.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Epoch.checkpoints.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `Epoch.checkpoints.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Epoch.checkpoints.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `Epoch.checkpoints.**filter**` ● [`**CheckpointFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/checkpoint-filter>) input​

#### `Epoch.**coinDenyList**` ● [`**Object**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object​

State of the Coin DenyList object (0x403) at the start of this epoch.

The DenyList controls access to Regulated Coins. Writes to the DenyList are accumulated and only take effect on the next epoch boundary. Consequently, it's possible to determine the state of the DenyList for a transaction by reading it at the start of the epoch the transaction is in.

#### `Epoch.**endTimestamp**` ● [`**DateTime**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/date-time>) scalar​

The timestamp associated with the last checkpoint in the epoch (or `null` if the epoch has not finished yet).

#### `Epoch.**epochId**` ● [`**UInt53!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) non-null scalar​

The epoch's id as a sequence number that starts at 0 and is incremented by one at every epoch change.

#### `Epoch.**fundInflow**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The storage fees paid for transactions executed during the epoch (or `null` if the epoch has not finished yet).

#### `Epoch.**fundOutflow**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The storage fee rebates paid to users who deleted the data associated with past transactions (or `null` if the epoch has not finished yet).

#### `Epoch.**fundSize**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The storage fund available in this epoch (or `null` if the epoch has not finished yet). This fund is used to redistribute storage fees from past transactions to future validators.

#### `Epoch.**id**` ● [`**ID!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/id>) non-null scalar​

The epoch's globally unique identifier, which can be passed to `Query.node` to refetch it.

#### `Epoch.**liveObjectSetDigest**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

A commitment by the committee at the end of epoch on the contents of the live object set at that time. This can be used to verify state snapshots.

#### `Epoch.**netInflow**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The difference between the fund inflow and outflow, representing the net amount of storage fees accumulated in this epoch (or `null` if the epoch has not finished yet).

#### `Epoch.**protocolConfigs**` ● [`**ProtocolConfigs**`](</references/sui-api/sui-graphql/beta/reference/types/objects/protocol-configs>) object​

The epoch's corresponding protocol configuration, including the feature flags and the configuration options.

#### `Epoch.**referenceGasPrice**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The minimum gas price that a quorum of validators are guaranteed to sign a transaction for in this epoch.

#### `Epoch.**startTimestamp**` ● [`**DateTime**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/date-time>) scalar​

The timestamp associated with the first checkpoint in the epoch.

#### `Epoch.**systemPackages**` ● [`**MovePackageConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package-connection>) object​

The system packages used by all transactions in this epoch.

##### `Epoch.systemPackages.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Epoch.systemPackages.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `Epoch.systemPackages.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Epoch.systemPackages.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `Epoch.**systemState**` ● [`**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

The contents of the system state inner object at the start of this epoch.

#### `Epoch.**totalCheckpoints**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The total number of checkpoints in this epoch.

Returns `None` when no checkpoint is set in scope (e.g. execution scope).

#### `Epoch.**totalGasFees**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The total amount of gas fees (in MIST) that were paid in this epoch (or `null` if the epoch has not finished yet).

#### `Epoch.**totalStakeRewards**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The total MIST rewarded as stake (or `null` if the epoch has not finished yet).

#### `Epoch.**totalStakeSubsidies**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The amount added to total gas fees to make up the total stake rewards (or `null` if the epoch has not finished yet).

#### `Epoch.**totalTransactions**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The total number of transaction blocks in this epoch.

If the epoch has not finished yet, this number is computed based on the number of transactions at the latest known checkpoint.

#### `Epoch.**transactions**` ● [`**TransactionConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-connection>) object​

The transactions in this epoch, optionally filtered by transaction filters.

Returns `None` when no checkpoint is set in scope (e.g. execution scope).

##### `Epoch.transactions.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Epoch.transactions.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `Epoch.transactions.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Epoch.transactions.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `Epoch.transactions.**filter**` ● [`**TransactionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/transaction-filter>) input​

#### `Epoch.**validatorSet**` ● [`**ValidatorSet**`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator-set>) object​

Validator-related properties, including the active validators.

### Interfaces​

#### [`**Node**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/node>) interface​

An interface implemented by types that can be uniquely identified by a globally unique `ID`, following the GraphQL Global Object Identification specification.

### Returned By​

[`epoch`](</references/sui-api/sui-graphql/beta/reference/operations/queries/epoch>) query ● [`multiGetEpochs`](</references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-epochs>) query

### Member Of​

[`ActiveJwk`](</references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk>) object ● [`AuthenticatorStateExpireTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/authenticator-state-expire-transaction>) object ● [`AuthenticatorStateUpdateTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/authenticator-state-update-transaction>) object ● [`ChangeEpochTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/change-epoch-transaction>) object ● [`Checkpoint`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint>) object ● [`ConsensusCommitPrologueTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/consensus-commit-prologue-transaction>) object ● [`EpochConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch-connection>) object ● [`EpochEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch-edge>) object ● [`Transaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object ● [`TransactionEffects`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object ● [`ValidatorAggregatedSignature`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator-aggregated-signature>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/epoch.mdx>)
