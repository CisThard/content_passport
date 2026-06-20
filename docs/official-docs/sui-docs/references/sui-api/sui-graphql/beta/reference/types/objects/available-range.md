<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/available-range -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * AvailableRange


# AvailableRange

Checkpoint range for which data is available.
[code] 
    type AvailableRange {  
      first: Checkpoint  
      last: Checkpoint  
    }  
    
[/code]

### Fields​

#### `AvailableRange.**first**` ● [`**Checkpoint**`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint>) object​

Inclusive lower checkpoint for which data is available.

#### `AvailableRange.**last**` ● [`**Checkpoint**`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint>) object​

Inclusive upper checkpoint for which data is available.

### Member Of​

[`ServiceConfig`](</references/sui-api/sui-graphql/beta/reference/types/objects/service-config>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/available-range.mdx>)
