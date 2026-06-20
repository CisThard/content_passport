<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/secp-256-k1-public-key -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Secp256K1PublicKey


# Secp256K1PublicKey

A Secp256k1 public key.
[code] 
    type Secp256K1PublicKey {  
      bytes: Base64  
    }  
    
[/code]

### Fields​

#### `Secp256K1PublicKey.**bytes**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The raw public key bytes.

### Implemented By​

[`MultisigMemberPublicKey`](</references/sui-api/sui-graphql/beta/reference/types/unions/multisig-member-public-key>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/secp-256-k1-public-key.mdx>)
