<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/transaction-input-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * TransactionInputEdge


# TransactionInputEdge

An edge in a connection.
[code] 
    type TransactionInputEdge {  
      cursor: String!  
      node: TransactionInput!  
    }  
    
[/code]

### Fields​

#### `TransactionInputEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `TransactionInputEdge.**node**` ● [`**TransactionInput!**`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-input>) non-null union​

The item at the end of the edge

### Member Of​

[`TransactionInputConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-input-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/transaction-input-edge.mdx>)
