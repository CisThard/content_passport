<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/bridge-committee-init-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * BridgeCommitteeInitTransaction


# BridgeCommitteeInitTransaction

System transaction for initializing bridge committee.
[code] 
    type BridgeCommitteeInitTransaction {  
      bridgeObjectVersion: UInt53  
    }  
    
[/code]

### Fields​

#### `BridgeCommitteeInitTransaction.**bridgeObjectVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The initial shared version of the bridge object.

### Implemented By​

[`EndOfEpochTransactionKind`](</references/sui-api/sui-graphql/beta/reference/types/unions/end-of-epoch-transaction-kind>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/bridge-committee-init-transaction.mdx>)
