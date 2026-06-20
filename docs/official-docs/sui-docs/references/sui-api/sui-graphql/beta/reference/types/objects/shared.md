<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/shared -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Shared


# Shared

Object is shared, can be used by any address, and is mutable.
[code] 
    type Shared {  
      initialSharedVersion: UInt53  
    }  
    
[/code]

### Fields​

#### `Shared.**initialSharedVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The version at which the object became shared.

### Implemented By​

[`Owner`](</references/sui-api/sui-graphql/beta/reference/types/unions/owner>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/shared.mdx>)
