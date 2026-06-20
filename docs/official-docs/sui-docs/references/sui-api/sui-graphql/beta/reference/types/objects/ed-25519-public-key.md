<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/ed-25519-public-key -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Ed25519PublicKey


# Ed25519PublicKey

An Ed25519 public key.
[code] 
    type Ed25519PublicKey {  
      bytes: Base64  
    }  
    
[/code]

### Fields​

#### `Ed25519PublicKey.**bytes**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The raw public key bytes.

### Implemented By​

[`MultisigMemberPublicKey`](</references/sui-api/sui-graphql/beta/reference/types/unions/multisig-member-public-key>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/ed-25519-public-key.mdx>)
