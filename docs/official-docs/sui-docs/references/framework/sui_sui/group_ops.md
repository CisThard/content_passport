<!-- Source: https://docs.sui.io/references/framework/sui_sui/group_ops -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * group_ops


# Module sui::group_ops

Generic Move and native functions for group operations.
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::bcs](</references/framework/sui_sui/bcs#sui_bcs>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    
[/code]

## Struct Element​
[code] 
    **public** **struct** [Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<**phantom** T> **has** **copy** , drop, store
    
[/code]

Click to openFields

[bytes](</references/framework/sui_sui/group_ops#sui_group_ops_bytes>): vector<u8>
    

## Constants​
[code] 
    **const** [ENotSupported](</references/framework/sui_sui/group_ops#sui_group_ops_ENotSupported>): u64 = 0;
    
[/code]
[code] 
    **const** [EInvalidInput](</references/framework/sui_sui/group_ops#sui_group_ops_EInvalidInput>): u64 = 1;
    
[/code]
[code] 
    **const** [EInputTooLong](</references/framework/sui_sui/group_ops#sui_group_ops_EInputTooLong>): u64 = 2;
    
[/code]
[code] 
    **const** [EInvalidBufferLength](</references/framework/sui_sui/group_ops#sui_group_ops_EInvalidBufferLength>): u64 = 3;
    
[/code]

## Function bytes​
[code] 
    **public** **fun** [bytes](</references/framework/sui_sui/group_ops#sui_group_ops_bytes>)<G>(e: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>): &vector<u8>
    
[/code]

## Function equal​
[code] 
    **public** **fun** [equal](</references/framework/sui_sui/group_ops#sui_group_ops_equal>)<G>(e1: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>, e2: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>): bool
    
[/code]

## Function from_bytes​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [from_bytes](</references/framework/sui_sui/group_ops#sui_group_ops_from_bytes>)<G>(type_: u8, [bytes](</references/framework/sui_sui/group_ops#sui_group_ops_bytes>): vector<u8>, is_trusted: bool): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>
    
[/code]

## Function add​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [add](</references/framework/sui_sui/group_ops#sui_group_ops_add>)<G>(type_: u8, e1: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>, e2: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>
    
[/code]

## Function sub​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [sub](</references/framework/sui_sui/group_ops#sui_group_ops_sub>)<G>(type_: u8, e1: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>, e2: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>
    
[/code]

## Function mul​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [mul](</references/framework/sui_sui/group_ops#sui_group_ops_mul>)<S, G>(type_: u8, scalar: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<S>, e: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>
    
[/code]

## Function div​

Fails if scalar = 0. Else returns 1/scalar * e.
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [div](</references/framework/sui_sui/group_ops#sui_group_ops_div>)<S, G>(type_: u8, scalar: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<S>, e: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>
    
[/code]

## Function hash_to​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [hash_to](</references/framework/sui_sui/group_ops#sui_group_ops_hash_to>)<G>(type_: u8, m: &vector<u8>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>
    
[/code]

## Function multi_scalar_multiplication​

Aborts with [EInputTooLong](</references/framework/sui_sui/group_ops#sui_group_ops_EInputTooLong>) if the vectors are too long.

This function is currently only enabled on Devnet.
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [multi_scalar_multiplication](</references/framework/sui_sui/group_ops#sui_group_ops_multi_scalar_multiplication>)<S, G>(type_: u8, scalars: &vector<[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<S>>, elements: &vector<[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>
    
[/code]

## Function pairing​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [pairing](</references/framework/sui_sui/group_ops#sui_group_ops_pairing>)<G1, G2, G3>(type_: u8, e1: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G1>, e2: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G2>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G3>
    
[/code]

## Function convert​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [convert](</references/framework/sui_sui/group_ops#sui_group_ops_convert>)<From, To>(from_type_: u8, to_type_: u8, e: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<From>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<To>
    
[/code]

## Function sum​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [sum](</references/framework/sui_sui/group_ops#sui_group_ops_sum>)<G>(type_: u8, terms: &vector<[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<G>
    
[/code]

## Function internal_validate​
[code] 
    **fun** [internal_validate](</references/framework/sui_sui/group_ops#sui_group_ops_internal_validate>)(type_: u8, [bytes](</references/framework/sui_sui/group_ops#sui_group_ops_bytes>): &vector<u8>): bool
    
[/code]

## Function internal_add​
[code] 
    **fun** [internal_add](</references/framework/sui_sui/group_ops#sui_group_ops_internal_add>)(type_: u8, e1: &vector<u8>, e2: &vector<u8>): vector<u8>
    
[/code]

## Function internal_sub​
[code] 
    **fun** [internal_sub](</references/framework/sui_sui/group_ops#sui_group_ops_internal_sub>)(type_: u8, e1: &vector<u8>, e2: &vector<u8>): vector<u8>
    
[/code]

## Function internal_mul​
[code] 
    **fun** [internal_mul](</references/framework/sui_sui/group_ops#sui_group_ops_internal_mul>)(type_: u8, e1: &vector<u8>, e2: &vector<u8>): vector<u8>
    
[/code]

## Function internal_div​
[code] 
    **fun** [internal_div](</references/framework/sui_sui/group_ops#sui_group_ops_internal_div>)(type_: u8, e1: &vector<u8>, e2: &vector<u8>): vector<u8>
    
[/code]

## Function internal_hash_to​
[code] 
    **fun** [internal_hash_to](</references/framework/sui_sui/group_ops#sui_group_ops_internal_hash_to>)(type_: u8, m: &vector<u8>): vector<u8>
    
[/code]

## Function internal_multi_scalar_mul​
[code] 
    **fun** [internal_multi_scalar_mul](</references/framework/sui_sui/group_ops#sui_group_ops_internal_multi_scalar_mul>)(type_: u8, scalars: &vector<u8>, elements: &vector<u8>): vector<u8>
    
[/code]

## Function internal_pairing​
[code] 
    **fun** [internal_pairing](</references/framework/sui_sui/group_ops#sui_group_ops_internal_pairing>)(type_: u8, e1: &vector<u8>, e2: &vector<u8>): vector<u8>
    
[/code]

## Function internal_convert​
[code] 
    **fun** [internal_convert](</references/framework/sui_sui/group_ops#sui_group_ops_internal_convert>)(from_type_: u8, to_type_: u8, e: &vector<u8>): vector<u8>
    
[/code]

## Function internal_sum​
[code] 
    **fun** [internal_sum](</references/framework/sui_sui/group_ops#sui_group_ops_internal_sum>)(type_: u8, e: &vector<vector<u8>>): vector<u8>
    
[/code]

## Function set_as_prefix​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [set_as_prefix](</references/framework/sui_sui/group_ops#sui_group_ops_set_as_prefix>)(x: u64, big_endian: bool, buffer: &**mut** vector<u8>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/group_ops.md>)

[Previousgroth16](</references/framework/sui_sui/groth16>)[Nexthash](</references/framework/sui_sui/hash>)
