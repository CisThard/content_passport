<!-- Source: https://docs.sui.io/references/fullnode-protocol-messages -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * gRPC
  * Message Definitions


On this page

# Sui Full Node gRPC Message Definitions

This page lists all message definitions for the [Sui Full Node gRPC API](</references/fullnode-protocol>). See also: [Enum and Scalar Type Definitions](</references/fullnode-protocol-types>)

Proto filessui/rpc/v2/checkpoint_summary.protosui/rpc/v2/owner.protosui/rpc/v2/event.protosui/rpc/v2/jwk.protosui/rpc/v2/bcs.protosui/rpc/v2/argument.protosui/rpc/v2/checkpoint.protosui/rpc/v2/input.protosui/rpc/v2/checkpoint_contents.protosui/rpc/v2/signature.protosui/rpc/v2/balance_change.protosui/rpc/v2/object_reference.protosui/rpc/v2/transaction.protosui/rpc/v2/signature_verification_service.protosui/rpc/v2/system_state.protosui/rpc/v2/executed_transaction.protosui/rpc/v2/protocol_config.protosui/rpc/v2/gas_cost_summary.protosui/rpc/v2/move_package_service.protosui/rpc/v2/object.protosui/rpc/v2/transaction_execution_service.protosui/rpc/v2/state_service.protosui/rpc/v2/name_service.protosui/rpc/v2/move_package.protosui/rpc/v2/effects.protosui/rpc/v2/ledger_service.protosui/rpc/v2/epoch.protosui/rpc/v2/execution_status.protosui/rpc/v2/subscription_service.protoMessagesJump to...CheckpointCommitmentCheckpointSummaryEndOfEpochData

## sui/rpc/v2/checkpoint_summary.proto​

CheckpointCommitment

A commitment made by a checkpoint.

digest

string _(optional)_

kind

CheckpointCommitmentKind _(optional)_

CheckpointSummary

A header for a checkpoint on the Sui blockchain.

bcs

Bcs _(optional)_ — This CheckpointSummary serialized as BCS.

commitments

CheckpointCommitment _(repeated)_ — Commitments to checkpoint-specific state.

content_digest

string _(optional)_ — The hash of the `CheckpointContents` for this checkpoint.

digest

string _(optional)_ — The digest of this CheckpointSummary.

... and 8 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-CheckpointSummary>)

EndOfEpochData

Data, which when included in a `CheckpointSummary`, signals the end of an `Epoch`.

epoch_commitments

CheckpointCommitment _(repeated)_ — Commitments to epoch specific state (live object set)

next_epoch_committee

ValidatorCommitteeMember _(repeated)_ — The set of validators that will be in the `ValidatorCommittee` for the next epoch.

next_epoch_protocol_version

uint64 _(optional)_ — The protocol version that is in effect during the next epoch.

## sui/rpc/v2/owner.proto​

Owner

Enum of different types of ownership for an object.

address

string _(optional)_ — Address or ObjectId of the owner

kind

OwnerKind _(optional)_

version

uint64 _(optional)_ — The `initial_shared_version` if kind is `SHARED` or `start_version` if kind `CONSENSUS_ADDRESS`.

## sui/rpc/v2/event.proto​

Event

An event.

contents

Bcs _(optional)_ — BCS serialized bytes of the event.

event_type

string _(optional)_ — The type of the event emitted.

json

Value _(optional)_ — JSON rendering of the event.

module

string _(optional)_ — Module name of the top-level function invoked by a `MoveCall` command that triggered this event to be emitted.

... and 2 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-Event>)

TransactionEvents

Events emitted during the successful execution of a transaction.

bcs

Bcs _(optional)_ — This TransactionEvents serialized as BCS.

digest

string _(optional)_ — The digest of this TransactionEvents.

events

Event _(repeated)_ — Set of events emitted by a transaction.

## sui/rpc/v2/jwk.proto​

Jwk

A JSON web key.

alg

string _(optional)_ — Algorithm parameter, <https://datatracker.ietf.org/doc/html/rfc7517#section-4.4>.

e

string _(optional)_ — RSA public exponent, <https://datatracker.ietf.org/doc/html/rfc7517#section-9.3>.

kty

string _(optional)_ — Key type parameter, <https://datatracker.ietf.org/doc/html/rfc7517#section-4.1>.

n

string _(optional)_ — RSA modulus, <https://datatracker.ietf.org/doc/html/rfc7517#section-9.3>.

JwkId

Key to uniquely identify a JWK.

iss

string _(optional)_ — The issuer or identity of the OIDC provider.

kid

string _(optional)_ — A key ID used to uniquely identify a key from an OIDC provider.

## sui/rpc/v2/bcs.proto​

Bcs

`Bcs` contains an arbitrary type that is serialized using the [BCS](<https://mystenlabs.github.io/sui-rust-sdk/sui_sdk_types/index.html#bcs>) format as well as a name that identifies the type of the serialized value.

name

string _(optional)_ — Name that identifies the type of the serialized value.

value

bytes _(optional)_ — Bytes of a BCS serialized value.

## sui/rpc/v2/argument.proto​

Argument

An argument to a programmable transaction command.

input

uint32 _(optional)_ — Index of an input when `kind` is `INPUT`.

kind

ArgumentKind _(optional)_

result

uint32 _(optional)_ — Index of a result when `kind` is `RESULT`.

subresult

uint32 _(optional)_ — Used to access a nested result when `kind` is `RESULT`.

## sui/rpc/v2/checkpoint.proto​

Checkpoint

contents

CheckpointContents _(optional)_ — The `CheckpointContents` for this checkpoint.

digest

string _(optional)_ — The digest of this Checkpoint's CheckpointSummary.

objects

ObjectSet _(optional)_ — Set of objects either referenced as inputs or produced as outputs by transactions included in this checkpoint. In order to benefit from deduplication of objects that appear in multiple transactions in this checkpoint, objects will only be present here and the `transactions.objects` field will not be populated.

sequence_number

uint64 _(optional)_ — The height of this checkpoint.

... and 3 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-Checkpoint>)

## sui/rpc/v2/input.proto​

FundsWithdrawal

amount

uint64 _(optional)_

coin_type

string _(optional)_

source

Source _(optional)_

Input

An input to a user transaction.

digest

string _(optional)_ — The digest of this object.

funds_withdrawal

FundsWithdrawal _(optional)_ — Fund Reservation information if `kind` is `FUNDS_WITHDRAWAL`.

kind

InputKind _(optional)_

literal

Value _(optional)_ — A literal value INPUT ONLY

... and 5 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-Input>)

## sui/rpc/v2/checkpoint_contents.proto​

AddressAliasesVersion

version

uint64 _(optional)_

CheckpointContents

The committed to contents of a checkpoint.

bcs

Bcs _(optional)_ — This CheckpointContents serialized as BCS.

digest

string _(optional)_ — The digest of this CheckpointContents.

transactions

CheckpointedTransactionInfo _(repeated)_ — Set of transactions committed to in this checkpoint.

version

int32 _(optional)_ — Version of this CheckpointContents

CheckpointedTransactionInfo

