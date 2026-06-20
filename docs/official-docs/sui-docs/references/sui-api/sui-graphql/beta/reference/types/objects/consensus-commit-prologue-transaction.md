<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/consensus-commit-prologue-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ConsensusCommitPrologueTransaction


# ConsensusCommitPrologueTransaction

System transaction that runs at the beginning of a checkpoint, and is responsible for setting the current value of the clock, based on the timestamp from consensus.
[code] 
    type ConsensusCommitPrologueTransaction {  
      additionalStateDigest: String  
      commitTimestamp: DateTime  
      consensusCommitDigest: String  
      epoch: Epoch  
      round: UInt53  
      subDagIndex: UInt53  
    }  
    
[/code]

### Fields​

#### `ConsensusCommitPrologueTransaction.**additionalStateDigest**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Digest of any additional state computed by the consensus handler. Used to detect forking bugs as early as possible.

Present in V4.

#### `ConsensusCommitPrologueTransaction.**commitTimestamp**` ● [`**DateTime**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/date-time>) scalar​

Unix timestamp from consensus.

Present in V1, V2, V3, V4.

#### `ConsensusCommitPrologueTransaction.**consensusCommitDigest**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Digest of consensus output, encoded as a Base58 string.

Present in V2, V3, V4.

#### `ConsensusCommitPrologueTransaction.**epoch**` ● [`**Epoch**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object​

Epoch of the commit prologue transaction.

Present in V1, V2, V3, V4.

#### `ConsensusCommitPrologueTransaction.**round**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Consensus round of the commit.

Present in V1, V2, V3, V4.

#### `ConsensusCommitPrologueTransaction.**subDagIndex**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The sub DAG index of the consensus commit. This field is populated if there are multiple consensus commits per round.

Present in V3, V4.

### Implemented By​

[`TransactionKind`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-kind>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/consensus-commit-prologue-transaction.mdx>)
