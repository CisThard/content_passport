<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * CoinMetadata


# CoinMetadata

An object representing metadata about a coin type.
[code] 
    type CoinMetadata implements IAddressable, IMoveObject, IObject {  
      address: SuiAddress!  
      addressAt(  
        rootVersion: UInt53  
        checkpoint: UInt53  
      ): Address  
      allowGlobalPause: Boolean  
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
      decimals: Int  
      defaultNameRecord: NameRecord  
      denyCap: MoveObject  
      description: String  
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
      iconUrl: String  
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
      name: String  
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
      regulatedState: RegulatedState  
      storageRebate: BigInt  
      supply: BigInt  
      supplyState: SupplyState  
      symbol: String  
      version: UInt53  
    }  
    
[/code]

### Fields​

#### `CoinMetadata.**address**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

The CoinMetadata's ID.

#### `CoinMetadata.**addressAt**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

Fetch the address as it was at a different root version, or checkpoint.

If no additional bound is provided, the address is fetched at the latest checkpoint known to the RPC.

##### `CoinMetadata.addressAt.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `CoinMetadata.addressAt.**checkpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `CoinMetadata.**allowGlobalPause**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

Whether the `DenyCap` can be used to enable a global pause that behaves as if all addresses were added to the deny list. `null` indicates that it is not known whether the currency can be paused or not. This field is only populated on currencies held in the Coin Registry. To determine whether a legacy currency can be paused, check the contents of its `DenyCap`, if it can be found.

#### `CoinMetadata.**balance**` ● [`**Balance**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) object​

Fetch the total balance for coins with marker type `coinType` (e.g. `0x2::sui::SUI`), owned by this address.

If the address does not own any coins of that type, a balance of zero is returned.

##### `CoinMetadata.balance.**coinType**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `CoinMetadata.**balances**` ● [`**BalanceConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-connection>) object​

Total balance across coins owned by this address, grouped by coin type.

##### `CoinMetadata.balances.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `CoinMetadata.balances.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `CoinMetadata.balances.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `CoinMetadata.balances.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `CoinMetadata.**contents**` ● [`**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

The structured representation of the object's contents.

#### `CoinMetadata.**decimals**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Number of decimal places the coin uses.

#### `CoinMetadata.**defaultNameRecord**` ● [`**NameRecord**`](</references/sui-api/sui-graphql/beta/reference/types/objects/name-record>) object​

The domain explicitly configured as the default Name Service name for this address.

#### `CoinMetadata.**denyCap**` ● [`**MoveObject**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object​

If the currency is regulated, this object represents the capability to modify the deny list. If a capability is known but wrapped, its address can be fetched but other fields will not be accessible.

#### `CoinMetadata.**description**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Description of the coin.

#### `CoinMetadata.**digest**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

32-byte hash that identifies the object's contents, encoded in Base58.

#### `CoinMetadata.**dynamicField**` ● [`**DynamicField**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object​

Access a dynamic field on an object using its type and BCS-encoded name.

Returns `null` if a dynamic field with that name could not be found attached to this object.

##### `CoinMetadata.dynamicField.**name**` ● [`**DynamicFieldName!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `CoinMetadata.**dynamicFields**` ● [`**DynamicFieldConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-connection>) object​

Dynamic fields owned by this object.

Dynamic fields on wrapped objects can be accessed using `Address.dynamicFields`.

##### `CoinMetadata.dynamicFields.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `CoinMetadata.dynamicFields.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `CoinMetadata.dynamicFields.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `CoinMetadata.dynamicFields.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `CoinMetadata.**dynamicObjectField**` ● [`**DynamicField**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object​

Access a dynamic object field on an object using its type and BCS-encoded name.

Returns `null` if a dynamic object field with that name could not be found attached to this object.

##### `CoinMetadata.dynamicObjectField.**name**` ● [`**DynamicFieldName!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input ​

#### `CoinMetadata.**hasPublicTransfer**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

Whether this object can be transfered using the `TransferObjects` Programmable Transaction Command or `sui::transfer::public_transfer`.

Both these operations require the object to have both the `key` and `store` abilities.

#### `CoinMetadata.**iconUrl**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

URL for the coin logo.

#### `CoinMetadata.**moveObjectBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64-encoded BCS serialize of this object, as a `MoveObject`.

#### `CoinMetadata.**multiGetBalances**` ● [`**[Balance!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) list object​

Fetch the total balances keyed by coin types (e.g. `0x2::sui::SUI`) owned by this address.

If the address does not own any coins of a given type, a balance of zero is returned for that type.

##### `CoinMetadata.multiGetBalances.**keys**` ● [`**[String!]!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `CoinMetadata.**multiGetDynamicFields**` ● [`**[DynamicField]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) non-null object​

Access dynamic fields on an object using their types and BCS-encoded names.