Transaction information committed to in a checkpoint.

address_aliases_versions

AddressAliasesVersion _(repeated)_ — The `AddressAliases` object version, if any, that was used to verify the UserSignature at the same position in `signatures`. This field is present when CheckpointContents.version is >= 2.

effects

string _(optional)_ — Digest of the effects.

signatures

UserSignature _(repeated)_ — Set of user signatures that authorized the transaction.

transaction

string _(optional)_ — Digest of the transaction.

## sui/rpc/v2/signature.proto​

CircomG1

A G1 point.

e0

string _(optional)_ — base10 encoded Bn254FieldElement

e1

string _(optional)_ — base10 encoded Bn254FieldElement

e2

string _(optional)_ — base10 encoded Bn254FieldElement

CircomG2

A G2 point.

e00

string _(optional)_ — base10 encoded Bn254FieldElement

e01

string _(optional)_ — base10 encoded Bn254FieldElement

e10

string _(optional)_ — base10 encoded Bn254FieldElement

e11

string _(optional)_ — base10 encoded Bn254FieldElement

... and 2 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-CircomG2>)

MultisigAggregatedSignature

Aggregated signature from members of a multisig committee.

bitmap

uint32 _(optional)_ — Bitmap indicating which committee members contributed to the signature.

committee

MultisigCommittee _(optional)_ — The committee to use to validate this signature.

legacy_bitmap

bytes _(optional)_ — If present, means this signature's on-chain format uses the old legacy multisig format.

signatures

MultisigMemberSignature _(repeated)_ — The plain signatures encoded with signature scheme. The signatures must be in the same order as they are listed in the committee.

MultisigCommittee

A multisig committee.

members

MultisigMember _(repeated)_ — A list of committee members and their corresponding weight.

threshold

uint32 _(optional)_ — The threshold of signatures needed to validate a signature from this committee.

MultisigMember

A member in a multisig committee.

public_key

MultisigMemberPublicKey _(optional)_ — The public key of the committee member.

weight

uint32 _(optional)_ — The weight of this member's signature.

MultisigMemberPublicKey

Set of valid public keys for multisig committee members.

public_key

bytes _(optional)_ — Public key bytes if scheme is ed25519 | secp256k1 | secp256r1 | passkey.

scheme

SignatureScheme _(optional)_ — The signature scheme of this public key.

zklogin

ZkLoginPublicIdentifier _(optional)_ — A zklogin public identifier if scheme is zklogin.

MultisigMemberSignature

A signature from a member of a multisig committee.

passkey

PasskeyAuthenticator _(optional)_ — The passkey authenticator if scheme is `PASSKEY`.

scheme

SignatureScheme _(optional)_ — The signature scheme of this signature.

signature

bytes _(optional)_ — Signature bytes if scheme is ed25519 | secp256k1 | secp256r1.

zklogin

ZkLoginAuthenticator _(optional)_ — The zklogin authenticator if scheme is `ZKLOGIN`.

PasskeyAuthenticator

A passkey authenticator.

authenticator_data

bytes _(optional)_ — Opaque authenticator data for this passkey signature. See [Authenticator Data](<https://www.w3.org/TR/webauthn-2/#sctn-authenticator-data>) for more information on this field.

client_data_json

string _(optional)_ — Structured, unparsed, JSON for this passkey signature. See [CollectedClientData](<https://www.w3.org/TR/webauthn-2/#dictdef-collectedclientdata>) for more information on this field.

signature

SimpleSignature _(optional)_ — A secp256r1 signature.

SimpleSignature

Either an ed25519, secp256k1 or secp256r1 signature

public_key

bytes _(optional)_ — Public key bytes

scheme

SignatureScheme _(optional)_ — The signature scheme of this signature.

signature

bytes _(optional)_ — Signature bytes

UserSignature

A signature from a user.

bcs

Bcs _(optional)_ — This signature serialized as as BCS. When provided as input this will support both the form that is length prefixed as well as not length prefixed.

scheme

SignatureScheme _(optional)_ — The signature scheme of this signature.

Union: **signature**

multisig

MultisigAggregatedSignature — The multisig aggregated signature if scheme is `MULTISIG`.

passkey

PasskeyAuthenticator — The passkey authenticator if scheme is `PASSKEY`.

simple

SimpleSignature — Simple signature if scheme is ed25519 | secp256k1 | secp256r1.

zklogin

ZkLoginAuthenticator — The zklogin authenticator if scheme is `ZKLOGIN`.

ValidatorAggregatedSignature

An aggregated signature from multiple validators.

bitmap

bytes _(optional)_ — Bitmap indicating which members of the committee contributed to this signature.

epoch

uint64 _(optional)_ — The epoch when this signature was produced. This can be used to lookup the `ValidatorCommittee` from this epoch to verify this signature.

signature

bytes _(optional)_ — The 48-byte Bls12381 aggregated signature.

ValidatorCommittee

The validator set for a particular epoch.

epoch

uint64 _(optional)_ — The epoch where this committee governs.

members

ValidatorCommitteeMember _(repeated)_ — The committee members.

ValidatorCommitteeMember

A member of a validator committee.

public_key

bytes _(optional)_ — The 96-byte Bls12381 public key for this validator.

weight

uint64 _(optional)_ — voting weight this validator possesses.

ZkLoginAuthenticator

A zklogin authenticator.

inputs

ZkLoginInputs _(optional)_ — Zklogin proof and inputs required to perform proof verification.

jwk_id

JwkId _(optional)_ — The id of the JWK used to authorize this zklogin authenticator

max_epoch

uint64 _(optional)_ — Maximum epoch for which the proof is valid.

public_identifier

ZkLoginPublicIdentifier _(optional)_ — The public identifier (similar to a public key) for this zklogin authenticator

... and 1 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-ZkLoginAuthenticator>)

ZkLoginClaim

A claim of the iss in a zklogin proof.

index_mod_4

uint32 _(optional)_

value

string _(optional)_

ZkLoginInputs

A zklogin groth16 proof and the required inputs to perform proof verification.

address_seed

string _(optional)_ — base10 encoded Bn254FieldElement

header_base64

string _(optional)_

iss_base64_details

ZkLoginClaim _(optional)_

proof_points

ZkLoginProof _(optional)_

ZkLoginProof

A zklogin groth16 proof.

a

CircomG1 _(optional)_

b

CircomG2 _(optional)_

c

CircomG1 _(optional)_

ZkLoginPublicIdentifier

Public key equivalent for zklogin authenticators.

address_seed

string _(optional)_ — base10 encoded Bn254FieldElement

iss

string _(optional)_

## sui/rpc/v2/balance_change.proto​

BalanceChange

The delta, or change, in balance for an address for a particular `Coin` type.

address

string _(optional)_ — The account address that is affected by this balance change event.

amount

string _(optional)_ — The amount or change in balance.

coin_type

string _(optional)_ — The `Coin` type of this balance change event.

## sui/rpc/v2/object_reference.proto​

ObjectReference

Reference to an object.

digest

string _(optional)_ — The digest of this object.

object_id

string _(optional)_ — The object id of this object.

version

uint64 _(optional)_ — The version of this object.

## sui/rpc/v2/transaction.proto​

ActiveJwk

A new JWK.

epoch

uint64 _(optional)_ — Most recent epoch in which the JWK was validated.

id

JwkId _(optional)_ — Identifier used to uniquely identify a JWK.

jwk

Jwk _(optional)_ — The JWK.

AuthenticatorStateExpire

Expire old JWKs.

authenticator_object_initial_shared_version

uint64 _(optional)_ — The initial version of the authenticator object that it was shared at.

min_epoch

uint64 _(optional)_ — Expire JWKs that have a lower epoch than this.

AuthenticatorStateUpdate

Update the set of valid JWKs.

authenticator_object_initial_shared_version

uint64 _(optional)_ — The initial version of the authenticator object that it was shared at.

epoch

uint64 _(optional)_ — Epoch of the authenticator state update transaction.

new_active_jwks

ActiveJwk _(repeated)_ — Newly active JWKs.

round

uint64 _(optional)_ — Consensus round of the authenticator state update.

CanceledTransaction

A transaction that was canceled.

digest

string _(optional)_ — Digest of the canceled transaction.

version_assignments

VersionAssignment _(repeated)_ — List of object version assignments.

ChangeEpoch

System transaction used to change the epoch.

computation_charge

uint64 _(optional)_ — The total amount of gas charged for computation during the epoch.

epoch

uint64 _(optional)_ — The next (to become) epoch ID.

epoch_start_timestamp

Timestamp _(optional)_ — Unix timestamp when epoch started.

non_refundable_storage_fee

uint64 _(optional)_ — The non-refundable storage fee.

... and 4 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-ChangeEpoch>)

