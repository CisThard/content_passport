<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/address -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Address


# Address
[code]
    type Address implements Node, IAddressable {  
      address: SuiAddress!  
      addressAt(  
        rootVersion: UInt53  
        checkpoint: UInt53  
      ): Address  
      asObject: Object  
      asTransactionObject(  
        transactionDigest: String  
      ): TransactionObject  
      balance(  
        coinType: String!  
      ): Balance  
      balances(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): BalanceConnection  
      defaultNameRecord: NameRecord  
      dynamicField(  
        name: DynamicFieldName!  
      ): DynamicField  
      dynamicFields(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): DynamicFieldConnection  
      dynamicObjectField(  
        name: DynamicFieldName!  
      ): DynamicField  
      id: ID!  
      multiGetBalances(  
        keys: [String!]!  
      ): [Balance!]  
      multiGetDynamicFields(  
        keys: [DynamicFieldName!]!  
      ): [DynamicField]!  
      multiGetDynamicObjectFields(  
        keys: [DynamicFieldName!]!  
      ): [DynamicField]!  
      objects(  
        first: Int  
        after: String  
        last: Int  
        before: String  
        filter: ObjectFilter  
      ): MoveObjectConnection  
      transactions(  
        first: Int  
        after: String  
        last: Int  
        before: String  
        relation: AddressTransactionRelationship  
        filter: TransactionFilter  
      ): TransactionConnection  
    }  
    
[/code]

### Fields​

#### `Address.**address**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

The Address' identifier, a 32-byte number represented as a 64-character hex string, with a lead "0x".

#### `Address.**addressAt**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

Fetch the address as it was at a different root version, or checkpoint.

If no additional bound is provided, the address is fetched at the latest checkpoint known to the RPC.

##### `Address.addressAt.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `Address.addressAt.**checkpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `Address.**asObject**` ● [`**Object**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object​

Attempts to fetch the object at this address.

#### `Address.**asTransactionObject**` ● [`**TransactionObject**`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-object>) union​

How this address (interpreted as an object ID) was referenced by a specific transaction.

Returns `null` if the object was not referenced, or was present only as a non-object marker variant of unchanged consensus input (e.g. cancelled, stream-ended, per-epoch).

The `transactionDigest` argument may be omitted when the query is scoped under a transaction context (e.g. a parent `Transaction`, `TransactionEffects`, or `Event`); the field then resolves against the in-scope transaction.

Passing an explicit `transactionDigest` other than the in-scope transaction in subscription context is not supported; for arbitrary transaction lookups, use the indexed Query API.

##### `Address.asTransactionObject.**transactionDigest**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `Address.**balance**` ● [`**Balance**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) object​

Fetch the total balance for coins with marker type `coinType` (e.g. `0x2::sui::SUI`), owned by this address.

Returns `None` when no checkpoint is set in scope (e.g. execution scope). If the address does not own any coins of that type, a balance of zero is returned.

##### `Address.balance.**coinType**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `Address.**balances**` ● [`**BalanceConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-connection>) object​

Total balance across coins owned by this address, grouped by coin type.

##### `Address.balances.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Address.balances.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `Address.balances.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Address.balances.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `Address.**defaultNameRecord**` ● [`**NameRecord**`](</references/sui-api/sui-graphql/beta/reference/types/objects/name-record>) object​

The domain explicitly configured as the default Name Service name for this address.

#### `Address.**dynamicField**` ● [`**DynamicField**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object​

Access a dynamic field on an object using its type and BCS-encoded name.

Returns `null` if a dynamic field with that name could not be found attached to the object with this address.

##### `Address.dynamicField.**name**` ● [`**DynamicFieldName!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `Address.**dynamicFields**` ● [`**DynamicFieldConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-connection>) object​

Dynamic fields owned by this address.

The address must correspond to an object (account addresses cannot own dynamic fields), but that object may be wrapped.

##### `Address.dynamicFields.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Address.dynamicFields.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `Address.dynamicFields.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Address.dynamicFields.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `Address.**dynamicObjectField**` ● [`**DynamicField**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object​

