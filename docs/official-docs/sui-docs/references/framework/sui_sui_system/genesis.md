<!-- Source: https://docs.sui.io/references/framework/sui_sui_system/genesis -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [system](</references/framework/sui_sui_system>)
  * genesis


# Module sui_system::genesis
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
    **use** [sui::priority_queue](</references/framework/sui_sui/priority_queue#sui_priority_queue>);
    **use** [sui::protocol_config](</references/framework/sui_sui/protocol_config#sui_protocol_config>);
    **use** [sui::sui](</references/framework/sui_sui/sui#sui_sui>);
    **use** [sui::table](</references/framework/sui_sui/table#sui_table>);
    **use** [sui::table_vec](</references/framework/sui_sui/table_vec#sui_table_vec>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::types](</references/framework/sui_sui/types#sui_types>);
    **use** [sui::url](</references/framework/sui_sui/url#sui_url>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::vec_set](</references/framework/sui_sui/vec_set#sui_vec_set>);
    **use** [sui::versioned](</references/framework/sui_sui/versioned#sui_versioned>);
    **use** [sui_system::stake_subsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy>);
    **use** [sui_system::staking_pool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool>);
    **use** [sui_system::storage_fund](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund>);
    **use** [sui_system::sui_system](</references/framework/sui_sui_system/sui_system#sui_system_sui_system>);
    **use** [sui_system::sui_system_state_inner](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner>);
    **use** [sui_system::validator](</references/framework/sui_sui_system/validator#sui_system_validator>);
    **use** [sui_system::validator_cap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap>);
    **use** [sui_system::validator_set](</references/framework/sui_sui_system/validator_set#sui_system_validator_set>);
    **use** [sui_system::validator_wrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper>);
    **use** [sui_system::voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power>);
    
[/code]

## Struct GenesisValidatorMetadata​
[code] 
    **public** **struct** [GenesisValidatorMetadata](</references/framework/sui_sui_system/genesis#sui_system_genesis_GenesisValidatorMetadata>) **has** **copy** , drop
    
[/code]

Click to openFields

name: vector<u8>
    
description: vector<u8>
    
image_url: vector<u8>
    
project_url: vector<u8>
    
sui_address: **address**
    
gas_price: u64
    
commission_rate: u64
    
protocol_public_key: vector<u8>
    
proof_of_possession: vector<u8>
    
network_public_key: vector<u8>
    
worker_public_key: vector<u8>
    
network_address: vector<u8>
    
p2p_address: vector<u8>
    
primary_address: vector<u8>
    
worker_address: vector<u8>
    

## Struct GenesisChainParameters​
[code] 
    **public** **struct** [GenesisChainParameters](</references/framework/sui_sui_system/genesis#sui_system_genesis_GenesisChainParameters>) **has** **copy** , drop
    
[/code]

Click to openFields

protocol_version: u64
    
chain_start_timestamp_ms: u64
    
epoch_duration_ms: u64
    
stake_subsidy_start_epoch: u64
     Stake Subsidy parameters 
stake_subsidy_initial_distribution_amount: u64
    
stake_subsidy_period_length: u64
    
stake_subsidy_decrease_rate: u16
    
max_validator_count: u64
     Validator committee parameters 
min_validator_joining_stake: u64
    
validator_low_stake_threshold: u64
    
validator_very_low_stake_threshold: u64
    
validator_low_stake_grace_period: u64
    

## Struct TokenDistributionSchedule​
[code] 
    **public** **struct** [TokenDistributionSchedule](</references/framework/sui_sui_system/genesis#sui_system_genesis_TokenDistributionSchedule>)
    
[/code]

Click to openFields

stake_subsidy_fund_mist: u64
    
allocations: vector<[sui_system::genesis::TokenAllocation](</references/framework/sui_sui_system/genesis#sui_system_genesis_TokenAllocation>)>
    

## Struct TokenAllocation​
[code] 
    **public** **struct** [TokenAllocation](</references/framework/sui_sui_system/genesis#sui_system_genesis_TokenAllocation>)
    
[/code]

Click to openFields

recipient_address: **address**
    
amount_mist: u64
    
staked_with_validator: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<**address** >
     Indicates if this allocation should be staked at genesis and with which validator 

## Constants​

The [create](</references/framework/sui_sui_system/genesis#sui_system_genesis_create>) function was called at a non-genesis epoch.
[code] 
    **const** [ENotCalledAtGenesis](</references/framework/sui_sui_system/genesis#sui_system_genesis_ENotCalledAtGenesis>): u64 = 0;
    
[/code]

The [create](</references/framework/sui_sui_system/genesis#sui_system_genesis_create>) function was called with duplicate validators.
[code] 
    **const** [EDuplicateValidator](</references/framework/sui_sui_system/genesis#sui_system_genesis_EDuplicateValidator>): u64 = 1;
    
[/code]

The validator address is not in the validator set.
[code] 
    **const** [ENotAValidator](</references/framework/sui_sui_system/genesis#sui_system_genesis_ENotAValidator>): u64 = 2;
    
[/code]

## Function create​

This function will be explicitly called once at genesis.  
It will create a singleton SuiSystemState object, which contains all the information we need in the system.
[code] 
    **fun** [create](</references/framework/sui_sui_system/genesis#sui_system_genesis_create>)(sui_system_state_id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), sui_supply: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, genesis_chain_parameters: [sui_system::genesis::GenesisChainParameters](</references/framework/sui_sui_system/genesis#sui_system_genesis_GenesisChainParameters>), genesis_validators: vector<[sui_system::genesis::GenesisValidatorMetadata](</references/framework/sui_sui_system/genesis#sui_system_genesis_GenesisValidatorMetadata>)>, token_distribution_schedule: [sui_system::genesis::TokenDistributionSchedule](</references/framework/sui_sui_system/genesis#sui_system_genesis_TokenDistributionSchedule>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function allocate_tokens​
[code] 
    **fun** [allocate_tokens](</references/framework/sui_sui_system/genesis#sui_system_genesis_allocate_tokens>)(sui_supply: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, allocations: vector<[sui_system::genesis::TokenAllocation](</references/framework/sui_sui_system/genesis#sui_system_genesis_TokenAllocation>)>, validators: &**mut** vector<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui_system/genesis.md>)

[Previoussui:sui system](</references/framework/sui_sui_system>)[Nextstake_subsidy](</references/framework/sui_sui_system/stake_subsidy>)
