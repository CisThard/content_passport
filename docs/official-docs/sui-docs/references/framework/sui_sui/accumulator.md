<!-- Source: https://docs.sui.io/references/framework/sui_sui/accumulator -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * accumulator


# Module sui::accumulator
[code]
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct AccumulatorRoot​
[code] 
    **public** **struct** [AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    

## Struct U128​

Storage for 128-bit accumulator values.

Currently only used to represent the sum of 64 bit values (such as Balance<T>).  
The additional bits are necessary to prevent overflow, as it would take 2^64 deposits of U64_MAX to cause an overflow.
[code] 
    **public** **struct** [U128](</references/framework/sui_sui/accumulator#sui_accumulator_U128>) **has** store
    
[/code]

Click to openFields

value: u128
    

## Struct Key​

[Key](</references/framework/sui_sui/accumulator#sui_accumulator_Key>) is used only for computing the field id of accumulator objects. T is the type of the accumulated value, e.g. Balance<SUI>
[code] 
    **public** **struct** [Key](</references/framework/sui_sui/accumulator#sui_accumulator_Key>)<**phantom** T> **has** **copy** , drop, store
    
[/code]

Click to openFields

**address** : **address**
    

## Constants​
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_sui/accumulator#sui_accumulator_ENotSystemAddress>): u64 = 0;
    
[/code]

## Function create​
[code] 
    **fun** [create](</references/framework/sui_sui/accumulator#sui_accumulator_create>)(ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function root_id​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [root_id](</references/framework/sui_sui/accumulator#sui_accumulator_root_id>)(accumulator_root: &[sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>)): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function root_id_mut​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [root_id_mut](</references/framework/sui_sui/accumulator#sui_accumulator_root_id_mut>)(accumulator_root: &**mut** [sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>)): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function accumulator_u128_exists​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [accumulator_u128_exists](</references/framework/sui_sui/accumulator#sui_accumulator_accumulator_u128_exists>)<T>(root: &[sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>), **address** : **address**): bool
    
[/code]

## Function accumulator_u128_read​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [accumulator_u128_read](</references/framework/sui_sui/accumulator#sui_accumulator_accumulator_u128_read>)<T>(root: &[sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>), **address** : **address**): u128
    
[/code]

## Function create_u128​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [create_u128](</references/framework/sui_sui/accumulator#sui_accumulator_create_u128>)(value: u128): [sui::accumulator::U128](</references/framework/sui_sui/accumulator#sui_accumulator_U128>)
    
[/code]

## Function destroy_u128​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [destroy_u128](</references/framework/sui_sui/accumulator#sui_accumulator_destroy_u128>)(u128: [sui::accumulator::U128](</references/framework/sui_sui/accumulator#sui_accumulator_U128>))
    
[/code]

## Function update_u128​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [update_u128](</references/framework/sui_sui/accumulator#sui_accumulator_update_u128>)(u128: &**mut** [sui::accumulator::U128](</references/framework/sui_sui/accumulator#sui_accumulator_U128>), merge: u128, split: u128)
    
[/code]

## Function is_zero_u128​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [is_zero_u128](</references/framework/sui_sui/accumulator#sui_accumulator_is_zero_u128>)(u128: &[sui::accumulator::U128](</references/framework/sui_sui/accumulator#sui_accumulator_U128>)): bool
    
[/code]

## Function accumulator_key​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [accumulator_key](</references/framework/sui_sui/accumulator#sui_accumulator_accumulator_key>)<T>(**address** : **address**): [sui::accumulator::Key](</references/framework/sui_sui/accumulator#sui_accumulator_Key>)<T>
    
[/code]

## Function accumulator_address​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [accumulator_address](</references/framework/sui_sui/accumulator#sui_accumulator_accumulator_address>)<T>(**address** : **address**): **address**
    
[/code]

## Function root_has_accumulator​

Balance object methods
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [root_has_accumulator](</references/framework/sui_sui/accumulator#sui_accumulator_root_has_accumulator>)<K, V: store>(accumulator_root: &[sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>), name: [sui::accumulator::Key](</references/framework/sui_sui/accumulator#sui_accumulator_Key>)<K>): bool
    
[/code]

## Function root_add_accumulator​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [root_add_accumulator](</references/framework/sui_sui/accumulator#sui_accumulator_root_add_accumulator>)<K, V: store>(accumulator_root: &**mut** [sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>), name: [sui::accumulator::Key](</references/framework/sui_sui/accumulator#sui_accumulator_Key>)<K>, value: V)
    
[/code]

## Function root_borrow_accumulator_mut​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [root_borrow_accumulator_mut](</references/framework/sui_sui/accumulator#sui_accumulator_root_borrow_accumulator_mut>)<K, V: store>(accumulator_root: &**mut** [sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>), name: [sui::accumulator::Key](</references/framework/sui_sui/accumulator#sui_accumulator_Key>)<K>): &**mut** V
    
[/code]

## Function root_borrow_accumulator​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [root_borrow_accumulator](</references/framework/sui_sui/accumulator#sui_accumulator_root_borrow_accumulator>)<K, V: store>(accumulator_root: &[sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>), name: [sui::accumulator::Key](</references/framework/sui_sui/accumulator#sui_accumulator_Key>)<K>): &V
    
[/code]

## Function root_remove_accumulator​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [root_remove_accumulator](</references/framework/sui_sui/accumulator#sui_accumulator_root_remove_accumulator>)<K, V: store>(accumulator_root: &**mut** [sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>), name: [sui::accumulator::Key](</references/framework/sui_sui/accumulator#sui_accumulator_Key>)<K>): V
    
[/code]

## Function emit_deposit_event​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [emit_deposit_event](</references/framework/sui_sui/accumulator#sui_accumulator_emit_deposit_event>)<T>([accumulator](</references/framework/sui_sui/accumulator#sui_accumulator>): **address** , recipient: **address** , amount: u64)
    
[/code]

## Function emit_withdraw_event​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [emit_withdraw_event](</references/framework/sui_sui/accumulator#sui_accumulator_emit_withdraw_event>)<T>([accumulator](</references/framework/sui_sui/accumulator#sui_accumulator>): **address** , owner: **address** , amount: u64)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/accumulator.md>)

[Previoussui:sui](</references/framework/sui_sui>)[Nextaccumulator_metadata](</references/framework/sui_sui/accumulator_metadata>)
