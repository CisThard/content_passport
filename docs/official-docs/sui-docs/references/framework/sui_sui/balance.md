<!-- Source: https://docs.sui.io/references/framework/sui_sui/balance -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * balance


# Module sui::balance

A storable handler for Balances in general. Is used in the Coin module to allow balance operations and can be used to implement custom coins with [Supply](</references/framework/sui_sui/balance#sui_balance_Supply>) and [Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)s.
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
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::funds_accumulator](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::protocol_config](</references/framework/sui_sui/protocol_config#sui_protocol_config>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct Supply​

A Supply of T. Used for minting and burning.  
Wrapped into a TreasuryCap in the Coin module.
[code] 
    **public** **struct** [Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<**phantom** T> **has** store
    
[/code]

Click to openFields

[value](</references/framework/sui_sui/balance#sui_balance_value>): u64
    

## Struct Balance​

Storable balance - an inner struct of a Coin type.  
Can be used to store coins which don't need the key ability.
[code] 
    **public** **struct** [Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<**phantom** T> **has** store
    
[/code]

Click to openFields

[value](</references/framework/sui_sui/balance#sui_balance_value>): u64
    

## Constants​

For when trying to destroy a non-zero balance.
[code] 
    **const** [ENonZero](</references/framework/sui_sui/balance#sui_balance_ENonZero>): u64 = 0;
    
[/code]

For when an overflow is happening on Supply operations.
[code] 
    **const** [EOverflow](</references/framework/sui_sui/balance#sui_balance_EOverflow>): u64 = 1;
    
[/code]

For when trying to withdraw more than there is.
[code] 
    **const** [ENotEnough](</references/framework/sui_sui/balance#sui_balance_ENotEnough>): u64 = 2;
    
[/code]

Sender is not @0x0 the system address.
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_sui/balance#sui_balance_ENotSystemAddress>): u64 = 3;
    
[/code]

System operation performed for a coin other than SUI
[code] 
    **const** [ENotSUI](</references/framework/sui_sui/balance#sui_balance_ENotSUI>): u64 = 4;
    
[/code]
[code] 
    **const** [SUI_TYPE_NAME](</references/framework/sui_sui/balance#sui_balance_SUI_TYPE_NAME>): vector<u8> = vector[48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 48, 50, 58, 58, 115, 117, 105, 58, 58, 83, 85, 73];
    
[/code]

## Function value​

Get the amount stored in a [Balance](</references/framework/sui_sui/balance#sui_balance_Balance>).
[code] 
    **public** **fun** [value](</references/framework/sui_sui/balance#sui_balance_value>)<T>(self: &[sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>): u64
    
[/code]

## Function supply_value​

Get the [Supply](</references/framework/sui_sui/balance#sui_balance_Supply>) value.
[code] 
    **public** **fun** [supply_value](</references/framework/sui_sui/balance#sui_balance_supply_value>)<T>(supply: &[sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>): u64
    
[/code]

## Function create_supply​

Create a new supply for type T.
[code] 
    **public** **fun** [create_supply](</references/framework/sui_sui/balance#sui_balance_create_supply>)<T: drop>(_: T): [sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>
    
[/code]

## Function increase_supply​

Increase supply by [value](</references/framework/sui_sui/balance#sui_balance_value>) and create a new [Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T> with this value.
[code] 
    **public** **fun** [increase_supply](</references/framework/sui_sui/balance#sui_balance_increase_supply>)<T>(self: &**mut** [sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>, [value](</references/framework/sui_sui/balance#sui_balance_value>): u64): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
    
[/code]

## Function decrease_supply​

Burn a Balance and decrease Supply.
[code] 
    **public** **fun** [decrease_supply](</references/framework/sui_sui/balance#sui_balance_decrease_supply>)<T>(self: &**mut** [sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>, [balance](</references/framework/sui_sui/balance#sui_balance>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>): u64
    
[/code]

## Function zero​

Create a zero [Balance](</references/framework/sui_sui/balance#sui_balance_Balance>) for type T.
[code] 
    **public** **fun** [zero](</references/framework/sui_sui/balance#sui_balance_zero>)<T>(): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
    
[/code]

## Function join​

Join two balances together.
[code] 
    **public** **fun** [join](</references/framework/sui_sui/balance#sui_balance_join>)<T>(self: &**mut** [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>, [balance](</references/framework/sui_sui/balance#sui_balance>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>): u64
    
[/code]

## Function split​

Split a [Balance](</references/framework/sui_sui/balance#sui_balance_Balance>) and take a sub balance from it.
[code] 
    **public** **fun** [split](</references/framework/sui_sui/balance#sui_balance_split>)<T>(self: &**mut** [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>, [value](</references/framework/sui_sui/balance#sui_balance_value>): u64): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
    
[/code]

## Function withdraw_all​

Withdraw all balance. After this the remaining balance must be 0.
[code] 
    **public** **fun** [withdraw_all](</references/framework/sui_sui/balance#sui_balance_withdraw_all>)<T>(self: &**mut** [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
    
[/code]

## Function destroy_zero​

Destroy a zero [Balance](</references/framework/sui_sui/balance#sui_balance_Balance>).
[code] 
    **public** **fun** [destroy_zero](</references/framework/sui_sui/balance#sui_balance_destroy_zero>)<T>([balance](</references/framework/sui_sui/balance#sui_balance>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>)
    
[/code]

## Function send_funds​

Send a [Balance](</references/framework/sui_sui/balance#sui_balance_Balance>) to an address's funds accumulator.
[code] 
    **public** **fun** [send_funds](</references/framework/sui_sui/balance#sui_balance_send_funds>)<T>([balance](</references/framework/sui_sui/balance#sui_balance>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>, recipient: **address**)
    
[/code]

## Function redeem_funds​

Redeem a Withdrawal<[Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>> to get the underlying [Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T> from an address's funds accumulator.
[code] 
    **public** **fun** [redeem_funds](</references/framework/sui_sui/balance#sui_balance_redeem_funds>)<T>(withdrawal: [sui::funds_accumulator::Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<[sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
    
[/code]

## Function withdraw_funds_from_object​

Create a Withdrawal<[Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>> from an object to withdraw funds from it.
[code] 
    **public** **fun** [withdraw_funds_from_object](</references/framework/sui_sui/balance#sui_balance_withdraw_funds_from_object>)<T>(obj: &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), [value](</references/framework/sui_sui/balance#sui_balance_value>): u64): [sui::funds_accumulator::Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<[sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>>
    
[/code]

## Function settled_funds_value​

Read the value of the funds of type T owned by **address** as of the beginning of the current consensus commit. Can read either address-owned or object-owned balances.
[code] 
    **public** **fun** [settled_funds_value](</references/framework/sui_sui/balance#sui_balance_settled_funds_value>)<T>(root: &[sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>), **address** : **address**): u64
    
[/code]

## Function create_supply_internal​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [create_supply_internal](</references/framework/sui_sui/balance#sui_balance_create_supply_internal>)<T>(): [sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>
    
[/code]

## Function create_staking_rewards​

CAUTION: this function creates a [Balance](</references/framework/sui_sui/balance#sui_balance_Balance>) without increasing the supply.  
It should only be called by the epoch change system txn to create staking rewards, and nowhere else.
[code] 
    **fun** [create_staking_rewards](</references/framework/sui_sui/balance#sui_balance_create_staking_rewards>)<T>([value](</references/framework/sui_sui/balance#sui_balance_value>): u64, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
    
[/code]

## Function destroy_storage_rebates​

CAUTION: this function destroys a [Balance](</references/framework/sui_sui/balance#sui_balance_Balance>) without decreasing the supply.  
It should only be called by the epoch change system txn to destroy storage rebates, and nowhere else.
[code] 
    **fun** [destroy_storage_rebates](</references/framework/sui_sui/balance#sui_balance_destroy_storage_rebates>)<T>(self: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function destroy_supply​

Destroy a [Supply](</references/framework/sui_sui/balance#sui_balance_Supply>) preventing any further minting and burning.
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [destroy_supply](</references/framework/sui_sui/balance#sui_balance_destroy_supply>)<T>(self: [sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>): u64
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/balance.md>)

[Previousbag](</references/framework/sui_sui/bag>)[Nextbcs](</references/framework/sui_sui/bcs>)
