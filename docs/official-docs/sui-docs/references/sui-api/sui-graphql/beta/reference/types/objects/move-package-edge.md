<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-package-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MovePackageEdge


# MovePackageEdge

An edge in a connection.
[code] 
    type MovePackageEdge {  
      cursor: String!  
      node: MovePackage!  
    }  
    
[/code]

### Fields​

#### `MovePackageEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `MovePackageEdge.**node**` ● [`**MovePackage!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) non-null object​

The item at the end of the edge

### Member Of​

[`MovePackageConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-package-edge.mdx>)
