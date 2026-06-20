<!-- Source: https://docs.sui.io/references/framework/sui_sui/random -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * random


# Module sui::random

This module provides functionality for generating secure randomness.
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::hmac](</references/framework/sui_sui/hmac#sui_hmac>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::versioned](</references/framework/sui_sui/versioned#sui_versioned>);
    
[/code]

## Struct Random​

Singleton shared object which stores the global randomness state.  
The actual state is stored in a versioned inner field.
[code] 
    **public** **struct** [Random](</references/framework/sui_sui/random#sui_random_Random>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
inner: [sui::versioned::Versioned](</references/framework/sui_sui/versioned#sui_versioned_Versioned>)
    

## Struct RandomInner​
[code] 
    **public** **struct** [RandomInner](</references/framework/sui_sui/random#sui_random_RandomInner>) **has** store
    
[/code]

Click to openFields

version: u64
    
epoch: u64
    
randomness_round: u64
    
random_bytes: vector<u8>
    

## Struct RandomGenerator​

Unique randomness generator, derived from the global randomness.
[code] 
    **public** **struct** [RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>) **has** drop
    
[/code]

Click to openFields

seed: vector<u8>
    
counter: u16
    
buffer: vector<u8>
    

## Constants​
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_sui/random#sui_random_ENotSystemAddress>): u64 = 0;
    
[/code]
[code] 
    **const** [EWrongInnerVersion](</references/framework/sui_sui/random#sui_random_EWrongInnerVersion>): u64 = 1;
    
[/code]
[code] 
    **const** [EInvalidRandomnessUpdate](</references/framework/sui_sui/random#sui_random_EInvalidRandomnessUpdate>): u64 = 2;
    
[/code]
[code] 
    **const** [EInvalidRange](</references/framework/sui_sui/random#sui_random_EInvalidRange>): u64 = 3;
    
[/code]
[code] 
    **const** [EInvalidLength](</references/framework/sui_sui/random#sui_random_EInvalidLength>): u64 = 4;
    
[/code]
[code] 
    **const** [CURRENT_VERSION](</references/framework/sui_sui/random#sui_random_CURRENT_VERSION>): u64 = 1;
    
[/code]
[code] 
    **const** [RAND_OUTPUT_LEN](</references/framework/sui_sui/random#sui_random_RAND_OUTPUT_LEN>): u16 = 32;
    
[/code]
[code] 
    **const** [U16_MAX](</references/framework/sui_sui/random#sui_random_U16_MAX>): u64 = 65535;
    
[/code]

## Function create​

Create and share the Random object. This function is called exactly once, when the Random object is first created.  
Can only be called by genesis or change_epoch transactions.
[code] 
    **fun** [create](</references/framework/sui_sui/random#sui_random_create>)(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function load_inner_mut​
[code] 
    **fun** [load_inner_mut](</references/framework/sui_sui/random#sui_random_load_inner_mut>)(self: &**mut** [sui::random::Random](</references/framework/sui_sui/random#sui_random_Random>)): &**mut** [sui::random::RandomInner](</references/framework/sui_sui/random#sui_random_RandomInner>)
    
[/code]

## Function load_inner​
[code] 
    **fun** [load_inner](</references/framework/sui_sui/random#sui_random_load_inner>)(self: &[sui::random::Random](</references/framework/sui_sui/random#sui_random_Random>)): &[sui::random::RandomInner](</references/framework/sui_sui/random#sui_random_RandomInner>)
    
[/code]

## Function update_randomness_state​

Record new randomness. Called when executing the RandomnessStateUpdate system transaction.
[code] 
    **fun** [update_randomness_state](</references/framework/sui_sui/random#sui_random_update_randomness_state>)(self: &**mut** [sui::random::Random](</references/framework/sui_sui/random#sui_random_Random>), new_round: u64, new_bytes: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function new_generator​

Create a generator. Can be used to derive up to MAX_U16 * 32 random bytes.

Using randomness can be error-prone if you don't observe the subtleties in its correct use, for example, randomness dependent code might be exploitable to attacks that carefully set the gas budget in a way that breaks security. For more information, see: <https://docs.sui.io/guides/developer/advanced/randomness-onchain>
[code] 
    **public** **fun** [new_generator](</references/framework/sui_sui/random#sui_random_new_generator>)(r: &[sui::random::Random](</references/framework/sui_sui/random#sui_random_Random>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>)
    
[/code]

## Function derive_next_block​

Get the next block of 32 random bytes.
[code] 
    **fun** [derive_next_block](</references/framework/sui_sui/random#sui_random_derive_next_block>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>)): vector<u8>
    
[/code]

## Function generate_bytes​

Generate n random bytes.
[code] 
    **public** **fun** [generate_bytes](</references/framework/sui_sui/random#sui_random_generate_bytes>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>), num_of_bytes: u16): vector<u8>
    
[/code]

## Macro function uint_from_bytes​
[code] 
    **macro** **fun** [uint_from_bytes](</references/framework/sui_sui/random#sui_random_uint_from_bytes>)<$T: drop>($g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>), $num_of_bytes: u8): $T
    
[/code]

## Function generate_u256​

Generate a u256.
[code] 
    **public** **fun** [generate_u256](</references/framework/sui_sui/random#sui_random_generate_u256>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>)): u256
    
[/code]

## Function generate_u128​

Generate a u128.
[code] 
    **public** **fun** [generate_u128](</references/framework/sui_sui/random#sui_random_generate_u128>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>)): u128
    
[/code]

## Function generate_u64​

Generate a u64.
[code] 
    **public** **fun** [generate_u64](</references/framework/sui_sui/random#sui_random_generate_u64>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>)): u64
    
[/code]

## Function generate_u32​

Generate a u32.
[code] 
    **public** **fun** [generate_u32](</references/framework/sui_sui/random#sui_random_generate_u32>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>)): u32
    
[/code]

## Function generate_u16​

Generate a u16.
[code] 
    **public** **fun** [generate_u16](</references/framework/sui_sui/random#sui_random_generate_u16>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>)): u16
    
[/code]

## Function generate_u8​

Generate a u8.
[code] 
    **public** **fun** [generate_u8](</references/framework/sui_sui/random#sui_random_generate_u8>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>)): u8
    
[/code]

## Function generate_bool​

Generate a boolean.
[code] 
    **public** **fun** [generate_bool](</references/framework/sui_sui/random#sui_random_generate_bool>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>)): bool
    
[/code]

## Macro function uint_in_range​

Helper macro to generate a random uint in [min, max] using a random number with num_of_bytes bytes.  
Assumes that the caller verified the inputs, and uses num_of_bytes to control the bias (e.g., 8 bytes larger than the actual type used by the caller function to limit the bias by 2^{-64}).
[code] 
    **macro** **fun** [uint_in_range](</references/framework/sui_sui/random#sui_random_uint_in_range>)<$T: drop>($g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>), $min: $T, $max: $T, $num_of_bytes: u8): $T
    
[/code]

## Function generate_u128_in_range​

Generate a random u128 in [min, max] (with a bias of 2^{-64}).
[code] 
    **public** **fun** [generate_u128_in_range](</references/framework/sui_sui/random#sui_random_generate_u128_in_range>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>), min: u128, max: u128): u128
    
[/code]

## Function generate_u64_in_range​
[code] 
    **public** **fun** [generate_u64_in_range](</references/framework/sui_sui/random#sui_random_generate_u64_in_range>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>), min: u64, max: u64): u64
    
[/code]

## Function generate_u32_in_range​

Generate a random u32 in [min, max] (with a bias of 2^{-64}).
[code] 
    **public** **fun** [generate_u32_in_range](</references/framework/sui_sui/random#sui_random_generate_u32_in_range>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>), min: u32, max: u32): u32
    
[/code]

## Function generate_u16_in_range​

Generate a random u16 in [min, max] (with a bias of 2^{-64}).
[code] 
    **public** **fun** [generate_u16_in_range](</references/framework/sui_sui/random#sui_random_generate_u16_in_range>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>), min: u16, max: u16): u16
    
[/code]

## Function generate_u8_in_range​

Generate a random u8 in [min, max] (with a bias of 2^{-64}).
[code] 
    **public** **fun** [generate_u8_in_range](</references/framework/sui_sui/random#sui_random_generate_u8_in_range>)(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>), min: u8, max: u8): u8
    
[/code]

## Function shuffle​

Shuffle a vector using the random generator (Fisher–Yates/Knuth shuffle).
[code] 
    **public** **fun** [shuffle](</references/framework/sui_sui/random#sui_random_shuffle>)<T>(g: &**mut** [sui::random::RandomGenerator](</references/framework/sui_sui/random#sui_random_RandomGenerator>), v: &**mut** vector<T>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/random.md>)

[Previousprover](</references/framework/sui_sui/prover>)[Nextrangeproofs](</references/framework/sui_sui/rangeproofs>)
