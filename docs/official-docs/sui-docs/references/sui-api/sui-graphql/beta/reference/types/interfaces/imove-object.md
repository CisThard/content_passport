<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-object -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Interfaces
  * IMoveObject


# IMoveObject

Interface implemented by types that represent a Move object on-chain (A Move value whose type has `key`).
[code] 
    interface IMoveObject {  
      contents: MoveValue  
      dynamicField(  
        name: DynamicFieldName!  
      ): DynamicField  
      dynamicFields(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): DynamicFieldConnection  
      dynamicObjectField(  
        name: DynamicFieldName!  
      ): DynamicField  
      hasPublicTransfer: Boolean  
      moveObjectBcs: Base64  
      multiGetDynamicFields(  
        keys: [DynamicFieldName!]!  
      ): [DynamicField]!  
      multiGetDynamicObjectFields(  
        keys: [DynamicFieldName!]!  
      ): [DynamicField]!  
    }  
    
[/code]

### Fields​

#### `IMoveObject.**contents**` ● [`**MoveValue**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-value>) object​

The structured representation of the object's contents.

#### `IMoveObject.**dynamicField**` ● [`**DynamicField**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object​

Access a dynamic field on an object using its type and BCS-encoded name.

Returns `null` if a dynamic field with that name could not be found attached to this object.

##### `IMoveObject.dynamicField.**name**` ● [`**DynamicFieldName!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `IMoveObject.**dynamicFields**` ● [`**DynamicFieldConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field-connection>) object​

Dynamic fields and dynamic object fields owned by this object.

Dynamic fields on wrapped objects can be accessed using `Address.dynamicFields`.

##### `IMoveObject.dynamicFields.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `IMoveObject.dynamicFields.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `IMoveObject.dynamicFields.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `IMoveObject.dynamicFields.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `IMoveObject.**dynamicObjectField**` ● [`**DynamicField**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object​

Access a dynamic object field on an object using its type and BCS-encoded name.

Returns `null` if a dynamic object field with that name could not be found attached to this object.

##### `IMoveObject.dynamicObjectField.**name**` ● [`**DynamicFieldName!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `IMoveObject.**hasPublicTransfer**` ● [`**Boolean**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/boolean>) scalar​

Whether this object can be transfered using the `TransferObjects` Programmable Transaction Command or `sui::transfer::public_transfer`.

Both these operations require the object to have both the `key` and `store` abilities.

#### `IMoveObject.**moveObjectBcs**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

The Base64-encoded BCS serialize of this object, as a `MoveObject`.

#### `IMoveObject.**multiGetDynamicFields**` ● [`**[DynamicField]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) non-null object​

Access dynamic fields on an object using their types and BCS-encoded names.

Returns a list of dynamic fields that is guaranteed to be the same length as `keys`. If a dynamic field in `keys` could not be found in the store, its corresponding entry in the result will be `null`.

##### `IMoveObject.multiGetDynamicFields.**keys**` ● [`**[DynamicFieldName!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

#### `IMoveObject.**multiGetDynamicObjectFields**` ● [`**[DynamicField]!**`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) non-null object​

Access dynamic object fields on an object using their types and BCS-encoded names.

Returns a list of dynamic object fields that is guaranteed to be the same length as `keys`. If a dynamic object field in `keys` could not be found in the store, its corresponding entry in the result will be `null`.

##### `IMoveObject.multiGetDynamicObjectFields.**keys**` ● [`**[DynamicFieldName!]!**`](</references/sui-api/sui-graphql/beta/reference/types/inputs/dynamic-field-name>) non-null input​

### Implemented By​

[`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-object.mdx>)
