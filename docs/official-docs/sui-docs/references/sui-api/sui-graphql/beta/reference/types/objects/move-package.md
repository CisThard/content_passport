<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-package -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MovePackage


# MovePackage

A MovePackage is a kind of Object that represents code that has been published on-chain. It exposes information about its modules, type definitions, functions, and dependencies.
[code] 
    type MovePackage implements Node, IAddressable, IObject {  
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
      defaultNameRecord: NameRecord  
      digest: String  
      id: ID!  
      linkage: [Linkage!]  
      module(  
        name: String!  
      ): MoveModule  
      moduleBcs: Base64  
      modules(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): MoveModuleConnection  
      multiGetBalances(  
        keys: [String!]!  
      ): [Balance!]  
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
      packageAt(  
        version: UInt53  
        checkpoint: UInt53  
      ): MovePackage  
      packageBcs: Base64  
      packageVersionsAfter(  
        first: Int  
        after: String  
        last: Int  
        before: String  
        filter: VersionFilter  
      ): MovePackageConnection  
      packageVersionsBefore(  
        first: Int  
        after: String  
        last: Int  
        before: String  
        filter: VersionFilter  
      ): MovePackageConnection  
      previousTransaction: Transaction  
      receivedTransactions(  
        first: Int  
        after: String  
        last: Int  
        before: String  
        filter: TransactionFilter  
      ): TransactionConnection  
      storageRebate: BigInt  
      typeOrigins: [TypeOrigin!]  
      version: UInt53  
    }  
    
[/code]

### Fields​

#### `MovePackage.**address**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

The MovePackage's ID.

#### `MovePackage.**addressAt**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

Fetch the address as it was at a different root version, or checkpoint.

If no additional bound is provided, the address is fetched at the latest checkpoint known to the RPC.

##### `MovePackage.addressAt.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `MovePackage.addressAt.**checkpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `MovePackage.**balance**` ● [`**Balance**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) object​

Fetch the total balance for coins with marker type `coinType` (e.g. `0x2::sui::SUI`), owned by this address.

If the address does not own any coins of that type, a balance of zero is returned.

##### `MovePackage.balance.**coinType**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `MovePackage.**balances**` ● [`**BalanceConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-connection>) object​

Total balance across coins owned by this address, grouped by coin type.

##### `MovePackage.balances.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.balances.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.balances.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.balances.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `MovePackage.**defaultNameRecord**` ● [`**NameRecord**`](</references/sui-api/sui-graphql/beta/reference/types/objects/name-record>) object​

The domain explicitly configured as the default Name Service name for this address.

#### `MovePackage.**digest**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

32-byte hash that identifies the package's contents, encoded in Base58.

#### `MovePackage.**id**` ● [`**ID!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/id>) non-null scalar​

The package's globally unique identifier, which can be passed to `Query.node` to refetch it.

#### `MovePackage.**linkage**` ● [`**[Linkage!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/linkage>) list object​

The transitive dependencies of this package.

#### `MovePackage.**module**` ● [`**MoveModule**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object​

The module named `name` in this package.

##### `MovePackage.module.**name**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `MovePackage.**moduleBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

BCS representation of the package's modules.  Modules appear as a sequence of pairs (module name, followed by module bytes), in alphabetic order by module name.

#### `MovePackage.**modules**` ● [`**MoveModuleConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module-connection>) object​

Paginate through this package's modules.

##### `MovePackage.modules.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.modules.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.modules.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.modules.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `MovePackage.**multiGetBalances**` ● [`**[Balance!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) list object​

Fetch the total balances keyed by coin types (e.g. `0x2::sui::SUI`) owned by this address.

If the address does not own any coins of a given type, a balance of zero is returned for that type.

##### `MovePackage.multiGetBalances.**keys**` ● [`**[String!]!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `MovePackage.**objectAt**` ● [`**Object**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object​

Fetch the package as an object with the same ID, at a different version, root version bound, or checkpoint.

If no additional bound is provided, the latest version of this object is fetched at the latest checkpoint.

##### `MovePackage.objectAt.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `MovePackage.objectAt.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `MovePackage.objectAt.**checkpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `MovePackage.**objectBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64-encoded BCS serialization of this package, as an `Object`.

