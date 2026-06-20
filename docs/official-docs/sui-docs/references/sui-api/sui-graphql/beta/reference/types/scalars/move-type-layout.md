<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/scalars/move-type-layout -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Scalars
  * MoveTypeLayout


# MoveTypeLayout

The shape of a concrete Move Type (a type with all its type parameters instantiated with concrete types), corresponding to the following recursive type:

type MoveTypeLayout = "address" | "bool" | "u8" | "u16" | ... | "u256" | { vector: MoveTypeLayout } | { struct: { type: string, fields: [{ name: string, layout: MoveTypeLayout }], } } | { enum: [{ type: string, variants: [{ name: string, fields: [{ name: string, layout: MoveTypeLayout }], }] }] }
[code] 
    scalar MoveTypeLayout  
    
[/code]

### Member Of​

[`MoveType`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-type>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/scalars/move-type-layout.mdx>)
