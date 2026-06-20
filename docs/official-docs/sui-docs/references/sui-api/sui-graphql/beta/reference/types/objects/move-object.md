<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-object -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveObject


# MoveObject

A MoveObject is a kind of Object that reprsents data stored on-chain.
[code] 
    type MoveObject implements Node, IAddressable, IMoveObject, IObject {  
      address: SuiAddress!  
      addressAt(  
        rootVersion: UInt53  
        checkpoint: UInt53  
      ): Address  
      asCoinMetadata: CoinMetadata  
      asDynamicField: DynamicField  
      balance(  
        coinType: String!  
      ): Balance  
      balances(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): BalanceConnection  
      contents: MoveValue  
      defaultNameRecord: NameRecord  
      digest: String  
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
      hasPublicTransfer: Boolean  
      id: ID!  
      moveObjectBcs: Base64  
      multiGetBalances(  
        keys: [String!]!  
      ): [Balance!]  
      multiGetDynamicFields(  
        keys: [DynamicFieldName!]!  
      ): [DynamicField]!  
      multiGetDynamicObjectFields(  
        keys: [DynamicFieldName!]!  
      ): [DynamicField]!  
      objectAt(  
        version: UInt53  
        rootVersion: UInt53  
        checkpoint: UInt53  
      ): Object  
      objectBcs: Base64  
      objectVersionsAfter(  
        first: Int  
        after: String  
        last: Int  
        before: String  
        filter: VersionFilter  
      ): ObjectConnection  
      objectVersionsBefore(  
        first: Int  
        after: String  
        last: Int  
        before: String  
        filter: VersionFilter  
      ): ObjectConnection  
      objects(  
        first: Int  
        after: String  
        last: Int  
        before: String  
        filter: ObjectFilter  
      ): MoveObjectConnection  
      owner: Owner  
      previousTransaction: Transaction  
      receivedTransactions(  
        first: Int  
        after: String  
        last: Int  
        before: String  
        filter: TransactionFilter  
      ): TransactionConnection  
      storageRebate: BigInt  
      version: UInt53  
    }  
    
[/code]

### Fields​

#### `MoveObject.**address**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

The MoveObject's ID.

#### `MoveObject.**addressAt**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

Fetch the address as it was at a different root version, or checkpoint.

If no additional bound is provided, the address is fetched at the latest checkpoint known to the RPC.

##### `MoveObject.addressAt.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `MoveObject.addressAt.**checkpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `MoveObject.**asCoinMetadata**` ● [`**CoinMetadata**`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object​

Attempts to convert the object into a CoinMetadata.

#### `MoveObject.**asDynamicField**` ● [`**DynamicField**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object​

Attempts to convert the object into a DynamicField.

#### `MoveObject.**balance**` ● [`**Balance**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) object​

Fetch the total balance for coins with marker type `coinType` (e.g. `0x2::sui::SUI`), owned by this address.

If the address does not own any coins of that type, a balance of zero is returned.

##### `MoveObject.balance.**coinType**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `MoveObject.**balances**` ● [`**BalanceConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-connection>) object​

Total balance across coins owned by this address, grouped by coin type.

##### `MoveObject.balances.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveObject.balances.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveObject.balances.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveObject.balances.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `MoveObject.**contents**` ● [`**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

The structured representation of the object's contents.

#### `MoveObject.**defaultNameRecord**` ● [`**NameRecord**`](</references/sui-api/sui-graphql/beta/reference/types/objects/name-record>) object​

The domain explicitly configured as the default Name Service name for this address.

#### `MoveObject.**digest**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

32-byte hash that identifies the object's contents, encoded in Base58.

#### `MoveObject.**dynamicField**` ● [`**DynamicField**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object​

Access a dynamic field on an object using its type and BCS-encoded name.

Returns `null` if a dynamic field with that name could not be found attached to this object.

##### `MoveObject.dynamicField.**name**` ● [`**DynamicFieldName!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `MoveObject.**dynamicFields**` ● [`**DynamicFieldConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-connection>) object​

Dynamic fields owned by this object.

Dynamic fields on wrapped objects can be accessed using `Address.dynamicFields`.

##### `MoveObject.dynamicFields.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveObject.dynamicFields.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveObject.dynamicFields.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveObject.dynamicFields.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `MoveObject.**dynamicObjectField**` ● [`**DynamicField**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object​

Access a dynamic object field on an object using its type and BCS-encoded name.

Returns `null` if a dynamic object field with that name could not be found attached to this object.

##### `MoveObject.dynamicObjectField.**name**` ● [`**DynamicFieldName!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `MoveObject.**hasPublicTransfer**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

Whether this object can be transfered using the `TransferObjects` Programmable Transaction Command or `sui::transfer::public_transfer`.

Both these operations require the object to have both the `key` and `store` abilities.

#### `MoveObject.**id**` ● [`**ID!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/id>) non-null scalar​

