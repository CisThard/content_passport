<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/enums/move-ability -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Enums
  * MoveAbility


# MoveAbility

Abilities are keywords in Sui Move that define how types behave at the compiler level.
[code] 
    enum MoveAbility {  
      COPY  
      DROP  
      KEY  
      STORE  
    }  
    
[/code]

### Values​

#### `MoveAbility.**COPY**`​

Enables values to be copied.

#### `MoveAbility.**DROP**`​

Enables values to be popped/dropped.

#### `MoveAbility.**KEY**`​

Enables values to be held directly in global storage.

#### `MoveAbility.**STORE**`​

Enables values to be held inside a struct in global storage.

### Member Of​

[`IMoveDatatype`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-datatype>) interface ● [`MoveDatatype`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype>) object ● [`MoveDatatypeTypeParameter`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-type-parameter>) object ● [`MoveEnum`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum>) object ● [`MoveFunctionTypeParameter`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function-type-parameter>) object ● [`MoveStruct`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct>) object ● [`MoveType`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-type>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/enums/move-ability.mdx>)
