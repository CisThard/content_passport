<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/verify-zk-login-signature -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * verifyZkLoginSignature


# verifyZkLoginSignature

DEPRECATED

Use `verifySignature` instead, which supports all signature types.

Verify a zkLogin signature is from the given `author`.

Returns successfully if the signature is valid. If the signature is invalid, returns an error with the reason for the failure.

  * `bytes` are either the bytes of a serialized personal message, or `TransactionData`, Base64-encoded.
  * `signature` is a serialized zkLogin signature, also Base64-encoded.
  * `intentScope` indicates whether `bytes` are to be parsed as a personal message or `TransactionData`.
  * `author` is the signer's address.


[code] 
    verifyZkLoginSignature(  
      bytes: Base64!  
      signature: Base64!  
      intentScope: ZkLoginIntentScope!  
      author: SuiAddress!  
    ): ZkLoginVerifyResult @deprecated  
    
[/code]

### Arguments​

#### `verifyZkLoginSignature.**bytes**` ● [`**Base64!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) non-null scalar​

#### `verifyZkLoginSignature.**signature**` ● [`**Base64!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) non-null scalar​

#### `verifyZkLoginSignature.**intentScope**` ● [`**ZkLoginIntentScope!**`](</references/sui-api/sui-graphql/beta/reference/types/enums/zk-login-intent-scope>) non-null enum​

#### `verifyZkLoginSignature.**author**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

### Type​

#### [`**ZkLoginVerifyResult**`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-verify-result>) object​

The result of the zkLogin signature verification.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/verify-zk-login-signature.mdx>)
