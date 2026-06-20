<!-- Source: https://docs.sui.io/references/fullnode-protocol-types -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * gRPC
  * Enum and Scalar Types


On this page

# Sui Full Node gRPC Enum and Scalar Type Definitions

This page lists all enum and scalar type definitions for the [Sui Full Node gRPC API](</references/fullnode-protocol>). See also: [Message Definitions](</references/fullnode-protocol-messages>)

Proto filessui/rpc/v2/checkpoint_summary.protosui/rpc/v2/owner.protosui/rpc/v2/error_reason.protosui/rpc/v2/argument.protosui/rpc/v2/input.protosui/rpc/v2/signature_scheme.protosui/rpc/v2/transaction.protosui/rpc/v2/transaction_execution_service.protosui/rpc/v2/state_service.protosui/rpc/v2/move_package.protosui/rpc/v2/effects.protosui/rpc/v2/execution_status.protoScalar Value TypesEnumsJump to...CheckpointCommitmentKind

## sui/rpc/v2/checkpoint_summary.proto​

#### Enums

CheckpointCommitmentKind

Values

`CHECKPOINT_COMMITMENT_KIND_UNKNOWN`

`ECMH_LIVE_OBJECT_SET`

An elliptic curve multiset hash attesting to the set of objects that comprise the live state of the Sui blockchain.

`CHECKPOINT_ARTIFACTS`

Digest of the checkpoint artifacts.

## sui/rpc/v2/owner.proto​

#### Enums

OwnerKind

Values

`OWNER_KIND_UNKNOWN`

`ADDRESS`

`OBJECT`

`SHARED`

`IMMUTABLE`

`CONSENSUS_ADDRESS`

## sui/rpc/v2/error_reason.proto​

#### Enums

ErrorReason

Values

`ERROR_REASON_UNKNOWN`

`FIELD_INVALID`

`FIELD_MISSING`

## sui/rpc/v2/argument.proto​

#### Enums

ArgumentKind

Values

`ARGUMENT_KIND_UNKNOWN`

`GAS`

The gas coin.

`INPUT`

One of the input objects or primitive values (from `ProgrammableTransaction` inputs).

`RESULT`

The result of another command (from `ProgrammableTransaction` commands).

## sui/rpc/v2/input.proto​

#### Enums

Source

Values

`SOURCE_UNKNOWN`

`SENDER`

`SPONSOR`

InputKind

Values

`INPUT_KIND_UNKNOWN`

`PURE`

A move value serialized as BCS.

`IMMUTABLE_OR_OWNED`

A Move object that is either immutable or address owned.

`SHARED`

A Move object whose owner is "Shared".

`RECEIVING`

A Move object that is attempted to be received in this transaction.

`FUNDS_WITHDRAWAL`

Reservation to withdraw balance from a funds accumulator

Mutability

Values

`MUTABILITY_UNKNOWN`

`IMMUTABLE`

`MUTABLE`

`NON_EXCLUSIVE_WRITE`

Non-exclusive write is used to allow multiple transactions to simultaneously add disjoint dynamic fields to an object. (Currently only used by settlement transactions).

## sui/rpc/v2/signature_scheme.proto​

#### Enums

SignatureScheme

