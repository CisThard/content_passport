<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Transaction


# Transaction

Description of a transaction, the unit of activity on Sui.
[code] 
    type Transaction implements Node {  
      digest: String!  
      effects: TransactionEffects  
      expiration: Epoch  
      gasInput: GasInput  
      id: ID!  
      kind: TransactionKind  
      sender: Address  
      signatures: [UserSignature!]!  
      transactionBcs: Base64  
      transactionJson: JSON  
    }  
    
[/code]

### Fields​

#### `Transaction.**digest**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A 32-byte hash that uniquely identifies the transaction contents, encoded in Base58.

#### `Transaction.**effects**` ● [`**TransactionEffects**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object​

The results to the chain of executing this transaction.

#### `Transaction.**expiration**` ● [`**Epoch**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object​

This field is set by senders of a transaction block. It is an epoch reference that sets a deadline after which validators will no longer consider the transaction valid. By default, there is no deadline for when a transaction must execute.

#### `Transaction.**gasInput**` ● [`**GasInput**`](</references/sui-api/sui-graphql/beta/reference/types/objects/gas-input>) object​

The gas input field provides information on what objects were used as gas as well as the owner of the gas object(s) and information on the gas price and budget.

#### `Transaction.**id**` ● [`**ID!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/id>) non-null scalar​

The transaction's globally unique identifier, which can be passed to `Query.node` to refetch it.

#### `Transaction.**kind**` ● [`**TransactionKind**`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-kind>) union​

The type of this transaction as well as the commands and/or parameters comprising the transaction of this kind.

#### `Transaction.**sender**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

The address corresponding to the public key that signed this transaction. System transactions do not have senders.

#### `Transaction.**signatures**` ● [`**[UserSignature!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/user-signature>) non-null object​

User signatures for this transaction.

#### `Transaction.**transactionBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64-encoded BCS serialization of this transaction, as a `TransactionData`.

#### `Transaction.**transactionJson**` ● [`**JSON**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/json>) scalar​

The transaction as a JSON blob, matching the gRPC proto format (excluding BCS).

### Interfaces​

#### [`**Node**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/node>) interface​

An interface implemented by types that can be uniquely identified by a globally unique `ID`, following the GraphQL Global Object Identification specification.

### Returned By​

[`multiGetTransactions`](</references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-transactions>) query ● [`transaction`](</references/sui-api/sui-graphql/beta/reference/operations/queries/transaction>) query

### Member Of​

[`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`Event`](</references/sui-api/sui-graphql/beta/reference/types/objects/event>) object ● [`IObject`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iobject>) interface ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object ● [`TransactionConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-connection>) object ● [`TransactionEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-edge>) object ● [`TransactionEffects`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/transaction.mdx>)
