<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Scalars
  * SuiAddress


# SuiAddress

String containing 32 byte hex-encoded address, with a leading '0x'. Leading zeroes can be omitted on input but will always appear in outputs (SuiAddress in output is guaranteed to be 66 characters long).
[code] 
    scalar SuiAddress  
    
[/code]

### Member Of​

[`address`](</references/sui-api/sui-graphql/beta/reference/operations/queries/address>) query ● [`Address`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object ● [`AddressKey`](</references/sui-api/sui-graphql/beta/reference/types/inputs/address-key>) input ● [`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`ConsensusObjectCancelled`](</references/sui-api/sui-graphql/beta/reference/types/objects/consensus-object-cancelled>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`EventFilter`](</references/sui-api/sui-graphql/beta/reference/types/inputs/event-filter>) input ● [`IAddressable`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iaddressable>) interface ● [`Linkage`](</references/sui-api/sui-graphql/beta/reference/types/objects/linkage>) object ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object ● [`MutateConsensusStreamEnded`](</references/sui-api/sui-graphql/beta/reference/types/objects/mutate-consensus-stream-ended>) object ● [`object`](</references/sui-api/sui-graphql/beta/reference/operations/queries/object>) query ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object ● [`ObjectChange`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-change>) object ● [`ObjectFilter`](</references/sui-api/sui-graphql/beta/reference/types/inputs/object-filter>) input ● [`ObjectKey`](</references/sui-api/sui-graphql/beta/reference/types/inputs/object-key>) input ● [`objectVersions`](</references/sui-api/sui-graphql/beta/reference/operations/queries/object-versions>) query ● [`package`](</references/sui-api/sui-graphql/beta/reference/operations/queries/package>) query ● [`PackageKey`](</references/sui-api/sui-graphql/beta/reference/types/inputs/package-key>) input ● [`packageVersions`](</references/sui-api/sui-graphql/beta/reference/operations/queries/package-versions>) query ● [`PublishCommand`](</references/sui-api/sui-graphql/beta/reference/types/objects/publish-command>) object ● [`ReadConsensusStreamEnded`](</references/sui-api/sui-graphql/beta/reference/types/objects/read-consensus-stream-ended>) object ● [`SharedInput`](</references/sui-api/sui-graphql/beta/reference/types/objects/shared-input>) object ● [`TransactionFilter`](</references/sui-api/sui-graphql/beta/reference/types/inputs/transaction-filter>) input ● [`TypeOrigin`](</references/sui-api/sui-graphql/beta/reference/types/objects/type-origin>) object ● [`UpgradeCommand`](</references/sui-api/sui-graphql/beta/reference/types/objects/upgrade-command>) object ● [`verifySignature`](</references/sui-api/sui-graphql/beta/reference/operations/queries/verify-signature>) query ● [`verifyZkLoginSignature`](</references/sui-api/sui-graphql/beta/reference/operations/queries/verify-zk-login-signature>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address.mdx>)
