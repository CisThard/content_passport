<!-- Source: https://docs.sui.io/references/framework/sui_sui/pay -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * pay


# Module sui::pay

This module provides handy functionality for wallets and sui::Coin management.
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

## Constants​

For when empty vector is supplied into join function.
[code] 
    **const** [ENoCoins](</references/framework/sui_sui/pay#sui_pay_ENoCoins>): u64 = 0;
    
[/code]

## Function keep​

Transfer c to the sender of the current transaction
[code] 
    **public** **fun** [keep](</references/framework/sui_sui/pay#sui_pay_keep>)<T>(c: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function split​

Split [coin](</references/framework/sui_sui/coin#sui_coin>) to two coins, one with balance split_amount, and the remaining balance is left in [coin](</references/framework/sui_sui/coin#sui_coin>).
[code] 
    **public** **entry** **fun** [split](</references/framework/sui_sui/pay#sui_pay_split>)<T>([coin](</references/framework/sui_sui/coin#sui_coin>): &**mut** [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, split_amount: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function split_vec​

Split coin self into multiple coins, each with balance specified in split_amounts. Remaining balance is left in self.
[code] 
    **public** **entry** **fun** [split_vec](</references/framework/sui_sui/pay#sui_pay_split_vec>)<T>(self: &**mut** [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, split_amounts: vector<u64>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function split_and_transfer​

Send amount units of c to recipient.  
Aborts with [sui::balance::ENotEnough](</references/framework/sui_sui/balance#sui_balance_ENotEnough>) if amount is greater than the balance in c
[code] 
    **public** **entry** **fun** [split_and_transfer](</references/framework/sui_sui/pay#sui_pay_split_and_transfer>)<T>(c: &**mut** [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, amount: u64, recipient: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function divide_and_keep​

Divide coin self into n - 1 coins with equal balances. If the balance is not evenly divisible by n, the remainder is left in self.
[code] 
    **public** **entry** **fun** [divide_and_keep](</references/framework/sui_sui/pay#sui_pay_divide_and_keep>)<T>(self: &**mut** [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, n: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function join​

Join [coin](</references/framework/sui_sui/coin#sui_coin>) into self. Re-exports [coin::join](</references/framework/sui_sui/coin#sui_coin_join>) function.  
Deprecated: you should call [coin](</references/framework/sui_sui/coin#sui_coin>).[join](</references/framework/sui_sui/pay#sui_pay_join>)(other) directly.
[code] 
    **public** **entry** **fun** [join](</references/framework/sui_sui/pay#sui_pay_join>)<T>(self: &**mut** [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, [coin](</references/framework/sui_sui/coin#sui_coin>): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>)
    
[/code]

## Function join_vec​

Join everything in coins with self
[code] 
    **public** **entry** **fun** [join_vec](</references/framework/sui_sui/pay#sui_pay_join_vec>)<T>(self: &**mut** [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, coins: vector<[sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>>)
    
[/code]

## Function join_vec_and_transfer​

Join a vector of Coin into a single object and transfer it to receiver.
[code] 
    **public** **entry** **fun** [join_vec_and_transfer](</references/framework/sui_sui/pay#sui_pay_join_vec_and_transfer>)<T>(coins: vector<[sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>>, receiver: **address**)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/pay.md>)

[Previousparty](</references/framework/sui_sui/party>)[Nextposeidon](</references/framework/sui_sui/poseidon>)
