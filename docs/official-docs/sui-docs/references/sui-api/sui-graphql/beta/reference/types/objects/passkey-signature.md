<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/passkey-signature -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * PasskeySignature


# PasskeySignature
[code]
    type PasskeySignature {  
      authenticatorData: Base64  
      clientDataJson: String  
      signature: SignatureScheme  
    }  
    
[/code]

### Fields​

#### `PasskeySignature.**authenticatorData**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The authenticator data returned by the passkey device.

#### `PasskeySignature.**clientDataJson**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The client data JSON string passed to the authenticator.

#### `PasskeySignature.**signature**` ● [`**SignatureScheme**`](</references/sui-api/sui-graphql/beta/reference/types/unions/signature-scheme>) union​

The inner user signature (secp256r1).

### Implemented By​

[`SignatureScheme`](</references/sui-api/sui-graphql/beta/reference/types/unions/signature-scheme>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/passkey-signature.mdx>)
