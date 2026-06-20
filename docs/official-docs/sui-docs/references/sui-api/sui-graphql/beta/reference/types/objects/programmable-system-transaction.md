<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/programmable-system-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ProgrammableSystemTransaction


# ProgrammableSystemTransaction

ProgrammableSystemTransaction is identical to ProgrammableTransaction, but GraphQL does not allow multiple variants with the same type.
[code] 
    type ProgrammableSystemTransaction {  
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

#### `ProgrammableSystemTransaction.**commands**` ● [`**CommandConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-connection>) object​

The transaction commands, executed sequentially.

##### `ProgrammableSystemTransaction.commands.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `ProgrammableSystemTransaction.commands.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `ProgrammableSystemTransaction.commands.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `ProgrammableSystemTransaction.commands.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `ProgrammableSystemTransaction.**inputs**` ● [`**TransactionInputConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-input-connection>) object​

Input objects or primitive values.

##### `ProgrammableSystemTransaction.inputs.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `ProgrammableSystemTransaction.inputs.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `ProgrammableSystemTransaction.inputs.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `ProgrammableSystemTransaction.inputs.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

### Implemented By​

[`TransactionKind`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-kind>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/programmable-system-transaction.mdx>)
