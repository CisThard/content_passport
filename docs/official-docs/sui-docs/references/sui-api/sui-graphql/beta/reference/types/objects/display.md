<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/display -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Display


# Display

A rendered JSON blob based on an on-chain template.
[code] 
    type Display {  
      errors: JSON  
      output: JSON  
    }  
    
[/code]

### Fields​

#### `Display.**errors**` ● [`**JSON**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/json>) scalar​

If any fields failed to render, this will contain a mapping from failed field names to error messages. If all fields succeed, this will be `null`.

#### `Display.**output**` ● [`**JSON**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/json>) scalar​

Output for all successfully substituted display fields. Unsuccessful fields will be `null`, and will be accompanied by a field in `errors`, explaining the error.

### Member Of​

[`MoveValue`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/display.mdx>)
