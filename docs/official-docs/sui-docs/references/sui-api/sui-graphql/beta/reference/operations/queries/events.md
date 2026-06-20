<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/events -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * events


# events

Paginate events that are emitted in the network, optionally filtered by event filters.
[code] 
    events(  
      first: Int  
      after: String  
      last: Int  
      before: String  
      filter: EventFilter  
    ): EventConnection  
    
[/code]

### Arguments​

#### `events.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `events.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `events.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `events.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `events.**filter**` ● [`**EventFilter**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/event-filter>) input​

### Type​

#### [`**EventConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/event-connection>) object​

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/events.mdx>)
