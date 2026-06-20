<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/event-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * EventEdge


# EventEdge

An edge in a connection.
[code] 
    type EventEdge {  
      cursor: String!  
      node: Event!  
    }  
    
[/code]

### Fields​

#### `EventEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `EventEdge.**node**` ● [`**Event!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/event>) non-null object​

The item at the end of the edge

### Member Of​

[`EventConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/event-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/event-edge.mdx>)
