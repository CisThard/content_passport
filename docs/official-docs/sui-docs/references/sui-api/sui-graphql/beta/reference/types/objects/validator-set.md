<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/validator-set -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ValidatorSet


# ValidatorSet

Representation of `0x3::validator_set::ValidatorSet`.
[code] 
    type ValidatorSet {  
      activeValidators(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): ValidatorConnection  
      contents: MoveValue  
    }  
    
[/code]

### Fields​

#### `ValidatorSet.**activeValidators**` ● [`**ValidatorConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator-connection>) object​

The validators currently in the committee for this validator set.

##### `ValidatorSet.activeValidators.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `ValidatorSet.activeValidators.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `ValidatorSet.activeValidators.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `ValidatorSet.activeValidators.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `ValidatorSet.**contents**` ● [`**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

On-chain representation of the underlying `0x3::validator_set::ValidatorSet` value.

### Member Of​

[`Epoch`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/validator-set.mdx>)
