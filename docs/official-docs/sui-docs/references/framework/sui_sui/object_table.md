<!-- Source: https://docs.sui.io/references/framework/sui_sui/object_table -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * object_table


# Module sui::object_table

Similar to [sui::table](</references/framework/sui_sui/table#sui_table>), an [ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V> is a map-like collection. But unlike [sui::table](</references/framework/sui_sui/table#sui_table>), the values bound to these dynamic fields _must_ be objects themselves. This allows for the objects to still exist within in storage, which may be important for external tools.  
The difference is otherwise not observable from within Move.
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::dynamic_object_field](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    
[/code]

## Struct ObjectTable​
[code] 
    **public** **struct** [ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<**phantom** K: **copy** , drop, store, **phantom** V: key, store> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
     the ID of this table 
size: u64
     the number of key-value pairs in the table 

## Constants​
[code] 
    **const** [ETableNotEmpty](</references/framework/sui_sui/object_table#sui_object_table_ETableNotEmpty>): u64 = 0;
    
[/code]

## Function new​

Creates a new, empty table
[code] 
    **public** **fun** [new](</references/framework/sui_sui/object_table#sui_object_table_new>)<K: **copy** , drop, store, V: key, store>(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::object_table::ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>
    
[/code]

## Function add​

Adds a key-value pair to the table [table](</references/framework/sui_sui/table#sui_table>): &**mut** [ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>  
Aborts with [sui::dynamic_field::EFieldAlreadyExists](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists>) if the table already has an entry with that key k: K.
[code] 
    **public** **fun** [add](</references/framework/sui_sui/object_table#sui_object_table_add>)<K: **copy** , drop, store, V: key, store>([table](</references/framework/sui_sui/table#sui_table>): &**mut** [sui::object_table::ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>, k: K, v: V)
    
[/code]

## Function borrow​

Immutable borrows the value associated with the key in the table [table](</references/framework/sui_sui/table#sui_table>): &[ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>.  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the table does not have an entry with that key k: K.
[code] 
    **public** **fun** [borrow](</references/framework/sui_sui/borrow#sui_borrow>)<K: **copy** , drop, store, V: key, store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::object_table::ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>, k: K): &V
    
[/code]

## Function borrow_mut​

Mutably borrows the value associated with the key in the table [table](</references/framework/sui_sui/table#sui_table>): &**mut** [ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>.  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the table does not have an entry with that key k: K.
[code] 
    **public** **fun** [borrow_mut](</references/framework/sui_sui/object_table#sui_object_table_borrow_mut>)<K: **copy** , drop, store, V: key, store>([table](</references/framework/sui_sui/table#sui_table>): &**mut** [sui::object_table::ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>, k: K): &**mut** V
    
[/code]

## Function remove​

Removes the key-value pair in the table [table](</references/framework/sui_sui/table#sui_table>): &**mut** [ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V> and returns the value.  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the table does not have an entry with that key k: K.
[code] 
    **public** **fun** [remove](</references/framework/sui_sui/object_table#sui_object_table_remove>)<K: **copy** , drop, store, V: key, store>([table](</references/framework/sui_sui/table#sui_table>): &**mut** [sui::object_table::ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>, k: K): V
    
[/code]

## Function contains​

Returns true if there is a value associated with the key k: K in table [table](</references/framework/sui_sui/table#sui_table>): &[ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>
[code] 
    **public** **fun** [contains](</references/framework/sui_sui/object_table#sui_object_table_contains>)<K: **copy** , drop, store, V: key, store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::object_table::ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>, k: K): bool
    
[/code]

## Function length​

Returns the size of the table, the number of key-value pairs
[code] 
    **public** **fun** [length](</references/framework/sui_sui/object_table#sui_object_table_length>)<K: **copy** , drop, store, V: key, store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::object_table::ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>): u64
    
[/code]

## Function is_empty​

Returns true if the table is empty (if [length](</references/framework/sui_sui/object_table#sui_object_table_length>) returns 0)
[code] 
    **public** **fun** [is_empty](</references/framework/sui_sui/object_table#sui_object_table_is_empty>)<K: **copy** , drop, store, V: key, store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::object_table::ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>): bool
    
[/code]

## Function destroy_empty​

Destroys an empty table.  
Aborts with [ETableNotEmpty](</references/framework/sui_sui/object_table#sui_object_table_ETableNotEmpty>) if the table still contains values
[code] 
    **public** **fun** [destroy_empty](</references/framework/sui_sui/object_table#sui_object_table_destroy_empty>)<K: **copy** , drop, store, V: key, store>([table](</references/framework/sui_sui/table#sui_table>): [sui::object_table::ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>)
    
[/code]

## Function value_id​

Returns the ID of the object associated with the key if the table has an entry with key k: K.  
Returns none otherwise
[code] 
    **public** **fun** [value_id](</references/framework/sui_sui/object_table#sui_object_table_value_id>)<K: **copy** , drop, store, V: key, store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::object_table::ObjectTable](</references/framework/sui_sui/object_table#sui_object_table_ObjectTable>)<K, V>, k: K): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/object_table.md>)

[Previousobject_bag](</references/framework/sui_sui/object_bag>)[Nextpackage](</references/framework/sui_sui/package>)
