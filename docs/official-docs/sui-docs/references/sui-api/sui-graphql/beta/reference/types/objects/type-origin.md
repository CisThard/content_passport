<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/type-origin -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * TypeOrigin


# TypeOrigin

Information about which previous versions of a package introduced its types.
[code] 
    type TypeOrigin {  
      definingId: SuiAddress  
      module: String  
      struct: String  
    }  
    
[/code]

### Fields​

#### `TypeOrigin.**definingId**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

The storage ID of the package that first defined this type.

#### `TypeOrigin.**module**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Module defining the type.

#### `TypeOrigin.**struct**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Name of the struct.

### Member Of​

[`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/type-origin.mdx>)
