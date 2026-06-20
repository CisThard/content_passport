<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/name-record -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * NameRecord


# NameRecord

A Name Service NameRecord representing a domain name registration.
[code] 
    type NameRecord {  
      contents: MoveValue!  
      domain: String!  
      parent: NameRecord  
      target(  
        rootVersion: UInt53  
        atCheckpoint: UInt53  
      ): Address  
    }  
    
[/code]

### Fields​

#### `NameRecord.**contents**` ● [`**MoveValue!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) non-null object​

On-chain representation of the underlying Name Service `NameRecord` Move value.

#### `NameRecord.**domain**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The domain name this record is for.

#### `NameRecord.**parent**` ● [`**NameRecord**`](</references/sui-api/sui-graphql/beta/reference/types/objects/name-record>) object​

The Name Service Name Record of the parent domain, if this is a subdomain.

Returns `null` if this is not a subdomain.

#### `NameRecord.**target**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

The address this domain points to.

`rootVersion` and `atCheckpoint` control how the target `Address` is scoped. If neither is provided, the `Address` is scoped to the latest checkpoint known to the RPC.

##### `NameRecord.target.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

##### `NameRecord.target.**atCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

### Returned By​

[`nameRecord`](</references/sui-api/sui-graphql/beta/reference/operations/queries/name-record>) query

### Member Of​

[`Address`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object ● [`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`IAddressable`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iaddressable>) interface ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object ● [`NameRecord`](</references/sui-api/sui-graphql/beta/reference/types/objects/name-record>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/name-record.mdx>)
