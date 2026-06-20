<!-- Source: https://docs.sui.io/references/framework/sui_bridge/treasury -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [bridge](</references/framework/sui_bridge>)
  * treasury


# Module bridge::treasury
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

## Struct BridgeTreasury​
[code] 
    **public** **struct** [BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>) **has** store
    
[/code]

Click to openFields

treasuries: [sui::object_bag::ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>)
    
supported_tokens: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>), [bridge::treasury::BridgeTokenMetadata](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTokenMetadata>)>
    
id_token_type_map: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<u8, [std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)>
    
waiting_room: [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
    

## Struct BridgeTokenMetadata​
[code] 
    **public** **struct** [BridgeTokenMetadata](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTokenMetadata>) **has** **copy** , drop, store
    
[/code]

Click to openFields

id: u8
    
[decimal_multiplier](</references/framework/sui_bridge/treasury#bridge_treasury_decimal_multiplier>): u64
    
[notional_value](</references/framework/sui_bridge/treasury#bridge_treasury_notional_value>): u64
    
native_token: bool
    

## Struct ForeignTokenRegistration​
[code] 
    **public** **struct** [ForeignTokenRegistration](</references/framework/sui_bridge/treasury#bridge_treasury_ForeignTokenRegistration>) **has** store
    
[/code]

Click to openFields

type_name: [std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)
    
uc: [sui::package::UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>)
    
decimal: u8
    

## Struct UpdateTokenPriceEvent​
[code] 
    **public** **struct** [UpdateTokenPriceEvent](</references/framework/sui_bridge/treasury#bridge_treasury_UpdateTokenPriceEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

[token_id](</references/framework/sui_bridge/treasury#bridge_treasury_token_id>): u8
    
new_price: u64
    

## Struct NewTokenEvent​
[code] 
    **public** **struct** [NewTokenEvent](</references/framework/sui_bridge/treasury#bridge_treasury_NewTokenEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

[token_id](</references/framework/sui_bridge/treasury#bridge_treasury_token_id>): u8
    
type_name: [std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)
    
native_token: bool
    
[decimal_multiplier](</references/framework/sui_bridge/treasury#bridge_treasury_decimal_multiplier>): u64
    
[notional_value](</references/framework/sui_bridge/treasury#bridge_treasury_notional_value>): u64
    

## Struct TokenRegistrationEvent​
[code] 
    **public** **struct** [TokenRegistrationEvent](</references/framework/sui_bridge/treasury#bridge_treasury_TokenRegistrationEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

type_name: [std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)
    
decimal: u8
    
native_token: bool
    

## Constants​
[code] 
    **const** [EUnsupportedTokenType](</references/framework/sui_bridge/treasury#bridge_treasury_EUnsupportedTokenType>): u64 = 1;
    
[/code]
[code] 
    **const** [EInvalidUpgradeCap](</references/framework/sui_bridge/treasury#bridge_treasury_EInvalidUpgradeCap>): u64 = 2;
    
[/code]
[code] 
    **const** [ETokenSupplyNonZero](</references/framework/sui_bridge/treasury#bridge_treasury_ETokenSupplyNonZero>): u64 = 3;
    
[/code]
[code] 
    **const** [EInvalidNotionalValue](</references/framework/sui_bridge/treasury#bridge_treasury_EInvalidNotionalValue>): u64 = 4;
    
[/code]

## Function token_id​
[code] 
    **public** **fun** [token_id](</references/framework/sui_bridge/treasury#bridge_treasury_token_id>)<T>(self: &[bridge::treasury::BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>)): u8
    
[/code]

## Function decimal_multiplier​
[code] 
    **public** **fun** [decimal_multiplier](</references/framework/sui_bridge/treasury#bridge_treasury_decimal_multiplier>)<T>(self: &[bridge::treasury::BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>)): u64
    
[/code]

## Function notional_value​
[code] 
    **public** **fun** [notional_value](</references/framework/sui_bridge/treasury#bridge_treasury_notional_value>)<T>(self: &[bridge::treasury::BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>)): u64
    
[/code]

## Function register_foreign_token​
[code] 
    **public**(package) **fun** [register_foreign_token](</references/framework/sui_bridge/treasury#bridge_treasury_register_foreign_token>)<T>(self: &**mut** [bridge::treasury::BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>), tc: [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, uc: [sui::package::UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>), metadata: &[sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>)
    
[/code]

## Function add_new_token​
[code] 
    **public**(package) **fun** [add_new_token](</references/framework/sui_bridge/treasury#bridge_treasury_add_new_token>)(self: &**mut** [bridge::treasury::BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>), token_name: [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>), [token_id](</references/framework/sui_bridge/treasury#bridge_treasury_token_id>): u8, native_token: bool, [notional_value](</references/framework/sui_bridge/treasury#bridge_treasury_notional_value>): u64)
    
[/code]

## Function create​
[code] 
    **public**(package) **fun** [create](</references/framework/sui_bridge/treasury#bridge_treasury_create>)(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [bridge::treasury::BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>)
    
[/code]

## Function burn​
[code] 
    **public**(package) **fun** [burn](</references/framework/sui_bridge/treasury#bridge_treasury_burn>)<T>(self: &**mut** [bridge::treasury::BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>), token: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>)
    
[/code]

## Function mint​
[code] 
    **public**(package) **fun** [mint](</references/framework/sui_bridge/treasury#bridge_treasury_mint>)<T>(self: &**mut** [bridge::treasury::BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>), amount: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>
    
[/code]

## Function update_asset_notional_price​
[code] 
    **public**(package) **fun** [update_asset_notional_price](</references/framework/sui_bridge/treasury#bridge_treasury_update_asset_notional_price>)(self: &**mut** [bridge::treasury::BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>), [token_id](</references/framework/sui_bridge/treasury#bridge_treasury_token_id>): u8, new_usd_price: u64)
    
[/code]

## Function get_token_metadata​
[code] 
    **fun** [get_token_metadata](</references/framework/sui_bridge/treasury#bridge_treasury_get_token_metadata>)<T>(self: &[bridge::treasury::BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>)): [bridge::treasury::BridgeTokenMetadata](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTokenMetadata>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_bridge/treasury.md>)

[Previousmessage_types](</references/framework/sui_bridge/message_types>)[Nextsui:std](</references/framework/sui_std>)
