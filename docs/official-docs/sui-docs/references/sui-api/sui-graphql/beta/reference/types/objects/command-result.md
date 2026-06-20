<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/command-result -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * CommandResult


# CommandResult

The intermediate results for each command of a transaction simulation.
[code] 
    type CommandResult {  
      mutatedReferences: [CommandOutput!]  
      returnValues: [CommandOutput!]  
    }  
    
[/code]

### Fields​

#### `CommandResult.**mutatedReferences**` ● [`**[CommandOutput!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-output>) list object​

Changes made to arguments that were mutably borrowed by each command in this transaction.

#### `CommandResult.**returnValues**` ● [`**[CommandOutput!]**`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-output>) list object​

Return results of each command in this transaction.

### Member Of​

[`SimulationResult`](</references/sui-api/sui-graphql/beta/reference/types/objects/simulation-result>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/command-result.mdx>)
