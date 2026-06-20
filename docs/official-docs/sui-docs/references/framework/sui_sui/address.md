<!-- Source: https://docs.sui.io/references/framework/sui_sui/address -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * address


# Module sui::address
[code]
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    
[/code]

## Constants​

The length of an address, in bytes
[code] 
    **const** [LENGTH](</references/framework/sui_sui/address#sui_address_LENGTH>): u64 = 32;
    
[/code]
[code] 
    **const** [MAX](</references/framework/sui_sui/address#sui_address_MAX>): u256 = 115792089237316195423570985008687907853269984665640564039457584007913129639935;
    
[/code]

Error from [from_bytes](</references/framework/sui_sui/address#sui_address_from_bytes>) when it is supplied too many or too few bytes.
[code] 
    **const** [EAddressParseError](</references/framework/sui_sui/address#sui_address_EAddressParseError>): u64 = 0;
    
[/code]

## Function to_u256​

Convert a into a u256 by interpreting a as the bytes of a big-endian integer (e.g., [to_u256](</references/framework/sui_sui/address#sui_address_to_u256>)(0x1) == 1)
[code] 
    **public** **fun** [to_u256](</references/framework/sui_sui/address#sui_address_to_u256>)(a: **address**): u256
    
[/code]

## Function from_u256​

Convert n into an address by encoding it as a big-endian integer (e.g., [from_u256](</references/framework/sui_sui/address#sui_address_from_u256>)(1) = @0x1).  
Aborts if n > MAX_ADDRESS
[code] 
    **public** **fun** [from_u256](</references/framework/sui_sui/address#sui_address_from_u256>)(n: u256): **address**
    
[/code]

## Function from_bytes​

Convert bytes into an address.  
Aborts with [EAddressParseError](</references/framework/sui_sui/address#sui_address_EAddressParseError>) if the length of bytes is not 32
[code] 
    **public** **fun** [from_bytes](</references/framework/sui_sui/address#sui_address_from_bytes>)(bytes: vector<u8>): **address**
    
[/code]

## Function to_bytes​

Convert a into BCS-encoded bytes.
[code] 
    **public** **fun** [to_bytes](</references/framework/sui_sui/address#sui_address_to_bytes>)(a: **address**): vector<u8>
    
[/code]

## Function to_ascii_string​

Convert a to a hex-encoded ASCII string
[code] 
    **public** **fun** [to_ascii_string](</references/framework/sui_sui/address#sui_address_to_ascii_string>)(a: **address**): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function to_string​

Convert a to a hex-encoded string
[code] 
    **public** **fun** [to_string](</references/framework/sui_sui/address#sui_address_to_string>)(a: **address**): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function from_ascii_bytes​

Converts an ASCII string to an address, taking the numerical value for each character. The string must be Base16 encoded, and thus exactly 64 characters long.  
For example, the string "00000000000000000000000000000000000000000000000000000000DEADB33F" will be converted to the address @0xDEADB33F.  
Aborts with [EAddressParseError](</references/framework/sui_sui/address#sui_address_EAddressParseError>) if the length of s is not 64, or if an invalid character is encountered.
[code] 
    **public** **fun** [from_ascii_bytes](</references/framework/sui_sui/address#sui_address_from_ascii_bytes>)(bytes: &vector<u8>): **address**
    
[/code]

## Function hex_char_value​
[code] 
    **fun** [hex_char_value](</references/framework/sui_sui/address#sui_address_hex_char_value>)(c: u8): u8
    
[/code]

## Function length​

Length of a Sui address in bytes
[code] 
    **public** **fun** [length](</references/framework/sui_sui/address#sui_address_length>)(): u64
    
[/code]

## Function max​

Largest possible address
[code] 
    **public** **fun** [max](</references/framework/sui_sui/address#sui_address_max>)(): u256
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/address.md>)

[Previousaccumulator_settlement](</references/framework/sui_sui/accumulator_settlement>)[Nextaddress_alias](</references/framework/sui_sui/address_alias>)
