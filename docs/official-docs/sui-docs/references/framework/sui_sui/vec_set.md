<!-- Source: https://docs.sui.io/references/framework/sui_sui/vec_set -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * vec_set


# Module sui::vec_set
[code]
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    
[/code]

## Struct VecSet​

A set data structure backed by a vector. The set is guaranteed not to contain duplicate keys. All operations are O(N) in the size of the set

  * the intention of this data structure is only to provide the convenience of programming against a set API. Sets that need sorted iteration rather than insertion order iteration should be handwritten.


[code] 
    **public** **struct** [VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<K: **copy** , drop> **has** **copy** , drop, store
    
[/code]

Click to openFields

contents: vector<K>
    

## Constants​

This key already exists in the map
[code] 
    **const** [EKeyAlreadyExists](</references/framework/sui_sui/vec_set#sui_vec_set_EKeyAlreadyExists>): u64 = 0;
    
[/code]

This key does not exist in the map
[code] 
    **const** [EKeyDoesNotExist](</references/framework/sui_sui/vec_set#sui_vec_set_EKeyDoesNotExist>): u64 = 1;
    
[/code]

## Function empty​

Create an empty [VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)
[code] 
    **public** **fun** [empty](</references/framework/sui_sui/vec_set#sui_vec_set_empty>)<K: **copy** , drop>(): [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<K>
    
[/code]

## Function singleton​

Create a singleton [VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>) that only contains one element.
[code] 
    **public** **fun** [singleton](</references/framework/sui_sui/vec_set#sui_vec_set_singleton>)<K: **copy** , drop>(key: K): [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<K>
    
[/code]

## Function insert​

Insert a key into self.  
Aborts if key is already present in self.
[code] 
    **public** **fun** [insert](</references/framework/sui_sui/vec_set#sui_vec_set_insert>)<K: **copy** , drop>(self: &**mut** [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<K>, key: K)
    
[/code]

## Function remove​

Remove the entry key from self. Aborts if key is not present in self.
[code] 
    **public** **fun** [remove](</references/framework/sui_sui/vec_set#sui_vec_set_remove>)<K: **copy** , drop>(self: &**mut** [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<K>, key: &K)
    
[/code]

## Function contains​

Return true if self contains an entry for key, false otherwise
[code] 
    **public** **fun** [contains](</references/framework/sui_sui/vec_set#sui_vec_set_contains>)<K: **copy** , drop>(self: &[sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<K>, key: &K): bool
    
[/code]

## Function length​

Return the number of entries in self
[code] 
    **public** **fun** [length](</references/framework/sui_sui/vec_set#sui_vec_set_length>)<K: **copy** , drop>(self: &[sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<K>): u64
    
[/code]

## Function is_empty​

Return true if self has 0 elements, false otherwise
[code] 
    **public** **fun** [is_empty](</references/framework/sui_sui/vec_set#sui_vec_set_is_empty>)<K: **copy** , drop>(self: &[sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<K>): bool
    
[/code]

## Function into_keys​

Unpack self into vectors of keys.  
The output keys are stored in insertion order, _not_ sorted.
[code] 
    **public** **fun** [into_keys](</references/framework/sui_sui/vec_set#sui_vec_set_into_keys>)<K: **copy** , drop>(self: [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<K>): vector<K>
    
[/code]

## Function from_keys​

Construct a new [VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>) from a vector of keys.  
The keys are stored in insertion order (the original [keys](</references/framework/sui_sui/vec_set#sui_vec_set_keys>) ordering) and are _not_ sorted.
[code] 
    **public** **fun** [from_keys](</references/framework/sui_sui/vec_set#sui_vec_set_from_keys>)<K: **copy** , drop>([keys](</references/framework/sui_sui/vec_set#sui_vec_set_keys>): vector<K>): [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<K>
    
[/code]

## Function keys​

Borrow the contents of the [VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>) to access content by index without unpacking. The contents are stored in insertion order, _not_ sorted.
[code] 
    **public** **fun** [keys](</references/framework/sui_sui/vec_set#sui_vec_set_keys>)<K: **copy** , drop>(self: &[sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<K>): &vector<K>
    
[/code]

## Function size​

Return the number of entries in self
[code] 
    **public** **fun** [size](</references/framework/sui_sui/vec_set#sui_vec_set_size>)<K: **copy** , drop>(self: &[sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<K>): u64
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/vec_set.md>)

[Previousvec_map](</references/framework/sui_sui/vec_map>)[Nextversioned](</references/framework/sui_sui/versioned>)
