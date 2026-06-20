<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/genesis-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * GenesisTransaction


# GenesisTransaction

System transaction that initializes the network and writes the initial set of objects on-chain.
[code] 
    type GenesisTransaction {  
      objects(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): ObjectConnection  
    }  
    
[/code]

### Fields​

#### `GenesisTransaction.**objects**` ● [`**ObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object​

Objects to be created during genesis.

##### `GenesisTransaction.objects.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `GenesisTransaction.objects.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `GenesisTransaction.objects.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `GenesisTransaction.objects.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

### Implemented By​

[`TransactionKind`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-kind>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/genesis-transaction.mdx>)
