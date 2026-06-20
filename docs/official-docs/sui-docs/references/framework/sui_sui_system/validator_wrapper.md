<!-- Source: https://docs.sui.io/references/framework/sui_sui_system/validator_wrapper -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [system](</references/framework/sui_sui_system>)
  * validator_wrapper


# Module sui_system::validator_wrapper
[code]
    **use** [std::address](</references/framework/sui_std/address#std_address>);
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::internal](</references/framework/sui_std/internal#std_internal>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::type_name](</references/framework/sui_std/type_name#std_type_name>);
    **use** [std::u128](</references/framework/sui_std/u128#std_u128>);
    **use** [std::u64](</references/framework/sui_std/u64#std_u64>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::accumulator](</references/framework/sui_sui/accumulator#sui_accumulator>);
    **use** [sui::accumulator_settlement](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::bag](</references/framework/sui_sui/bag#sui_bag>);
    **use** [sui::balance](</references/framework/sui_sui/balance#sui_balance>);
    **use** [sui::bcs](</references/framework/sui_sui/bcs#sui_bcs>);
    **use** [sui::coin](</references/framework/sui_sui/coin#sui_coin>);
    **use** [sui::config](</references/framework/sui_sui/config#sui_config>);
    **use** [sui::deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::dynamic_object_field](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field>);
    **use** [sui::event](</references/framework/sui_sui/event#sui_event>);
    **use** [sui::funds_accumulator](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator>);
    **use** [sui::hash](</references/framework/sui_sui/hash#sui_hash>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::protocol_config](</references/framework/sui_sui/protocol_config#sui_protocol_config>);
    **use** [sui::sui](</references/framework/sui_sui/sui#sui_sui>);
    **use** [sui::table](</references/framework/sui_sui/table#sui_table>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::types](</references/framework/sui_sui/types#sui_types>);
    **use** [sui::url](</references/framework/sui_sui/url#sui_url>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::vec_set](</references/framework/sui_sui/vec_set#sui_vec_set>);
    **use** [sui::versioned](</references/framework/sui_sui/versioned#sui_versioned>);
    **use** [sui_system::staking_pool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool>);
    **use** [sui_system::validator](</references/framework/sui_sui_system/validator#sui_system_validator>);
    **use** [sui_system::validator_cap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap>);
    
[/code]

## Struct ValidatorWrapper​
[code] 
    **public** **struct** [ValidatorWrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper>) **has** store
    
[/code]

Click to openFields

inner: [sui::versioned::Versioned](</references/framework/sui_sui/versioned#sui_versioned_Versioned>)
    

## Constants​
[code] 
    **const** [EInvalidVersion](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_EInvalidVersion>): u64 = 0;
    
[/code]

## Function create_v1​
[code] 
    **public**(package) **fun** [create_v1](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_create_v1>)([validator](</references/framework/sui_sui_system/validator#sui_system_validator>): [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::validator_wrapper::ValidatorWrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper>)
    
[/code]

## Function load_validator_maybe_upgrade​

This function should always return the latest supported version.  
If the inner version is old, we upgrade it lazily in-place.
[code] 
    **public**(package) **fun** [load_validator_maybe_upgrade](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_load_validator_maybe_upgrade>)(self: &**mut** [sui_system::validator_wrapper::ValidatorWrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper>)): &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function destroy​

Destroy the wrapper and retrieve the inner validator object.
[code] 
    **public**(package) **fun** [destroy](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_destroy>)(self: [sui_system::validator_wrapper::ValidatorWrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper>)): [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function upgrade_to_latest​
[code] 
    **fun** [upgrade_to_latest](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_upgrade_to_latest>)(self: &[sui_system::validator_wrapper::ValidatorWrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper>))
    
[/code]

## Function version​
[code] 
    **fun** [version](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_version>)(self: &[sui_system::validator_wrapper::ValidatorWrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper>)): u64
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui_system/validator_wrapper.md>)

[Previousvalidator_set](</references/framework/sui_sui_system/validator_set>)[Nextvoting_power](</references/framework/sui_sui_system/voting_power>)
