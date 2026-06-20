<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/execution-error -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ExecutionError


# ExecutionError

Represents execution error information for failed transactions.
[code] 
    type ExecutionError {  
      abortCode: BigInt  
      constant: String  
      function: MoveFunction  
      identifier: String  
      instructionOffset: Int  
      message: String!  
      module: MoveModule  
      sourceLineNumber: Int  
    }  
    
[/code]

### Fields​

#### `ExecutionError.**abortCode**` ● [`**BigInt**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/big-int>) scalar​

The error code of the Move abort, populated if this transaction failed with a Move abort.

Returns the explicit code if the abort used `code` annotation (e.g., `abort(ERR, code = 5)` returns 5), otherwise returns the raw abort code containing encoded error information.

#### `ExecutionError.**constant**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

An associated constant for the error. Only populated for clever errors.

Constants are returned as human-readable strings when possible. Complex types are returned as Base64-encoded bytes.

#### `ExecutionError.**function**` ● [`**MoveFunction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function>) object​

The function that the abort originated from. Only populated for Move aborts and primitive runtime errors that have function name information.

#### `ExecutionError.**identifier**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The error's name. Only populated for clever errors.

#### `ExecutionError.**instructionOffset**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

The instruction offset in the Move bytecode where the error occurred. Populated for Move aborts and primitive runtime errors.

#### `ExecutionError.**message**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

Human readable explanation of why the transaction failed.

For Move aborts, the error message will be resolved to a human-readable form if possible, otherwise it will fall back to displaying the abort code and location.

#### `ExecutionError.**module**` ● [`**MoveModule**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object​

The module that the abort originated from. Only populated for Move aborts and primitive runtime errors.

#### `ExecutionError.**sourceLineNumber**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

The source line number for the abort. Only populated for clever errors.

### Member Of​

[`TransactionEffects`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction-effects>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/execution-error.mdx>)
