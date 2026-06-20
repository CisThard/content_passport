<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/unions/transaction-kind -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Unions
  * TransactionKind


# TransactionKind

Different types of transactions that can be executed on the Sui network.
[code] 
    union TransactionKind = GenesisTransaction | ConsensusCommitPrologueTransaction | ChangeEpochTransaction | RandomnessStateUpdateTransaction | AuthenticatorStateUpdateTransaction | EndOfEpochTransaction | ProgrammableTransaction | ProgrammableSystemTransaction  
    
[/code]

### Possible types​

#### [`TransactionKind.**GenesisTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/genesis-transaction>) object​

System transaction that initializes the network and writes the initial set of objects on-chain.

#### [`TransactionKind.**ConsensusCommitPrologueTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/consensus-commit-prologue-transaction>) object​

System transaction that runs at the beginning of a checkpoint, and is responsible for setting the current value of the clock, based on the timestamp from consensus.

#### [`TransactionKind.**ChangeEpochTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/change-epoch-transaction>) object​

A system transaction that updates epoch information on-chain (increments the current epoch). Executed by the system once per epoch, without using gas. Epoch change transactions cannot be submitted by users, because validators will refuse to sign them.

This transaction kind is deprecated in favour of `EndOfEpochTransaction`.

#### [`TransactionKind.**RandomnessStateUpdateTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/randomness-state-update-transaction>) object​

System transaction to update the source of on-chain randomness.

#### [`TransactionKind.**AuthenticatorStateUpdateTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/authenticator-state-update-transaction>) object​

#### [`TransactionKind.**EndOfEpochTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/end-of-epoch-transaction>) object​

System transaction that supersedes `ChangeEpochTransaction` as the new way to run transactions at the end of an epoch. Behaves similarly to `ChangeEpochTransaction` but can accommodate other optional transactions to run at the end of the epoch.

#### [`TransactionKind.**ProgrammableTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/programmable-transaction>) object​

#### [`TransactionKind.**ProgrammableSystemTransaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/programmable-system-transaction>) object​

ProgrammableSystemTransaction is identical to ProgrammableTransaction, but GraphQL does not allow multiple variants with the same type.

### Member Of​

[`Transaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/unions/transaction-kind.mdx>)