Command

A single command in a programmable transaction.

Union: **command**

make_move_vector

MakeMoveVector — `forall T: Vec<T> -> vector<T>` Given n-values of the same type, it constructs a vector. For non-objects or an empty vector, the type tag must be specified.

merge_coins

MergeCoins — `(&mut Coin<T>, Vec<Coin<T>>)` It merges n-coins into the first coin.

move_call

MoveCall — A call to either an entry or a public Move function.

publish

Publish — Publishes a Move package. It takes the package bytes and a list of the package's transitive dependencies to link against on chain.

split_coins

SplitCoins — `(&mut Coin<T>, Vec<u64>)` -> `Vec<Coin<T>>` It splits off some amounts into new coins with those amounts.

transfer_objects

TransferObjects — `(Vec<forall T:key+store. T>, address)` It sends n-objects to the specified address. These objects must have store (public transfer) and either the previous owner must be an address or the object must be newly created.

upgrade

Upgrade — Upgrades a Move package. Takes (in order): 1. A vector of serialized modules for the package. 2. A vector of object ids for the transitive dependencies of the new package. 3. The object ID of the package being upgraded. 4. An argument holding the `UpgradeTicket` that must have been produced from an earlier command in the same programmable transaction.

ConsensusCommitPrologue

Consensus commit prologue system transaction.

This message can represent V1, V2, and V3 prologue types.

additional_state_digest

string _(optional)_ — Digest of any additional state computed by the consensus handler. Used to detect forking bugs as early as possible. Present in V4.

commit_timestamp

Timestamp _(optional)_ — Unix timestamp from consensus. Present in V1, V2, V3, V4.

consensus_commit_digest

string _(optional)_ — Digest of consensus output. Present in V2, V3, V4.

consensus_determined_version_assignments

ConsensusDeterminedVersionAssignments _(optional)_ — Stores consensus handler determined consensus object version assignments. Present in V3, V4.

... and 3 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-ConsensusCommitPrologue>)

ConsensusDeterminedVersionAssignments

Version assignments performed by consensus.

canceled_transactions

CanceledTransaction _(repeated)_ — Canceled transaction version assignment.

version

int32 _(optional)_ — Version of this message

EndOfEpochTransaction

Set of operations run at the end of the epoch to close out the current epoch and start the next one.

transactions

EndOfEpochTransactionKind _(repeated)_

EndOfEpochTransactionKind

Operation run at the end of an epoch.

kind

Kind _(optional)_

Union: **data**

authenticator_state_expire

AuthenticatorStateExpire — Expire JWKs used for zklogin.

bridge_chain_id

string — ChainId used when initializing the bridge

bridge_object_version

uint64 — Start version of the Bridge object

change_epoch

ChangeEpoch — End the epoch and start the next one.

execution_time_observations

ExecutionTimeObservations — Execution time observations from the committee to preserve cross epoch

storage_cost

uint64 — Contains the end-of-epoch-computed storage cost for accumulator objects.

ExecutionTimeObservation

kind

ExecutionTimeObservationKind _(optional)_

move_entry_point

MoveCall _(optional)_

validator_observations

ValidatorExecutionTimeObservation _(repeated)_

ExecutionTimeObservations

observations

ExecutionTimeObservation _(repeated)_

version

int32 _(optional)_ — Version of this ExecutionTimeObservations

GasPayment

Payment information for executing a transaction.

budget

uint64 _(optional)_ — Total budget willing to spend for the execution of a transaction.

objects

ObjectReference _(repeated)_ — Set of gas objects to use for payment.

owner

string _(optional)_ — Owner of the gas objects, either the transaction sender or a sponsor.

price

uint64 _(optional)_ — Gas unit price to use when charging for computation. Must be greater than or equal to the network's current RGP (reference gas price).

GenesisTransaction

The genesis transaction.

objects

Object _(repeated)_ — Set of genesis objects.

MakeMoveVector

Command to build a Move vector out of a set of individual elements.

element_type

string _(optional)_ — Type of the individual elements. This is required to be set when the type can't be inferred, for example when the set of provided arguments are all pure input values.

elements

Argument _(repeated)_ — The set individual elements to build the vector with.

MergeCoins

Command to merge multiple coins of the same type into a single coin.

coin

Argument _(optional)_ — Coin to merge coins into.

coins_to_merge

Argument _(repeated)_ — Set of coins to merge into `coin`. All listed coins must be of the same type and be the same type as `coin`

MoveCall

Command to call a Move function.

arguments

Argument _(repeated)_ — The arguments to the function.

function

string _(optional)_ — The function to be called.

module

string _(optional)_ — The specific module in the package containing the function.

package

string _(optional)_ — The package containing the module and function.

... and 1 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-MoveCall>)

ProgrammableTransaction

A user transaction.

Contains a series of native commands and Move calls where the results of one command can be used in future commands.

commands

Command _(repeated)_ — The commands to be executed sequentially. A failure in any command results in the failure of the entire transaction.

inputs

Input _(repeated)_ — Input objects or primitive values.

Publish

Command to publish a new Move package.

dependencies

string _(repeated)_ — Set of packages that the to-be published package depends on.

modules

bytes _(repeated)_ — The serialized Move modules.

RandomnessStateUpdate

Randomness update.

epoch

uint64 _(optional)_ — Epoch of the randomness state update transaction.

random_bytes

bytes _(optional)_ — Updated random bytes.

randomness_object_initial_shared_version

uint64 _(optional)_ — The initial version of the randomness object that it was shared at.

