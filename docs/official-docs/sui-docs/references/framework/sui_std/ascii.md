<!-- Source: https://docs.sui.io/references/framework/sui_std/ascii -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [std](</references/framework/sui_std>)
  * ascii


# Module std::ascii

The ASCII module defines basic string and char newtypes in Move that verify that characters are valid ASCII, and that strings consist of only valid ASCII characters.
[code] 
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    
[/code]

## Struct String​

The [String](</references/framework/sui_std/ascii#std_ascii_String>) struct holds a vector of bytes that all represent valid ASCII characters. Note that these ASCII characters may not all be printable. To determine if a [String](</references/framework/sui_std/ascii#std_ascii_String>) contains only "printable" characters you should use the [all_characters_printable](</references/framework/sui_std/ascii#std_ascii_all_characters_printable>) predicate defined in this module.
[code] 
    **public** **struct** [String](</references/framework/sui_std/ascii#std_ascii_String>) **has** **copy** , drop, store
    
[/code]

Click to openFields

bytes: [vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>
    

## Struct Char​

An ASCII character.
[code] 
    **public** **struct** [Char](</references/framework/sui_std/ascii#std_ascii_Char>) **has** **copy** , drop, store
    
[/code]

Click to openFields

[byte](</references/framework/sui_std/ascii#std_ascii_byte>): [u8](</references/framework/sui_std/u8#std_u8>)
    

## Constants​

An invalid ASCII character was encountered when creating an ASCII string.
[code] 
    **const** [EInvalidASCIICharacter](</references/framework/sui_std/ascii#std_ascii_EInvalidASCIICharacter>): [u64](</references/framework/sui_std/u64#std_u64>) = 65536;
    
[/code]

An invalid index was encountered when creating a substring.
[code] 
    **const** [EInvalidIndex](</references/framework/sui_std/ascii#std_ascii_EInvalidIndex>): [u64](</references/framework/sui_std/u64#std_u64>) = 65537;
    
[/code]

## Function char​

Convert a [byte](</references/framework/sui_std/ascii#std_ascii_byte>) into a [Char](</references/framework/sui_std/ascii#std_ascii_Char>) that is checked to make sure it is valid ASCII.
[code] 
    **public** **fun** [char](</references/framework/sui_std/ascii#std_ascii_char>)([byte](</references/framework/sui_std/ascii#std_ascii_byte>): [u8](</references/framework/sui_std/u8#std_u8>)): [std::ascii::Char](</references/framework/sui_std/ascii#std_ascii_Char>)
    
[/code]

## Function string​

Convert a vector of bytes bytes into an [String](</references/framework/sui_std/ascii#std_ascii_String>). Aborts if bytes contains non-ASCII characters.
[code] 
    **public** **fun** [string](</references/framework/sui_std/string#std_string>)(bytes: [vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function try_string​

Convert a vector of bytes bytes into an [String](</references/framework/sui_std/ascii#std_ascii_String>). Returns Some(<ascii_string>) if the bytes contains all valid ASCII characters. Otherwise returns None.
[code] 
    **public** **fun** [try_string](</references/framework/sui_std/ascii#std_ascii_try_string>)(bytes: [vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)>
    
[/code]

## Function all_characters_printable​

Returns **true** if all characters in [string](</references/framework/sui_std/string#std_string>) are printable characters.  
Returns **false** otherwise. Not all [String](</references/framework/sui_std/ascii#std_ascii_String>)s are printable strings.
[code] 
    **public** **fun** [all_characters_printable](</references/framework/sui_std/ascii#std_ascii_all_characters_printable>)([string](</references/framework/sui_std/string#std_string>): &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function push_char​

Push a [Char](</references/framework/sui_std/ascii#std_ascii_Char>) to the end of the [string](</references/framework/sui_std/string#std_string>).
[code] 
    **public** **fun** [push_char](</references/framework/sui_std/ascii#std_ascii_push_char>)([string](</references/framework/sui_std/string#std_string>): &**mut** [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>), [char](</references/framework/sui_std/ascii#std_ascii_char>): [std::ascii::Char](</references/framework/sui_std/ascii#std_ascii_Char>))
    
[/code]

## Function pop_char​

Pop a [Char](</references/framework/sui_std/ascii#std_ascii_Char>) from the end of the [string](</references/framework/sui_std/string#std_string>).
[code] 
    **public** **fun** [pop_char](</references/framework/sui_std/ascii#std_ascii_pop_char>)([string](</references/framework/sui_std/string#std_string>): &**mut** [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)): [std::ascii::Char](</references/framework/sui_std/ascii#std_ascii_Char>)
    
[/code]

## Function length​

Returns the length of the [string](</references/framework/sui_std/string#std_string>) in bytes.
[code] 
    **public** **fun** [length](</references/framework/sui_std/ascii#std_ascii_length>)([string](</references/framework/sui_std/string#std_string>): &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)): [u64](</references/framework/sui_std/u64#std_u64>)
    
[/code]

## Function append​

Append the other string to the end of [string](</references/framework/sui_std/string#std_string>).
[code] 
    **public** **fun** [append](</references/framework/sui_std/ascii#std_ascii_append>)([string](</references/framework/sui_std/string#std_string>): &**mut** [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>), other: [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>))
    
[/code]

## Function insert​

Insert the other string at the at index of [string](</references/framework/sui_std/string#std_string>).
[code] 
    **public** **fun** [insert](</references/framework/sui_std/ascii#std_ascii_insert>)(s: &**mut** [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>), at: [u64](</references/framework/sui_std/u64#std_u64>), o: [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>))
    
[/code]

## Function substring​

Copy the slice of the [string](</references/framework/sui_std/string#std_string>) from i to j into a new [String](</references/framework/sui_std/ascii#std_ascii_String>).
[code] 
    **public** **fun** [substring](</references/framework/sui_std/ascii#std_ascii_substring>)([string](</references/framework/sui_std/string#std_string>): &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>), i: [u64](</references/framework/sui_std/u64#std_u64>), j: [u64](</references/framework/sui_std/u64#std_u64>)): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function as_bytes​

Get the inner bytes of the [string](</references/framework/sui_std/string#std_string>) as a reference
[code] 
    **public** **fun** [as_bytes](</references/framework/sui_std/ascii#std_ascii_as_bytes>)([string](</references/framework/sui_std/string#std_string>): &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)): &[vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>
    
[/code]

## Function into_bytes​

Unpack the [string](</references/framework/sui_std/string#std_string>) to get its backing bytes
[code] 
    **public** **fun** [into_bytes](</references/framework/sui_std/ascii#std_ascii_into_bytes>)([string](</references/framework/sui_std/string#std_string>): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)): [vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>
    
[/code]

## Function byte​

Unpack the [char](</references/framework/sui_std/ascii#std_ascii_char>) into its underlying bytes.
[code] 
    **public** **fun** [byte](</references/framework/sui_std/ascii#std_ascii_byte>)([char](</references/framework/sui_std/ascii#std_ascii_char>): [std::ascii::Char](</references/framework/sui_std/ascii#std_ascii_Char>)): [u8](</references/framework/sui_std/u8#std_u8>)
    
[/code]

## Function is_valid_char​

Returns **true** if b is a valid ASCII character.  
Returns **false** otherwise.
[code] 
    **public** **fun** [is_valid_char](</references/framework/sui_std/ascii#std_ascii_is_valid_char>)(b: [u8](</references/framework/sui_std/u8#std_u8>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function is_printable_char​

Returns **true** if [byte](</references/framework/sui_std/ascii#std_ascii_byte>) is a printable ASCII character.  
Returns **false** otherwise.
[code] 
    **public** **fun** [is_printable_char](</references/framework/sui_std/ascii#std_ascii_is_printable_char>)([byte](</references/framework/sui_std/ascii#std_ascii_byte>): [u8](</references/framework/sui_std/u8#std_u8>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function is_empty​

Returns **true** if [string](</references/framework/sui_std/string#std_string>) is empty.
[code] 
    **public** **fun** [is_empty](</references/framework/sui_std/ascii#std_ascii_is_empty>)([string](</references/framework/sui_std/string#std_string>): &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function to_uppercase​

Convert a [string](</references/framework/sui_std/string#std_string>) to its uppercase equivalent.
[code] 
    **public** **fun** [to_uppercase](</references/framework/sui_std/ascii#std_ascii_to_uppercase>)([string](</references/framework/sui_std/string#std_string>): &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function to_lowercase​

Convert a [string](</references/framework/sui_std/string#std_string>) to its lowercase equivalent.
[code] 
    **public** **fun** [to_lowercase](</references/framework/sui_std/ascii#std_ascii_to_lowercase>)([string](</references/framework/sui_std/string#std_string>): &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function index_of​

Computes the index of the first occurrence of the substr in the [string](</references/framework/sui_std/string#std_string>).  
Returns the length of the [string](</references/framework/sui_std/string#std_string>) if the substr is not found.  
Returns 0 if the substr is empty.
[code] 
    **public** **fun** [index_of](</references/framework/sui_std/ascii#std_ascii_index_of>)([string](</references/framework/sui_std/string#std_string>): &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>), substr: &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)): [u64](</references/framework/sui_std/u64#std_u64>)
    
[/code]

## Function char_to_uppercase​

Convert a [char](</references/framework/sui_std/ascii#std_ascii_char>) to its lowercase equivalent.
[code] 
    **fun** [char_to_uppercase](</references/framework/sui_std/ascii#std_ascii_char_to_uppercase>)([byte](</references/framework/sui_std/ascii#std_ascii_byte>): [u8](</references/framework/sui_std/u8#std_u8>)): [u8](</references/framework/sui_std/u8#std_u8>)
    
[/code]

## Function char_to_lowercase​

Convert a [char](</references/framework/sui_std/ascii#std_ascii_char>) to its lowercase equivalent.
[code] 
    **fun** [char_to_lowercase](</references/framework/sui_std/ascii#std_ascii_char_to_lowercase>)([byte](</references/framework/sui_std/ascii#std_ascii_byte>): [u8](</references/framework/sui_std/u8#std_u8>)): [u8](</references/framework/sui_std/u8#std_u8>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_std/ascii.md>)

[Previousaddress](</references/framework/sui_std/address>)[Nextbcs](</references/framework/sui_std/bcs>)
