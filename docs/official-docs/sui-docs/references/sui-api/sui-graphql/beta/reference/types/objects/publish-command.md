<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/publish-command -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * PublishCommand


# PublishCommand

Publishes a Move Package.
[code] 
    type PublishCommand {  
      dependencies: [SuiAddress!]  
      modules: [Base64!]  
    }  
    
[/code]

### Fields​

#### `PublishCommand.**dependencies**` ● [`**[SuiAddress!]**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) list scalar​

IDs of the transitive dependencies of the package to be published.

#### `PublishCommand.**modules**` ● [`**[Base64!]**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) list scalar​

Bytecode for the modules to be published, BCS serialized and Base64 encoded.

### Implemented By​

[`Command`](</references/sui-api/sui-graphql/beta/reference/types/unions/command>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/publish-command.mdx>)
