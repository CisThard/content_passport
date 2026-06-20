<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/object-change-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ObjectChangeConnection


# ObjectChangeConnection
[code]
    type ObjectChangeConnection {  
      edges: [ObjectChangeEdge!]!  
      nodes: [ObjectChange!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `ObjectChangeConnection.**edges**` ● [`**[ObjectChangeEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-change-edge>) non-null object​

A list of edges.

#### `ObjectChangeConnection.**nodes**` ● [`**[ObjectChange!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-change>) non-null object​

A list of nodes.

#### `ObjectChangeConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`TransactionEffects`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/object-change-connection.mdx>)
