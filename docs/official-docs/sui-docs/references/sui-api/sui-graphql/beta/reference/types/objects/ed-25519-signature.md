<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/ed-25519-signature -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Ed25519Signature


# Ed25519Signature

An Ed25519 signature.
[code] 
    type Ed25519Signature {  
      publicKey: Base64  
      signature: Base64  
    }  
    
[/code]

### Fields​

#### `Ed25519Signature.**publicKey**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The public key bytes.

#### `Ed25519Signature.**signature**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The raw signature bytes.

### Implemented By​

[`SignatureScheme`](</references/sui-api/sui-graphql/beta/reference/types/unions/signature-scheme>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/ed-25519-signature.mdx>)
