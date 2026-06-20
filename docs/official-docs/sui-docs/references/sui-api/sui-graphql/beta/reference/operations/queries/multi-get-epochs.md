<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-epochs -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * multiGetEpochs


# multiGetEpochs

Fetch epochs by their IDs.

Returns a list of epochs that is guaranteed to be the same length as `keys`. If an epoch in `keys` could not be found in the store, its corresponding entry in the result will be `null`. This could be because the epoch does not exist yet, or because it was pruned.
[code] 
    multiGetEpochs(  
      keys: [UInt53!]!  
    ): [Epoch]!  
    
[/code]

### Arguments​

#### `multiGetEpochs.**keys**` ● [`**[UInt53!]!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) non-null scalar​

### Type​

#### [`**Epoch**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object​

Activity on Sui is partitioned in time, into epochs.

Epoch changes are opportunities for the network to reconfigure itself (perform protocol or system package upgrades, or change the committee) and distribute staking rewards. The network aims to keep epochs roughly the same duration as each other.

During a particular epoch the following data is fixed:

  * protocol version,
  * reference gas price,
  * system package versions,
  * validators in the committee.


[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-epochs.mdx>)
