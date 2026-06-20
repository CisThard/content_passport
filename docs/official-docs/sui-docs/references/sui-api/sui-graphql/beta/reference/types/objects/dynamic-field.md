<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * DynamicField


# DynamicField

Dynamic fields are heterogenous fields that can be added or removed from an object at runtime. Their names are arbitrary Move values that have `copy`, `drop`, and `store`.

There are two sub-types of dynamic fields:

  * Dynamic fields can store any value that has `store`. Objects stored in this kind of field will be considered wrapped (not accessible via its ID by external tools like explorers, wallets, etc. accessing storage).
  * Dynamic object fields can only store objects (values that have the `key` ability, and an `id: UID` as its first field) that have `store`, but they will still be directly accessible off-chain via their ID after being attached as a field.


[code] 
    type DynamicField implements Node, IAddressable, IMoveObject, IObject {  
      address: SuiAddress!  
      addressAt(  
        rootVersion: UInt53  
        checkpoint: UInt53  
      ): Address  
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
      name: MoveValue  
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
      value: DynamicFieldValue  
      version: UInt53  
    }  
    
[/code]

### Fields​

#### `DynamicField.**address**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

The DynamicField's ID.

#### `DynamicField.**addressAt**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

Fetch the address as it was at a different root version, or checkpoint.

If no additional bound is provided, the address is fetched at the latest checkpoint known to the RPC.

##### `DynamicField.addressAt.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `DynamicField.addressAt.**checkpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `DynamicField.**balance**` ● [`**Balance**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) object​

Fetch the total balance for coins with marker type `coinType` (e.g. `0x2::sui::SUI`), owned by this address.

If the address does not own any coins of that type, a balance of zero is returned.

##### `DynamicField.balance.**coinType**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `DynamicField.**balances**` ● [`**BalanceConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-connection>) object​

Total balance across coins owned by this address, grouped by coin type.

##### `DynamicField.balances.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `DynamicField.balances.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `DynamicField.balances.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `DynamicField.balances.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `DynamicField.**contents**` ● [`**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

The structured representation of the object's contents.

#### `DynamicField.**defaultNameRecord**` ● [`**NameRecord**`](</references/sui-api/sui-graphql/beta/reference/types/objects/name-record>) object​

The domain explicitly configured as the default Name Service name for this address.

#### `DynamicField.**digest**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

32-byte hash that identifies the object's contents, encoded in Base58.

#### `DynamicField.**dynamicField**` ● [`**DynamicField**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object​

Access a dynamic field on an object using its type and BCS-encoded name.

Returns `null` if a dynamic field with that name could not be found attached to this object.

##### `DynamicField.dynamicField.**name**` ● [`**DynamicFieldName!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `DynamicField.**dynamicFields**` ● [`**DynamicFieldConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-connection>) object​

Dynamic fields owned by this object.

Dynamic fields on wrapped objects can be accessed using `Address.dynamicFields`.

##### `DynamicField.dynamicFields.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `DynamicField.dynamicFields.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `DynamicField.dynamicFields.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `DynamicField.dynamicFields.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `DynamicField.**dynamicObjectField**` ● [`**DynamicField**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object​

Access a dynamic object field on an object using its type and BCS-encoded name.

Returns `null` if a dynamic object field with that name could not be found attached to this object.

##### `DynamicField.dynamicObjectField.**name**` ● [`**DynamicFieldName!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `DynamicField.**hasPublicTransfer**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

Whether this object can be transfered using the `TransferObjects` Programmable Transaction Command or `sui::transfer::public_transfer`.

Both these operations require the object to have both the `key` and `store` abilities.

#### `DynamicField.**id**` ● [`**ID!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/id>) non-null scalar​

The dynamic field's globally unique identifier, which can be passed to `Query.node` to refetch it.

#### `DynamicField.**moveObjectBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64-encoded BCS serialize of this object, as a `MoveObject`.

#### `DynamicField.**multiGetBalances**` ● [`**[Balance!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) list object​