The Move object's globally unique identifier, which can be passed to `Query.node` to refetch it.

#### `MoveObject.**moveObjectBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64-encoded BCS serialize of this object, as a `MoveObject`.

#### `MoveObject.**multiGetBalances**` ● [`**[Balance!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) list object​

Fetch the total balances keyed by coin types (e.g. `0x2::sui::SUI`) owned by this address.

If the address does not own any coins of a given type, a balance of zero is returned for that type.

##### `MoveObject.multiGetBalances.**keys**` ● [`**[String!]!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `MoveObject.**multiGetDynamicFields**` ● [`**[DynamicField]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) non-null object​

Access dynamic fields on an object using their types and BCS-encoded names.

Returns a list of dynamic fields that is guaranteed to be the same length as `keys`. If a dynamic field in `keys` could not be found in the store, its corresponding entry in the result will be `null`.

##### `MoveObject.multiGetDynamicFields.**keys**` ● [`**[DynamicFieldName!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `MoveObject.**multiGetDynamicObjectFields**` ● [`**[DynamicField]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) non-null object​

Access dynamic object fields on an object using their types and BCS-encoded names.

Returns a list of dynamic object fields that is guaranteed to be the same length as `keys`. If a dynamic object field in `keys` could not be found in the store, its corresponding entry in the result will be `null`.

##### `MoveObject.multiGetDynamicObjectFields.**keys**` ● [`**[DynamicFieldName!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `MoveObject.**objectAt**` ● [`**Object**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object​

Fetch the object with the same ID, at a different version, root version bound, or checkpoint.

If no additional bound is provided, the latest version of this object is fetched at the latest checkpoint.

##### `MoveObject.objectAt.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `MoveObject.objectAt.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `MoveObject.objectAt.**checkpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `MoveObject.**objectBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64-encoded BCS serialization of this object, as an `Object`.

#### `MoveObject.**objectVersionsAfter**` ● [`**ObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object​

Paginate all versions of this object after this one.

##### `MoveObject.objectVersionsAfter.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveObject.objectVersionsAfter.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveObject.objectVersionsAfter.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveObject.objectVersionsAfter.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveObject.objectVersionsAfter.**filter**` ● [`**VersionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter>) input​

#### `MoveObject.**objectVersionsBefore**` ● [`**ObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object​

Paginate all versions of this object before this one.

##### `MoveObject.objectVersionsBefore.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveObject.objectVersionsBefore.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveObject.objectVersionsBefore.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveObject.objectVersionsBefore.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveObject.objectVersionsBefore.**filter**` ● [`**VersionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter>) input​

#### `MoveObject.**objects**` ● [`**MoveObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object-connection>) object​

Objects owned by this object, optionally filtered by type.

##### `MoveObject.objects.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveObject.objects.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveObject.objects.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveObject.objects.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveObject.objects.**filter**` ● [`**ObjectFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/object-filter>) input​

#### `MoveObject.**owner**` ● [`**Owner**`](</references/sui-api/sui-graphql/beta/reference/types/unions/owner>) union​

The object's owner kind.

#### `MoveObject.**previousTransaction**` ● [`**Transaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object​

The transaction that created this version of the object.

#### `MoveObject.**receivedTransactions**` ● [`**TransactionConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-connection>) object​

The transactions that sent objects to this object.

##### `MoveObject.receivedTransactions.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveObject.receivedTransactions.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveObject.receivedTransactions.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveObject.receivedTransactions.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveObject.receivedTransactions.**filter**` ● [`**TransactionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/transaction-filter>) input​

#### `MoveObject.**storageRebate**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The SUI returned to the sponsor or sender of the transaction that modifies or deletes this object.

#### `MoveObject.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The version of this object that this content comes from.

### Interfaces​

#### [`**Node**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/node>) interface​

An interface implemented by types that can be uniquely identified by a globally unique `ID`, following the GraphQL Global Object Identification specification.

#### [`**IAddressable**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iaddressable>) interface​

Interface implemented by GraphQL types representing entities that are identified by an address.

An address uniquely represents either the public key of an account, or an object's ID, but never both. It is not possible to determine which type an address represents up-front. If an object is wrapped, its contents will not be accessible via its address, but it will still be possible to access other objects it owns.

#### [`**IMoveObject**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-object>) interface​

Interface implemented by types that represent a Move object on-chain (A Move value whose type has `key`).

#### [`**IObject**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iobject>) interface​

Interface implemented by versioned on-chain values that are addressable by an ID (also referred to as its address). This includes Move objects and packages.

### Member Of​

[`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`MoveObjectConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object-connection>) object ● [`MoveObjectEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object-edge>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object

### Implemented By​

[`DynamicFieldValue`](</references/sui-api/sui-graphql/beta/reference/types/unions/dynamic-field-value>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-object.mdx>)
