<!-- Source: https://docs.sui.io/references/framework/sui_sui/coin -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * coin


# Module sui::coin

Defines the [Coin](</references/framework/sui_sui/coin#sui_coin_Coin>) type - platform wide representation of fungible tokens and coins. [Coin](</references/framework/sui_sui/coin#sui_coin_Coin>) can be described as a secure wrapper around Balance type.
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
    **use** [sui::table](</references/framework/sui_sui/table#sui_table>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::types](</references/framework/sui_sui/types#sui_types>);
    **use** [sui::url](</references/framework/sui_sui/url#sui_url>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::vec_set](</references/framework/sui_sui/vec_set#sui_vec_set>);
    
[/code]

## Struct Coin​

A coin of type T worth [value](</references/framework/sui_sui/coin#sui_coin_value>). Transferable and storable
[code] 
    **public** **struct** [Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<**phantom** T> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[balance](</references/framework/sui_sui/balance#sui_balance>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
    

## Struct CoinMetadata​

Each Coin type T created through [create_currency](</references/framework/sui_sui/coin#sui_coin_create_currency>) function will have a unique instance of CoinMetadata that stores the metadata for this coin type.
[code] 
    **public** **struct** [CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<**phantom** T> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
decimals: u8
     Number of decimal places the coin uses.  
A coin with [value](</references/framework/sui_sui/coin#sui_coin_value>) N and decimals D should be shown as N / 10^D.  
E.g., a coin with [value](</references/framework/sui_sui/coin#sui_coin_value>) 7002 and decimals 3 should be displayed as 7.002.  
This is metadata for display usage only. 
name: [std::string::String](</references/framework/sui_std/string#std_string_String>)
     Name for the token 
symbol: [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
     Symbol for the token 
description: [std::string::String](</references/framework/sui_std/string#std_string_String>)
     Description of the token 
icon_url: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>)>
     URL for the token logo 

## Struct RegulatedCoinMetadata​

Similar to CoinMetadata, but created only for regulated coins that use the DenyList.  
This object is always immutable.
[code] 
    **public** **struct** [RegulatedCoinMetadata](</references/framework/sui_sui/coin#sui_coin_RegulatedCoinMetadata>)<**phantom** T> **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
coin_metadata_object: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     The ID of the coin's CoinMetadata object. 
deny_cap_object: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     The ID of the coin's DenyCap object. 

## Struct TreasuryCap​

Capability allowing the bearer to mint and burn coins of type T. Transferable
[code] 
    **public** **struct** [TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<**phantom** T> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[total_supply](</references/framework/sui_sui/coin#sui_coin_total_supply>): [sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>
    

## Struct DenyCapV2​

Capability allowing the bearer to deny addresses from using the currency's coins-- immediately preventing those addresses from interacting with the coin as an input to a transaction and at the start of the next preventing them from receiving the coin.  
If [allow_global_pause](</references/framework/sui_sui/coin#sui_coin_allow_global_pause>) is true, the bearer can enable a global pause that behaves as if all addresses were added to the deny list.
[code] 
    **public** **struct** [DenyCapV2](</references/framework/sui_sui/coin#sui_coin_DenyCapV2>)<**phantom** T> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[allow_global_pause](</references/framework/sui_sui/coin#sui_coin_allow_global_pause>): bool
    

## Struct CurrencyCreated​
[code] 
    **public** **struct** [CurrencyCreated](</references/framework/sui_sui/coin#sui_coin_CurrencyCreated>)<**phantom** T> **has** **copy** , drop
    
[/code]

Click to openFields

decimals: u8
    

## Struct DenyCap​

Capability allowing the bearer to freeze addresses, preventing those addresses from interacting with the coin as an input to a transaction.
[code] 
    **public** **struct** [DenyCap](</references/framework/sui_sui/coin#sui_coin_DenyCap>)<**phantom** T> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    

## Constants​

A type passed to create_supply is not a one-time witness.
[code] 
    **const** [EBadWitness](</references/framework/sui_sui/coin#sui_coin_EBadWitness>): u64 = 0;
    
[/code]

Invalid arguments are passed to a function.
[code] 
    **const** [EInvalidArg](</references/framework/sui_sui/coin#sui_coin_EInvalidArg>): u64 = 1;
    
[/code]

Trying to split a coin more times than its balance allows.
[code] 
    **const** [ENotEnough](</references/framework/sui_sui/coin#sui_coin_ENotEnough>): u64 = 2;
    
[/code]
[code] 
    **const** [EGlobalPauseNotAllowed](</references/framework/sui_sui/coin#sui_coin_EGlobalPauseNotAllowed>): u64 = 3;
    
[/code]

The index into the deny list vector for the [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>) type.
[code] 
    **const** [DENY_LIST_COIN_INDEX](</references/framework/sui_sui/coin#sui_coin_DENY_LIST_COIN_INDEX>): u64 = 0;
    
[/code]

## Function total_supply​

Return the total number of T's in circulation.
[code] 
    **public** **fun** [total_supply](</references/framework/sui_sui/coin#sui_coin_total_supply>)<T>(cap: &[sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>): u64
    
[/code]

## Function treasury_into_supply​

Unwrap [TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>) getting the Supply.

Operation is irreversible. Supply cannot be converted into a [TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>) due to different security guarantees (TreasuryCap can be created only once for a type)
[code] 
    **public** **fun** [treasury_into_supply](</references/framework/sui_sui/coin#sui_coin_treasury_into_supply>)<T>(treasury: [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>): [sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>
    
[/code]

## Function supply_immut​

Get immutable reference to the treasury's Supply.
[code] 
    **public** **fun** [supply_immut](</references/framework/sui_sui/coin#sui_coin_supply_immut>)<T>(treasury: &[sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>): &[sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>
    
[/code]

## Function supply_mut​

Get mutable reference to the treasury's Supply.
[code] 
    **public** **fun** [supply_mut](</references/framework/sui_sui/coin#sui_coin_supply_mut>)<T>(treasury: &**mut** [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>): &**mut** [sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>
    
[/code]

## Function value​

Public getter for the coin's value
[code] 
    **public** **fun** [value](</references/framework/sui_sui/coin#sui_coin_value>)<T>(self: &[sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>): u64
    
[/code]

## Function balance​

Get immutable reference to the balance of a coin.
[code] 
    **public** **fun** [balance](</references/framework/sui_sui/balance#sui_balance>)<T>([coin](</references/framework/sui_sui/coin#sui_coin>): &[sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>): &[sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
    
[/code]

## Function balance_mut​

Get a mutable reference to the balance of a coin.
[code] 
    **public** **fun** [balance_mut](</references/framework/sui_sui/coin#sui_coin_balance_mut>)<T>([coin](</references/framework/sui_sui/coin#sui_coin>): &**mut** [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>): &**mut** [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
    
[/code]

## Function from_balance​

Wrap a balance into a Coin to make it transferable.
[code] 
    **public** **fun** [from_balance](</references/framework/sui_sui/coin#sui_coin_from_balance>)<T>([balance](</references/framework/sui_sui/balance#sui_balance>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>
    
[/code]

## Function into_balance​

Destruct a Coin wrapper and keep the balance.
[code] 
    **public** **fun** [into_balance](</references/framework/sui_sui/coin#sui_coin_into_balance>)<T>([coin](</references/framework/sui_sui/coin#sui_coin>): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
    
[/code]

## Function take​

Take a [Coin](</references/framework/sui_sui/coin#sui_coin_Coin>) worth of [value](</references/framework/sui_sui/coin#sui_coin_value>) from Balance.  
Aborts if [value](</references/framework/sui_sui/coin#sui_coin_value>) > [balance](</references/framework/sui_sui/balance#sui_balance>).[value](</references/framework/sui_sui/coin#sui_coin_value>)
[code] 
    **public** **fun** [take](</references/framework/sui_sui/coin#sui_coin_take>)<T>([balance](</references/framework/sui_sui/balance#sui_balance>): &**mut** [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>, [value](</references/framework/sui_sui/coin#sui_coin_value>): u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>
    
[/code]

## Function put​

Put a [Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T> to the Balance<T>.
[code] 
    **public** **fun** [put](</references/framework/sui_sui/coin#sui_coin_put>)<T>([balance](</references/framework/sui_sui/balance#sui_balance>): &**mut** [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>, [coin](</references/framework/sui_sui/coin#sui_coin>): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>)
    
[/code]

## Function redeem_funds​

Redeem a Withdrawal<Balance<T>> and create a [Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T> from the withdrawn Balance.
[code] 
    **public** **fun** [redeem_funds](</references/framework/sui_sui/coin#sui_coin_redeem_funds>)<T>(withdrawal: [sui::funds_accumulator::Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<[sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>
    
[/code]

## Function send_funds​

Send a coin to an address balance
[code] 
    **public** **fun** [send_funds](</references/framework/sui_sui/coin#sui_coin_send_funds>)<T>([coin](</references/framework/sui_sui/coin#sui_coin>): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, recipient: **address**)
    
[/code]

## Function join​

Consume the coin c and add its value to self.  
Aborts if c.[value](</references/framework/sui_sui/coin#sui_coin_value>) \+ self.[value](</references/framework/sui_sui/coin#sui_coin_value>) > U64_MAX
[code] 
    **public** **entry** **fun** [join](</references/framework/sui_sui/coin#sui_coin_join>)<T>(self: &**mut** [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, c: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>)
    
[/code]

## Function split​

Split coin self to two coins, one with balance split_amount, and the remaining balance is left is self.
[code] 
    **public** **fun** [split](</references/framework/sui_sui/coin#sui_coin_split>)<T>(self: &**mut** [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, split_amount: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>
    
[/code]

## Function divide_into_n​

Split coin self into n - 1 coins with equal balances. The remainder is left in self. Return newly created coins.
[code] 
    **public** **fun** [divide_into_n](</references/framework/sui_sui/coin#sui_coin_divide_into_n>)<T>(self: &**mut** [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, n: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): vector<[sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>>
    
[/code]

## Function zero​

Make any Coin with a zero value. Useful for placeholding bids/payments or preemptively making empty balances.
[code] 
    **public** **fun** [zero](</references/framework/sui_sui/coin#sui_coin_zero>)<T>(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>
    
[/code]

## Function destroy_zero​

Destroy a coin with value zero
[code] 
    **public** **fun** [destroy_zero](</references/framework/sui_sui/coin#sui_coin_destroy_zero>)<T>(c: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>)
    
[/code]

## Function create_currency​

Create a new currency type T as and return the [TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>) for T to the caller. Can only be called with a one-time-witness type, ensuring that there's only one [TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>) per T.
[code] 
    **public** **fun** [create_currency](</references/framework/sui_sui/coin#sui_coin_create_currency>)<T: drop>(witness: T, decimals: u8, symbol: vector<u8>, name: vector<u8>, description: vector<u8>, icon_url: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>)>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, [sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>)
    
[/code]

## Function create_regulated_currency_v2​

This creates a new currency, via [create_currency](</references/framework/sui_sui/coin#sui_coin_create_currency>), but with an extra capability that allows for specific addresses to have their coins frozen. When an address is added to the deny list, it is immediately unable to interact with the currency's coin as input objects.  
Additionally at the start of the next epoch, they will be unable to receive the currency's coin.  
The [allow_global_pause](</references/framework/sui_sui/coin#sui_coin_allow_global_pause>) flag enables an additional API that will cause all addresses to be denied. Note however, that this doesn't affect per-address entries of the deny list and will not change the result of the "contains" APIs.
[code] 
    **public** **fun** [create_regulated_currency_v2](</references/framework/sui_sui/coin#sui_coin_create_regulated_currency_v2>)<T: drop>(witness: T, decimals: u8, symbol: vector<u8>, name: vector<u8>, description: vector<u8>, icon_url: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>)>, [allow_global_pause](</references/framework/sui_sui/coin#sui_coin_allow_global_pause>): bool, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, [sui::coin::DenyCapV2](</references/framework/sui_sui/coin#sui_coin_DenyCapV2>)<T>, [sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>)
    
[/code]

## Function migrate_regulated_currency_to_v2​

Given the [DenyCap](</references/framework/sui_sui/coin#sui_coin_DenyCap>) for a regulated currency, migrate it to the new [DenyCapV2](</references/framework/sui_sui/coin#sui_coin_DenyCapV2>) type.  
All entries in the deny list will be migrated to the new format.  
See [create_regulated_currency_v2](</references/framework/sui_sui/coin#sui_coin_create_regulated_currency_v2>) for details on the new v2 of the deny list.
[code] 
    **public** **fun** [migrate_regulated_currency_to_v2](</references/framework/sui_sui/coin#sui_coin_migrate_regulated_currency_to_v2>)<T>([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), cap: [sui::coin::DenyCap](</references/framework/sui_sui/coin#sui_coin_DenyCap>)<T>, [allow_global_pause](</references/framework/sui_sui/coin#sui_coin_allow_global_pause>): bool, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::DenyCapV2](</references/framework/sui_sui/coin#sui_coin_DenyCapV2>)<T>
    
[/code]

## Function mint​

Create a coin worth [value](</references/framework/sui_sui/coin#sui_coin_value>) and increase the total supply in cap accordingly.
[code] 
    **public** **fun** [mint](</references/framework/sui_sui/coin#sui_coin_mint>)<T>(cap: &**mut** [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, [value](</references/framework/sui_sui/coin#sui_coin_value>): u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>
    
[/code]

## Function mint_balance​

Mint some amount of T as a Balance and increase the total supply in cap accordingly.  
Aborts if [value](</references/framework/sui_sui/coin#sui_coin_value>) \+ cap.[total_supply](</references/framework/sui_sui/coin#sui_coin_total_supply>) >= U64_MAX
[code] 
    **public** **fun** [mint_balance](</references/framework/sui_sui/coin#sui_coin_mint_balance>)<T>(cap: &**mut** [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, [value](</references/framework/sui_sui/coin#sui_coin_value>): u64): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
    
[/code]

## Function burn​

Destroy the coin c and decrease the total supply in cap accordingly.
[code] 
    **public** **entry** **fun** [burn](</references/framework/sui_sui/coin#sui_coin_burn>)<T>(cap: &**mut** [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, c: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>): u64
    
[/code]

## Function deny_list_v2_add​

Adds the given address to the deny list, preventing it from interacting with the specified coin type as an input to a transaction. Additionally at the start of the next epoch, the address will be unable to receive objects of this coin type.
[code] 
    **public** **fun** [deny_list_v2_add](</references/framework/sui_sui/coin#sui_coin_deny_list_v2_add>)<T>([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), _deny_cap: &**mut** [sui::coin::DenyCapV2](</references/framework/sui_sui/coin#sui_coin_DenyCapV2>)<T>, addr: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function deny_list_v2_remove​

Removes an address from the deny list. Similar to [deny_list_v2_add](</references/framework/sui_sui/coin#sui_coin_deny_list_v2_add>), the effect for input objects will be immediate, but the effect for receiving objects will be delayed until the next epoch.
[code] 
    **public** **fun** [deny_list_v2_remove](</references/framework/sui_sui/coin#sui_coin_deny_list_v2_remove>)<T>([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), _deny_cap: &**mut** [sui::coin::DenyCapV2](</references/framework/sui_sui/coin#sui_coin_DenyCapV2>)<T>, addr: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function deny_list_v2_contains_current_epoch​

Check if the deny list contains the given address for the current epoch. Denied addresses in the current epoch will be unable to receive objects of this coin type.
[code] 
    **public** **fun** [deny_list_v2_contains_current_epoch](</references/framework/sui_sui/coin#sui_coin_deny_list_v2_contains_current_epoch>)<T>([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &[sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), addr: **address** , ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): bool
    
[/code]

## Function deny_list_v2_contains_next_epoch​

Check if the deny list contains the given address for the next epoch. Denied addresses in the next epoch will immediately be unable to use objects of this coin type as inputs. At the start of the next epoch, the address will be unable to receive objects of this coin type.
[code] 
    **public** **fun** [deny_list_v2_contains_next_epoch](</references/framework/sui_sui/coin#sui_coin_deny_list_v2_contains_next_epoch>)<T>([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &[sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), addr: **address**): bool
    
[/code]

## Function deny_list_v2_enable_global_pause​

Enable the global pause for the given coin type. This will immediately prevent all addresses from using objects of this coin type as inputs. At the start of the next epoch, all addresses will be unable to receive objects of this coin type.
[code] 
    **public** **fun** [deny_list_v2_enable_global_pause](</references/framework/sui_sui/coin#sui_coin_deny_list_v2_enable_global_pause>)<T>([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), deny_cap: &**mut** [sui::coin::DenyCapV2](</references/framework/sui_sui/coin#sui_coin_DenyCapV2>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function deny_list_v2_disable_global_pause​

Disable the global pause for the given coin type. This will immediately allow all addresses to resume using objects of this coin type as inputs. However, receiving objects of this coin type will still be paused until the start of the next epoch.
[code] 
    **public** **fun** [deny_list_v2_disable_global_pause](</references/framework/sui_sui/coin#sui_coin_deny_list_v2_disable_global_pause>)<T>([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), deny_cap: &**mut** [sui::coin::DenyCapV2](</references/framework/sui_sui/coin#sui_coin_DenyCapV2>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function deny_list_v2_is_global_pause_enabled_current_epoch​

Check if the global pause is enabled for the given coin type in the current epoch.
[code] 
    **public** **fun** [deny_list_v2_is_global_pause_enabled_current_epoch](</references/framework/sui_sui/coin#sui_coin_deny_list_v2_is_global_pause_enabled_current_epoch>)<T>([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &[sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): bool
    
[/code]

## Function deny_list_v2_is_global_pause_enabled_next_epoch​

Check if the global pause is enabled for the given coin type in the next epoch.
[code] 
    **public** **fun** [deny_list_v2_is_global_pause_enabled_next_epoch](</references/framework/sui_sui/coin#sui_coin_deny_list_v2_is_global_pause_enabled_next_epoch>)<T>([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &[sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>)): bool
    
[/code]

## Function mint_and_transfer​

Mint amount of [Coin](</references/framework/sui_sui/coin#sui_coin_Coin>) and send it to recipient. Invokes [mint](</references/framework/sui_sui/coin#sui_coin_mint>)().
[code] 
    **public** **entry** **fun** [mint_and_transfer](</references/framework/sui_sui/coin#sui_coin_mint_and_transfer>)<T>(c: &**mut** [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, amount: u64, recipient: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_name​

Update name of the coin in [CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)
[code] 
    **public** **entry** **fun** [update_name](</references/framework/sui_sui/coin#sui_coin_update_name>)<T>(_treasury: &[sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, metadata: &**mut** [sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>, name: [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

## Function update_symbol​

Update the symbol of the coin in [CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)
[code] 
    **public** **entry** **fun** [update_symbol](</references/framework/sui_sui/coin#sui_coin_update_symbol>)<T>(_treasury: &[sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, metadata: &**mut** [sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>, symbol: [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>))
    
[/code]

## Function update_description​

Update the description of the coin in [CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)
[code] 
    **public** **entry** **fun** [update_description](</references/framework/sui_sui/coin#sui_coin_update_description>)<T>(_treasury: &[sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, metadata: &**mut** [sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>, description: [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

## Function update_icon_url​

Update the url of the coin in [CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)
[code] 
    **public** **entry** **fun** [update_icon_url](</references/framework/sui_sui/coin#sui_coin_update_icon_url>)<T>(_treasury: &[sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, metadata: &**mut** [sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>, [url](</references/framework/sui_sui/url#sui_url>): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>))
    
[/code]

## Function get_decimals​
[code] 
    **public** **fun** [get_decimals](</references/framework/sui_sui/coin#sui_coin_get_decimals>)<T>(metadata: &[sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>): u8
    
[/code]

## Function get_name​
[code] 
    **public** **fun** [get_name](</references/framework/sui_sui/coin#sui_coin_get_name>)<T>(metadata: &[sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function get_symbol​
[code] 
    **public** **fun** [get_symbol](</references/framework/sui_sui/coin#sui_coin_get_symbol>)<T>(metadata: &[sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function get_description​
[code] 
    **public** **fun** [get_description](</references/framework/sui_sui/coin#sui_coin_get_description>)<T>(metadata: &[sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function get_icon_url​
[code] 
    **public** **fun** [get_icon_url](</references/framework/sui_sui/coin#sui_coin_get_icon_url>)<T>(metadata: &[sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>)>
    
[/code]

## Function destroy_metadata​

Destroy legacy [CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>) object
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [destroy_metadata](</references/framework/sui_sui/coin#sui_coin_destroy_metadata>)<T>(metadata: [sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>)
    
[/code]

## Function deny_cap_id​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [deny_cap_id](</references/framework/sui_sui/coin#sui_coin_deny_cap_id>)<T>(metadata: &[sui::coin::RegulatedCoinMetadata](</references/framework/sui_sui/coin#sui_coin_RegulatedCoinMetadata>)<T>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function new_deny_cap_v2​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [new_deny_cap_v2](</references/framework/sui_sui/coin#sui_coin_new_deny_cap_v2>)<T>([allow_global_pause](</references/framework/sui_sui/coin#sui_coin_allow_global_pause>): bool, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::DenyCapV2](</references/framework/sui_sui/coin#sui_coin_DenyCapV2>)<T>
    
[/code]

## Function new_treasury_cap​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [new_treasury_cap](</references/framework/sui_sui/coin#sui_coin_new_treasury_cap>)<T>(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>
    
[/code]

## Function allow_global_pause​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [allow_global_pause](</references/framework/sui_sui/coin#sui_coin_allow_global_pause>)<T>(cap: &[sui::coin::DenyCapV2](</references/framework/sui_sui/coin#sui_coin_DenyCapV2>)<T>): bool
    
[/code]

## Function new_coin_metadata​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [new_coin_metadata](</references/framework/sui_sui/coin#sui_coin_new_coin_metadata>)<T>(decimals: u8, name: [std::string::String](</references/framework/sui_std/string#std_string_String>), symbol: [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>), description: [std::string::String](</references/framework/sui_std/string#std_string_String>), icon_url: [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>
    
[/code]

## Function update_coin_metadata​

Internal function to refresh the [CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>) with new values in CoinRegistry borrowing.
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [update_coin_metadata](</references/framework/sui_sui/coin#sui_coin_update_coin_metadata>)<T>(metadata: &**mut** [sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>, name: [std::string::String](</references/framework/sui_std/string#std_string_String>), symbol: [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>), description: [std::string::String](</references/framework/sui_std/string#std_string_String>), icon_url: [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>))
    
[/code]

## Function supply​
[code] 
    **public** **fun** [supply](</references/framework/sui_sui/coin#sui_coin_supply>)<T>(treasury: &**mut** [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>): &[sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>
    
[/code]

## Function create_regulated_currency​

This creates a new currency, via [create_currency](</references/framework/sui_sui/coin#sui_coin_create_currency>), but with an extra capability that allows for specific addresses to have their coins frozen. Those addresses cannot interact with the coin as input objects.
[code] 
    **public** **fun** [create_regulated_currency](</references/framework/sui_sui/coin#sui_coin_create_regulated_currency>)<T: drop>(witness: T, decimals: u8, symbol: vector<u8>, name: vector<u8>, description: vector<u8>, icon_url: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>)>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, [sui::coin::DenyCap](</references/framework/sui_sui/coin#sui_coin_DenyCap>)<T>, [sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>)
    
[/code]

## Function deny_list_add​

Adds the given address to the deny list, preventing it from interacting with the specified coin type as an input to a transaction.
[code] 
    **public** **fun** [deny_list_add](</references/framework/sui_sui/coin#sui_coin_deny_list_add>)<T>([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), _deny_cap: &**mut** [sui::coin::DenyCap](</references/framework/sui_sui/coin#sui_coin_DenyCap>)<T>, addr: **address** , _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function deny_list_remove​

Removes an address from the deny list.  
Aborts with ENotFrozen if the address is not already in the list.
[code] 
    **public** **fun** [deny_list_remove](</references/framework/sui_sui/coin#sui_coin_deny_list_remove>)<T>([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &**mut** [sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), _deny_cap: &**mut** [sui::coin::DenyCap](</references/framework/sui_sui/coin#sui_coin_DenyCap>)<T>, addr: **address** , _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function deny_list_contains​

Returns true iff the given address is denied for the given coin type. It will return false if given a non-coin type.
[code] 
    **public** **fun** [deny_list_contains](</references/framework/sui_sui/coin#sui_coin_deny_list_contains>)<T>([deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>): &[sui::deny_list::DenyList](</references/framework/sui_sui/deny_list#sui_deny_list_DenyList>), addr: **address**): bool
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/coin.md>)

[Previousclock](</references/framework/sui_sui/clock>)[Nextcoin_registry](</references/framework/sui_sui/coin_registry>)
