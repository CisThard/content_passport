<!-- Source: https://docs.sui.io/references/fullnode-protocol -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * gRPC
  * Methods


On this page

# Sui Full Node gRPC Methods

Sui full node gRPC API replaces JSON-RPC on full nodes. JSON-RPC is `deprecated`.

See also: [Message Definitions](</references/fullnode-protocol-messages>) | [Enum and Scalar Types](</references/fullnode-protocol-types>)

Proto filessui/rpc/v2/signature_verification_service.protosui/rpc/v2/move_package_service.protosui/rpc/v2/transaction_execution_service.protosui/rpc/v2/state_service.protosui/rpc/v2/name_service.protosui/rpc/v2/ledger_service.protosui/rpc/v2/subscription_service.protoServicesJump to...SignatureVerificationService

## sui/rpc/v2/signature_verification_service.proto​

### Services (signature_verification_service.proto)​

SignatureVerificationService

Methods

VerifySignature

[VerifySignatureRequest](<fullnode-protocol-messages#sui-rpc-v2-VerifySignatureRequest>)→[VerifySignatureResponse](<fullnode-protocol-messages#sui-rpc-v2-VerifySignatureResponse>)

Perform signature verification of a UserSignature against the provided message.

## sui/rpc/v2/move_package_service.proto​

### Services (move_package_service.proto)​

MovePackageService

Methods

GetPackage

[GetPackageRequest](<fullnode-protocol-messages#sui-rpc-v2-GetPackageRequest>)→[GetPackageResponse](<fullnode-protocol-messages#sui-rpc-v2-GetPackageResponse>)

GetDatatype

[GetDatatypeRequest](<fullnode-protocol-messages#sui-rpc-v2-GetDatatypeRequest>)→[GetDatatypeResponse](<fullnode-protocol-messages#sui-rpc-v2-GetDatatypeResponse>)

GetFunction

[GetFunctionRequest](<fullnode-protocol-messages#sui-rpc-v2-GetFunctionRequest>)→[GetFunctionResponse](<fullnode-protocol-messages#sui-rpc-v2-GetFunctionResponse>)

ListPackageVersions

[ListPackageVersionsRequest](<fullnode-protocol-messages#sui-rpc-v2-ListPackageVersionsRequest>)→[ListPackageVersionsResponse](<fullnode-protocol-messages#sui-rpc-v2-ListPackageVersionsResponse>)

## sui/rpc/v2/transaction_execution_service.proto​

### Services (transaction_execution_service.proto)​

TransactionExecutionService

Methods

ExecuteTransaction

[ExecuteTransactionRequest](<fullnode-protocol-messages#sui-rpc-v2-ExecuteTransactionRequest>)→[ExecuteTransactionResponse](<fullnode-protocol-messages#sui-rpc-v2-ExecuteTransactionResponse>)

SimulateTransaction

[SimulateTransactionRequest](<fullnode-protocol-messages#sui-rpc-v2-SimulateTransactionRequest>)→[SimulateTransactionResponse](<fullnode-protocol-messages#sui-rpc-v2-SimulateTransactionResponse>)

## sui/rpc/v2/state_service.proto​

### Services (state_service.proto)​

StateService

Methods

ListDynamicFields

[ListDynamicFieldsRequest](<fullnode-protocol-messages#sui-rpc-v2-ListDynamicFieldsRequest>)→[ListDynamicFieldsResponse](<fullnode-protocol-messages#sui-rpc-v2-ListDynamicFieldsResponse>)

ListOwnedObjects

[ListOwnedObjectsRequest](<fullnode-protocol-messages#sui-rpc-v2-ListOwnedObjectsRequest>)→[ListOwnedObjectsResponse](<fullnode-protocol-messages#sui-rpc-v2-ListOwnedObjectsResponse>)

GetCoinInfo

[GetCoinInfoRequest](<fullnode-protocol-messages#sui-rpc-v2-GetCoinInfoRequest>)→[GetCoinInfoResponse](<fullnode-protocol-messages#sui-rpc-v2-GetCoinInfoResponse>)

GetBalance

[GetBalanceRequest](<fullnode-protocol-messages#sui-rpc-v2-GetBalanceRequest>)→[GetBalanceResponse](<fullnode-protocol-messages#sui-rpc-v2-GetBalanceResponse>)

ListBalances

[ListBalancesRequest](<fullnode-protocol-messages#sui-rpc-v2-ListBalancesRequest>)→[ListBalancesResponse](<fullnode-protocol-messages#sui-rpc-v2-ListBalancesResponse>)

## sui/rpc/v2/name_service.proto​

### Services (name_service.proto)​

NameService

Methods

LookupName

[LookupNameRequest](<fullnode-protocol-messages#sui-rpc-v2-LookupNameRequest>)→[LookupNameResponse](<fullnode-protocol-messages#sui-rpc-v2-LookupNameResponse>)

ReverseLookupName

[ReverseLookupNameRequest](<fullnode-protocol-messages#sui-rpc-v2-ReverseLookupNameRequest>)→[ReverseLookupNameResponse](<fullnode-protocol-messages#sui-rpc-v2-ReverseLookupNameResponse>)

## sui/rpc/v2/ledger_service.proto​

### Services (ledger_service.proto)​

LedgerService

Methods

GetServiceInfo

[GetServiceInfoRequest](<fullnode-protocol-messages#sui-rpc-v2-GetServiceInfoRequest>)→[GetServiceInfoResponse](<fullnode-protocol-messages#sui-rpc-v2-GetServiceInfoResponse>)

Query the service for general information about its current state.

GetObject

[GetObjectRequest](<fullnode-protocol-messages#sui-rpc-v2-GetObjectRequest>)→[GetObjectResponse](<fullnode-protocol-messages#sui-rpc-v2-GetObjectResponse>)

BatchGetObjects

[BatchGetObjectsRequest](<fullnode-protocol-messages#sui-rpc-v2-BatchGetObjectsRequest>)→[BatchGetObjectsResponse](<fullnode-protocol-messages#sui-rpc-v2-BatchGetObjectsResponse>)

GetTransaction

[GetTransactionRequest](<fullnode-protocol-messages#sui-rpc-v2-GetTransactionRequest>)→[GetTransactionResponse](<fullnode-protocol-messages#sui-rpc-v2-GetTransactionResponse>)

BatchGetTransactions

[BatchGetTransactionsRequest](<fullnode-protocol-messages#sui-rpc-v2-BatchGetTransactionsRequest>)→[BatchGetTransactionsResponse](<fullnode-protocol-messages#sui-rpc-v2-BatchGetTransactionsResponse>)

GetCheckpoint

[GetCheckpointRequest](<fullnode-protocol-messages#sui-rpc-v2-GetCheckpointRequest>)→[GetCheckpointResponse](<fullnode-protocol-messages#sui-rpc-v2-GetCheckpointResponse>)

GetEpoch

[GetEpochRequest](<fullnode-protocol-messages#sui-rpc-v2-GetEpochRequest>)→[GetEpochResponse](<fullnode-protocol-messages#sui-rpc-v2-GetEpochResponse>)

## sui/rpc/v2/subscription_service.proto​

### Services (subscription_service.proto)​

SubscriptionService

Methods

SubscribeCheckpoints

[SubscribeCheckpointsRequest](<fullnode-protocol-messages#sui-rpc-v2-SubscribeCheckpointsRequest>)→[SubscribeCheckpointsResponse](<fullnode-protocol-messages#sui-rpc-v2-SubscribeCheckpointsResponse>)

Subscribe to the stream of checkpoints. This API provides a subscription to the checkpoint stream for the Sui blockchain. When a subscription is initialized the stream will begin with the latest executed checkpoint as seen by the server. Responses are guaranteed to return checkpoints in-order and without gaps. This enables clients to know exactly the last checkpoint they have processed and in the event the subscription terminates (either by the client/server or by the connection breaking), clients will be able to reinitialize a subscription and then leverage other APIs in order to request data for the checkpoints they missed.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/fullnode-protocol.mdx>)

[PreviousWithdrawalReservation](</references/sui-api/sui-graphql/beta/reference/types/unions/withdrawal-reservation>)[NextMessage Definitions](</references/fullnode-protocol-messages>)

  * sui/rpc/v2/signature_verification_service.proto
    * Services (signature_verification_service.proto)
  * sui/rpc/v2/move_package_service.proto
    * Services (move_package_service.proto)
  * sui/rpc/v2/transaction_execution_service.proto
    * Services (transaction_execution_service.proto)
  * sui/rpc/v2/state_service.proto
    * Services (state_service.proto)
  * sui/rpc/v2/name_service.proto
    * Services (name_service.proto)
  * sui/rpc/v2/ledger_service.proto
    * Services (ledger_service.proto)
  * sui/rpc/v2/subscription_service.proto
    * Services (subscription_service.proto)
