<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/programmable-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ProgrammableTransaction


# ProgrammableTransaction
[code]
    type ProgrammableTransaction {  
      commands(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): CommandConnection  
      inputs(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): TransactionInputConnection  
    }  
    
[/code]

### Fields​

#### `ProgrammableTransaction.**commands**` ● [`**CommandConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-connection>) object​

The transaction commands, executed sequentially.

##### `ProgrammableTransaction.commands.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `ProgrammableTransaction.commands.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `ProgrammableTransaction.commands.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `ProgrammableTransaction.commands.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `ProgrammableTransaction.**inputs**` ● [`**TransactionInputConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-input-connection>) object​

Input objects or primitive values.

##### `ProgrammableTransaction.inputs.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `ProgrammableTransaction.inputs.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `ProgrammableTransaction.inputs.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `ProgrammableTransaction.inputs.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

### Implemented By​

[`TransactionKind`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-kind>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/programmable-transaction.mdx>)
