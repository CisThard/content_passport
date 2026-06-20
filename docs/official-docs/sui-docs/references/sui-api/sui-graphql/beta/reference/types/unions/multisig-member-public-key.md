<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/unions/multisig-member-public-key -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Unions
  * MultisigMemberPublicKey


# MultisigMemberPublicKey

A multisig member's public key, varying by scheme.
[code] 
    union MultisigMemberPublicKey = Ed25519PublicKey | Secp256K1PublicKey | Secp256R1PublicKey | PasskeyPublicKey | ZkLoginPublicIdentifier  
    
[/code]

### Possible types​

#### [`MultisigMemberPublicKey.**Ed25519PublicKey**`](</references/sui-api/sui-graphql/beta/reference/types/objects/ed-25519-public-key>) object​

An Ed25519 public key.

#### [`MultisigMemberPublicKey.**Secp256K1PublicKey**`](</references/sui-api/sui-graphql/beta/reference/types/objects/secp-256-k1-public-key>) object​

A Secp256k1 public key.

#### [`MultisigMemberPublicKey.**Secp256R1PublicKey**`](</references/sui-api/sui-graphql/beta/reference/types/objects/secp-256-r1-public-key>) object​

A Secp256r1 public key.

#### [`MultisigMemberPublicKey.**PasskeyPublicKey**`](</references/sui-api/sui-graphql/beta/reference/types/objects/passkey-public-key>) object​

A Passkey public key.

#### [`MultisigMemberPublicKey.**ZkLoginPublicIdentifier**`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-public-identifier>) object​

A zkLogin public identifier, containing the OAuth issuer and address seed.

### Member Of​

[`MultisigMember`](</references/sui-api/sui-graphql/beta/reference/types/objects/multisig-member>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/unions/multisig-member-public-key.mdx>)
