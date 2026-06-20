<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/address -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * address


# address

Look-up an account by its SuiAddress.

If `rootVersion` is specified, nested dynamic field accesses will be fetched at or before this version. This can be used to fetch a child or descendant object bounded by its root object's version, when its immediate parent is wrapped, or a value in a dynamic object field. For any wrapped or child (object-owned) object, its root object can be defined recursively as:

  * The root object of the object it is wrapped in, if it is wrapped.
  * The root object of its owner, if it is owned by another object.
  * The object itself, if it is not object-owned or wrapped.


Specifying a `rootVersion` disables nested queries for paginating owned objects or dynamic fields (these queries are only supported at checkpoint boundaries).

If `atCheckpoint` is specified, the address will be fetched at the latest version as of this checkpoint. This will fail if the provided checkpoint is after the RPC's latest checkpoint.

If none of the above are specified, the address is fetched at the checkpoint being viewed.

If the address is fetched by name and the name does not resolve to an address (e.g. the name does not exist or has expired), `null` is returned.
[code] 
    address(  
      address: SuiAddress  
      name: String  
      rootVersion: UInt53  
      atCheckpoint: UInt53  
    ): Address  
    
[/code]

### Arguments​

#### `address.**address**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

#### `address.**name**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `address.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `address.**atCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

### Type​

#### [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/address.mdx>)
