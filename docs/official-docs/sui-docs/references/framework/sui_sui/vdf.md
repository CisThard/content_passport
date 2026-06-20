<!-- Source: https://docs.sui.io/references/framework/sui_sui/vdf -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * vdf


# Module sui::vdf

## Constants​
[code] 
    **const** [EInvalidInput](</references/framework/sui_sui/vdf#sui_vdf_EInvalidInput>): u64 = 0;
    
[/code]

## Function hash_to_input​

Hash an arbitrary binary message to a class group element to be used as input for [vdf_verify](</references/framework/sui_sui/vdf#sui_vdf_vdf_verify>).

This function is currently only enabled on Devnet.
[code] 
    **public** **fun** [hash_to_input](</references/framework/sui_sui/vdf#sui_vdf_hash_to_input>)(message: &vector<u8>): vector<u8>
    
[/code]

## Function hash_to_input_internal​

The internal functions for [hash_to_input](</references/framework/sui_sui/vdf#sui_vdf_hash_to_input>).
[code] 
    **fun** [hash_to_input_internal](</references/framework/sui_sui/vdf#sui_vdf_hash_to_input_internal>)(message: &vector<u8>): vector<u8>
    
[/code]

## Function vdf_verify​

Verify the output and proof of a VDF with the given number of iterations. The input, output and proof are all class group elements represented by triples (a,b,c) such that b^2 - 4ac = discriminant. The are expected to be encoded as a BCS encoding of a triple of byte arrays, each being the big-endian twos-complement encoding of a, b and c in that order.

This uses Wesolowski's VDF construction over imaginary class groups as described in Wesolowski (2020), 'Efficient Verifiable Delay Functions.', J. Cryptol. 33, and is compatible with the VDF implementation in fastcrypto.

The discriminant for the class group is pre-computed and fixed. See how this was generated in the fastcrypto-vdf crate. The final selection of the discriminant for Mainnet will be computed and announced under a nothing-up-my-sleeve process.

This function is currently only enabled on Devnet.
[code] 
    **public** **fun** [vdf_verify](</references/framework/sui_sui/vdf#sui_vdf_vdf_verify>)(input: &vector<u8>, output: &vector<u8>, proof: &vector<u8>, iterations: u64): bool
    
[/code]

## Function vdf_verify_internal​

The internal functions for [vdf_verify_internal](</references/framework/sui_sui/vdf#sui_vdf_vdf_verify_internal>).
[code] 
    **fun** [vdf_verify_internal](</references/framework/sui_sui/vdf#sui_vdf_vdf_verify_internal>)(input: &vector<u8>, output: &vector<u8>, proof: &vector<u8>, iterations: u64): bool
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/vdf.md>)

[Previousurl](</references/framework/sui_sui/url>)[Nextvec_map](</references/framework/sui_sui/vec_map>)
