<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/consensus-object-read -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ConsensusObjectRead


# ConsensusObjectRead
[code]
    type ConsensusObjectRead {  
      object: Object  
    }  
    
[/code]

### Fields​

#### `ConsensusObjectRead.**object**` ● [`**Object**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object​

The version of the consensus-managed object that was read by this transaction.

### Implemented By​

[`TransactionObject`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-object>) union ● [`UnchangedConsensusObject`](</references/sui-api/sui-graphql/beta/reference/types/unions/unchanged-consensus-object>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/consensus-object-read.mdx>)
