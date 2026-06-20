<!-- Source: https://docs.sui.io/references/framework/sui_sui/derived_object -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * derived_object


# Module sui::derived_object

Enables the creation of objects with deterministic addresses derived from a parent object's UID.  
This module provides a way to generate objects with predictable addresses based on a parent UID and a key, creating a namespace that ensures uniqueness for each parent-key combination, which is usually how registries are built.

Key features:

  * Deterministic address generation based on parent object UID and key
  * Derived objects can exist and operate independently of their parent


The derived UIDs, once created, are independent and do not require sequencing on the parent object. They can be used without affecting the parent. The parent only maintains a record of which derived addresses have been claimed to prevent duplicates.
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

## Struct Claimed​

Added as a DF to the parent's UID, to mark an ID as claimed.
[code] 
    **public** **struct** [Claimed](</references/framework/sui_sui/derived_object#sui_derived_object_Claimed>) **has** **copy** , drop, store
    
[/code]

Click to openFields

0: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Struct DerivedObjectKey​

An internal key to protect from generating the same UID twice (e.g. collide with DFs)
[code] 
    **public** **struct** [DerivedObjectKey](</references/framework/sui_sui/derived_object#sui_derived_object_DerivedObjectKey>)<K: **copy** , drop, store> **has** **copy** , drop, store
    
[/code]

Click to openFields

0: K
    

## Enum ClaimedStatus​

The possible values of a claimed UID.  
We make it an enum to make upgradeability easier in the future.
[code] 
    **public** **enum** [ClaimedStatus](</references/framework/sui_sui/derived_object#sui_derived_object_ClaimedStatus>) **has** store
    
[/code]

Click to openVariants

Variant Reserved
     The UID has been claimed and cannot be re-claimed or used. 

## Constants​

Tries to create an object twice with the same parent-key combination.
[code] 
    #[error]
    **const** [EObjectAlreadyExists](</references/framework/sui_sui/derived_object#sui_derived_object_EObjectAlreadyExists>): vector<u8> = b"Derived [object](</references/framework/sui_sui/object#sui_object>) is already claimed.";
    
[/code]

## Function claim​

Claim a deterministic UID, using the parent's UID & any key.
[code] 
    **public** **fun** [claim](</references/framework/sui_sui/derived_object#sui_derived_object_claim>)<K: **copy** , drop, store>(parent: &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), key: K): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function exists​

Checks if a provided key has been claimed for the given parent.  
Note: If the UID has been deleted through [object::delete](</references/framework/sui_sui/object#sui_object_delete>), this will always return true.
[code] 
    **public** **fun** [exists](</references/framework/sui_sui/derived_object#sui_derived_object_exists>)<K: **copy** , drop, store>(parent: &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), key: K): bool
    
[/code]

## Function derive_address​

Given an ID and a Key, it calculates the derived address.
[code] 
    **public** **fun** [derive_address](</references/framework/sui_sui/derived_object#sui_derived_object_derive_address>)<K: **copy** , drop, store>(parent: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>), key: K): **address**
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/derived_object.md>)

[Previousdeny_list](</references/framework/sui_sui/deny_list>)[Nextdisplay](</references/framework/sui_sui/display>)
