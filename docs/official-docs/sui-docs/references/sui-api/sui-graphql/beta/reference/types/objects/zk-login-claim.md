<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-claim -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ZkLoginClaim


# ZkLoginClaim

A Base64-encoded claim from the JWT used in zkLogin.
[code] 
    type ZkLoginClaim {  
      indexMod4: Int  
      value: String  
    }  
    
[/code]

### Fields​

#### `ZkLoginClaim.**indexMod4**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

The index mod 4 used for Base64 decoding alignment.

#### `ZkLoginClaim.**value**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The Base64url-unpadded encoded claim value.

### Member Of​

[`ZkLoginInputs`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-inputs>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-claim.mdx>)