Access a dynamic object field on an object using its type and BCS-encoded name.

Returns `null` if a dynamic object field with that name could not be found attached to the object with this address.

##### `Address.dynamicObjectField.**name**` ● [`**DynamicFieldName!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `Address.**id**` ● [`**ID!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/id>) non-null scalar​

The address's globally unique identifier, which can be passed to `Query.node` to refetch it.

#### `Address.**multiGetBalances**` ● [`**[Balance!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) list object​

Fetch the total balances keyed by coin types (e.g. `0x2::sui::SUI`) owned by this address.

Returns `None` when no checkpoint is set in scope (e.g. execution scope). If the address does not own any coins of a given type, a balance of zero is returned for that type.

##### `Address.multiGetBalances.**keys**` ● [`**[String!]!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `Address.**multiGetDynamicFields**` ● [`**[DynamicField]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) non-null object​

Access dynamic fields on an object using their types and BCS-encoded names.

Returns a list of dynamic fields that is guaranteed to be the same length as `keys`. If a dynamic field in `keys` could not be found in the store, its corresponding entry in the result will be `null`.

##### `Address.multiGetDynamicFields.**keys**` ● [`**[DynamicFieldName!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `Address.**multiGetDynamicObjectFields**` ● [`**[DynamicField]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) non-null object​

Access dynamic object fields on an object using their types and BCS-encoded names.

Returns a list of dynamic object fields that is guaranteed to be the same length as `keys`. If a dynamic object field in `keys` could not be found in the store, its corresponding entry in the result will be `null`.

##### `Address.multiGetDynamicObjectFields.**keys**` ● [`**[DynamicFieldName!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `Address.**objects**` ● [`**MoveObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object-connection>) object​

Objects owned by this address, optionally filtered by type.

##### `Address.objects.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Address.objects.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `Address.objects.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Address.objects.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `Address.objects.**filter**` ● [`**ObjectFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/object-filter>) input​

#### `Address.**transactions**` ● [`**TransactionConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-connection>) object​

Transactions associated with this address.

Similar behavior to the `transactions` in Query but supporting the additional `AddressTransactionRelationship` filter, which defaults to `SENT`.

##### `Address.transactions.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Address.transactions.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `Address.transactions.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Address.transactions.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `Address.transactions.**relation**` ● [`**AddressTransactionRelationship**`](</references/sui-api/sui-graphql/beta/reference/types/enums/address-transaction-relationship>) enum​

##### `Address.transactions.**filter**` ● [`**TransactionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/transaction-filter>) input​

### Interfaces​

#### [`**Node**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/node>) interface​

An interface implemented by types that can be uniquely identified by a globally unique `ID`, following the GraphQL Global Object Identification specification.

#### [`**IAddressable**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iaddressable>) interface​

Interface implemented by GraphQL types representing entities that are identified by an address.

An address uniquely represents either the public key of an account, or an object's ID, but never both. It is not possible to determine which type an address represents up-front. If an object is wrapped, its contents will not be accessible via its address, but it will still be possible to access other objects it owns.

### Returned By​

[`address`](</references/sui-api/sui-graphql/beta/reference/operations/queries/address>) query ● [`multiGetAddresses`](</references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-addresses>) query

### Member Of​

[`Address`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object ● [`AddressOwner`](</references/sui-api/sui-graphql/beta/reference/types/objects/address-owner>) object ● [`BalanceChange`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-change>) object ● [`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`ConsensusAddressOwner`](</references/sui-api/sui-graphql/beta/reference/types/objects/consensus-address-owner>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`Event`](</references/sui-api/sui-graphql/beta/reference/types/objects/event>) object ● [`GasInput`](</references/sui-api/sui-graphql/beta/reference/types/objects/gas-input>) object ● [`IAddressable`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iaddressable>) interface ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object ● [`MoveValue`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object ● [`NameRecord`](</references/sui-api/sui-graphql/beta/reference/types/objects/name-record>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object ● [`ObjectOwner`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-owner>) object ● [`Transaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/address.mdx>)
