<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction-kind-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * EndOfEpochTransactionKindEdge


# EndOfEpochTransactionKindEdge

An edge in a connection.
[code] 
    type EndOfEpochTransactionKindEdge {  
      cursor: String!  
      node: EndOfEpochTransactionKind!  
    }  
    
[/code]

### Fields​

#### `EndOfEpochTransactionKindEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `EndOfEpochTransactionKindEdge.**node**` ● [`**EndOfEpochTransactionKind!**`](</references/sui-api/sui-graphql/beta/reference/types/unions/end-of-epoch-transaction-kind>) non-null union​

The item at the end of the edge

### Member Of​

[`EndOfEpochTransactionKindConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction-kind-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction-kind-edge.mdx>)
