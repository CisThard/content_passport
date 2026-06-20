<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ActiveJwkConnection


# ActiveJwkConnection
[code]
    type ActiveJwkConnection {  
      edges: [ActiveJwkEdge!]!  
      nodes: [ActiveJwk!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `ActiveJwkConnection.**edges**` ● [`**[ActiveJwkEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk-edge>) non-null object​

A list of edges.

#### `ActiveJwkConnection.**nodes**` ● [`**[ActiveJwk!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk>) non-null object​

A list of nodes.

#### `ActiveJwkConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`AuthenticatorStateUpdateTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/authenticator-state-update-transaction>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk-connection.mdx>)
