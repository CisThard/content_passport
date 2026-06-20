<!-- Source: https://docs.sui.io/references/framework/sui_sui/object_bag -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * object_bag


# Module sui::object_bag

Similar to [sui::bag](</references/framework/sui_sui/bag#sui_bag>), an [ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>) is a heterogeneous map-like collection. But unlike [sui::bag](</references/framework/sui_sui/bag#sui_bag>), the values bound to these dynamic fields _must_ be objects themselves. This allows for the objects to still exist in storage, which may be important for external tools.  
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

## Struct ObjectBag​
[code] 
    **public** **struct** [ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
     the ID of this bag 
size: u64
     the number of key-value pairs in the bag 

## Constants​
[code] 
    **const** [EBagNotEmpty](</references/framework/sui_sui/object_bag#sui_object_bag_EBagNotEmpty>): u64 = 0;
    
[/code]

## Function new​

Creates a new, empty bag
[code] 
    **public** **fun** [new](</references/framework/sui_sui/object_bag#sui_object_bag_new>)(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::object_bag::ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>)
    
[/code]

## Function add​

Adds a key-value pair to the bag [bag](</references/framework/sui_sui/bag#sui_bag>): &**mut** [ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>).  
Aborts with [sui::dynamic_field::EFieldAlreadyExists](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists>) if the bag already has an entry with that key k: K.
[code] 
    **public** **fun** [add](</references/framework/sui_sui/object_bag#sui_object_bag_add>)<K: **copy** , drop, store, V: key, store>([bag](</references/framework/sui_sui/bag#sui_bag>): &**mut** [sui::object_bag::ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>), k: K, v: V)
    
[/code]

## Function borrow​

Immutably borrows the value associated with the key in the bag [bag](</references/framework/sui_sui/bag#sui_bag>): &[ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>).  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the bag does not have an entry with that key k: K.  
Aborts with [sui::dynamic_field::EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the bag has an entry for the key, but the value does not have the specified type.
[code] 
    **public** **fun** [borrow](</references/framework/sui_sui/borrow#sui_borrow>)<K: **copy** , drop, store, V: key, store>([bag](</references/framework/sui_sui/bag#sui_bag>): &[sui::object_bag::ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>), k: K): &V
    
[/code]

## Function borrow_mut​

Mutably borrows the value associated with the key in the bag [bag](</references/framework/sui_sui/bag#sui_bag>): &**mut** [ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>).  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the bag does not have an entry with that key k: K.  
Aborts with [sui::dynamic_field::EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the bag has an entry for the key, but the value does not have the specified type.
[code] 
    **public** **fun** [borrow_mut](</references/framework/sui_sui/object_bag#sui_object_bag_borrow_mut>)<K: **copy** , drop, store, V: key, store>([bag](</references/framework/sui_sui/bag#sui_bag>): &**mut** [sui::object_bag::ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>), k: K): &**mut** V
    
[/code]

## Function remove​

Mutably borrows the key-value pair in the bag [bag](</references/framework/sui_sui/bag#sui_bag>): &**mut** [ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>) and returns the value.  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the bag does not have an entry with that key k: K.  
Aborts with [sui::dynamic_field::EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the bag has an entry for the key, but the value does not have the specified type.
[code] 
    **public** **fun** [remove](</references/framework/sui_sui/object_bag#sui_object_bag_remove>)<K: **copy** , drop, store, V: key, store>([bag](</references/framework/sui_sui/bag#sui_bag>): &**mut** [sui::object_bag::ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>), k: K): V
    
[/code]

## Function contains​

Returns true iff there is an value associated with the key k: K in the bag [bag](</references/framework/sui_sui/bag#sui_bag>): &[ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>)
[code] 
    **public** **fun** [contains](</references/framework/sui_sui/object_bag#sui_object_bag_contains>)<K: **copy** , drop, store>([bag](</references/framework/sui_sui/bag#sui_bag>): &[sui::object_bag::ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>), k: K): bool
    
[/code]

## Function contains_with_type​

Returns true iff there is an value associated with the key k: K in the bag [bag](</references/framework/sui_sui/bag#sui_bag>): &[ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>) with an assigned value of type V
[code] 
    **public** **fun** [contains_with_type](</references/framework/sui_sui/object_bag#sui_object_bag_contains_with_type>)<K: **copy** , drop, store, V: key, store>([bag](</references/framework/sui_sui/bag#sui_bag>): &[sui::object_bag::ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>), k: K): bool
    
[/code]

## Function length​

Returns the size of the bag, the number of key-value pairs
[code] 
    **public** **fun** [length](</references/framework/sui_sui/object_bag#sui_object_bag_length>)([bag](</references/framework/sui_sui/bag#sui_bag>): &[sui::object_bag::ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>)): u64
    
[/code]

## Function is_empty​

Returns true iff the bag is empty (if [length](</references/framework/sui_sui/object_bag#sui_object_bag_length>) returns 0)
[code] 
    **public** **fun** [is_empty](</references/framework/sui_sui/object_bag#sui_object_bag_is_empty>)([bag](</references/framework/sui_sui/bag#sui_bag>): &[sui::object_bag::ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>)): bool
    
[/code]

## Function destroy_empty​

Destroys an empty bag.  
Aborts with [EBagNotEmpty](</references/framework/sui_sui/object_bag#sui_object_bag_EBagNotEmpty>) if the bag still contains values
[code] 
    **public** **fun** [destroy_empty](</references/framework/sui_sui/object_bag#sui_object_bag_destroy_empty>)([bag](</references/framework/sui_sui/bag#sui_bag>): [sui::object_bag::ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>))
    
[/code]

## Function value_id​

Returns the ID of the object associated with the key if the bag has an entry with key k: K.  
Returns none otherwise
[code] 
    **public** **fun** [value_id](</references/framework/sui_sui/object_bag#sui_object_bag_value_id>)<K: **copy** , drop, store>([bag](</references/framework/sui_sui/bag#sui_bag>): &[sui::object_bag::ObjectBag](</references/framework/sui_sui/object_bag#sui_object_bag_ObjectBag>), k: K): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/object_bag.md>)

[Previousobject](</references/framework/sui_sui/object>)[Nextobject_table](</references/framework/sui_sui/object_table>)
