<!-- Source: https://docs.sui.io/references/framework/sui_std/fixed_point32 -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [std](</references/framework/sui_std>)
  * fixed_point32


# Module std::fixed_point32

Defines a fixed-point numeric type with a 32-bit integer part and a 32-bit fractional part.

## Struct FixedPoint32​

Define a fixed-point numeric type with 32 fractional bits.  
This is just a u64 integer but it is wrapped in a struct to make a unique type. This is a binary representation, so decimal values may not be exactly representable, but it provides more than 9 decimal digits of precision both before and after the decimal point (18 digits total). For comparison, double precision floating-point has less than 16 decimal digits of precision, so be careful about using floating-point to convert these values to decimal.
[code] 
    **public** **struct** [FixedPoint32](</references/framework/sui_std/fixed_point32#std_fixed_point32_FixedPoint32>) **has** **copy** , drop, store
    
[/code]

Click to openFields

value: [u64](</references/framework/sui_std/u64#std_u64>)
    

## Constants​

> TODO: This is a basic constant and should be provided somewhere centrally in the framework.
[code] 
    **const** [MAX_U64](</references/framework/sui_std/fixed_point32#std_fixed_point32_MAX_U64>): [u128](</references/framework/sui_std/u128#std_u128>) = 18446744073709551615;
    
[/code]

The denominator provided was zero
[code] 
    **const** [EDENOMINATOR](</references/framework/sui_std/fixed_point32#std_fixed_point32_EDENOMINATOR>): [u64](</references/framework/sui_std/u64#std_u64>) = 65537;
    
[/code]

The quotient value would be too large to be held in a [u64](</references/framework/sui_std/u64#std_u64>)
[code] 
    **const** [EDIVISION](</references/framework/sui_std/fixed_point32#std_fixed_point32_EDIVISION>): [u64](</references/framework/sui_std/u64#std_u64>) = 131074;
    
[/code]

The multiplied value would be too large to be held in a [u64](</references/framework/sui_std/u64#std_u64>)
[code] 
    **const** [EMULTIPLICATION](</references/framework/sui_std/fixed_point32#std_fixed_point32_EMULTIPLICATION>): [u64](</references/framework/sui_std/u64#std_u64>) = 131075;
    
[/code]

A division by zero was encountered
[code] 
    **const** [EDIVISION_BY_ZERO](</references/framework/sui_std/fixed_point32#std_fixed_point32_EDIVISION_BY_ZERO>): [u64](</references/framework/sui_std/u64#std_u64>) = 65540;
    
[/code]

The computed ratio when converting to a [FixedPoint32](</references/framework/sui_std/fixed_point32#std_fixed_point32_FixedPoint32>) would be unrepresentable
[code] 
    **const** [ERATIO_OUT_OF_RANGE](</references/framework/sui_std/fixed_point32#std_fixed_point32_ERATIO_OUT_OF_RANGE>): [u64](</references/framework/sui_std/u64#std_u64>) = 131077;
    
[/code]

## Function multiply_u64​

Multiply a u64 integer by a fixed-point number, truncating any fractional part of the product. This will abort if the product overflows.
[code] 
    **public** **fun** [multiply_u64](</references/framework/sui_std/fixed_point32#std_fixed_point32_multiply_u64>)(val: [u64](</references/framework/sui_std/u64#std_u64>), multiplier: [std::fixed_point32::FixedPoint32](</references/framework/sui_std/fixed_point32#std_fixed_point32_FixedPoint32>)): [u64](</references/framework/sui_std/u64#std_u64>)
    
[/code]

## Function divide_u64​

Divide a u64 integer by a fixed-point number, truncating any fractional part of the quotient. This will abort if the divisor is zero or if the quotient overflows.
[code] 
    **public** **fun** [divide_u64](</references/framework/sui_std/fixed_point32#std_fixed_point32_divide_u64>)(val: [u64](</references/framework/sui_std/u64#std_u64>), divisor: [std::fixed_point32::FixedPoint32](</references/framework/sui_std/fixed_point32#std_fixed_point32_FixedPoint32>)): [u64](</references/framework/sui_std/u64#std_u64>)
    
[/code]

## Function create_from_rational​

Create a fixed-point value from a rational number specified by its numerator and denominator. Calling this function should be preferred for using [Self::create_from_raw_value](</references/framework/sui_std/fixed_point32#std_fixed_point32_create_from_raw_value>) which is also available.  
This will abort if the denominator is zero. It will also abort if the numerator is nonzero and the ratio is not in the range 2^-32 .. 2^32-1. When specifying decimal fractions, be careful about rounding errors: if you round to display N digits after the decimal point, you can use a denominator of 10^N to avoid numbers where the very small imprecision in the binary representation could change the rounding, e.g., 0.0125 will round down to 0.012 instead of up to 0.013.
[code] 
    **public** **fun** [create_from_rational](</references/framework/sui_std/fixed_point32#std_fixed_point32_create_from_rational>)(numerator: [u64](</references/framework/sui_std/u64#std_u64>), denominator: [u64](</references/framework/sui_std/u64#std_u64>)): [std::fixed_point32::FixedPoint32](</references/framework/sui_std/fixed_point32#std_fixed_point32_FixedPoint32>)
    
[/code]

## Function create_from_raw_value​

Create a fixedpoint value from a raw value.
[code] 
    **public** **fun** [create_from_raw_value](</references/framework/sui_std/fixed_point32#std_fixed_point32_create_from_raw_value>)(value: [u64](</references/framework/sui_std/u64#std_u64>)): [std::fixed_point32::FixedPoint32](</references/framework/sui_std/fixed_point32#std_fixed_point32_FixedPoint32>)
    
[/code]

## Function get_raw_value​

Accessor for the raw u64 value. Other less common operations, such as adding or subtracting FixedPoint32 values, can be done using the raw values directly.
[code] 
    **public** **fun** [get_raw_value](</references/framework/sui_std/fixed_point32#std_fixed_point32_get_raw_value>)(num: [std::fixed_point32::FixedPoint32](</references/framework/sui_std/fixed_point32#std_fixed_point32_FixedPoint32>)): [u64](</references/framework/sui_std/u64#std_u64>)
    
[/code]

## Function is_zero​

Returns true if the ratio is zero.
[code] 
    **public** **fun** [is_zero](</references/framework/sui_std/fixed_point32#std_fixed_point32_is_zero>)(num: [std::fixed_point32::FixedPoint32](</references/framework/sui_std/fixed_point32#std_fixed_point32_FixedPoint32>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_std/fixed_point32.md>)

[Previousdebug](</references/framework/sui_std/debug>)[Nexthash](</references/framework/sui_std/hash>)
