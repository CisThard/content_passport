<!-- Source: https://docs.sui.io/references/framework/sui_sui/versioned -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * versioned


# Module sui::versioned
[code]
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    
[/code]

## Struct Versioned​

A wrapper type that supports versioning of the inner type.  
The inner type is a dynamic field of the Versioned object, and is keyed using version.  
User of this type could load the inner object using corresponding type based on the version.  
You can also upgrade the inner object to a new type version.  
If you want to support lazy upgrade of the inner type, one caveat is that all APIs would have to use mutable reference even if it's a read-only API.
[code] 
    **public** **struct** [Versioned](</references/framework/sui_sui/versioned#sui_versioned_Versioned>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[version](</references/framework/sui_sui/versioned#sui_versioned_version>): u64
    

## Struct VersionChangeCap​

Represents a hot potato object generated when we take out the dynamic field.  
This is to make sure that we always put a new value back.
[code] 
    **public** **struct** [VersionChangeCap](</references/framework/sui_sui/versioned#sui_versioned_VersionChangeCap>)
    
[/code]

Click to openFields

versioned_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
old_version: u64
    

## Constants​

Failed to upgrade the inner object due to invalid capability or new version.
[code] 
    **const** [EInvalidUpgrade](</references/framework/sui_sui/versioned#sui_versioned_EInvalidUpgrade>): u64 = 0;
    
[/code]

## Function create​

Create a new Versioned object that contains a initial value of type T with an initial version.
[code] 
    **public** **fun** [create](</references/framework/sui_sui/versioned#sui_versioned_create>)<T: store>(init_version: u64, init_value: T, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::versioned::Versioned](</references/framework/sui_sui/versioned#sui_versioned_Versioned>)
    
[/code]

## Function version​

Get the current version of the inner type.
[code] 
    **public** **fun** [version](</references/framework/sui_sui/versioned#sui_versioned_version>)(self: &[sui::versioned::Versioned](</references/framework/sui_sui/versioned#sui_versioned_Versioned>)): u64
    
[/code]

## Function load_value​

Load the inner value based on the current version. Caller specifies an expected type T.  
If the type mismatch, the load will fail.
[code] 
    **public** **fun** [load_value](</references/framework/sui_sui/versioned#sui_versioned_load_value>)<T: store>(self: &[sui::versioned::Versioned](</references/framework/sui_sui/versioned#sui_versioned_Versioned>)): &T
    
[/code]

## Function load_value_mut​

Similar to load_value, but return a mutable reference.
[code] 
    **public** **fun** [load_value_mut](</references/framework/sui_sui/versioned#sui_versioned_load_value_mut>)<T: store>(self: &**mut** [sui::versioned::Versioned](</references/framework/sui_sui/versioned#sui_versioned_Versioned>)): &**mut** T
    
[/code]

## Function remove_value_for_upgrade​

Take the inner object out for upgrade. To ensure we always upgrade properly, a capability object is returned and must be used when we upgrade.
[code] 
    **public** **fun** [remove_value_for_upgrade](</references/framework/sui_sui/versioned#sui_versioned_remove_value_for_upgrade>)<T: store>(self: &**mut** [sui::versioned::Versioned](</references/framework/sui_sui/versioned#sui_versioned_Versioned>)): (T, [sui::versioned::VersionChangeCap](</references/framework/sui_sui/versioned#sui_versioned_VersionChangeCap>))
    
[/code]

## Function upgrade​

Upgrade the inner object with a new version and new value. Must use the capability returned by calling remove_value_for_upgrade.
[code] 
    **public** **fun** [upgrade](</references/framework/sui_sui/versioned#sui_versioned_upgrade>)<T: store>(self: &**mut** [sui::versioned::Versioned](</references/framework/sui_sui/versioned#sui_versioned_Versioned>), new_version: u64, new_value: T, cap: [sui::versioned::VersionChangeCap](</references/framework/sui_sui/versioned#sui_versioned_VersionChangeCap>))
    
[/code]

## Function destroy​

Destroy this Versioned container, and return the inner object.
[code] 
    **public** **fun** [destroy](</references/framework/sui_sui/versioned#sui_versioned_destroy>)<T: store>(self: [sui::versioned::Versioned](</references/framework/sui_sui/versioned#sui_versioned_Versioned>)): T
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/versioned.md>)

[Previousvec_set](</references/framework/sui_sui/vec_set>)[Nextzklogin_verified_id](</references/framework/sui_sui/zklogin_verified_id>)
