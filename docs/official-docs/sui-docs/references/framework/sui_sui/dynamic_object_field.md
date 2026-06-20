<!-- Source: https://docs.sui.io/references/framework/sui_sui/dynamic_object_field -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * dynamic_object_field


# Module sui::dynamic_object_field

Similar to [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>), this module allows for the access of dynamic fields. But unlike, [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>) the values bound to these dynamic fields _must_ be objects themselves. This allows for the objects to still exist within in storage, which may be important for external tools. The difference is otherwise not observable from within Move.
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    
[/code]

## Struct Wrapper​
[code] 
    **public** **struct** [Wrapper](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_Wrapper>)<Name> **has** **copy** , drop, store
    
[/code]

Click to openFields

name: Name
    

## Function add​

Adds a dynamic object field to the object [object](</references/framework/sui_sui/object#sui_object>): &**mut** UID at field specified by name: Name.  
Aborts with EFieldAlreadyExists if the object already has that field with that name.
[code] 
    **public** **fun** [add](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_add>)<Name: **copy** , drop, store, Value: key, store>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name, value: Value)
    
[/code]

## Function borrow​

Immutably borrows the [object](</references/framework/sui_sui/object#sui_object>)s dynamic object field with the name specified by name: Name.  
Aborts with EFieldDoesNotExist if the object does not have a field with that name.  
Aborts with EFieldTypeMismatch if the field exists, but the value object does not have the specified type.
[code] 
    **public** **fun** [borrow](</references/framework/sui_sui/borrow#sui_borrow>)<Name: **copy** , drop, store, Value: key, store>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): &Value
    
[/code]

## Function borrow_mut​

Mutably borrows the [object](</references/framework/sui_sui/object#sui_object>)s dynamic object field with the name specified by name: Name.  
Aborts with EFieldDoesNotExist if the object does not have a field with that name.  
Aborts with EFieldTypeMismatch if the field exists, but the value object does not have the specified type.
[code] 
    **public** **fun** [borrow_mut](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_borrow_mut>)<Name: **copy** , drop, store, Value: key, store>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): &**mut** Value
    
[/code]

## Function remove​

Removes the [object](</references/framework/sui_sui/object#sui_object>)s dynamic object field with the name specified by name: Name and returns the bound object.  
Aborts with EFieldDoesNotExist if the object does not have a field with that name.  
Aborts with EFieldTypeMismatch if the field exists, but the value object does not have the specified type.
[code] 
    **public** **fun** [remove](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_remove>)<Name: **copy** , drop, store, Value: key, store>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): Value
    
[/code]

## Function exists​

Returns true if and only if the [object](</references/framework/sui_sui/object#sui_object>) has a dynamic object field with the name specified by name: Name.
[code] 
    **public** **fun** [exists](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_exists>)<Name: **copy** , drop, store>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): bool
    
[/code]

## Function exists_with_type​

Returns true if and only if the [object](</references/framework/sui_sui/object#sui_object>) has a dynamic field with the name specified by name: Name with an assigned value of type Value.
[code] 
    **public** **fun** [exists_with_type](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_exists_with_type>)<Name: **copy** , drop, store, Value: key, store>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): bool
    
[/code]

## Function id​

Returns the ID of the object associated with the dynamic object field.  
Returns none otherwise
[code] 
    **public** **fun** [id](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_id>)<Name: **copy** , drop, store>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)>
    
[/code]

## Function remove_opt​

Removes the dynamic object field if it exists. Returns some(Value) if it exists or none otherwise.  
Aborts with EFieldTypeMismatch if the field exists, but the value object does not have the specified type.
[code] 
    **public** **fun** [remove_opt](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_remove_opt>)<Name: **copy** , drop, store, Value: key, store>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Value>
    
[/code]

## Function replace​

Removes the existing value at name (if any) and adds value in its place.  
Returns the old value if it existed, or none otherwise.  
Note: the old and new value types may differ.  
Aborts with EFieldTypeMismatch if the field exists, but the value object does not have the specified ValueOld type.
[code] 
    **public** **fun** [replace](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_replace>)<Name: **copy** , drop, store, ValueNew: key, store, ValueOld: key, store>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name, value: ValueNew): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<ValueOld>
    
[/code]

## Macro function borrow_or_add​

