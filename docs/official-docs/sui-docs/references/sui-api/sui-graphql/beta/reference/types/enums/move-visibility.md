<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/enums/move-visibility -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Enums
  * MoveVisibility


# MoveVisibility

The visibility modifier describes which modules can access this module member.

By default, a module member can be called only within the same module.
[code] 
    enum MoveVisibility {  
      PUBLIC  
      PRIVATE  
      FRIEND  
    }  
    
[/code]

### Values​

#### `MoveVisibility.**PUBLIC**`​

A public member can be accessed by any module.

#### `MoveVisibility.**PRIVATE**`​

A private member can be accessed in the module it is defined in.

#### `MoveVisibility.**FRIEND**`​

A friend member can be accessed in the module it is defined in and any other module in its package that is explicitly specified in its friend list.

### Member Of​

[`MoveFunction`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/enums/move-visibility.mdx>)
