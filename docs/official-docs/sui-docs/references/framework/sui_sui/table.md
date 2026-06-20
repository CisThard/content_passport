<!-- Source: https://docs.sui.io/references/framework/sui_sui/table -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * table


# Module sui::table

A table is a map-like collection. But unlike a traditional collection, it's keys and values are not stored within the [Table](</references/framework/sui_sui/table#sui_table_Table>) value, but instead are stored using Sui's object system. The [Table](</references/framework/sui_sui/table#sui_table_Table>) struct acts only as a handle into the object system to retrieve those keys and values. Note that this means that [Table](</references/framework/sui_sui/table#sui_table_Table>) values with exactly the same key-value mapping will not be equal, with ==, at runtime. For example
[code] 
    let table1 = table::new<u64, bool>();  
    let table2 = table::new<u64, bool>();  
    table::add(&mut table1, 0, false);  
    table::add(&mut table1, 1, true);  
    table::add(&mut table2, 0, false);  
    table::add(&mut table2, 1, true);  
    // table1 does not equal table2, despite having the same entries  
    assert!(&table1 != &table2);  
    
[/code]
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

## Struct Table​
[code] 
    **public** **struct** [Table](</references/framework/sui_sui/table#sui_table_Table>)<**phantom** K: **copy** , [drop](</references/framework/sui_sui/table#sui_table_drop>), store, **phantom** V: store> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
     the ID of this table 
size: u64
     the number of key-value pairs in the table 

## Constants​
[code] 
    **const** [ETableNotEmpty](</references/framework/sui_sui/table#sui_table_ETableNotEmpty>): u64 = 0;
    
[/code]

## Function new​

Creates a new, empty table
[code] 
    **public** **fun** [new](</references/framework/sui_sui/table#sui_table_new>)<K: **copy** , [drop](</references/framework/sui_sui/table#sui_table_drop>), store, V: store>(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>
    
[/code]

## Function add​

Adds a key-value pair to the table [table](</references/framework/sui_sui/table#sui_table>): &**mut** [Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>  
Aborts with [sui::dynamic_field::EFieldAlreadyExists](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists>) if the table already has an entry with that key k: K.
[code] 
    **public** **fun** [add](</references/framework/sui_sui/table#sui_table_add>)<K: **copy** , [drop](</references/framework/sui_sui/table#sui_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &**mut** [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>, k: K, v: V)
    
[/code]

## Function borrow​

Immutable borrows the value associated with the key in the table [table](</references/framework/sui_sui/table#sui_table>): &[Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>.  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the table does not have an entry with that key k: K.
[code] 
    **public** **fun** [borrow](</references/framework/sui_sui/borrow#sui_borrow>)<K: **copy** , [drop](</references/framework/sui_sui/table#sui_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>, k: K): &V
    
[/code]

## Function borrow_mut​

Mutably borrows the value associated with the key in the table [table](</references/framework/sui_sui/table#sui_table>): &**mut** [Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>.  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the table does not have an entry with that key k: K.
[code] 
    **public** **fun** [borrow_mut](</references/framework/sui_sui/table#sui_table_borrow_mut>)<K: **copy** , [drop](</references/framework/sui_sui/table#sui_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &**mut** [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>, k: K): &**mut** V
    
[/code]

## Function remove​

Removes the key-value pair in the table [table](</references/framework/sui_sui/table#sui_table>): &**mut** [Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V> and returns the value.  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the table does not have an entry with that key k: K.
[code] 
    **public** **fun** [remove](</references/framework/sui_sui/table#sui_table_remove>)<K: **copy** , [drop](</references/framework/sui_sui/table#sui_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &**mut** [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>, k: K): V
    
[/code]

## Function contains​

Returns true if there is a value associated with the key k: K in table [table](</references/framework/sui_sui/table#sui_table>): &[Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>
[code] 
    **public** **fun** [contains](</references/framework/sui_sui/table#sui_table_contains>)<K: **copy** , [drop](</references/framework/sui_sui/table#sui_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>, k: K): bool
    
[/code]

## Function length​

Returns the size of the table, the number of key-value pairs
[code] 
    **public** **fun** [length](</references/framework/sui_sui/table#sui_table_length>)<K: **copy** , [drop](</references/framework/sui_sui/table#sui_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>): u64
    
[/code]

## Function is_empty​

Returns true if the table is empty (if [length](</references/framework/sui_sui/table#sui_table_length>) returns 0)
[code] 
    **public** **fun** [is_empty](</references/framework/sui_sui/table#sui_table_is_empty>)<K: **copy** , [drop](</references/framework/sui_sui/table#sui_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): &[sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>): bool
    
[/code]

## Function destroy_empty​

Destroys an empty table.  
Aborts with [ETableNotEmpty](</references/framework/sui_sui/table#sui_table_ETableNotEmpty>) if the table still contains values
[code] 
    **public** **fun** [destroy_empty](</references/framework/sui_sui/table#sui_table_destroy_empty>)<K: **copy** , [drop](</references/framework/sui_sui/table#sui_table_drop>), store, V: store>([table](</references/framework/sui_sui/table#sui_table>): [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>)
    
[/code]

## Function drop​

Drop a possibly non-empty table.  
Usable only if the value type V has the [drop](</references/framework/sui_sui/table#sui_table_drop>) ability
[code] 
    **public** **fun** [drop](</references/framework/sui_sui/table#sui_table_drop>)<K: **copy** , [drop](</references/framework/sui_sui/table#sui_table_drop>), store, V: [drop](</references/framework/sui_sui/table#sui_table_drop>), store>([table](</references/framework/sui_sui/table#sui_table>): [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<K, V>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/table.md>)

[Previoussui](</references/framework/sui_sui/sui>)[Nexttable_vec](</references/framework/sui_sui/table_vec>)
