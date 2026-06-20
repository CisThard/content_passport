<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-objects -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * multiGetObjects


# multiGetObjects

Fetch objects by their keys.

Returns a list of objects that is guaranteed to be the same length as `keys`. If an object in `keys` could not be found in the store, its corresponding entry in the result will be `null`. This could be because the object never existed, or because it was pruned.
[code] 
    multiGetObjects(  
      keys: [ObjectKey!]!  
    ): [Object]!  
    
[/code]

### Arguments​

#### `multiGetObjects.**keys**` ● [`**[ObjectKey!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/object-key>) non-null input​

### Type​

#### [`**Object**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object​

An Object on Sui is either a typed value (a Move Object) or a Package (modules containing functions and types).

Every object on Sui is identified by a unique address, and has a version number that increases with every modification. Objects also hold metadata detailing their current owner (who can sign for access to the object and whether that access can modify and/or delete the object), and the digest of the last transaction that modified the object.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/multi-get-objects.mdx>)
