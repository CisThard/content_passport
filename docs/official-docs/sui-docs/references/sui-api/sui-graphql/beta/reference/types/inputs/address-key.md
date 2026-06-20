<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/inputs/address-key -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Inputs
  * AddressKey


# AddressKey

Identifies a specific version of an address.

Exactly one of `address` or `name` must be specified. Additionally, at most one of `rootVersion` or `atCheckpoint` can be specified. If neither bound is provided, the address is fetched at the checkpoint being viewed.

See `Query.address` for more details.
[code] 
    input AddressKey {  
      address: SuiAddress  
      atCheckpoint: UInt53  
      name: String  
      rootVersion: UInt53  
    }  
    
[/code]

### Fields​

#### `AddressKey.**address**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

The address.

#### `AddressKey.**atCheckpoint**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

If specified, sets a checkpoint bound for this address.

#### `AddressKey.**name**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

A SuiNS name to resolve to an address.

#### `AddressKey.**rootVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

If specified, sets a root version bound for this address.

### Member Of​

[`multiGetAddresses`](</references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-addresses>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/inputs/address-key.mdx>)
