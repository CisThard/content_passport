<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/transaction-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * TransactionEdge


# TransactionEdge

An edge in a connection.
[code] 
    type TransactionEdge {  
      cursor: String!  
      node: Transaction!  
    }  
    
[/code]

### Fields​

#### `TransactionEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `TransactionEdge.**node**` ● [`**Transaction!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) non-null object​

The item at the end of the edge

### Member Of​

[`TransactionConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/transaction-edge.mdx>)
