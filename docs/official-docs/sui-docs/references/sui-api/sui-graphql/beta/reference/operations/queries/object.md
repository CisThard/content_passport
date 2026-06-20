<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/object -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * object


# object

Fetch an object by its address.

If `version` is specified, the object will be fetched at that exact version.

If `rootVersion` is specified, the object will be fetched at the latest version at or before this version. Nested dynamic field accesses will also be subject to this bound. This can be used to fetch a child or ancestor object bounded by its root object's version. For any wrapped or child (object-owned) object, its root object can be defined recursively as:

  * The root object of the object it is wrapped in, if it is wrapped.
  * The root object of its owner, if it is owned by another object.
  * The object itself, if it is not object-owned or wrapped.


Specifying a `version` or a `rootVersion` disables nested queries for paginating owned objects or dynamic fields (these queries are only supported at checkpoint boundaries).

If `atCheckpoint` is specified, the object will be fetched at the latest version as of this checkpoint. This will fail if the provided checkpoint is after the RPC's latest checkpoint.

If none of the above are specified, the object is fetched at the checkpoint being viewed.

It is an error to specify more than one of `version`, `rootVersion`, or `atCheckpoint`.

Returns `null` if an object cannot be found that meets this criteria.
[code] 
    object(  
      address: SuiAddress!  
      version: UInt53  
      rootVersion: UInt53  
      atCheckpoint: UInt53  
    ): Object  
    
[/code]

### Arguments​

#### `object.**address**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

#### `object.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `object.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `object.**atCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

### Type​

#### [`**Object**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object​

An Object on Sui is either a typed value (a Move Object) or a Package (modules containing functions and types).

Every object on Sui is identified by a unique address, and has a version number that increases with every modification. Objects also hold metadata detailing their current owner (who can sign for access to the object and whether that access can modify and/or delete the object), and the digest of the last transaction that modified the object.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/object.mdx>)
