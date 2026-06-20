<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveDatatype


# MoveDatatype

Description of a datatype, defined in a Move module.
[code] 
    type MoveDatatype implements IMoveDatatype {  
      abilities: [MoveAbility!]  
      asMoveEnum: MoveEnum  
      asMoveStruct: MoveStruct  
      fullyQualifiedName: String!  
      module: MoveModule!  
      name: String!  
      typeParameters: [MoveDatatypeTypeParameter!]  
    }  
    
[/code]

### Fields​

#### `MoveDatatype.**abilities**` ● [`**[MoveAbility!]**`](</references/sui-api/sui-graphql/beta/reference/types/enums/move-ability>) list enum​

Abilities on this datatype definition.

#### `MoveDatatype.**asMoveEnum**` ● [`**MoveEnum**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum>) object​

Attempts to convert the `MoveDatatype` to a `MoveEnum`.

#### `MoveDatatype.**asMoveStruct**` ● [`**MoveStruct**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct>) object​

Attempts to convert the `MoveDatatype` to a `MoveStruct`.

#### `MoveDatatype.**fullyQualifiedName**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The datatype's fully-qualified name, including package address, module name, and datatype name.

#### `MoveDatatype.**module**` ● [`**MoveModule!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) non-null object​

The module that this datatype is defined in.

#### `MoveDatatype.**name**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The datatype's unqualified name.

#### `MoveDatatype.**typeParameters**` ● [`**[MoveDatatypeTypeParameter!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-type-parameter>) list object​

Constraints on the datatype's formal type parameters.

Move bytecode does not name type parameters, so when they are referenced (e.g. in field types), they are identified by their index in this list.

### Interfaces​

#### [`**IMoveDatatype**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-datatype>) interface​

Interface implemented by all GraphQL types that represent a Move datatype definition (either a struct or an enum definition).

This interface is used to provide a way to access fields that are shared by both structs and enums, e.g., the module that the datatype belongs to, the name of the datatype, type parameters etc.

### Member Of​

[`MoveDatatypeConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-connection>) object ● [`MoveDatatypeEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-edge>) object ● [`MoveModule`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype.mdx>)
