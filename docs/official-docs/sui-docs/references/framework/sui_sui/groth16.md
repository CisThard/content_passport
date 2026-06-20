<!-- Source: https://docs.sui.io/references/framework/sui_sui/groth16 -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * groth16


# Module sui::groth16

## Struct Curve​

Represents an elliptic curve construction to be used in the verifier. Currently we support BLS12-381 and BN254.  
This should be given as the first parameter to [prepare_verifying_key](</references/framework/sui_sui/groth16#sui_groth16_prepare_verifying_key>) or [verify_groth16_proof](</references/framework/sui_sui/groth16#sui_groth16_verify_groth16_proof>).
[code] 
    **public** **struct** [Curve](</references/framework/sui_sui/groth16#sui_groth16_Curve>) **has** **copy** , drop, store
    
[/code]

Click to openFields

id: u8
    

## Struct PreparedVerifyingKey​

A [PreparedVerifyingKey](</references/framework/sui_sui/groth16#sui_groth16_PreparedVerifyingKey>) consisting of four components in serialized form.
[code] 
    **public** **struct** [PreparedVerifyingKey](</references/framework/sui_sui/groth16#sui_groth16_PreparedVerifyingKey>) **has** **copy** , drop, store
    
[/code]

Click to openFields

vk_gamma_abc_g1_bytes: vector<u8>
    
alpha_g1_beta_g2_bytes: vector<u8>
    
gamma_g2_neg_pc_bytes: vector<u8>
    
delta_g2_neg_pc_bytes: vector<u8>
    

## Struct PublicProofInputs​

A [PublicProofInputs](</references/framework/sui_sui/groth16#sui_groth16_PublicProofInputs>) wrapper around its serialized bytes.
[code] 
    **public** **struct** [PublicProofInputs](</references/framework/sui_sui/groth16#sui_groth16_PublicProofInputs>) **has** **copy** , drop, store
    
[/code]

Click to openFields

bytes: vector<u8>
    

## Struct ProofPoints​

A [ProofPoints](</references/framework/sui_sui/groth16#sui_groth16_ProofPoints>) wrapper around the serialized form of three proof points.
[code] 
    **public** **struct** [ProofPoints](</references/framework/sui_sui/groth16#sui_groth16_ProofPoints>) **has** **copy** , drop, store
    
[/code]

Click to openFields

bytes: vector<u8>
    

## Constants​
[code] 
    **const** [EInvalidVerifyingKey](</references/framework/sui_sui/groth16#sui_groth16_EInvalidVerifyingKey>): u64 = 0;
    
[/code]
[code] 
    **const** [EInvalidCurve](</references/framework/sui_sui/groth16#sui_groth16_EInvalidCurve>): u64 = 1;
    
[/code]
[code] 
    **const** [ETooManyPublicInputs](</references/framework/sui_sui/groth16#sui_groth16_ETooManyPublicInputs>): u64 = 2;
    
[/code]
[code] 
    **const** [EInvalidScalar](</references/framework/sui_sui/groth16#sui_groth16_EInvalidScalar>): u64 = 3;
    
[/code]
[code] 
    **const** [MaxPublicInputs](</references/framework/sui_sui/groth16#sui_groth16_MaxPublicInputs>): u64 = 8;
    
[/code]

## Function bls12381​

Return the [Curve](</references/framework/sui_sui/groth16#sui_groth16_Curve>) value indicating that the BLS12-381 construction should be used in a given function.
[code] 
    **public** **fun** [bls12381](</references/framework/sui_sui/bls12381#sui_bls12381>)(): [sui::groth16::Curve](</references/framework/sui_sui/groth16#sui_groth16_Curve>)
    
[/code]

## Function bn254​

Return the [Curve](</references/framework/sui_sui/groth16#sui_groth16_Curve>) value indicating that the BN254 construction should be used in a given function.
[code] 
    **public** **fun** [bn254](</references/framework/sui_sui/groth16#sui_groth16_bn254>)(): [sui::groth16::Curve](</references/framework/sui_sui/groth16#sui_groth16_Curve>)
    
[/code]

## Function pvk_from_bytes​

Creates a [PreparedVerifyingKey](</references/framework/sui_sui/groth16#sui_groth16_PreparedVerifyingKey>) from bytes.
[code] 
    **public** **fun** [pvk_from_bytes](</references/framework/sui_sui/groth16#sui_groth16_pvk_from_bytes>)(vk_gamma_abc_g1_bytes: vector<u8>, alpha_g1_beta_g2_bytes: vector<u8>, gamma_g2_neg_pc_bytes: vector<u8>, delta_g2_neg_pc_bytes: vector<u8>): [sui::groth16::PreparedVerifyingKey](</references/framework/sui_sui/groth16#sui_groth16_PreparedVerifyingKey>)
    
[/code]

## Function pvk_to_bytes​

Returns bytes of the four components of the [PreparedVerifyingKey](</references/framework/sui_sui/groth16#sui_groth16_PreparedVerifyingKey>).
[code] 
    **public** **fun** [pvk_to_bytes](</references/framework/sui_sui/groth16#sui_groth16_pvk_to_bytes>)(pvk: [sui::groth16::PreparedVerifyingKey](</references/framework/sui_sui/groth16#sui_groth16_PreparedVerifyingKey>)): vector<vector<u8>>
    
[/code]

## Function public_proof_inputs_from_bytes​

Creates a [PublicProofInputs](</references/framework/sui_sui/groth16#sui_groth16_PublicProofInputs>) wrapper from bytes. The bytes parameter should be a concatenation of a number of 32 bytes scalar field elements to be used as public inputs in little-endian format to a circuit.
[code] 
    **public** **fun** [public_proof_inputs_from_bytes](</references/framework/sui_sui/groth16#sui_groth16_public_proof_inputs_from_bytes>)(bytes: vector<u8>): [sui::groth16::PublicProofInputs](</references/framework/sui_sui/groth16#sui_groth16_PublicProofInputs>)
    
[/code]

## Function proof_points_from_bytes​

Creates a Groth16 [ProofPoints](</references/framework/sui_sui/groth16#sui_groth16_ProofPoints>) from bytes.
[code] 
    **public** **fun** [proof_points_from_bytes](</references/framework/sui_sui/groth16#sui_groth16_proof_points_from_bytes>)(bytes: vector<u8>): [sui::groth16::ProofPoints](</references/framework/sui_sui/groth16#sui_groth16_ProofPoints>)
    
[/code]

## Function prepare_verifying_key​

@param curve: What elliptic curve construction to use. See [bls12381](</references/framework/sui_sui/bls12381#sui_bls12381>) and [bn254](</references/framework/sui_sui/groth16#sui_groth16_bn254>). @param verifying_key: An Arkworks canonical compressed serialization of a verifying key.

Returns four vectors of bytes representing the four components of a prepared verifying key.  
This step computes one pairing e(P, Q), and binds the verification to one particular proof statement.  
This can be used as inputs for the [verify_groth16_proof](</references/framework/sui_sui/groth16#sui_groth16_verify_groth16_proof>) function.
[code] 
    **public** **fun** [prepare_verifying_key](</references/framework/sui_sui/groth16#sui_groth16_prepare_verifying_key>)(curve: &[sui::groth16::Curve](</references/framework/sui_sui/groth16#sui_groth16_Curve>), verifying_key: &vector<u8>): [sui::groth16::PreparedVerifyingKey](</references/framework/sui_sui/groth16#sui_groth16_PreparedVerifyingKey>)
    
[/code]

## Function prepare_verifying_key_internal​

Native functions that flattens the inputs into an array and passes to the Rust native function. May abort with [EInvalidVerifyingKey](</references/framework/sui_sui/groth16#sui_groth16_EInvalidVerifyingKey>) or [EInvalidCurve](</references/framework/sui_sui/groth16#sui_groth16_EInvalidCurve>).
[code] 
    **fun** [prepare_verifying_key_internal](</references/framework/sui_sui/groth16#sui_groth16_prepare_verifying_key_internal>)(curve: u8, verifying_key: &vector<u8>): [sui::groth16::PreparedVerifyingKey](</references/framework/sui_sui/groth16#sui_groth16_PreparedVerifyingKey>)
    
[/code]

## Function verify_groth16_proof​

@param curve: What elliptic curve construction to use. See the [bls12381](</references/framework/sui_sui/bls12381#sui_bls12381>) and [bn254](</references/framework/sui_sui/groth16#sui_groth16_bn254>) functions. @param prepared_verifying_key: Consists of four vectors of bytes representing the four components of a prepared verifying key. @param public_proof_inputs: Represent inputs that are public. @param proof_points: Represent three proof points.

Returns a boolean indicating whether the proof is valid.
[code] 
    **public** **fun** [verify_groth16_proof](</references/framework/sui_sui/groth16#sui_groth16_verify_groth16_proof>)(curve: &[sui::groth16::Curve](</references/framework/sui_sui/groth16#sui_groth16_Curve>), prepared_verifying_key: &[sui::groth16::PreparedVerifyingKey](</references/framework/sui_sui/groth16#sui_groth16_PreparedVerifyingKey>), public_proof_inputs: &[sui::groth16::PublicProofInputs](</references/framework/sui_sui/groth16#sui_groth16_PublicProofInputs>), proof_points: &[sui::groth16::ProofPoints](</references/framework/sui_sui/groth16#sui_groth16_ProofPoints>)): bool
    
[/code]

## Function verify_groth16_proof_internal​

Native functions that flattens the inputs into arrays of vectors and passed to the Rust native function. May abort with [EInvalidCurve](</references/framework/sui_sui/groth16#sui_groth16_EInvalidCurve>) or [ETooManyPublicInputs](</references/framework/sui_sui/groth16#sui_groth16_ETooManyPublicInputs>).
[code] 
    **fun** [verify_groth16_proof_internal](</references/framework/sui_sui/groth16#sui_groth16_verify_groth16_proof_internal>)(curve: u8, vk_gamma_abc_g1_bytes: &vector<u8>, alpha_g1_beta_g2_bytes: &vector<u8>, gamma_g2_neg_pc_bytes: &vector<u8>, delta_g2_neg_pc_bytes: &vector<u8>, public_proof_inputs: &vector<u8>, proof_points: &vector<u8>): bool
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/groth16.md>)

[Previousfunds_accumulator](</references/framework/sui_sui/funds_accumulator>)[Nextgroup_ops](</references/framework/sui_sui/group_ops>)
