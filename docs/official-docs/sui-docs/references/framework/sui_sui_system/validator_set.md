<!-- Source: https://docs.sui.io/references/framework/sui_sui_system/validator_set -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [system](</references/framework/sui_sui_system>)
  * validator_set


# Module sui_system::validator_set
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
    **use** [sui_system::staking_pool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool>);
    **use** [sui_system::validator](</references/framework/sui_sui_system/validator#sui_system_validator>);
    **use** [sui_system::validator_cap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap>);
    **use** [sui_system::validator_wrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper>);
    **use** [sui_system::voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power>);
    
[/code]

## Struct ValidatorSet​
[code] 
    **public** **struct** [ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>) **has** store
    
[/code]

Click to openFields

[total_stake](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_total_stake>): u64
     Total amount of stake from all active validators at the beginning of the epoch.  
Written only once per epoch, in [advance_epoch](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_advance_epoch>) function. 
[active_validators](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_active_validators>): vector<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>
     The current list of active validators. 
pending_active_validators: [sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>
     List of new validator candidates added during the current epoch.  
They will be processed at the end of the epoch. 
pending_removals: vector<u64>
     Removal requests from the validators. Each element is an index pointing to [active_validators](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_active_validators>). 
[staking_pool_mappings](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_staking_pool_mappings>): [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>), **address** >
     Mappings from staking pool's ID to the sui address of a validator. 
inactive_validators: [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>), [sui_system::validator_wrapper::ValidatorWrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper>)>
     Mapping from a staking pool ID to the inactive validator that has that pool as its staking pool.  
When a validator is deactivated the validator is removed from [active_validators](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_active_validators>) it is added to this table so that stakers can continue to withdraw their stake from it. 
validator_candidates: [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<**address** , [sui_system::validator_wrapper::ValidatorWrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper>)>
     Table storing preactive/candidate validators, mapping their addresses to their Validator  structs.  
When an address calls [request_add_validator_candidate](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_request_add_validator_candidate>), they get added to this table and become a preactive validator.  
When the candidate has met the min stake requirement, they can call [request_add_validator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_request_add_validator>) to officially add them to the active validator set [active_validators](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_active_validators>) next epoch. 
at_risk_validators: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , u64>
     Table storing the number of epochs during which a validator's stake has been below the low stake threshold. 
extra_fields: [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     Any extra fields that's not defined statically. 

## Struct ValidatorEpochInfoEvent​

Event containing staking and rewards related information of each validator, emitted during epoch advancement.
[code] 
    **public** **struct** [ValidatorEpochInfoEvent](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorEpochInfoEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

epoch: u64
    
validator_address: **address**
    
reference_gas_survey_quote: u64
    
stake: u64
    
commission_rate: u64
    
pool_staking_reward: u64
    
storage_fund_staking_reward: u64
    
pool_token_exchange_rate: [sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>)
    
tallying_rule_reporters: vector<**address** >
    
tallying_rule_global_score: u64
    

## Struct ValidatorEpochInfoEventV2​

V2 of ValidatorEpochInfoEvent containing more information about the validator.
[code] 
    **public** **struct** [ValidatorEpochInfoEventV2](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorEpochInfoEventV2>) **has** **copy** , drop
    
[/code]

Click to openFields

epoch: u64
    
validator_address: **address**
    
reference_gas_survey_quote: u64
    
stake: u64
    
[voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power>): u64
    
commission_rate: u64
    
pool_staking_reward: u64
    
storage_fund_staking_reward: u64
    
pool_token_exchange_rate: [sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>)
    
tallying_rule_reporters: vector<**address** >
    
tallying_rule_global_score: u64
    

## Struct ValidatorJoinEvent​

Event emitted every time a new validator joins the committee.  
The epoch value corresponds to the first epoch this change takes place.
[code] 
    **public** **struct** [ValidatorJoinEvent](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorJoinEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

epoch: u64
    
validator_address: **address**
    
staking_pool_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Struct ValidatorLeaveEvent​

Event emitted every time a validator leaves the committee.  
The epoch value corresponds to the first epoch this change takes place.
[code] 
    **public** **struct** [ValidatorLeaveEvent](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorLeaveEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

epoch: u64
    
validator_address: **address**
    
staking_pool_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
is_voluntary: bool
    

## Struct VotingPowerAdmissionStartEpochKey​

Key for the extra_fields bag to store the start epoch of allowing admission of new validators based on a minimum voting power rather than a minimum stake.
[code] 
    **public** **struct** [VotingPowerAdmissionStartEpochKey](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_VotingPowerAdmissionStartEpochKey>) **has** **copy** , drop, store
    
[/code]

## Constants​
[code] 
    **const** [ENonValidatorInReportRecords](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ENonValidatorInReportRecords>): u64 = 0;
    
[/code]
[code] 
    **const** [EInvalidStakeAdjustmentAmount](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_EInvalidStakeAdjustmentAmount>): u64 = 1;
    
[/code]
[code] 
    **const** [EDuplicateValidator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_EDuplicateValidator>): u64 = 2;
    
[/code]
[code] 
    **const** [ENoPoolFound](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ENoPoolFound>): u64 = 3;
    
[/code]
[code] 
    **const** [ENotAValidator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ENotAValidator>): u64 = 4;
    
[/code]
[code] 
    **const** [EMinJoiningStakeNotReached](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_EMinJoiningStakeNotReached>): u64 = 5;
    
[/code]
[code] 
    **const** [EAlreadyValidatorCandidate](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_EAlreadyValidatorCandidate>): u64 = 6;
    
[/code]
[code] 
    **const** [EValidatorNotCandidate](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_EValidatorNotCandidate>): u64 = 7;
    
[/code]
[code] 
    **const** [ENotValidatorCandidate](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ENotValidatorCandidate>): u64 = 8;
    
[/code]
[code] 
    **const** [EStakingBelowThreshold](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_EStakingBelowThreshold>): u64 = 10;
    
[/code]
[code] 
    **const** [EValidatorAlreadyRemoved](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_EValidatorAlreadyRemoved>): u64 = 11;
    
[/code]
[code] 
    **const** [ENotAPendingValidator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ENotAPendingValidator>): u64 = 12;
    
[/code]
[code] 
    **const** [EValidatorSetEmpty](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_EValidatorSetEmpty>): u64 = 13;
    
[/code]
[code] 
    **const** [EInvalidCap](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_EInvalidCap>): u64 = 101;
    
[/code]
[code] 
    **const** [EInvalidValidatorSelector](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_EInvalidValidatorSelector>): u64 = 14;
    
[/code]
[code] 
    **const** [EAlreadyValidator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_EAlreadyValidator>): u64 = 15;
    
[/code]
[code] 
    **const** [ACTIVE_VALIDATOR_ONLY](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ACTIVE_VALIDATOR_ONLY>): u8 = 1;
    
[/code]
[code] 
    **const** [ACTIVE_OR_PENDING_VALIDATOR](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ACTIVE_OR_PENDING_VALIDATOR>): u8 = 2;
    
[/code]
[code] 
    **const** [ANY_VALIDATOR](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ANY_VALIDATOR>): u8 = 3;
    
[/code]
[code] 
    **const** [BASIS_POINT_DENOMINATOR](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_BASIS_POINT_DENOMINATOR>): u64 = 10000;
    
[/code]
[code] 
    **const** [MIN_STAKING_THRESHOLD](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_MIN_STAKING_THRESHOLD>): u64 = 1000000000;
    
[/code]
[code] 
    **const** [PHASE_LENGTH](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_PHASE_LENGTH>): u64 = 14;
    
[/code]

## Function new​
[code] 
    **public**(package) **fun** [new](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_new>)(init_active_validators: vector<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>)
    
[/code]

## Function request_add_validator_candidate​

Called by [sui_system](</references/framework/sui_sui_system/sui_system#sui_system_sui_system>) to add a new validator candidate.
[code] 
    **public**(package) **fun** [request_add_validator_candidate](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_request_add_validator_candidate>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), [validator](</references/framework/sui_sui_system/validator#sui_system_validator>): [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_remove_validator_candidate​

Called by [sui_system](</references/framework/sui_sui_system/sui_system#sui_system_sui_system>) to remove a validator candidate, and move them to inactive_validators.
[code] 
    **public**(package) **fun** [request_remove_validator_candidate](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_request_remove_validator_candidate>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_add_validator​

Called by [sui_system](</references/framework/sui_sui_system/sui_system#sui_system_sui_system>) to add a new validator to pending_active_validators, which will be processed at the end of epoch.

Aborts if the validator contains duplicate metadata values with an active or pending validator.
[code] 
    **public**(package) **fun** [request_add_validator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_request_add_validator>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function can_join​

Return **true** if a candidate validator with stake will have sufficeint voting power to join the validator set
[code] 
    **fun** [can_join](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_can_join>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), stake: u64, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): bool
    
[/code]

## Function get_voting_power_thresholds​

return (min, low, very low voting power) thresholds
[code] 
    **fun** [get_voting_power_thresholds](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_get_voting_power_thresholds>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): (u64, u64, u64)
    
[/code]

## Function assert_no_pending_or_active_duplicates​
[code] 
    **public**(package) **fun** [assert_no_pending_or_active_duplicates](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_assert_no_pending_or_active_duplicates>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), [validator](</references/framework/sui_sui_system/validator#sui_system_validator>): &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>))
    
[/code]

## Function request_remove_validator​

Called by [sui_system](</references/framework/sui_sui_system/sui_system#sui_system_sui_system>), to remove a validator.  
The index of the validator is added to pending_removals and will be processed at the end of epoch.  
Only an active validator can request to be removed.
[code] 
    **public**(package) **fun** [request_remove_validator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_request_remove_validator>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_add_stake​

Called by [sui_system](</references/framework/sui_sui_system/sui_system#sui_system_sui_system>), to add a new stake to the validator.  
This request is added to the validator's staking pool's pending stake entries, processed at the end of the epoch.  
Aborts in case the staking amount is smaller than MIN_STAKING_THRESHOLD
[code] 
    **public**(package) **fun** [request_add_stake](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_request_add_stake>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), validator_address: **address** , stake: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)
    
[/code]

## Function request_withdraw_stake​

Called by [sui_system](</references/framework/sui_sui_system/sui_system#sui_system_sui_system>), to withdraw some share of a stake from the validator. The share to withdraw is denoted by principal_withdraw_amount. One of two things occurs in this function:

  1. If the staked_sui is staked with an active validator, the request is added to the validator's staking pool's pending stake withdraw entries, processed at the end of the epoch.
  2. If the staked_sui was staked with a validator that is no longer active, the stake and any rewards corresponding to it will be immediately processed.


[code] 
    **public**(package) **fun** [request_withdraw_stake](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_request_withdraw_stake>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function convert_to_fungible_staked_sui​
[code] 
    **public**(package) **fun** [convert_to_fungible_staked_sui](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_convert_to_fungible_staked_sui>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>)
    
[/code]

## Function redeem_fungible_staked_sui​
[code] 
    **public**(package) **fun** [redeem_fungible_staked_sui](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_redeem_fungible_staked_sui>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), fungible_staked_sui: [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function advance_epoch​

Update the validator set at the end of epoch.  
It does the following things:

  1. Distribute stake award.
  2. Process pending stake deposits and withdraws for each validator (adjust_stake).
  3. Process pending stake deposits, and withdraws.
  4. Process pending validator application and withdraws.
  5. At the end, we calculate the total stake for the new epoch.


[code] 
    **public**(package) **fun** [advance_epoch](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_advance_epoch>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), computation_reward: &**mut** [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, storage_fund_reward: &**mut** [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, validator_report_records: &**mut** [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<**address** >>, reward_slashing_rate: u64, low_stake_grace_period: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_positions_and_calculate_total_stake​

This function does the following:

  * removes validators from at_risk group if their voting power is above the LOW threshold
  * increments the number of epochs a validator has been below the LOW threshold but above the.  
VERY LOW threshold
  * removes validators from the active set if they have been below the LOW threshold for more than low_stake_grace_period epochs
  * removes validators from the active set immediately if they are below the VERY LOW threshold
  * activates pending validators if they have sufficient voting power


[code] 
    **fun** [update_validator_positions_and_calculate_total_stake](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_update_validator_positions_and_calculate_total_stake>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), low_stake_grace_period: u64, validator_report_records: &**mut** [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<**address** >>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): u64
    
[/code]

## Function derive_reference_gas_price​

Called by [sui_system](</references/framework/sui_sui_system/sui_system#sui_system_sui_system>) to derive reference gas price for the new epoch.  
Derive the reference gas price based on the gas price quote submitted by each validator.  
The returned gas price should be greater than or equal to 2/3 of the validators submitted gas price, weighted by stake.
[code] 
    **public** **fun** [derive_reference_gas_price](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_derive_reference_gas_price>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>)): u64
    
[/code]

## Function total_stake​
[code] 
    **public** **fun** [total_stake](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_total_stake>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>)): u64
    
[/code]

## Function validator_total_stake_amount​
[code] 
    **public** **fun** [validator_total_stake_amount](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_validator_total_stake_amount>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), validator_address: **address**): u64
    
[/code]

## Function validator_stake_amount​
[code] 
    **public** **fun** [validator_stake_amount](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_validator_stake_amount>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), validator_address: **address**): u64
    
[/code]

## Function validator_voting_power​
[code] 
    **public** **fun** [validator_voting_power](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_validator_voting_power>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), validator_address: **address**): u64
    
[/code]

## Function validator_staking_pool_id​
[code] 
    **public** **fun** [validator_staking_pool_id](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_validator_staking_pool_id>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), validator_address: **address**): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function staking_pool_mappings​
[code] 
    **public** **fun** [staking_pool_mappings](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_staking_pool_mappings>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>)): &[sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>), **address** >
    
[/code]

## Function validator_address_by_pool_id​
[code] 
    **public** **fun** [validator_address_by_pool_id](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_validator_address_by_pool_id>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), pool_id: &[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): **address**
    
[/code]

## Function pool_exchange_rates​
[code] 
    **public**(package) **fun** [pool_exchange_rates](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_pool_exchange_rates>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), pool_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): &[sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<u64, [sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>)>
    
[/code]

## Function validator_by_pool_id​
[code] 
    **public**(package) **fun** [validator_by_pool_id](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_validator_by_pool_id>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), pool_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function next_epoch_validator_count​

Get the total number of validators in the next epoch.
[code] 
    **public**(package) **fun** [next_epoch_validator_count](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_next_epoch_validator_count>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>)): u64
    
[/code]

## Function is_active_validator_by_sui_address​

Returns true iff the address exists in active validators.
[code] 
    **public**(package) **fun** [is_active_validator_by_sui_address](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_is_active_validator_by_sui_address>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), validator_address: **address**): bool
    
[/code]

## Function is_duplicate_with_active_validator​

Checks whether new_validator is duplicate with any currently active validators.  
It differs from [is_active_validator_by_sui_address](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_is_active_validator_by_sui_address>) in that the former checks only the sui address but this function looks at more metadata.
[code] 
    **fun** [is_duplicate_with_active_validator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_is_duplicate_with_active_validator>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), search: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): bool
    
[/code]

## Function is_duplicate_with_pending_validator​

Checks whether new_validator is duplicate with any currently pending validators.
[code] 
    **fun** [is_duplicate_with_pending_validator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_is_duplicate_with_pending_validator>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), search: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): bool
    
[/code]

## Function get_candidate_or_active_validator_mut​

Get mutable reference to either a candidate or an active validator by address.
[code] 
    **fun** [get_candidate_or_active_validator_mut](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_get_candidate_or_active_validator_mut>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), validator_address: **address**): &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function find_validator​

Find validator by validator_address, in validators.  
Returns (true, index) if the validator is found, and the index is its index in the list.  
If not found, returns (false, 0).
[code] 
    **fun** [find_validator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_find_validator>)(validators: &vector<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>, validator_address: **address**): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u64>
    
[/code]

## Function find_validator_from_table_vec​

Find validator by validator_address, in validators.  
Returns (true, index) if the validator is found, and the index is its index in the list.  
If not found, returns (false, 0).
[code] 
    **fun** [find_validator_from_table_vec](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_find_validator_from_table_vec>)(validators: &[sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>, validator_address: **address**): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u64>
    
[/code]

## Function get_validator_indices​

Given a vector of validator addresses, return their indices in the validator set.  
Aborts if any address isn't in the given validator set.
[code] 
    **fun** [get_validator_indices](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_get_validator_indices>)(validators: &vector<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>, validator_addresses: &vector<**address** >): vector<u64>
    
[/code]

## Function any_validator​

Get reference to validator in any state: active, pending, or candidate.
[code] 
    **public**(package) **fun** [any_validator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_any_validator>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), [validator](</references/framework/sui_sui_system/validator#sui_system_validator>): **address**): &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function any_validator_mut​

Get mutable reference to validator in any state: active, pending, or candidate.
[code] 
    **public**(package) **fun** [any_validator_mut](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_any_validator_mut>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), [validator](</references/framework/sui_sui_system/validator#sui_system_validator>): **address**): &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function active_validator​

Get reference to an active validator by address.
[code] 
    **public**(package) **fun** [active_validator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_active_validator>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), [validator](</references/framework/sui_sui_system/validator#sui_system_validator>): **address**): &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function active_validator_mut​

Get mutable reference to an active validator by address.
[code] 
    **public**(package) **fun** [active_validator_mut](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_active_validator_mut>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), [validator](</references/framework/sui_sui_system/validator#sui_system_validator>): **address**): &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function pending_validator​

Get reference to a pending validator by address.
[code] 
    **public**(package) **fun** [pending_validator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_pending_validator>)(self: &[sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), [validator](</references/framework/sui_sui_system/validator#sui_system_validator>): **address**): &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function pending_validator_mut​

Get mutable reference to a pending validator by address.
[code] 
    **public**(package) **fun** [pending_validator_mut](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_pending_validator_mut>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), [validator](</references/framework/sui_sui_system/validator#sui_system_validator>): **address**): &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function candidate_validator​

Get mutable reference to a candidate validator by address.
[code] 
    **public**(package) **fun** [candidate_validator](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_candidate_validator>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), [validator](</references/framework/sui_sui_system/validator#sui_system_validator>): **address**): &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function candidate_validator_mut​

Get mutable reference to a candidate validator by address.
[code] 
    **public**(package) **fun** [candidate_validator_mut](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_candidate_validator_mut>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), [validator](</references/framework/sui_sui_system/validator#sui_system_validator>): **address**): &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function get_validator_ref​
[code] 
    **fun** [get_validator_ref](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_get_validator_ref>)(validators: &vector<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>, validator_address: **address**): &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function get_active_or_pending_or_candidate_validator_ref​
[code] 
    **public**(package) **fun** [get_active_or_pending_or_candidate_validator_ref](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_get_active_or_pending_or_candidate_validator_ref>)(self: &**mut** [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>), validator_address: **address** , which_validator: u8): &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

* * *

_This page has been truncated because it exceeds the maximum character limit.[View the full source](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui_system/validator_set.md>)._

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui_system/validator_set.md>)

[Previousvalidator_cap](</references/framework/sui_sui_system/validator_cap>)[Nextvalidator_wrapper](</references/framework/sui_sui_system/validator_wrapper>)
