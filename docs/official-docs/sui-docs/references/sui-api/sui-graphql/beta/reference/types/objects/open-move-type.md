<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/open-move-type -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * OpenMoveType


# OpenMoveType

Represents types that could contain references or free type parameters. Such types can appear as function parameters, in fields of structs, or as actual type parameter.
[code] 
    type OpenMoveType {  
      repr: String!  
      signature: OpenMoveTypeSignature!  
    }  
    
[/code]

### Fields​

#### `OpenMoveType.**repr**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

Flat representation of the type signature, as a displayable string.

#### `OpenMoveType.**signature**` ● [`**OpenMoveTypeSignature!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/open-move-type-signature>) non-null scalar​

Structured representation of the type signature.

### Member Of​

[`MoveField`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-field>) object ● [`MoveFunction`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/open-move-type.mdx>)
