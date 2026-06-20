<!-- Source: https://docs.sui.io/references/framework/sui_sui/linked_table -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * linked_table


# Module sui::linked_table

Similar to [sui::table](</references/framework/sui_sui/table#sui_table>) but the values are linked together, allowing for ordered insertion and removal
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

## Struct LinkedTable​
[code] 
    **public** **struct** [LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, **phantom** V: store> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
     the ID of this table 
size: u64
     the number of key-value pairs in the table 
head: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<K>
     the front of the table, i.e. the key of the first entry 
tail: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<K>
     the back of the table, i.e. the key of the last entry 

## Struct Node​
[code] 
    **public** **struct** [Node](</references/framework/sui_sui/linked_table#sui_linked_table_Node>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store> **has** store
    
[/code]

Click to openFields

[prev](</references/framework/sui_sui/linked_table#sui_linked_table_prev>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<K>
     the previous key 
[next](</references/framework/sui_sui/linked_table#sui_linked_table_next>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<K>
     the next key 
value: V
     the value being stored 

## Constants​
[code] 
    **const** [ETableNotEmpty](</references/framework/sui_sui/linked_table#sui_linked_table_ETableNotEmpty>): u64 = 0;
    
[/code]
[code] 
    **const** [ETableIsEmpty](</references/framework/sui_sui/linked_table#sui_linked_table_ETableIsEmpty>): u64 = 1;
    
[/code]

## Function new​

Creates a new, empty table
[code] 
    **public** **fun** [new](</references/framework/sui_sui/linked_table#sui_linked_table_new>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>
    
[/code]

## Function front​

Returns the key for the first element in the table, or None if the table is empty
[code] 
    **public** **fun** [front](</references/framework/sui_sui/linked_table#sui_linked_table_front>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<K>
    
[/code]

## Function back​

Returns the key for the last element in the table, or None if the table is empty
[code] 
    **public** **fun** [back](</references/framework/sui_sui/linked_table#sui_linked_table_back>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<K>
    
[/code]

## Function push_front​

Inserts a key-value pair at the front of the table, i.e. the newly inserted pair will be the first element in the table.  
Aborts with [sui::dynamic_field::EFieldAlreadyExists](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists>) if the table already has an entry with that key k: K.
[code] 
    **public** **fun** [push_front](</references/framework/sui_sui/linked_table#sui_linked_table_push_front>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &**mut** [sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>, k: K, value: V)
    
[/code]

## Function push_back​

Inserts a key-value pair at the back of the table, i.e. the newly inserted pair will be the last element in the table.  
Aborts with [sui::dynamic_field::EFieldAlreadyExists](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists>) if the table already has an entry with that key k: K.
[code] 
    **public** **fun** [push_back](</references/framework/sui_sui/linked_table#sui_linked_table_push_back>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &**mut** [sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>, k: K, value: V)
    
[/code]

## Function borrow​

Immutable borrows the value associated with the key in the table [table](</references/framework/sui_sui/table#sui_table>): &[LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>.  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the table does not have an entry with that key k: K.
[code] 
    **public** **fun** [borrow](</references/framework/sui_sui/borrow#sui_borrow>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>, k: K): &V
    
[/code]

## Function borrow_mut​

Mutably borrows the value associated with the key in the table [table](</references/framework/sui_sui/table#sui_table>): &**mut** [LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>.  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the table does not have an entry with that key k: K.
[code] 
    **public** **fun** [borrow_mut](</references/framework/sui_sui/linked_table#sui_linked_table_borrow_mut>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &**mut** [sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>, k: K): &**mut** V
    
[/code]

## Function prev​

Borrows the key for the previous entry of the specified key k: K in the table [table](</references/framework/sui_sui/table#sui_table>): &[LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>. Returns None if the entry does not have a predecessor. Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the table does not have an entry with that key k: K
[code] 
    **public** **fun** [prev](</references/framework/sui_sui/linked_table#sui_linked_table_prev>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>, k: K): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<K>
    
[/code]

## Function next​

Borrows the key for the next entry of the specified key k: K in the table [table](</references/framework/sui_sui/table#sui_table>): &[LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>. Returns None if the entry does not have a successor. Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the table does not have an entry with that key k: K
[code] 
    **public** **fun** [next](</references/framework/sui_sui/linked_table#sui_linked_table_next>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>, k: K): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<K>
    
[/code]

## Function remove​

Removes the key-value pair in the table [table](</references/framework/sui_sui/table#sui_table>): &**mut** [LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V> and returns the value.  
This splices the element out of the ordering.  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the table does not have an entry with that key k: K. Note: this is also what happens when the table is empty.
[code] 
    **public** **fun** [remove](</references/framework/sui_sui/linked_table#sui_linked_table_remove>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &**mut** [sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>, k: K): V
    
[/code]

## Function pop_front​

Removes the front of the table [table](</references/framework/sui_sui/table#sui_table>): &**mut** [LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>, returns the key and value.  
Aborts with [ETableIsEmpty](</references/framework/sui_sui/linked_table#sui_linked_table_ETableIsEmpty>) if the table is empty
[code] 
    **public** **fun** [pop_front](</references/framework/sui_sui/linked_table#sui_linked_table_pop_front>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &**mut** [sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>): (K, V)
    
[/code]

## Function pop_back​

Removes the back of the table [table](</references/framework/sui_sui/table#sui_table>): &**mut** [LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>, returns the key and value.  
Aborts with [ETableIsEmpty](</references/framework/sui_sui/linked_table#sui_linked_table_ETableIsEmpty>) if the table is empty
[code] 
    **public** **fun** [pop_back](</references/framework/sui_sui/linked_table#sui_linked_table_pop_back>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &**mut** [sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>): (K, V)
    
[/code]

## Function contains​

Returns true iff there is a value associated with the key k: K in table [table](</references/framework/sui_sui/table#sui_table>): &[LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>
[code] 
    **public** **fun** [contains](</references/framework/sui_sui/linked_table#sui_linked_table_contains>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>, k: K): bool
    
[/code]

## Function length​

Returns the size of the table, the number of key-value pairs
[code] 
    **public** **fun** [length](</references/framework/sui_sui/linked_table#sui_linked_table_length>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>): u64
    
[/code]

## Function is_empty​

Returns true iff the table is empty (if [length](</references/framework/sui_sui/linked_table#sui_linked_table_length>) returns 0)
[code] 
    **public** **fun** [is_empty](</references/framework/sui_sui/linked_table#sui_linked_table_is_empty>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>): bool
    
[/code]

## Function destroy_empty​

Destroys an empty table.  
Aborts with [ETableNotEmpty](</references/framework/sui_sui/linked_table#sui_linked_table_ETableNotEmpty>) if the table still contains values
[code] 
    **public** **fun** [destroy_empty](</references/framework/sui_sui/linked_table#sui_linked_table_destroy_empty>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): [sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>)
    
[/code]

## Function drop​

Drop a possibly non-empty table.  
Usable only if the value type V has the [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>) ability
[code] 
    **public** **fun** [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>)<K: **copy** , [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store, V: [drop](</references/framework/sui_sui/linked_table#sui_linked_table_drop>), store>([table](</references/framework/sui_sui/table#sui_table>): [sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<K, V>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/linked_table.md>)

[Previouskiosk_extension](</references/framework/sui_sui/kiosk_extension>)[Nextmath](</references/framework/sui_sui/math>)
