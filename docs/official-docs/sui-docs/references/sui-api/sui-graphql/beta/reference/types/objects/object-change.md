<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/object-change -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ObjectChange


# ObjectChange
[code]
    type ObjectChange {  
      address: SuiAddress!  
      idCreated: Boolean  
      idDeleted: Boolean  
      inputState: Object  
      outputState: Object  
    }  
    
[/code]

### Fields​

#### `ObjectChange.**address**` ● [`**SuiAddress!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) non-null scalar​

The address of the object that has changed.

#### `ObjectChange.**idCreated**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

Whether the ID was created in this transaction.

#### `ObjectChange.**idDeleted**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

Whether the ID was deleted in this transaction.

#### `ObjectChange.**inputState**` ● [`**Object**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object​

The contents of the object immediately before the transaction.

#### `ObjectChange.**outputState**` ● [`**Object**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object​

The contents of the object immediately after the transaction.

### Member Of​

[`ObjectChangeConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-change-connection>) object ● [`ObjectChangeEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-change-edge>) object

### Implemented By​

[`TransactionObject`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-object>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/object-change.mdx>)
