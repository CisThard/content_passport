<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/event-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * EventConnection


# EventConnection
[code]
    type EventConnection {  
      edges: [EventEdge!]!  
      nodes: [Event!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `EventConnection.**edges**` ● [`**[EventEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/event-edge>) non-null object​

A list of edges.

#### `EventConnection.**nodes**` ● [`**[Event!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/event>) non-null object​

A list of nodes.

#### `EventConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Returned By​

[`events`](</references/sui-api/sui-graphql/beta/reference/operations/queries/events>) query

### Member Of​

[`TransactionEffects`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/event-connection.mdx>)