Flag use to disambiguate the signature schemes supported by Sui. Note: the enum values defined by this proto message exactly match their expected BCS serialized values when serialized as a u8. See [enum.SignatureScheme](<https://mystenlabs.github.io/sui-rust-sdk/sui_sdk_types/enum.SignatureScheme.html>) for more information about signature schemes.

Values

`ED25519`

`SECP256K1`

`SECP256R1`

`MULTISIG`

`BLS12381`

`ZKLOGIN`

`PASSKEY`

## sui/rpc/v2/transaction.proto​

#### Enums

Kind

Values

`KIND_UNKNOWN`

`CHANGE_EPOCH`

End the epoch and start the next one.

`AUTHENTICATOR_STATE_CREATE`

Create and initialize the authenticator object used for zklogin.

`AUTHENTICATOR_STATE_EXPIRE`

Expire JWKs used for zklogin.

`RANDOMNESS_STATE_CREATE`

Create and initialize the randomness object.

`DENY_LIST_STATE_CREATE`

Create and initialize the deny list object.

`BRIDGE_STATE_CREATE`

Create and initialize the bridge object.

`BRIDGE_COMMITTEE_INIT`

Initialize the bridge committee.

`STORE_EXECUTION_TIME_OBSERVATIONS`

Execution time observations from the committee to preserve cross epoch

`ACCUMULATOR_ROOT_CREATE`

Create the accumulator root object.

`COIN_REGISTRY_CREATE`

Create and initialize the Coin Registry object.

`DISPLAY_REGISTRY_CREATE`

Create and initialize the Display Registry object.

`ADDRESS_ALIAS_STATE_CREATE`

Create and initialize the Address Alias State object.

`WRITE_ACCUMULATOR_STORAGE_COST`

Write the end-of-epoch-computed storage cost for accumulator objects.

ExecutionTimeObservationKind

Values

`EXECUTION_TIME_OBSERVATION_KIND_UNKNOWN`

`MOVE_ENTRY_POINT`

`TRANSFER_OBJECTS`

`SPLIT_COINS`

`MERGE_COINS`

`PUBLISH`

`MAKE_MOVE_VECTOR`

`UPGRADE`

TransactionExpirationKind

Values

`TRANSACTION_EXPIRATION_KIND_UNKNOWN`

`NONE`

The transaction has no expiration.

`EPOCH`

Validators won't sign and execute transaction unless the expiration epoch is greater than or equal to the current epoch.

`VALID_DURING`

This variant enables gas payments from address balances. When transactions use address balances for gas payment instead of explicit gas coins, we lose the natural transaction uniqueness and replay prevention that comes from mutation of gas coin objects. By bounding expiration and providing a nonce, validators must only retain executed digests for the maximum possible expiry range to differentiate retries from unique transactions with otherwise identical inputs.

Kind

Values

`KIND_UNKNOWN`

`PROGRAMMABLE_TRANSACTION`

A user transaction comprised of a list of native commands and Move calls.

`CHANGE_EPOCH`

System transaction used to end an epoch. The `ChangeEpoch` variant is now deprecated (but the `ChangeEpoch` struct is still used by `EndOfEpochTransaction`).

`GENESIS`

Transaction used to initialize the chain state. Only valid if in the genesis checkpoint (0) and if this is the very first transaction ever executed on the chain.

`CONSENSUS_COMMIT_PROLOGUE_V1`

V1 consensus commit update.

`AUTHENTICATOR_STATE_UPDATE`

Update set of valid JWKs used for zklogin.

`END_OF_EPOCH`

Set of operations to run at the end of the epoch to close out the current epoch and start the next one.

`RANDOMNESS_STATE_UPDATE`

Randomness update.

`CONSENSUS_COMMIT_PROLOGUE_V2`

V2 consensus commit update.

`CONSENSUS_COMMIT_PROLOGUE_V3`

V3 consensus commit update.

`CONSENSUS_COMMIT_PROLOGUE_V4`

V4 consensus commit update.

`PROGRAMMABLE_SYSTEM_TRANSACTION`

A system transaction comprised of a list of native commands and Move calls.

## sui/rpc/v2/transaction_execution_service.proto​

#### Enums

TransactionChecks

buf:lint:ignore ENUM_ZERO_VALUE_SUFFIX

Values

`ENABLED`

`DISABLED`

## sui/rpc/v2/state_service.proto​

#### Enums

MetadataCapState

Information about the state of the coin's MetadataCap

Values

`METADATA_CAP_STATE_UNKNOWN`

Indicates the state of the MetadataCap is unknown. Set when the coin has not been migrated to the CoinRegistry.

`CLAIMED`

Indicates the MetadataCap has been claimed.

`UNCLAIMED`

Indicates the MetadataCap has not been claimed.

`DELETED`

Indicates the MetadataCap has been deleted.

SupplyState

Supply state of a coin, matching the Move SupplyState enum

Values

`SUPPLY_STATE_UNKNOWN`

Supply is unknown or TreasuryCap still exists (minting still possible)

`FIXED`

Supply is fixed (TreasuryCap consumed, no more minting possible)

`BURN_ONLY`

Supply can only decrease (burning allowed, minting not allowed)

DynamicFieldKind

Values

`DYNAMIC_FIELD_KIND_UNKNOWN`

`FIELD`

`OBJECT`

CoinRegulatedState

Indicates the state of the regulation of the coin.

Values

`COIN_REGULATED_STATE_UNKNOWN`

Indicates the regulation state of the coin is unknown. This is set when a coin has not been migrated to the coin registry and has no `0x2::coin::RegulatedCoinMetadata` object.

`REGULATED`

Indicates a coin is regulated. RegulatedCoinMetadata will be populated.

`UNREGULATED`

Indicates a coin is unregulated.

## sui/rpc/v2/move_package.proto​

#### Enums

Ability

An `Ability` classifies what operations are permitted for a given type

Values

`ABILITY_UNKNOWN`

`COPY`

Allows values of types with this ability to be copied

`DROP`

Allows values of types with this ability to be dropped.

`STORE`

Allows values of types with this ability to exist inside a struct in global storage

`KEY`

Allows the type to serve as a key for global storage operations

DatatypeKind

Values

`DATATYPE_KIND_UNKNOWN`

`STRUCT`

`ENUM`

Visibility

Values

`VISIBILITY_UNKNOWN`

`PRIVATE`

`PUBLIC`

`FRIEND`

Reference

Values

`REFERENCE_UNKNOWN`

`IMMUTABLE`

`MUTABLE`

Type

Values

`TYPE_UNKNOWN`

`ADDRESS`

`BOOL`

`U8`

`U16`

`U32`

`U64`

`U128`

`U256`

`VECTOR`

`DATATYPE`

`TYPE_PARAMETER`

## sui/rpc/v2/effects.proto​

#### Enums

AccumulatorOperation

Values

`ACCUMULATOR_OPERATION_UNKNOWN`

`MERGE`

`SPLIT`

AccumulatorValue

Values

`ACCUMULATOR_VALUE_UNKNOWN`

`INTEGER`

`INTEGER_TUPLE`

`EVENT_DIGEST`

IdOperation

Values

`ID_OPERATION_UNKNOWN`

`NONE`

`CREATED`

`DELETED`

InputObjectState

Values

`INPUT_OBJECT_STATE_UNKNOWN`

`INPUT_OBJECT_STATE_DOES_NOT_EXIST`

`INPUT_OBJECT_STATE_EXISTS`

OutputObjectState

Values

`OUTPUT_OBJECT_STATE_UNKNOWN`

`OUTPUT_OBJECT_STATE_DOES_NOT_EXIST`

`OUTPUT_OBJECT_STATE_OBJECT_WRITE`

`OUTPUT_OBJECT_STATE_PACKAGE_WRITE`

`OUTPUT_OBJECT_STATE_ACCUMULATOR_WRITE`

UnchangedConsensusObjectKind

Values

`UNCHANGED_CONSENSUS_OBJECT_KIND_UNKNOWN`

`READ_ONLY_ROOT`

Read-only consensus object from the input.

`MUTATE_CONSENSUS_STREAM_ENDED`

Objects with ended consensus streams that appear mutably/owned in the input.

`READ_CONSENSUS_STREAM_ENDED`

Objects with ended consensus streams objects that appear as read-only in the input.

`CANCELED`

Consensus objects that were congested and resulted in this transaction being canceled.

`PER_EPOCH_CONFIG`

Read of a per-epoch config object that should remain the same during an epoch. This optionally will indicate the sequence number of the config object at the start of the epoch.

## sui/rpc/v2/execution_status.proto​

#### Enums

CommandArgumentErrorKind

Values

`COMMAND_ARGUMENT_ERROR_KIND_UNKNOWN`

`TYPE_MISMATCH`

The type of the value does not match the expected type.

`INVALID_BCS_BYTES`

The argument cannot be deserialized into a value of the specified type.

`INVALID_USAGE_OF_PURE_ARGUMENT`

The argument cannot be instantiated from raw bytes.

`INVALID_ARGUMENT_TO_PRIVATE_ENTRY_FUNCTION`

Invalid argument to private entry function. Private entry functions cannot take arguments from other Move functions.

`INDEX_OUT_OF_BOUNDS`

Out of bounds access to input or results. `index` field will be set indicating the invalid index value.

`SECONDARY_INDEX_OUT_OF_BOUNDS`

Out of bounds access to subresult. `index` and `subresult` fields will be set indicating the invalid index value.

`INVALID_RESULT_ARITY`

Invalid usage of result. Expected a single result but found either no return value or multiple. `index` field will be set indicating the invalid index value.

`INVALID_GAS_COIN_USAGE`

Invalid usage of gas coin. The gas coin can only be used by-value with a `TransferObject` command.

`INVALID_VALUE_USAGE`

Invalid usage of Move value. - Mutably borrowed values require unique usage. - Immutably borrowed values cannot be taken or borrowed mutably. - Taken values cannot be used again.

`INVALID_OBJECT_BY_VALUE`

Immutable objects cannot be passed by-value.

`INVALID_OBJECT_BY_MUT_REF`

Immutable objects cannot be passed by mutable reference, `&mut`.

`CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED`

Consensus object operations such as wrapping, freezing, or converting to owned are not allowed.

`INVALID_ARGUMENT_ARITY`

Invalid argument arity. Expected a single argument but found a result that expanded to multiple arguments.

`INVALID_TRANSFER_OBJECT`

Object passed to TransferObject does not have public transfer, i.e. the `store` ability

`INVALID_MAKE_MOVE_VEC_NON_OBJECT_ARGUMENT`

First argument to MakeMoveVec is not an object. If no type is specified for MakeMoveVec, all arguments must be the same object type.

`ARGUMENT_WITHOUT_VALUE`

Specified argument location does not have a value and cannot be used

`CANNOT_MOVE_BORROWED_VALUE`

Cannot move a borrowed value. The value's type does resulted in this argument usage being inferred as a move. This is likely due to the type not having the `copy` ability; although in rare cases, it could also be this is the last usage of a value without the `drop` ability.

`CANNOT_WRITE_TO_EXTENDED_REFERENCE`

Cannot write to an argument location that is still borrowed, and where that borrow is an extension of that reference. This is likely due to this argument being used in a Move call that returns a reference, and that reference is used in a later command.

`INVALID_REFERENCE_ARGUMENT`

The argument specified cannot be used as a reference argument in the Move call. Either the argument is a mutable reference and it conflicts with another argument to the call, or the argument is mutable and another reference extends it and will be used in a later command.

ExecutionErrorKind

Values

`EXECUTION_ERROR_KIND_UNKNOWN`

`INSUFFICIENT_GAS`

Insufficient gas.

`INVALID_GAS_OBJECT`

Invalid `Gas` object.

`INVARIANT_VIOLATION`

Invariant violation.

`FEATURE_NOT_YET_SUPPORTED`

Attempted to use feature that is not supported yet.

`OBJECT_TOO_BIG`

Move object is larger than the maximum allowed size.

`PACKAGE_TOO_BIG`

Package is larger than the maximum allowed size.

`CIRCULAR_OBJECT_OWNERSHIP`

Circular object ownership.

`INSUFFICIENT_COIN_BALANCE`

Insufficient coin balance for requested operation.

`COIN_BALANCE_OVERFLOW`

Coin balance overflowed an u64.

`PUBLISH_ERROR_NON_ZERO_ADDRESS`

Publish error, non-zero address. The modules in the package must have their self-addresses set to zero.

`SUI_MOVE_VERIFICATION_ERROR`

Sui Move bytecode verification error.

`MOVE_PRIMITIVE_RUNTIME_ERROR`

Error from a non-abort instruction. Possible causes: Arithmetic error, stack overflow, max value depth, or similar.

`MOVE_ABORT`

Move runtime abort.

`VM_VERIFICATION_OR_DESERIALIZATION_ERROR`

Bytecode verification error.

`VM_INVARIANT_VIOLATION`

MoveVm invariant violation.

`FUNCTION_NOT_FOUND`

Function not found.

`ARITY_MISMATCH`

Parity mismatch for Move function. The number of arguments does not match the number of parameters.

`TYPE_ARITY_MISMATCH`

Type parity mismatch for Move function. Mismatch between the number of actual versus expected type arguments.

`NON_ENTRY_FUNCTION_INVOKED`

Non-entry function invoked. Move Call must start with an entry function.

`COMMAND_ARGUMENT_ERROR`

Invalid command argument.

`TYPE_ARGUMENT_ERROR`

Type argument error.

`UNUSED_VALUE_WITHOUT_DROP`

Unused result without the drop ability.

`INVALID_PUBLIC_FUNCTION_RETURN_TYPE`

Invalid public Move function signature. Unsupported return type for return value.

`INVALID_TRANSFER_OBJECT`

Invalid transfer object, object does not have public transfer.

`EFFECTS_TOO_LARGE`

Effects from the transaction are too large.

`PUBLISH_UPGRADE_MISSING_DEPENDENCY`

Publish or Upgrade is missing dependency.

`PUBLISH_UPGRADE_DEPENDENCY_DOWNGRADE`

Publish or upgrade dependency downgrade. Indirect (transitive) dependency of published or upgraded package has been assigned an on-chain version that is less than the version required by one of the package's transitive dependencies.

`PACKAGE_UPGRADE_ERROR`

Invalid package upgrade.

`WRITTEN_OBJECTS_TOO_LARGE`

Indicates the transaction tried to write objects too large to storage.

`CERTIFICATE_DENIED`

Certificate is on the deny list.

`SUI_MOVE_VERIFICATION_TIMEDOUT`

Sui Move bytecode verification timed out.

`CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED`

The requested consensus object operation is not allowed.

`INPUT_OBJECT_DELETED`

Requested consensus object has been deleted.

`EXECUTION_CANCELED_DUE_TO_CONSENSUS_OBJECT_CONGESTION`

Certificate is canceled due to congestion on consensus objects.

`ADDRESS_DENIED_FOR_COIN`

Address is denied for this coin type.

`COIN_TYPE_GLOBAL_PAUSE`

Coin type is globally paused for use.

`EXECUTION_CANCELED_DUE_TO_RANDOMNESS_UNAVAILABLE`

Certificate is canceled because randomness could not be generated this epoch.

`MOVE_VECTOR_ELEM_TOO_BIG`

Move vector element (passed to MakeMoveVec) with size {value_size} is larger \ than the maximum size {max_scaled_size}. Note that this maximum is scaled based on the \ type of the vector element.

`MOVE_RAW_VALUE_TOO_BIG`

Move value (possibly an upgrade ticket or a dev-inspect value) with size {value_size} \ is larger than the maximum size {max_scaled_size}. Note that this maximum is scaled based \ on the type of the value.

`INVALID_LINKAGE`

A valid linkage was unable to be determined for the transaction or one of its commands.

`INSUFFICIENT_FUNDS_FOR_WITHDRAW`

Insufficient funds for transaction withdrawal

`NON_EXCLUSIVE_WRITE_INPUT_OBJECT_MODIFIED`

An input object with non-exclusive write mutability was modified

PackageUpgradeErrorKind

Values

`PACKAGE_UPGRADE_ERROR_KIND_UNKNOWN`

`UNABLE_TO_FETCH_PACKAGE`

Unable to fetch package.

`NOT_A_PACKAGE`

Object is not a package.

`INCOMPATIBLE_UPGRADE`

Package upgrade is incompatible with previous version.

`DIGEST_DOES_NOT_MATCH`

Digest in upgrade ticket and computed digest differ.

`UNKNOWN_UPGRADE_POLICY`

Upgrade policy is not valid.

`PACKAGE_ID_DOES_NOT_MATCH`

Package ID does not match `PackageId` in upgrade ticket.

TypeArgumentErrorKind

Values

`TYPE_ARGUMENT_ERROR_KIND_UNKNOWN`

`TYPE_NOT_FOUND`

A type was not found in the module specified.

`CONSTRAINT_NOT_SATISFIED`

A type provided did not match the specified constraint.

## Scalar Value Types​

Proto Type| C++| Go| Java| Python| Notes  
---|---|---|---|---|---  
**double**|  double| float64| double| float|   
**float**|  float| float32| float| float|   
**int32**|  int32| int32| int| int| Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead.  
**int64**|  int64| int64| long| int/long| Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead.  
**uint32**|  uint32| uint32| int| int/long| Uses variable-length encoding.  
**uint64**|  uint64| uint64| long| int/long| Uses variable-length encoding.  
**sint32**|  int32| int32| int| int| Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s.  
**sint64**|  int64| int64| long| int/long| Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s.  
**fixed32**|  uint32| uint32| int| int| Always four bytes. More efficient than uint32 if values are often greater than 2^28.  
**fixed64**|  uint64| uint64| long| int/long| Always eight bytes. More efficient than uint64 if values are often greater than 2^56.  
**sfixed32**|  int32| int32| int| int| Always four bytes.  
**sfixed64**|  int64| int64| long| int/long| Always eight bytes.  
**bool**|  bool| bool| boolean| boolean|   
**string**|  string| string| String| str/unicode| A string must always contain UTF-8 encoded or 7-bit ASCII text.  
**bytes**|  string| []byte| ByteString| str| May contain any arbitrary sequence of bytes.  
  
[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/fullnode-protocol-types.mdx>)

[PreviousMessage Definitions](</references/fullnode-protocol-messages>)[NextRPC Best Practices](</references/sui-api/rpc-best-practices>)

  * sui/rpc/v2/checkpoint_summary.proto
  * sui/rpc/v2/owner.proto
  * sui/rpc/v2/error_reason.proto
  * sui/rpc/v2/argument.proto
  * sui/rpc/v2/input.proto
  * sui/rpc/v2/signature_scheme.proto
  * sui/rpc/v2/transaction.proto
  * sui/rpc/v2/transaction_execution_service.proto
  * sui/rpc/v2/state_service.proto
  * sui/rpc/v2/move_package.proto
  * sui/rpc/v2/effects.proto
  * sui/rpc/v2/execution_status.proto
  * Scalar Value Types
