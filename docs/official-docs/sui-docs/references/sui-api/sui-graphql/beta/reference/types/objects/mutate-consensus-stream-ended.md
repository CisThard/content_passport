<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/mutate-consensus-stream-ended -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MutateConsensusStreamEnded


# MutateConsensusStreamEnded

A transaction that wanted to mutate a consensus-managed object but couldn't because it became not-consensus-managed before the transaction executed (for example, it was deleted, turned into an owned object, or wrapped).
[code] 
    type MutateConsensusStreamEnded {  
      address: SuiAddress  
      sequenceNumber: UInt53  
    }  
    
[/code]

### Fields​

#### `MutateConsensusStreamEnded.**address**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

The ID of the consensus-managed object.

#### `MutateConsensusStreamEnded.**sequenceNumber**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The sequence number associated with the consensus stream ending.

### Implemented By​

[`UnchangedConsensusObject`](</references/sui-api/sui-graphql/beta/reference/types/unions/unchanged-consensus-object>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/mutate-consensus-stream-ended.mdx>)
