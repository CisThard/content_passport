<!-- Source: https://docs.sui.io/references/framework/sui_sui/dynamic_field -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * dynamic_field


# Module sui::dynamic_field

In addition to the fields declared in its type definition, a Sui object can have dynamic fields that can be added after the object has been constructed. Unlike ordinary field names (which are always statically declared identifiers) a dynamic field name can be any value with the **copy** , drop, and store abilities, e.g. an integer, a boolean, or a string.  
This gives Sui programmers the flexibility to extend objects on-the-fly, and it also serves as a building block for core collection types
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    
[/code]

## Struct Field​

Internal object used for storing the field and value
[code] 
    **public** **struct** [Field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_Field>)<Name: **copy** , drop, store, Value: store> **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
     Determined by the hash of the object ID, the field name value and it's type, i.e. hash(parent.id || name || Name) 
name: Name
     The value for the name of this field 
value: Value
     The value bound to this field 

## Constants​

The object already has a dynamic field with this name (with the value and type specified)
[code] 
    **const** [EFieldAlreadyExists](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists>): u64 = 0;
    
[/code]

Cannot load dynamic field.  
The object does not have a dynamic field with this name (with the value and type specified)
[code] 
    **const** [EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>): u64 = 1;
    
[/code]

The object has a field with that name, but the value type does not match
[code] 
    **const** [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>): u64 = 2;
    
[/code]

Failed to serialize the field's name
[code] 
    **const** [EBCSSerializationFailure](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EBCSSerializationFailure>): u64 = 3;
    
[/code]

The object added as a dynamic field was previously a shared object
[code] 
    **const** [ESharedObjectOperationNotSupported](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_ESharedObjectOperationNotSupported>): u64 = 4;
    
[/code]

## Function add​

Adds a dynamic field to the object [object](</references/framework/sui_sui/object#sui_object>): &**mut** UID at field specified by name: Name.  
Aborts with [EFieldAlreadyExists](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists>) if the object already has that field with that name.
[code] 
    **public** **fun** [add](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_add>)<Name: **copy** , drop, store, Value: store>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name, value: Value)
    
[/code]

## Function borrow​

