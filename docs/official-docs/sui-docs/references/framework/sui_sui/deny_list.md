<!-- Source: https://docs.sui.io/references/framework/sui_sui/deny_list -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * deny_list


# Module sui::deny_list

Defines the [DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>) type. The [DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>) shared object is used to restrict access to instances of certain core types from being used as inputs by specified addresses in the deny list.
[code] 
    **use** [std::address](</references/framework/sui_std/address#std_address>);
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::type_name](</references/framework/sui_std/type_name#std_type_name>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::accumulator](</references/framework/sui_sui/accumulator#sui_accumulator>);
    **use** [sui::accumulator_settlement](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::bag](</references/framework/sui_sui/bag#sui_bag>);
    **use** [sui::bcs](</references/framework/sui_sui/bcs#sui_bcs>);
    **use** [sui::config](</references/framework/sui_sui/config#sui_config>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::dynamic_object_field](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field>);
    **use** [sui::event](</references/framework/sui_sui/event#sui_event>);
    **use** [sui::hash](</references/framework/sui_sui/hash#sui_hash>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::table](</references/framework/sui_sui/table#sui_table>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::vec_set](</references/framework/sui_sui/vec_set#sui_vec_set>);
    
[/code]

## Struct DenyList​

A shared object that stores the addresses that are blocked for a given core type.
[code] 
    **public** **struct** [DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
lists: [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     The individual deny lists. 

## Struct ConfigWriteCap​

The capability used to write to the deny list config. Ensures that the Configs for the.  
DenyList are modified only by this module.
[code] 
    **public** **struct** [ConfigWriteCap](</references/framework/sui_sui/deny_list#sui_deny_list_ConfigWriteCap>) **has** drop
    
[/code]

## Struct ConfigKey​

The dynamic object field key used to store the Config for a given type, essentially a (per_type_index, per_type_key) pair.
[code] 
    **public** **struct** [ConfigKey](</references/framework/sui_sui/deny_list#sui_deny_list_ConfigKey>) **has** **copy** , drop, store
    
[/code]

Click to openFields

per_type_index: u64
    
per_type_key: vector<u8>
    

## Struct AddressKey​

The setting key used to store the deny list for a given address in the Config.
[code] 
    **public** **struct** [AddressKey](</references/framework/sui_sui/deny_list#sui_deny_list_AddressKey>) **has** **copy** , drop, store
    
[/code]

Click to openFields

0: **address**
    

## Struct GlobalPauseKey​

The setting key used to store the global pause setting in the Config.
[code] 
    **public** **struct** [GlobalPauseKey](</references/framework/sui_sui/deny_list#sui_deny_list_GlobalPauseKey>) **has** **copy** , drop, store
    
[/code]

## Struct PerTypeConfigCreated​

The event emitted when a new Config is created for a given type. This can be useful for tracking the ID of a type's Config object.
[code] 
    **public** **struct** [PerTypeConfigCreated](</references/framework/sui_sui/deny_list#sui_deny_list_PerTypeConfigCreated>) **has** **copy** , drop, store
    
[/code]

Click to openFields

key: [sui::deny_list::ConfigKey](</references/framework/sui_sui/deny_list#sui_deny_list_ConfigKey>)
    
config_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Struct PerTypeList​

Stores the addresses that are denied for a given core type.
[code] 
    **public** **struct** [PerTypeList](</references/framework/sui_sui/deny_list#sui_deny_list_PerTypeList>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
denied_count: [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<**address** , u64>
     Number of object types that have been banned for a given address.  
Used to quickly skip checks for most addresses. 
denied_addresses: [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<vector<u8>, [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<**address** >>
     Set of addresses that are banned for a given type.  
For example with [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>): If addresses A and B are banned from using "0...0123::my_coin::MY_COIN", this will be "0...0123::my_coin::MY_COIN" -> \\{A, B\\}. 

## Constants​

Trying to create a deny list object when not called by the system address.
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_sui/deny_list#sui_deny_list_ENotSystemAddress>): u64 = 0;
    
[/code]

The specified address to be removed is not already in the deny list.
[code] 
    **const** [ENotDenied](</references/framework/sui_sui/deny_list#sui_deny_list_ENotDenied>): u64 = 1;
    
[/code]

The specified address cannot be added to the deny list.
[code] 
    **const** [EInvalidAddress](</references/framework/sui_sui/deny_list#sui_deny_list_EInvalidAddress>): u64 = 1;
    
[/code]

The index into the deny list vector for the [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>) type.
[code] 
    **const** [COIN_INDEX](</references/framework/sui_sui/deny_list#sui_deny_list_COIN_INDEX>): u64 = 0;
    
[/code]

These addresses are reserved and cannot be added to the deny list.  
The addresses listed are well known package and object addresses. So it would be meaningless to add them to the deny list.
[code] 
    **const** [RESERVED](</references/framework/sui_sui/deny_list#sui_deny_list_RESERVED>): vector<**address** > = vector[0x0, 0x1, 0x2, 0x3, 0x4, 0x5, 0x6, 0x7, 0x8, 0x9, 0xa, 0xb, 0xc, 0xd, 0xe, 0xf, 0x403, 0xdee9];
    
[/code]

## Function v2_add​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [v2_add](</references/framework/sui_sui/deny_list#sui_deny_list_v2_add>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>, addr: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function v2_remove​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [v2_remove](</references/framework/sui_sui/deny_list#sui_deny_list_v2_remove>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>, addr: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function v2_contains_current_epoch​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [v2_contains_current_epoch](</references/framework/sui_sui/deny_list#sui_deny_list_v2_contains_current_epoch>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &[sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>, addr: **address** , ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): bool
    
[/code]

## Function v2_contains_next_epoch​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [v2_contains_next_epoch](</references/framework/sui_sui/deny_list#sui_deny_list_v2_contains_next_epoch>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &[sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>, addr: **address**): bool
    
[/code]

## Function v2_enable_global_pause​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [v2_enable_global_pause](</references/framework/sui_sui/deny_list#sui_deny_list_v2_enable_global_pause>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function v2_disable_global_pause​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [v2_disable_global_pause](</references/framework/sui_sui/deny_list#sui_deny_list_v2_disable_global_pause>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function v2_is_global_pause_enabled_current_epoch​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [v2_is_global_pause_enabled_current_epoch](</references/framework/sui_sui/deny_list#sui_deny_list_v2_is_global_pause_enabled_current_epoch>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &[sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): bool
    
[/code]

## Function v2_is_global_pause_enabled_next_epoch​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [v2_is_global_pause_enabled_next_epoch](</references/framework/sui_sui/deny_list#sui_deny_list_v2_is_global_pause_enabled_next_epoch>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &[sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>): bool
    
[/code]

## Function migrate_v1_to_v2​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [migrate_v1_to_v2](</references/framework/sui_sui/deny_list#sui_deny_list_migrate_v1_to_v2>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function add_per_type_config​
[code] 
    **fun** [add_per_type_config](</references/framework/sui_sui/deny_list#sui_deny_list_add_per_type_config>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function borrow_per_type_config_mut​
[code] 
    **fun** [borrow_per_type_config_mut](</references/framework/sui_sui/deny_list#sui_deny_list_borrow_per_type_config_mut>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>): &**mut** [sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<[sui::deny_list::ConfigWriteCap](</references/framework/sui_sui/deny_list#sui_deny_list_ConfigWriteCap>)>
    
[/code]

## Function borrow_per_type_config​
[code] 
    **fun** [borrow_per_type_config](</references/framework/sui_sui/deny_list#sui_deny_list_borrow_per_type_config>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &[sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>): &[sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<[sui::deny_list::ConfigWriteCap](</references/framework/sui_sui/deny_list#sui_deny_list_ConfigWriteCap>)>
    
[/code]

## Function per_type_exists​
[code] 
    **fun** [per_type_exists](</references/framework/sui_sui/deny_list#sui_deny_list_per_type_exists>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &[sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, per_type_key: vector<u8>): bool
    
[/code]

## Macro function per_type_config_entry​
[code] 
    **macro** **fun** [per_type_config_entry](</references/framework/sui_sui/deny_list#sui_deny_list_per_type_config_entry>)($[deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), $per_type_index: u64, $per_type_key: vector<u8>, $ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): &**mut** [sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<[sui::deny_list::ConfigWriteCap](</references/framework/sui_sui/deny_list#sui_deny_list_ConfigWriteCap>)>
    
[/code]

## Function v1_add​

Adds the given address to the deny list of the specified type, preventing it from interacting with instances of that type as an input to a transaction. For coins, the type specified is the type of the coin, not the coin type itself. For example, "00...0123::my_coin::MY_COIN" would be the type, not "00...02::coin::Coin".
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [v1_add](</references/framework/sui_sui/deny_list#sui_deny_list_v1_add>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, type: vector<u8>, addr: **address**)
    
[/code]

## Function v1_per_type_list_add​
[code] 
    **fun** [v1_per_type_list_add](</references/framework/sui_sui/deny_list#sui_deny_list_v1_per_type_list_add>)(list: &**mut** [sui::deny_list::PerTypeList](</references/framework/sui_sui/deny_list#sui_deny_list_PerTypeList>), type: vector<u8>, addr: **address**)
    
[/code]

## Function v1_remove​

Removes a previously denied address from the list.  
Aborts with [ENotDenied](</references/framework/sui_sui/deny_list#sui_deny_list_ENotDenied>) if the address is not on the list.
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [v1_remove](</references/framework/sui_sui/deny_list#sui_deny_list_v1_remove>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, type: vector<u8>, addr: **address**)
    
[/code]

## Function v1_per_type_list_remove​
[code] 
    **fun** [v1_per_type_list_remove](</references/framework/sui_sui/deny_list#sui_deny_list_v1_per_type_list_remove>)(list: &**mut** [sui::deny_list::PerTypeList](</references/framework/sui_sui/deny_list#sui_deny_list_PerTypeList>), type: vector<u8>, addr: **address**)
    
[/code]

## Function v1_contains​

Returns true iff the given address is denied for the given type.
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [v1_contains](</references/framework/sui_sui/deny_list#sui_deny_list_v1_contains>)([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &[sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), per_type_index: u64, type: vector<u8>, addr: **address**): bool
    
[/code]

## Function v1_per_type_list_contains​
[code] 
    **fun** [v1_per_type_list_contains](</references/framework/sui_sui/deny_list#sui_deny_list_v1_per_type_list_contains>)(list: &[sui::deny_list::PerTypeList](</references/framework/sui_sui/deny_list#sui_deny_list_PerTypeList>), type: vector<u8>, addr: **address**): bool
    
[/code]

## Function create​

Creation of the deny list object is restricted to the system address via a system transaction.
[code] 
    **fun** [create](</references/framework/sui_sui/deny_list#sui_deny_list_create>)(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function per_type_list​
[code] 
    **fun** [per_type_list](</references/framework/sui_sui/deny_list#sui_deny_list_per_type_list>)(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::deny_list::PerTypeList](</references/framework/sui_sui/deny_list#sui_deny_list_PerTypeList>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/deny_list.md>)

[Previousconfig](</references/framework/sui_sui/config>)[Nextderived_object](</references/framework/sui_sui/derived_object>)
