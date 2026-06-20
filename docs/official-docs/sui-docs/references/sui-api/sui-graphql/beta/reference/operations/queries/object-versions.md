<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/object-versions -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * objectVersions


# objectVersions

Paginate all versions of an object at `address`, optionally bounding the versions exclusively from below with `filter.afterVersion` or from above with `filter.beforeVersion`.
[code] 
    objectVersions(  
      first: Int  
      after: String  
      last: Int  
      before: String  
      address: SuiAddress!  
      filter: VersionFilter  
    ): ObjectConnection  
    
[/code]

### Arguments​

#### `objectVersions.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `objectVersions.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `objectVersions.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `objectVersions.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `objectVersions.**address**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

#### `objectVersions.**filter**` ● [`**VersionFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/version-filter>) input​

### Type​

#### [`**ObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object​

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/object-versions.mdx>)
