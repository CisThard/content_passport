<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/multisig-member -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MultisigMember


# MultisigMember

A single member of a multisig committee.
[code] 
    type MultisigMember {  
      publicKey: MultisigMemberPublicKey  
      weight: Int  
    }  
    
[/code]

### Fields​

#### `MultisigMember.**publicKey**` ● [`**MultisigMemberPublicKey**`](</references/sui-api/sui-graphql/beta/reference/types/unions/multisig-member-public-key>) union​

The member's public key.

#### `MultisigMember.**weight**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

The member's weight in the committee.

### Member Of​

[`MultisigCommittee`](</references/sui-api/sui-graphql/beta/reference/types/objects/multisig-committee>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/multisig-member.mdx>)
