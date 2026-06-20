<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/name-record -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * nameRecord


# nameRecord

Look-up a Name Service NameRecord by its domain name.

Returns `null` if the record does not exist or has expired.
[code] 
    nameRecord(  
      name: String!  
    ): NameRecord  
    
[/code]

### Arguments​

#### `nameRecord.**name**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

### Type​

#### [`**NameRecord**`](</references/sui-api/sui-graphql/beta/reference/types/objects/name-record>) object​

A Name Service NameRecord representing a domain name registration.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/name-record.mdx>)
