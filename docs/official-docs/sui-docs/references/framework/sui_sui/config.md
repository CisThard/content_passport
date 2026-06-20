<!-- Source: https://docs.sui.io/references/framework/sui_sui/config -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * config


# Module sui::config
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
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct Config​
[code] 
    **public** **struct** [Config](</references/framework/sui_sui/config#sui_config_Config>)<**phantom** WriteCap> **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    

## Struct Setting​
[code] 
    **public** **struct** [Setting](</references/framework/sui_sui/config#sui_config_Setting>)<Value: **copy** , drop, store> **has** drop, store
    
[/code]

Click to openFields

data: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::config::SettingData](</references/framework/sui_sui/config#sui_config_SettingData>)<Value>>
    

## Struct SettingData​
[code] 
    **public** **struct** [SettingData](</references/framework/sui_sui/config#sui_config_SettingData>)<Value: **copy** , drop, store> **has** drop, store
    
[/code]

Click to openFields

newer_value_epoch: u64
    
newer_value: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Value>
    
older_value_opt: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Value>
    

## Constants​
[code] 
    **const** [EAlreadySetForEpoch](</references/framework/sui_sui/config#sui_config_EAlreadySetForEpoch>): u64 = 0;
    
[/code]
[code] 
    **const** [ENotSetForEpoch](</references/framework/sui_sui/config#sui_config_ENotSetForEpoch>): u64 = 1;
    
[/code]
[code] 
    **const** [EBCSSerializationFailure](</references/framework/sui_sui/config#sui_config_EBCSSerializationFailure>): u64 = 2;
    
[/code]

## Function new​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [new](</references/framework/sui_sui/config#sui_config_new>)<WriteCap>(_cap: &**mut** WriteCap, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<WriteCap>
    
[/code]

## Function share​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [share](</references/framework/sui_sui/config#sui_config_share>)<WriteCap>([config](</references/framework/sui_sui/config#sui_config>): [sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<WriteCap>)
    
[/code]

## Function transfer​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [transfer](</references/framework/sui_sui/transfer#sui_transfer>)<WriteCap>([config](</references/framework/sui_sui/config#sui_config>): [sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<WriteCap>, owner: **address**)
    
[/code]

## Function add_for_next_epoch​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [add_for_next_epoch](</references/framework/sui_sui/config#sui_config_add_for_next_epoch>)<WriteCap, Name: **copy** , drop, store, Value: **copy** , drop, store>([config](</references/framework/sui_sui/config#sui_config>): &**mut** [sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<WriteCap>, _cap: &**mut** WriteCap, name: Name, value: Value, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Value>
    
[/code]

## Function remove_for_next_epoch​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [remove_for_next_epoch](</references/framework/sui_sui/config#sui_config_remove_for_next_epoch>)<WriteCap, Name: **copy** , drop, store, Value: **copy** , drop, store>([config](</references/framework/sui_sui/config#sui_config>): &**mut** [sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<WriteCap>, _cap: &**mut** WriteCap, name: Name, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Value>
    
[/code]

## Function exists_with_type​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [exists_with_type](</references/framework/sui_sui/config#sui_config_exists_with_type>)<WriteCap, Name: **copy** , drop, store, Value: **copy** , drop, store>([config](</references/framework/sui_sui/config#sui_config>): &[sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<WriteCap>, name: Name): bool
    
[/code]

## Function exists_with_type_for_next_epoch​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [exists_with_type_for_next_epoch](</references/framework/sui_sui/config#sui_config_exists_with_type_for_next_epoch>)<WriteCap, Name: **copy** , drop, store, Value: **copy** , drop, store>([config](</references/framework/sui_sui/config#sui_config>): &[sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<WriteCap>, name: Name, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): bool
    
[/code]

## Function borrow_for_next_epoch_mut​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [borrow_for_next_epoch_mut](</references/framework/sui_sui/config#sui_config_borrow_for_next_epoch_mut>)<WriteCap, Name: **copy** , drop, store, Value: **copy** , drop, store>([config](</references/framework/sui_sui/config#sui_config>): &**mut** [sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<WriteCap>, _cap: &**mut** WriteCap, name: Name, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): &**mut** Value
    
[/code]

## Function read_setting_for_next_epoch​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [read_setting_for_next_epoch](</references/framework/sui_sui/config#sui_config_read_setting_for_next_epoch>)<WriteCap, Name: **copy** , drop, store, Value: **copy** , drop, store>([config](</references/framework/sui_sui/config#sui_config>): &[sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<WriteCap>, name: Name): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Value>
    
[/code]

## Macro function entry​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **macro** **fun** **entry** <$WriteCap, $Name: **copy** , drop, store, $Value: **copy** , drop, store>($[config](</references/framework/sui_sui/config#sui_config>): &**mut** [sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<$WriteCap>, $cap: &**mut** $WriteCap, $name: $Name, $initial_for_next_epoch: |&**mut** [sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<$WriteCap>, &**mut** $WriteCap, &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)| -> $Value, $ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): &**mut** $Value
    
[/code]

## Macro function update​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **macro** **fun** [update](</references/framework/sui_sui/config#sui_config_update>)<$WriteCap, $Name: **copy** , drop, store, $Value: **copy** , drop, store>($[config](</references/framework/sui_sui/config#sui_config>): &**mut** [sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<$WriteCap>, $cap: &**mut** $WriteCap, $name: $Name, $initial_for_next_epoch: |&**mut** [sui::config::Config](</references/framework/sui_sui/config#sui_config_Config>)<$WriteCap>, &**mut** $WriteCap, &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)| -> $Value, $update_for_next_epoch: |[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$Value>, &**mut** $Value| -> (), $ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function read_setting​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [read_setting](</references/framework/sui_sui/config#sui_config_read_setting>)<Name: **copy** , drop, store, Value: **copy** , drop, store>([config](</references/framework/sui_sui/config#sui_config>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>), name: Name, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Value>
    
[/code]

## Function read_setting_impl​
[code] 
    **fun** [read_setting_impl](</references/framework/sui_sui/config#sui_config_read_setting_impl>)<FieldSettingValue: key, SettingValue: store, SettingDataValue: store, Value: **copy** , drop, store>([config](</references/framework/sui_sui/config#sui_config>): **address** , name: **address** , current_epoch: u64): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Value>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/config.md>)

[Previouscoin_registry](</references/framework/sui_sui/coin_registry>)[Nextdeny_list](</references/framework/sui_sui/deny_list>)
