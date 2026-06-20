<!-- Source: https://docs.sui.io/references/framework/sui_sui_system/staking_pool -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [system](</references/framework/sui_sui_system>)
  * staking_pool


# Module sui_system::staking_pool
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

## Struct StakingPool​

A staking pool embedded in each validator struct in the system state object.
[code] 
    **public** **struct** [StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[activation_epoch](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_activation_epoch>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u64>
     The epoch at which this pool became active.  
The value is None if the pool is pre-active and Some(<epoch_number>) if active or inactive. 
deactivation_epoch: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u64>
     The epoch at which this staking pool ceased to be active. None = {pre-active, active}, Some(<epoch_number>) if in-active, and it was de-activated at epoch <epoch_number>. 
[sui_balance](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_sui_balance>): u64
     The total number of SUI tokens in this pool, including the SUI in the rewards_pool, as well as in all the principal in the [StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>) object, updated at epoch boundaries. 
rewards_pool: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
     The epoch stake rewards will be added here at the end of each epoch. 
pool_token_balance: u64
     Total number of pool tokens issued by the pool. 
[exchange_rates](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_exchange_rates>): [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<u64, [sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>)>
     Exchange rate history of previous epochs. Key is the epoch number.  
The entries start from the [activation_epoch](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_activation_epoch>) of this pool and contains exchange rates at the beginning of each epoch, i.e., right after the rewards for the previous epoch have been deposited into the pool. 
pending_stake: u64
     Pending stake amount for this epoch, emptied at epoch boundaries. 
pending_total_sui_withdraw: u64
     Pending stake withdrawn during the current epoch, emptied at epoch boundaries.  
This includes both the principal and rewards SUI withdrawn. 
pending_pool_token_withdraw: u64
     Pending pool token withdrawn during the current epoch, emptied at epoch boundaries. 
extra_fields: [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     Any extra fields that's not defined statically. 

## Struct PoolTokenExchangeRate​

Struct representing the exchange rate of the stake pool token to SUI.
[code] 
    **public** **struct** [PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>) **has** **copy** , drop, store
    
[/code]

Click to openFields

[sui_amount](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_sui_amount>): u64
    
[pool_token_amount](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_pool_token_amount>): u64
    

## Struct StakedSui​

A self-custodial object holding the staked SUI tokens.
[code] 
    **public** **struct** [StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[pool_id](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_pool_id>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     ID of the staking pool we are staking with. 
[stake_activation_epoch](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_stake_activation_epoch>): u64
     The epoch at which the stake becomes active. 
principal: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
     The staked SUI tokens. 

## Struct FungibleStakedSui​

An alternative to [StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>) that holds the pool token amount instead of the SUI balance.  
StakedSui objects can be converted to FungibleStakedSuis after the initial warmup period.  
The advantage of this is that you can now merge multiple StakedSui objects from different activation epochs into a single FungibleStakedSui object.
[code] 
    **public** **struct** [FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[pool_id](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_pool_id>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     ID of the staking pool we are staking with. 
value: u64
     The pool token amount. 

## Struct FungibleStakedSuiData​

Holds useful information
[code] 
    **public** **struct** [FungibleStakedSuiData](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSuiData>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
total_supply: u64
     fungible_staked_sui supply 
principal: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
     principal balance. Rewards are withdrawn from the reward pool 

## Struct FungibleStakedSuiDataKey​
[code] 
    **public** **struct** [FungibleStakedSuiDataKey](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSuiDataKey>) **has** **copy** , drop, store
    
[/code]

## Struct UnderflowSuiBalance​

Holds the amount of SUI that was underflowed when withdrawing from the pool post safe mode. Cleaned up in the same transaction.
[code] 
    **public** **struct** [UnderflowSuiBalance](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_UnderflowSuiBalance>) **has** **copy** , drop, store
    
[/code]

## Constants​

StakedSui objects cannot be split to below this amount.
[code] 
    **const** [MIN_STAKING_THRESHOLD](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_MIN_STAKING_THRESHOLD>): u64 = 1000000000;
    
[/code]
[code] 
    **const** [EInsufficientPoolTokenBalance](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EInsufficientPoolTokenBalance>): u64 = 0;
    
[/code]
[code] 
    **const** [EWrongPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EWrongPool>): u64 = 1;
    
[/code]
[code] 
    **const** [EWithdrawAmountCannotBeZero](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EWithdrawAmountCannotBeZero>): u64 = 2;
    
[/code]
[code] 
    **const** [EInsufficientSuiTokenBalance](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EInsufficientSuiTokenBalance>): u64 = 3;
    
[/code]
[code] 
    **const** [EInsufficientRewardsPoolBalance](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EInsufficientRewardsPoolBalance>): u64 = 4;
    
[/code]
[code] 
    **const** [EDestroyNonzeroBalance](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EDestroyNonzeroBalance>): u64 = 5;
    
[/code]
[code] 
    **const** [ETokenTimeLockIsSome](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_ETokenTimeLockIsSome>): u64 = 6;
    
[/code]
[code] 
    **const** [EWrongDelegation](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EWrongDelegation>): u64 = 7;
    
[/code]
[code] 
    **const** [EPendingDelegationDoesNotExist](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EPendingDelegationDoesNotExist>): u64 = 8;
    
[/code]
[code] 
    **const** [ETokenBalancesDoNotMatchExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_ETokenBalancesDoNotMatchExchangeRate>): u64 = 9;
    
[/code]
[code] 
    **const** [EDelegationToInactivePool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EDelegationToInactivePool>): u64 = 10;
    
[/code]
[code] 
    **const** [EDeactivationOfInactivePool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EDeactivationOfInactivePool>): u64 = 11;
    
[/code]
[code] 
    **const** [EIncompatibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EIncompatibleStakedSui>): u64 = 12;
    
[/code]
[code] 
    **const** [EWithdrawalInSameEpoch](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EWithdrawalInSameEpoch>): u64 = 13;
    
[/code]
[code] 
    **const** [EPoolAlreadyActive](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EPoolAlreadyActive>): u64 = 14;
    
[/code]
[code] 
    **const** [EPoolPreactiveOrInactive](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EPoolPreactiveOrInactive>): u64 = 15;
    
[/code]
[code] 
    **const** [EActivationOfInactivePool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EActivationOfInactivePool>): u64 = 16;
    
[/code]
[code] 
    **const** [EDelegationOfZeroSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EDelegationOfZeroSui>): u64 = 17;
    
[/code]
[code] 
    **const** [EStakedSuiBelowThreshold](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EStakedSuiBelowThreshold>): u64 = 18;
    
[/code]
[code] 
    **const** [ECannotMintFungibleStakedSuiYet](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_ECannotMintFungibleStakedSuiYet>): u64 = 19;
    
[/code]
[code] 
    **const** [EInvariantFailure](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_EInvariantFailure>): u64 = 20;
    
[/code]

## Function new​

Create a new, empty staking pool.
[code] 
    **public**(package) **fun** [new](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_new>)(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>)
    
[/code]

## Function request_add_stake​

Request to stake to a staking pool. The stake starts counting at the beginning of the next epoch,
[code] 
    **public**(package) **fun** [request_add_stake](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_request_add_stake>)(pool: &**mut** [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), stake: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, [stake_activation_epoch](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_stake_activation_epoch>): u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)
    
[/code]

## Function request_withdraw_stake​

Request to withdraw the given stake plus rewards from a staking pool.  
Both the principal and corresponding rewards in SUI are withdrawn.  
A proportional amount of pool token withdraw is recorded and processed at epoch change time.
[code] 
    **public**(package) **fun** [request_withdraw_stake](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_request_withdraw_stake>)(pool: &**mut** [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function redeem_fungible_staked_sui​
[code] 
    **public**(package) **fun** [redeem_fungible_staked_sui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_redeem_fungible_staked_sui>)(pool: &**mut** [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), fungible_staked_sui: [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function calculate_fungible_staked_sui_withdraw_amount​

written in separate function so i can test with random values returns (principal_withdraw_amount, rewards_withdraw_amount)
[code] 
    **fun** [calculate_fungible_staked_sui_withdraw_amount](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_calculate_fungible_staked_sui_withdraw_amount>)(latest_exchange_rate: [sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>), [fungible_staked_sui_value](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_fungible_staked_sui_value>): u64, fungible_staked_sui_data_principal_amount: u64, fungible_staked_sui_data_total_supply: u64): (u64, u64)
    
[/code]

## Function convert_to_fungible_staked_sui​

Convert the given staked SUI to an FungibleStakedSui object
[code] 
    **public**(package) **fun** [convert_to_fungible_staked_sui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_convert_to_fungible_staked_sui>)(pool: &**mut** [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>)
    
[/code]

## Function withdraw_from_principal​

Withdraw the principal SUI stored in the StakedSui object, and calculate the corresponding amount of pool tokens using exchange rate at staking epoch.  
Returns values are amount of pool tokens withdrawn and withdrawn principal portion of SUI.
[code] 
    **public**(package) **fun** [withdraw_from_principal](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_withdraw_from_principal>)(pool: &[sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)): (u64, [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>)
    
[/code]

## Function unwrap_staked_sui​
[code] 
    **fun** [unwrap_staked_sui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_unwrap_staked_sui>)(staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function deposit_rewards​

Called at epoch advancement times to add rewards (in SUI) to the staking pool.
[code] 
    **public**(package) **fun** [deposit_rewards](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_deposit_rewards>)(pool: &**mut** [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), rewards: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>)
    
[/code]

## Function process_pending_stakes_and_withdraws​
[code] 
    **public**(package) **fun** [process_pending_stakes_and_withdraws](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_process_pending_stakes_and_withdraws>)(pool: &**mut** [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function process_pending_stake_withdraw​

Called at epoch boundaries to process pending stake withdraws requested during the epoch.  
Also called immediately upon withdrawal if the pool is inactive.
[code] 
    **fun** [process_pending_stake_withdraw](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_process_pending_stake_withdraw>)(pool: &**mut** [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>))
    
[/code]

## Function process_pending_stake​

Called at epoch boundaries to process the pending stake.
[code] 
    **public**(package) **fun** [process_pending_stake](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_process_pending_stake>)(pool: &**mut** [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>))
    
[/code]

## Function withdraw_rewards​

This function does the following: 1\. Calculates the total amount of SUI (including principal and rewards) that the provided pool tokens represent at the current exchange rate. 2\. Using the above number and the given principal_withdraw_amount, calculates the rewards portion of the stake we should withdraw. 3\. Withdraws the rewards portion from the rewards pool at the current exchange rate. We only withdraw the rewards portion because the principal portion was already taken out of the staker's self custodied StakedSui.
[code] 
    **fun** [withdraw_rewards](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_withdraw_rewards>)(pool: &**mut** [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), principal_withdraw_amount: u64, pool_token_withdraw_amount: u64, epoch: u64): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function activate_staking_pool​

Called by [validator](</references/framework/sui_sui_system/validator#sui_system_validator>) module to activate a staking pool.
[code] 
    **public**(package) **fun** [activate_staking_pool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_activate_staking_pool>)(pool: &**mut** [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), [activation_epoch](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_activation_epoch>): u64)
    
[/code]

## Function deactivate_staking_pool​

Deactivate a staking pool by setting the deactivation_epoch. After this pool deactivation, the pool stops earning rewards. Only stake withdraws can be made to the pool.
[code] 
    **public**(package) **fun** [deactivate_staking_pool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_deactivate_staking_pool>)(pool: &**mut** [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), deactivation_epoch: u64)
    
[/code]

## Function sui_balance​
[code] 
    **public** **fun** [sui_balance](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_sui_balance>)(pool: &[sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>)): u64
    
[/code]

## Function pool_id​
[code] 
    **public** **fun** [pool_id](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_pool_id>)(staked_sui: &[sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function fungible_staked_sui_pool_id​
[code] 
    **public** **fun** [fungible_staked_sui_pool_id](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_fungible_staked_sui_pool_id>)(fungible_staked_sui: &[sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>)): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function staked_sui_amount​

Returns the principal amount of [StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>).
[code] 
    **public** **fun** [staked_sui_amount](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_staked_sui_amount>)(staked_sui: &[sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)): u64
    
[/code]

## Function stake_activation_epoch​

Returns the activation epoch of [StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>).
[code] 
    **public** **fun** [stake_activation_epoch](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_stake_activation_epoch>)(staked_sui: &[sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)): u64
    
[/code]

## Function is_preactive​

Returns true if the input staking pool is preactive.
[code] 
    **public** **fun** [is_preactive](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_is_preactive>)(pool: &[sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>)): bool
    
[/code]

## Function activation_epoch​

Returns the activation epoch of the [StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>). For validator candidates, or pending validators, the value returned is None. For active validators, the value is the epoch before the validator was activated.
[code] 
    **public**(package) **fun** [activation_epoch](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_activation_epoch>)(pool: &[sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u64>
    
[/code]

## Function is_inactive​

Returns true if the input staking pool is inactive.
[code] 
    **public** **fun** [is_inactive](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_is_inactive>)(pool: &[sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>)): bool
    
[/code]

## Function fungible_staked_sui_value​
[code] 
    **public** **fun** [fungible_staked_sui_value](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_fungible_staked_sui_value>)(fungible_staked_sui: &[sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>)): u64
    
[/code]

## Function split_fungible_staked_sui​
[code] 
    **public** **fun** [split_fungible_staked_sui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_split_fungible_staked_sui>)(fungible_staked_sui: &**mut** [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>), split_amount: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>)
    
[/code]

## Function join_fungible_staked_sui​
[code] 
    **public** **fun** [join_fungible_staked_sui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_join_fungible_staked_sui>)(self: &**mut** [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>), other: [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>))
    
[/code]

## Function split​

Split StakedSui self to two parts, one with principal split_amount, and the remaining principal is left in self.  
All the other parameters of the StakedSui like [stake_activation_epoch](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_stake_activation_epoch>) or [pool_id](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_pool_id>) remain the same.
[code] 
    **public** **fun** [split](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_split>)(self: &**mut** [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), split_amount: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)
    
[/code]

## Function split_staked_sui​

Split the given StakedSui to the two parts, one with principal split_amount, transfer the newly split part to the sender address.
[code] 
    **public** **entry** **fun** [split_staked_sui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_split_staked_sui>)(stake: &**mut** [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), split_amount: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function join_staked_sui​

Consume the staked sui other and add its value to self.  
Aborts if some of the staking parameters are incompatible (pool id, stake activation epoch, etc.)
[code] 
    **public** **entry** **fun** [join_staked_sui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_join_staked_sui>)(self: &**mut** [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), other: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>))
    
[/code]

## Function is_equal_staking_metadata​

Returns true if all the staking parameters of the staked sui except the principal are identical
[code] 
    **public** **fun** [is_equal_staking_metadata](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_is_equal_staking_metadata>)(self: &[sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), other: &[sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)): bool
    
[/code]

## Function pool_token_exchange_rate_at_epoch​
[code] 
    **public** **fun** [pool_token_exchange_rate_at_epoch](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_pool_token_exchange_rate_at_epoch>)(pool: &[sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), epoch: u64): [sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>)
    
[/code]

## Function pending_stake_amount​

Returns the total value of the pending staking requests for this staking pool.
[code] 
    **public** **fun** [pending_stake_amount](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_pending_stake_amount>)([staking_pool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool>): &[sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>)): u64
    
[/code]

## Function pending_stake_withdraw_amount​

Returns the total withdrawal from the staking pool this epoch.
[code] 
    **public** **fun** [pending_stake_withdraw_amount](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_pending_stake_withdraw_amount>)([staking_pool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool>): &[sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>)): u64
    
[/code]

## Function exchange_rates​
[code] 
    **public**(package) **fun** [exchange_rates](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_exchange_rates>)(pool: &[sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>)): &[sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<u64, [sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>)>
    
[/code]

## Function sui_amount​
[code] 
    **public** **fun** [sui_amount](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_sui_amount>)(exchange_rate: &[sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>)): u64
    
[/code]

## Function pool_token_amount​
[code] 
    **public** **fun** [pool_token_amount](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_pool_token_amount>)(exchange_rate: &[sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>)): u64
    
[/code]

## Function is_preactive_at_epoch​

Returns true if the provided staking pool is preactive at the provided epoch.
[code] 
    **fun** [is_preactive_at_epoch](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_is_preactive_at_epoch>)(pool: &[sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), epoch: u64): bool
    
[/code]

## Function get_sui_amount​
[code] 
    **fun** [get_sui_amount](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_get_sui_amount>)(exchange_rate: &[sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>), token_amount: u64): u64
    
[/code]

## Function get_token_amount​
[code] 
    **fun** [get_token_amount](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_get_token_amount>)(exchange_rate: &[sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>), [sui_amount](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_sui_amount>): u64): u64
    
[/code]

## Function initial_exchange_rate​
[code] 
    **fun** [initial_exchange_rate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_initial_exchange_rate>)(): [sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>)
    
[/code]

## Function check_balance_invariants​
[code] 
    **fun** [check_balance_invariants](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_check_balance_invariants>)(pool: &[sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), epoch: u64)
    
[/code]

## Macro function mul_div​
[code] 
    **macro** **fun** [mul_div](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_mul_div>)($a: u64, $b: u64, $c: u64): u64
    
[/code]

## Function calculate_rewards​
[code] 
    **public**(package) **fun** [calculate_rewards](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_calculate_rewards>)(pool: &[sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>), staked_sui: &[sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), current_epoch: u64): u64
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui_system/staking_pool.md>)

[Previousstake_subsidy](</references/framework/sui_sui_system/stake_subsidy>)[Nextstorage_fund](</references/framework/sui_sui_system/storage_fund>)
