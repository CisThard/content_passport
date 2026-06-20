<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/user-signature -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * UserSignature


# UserSignature
[code]
    type UserSignature {  
      scheme: SignatureScheme  
      signatureBytes: Base64  
    }  
    
[/code]

### Fields​

#### `UserSignature.**scheme**` ● [`**SignatureScheme**`](</references/sui-api/sui-graphql/beta/reference/types/unions/signature-scheme>) union​

The structured signature details, parsed by scheme.

#### `UserSignature.**signatureBytes**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The signature bytes, Base64-encoded. For simple signatures: flag || signature || pubkey For complex signatures: flag || bcs_serialized_struct

### Member Of​

[`Transaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/user-signature.mdx>)
