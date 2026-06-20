<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-variant -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveEnumVariant


# MoveEnumVariant
[code]
    type MoveEnumVariant {  
      fields: [MoveField!]  
      name: String  
    }  
    
[/code]

### Fields​

#### `MoveEnumVariant.**fields**` ● [`**[MoveField!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-field>) list object​

The names and types of the variant's fields.

Field types reference type parameters by their index in the defining struct's `typeParameters` list.

#### `MoveEnumVariant.**name**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The variant's name.

### Member Of​

[`MoveEnum`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-variant.mdx>)