Returns a list of dynamic fields that is guaranteed to be the same length as `keys`. If a dynamic field in `keys` could not be found in the store, its corresponding entry in the result will be `null`.

##### `CoinMetadata.multiGetDynamicFields.**keys**` ● [`**[DynamicFieldName!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `CoinMetadata.**multiGetDynamicObjectFields**` ● [`**[DynamicField]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) non-null object​

Access dynamic object fields on an object using their types and BCS-encoded names.

Returns a list of dynamic object fields that is guaranteed to be the same length as `keys`. If a dynamic object field in `keys` could not be found in the store, its corresponding entry in the result will be `null`.

##### `CoinMetadata.multiGetDynamicObjectFields.**keys**` ● [`**[DynamicFieldName!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `CoinMetadata.**name**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Name for the coin.

#### `CoinMetadata.**objectAt**` ● [`**Object**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object​

Fetch the object with the same ID, at a different version, root version bound, or checkpoint.

##### `CoinMetadata.objectAt.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `CoinMetadata.objectAt.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `CoinMetadata.objectAt.**checkpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `CoinMetadata.**objectBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64-encoded BCS serialization of this object, as an `Object`.

#### `CoinMetadata.**objectVersionsAfter**` ● [`**ObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object​

Paginate all versions of this object after this one.

##### `CoinMetadata.objectVersionsAfter.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `CoinMetadata.objectVersionsAfter.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `CoinMetadata.objectVersionsAfter.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `CoinMetadata.objectVersionsAfter.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `CoinMetadata.objectVersionsAfter.**filter**` ● [`**VersionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter>) input​

#### `CoinMetadata.**objectVersionsBefore**` ● [`**ObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object​

Paginate all versions of this object before this one.

##### `CoinMetadata.objectVersionsBefore.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `CoinMetadata.objectVersionsBefore.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `CoinMetadata.objectVersionsBefore.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `CoinMetadata.objectVersionsBefore.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `CoinMetadata.objectVersionsBefore.**filter**` ● [`**VersionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter>) input​

#### `CoinMetadata.**objects**` ● [`**MoveObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object-connection>) object​

Objects owned by this object, optionally filtered by type.

##### `CoinMetadata.objects.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `CoinMetadata.objects.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar ​

##### `CoinMetadata.objects.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `CoinMetadata.objects.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `CoinMetadata.objects.**filter**` ● [`**ObjectFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/object-filter>) input​

#### `CoinMetadata.**owner**` ● [`**Owner**`](</references/sui-api/sui-graphql/beta/reference/types/unions/owner>) union​

The object's owner kind.

#### `CoinMetadata.**previousTransaction**` ● [`**Transaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object​

The transaction that created this version of the object.

#### `CoinMetadata.**receivedTransactions**` ● [`**TransactionConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-connection>) object​

The transactions that sent objects to this object.

##### `CoinMetadata.receivedTransactions.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `CoinMetadata.receivedTransactions.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `CoinMetadata.receivedTransactions.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `CoinMetadata.receivedTransactions.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `CoinMetadata.receivedTransactions.**filter**` ● [`**TransactionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/transaction-filter>) input​

#### `CoinMetadata.**regulatedState**` ● [`**RegulatedState**`](</references/sui-api/sui-graphql/beta/reference/types/enums/regulated-state>) enum​

Whether the currency is regulated or not. `null` indicates that the regulatory status is unknown.

#### `CoinMetadata.**storageRebate**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The SUI returned to the sponsor or sender of the transaction that modifies or deletes this object.

#### `CoinMetadata.**supply**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The overall balance of coins issued.

#### `CoinMetadata.**supplyState**` ● [`**SupplyState**`](</references/sui-api/sui-graphql/beta/reference/types/enums/supply-state>) enum​

Future behavior of the supply. `null` indicates that the future behavior of the supply is not known because the currency's treasury still exists.

#### `CoinMetadata.**symbol**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Symbol for the coin.

#### `CoinMetadata.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The version of this object that this content comes from.

### Interfaces​

#### [`**IAddressable**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iaddressable>) interface​

Interface implemented by GraphQL types representing entities that are identified by an address.

An address uniquely represents either the public key of an account, or an object's ID, but never both. It is not possible to determine which type an address represents up-front. If an object is wrapped, its contents will not be accessible via its address, but it will still be possible to access other objects it owns.

#### [`**IMoveObject**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-object>) interface​

Interface implemented by types that represent a Move object on-chain (A Move value whose type has `key`).

#### [`**IObject**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iobject>) interface​

Interface implemented by versioned on-chain values that are addressable by an ID (also referred to as its address). This includes Move objects and packages.

### Returned By​

[`coinMetadata`](</references/sui-api/sui-graphql/beta/reference/operations/queries/coin-metadata>) query

### Member Of​

[`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata.mdx>)
