<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/epoch -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * epoch


# epoch

Fetch an epoch by its ID, or fetch the latest epoch if no ID is provided.

Returns `null` if the epoch does not exist yet, or was pruned.
[code] 
    epoch(  
      epochId: UInt53  
    ): Epoch  
    
[/code]

### Arguments​

#### `epoch.**epochId**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

### Type​

#### [`**Epoch**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object​

Activity on Sui is partitioned in time, into epochs.

Epoch changes are opportunities for the network to reconfigure itself (perform protocol or system package upgrades, or change the committee) and distribute staking rewards. The network aims to keep epochs roughly the same duration as each other.

During a particular epoch the following data is fixed:

  * protocol version,
  * reference gas price,
  * system package versions,
  * validators in the committee.


[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/epoch.mdx>)
