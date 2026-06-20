<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-inputs -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ZkLoginInputs


# ZkLoginInputs

The zkLogin inputs including proof, claim details, and JWT header.
[code] 
    type ZkLoginInputs {  
      addressSeed: String  
      headerBase64: String  
      issBase64Details: ZkLoginClaim  
      proofPoints: ZkLoginProof  
    }  
    
[/code]

### Fields​

#### `ZkLoginInputs.**addressSeed**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The address seed as a base10-encoded string.

#### `ZkLoginInputs.**headerBase64**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The Base64-encoded JWT header.

#### `ZkLoginInputs.**issBase64Details**` ● [`**ZkLoginClaim**`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-claim>) object​

The Base64-encoded issuer claim details.

#### `ZkLoginInputs.**proofPoints**` ● [`**ZkLoginProof**`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-proof>) object​

The zero-knowledge proof points.

### Member Of​

[`ZkLoginSignature`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-signature>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-inputs.mdx>)
