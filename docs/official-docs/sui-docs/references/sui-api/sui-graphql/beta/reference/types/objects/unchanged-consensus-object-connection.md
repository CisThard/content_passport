<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/unchanged-consensus-object-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * UnchangedConsensusObjectConnection


# UnchangedConsensusObjectConnection
[code]
    type UnchangedConsensusObjectConnection {  
      edges: [UnchangedConsensusObjectEdge!]!  
      nodes: [UnchangedConsensusObject!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `UnchangedConsensusObjectConnection.**edges**` ● [`**[UnchangedConsensusObjectEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/unchanged-consensus-object-edge>) non-null object​

A list of edges.

#### `UnchangedConsensusObjectConnection.**nodes**` ● [`**[UnchangedConsensusObject!]!**`](</references/sui-api/sui-graphql/beta/reference/types/unions/unchanged-consensus-object>) non-null union​

A list of nodes.

#### `UnchangedConsensusObjectConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`TransactionEffects`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/unchanged-consensus-object-connection.mdx>)
