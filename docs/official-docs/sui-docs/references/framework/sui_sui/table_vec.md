<!-- Source: https://docs.sui.io/references/framework/sui_sui/table_vec -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * table_vec


# Module sui::table_vec

A basic scalable vector library implemented using Table.
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
    **use** [sui::table](</references/framework/sui_sui/table#sui_table>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    
[/code]

## Struct TableVec​
[code] 
    **public** **struct** [TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<**phantom** Element: store> **has** store
    
[/code]

Click to openFields

contents: [sui::table::Table](</references/framework/sui_sui/table#sui_table_Table>)<u64, Element>
     The contents of the table vector. 

## Constants​
[code] 
    **const** [EIndexOutOfBound](</references/framework/sui_sui/table_vec#sui_table_vec_EIndexOutOfBound>): u64 = 0;
    
[/code]
[code] 
    **const** [ETableNonEmpty](</references/framework/sui_sui/table_vec#sui_table_vec_ETableNonEmpty>): u64 = 1;
    
[/code]

## Function empty​

Create an empty TableVec.
[code] 
    **public** **fun** [empty](</references/framework/sui_sui/table_vec#sui_table_vec_empty>)<Element: store>(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<Element>
    
[/code]

## Function singleton​

Return a TableVec of size one containing element e.
[code] 
    **public** **fun** [singleton](</references/framework/sui_sui/table_vec#sui_table_vec_singleton>)<Element: store>(e: Element, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<Element>
    
[/code]

## Function length​

Return the length of the TableVec.
[code] 
    **public** **fun** [length](</references/framework/sui_sui/table_vec#sui_table_vec_length>)<Element: store>(t: &[sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<Element>): u64
    
[/code]

## Function is_empty​

Return if the TableVec is empty or not.
[code] 
    **public** **fun** [is_empty](</references/framework/sui_sui/table_vec#sui_table_vec_is_empty>)<Element: store>(t: &[sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<Element>): bool
    
[/code]

## Function borrow​

Acquire an immutable reference to the ith element of the TableVec t.  
Aborts if i is out of bounds.
[code] 
    **public** **fun** [borrow](</references/framework/sui_sui/borrow#sui_borrow>)<Element: store>(t: &[sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<Element>, i: u64): &Element
    
[/code]

## Function push_back​

Add element e to the end of the TableVec t.
[code] 
    **public** **fun** [push_back](</references/framework/sui_sui/table_vec#sui_table_vec_push_back>)<Element: store>(t: &**mut** [sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<Element>, e: Element)
    
[/code]

## Function borrow_mut​

Return a mutable reference to the ith element in the TableVec t.  
Aborts if i is out of bounds.
[code] 
    **public** **fun** [borrow_mut](</references/framework/sui_sui/table_vec#sui_table_vec_borrow_mut>)<Element: store>(t: &**mut** [sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<Element>, i: u64): &**mut** Element
    
[/code]

## Function pop_back​

Pop an element from the end of TableVec t.  
Aborts if t is empty.
[code] 
    **public** **fun** [pop_back](</references/framework/sui_sui/table_vec#sui_table_vec_pop_back>)<Element: store>(t: &**mut** [sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<Element>): Element
    
[/code]

## Function destroy_empty​

Destroy the TableVec t.  
Aborts if t is not empty.
[code] 
    **public** **fun** [destroy_empty](</references/framework/sui_sui/table_vec#sui_table_vec_destroy_empty>)<Element: store>(t: [sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<Element>)
    
[/code]

## Function drop​

Drop a possibly non-empty TableVec t.  
Usable only if the value type Element has the [drop](</references/framework/sui_sui/table_vec#sui_table_vec_drop>) ability
[code] 
    **public** **fun** [drop](</references/framework/sui_sui/table_vec#sui_table_vec_drop>)<Element: [drop](</references/framework/sui_sui/table_vec#sui_table_vec_drop>), store>(t: [sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<Element>)
    
[/code]

## Function swap​

Swaps the elements at the ith and jth indices in the TableVec t.  
Aborts if i or j is out of bounds.
[code] 
    **public** **fun** [swap](</references/framework/sui_sui/table_vec#sui_table_vec_swap>)<Element: store>(t: &**mut** [sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<Element>, i: u64, j: u64)
    
[/code]

## Function swap_remove​

Swap the ith element of the TableVec t with the last element and then pop the TableVec.  
This is O(1), but does not preserve ordering of elements in the TableVec.  
Aborts if i is out of bounds.
[code] 
    **public** **fun** [swap_remove](</references/framework/sui_sui/table_vec#sui_table_vec_swap_remove>)<Element: store>(t: &**mut** [sui::table_vec::TableVec](</references/framework/sui_sui/table_vec#sui_table_vec_TableVec>)<Element>, i: u64): Element
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/table_vec.md>)

[Previoustable](</references/framework/sui_sui/table>)[Nexttoken](</references/framework/sui_sui/token>)
