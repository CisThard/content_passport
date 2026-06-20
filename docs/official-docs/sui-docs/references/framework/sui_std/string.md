<!-- Source: https://docs.sui.io/references/framework/sui_std/string -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [std](</references/framework/sui_std>)
  * string


# Module std::string

The [string](</references/framework/sui_std/string#std_string>) module defines the [String](</references/framework/sui_std/string#std_string_String>) type which represents UTF8 encoded strings.
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    
[/code]

## Struct String​

A [String](</references/framework/sui_std/string#std_string_String>) holds a sequence of bytes which is guaranteed to be in utf8 format.
[code] 
    **public** **struct** [String](</references/framework/sui_std/string#std_string_String>) **has** **copy** , drop, store
    
[/code]

Click to openFields

[bytes](</references/framework/sui_std/string#std_string_bytes>): [vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>
    

## Constants​

An invalid UTF8 encoding.
[code] 
    **const** [EInvalidUTF8](</references/framework/sui_std/string#std_string_EInvalidUTF8>): [u64](</references/framework/sui_std/u64#std_u64>) = 1;
    
[/code]

Index out of range.
[code] 
    **const** [EInvalidIndex](</references/framework/sui_std/string#std_string_EInvalidIndex>): [u64](</references/framework/sui_std/u64#std_u64>) = 2;
    
[/code]

## Function utf8​

Creates a new string from a sequence of bytes. Aborts if the bytes do not represent valid utf8.
[code] 
    **public** **fun** [utf8](</references/framework/sui_std/string#std_string_utf8>)([bytes](</references/framework/sui_std/string#std_string_bytes>): [vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function from_ascii​

Convert an ASCII string to a UTF8 string
[code] 
    **public** **fun** [from_ascii](</references/framework/sui_std/string#std_string_from_ascii>)(s: [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function to_ascii​

Convert an UTF8 string to an ASCII string.  
Aborts if s is not valid ASCII
[code] 
    **public** **fun** [to_ascii](</references/framework/sui_std/string#std_string_to_ascii>)(s: [std::string::String](</references/framework/sui_std/string#std_string_String>)): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function try_utf8​

Tries to create a new string from a sequence of bytes.
[code] 
    **public** **fun** [try_utf8](</references/framework/sui_std/string#std_string_try_utf8>)([bytes](</references/framework/sui_std/string#std_string_bytes>): [vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[std::string::String](</references/framework/sui_std/string#std_string_String>)>
    
[/code]

## Function as_bytes​

Returns a reference to the underlying byte vector.
[code] 
    **public** **fun** [as_bytes](</references/framework/sui_std/string#std_string_as_bytes>)(s: &[std::string::String](</references/framework/sui_std/string#std_string_String>)): &[vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>
    
[/code]

## Function into_bytes​

Unpack the [string](</references/framework/sui_std/string#std_string>) to get its underlying bytes.
[code] 
    **public** **fun** [into_bytes](</references/framework/sui_std/string#std_string_into_bytes>)(s: [std::string::String](</references/framework/sui_std/string#std_string_String>)): [vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>
    
[/code]

## Function is_empty​

Checks whether this string is empty.
[code] 
    **public** **fun** [is_empty](</references/framework/sui_std/string#std_string_is_empty>)(s: &[std::string::String](</references/framework/sui_std/string#std_string_String>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function length​

Returns the length of this string, in bytes.
[code] 
    **public** **fun** [length](</references/framework/sui_std/string#std_string_length>)(s: &[std::string::String](</references/framework/sui_std/string#std_string_String>)): [u64](</references/framework/sui_std/u64#std_u64>)
    
[/code]

## Function append​

Appends a string.
[code] 
    **public** **fun** [append](</references/framework/sui_std/string#std_string_append>)(s: &**mut** [std::string::String](</references/framework/sui_std/string#std_string_String>), r: [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

## Function append_utf8​

Appends bytes which must be in valid utf8 format.
[code] 
    **public** **fun** [append_utf8](</references/framework/sui_std/string#std_string_append_utf8>)(s: &**mut** [std::string::String](</references/framework/sui_std/string#std_string_String>), [bytes](</references/framework/sui_std/string#std_string_bytes>): [vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>)
    
[/code]

## Function insert​

Insert the other string at the byte index in given string. The index must be at a valid utf8 char boundary.
[code] 
    **public** **fun** [insert](</references/framework/sui_std/string#std_string_insert>)(s: &**mut** [std::string::String](</references/framework/sui_std/string#std_string_String>), at: [u64](</references/framework/sui_std/u64#std_u64>), o: [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

## Function substring​

Returns a sub-string using the given byte indices, where i is the first byte position and j is the start of the first byte not included (or the length of the string). The indices must be at valid utf8 char boundaries, guaranteeing that the result is valid utf8.
[code] 
    **public** **fun** [substring](</references/framework/sui_std/string#std_string_substring>)(s: &[std::string::String](</references/framework/sui_std/string#std_string_String>), i: [u64](</references/framework/sui_std/u64#std_u64>), j: [u64](</references/framework/sui_std/u64#std_u64>)): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function index_of​

Computes the index of the first occurrence of a string. Returns s.[length](</references/framework/sui_std/string#std_string_length>)() if no occurrence found.
[code] 
    **public** **fun** [index_of](</references/framework/sui_std/string#std_string_index_of>)(s: &[std::string::String](</references/framework/sui_std/string#std_string_String>), r: &[std::string::String](</references/framework/sui_std/string#std_string_String>)): [u64](</references/framework/sui_std/u64#std_u64>)
    
[/code]

## Function internal_check_utf8​
[code] 
    **fun** [internal_check_utf8](</references/framework/sui_std/string#std_string_internal_check_utf8>)(v: &[vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function internal_is_char_boundary​
[code] 
    **fun** [internal_is_char_boundary](</references/framework/sui_std/string#std_string_internal_is_char_boundary>)(v: &[vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>, i: [u64](</references/framework/sui_std/u64#std_u64>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function internal_sub_string​
[code] 
    **fun** [internal_sub_string](</references/framework/sui_std/string#std_string_internal_sub_string>)(v: &[vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>, i: [u64](</references/framework/sui_std/u64#std_u64>), j: [u64](</references/framework/sui_std/u64#std_u64>)): [vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>
    
[/code]

## Function internal_index_of​
[code] 
    **fun** [internal_index_of](</references/framework/sui_std/string#std_string_internal_index_of>)(v: &[vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>, r: &[vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>): [u64](</references/framework/sui_std/u64#std_u64>)
    
[/code]

## Function bytes​
[code] 
    **public** **fun** [bytes](</references/framework/sui_std/string#std_string_bytes>)(s: &[std::string::String](</references/framework/sui_std/string#std_string_String>)): &[vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>
    
[/code]

## Function sub_string​
[code] 
    **public** **fun** [sub_string](</references/framework/sui_std/string#std_string_sub_string>)(s: &[std::string::String](</references/framework/sui_std/string#std_string_String>), i: [u64](</references/framework/sui_std/u64#std_u64>), j: [u64](</references/framework/sui_std/u64#std_u64>)): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_std/string.md>)

[Previousoption](</references/framework/sui_std/option>)[Nexttype_name](</references/framework/sui_std/type_name>)
