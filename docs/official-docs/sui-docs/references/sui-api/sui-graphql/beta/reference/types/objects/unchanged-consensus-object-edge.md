<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/unchanged-consensus-object-edge -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * UnchangedConsensusObjectEdge


# UnchangedConsensusObjectEdge

An edge in a connection.
[code] 
    type UnchangedConsensusObjectEdge {  
      cursor: String!  
      node: UnchangedConsensusObject!  
    }  
    
[/code]

### Fields​

#### `UnchangedConsensusObjectEdge.**cursor**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

A cursor for use in pagination

#### `UnchangedConsensusObjectEdge.**node**` ● [`**UnchangedConsensusObject!**`](</references/sui-api/sui-graphql/beta/reference/types/unions/unchanged-consensus-object>) non-null union​

The item at the end of the edge

### Member Of​

[`UnchangedConsensusObjectConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/unchanged-consensus-object-connection>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/unchanged-consensus-object-edge.mdx>)
