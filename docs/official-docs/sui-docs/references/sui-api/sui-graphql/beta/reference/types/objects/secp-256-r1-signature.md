<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/secp-256-r1-signature -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Secp256R1Signature


# Secp256R1Signature

A Secp256r1 signature.
[code] 
    type Secp256R1Signature {  
      publicKey: Base64  
      signature: Base64  
    }  
    
[/code]

### Fields​

#### `Secp256R1Signature.**publicKey**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The public key bytes.

#### `Secp256R1Signature.**signature**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The raw signature bytes.

### Implemented By​

[`SignatureScheme`](</references/sui-api/sui-graphql/beta/reference/types/unions/signature-scheme>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/secp-256-r1-signature.mdx>)
