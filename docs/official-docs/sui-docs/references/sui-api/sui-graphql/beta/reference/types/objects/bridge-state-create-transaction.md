<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/bridge-state-create-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * BridgeStateCreateTransaction


# BridgeStateCreateTransaction

System transaction for creating bridge state for cross-chain operations.
[code] 
    type BridgeStateCreateTransaction {  
      chainIdentifier: String  
    }  
    
[/code]

### Fields​

#### `BridgeStateCreateTransaction.**chainIdentifier**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The chain identifier for which this bridge state is being created.

### Implemented By​

[`EndOfEpochTransactionKind`](</references/sui-api/sui-graphql/beta/reference/types/unions/end-of-epoch-transaction-kind>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/bridge-state-create-transaction.mdx>)
