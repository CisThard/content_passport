<!-- Source: https://docs.sui.io/references/framework/sui_sui/hash -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * hash


# Module sui::hash

Module which defines hash functions. Note that Sha-256 and Sha3-256 is available in the std::hash module in the standard library.

## Function blake2b256​

@param data: Arbitrary binary data to hash.  
Hash the input bytes using Blake2b-256 and returns 32 bytes.
[code] 
    **public** **fun** [blake2b256](</references/framework/sui_sui/hash#sui_hash_blake2b256>)(data: &vector<u8>): vector<u8>
    
[/code]

## Function keccak256​

@param data: Arbitrary binary data to hash.  
Hash the input bytes using keccak256 and returns 32 bytes.
[code] 
    **public** **fun** [keccak256](</references/framework/sui_sui/hash#sui_hash_keccak256>)(data: &vector<u8>): vector<u8>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/hash.md>)

[Previousgroup_ops](</references/framework/sui_sui/group_ops>)[Nexthex](</references/framework/sui_sui/hex>)
