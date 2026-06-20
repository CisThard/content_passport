<!-- Source: https://docs.sui.io/references/framework/sui_std/bit_vector -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [std](</references/framework/sui_std>)
  * bit_vector


# Module std::bit_vector

## Struct BitVector​
[code] 
    **public** **struct** [BitVector](</references/framework/sui_std/bit_vector#std_bit_vector_BitVector>) **has** **copy** , drop, store
    
[/code]

Click to openFields

[length](</references/framework/sui_std/bit_vector#std_bit_vector_length>): [u64](</references/framework/sui_std/u64#std_u64>)
    
bit_field: [vector](</references/framework/sui_std/vector#std_vector>)<[bool](</references/framework/sui_std/bool#std_bool>)>
    

## Constants​

The provided index is out of bounds
[code] 
    **const** [EINDEX](</references/framework/sui_std/bit_vector#std_bit_vector_EINDEX>): [u64](</references/framework/sui_std/u64#std_u64>) = 131072;
    
[/code]

An invalid length of bitvector was given
[code] 
    **const** [ELENGTH](</references/framework/sui_std/bit_vector#std_bit_vector_ELENGTH>): [u64](</references/framework/sui_std/u64#std_u64>) = 131073;
    
[/code]
[code] 
    **const** [WORD_SIZE](</references/framework/sui_std/bit_vector#std_bit_vector_WORD_SIZE>): [u64](</references/framework/sui_std/u64#std_u64>) = 1;
    
[/code]

The maximum allowed bitvector size
[code] 
    **const** [MAX_SIZE](</references/framework/sui_std/bit_vector#std_bit_vector_MAX_SIZE>): [u64](</references/framework/sui_std/u64#std_u64>) = 1024;
    
[/code]

## Function new​
[code] 
    **public** **fun** [new](</references/framework/sui_std/bit_vector#std_bit_vector_new>)([length](</references/framework/sui_std/bit_vector#std_bit_vector_length>): [u64](</references/framework/sui_std/u64#std_u64>)): [std::bit_vector::BitVector](</references/framework/sui_std/bit_vector#std_bit_vector_BitVector>)
    
[/code]

## Function set​

Set the bit at bit_index in the bitvector regardless of its previous state.
[code] 
    **public** **fun** [set](</references/framework/sui_std/bit_vector#std_bit_vector_set>)(bitvector: &**mut** [std::bit_vector::BitVector](</references/framework/sui_std/bit_vector#std_bit_vector_BitVector>), bit_index: [u64](</references/framework/sui_std/u64#std_u64>))
    
[/code]

## Function unset​

Unset the bit at bit_index in the bitvector regardless of its previous state.
[code] 
    **public** **fun** [unset](</references/framework/sui_std/bit_vector#std_bit_vector_unset>)(bitvector: &**mut** [std::bit_vector::BitVector](</references/framework/sui_std/bit_vector#std_bit_vector_BitVector>), bit_index: [u64](</references/framework/sui_std/u64#std_u64>))
    
[/code]

## Function shift_left​

Shift the bitvector left by amount. If amount is greater than the bitvector's length the bitvector will be zeroed out.
[code] 
    **public** **fun** [shift_left](</references/framework/sui_std/bit_vector#std_bit_vector_shift_left>)(bitvector: &**mut** [std::bit_vector::BitVector](</references/framework/sui_std/bit_vector#std_bit_vector_BitVector>), amount: [u64](</references/framework/sui_std/u64#std_u64>))
    
[/code]

## Function is_index_set​

Return the value of the bit at bit_index in the bitvector. **true** represents "1" and **false** represents a 0
[code] 
    **public** **fun** [is_index_set](</references/framework/sui_std/bit_vector#std_bit_vector_is_index_set>)(bitvector: &[std::bit_vector::BitVector](</references/framework/sui_std/bit_vector#std_bit_vector_BitVector>), bit_index: [u64](</references/framework/sui_std/u64#std_u64>)): [bool](</references/framework/sui_std/bool#std_bool>)
    
[/code]

## Function length​

Return the length (number of usable bits) of this bitvector
[code] 
    **public** **fun** [length](</references/framework/sui_std/bit_vector#std_bit_vector_length>)(bitvector: &[std::bit_vector::BitVector](</references/framework/sui_std/bit_vector#std_bit_vector_BitVector>)): [u64](</references/framework/sui_std/u64#std_u64>)
    
[/code]

## Function longest_set_sequence_starting_at​

Returns the length of the longest sequence of set bits starting at (and including) start_index in the bitvector. If there is no such sequence, then 0 is returned.
[code] 
    **public** **fun** [longest_set_sequence_starting_at](</references/framework/sui_std/bit_vector#std_bit_vector_longest_set_sequence_starting_at>)(bitvector: &[std::bit_vector::BitVector](</references/framework/sui_std/bit_vector#std_bit_vector_BitVector>), start_index: [u64](</references/framework/sui_std/u64#std_u64>)): [u64](</references/framework/sui_std/u64#std_u64>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_std/bit_vector.md>)

[Previousbcs](</references/framework/sui_std/bcs>)[Nextbool](</references/framework/sui_std/bool>)
