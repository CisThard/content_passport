<!-- Source: https://docs.sui.io/references/framework/sui_sui_system/storage_fund -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [system](</references/framework/sui_sui_system>)
  * storage_fund


# Module sui_system::storage_fund
[code]
    **use** [std::address](</references/framework/sui_std/address#std_address>);
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::internal](</references/framework/sui_std/internal#std_internal>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::type_name](</references/framework/sui_std/type_name#std_type_name>);
    **use** [std::u128](</references/framework/sui_std/u128#std_u128>);
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

## Struct StorageFund​

Struct representing the storage fund, containing two Balances:

  * [total_object_storage_rebates](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates>) has the invariant that it's the sum of storage_rebate of all objects currently stored on-chain. To maintain this invariant, the only inflow of this balance is storage charges collected from transactions, and the only outflow is storage rebates of transactions, including both the portion refunded to the transaction senders as well as the non-refundable portion taken out and put into non_refundable_balance.
  * non_refundable_balance contains any remaining inflow of the storage fund that should not be taken out of the fund.


[code] 
    **public** **struct** [StorageFund](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund>) **has** store
    
[/code]

Click to openFields

[total_object_storage_rebates](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
non_refundable_balance: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    

## Function new​

Called by [sui_system](</references/framework/sui_sui_system/sui_system#sui_system_sui_system>) at genesis time.
[code] 
    **public**(package) **fun** [new](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_new>)(initial_fund: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>): [sui_system::storage_fund::StorageFund](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund>)
    
[/code]

## Function advance_epoch​

Called by [sui_system](</references/framework/sui_sui_system/sui_system#sui_system_sui_system>) at epoch change times to process the inflows and outflows of storage fund.
[code] 
    **public**(package) **fun** [advance_epoch](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_advance_epoch>)(self: &**mut** [sui_system::storage_fund::StorageFund](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund>), storage_charges: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, storage_fund_reinvestment: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, leftover_staking_rewards: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, storage_rebate_amount: u64, non_refundable_storage_fee_amount: u64): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function total_object_storage_rebates​
[code] 
    **public** **fun** [total_object_storage_rebates](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates>)(self: &[sui_system::storage_fund::StorageFund](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund>)): u64
    
[/code]

## Function total_balance​
[code] 
    **public** **fun** [total_balance](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_total_balance>)(self: &[sui_system::storage_fund::StorageFund](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund>)): u64
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui_system/storage_fund.md>)

[Previousstaking_pool](</references/framework/sui_sui_system/staking_pool>)[Nextsui_system](</references/framework/sui_sui_system/sui_system>)
