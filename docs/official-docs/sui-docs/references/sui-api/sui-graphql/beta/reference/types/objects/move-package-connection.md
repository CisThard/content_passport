<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-package-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MovePackageConnection


# MovePackageConnection
[code]
    type MovePackageConnection {  
      edges: [MovePackageEdge!]!  
      nodes: [MovePackage!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `MovePackageConnection.**edges**` ● [`**[MovePackageEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package-edge>) non-null object​

A list of edges.

#### `MovePackageConnection.**nodes**` ● [`**[MovePackage!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) non-null object​

A list of nodes.

#### `MovePackageConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Returned By​

[`packages`](</references/sui-api/sui-graphql/beta/reference/operations/queries/packages>) query ● [`packageVersions`](</references/sui-api/sui-graphql/beta/reference/operations/queries/package-versions>) query

### Member Of​

[`ChangeEpochTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/change-epoch-transaction>) object ● [`Epoch`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-package-connection.mdx>)