randomness_round

uint64 _(optional)_ — Randomness round of the update.

SplitCoins

Command to split a single coin object into multiple coins.

amounts

Argument _(repeated)_ — The amounts to split off.

coin

Argument _(optional)_ — The coin to split.

SystemPackage

System package.

dependencies

string _(repeated)_ — Package dependencies.

modules

bytes _(repeated)_ — Move modules.

version

uint64 _(optional)_ — Version of the package.

Transaction

A transaction.

bcs

Bcs _(optional)_ — This Transaction serialized as BCS.

digest

string _(optional)_ — The digest of this Transaction.

expiration

TransactionExpiration _(optional)_

gas_payment

GasPayment _(optional)_

... and 3 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-Transaction>)

TransactionExpiration

A TTL for a transaction.

chain

string _(optional)_ — ChainId of the network this transaction is intended for in order to prevent cross-chain replay

epoch

uint64 _(optional)_ — Maximum epoch in which a transaction can be executed. The provided maximal epoch must be greater than or equal to the current epoch for a transaction to execute.

kind

TransactionExpirationKind _(optional)_

max_timestamp

Timestamp _(optional)_ — Maximum UNIX timestamp in which a transaction can be executed. The provided maximal timestamp must be greater than or equal to the current clock.

... and 3 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-TransactionExpiration>)

TransactionKind

Transaction type.

kind

Kind _(optional)_

Union: **data**

authenticator_state_update

AuthenticatorStateUpdate — Update set of valid JWKs used for zklogin.

change_epoch

ChangeEpoch — System transaction used to end an epoch. The `ChangeEpoch` variant is now deprecated (but the `ChangeEpoch` struct is still used by `EndOfEpochTransaction`).

consensus_commit_prologue

ConsensusCommitPrologue — consensus commit update info

end_of_epoch

EndOfEpochTransaction — Set of operations to run at the end of the epoch to close out the current epoch and start the next one.

genesis

GenesisTransaction — Transaction used to initialize the chain state. Only valid if in the genesis checkpoint (0) and if this is the very first transaction ever executed on the chain.

programmable_transaction

ProgrammableTransaction — A transaction comprised of a list of native commands and Move calls.

randomness_state_update

RandomnessStateUpdate — Randomness update.

TransferObjects

Command to transfer ownership of a set of objects to an address.

address

Argument _(optional)_ — The address to transfer ownership to.

objects

Argument _(repeated)_ — Set of objects to transfer.

Upgrade

Command to upgrade an already published package.

dependencies

string _(repeated)_ — Set of packages that the to-be published package depends on.

modules

bytes _(repeated)_ — The serialized Move modules.

package

string _(optional)_ — Package ID of the package to upgrade.

ticket

Argument _(optional)_ — Ticket authorizing the upgrade.

ValidatorExecutionTimeObservation

duration

Duration _(optional)_ — Duration of an execution observation

validator

bytes _(optional)_ — Bls12381 public key of the validator

VersionAssignment

Object version assignment from consensus.

object_id

string _(optional)_ — `ObjectId` of the object.

start_version

uint64 _(optional)_ — start version of the consensus stream for this object

version

uint64 _(optional)_ — Assigned version.

## sui/rpc/v2/signature_verification_service.proto​

VerifySignatureRequest

address

string _(optional)_ — Optional. Address to validate against the provided signature. If provided, this address will be compared against the the address derived from the provide signature and a successful response will only be returned if they match.

jwks

ActiveJwk _(repeated)_ — The set of JWKs to use when verifying Zklogin signatures. If this is empty the current set of valid JWKs stored onchain will be used

message

Bcs _(optional)_ — The message to verify against. Today the only supported message types are `PersonalMessage` and `TransactionData` and the `Bcs.name` must be set to indicate which type of message is being verified.

signature

UserSignature _(optional)_ — The signature to verify.

VerifySignatureResponse

is_valid

bool _(optional)_ — Indicates if the provided signature was valid given the requested parameters.

reason

string _(optional)_ — If `is_valid` is `false`, this is the reason for why the signature verification failed.

## sui/rpc/v2/system_state.proto​

MoveTable

A message that represents a Move `0x2::table::Table` or `0x2::bag::Bag`

id

string _(optional)_ — The UID of the table or bag

size

uint64 _(optional)_ — The size or number of key-value pairs in the table or bag

StakeSubsidy

balance

uint64 _(optional)_ — Balance of SUI set aside for stake subsidies that will be drawn down over time.

current_distribution_amount

uint64 _(optional)_ — The amount of stake subsidy to be drawn down per distribution. This amount decays and decreases over time.

distribution_counter

uint64 _(optional)_ — Count of the number of times stake subsidies have been distributed.

extra_fields

MoveTable _(optional)_ — Any extra fields that's not defined statically.

... and 2 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-StakeSubsidy>)

StakingPool

A staking pool embedded in each validator struct in the system state object.

activation_epoch

uint64 _(optional)_ — The epoch at which this pool became active. The value is `None` if the pool is pre-active and `Some(<epoch_number>)` if active or inactive.

deactivation_epoch

uint64 _(optional)_ — The epoch at which this staking pool ceased to be active. `None` = {pre-active, active}, `Some(<epoch_number>)` if in-active, and it was de-activated at epoch `<epoch_number>`.

exchange_rates

MoveTable _(optional)_ — Exchange rate history of previous epochs. The entries start from the `activation_epoch` of this pool and contains exchange rates at the beginning of each epoch, i.e., right after the rewards for the previous epoch have been deposited into the pool. key: u64 (epoch number), value: PoolTokenExchangeRate

extra_fields

MoveTable _(optional)_ — Any extra fields that's not defined statically.

... and 7 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-StakingPool>)

StorageFund

Struct representing the onchain storage fund.

non_refundable_balance

uint64 _(optional)_ — Represents any remaining inflow of the storage fund that should not be taken out of the fund.

total_object_storage_rebates

uint64 _(optional)_ — This is the sum of `storage_rebate` of all objects currently stored on-chain. To maintain this invariant, the only inflow of this balance is storage charges collected from transactions, and the only outflow is storage rebates of transactions, including both the portion refunded to the transaction senders as well as the non-refundable portion taken out and put into `non_refundable_balance`.

SystemParameters

epoch_duration_ms

uint64 _(optional)_ — The duration of an epoch, in milliseconds.

extra_fields

MoveTable _(optional)_ — Any extra fields that are not defined statically.

max_validator_count

uint64 _(optional)_ — Maximum number of active validators at any moment. We do not allow the number of validators in any epoch to go above this.

min_validator_count

uint64 _(optional)_ — Minimum number of active validators at any moment.

... and 5 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-SystemParameters>)

SystemState

epoch

uint64 _(optional)_ — The epoch id

epoch_start_timestamp_ms

uint64 _(optional)_ — Unix timestamp of when this this epoch started

extra_fields

MoveTable _(optional)_ — Any extra fields that's not defined statically.

parameters

SystemParameters _(optional)_ — Set of system config parameters

... and 12 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-SystemState>)

Validator

Definition of a Validator in the system contracts

