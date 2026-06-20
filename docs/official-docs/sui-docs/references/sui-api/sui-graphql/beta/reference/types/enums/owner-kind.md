<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/enums/owner-kind -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Enums
  * OwnerKind


# OwnerKind

Filter on who owns an object.
[code] 
    enum OwnerKind {  
      ADDRESS  
      OBJECT  
      SHARED  
      IMMUTABLE  
    }  
    
[/code]

### Values​

#### `OwnerKind.**ADDRESS**`​

Object is owned by an address.

#### `OwnerKind.**OBJECT**`​

Object is a child of another object (e.g. a dynamic field or dynamic object field).

#### `OwnerKind.**SHARED**`​

Object is shared among multiple owners.

#### `OwnerKind.**IMMUTABLE**`​

Object is frozen.

### Member Of​

[`ObjectFilter`](</references/sui-api/sui-graphql/beta/reference/types/inputs/object-filter>) input

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/enums/owner-kind.mdx>)
