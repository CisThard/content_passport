<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/linkage -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Linkage


# Linkage

Information used by a package to link to a specific version of its dependency.
[code] 
    type Linkage {  
      originalId: SuiAddress  
      upgradedId: SuiAddress  
      version: UInt53  
    }  
    
[/code]

### Fields​

#### `Linkage.**originalId**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

The ID on-chain of the first version of the dependency.

#### `Linkage.**upgradedId**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

The ID on-chain of the version of the dependency that this package depends on.

#### `Linkage.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The version of the dependency that this package depends on.

### Member Of​

[`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/linkage.mdx>)
