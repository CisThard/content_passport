<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/inputs/package-key -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Inputs
  * PackageKey


# PackageKey

Identifies a specific version of a package.

The `address` field must be specified, as well as at most one of `version`, or `atCheckpoint`. If neither is provided, the package is fetched at the checkpoint being viewed.

See `Query.package` for more details.
[code] 
    input PackageKey {  
      address: SuiAddress!  
      atCheckpoint: UInt53  
      version: UInt53  
    }  
    
[/code]

### Fields​

#### `PackageKey.**address**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

The object's ID.

#### `PackageKey.**atCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

If specified, tries to fetch the latest version as of this checkpoint.

#### `PackageKey.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

If specified, tries to fetch the package at this exact version.

### Member Of​

[`multiGetPackages`](</references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-packages>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/inputs/package-key.mdx>)
