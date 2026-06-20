<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-field -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveField


# MoveField
[code]
    type MoveField {  
      name: String  
      type: OpenMoveType  
    }  
    
[/code]

### Fields​

#### `MoveField.**name**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The field's name.

#### `MoveField.**type**` ● [`**OpenMoveType**`](</references/sui-api/sui-graphql/beta/reference/types/objects/open-move-type>) object​

The field's type.

This type can reference type parameters introduced by the defining struct (see `typeParameters`).

### Member Of​

[`MoveEnumVariant`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-variant>) object ● [`MoveStruct`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-field.mdx>)
