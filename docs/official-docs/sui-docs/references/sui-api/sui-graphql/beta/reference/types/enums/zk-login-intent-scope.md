<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/enums/zk-login-intent-scope -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Enums
  * ZkLoginIntentScope


# ZkLoginIntentScope

An enum that specifies the intent scope to be used to parse the bytes for signature verification.
[code] 
    enum ZkLoginIntentScope {  
      TRANSACTION_DATA  
      PERSONAL_MESSAGE  
    }  
    
[/code]

### Values​

#### `ZkLoginIntentScope.**TRANSACTION_DATA**`​

Indicates that the bytes are to be parsed as transaction data bytes.

#### `ZkLoginIntentScope.**PERSONAL_MESSAGE**`​

Indicates that the bytes are to be parsed as a personal message.

### Member Of​

[`verifyZkLoginSignature`](</references/sui-api/sui-graphql/beta/reference/operations/queries/verify-zk-login-signature>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/enums/zk-login-intent-scope.mdx>)
