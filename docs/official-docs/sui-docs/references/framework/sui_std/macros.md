<!-- Source: https://docs.sui.io/references/framework/sui_std/macros -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [std](</references/framework/sui_std>)
  * macros


# Module std::macros

This module holds shared implementation of macros used in std

## Macro function num_max​
[code] 
    **public**(package) **macro** **fun** [num_max](</references/framework/sui_std/macros#std_macros_num_max>)<$T>($x: $T, $y: $T): $T
    
[/code]

## Macro function num_min​
[code] 
    **public**(package) **macro** **fun** [num_min](</references/framework/sui_std/macros#std_macros_num_min>)<$T>($x: $T, $y: $T): $T
    
[/code]

## Macro function num_diff​
[code] 
    **public**(package) **macro** **fun** [num_diff](</references/framework/sui_std/macros#std_macros_num_diff>)<$T>($x: $T, $y: $T): $T
    
[/code]

## Macro function num_div_ceil​
[code] 
    **public**(package) **macro** **fun** [num_div_ceil](</references/framework/sui_std/macros#std_macros_num_div_ceil>)<$T>($x: $T, $y: $T): $T
    
[/code]

## Macro function num_pow​
[code] 
    **public**(package) **macro** **fun** [num_pow](</references/framework/sui_std/macros#std_macros_num_pow>)($base: _, $exponent: [u8](</references/framework/sui_std/u8#std_u8>)): _
    
[/code]

## Macro function num_sqrt​
[code] 
    **public**(package) **macro** **fun** [num_sqrt](</references/framework/sui_std/macros#std_macros_num_sqrt>)<$T, $U>($x: $T, $bitsize: [u8](</references/framework/sui_std/u8#std_u8>)): $T
    
[/code]

## Macro function num_to_string​
[code] 
    **public**(package) **macro** **fun** [num_to_string](</references/framework/sui_std/macros#std_macros_num_to_string>)($x: _): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Macro function num_checked_add​
[code] 
    **public**(package) **macro** **fun** [num_checked_add](</references/framework/sui_std/macros#std_macros_num_checked_add>)<$T>($x: $T, $y: $T, $max_t: $T): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>
    
[/code]

## Macro function num_checked_sub​
[code] 
    **public**(package) **macro** **fun** [num_checked_sub](</references/framework/sui_std/macros#std_macros_num_checked_sub>)<$T>($x: $T, $y: $T): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>
    
[/code]

## Macro function num_checked_mul​
[code] 
    **public**(package) **macro** **fun** [num_checked_mul](</references/framework/sui_std/macros#std_macros_num_checked_mul>)<$T>($x: $T, $y: $T, $max_t: $T): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>
    
[/code]

## Macro function num_checked_div​
[code] 
    **public**(package) **macro** **fun** [num_checked_div](</references/framework/sui_std/macros#std_macros_num_checked_div>)<$T>($x: $T, $y: $T): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>
    
[/code]

## Macro function num_saturating_add​
[code] 
    **public**(package) **macro** **fun** [num_saturating_add](</references/framework/sui_std/macros#std_macros_num_saturating_add>)<$T>($x: $T, $y: $T, $max_t: $T): $T
    
[/code]

## Macro function num_saturating_sub​
[code] 
    **public**(package) **macro** **fun** [num_saturating_sub](</references/framework/sui_std/macros#std_macros_num_saturating_sub>)<$T>($x: $T, $y: $T): $T
    
[/code]

## Macro function num_saturating_mul​
[code] 
    **public**(package) **macro** **fun** [num_saturating_mul](</references/framework/sui_std/macros#std_macros_num_saturating_mul>)<$T>($x: $T, $y: $T, $max_t: $T): $T
    
[/code]

## Macro function num_checked_shl​
[code] 
    **public** **macro** **fun** [num_checked_shl](</references/framework/sui_std/macros#std_macros_num_checked_shl>)<$T>($x: $T, $shift: [u8](</references/framework/sui_std/u8#std_u8>), $bit_size: [u8](</references/framework/sui_std/u8#std_u8>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>
    
[/code]

## Macro function num_checked_shr​
[code] 
    **public** **macro** **fun** [num_checked_shr](</references/framework/sui_std/macros#std_macros_num_checked_shr>)<$T>($x: $T, $shift: [u8](</references/framework/sui_std/u8#std_u8>), $bit_size: [u8](</references/framework/sui_std/u8#std_u8>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>
    
[/code]

## Macro function num_lossless_shl​
[code] 
    **public** **macro** **fun** [num_lossless_shl](</references/framework/sui_std/macros#std_macros_num_lossless_shl>)<$T>($x: $T, $shift: [u8](</references/framework/sui_std/u8#std_u8>), $bit_size: [u8](</references/framework/sui_std/u8#std_u8>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>
    
[/code]

## Macro function num_lossless_shr​
[code] 
    **public** **macro** **fun** [num_lossless_shr](</references/framework/sui_std/macros#std_macros_num_lossless_shr>)<$T>($x: $T, $shift: [u8](</references/framework/sui_std/u8#std_u8>), $bit_size: [u8](</references/framework/sui_std/u8#std_u8>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>
    
[/code]

## Macro function num_lossless_div​
[code] 
    **public** **macro** **fun** [num_lossless_div](</references/framework/sui_std/macros#std_macros_num_lossless_div>)<$T>($x: $T, $y: $T): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>
    
[/code]

## Macro function range_do​
[code] 
    **public** **macro** **fun** [range_do](</references/framework/sui_std/macros#std_macros_range_do>)<$T, $R: drop>($start: $T, $stop: $T, $f: |$T| -> $R)
    
[/code]

## Macro function range_do_eq​
[code] 
    **public** **macro** **fun** [range_do_eq](</references/framework/sui_std/macros#std_macros_range_do_eq>)<$T, $R: drop>($start: $T, $stop: $T, $f: |$T| -> $R)
    
[/code]

## Macro function do​
[code] 
    **public** **macro** **fun** [do](</references/framework/sui_std/macros#std_macros_do>)<$T, $R: drop>($stop: $T, $f: |$T| -> $R)
    
[/code]

## Macro function do_eq​
[code] 
    **public** **macro** **fun** [do_eq](</references/framework/sui_std/macros#std_macros_do_eq>)<$T, $R: drop>($stop: $T, $f: |$T| -> $R)
    
[/code]

## Macro function try_as_u8​
[code] 
    **public**(package) **macro** **fun** [try_as_u8](</references/framework/sui_std/macros#std_macros_try_as_u8>)($x: _): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[u8](</references/framework/sui_std/u8#std_u8>)>
    
[/code]

## Macro function try_as_u16​
[code] 
    **public**(package) **macro** **fun** [try_as_u16](</references/framework/sui_std/macros#std_macros_try_as_u16>)($x: _): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[u16](</references/framework/sui_std/u16#std_u16>)>
    
[/code]

## Macro function try_as_u32​
[code] 
    **public**(package) **macro** **fun** [try_as_u32](</references/framework/sui_std/macros#std_macros_try_as_u32>)($x: _): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[u32](</references/framework/sui_std/u32#std_u32>)>
    
[/code]

## Macro function try_as_u64​
[code] 
    **public**(package) **macro** **fun** [try_as_u64](</references/framework/sui_std/macros#std_macros_try_as_u64>)($x: _): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[u64](</references/framework/sui_std/u64#std_u64>)>
    
[/code]

## Macro function try_as_u128​
[code] 
    **public**(package) **macro** **fun** [try_as_u128](</references/framework/sui_std/macros#std_macros_try_as_u128>)($x: _): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[u128](</references/framework/sui_std/u128#std_u128>)>
    
[/code]

## Macro function num_mul_div​
[code] 
    **public**(package) **macro** **fun** [num_mul_div](</references/framework/sui_std/macros#std_macros_num_mul_div>)<$T, $U>($a: $T, $b: $T, $c: $T): $T
    
[/code]

## Macro function num_mul_div_ceil​
[code] 
    **public**(package) **macro** **fun** [num_mul_div_ceil](</references/framework/sui_std/macros#std_macros_num_mul_div_ceil>)<$T, $U>($a: $T, $b: $T, $c: $T): $T
    
[/code]

## Macro function uq_from_quotient​

Creates a fixed-point value from a quotient specified by its numerator and denominator. $T is the underlying integer type for the fixed-point value, where $T has $t_bits bits. $U is the type used for intermediate calculations, where $U is the next larger integer type. $max_t is the maximum value that can be represented by $T. $t_bits (as mentioned above) is the total number of bits in the fixed-point value (integer plus fractional). $fractional_bits is the number of fractional bits in the fixed-point value.
[code] 
    **public**(package) **macro** **fun** [uq_from_quotient](</references/framework/sui_std/macros#std_macros_uq_from_quotient>)<$T, $U>($numerator: $T, $denominator: $T, $max_t: $T, $t_bits: [u8](</references/framework/sui_std/u8#std_u8>), $fractional_bits: [u8](</references/framework/sui_std/u8#std_u8>), $abort_denominator: _, $abort_quotient_too_small: _, $abort_quotient_too_large: _): $T
    
[/code]

## Macro function uq_from_int​
[code] 
    **public**(package) **macro** **fun** [uq_from_int](</references/framework/sui_std/macros#std_macros_uq_from_int>)<$T, $U>($integer: $T, $fractional_bits: [u8](</references/framework/sui_std/u8#std_u8>)): $U
    
[/code]

## Macro function uq_add​
[code] 
    **public**(package) **macro** **fun** [uq_add](</references/framework/sui_std/macros#std_macros_uq_add>)<$T, $U>($a: $T, $b: $T, $max_t: $T, $abort_overflow: _): $T
    
[/code]

## Macro function uq_sub​
[code] 
    **public**(package) **macro** **fun** [uq_sub](</references/framework/sui_std/macros#std_macros_uq_sub>)<$T>($a: $T, $b: $T, $abort_overflow: _): $T
    
[/code]

## Macro function uq_to_int​
[code] 
    **public**(package) **macro** **fun** [uq_to_int](</references/framework/sui_std/macros#std_macros_uq_to_int>)<$T, $U>($a: $U, $fractional_bits: [u8](</references/framework/sui_std/u8#std_u8>)): $T
    
[/code]

## Macro function uq_int_mul​
[code] 
    **public**(package) **macro** **fun** [uq_int_mul](</references/framework/sui_std/macros#std_macros_uq_int_mul>)<$T, $U>($val: $T, $multiplier: $T, $max_t: $T, $fractional_bits: [u8](</references/framework/sui_std/u8#std_u8>), $abort_overflow: _): $T
    
[/code]

## Macro function uq_int_div​
[code] 
    **public**(package) **macro** **fun** [uq_int_div](</references/framework/sui_std/macros#std_macros_uq_int_div>)<$T, $U>($val: $T, $divisor: $T, $max_t: $T, $fractional_bits: [u8](</references/framework/sui_std/u8#std_u8>), $abort_division_by_zero: _, $abort_overflow: _): $T
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_std/macros.md>)

[Previousinternal](</references/framework/sui_std/internal>)[Nextoption](</references/framework/sui_std/option>)
