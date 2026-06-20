<!-- Source: https://docs.sui.io/references/framework/sui_sui_system/sui_system -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [system](</references/framework/sui_sui_system>)
  * sui_system


# Module sui_system::sui_system

Sui System State Type Upgrade Guide [SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>) is a thin wrapper around SuiSystemStateInner that provides a versioned interface. The [SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>) object has a fixed ID 0x5, and the SuiSystemStateInner object is stored as a dynamic field.  
There are a few different ways to upgrade the SuiSystemStateInner type:

The simplest and one that doesn't involve a real upgrade is to just add dynamic fields to the extra_fields field of SuiSystemStateInner or any of its sub type. This is useful when we are in a rush, or making a small change, or still experimenting a new field.

To properly upgrade the SuiSystemStateInner type, we need to ship a new framework that does the following:

  1. Define a new SuiSystemStateInnertype (e.g. SuiSystemStateInnerV2).
  2. Define a data migration function that migrates the old SuiSystemStateInner to the new one (i.e. SuiSystemStateInnerV2).
  3. Replace all uses of SuiSystemStateInner with SuiSystemStateInnerV2 in both sui_system.move and sui_system_state_inner.move, with the exception of the [sui_system_state_inner::create](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_create>) function, which should always return the genesis type.
  4. Inside [load_inner_maybe_upgrade](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_load_inner_maybe_upgrade>) function, check the current version in the wrapper, and if it's not the latest version, call the data migration function to upgrade the inner object. Make sure to also update the version in the wrapper.  
A detailed example can be found in sui/tests/framework_upgrades/mock_sui_systems/shallow_upgrade.  
Along with the Move change, we also need to update the Rust code to support the new type. This includes:
  5. Define a new SuiSystemStateInner struct type that matches the new Move type, and implement the SuiSystemStateTrait.
  6. Update the [SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>) struct to include the new version as a new enum variant.
  7. Update the get_sui_system_state function to handle the new version.  
To test that the upgrade will be successful, we need to modify sui_system_state_production_upgrade_test test in protocol_version_tests and trigger a real upgrade using the new framework. We will need to keep this directory as old version, put the new framework in a new directory, and run the test to exercise the upgrade.


To upgrade Validator type, besides everything above, we also need to:

  1. Define a new Validator type (e.g. ValidatorV2).
  2. Define a data migration function that migrates the old Validator to the new one (i.e. ValidatorV2).
  3. Replace all uses of Validator with ValidatorV2 except the genesis creation function.
  4. In validator_wrapper::upgrade_to_latest, check the current version in the wrapper, and if it's not the latest version, call the data migration function to upgrade it.  
