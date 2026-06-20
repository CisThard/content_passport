<!-- Source: https://docs.sui.io/references/framework/sui_std/option -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [std](</references/framework/sui_std>)
  * option


# Module std::option

This module defines the Option type and its methods to represent and handle an optional value.
[code] 
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    
[/code]

## Struct Option​

Abstraction of a value that may or may not be present. Implemented with a vector of size zero or one because Move bytecode does not have ADTs.
[code] 
    **public** **struct** [Option](</references/framework/sui_std/option#std_option_Option>)<Element> **has** **copy** , drop, store
    
[/code]

Click to openFields

vec: [vector](</references/framework/sui_std/vector#std_vector>)<Element>
    

## Constants​

The [Option](</references/framework/sui_std/option#std_option_Option>) is in an invalid state for the operation attempted.  
The [Option](</references/framework/sui_std/option#std_option_Option>) is Some while it should be None.
[code] 
    **const** [EOPTION_IS_SET](</references/framework/sui_std/option#std_option_EOPTION_IS_SET>): [u64](</references/framework/sui_std/u64#std_u64>) = 262144;
    
[/code]

The [Option](</references/framework/sui_std/option#std_option_Option>) is in an invalid state for the operation attempted.  
The [Option](</references/framework/sui_std/option#std_option_Option>) is None while it should be Some.
[code] 
    **const** [EOPTION_NOT_SET](</references/framework/sui_std/option#std_option_EOPTION_NOT_SET>): [u64](</references/framework/sui_std/u64#std_u64>) = 262145;
    
[/code]

## Function none​

Return an empty [Option](</references/framework/sui_std/option#std_option_Option>)
[code] 
    **public** **fun** [none](</references/framework/sui_std/option#std_option_none>)<Element>(): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>
    
[/code]

## Function some​

Return an [Option](</references/framework/sui_std/option#std_option_Option>) containing e
[code] 
    **public** **fun** [some](</references/framework/sui_std/option#std_option_some>)<Element>(e: Element): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>
    
[/code]

## Function is_none​

Return true if t does not hold a value
[code] 
    **public** **fun** [is_none](</references/framework/sui_std/option#std_option_is_none>)<Element>(t: &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function is_some​

Return true if t holds a value
[code] 
    **public** **fun** [is_some](</references/framework/sui_std/option#std_option_is_some>)<Element>(t: &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function contains​

Return true if the value in t is equal to e_ref.  
Always returns **false** if t does not hold a value
[code] 
    **public** **fun** [contains](</references/framework/sui_std/option#std_option_contains>)<Element>(t: &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>, e_ref: &Element): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function borrow​

Return an immutable reference to the value inside t.  
Aborts if t does not hold a value
[code] 
    **public** **fun** [borrow](</references/framework/sui_std/option#std_option_borrow>)<Element>(t: &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>): &Element
    
[/code]

## Function borrow_with_default​

Return a reference to the value inside t if it holds one.  
Return default_ref if t does not hold a value
[code] 
    **public** **fun** [borrow_with_default](</references/framework/sui_std/option#std_option_borrow_with_default>)<Element>(t: &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>, default_ref: &Element): &Element
    
[/code]

## Function get_with_default​

Return the value inside t if it holds one.  
Return default if t does not hold a value
[code] 
    **public** **fun** [get_with_default](</references/framework/sui_std/option#std_option_get_with_default>)<Element: **copy** , drop>(t: &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>, default: Element): Element
    
[/code]

## Function fill​

Convert the none option t to a some option by adding e.  
Aborts if t already holds a value
[code] 
    **public** **fun** [fill](</references/framework/sui_std/option#std_option_fill>)<Element>(t: &**mut** [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>, e: Element)
    
[/code]

## Function extract​

Convert a [some](</references/framework/sui_std/option#std_option_some>) option to a [none](</references/framework/sui_std/option#std_option_none>) by removing and returning the value stored inside t.  
Aborts if t does not hold a value
[code] 
    **public** **fun** [extract](</references/framework/sui_std/option#std_option_extract>)<Element>(t: &**mut** [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>): Element
    
[/code]

## Function borrow_mut​

Return a mutable reference to the value inside t.  
Aborts if t does not hold a value
[code] 
    **public** **fun** [borrow_mut](</references/framework/sui_std/option#std_option_borrow_mut>)<Element>(t: &**mut** [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>): &**mut** Element
    
[/code]

## Function swap​

Swap the old value inside t with e and return the old value.  
Aborts if t does not hold a value
[code] 
    **public** **fun** [swap](</references/framework/sui_std/option#std_option_swap>)<Element>(t: &**mut** [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>, e: Element): Element
    
[/code]

## Function swap_or_fill​

Swap the old value inside t with e and return the old value; or if there is no old value, fill it with e.  
Different from swap(), swap_or_fill() allows for t not holding a value.
[code] 
    **public** **fun** [swap_or_fill](</references/framework/sui_std/option#std_option_swap_or_fill>)<Element>(t: &**mut** [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>, e: Element): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>
    
[/code]

## Function destroy_with_default​

Destroys t. If t holds a value, return it. Returns default otherwise
[code] 
    **public** **fun** [destroy_with_default](</references/framework/sui_std/option#std_option_destroy_with_default>)<Element: drop>(t: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>, default: Element): Element
    
[/code]

## Function destroy_some​

Unpack t and return its contents.  
Aborts if t does not hold a value
[code] 
    **public** **fun** [destroy_some](</references/framework/sui_std/option#std_option_destroy_some>)<Element>(t: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>): Element
    
[/code]

## Function destroy_none​

Unpack t.  
Aborts if t holds a value
[code] 
    **public** **fun** [destroy_none](</references/framework/sui_std/option#std_option_destroy_none>)<Element>(t: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>)
    
[/code]

## Function to_vec​

Convert t into a vector of length 1 if it is Some, and an empty vector otherwise
[code] 
    **public** **fun** [to_vec](</references/framework/sui_std/option#std_option_to_vec>)<Element>(t: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Element>): [vector](</references/framework/sui_std/vector#std_vector>)<Element>
    
[/code]

## Macro function destroy​

Destroy [Option](</references/framework/sui_std/option#std_option_Option>)<T> and call the closure f on the value inside if it holds one.
[code] 
    **public** **macro** **fun** [destroy](</references/framework/sui_std/option#std_option_destroy>)<$T, $R: drop>($o: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $f: |$T| -> $R)
    
[/code]

## Macro function do​

Destroy [Option](</references/framework/sui_std/option#std_option_Option>)<T> and call the closure f on the value inside if it holds one.
[code] 
    **public** **macro** **fun** [do](</references/framework/sui_std/option#std_option_do>)<$T, $R: drop>($o: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $f: |$T| -> $R)
    
[/code]

## Macro function do_ref​

Execute a closure on the value inside t if it holds one.
[code] 
    **public** **macro** **fun** [do_ref](</references/framework/sui_std/option#std_option_do_ref>)<$T, $R: drop>($o: &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $f: |&$T| -> $R)
    
[/code]

## Macro function do_mut​

Execute a closure on the mutable reference to the value inside t if it holds one.
[code] 
    **public** **macro** **fun** [do_mut](</references/framework/sui_std/option#std_option_do_mut>)<$T, $R: drop>($o: &**mut** [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $f: |&**mut** $T| -> $R)
    
[/code]

## Macro function or​

Select the first Some value from the two options, or None if both are None.  
Equivalent to Rust's a.[or](</references/framework/sui_std/option#std_option_or>)(b).
[code] 
    **public** **macro** **fun** [or](</references/framework/sui_std/option#std_option_or>)<$T>($o: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $default: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>
    
[/code]

## Macro function and​

If the value is Some, call the closure f on it. Otherwise, return None.  
Equivalent to Rust's t.and_then(f).
[code] 
    **public** **macro** **fun** [and](</references/framework/sui_std/option#std_option_and>)<$T, $U>($o: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $f: |$T| -> [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$U>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$U>
    
[/code]

## Macro function and_ref​

If the value is Some, call the closure f on it. Otherwise, return None.  
Equivalent to Rust's t.and_then(f).
[code] 
    **public** **macro** **fun** [and_ref](</references/framework/sui_std/option#std_option_and_ref>)<$T, $U>($o: &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $f: |&$T| -> [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$U>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$U>
    
[/code]

## Macro function map​

Map an [Option](</references/framework/sui_std/option#std_option_Option>)<T> to [Option](</references/framework/sui_std/option#std_option_Option>)<U> by applying a function to a contained value.  
Equivalent to Rust's t.[map](</references/framework/sui_std/option#std_option_map>)(f).
[code] 
    **public** **macro** **fun** [map](</references/framework/sui_std/option#std_option_map>)<$T, $U>($o: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $f: |$T| -> $U): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$U>
    
[/code]

## Macro function map_ref​

Map an [Option](</references/framework/sui_std/option#std_option_Option>)<T> value to [Option](</references/framework/sui_std/option#std_option_Option>)<U> by applying a function to a contained value by reference.  
Original [Option](</references/framework/sui_std/option#std_option_Option>)<T> is preserved.  
Equivalent to Rust's t.[map](</references/framework/sui_std/option#std_option_map>)(f).
[code] 
    **public** **macro** **fun** [map_ref](</references/framework/sui_std/option#std_option_map_ref>)<$T, $U>($o: &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $f: |&$T| -> $U): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$U>
    
[/code]

## Macro function map_mut​

Map an [Option](</references/framework/sui_std/option#std_option_Option>)<T> value to [Option](</references/framework/sui_std/option#std_option_Option>)<U> by applying a function to a contained value by mutable reference. Original [Option](</references/framework/sui_std/option#std_option_Option>)<T> is preserved, although potentially modified.
[code] 
    **public** **macro** **fun** [map_mut](</references/framework/sui_std/option#std_option_map_mut>)<$T, $U>($o: &**mut** [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $f: |&**mut** $T| -> $U): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$U>
    
[/code]

## Macro function filter​

Return None if the value is None, otherwise return [Option](</references/framework/sui_std/option#std_option_Option>)<T> if the predicate f returns true.
[code] 
    **public** **macro** **fun** [filter](</references/framework/sui_std/option#std_option_filter>)<$T: drop>($o: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $f: |&$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>
    
[/code]

## Macro function is_some_and​

Return **false** if the value is None, otherwise return the result of the predicate f.
[code] 
    **public** **macro** **fun** [is_some_and](</references/framework/sui_std/option#std_option_is_some_and>)<$T>($o: &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $f: |&$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Macro function is_none_or​

Return **true** if the value is None, or if the predicate f returns **true** for the contained value.
[code] 
    **public** **macro** **fun** [is_none_or](</references/framework/sui_std/option#std_option_is_none_or>)<$T>($o: &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $f: |&$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Macro function fold​

Consume the option and return $[none](</references/framework/sui_std/option#std_option_none>) if it is None, otherwise apply $[some](</references/framework/sui_std/option#std_option_some>) to the contained value.  
Note $[none](</references/framework/sui_std/option#std_option_none>) is evaluated only if the option is None.
[code] 
    **public** **macro** **fun** [fold](</references/framework/sui_std/option#std_option_fold>)<$T, $R>($o: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $[none](</references/framework/sui_std/option#std_option_none>): $R, $[some](</references/framework/sui_std/option#std_option_some>): |$T| -> $R): $R
    
[/code]

## Macro function fold_ref​

Apply $[some](</references/framework/sui_std/option#std_option_some>) to the borrowed value if Some, otherwise return $[none](</references/framework/sui_std/option#std_option_none>).  
Original option is preserved.  
Note $[none](</references/framework/sui_std/option#std_option_none>) is evaluated only if the option is None.
[code] 
    **public** **macro** **fun** [fold_ref](</references/framework/sui_std/option#std_option_fold_ref>)<$T, $R>($o: &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $[none](</references/framework/sui_std/option#std_option_none>): $R, $[some](</references/framework/sui_std/option#std_option_some>): |&$T| -> $R): $R
    
[/code]

## Macro function fold_mut​

Apply $[some](</references/framework/sui_std/option#std_option_some>) to the mutably borrowed value if Some, otherwise return $[none](</references/framework/sui_std/option#std_option_none>).  
Note $[none](</references/framework/sui_std/option#std_option_none>) is evaluated only if the option is None.
[code] 
    **public** **macro** **fun** [fold_mut](</references/framework/sui_std/option#std_option_fold_mut>)<$T, $R>($o: &**mut** [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $[none](</references/framework/sui_std/option#std_option_none>): $R, $[some](</references/framework/sui_std/option#std_option_some>): |&**mut** $T| -> $R): $R
    
[/code]

## Macro function extract_or​

Extract the value inside [Option](</references/framework/sui_std/option#std_option_Option>)<T> if it holds one, or default otherwise.  
Similar to [destroy_or](</references/framework/sui_std/option#std_option_destroy_or>), but modifying the input [Option](</references/framework/sui_std/option#std_option_Option>) via a mutable reference.
[code] 
    **public** **macro** **fun** [extract_or](</references/framework/sui_std/option#std_option_extract_or>)<$T>($o: &**mut** [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $default: $T): $T
    
[/code]

## Macro function destroy_or​

Destroy [Option](</references/framework/sui_std/option#std_option_Option>)<T> and return the value inside if it holds one, or default otherwise.  
Equivalent to Rust's t.unwrap_or(default).

Note: this function is a more efficient version of [destroy_with_default](</references/framework/sui_std/option#std_option_destroy_with_default>), as it does not evaluate the default value unless necessary. The [destroy_with_default](</references/framework/sui_std/option#std_option_destroy_with_default>) function should be deprecated in favor of this function.
[code] 
    **public** **macro** **fun** [destroy_or](</references/framework/sui_std/option#std_option_destroy_or>)<$T>($o: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<$T>, $default: $T): $T
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_std/option.md>)

[Previousmacros](</references/framework/sui_std/macros>)[Nextstring](</references/framework/sui_std/string>)
