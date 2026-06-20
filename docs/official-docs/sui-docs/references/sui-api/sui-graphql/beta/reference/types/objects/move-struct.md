<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-struct -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveStruct


# MoveStruct

Description of a struct type, defined in a Move module.
[code] 
    type MoveStruct implements IMoveDatatype {  
      abilities: [MoveAbility!]  
      fields: [MoveField!]  
      fullyQualifiedName: String!  
      module: MoveModule!  
      name: String!  
      typeParameters: [MoveDatatypeTypeParameter!]  
    }  
    
[/code]

### Fields​

#### `MoveStruct.**abilities**` ● [`**[MoveAbility!]**`](</references/sui-api/sui-graphql/beta/reference/types/enums/move-ability>) list enum​

Abilities on this struct definition.

#### `MoveStruct.**fields**` ● [`**[MoveField!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-field>) list object​

The names and types of the struct's fields.

Field types reference type parameters by their index in the defining struct's `typeParameters` list.

#### `MoveStruct.**fullyQualifiedName**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The struct's fully-qualified name, including package address, module name, and datatype name.

#### `MoveStruct.**module**` ● [`**MoveModule!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) non-null object​

The module that this struct is defined in.

#### `MoveStruct.**name**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The struct's unqualified name.

#### `MoveStruct.**typeParameters**` ● [`**[MoveDatatypeTypeParameter!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-type-parameter>) list object​

Constraints on the struct's formal type parameters.

Move bytecode does not name type parameters, so when they are referenced (e.g. in field types), they are identified by their index in this list.

### Interfaces​

#### [`**IMoveDatatype**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-datatype>) interface​

Interface implemented by all GraphQL types that represent a Move datatype definition (either a struct or an enum definition).

This interface is used to provide a way to access fields that are shared by both structs and enums, e.g., the module that the datatype belongs to, the name of the datatype, type parameters etc.

### Member Of​

[`MoveDatatype`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype>) object ● [`MoveModule`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object ● [`MoveStructConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct-connection>) object ● [`MoveStructEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct-edge>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-struct.mdx>)
