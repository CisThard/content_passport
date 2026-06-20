<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/make-move-vec-command -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MakeMoveVecCommand


# MakeMoveVecCommand

Create a vector (can be empty).
[code] 
    type MakeMoveVecCommand {  
      elements: [TransactionArgument!]  
      type: MoveType  
    }  
    
[/code]

### Fields​

#### `MakeMoveVecCommand.**elements**` ● [`**[TransactionArgument!]**`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-argument>) list union​

The values to pack into the vector, all of the same type.

#### `MakeMoveVecCommand.**type**` ● [`**MoveType**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-type>) object​

If the elements are not objects, or the vector is empty, a type must be supplied.

### Implemented By​

[`Command`](</references/sui-api/sui-graphql/beta/reference/types/unions/command>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/make-move-vec-command.mdx>)
