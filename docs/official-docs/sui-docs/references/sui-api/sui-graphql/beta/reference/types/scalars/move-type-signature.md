<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/scalars/move-type-signature -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Scalars
  * MoveTypeSignature


# MoveTypeSignature

The signature of a concrete Move Type (a type with all its type parameters instantiated with concrete types, that contains no references), corresponding to the following recursive type:

type MoveTypeSignature = "address" | "bool" | "u8" | "u16" | ... | "u256" | { vector: MoveTypeSignature } | { datatype: { package: string, module: string, type: string, typeParameters: [MoveTypeSignature], } }
[code] 
    scalar MoveTypeSignature  
    
[/code]

### Member Of​

[`MoveType`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-type>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/scalars/move-type-signature.mdx>)
