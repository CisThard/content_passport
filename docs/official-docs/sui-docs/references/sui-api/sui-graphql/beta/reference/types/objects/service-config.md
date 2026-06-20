<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/service-config -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ServiceConfig


# ServiceConfig
[code]
    type ServiceConfig {  
      availableRange(  
        type: String!  
        field: String  
        filters: [String!]  
      ): AvailableRange!  
      defaultPageSize(  
        type: String!  
        field: String!  
      ): Int  
      maxDisassembledModuleSize: Int  
      maxDisplayFieldDepth: Int  
      maxDisplayFormatNodes: Int  
      maxDisplayObjectLoads: Int  
      maxDisplayOutputSize: Int  
      maxMoveValueBound: Int  
      maxMoveValueDepth: Int  
      maxMultiGetSize: Int  
      maxOutputNodes: Int  
      maxPageSize(  
        type: String!  
        field: String!  
      ): Int  
      maxQueryDepth: Int  
      maxQueryNodes: Int  
      maxQueryPayloadSize: Int  
      maxRichQueries: Int  
      maxTransactionPayloadSize: Int  
      maxTypeArgumentDepth: Int  
      maxTypeArgumentWidth: Int  
      maxTypeNodes: Int  
      mutationTimeoutMs: Int  
      queryTimeoutMs: Int  
    }  
    
[/code]

### Fields​

#### `ServiceConfig.**availableRange**` ● [`**AvailableRange!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/available-range>) non-null object​

Range of checkpoints for which data is available for a query type, field and optional filter. If filter is not provided, the strictest retention range for the query and type is returned.

##### `ServiceConfig.availableRange.**type**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

##### `ServiceConfig.availableRange.**field**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `ServiceConfig.availableRange.**filters**` ● [`**[String!]**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) list scalar​

#### `ServiceConfig.**defaultPageSize**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Number of elements a paginated connection will return if a page size is not supplied.

Accepts `type` and `field` arguments which identify the connection that is being queried. If the field in question is paginated, its default page size is returned. If it does not exist or is not paginated, `null` is returned.

##### `ServiceConfig.defaultPageSize.**type**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

##### `ServiceConfig.defaultPageSize.**field**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `ServiceConfig.**maxDisassembledModuleSize**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum output size of a disassembled MoveModule, in bytes.

#### `ServiceConfig.**maxDisplayFieldDepth**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum depth of nested field access supported in display outputs.

#### `ServiceConfig.**maxDisplayFormatNodes**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum number of components in a Display v2 format string.

#### `ServiceConfig.**maxDisplayObjectLoads**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum number of objects that can be loaded while evaluating a display.

#### `ServiceConfig.**maxDisplayOutputSize**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum output size of a display output.

#### `ServiceConfig.**maxMoveValueBound**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum budget in bytes to spend when outputting a structured `MoveValue`.

#### `ServiceConfig.**maxMoveValueDepth**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum nesting allowed in datatype fields when calculating the layout of a single type.

#### `ServiceConfig.**maxMultiGetSize**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum number of elements that can be requested from a multi-get query. A request to fetch more keys will result in an error.

#### `ServiceConfig.**maxOutputNodes**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum number of estimated output nodes in a GraphQL response.

The estimate is an upperbound of how many nodes there would be in the output assuming every requested field is present, paginated requests return full page sizes, and multi-get queries find all requested keys. Below is a worked example query:
[code] 
    |  0: query {                            # 514 = total  
    |  1:   checkpoint {                     # 1  
    |  2:     sequenceNumber                 # 1  
    |  3:   }  
    |  4:  
    |  5:   multiGetObjects([$a, $b, $c]) {  # 1 (* 3)  
    |  6:     address                        # 3  
    |  7:     digest                         # 3  
    |  8:   }  
    |  9:  
    | 10:   # default page size is 20  
    | 11:   transactions {                   # 1 (* 20)  
    | 12:     pageInfo {                     # 1  
    | 13:       hasNextPage                  # 1  
    | 14:       endCursor                    # 1  
    | 15:     }  
    | 16:  
    | 17:     nodes                          # 1  
    | 18:     {                              # 20  
    | 19:       digest                       # 20  
    | 20:       effects {                    # 20  
    | 21:         objectChanges(first: 10) { # 20 (* 10)  
    | 22:           nodes                    # 20  
    | 23:           {                        # 200  
    | 24:             address                # 200  
    | 25:           }  
    | 26:         }  
    | 27:       }  
    | 28:     }  
    | 29:   }  
    | 30: }  
    
[/code]

#### `ServiceConfig.**maxPageSize**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum number of elements that can be requested from a paginated connection. A request to fetch more elements will result in an error.

Accepts `type` and `field` arguments which identify the connection that is being queried. If the field in question is paginated, its max page size is returned. If it does not exist or is not paginated, `null` is returned.

##### `ServiceConfig.maxPageSize.**type**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

##### `ServiceConfig.maxPageSize.**field**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `ServiceConfig.**maxQueryDepth**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum depth of a GraphQL query that can be accepted by this service.

#### `ServiceConfig.**maxQueryNodes**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

The maximum number of nodes (field names) the service will accept in a single query.

#### `ServiceConfig.**maxQueryPayloadSize**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum size in bytes of a single GraphQL request, excluding the elements covered by `maxTransactionPayloadSize`.

#### `ServiceConfig.**maxRichQueries**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum number of paginated fields that can return results in a single request. Queries on paginated fields that exceed this limit will return an error.

#### `ServiceConfig.**maxTransactionPayloadSize**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum size in bytes allowed for the `txBytes` and `signatures` parameters of an `executeTransaction` or `simulateTransaction` field, or the `bytes` and `signature` parameters of a `verifyZkLoginSignature` field.

This is cumulative across all matching fields in a single GraphQL request.

#### `ServiceConfig.**maxTypeArgumentDepth**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum amount of nesting among type arguments (type arguments nest when a type argument is itself generic and has arguments).

#### `ServiceConfig.**maxTypeArgumentWidth**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum number of type parameters a type can have.

#### `ServiceConfig.**maxTypeNodes**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum number of datatypes that need to be processed when calculating the layout of a single type.

#### `ServiceConfig.**mutationTimeoutMs**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum time in milliseconds spent waiting for a response from fullnode after issuing a transaction to execute. Note that the transaction may still succeed even in the case of a timeout. Transactions are idempotent, so a transaction that times out should be re-submitted until the network returns a definite response (success or failure, not timeout).

#### `ServiceConfig.**queryTimeoutMs**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Maximum time in milliseconds that will be spent to serve one query request.

### Returned By​

[`serviceConfig`](</references/sui-api/sui-graphql/beta/reference/operations/queries/service-config>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/service-config.mdx>)
