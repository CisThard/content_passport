# Enoki API Specification

HTTP API for Enoki

## Create zkLogin nonce

Generates a nonce used in the zkLogin OAuth flow. Using this API is not required, you can also construct a nonce client-side if desired.

POST `/v1/zklogin/nonce`

### Authorization

AuthorizationBearer <token>

In: `header`

### Request Body

network?string

The Sui network you wish to use. Defaults to `mainnet`.

Default`"mainnet"`

Value in`"testnet" | "mainnet" | "devnet"`

ephemeralPublicKeystring

The ephemeral public key created during the zkLogin process, encoded as a base64 string.

additionalEpochs?number

The amount of epochs that you would like to have the nonce be valid for.

Default`2`

Range`0 <= value <= 30`

### Response Body

#### 200

```json
{
  "data": {
    "nonce": "string",
    "randomness": "string",
    "epoch": 0,
    "maxEpoch": 0,
    "estimatedExpiration": 0
  }
}
```

## Create zkLogin ZKP

Creates a zero-knowledge proof, which is used to submit transactions to Sui.

POST `/v1/zklogin/zkp`

### Authorization

AuthorizationBearer <token>

In: `header`

### Header Parameters

zklogin-jwtstring

The JWT of the user signed in with zkLogin.

### Request Body

network?string

The Sui network you wish to use. Defaults to `mainnet`.

Default`"mainnet"`

Value in`"testnet" | "mainnet" | "devnet"`

ephemeralPublicKeystring

The ephemeral public key created during the zkLogin process, encoded as a base64 string.

maxEpochinteger

The `maxEpoch` created during the zkLogin process.

Range`0 <= value`

randomnessstring

The `randomness` created during the zkLogin process.

### Response Body

#### 200

```json
{
  "data": {
    "proofPoints": null,
    "issBase64Details": null,
    "headerBase64": null,
    "addressSeed": "string"
  }
}
```

## Create sponsored transaction

Creates sponsored transaction

POST `/v1/transaction-blocks/sponsor`

### Authorization

AuthorizationBearer <token>

In: `header`

### Header Parameters

zklogin-jwt?string

The JWT of the user signed in with zkLogin.

### Request Body

network?string

The Sui network you wish to use. Defaults to `mainnet`.

Default`"mainnet"`

Value in`"testnet" | "mainnet" | "devnet"`

transactionBlockKindBytesstring

Bytes of the transaction with the `onlyTransactionKind` flag set to true.

sender?string

The address sending the transaction. Include this parameter if not including the `zklogin-jwt` header. This option is only supported when calling the API from a backend service using a private key.

allowedAddresses?array<string>

List of Sui addresses that can be present in the transaction. These addresses are combined with the list configured in the Enoki Developer Portal. Transactions attempting to refer to or transfer assets outside of these addresses are rejected.

Array Item

allowedMoveCallTargets?array<string>

List of permitted Move targets the sponsored user's transactions can call.

Array Item

### Response Body

#### 200

```json
{
  "data": {
    "digest": "string",
    "bytes": "string"
  }
}
```

## Submits a sponsored transaction for execution

Submits a transaction created from `/transaction-blocks/sponsor` for execution.

POST `/v1/transaction-blocks/sponsor/{digest}`

### Authorization

AuthorizationBearer <token>

In: `header`

### Path Parameters

digeststring

The digest of the previously-created sponsored transaction block to execute.

### Request Body

signaturestring

User signature of the transaction.

### Response Body

#### 200

```json
{
  "data": {
    "digest": "string"
  }
}
```

## Get address for zkLogin user

Returns the address and salt value for the given JWT. If the JWT is not valid, the API will return an error code.

GET `/v1/zklogin`

### Authorization

AuthorizationBearer <token>

In: `header`

### Header Parameters

zklogin-jwtstring

The JWT of the user signed in with zkLogin.

### Response Body

#### 200

```json
{
  "data": {
    "salt": "string",
    "address": "string",
    "publicKey": "string"
  }
}
```

## Get addresses for zkLogin user

Returns the addresses for a given JWT. If the JWT is not valid, the API will return an error code.

GET `/v1/zklogin/addresses`

### Authorization

AuthorizationBearer <token>

In: `header`

### Header Parameters

zklogin-jwtstring

The JWT of the user signed in with zkLogin.

### Response Body

#### 200

```json
{
  "data": {
    "addresses": [
      {
        "clientId": "string",
        "salt": "string",
        "address": "string",
        "publicKey": "string",
        "legacy": true
      }
    ]
  }
}
```

## Get app metadata

Returns the public metadata (configured in the Enoki Developer Portal) of the app associated with the API key.

GET `/v1/app`

### Authorization

AuthorizationBearer <token>

In: `header`

### Response Body

#### 200

```json
{
  "data": {
    "allowedOrigins": [
      "https://example.com"
    ],
    "authenticationProviders": [
      {
        "providerType": "google",
        "clientId": "..."
      }
    ],
    "domains": [
      {
        "nftId": "string",
        "name": "string",
        "network": "testnet"
      }
    ]
  }
}
```

## Get a list of subnames for an address

Get a list of subnames for an address

GET `/v1/subnames`

### Authorization

AuthorizationBearer <token>

In: `header`

### Query Parameters

network?string

The network subnames are registered on.

Default`"mainnet"`

Value in`"testnet" | "mainnet"`

domain?string

The domain name the subname is on.

address?string

The address to resolve subnames for

### Response Body

#### 200

```json
{
  "data": {
    "subnames": [
      {
        "name": "string",
        "status": "PENDING",
        "createdAt": "2025-08-06T14:30:00.000Z"
      }
    ]
  }
}
```

## Create a subname

Initiates the creation of a subname. The subname request is added to a processing queue and will be created asynchronously, typically within a few seconds. Note: A successful response from this API does not guarantee that the subname has been created yet. To check the status of the subname, use the `get` subname API or resolve the name directly on Sui.

POST `/v1/subnames`

### Authorization

AuthorizationBearer <token>

In: `header`

### Header Parameters

zklogin-jwt?string

The JWT of the user signed in with zkLogin.

### Request Body

domainstring

The domain name to create the subname under.

network?string

The network the domain and subname are registered on.

Default`"mainnet"`

Value in`"testnet" | "mainnet"`

subnamestring

The subname to create.

targetAddress?string

The address the new subname will resolve to

### Response Body

#### 202

```json
{
  "data": {
    "name": "string",
    "status": "PENDING",
    "createdAt": "2025-08-06T14:30:00.000Z"
  }
}
```

## Delete a subname

Initiates the deletion of a subname. The subname request is added to a processing queue and will be deleted asynchronously, typically within a few seconds. Note: A successful response from this API does not guarantee that the subname has been deleted yet. To check the status of the subname, use the `get` subname API or resolve the name directly on Sui.

DELETE `/v1/subnames`

### Authorization

AuthorizationBearer <token>

In: `header`

### Request Body

domainstring

The domain name the subname is on.

network?string

The network the domain and subname are registered on.

Default`"mainnet"`

Value in`"testnet" | "mainnet"`

subnamestring

The subname to delete.

targetAddress?string

The address the new subname will resolve to

### Response Body

#### 202

```json
{
  "data": {
    "name": "string",
    "status": "PENDING",
    "createdAt": "2025-08-06T14:30:00.000Z"
  }
}
```