<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/coin-metadata -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * coinMetadata


# coinMetadata

Fetch the CoinMetadata for a given coin type.

Returns `null` if no CoinMetadata object exists for the given coin type.
[code] 
    coinMetadata(  
      coinType: String!  
    ): CoinMetadata  
    
[/code]

### Arguments​

#### `coinMetadata.**coinType**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

### Type​

#### [`**CoinMetadata**`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object​

An object representing metadata about a coin type.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/coin-metadata.mdx>)
