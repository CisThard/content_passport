<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Inputs
  * DynamicFieldName


# DynamicFieldName

A description of a dynamic field's name.

Names can either be given as serialized `bcs` accompanied by its `type`, or as a Display v2 `literal` expression. Other combinations of inputs are not supported.
[code] 
    input DynamicFieldName {  
      bcs: Base64  
      literal: String  
      type: String  
    }  
    
[/code]

### Fields​

#### `DynamicFieldName.**bcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64-encoded BCS serialization of the dynamic field's 'name'.

#### `DynamicFieldName.**literal**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The name represented as a Display v2 literal expression.

#### `DynamicFieldName.**type**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The type of the dynamic field's name, like 'u64' or '0x2::kiosk::Listing'.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name.mdx>)
