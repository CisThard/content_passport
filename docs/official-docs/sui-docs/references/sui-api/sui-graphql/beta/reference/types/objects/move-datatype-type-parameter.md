<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-type-parameter -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveDatatypeTypeParameter


# MoveDatatypeTypeParameter

Declaration of a type parameter on a Move struct.
[code] 
    type MoveDatatypeTypeParameter {  
      constraints: [MoveAbility!]!  
      isPhantom: Boolean!  
    }  
    
[/code]

### Fields​

#### `MoveDatatypeTypeParameter.**constraints**` ● [`**[MoveAbility!]!**`](</references/sui-api/sui-graphql/beta/reference/types/enums/move-ability>) non-null enum​

Ability constraints on this type parameter.

#### `MoveDatatypeTypeParameter.**isPhantom**` ● [`**Boolean!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) non-null scalar​

Whether this type parameter is marked `phantom` or not.

Phantom type parameters are not referenced in the struct's fields.

### Member Of​

[`IMoveDatatype`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-datatype>) interface ● [`MoveDatatype`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype>) object ● [`MoveEnum`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum>) object ● [`MoveStruct`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-type-parameter.mdx>)
