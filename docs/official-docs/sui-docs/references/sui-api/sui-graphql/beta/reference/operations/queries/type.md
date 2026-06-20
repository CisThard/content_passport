<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/type -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * type


# type

Fetch a structured representation of a concrete type, including its layout information.

Types are canonicalized: In the input they can be at any package address at or after the package that first defines them, and in the output they will be relocated to the package that first defines them.

Fails if the type is malformed, returns `null` if a type mentioned does not exist.
[code] 
    type(  
      type: String!  
    ): MoveType  
    
[/code]

### Arguments​

#### `type.**type**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

### Type​

#### [`**MoveType**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-type>) object​

Represents instances of concrete types (no type parameters, no references).

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/type.mdx>)
