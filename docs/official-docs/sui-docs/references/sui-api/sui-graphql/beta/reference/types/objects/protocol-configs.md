<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/protocol-configs -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ProtocolConfigs


# ProtocolConfigs

Constants that control how the chain operates.

These can only change during protocol upgrades which happen on epoch boundaries. Configuration is split into feature flags (which are just booleans), and configs which can take any value (including no value at all), and will be represented by a string.
[code] 
    type ProtocolConfigs {  
      config(  
        key: String!  
      ): ProtocolConfig  
      configs: [ProtocolConfig!]!  
      featureFlag(  
        key: String!  
      ): FeatureFlag  
      featureFlags: [FeatureFlag!]!  
      protocolVersion: UInt53!  
    }  
    
[/code]

### Fields​

#### `ProtocolConfigs.**config**` ● [`**ProtocolConfig**`](</references/sui-api/sui-graphql/beta/reference/types/objects/protocol-config>) object​

Query for the value of the configuration with name `key`.

##### `ProtocolConfigs.config.**key**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `ProtocolConfigs.**configs**` ● [`**[ProtocolConfig!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/protocol-config>) non-null object​

List all available configurations and their values.

#### `ProtocolConfigs.**featureFlag**` ● [`**FeatureFlag**`](</references/sui-api/sui-graphql/beta/reference/types/objects/feature-flag>) object​

Query for the state of the feature flag with name `key`.

##### `ProtocolConfigs.featureFlag.**key**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `ProtocolConfigs.**featureFlags**` ● [`**[FeatureFlag!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/feature-flag>) non-null object​

List all available feature flags and their values.

#### `ProtocolConfigs.**protocolVersion**` ● [`**UInt53!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) non-null scalar​

### Returned By​

[`protocolConfigs`](</references/sui-api/sui-graphql/beta/reference/operations/queries/protocol-configs>) query

### Member Of​

[`ChangeEpochTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/change-epoch-transaction>) object ● [`Epoch`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/protocol-configs.mdx>)