Fetch the total balances keyed by coin types (e.g. `0x2::sui::SUI`) owned by this address.

If the address does not own any coins of a given type, a balance of zero is returned for that type.

##### `DynamicField.multiGetBalances.**keys**` ● [`**[String!]!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `DynamicField.**multiGetDynamicFields**` ● [`**[DynamicField]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) non-null object​

Access dynamic fields on an object using their types and BCS-encoded names.

Returns a list of dynamic fields that is guaranteed to be the same length as `keys`. If a dynamic field in `keys` could not be found in the store, its corresponding entry in the result will be `null`.

##### `DynamicField.multiGetDynamicFields.**keys**` ● [`**[DynamicFieldName!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `DynamicField.**multiGetDynamicObjectFields**` ● [`**[DynamicField]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) non-null object​

Access dynamic object fields on an object using their types and BCS-encoded names.

Returns a list of dynamic object fields that is guaranteed to be the same length as `keys`. If a dynamic object field in `keys` could not be found in the store, its corresponding entry in the result will be `null`.

##### `DynamicField.multiGetDynamicObjectFields.**keys**` ● [`**[DynamicFieldName!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `DynamicField.**name**` ● [`**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

The dynamic field's name, as a Move value.

#### `DynamicField.**objectAt**` ● [`**Object**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object​

Fetch the object with the same ID, at a different version, root version bound, or checkpoint.

##### `DynamicField.objectAt.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `DynamicField.objectAt.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `DynamicField.objectAt.**checkpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `DynamicField.**objectBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64-encoded BCS serialization of this object, as an `Object`.

#### `DynamicField.**objectVersionsAfter**` ● [`**ObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object​

Paginate all versions of this object after this one.

##### `DynamicField.objectVersionsAfter.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `DynamicField.objectVersionsAfter.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `DynamicField.objectVersionsAfter.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `DynamicField.objectVersionsAfter.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `DynamicField.objectVersionsAfter.**filter**` ● [`**VersionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter>) input​

#### `DynamicField.**objectVersionsBefore**` ● [`**ObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object​

Paginate all versions of this object before this one.

##### `DynamicField.objectVersionsBefore.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `DynamicField.objectVersionsBefore.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `DynamicField.objectVersionsBefore.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `DynamicField.objectVersionsBefore.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `DynamicField.objectVersionsBefore.**filter**` ● [`**VersionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter>) input​

#### `DynamicField.**objects**` ● [`**MoveObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object-connection>) object​

Objects owned by this object, optionally filtered by type.

##### `DynamicField.objects.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `DynamicField.objects.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `DynamicField.objects.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `DynamicField.objects.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `DynamicField.objects.**filter**` ● [`**ObjectFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/object-filter>) input​

#### `DynamicField.**owner**` ● [`**Owner**`](</references/sui-api/sui-graphql/beta/reference/types/unions/owner>) union​

The object's owner kind.

#### `DynamicField.**previousTransaction**` ● [`**Transaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object​

The transaction that created this version of the object.

#### `DynamicField.**receivedTransactions**` ● [`**TransactionConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-connection>) object​

The transactions that sent objects to this object.

##### `DynamicField.receivedTransactions.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `DynamicField.receivedTransactions.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `DynamicField.receivedTransactions.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `DynamicField.receivedTransactions.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `DynamicField.receivedTransactions.**filter**` ● [`**TransactionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/transaction-filter>) input​

#### `DynamicField.**storageRebate**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The SUI returned to the sponsor or sender of the transaction that modifies or deletes this object.

#### `DynamicField.**value**` ● [`**DynamicFieldValue**`](</references/sui-api/sui-graphql/beta/reference/types/unions/dynamic-field-value>) union​

The dynamic field's value, as a Move value for dynamic fields and as a MoveObject for dynamic object fields.

#### `DynamicField.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

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

[`Address`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object ● [`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`DynamicFieldConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-connection>) object ● [`DynamicFieldEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-edge>) object ● [`IMoveObject`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-object>) interface ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field.mdx>)
