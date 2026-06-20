<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/epochs -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * epochs


# epochs

Paginate epochs that are in the network.
[code] 
    epochs(  
      first: Int  
      after: String  
      last: Int  
      before: String  
    ): EpochConnection  
    
[/code]

### Arguments​

#### `epochs.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `epochs.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `epochs.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `epochs.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

### Type​

#### [`**EpochConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch-connection>) object​

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/epochs.mdx>)
