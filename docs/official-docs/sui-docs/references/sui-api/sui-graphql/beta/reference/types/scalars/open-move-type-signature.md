<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/scalars/open-move-type-signature -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Scalars
  * OpenMoveTypeSignature


# OpenMoveTypeSignature

The shape of an abstract Move Type (a type that can contain free type parameters, and can optionally be taken by reference), corresponding to the following recursive type:

type OpenMoveTypeSignature = { ref: ("&" | "&mut")?, body: OpenMoveTypeSignatureBody, }

type OpenMoveTypeSignatureBody = "address" | "bool" | "u8" | "u16" | ... | "u256" | { vector: OpenMoveTypeSignatureBody } | { datatype { package: string, module: string, type: string, typeParameters: [OpenMoveTypeSignatureBody] } } | { typeParameter: number }
[code] 
    scalar OpenMoveTypeSignature  
    
[/code]

### Member Of​

[`OpenMoveType`](</references/sui-api/sui-graphql/beta/reference/types/objects/open-move-type>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/scalars/open-move-type-signature.mdx>)
