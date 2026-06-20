<!-- Source: https://docs.sui.io/references/release-notes -->

* [](</>)
  * Release Notes


On this page

# Release Notes

* * *

## v1.73.1​

**🔶 Testnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/testnet-v1.73.1>)_

#### Sui Protocol Version in this release: `126`​

[#26849](<https://github.com/MystenLabs/sui/pull/26849>): version 126 introduced that changes how insufficient funds for withdrawals are handled.

[#26740](<https://github.com/MystenLabs/sui/pull/26740>): Testnet: advance epoch based on timestamp instead of validator votes.

[#26246](<https://github.com/MystenLabs/sui/pull/26246>): New flag for dealing with party object extensions for incurring post execution writes

#### GraphQL​

[#26594](<https://github.com/MystenLabs/sui/pull/26594>): Support checkpoint lookup by digest

[#26495](<https://github.com/MystenLabs/sui/pull/26495>): add asTransactionObject which allows user to query the status of address that is involved as an object in a particular transaction

#### CLI​

[#26521](<https://github.com/MystenLabs/sui/pull/26521>): Adds `sui move format` passthrough command for `prettier-move` auto-formatter.

[#26697](<https://github.com/MystenLabs/sui/pull/26697>): `sui start --with-faucet` now responds to Ctrl+C / SIGINT and shuts down all subservices gracefully.

#### Indexing Framework​

[#26229](<https://github.com/MystenLabs/sui/pull/26229>): Validate streaming backoff config and use saturating fallback math so retries cannot stall without progress.

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/testnet-v1.73.1>​

* * *

## v1.72.5​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.72.5>)_

#### ⚠️⚠️⚠️ Emergency Release ⚠️⚠️⚠️​

[#26846](<https://github.com/MystenLabs/sui/pull/26846>): Adds a force_epoch_close operator lever (node config or mainnet binary constant) to deterministically close a wedged epoch at a pinned consensus commit index. No-op and behavior-identical when unset.

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.72.5>​

* * *

## v1.72.4​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.72.4>)_

#### ⚠️⚠️⚠️ Emergency Release ⚠️⚠️⚠️​

[#26832](<https://github.com/MystenLabs/sui/pull/26832>): Fixed an address-balance gas-smashing edge case where `InsufficientFundsForWithdraw` transactions could panic during settlement; they now fail cleanly with zero gas charged.

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.72.4>​

* * *

## v1.72.3​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.72.3>)_

#### Sui Protocol Version in this release: `125`​

[#26740](<https://github.com/MystenLabs/sui/pull/26740>): Testnet: advance epoch based on timestamp instead of validator votes.

[#26246](<https://github.com/MystenLabs/sui/pull/26246>): New flag for dealing with party object extensions for incurring post execution writes

#### GraphQL​

[#26594](<https://github.com/MystenLabs/sui/pull/26594>): Support checkpoint lookup by digest

[#26495](<https://github.com/MystenLabs/sui/pull/26495>): add asTransactionObject which allows user to query the status of address that is involved as an object in a particular transaction

#### CLI​

[#26521](<https://github.com/MystenLabs/sui/pull/26521>): Adds `sui move format` passthrough command for `prettier-move` auto-formatter.

[#26697](<https://github.com/MystenLabs/sui/pull/26697>): `sui start --with-faucet` now responds to Ctrl+C / SIGINT and shuts down all subservices gracefully.

#### Indexing Framework​

[#26229](<https://github.com/MystenLabs/sui/pull/26229>): Validate streaming backoff config and use saturating fallback math so retries cannot stall without progress.

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.72.3>​

* * *

## v1.72.2​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.72.2>)_

⚠️ Please upgrade ASAP. This release introduces two major protocol enhancements: [Address Balances](<https://docs.sui.io/onchain-finance/asset-custody/address-balances/using-address-balances>) and [Gasless Stablecoin Transfers](<https://docs.sui.io/develop/transaction-payment/gasless-stablecoin-transfers>). Address Balances introduce a canonical per-address balance model for each token type alongside the existing `Coin<T>` object model, simplifying transaction construction by removing the need for coin selection, splitting, and merging. Gasless Stablecoin Transfers enable supported stablecoins to be sent peer-to-peer — including batched PTBs — with no gas fees and no gas token required.

#### Sui Protocol Version in this release: `124`​

[#26505](<https://github.com/MystenLabs/sui/pull/26505>): Bump protocol version

[#26203](<https://github.com/MystenLabs/sui/pull/26203>): Adds protocol version 123 (`gas_model_version` 12). Fixes a stack-height double-decrement in the gas meter for native calls. Internal accounting correctness only; no user-visible change to successful transactions.

[#26504](<https://github.com/MystenLabs/sui/pull/26504>): Enables address balances, gasless transactions, coin reservations, and the accumulator/withdraw stack on mainnet at protocol version 125. Gasless transactions are gated behind an empty token allow-list until a follow-up configures the mainnet tokens.

[#26417](<https://github.com/MystenLabs/sui/pull/26417>): Adds the mainnet stablecoin gasless allowlist (USDC, USDSUI, SUI_USDE, USDY, FDUSD, AUSD, USDB) with a $0.01 per-stable minimum transfer in protocol v123. Gasless remains disabled on mainnet.

#### Nodes (Validators and Full nodes)​

[#26456](<https://github.com/MystenLabs/sui/pull/26456>): callers of `DBMap::safe_range_iter(..=K)` or `DBMap::reversed_safe_iter_with_bounds(_, Some(K))` where `K` serializes to all `0xFF` will now correctly include the entry at `K`. Previously that entry was silently skipped.

#### gRPC​

[#26403](<https://github.com/MystenLabs/sui/pull/26403>): rpc-index DB version has been updated to `4`. This means that on startup re-indexing will be required and can take some time depending on the amount of object history present on the node.

#### GraphQL​

[#26525](<https://github.com/MystenLabs/sui/pull/26525>): Adding new TransactionEffects.version field for typed TransactionEffects version (v1, v2, etc)

#### CLI​

[#26369](<https://github.com/MystenLabs/sui/pull/26369>): Fix `sui client send-funds` which was always failing with `Insufficient balance … Coin balance: 0` regardless of the sender's actual coin balance.

[#26405](<https://github.com/MystenLabs/sui/pull/26405>): `sui replay` now allows to pass a custom `node` url to a `GraphQL` server: `sui replay --node https://graphql.devnet.sui.io/graphql`.

[#26346](<https://github.com/MystenLabs/sui/pull/26346>): external-keys subcommand receives --provision-mode [recoverable-assumed|mnemonic-backed|non-recoverable]

[#26485](<https://github.com/MystenLabs/sui/pull/26485>): Sui CLI has a new `--forking-mode` flag to be used with the new `sui-fork` tool to allow impersonate a sender.

#### Indexing Framework​

[#26357](<https://github.com/MystenLabs/sui/pull/26357>): A new `pipeline-depth` config knob is added to sequential pipelines which allows the pipeline to continue to build batches while a batch is being flushed to the database. No need to set this config explicitly, the default value should suffice.

[#26358](<https://github.com/MystenLabs/sui/pull/26358>): Added MAX_PENDING_ROWS to sequential pipelines. It's a soft-cap that forces the batching loop to attempt a flush to the database, not a hard-cap on the amount of rows buffered in memory.

[#26268](<https://github.com/MystenLabs/sui/pull/26268>): sui-indexer-alt-framework-store-traits: add store/connection test macros

[#26526](<https://github.com/MystenLabs/sui/pull/26526>): Add support to `IngestionClient` to set arbitrary headers when making requests to remote stores.

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.72.2>​

* * *

## v1.71.1​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.71.1>)_

#### Sui Protocol Version in this release: `123`​

[#26492](<https://github.com/MystenLabs/sui/pull/26492>): Bump protocol version

[#26166](<https://github.com/MystenLabs/sui/pull/26166>): - Adds `sui::dynamic_field::borrow_or_add`

  * Adds `sui::dynamic_field::borrow_mut_or_add`
  * Adds `sui::dynamic_field::get_do`
  * Adds `sui::dynamic_field::get_mut_do`
  * Adds `sui::dynamic_field::get_fold`
  * Adds `sui::dynamic_field::get_mut_fold`
  * Adds `sui::dynamic_object_field::borrow_or_add`
  * Adds `sui::dynamic_object_field::borrow_mut_or_add`
  * Adds `sui::dynamic_object_field::get_do`
  * Adds `sui::dynamic_object_field::get_mut_do`
  * Adds `sui::dynamic_object_field::get_fold`
  * Adds `sui::dynamic_object_field::get_mut_fold`


[#26196](<https://github.com/MystenLabs/sui/pull/26196>): deprecates `vector::empty` and `vector::singleton` in the MoveStdlib

[#26226](<https://github.com/MystenLabs/sui/pull/26226>): - Deprecated `sui::dynamic_field::exists_` in favor of `sui::dynamic_field::exists`.

  * Deprecated `sui::dynamic_field::remove_if_exists` in favor of `sui::dynamic_field::remove_opt`.
  * Deprecated `sui::dynamic_object_field::exists_` in favor of `sui::dynamic_object_field::exists`.
  * Adds `sui::dynamic_object_field::remove_opt`.


[#25959](<https://github.com/MystenLabs/sui/pull/25959>): Add a new native function, **verify_bulletproof_ristretto255_internal** and enable on devnet.

[#26248](<https://github.com/MystenLabs/sui/pull/26248>): - Adds `sui::dynamic_field::replace`.

  * Adds `sui::dynamic_object_field::replace`.


[#26318](<https://github.com/MystenLabs/sui/pull/26318>): Adds amendments to certain linkages to allow them to be loaded into the new VM.

#### GraphQL​

[#25863](<https://github.com/MystenLabs/sui/pull/25863>): Add new verifySignature

[#26208](<https://github.com/MystenLabs/sui/pull/26208>): Fixes an issue where a derived object or dynamic field load could be incorrectly bounded by the version of the object containing the derived object key, instead of the parent.

#### Indexing Framework​

[#26181](<https://github.com/MystenLabs/sui/pull/26181>): Implement `accepts_chain_id` in consistent store.

[#26171](<https://github.com/MystenLabs/sui/pull/26171>): Implement `accepts_chain_id` in analytics indexer.

[#26247](<https://github.com/MystenLabs/sui/pull/26247>): Implement `accepts_chain_id` in object store

[#26150](<https://github.com/MystenLabs/sui/pull/26150>): Implements `ConcurrentConnection` for `BigTableConnection` to support backwards indexing. Updates `BigTableReader` to use new watermark format.

[#26302](<https://github.com/MystenLabs/sui/pull/26302>): ## Adaptive ingestion for sequential pipelines

Sequential pipelines now participate in the adaptive ingestion concurrency system alongside concurrent pipelines. Fetch concurrency is driven by per-subscriber bounded-channel fill across both pipeline types — one mechanism, no special cases.

#### Removed​

  * **`checkpoint_lag`** is gone. The sequential committer no longer holds writes back behind a lag window; it commits whenever contiguous checkpoints are available.
  * **`checkpoint_buffer_size`** is gone.


#### Added​

  * **`subscriber_channel_size`** is now a per-pipeline knob under the pipeline's `ingestion` section. Defaults to `max(num_cpus / 2, 4)`.
[code] [pipeline.my_pipeline.ingestion]  
        subscriber_channel_size = 32  
        
[/code]


#### Migration​

Config layers carry `#[serde(deny_unknown_fields)]`, so stale fields will fail to parse on upgrade. Before deploying:

  * Remove `checkpoint_buffer_size` from `[ingestion]`.
  * Remove `checkpoint_lag` from any `[pipeline.*]` section.


**We recommend omitting these overrides entirely** — the adaptive controller sizes fetch concurrency against the slowest subscriber automatically.

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.71.1>​

* * *

## v1.70.2​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.70.2>)_

#### Sui Protocol Version in this release: `121`​

[#26095](<https://github.com/MystenLabs/sui/pull/26095>): Shifts 120 to 121, and adds an additional check in 120 to enforce cleanliness around jumps.

[#23295](<https://github.com/MystenLabs/sui/pull/23295>): Adds the Move standard library function `std::u8::mul_div` Adds the Move standard library function `std::u8::mul_div_ceil` Adds the Move standard library function `std::u16::mul_div` Adds the Move standard library function `std::u16::mul_div_ceil` Adds the Move standard library function `std::u32::mul_div` Adds the Move standard library function `std::u32::mul_div_ceil` Adds the Move standard library function `std::u64::mul_div` Adds the Move standard library function `std::u64::mul_div_ceil` Adds the Move standard library function `std::u128::mul_div` Adds the Move standard library function `std::u128::mul_div_ceil` Adds the Move standard library function `std::u256::mul_div` Adds the Move standard library function `std::u256::mul_div_ceil`

[#26051](<https://github.com/MystenLabs/sui/pull/26051>): Deprecated `std::u8::divide_and_round_up` in favor of `std::u8::div_ceil`. Deprecated `std::u16::divide_and_round_up` in favor of `std::u16::div_ceil`. Deprecated `std::u32::divide_and_round_up` in favor of `std::u32::div_ceil`. Deprecated `std::u64::divide_and_round_up` in favor of `std::u64::div_ceil`. Deprecated `std::u128::divide_and_round_up` in favor of `std::u128::div_ceil`. Deprecated `std::u256::divide_and_round_up` in favor of `std::u256::div_ceil`.

#### gRPC​

[#26070](<https://github.com/MystenLabs/sui/pull/26070>): When `0x1::type_name::TypeName` Move values show up in structured outputs, it will show up as a simple string representation of the type, rather than an object with a `name` field.

[#26062](<https://github.com/MystenLabs/sui/pull/26062>): Display v2: Implicitly format fields using the `json` transform, if the `str` transform would not work for them.

#### JSON-RPC​

[#26070](<https://github.com/MystenLabs/sui/pull/26070>): When `0x1::type_name::TypeName` Move values show up in structured outputs, it will show up as a simple string representation of the type, rather than an object with a `name` field.

[#26062](<https://github.com/MystenLabs/sui/pull/26062>): Display v2: Implicitly format fields using the `json` transform, if the `str` transform would not work for them.

#### GraphQL​

[#26061](<https://github.com/MystenLabs/sui/pull/26061>): Bugfix in how GraphQL fetches Display v2 formats

[#26070](<https://github.com/MystenLabs/sui/pull/26070>): When `0x1::type_name::TypeName` Move values show up in structured outputs, it will show up as a simple string representation of the type, rather than an object with a `name` field.

[#26062](<https://github.com/MystenLabs/sui/pull/26062>): Display v2: Implicitly format fields using the `json` transform, if the `str` transform would not work for them.

#### Indexing Framework​

[#25881](<https://github.com/MystenLabs/sui/pull/25881>): Refactors `Connection` trait into `ConcurrentConnection`/`SequentialConnection` subtraits and `Store` trait into `ConcurrentStore`/`SequentialStore` subtraits.

[#26092](<https://github.com/MystenLabs/sui/pull/26092>): Removes `SequentialStore::sequential_connect` which was introduced in a recent refactoring but is not used.

[#26133](<https://github.com/MystenLabs/sui/pull/26133>): Implements `ConcurrentConnection` for `ObjectStoreConnection` to support backwards indexing.

[#26096](<https://github.com/MystenLabs/sui/pull/26096>): Remove `CheckpointData::Raw` raw variant. Treat all ingestion errors as transient (retryable). Populate `total_ingested_bytes` during gRPC ingestion.

[#26116](<https://github.com/MystenLabs/sui/pull/26116>): Added `IngestionClientTrait::latest_checkpoint_number()`, concurrent pipelines with pruning enabled now start indexing at `network tip - retention`.

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.70.2>​

* * *

## v1.69.2​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.69.2>)_

#### Sui Protocol Version in this release: `120`​

[#26098](<https://github.com/MystenLabs/sui/pull/26098>): adds an additional check in protocol version 120 to enforce cleanliness around jumps.

[#25792](<https://github.com/MystenLabs/sui/pull/25792>): metadata hardening in Sui System

[#25838](<https://github.com/MystenLabs/sui/pull/25838>): Enables the new Move VM in protocol version 118.

[#25911](<https://github.com/MystenLabs/sui/pull/25911>): New VM pushed to 119 instead of 118 due to cherry-pick

#### gRPC​

[#25908](<https://github.com/MystenLabs/sui/pull/25908>): Fix X_SUI_CHAIN_ID header to return full 32-byte, base58 encoded chain id

[#25828](<https://github.com/MystenLabs/sui/pull/25828>): Wire up balance changes and object set for archival

[#26112](<https://github.com/MystenLabs/sui/pull/26112>): Display v2: Implicitly format fields using the `json` transform, if the `str` transform would not work for them.

#### JSON-RPC​

[#26112](<https://github.com/MystenLabs/sui/pull/26112>): Display v2: Implicitly format fields using the `json` transform, if the `str` transform would not work for them.

#### GraphQL​

[#26112](<https://github.com/MystenLabs/sui/pull/26112>): Display v2: Implicitly format fields using the `json` transform, if the `str` transform would not work for them.

#### CLI​

[#25862](<https://github.com/MystenLabs/sui/pull/25862>): `sui client object` now displays decoded Move struct fields instead of raw BCS-encoded byte arrays.

[#25444](<https://github.com/MystenLabs/sui/pull/25444>): `sui move build --dump` can now be run without an active network connection if tree shaking is disabled.

fixes for ephemeral publication with local dependencies on windows.

improved error message when building against an undefined environment.

#### Indexing Framework​

[#25838](<https://github.com/MystenLabs/sui/pull/25838>): Fix a clippy lint in `mocks/store.rs`

Co-authored-by: @cgswords

[#25834](<https://github.com/MystenLabs/sui/pull/25834>): Renamed `IngestionClientTrait::fetch` to `IngestionClientTrait::checkpoint`.

[#25895](<https://github.com/MystenLabs/sui/pull/25895>): Adds new `IngestionClientTrait::chain_id` to retrieve the `chain_id` from that ingestion source.

[#25905](<https://github.com/MystenLabs/sui/pull/25905>): Changed `Processor`'s receiver to accept new `CheckpointEnvelope` type containing the `chain_id`.

[#25875](<https://github.com/MystenLabs/sui/pull/25875>): Add `Connection::init_chain_id` method to store and retrieve `chain_id`.

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.69.2>​

* * *

## v1.68.1​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.68.1>)_

#### Sui Protocol Version in this release: `118`​

[#25907](<https://github.com/MystenLabs/sui/pull/25907>): Add missing function for display migration cap

[#25674](<https://github.com/MystenLabs/sui/pull/25674>): Enables address aliases feature on mainnet.

[#23710](<https://github.com/MystenLabs/sui/pull/23710>): Enables Display V2 (`0xd` system object is created)

[#25827](<https://github.com/MystenLabs/sui/pull/25827>): metadata hardening in Sui System

#### Nodes (Validators and Full nodes)​

[#25624](<https://github.com/MystenLabs/sui/pull/25624>): Fixes a potential fullnode panic when simulating a malformed transaction with invalid funds withdrawals.

#### JSON-RPC​

[#25360](<https://github.com/MystenLabs/sui/pull/25360>): Adds support for Display Registry to JSONRPC: When `showDisplay` is set, the RPC will look for a `Display<T>` stored in the Display Registry and will use that as the source of truth for its type's format. This takes precedence over any Display v1 formats that exist for this type.

#### GraphQL​

[#25479](<https://github.com/MystenLabs/sui/pull/25479>): Introduce `MoveValue.asVector` for paginating through vectors of Move Values.

[#25657](<https://github.com/MystenLabs/sui/pull/25657>): Introduce a new union `SignatureScheme` for `UserSignature`

[#25715](<https://github.com/MystenLabs/sui/pull/25715>): ZkLoginVerifyResult will not contain error anymore. Error will not be part of GraphQL response error

[#25242](<https://github.com/MystenLabs/sui/pull/25242>): Adds support for Display Registry to GraphQL: `MoveValue.display` will look for a `Display<T>` stored in the Display Registry and will use that as the source of truth for its type's format. This takes precedence over any Display v1 formats that exist for this type.

#### Indexing Framework​

[#25641](<https://github.com/MystenLabs/sui/pull/25641>): Processor concurrency (`fanout`) and ingestion concurrency (`ingest_concurrency`) now use adaptive concurrency control by default. Instead of a fixed number of workers, concurrency starts at 1 and scales automatically based on downstream channel backpressure — up to `num_cpus` for processors and up to 500 for ingestion.

**Breaking changes:**

  * `Processor::FANOUT` trait constant has been removed. Processor concurrency is now configured via the `fanout` field on `ConcurrentConfig` / `SequentialConfig`, which accepts a `ConcurrencyConfig` enum instead of `usize`.
  * `ingest_concurrency` in `IngestionConfig` changed from `usize` to `ConcurrencyConfig`.
  * A new `processor_channel_size` field controls the channel between the processor and downstream stage (defaults to `num_cpus / 2`). This channel previously sized itself from `FANOUT + PIPELINE_BUFFER`.


**Migration:** To preserve previous fixed-concurrency behavior, set `fanout: Some(ConcurrencyConfig::Fixed { value: N })` or `ingest_concurrency: ConcurrencyConfig::Fixed { value: N }`. Otherwise, no changes are needed — the adaptive defaults should work well for most workloads.

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.68.1>​

* * *

## v1.67.3​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.67.3>)_

#### Sui Protocol Version in this release: `115`​

[#25795](<https://github.com/MystenLabs/sui/pull/25795>): Adds a new protocol version 115 to normalize representation of some structures within the VM.

[#25556](<https://github.com/MystenLabs/sui/pull/25556>): Enables the address aliases feature on mainnet.

[#25585](<https://github.com/MystenLabs/sui/pull/25585>): Add a new protocol version to support some refactoring in execution.

[#25364](<https://github.com/MystenLabs/sui/pull/25364>): test only changes, no user impact

#### GraphQL​

[#25261](<https://github.com/MystenLabs/sui/pull/25261>): Error field is no longer available in simulateResult and ExecutionResult. They will be propagated in GraphQL errors

#### CLI​

[#25074](<https://github.com/MystenLabs/sui/pull/25074>): `sui move build --dump` (the short version of `--dump-bytecode-as-base64`) now correctly outputs bytecode with the 0 address.

[#25587](<https://github.com/MystenLabs/sui/pull/25587>): Fixed a bug to re-enable pretty printing of `sui client ptb` output.

#### Indexing Framework​

[#25434](<https://github.com/MystenLabs/sui/pull/25434>): Fixes an issue where the ingestion client allowed configuring multiple sources but all but one source was ignored, based on an implicit precedence order. Now exactly one source must be supplied.

[#25593](<https://github.com/MystenLabs/sui/pull/25593>): Reducing ingestion concurrency and channel size. Testing showed this eliminated OOM issues when processing large checkpoints without bottlenecking a 16 cpu machine.

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.67.3>​

* * *

## v1.66.2​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.66.2>)_

#### Sui Protocol Version in this release: `113`​

[#25588](<https://github.com/MystenLabs/sui/pull/25588>): Bump protocol version

[#25361](<https://github.com/MystenLabs/sui/pull/25361>): in version 111 error from dev inspect, dry run and execution are more consistent and the same for transaction data checks

[#25321](<https://github.com/MystenLabs/sui/pull/25321>): Add Ristretto255 group operations to sui-framework on devnet.

#### Nodes (Validators and Full nodes)​

[#25257](<https://github.com/MystenLabs/sui/pull/25257>): Added multi-provider Ethereum RPC support to the bridge node.

Operators can now configure multiple Ethereum RPC endpoints with quorum-based consensus for improved redundancy and fault tolerance.

New optional YAML config fields (in sui bridge config):

  * `eth-rpc-urls` (list of RPC URLs),
  * `eth-rpc-quorum` (quorum size, defaults to 1)
  * `eth-health-check-interval-secs` (health check interval, defaults to 300s).


The existing `eth-rpc-url` field continues to work for backward compatibility. When a single URL is configured, the multi-provider layer operates as a zero-overhead passthrough with no quorum, health-check, or locking machinery.

#### gRPC​

[#25191](<https://github.com/MystenLabs/sui/pull/25191>): Read the new BigTable schema and per-pipeline watermarks.

#### GraphQL​

[#25109](<https://github.com/MystenLabs/sui/pull/25109>): Partial error will be properly supported in GraphQL. Invalid fields will have error messages and valid fields will still be displayed normally

[#25110](<https://github.com/MystenLabs/sui/pull/25110>): Partial error will be properly supported in GraphQL. Invalid fields will have error messages and valid fields will still be displayed normally

[#25186](<https://github.com/MystenLabs/sui/pull/25186>): `chainIdentifier` query now returns full Base58-encoded 32 byte digest

[#24788](<https://github.com/MystenLabs/sui/pull/24788>): add bloom filter pipelines for scanning APIs

[#25191](<https://github.com/MystenLabs/sui/pull/25191>): Read the new BigTable schema and per-pipeline watermarks.

#### CLI​

[#24469](<https://github.com/MystenLabs/sui/pull/24469>): Sui CLI now supports auto-complete via clap-complete.
[code] 
    sui completion --generate bash  
    sui completion --generate elvish  
    sui completion --generate fish  
    sui completion --generate powershell  
    sui completion --generate zsh  
    
[/code]

Put the output in a file in the right directory for your shell (e.g., for fish in `~/.config/fish/completions/sui.fish`) and restart your shell. Use double `TAB` to trigger the auto completion menu.

[#25226](<https://github.com/MystenLabs/sui/pull/25226>): `sui move test` now uses Sui's gas meter and limits.

[#25405](<https://github.com/MystenLabs/sui/pull/25405>): Fix an issue where the CLI would fail to infer the type of a primitive argument to a Move call if that argument was accessed by reference or by mutable reference.

[#25082](<https://github.com/MystenLabs/sui/pull/25082>): You can now do `sui move build --dump-bytecode-as-base64 --pubfile-path <file>` to use ephemeral addresses for dumped bytecode.

The `--dump` flag can be used as a shorthand for `--dump-bytecode-as-base64`.

The full flag for `-e` has been changed to `--build-env` (the shorthand `-e` remains the same)

Fixed a bug when `--pubfile-path` is used with `-p`

[#25592](<https://github.com/MystenLabs/sui/pull/25592>): Fixed a bug to re-enable pretty printing of `sui client ptb` output.

#### Indexing Framework​

[#25324](<https://github.com/MystenLabs/sui/pull/25324>): Disable object_store crate internal retries to make errors immediately visible to framework.

[#25325](<https://github.com/MystenLabs/sui/pull/25325>): Fix memory leak in ingestion stream.

[#25334](<https://github.com/MystenLabs/sui/pull/25334>): Enable ingestion backpressure for concurrent pipelines

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.66.2>​

* * *

## v1.65.2​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.65.2>)_

#### Sui Protocol Version in this release: `111`​

[#25366](<https://github.com/MystenLabs/sui/pull/25366>): 111 makes more consistent check across execution mode and transaction data

[#24957](<https://github.com/MystenLabs/sui/pull/24957>): Enable custom nonzero pcrs parsing for mainnet in version 109.

#### gRPC​

[#25392](<https://github.com/MystenLabs/sui/pull/25392>): Fixes a bug that was introduced in #24797 that could lead to the balance index being incorrect if a fullnode restored indexes with the 1.64 release.

#### GraphQL​

[#24963](<https://github.com/MystenLabs/sui/pull/24963>): `Balance.totalBalance` now returns the sum of balances from owned coins and from the accumulator object. The individual coin or address balances can be retrieved through `Balance.coinBalance` and `Balance.addressBalance` respectively. For the previous behavior, select the `Balance.coinBalance` field for coin balances only.

[#25108](<https://github.com/MystenLabs/sui/pull/25108>): Partial error will be properly supported in GraphQL. Invalid fields will have error messages and valid fields will still be displayed normally

#### CLI​

[#25016](<https://github.com/MystenLabs/sui/pull/25016>): The `--sender` flag is now correctly respected in `sui client publish` and `sui client upgrade` commands when used with `--serialize-unsigned-transaction`. Previously, the sender was incorrectly inferred from gas objects, ignoring the `--sender` flag.

#### Indexing Framework​

[#24066](<https://github.com/MystenLabs/sui/pull/24066>): Ingest zstd-compressed proto files rather than BCS files

[#24991](<https://github.com/MystenLabs/sui/pull/24991>): `remote_client::RemoteIngestionClient` becomes `store_client::StoreIngestionClient` and supports any valid implementation of `object_store::ObjectStore` as a checkpoint source.

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.65.2>​

* * *

## v1.64.2​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.64.2>)_

#### Sui Protocol Version in this release: `109`​

[#25147](<https://github.com/MystenLabs/sui/pull/25147>): fix(sui-http): use explicit rustls::CryptoProvider

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.64.2>​

* * *

## v1.64.1​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.64.1>)_

#### Sui Protocol Version in this release: `109`​

[#24802](<https://github.com/MystenLabs/sui/pull/24802>): `TxContext` arguments can now appear in any position and still be callable in the PTB layer.

[#24835](<https://github.com/MystenLabs/sui/pull/24835>): Signature check for entry functions is disabled. Move compiler changes will follow

[#24895](<https://github.com/MystenLabs/sui/pull/24895>): Enables address alias feature on testnet.

[#24879](<https://github.com/MystenLabs/sui/pull/24879>): poseidon_bn254 is enabled on all networks.

#### gRPC​

[#24794](<https://github.com/MystenLabs/sui/pull/24794>): Return an error when `balance_changes` is requested but the transactions have not been indexed yet.

#### GraphQL​

[#24782](<https://github.com/MystenLabs/sui/pull/24782>): Introduce `Query.node(id: ID!): Node`, part of the GraphQL Global Identification Specification, to the schema, to support Relay's `@refetchable` annotation.

[#24781](<https://github.com/MystenLabs/sui/pull/24781>): `Epoch.totalTransactions` now returns a value for the latest epoch as of the checkpoint being viewed, rather than `null`.

[#24750](<https://github.com/MystenLabs/sui/pull/24750>): Add `effectsJson` on `TransactionEffects` and `transactionJson` on `Transaction`, that supports returning effects and transactions as JSON blob

[#24865](<https://github.com/MystenLabs/sui/pull/24865>): GraphQL requests are now subject to a single "rich query" limit, which enforces a budget on the number of dedicated requests to the database can be made by a single request.

[#24836](<https://github.com/MystenLabs/sui/pull/24836>): Add balanceChangeEffectJson on TransactionEffects, that supports returning balance changes as JSON blob

[#24876](<https://github.com/MystenLabs/sui/pull/24876>): Added BalanceWithdraw type to TransactionInput union

[#24770](<https://github.com/MystenLabs/sui/pull/24770>): Introduces `MoveValue.extract` for extracting a sub-slice from a `MoveValue` using a Display v2 expression.

[#24771](<https://github.com/MystenLabs/sui/pull/24771>): Introduce `MoveValue.asAddress` and `IAddressable.addressAt` for coercing a `MoveValue` to a GraphQL `Address` and viewing an address at a difference checkpoint.

[#24772](<https://github.com/MystenLabs/sui/pull/24772>): Adds `DynamicFieldName.literal` for providing a dynamic field name as a Display v2 literal.

[#24774](<https://github.com/MystenLabs/sui/pull/24774>): Add `MoveValue.format` to evaluate a single format string against a Move value.

[#24775](<https://github.com/MystenLabs/sui/pull/24775>):  PTB Inputs are represented as `MoveValue`-s, if their types can be inferred.

[#24776](<https://github.com/MystenLabs/sui/pull/24776>): Remove fields related to the system state from `Epoch`, in favour of exposing the whole system state as `Epoch.systemState: MoveValue`. Similarly replace most fields on `ValidatorSet` with `ValidatorSet.contents: MoveValue`, and `Validator` with `Validator.contents: MoveValue`.

[#24779](<https://github.com/MystenLabs/sui/pull/24779>): Replace `Query.suinsName(name: ...)` with `Query.address(name: ...)`, replace `IAddressable.defaultSuinsName` with `IAddressable.defaultNameRecord.target`, and add `Query.nameRecord` for fetching the SuiNS NameRecord for a given SuiNS name.

[#25025](<https://github.com/MystenLabs/sui/pull/25025>): `Balance.totalBalance` now returns the sum of balances from owned coins and from the accumulator object. The individual coin or address balances can be retrieved through `Balance.coinBalance` and `Balance.addressBalance` respectively. For the previous behavior, select the `Balance.coinBalance` field for coin balances only.

#### CLI​

[#24822](<https://github.com/MystenLabs/sui/pull/24822>): Fixed the issue for `sui client publish | upgrade` around using various flags (e.g., dry-run).

[#24844](<https://github.com/MystenLabs/sui/pull/24844>): Added `--no-tree-shaking` flag that can only be used with `--dump-bytecode-as-base64`. This will ensure that all dependencies will be kept in the list of dependencies in the json output, regardless if they're used or not used in the source code. In contrast, by default, the CLI will remove any unused dependencies from the dependency list on publication/upgrade and when `--no-tree-shaking` flag is false.

#### Indexing Framework​

[#24925](<https://github.com/MystenLabs/sui/pull/24925>): Adding optional jitter to watermark update interval.

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.64.1>​

* * *

## v1.63.4​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.63.4>)_

#### 📕 Note:​

This release contains a performance fix and does not require a protocol version bump

#### Sui Protocol Version in this release: `107`​

[#24974](<https://github.com/MystenLabs/sui/pull/24974>): Restore the environment variable to enable write sync

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.63.4>​

* * *

## v1.63.3​

**✅ Mainnet** | _Source:[GitHub Release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.63.3>)_

#### Sui Protocol Version in this release: `107`​

[#24856](<https://github.com/MystenLabs/sui/pull/24856>): [consensus] improve direct finalization [#24943](<https://github.com/MystenLabs/sui/pull/24943>): Fix a consensus issue where validators do not agree on transactions that need to be rejected.

#### Nodes (Validators and Full nodes)​

[#24742](<https://github.com/MystenLabs/sui/pull/24742>): Disable validator RPC handlers for signing transactions and submitting transactions with aggregated validator signatures. Transaction submission using Quorum Driver or similar logic will no longer work. Transaction Driver and its related validator RPC handlers are the only way to submit transaction to Sui now.

#### gRPC​

[#24820](<https://github.com/MystenLabs/sui/pull/24820>): Return an error when `balance_changes` is requested but the transactions have not been indexed yet.

#### GraphQL​

[#24595](<https://github.com/MystenLabs/sui/pull/24595>): Partial error will be properly supported in GraphQL. Invalid fields will have error messages and valid fields will still be displayed normally

[#24679](<https://github.com/MystenLabs/sui/pull/24679>): Add support for `checks_enabled` and `do_gas_selection` argument for `query.simulateTransaction`

[#24681](<https://github.com/MystenLabs/sui/pull/24681>): Partial error will be properly supported in GraphQL. Invalid fields will have error messages and valid fields will still be displayed normally

[#24911](<https://github.com/MystenLabs/sui/pull/24911>): Add `effectsJson`, `balanceChangesJson` on TransactionEffects and `transactionJson` on Transaction, that supports returning effects and transactions as JSON blob

#### CLI​

[#24508](<https://github.com/MystenLabs/sui/pull/24508>): Removes `--verify-compatibility` and adds `--skip-verify-compatibility` defaulting to checking locally for upgrade compatibility errors.

[#24896](<https://github.com/MystenLabs/sui/pull/24896>): Several changes to the new package management system:

  * New `--no-tree-shaking` flag allows offline dump-bytecode-as-base64
  * Bug fixes for `move-analyzer`
  * Improvements to the `test-publish` command: the `Pub.localnet.toml` files can now be shared between dependencies more easily.
    * Added `test-upgrade` command
  * Added `test-publish --publish-unpublished-deps` command for push-button local deployment of a package and its dependencies
    * Error message fixes


#### Indexing Framework​

[#24503](<https://github.com/MystenLabs/sui/pull/24503>): The indexer, ingestion service, and metrics service all now return a `Service` instead of a `JoinHandle<()>` when run. Use `Service::main` to wait for the service to exit cleanly or with an error, or respond to a termination signal with a graceful shutdown. `Service` also exposes `wait_for_shutdown`, `join`, and `shutdown` functions to customise various aspects of the shutdown process.

[#24523](<https://github.com/MystenLabs/sui/pull/24523>): Fix pruning for concurrent pipelines when indexer is initialized with `--first-checkpoint`.

* * *

* * *

##### Full Log: <https://github.com/MystenLabs/sui/commits/mainnet-v1.63.3>​

* * *

* * *

info

This page has been truncated to stay within size limits. View the complete release history on [GitHub Releases](<https://github.com/MystenLabs/sui/releases>).

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/release-notes.mdx>)

[PreviousObject Display V2 Syntax](</references/object-display-syntax>)[NextGlossary](</references/sui-glossary>)

  * v1.73.1
  * v1.72.5
  * v1.72.4
  * v1.72.3
  * v1.72.2
  * v1.71.1
  * v1.70.2
  * v1.69.2
  * v1.68.1
  * v1.67.3
  * v1.66.2
  * v1.65.2
  * v1.64.2
  * v1.64.1
  * v1.63.4
  * v1.63.3
