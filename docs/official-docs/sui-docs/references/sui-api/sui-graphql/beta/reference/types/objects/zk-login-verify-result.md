<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-verify-result -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ZkLoginVerifyResult


# ZkLoginVerifyResult

The result of the zkLogin signature verification.
[code] 
    type ZkLoginVerifyResult {  
      success: Boolean  
    }  
    
[/code]

### Fields​

#### `ZkLoginVerifyResult.**success**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

Whether the signature was verified successfully.

### Returned By​

[`verifyZkLoginSignature`](</references/sui-api/sui-graphql/beta/reference/operations/queries/verify-zk-login-signature>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-verify-result.mdx>)
