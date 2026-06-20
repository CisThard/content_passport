<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-addresses -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * multiGetAddresses


# multiGetAddresses

Fetch addresses by their keys.

Returns a list of addresses that is guaranteed to be the same length as `keys`. If an address in `keys` is fetched by name and the name does not resolve to an address, its corresponding entry in the result will be `null`.
[code] 
    multiGetAddresses(  
      keys: [AddressKey!]!  
    ): [Address]!  
    
[/code]

### Arguments​

#### `multiGetAddresses.**keys**` ● [`**[AddressKey!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/address-key>) non-null input​

### Type​

#### [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-addresses.mdx>)
