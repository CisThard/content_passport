<!-- Source: https://docs.sui.io/references/framework/sui_sui_system/sui_system_state_inner -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [system](</references/framework/sui_sui_system>)
  * sui_system_state_inner


# Module sui_system::sui_system_state_inner
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
    **use** [sui_system::validator](</references/framework/sui_sui_system/validator#sui_system_validator>);
    **use** [sui_system::validator_cap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap>);
    **use** [sui_system::validator_set](</references/framework/sui_sui_system/validator_set#sui_system_validator_set>);
    **use** [sui_system::validator_wrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper>);
    **use** [sui_system::voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power>);
    
[/code]

## Struct ExecutionTimeObservationChunkKey​
[code] 
    **public** **struct** [ExecutionTimeObservationChunkKey](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ExecutionTimeObservationChunkKey>) **has** **copy** , drop, store
    
[/code]

Click to openFields

chunk_index: u64
    

## Struct SystemParameters​

A list of system config parameters.
[code] 
    **public** **struct** [SystemParameters](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParameters>) **has** store
    
[/code]

Click to openFields

epoch_duration_ms: u64
     The duration of an epoch, in milliseconds. 
stake_subsidy_start_epoch: u64
     The starting epoch in which stake subsidies start being paid out 
max_validator_count: u64
     Deprecated.  
Maximum number of active validators at any moment.  
We do not allow the number of validators in any epoch to go above this. 
min_validator_joining_stake: u64
     Deprecated.  
Lower-bound on the amount of stake required to become a validator. 
validator_low_stake_threshold: u64
     Validators with stake amount below validator_low_stake_threshold are considered to have low stake and will be escorted out of the validator set after being below this threshold for more than validator_low_stake_grace_period number of epochs. 
validator_very_low_stake_threshold: u64
     Deprecated.  
Validators with stake below validator_very_low_stake_threshold will be removed immediately at epoch change, no grace period. 
validator_low_stake_grace_period: u64
     A validator can have stake below validator_low_stake_threshold for this many epochs before being kicked out. 
[extra_fields](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_extra_fields>): [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     Any extra fields that's not defined statically. 

## Struct SystemParametersV2​

Added min_validator_count.
[code] 
    **public** **struct** [SystemParametersV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParametersV2>) **has** store
    
[/code]

Click to openFields

epoch_duration_ms: u64
     The duration of an epoch, in milliseconds. 
stake_subsidy_start_epoch: u64
     The starting epoch in which stake subsidies start being paid out 
min_validator_count: u64
     Minimum number of active validators at any moment. 
max_validator_count: u64
     Maximum number of active validators at any moment.  
We do not allow the number of validators in any epoch to go above this. 
min_validator_joining_stake: u64
     Deprecated.  
Lower-bound on the amount of stake required to become a validator. 
validator_low_stake_threshold: u64
     Deprecated.  
Validators with stake amount below validator_low_stake_threshold are considered to have low stake and will be escorted out of the validator set after being below this threshold for more than validator_low_stake_grace_period number of epochs. 
validator_very_low_stake_threshold: u64
     Deprecated.  
Validators with stake below validator_very_low_stake_threshold will be removed immediately at epoch change, no grace period. 
validator_low_stake_grace_period: u64
     A validator can have stake below validator_low_stake_threshold for this many epochs before being kicked out. 
[extra_fields](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_extra_fields>): [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     Any extra fields that's not defined statically. 

## Struct SuiSystemStateInner​

The top-level object containing all information of the Sui system.
[code] 
    **public** **struct** [SuiSystemStateInner](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInner>) **has** store
    
[/code]

Click to openFields

[epoch](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_epoch>): u64
     The current epoch ID, starting from 0. 
[protocol_version](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_protocol_version>): u64
     The current protocol version, starting from 1. 
[system_state_version](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_system_state_version>): u64
     The current version of the system state data structure type.  
This is always the same as SuiSystemState.version. Keeping a copy here so that we know what version it is by inspecting SuiSystemStateInner as well. 
[validators](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_validators>): [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>)
     Contains all information about the validators. 
[storage_fund](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund>): [sui_system::storage_fund::StorageFund](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund>)
     The storage fund. 
parameters: [sui_system::sui_system_state_inner::SystemParameters](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParameters>)
     A list of system config parameters. 
reference_gas_price: u64
     The reference gas price for the current epoch. 
validator_report_records: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<**address** >>
     A map storing the records of validator reporting each other.  
There is an entry in the map for each validator that has been reported at least once. The entry VecSet contains all the validators that reported them. If a validator has never been reported they don't have an entry in this map.  
This map persists across epoch: a peer continues being in a reported state until the reporter doesn't explicitly remove their report.  
Note that in case we want to support validator address change in future, the reports should be based on validator ids 
[stake_subsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy>): [sui_system::stake_subsidy::StakeSubsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy>)
     Schedule of stake subsidies given out each epoch. 
safe_mode: bool
     Whether the system is running in a downgraded safe mode due to a non-recoverable bug.  
This is set whenever we failed to execute advance_epoch, and ended up executing advance_epoch_safe_mode.  
It can be reset once we are able to successfully execute advance_epoch.  
The rest of the fields starting with safe_mode_ are accumulated during safe mode when advance_epoch_safe_mode is executed. They will eventually be processed once we are out of safe mode. 
safe_mode_storage_rewards: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
safe_mode_computation_rewards: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
safe_mode_storage_rebates: u64
    
safe_mode_non_refundable_storage_fee: u64
    
[epoch_start_timestamp_ms](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_epoch_start_timestamp_ms>): u64
     Unix timestamp of the current epoch start 
[extra_fields](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_extra_fields>): [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     Any extra fields that's not defined statically. 

## Struct SuiSystemStateInnerV2​

Uses SystemParametersV2 as the parameters.
[code] 
    **public** **struct** [SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>) **has** store
    
[/code]

Click to openFields

[epoch](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_epoch>): u64
     The current epoch ID, starting from 0. 
[protocol_version](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_protocol_version>): u64
     The current protocol version, starting from 1. 
[system_state_version](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_system_state_version>): u64
     The current version of the system state data structure type.  
This is always the same as SuiSystemState.version. Keeping a copy here so that we know what version it is by inspecting SuiSystemStateInner as well. 
[validators](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_validators>): [sui_system::validator_set::ValidatorSet](</references/framework/sui_sui_system/validator_set#sui_system_validator_set_ValidatorSet>)
     Contains all information about the validators. 
[storage_fund](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund>): [sui_system::storage_fund::StorageFund](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund>)
     The storage fund. 
parameters: [sui_system::sui_system_state_inner::SystemParametersV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParametersV2>)
     A list of system config parameters. 
reference_gas_price: u64
     The reference gas price for the current epoch. 
validator_report_records: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<**address** >>
     A map storing the records of validator reporting each other.  
There is an entry in the map for each validator that has been reported at least once. The entry VecSet contains all the validators that reported them. If a validator has never been reported they don't have an entry in this map.  
This map persists across epoch: a peer continues being in a reported state until the reporter doesn't explicitly remove their report.  
Note that in case we want to support validator address change in future, the reports should be based on validator ids 
[stake_subsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy>): [sui_system::stake_subsidy::StakeSubsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy>)
     Schedule of stake subsidies given out each epoch. 
safe_mode: bool
     Whether the system is running in a downgraded safe mode due to a non-recoverable bug.  
This is set whenever we failed to execute advance_epoch, and ended up executing advance_epoch_safe_mode.  
It can be reset once we are able to successfully execute advance_epoch.  
The rest of the fields starting with safe_mode_ are accumulated during safe mode when advance_epoch_safe_mode is executed. They will eventually be processed once we are out of safe mode. 
safe_mode_storage_rewards: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
safe_mode_computation_rewards: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
safe_mode_storage_rebates: u64
    
safe_mode_non_refundable_storage_fee: u64
    
[epoch_start_timestamp_ms](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_epoch_start_timestamp_ms>): u64
     Unix timestamp of the current epoch start 
[extra_fields](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_extra_fields>): [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     Any extra fields that's not defined statically. 

## Struct SystemEpochInfoEvent​

Event containing system-level epoch information, emitted during the epoch advancement transaction.
[code] 
    **public** **struct** [SystemEpochInfoEvent](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemEpochInfoEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

[epoch](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_epoch>): u64
    
[protocol_version](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_protocol_version>): u64
    
reference_gas_price: u64
    
total_stake: u64
    
storage_fund_reinvestment: u64
    
storage_charge: u64
    
storage_rebate: u64
    
storage_fund_balance: u64
    
stake_subsidy_amount: u64
    
total_gas_fees: u64
    
total_stake_rewards_distributed: u64
    
leftover_storage_fund_inflow: u64
    

## Constants​
[code] 
    **const** [ENotValidator](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ENotValidator>): u64 = 0;
    
[/code]
[code] 
    **const** [ELimitExceeded](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ELimitExceeded>): u64 = 1;
    
[/code]
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ENotSystemAddress>): u64 = 2;
    
[/code]
[code] 
    **const** [ECannotReportOneself](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ECannotReportOneself>): u64 = 3;
    
[/code]
[code] 
    **const** [EReportRecordNotFound](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_EReportRecordNotFound>): u64 = 4;
    
[/code]
[code] 
    **const** [EBpsTooLarge](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_EBpsTooLarge>): u64 = 5;
    
[/code]
[code] 
    **const** [ESafeModeGasNotProcessed](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ESafeModeGasNotProcessed>): u64 = 7;
    
[/code]
[code] 
    **const** [EAdvancedToWrongEpoch](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_EAdvancedToWrongEpoch>): u64 = 8;
    
[/code]
[code] 
    **const** [BASIS_POINT_DENOMINATOR](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_BASIS_POINT_DENOMINATOR>): u64 = 10000;
    
[/code]
[code] 
    **const** [ACTIVE_VALIDATOR_ONLY](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ACTIVE_VALIDATOR_ONLY>): u8 = 1;
    
[/code]
[code] 
    **const** [ACTIVE_OR_PENDING_VALIDATOR](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ACTIVE_OR_PENDING_VALIDATOR>): u8 = 2;
    
[/code]
[code] 
    **const** [ANY_VALIDATOR](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_ANY_VALIDATOR>): u8 = 3;
    
[/code]
[code] 
    **const** [SYSTEM_STATE_VERSION_V1](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SYSTEM_STATE_VERSION_V1>): u64 = 1;
    
[/code]
[code] 
    **const** [EXTRA_FIELD_EXECUTION_TIME_ESTIMATES_KEY](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_EXTRA_FIELD_EXECUTION_TIME_ESTIMATES_KEY>): u64 = 0;
    
[/code]
[code] 
    **const** [EXTRA_FIELD_EXECUTION_TIME_ESTIMATES_CHUNK_COUNT_KEY](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_EXTRA_FIELD_EXECUTION_TIME_ESTIMATES_CHUNK_COUNT_KEY>): u64 = 1;
    
[/code]

## Function create​

Create a new SuiSystemState object and make it shared.  
This function will be called only once in genesis.
[code] 
    **public**(package) **fun** [create](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_create>)([validators](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_validators>): vector<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>, initial_storage_fund: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, [protocol_version](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_protocol_version>): u64, [epoch_start_timestamp_ms](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_epoch_start_timestamp_ms>): u64, parameters: [sui_system::sui_system_state_inner::SystemParameters](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParameters>), [stake_subsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy>): [sui_system::stake_subsidy::StakeSubsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::sui_system_state_inner::SuiSystemStateInner](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInner>)
    
[/code]

## Function create_system_parameters​
[code] 
    **public**(package) **fun** [create_system_parameters](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_create_system_parameters>)(epoch_duration_ms: u64, stake_subsidy_start_epoch: u64, max_validator_count: u64, min_validator_joining_stake: u64, validator_low_stake_threshold: u64, validator_very_low_stake_threshold: u64, validator_low_stake_grace_period: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::sui_system_state_inner::SystemParameters](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParameters>)
    
[/code]

## Function v1_to_v2​
[code] 
    **public**(package) **fun** [v1_to_v2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_v1_to_v2>)(self: [sui_system::sui_system_state_inner::SuiSystemStateInner](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInner>)): [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>)
    
[/code]

## Function request_add_validator_candidate​

Can be called by anyone who wishes to become a validator candidate and starts accruing delegated stakes in their staking pool. Once they have at least MIN_VALIDATOR_JOINING_STAKE amount of stake they can call [request_add_validator](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_add_validator>) to officially become an active validator at the next epoch.  
Aborts if the caller is already a pending or active validator, or a validator candidate.  
Note: proof_of_possession MUST be a valid signature using sui_address and protocol_pubkey_bytes.  
To produce a valid PoP, run [fn test_proof_of_possession].
[code] 
    **public**(package) **fun** [request_add_validator_candidate](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_add_validator_candidate>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), pubkey_bytes: vector<u8>, network_pubkey_bytes: vector<u8>, worker_pubkey_bytes: vector<u8>, proof_of_possession: vector<u8>, name: vector<u8>, description: vector<u8>, image_url: vector<u8>, project_url: vector<u8>, net_address: vector<u8>, p2p_address: vector<u8>, primary_address: vector<u8>, worker_address: vector<u8>, gas_price: u64, commission_rate: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_remove_validator_candidate​

Called by a validator candidate to remove themselves from the candidacy. After this call their staking pool becomes deactivate.
[code] 
    **public**(package) **fun** [request_remove_validator_candidate](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_remove_validator_candidate>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_add_validator​

Called by a validator candidate to add themselves to the active validator set beginning next epoch.  
Aborts if the validator is a duplicate with one of the pending or active validators, or if the amount of stake the validator has doesn't meet the min threshold, or if the number of new validators for the next epoch has already reached the maximum.
[code] 
    **public**(package) **fun** [request_add_validator](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_add_validator>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_remove_validator​

A validator can call this function to request a removal in the next epoch.  
We use the sender of ctx to look up the validator (i.e. sender must match the sui_address in the validator).  
At the end of the epoch, the [validator](</references/framework/sui_sui_system/validator#sui_system_validator>) object will be returned to the sui_address of the validator.
[code] 
    **public**(package) **fun** [request_remove_validator](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_remove_validator>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_set_gas_price​

A validator can call this function to submit a new gas price quote, to be used for the reference gas price calculation at the end of the epoch.
[code] 
    **public**(package) **fun** [request_set_gas_price](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_set_gas_price>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), cap: &[sui_system::validator_cap::UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>), new_gas_price: u64)
    
[/code]

## Function set_candidate_validator_gas_price​

This function is used to set new gas price for candidate validators
[code] 
    **public**(package) **fun** [set_candidate_validator_gas_price](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_set_candidate_validator_gas_price>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), cap: &[sui_system::validator_cap::UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>), new_gas_price: u64)
    
[/code]

## Function request_set_commission_rate​

A validator can call this function to set a new commission rate, updated at the end of the epoch.
[code] 
    **public**(package) **fun** [request_set_commission_rate](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_set_commission_rate>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), new_commission_rate: u64, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function set_candidate_validator_commission_rate​

This function is used to set new commission rate for candidate validators
[code] 
    **public**(package) **fun** [set_candidate_validator_commission_rate](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_set_candidate_validator_commission_rate>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), new_commission_rate: u64, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_add_stake​

Add stake to a validator's staking pool.
[code] 
    **public**(package) **fun** [request_add_stake](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_add_stake>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), stake: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, validator_address: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)
    
[/code]

## Function request_add_stake_mul_coin​

Add stake to a validator's staking pool using multiple coins.
[code] 
    **public**(package) **fun** [request_add_stake_mul_coin](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_add_stake_mul_coin>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), stakes: vector<[sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>>, stake_amount: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u64>, validator_address: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)
    
[/code]

## Function request_withdraw_stake​

Withdraw some portion of a stake from a validator's staking pool.
[code] 
    **public**(package) **fun** [request_withdraw_stake](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_withdraw_stake>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function convert_to_fungible_staked_sui​
[code] 
    **public**(package) **fun** [convert_to_fungible_staked_sui](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_convert_to_fungible_staked_sui>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>)
    
[/code]

## Function redeem_fungible_staked_sui​
[code] 
    **public**(package) **fun** [redeem_fungible_staked_sui](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_redeem_fungible_staked_sui>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), fungible_staked_sui: [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function report_validator​

Report a validator as a bad or non-performant actor in the system.  
Succeeds if all the following are satisfied:

  1. both the reporter in cap and the input reportee_addr are active validators.
  2. reporter and reportee not the same address.
  3. the cap object is still valid.  
This function is idempotent.


[code] 
    **public**(package) **fun** [report_validator](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_report_validator>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), cap: &[sui_system::validator_cap::UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>), reportee_addr: **address**)
    
[/code]

## Function undo_report_validator​

Undo a [report_validator](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_report_validator>) action. Aborts if

  1. the reportee is not a currently active validator or
  2. the sender has not previously reported the reportee_addr, or
  3. the cap is not valid


[code] 
    **public**(package) **fun** [undo_report_validator](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_undo_report_validator>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), cap: &[sui_system::validator_cap::UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>), reportee_addr: **address**)
    
[/code]

## Function report_validator_impl​
[code] 
    **fun** [report_validator_impl](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_report_validator_impl>)(verified_cap: [sui_system::validator_cap::ValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap>), reportee_addr: **address** , validator_report_records: &**mut** [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<**address** >>)
    
[/code]

## Function undo_report_validator_impl​
[code] 
    **fun** [undo_report_validator_impl](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_undo_report_validator_impl>)(verified_cap: [sui_system::validator_cap::ValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap>), reportee_addr: **address** , validator_report_records: &**mut** [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<**address** >>)
    
[/code]

## Function rotate_operation_cap​

Create a new UnverifiedValidatorOperationCap, transfer it to the validator and registers it. The original object is thus revoked.
[code] 
    **public**(package) **fun** [rotate_operation_cap](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_rotate_operation_cap>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_name​

Update a validator's name.

Unlike description and image_url, name is checked against both active and pending validators and must be unique in the system.

For candidate validators, the name is not checked for duplicates.
[code] 
    **public**(package) **fun** [update_validator_name](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_update_validator_name>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), name: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_description​

Update a validator's description.  
Never checked for duplicates.
[code] 
    **public**(package) **fun** [update_validator_description](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_update_validator_description>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), description: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_image_url​

Update a validator's image url.  
Never checked for duplicates.
[code] 
    **public**(package) **fun** [update_validator_image_url](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_update_validator_image_url>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), image_url: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_project_url​

Update a candidate or an active/pending validator's project url.  
Never checked for duplicates.
[code] 
    **public**(package) **fun** [update_validator_project_url](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_update_validator_project_url>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), project_url: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_next_epoch_network_address​

Update a validator's network address.  
The change will only take effects starting from the next epoch.

Aborts if there's a duplicate network address in the system.
[code] 
    **public**(package) **fun** [update_validator_next_epoch_network_address](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_update_validator_next_epoch_network_address>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), network_address: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_candidate_validator_network_address​

Update candidate validator's network address.  
Not checked for duplicates. Uniqueness check is performed in [request_add_validator](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_request_add_validator>).
[code] 
    **public**(package) **fun** [update_candidate_validator_network_address](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_update_candidate_validator_network_address>)(self: &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>), network_address: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

* * *

_This page has been truncated because it exceeds the maximum character limit.[View the full source](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui_system/sui_system_state_inner.md>)._

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui_system/sui_system_state_inner.md>)

[Previoussui_system](</references/framework/sui_sui_system/sui_system>)[Nextvalidator](</references/framework/sui_sui_system/validator>)
