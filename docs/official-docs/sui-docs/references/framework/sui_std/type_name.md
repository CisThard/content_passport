<!-- Source: https://docs.sui.io/references/framework/sui_std/type_name -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [std](</references/framework/sui_std>)
  * type_name


# Module std::type_name

Functionality for converting Move types into values. Use with care!
[code] 
    **use** [std::address](</references/framework/sui_std/address#std_address>);
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    
[/code]

## Struct TypeName​
[code] 
    **public** **struct** [TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>) **has** **copy** , drop, store
    
[/code]

Click to openFields

name: [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
     String representation of the type. All types are represented using their source syntax: "u8", "u64", "bool", "address", "vector", and so on for primitive types.  
Struct types are represented as fully qualified type names; e.g. 00000000000000000000000000000001::string::String or 0000000000000000000000000000000a::module_name1::type_name1<0000000000000000000000000000000a::module_name2::type_name2<[u64](</references/framework/sui_std/u64#std_u64>)>> Addresses are hex-encoded lowercase values of length ADDRESS_LENGTH (16, 20, or 32 depending on the Move platform) 

## Constants​

ASCII Character code for the : (colon) symbol.
[code] 
    **const** [ASCII_COLON](</references/framework/sui_std/type_name#std_type_name_ASCII_COLON>): [u8](</references/framework/sui_std/u8#std_u8>) = 58;
    
[/code]

ASCII Character code for the < (less than) symbol.
[code] 
    **const** [ASCII_LESS_THAN](</references/framework/sui_std/type_name#std_type_name_ASCII_LESS_THAN>): [u8](</references/framework/sui_std/u8#std_u8>) = 60;
    
[/code]

ASCII Character code for the v (lowercase v) symbol.
[code] 
    **const** [ASCII_V](</references/framework/sui_std/type_name#std_type_name_ASCII_V>): [u8](</references/framework/sui_std/u8#std_u8>) = 118;
    
[/code]

ASCII Character code for the e (lowercase e) symbol.
[code] 
    **const** [ASCII_E](</references/framework/sui_std/type_name#std_type_name_ASCII_E>): [u8](</references/framework/sui_std/u8#std_u8>) = 101;
    
[/code]

ASCII Character code for the c (lowercase c) symbol.
[code] 
    **const** [ASCII_C](</references/framework/sui_std/type_name#std_type_name_ASCII_C>): [u8](</references/framework/sui_std/u8#std_u8>) = 99;
    
[/code]

ASCII Character code for the t (lowercase t) symbol.
[code] 
    **const** [ASCII_T](</references/framework/sui_std/type_name#std_type_name_ASCII_T>): [u8](</references/framework/sui_std/u8#std_u8>) = 116;
    
[/code]

ASCII Character code for the o (lowercase o) symbol.
[code] 
    **const** [ASCII_O](</references/framework/sui_std/type_name#std_type_name_ASCII_O>): [u8](</references/framework/sui_std/u8#std_u8>) = 111;
    
[/code]

ASCII Character code for the r (lowercase r) symbol.
[code] 
    **const** [ASCII_R](</references/framework/sui_std/type_name#std_type_name_ASCII_R>): [u8](</references/framework/sui_std/u8#std_u8>) = 114;
    
[/code]

The type is not from a package/module. It is a primitive type.
[code] 
    **const** [ENonModuleType](</references/framework/sui_std/type_name#std_type_name_ENonModuleType>): [u64](</references/framework/sui_std/u64#std_u64>) = 0;
    
[/code]

## Function with_defining_ids​

Return a value representation of the type T. Package IDs that appear in fully qualified type names in the output from this function are defining IDs (the ID of the package in storage that first introduced the type).
[code] 
    **public** **fun** [with_defining_ids](</references/framework/sui_std/type_name#std_type_name_with_defining_ids>)<T>(): [std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)
    
[/code]

## Function with_original_ids​

Return a value representation of the type T. Package IDs that appear in fully qualified type names in the output from this function are original IDs (the ID of the first version of the package, even if the type in question was introduced in a later upgrade).
[code] 
    **public** **fun** [with_original_ids](</references/framework/sui_std/type_name#std_type_name_with_original_ids>)<T>(): [std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)
    
[/code]

## Function defining_id​

Like [with_defining_ids](</references/framework/sui_std/type_name#std_type_name_with_defining_ids>), this accesses the package ID that original defined the type T.
[code] 
    **public** **fun** [defining_id](</references/framework/sui_std/type_name#std_type_name_defining_id>)<T>(): **address**
    
[/code]

## Function original_id​

Like [with_original_ids](</references/framework/sui_std/type_name#std_type_name_with_original_ids>), this accesses the original ID of the package that defines type T, even if the type was introduced in a later version of the package.
[code] 
    **public** **fun** [original_id](</references/framework/sui_std/type_name#std_type_name_original_id>)<T>(): **address**
    
[/code]

## Function is_primitive​

Returns true iff the TypeName represents a primitive type, i.e. one of u8, u16, u32, u64, u128, u256, bool, address, vector.
[code] 
    **public** **fun** [is_primitive](</references/framework/sui_std/type_name#std_type_name_is_primitive>)(self: &[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function as_string​

Get the String representation of self
[code] 
    **public** **fun** [as_string](</references/framework/sui_std/type_name#std_type_name_as_string>)(self: &[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)): &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function address_string​

Get Address string (Base16 encoded), first part of the TypeName.  
Aborts if given a primitive type.
[code] 
    **public** **fun** [address_string](</references/framework/sui_std/type_name#std_type_name_address_string>)(self: &[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function module_string​

Get name of the module.  
Aborts if given a primitive type.
[code] 
    **public** **fun** [module_string](</references/framework/sui_std/type_name#std_type_name_module_string>)(self: &[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function datatype_string​

Get name of the datatype (struct or enum).  
Aborts if given a primitive type.
[code] 
    **public** **fun** [datatype_string](</references/framework/sui_std/type_name#std_type_name_datatype_string>)(self: &[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function into_string​

Convert self into its inner String
[code] 
    **public** **fun** [into_string](</references/framework/sui_std/type_name#std_type_name_into_string>)(self: [std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function get​
[code] 
    **public** **fun** [get](</references/framework/sui_std/type_name#std_type_name_get>)<T>(): [std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)
    
[/code]

## Function get_with_original_ids​
[code] 
    **public** **fun** [get_with_original_ids](</references/framework/sui_std/type_name#std_type_name_get_with_original_ids>)<T>(): [std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)
    
[/code]

## Function borrow_string​
[code] 
    **public** **fun** [borrow_string](</references/framework/sui_std/type_name#std_type_name_borrow_string>)(self: &[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)): &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function get_address​
[code] 
    **public** **fun** [get_address](</references/framework/sui_std/type_name#std_type_name_get_address>)(self: &[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function get_module​
[code] 
    **public** **fun** [get_module](</references/framework/sui_std/type_name#std_type_name_get_module>)(self: &[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_std/type_name.md>)

[Previousstring](</references/framework/sui_std/string>)[Nextu128](</references/framework/sui_std/u128>)
