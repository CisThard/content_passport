<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Inputs
  * VersionFilter


# VersionFilter

Filter for paginating the history of an Object or MovePackage.
[code] 
    input VersionFilter {  
      afterVersion: UInt53  
      beforeVersion: UInt53  
    }  
    
[/code]

### Fields​

#### `VersionFilter.**afterVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Filter to versions that are strictly newer than this one, defaults to fetching from the earliest version known to this RPC (this could be the initial version, or some later version if the initial version has been pruned).

#### `VersionFilter.**beforeVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Filter to versions that are strictly older than this one, defaults to fetching up to the latest version (inclusive).

### Member Of​

[`objectVersions`](</references/sui-api/sui-graphql/beta/reference/operations/queries/object-versions>) query ● [`packageVersions`](</references/sui-api/sui-graphql/beta/reference/operations/queries/package-versions>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter.mdx>)
