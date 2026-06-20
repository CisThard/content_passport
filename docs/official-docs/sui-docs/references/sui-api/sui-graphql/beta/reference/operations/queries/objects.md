<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/operations/queries/objects -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Operations
  * Queries
  * objects


# objects

Paginate objects in the live object set, optionally filtered by owner and/or type. `filter` can be one of:

  * A filter on type (all live objects whose type matches that filter).
  * Fetching all objects owned by an address or object, optionally filtered by type.
  * Fetching all shared or immutable objects, filtered by type.


[code] 
    objects(  
      first: Int  
      after: String  
      last: Int  
      before: String  
      filter: ObjectFilter!  
    ): ObjectConnection  
    
[/code]

### Arguments​

#### `objects.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `objects.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `objects.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

#### `objects.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `objects.**filter**` ● [`**ObjectFilter!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/object-filter>) non-null input​

### Type​

#### [`**ObjectConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-connection>) object​

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/operations/queries/objects.mdx>)
