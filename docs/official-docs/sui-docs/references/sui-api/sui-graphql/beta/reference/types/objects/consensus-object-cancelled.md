<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/consensus-object-cancelled -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ConsensusObjectCancelled


# ConsensusObjectCancelled

A transaction that was cancelled before it could access the consensus-managed object, so the object was an input but remained unchanged.
[code] 
    type ConsensusObjectCancelled {  
      address: SuiAddress  
      cancellationReason: ConsensusObjectCancellationReason  
    }  
    
[/code]

### Fields​

#### `ConsensusObjectCancelled.**address**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

The ID of the consensus-managed object that the transaction intended to access.

#### `ConsensusObjectCancelled.**cancellationReason**` ● [`**ConsensusObjectCancellationReason**`](</references/sui-api/sui-graphql/beta/reference/types/enums/consensus-object-cancellation-reason>) enum​

Reason why the transaction was cancelled.

### Implemented By​

[`UnchangedConsensusObject`](</references/sui-api/sui-graphql/beta/reference/types/unions/unchanged-consensus-object>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/consensus-object-cancelled.mdx>)
