<!-- Source: https://docs.sui.io/references/sui-graphql -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * GraphQL


On this page

# GraphQL for Sui RPC

GraphQL for the Sui RPC is a public service that enables interacting with the Sui [network](<https://sui.io/networkinfo>).

To get started with GraphQL for the Sui RPC, check out the [Getting Started](</develop/accessing-data/graphql/graphql-rpc>) guide. If you'd like to learn more about the concepts used in the GraphQL service, check out the [GraphQL](</develop/accessing-data/graphql/graphql-rpc>) for Sui RPC concepts page. If you'd like to view the reference documentation, check out the [schema](</references/sui-api/sui-graphql/beta/reference>).

info

Refer to [Access Sui Data](</develop/accessing-data/data-serving>) for an overview of options to access Sui network data.

## Key types​

All GraphQL API elements are accessible through the left sidebar, the following are good starting points to explore from.

  * "Queries" lists all top-level queries for reading the chain state, from reading details about addresses and objects to [dryRunTransactionBlock](</references/sui-api/sui-graphql/beta/reference/operations/queries/simulate-transaction>), which has an execution-like interface but does not modify the chain.
  * [Object](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) is the type representing all onchain objects (Move values and packages).
  * [Address](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) corresponds to account addresses (derived from the public keys of signatures that sign transactions) and can be used to query the objects owned by these accounts and the transactions they have signed or been affected by. [Owner](</references/sui-api/sui-graphql/beta/reference/types/objects/owned-or-immutable>) represents any entity that can own a [MoveObject](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) to handle cases where it is not known whether the owner is an [Object](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) or an [Address](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) (for example, from the perspective of a Move object looking at its owner).


[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-graphql.mdx>)

[PreviousSui RPC](</references/sui-api>)[NextBeta](</references/sui-api/sui-graphql/beta/reference>)

  * Key types
