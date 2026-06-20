<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-enum -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveEnum


# MoveEnum

Description of an enum type, defined in a Move module.
[code] 
    type MoveEnum implements IMoveDatatype {  
      abilities: [MoveAbility!]  
      fullyQualifiedName: String!  
      module: MoveModule!  
      name: String!  
      typeParameters: [MoveDatatypeTypeParameter!]  
      variants: [MoveEnumVariant!]  
    }  
    
[/code]

### Fields​

#### `MoveEnum.**abilities**` ● [`**[MoveAbility!]**`](</references/sui-api/sui-graphql/beta/reference/types/enums/move-ability>) list enum​

Abilities on this enum definition.

#### `MoveEnum.**fullyQualifiedName**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The enum's fully-qualified name, including package address, module name, and datatype name.

#### `MoveEnum.**module**` ● [`**MoveModule!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) non-null object​

The module that this enum is defined in.

#### `MoveEnum.**name**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The enum's unqualified name.

#### `MoveEnum.**typeParameters**` ● [`**[MoveDatatypeTypeParameter!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-type-parameter>) list object​

Constraints on the enum's formal type parameters.

Move bytecode does not name type parameters, so when they are referenced (e.g. in field types), they are identified by their index in this list.

#### `MoveEnum.**variants**` ● [`**[MoveEnumVariant!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-variant>) list object​

The names and fields of the enum's variants

Field types reference type parameters by their index in the defining enum's `typeParameters` list.

### Interfaces​

#### [`**IMoveDatatype**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-datatype>) interface​

Interface implemented by all GraphQL types that represent a Move datatype definition (either a struct or an enum definition).

This interface is used to provide a way to access fields that are shared by both structs and enums, e.g., the module that the datatype belongs to, the name of the datatype, type parameters etc.

### Member Of​

[`MoveDatatype`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype>) object ● [`MoveEnumConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-connection>) object ● [`MoveEnumEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-edge>) object ● [`MoveModule`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-enum.mdx>)
