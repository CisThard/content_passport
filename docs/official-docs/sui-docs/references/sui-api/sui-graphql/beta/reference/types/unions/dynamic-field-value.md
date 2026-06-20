<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/unions/dynamic-field-value -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Unions
  * DynamicFieldValue


# DynamicFieldValue

The value of a dynamic field (`MoveValue`) or dynamic object field (`MoveObject`).
[code] 
    union DynamicFieldValue = MoveObject | MoveValue  
    
[/code]

### Possible types​

#### [`DynamicFieldValue.**MoveObject**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object​

A MoveObject is a kind of Object that reprsents data stored on-chain.

#### [`DynamicFieldValue.**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

### Member Of​

[`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/unions/dynamic-field-value.mdx>)