Immutably borrows the field value, adding it with $default if it doesn't exist.  
Note that $default is evaluated only if the field does not already exist.  
Aborts with EFieldTypeMismatch if the field exists, but the value object does not have the specified type.
[code] 
    **public** **macro** **fun** [borrow_or_add](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_borrow_or_add>)<$Name: **copy** , drop, store, $Value: key, store>($[object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $default: $Value): &$Value
    
[/code]

## Macro function borrow_mut_or_add​

Mutably borrows the field value, adding it with $default if it doesn't exist.  
Note that $default is evaluated only if the field does not already exist.  
Aborts with EFieldTypeMismatch if the field exists, but the value object does not have the specified type.
[code] 
    **public** **macro** **fun** [borrow_mut_or_add](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_borrow_mut_or_add>)<$Name: **copy** , drop, store, $Value: key, store>($[object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $default: $Value): &**mut** $Value
    
[/code]

## Macro function get_do​

If the field exists, calls $f on an immutable reference to the value; otherwise, does nothing.  
This is like getting an Option<&Value> then calling [std::option::do](</references/framework/sui_std/option#std_option_do>).  
Aborts with EFieldTypeMismatch if the field exists, but the value object does not have the specified type.
[code] 
    **public** **macro** **fun** [get_do](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_get_do>)<$Name: **copy** , drop, store, $Value: key, store, $R: drop>($[object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $f: |&$Value| -> $R)
    
[/code]

## Macro function get_mut_do​

If the field exists, calls $f on a mutable reference to the value; otherwise, does nothing.  
This is like getting an Option<&**mut** Value> then calling [std::option::do](</references/framework/sui_std/option#std_option_do>).  
Aborts with EFieldTypeMismatch if the field exists, but the value object does not have the specified type.
[code] 
    **public** **macro** **fun** [get_mut_do](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_get_mut_do>)<$Name: **copy** , drop, store, $Value: key, store, $R: drop>($[object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $f: |&**mut** $Value| -> $R)
    
[/code]

## Macro function get_fold​

If the field exists, applies $some to an immutable reference to the value; otherwise, returns $none.  
This is like getting an Option<&Value> then calling [std::option::fold](</references/framework/sui_std/option#std_option_fold>).  
Aborts with EFieldTypeMismatch if the field exists, but the value object does not have the specified type.
[code] 
    **public** **macro** **fun** [get_fold](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_get_fold>)<$Name: **copy** , drop, store, $Value: key, store, $R>($[object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $none: $R, $some: |&$Value| -> $R): $R
    
[/code]

## Macro function get_mut_fold​

If the field exists, applies $some to a mutable reference to the value; otherwise, returns $none.  
This is like getting an Option<&**mut** Value> then calling [std::option::fold](</references/framework/sui_std/option#std_option_fold>).  
Aborts with EFieldTypeMismatch if the field exists, but the value object does not have the specified type.
[code] 
    **public** **macro** **fun** [get_mut_fold](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_get_mut_fold>)<$Name: **copy** , drop, store, $Value: key, store, $R>($[object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $none: $R, $some: |&**mut** $Value| -> $R): $R
    
[/code]

## Function exists_​
[code] 
    **public** **fun** [exists_](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_exists_>)<Name: **copy** , drop, store>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): bool
    
[/code]

## Function internal_add​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [internal_add](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_internal_add>)<Name: **copy** , drop, store, Value: key>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name, value: Value)
    
[/code]

## Function internal_borrow​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [internal_borrow](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_internal_borrow>)<Name: **copy** , drop, store, Value: key>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): &Value
    
[/code]

## Function internal_borrow_mut​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [internal_borrow_mut](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_internal_borrow_mut>)<Name: **copy** , drop, store, Value: key>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): &**mut** Value
    
[/code]

## Function internal_remove​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [internal_remove](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_internal_remove>)<Name: **copy** , drop, store, Value: key>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): Value
    
[/code]

## Function internal_exists_with_type​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [internal_exists_with_type](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_internal_exists_with_type>)<Name: **copy** , drop, store, Value: key>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): bool
    
[/code]

## Macro function add_impl​
[code] 
    **macro** **fun** [add_impl](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_add_impl>)<$Name: **copy** , drop, store, $Value: key>($[object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $value: $Value)
    
[/code]

## Macro function borrow_impl​
[code] 
    **macro** **fun** [borrow_impl](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_borrow_impl>)<$Name: **copy** , drop, store, $Value: key>($[object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name): &$Value
    
[/code]

## Macro function borrow_mut_impl​
[code] 
    **macro** **fun** [borrow_mut_impl](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_borrow_mut_impl>)<$Name: **copy** , drop, store, $Value: key>($[object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name): &**mut** $Value
    
[/code]

## Macro function remove_impl​
[code] 
    **macro** **fun** [remove_impl](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_remove_impl>)<$Name: **copy** , drop, store, $Value: key>($[object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name): $Value
    
[/code]

## Macro function exists_with_type_impl​
[code] 
    **macro** **fun** [exists_with_type_impl](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field_exists_with_type_impl>)<$Name: **copy** , drop, store, $Value: key>($[object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name): bool
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/dynamic_object_field.md>)

[Previousdynamic_field](</references/framework/sui_sui/dynamic_field>)[Nextecdsa_k1](</references/framework/sui_sui/ecdsa_k1>)
