<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/event -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * Event


# Event
[code]
    type Event {  
      contents: MoveValue  
      eventBcs: Base64  
      sender: Address  
      sequenceNumber: UInt53!  
      timestamp: DateTime  
      transaction: Transaction  
      transactionModule: MoveModule  
    }  
    
[/code]

### Fields​

#### `Event.**contents**` ● [`**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

The Move value emitted for this event.

#### `Event.**eventBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64 encoded BCS serialized bytes of the entire Event structure from sui-types. This includes: package_id, transaction_module, sender, type, and contents (which itself contains the BCS-serialized Move struct data).

#### `Event.**sender**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

Address of the sender of the transaction that emitted this event.

#### `Event.**sequenceNumber**` ● [`**UInt53!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) non-null scalar​

The position of the event among the events from the same transaction.

#### `Event.**timestamp**` ● [`**DateTime**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/date-time>) scalar​

Timestamp corresponding to the checkpoint this event's transaction was finalized in. All events from the same transaction share the same timestamp.

`null` for simulated/executed transactions as they are not included in a checkpoint.

#### `Event.**transaction**` ● [`**Transaction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/transaction>) object​

The transaction that emitted this event. This information is only available for events from indexed transactions, and not from transactions that have just been executed or dry-run.

#### `Event.**transactionModule**` ● [`**MoveModule**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module>) object​

The module containing the function that was called in the programmable transaction, that resulted in this event being emitted.

### Member Of​

[`EventConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/event-connection>) object ● [`EventEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/event-edge>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/event.mdx>)
