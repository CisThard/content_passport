<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/shared-input -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * SharedInput


# SharedInput

A Move object that's shared.
[code] 
    type SharedInput {  
      address: SuiAddress  
      initialSharedVersion: UInt53  
      mutable: Boolean  
    }  
    
[/code]

### Fields​

#### `SharedInput.**address**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

The address of the shared object.

#### `SharedInput.**initialSharedVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The version that this object was shared at.

#### `SharedInput.**mutable**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

Controls whether the transaction block can reference the shared object as a mutable reference or by value.

This has implications for scheduling: Transactions that just read shared objects at a certain version (mutable = false) can be executed concurrently, while transactions that write shared objects (mutable = true) must be executed serially with respect to each other.

### Implemented By​

[`TransactionInput`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-input>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/shared-input.mdx>)
