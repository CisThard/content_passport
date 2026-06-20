<!-- Source: https://docs.sui.io/references/framework/sui_std/vector -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [std](</references/framework/sui_std>)
  * vector


# Module std::vector

A variable-sized container that can hold any type. Indexing is 0-based, and vectors are growable. This module has many native functions.

## Constants​

The index into the vector is out of bounds
[code] 
    **const** [EINDEX_OUT_OF_BOUNDS](</references/framework/sui_std/vector#std_vector_EINDEX_OUT_OF_BOUNDS>): [u64](</references/framework/sui_std/u64#std_u64>) = 131072;
    
[/code]

## Function length​

Return the length of the vector.
[code] 
    **public** **fun** [length](</references/framework/sui_std/vector#std_vector_length>)<Element>(v: &[vector](</references/framework/sui_std/vector#std_vector>)<Element>): [u64](</references/framework/sui_std/u64#std_u64>)
    
[/code]

## Function borrow​

Acquire an immutable reference to the ith element of the vector v.  
Aborts if i is out of bounds.
[code] 
    **public** **fun** [borrow](</references/framework/sui_std/vector#std_vector_borrow>)<Element>(v: &[vector](</references/framework/sui_std/vector#std_vector>)<Element>, i: [u64](</references/framework/sui_std/u64#std_u64>)): &Element
    
[/code]

## Function push_back​

Add element e to the end of the vector v.
[code] 
    **public** **fun** [push_back](</references/framework/sui_std/vector#std_vector_push_back>)<Element>(v: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<Element>, e: Element)
    
[/code]

## Function borrow_mut​

Return a mutable reference to the ith element in the vector v.  
Aborts if i is out of bounds.
[code] 
    **public** **fun** [borrow_mut](</references/framework/sui_std/vector#std_vector_borrow_mut>)<Element>(v: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<Element>, i: [u64](</references/framework/sui_std/u64#std_u64>)): &**mut** Element
    
[/code]

## Function pop_back​

Pop an element from the end of vector v.  
Aborts if v is empty.
[code] 
    **public** **fun** [pop_back](</references/framework/sui_std/vector#std_vector_pop_back>)<Element>(v: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<Element>): Element
    
[/code]

## Function destroy_empty​

Destroy the vector v.  
Aborts if v is not empty.
[code] 
    **public** **fun** [destroy_empty](</references/framework/sui_std/vector#std_vector_destroy_empty>)<Element>(v: [vector](</references/framework/sui_std/vector#std_vector>)<Element>)
    
[/code]

## Function swap​

Swaps the elements at the ith and jth indices in the vector v.  
Aborts if i or j is out of bounds.
[code] 
    **public** **fun** [swap](</references/framework/sui_std/vector#std_vector_swap>)<Element>(v: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<Element>, i: [u64](</references/framework/sui_std/u64#std_u64>), j: [u64](</references/framework/sui_std/u64#std_u64>))
    
[/code]

## Function reverse​

Reverses the order of the elements in the vector v in place.
[code] 
    **public** **fun** [reverse](</references/framework/sui_std/vector#std_vector_reverse>)<Element>(v: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<Element>)
    
[/code]

## Function append​

Pushes all of the elements of the other vector into the lhs vector.
[code] 
    **public** **fun** [append](</references/framework/sui_std/vector#std_vector_append>)<Element>(lhs: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<Element>, other: [vector](</references/framework/sui_std/vector#std_vector>)<Element>)
    
[/code]

## Function is_empty​

Return **true** if the vector v has no elements and **false** otherwise.
[code] 
    **public** **fun** [is_empty](</references/framework/sui_std/vector#std_vector_is_empty>)<Element>(v: &[vector](</references/framework/sui_std/vector#std_vector>)<Element>): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function contains​

Return true if e is in the vector v.  
Otherwise, returns false.
[code] 
    **public** **fun** [contains](</references/framework/sui_std/vector#std_vector_contains>)<Element>(v: &[vector](</references/framework/sui_std/vector#std_vector>)<Element>, e: &Element): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function index_of​

Return (**true** , i) if e is in the vector v at index i.  
Otherwise, returns (**false** , 0).
[code] 
    **public** **fun** [index_of](</references/framework/sui_std/vector#std_vector_index_of>)<Element>(v: &[vector](</references/framework/sui_std/vector#std_vector>)<Element>, e: &Element): ([bool](</references/framework/sui_std/bool#std_bool>), [u64](</references/framework/sui_std/u64#std_u64>))
    
[/code]

## Function remove​

Remove the ith element of the vector v, shifting all subsequent elements.  
This is O(n) and preserves ordering of elements in the vector.  
Aborts if i is out of bounds.
[code] 
    **public** **fun** [remove](</references/framework/sui_std/vector#std_vector_remove>)<Element>(v: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<Element>, i: [u64](</references/framework/sui_std/u64#std_u64>)): Element
    
[/code]

## Function insert​

Insert e at position i in the vector v.  
If i is in bounds, this shifts the old v[i] and all subsequent elements to the right.  
If i == v.[length](</references/framework/sui_std/vector#std_vector_length>)(), this adds e to the end of the vector.  
This is O(n) and preserves ordering of elements in the vector.  
Aborts if i > v.[length](</references/framework/sui_std/vector#std_vector_length>)()
[code] 
    **public** **fun** [insert](</references/framework/sui_std/vector#std_vector_insert>)<Element>(v: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<Element>, e: Element, i: [u64](</references/framework/sui_std/u64#std_u64>))
    
[/code]

## Function swap_remove​

Swap the ith element of the vector v with the last element and then pop the vector.  
This is O(1), but does not preserve ordering of elements in the vector.  
Aborts if i is out of bounds.
[code] 
    **public** **fun** [swap_remove](</references/framework/sui_std/vector#std_vector_swap_remove>)<Element>(v: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<Element>, i: [u64](</references/framework/sui_std/u64#std_u64>)): Element
    
[/code]

## Function skip​

Return a new vector containing the elements of v except the first n elements.  
If n > [length](</references/framework/sui_std/vector#std_vector_length>), returns an empty vector.
[code] 
    **public** **fun** [skip](</references/framework/sui_std/vector#std_vector_skip>)<T: drop>(v: [vector](</references/framework/sui_std/vector#std_vector>)<T>, n: [u64](</references/framework/sui_std/u64#std_u64>)): [vector](</references/framework/sui_std/vector#std_vector>)<T>
    
[/code]

## Function take​

Take the first n elements of the vector v and drop the rest.  
Aborts if n is greater than the length of v.
[code] 
    **public** **fun** [take](</references/framework/sui_std/vector#std_vector_take>)<T: drop>(v: [vector](</references/framework/sui_std/vector#std_vector>)<T>, n: [u64](</references/framework/sui_std/u64#std_u64>)): [vector](</references/framework/sui_std/vector#std_vector>)<T>
    
[/code]

## Macro function tabulate​

Create a vector of length n by calling the function f on each index.
[code] 
    **public** **macro** **fun** [tabulate](</references/framework/sui_std/vector#std_vector_tabulate>)<$T>($n: [u64](</references/framework/sui_std/u64#std_u64>), $f: |[u64](</references/framework/sui_std/u64#std_u64>)| -> $T): [vector](</references/framework/sui_std/vector#std_vector>)<$T>
    
[/code]

## Macro function destroy​

Destroy the vector v by calling f on each element and then destroying the vector.  
Does not preserve the order of elements in the vector (starts from the end of the vector).
[code] 
    **public** **macro** **fun** [destroy](</references/framework/sui_std/vector#std_vector_destroy>)<$T, $R: drop>($v: [vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |$T| -> $R)
    
[/code]

## Macro function do​

Destroy the vector v by calling f on each element and then destroying the vector.  
Preserves the order of elements in the vector.
[code] 
    **public** **macro** **fun** [do](</references/framework/sui_std/vector#std_vector_do>)<$T, $R: drop>($v: [vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |$T| -> $R)
    
[/code]

## Macro function do_ref​

Perform an action f on each element of the vector v. The vector is not modified.
[code] 
    **public** **macro** **fun** [do_ref](</references/framework/sui_std/vector#std_vector_do_ref>)<$T, $R: drop>($v: &[vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |&$T| -> $R)
    
[/code]

## Macro function do_mut​

Perform an action f on each element of the vector v.  
The function f takes a mutable reference to the element.
[code] 
    **public** **macro** **fun** [do_mut](</references/framework/sui_std/vector#std_vector_do_mut>)<$T, $R: drop>($v: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |&**mut** $T| -> $R)
    
[/code]

## Macro function map​

Map the vector v to a new vector by applying the function f to each element.  
Preserves the order of elements in the vector, first is called first.
[code] 
    **public** **macro** **fun** [map](</references/framework/sui_std/vector#std_vector_map>)<$T, $U>($v: [vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |$T| -> $U): [vector](</references/framework/sui_std/vector#std_vector>)<$U>
    
[/code]

## Macro function map_ref​

Map the vector v to a new vector by applying the function f to each element.  
Preserves the order of elements in the vector, first is called first.
[code] 
    **public** **macro** **fun** [map_ref](</references/framework/sui_std/vector#std_vector_map_ref>)<$T, $U>($v: &[vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |&$T| -> $U): [vector](</references/framework/sui_std/vector#std_vector>)<$U>
    
[/code]

## Macro function filter​

Filter the vector v by applying the function f to each element.  
Return a new vector containing only the elements for which f returns **true**.
[code] 
    **public** **macro** **fun** [filter](</references/framework/sui_std/vector#std_vector_filter>)<$T: drop>($v: [vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |&$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): [vector](</references/framework/sui_std/vector#std_vector>)<$T>
    
[/code]

## Macro function partition​

Split the vector v into two vectors by applying the function f to each element.  
Return a tuple containing two vectors: the first containing the elements for which f returns **true** , and the second containing the elements for which f returns **false**.
[code] 
    **public** **macro** **fun** [partition](</references/framework/sui_std/vector#std_vector_partition>)<$T>($v: [vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |&$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): ([vector](</references/framework/sui_std/vector#std_vector>)<$T>, [vector](</references/framework/sui_std/vector#std_vector>)<$T>)
    
[/code]

## Macro function find_index​

Finds the index of first element in the vector v that satisfies the predicate f.  
Returns some(index) if such an element is found, otherwise none().
[code] 
    **public** **macro** **fun** [find_index](</references/framework/sui_std/vector#std_vector_find_index>)<$T>($v: &[vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |&$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[u64](</references/framework/sui_std/u64#std_u64>)>
    
[/code]

## Macro function find_indices​

Finds all indices of elements in the vector v that satisfy the predicate f.  
Returns a vector of indices of all found elements.
[code] 
    **public** **macro** **fun** [find_indices](</references/framework/sui_std/vector#std_vector_find_indices>)<$T>($v: &[vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |&$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): [vector](</references/framework/sui_std/vector#std_vector>)<[u64](</references/framework/sui_std/u64#std_u64>)>
    
[/code]

## Macro function count​

Count how many elements in the vector v satisfy the predicate f.
[code] 
    **public** **macro** **fun** [count](</references/framework/sui_std/vector#std_vector_count>)<$T>($v: &[vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |&$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): [u64](</references/framework/sui_std/u64#std_u64>)
    
[/code]

## Macro function fold​

Reduce the vector v to a single value by applying the function f to each element.  
Similar to fold_left in Rust and reduce in Python and JavaScript.
[code] 
    **public** **macro** **fun** [fold](</references/framework/sui_std/vector#std_vector_fold>)<$T, $Acc>($v: [vector](</references/framework/sui_std/vector#std_vector>)<$T>, $init: $Acc, $f: |$Acc, $T| -> $Acc): $Acc
    
[/code]

## Function flatten​

Concatenate the vectors of v into a single vector, keeping the order of the elements.
[code] 
    **public** **fun** [flatten](</references/framework/sui_std/vector#std_vector_flatten>)<T>(v: [vector](</references/framework/sui_std/vector#std_vector>)<[vector](</references/framework/sui_std/vector#std_vector>)<T>>): [vector](</references/framework/sui_std/vector#std_vector>)<T>
    
[/code]

## Macro function any​

Whether any element in the vector v satisfies the predicate f.  
If the vector is empty, returns **false**.
[code] 
    **public** **macro** **fun** [any](</references/framework/sui_std/vector#std_vector_any>)<$T>($v: &[vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |&$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Macro function all​

Whether all elements in the vector v satisfy the predicate f.  
If the vector is empty, returns **true**.
[code] 
    **public** **macro** **fun** [all](</references/framework/sui_std/vector#std_vector_all>)<$T>($v: &[vector](</references/framework/sui_std/vector#std_vector>)<$T>, $f: |&$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Macro function zip_do​

Destroys two vectors v1 and v2 by calling f to each pair of elements.  
Aborts if the vectors are not of the same length.  
The order of elements in the vectors is preserved.
[code] 
    **public** **macro** **fun** [zip_do](</references/framework/sui_std/vector#std_vector_zip_do>)<$T1, $T2, $R: drop>($v1: [vector](</references/framework/sui_std/vector#std_vector>)<$T1>, $v2: [vector](</references/framework/sui_std/vector#std_vector>)<$T2>, $f: |$T1, $T2| -> $R)
    
[/code]

## Macro function zip_do_reverse​

Destroys two vectors v1 and v2 by calling f to each pair of elements.  
Aborts if the vectors are not of the same length.  
Starts from the end of the vectors.
[code] 
    **public** **macro** **fun** [zip_do_reverse](</references/framework/sui_std/vector#std_vector_zip_do_reverse>)<$T1, $T2, $R: drop>($v1: [vector](</references/framework/sui_std/vector#std_vector>)<$T1>, $v2: [vector](</references/framework/sui_std/vector#std_vector>)<$T2>, $f: |$T1, $T2| -> $R)
    
[/code]

## Macro function zip_do_ref​

Iterate through v1 and v2 and apply the function f to references of each pair of elements. The vectors are not modified.  
Aborts if the vectors are not of the same length.  
The order of elements in the vectors is preserved.
[code] 
    **public** **macro** **fun** [zip_do_ref](</references/framework/sui_std/vector#std_vector_zip_do_ref>)<$T1, $T2, $R: drop>($v1: &[vector](</references/framework/sui_std/vector#std_vector>)<$T1>, $v2: &[vector](</references/framework/sui_std/vector#std_vector>)<$T2>, $f: |&$T1, &$T2| -> $R)
    
[/code]

## Macro function zip_do_mut​

Iterate through v1 and v2 and apply the function f to mutable references of each pair of elements. The vectors may be modified.  
Aborts if the vectors are not of the same length.  
The order of elements in the vectors is preserved.
[code] 
    **public** **macro** **fun** [zip_do_mut](</references/framework/sui_std/vector#std_vector_zip_do_mut>)<$T1, $T2, $R: drop>($v1: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<$T1>, $v2: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<$T2>, $f: |&**mut** $T1, &**mut** $T2| -> $R)
    
[/code]

## Macro function zip_map​

Destroys two vectors v1 and v2 by applying the function f to each pair of elements.  
The returned values are collected into a new vector.  
Aborts if the vectors are not of the same length.  
The order of elements in the vectors is preserved.
[code] 
    **public** **macro** **fun** [zip_map](</references/framework/sui_std/vector#std_vector_zip_map>)<$T1, $T2, $U>($v1: [vector](</references/framework/sui_std/vector#std_vector>)<$T1>, $v2: [vector](</references/framework/sui_std/vector#std_vector>)<$T2>, $f: |$T1, $T2| -> $U): [vector](</references/framework/sui_std/vector#std_vector>)<$U>
    
[/code]

## Macro function zip_map_ref​

Iterate through v1 and v2 and apply the function f to references of each pair of elements. The returned values are collected into a new vector.  
Aborts if the vectors are not of the same length.  
The order of elements in the vectors is preserved.
[code] 
    **public** **macro** **fun** [zip_map_ref](</references/framework/sui_std/vector#std_vector_zip_map_ref>)<$T1, $T2, $U>($v1: &[vector](</references/framework/sui_std/vector#std_vector>)<$T1>, $v2: &[vector](</references/framework/sui_std/vector#std_vector>)<$T2>, $f: |&$T1, &$T2| -> $U): [vector](</references/framework/sui_std/vector#std_vector>)<$U>
    
[/code]

## Macro function insertion_sort_by​

Performs an in-place insertion sort on the vector v using the comparison function le.  
The sort is stable, meaning that equal elements will maintain their relative order.

Please, note that the comparison function le expects less or equal, not less.

Example:
[code] 
    let mut v = vector[2, 1, 3];  
    v.insertion_sort_by(|a, b| a <= b);  
    assert!(v == vector[1, 2, 3]);  
    
[/code]

Insertion sort is efficient for small vectors (~30 or less elements), and can be faster than merge sort for almost sorted vectors (e.g. when the vector is already sorted or nearly sorted).
[code] 
    **public** **macro** **fun** [insertion_sort_by](</references/framework/sui_std/vector#std_vector_insertion_sort_by>)<$T>($v: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<$T>, $le: |&$T, &$T| -> [bool](</references/framework/sui_std/bool#std_bool>))
    
[/code]

## Macro function merge_sort_by​

Performs an in-place merge sort on the vector v using the comparison function le.  
Merge sort is efficient for large vectors, and is a stable sort.

Please, note that the comparison function le expects less or equal, not less.

Example:
[code] 
    let mut v = vector[2, 1, 3];  
    v.merge_sort_by(|a, b| a <= b);  
    assert!(v == vector[1, 2, 3]);  
    
[/code]

Merge sort performs better than insertion sort for large vectors (~30 elements or more).
[code] 
    **public** **macro** **fun** [merge_sort_by](</references/framework/sui_std/vector#std_vector_merge_sort_by>)<$T>($v: &**mut** [vector](</references/framework/sui_std/vector#std_vector>)<$T>, $le: |&$T, &$T| -> [bool](</references/framework/sui_std/bool#std_bool>))
    
[/code]

## Macro function is_sorted_by​

Check if the vector v is sorted in non-decreasing order according to the comparison function le (les). Returns **true** if the vector is sorted, **false** otherwise.
[code] 
    **public** **macro** **fun** [is_sorted_by](</references/framework/sui_std/vector#std_vector_is_sorted_by>)<$T>($v: &[vector](</references/framework/sui_std/vector#std_vector>)<$T>, $le: |&$T, &$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Macro function take_while​

Return a new vector containing the elements of v except the first n elements that satisfy the predicate p. If all elements satisfy the predicate, returns an empty vector.
[code] 
    **public** **macro** **fun** [take_while](</references/framework/sui_std/vector#std_vector_take_while>)<$T: drop>($v: [vector](</references/framework/sui_std/vector#std_vector>)<$T>, $p: |&$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): [vector](</references/framework/sui_std/vector#std_vector>)<$T>
    
[/code]

## Macro function skip_while​

Take all elements of the vector v except the first n elements that satisfy the predicate p and drop the rest, where n <= v.[length](</references/framework/sui_std/vector#std_vector_length>)().
[code] 
    **public** **macro** **fun** [skip_while](</references/framework/sui_std/vector#std_vector_skip_while>)<$T: drop>($v: [vector](</references/framework/sui_std/vector#std_vector>)<$T>, $p: |&$T| -> [bool](</references/framework/sui_std/bool#std_bool>)): [vector](</references/framework/sui_std/vector#std_vector>)<$T>
    
[/code]

## Function empty​

Create an empty vector.
[code] 
    **public** **fun** [empty](</references/framework/sui_std/vector#std_vector_empty>)<Element>(): [vector](</references/framework/sui_std/vector#std_vector>)<Element>
    
[/code]

## Function singleton​

Return an vector of size one containing element e.
[code] 
    **public** **fun** [singleton](</references/framework/sui_std/vector#std_vector_singleton>)<Element>(e: Element): [vector](</references/framework/sui_std/vector#std_vector>)<Element>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_std/vector.md>)

[Previousuq64_64](</references/framework/sui_std/uq64_64>)[Nextsui:sui](</references/framework/sui_sui>)
