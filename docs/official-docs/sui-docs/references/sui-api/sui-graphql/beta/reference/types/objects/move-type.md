<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-type -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveType


# MoveType

Represents instances of concrete types (no type parameters, no references).
[code] 
    type MoveType {  
      abilities: [MoveAbility!]  
      layout: MoveTypeLayout  
      repr: String!  
      signature: MoveTypeSignature!  
    }  
    
[/code]

### Fields​

#### `MoveType.**abilities**` ● [`**[MoveAbility!]**`](</references/sui-api/sui-graphql/beta/reference/types/enums/move-ability>) list enum​

The abilities this concrete type has. Returns no abilities if the type is invalid.

#### `MoveType.**layout**` ● [`**MoveTypeLayout**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/move-type-layout>) scalar​

Structured representation of the "shape" of values that match this type. May return no layout if the type is invalid.

#### `MoveType.**repr**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

Flat representation of the type signature, as a displayable string.

#### `MoveType.**signature**` ● [`**MoveTypeSignature!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/move-type-signature>) non-null scalar​

Structured representation of the type signature.

### Returned By​

[`multiGetTypes`](</references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-types>) query ● [`type`](</references/sui-api/sui-graphql/beta/reference/operations/queries/type>) query

### Member Of​

[`Balance`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance>) object ● [`BalanceChange`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-change>) object ● [`BalanceWithdraw`](</references/sui-api/sui-graphql/beta/reference/types/objects/balance-withdraw>) object ● [`MakeMoveVecCommand`](</references/sui-api/sui-graphql/beta/reference/types/objects/make-move-vec-command>) object ● [`MoveValue`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-type.mdx>)