Note: fields of ValidatorMetadata are flattened into this type

address

string _(optional)_ — The Sui Address of the validator. This is the sender that created the Validator object, and also the address to send validator/coins to during withdraws.

commission_rate

uint64 _(optional)_ — Commission rate of the validator, in basis point.

description

string _(optional)_

extra_fields

MoveTable _(optional)_ — Any extra fields that's not defined statically.

... and 27 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-Validator>)

ValidatorReportRecord

reported

string _(optional)_ — The address of the validator being reported

reporters

string _(repeated)_ — The list of validator (addresses) that are reporting on the validator specified by `reported`

ValidatorSet

active_validators

Validator _(repeated)_ — The current list of active validators.

at_risk_validators

AtRiskValidatorsEntry _(repeated)_ — Table storing the number of epochs during which a validator's stake has been below the low stake threshold.

extra_fields

MoveTable _(optional)_ — Any extra fields that's not defined statically.

inactive_validators

MoveTable _(optional)_ — Mapping from a staking pool ID to the inactive validator that has that pool as its staking pool. When a validator is deactivated the validator is removed from `active_validators` it is added to this table so that stakers can continue to withdraw their stake from it. key: address (staking pool Id), value: 0x3::validator_wrapper::ValidatorWrapper

... and 5 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-ValidatorSet>)

AtRiskValidatorsEntry

key

string

value

uint64

## sui/rpc/v2/executed_transaction.proto​

ExecutedTransaction

balance_changes

BalanceChange _(repeated)_

checkpoint

uint64 _(optional)_ — The sequence number for the checkpoint that includes this transaction.

digest

string _(optional)_ — The digest of this Transaction.

effects

TransactionEffects _(optional)_ — The `TransactionEffects` for this transaction.

... and 5 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-ExecutedTransaction>)

## sui/rpc/v2/protocol_config.proto​

ProtocolConfig

attributes

AttributesEntry _(repeated)_

feature_flags

FeatureFlagsEntry _(repeated)_

protocol_version

uint64 _(optional)_

AttributesEntry

key

string

value

string

FeatureFlagsEntry

key

string

value

bool

## sui/rpc/v2/gas_cost_summary.proto​

GasCostSummary

Summary of gas charges.

computation_cost

uint64 _(optional)_ — Cost of computation/execution.

non_refundable_storage_fee

uint64 _(optional)_ — The fee for the rebate. The portion of the storage rebate kept by the system.

storage_cost

uint64 _(optional)_ — Storage cost, it's the sum of all storage cost for all objects created or mutated.

storage_rebate

uint64 _(optional)_ — The amount of storage cost refunded to the user for all objects deleted or mutated in the transaction.

## sui/rpc/v2/move_package_service.proto​

GetDatatypeRequest

module_name

string _(optional)_ — Required. The name of the requested module.

name

string _(optional)_ — Required. The name of the requested datatype.

package_id

string _(optional)_ — Required. The `storage_id` of the requested package.

GetDatatypeResponse

datatype

DatatypeDescriptor _(optional)_ — The datatype.

GetFunctionRequest

module_name

string _(optional)_ — Required. The name of the requested module.

name

string _(optional)_ — Required. The name of the requested function.

package_id

string _(optional)_ — Required. The `storage_id` of the requested package.

GetFunctionResponse

function

FunctionDescriptor _(optional)_ — The function.

GetPackageRequest

package_id

string _(optional)_ — Required. The `storage_id` of the requested package.

GetPackageResponse

package

Package _(optional)_ — The package.

ListPackageVersionsRequest

package_id

string _(optional)_ — Required. The `storage_id` of any version of the package.

page_size

uint32 _(optional)_ — The maximum number of versions to return. The service may return fewer than this value. If unspecified, at most `1000` entries will be returned. The maximum value is `10000`; values above `10000` will be coerced to `10000`.

page_token

bytes _(optional)_ — A page token, received from a previous `ListPackageVersions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPackageVersions` must match the call that provided the page token.

ListPackageVersionsResponse

next_page_token

bytes _(optional)_ — A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages.

versions

PackageVersion _(repeated)_ — List of all package versions, ordered by version.

PackageVersion

A simplified representation of a package version

package_id

string _(optional)_ — The storage ID of this package version

version

uint64 _(optional)_ — The version number

## sui/rpc/v2/object.proto​

Display

A rendered JSON blob based on an on-chain template.

errors

Value _(optional)_ — If any fields failed to render, this will contain a mapping from failed field names to error messages. If all fields succeed, this will either be `null` or not set.

output

Value _(optional)_ — Output for all successfully substituted display fields. Unsuccessful fields will be `null`, and will be accompanied by a field in `errors`, explaining the error.

Object

An object on the Sui blockchain.

balance

uint64 _(optional)_ — Current balance if this object is a `0x2::coin::Coin<T>`

bcs

Bcs _(optional)_ — This Object serialized as BCS.

contents

Bcs _(optional)_ — BCS bytes of a Move struct value. Only set for Move structs

digest

string _(optional)_ — The digest of this Object.

... and 10 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-Object>)

ObjectSet

Set of Objects

objects

Object _(repeated)_ — Objects are sorted by the key `(object_id, version)`.

## sui/rpc/v2/transaction_execution_service.proto​

CommandOutput

argument

Argument _(optional)_

json

Value _(optional)_ — JSON rendering of the output.

value

Bcs _(optional)_

CommandResult

An intermediate result/output from the execution of a single command

mutated_by_ref

CommandOutput _(repeated)_

return_values

CommandOutput _(repeated)_

ExecuteTransactionRequest

read_mask

FieldMask _(optional)_ — Mask specifying which fields to read. If no mask is specified, defaults to `effects.status,checkpoint`.

signatures

UserSignature _(repeated)_ — Set of `UserSignature`s authorizing the execution of the provided transaction.

transaction

Transaction _(optional)_ — The transaction to execute.

ExecuteTransactionResponse

Response message for `NodeService.ExecuteTransaction`.

transaction

ExecutedTransaction _(optional)_

SimulateTransactionRequest

checks

TransactionChecks _(optional)_ — Specify whether checks should be ENABLED (default) or DISABLED while executing the transaction

do_gas_selection

bool _(optional)_ — Perform gas selection based on a budget estimation and include the selected gas payment and budget in the response. This option will be ignored if `checks` is `DISABLED`.

read_mask

FieldMask _(optional)_ — Mask specifying which fields to read.

transaction

Transaction _(optional)_

SimulateTransactionResponse

command_outputs

CommandResult _(repeated)_

suggested_gas_price

uint64 _(optional)_ — A suggested gas price to use, that is above RGP, in order to provide a better chance of the transaction being included in the presence of congested objects.

transaction

ExecutedTransaction _(optional)_

## sui/rpc/v2/state_service.proto​

Balance

Balance information for a specific coin type.

address_balance

uint64 _(optional)_ — The balance of `Balance<T>` in this address's Address Balance.

balance

uint64 _(optional)_ — The total balance of `coin_type` in its smallest unit. This is the sum of all spendable amounts of `coin_type` (`address_balance` and `coin_balance`).

coin_balance

