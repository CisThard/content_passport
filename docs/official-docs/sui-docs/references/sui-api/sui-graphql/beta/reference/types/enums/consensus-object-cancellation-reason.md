<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/enums/consensus-object-cancellation-reason -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Enums
  * ConsensusObjectCancellationReason


# ConsensusObjectCancellationReason

Reason why a transaction that attempted to access a consensus-managed object was cancelled.
[code] 
    enum ConsensusObjectCancellationReason {  
      CANCELLED_READ  
      CONGESTED  
      RANDOMNESS_UNAVAILABLE  
      UNKNOWN  
    }  
    
[/code]

### Values​

#### `ConsensusObjectCancellationReason.**CANCELLED_READ**`​

Read operation was cancelled.

#### `ConsensusObjectCancellationReason.**CONGESTED**`​

Object congestion prevented execution.

#### `ConsensusObjectCancellationReason.**RANDOMNESS_UNAVAILABLE**`​

Randomness service was unavailable.

#### `ConsensusObjectCancellationReason.**UNKNOWN**`​

Internal use only.

### Member Of​

[`ConsensusObjectCancelled`](</references/sui-api/sui-graphql/beta/reference/types/objects/consensus-object-cancelled>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/enums/consensus-object-cancellation-reason.mdx>)
