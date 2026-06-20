<!-- Source: https://docs.sui.io/references/framework/sui_sui/object -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * object


# Module sui::object

Sui object identifiers
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    
[/code]

## Struct ID​

An object ID. This is used to reference Sui Objects.  
This is _not_ guaranteed to be globally unique--anyone can create an [ID](</references/framework/sui_sui/object#sui_object_ID>) from a [UID](</references/framework/sui_sui/object#sui_object_UID>) or from an object, and ID's can be freely copied and dropped.  
Here, the values are not globally unique because there can be multiple values of type [ID](</references/framework/sui_sui/object#sui_object_ID>) with the same underlying bytes. For example, [object::id](</references/framework/sui_sui/object#sui_object_id>)(&obj) can be called as many times as you want for a given obj, and each [ID](</references/framework/sui_sui/object#sui_object_ID>) value will be identical.
[code] 
    **public** **struct** [ID](</references/framework/sui_sui/object#sui_object_ID>) **has** **copy** , drop, store
    
[/code]

Click to openFields

bytes: **address**
    

## Struct UID​

Globally unique IDs that define an object's ID in storage. Any Sui Object, that is a struct with the key ability, must have [id](</references/framework/sui_sui/object#sui_object_id>): [UID](</references/framework/sui_sui/object#sui_object_UID>) as its first field.  
These are globally unique in the sense that no two values of type [UID](</references/framework/sui_sui/object#sui_object_UID>) are ever equal, in other words for any two values id1: [UID](</references/framework/sui_sui/object#sui_object_UID>) and id2: [UID](</references/framework/sui_sui/object#sui_object_UID>), id1!= id2.  
This is a privileged type that can only be derived from a TxContext. [UID](</references/framework/sui_sui/object#sui_object_UID>) doesn't have the drop ability, so deleting a [UID](</references/framework/sui_sui/object#sui_object_UID>) requires a call to [delete](</references/framework/sui_sui/object#sui_object_delete>).
[code] 
    **public** **struct** [UID](</references/framework/sui_sui/object#sui_object_UID>) **has** store
    
[/code]

Click to openFields

[id](</references/framework/sui_sui/object#sui_object_id>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Constants​

The hardcoded ID for the singleton Sui System State Object.
[code] 
    **const** [SUI_SYSTEM_STATE_OBJECT_ID](</references/framework/sui_sui/object#sui_object_SUI_SYSTEM_STATE_OBJECT_ID>): **address** = 0x5;
    
[/code]

The hardcoded ID for the singleton Clock Object.
[code] 
    **const** [SUI_CLOCK_OBJECT_ID](</references/framework/sui_sui/object#sui_object_SUI_CLOCK_OBJECT_ID>): **address** = 0x6;
    
[/code]

The hardcoded ID for the singleton AuthenticatorState Object.
[code] 
    **const** [SUI_AUTHENTICATOR_STATE_ID](</references/framework/sui_sui/object#sui_object_SUI_AUTHENTICATOR_STATE_ID>): **address** = 0x7;
    
[/code]

The hardcoded ID for the singleton Random Object.
[code] 
    **const** [SUI_RANDOM_ID](</references/framework/sui_sui/object#sui_object_SUI_RANDOM_ID>): **address** = 0x8;
    
[/code]

The hardcoded ID for the singleton DenyList.
[code] 
    **const** [SUI_DENY_LIST_OBJECT_ID](</references/framework/sui_sui/object#sui_object_SUI_DENY_LIST_OBJECT_ID>): **address** = 0x403;
    
[/code]

The hardcoded ID for the singleton AccumulatorRoot Object.
[code] 
    **const** [SUI_ACCUMULATOR_ROOT_OBJECT_ID](</references/framework/sui_sui/object#sui_object_SUI_ACCUMULATOR_ROOT_OBJECT_ID>): **address** = 0xacc;
    
[/code]

The hardcoded ID for the Bridge Object.
[code] 
    **const** [SUI_BRIDGE_ID](</references/framework/sui_sui/object#sui_object_SUI_BRIDGE_ID>): **address** = 0x9;
    
[/code]

The hardcoded ID for the Coin Registry Object.
[code] 
    **const** [SUI_COIN_REGISTRY_OBJECT_ID](</references/framework/sui_sui/object#sui_object_SUI_COIN_REGISTRY_OBJECT_ID>): **address** = 0xc;
    
[/code]

The hardcoded ID for the Display Registry Object.
[code] 
    **const** [SUI_DISPLAY_REGISTRY_OBJECT_ID](</references/framework/sui_sui/object#sui_object_SUI_DISPLAY_REGISTRY_OBJECT_ID>): **address** = 0xd;
    
[/code]

The hardcoded ID for the AddressAliasState Object.
[code] 
    **const** [SUI_ADDRESS_ALIAS_STATE_ID](</references/framework/sui_sui/object#sui_object_SUI_ADDRESS_ALIAS_STATE_ID>): **address** = 0xa;
    
[/code]

Sender is not @0x0 the system address.
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_sui/object#sui_object_ENotSystemAddress>): u64 = 0;
    
[/code]

## Function id_to_bytes​

Get the raw bytes of a [ID](</references/framework/sui_sui/object#sui_object_ID>)
[code] 
    **public** **fun** [id_to_bytes](</references/framework/sui_sui/object#sui_object_id_to_bytes>)([id](</references/framework/sui_sui/object#sui_object_id>): &[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): vector<u8>
    
[/code]

## Function id_to_address​

Get the inner bytes of [id](</references/framework/sui_sui/object#sui_object_id>) as an address.
[code] 
    **public** **fun** [id_to_address](</references/framework/sui_sui/object#sui_object_id_to_address>)([id](</references/framework/sui_sui/object#sui_object_id>): &[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): **address**
    
[/code]

## Function id_from_bytes​

Make an [ID](</references/framework/sui_sui/object#sui_object_ID>) from raw bytes.
[code] 
    **public** **fun** [id_from_bytes](</references/framework/sui_sui/object#sui_object_id_from_bytes>)(bytes: vector<u8>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function id_from_address​

Make an [ID](</references/framework/sui_sui/object#sui_object_ID>) from an address.
[code] 
    **public** **fun** [id_from_address](</references/framework/sui_sui/object#sui_object_id_from_address>)(bytes: **address**): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function sui_system_state​

Create the [UID](</references/framework/sui_sui/object#sui_object_UID>) for the singleton SuiSystemState object.  
This should only be called once from sui_system.
[code] 
    **fun** [sui_system_state](</references/framework/sui_sui/object#sui_object_sui_system_state>)(ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function clock​

Create the [UID](</references/framework/sui_sui/object#sui_object_UID>) for the singleton Clock object.  
This should only be called once from [clock](</references/framework/sui_sui/clock#sui_clock>).
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [clock](</references/framework/sui_sui/clock#sui_clock>)(): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function authenticator_state​

Create the [UID](</references/framework/sui_sui/object#sui_object_UID>) for the singleton AuthenticatorState object.  
This should only be called once from [authenticator_state](</references/framework/sui_sui/authenticator_state#sui_authenticator_state>).
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [authenticator_state](</references/framework/sui_sui/authenticator_state#sui_authenticator_state>)(): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function randomness_state​

Create the [UID](</references/framework/sui_sui/object#sui_object_UID>) for the singleton Random object.  
This should only be called once from [random](</references/framework/sui_sui/random#sui_random>).
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [randomness_state](</references/framework/sui_sui/object#sui_object_randomness_state>)(): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function sui_deny_list_object_id​

Create the [UID](</references/framework/sui_sui/object#sui_object_UID>) for the singleton DenyList object.  
This should only be called once from [deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>).
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [sui_deny_list_object_id](</references/framework/sui_sui/object#sui_object_sui_deny_list_object_id>)(): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function sui_accumulator_root_object_id​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [sui_accumulator_root_object_id](</references/framework/sui_sui/object#sui_object_sui_accumulator_root_object_id>)(): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function sui_accumulator_root_address​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [sui_accumulator_root_address](</references/framework/sui_sui/object#sui_object_sui_accumulator_root_address>)(): **address**
    
[/code]

## Function sui_coin_registry_object_id​

Create the [UID](</references/framework/sui_sui/object#sui_object_UID>) for the singleton CoinRegistry object.  
This should only be called once from [coin_registry](</references/framework/sui_sui/coin_registry#sui_coin_registry>).
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [sui_coin_registry_object_id](</references/framework/sui_sui/object#sui_object_sui_coin_registry_object_id>)(): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function sui_coin_registry_address​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [sui_coin_registry_address](</references/framework/sui_sui/object#sui_object_sui_coin_registry_address>)(): **address**
    
[/code]

## Function sui_display_registry_object_id​

Create the [UID](</references/framework/sui_sui/object#sui_object_UID>) for the singleton DisplayRegistry object.  
This should only be called once from [display_registry](</references/framework/sui_sui/display_registry#sui_display_registry>).
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [sui_display_registry_object_id](</references/framework/sui_sui/object#sui_object_sui_display_registry_object_id>)(): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function sui_display_registry_address​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [sui_display_registry_address](</references/framework/sui_sui/object#sui_object_sui_display_registry_address>)(): **address**
    
[/code]

## Function bridge​

Create the [UID](</references/framework/sui_sui/object#sui_object_UID>) for the singleton Bridge object.  
This should only be called once from [bridge](</references/framework/sui_sui/object#sui_object_bridge>).
[code] 
    **fun** [bridge](</references/framework/sui_sui/object#sui_object_bridge>)(): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function address_alias_state​

Create the [UID](</references/framework/sui_sui/object#sui_object_UID>) for the singleton AddressAliasState object.  
This should only be called once from [address_alias](</references/framework/sui_sui/address_alias#sui_address_alias>).
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [address_alias_state](</references/framework/sui_sui/object#sui_object_address_alias_state>)(): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function uid_as_inner​

Get the inner [ID](</references/framework/sui_sui/object#sui_object_ID>) of uid
[code] 
    **public** **fun** [uid_as_inner](</references/framework/sui_sui/object#sui_object_uid_as_inner>)(uid: &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)): &[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function uid_to_inner​

Get the raw bytes of a uid's inner [ID](</references/framework/sui_sui/object#sui_object_ID>)
[code] 
    **public** **fun** [uid_to_inner](</references/framework/sui_sui/object#sui_object_uid_to_inner>)(uid: &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function uid_to_bytes​

Get the raw bytes of a [UID](</references/framework/sui_sui/object#sui_object_UID>)
[code] 
    **public** **fun** [uid_to_bytes](</references/framework/sui_sui/object#sui_object_uid_to_bytes>)(uid: &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)): vector<u8>
    
[/code]

## Function uid_to_address​

Get the inner bytes of [id](</references/framework/sui_sui/object#sui_object_id>) as an address.
[code] 
    **public** **fun** [uid_to_address](</references/framework/sui_sui/object#sui_object_uid_to_address>)(uid: &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)): **address**
    
[/code]

## Function new​

Create a new object. Returns the [UID](</references/framework/sui_sui/object#sui_object_UID>) that must be stored in a Sui object.  
This is the only way to create [UID](</references/framework/sui_sui/object#sui_object_UID>)s.
[code] 
    **public** **fun** [new](</references/framework/sui_sui/object#sui_object_new>)(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function delete​

Delete the object and its [UID](</references/framework/sui_sui/object#sui_object_UID>). This is the only way to eliminate a [UID](</references/framework/sui_sui/object#sui_object_UID>).  
This exists to inform Sui of object deletions. When an object gets unpacked, the programmer will have to do something with its [UID](</references/framework/sui_sui/object#sui_object_UID>). The implementation of this function emits a deleted system event so Sui knows to process the object deletion
[code] 
    **public** **fun** [delete](</references/framework/sui_sui/object#sui_object_delete>)([id](</references/framework/sui_sui/object#sui_object_id>): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>))
    
[/code]

## Function id​

Get the underlying [ID](</references/framework/sui_sui/object#sui_object_ID>) of obj
[code] 
    **public** **fun** [id](</references/framework/sui_sui/object#sui_object_id>)<T: key>(obj: &T): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function borrow_id​

Borrow the underlying [ID](</references/framework/sui_sui/object#sui_object_ID>) of obj
[code] 
    **public** **fun** [borrow_id](</references/framework/sui_sui/object#sui_object_borrow_id>)<T: key>(obj: &T): &[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function id_bytes​

Get the raw bytes for the underlying [ID](</references/framework/sui_sui/object#sui_object_ID>) of obj
[code] 
    **public** **fun** [id_bytes](</references/framework/sui_sui/object#sui_object_id_bytes>)<T: key>(obj: &T): vector<u8>
    
[/code]

## Function id_address​

Get the inner bytes for the underlying [ID](</references/framework/sui_sui/object#sui_object_ID>) of obj
[code] 
    **public** **fun** [id_address](</references/framework/sui_sui/object#sui_object_id_address>)<T: key>(obj: &T): **address**
    
[/code]

## Function borrow_uid​

Get the [UID](</references/framework/sui_sui/object#sui_object_UID>) for obj.  
Safe because Sui has an extra bytecode verifier pass that forces every struct with the key ability to have a distinguished [UID](</references/framework/sui_sui/object#sui_object_UID>) field.  
Cannot be made public as the access to [UID](</references/framework/sui_sui/object#sui_object_UID>) for a given object must be privileged, and restrictable in the object's module.
[code] 
    **fun** [borrow_uid](</references/framework/sui_sui/object#sui_object_borrow_uid>)<T: key>(obj: &T): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function new_uid_from_hash​

Generate a new UID specifically used for creating a UID from a hash
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [new_uid_from_hash](</references/framework/sui_sui/object#sui_object_new_uid_from_hash>)(bytes: **address**): [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function delete_impl​
[code] 
    **fun** [delete_impl](</references/framework/sui_sui/object#sui_object_delete_impl>)([id](</references/framework/sui_sui/object#sui_object_id>): **address**)
    
[/code]

## Function record_new_uid​
[code] 
    **fun** [record_new_uid](</references/framework/sui_sui/object#sui_object_record_new_uid>)([id](</references/framework/sui_sui/object#sui_object_id>): **address**)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/object.md>)

[Previousnitro_attestation](</references/framework/sui_sui/nitro_attestation>)[Nextobject_bag](</references/framework/sui_sui/object_bag>)
