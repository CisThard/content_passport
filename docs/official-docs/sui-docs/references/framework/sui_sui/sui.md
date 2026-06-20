<!-- Source: https://docs.sui.io/references/framework/sui_sui/sui -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * sui


# Module sui::sui

Coin is the token used to pay for gas in Sui.  
It has 9 decimals, and the smallest unit (10^-9) is called "mist".
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
    **use** [sui::table](</references/framework/sui_sui/table#sui_table>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::types](</references/framework/sui_sui/types#sui_types>);
    **use** [sui::url](</references/framework/sui_sui/url#sui_url>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::vec_set](</references/framework/sui_sui/vec_set#sui_vec_set>);
    
[/code]

## Struct SUI​

Name of the coin
[code] 
    **public** **struct** [SUI](</references/framework/sui_sui/sui#sui_sui_SUI>) **has** drop
    
[/code]

## Constants​
[code] 
    **const** [EAlreadyMinted](</references/framework/sui_sui/sui#sui_sui_EAlreadyMinted>): u64 = 0;
    
[/code]

Sender is not @0x0 the system address.
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_sui/sui#sui_sui_ENotSystemAddress>): u64 = 1;
    
[/code]

The amount of Mist per Sui token based on the fact that mist is 10^-9 of a Sui token
[code] 
    **const** [MIST_PER_SUI](</references/framework/sui_sui/sui#sui_sui_MIST_PER_SUI>): u64 = 1000000000;
    
[/code]

The total supply of Sui denominated in whole Sui tokens (10 Billion)
[code] 
    **const** [TOTAL_SUPPLY_SUI](</references/framework/sui_sui/sui#sui_sui_TOTAL_SUPPLY_SUI>): u64 = 10000000000;
    
[/code]

The total supply of Sui denominated in Mist (10 Billion * 10^9)
[code] 
    **const** [TOTAL_SUPPLY_MIST](</references/framework/sui_sui/sui#sui_sui_TOTAL_SUPPLY_MIST>): u64 = 10000000000000000000;
    
[/code]

## Function new​

Register the [SUI](</references/framework/sui_sui/sui#sui_sui_SUI>) Coin to acquire its Supply.  
This should be called only once during genesis creation.
[code] 
    **fun** [new](</references/framework/sui_sui/sui#sui_sui_new>)(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function transfer​
[code] 
    **public** **entry** **fun** [transfer](</references/framework/sui_sui/transfer#sui_transfer>)(c: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, recipient: **address**)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/sui.md>)

[Previousristretto255](</references/framework/sui_sui/ristretto255>)[Nexttable](</references/framework/sui_sui/table>)
