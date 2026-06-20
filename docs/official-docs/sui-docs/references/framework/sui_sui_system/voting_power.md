<!-- Source: https://docs.sui.io/references/framework/sui_sui_system/voting_power -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [system](</references/framework/sui_sui_system>)
  * voting_power


# Module sui_system::voting_power
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
    **use** [sui_system::staking_pool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool>);
    **use** [sui_system::validator](</references/framework/sui_sui_system/validator#sui_system_validator>);
    **use** [sui_system::validator_cap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap>);
    
[/code]

## Struct VotingPowerInfo​

Deprecated. Use VotingPowerInfoV2 instead.
[code] 
    **public** **struct** [VotingPowerInfo](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfo>) **has** drop
    
[/code]

Click to openFields

validator_index: u64
    
[voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power>): u64
    

## Struct VotingPowerInfoV2​
[code] 
    **public** **struct** [VotingPowerInfoV2](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfoV2>) **has** drop
    
[/code]

Click to openFields

validator_index: u64
    
[voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power>): u64
    
stake: u64
    

## Constants​

Set total_voting_power as 10_000 by convention. Individual voting powers can be interpreted as easily understandable basis points (e.g., voting_power: 100 = 1%, voting_power: 1 = 0.01%) rather than opaque quantities whose meaning changes from epoch to epoch as the total amount staked shifts.  
Fixing the total voting power allows clients to hardcode the quorum threshold and total_voting power rather than recomputing these.
[code] 
    **const** [TOTAL_VOTING_POWER](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_TOTAL_VOTING_POWER>): u64 = 10000;
    
[/code]

Quorum threshold for our fixed voting power--any message signed by this much voting power can be trusted up to BFT assumptions
[code] 
    **const** [QUORUM_THRESHOLD](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_QUORUM_THRESHOLD>): u64 = 6667;
    
[/code]
[code] 
    **const** [MAX_VOTING_POWER](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_MAX_VOTING_POWER>): u64 = 1000;
    
[/code]
[code] 
    **const** [ETotalPowerMismatch](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_ETotalPowerMismatch>): u64 = 1;
    
[/code]
[code] 
    **const** [ERelativePowerMismatch](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_ERelativePowerMismatch>): u64 = 2;
    
[/code]
[code] 
    **const** [EVotingPowerOverThreshold](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_EVotingPowerOverThreshold>): u64 = 3;
    
[/code]
[code] 
    **const** [EInvalidVotingPower](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_EInvalidVotingPower>): u64 = 4;
    
[/code]

## Function set_voting_power​

Set the voting power of all validators.  
Each validator's voting power is initialized using their stake. We then attempt to cap their voting power at [MAX_VOTING_POWER](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_MAX_VOTING_POWER>). If [MAX_VOTING_POWER](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_MAX_VOTING_POWER>) is not a feasible cap, we pick the lowest possible cap.
[code] 
    **public**(package) **fun** [set_voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_set_voting_power>)(validators: &**mut** vector<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>, total_stake: u64)
    
[/code]

## Function init_voting_power_info​

Create the initial voting power of each validator, set using their stake, but capped using threshold.  
We also perform insertion sort while creating the voting power list, by maintaining the list in descending order using voting power.  
Anything beyond the threshold is added to the remaining_power, which is also returned.
[code] 
    **fun** [init_voting_power_info](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_init_voting_power_info>)(validators: &vector<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>, threshold: u64, total_stake: u64): (vector<[sui_system::voting_power::VotingPowerInfoV2](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfoV2>)>, u64)
    
[/code]

## Function derive_raw_voting_power​
[code] 
    **public**(package) **fun** [derive_raw_voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_derive_raw_voting_power>)(stake: u64, total_stake: u64): u64
    
[/code]

## Function insert​

Insert new_info to info_list as part of insertion sort, such that info_list is always sorted using stake, in descending order.
[code] 
    **fun** [insert](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_insert>)(info_list: &**mut** vector<[sui_system::voting_power::VotingPowerInfoV2](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfoV2>)>, new_info: [sui_system::voting_power::VotingPowerInfoV2](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfoV2>))
    
[/code]

## Function adjust_voting_power​

Distribute remaining_power to validators that are not capped at threshold.
[code] 
    **fun** [adjust_voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_adjust_voting_power>)(info_list: &**mut** vector<[sui_system::voting_power::VotingPowerInfoV2](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfoV2>)>, threshold: u64, remaining_power: u64)
    
[/code]

## Function update_voting_power​

Update validators with the decided voting power.
[code] 
    **fun** [update_voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_update_voting_power>)(validators: &**mut** vector<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>, info_list: vector<[sui_system::voting_power::VotingPowerInfoV2](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_VotingPowerInfoV2>)>)
    
[/code]

## Function check_invariants​

Check a few invariants that must hold after setting the voting power.
[code] 
    **fun** [check_invariants](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_check_invariants>)(v: &vector<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>)
    
[/code]

## Function total_voting_power​

Return the (constant) total voting power
[code] 
    **public** **fun** [total_voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_total_voting_power>)(): u64
    
[/code]

## Function quorum_threshold​

Return the (constant) quorum threshold
[code] 
    **public** **fun** [quorum_threshold](</references/framework/sui_sui_system/voting_power#sui_system_voting_power_quorum_threshold>)(): u64
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui_system/voting_power.md>)

[Previousvalidator_wrapper](</references/framework/sui_sui_system/validator_wrapper>)[NextMigration](</references/package-managers/package-manager-migration>)
