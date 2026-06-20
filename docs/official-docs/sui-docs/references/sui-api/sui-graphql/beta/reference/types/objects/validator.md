<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/validator -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Validator


# Validator
[code]
    type Validator {  
      atRisk: UInt53  
      contents: MoveValue  
      reportRecords(  
        first: Int  
        before: String  
        last: Int  
        after: String  
      ): ValidatorConnection  
    }  
    
[/code]

### Fields​

#### `Validator.**atRisk**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The number of epochs for which this validator has been below the low stake threshold.

#### `Validator.**contents**` ● [`**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

On-chain representation of the underlying `0x3::validator::Validator` value.

#### `Validator.**reportRecords**` ● [`**ValidatorConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator-connection>) object​

Other validators this validator has reported.

##### `Validator.reportRecords.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Validator.reportRecords.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `Validator.reportRecords.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `Validator.reportRecords.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

### Member Of​

[`ValidatorConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator-connection>) object ● [`ValidatorEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator-edge>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/validator.mdx>)
