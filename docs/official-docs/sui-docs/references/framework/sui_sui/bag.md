<!-- Source: https://docs.sui.io/references/framework/sui_sui/bag -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * bag


# Module sui::bag

A bag is a heterogeneous map-like collection. The collection is similar to [sui::table](</references/framework/sui_sui/table#sui_table>) in that its keys and values are not stored within the [Bag](</references/framework/sui_sui/bag#sui_bag_Bag>) value, but instead are stored using Sui's object system. The [Bag](</references/framework/sui_sui/bag#sui_bag_Bag>) struct acts only as a handle into the object system to retrieve those keys and values.  
Note that this means that [Bag](</references/framework/sui_sui/bag#sui_bag_Bag>) values with exactly the same key-value mapping will not be equal, with ==, at runtime. For example
[code] 
    let bag1 = bag::new();  
    let bag2 = bag::new();  
    bag::add(&mut bag1, 0, false);  
    bag::add(&mut bag1, 1, true);  
    bag::add(&mut bag2, 0, false);  
    bag::add(&mut bag2, 1, true);  
    // bag1 does not equal bag2, despite having the same entries  
    assert!(&bag1 != &bag2);  
    
[/code]

At it's core, [sui::bag](</references/framework/sui_sui/bag#sui_bag>) is a wrapper around UID that allows for access to [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>) while preventing accidentally stranding field values. A UID can be deleted, even if it has dynamic fields associated with it, but a bag, on the other hand, must be empty to be destroyed.
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

## Struct Bag​
[code] 
    **public** **struct** [Bag](</references/framework/sui_sui/bag#sui_bag_Bag>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
     the ID of this bag 
size: u64
     the number of key-value pairs in the bag 

## Constants​
[code] 
    **const** [EBagNotEmpty](</references/framework/sui_sui/bag#sui_bag_EBagNotEmpty>): u64 = 0;
    
[/code]

## Function new​

Creates a new, empty bag
[code] 
    **public** **fun** [new](</references/framework/sui_sui/bag#sui_bag_new>)(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
    
[/code]

## Function add​

Adds a key-value pair to the bag [bag](</references/framework/sui_sui/bag#sui_bag>): &**mut** [Bag](</references/framework/sui_sui/bag#sui_bag_Bag>).  
Aborts with [sui::dynamic_field::EFieldAlreadyExists](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldAlreadyExists>) if the bag already has an entry with that key k: K.
[code] 
    **public** **fun** [add](</references/framework/sui_sui/bag#sui_bag_add>)<K: **copy** , drop, store, V: store>([bag](</references/framework/sui_sui/bag#sui_bag>): &**mut** [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>), k: K, v: V)
    
[/code]

## Function borrow​

Immutable borrows the value associated with the key in the bag [bag](</references/framework/sui_sui/bag#sui_bag>): &[Bag](</references/framework/sui_sui/bag#sui_bag_Bag>).  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the bag does not have an entry with that key k: K.  
Aborts with [sui::dynamic_field::EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the bag has an entry for the key, but the value does not have the specified type.
[code] 
    **public** **fun** [borrow](</references/framework/sui_sui/borrow#sui_borrow>)<K: **copy** , drop, store, V: store>([bag](</references/framework/sui_sui/bag#sui_bag>): &[sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>), k: K): &V
    
[/code]

## Function borrow_mut​

Mutably borrows the value associated with the key in the bag [bag](</references/framework/sui_sui/bag#sui_bag>): &**mut** [Bag](</references/framework/sui_sui/bag#sui_bag_Bag>).  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the bag does not have an entry with that key k: K.  
Aborts with [sui::dynamic_field::EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the bag has an entry for the key, but the value does not have the specified type.
[code] 
    **public** **fun** [borrow_mut](</references/framework/sui_sui/bag#sui_bag_borrow_mut>)<K: **copy** , drop, store, V: store>([bag](</references/framework/sui_sui/bag#sui_bag>): &**mut** [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>), k: K): &**mut** V
    
[/code]

## Function remove​

Mutably borrows the key-value pair in the bag [bag](</references/framework/sui_sui/bag#sui_bag>): &**mut** [Bag](</references/framework/sui_sui/bag#sui_bag_Bag>) and returns the value.  
Aborts with [sui::dynamic_field::EFieldDoesNotExist](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldDoesNotExist>) if the bag does not have an entry with that key k: K.  
Aborts with [sui::dynamic_field::EFieldTypeMismatch](</references/framework/sui_sui/dynamic_field#sui_dynamic_field_EFieldTypeMismatch>) if the bag has an entry for the key, but the value does not have the specified type.
[code] 
    **public** **fun** [remove](</references/framework/sui_sui/bag#sui_bag_remove>)<K: **copy** , drop, store, V: store>([bag](</references/framework/sui_sui/bag#sui_bag>): &**mut** [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>), k: K): V
    
[/code]

## Function contains​

Returns true iff there is an value associated with the key k: K in the bag [bag](</references/framework/sui_sui/bag#sui_bag>): &[Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
[code] 
    **public** **fun** [contains](</references/framework/sui_sui/bag#sui_bag_contains>)<K: **copy** , drop, store>([bag](</references/framework/sui_sui/bag#sui_bag>): &[sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>), k: K): bool
    
[/code]

## Function contains_with_type​

Returns true iff there is an value associated with the key k: K in the bag [bag](</references/framework/sui_sui/bag#sui_bag>): &[Bag](</references/framework/sui_sui/bag#sui_bag_Bag>) with an assigned value of type V
[code] 
    **public** **fun** [contains_with_type](</references/framework/sui_sui/bag#sui_bag_contains_with_type>)<K: **copy** , drop, store, V: store>([bag](</references/framework/sui_sui/bag#sui_bag>): &[sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>), k: K): bool
    
[/code]

## Function length​

Returns the size of the bag, the number of key-value pairs
[code] 
    **public** **fun** [length](</references/framework/sui_sui/bag#sui_bag_length>)([bag](</references/framework/sui_sui/bag#sui_bag>): &[sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)): u64
    
[/code]

## Function is_empty​

Returns true iff the bag is empty (if [length](</references/framework/sui_sui/bag#sui_bag_length>) returns 0)
[code] 
    **public** **fun** [is_empty](</references/framework/sui_sui/bag#sui_bag_is_empty>)([bag](</references/framework/sui_sui/bag#sui_bag>): &[sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)): bool
    
[/code]

## Function destroy_empty​

Destroys an empty bag.  
Aborts with [EBagNotEmpty](</references/framework/sui_sui/bag#sui_bag_EBagNotEmpty>) if the bag still contains values
[code] 
    **public** **fun** [destroy_empty](</references/framework/sui_sui/bag#sui_bag_destroy_empty>)([bag](</references/framework/sui_sui/bag#sui_bag>): [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>))
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/bag.md>)

[Previousauthenticator_state](</references/framework/sui_sui/authenticator_state>)[Nextbalance](</references/framework/sui_sui/balance>)
