<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-public-identifier -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ZkLoginPublicIdentifier


# ZkLoginPublicIdentifier

A zkLogin public identifier, containing the OAuth issuer and address seed.
[code] 
    type ZkLoginPublicIdentifier {  
      addressSeed: String  
      iss: String  
    }  
    
[/code]

### Fields​

#### `ZkLoginPublicIdentifier.**addressSeed**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The address seed as a decimal string.

#### `ZkLoginPublicIdentifier.**iss**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The OAuth provider issuer string (e.g. "<https://accounts.google.com>").

### Member Of​

[`ZkLoginSignature`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-signature>) object

### Implemented By​

[`MultisigMemberPublicKey`](</references/sui-api/sui-graphql/beta/reference/types/unions/multisig-member-public-key>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-public-identifier.mdx>)
