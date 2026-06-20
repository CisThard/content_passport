<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/package-versions -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * packageVersions


# packageVersions

Paginate all versions of a package at `address`, optionally bounding the versions exclusively from below with `filter.afterVersion` or from above with `filter.beforeVersion`.

Different versions of a package will have different object IDs, unless they are system packages, but will share the same original ID.
[code] 
    packageVersions(  
      first: Int  
      after: String  
      last: Int  
      before: String  
      address: SuiAddress!  
      filter: VersionFilter  
    ): MovePackageConnection  
    
[/code]

### Arguments​

#### `packageVersions.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `packageVersions.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `packageVersions.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `packageVersions.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `packageVersions.**address**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

#### `packageVersions.**filter**` ● [`**VersionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter>) input​

### Type​

#### [`**MovePackageConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package-connection>) object​

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/package-versions.mdx>)
