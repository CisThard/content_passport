<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/pure -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Pure


# Pure

BCS encoded primitive value (not an object or Move struct).
[code] 
    type Pure {  
      bytes: Base64  
    }  
    
[/code]

### Fields​

#### `Pure.**bytes**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

BCS serialized and Base64 encoded primitive value.

### Implemented By​

[`TransactionInput`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-input>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/pure.mdx>)
