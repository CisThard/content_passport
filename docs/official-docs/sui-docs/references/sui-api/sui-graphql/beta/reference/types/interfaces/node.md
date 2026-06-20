<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/interfaces/node -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Interfaces
  * Node


# Node

An interface implemented by types that can be uniquely identified by a globally unique `ID`, following the GraphQL Global Object Identification specification.
[code] 
    interface Node {  
      id: ID!  
    }  
    
[/code]

### Fields​

#### `Node.**id**` ● [`**ID!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/id>) non-null scalar​

The node's globally unique identifier, which can be passed to `Query.node` to refetch it.

### Returned By​

[`node`](</references/sui-api/sui-graphql/beta/reference/operations/queries/node>) query

### Implemented By​

[`Address`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object ● [`Checkpoint`](</references/sui-api/sui-graphql/beta/reference/types/objects/checkpoint>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`Epoch`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object ● [`Transaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/interfaces/node.mdx>)
