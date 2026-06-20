<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/unions/command -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Unions
  * Command


# Command

A single command in the programmable transaction.
[code] 
    union Command = MakeMoveVecCommand | MergeCoinsCommand | MoveCallCommand | PublishCommand | SplitCoinsCommand | TransferObjectsCommand | UpgradeCommand | OtherCommand  
    
[/code]

### Possible types​

#### [`Command.**MakeMoveVecCommand**`](</references/sui-api/sui-graphql/beta/reference/types/objects/make-move-vec-command>) object​

Create a vector (can be empty).

#### [`Command.**MergeCoinsCommand**`](</references/sui-api/sui-graphql/beta/reference/types/objects/merge-coins-command>) object​

Merges `coins` into the first `coin` (produces no results).

#### [`Command.**MoveCallCommand**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-call-command>) object​

#### [`Command.**PublishCommand**`](</references/sui-api/sui-graphql/beta/reference/types/objects/publish-command>) object​

Publishes a Move Package.

#### [`Command.**SplitCoinsCommand**`](</references/sui-api/sui-graphql/beta/reference/types/objects/split-coins-command>) object​

Splits off coins with denominations in `amounts` from `coin`, returning multiple results (as many as there are amounts.)

#### [`Command.**TransferObjectsCommand**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transfer-objects-command>) object​

Transfers `inputs` to `address`. All inputs must have the `store` ability (allows public transfer) and must not be previously immutable or shared.

#### [`Command.**UpgradeCommand**`](</references/sui-api/sui-graphql/beta/reference/types/objects/upgrade-command>) object​

Upgrades a Move Package.

#### [`Command.**OtherCommand**`](</references/sui-api/sui-graphql/beta/reference/types/objects/other-command>) object​

Placeholder for unimplemented command types

### Member Of​

[`CommandConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-connection>) object ● [`CommandEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-edge>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/unions/command.mdx>)
