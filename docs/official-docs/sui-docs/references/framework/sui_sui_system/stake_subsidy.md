<!-- Source: https://docs.sui.io/references/framework/sui_sui_system/stake_subsidy -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [system](</references/framework/sui_sui_system>)
  * stake_subsidy


# Module sui_system::stake_subsidy
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
    
[/code]

## Struct StakeSubsidy​
[code] 
    **public** **struct** [StakeSubsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy>) **has** store
    
[/code]

Click to openFields

balance: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
     Balance of SUI set aside for stake subsidies that will be drawn down over time. 
distribution_counter: u64
     Count of the number of times stake subsidies have been distributed. 
current_distribution_amount: u64
     The amount of stake subsidy to be drawn down per distribution.  
This amount decays and decreases over time. 
stake_subsidy_period_length: u64
     Number of distributions to occur before the distribution amount decays. 
stake_subsidy_decrease_rate: u16
     The rate at which the distribution amount decays at the end of each period. Expressed in basis points. 
extra_fields: [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     Any extra fields that's not defined statically. 

## Constants​
[code] 
    **const** [ESubsidyDecreaseRateTooLarge](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_ESubsidyDecreaseRateTooLarge>): u64 = 0;
    
[/code]
[code] 
    **const** [BASIS_POINT_DENOMINATOR](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_BASIS_POINT_DENOMINATOR>): u128 = 10000;
    
[/code]

## Function create​
[code] 
    **public**(package) **fun** [create](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_create>)(balance: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, initial_distribution_amount: u64, stake_subsidy_period_length: u64, stake_subsidy_decrease_rate: u16, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::stake_subsidy::StakeSubsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy>)
    
[/code]

## Function advance_epoch​

Advance the epoch counter and draw down the subsidy for the epoch.
[code] 
    **public**(package) **fun** [advance_epoch](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_advance_epoch>)(self: &**mut** [sui_system::stake_subsidy::StakeSubsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function current_epoch_subsidy_amount​

Returns the amount of stake subsidy to be added at the end of the current epoch.
[code] 
    **public** **fun** [current_epoch_subsidy_amount](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_current_epoch_subsidy_amount>)(self: &[sui_system::stake_subsidy::StakeSubsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy>)): u64
    
[/code]

## Function get_distribution_counter​

Returns the number of distributions that have occurred.
[code] 
    **public**(package) **fun** [get_distribution_counter](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_get_distribution_counter>)(self: &[sui_system::stake_subsidy::StakeSubsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy>)): u64
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui_system/stake_subsidy.md>)

[Previousgenesis](</references/framework/sui_sui_system/genesis>)[Nextstaking_pool](</references/framework/sui_sui_system/staking_pool>)
