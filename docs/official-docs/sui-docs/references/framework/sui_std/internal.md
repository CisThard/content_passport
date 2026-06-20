<!-- Source: https://docs.sui.io/references/framework/sui_std/internal -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [std](</references/framework/sui_std>)
  * internal


# Module std::internal

Defines the [Permit](</references/framework/sui_std/internal#std_internal_Permit>) type, which can be used to constrain the logic of a generic function to be authorized only by the module that defines the type parameter.
[code] 
    module example::use_permit;  
      
    public struct MyType \{ /* ... */ \}  
      
    public fun test_permit() \{  
       let permit = internal::permit<MyType>();  
       /* external_module::call_with_permit(permit); */  
    \}  
    
[/code]

To write a function that is guarded by a [Permit](</references/framework/sui_std/internal#std_internal_Permit>), require it as an argument.
[code] 
    // Silly mockup of a type registry where a type can be registered only by  
    // the module that defines the type.  
    module example::type_registry;  
      
    public fun register_type<T>(_: internal::Permit<T> /* ... */) {  
      /* ... */  
    }  
    
[/code]

## Struct Permit​

A privileged witness of the T type.  
Instances can only be created by the module that defines the type T.
[code] 
    **public** **struct** [Permit](</references/framework/sui_std/internal#std_internal_Permit>)<**phantom** T> **has** drop
    
[/code]

## Function permit​

Construct a new [Permit](</references/framework/sui_std/internal#std_internal_Permit>) for the type T.  
Can only be called by the module that defines the type T.
[code] 
    **public** **fun** [permit](</references/framework/sui_std/internal#std_internal_permit>)<T>(): [std::internal::Permit](</references/framework/sui_std/internal#std_internal_Permit>)<T>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_std/internal.md>)

[Previoushash](</references/framework/sui_std/hash>)[Nextmacros](</references/framework/sui_std/macros>)
