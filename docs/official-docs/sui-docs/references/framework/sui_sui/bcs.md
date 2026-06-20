<!-- Source: https://docs.sui.io/references/framework/sui_sui/bcs -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * bcs


# Module sui::bcs

This module implements BCS (de)serialization in Move.  
Full specification can be found here: <https://github.com/diem/bcs>

Short summary (for Move-supported types):

  * address \- sequence of X bytes
  * bool - byte with 0 or 1
  * u8 - a single u8 byte
  * u16 / u32 / u64 / u128 / u256 - LE bytes
  * vector - ULEB128 length + LEN elements
  * option - first byte bool: None (0) or Some (1), then value


Usage example:
[code] 
    /// This function reads u8 and u64 value from the input  
    /// and returns the rest of the bytes.  
    fun deserialize(bytes: vector<u8>): (u8, u64, vector<u8>) {  
        use sui::bcs::\{Self, BCS\};  
      
        let prepared: BCS = bcs::new(bytes);  
        let (u8_value, u64_value) = (  
            prepared.peel_u8(),  
            prepared.peel_u64()  
        );  
      
        // unpack bcs struct  
        let leftovers = prepared.into_remainder_bytes();  
      
        (u8_value, u64_value, leftovers)  
    }  
    
[/code]
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    
[/code]

## Struct BCS​

A helper struct that saves resources on operations. For better vector performance, it stores reversed bytes of the BCS and enables use of vector::pop_back.
[code] 
    **public** **struct** [BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>) **has** **copy** , drop, store
    
[/code]

Click to openFields

bytes: vector<u8>
    

## Constants​

