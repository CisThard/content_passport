<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/unions/signature-scheme -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Unions
  * SignatureScheme


# SignatureScheme

The structured details of a signature, varying by scheme.
[code] 
    union SignatureScheme = Ed25519Signature | Secp256K1Signature | Secp256R1Signature | MultisigSignature | ZkLoginSignature | PasskeySignature  
    
[/code]

### Possible types​

#### [`SignatureScheme.**Ed25519Signature**`](</references/sui-api/sui-graphql/beta/reference/types/objects/ed-25519-signature>) object​

An Ed25519 signature.

#### [`SignatureScheme.**Secp256K1Signature**`](</references/sui-api/sui-graphql/beta/reference/types/objects/secp-256-k1-signature>) object​

A Secp256k1 signature.

#### [`SignatureScheme.**Secp256R1Signature**`](</references/sui-api/sui-graphql/beta/reference/types/objects/secp-256-r1-signature>) object​

A Secp256r1 signature.

#### [`SignatureScheme.**MultisigSignature**`](</references/sui-api/sui-graphql/beta/reference/types/objects/multisig-signature>) object​

An aggregated multisig signature.

#### [`SignatureScheme.**ZkLoginSignature**`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-signature>) object​

#### [`SignatureScheme.**PasskeySignature**`](</references/sui-api/sui-graphql/beta/reference/types/objects/passkey-signature>) object​

### Member Of​

[`MultisigSignature`](</references/sui-api/sui-graphql/beta/reference/types/objects/multisig-signature>) object ● [`PasskeySignature`](</references/sui-api/sui-graphql/beta/reference/types/objects/passkey-signature>) object ● [`UserSignature`](</references/sui-api/sui-graphql/beta/reference/types/objects/user-signature>) object ● [`ZkLoginSignature`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-signature>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/unions/signature-scheme.mdx>)
