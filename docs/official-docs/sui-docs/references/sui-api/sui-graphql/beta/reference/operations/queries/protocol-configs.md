<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/protocol-configs -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * protocolConfigs


# protocolConfigs

Fetch the protocol config by protocol version, or the latest protocol config used on chain if no version is provided.
[code] 
    protocolConfigs(  
      version: UInt53  
    ): ProtocolConfigs  
    
[/code]

### Arguments​

#### `protocolConfigs.**version**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

### Type​

#### [`**ProtocolConfigs**`](</references/sui-api/sui-graphql/beta/reference/types/objects/protocol-configs>) object​

Constants that control how the chain operates.

These can only change during protocol upgrades which happen on epoch boundaries. Configuration is split into feature flags (which are just booleans), and configs which can take any value (including no value at all), and will be represented by a string.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/protocol-configs.mdx>)
