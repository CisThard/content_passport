<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/transaction-input-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * TransactionInputConnection


# TransactionInputConnection
[code]
    type TransactionInputConnection {  
      edges: [TransactionInputEdge!]!  
      nodes: [TransactionInput!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `TransactionInputConnection.**edges**` ● [`**[TransactionInputEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-input-edge>) non-null object​

A list of edges.

#### `TransactionInputConnection.**nodes**` ● [`**[TransactionInput!]!**`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-input>) non-null union​

A list of nodes.

#### `TransactionInputConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`ProgrammableSystemTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/programmable-system-transaction>) object ● [`ProgrammableTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/programmable-transaction>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/transaction-input-connection.mdx>)
