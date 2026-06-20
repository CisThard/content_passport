<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/command-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * CommandEdge


# CommandEdge

An edge in a connection.
[code] 
    type CommandEdge {  
      cursor: String!  
      node: Command!  
    }  
    
[/code]

### Fields​

#### `CommandEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `CommandEdge.**node**` ● [`**Command!**`](</references/sui-api/sui-graphql/beta/reference/types/unions/command>) non-null union​

The item at the end of the edge

### Member Of​

[`CommandConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/command-edge.mdx>)
