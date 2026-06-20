<!-- Source: https://docs.sui.io/references/framework/sui_sui/rangeproofs -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * rangeproofs


# Module sui::rangeproofs
[code]
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::bcs](</references/framework/sui_sui/bcs#sui_bcs>);
    **use** [sui::group_ops](</references/framework/sui_sui/group_ops#sui_group_ops>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::ristretto255](</references/framework/sui_sui/ristretto255#sui_ristretto255>);
    
[/code]

## Constants​
[code] 
    **const** [ENotSupported](</references/framework/sui_sui/rangeproofs#sui_rangeproofs_ENotSupported>): u64 = 0;
    
[/code]
[code] 
    **const** [EInvalidProof](</references/framework/sui_sui/rangeproofs#sui_rangeproofs_EInvalidProof>): u64 = 1;
    
[/code]
[code] 
    **const** [EInvalidRange](</references/framework/sui_sui/rangeproofs#sui_rangeproofs_EInvalidRange>): u64 = 2;
    
[/code]
[code] 
    **const** [EInvalidBatchSize](</references/framework/sui_sui/rangeproofs#sui_rangeproofs_EInvalidBatchSize>): u64 = 3;
    
[/code]
[code] 
    **const** [EUnsupportedVersion](</references/framework/sui_sui/rangeproofs#sui_rangeproofs_EUnsupportedVersion>): u64 = 4;
    
[/code]

## Function verify_bulletproofs_ristretto255​

Verify a range proof over the Ristretto255 curve that all committed values are in the range [0, 2^bits).  
Currently, the only supported version is 0 which corresponds to the original Bulletproofs construction (<https://eprint.iacr.org/2017/1066.pdf>).  
In the future, we may add support for newer versions of Bulletproofs, such as Bulletproofs+ or Bulletproofs++.

The format of the proof follows the specifications from <https://github.com/dalek-cryptography/bulletproofs/blob/be67b6d5f5ad1c1f54d5511b52e6d645a1313d07/src/range_proof/mod.rs#L59-L76>.

The bits parameter is the bit length of the range and must be one of 8, 16, 32, or 64.

The commitments are Pedersen commitments to the values used in the proof.  
The number of commitments must be a power of two, but if needed, the input to the prover can be padded with trivial commitments to zero.  
The number of commitments times bits can be at most 512.

Enabled only on devnet.
[code] 
    **public** **fun** [verify_bulletproofs_ristretto255](</references/framework/sui_sui/rangeproofs#sui_rangeproofs_verify_bulletproofs_ristretto255>)(proof: &vector<u8>, bits: u8, commitments: &vector<[sui::group_ops::Element](</references/framework/sui_sui/group_ops#sui_group_ops_Element>)<[sui::ristretto255::G](</references/framework/sui_sui/ristretto255#sui_ristretto255_G>)>>, version: u8): bool
    
[/code]

## Function verify_bulletproofs_ristretto255_internal​
[code] 
    **fun** [verify_bulletproofs_ristretto255_internal](</references/framework/sui_sui/rangeproofs#sui_rangeproofs_verify_bulletproofs_ristretto255_internal>)(proof: &vector<u8>, bits: u8, commitments: &vector<vector<u8>>): bool
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/rangeproofs.md>)

[Previousrandom](</references/framework/sui_sui/random>)[Nextristretto255](</references/framework/sui_sui/ristretto255>)
