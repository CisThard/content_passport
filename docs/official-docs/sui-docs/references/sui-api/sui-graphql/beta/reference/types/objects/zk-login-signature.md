<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-signature -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ZkLoginSignature


# ZkLoginSignature
[code]
    type ZkLoginSignature {  
      inputs: ZkLoginInputs  
      jwkId: ZkLoginJwkId  
      maxEpoch: UInt53  
      publicIdentifier: ZkLoginPublicIdentifier  
      signature: SignatureScheme  
    }  
    
[/code]

### Fields​

#### `ZkLoginSignature.**inputs**` ● [`**ZkLoginInputs**`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-inputs>) object​

The zkLogin inputs including proof, claim details, and JWT header.

#### `ZkLoginSignature.**jwkId**` ● [`**ZkLoginJwkId**`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-jwk-id>) object​

The JWK identifier used to verify the zkLogin proof.

#### `ZkLoginSignature.**maxEpoch**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The maximum epoch for which this signature is valid.

#### `ZkLoginSignature.**publicIdentifier**` ● [`**ZkLoginPublicIdentifier**`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-public-identifier>) object​

The public identifier (issuer + address seed) for this zkLogin authenticator.

#### `ZkLoginSignature.**signature**` ● [`**SignatureScheme**`](</references/sui-api/sui-graphql/beta/reference/types/unions/signature-scheme>) union​

The inner user signature (ed25519/secp256k1/secp256r1).

### Implemented By​

[`SignatureScheme`](</references/sui-api/sui-graphql/beta/reference/types/unions/signature-scheme>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-signature.mdx>)
