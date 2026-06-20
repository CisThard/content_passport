<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/command-connection -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * CommandConnection


# CommandConnection
[code]
    type CommandConnection {  
      edges: [CommandEdge!]!  
      nodes: [Command!]!  
      pageInfo: PageInfo!  
    }  
    
[/code]

### Fields​

#### `CommandConnection.**edges**` ● [`**[CommandEdge!]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-edge>) non-null object​

A list of edges.

#### `CommandConnection.**nodes**` ● [`**[Command!]!**`](</references/sui-api/sui-graphql/beta/reference/types/unions/command>) non-null union​

A list of nodes.

#### `CommandConnection.**pageInfo**` ● [`**PageInfo!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/page-info>) non-null object​

Information to aid in pagination.

### Member Of​

[`ProgrammableSystemTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/programmable-system-transaction>) object ● [`ProgrammableTransaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/programmable-transaction>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/command-connection.mdx>)
