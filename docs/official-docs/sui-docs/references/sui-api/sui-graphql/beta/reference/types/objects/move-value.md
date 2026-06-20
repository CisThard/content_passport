<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-value -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveValue


# MoveValue
[code]
    type MoveValue {  
      asAddress: Address  
      asVector(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): MoveValueConnection  
      bcs: Base64  
      display: Display  
      extract(  
        path: String!  
      ): MoveValue  
      format(  
        format: String!  
      ): JSON  
      json: JSON  
      type: MoveType  
    }  
    
[/code]

### Fields​

#### `MoveValue.**asAddress**` ● [`**Address**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address>) object​

Attempts to treat this value as an `Address`.

If the value is of type `address` or `0x2::object::ID`, it is interpreted as an address pointer, and it is scoped to the current checkpoint.

If the value is of type `0x2::object::UID`, it is interpreted as a wrapped object whose version is bounded by the root version of the current value. Such values do not support nested owned object queries, but `Address.addressAt` can be used to re-scope it to a checkpoint (defaults to the current checkpoint), instead of a root version, allowing owned object queries.

Values of other types cannot be interpreted as addresses, and `null` is returned.

#### `MoveValue.**asVector**` ● [`**MoveValueConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value-connection>) object​

Attempts to treat this value as a `vector<T>` and paginate over its elements.

Values of other types cannot be interpreted as vectors, and `null` is returned.

##### `MoveValue.asVector.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveValue.asVector.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveValue.asVector.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveValue.asVector.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `MoveValue.**bcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The BCS representation of this value, Base64-encoded.

#### `MoveValue.**display**` ● [`**Display**`](</references/sui-api/sui-graphql/beta/reference/types/objects/display>) object​

A rendered JSON blob based on an on-chain template, substituted with data from this value.

Returns `null` if the value's type does not have an associated `Display` template.

#### `MoveValue.**extract**` ● [`**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

Extract a nested value at the given path.

`path` is a Display v2 'chain' expression, allowing access to nested, named and positional fields, vector indices, VecMap keys, and dynamic (object) field accesses.

##### `MoveValue.extract.**path**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `MoveValue.**format**` ● [`**JSON**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/json>) scalar​

Render a single Display v2 format string against this value.

Returns `null` if the value does not have a valid type, or if any of the expressions in the format string fail to evaluate (e.g. field does not exist).

##### `MoveValue.format.**format**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `MoveValue.**json**` ● [`**JSON**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/json>) scalar​

Representation of a Move value in JSON, where:

  * Addresses, IDs, and UIDs are represented in canonical form, as JSON strings.
  * Bools are represented by JSON boolean literals.
  * u8, u16, and u32 are represented as JSON numbers.
  * u64, u128, and u256 are represented as JSON strings.
  * Balances, Strings, and Urls are represented as JSON strings.
  * Vectors of bytes are represented as Base64 blobs, and other vectors are represented by JSON arrays.
  * Structs are represented by JSON objects.
  * Enums are represented by JSON objects, with a field named `@variant` containing the variant name.
  * Empty optional values are represented by `null`.


#### `MoveValue.**type**` ● [`**MoveType**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-type>) object​

The value's type.

### Member Of​

[`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`CommandOutput`](</references/sui-api/sui-graphql/beta/reference/types/objects/command-output>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`Epoch`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object ● [`Event`](</references/sui-api/sui-graphql/beta/reference/types/objects/event>) object ● [`IMoveObject`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-object>) interface ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`MoveValue`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object ● [`MoveValueConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value-connection>) object ● [`MoveValueEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value-edge>) object ● [`NameRecord`](</references/sui-api/sui-graphql/beta/reference/types/objects/name-record>) object ● [`Validator`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator>) object ● [`ValidatorSet`](</references/sui-api/sui-graphql/beta/reference/types/objects/validator-set>) object

### Implemented By​

[`DynamicFieldValue`](</references/sui-api/sui-graphql/beta/reference/types/unions/dynamic-field-value>) union ● [`TransactionInput`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-input>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-value.mdx>)
