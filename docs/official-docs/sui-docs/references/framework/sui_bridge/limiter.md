<!-- Source: https://docs.sui.io/references/framework/sui_bridge/limiter -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [bridge](</references/framework/sui_bridge>)
  * limiter


# Module bridge::limiter
[code]
    **use** [bridge::chain_ids](</references/framework/sui_bridge/chain_ids#bridge_chain_ids>);
    **use** [bridge::treasury](</references/framework/sui_bridge/treasury#bridge_treasury>);
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
    **use** [sui::clock](</references/framework/sui_sui/clock#sui_clock>);
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
    **use** [sui::object_bag](</references/framework/sui_sui/object_bag#sui_object_bag>);
    **use** [sui::package](</references/framework/sui_sui/package#sui_package>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::protocol_config](</references/framework/sui_sui/protocol_config#sui_protocol_config>);
    **use** [sui::table](</references/framework/sui_sui/table#sui_table>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::types](</references/framework/sui_sui/types#sui_types>);
    **use** [sui::url](</references/framework/sui_sui/url#sui_url>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::vec_set](</references/framework/sui_sui/vec_set#sui_vec_set>);
    
[/code]

## Struct TransferLimiter​
[code] 
    **public** **struct** [TransferLimiter](</references/framework/sui_bridge/limiter#bridge_limiter_TransferLimiter>) **has** store
    
[/code]

Click to openFields

transfer_limits: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<[bridge::chain_ids::BridgeRoute](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute>), u64>
    
transfer_records: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<[bridge::chain_ids::BridgeRoute](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute>), [bridge::limiter::TransferRecord](</references/framework/sui_bridge/limiter#bridge_limiter_TransferRecord>)>
    

## Struct TransferRecord​
[code] 
    **public** **struct** [TransferRecord](</references/framework/sui_bridge/limiter#bridge_limiter_TransferRecord>) **has** store
    
[/code]

Click to openFields

hour_head: u64
    
hour_tail: u64
    
per_hour_amounts: vector<u64>
    
total_amount: u64
    

## Struct UpdateRouteLimitEvent​
[code] 
    **public** **struct** [UpdateRouteLimitEvent](</references/framework/sui_bridge/limiter#bridge_limiter_UpdateRouteLimitEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

sending_chain: u8
    
receiving_chain: u8
    
new_limit: u64
    

## Constants​
[code] 
    **const** [ELimitNotFoundForRoute](</references/framework/sui_bridge/limiter#bridge_limiter_ELimitNotFoundForRoute>): u64 = 0;
    
[/code]
[code] 
    **const** [MAX_TRANSFER_LIMIT](</references/framework/sui_bridge/limiter#bridge_limiter_MAX_TRANSFER_LIMIT>): u64 = 18446744073709551615;
    
[/code]
[code] 
    **const** [USD_VALUE_MULTIPLIER](</references/framework/sui_bridge/limiter#bridge_limiter_USD_VALUE_MULTIPLIER>): u64 = 100000000;
    
[/code]

## Function get_route_limit​
[code] 
    **public** **fun** [get_route_limit](</references/framework/sui_bridge/limiter#bridge_limiter_get_route_limit>)(self: &[bridge::limiter::TransferLimiter](</references/framework/sui_bridge/limiter#bridge_limiter_TransferLimiter>), route: &[bridge::chain_ids::BridgeRoute](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute>)): u64
    
[/code]

## Function new​
[code] 
    **public**(package) **fun** [new](</references/framework/sui_bridge/limiter#bridge_limiter_new>)(): [bridge::limiter::TransferLimiter](</references/framework/sui_bridge/limiter#bridge_limiter_TransferLimiter>)
    
[/code]

## Function check_and_record_sending_transfer​
[code] 
    **public**(package) **fun** [check_and_record_sending_transfer](</references/framework/sui_bridge/limiter#bridge_limiter_check_and_record_sending_transfer>)<T>(self: &**mut** [bridge::limiter::TransferLimiter](</references/framework/sui_bridge/limiter#bridge_limiter_TransferLimiter>), [treasury](</references/framework/sui_bridge/treasury#bridge_treasury>): &[bridge::treasury::BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>), clock: &[sui::clock::Clock](</references/framework/sui_sui/clock#sui_clock_Clock>), route: [bridge::chain_ids::BridgeRoute](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute>), amount: u64): bool
    
[/code]

## Function update_route_limit​
[code] 
    **public**(package) **fun** [update_route_limit](</references/framework/sui_bridge/limiter#bridge_limiter_update_route_limit>)(self: &**mut** [bridge::limiter::TransferLimiter](</references/framework/sui_bridge/limiter#bridge_limiter_TransferLimiter>), route: &[bridge::chain_ids::BridgeRoute](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute>), new_usd_limit: u64)
    
[/code]

## Function current_hour_since_epoch​
[code] 
    **fun** [current_hour_since_epoch](</references/framework/sui_bridge/limiter#bridge_limiter_current_hour_since_epoch>)(clock: &[sui::clock::Clock](</references/framework/sui_sui/clock#sui_clock_Clock>)): u64
    
[/code]

## Function adjust_transfer_records​
[code] 
    **fun** [adjust_transfer_records](</references/framework/sui_bridge/limiter#bridge_limiter_adjust_transfer_records>)(self: &**mut** [bridge::limiter::TransferRecord](</references/framework/sui_bridge/limiter#bridge_limiter_TransferRecord>), [current_hour_since_epoch](</references/framework/sui_bridge/limiter#bridge_limiter_current_hour_since_epoch>): u64)
    
[/code]

## Function initial_transfer_limits​
[code] 
    **fun** [initial_transfer_limits](</references/framework/sui_bridge/limiter#bridge_limiter_initial_transfer_limits>)(): [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<[bridge::chain_ids::BridgeRoute](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute>), u64>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_bridge/limiter.md>)

[Previouscrypto](</references/framework/sui_bridge/crypto>)[Nextmessage](</references/framework/sui_bridge/message>)