uint64 _(optional)_ — The balance of all `Coin<T>` objects owned by this address.

coin_type

string _(optional)_ — The type of the coin (e.g., 0x2::sui::SUI).

CoinMetadata

Metadata for a coin type

decimals

uint32 _(optional)_ — Number of decimal places to coin uses.

description

string _(optional)_ — Description of the token

icon_url

string _(optional)_ — URL for the token logo

id

string _(optional)_ — ObjectId of the `0x2::coin::CoinMetadata` object or 0x2::sui::coin_registry::Currency object (when registered with CoinRegistry).

... and 4 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-CoinMetadata>)

CoinTreasury

Information about a coin type's `0x2::coin::TreasuryCap` and its total available supply

id

string _(optional)_ — ObjectId of the `0x2::coin::TreasuryCap` object.

supply_state

SupplyState _(optional)_ — Supply state indicating if the supply is fixed or can still be minted

total_supply

uint64 _(optional)_ — Total available supply for this coin type.

DynamicField

child_id

string _(optional)_ — The ObjectId of the child object when a child is a dynamic object field. The presence or absence of this field can be used to determine if a child is a dynamic field or a dynamic child object

child_object

Object _(optional)_ — The object itself when a child is a dynamic object field.

field_id

string _(optional)_ — ObjectId of this dynamic field.

field_object

Object _(optional)_ — The field object itself

... and 5 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-DynamicField>)

GetBalanceRequest

Request message for `LiveDataService.GetBalance`.

coin_type

string _(optional)_ — Required. The type names for the coin (e.g., 0x2::sui::SUI).

owner

string _(optional)_ — Required. The owner's Sui address.

GetBalanceResponse

Response message for `LiveDataService.GetBalance`. Return the total coin balance for one coin type, owned by the address owner.

balance

Balance _(optional)_ — The balance information for the requested coin type.

GetCoinInfoRequest

Request message for `NodeService.GetCoinInfo`.

coin_type

string _(optional)_ — The coin type to request information about

GetCoinInfoResponse

Response message for `NodeService.GetCoinInfo`.

coin_type

string _(optional)_ — Required. The coin type.

metadata

CoinMetadata _(optional)_ — This field will be populated with information about this coin type's `0x2::coin::CoinMetadata` if it exists and has not been wrapped.

regulated_metadata

RegulatedCoinMetadata _(optional)_ — If this coin type is a regulated coin, this field will be populated with information either from its Currency object in the CoinRegistry, or from its `0x2::coin::RegulatedCoinMetadata` object for coins that have not been migrated to the CoinRegistry If this coin is not known to be regulated, only the coin_regulated_state field will be populated.

treasury

CoinTreasury _(optional)_ — This field will be populated with information about this coin type's `0x2::coin::TreasuryCap` if it exists and has not been wrapped.

ListBalancesRequest

Request message for `LiveDataService.ListBalances`.

owner

string _(optional)_ — Required. The owner's Sui address.

page_size

uint32 _(optional)_ — The maximum number of balance entries to return. The service may return fewer than this value. If unspecified, at most `50` entries will be returned. The maximum value is `1000`; values above `1000` will be coerced to `1000`.

page_token

bytes _(optional)_ — A page token, received from a previous `ListBalances` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListBalances` must match the call that provided the page token.

ListBalancesResponse

Response message for `LiveDataService.ListBalances`. Return the total coin balance for all coin types, owned by the address owner.

balances

Balance _(repeated)_ — The list of coin types and their respective balances.

next_page_token

bytes _(optional)_ — A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages.

ListDynamicFieldsRequest

Request message for `NodeService.ListDynamicFields`

page_size

uint32 _(optional)_ — The maximum number of dynamic fields to return. The service may return fewer than this value. If unspecified, at most `50` entries will be returned. The maximum value is `1000`; values above `1000` will be coerced to `1000`.

page_token

bytes _(optional)_ — A page token, received from a previous `ListDynamicFields` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDynamicFields` must match the call that provided the page token.

parent

string _(optional)_ — Required. The `UID` of the parent, which owns the collections of dynamic fields.

read_mask

FieldMask _(optional)_ — Mask specifying which fields to read. If no mask is specified, defaults to `parent,field_id`.

ListDynamicFieldsResponse

Response message for `NodeService.ListDynamicFields`

dynamic_fields

DynamicField _(repeated)_ — Page of dynamic fields owned by the specified parent.

next_page_token

bytes _(optional)_ — A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages.

ListOwnedObjectsRequest

object_type

string _(optional)_ — Optional type filter to limit the types of objects listed. Providing an object type with no type params will return objects of that type with any type parameter, e.g. `0x2::coin::Coin` will return all `Coin<T>` objects regardless of the type parameter `T`. Providing a type with a type param will restrict the returned objects to only those objects that match the provided type parameters, e.g. `0x2::coin::Coin<0x2::sui::SUI>` will only return `Coin<SUI>` objects.

owner

string _(optional)_ — Required. The address of the account that owns the objects.

page_size

uint32 _(optional)_ — The maximum number of entries return. The service may return fewer than this value. If unspecified, at most `50` entries will be returned. The maximum value is `1000`; values above `1000` will be coerced to `1000`.

page_token