Immutably borrows the [object](</references/framework/sui_sui/object#sui_object>)s dynamic field with the name specified by name: Name.  
Aborts with [EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the object does not have a field with that name.  
Aborts with [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the field exists, but the value does not have the specified type.
[code] 
    **public** **fun** [borrow](</references/framework/sui_sui/borrow#sui_borrow>)<Name: **copy** , drop, store, Value: store>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): &Value
    
[/code]

## Function borrow_mut​

Mutably borrows the [object](</references/framework/sui_sui/object#sui_object>)s dynamic field with the name specified by name: Name.  
Aborts with [EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the object does not have a field with that name.  
Aborts with [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the field exists, but the value does not have the specified type.
[code] 
    **public** **fun** [borrow_mut](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_borrow_mut>)<Name: **copy** , drop, store, Value: store>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): &**mut** Value
    
[/code]

## Function remove​

Removes the [object](</references/framework/sui_sui/object#sui_object>)s dynamic field with the name specified by name: Name and returns the bound value.  
Aborts with [EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the object does not have a field with that name.  
Aborts with [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the field exists, but the value does not have the specified type.
[code] 
    **public** **fun** [remove](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_remove>)<Name: **copy** , drop, store, Value: store>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): Value
    
[/code]

## Function exists​

Returns true if and only if the [object](</references/framework/sui_sui/object#sui_object>) has a dynamic field with the name specified by name: Name but without specifying the Value type
[code] 
    **public** **fun** [exists](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_exists>)<Name: **copy** , drop, store>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): bool
    
[/code]

## Function remove_opt​

Removes the dynamic field if it exists. Returns some(Value) if it exists or none otherwise.  
Aborts with [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the field exists, but the value does not have the specified type.
[code] 
    **public** **fun** [remove_opt](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_remove_opt>)<Name: **copy** , drop, store, Value: store>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Value>
    
[/code]

## Function replace​

Removes the existing value at name (if any) and adds value in its place.  
Returns the old value if it existed, or none otherwise.  
Note: the old and new value types may differ.  
Aborts with [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the field exists, but the value does not have the specified ValueOld type.
[code] 
    **public** **fun** [replace](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_replace>)<Name: **copy** , drop, store, ValueNew: store, ValueOld: store>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name, value: ValueNew): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<ValueOld>
    
[/code]

## Function exists_with_type​

Returns true if and only if the [object](</references/framework/sui_sui/object#sui_object>) has a dynamic field with the name specified by name: Name with an assigned value of type Value.
[code] 
    **public** **fun** [exists_with_type](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_exists_with_type>)<Name: **copy** , drop, store, Value: store>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): bool
    
[/code]

## Macro function borrow_or_add​

Immutably borrows the field value, adding it with $default if it doesn't exist.  
Note that $default is evaluated only if the field does not already exist.  
Aborts with [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the field exists, but the value does not have the specified type.
[code] 
    **public** **macro** **fun** [borrow_or_add](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_borrow_or_add>)<$Name: **copy** , drop, store, $Value: store>($[object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $default: $Value): &$Value
    
[/code]

## Macro function borrow_mut_or_add​

Mutably borrows the field value, adding it with $default if it doesn't exist.  
Note that $default is evaluated only if the field does not already exist.  
Aborts with [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the field exists, but the value does not have the specified type.
[code] 
    **public** **macro** **fun** [borrow_mut_or_add](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_borrow_mut_or_add>)<$Name: **copy** , drop, store, $Value: store>($[object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $default: $Value): &**mut** $Value
    
[/code]

## Macro function get_do​

If the field exists, calls $f on an immutable reference to the value; otherwise, does nothing.  
This is like getting an Option<&Value> then calling [std::option::do](</references/framework/sui_std/option#std_option_do>).  
Aborts with [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the field exists, but the value does not have the specified type.
[code] 
    **public** **macro** **fun** [get_do](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_get_do>)<$Name: **copy** , drop, store, $Value: store, $R: drop>($[object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $f: |&$Value| -> $R)
    
[/code]

## Macro function get_mut_do​

If the field exists, calls $f on a mutable reference to the value; otherwise, does nothing.  
This is like getting an Option<&**mut** Value> then calling [std::option::do](</references/framework/sui_std/option#std_option_do>).  
Aborts with [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the field exists, but the value does not have the specified type.
[code] 
    **public** **macro** **fun** [get_mut_do](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_get_mut_do>)<$Name: **copy** , drop, store, $Value: store, $R: drop>($[object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $f: |&**mut** $Value| -> $R)
    
[/code]

## Macro function get_fold​

If the field exists, applies $some to an immutable reference to the value; otherwise, returns $none.  
This is like getting an Option<&Value> then calling [std::option::fold](</references/framework/sui_std/option#std_option_fold>).  
Aborts with [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the field exists, but the value does not have the specified type.
[code] 
    **public** **macro** **fun** [get_fold](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_get_fold>)<$Name: **copy** , drop, store, $Value: store, $R>($[object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $none: $R, $some: |&$Value| -> $R): $R
    
[/code]

## Macro function get_mut_fold​

If the field exists, applies $some to a mutable reference to the value; otherwise, returns $none.  
This is like getting an Option<&**mut** Value> then calling [std::option::fold](</references/framework/sui_std/option#std_option_fold>).  
Aborts with [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the field exists, but the value does not have the specified type.
[code] 
    **public** **macro** **fun** [get_mut_fold](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_get_mut_fold>)<$Name: **copy** , drop, store, $Value: store, $R>($[object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), $name: $Name, $none: $R, $some: |&**mut** $Value| -> $R): $R
    
[/code]

## Function exists_​
[code] 
    **public** **fun** [exists_](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_exists_>)<Name: **copy** , drop, store>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): bool
    
[/code]

## Function remove_if_exists​
[code] 
    **public** **fun** [remove_if_exists](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_remove_if_exists>)<Name: **copy** , drop, store, Value: store>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<Value>
    
[/code]

## Function field_info​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [field_info](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_field_info>)<Name: **copy** , drop, store>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): (&[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), **address**)
    
[/code]

## Function field_info_mut​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [field_info_mut](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_field_info_mut>)<Name: **copy** , drop, store>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), name: Name): (&**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), **address**)
    
[/code]

## Function hash_type_and_key​

May abort with [EBCSSerializationFailure](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EBCSSerializationFailure>).
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [hash_type_and_key](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_hash_type_and_key>)<K: **copy** , drop, store>(parent: **address** , k: K): **address**
    
[/code]

## Function add_child_object​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [add_child_object](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_add_child_object>)<Child: key>(parent: **address** , child: Child)
    
[/code]

## Function borrow_child_object​

throws [EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if a child does not exist with that ID or throws [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the type does not match, and may also abort with [EBCSSerializationFailure](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EBCSSerializationFailure>) we need two versions to return a reference or a mutable reference
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [borrow_child_object](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_borrow_child_object>)<Child: key>([object](</references/framework/sui_sui/object#sui_object>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), id: **address**): &Child
    
[/code]

## Function borrow_child_object_mut​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [borrow_child_object_mut](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_borrow_child_object_mut>)<Child: key>([object](</references/framework/sui_sui/object#sui_object>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), id: **address**): &**mut** Child
    
[/code]

## Function remove_child_object​

throws [EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if a child does not exist with that ID or throws [EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the type does not match, and may also abort with [EBCSSerializationFailure](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EBCSSerializationFailure>).
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [remove_child_object](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_remove_child_object>)<Child: key>(parent: **address** , id: **address**): Child
    
[/code]

## Function has_child_object​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [has_child_object](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_has_child_object>)(parent: **address** , id: **address**): bool
    
[/code]

## Function has_child_object_with_ty​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [has_child_object_with_ty](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_has_child_object_with_ty>)<Child: key>(parent: **address** , id: **address**): bool
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/dynamic_field.md>)

[Previousdisplay_registry](</references/framework/sui_sui/display_registry>)[Nextdynamic_object_field](</references/framework/sui_sui/dynamic_object_field>)
