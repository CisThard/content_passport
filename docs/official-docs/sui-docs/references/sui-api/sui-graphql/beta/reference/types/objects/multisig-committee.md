<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/multisig-committee -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MultisigCommittee


# MultisigCommittee

The multisig committee definition.
[code] 
    type MultisigCommittee {  
      members: [MultisigMember!]  
      threshold: Int  
    }  
    
[/code]

### Fields​

#### `MultisigCommittee.**members**` ● [`**[MultisigMember!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/multisig-member>) list object​

The committee members (public key + weight).

#### `MultisigCommittee.**threshold**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

The threshold number of weight needed for a valid multisig.

### Member Of​

[`MultisigSignature`](</references/sui-api/sui-graphql/beta/reference/types/objects/multisig-signature>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/multisig-committee.mdx>)
