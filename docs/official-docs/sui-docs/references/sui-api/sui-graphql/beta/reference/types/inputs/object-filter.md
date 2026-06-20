<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/inputs/object-filter -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Inputs
  * ObjectFilter


# ObjectFilter

A filter over the live object set, the filter can be one of:

  * A filter on type (all live objects whose type matches that filter).
  * Fetching all objects owned by an address or object, optionally filtered by type.
  * Fetching all shared or immutable objects, filtered by type.


[code] 
    input ObjectFilter {  
      owner: SuiAddress  
      ownerKind: OwnerKind  
      type: String  
    }  
    
[/code]

### Fields​

#### `ObjectFilter.**owner**` ● [`**SuiAddress**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/sui-address>) scalar​

Specifies the address of the owning address or object.

This field is required if `ownerKind` is "ADDRESS" or "OBJECT". If provided without `ownerKind`, `ownerKind` defaults to "ADDRESS".

#### `ObjectFilter.**ownerKind**` ● [`**OwnerKind**`](</references/sui-api/sui-graphql/beta/reference/types/enums/owner-kind>) enum​

Filter on whether the object is address-owned, object-owned, shared, or immutable.

  * If this field is set to "ADDRESS" or "OBJECT", then an owner filter must also be provided.
  * If this field is set to "SHARED" or "IMMUTABLE", then a type filter must also be provided.


#### `ObjectFilter.**type**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Filter on the object's type.

The filter can be one of:

  * A package address: `0x2`,
  * A module: `0x2::coin`,
  * A fully-qualified name: `0x2::coin::Coin`,
  * A type instantiation: `0x2::coin::Coin<0x2::sui::SUI>`.


### Member Of​

[`objects`](</references/sui-api/sui-graphql/beta/reference/operations/queries/objects>) query

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/inputs/object-filter.mdx>)
