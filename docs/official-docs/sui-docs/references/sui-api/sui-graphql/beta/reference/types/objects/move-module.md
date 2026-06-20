<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/move-module -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MoveModule


# MoveModule

Modules are a unit of code organization in Move.

Modules belong to packages, and contain type and function definitions.
[code] 
    type MoveModule {  
      bytes: Base64  
      datatype(  
        name: String!  
      ): MoveDatatype  
      datatypes(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): MoveDatatypeConnection  
      disassembly: String  
      enum(  
        name: String!  
      ): MoveEnum  
      enums(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): MoveEnumConnection  
      fileFormatVersion: Int  
      friends(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): MoveModuleConnection  
      fullyQualifiedName: String!  
      function(  
        name: String!  
      ): MoveFunction  
      functions(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): MoveFunctionConnection  
      name: String!  
      package: MovePackage  
      struct(  
        name: String!  
      ): MoveStruct  
      structs(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): MoveStructConnection  
    }  
    
[/code]

### Fields​

#### `MoveModule.**bytes**` ● [`**Base64**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/base-64>) scalar​

Base64 encoded bytes of the serialized CompiledModule.

#### `MoveModule.**datatype**` ● [`**MoveDatatype**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype>) object​

The datatype (struct or enum) named `name` in this module.

##### `MoveModule.datatype.**name**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `MoveModule.**datatypes**` ● [`**MoveDatatypeConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype-connection>) object​

Paginate through this module's datatype definitions.

##### `MoveModule.datatypes.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveModule.datatypes.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveModule.datatypes.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveModule.datatypes.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `MoveModule.**disassembly**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

Textual representation of the module's bytecode.

#### `MoveModule.**enum**` ● [`**MoveEnum**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum>) object​

The enum named `name` in this module.

##### `MoveModule.enum.**name**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `MoveModule.**enums**` ● [`**MoveEnumConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum-connection>) object​

Paginate through this module's enum definitions.

##### `MoveModule.enums.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveModule.enums.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveModule.enums.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveModule.enums.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `MoveModule.**fileFormatVersion**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

Bytecode format version.

#### `MoveModule.**friends**` ● [`**MoveModuleConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module-connection>) object​

Modules that this module considers friends. These modules can call `public(package)` functions in this module.

##### `MoveModule.friends.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveModule.friends.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveModule.friends.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveModule.friends.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `MoveModule.**fullyQualifiedName**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The module's fully-qualified name, including its package address.

#### `MoveModule.**function**` ● [`**MoveFunction**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function>) object​

The function named `name` in this module.

##### `MoveModule.function.**name**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `MoveModule.**functions**` ● [`**MoveFunctionConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function-connection>) object​

Paginate through this module's function definitions.

##### `MoveModule.functions.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveModule.functions.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveModule.functions.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveModule.functions.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `MoveModule.**name**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

The module's unqualified name.

#### `MoveModule.**package**` ● [`**MovePackage**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object​

The package that this module was defined in.

#### `MoveModule.**struct**` ● [`**MoveStruct**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct>) object​

The struct named `name` in this module.

##### `MoveModule.struct.**name**` ● [`**String!**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) non-null scalar​

#### `MoveModule.**structs**` ● [`**MoveStructConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct-connection>) object​

Paginate through this module's struct definitions.

##### `MoveModule.structs.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveModule.structs.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `MoveModule.structs.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `MoveModule.structs.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

### Member Of​

[`Event`](</references/sui-api/sui-graphql/beta/reference/types/objects/event>) object ● [`ExecutionError`](</references/sui-api/sui-graphql/beta/reference/types/objects/execution-error>) object ● [`IMoveDatatype`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/imove-datatype>) interface ● [`MoveDatatype`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-datatype>) object ● [`MoveEnum`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-enum>) object ● [`MoveFunction`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-function>) object ● [`MoveModuleConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module-connection>) object ● [`MoveModuleEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-module-edge>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object ● [`MoveStruct`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-struct>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/move-module.mdx>)
