<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/epoch-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * EpochConnection


# EpochConnection
[code]
    type EpochConnection {  
      edges: [EpochEdge!]!  
      nodes: [Epoch!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `EpochConnection.**edges**` ● [`**[EpochEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch-edge>) non-null object​

A list of edges.

#### `EpochConnection.**nodes**` ● [`**[ Epoch!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) non-null object​

A list of nodes.

#### `EpochConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Returned By​

[`epochs`](</references/sui-api/sui-graphql/beta/reference/operations/queries/epochs>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/epoch-connection.mdx>)