#### `MovePackage.**objectVersionsAfter**` ● [`**ObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object​

Paginate all versions of this package treated as an object, after this one.

##### `MovePackage.objectVersionsAfter.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.objectVersionsAfter.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.objectVersionsAfter.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.objectVersionsAfter.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.objectVersionsAfter.**filter**` ● [`**VersionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter>) input​

#### `MovePackage.**objectVersionsBefore**` ● [`**ObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object​

Paginate all versions of this package treated as an object, before this one.

##### `MovePackage.objectVersionsBefore.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.objectVersionsBefore.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.objectVersionsBefore.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.objectVersionsBefore.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.objectVersionsBefore.**filter**` ● [`**VersionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter>) input​

#### `MovePackage.**objects**` ● [`**MoveObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object-connection>) object​

Objects owned by this package, optionally filtered by type.

##### `MovePackage.objects.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.objects.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.objects.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.objects.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.objects.**filter**` ● [`**ObjectFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/object-filter>) input​

#### `MovePackage.**owner**` ● [`**Owner**`](</references/sui-api/sui-graphql/beta/reference/types/unions/owner>) union​

The object's owner kind.

#### `MovePackage.**packageAt**` ● [`**MovePackage**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object​

Fetch the package with the same original ID, at a different version, or checkpoint.

If no additional bound is provided, the package is fetched at the latest checkpoint known to the RPC.

##### `MovePackage.packageAt.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `MovePackage.packageAt.**checkpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `MovePackage.**packageBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64-encoded BCS serialization of this package, as a `MovePackage`.

#### `MovePackage.**packageVersionsAfter**` ● [`**MovePackageConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package-connection>) object​

Paginate all versions of this package after this one.

##### `MovePackage.packageVersionsAfter.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.packageVersionsAfter.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.packageVersionsAfter.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.packageVersionsAfter.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.packageVersionsAfter.**filter**` ● [`**VersionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter>) input​

#### `MovePackage.**packageVersionsBefore**` ● [`**MovePackageConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package-connection>) object​

Paginate all versions of this package before this one.

##### `MovePackage.packageVersionsBefore.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.packageVersionsBefore.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.packageVersionsBefore.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.packageVersionsBefore.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.packageVersionsBefore.**filter**` ● [`**VersionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter>) input​

#### `MovePackage.**previousTransaction**` ● [`**Transaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object​

The transaction that created this version of the object.

#### `MovePackage.**receivedTransactions**` ● [`**TransactionConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-connection>) object​

The transactions that sent objects to this object.

##### `MovePackage.receivedTransactions.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.receivedTransactions.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.receivedTransactions.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MovePackage.receivedTransactions.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MovePackage.receivedTransactions.**filter**` ● [`**TransactionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/transaction-filter>) input​

#### `MovePackage.**storageRebate**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The SUI returned to the sponsor or sender of the transaction that modifies or deletes this object.

#### `MovePackage.**typeOrigins**` ● [`**[TypeOrigin!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/type-origin>) list object​

A table identifying which versions of a package introduced each of its types.

#### `MovePackage.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The version of this package that this content comes from.

### Interfaces​

#### [`**Node**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/node>) interface​

An interface implemented by types that can be uniquely identified by a globally unique `ID`, following the GraphQL Global Object Identification specification.

#### [`**IAddressable**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iaddressable>) interface​

Interface implemented by GraphQL types representing entities that are identified by an address.

An address uniquely represents either the public key of an account, or an object's ID, but never both. It is not possible to determine which type an address represents up-front. If an object is wrapped, its contents will not be accessible via its address, but it will still be possible to access other objects it owns.

#### [`**IObject**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iobject>) interface​

Interface implemented by versioned on-chain values that are addressable by an ID (also referred to as its address). This includes Move objects and packages.

### Returned By​

[`multiGetPackages`](</references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-packages>) query ● [`package`](</references/sui-api/sui-graphql/beta/reference/operations/queries/package>) query

### Member Of​

[`MoveModule`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object ● [`MovePackageConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package-connection>) object ● [`MovePackageEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package-edge>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-package.mdx>)
