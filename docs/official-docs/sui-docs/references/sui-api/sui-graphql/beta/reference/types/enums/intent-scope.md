<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/enums/intent-scope -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Enums
  * IntentScope


# IntentScope

An enum that specifies the intent scope for signature verification.
[code] 
    enum IntentScope {  
      TRANSACTION_DATA  
      PERSONAL_MESSAGE  
    }  
    
[/code]

### Values​

#### `IntentScope.**TRANSACTION_DATA**`​

Indicates that the bytes are to be parsed as transaction data bytes.

#### `IntentScope.**PERSONAL_MESSAGE**`​

Indicates that the bytes are to be parsed as a personal message.

### Member Of​

[`verifySignature`](</references/sui-api/sui-graphql/beta/reference/operations/queries/verify-signature>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/enums/intent-scope.mdx>)
