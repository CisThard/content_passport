<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/package -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * package


# package

Fetch a package by its address.

If `version` is specified, the package loaded is the one that shares its original ID with the package at `address`, but whose version is `version`.

If `atCheckpoint` is specified, the package loaded is the one with the largest version among all packages sharing an original ID with the package at `address` and was published at or before `atCheckpoint`.

If neither are specified, the package is fetched at the checkpoint being viewed.

It is an error to specify both `version` and `atCheckpoint`, and `null` will be returned if the package cannot be found as of the latest checkpoint, or the address points to an object that is not a package.

Note that this interpretation of `version` and "latest" differs from the one used by `Query.object`, because non-system package upgrades generate objects with different IDs. To fetch a package using the versioning semantics of objects, use `Object.asMovePackage` nested under `Query.object`.
[code] 
    package(  
      address: SuiAddress!  
      version: UInt53  
      atCheckpoint: UInt53  
    ): MovePackage  
    
[/code]

### Arguments​

#### `package.**address**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

#### `package.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

#### `package.**atCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

### Type​

#### [`**MovePackage**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object​

A MovePackage is a kind of Object that represents code that has been published on-chain. It exposes information about its modules, type definitions, functions, and dependencies.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/package.mdx>)
