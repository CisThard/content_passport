<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/object-owner -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ObjectOwner


# ObjectOwner

Object is exclusively owned by a single object, and is mutable. Note that the owning object may be inaccessible because it is wrapped.
[code] 
    type ObjectOwner {  
      address: Address  
    }  
    
[/code]

### Fields​

#### `ObjectOwner.**address**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

The owner's address.

### Implemented By​

[`Owner`](</references/sui-api/sui-graphql/beta/reference/types/unions/owner>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/object-owner.mdx>)
