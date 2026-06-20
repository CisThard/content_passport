<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-function -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveFunction


# MoveFunction

A function defined in a Move module.
[code] 
    type MoveFunction {  
      fullyQualifiedName: String!  
      isEntry: Boolean  
      module: MoveModule!  
      name: String!  
      parameters: [OpenMoveType!]  
      return: [OpenMoveType!]  
      typeParameters: [MoveFunctionTypeParameter!]  
      visibility: MoveVisibility  
    }  
    
[/code]

### Fields​

#### `MoveFunction.**fullyQualifiedName**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The function's fully-qualified name, including package address, module name, and function name.

#### `MoveFunction.**isEntry**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

Whether the function is marked `entry` or not.

#### `MoveFunction.**module**` ● [`**MoveModule!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) non-null object​

The module that this function is defined in.

#### `MoveFunction.**name**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The function's unqualified name.

#### `MoveFunction.**parameters**` ● [`**[OpenMoveType!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/open-move-type>) list object​

The function's parameter types. These types can reference type parameters introduced by this function (see `typeParameters`).

#### `MoveFunction.**return**` ● [`**[OpenMoveType!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/open-move-type>) list object​

The function's return types. There can be multiple because functions in Move can return multiple values. These types can reference type parameters introduced by this function (see `typeParameters`).

#### `MoveFunction.**typeParameters**` ● [`**[MoveFunctionTypeParameter!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function-type-parameter>) list object​

Constraints on the function's formal type parameters.

Move bytecode does not name type parameters, so when they are referenced (e.g. in parameter and return types), they are identified by their index in this list.

#### `MoveFunction.**visibility**` ● [`**MoveVisibility**`](</references/sui-api/sui-graphql/beta/reference/types/enums/move-visibility>) enum​

The function's visibility: `public`, `public(friend)`, or `private`.

### Member Of​

[`ExecutionError`](</references/sui-api/sui-graphql/beta/reference/types/objects/execution-error>) object ● [`MoveCallCommand`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-call-command>) object ● [`MoveFunctionConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function-connection>) object ● [`MoveFunctionEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function-edge>) object ● [`MoveModule`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-function.mdx>)
