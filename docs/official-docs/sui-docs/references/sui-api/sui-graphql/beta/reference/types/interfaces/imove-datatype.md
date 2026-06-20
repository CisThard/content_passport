<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-datatype -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Interfaces
  * IMoveDatatype


# IMoveDatatype

Interface implemented by all GraphQL types that represent a Move datatype definition (either a struct or an enum definition).

This interface is used to provide a way to access fields that are shared by both structs and enums, e.g., the module that the datatype belongs to, the name of the datatype, type parameters etc.
[code] 
    interface IMoveDatatype {  
      abilities: [MoveAbility!]  
      fullyQualifiedName: String!  
      module: MoveModule!  
      name: String!  
      typeParameters: [MoveDatatypeTypeParameter!]  
    }  
    
[/code]

### Fields​

#### `IMoveDatatype.**abilities**` ● [`**[MoveAbility!]**`](</references/sui-api/sui-graphql/beta/reference/types/enums/move-ability>) list enum​

Abilities on this datatype definition.

#### `IMoveDatatype.**fullyQualifiedName**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The datatype's fully-qualified name, including package address, module name, and datatype name.

#### `IMoveDatatype.**module**` ● [`**MoveModule!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) non-null object​

The module that this datatype is defined in

#### `IMoveDatatype.**name**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The datatype's unqualified name

#### `IMoveDatatype.**typeParameters**` ● [`**[MoveDatatypeTypeParameter!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-type-parameter>) list object​

Constraints on the datatype's formal type parameters

Move bytecode does not name type parameters, so when they are referenced (e.g. in field types), they are identified by their index in this list.

### Implemented By​

[`MoveDatatype`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype>) object ● [`MoveEnum`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum>) object ● [`MoveStruct`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-datatype.mdx>)