bytes _(optional)_ — A page token, received from a previous `ListOwnedObjects` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListOwnedObjects` must match the call that provided the page token.

... and 1 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-ListOwnedObjectsRequest>)

ListOwnedObjectsResponse

next_page_token

bytes _(optional)_ — A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages.

objects

Object _(repeated)_ — Page of dynamic fields owned by the specified parent.

RegulatedCoinMetadata

Information about a regulated coin, which indicates that it makes use of the transfer deny list.

allow_global_pause

bool _(optional)_ — Whether the coin can be globally paused

coin_metadata_object

string _(optional)_ — The ID of the coin's `CoinMetadata` or `CoinData` object.

coin_regulated_state

CoinRegulatedState _(optional)_ — Indicates the coin's regulated state.

deny_cap_object

string _(optional)_ — The ID of the coin's `DenyCap` object.

... and 2 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-RegulatedCoinMetadata>)

## sui/rpc/v2/name_service.proto​

LookupNameRequest

name

string _(optional)_ — Required. The SuiNS name to lookup. Supports both `@name` as well as `name.sui` formats.

LookupNameResponse

record

NameRecord _(optional)_ — The record for the requested name

NameRecord

data

DataEntry _(repeated)_ — Additional data which may be stored in a record

expiration_timestamp

Timestamp _(optional)_ — Timestamp when the record expires. This is either the expiration of the record itself or the expiration of this record's parent if this is a leaf record.

id

string _(optional)_ — Id of this record. Note that records are stored on chain as dynamic fields of the type `Field<Domain,NameRecord>`.

name

string _(optional)_ — The SuiNS name of this record

... and 2 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-NameRecord>)

DataEntry

key

string

value

string

ReverseLookupNameRequest

address

string _(optional)_ — Required. The address to perform a reverse lookup for.

ReverseLookupNameResponse

record

NameRecord _(optional)_ — The record for the SuiNS name linked to the requested address

## sui/rpc/v2/move_package.proto​

DatatypeDescriptor

Describes a Move Datatype.

abilities

Ability _(repeated)_ — This type's abilities

defining_id

string _(optional)_ — PackageId of the package where this Datatype is defined. A type's `defining_id` is the `storage_id` of the package version that first introduced or added that type.

fields

FieldDescriptor _(repeated)_ — Set of fields if this Datatype is a struct. The order of the entries is the order of how the fields are defined.

kind

DatatypeKind _(optional)_ — Indicates whether this datatype is a 'STRUCT' or an 'ENUM'

... and 5 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-DatatypeDescriptor>)

FieldDescriptor

Descriptor of a field that belongs to a struct or enum variant

name

string _(optional)_ — Name of the field

position

uint32 _(optional)_ — Order or position of the field in the struct or enum variant definition.

type

OpenSignatureBody _(optional)_ — The type of the field

FunctionDescriptor

Descriptor of a Move function

is_entry

bool _(optional)_ — Whether the function is marked `entry` or not.

name

string _(optional)_ — Name of the function

parameters

OpenSignature _(repeated)_ — Formal parameter types.

returns

OpenSignature _(repeated)_ — Return types.

... and 2 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-FunctionDescriptor>)

Linkage

Upgraded package info for the linkage table.

original_id

string _(optional)_ — Id of the original package.

upgraded_id

string _(optional)_ — Id of the upgraded package.

upgraded_version

uint64 _(optional)_ — Version of the upgraded package.

Module

A Move Module.

contents

bytes _(optional)_ — Serialized bytecode of the module.

datatypes

DatatypeDescriptor _(repeated)_ — List of DataTypes defined by this module.

functions

FunctionDescriptor _(repeated)_ — List of Functions defined by this module.

name

string _(optional)_ — Name of this module.

OpenSignature

Representation of a type signature that could appear as a function parameter or return value.

body

OpenSignatureBody _(optional)_

reference

Reference _(optional)_

OpenSignatureBody

Representation of a type signature that could appear as a field type for a struct or enum

type

Type _(optional)_ — Type of this signature

type_name

string _(optional)_ — Fully qualified name of the datatype when `type` is `DATATYPE`

type_parameter

uint32 _(optional)_ — Position of the type parameter as defined in the containing data type descriptor when `type` is `TYPE_PARAMETER`

type_parameter_instantiation

OpenSignatureBody _(repeated)_ — Set when `type` is `VECTOR` or `DATATYPE`

Package

A Move Package

linkage

Linkage _(repeated)_ — The package's transitive dependencies as a mapping from the package's runtime Id (the Id it is referred to by in other packages) to its storage Id (the Id it is loaded from on chain).

modules

Module _(repeated)_ — The modules defined by this package

original_id

string _(optional)_ — The PackageId of the first published version of this package. A package's `original_id` (sometimes also called its `runtime_id`) is the `storage_id` of the first version of this package that has been published. The `original_id`/`runtime_id` is stable across all versions of the package and does not ever change.

storage_id

string _(optional)_ — The PackageId of this package A package's `storage_id` is the Sui ObjectId of the package on-chain. Outside of system packages the `storage_id` for every package version is different.

... and 2 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-Package>)

TypeOrigin

Identifies a struct and the module it was defined in.

datatype_name

string _(optional)_

module_name

string _(optional)_

package_id

string _(optional)_

TypeParameter

A generic type parameter used in the declaration of a struct or enum.

constraints

Ability _(repeated)_ — The type parameter constraints

is_phantom

bool _(optional)_ — Whether the parameter is declared as phantom

VariantDescriptor

Descriptor of an enum variant

fields

FieldDescriptor _(repeated)_ — Set of fields defined by this variant.

name

string _(optional)_ — Name of the variant

position

uint32 _(optional)_ — Order or position of the variant in the enum definition.

## sui/rpc/v2/effects.proto​

AccumulatorWrite

accumulator_type

string _(optional)_

address

string _(optional)_

event_digest_value

EventDigestEntry _(repeated)_ — Set when the accumulator value is an event digest list (value_kind = EVENT_DIGEST). Contains a non-empty list of (event_index, digest) pairs representing authenticated event stream entries within a transaction.

integer_tuple

uint64 _(repeated)_ — Set, with len 2, when the accumulator value is an integer tuple (value_kind = INTEGER_TUPLE).

... and 3 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-AccumulatorWrite>)

ChangedObject

Input/output state of an object that was changed during execution.

accumulator_write

AccumulatorWrite _(optional)_ — The contents of the accumulator write when `output_state` is `OUTPUT_OBJECT_STATE_ACCUMULATOR_WRITE`

id_operation

IdOperation _(optional)_ — What happened to an `ObjectId` during execution.

input_digest

string _(optional)_ — Digest of the object before this transaction executed.

input_owner

Owner _(optional)_ — Owner of the object before this transaction executed.

... and 8 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-ChangedObject>)

EventDigestEntry

An entry in an event digest accumulator value.

digest

string _(optional)_ — Digest of the event.

event_index

uint64 _(optional)_ — Index of the event within its transaction.

TransactionEffects

The effects of executing a transaction.

auxiliary_data_digest

string _(optional)_ — Auxiliary data that are not protocol-critical, generated as part of the effects but are stored separately. Storing it separately allows us to avoid bloating the effects with data that are not critical. It also provides more flexibility on the format and type of the data.

bcs

Bcs _(optional)_ — This TransactionEffects serialized as BCS.

changed_objects

ChangedObject _(repeated)_ — Objects whose state are changed by this transaction.

dependencies

string _(repeated)_ — The set of transaction digests this transaction depends on.

... and 11 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-TransactionEffects>)

UnchangedConsensusObject

A consensus object that wasn't changed during execution.

digest

string _(optional)_ — Digest of the consensus object.

kind

UnchangedConsensusObjectKind _(optional)_

object_id

string _(optional)_ — ObjectId of the consensus object.

object_type

string _(optional)_ — Type information is not provided by the effects structure but is instead provided by an indexing layer

... and 1 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-UnchangedConsensusObject>)

## sui/rpc/v2/ledger_service.proto​

BatchGetObjectsRequest

read_mask

FieldMask _(optional)_ — Mask specifying which fields to read. If no mask is specified, defaults to `object_id,version,digest`.

requests

GetObjectRequest _(repeated)_

BatchGetObjectsResponse

objects

GetObjectResult _(repeated)_

BatchGetTransactionsRequest

digests

string _(repeated)_ — Required. The digests of the requested transactions.

read_mask

FieldMask _(optional)_ — Mask specifying which fields to read. If no mask is specified, defaults to `digest`.

BatchGetTransactionsResponse

transactions

GetTransactionResult _(repeated)_

GetCheckpointRequest

read_mask

FieldMask _(optional)_ — Mask specifying which fields to read. If no mask is specified, defaults to `sequence_number,digest`.

Union: **checkpoint_id**

digest

string — The digest of the requested checkpoint.

sequence_number

uint64 — The sequence number of the requested checkpoint.

GetCheckpointResponse

checkpoint

Checkpoint _(optional)_

GetEpochRequest

epoch

uint64 _(optional)_ — The requested epoch. If no epoch is provided the current epoch will be returned.

read_mask

FieldMask _(optional)_ — Mask specifying which fields to read. If no mask is specified, defaults to `epoch`.

GetEpochResponse

epoch

Epoch _(optional)_

GetObjectRequest

object_id

string _(optional)_ — Required. The `ObjectId` of the requested object.

read_mask

FieldMask _(optional)_ — Mask specifying which fields to read. If no mask is specified, defaults to `object_id,version,digest`.

version

uint64 _(optional)_ — Request a specific version of the object. If no version is specified, and the object is live, then the latest version of the object is returned.

GetObjectResponse

object

Object _(optional)_

GetObjectResult

Union: **result**

error

Status

object

Object

GetServiceInfoRequest

GetServiceInfoResponse

chain

string _(optional)_ — Human-readable name of the chain that this node is on. This is intended to be a human-readable name like `mainnet`, `testnet`, and so on.

chain_id

string _(optional)_ — The chain identifier of the chain that this node is on. The chain identifier is the digest of the genesis checkpoint, the checkpoint with sequence number 0.

checkpoint_height

uint64 _(optional)_ — Checkpoint height of the most recently executed checkpoint.

epoch

uint64 _(optional)_ — Current epoch of the node based on its highest executed checkpoint.

... and 4 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-GetServiceInfoResponse>)

GetTransactionRequest

digest

string _(optional)_ — Required. The digest of the requested transaction.

read_mask

FieldMask _(optional)_ — Mask specifying which fields to read. If no mask is specified, defaults to `digest`.

GetTransactionResponse

transaction

ExecutedTransaction _(optional)_

GetTransactionResult

Union: **result**

error

Status

transaction

ExecutedTransaction

## sui/rpc/v2/epoch.proto​

Epoch

committee

ValidatorCommittee _(optional)_ — The committee governing this epoch.

end

Timestamp _(optional)_

epoch

uint64 _(optional)_

first_checkpoint

uint64 _(optional)_

... and 5 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-Epoch>)

## sui/rpc/v2/execution_status.proto​

CleverError

constant_name

string _(optional)_

constant_type

string _(optional)_

error_code

uint64 _(optional)_

line_number

uint64 _(optional)_

Union: **value**

raw

bytes

rendered

string

CoinDenyListError

address

string _(optional)_ — Denied address.

coin_type

string _(optional)_ — Coin type.

CommandArgumentError

An error with an argument to a command.

argument

uint32 _(optional)_ — Position of the problematic argument.

index_error

IndexError _(optional)_

kind

CommandArgumentErrorKind _(optional)_

CongestedObjects

Set of objects that were congested, leading to the transaction's cancellation.

objects

string _(repeated)_

ExecutionError

An error that can occur during the execution of a transaction.

command

uint64 _(optional)_ — The command, if any, during which the error occurred.

description

string _(optional)_ — A human readable description of the error

kind

ExecutionErrorKind _(optional)_

Union: **error_details**

abort

MoveAbort

coin_deny_list_error

CoinDenyListError

command_argument_error

CommandArgumentError

congested_objects

CongestedObjects — Set of objects that were congested, leading to the transaction's cancellation.

index_error

IndexError

object_id

string

package_upgrade_error

PackageUpgradeError

size_error

SizeError

type_argument_error

TypeArgumentError

ExecutionStatus

The status of an executed transaction.

error

ExecutionError _(optional)_ — The error if `success` is false.

success

bool _(optional)_ — Indicates if the transaction was successful or not.

IndexError

index

uint32 _(optional)_ — Index of an input or result.

subresult

uint32 _(optional)_ — Index of a subresult.

MoveAbort

abort_code

uint64 _(optional)_

clever_error

CleverError _(optional)_ — Extra error information if abort code is a "Clever Error"

location

MoveLocation _(optional)_ — Location in Move where the error occurred.

MoveLocation

Location in Move bytecode where an error occurred.

function

uint32 _(optional)_ — The function index.

function_name

string _(optional)_ — The name of the function, if available.

instruction

uint32 _(optional)_ — Offset of the instruction where the error occurred.

module

string _(optional)_ — The module name.

... and 1 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-MoveLocation>)

PackageUpgradeError

An error with upgrading a package.

digest

string _(optional)_ — A digest.

kind

PackageUpgradeErrorKind _(optional)_

package_id

string _(optional)_ — The Package Id.

policy

uint32 _(optional)_ — The policy.

... and 1 more fields. [View all fields](</doc/protocol-messages-full.html#sui-rpc-v2-PackageUpgradeError>)

SizeError

A size error.

max_size

uint64 _(optional)_ — The maximum allowable size.

size

uint64 _(optional)_ — The offending size.

TypeArgumentError

Type argument error.

kind

TypeArgumentErrorKind _(optional)_

type_argument

uint32 _(optional)_ — Index of the problematic type argument.

## sui/rpc/v2/subscription_service.proto​

SubscribeCheckpointsRequest

Request message for SubscriptionService.SubscribeCheckpoints

read_mask

FieldMask _(optional)_ — Optional. Mask for specifying which parts of the SubscribeCheckpointsResponse should be returned.

SubscribeCheckpointsResponse

Response message for SubscriptionService.SubscribeCheckpoints

checkpoint

Checkpoint _(optional)_ — The requested data for this checkpoint

cursor

uint64 _(optional)_ — Required. The checkpoint sequence number and value of the current cursor into the checkpoint stream

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/fullnode-protocol-messages.mdx>)

[PreviousMethods](</references/fullnode-protocol>)[NextEnum and Scalar Types](</references/fullnode-protocol-types>)

  * sui/rpc/v2/checkpoint_summary.proto
  * sui/rpc/v2/owner.proto
  * sui/rpc/v2/event.proto
  * sui/rpc/v2/jwk.proto
  * sui/rpc/v2/bcs.proto
  * sui/rpc/v2/argument.proto
  * sui/rpc/v2/checkpoint.proto
  * sui/rpc/v2/input.proto
  * sui/rpc/v2/checkpoint_contents.proto
  * sui/rpc/v2/signature.proto
  * sui/rpc/v2/balance_change.proto
  * sui/rpc/v2/object_reference.proto
  * sui/rpc/v2/transaction.proto
  * sui/rpc/v2/signature_verification_service.proto
  * sui/rpc/v2/system_state.proto
  * sui/rpc/v2/executed_transaction.proto
  * sui/rpc/v2/protocol_config.proto
  * sui/rpc/v2/gas_cost_summary.proto
  * sui/rpc/v2/move_package_service.proto
  * sui/rpc/v2/object.proto
  * sui/rpc/v2/transaction_execution_service.proto
  * sui/rpc/v2/state_service.proto
  * sui/rpc/v2/name_service.proto
  * sui/rpc/v2/move_package.proto
  * sui/rpc/v2/effects.proto
  * sui/rpc/v2/ledger_service.proto
  * sui/rpc/v2/epoch.proto
  * sui/rpc/v2/execution_status.proto
  * sui/rpc/v2/subscription_service.proto
