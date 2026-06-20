<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-packages -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * multiGetPackages


# multiGetPackages

Fetch packages by their keys.

Returns a list of packages that is guaranteed to be the same length as `keys`. If a package in `keys` could not be found in the store, its corresponding entry in the result will be `null`. This could be because that address never pointed to a package, or because the package was pruned.
[code] 
    multiGetPackages(  
      keys: [PackageKey!]!  
    ): [MovePackage]!  
    
[/code]

### Arguments​

#### `multiGetPackages.**keys**` ● [`**[PackageKey!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/package-key>) non-null input​

### Type​

#### [`**MovePackage**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object​

A MovePackage is a kind of Object that represents code that has been published on-chain. It exposes information about its modules, type definitions, functions, and dependencies.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-packages.mdx>)
