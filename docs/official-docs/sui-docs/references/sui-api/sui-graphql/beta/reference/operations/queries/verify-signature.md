<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/verify-signature -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * verifySignature


# verifySignature

Verify a signature is from the given `author`.

Supports all signature types: Ed25519, Secp256k1, Secp256r1, MultiSig, ZkLogin, and Passkey.

Returns successfully if the signature is valid. If the signature is invalid, returns an error with the reason for the failure.

  * `message` is either a serialized personal message or `TransactionData`, Base64-encoded.
  * `signature` is a serialized signature, also Base64-encoded.
  * `intentScope` indicates whether `message` is to be parsed as a personal message or `TransactionData`.
  * `author` is the signer's address.


[code] 
    verifySignature(  
      message: Base64!  
      signature: Base64!  
      intentScope: IntentScope!  
      author: SuiAddress!  
    ): SignatureVerifyResult  
    
[/code]

### Arguments​

#### `verifySignature.**message**` ● [`**Base64!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) non-null scalar​

#### `verifySignature.**signature**` ● [`**Base64!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) non-null scalar​

#### `verifySignature.**intentScope**` ● [`**IntentScope!**`](</references/sui-api/sui-graphql/beta/reference/types/enums/intent-scope>) non-null enum​

#### `verifySignature.**author**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

### Type​

#### [`**SignatureVerifyResult**`](</references/sui-api/sui-graphql/beta/reference/types/objects/signature-verify-result>) object​

The result of signature verification.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/verify-signature.mdx>)
