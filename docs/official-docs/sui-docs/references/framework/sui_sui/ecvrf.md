<!-- Source: https://docs.sui.io/references/framework/sui_sui/ecvrf -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * ecvrf


# Module sui::ecvrf

## Constants​
[code] 
    **const** [EInvalidHashLength](</references/framework/sui_sui/ecvrf#sui_ecvrf_EInvalidHashLength>): u64 = 1;
    
[/code]
[code] 
    **const** [EInvalidPublicKeyEncoding](</references/framework/sui_sui/ecvrf#sui_ecvrf_EInvalidPublicKeyEncoding>): u64 = 2;
    
[/code]
[code] 
    **const** [EInvalidProofEncoding](</references/framework/sui_sui/ecvrf#sui_ecvrf_EInvalidProofEncoding>): u64 = 3;
    
[/code]

## Function ecvrf_verify​

@param hash: The hash/output from a ECVRF to be verified. @param alpha_string: Input/seed to the ECVRF used to generate the output. @param public_key: The public key corresponding to the private key used to generate the output. @param proof: The proof of validity of the output.  
Verify a proof for a Ristretto ECVRF. Returns true if the proof is valid and corresponds to the given output. May abort with [EInvalidHashLength](</references/framework/sui_sui/ecvrf#sui_ecvrf_EInvalidHashLength>), [EInvalidPublicKeyEncoding](</references/framework/sui_sui/ecvrf#sui_ecvrf_EInvalidPublicKeyEncoding>) or [EInvalidProofEncoding](</references/framework/sui_sui/ecvrf#sui_ecvrf_EInvalidProofEncoding>).
[code] 
    **public** **fun** [ecvrf_verify](</references/framework/sui_sui/ecvrf#sui_ecvrf_ecvrf_verify>)([hash](</references/framework/sui_sui/hash#sui_hash>): &vector<u8>, alpha_string: &vector<u8>, public_key: &vector<u8>, proof: &vector<u8>): bool
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/ecvrf.md>)

[Previousecdsa_r1](</references/framework/sui_sui/ecdsa_r1>)[Nexted25519](</references/framework/sui_sui/ed25519>)
