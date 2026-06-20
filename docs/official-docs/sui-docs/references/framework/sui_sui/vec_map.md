<!-- Source: https://docs.sui.io/references/framework/sui_sui/vec_map -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * vec_map


# Module sui::vec_map
[code]
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    
[/code]

## Struct VecMap​

A map data structure backed by a vector. The map is guaranteed not to contain duplicate keys, but entries are _not_ sorted by key--entries are included in insertion order.  
All operations are O(N) in the size of the map--the intention of this data structure is only to provide the convenience of programming against a map API.  
Large maps should use handwritten parent/child relationships instead.  
Maps that need sorted iteration rather than insertion order iteration should also be handwritten.
[code] 
    **public** **struct** [VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K: **copy** , V> **has** **copy** , drop, store
    
[/code]

Click to openFields

contents: vector<[sui::vec_map::Entry](</references/framework/sui_sui/vec_map#sui_vec_map_Entry>)<K, V>>
    

## Struct Entry​

An entry in the map
[code] 
    **public** **struct** [Entry](</references/framework/sui_sui/vec_map#sui_vec_map_Entry>)<K: **copy** , V> **has** **copy** , drop, store
    
[/code]

Click to openFields

key: K
    
value: V
    

## Constants​

This key already exists in the map
[code] 
    **const** [EKeyAlreadyExists](</references/framework/sui_sui/vec_map#sui_vec_map_EKeyAlreadyExists>): u64 = 0;
    
[/code]

This key does not exist in the map
[code] 
    **const** [EKeyDoesNotExist](</references/framework/sui_sui/vec_map#sui_vec_map_EKeyDoesNotExist>): u64 = 1;
    
[/code]

Trying to destroy a map that is not empty
[code] 
    **const** [EMapNotEmpty](</references/framework/sui_sui/vec_map#sui_vec_map_EMapNotEmpty>): u64 = 2;
    
[/code]

Trying to access an element of the map at an invalid index
[code] 
    **const** [EIndexOutOfBounds](</references/framework/sui_sui/vec_map#sui_vec_map_EIndexOutOfBounds>): u64 = 3;
    
[/code]

Trying to pop from a map that is empty
[code] 
    **const** [EMapEmpty](</references/framework/sui_sui/vec_map#sui_vec_map_EMapEmpty>): u64 = 4;
    
[/code]

Trying to construct a map from keys and values of different lengths
[code] 
    **const** [EUnequalLengths](</references/framework/sui_sui/vec_map#sui_vec_map_EUnequalLengths>): u64 = 5;
    
[/code]

## Function empty​

Create an empty [VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)
[code] 
    **public** **fun** [empty](</references/framework/sui_sui/vec_map#sui_vec_map_empty>)<K: **copy** , V>(): [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>
    
[/code]

## Function insert​

Insert the entry key |-> value into self.  
Aborts if key is already bound in self.
[code] 
    **public** **fun** [insert](</references/framework/sui_sui/vec_map#sui_vec_map_insert>)<K: **copy** , V>(self: &**mut** [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>, key: K, value: V)
    
[/code]

## Function remove​

Remove the entry key |-> value from self. Aborts if key is not bound in self.
[code] 
    **public** **fun** [remove](</references/framework/sui_sui/vec_map#sui_vec_map_remove>)<K: **copy** , V>(self: &**mut** [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>, key: &K): (K, V)
    
[/code]

## Function pop​

Pop the most recently inserted entry from the map. Aborts if the map is empty.
[code] 
    **public** **fun** [pop](</references/framework/sui_sui/vec_map#sui_vec_map_pop>)<K: **copy** , V>(self: &**mut** [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>): (K, V)
    
[/code]

## Function get_mut​

Get a mutable reference to the value bound to key in self.  
Aborts if key is not bound in self.
[code] 
    **public** **fun** [get_mut](</references/framework/sui_sui/vec_map#sui_vec_map_get_mut>)<K: **copy** , V>(self: &**mut** [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>, key: &K): &**mut** V
    
[/code]

## Function get​

Get a reference to the value bound to key in self.  
Aborts if key is not bound in self.
[code] 
    **public** **fun** [get](</references/framework/sui_sui/vec_map#sui_vec_map_get>)<K: **copy** , V>(self: &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>, key: &K): &V
    
[/code]

## Function try_get​

Safely try borrow a value bound to key in self.  
Return Some(V) if the value exists, None otherwise.  
Only works for a "copyable" value as references cannot be stored in vector.
[code] 
    **public** **fun** [try_get](</references/framework/sui_sui/vec_map#sui_vec_map_try_get>)<K: **copy** , V: **copy** >(self: &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>, key: &K): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<V>
    
[/code]

## Function contains​

Return true if self contains an entry for key, false otherwise
[code] 
    **public** **fun** [contains](</references/framework/sui_sui/vec_map#sui_vec_map_contains>)<K: **copy** , V>(self: &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>, key: &K): bool
    
[/code]

## Function length​

Return the number of entries in self
[code] 
    **public** **fun** [length](</references/framework/sui_sui/vec_map#sui_vec_map_length>)<K: **copy** , V>(self: &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>): u64
    
[/code]

## Function is_empty​

Return true if self has 0 elements, false otherwise
[code] 
    **public** **fun** [is_empty](</references/framework/sui_sui/vec_map#sui_vec_map_is_empty>)<K: **copy** , V>(self: &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>): bool
    
[/code]

## Function destroy_empty​

Destroy an empty map. Aborts if self is not empty
[code] 
    **public** **fun** [destroy_empty](</references/framework/sui_sui/vec_map#sui_vec_map_destroy_empty>)<K: **copy** , V>(self: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>)
    
[/code]

## Function into_keys_values​

Unpack self into vectors of its keys and values.  
The output keys and values are stored in insertion order, _not_ sorted by key.
[code] 
    **public** **fun** [into_keys_values](</references/framework/sui_sui/vec_map#sui_vec_map_into_keys_values>)<K: **copy** , V>(self: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>): (vector<K>, vector<V>)
    
[/code]

## Function from_keys_values​

Construct a new [VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>) from two vectors, one for keys and one for values.  
The key value pairs are associated via their indices in the vectors, e.g. the key at index i in [keys](</references/framework/sui_sui/vec_map#sui_vec_map_keys>) is associated with the value at index i in values.  
The key value pairs are stored in insertion order (the original vectors ordering) and are _not_ sorted.
[code] 
    **public** **fun** [from_keys_values](</references/framework/sui_sui/vec_map#sui_vec_map_from_keys_values>)<K: **copy** , V>([keys](</references/framework/sui_sui/vec_map#sui_vec_map_keys>): vector<K>, values: vector<V>): [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>
    
[/code]

## Function keys​

Returns a list of keys in the map.  
Do not assume any particular ordering.
[code] 
    **public** **fun** [keys](</references/framework/sui_sui/vec_map#sui_vec_map_keys>)<K: **copy** , V>(self: &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>): vector<K>
    
[/code]

## Function get_idx_opt​

Find the index of key in self. Return None if key is not in self.  
Note that map entries are stored in insertion order, _not_ sorted by key.
[code] 
    **public** **fun** [get_idx_opt](</references/framework/sui_sui/vec_map#sui_vec_map_get_idx_opt>)<K: **copy** , V>(self: &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>, key: &K): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u64>
    
[/code]

## Function get_idx​

Find the index of key in self. Aborts if key is not in self.  
Note that map entries are stored in insertion order, _not_ sorted by key.
[code] 
    **public** **fun** [get_idx](</references/framework/sui_sui/vec_map#sui_vec_map_get_idx>)<K: **copy** , V>(self: &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>, key: &K): u64
    
[/code]

## Function get_entry_by_idx​

Return a reference to the idxth entry of self. This gives direct access into the backing array of the map--use with caution.  
Note that map entries are stored in insertion order, _not_ sorted by key.  
Aborts if idx is greater than or equal to self.[length](</references/framework/sui_sui/vec_map#sui_vec_map_length>)()
[code] 
    **public** **fun** [get_entry_by_idx](</references/framework/sui_sui/vec_map#sui_vec_map_get_entry_by_idx>)<K: **copy** , V>(self: &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>, idx: u64): (&K, &V)
    
[/code]

## Function get_entry_by_idx_mut​

Return a mutable reference to the idxth entry of self. This gives direct access into the backing array of the map--use with caution.  
Note that map entries are stored in insertion order, _not_ sorted by key.  
Aborts if idx is greater than or equal to self.[length](</references/framework/sui_sui/vec_map#sui_vec_map_length>)()
[code] 
    **public** **fun** [get_entry_by_idx_mut](</references/framework/sui_sui/vec_map#sui_vec_map_get_entry_by_idx_mut>)<K: **copy** , V>(self: &**mut** [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>, idx: u64): (&K, &**mut** V)
    
[/code]

## Function remove_entry_by_idx​

Remove the entry at index idx from self.  
Aborts if idx is greater than or equal to self.[length](</references/framework/sui_sui/vec_map#sui_vec_map_length>)()
[code] 
    **public** **fun** [remove_entry_by_idx](</references/framework/sui_sui/vec_map#sui_vec_map_remove_entry_by_idx>)<K: **copy** , V>(self: &**mut** [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>, idx: u64): (K, V)
    
[/code]

## Function size​

Return the number of entries in self
[code] 
    **public** **fun** [size](</references/framework/sui_sui/vec_map#sui_vec_map_size>)<K: **copy** , V>(self: &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<K, V>): u64
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/vec_map.md>)

[Previousvdf](</references/framework/sui_sui/vdf>)[Nextvec_set](</references/framework/sui_sui/vec_set>)
