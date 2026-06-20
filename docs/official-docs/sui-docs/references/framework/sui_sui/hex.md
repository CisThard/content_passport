<!-- Source: https://docs.sui.io/references/framework/sui_sui/hex -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * hex


# Module sui::hex

HEX (Base16) encoding utility.
[code] 
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    
[/code]

## Constants​
[code] 
    **const** [EInvalidHexLength](</references/framework/sui_sui/hex#sui_hex_EInvalidHexLength>): u64 = 0;
    
[/code]
[code] 
    **const** [ENotValidHexCharacter](</references/framework/sui_sui/hex#sui_hex_ENotValidHexCharacter>): u64 = 1;
    
[/code]

Vector of Base16 values from 00 to FF
[code] 
    **const** [HEX](</references/framework/sui_sui/hex#sui_hex_HEX>): vector<vector<u8>> = vector[vector[48, 48], vector[48, 49], vector[48, 50], vector[48, 51], vector[48, 52], vector[48, 53], vector[48, 54], vector[48, 55], vector[48, 56], vector[48, 57], vector[48, 97], vector[48, 98], vector[48, 99], vector[48, 100], vector[48, 101], vector[48, 102], vector[49, 48], vector[49, 49], vector[49, 50], vector[49, 51], vector[49, 52], vector[49, 53], vector[49, 54], vector[49, 55], vector[49, 56], vector[49, 57], vector[49, 97], vector[49, 98], vector[49, 99], vector[49, 100], vector[49, 101], vector[49, 102], vector[50, 48], vector[50, 49], vector[50, 50], vector[50, 51], vector[50, 52], vector[50, 53], vector[50, 54], vector[50, 55], vector[50, 56], vector[50, 57], vector[50, 97], vector[50, 98], vector[50, 99], vector[50, 100], vector[50, 101], vector[50, 102], vector[51, 48], vector[51, 49], vector[51, 50], vector[51, 51], vector[51, 52], vector[51, 53], vector[51, 54], vector[51, 55], vector[51, 56], vector[51, 57], vector[51, 97], vector[51, 98], vector[51, 99], vector[51, 100], vector[51, 101], vector[51, 102], vector[52, 48], vector[52, 49], vector[52, 50], vector[52, 51], vector[52, 52], vector[52, 53], vector[52, 54], vector[52, 55], vector[52, 56], vector[52, 57], vector[52, 97], vector[52, 98], vector[52, 99], vector[52, 100], vector[52, 101], vector[52, 102], vector[53, 48], vector[53, 49], vector[53, 50], vector[53, 51], vector[53, 52], vector[53, 53], vector[53, 54], vector[53, 55], vector[53, 56], vector[53, 57], vector[53, 97], vector[53, 98], vector[53, 99], vector[53, 100], vector[53, 101], vector[53, 102], vector[54, 48], vector[54, 49], vector[54, 50], vector[54, 51], vector[54, 52], vector[54, 53], vector[54, 54], vector[54, 55], vector[54, 56], vector[54, 57], vector[54, 97], vector[54, 98], vector[54, 99], vector[54, 100], vector[54, 101], vector[54, 102], vector[55, 48], vector[55, 49], vector[55, 50], vector[55, 51], vector[55, 52], vector[55, 53], vector[55, 54], vector[55, 55], vector[55, 56], vector[55, 57], vector[55, 97], vector[55, 98], vector[55, 99], vector[55, 100], vector[55, 101], vector[55, 102], vector[56, 48], vector[56, 49], vector[56, 50], vector[56, 51], vector[56, 52], vector[56, 53], vector[56, 54], vector[56, 55], vector[56, 56], vector[56, 57], vector[56, 97], vector[56, 98], vector[56, 99], vector[56, 100], vector[56, 101], vector[56, 102], vector[57, 48], vector[57, 49], vector[57, 50], vector[57, 51], vector[57, 52], vector[57, 53], vector[57, 54], vector[57, 55], vector[57, 56], vector[57, 57], vector[57, 97], vector[57, 98], vector[57, 99], vector[57, 100], vector[57, 101], vector[57, 102], vector[97, 48], vector[97, 49], vector[97, 50], vector[97, 51], vector[97, 52], vector[97, 53], vector[97, 54], vector[97, 55], vector[97, 56], vector[97, 57], vector[97, 97], vector[97, 98], vector[97, 99], vector[97, 100], vector[97, 101], vector[97, 102], vector[98, 48], vector[98, 49], vector[98, 50], vector[98, 51], vector[98, 52], vector[98, 53], vector[98, 54], vector[98, 55], vector[98, 56], vector[98, 57], vector[98, 97], vector[98, 98], vector[98, 99], vector[98, 100], vector[98, 101], vector[98, 102], vector[99, 48], vector[99, 49], vector[99, 50], vector[99, 51], vector[99, 52], vector[99, 53], vector[99, 54], vector[99, 55], vector[99, 56], vector[99, 57], vector[99, 97], vector[99, 98], vector[99, 99], vector[99, 100], vector[99, 101], vector[99, 102], vector[100, 48], vector[100, 49], vector[100, 50], vector[100, 51], vector[100, 52], vector[100, 53], vector[100, 54], vector[100, 55], vector[100, 56], vector[100, 57], vector[100, 97], vector[100, 98], vector[100, 99], vector[100, 100], vector[100, 101], vector[100, 102], vector[101, 48], vector[101, 49], vector[101, 50], vector[101, 51], vector[101, 52], vector[101, 53], vector[101, 54], vector[101, 55], vector[101, 56], vector[101, 57], vector[101, 97], vector[101, 98], vector[101, 99], vector[101, 100], vector[101, 101], vector[101, 102], vector[102, 48], vector[102, 49], vector[102, 50], vector[102, 51], vector[102, 52], vector[102, 53], vector[102, 54], vector[102, 55], vector[102, 56], vector[102, 57], vector[102, 97], vector[102, 98], vector[102, 99], vector[102, 100], vector[102, 101], vector[102, 102]];
    
[/code]

## Function encode​

Encode bytes in lowercase hex
[code] 
    **public** **fun** [encode](</references/framework/sui_sui/hex#sui_hex_encode>)(bytes: vector<u8>): vector<u8>
    
[/code]

## Function decode​

Decode hex into bytes.  
Takes a hex string (no 0x prefix) (e.g. b"0f3a").  
Returns vector of bytes that represents the hex string (e.g. x"0f3a").  
Hex string can be case insensitive (e.g. b"0F3A" and b"0f3a" both return x"0f3a").  
Aborts if the hex string does not have an even number of characters (as each hex character is 2 characters long).  
Aborts if the hex string contains non-valid hex characters (valid characters are 0 - 9, a - f, A - F)
[code] 
    **public** **fun** [decode](</references/framework/sui_sui/hex#sui_hex_decode>)([hex](</references/framework/sui_sui/hex#sui_hex>): vector<u8>): vector<u8>
    
[/code]

## Function decode_byte​
[code] 
    **fun** [decode_byte](</references/framework/sui_sui/hex#sui_hex_decode_byte>)([hex](</references/framework/sui_sui/hex#sui_hex>): u8): u8
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/hex.md>)

[Previoushash](</references/framework/sui_sui/hash>)[Nexthmac](</references/framework/sui_sui/hmac>)