For when bytes length is less than required for deserialization.
[code] 
    **const** [EOutOfRange](</references/framework/sui_sui/bcs#sui_bcs_EOutOfRange>): u64 = 0;
    
[/code]

For when the boolean value different than 0 or 1.
[code] 
    **const** [ENotBool](</references/framework/sui_sui/bcs#sui_bcs_ENotBool>): u64 = 1;
    
[/code]

For when ULEB byte is out of range (or not found).
[code] 
    **const** [ELenOutOfRange](</references/framework/sui_sui/bcs#sui_bcs_ELenOutOfRange>): u64 = 2;
    
[/code]

## Function to_bytes​

Get BCS serialized bytes for any value.  
Re-exports stdlib [bcs::to_bytes](</references/framework/sui_sui/bcs#sui_bcs_to_bytes>).
[code] 
    **public** **fun** [to_bytes](</references/framework/sui_sui/bcs#sui_bcs_to_bytes>)<T>(value: &T): vector<u8>
    
[/code]

## Function new​

Creates a new instance of BCS wrapper that holds inversed bytes for better performance.
[code] 
    **public** **fun** [new](</references/framework/sui_sui/bcs#sui_bcs_new>)(bytes: vector<u8>): [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)
    
[/code]

## Function into_remainder_bytes​

Unpack the [BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>) struct returning the leftover bytes.  
Useful for passing the data further after partial deserialization.
[code] 
    **public** **fun** [into_remainder_bytes](</references/framework/sui_sui/bcs#sui_bcs_into_remainder_bytes>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): vector<u8>
    
[/code]

## Function peel_address​

Read address from the bcs-serialized bytes.
[code] 
    **public** **fun** [peel_address](</references/framework/sui_sui/bcs#sui_bcs_peel_address>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): **address**
    
[/code]

## Function peel_bool​

Read a bool value from bcs-serialized bytes.
[code] 
    **public** **fun** [peel_bool](</references/framework/sui_sui/bcs#sui_bcs_peel_bool>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): bool
    
[/code]

## Function peel_u8​

Read u8 value from bcs-serialized bytes.
[code] 
    **public** **fun** [peel_u8](</references/framework/sui_sui/bcs#sui_bcs_peel_u8>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): u8
    
[/code]

## Macro function peel_num​
[code] 
    **macro** **fun** [peel_num](</references/framework/sui_sui/bcs#sui_bcs_peel_num>)<$I, $T>($[bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>), $len: u64, $bits: $I): $T
    
[/code]

## Function peel_u16​

Read u16 value from bcs-serialized bytes.
[code] 
    **public** **fun** [peel_u16](</references/framework/sui_sui/bcs#sui_bcs_peel_u16>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): u16
    
[/code]

## Function peel_u32​

Read u32 value from bcs-serialized bytes.
[code] 
    **public** **fun** [peel_u32](</references/framework/sui_sui/bcs#sui_bcs_peel_u32>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): u32
    
[/code]

## Function peel_u64​

Read u64 value from bcs-serialized bytes.
[code] 
    **public** **fun** [peel_u64](</references/framework/sui_sui/bcs#sui_bcs_peel_u64>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): u64
    
[/code]

## Function peel_u128​

Read u128 value from bcs-serialized bytes.
[code] 
    **public** **fun** [peel_u128](</references/framework/sui_sui/bcs#sui_bcs_peel_u128>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): u128
    
[/code]

## Function peel_u256​

Read u256 value from bcs-serialized bytes.
[code] 
    **public** **fun** [peel_u256](</references/framework/sui_sui/bcs#sui_bcs_peel_u256>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): u256
    
[/code]

## Function peel_vec_length​

Read ULEB bytes expecting a vector length. Result should then be used to perform peel_* operation LEN times.

In BCS vector length is implemented with ULEB128;  
See more here: <https://en.wikipedia.org/wiki/LEB128>
[code] 
    **public** **fun** [peel_vec_length](</references/framework/sui_sui/bcs#sui_bcs_peel_vec_length>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): u64
    
[/code]

## Macro function peel_vec​

Peel vector<$T> from serialized bytes, where $peel: |&**mut** [BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)| -> $T gives the functionality of peeling each value.
[code] 
    **public** **macro** **fun** [peel_vec](</references/framework/sui_sui/bcs#sui_bcs_peel_vec>)<$T>($[bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>), $peel: |&**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)| -> $T): vector<$T>
    
[/code]

## Function peel_vec_address​

Peel a vector of **address** from serialized bytes.
[code] 
    **public** **fun** [peel_vec_address](</references/framework/sui_sui/bcs#sui_bcs_peel_vec_address>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): vector<**address** >
    
[/code]

## Function peel_vec_bool​

Peel a vector of **address** from serialized bytes.
[code] 
    **public** **fun** [peel_vec_bool](</references/framework/sui_sui/bcs#sui_bcs_peel_vec_bool>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): vector<bool>
    
[/code]

## Function peel_vec_u8​

Peel a vector of u8 (eg string) from serialized bytes.
[code] 
    **public** **fun** [peel_vec_u8](</references/framework/sui_sui/bcs#sui_bcs_peel_vec_u8>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): vector<u8>
    
[/code]

## Function peel_vec_vec_u8​

Peel a vector<vector<u8>> (eg vec of string) from serialized bytes.
[code] 
    **public** **fun** [peel_vec_vec_u8](</references/framework/sui_sui/bcs#sui_bcs_peel_vec_vec_u8>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): vector<vector<u8>>
    
[/code]

## Function peel_vec_u16​

Peel a vector of u16 from serialized bytes.
[code] 
    **public** **fun** [peel_vec_u16](</references/framework/sui_sui/bcs#sui_bcs_peel_vec_u16>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): vector<u16>
    
[/code]

## Function peel_vec_u32​

Peel a vector of u32 from serialized bytes.
[code] 
    **public** **fun** [peel_vec_u32](</references/framework/sui_sui/bcs#sui_bcs_peel_vec_u32>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): vector<u32>
    
[/code]

## Function peel_vec_u64​

Peel a vector of u64 from serialized bytes.
[code] 
    **public** **fun** [peel_vec_u64](</references/framework/sui_sui/bcs#sui_bcs_peel_vec_u64>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): vector<u64>
    
[/code]

## Function peel_vec_u128​

Peel a vector of u128 from serialized bytes.
[code] 
    **public** **fun** [peel_vec_u128](</references/framework/sui_sui/bcs#sui_bcs_peel_vec_u128>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): vector<u128>
    
[/code]

## Function peel_vec_u256​

Peel a vector of u256 from serialized bytes.
[code] 
    **public** **fun** [peel_vec_u256](</references/framework/sui_sui/bcs#sui_bcs_peel_vec_u256>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): vector<u256>
    
[/code]

## Function peel_enum_tag​

Peel enum from serialized bytes, where $f takes a tag value and returns the corresponding enum variant. Move enums are limited to 127 variants, however the tag can be any u32 value.

Example:
[code] 
    let my_enum = match (bcs.peel_enum_tag()) \{  
       0 => Enum::Empty,  
       1 => Enum::U8(bcs.peel_u8()),  
       2 => Enum::U16(bcs.peel_u16()),  
       3 => Enum::Struct { a: bcs.peel_address(), b: bcs.peel_u8() \},  
       _ => abort,  
    };  
    
[/code]
[code] 
    **public** **fun** [peel_enum_tag](</references/framework/sui_sui/bcs#sui_bcs_peel_enum_tag>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): u32
    
[/code]

## Macro function peel_option​

Peel Option<$T> from serialized bytes, where $peel: |&**mut** [BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)| -> $T gives the functionality of peeling the inner value.
[code] 
    **public** **macro** **fun** [peel_option](</references/framework/sui_sui/bcs#sui_bcs_peel_option>)<$T>($[bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>), $peel: |&**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)| -> $T): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>
    
[/code]

## Function peel_option_address​

Peel Option<**address** > from serialized bytes.
[code] 
    **public** **fun** [peel_option_address](</references/framework/sui_sui/bcs#sui_bcs_peel_option_address>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<**address** >
    
[/code]

## Function peel_option_bool​

Peel Option<bool> from serialized bytes.
[code] 
    **public** **fun** [peel_option_bool](</references/framework/sui_sui/bcs#sui_bcs_peel_option_bool>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<bool>
    
[/code]

## Function peel_option_u8​

Peel Option<u8> from serialized bytes.
[code] 
    **public** **fun** [peel_option_u8](</references/framework/sui_sui/bcs#sui_bcs_peel_option_u8>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u8>
    
[/code]

## Function peel_option_u16​

Peel Option<u16> from serialized bytes.
[code] 
    **public** **fun** [peel_option_u16](</references/framework/sui_sui/bcs#sui_bcs_peel_option_u16>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u16>
    
[/code]

## Function peel_option_u32​

Peel Option<u32> from serialized bytes.
[code] 
    **public** **fun** [peel_option_u32](</references/framework/sui_sui/bcs#sui_bcs_peel_option_u32>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u32>
    
[/code]

## Function peel_option_u64​

Peel Option<u64> from serialized bytes.
[code] 
    **public** **fun** [peel_option_u64](</references/framework/sui_sui/bcs#sui_bcs_peel_option_u64>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u64>
    
[/code]

## Function peel_option_u128​

Peel Option<u128> from serialized bytes.
[code] 
    **public** **fun** [peel_option_u128](</references/framework/sui_sui/bcs#sui_bcs_peel_option_u128>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u128>
    
[/code]

## Function peel_option_u256​

Peel Option<u256> from serialized bytes.
[code] 
    **public** **fun** [peel_option_u256](</references/framework/sui_sui/bcs#sui_bcs_peel_option_u256>)([bcs](</references/framework/sui_sui/bcs#sui_bcs>): &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u256>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/bcs.md>)

[Previousbalance](</references/framework/sui_sui/balance>)[Nextbls12381](</references/framework/sui_sui/bls12381>)
