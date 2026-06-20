<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-types -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * multiGetTypes


# multiGetTypes

Fetch types by their string representations.

Types are canonicalized: In the input they can be at any package address at or after the package that first defines them, and in the output they will be relocated to the package that first defines them.

Returns a list of types that is guaranteed to be the same length as `keys`. If a type in `keys` could not be found, its corresponding entry in the result will be `null`.
[code] 
    multiGetTypes(  
      keys: [String!]!  
    ): [MoveType]!  
    
[/code]

### Arguments​

#### `multiGetTypes.**keys**` ● [`**[String!]!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

### Type​

#### [`**MoveType**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-type>) object​

Represents instances of concrete types (no type parameters, no references).

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-types.mdx>)
