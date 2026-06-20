<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/node -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * node


# node

Fetch a `Node` by its globally unique `ID`. Returns `null` if the node cannot be found (e.g., the underlying data was pruned or never existed).
[code] 
    node(  
      id: ID!  
    ): Node  
    
[/code]

### Arguments​

#### `node.**id**` ● [`**ID!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/id>) non-null scalar​

### Type​

#### [`**Node**`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/node>) interface​

An interface implemented by types that can be uniquely identified by a globally unique `ID`, following the GraphQL Global Object Identification specification.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/node.mdx>)
