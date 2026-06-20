<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-jwk-id -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ZkLoginJwkId


# ZkLoginJwkId

A JWK (JSON Web Key) identifier.
[code] 
    type ZkLoginJwkId {  
      iss: String  
      kid: String  
    }  
    
[/code]

### Fields​

#### `ZkLoginJwkId.**iss**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The OIDC provider issuer string.

#### `ZkLoginJwkId.**kid**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The key ID that identifies the JWK.

### Member Of​

[`ZkLoginSignature`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-signature>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-jwk-id.mdx>)
