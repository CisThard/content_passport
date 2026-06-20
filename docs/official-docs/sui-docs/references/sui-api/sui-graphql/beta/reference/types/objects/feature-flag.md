<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/feature-flag -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * FeatureFlag


# FeatureFlag

A boolean protocol configuration.
[code] 
    type FeatureFlag {  
      key: String!  
      value: Boolean!  
    }  
    
[/code]

### Fields​

#### `FeatureFlag.**key**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

Feature flag name.

#### `FeatureFlag.**value**` ● [`**Boolean!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) non-null scalar​

Feature flag value.

### Member Of​

[`ProtocolConfigs`](</references/sui-api/sui-graphql/beta/reference/types/objects/protocol-configs>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/feature-flag.mdx>)
