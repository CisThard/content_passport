<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/unions/end-of-epoch-transaction-kind -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Unions
  * EndOfEpochTransactionKind


# EndOfEpochTransactionKind
[code]
    union EndOfEpochTransactionKind = ChangeEpochTransaction | AuthenticatorStateCreateTransaction | AuthenticatorStateExpireTransaction | RandomnessStateCreateTransaction | CoinDenyListStateCreateTransaction | StoreExecutionTimeObservationsTransaction | BridgeStateCreateTransaction | BridgeCommitteeInitTransaction | AccumulatorRootCreateTransaction | CoinRegistryCreateTransaction | DisplayRegistryCreateTransaction | AddressAliasStateCreateTransaction | WriteAccumulatorStorageCostTransaction  
    
[/code]

### Possible types​

#### [`EndOfEpochTransactionKind.**ChangeEpochTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/change-epoch-transaction>) object​

A system transaction that updates epoch information on-chain (increments the current epoch). Executed by the system once per epoch, without using gas. Epoch change transactions cannot be submitted by users, because validators will refuse to sign them.

This transaction kind is deprecated in favour of `EndOfEpochTransaction`.

#### [`EndOfEpochTransactionKind.**AuthenticatorStateCreateTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/authenticator-state-create-transaction>) object​

System transaction for creating the on-chain state used by zkLogin.

#### [`EndOfEpochTransactionKind.**AuthenticatorStateExpireTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/authenticator-state-expire-transaction>) object​

System transaction that is executed at the end of an epoch to expire JSON Web Keys (JWKs) that are no longer valid, based on their associated epoch. This is part of the on-chain state management for zkLogin and authentication.

#### [`EndOfEpochTransactionKind.**RandomnessStateCreateTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/randomness-state-create-transaction>) object​

System transaction for creating the on-chain randomness state.

#### [`EndOfEpochTransactionKind.**CoinDenyListStateCreateTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-deny-list-state-create-transaction>) object​

System transaction for creating the coin deny list state.

#### [`EndOfEpochTransactionKind.**StoreExecutionTimeObservationsTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/store-execution-time-observations-transaction>) object​

System transaction for storing execution time observations.

#### [`EndOfEpochTransactionKind.**BridgeStateCreateTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/bridge-state-create-transaction>) object​

System transaction for creating bridge state for cross-chain operations.

#### [`EndOfEpochTransactionKind.**BridgeCommitteeInitTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/bridge-committee-init-transaction>) object​

System transaction for initializing bridge committee.

#### [`EndOfEpochTransactionKind.**AccumulatorRootCreateTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/accumulator-root-create-transaction>) object​

System transaction for creating the accumulator root.

#### [`EndOfEpochTransactionKind.**CoinRegistryCreateTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-registry-create-transaction>) object​

System transaction for creating the coin registry.

#### [`EndOfEpochTransactionKind.**DisplayRegistryCreateTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/display-registry-create-transaction>) object​

System transaction for creating the display registry.

#### [`EndOfEpochTransactionKind.**AddressAliasStateCreateTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address-alias-state-create-transaction>) object​

System transaction for creating the alias state.

#### [`EndOfEpochTransactionKind.**WriteAccumulatorStorageCostTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/write-accumulator-storage-cost-transaction>) object​

System transaction for writing the pre-computed storage cost for accumulator objects.

### Member Of​

[`EndOfEpochTransactionKindConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction-kind-connection>) object ● [`EndOfEpochTransactionKindEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction-kind-edge>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/unions/end-of-epoch-transaction-kind.mdx>)
