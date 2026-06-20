<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/unions/unchanged-consensus-object -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Unions
  * UnchangedConsensusObject


# UnchangedConsensusObject

Details pertaining to consensus-managed objects that are referenced by but not changed by a transaction.
[code] 
    union UnchangedConsensusObject = ConsensusObjectRead | MutateConsensusStreamEnded | ReadConsensusStreamEnded | ConsensusObjectCancelled | PerEpochConfig  
    
[/code]

### Possible types​

#### [`UnchangedConsensusObject.**ConsensusObjectRead**`](</references/sui-api/sui-graphql/beta/reference/types/objects/consensus-object-read>) object​

#### [`UnchangedConsensusObject.**MutateConsensusStreamEnded**`](</references/sui-api/sui-graphql/beta/reference/types/objects/mutate-consensus-stream-ended>) object​

A transaction that wanted to mutate a consensus-managed object but couldn't because it became not-consensus-managed before the transaction executed (for example, it was deleted, turned into an owned object, or wrapped).

#### [`UnchangedConsensusObject.**ReadConsensusStreamEnded**`](</references/sui-api/sui-graphql/beta/reference/types/objects/read-consensus-stream-ended>) object​

A transaction that wanted to read a consensus-managed object but couldn't because it became not-consensus-managed before the transaction executed (for example, it was deleted, turned into an owned object, or wrapped).

#### [`UnchangedConsensusObject.**ConsensusObjectCancelled**`](</references/sui-api/sui-graphql/beta/reference/types/objects/consensus-object-cancelled>) object​

A transaction that was cancelled before it could access the consensus-managed object, so the object was an input but remained unchanged.

#### [`UnchangedConsensusObject.**PerEpochConfig**`](</references/sui-api/sui-graphql/beta/reference/types/objects/per-epoch-config>) object​

### Member Of​

[`UnchangedConsensusObjectConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/unchanged-consensus-object-connection>) object ● [`UnchangedConsensusObjectEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/unchanged-consensus-object-edge>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/unions/unchanged-consensus-object.mdx>)
