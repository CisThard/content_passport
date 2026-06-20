<!-- Source: https://docs.sui.io/references/framework/sui_sui/poseidon -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * poseidon


# Module sui::poseidon

Module which defines instances of the poseidon hash functions.
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::bcs](</references/framework/sui_sui/bcs#sui_bcs>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    
[/code]

## Constants​

Error if any of the inputs are larger than or equal to the BN254 field size.
[code] 
    **const** [ENonCanonicalInput](</references/framework/sui_sui/poseidon#sui_poseidon_ENonCanonicalInput>): u64 = 0;
    
[/code]

Error if an empty vector is passed as input.
[code] 
    **const** [EEmptyInput](</references/framework/sui_sui/poseidon#sui_poseidon_EEmptyInput>): u64 = 1;
    
[/code]

Error if more than MAX_INPUTS inputs are given.
[code] 
    **const** [ETooManyInputs](</references/framework/sui_sui/poseidon#sui_poseidon_ETooManyInputs>): u64 = 2;
    
[/code]

The field size for BN254 curve.
[code] 
    **const** [BN254_MAX](</references/framework/sui_sui/poseidon#sui_poseidon_BN254_MAX>): u256 = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
    
[/code]

The maximum number of inputs for the poseidon_bn254 function.
[code] 
    **const** [MAX_INPUTS](</references/framework/sui_sui/poseidon#sui_poseidon_MAX_INPUTS>): u64 = 16;
    
[/code]

## Function poseidon_bn254​

@param data: Vector of BN254 field elements to hash.

Hash the inputs using poseidon_bn254 and returns a BN254 field element.

Each element has to be a BN254 field element in canonical representation so it must be smaller than the BN254 scalar field size which is 21888242871839275222246405745257275088548364400416034343698204186575808495617.

This function supports between 1 and 16 inputs. If you need to hash more than 16 inputs, some implementations instead returns the root of a k-ary Merkle tree with the inputs as leafs, but since this is not standardized, we leave that to the caller to implement if needed.

If the input is empty, the function will abort with EEmptyInput.  
If more than 16 inputs are provided, the function will abort with ETooManyInputs.
[code] 
    **public** **fun** [poseidon_bn254](</references/framework/sui_sui/poseidon#sui_poseidon_poseidon_bn254>)(data: &vector<u256>): u256
    
[/code]

## Function poseidon_bn254_internal​

@param data: Vector of BN254 field elements in little-endian representation.

Hash the inputs using poseidon_bn254 and returns a BN254 field element in little-endian representation.
[code] 
    **fun** [poseidon_bn254_internal](</references/framework/sui_sui/poseidon#sui_poseidon_poseidon_bn254_internal>)(data: &vector<vector<u8>>): vector<u8>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/poseidon.md>)

[Previouspay](</references/framework/sui_sui/pay>)[Nextpriority_queue](</references/framework/sui_sui/priority_queue>)
