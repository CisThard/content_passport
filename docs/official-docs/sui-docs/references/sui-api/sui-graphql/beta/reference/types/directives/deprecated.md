<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/directives/deprecated -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Directives
  * deprecated


# deprecated

Marks an element of a GraphQL schema as no longer supported.
[code] 
    directive @deprecated(  
      reason: String = "No longer supported"  
    ) on   
      | FIELD_DEFINITION  
      | ARGUMENT_DEFINITION  
      | INPUT_FIELD_DEFINITION  
      | ENUM_VALUE  
    
[/code]

### Arguments​

#### `deprecated.**reason**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](<https://commonmark.org/>).

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/directives/deprecated.mdx>)
