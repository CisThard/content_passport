<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction-kind-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * EndOfEpochTransactionKindConnection


# EndOfEpochTransactionKindConnection
[code]
    type EndOfEpochTransactionKindConnection {  
      edges: [EndOfEpochTransactionKindEdge!]!  
      nodes: [EndOfEpochTransactionKind!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `EndOfEpochTransactionKindConnection.**edges**` ● [`**[EndOfEpochTransactionKindEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction-kind-edge>) non-null object​

A list of edges.

#### `EndOfEpochTransactionKindConnection.**nodes**` ● [`**[EndOfEpochTransactionKind!]!**`](</references/sui-api/sui-graphql/beta/reference/types/unions/end-of-epoch-transaction-kind>) non-null union​

A list of nodes.

#### `EndOfEpochTransactionKindConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`EndOfEpochTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction-kind-connection.mdx>)
