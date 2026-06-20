<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/protocol-config -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ProtocolConfig


# ProtocolConfig

A protocol configuration that can hold an arbitrary value (or no value at all).
[code] 
    type ProtocolConfig {  
      key: String!  
      value: String  
    }  
    
[/code]

### Fields​

#### `ProtocolConfig.**key**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

Configuration name.

#### `ProtocolConfig.**value**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Configuration value.

### Member Of​

[`ProtocolConfigs`](</references/sui-api/sui-graphql/beta/reference/types/objects/protocol-configs>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/protocol-config.mdx>)
