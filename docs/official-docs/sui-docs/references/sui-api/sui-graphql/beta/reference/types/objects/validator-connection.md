<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/validator-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ValidatorConnection


# ValidatorConnection
[code]
    type ValidatorConnection {  
      edges: [ValidatorEdge!]!  
      nodes: [Validator!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `ValidatorConnection.**edges**` ● [`**[ValidatorEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator-edge>) non-null object​

A list of edges.

#### `ValidatorConnection.**nodes**` ● [`**[ Validator!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator>) non-null object​

A list of nodes.

#### `ValidatorConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`Validator`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator>) object ● [`ValidatorSet`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator-set>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/validator-connection.mdx>)
