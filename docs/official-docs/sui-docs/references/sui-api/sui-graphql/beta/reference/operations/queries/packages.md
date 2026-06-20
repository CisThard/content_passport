<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/packages -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * packages


# packages

Paginate all packages published on-chain, optionally bounded to packages published strictly after `filter.afterCheckpoint` and/or strictly before `filter.beforeCheckpoint`.
[code] 
    packages(  
      first: Int  
      after: String  
      last: Int  
      before: String  
      filter: PackageCheckpointFilter  
    ): MovePackageConnection  
    
[/code]

### Arguments​

#### `packages.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `packages.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `packages.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `packages.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `packages.**filter**` ● [`**PackageCheckpointFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/package-checkpoint-filter>) input​

### Type​

#### [`**MovePackageConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package-connection>) object​

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/packages.mdx>)
