<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/consensus-address-owner -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ConsensusAddressOwner


# ConsensusAddressOwner

Object is exclusively owned by a single adderss and sequenced via consensus.
[code] 
    type ConsensusAddressOwner {  
      address: Address  
      startVersion: UInt53  
    }  
    
[/code]

### Fields​

#### `ConsensusAddressOwner.**address**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

The owner's address.

#### `ConsensusAddressOwner.**startVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The version at which the object most recently bcame a consensus object. This serves the same function as `Shared.initialSharedVersion`, except it may change if the object's `owner` type changes.

### Implemented By​

[`Owner`](</references/sui-api/sui-graphql/beta/reference/types/unions/owner>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/consensus-address-owner.mdx>)
