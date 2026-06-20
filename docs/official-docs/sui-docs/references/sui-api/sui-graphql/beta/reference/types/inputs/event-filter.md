<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/inputs/event-filter -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Inputs
  * EventFilter


# EventFilter
[code]
    input EventFilter {  
      afterCheckpoint: UInt53  
      atCheckpoint: UInt53  
      beforeCheckpoint: UInt53  
      module: String  
      sender: SuiAddress  
      type: String  
    }  
    
[/code]

### Fields​

#### `EventFilter.**afterCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Limit to events that occured strictly after the given checkpoint.

#### `EventFilter.**atCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Limit to events in the given checkpoint.

#### `EventFilter.**beforeCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Limit to event that occured strictly before the given checkpoint.

#### `EventFilter.**module**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Events emitted by a particular module. An event is emitted by a particular module if some function in the module is called by a PTB and emits an event.

Modules can be filtered by their package, or package::module. We currently do not support filtering by emitting module and event type at the same time so if both are provided in one filter, the query will error.

#### `EventFilter.**sender**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

Filter on events by transaction sender address.

#### `EventFilter.**type**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

This field is used to specify the type of event emitted.

Events can be filtered by their type's package, package::module, or their fully qualified type name.

Generic types can be queried by either the generic type name, e.g. `0x2::coin::Coin`, or by the full type name, such as `0x2::coin::Coin<0x2::sui::SUI>`.

### Member Of​

[`events`](</references/sui-api/sui-graphql/beta/reference/operations/queries/events>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/inputs/event-filter.mdx>)
