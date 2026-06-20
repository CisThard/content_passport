<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/gas-input -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * GasInput


# GasInput
[code]
    type GasInput {  
      gasBudget: BigInt  
      gasPayment(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): ObjectConnection  
      gasPrice: BigInt  
      gasSponsor: Address  
    }  
    
[/code]

### Fields​

#### `GasInput.**gasBudget**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The maximum SUI that can be expended by executing this transaction

#### `GasInput.**gasPayment**` ● [`**ObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object​

Objects used to pay for a transaction's execution and storage

##### `GasInput.gasPayment.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `GasInput.gasPayment.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `GasInput.gasPayment.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `GasInput.gasPayment.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `GasInput.**gasPrice**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

An unsigned integer specifying the number of native tokens per gas unit this transaction will pay (in MIST).

#### `GasInput.**gasSponsor**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

Address of the owner of the gas object(s) used.

### Member Of​

[`Transaction`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/gas-input.mdx>)
