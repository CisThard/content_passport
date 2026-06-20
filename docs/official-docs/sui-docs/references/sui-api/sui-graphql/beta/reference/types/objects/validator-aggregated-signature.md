<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/validator-aggregated-signature -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ValidatorAggregatedSignature


# ValidatorAggregatedSignature
[code]
    type ValidatorAggregatedSignature {  
      epoch: Epoch  
      signature: Base64  
      signersMap: [Int!]!  
    }  
    
[/code]

### Fields​

#### `ValidatorAggregatedSignature.**epoch**` ● [`**Epoch**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object​

The epoch when this aggregate signature was produced.

#### `ValidatorAggregatedSignature.**signature**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64 encoded BLS12381 aggregated signature.

#### `ValidatorAggregatedSignature.**signersMap**` ● [`**[Int!]!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) non-null scalar​

The indexes of validators that contributed to this signature.

### Member Of​

[`Checkpoint`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/validator-aggregated-signature.mdx>)
