<!-- Source: https://docs.sui.io/references/framework/sui_sui/priority_queue -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * priority_queue


# Module sui::priority_queue

Priority queue implemented using a max heap.
[code] 
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    
[/code]

## Struct PriorityQueue​

Struct representing a priority queue. The entries vector represents a max heap structure, where entries[0] is the root, entries[1] and entries[2] are the left child and right child of the root, etc. More generally, the children of entries[i] are at i * 2 + 1 and i * 2 + 2. The max heap should have the invariant that the parent node's priority is always higher than its child nodes' priorities.
[code] 
    **public** **struct** [PriorityQueue](</references/framework/sui_sui/priority_queue#sui_priority_queue_PriorityQueue>)<T: drop> **has** drop, store
    
[/code]

Click to openFields

entries: vector<[sui::priority_queue::Entry](</references/framework/sui_sui/priority_queue#sui_priority_queue_Entry>)<T>>
    

## Struct Entry​
[code] 
    **public** **struct** [Entry](</references/framework/sui_sui/priority_queue#sui_priority_queue_Entry>)<T: drop> **has** drop, store
    
[/code]

Click to openFields

priority: u64
    
value: T
    

## Constants​

For when heap is empty and there's no data to pop.
[code] 
    **const** [EPopFromEmptyHeap](</references/framework/sui_sui/priority_queue#sui_priority_queue_EPopFromEmptyHeap>): u64 = 0;
    
[/code]

For when the value vector and priority vector have mismatched lengths
[code] 
    **const** [ELengthMismatch](</references/framework/sui_sui/priority_queue#sui_priority_queue_ELengthMismatch>): u64 = 1;
    
[/code]

For when access a node of a priority_queue at an invalid index
[code] 
    **const** [EIndexOutOfBounds](</references/framework/sui_sui/priority_queue#sui_priority_queue_EIndexOutOfBounds>): u64 = 2;
    
[/code]

## Function new​

Create a new priority queue from the input entry vectors.
[code] 
    **public** **fun** [new](</references/framework/sui_sui/priority_queue#sui_priority_queue_new>)<T: drop>(entries: vector<[sui::priority_queue::Entry](</references/framework/sui_sui/priority_queue#sui_priority_queue_Entry>)<T>>): [sui::priority_queue::PriorityQueue](</references/framework/sui_sui/priority_queue#sui_priority_queue_PriorityQueue>)<T>
    
[/code]

## Function pop_max​

Pop the entry with the highest priority value.
[code] 
    **public** **fun** [pop_max](</references/framework/sui_sui/priority_queue#sui_priority_queue_pop_max>)<T: drop>(pq: &**mut** [sui::priority_queue::PriorityQueue](</references/framework/sui_sui/priority_queue#sui_priority_queue_PriorityQueue>)<T>): (u64, T)
    
[/code]

## Function insert​

Insert a new entry into the queue.
[code] 
    **public** **fun** [insert](</references/framework/sui_sui/priority_queue#sui_priority_queue_insert>)<T: drop>(pq: &**mut** [sui::priority_queue::PriorityQueue](</references/framework/sui_sui/priority_queue#sui_priority_queue_PriorityQueue>)<T>, priority: u64, value: T)
    
[/code]

## Function new_entry​
[code] 
    **public** **fun** [new_entry](</references/framework/sui_sui/priority_queue#sui_priority_queue_new_entry>)<T: drop>(priority: u64, value: T): [sui::priority_queue::Entry](</references/framework/sui_sui/priority_queue#sui_priority_queue_Entry>)<T>
    
[/code]

## Function create_entries​
[code] 
    **public** **fun** [create_entries](</references/framework/sui_sui/priority_queue#sui_priority_queue_create_entries>)<T: drop>(p: vector<u64>, v: vector<T>): vector<[sui::priority_queue::Entry](</references/framework/sui_sui/priority_queue#sui_priority_queue_Entry>)<T>>
    
[/code]

## Function restore_heap_recursive​
[code] 
    **fun** [restore_heap_recursive](</references/framework/sui_sui/priority_queue#sui_priority_queue_restore_heap_recursive>)<T: drop>(v: &**mut** vector<[sui::priority_queue::Entry](</references/framework/sui_sui/priority_queue#sui_priority_queue_Entry>)<T>>, i: u64)
    
[/code]

## Function max_heapify_recursive​

Max heapify the subtree whose root is at index i. That means after this function finishes, the subtree should have the property that the parent node has higher priority than both child nodes.  
This function assumes that all the other nodes in the subtree (nodes other than the root) do satisfy the max heap property.
[code] 
    **fun** [max_heapify_recursive](</references/framework/sui_sui/priority_queue#sui_priority_queue_max_heapify_recursive>)<T: drop>(v: &**mut** vector<[sui::priority_queue::Entry](</references/framework/sui_sui/priority_queue#sui_priority_queue_Entry>)<T>>, len: u64, i: u64)
    
[/code]

## Function priorities​
[code] 
    **public** **fun** [priorities](</references/framework/sui_sui/priority_queue#sui_priority_queue_priorities>)<T: drop>(pq: &[sui::priority_queue::PriorityQueue](</references/framework/sui_sui/priority_queue#sui_priority_queue_PriorityQueue>)<T>): vector<u64>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/priority_queue.md>)

[Previousposeidon](</references/framework/sui_sui/poseidon>)[Nextprotocol_config](</references/framework/sui_sui/protocol_config>)