In Rust, we also need to add a new case in get_validator_from_table.  
Note that it is possible to upgrade SuiSystemStateInner without upgrading Validator, but not the other way around.  
And when we only upgrade SuiSystemStateInner, the version of Validator in the wrapper will not be updated, and hence may become inconsistent with the version of SuiSystemStateInner. This is fine as long as we don't use the Validator version to determine the SuiSystemStateInner version, or vice versa.


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
    **use** [sui_system::sui_system_state_inner](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner>);
    **use** [sui_system::validator](</references/framework/sui_sui_system/validator#sui_system_validator>);
    **use** [sui_system::validator_cap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap>);
    **use** [sui_system::validator_set](</references/framework/sui_sui_system/validator_set#sui_system_validator_set>);
    **use** [sui_system::validator_wrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper>);
    **use** [sui_system::voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power>);
    
[/code]

## Struct SuiSystemState​
[code] 
    **public** **struct** [SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
version: u64
    

## Struct AccumulatorStorageCostKey​

Key for storing the storage cost for accumulator objects, computed at end of epoch.
[code] 
    **public** **struct** [AccumulatorStorageCostKey](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_AccumulatorStorageCostKey>) **has** **copy** , drop, store
    
[/code]

## Constants​
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_ENotSystemAddress>): u64 = 0;
    
[/code]
[code] 
    **const** [EWrongInnerVersion](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_EWrongInnerVersion>): u64 = 1;
    
[/code]

## Function create​

Create a new SuiSystemState object and make it shared.  
This function will be called only once in genesis.
[code] 
    **public**(package) **fun** [create](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_create>)(id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), validators: vector<[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)>, [storage_fund](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, protocol_version: u64, epoch_start_timestamp_ms: u64, parameters: [sui_system::sui_system_state_inner::SystemParameters](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SystemParameters>), [stake_subsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy>): [sui_system::stake_subsidy::StakeSubsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_add_validator_candidate​

Can be called by anyone who wishes to become a validator candidate and starts accruing delegated stakes in their staking pool. Once they have at least MIN_VALIDATOR_JOINING_STAKE amount of stake they can call [request_add_validator](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_add_validator>) to officially become an active validator at the next epoch.  
Aborts if the caller is already a pending or active validator, or a validator candidate.  
Note: proof_of_possession MUST be a valid signature using sui_address and protocol_pubkey_bytes.  
To produce a valid PoP, run [fn test_proof_of_possession].
[code] 
    **public** **entry** **fun** [request_add_validator_candidate](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_add_validator_candidate>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), pubkey_bytes: vector<u8>, network_pubkey_bytes: vector<u8>, worker_pubkey_bytes: vector<u8>, proof_of_possession: vector<u8>, name: vector<u8>, description: vector<u8>, image_url: vector<u8>, project_url: vector<u8>, net_address: vector<u8>, p2p_address: vector<u8>, primary_address: vector<u8>, worker_address: vector<u8>, gas_price: u64, commission_rate: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_remove_validator_candidate​

Called by a validator candidate to remove themselves from the candidacy. After this call their staking pool becomes deactivate.
[code] 
    **public** **entry** **fun** [request_remove_validator_candidate](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_remove_validator_candidate>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_add_validator​

Called by a validator candidate to add themselves to the active validator set beginning next epoch.  
Aborts if the validator is a duplicate with one of the pending or active validators, or if the amount of stake the validator has doesn't meet the min threshold, or if the number of new validators for the next epoch has already reached the maximum.
[code] 
    **public** **entry** **fun** [request_add_validator](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_add_validator>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_remove_validator​

A validator can call this function to request a removal in the next epoch.  
We use the sender of ctx to look up the validator (i.e. sender must match the sui_address in the validator).  
At the end of the epoch, the [validator](</references/framework/sui_sui_system/validator#sui_system_validator>) object will be returned to the sui_address of the validator.
[code] 
    **public** **entry** **fun** [request_remove_validator](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_remove_validator>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_set_gas_price​

A validator can call this entry function to submit a new gas price quote, to be used for the reference gas price calculation at the end of the epoch.
[code] 
    **public** **entry** **fun** [request_set_gas_price](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_set_gas_price>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), cap: &[sui_system::validator_cap::UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>), new_gas_price: u64)
    
[/code]

## Function set_candidate_validator_gas_price​

This entry function is used to set new gas price for candidate validators
[code] 
    **public** **entry** **fun** [set_candidate_validator_gas_price](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_set_candidate_validator_gas_price>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), cap: &[sui_system::validator_cap::UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>), new_gas_price: u64)
    
[/code]

## Function request_set_commission_rate​

A validator can call this entry function to set a new commission rate, updated at the end of the epoch.
[code] 
    **public** **entry** **fun** [request_set_commission_rate](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_set_commission_rate>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), new_commission_rate: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function set_candidate_validator_commission_rate​

This entry function is used to set new commission rate for candidate validators
[code] 
    **public** **entry** **fun** [set_candidate_validator_commission_rate](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_set_candidate_validator_commission_rate>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), new_commission_rate: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_add_stake​

Add stake to a validator's staking pool.
[code] 
    **public** **entry** **fun** [request_add_stake](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_add_stake>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), stake: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, validator_address: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_add_stake_non_entry​

The non-entry version of [request_add_stake](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_add_stake>), which returns the staked SUI instead of transferring it to the sender.
[code] 
    **public** **fun** [request_add_stake_non_entry](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_add_stake_non_entry>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), stake: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, validator_address: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)
    
[/code]

## Function request_add_stake_mul_coin​

Add stake to a validator's staking pool using multiple coins.
[code] 
    **public** **entry** **fun** [request_add_stake_mul_coin](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_add_stake_mul_coin>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), stakes: vector<[sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>>, stake_amount: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u64>, validator_address: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_withdraw_stake​

Withdraw stake from a validator's staking pool.
[code] 
    **public** **entry** **fun** [request_withdraw_stake](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_withdraw_stake>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function convert_to_fungible_staked_sui​

Convert StakedSui into a FungibleStakedSui object.
[code] 
    **public** **fun** [convert_to_fungible_staked_sui](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_convert_to_fungible_staked_sui>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>)
    
[/code]

## Function redeem_fungible_staked_sui​

Convert FungibleStakedSui into a StakedSui object.
[code] 
    **public** **fun** [redeem_fungible_staked_sui](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_redeem_fungible_staked_sui>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), fungible_staked_sui: [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function request_withdraw_stake_non_entry​

Non-entry version of [request_withdraw_stake](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_withdraw_stake>) that returns the withdrawn SUI instead of transferring it to the sender.
[code] 
    **public** **fun** [request_withdraw_stake_non_entry](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_request_withdraw_stake_non_entry>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function report_validator​

Report a validator as a bad or non-performant actor in the system.  
Succeeds if all the following are satisfied:

  1. both the reporter in cap and the input reportee_addr are active validators.
  2. reporter and reportee not the same address.
  3. the cap object is still valid.  
This function is idempotent.


[code] 
    **public** **entry** **fun** [report_validator](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_report_validator>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), cap: &[sui_system::validator_cap::UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>), reportee_addr: **address**)
    
[/code]

## Function undo_report_validator​

Undo a [report_validator](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_report_validator>) action. Aborts if

  1. the reportee is not a currently active validator or
  2. the sender has not previously reported the reportee_addr, or
  3. the cap is not valid


[code] 
    **public** **entry** **fun** [undo_report_validator](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_undo_report_validator>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), cap: &[sui_system::validator_cap::UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>), reportee_addr: **address**)
    
[/code]

## Function rotate_operation_cap​

Create a new UnverifiedValidatorOperationCap, transfer it to the validator and registers it. The original object is thus revoked.
[code] 
    **public** **entry** **fun** [rotate_operation_cap](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_rotate_operation_cap>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_name​

Update a validator's name.
[code] 
    **public** **entry** **fun** [update_validator_name](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_validator_name>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), name: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_description​

Update a validator's description
[code] 
    **public** **entry** **fun** [update_validator_description](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_validator_description>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), description: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_image_url​

Update a validator's image url
[code] 
    **public** **entry** **fun** [update_validator_image_url](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_validator_image_url>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), image_url: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_project_url​

Update a validator's project url
[code] 
    **public** **entry** **fun** [update_validator_project_url](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_validator_project_url>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), project_url: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_next_epoch_network_address​

Update a validator's network address.  
The change will only take effects starting from the next epoch.
[code] 
    **public** **entry** **fun** [update_validator_next_epoch_network_address](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_network_address>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), network_address: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_candidate_validator_network_address​

Update candidate validator's network address.
[code] 
    **public** **entry** **fun** [update_candidate_validator_network_address](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_network_address>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), network_address: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_next_epoch_p2p_address​

Update a validator's p2p address.  
The change will only take effects starting from the next epoch.
[code] 
    **public** **entry** **fun** [update_validator_next_epoch_p2p_address](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_p2p_address>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), p2p_address: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_candidate_validator_p2p_address​

Update candidate validator's p2p address.
[code] 
    **public** **entry** **fun** [update_candidate_validator_p2p_address](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_p2p_address>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), p2p_address: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_next_epoch_primary_address​

Update a validator's narwhal primary address.  
The change will only take effects starting from the next epoch.
[code] 
    **public** **entry** **fun** [update_validator_next_epoch_primary_address](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_primary_address>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), primary_address: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_candidate_validator_primary_address​

Update candidate validator's narwhal primary address.
[code] 
    **public** **entry** **fun** [update_candidate_validator_primary_address](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_primary_address>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), primary_address: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_next_epoch_worker_address​

Update a validator's narwhal worker address.  
The change will only take effects starting from the next epoch.
[code] 
    **public** **entry** **fun** [update_validator_next_epoch_worker_address](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_worker_address>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), worker_address: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_candidate_validator_worker_address​

Update candidate validator's narwhal worker address.
[code] 
    **public** **entry** **fun** [update_candidate_validator_worker_address](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_worker_address>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), worker_address: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_next_epoch_protocol_pubkey​

Update a validator's public key of protocol key and proof of possession.  
The change will only take effects starting from the next epoch.
[code] 
    **public** **entry** **fun** [update_validator_next_epoch_protocol_pubkey](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_protocol_pubkey>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), protocol_pubkey: vector<u8>, proof_of_possession: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_candidate_validator_protocol_pubkey​

Update candidate validator's public key of protocol key and proof of possession.
[code] 
    **public** **entry** **fun** [update_candidate_validator_protocol_pubkey](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_protocol_pubkey>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), protocol_pubkey: vector<u8>, proof_of_possession: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_next_epoch_worker_pubkey​

Update a validator's public key of worker key.  
The change will only take effects starting from the next epoch.
[code] 
    **public** **entry** **fun** [update_validator_next_epoch_worker_pubkey](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_worker_pubkey>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), worker_pubkey: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_candidate_validator_worker_pubkey​

Update candidate validator's public key of worker key.
[code] 
    **public** **entry** **fun** [update_candidate_validator_worker_pubkey](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_worker_pubkey>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), worker_pubkey: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_validator_next_epoch_network_pubkey​

Update a validator's public key of network key.  
The change will only take effects starting from the next epoch.
[code] 
    **public** **entry** **fun** [update_validator_next_epoch_network_pubkey](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_validator_next_epoch_network_pubkey>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), network_pubkey: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_candidate_validator_network_pubkey​

Update candidate validator's public key of network key.
[code] 
    **public** **entry** **fun** [update_candidate_validator_network_pubkey](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_update_candidate_validator_network_pubkey>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), network_pubkey: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function validator_address_by_pool_id​
[code] 
    **public** **fun** [validator_address_by_pool_id](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_validator_address_by_pool_id>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), pool_id: &[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): **address**
    
[/code]

## Function pool_exchange_rates​

Getter of the pool token exchange rate of a staking pool. Works for both active and inactive pools.
[code] 
    **public** **fun** [pool_exchange_rates](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_pool_exchange_rates>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), pool_id: &[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): &[sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<u64, [sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>)>
    
[/code]

## Function active_validator_addresses​

Getter returning addresses of the currently active validators.
[code] 
    **public** **fun** [active_validator_addresses](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_active_validator_addresses>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>)): vector<**address** >
    
[/code]

## Function active_validator_addresses_ref​

Getter returning addresses of the currently active validators by reference.
[code] 
    **public** **fun** [active_validator_addresses_ref](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_active_validator_addresses_ref>)(wrapper: &[sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>)): vector<**address** >
    
[/code]

## Function active_validator_voting_powers​

Getter returns the voting power of the active validators, values are voting power in the scale of 10000.
[code] 
    **public** **fun** [active_validator_voting_powers](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_active_validator_voting_powers>)(wrapper: &[sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>)): [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , u64>
    
[/code]

## Function active_validator_stake_amount​

Getter returns the total stake amount of a given validator.
[code] 
    **public** **fun** [active_validator_stake_amount](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_active_validator_stake_amount>)(wrapper: &[sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), validator_addr: **address**): u64
    
[/code]

## Function calculate_rewards​

Calculate the rewards for a given staked SUI object.  
Used in the package, and can be dev-inspected.
[code] 
    **public**(package) **fun** [calculate_rewards](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_calculate_rewards>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), staked_sui: &[sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): u64
    
[/code]

## Function advance_epoch​

This function should be called at the end of an epoch, and advances the system to the next epoch.  
It does the following things:

  1. Add storage charge to the storage fund.
  2. Burn the storage rebates from the storage fund. These are already refunded to transaction sender's gas coins.
  3. Distribute computation charge to validator stake.
  4. Update all validators.


[code] 
    **fun** [advance_epoch](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_advance_epoch>)(storage_reward: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, computation_reward: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), new_epoch: u64, next_protocol_version: u64, storage_rebate: u64, non_refundable_storage_fee: u64, storage_fund_reinvest_rate: u64, reward_slashing_rate: u64, epoch_start_timestamp_ms: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function load_system_state​
[code] 
    **fun** [load_system_state](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_load_system_state>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>)): &[sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>)
    
[/code]

## Function load_system_state_mut​
[code] 
    **fun** [load_system_state_mut](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_load_system_state_mut>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>)): &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>)
    
[/code]

## Function load_system_state_ref​
[code] 
    **fun** [load_system_state_ref](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_load_system_state_ref>)(self: &[sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>)): &[sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>)
    
[/code]

## Function load_inner_maybe_upgrade​
[code] 
    **fun** [load_inner_maybe_upgrade](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_load_inner_maybe_upgrade>)(self: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>)): &**mut** [sui_system::sui_system_state_inner::SuiSystemStateInnerV2](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner_SuiSystemStateInnerV2>)
    
[/code]

## Function validator_voting_powers​

Returns the voting power of the active validators, values are voting power in the scale of 10000.
[code] 
    **fun** [validator_voting_powers](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_validator_voting_powers>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>)): [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , u64>
    
[/code]

## Function store_execution_time_estimates​

Saves the given execution time estimate blob to the SuiSystemState object, for system use at the start of the next epoch.
[code] 
    **fun** [store_execution_time_estimates](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_store_execution_time_estimates>)(wrapper: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), estimates_bytes: vector<u8>)
    
[/code]

* * *

_This page has been truncated because it exceeds the maximum character limit.[View the full source](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui_system/sui_system.md>)._

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui_system/sui_system.md>)

[Previousstorage_fund](</references/framework/sui_sui_system/storage_fund>)[Nextsui_system_state_inner](</references/framework/sui_sui_system/sui_system_state_inner>)
