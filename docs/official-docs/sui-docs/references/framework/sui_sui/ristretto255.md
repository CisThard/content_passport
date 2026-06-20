<!-- Source: https://docs.sui.io/references/framework/sui_sui/ristretto255 -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * ristretto255


# Module sui::ristretto255

Group operations of BLS12-381.  
Only available in devnet.
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::bcs](</references/framework/sui_sui/bcs#sui_bcs>);
    **use** [sui::group_ops](</references/framework/sui_sui/group_ops#sui_group_ops>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    
[/code]

## Struct Scalar​
[code] 
    **public** **struct** [Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>) **has** store
    
[/code]

## Struct G​
[code] 
    **public** **struct** [G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>) **has** store
    
[/code]

## Constants​
[code] 
    **const** [SCALAR_ZERO_BYTES](</references/framework/sui_sui/ristretto255#sui_ristretto255_SCALAR_ZERO_BYTES>): vector<u8> = vector[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
[/code]
[code] 
    **const** [SCALAR_ONE_BYTES](</references/framework/sui_sui/ristretto255#sui_ristretto255_SCALAR_ONE_BYTES>): vector<u8> = vector[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
[/code]
[code] 
    **const** [IDENTITY_BYTES](</references/framework/sui_sui/ristretto255#sui_ristretto255_IDENTITY_BYTES>): vector<u8> = vector[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    
[/code]
[code] 
    **const** [GENERATOR_BYTES](</references/framework/sui_sui/ristretto255#sui_ristretto255_GENERATOR_BYTES>): vector<u8> = vector[226, 242, 174, 10, 106, 188, 78, 113, 168, 132, 169, 97, 197, 0, 81, 95, 88, 227, 11, 106, 165, 130, 221, 141, 182, 166, 89, 69, 224, 141, 45, 118];
    
[/code]
[code] 
    **const** [SCALAR_TYPE](</references/framework/sui_sui/ristretto255#sui_ristretto255_SCALAR_TYPE>): u8 = 5;
    
[/code]
[code] 
    **const** [G_TYPE](</references/framework/sui_sui/ristretto255#sui_ristretto255_G_TYPE>): u8 = 6;
    
[/code]

## Function scalar_from_bytes​
[code] 
    **public** **fun** [scalar_from_bytes](</references/framework/sui_sui/ristretto255#sui_ristretto255_scalar_from_bytes>)(bytes: &vector<u8>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>
    
[/code]

## Function scalar_from_u64​
[code] 
    **public** **fun** [scalar_from_u64](</references/framework/sui_sui/ristretto255#sui_ristretto255_scalar_from_u64>)(x: u64): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>
    
[/code]

## Function scalar_zero​
[code] 
    **public** **fun** [scalar_zero](</references/framework/sui_sui/ristretto255#sui_ristretto255_scalar_zero>)(): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>
    
[/code]

## Function scalar_one​
[code] 
    **public** **fun** [scalar_one](</references/framework/sui_sui/ristretto255#sui_ristretto255_scalar_one>)(): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>
    
[/code]

## Function scalar_add​
[code] 
    **public** **fun** [scalar_add](</references/framework/sui_sui/ristretto255#sui_ristretto255_scalar_add>)(e1: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>, e2: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>
    
[/code]

## Function scalar_sub​
[code] 
    **public** **fun** [scalar_sub](</references/framework/sui_sui/ristretto255#sui_ristretto255_scalar_sub>)(e1: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>, e2: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>
    
[/code]

## Function scalar_mul​
[code] 
    **public** **fun** [scalar_mul](</references/framework/sui_sui/ristretto255#sui_ristretto255_scalar_mul>)(e1: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>, e2: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>
    
[/code]

## Function scalar_div​

Returns e2/e1, fails if a is zero.
[code] 
    **public** **fun** [scalar_div](</references/framework/sui_sui/ristretto255#sui_ristretto255_scalar_div>)(e1: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>, e2: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>
    
[/code]

## Function scalar_neg​
[code] 
    **public** **fun** [scalar_neg](</references/framework/sui_sui/ristretto255#sui_ristretto255_scalar_neg>)(e: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>
    
[/code]

## Function scalar_inv​
[code] 
    **public** **fun** [scalar_inv](</references/framework/sui_sui/ristretto255#sui_ristretto255_scalar_inv>)(e: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>
    
[/code]

## Function g_from_bytes​
[code] 
    **public** **fun** [g_from_bytes](</references/framework/sui_sui/ristretto255#sui_ristretto255_g_from_bytes>)(bytes: &vector<u8>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>
    
[/code]

## Function g_identity​
[code] 
    **public** **fun** [g_identity](</references/framework/sui_sui/ristretto255#sui_ristretto255_g_identity>)(): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>
    
[/code]

## Function g_generator​
[code] 
    **public** **fun** [g_generator](</references/framework/sui_sui/ristretto255#sui_ristretto255_g_generator>)(): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>
    
[/code]

## Function g_add​
[code] 
    **public** **fun** [g_add](</references/framework/sui_sui/ristretto255#sui_ristretto255_g_add>)(e1: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>, e2: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>
    
[/code]

## Function g_sub​
[code] 
    **public** **fun** [g_sub](</references/framework/sui_sui/ristretto255#sui_ristretto255_g_sub>)(e1: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>, e2: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>
    
[/code]

## Function g_mul​
[code] 
    **public** **fun** [g_mul](</references/framework/sui_sui/ristretto255#sui_ristretto255_g_mul>)(e1: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>, e2: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>
    
[/code]

## Function g_div​

Returns e2 / e1, fails if scalar is zero.
[code] 
    **public** **fun** [g_div](</references/framework/sui_sui/ristretto255#sui_ristretto255_g_div>)(e1: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::Scalar](</references/framework/sui_sui/ristretto255#sui_ristretto255_Scalar>)>, e2: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>
    
[/code]

## Function g_neg​
[code] 
    **public** **fun** [g_neg](</references/framework/sui_sui/ristretto255#sui_ristretto255_g_neg>)(e: &[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>): [sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/ristretto255.md>)

[Previousrangeproofs](</references/framework/sui_sui/rangeproofs>)[Nextsui](</references/framework/sui_sui/sui>)
