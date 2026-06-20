<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/upgrade-command -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * UpgradeCommand


# UpgradeCommand

Upgrades a Move Package.
[code] 
    type UpgradeCommand {  
      currentPackage: SuiAddress  
      dependencies: [SuiAddress!]  
      modules: [Base64!]  
      upgradeTicket: TransactionArgument  
    }  
    
[/code]

### Fields​

#### `UpgradeCommand.**currentPackage**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

ID of the package being upgraded.

#### `UpgradeCommand.**dependencies**` ● [`**[SuiAddress!]**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) list scalar​

IDs of the transitive dependencies of the package to be published.

#### `UpgradeCommand.**modules**` ● [`**[Base64!]**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) list scalar​

Bytecode for the modules to be published, BCS serialized and Base64 encoded.

#### `UpgradeCommand.**upgradeTicket**` ● [`**TransactionArgument**`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-argument>) union​

The `UpgradeTicket` authorizing the upgrade.

### Implemented By​

[`Command`](</references/sui-api/sui-graphql/beta/reference/types/unions/command>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/upgrade-command.mdx>)
