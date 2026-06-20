<!-- Source: https://docs.sui.io/references/framework/sui_sui/zklogin_verified_issuer -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * zklogin_verified_issuer


# Module sui::zklogin_verified_issuer
[code]
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct VerifiedIssuer​

Possession of a VerifiedIssuer proves that the user's address was created using zklogin and with the given issuer (identity provider).
[code] 
    **public** **struct** [VerifiedIssuer](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_VerifiedIssuer>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
     The ID of this VerifiedIssuer 
[owner](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_owner>): **address**
     The address this VerifiedID is associated with 
[issuer](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_issuer>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     The issuer 

## Constants​

Error if the proof consisting of the inputs provided to the verification function is invalid.
[code] 
    **const** [EInvalidInput](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_EInvalidInput>): u64 = 0;
    
[/code]

Error if the proof consisting of the inputs provided to the verification function is invalid.
[code] 
    **const** [EInvalidProof](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_EInvalidProof>): u64 = 1;
    
[/code]

## Function owner​

Returns the address associated with the given VerifiedIssuer
[code] 
    **public** **fun** [owner](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_owner>)(verified_issuer: &[sui::zklogin_verified_issuer::VerifiedIssuer](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_VerifiedIssuer>)): **address**
    
[/code]

## Function issuer​

Returns the issuer associated with the given VerifiedIssuer
[code] 
    **public** **fun** [issuer](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_issuer>)(verified_issuer: &[sui::zklogin_verified_issuer::VerifiedIssuer](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_VerifiedIssuer>)): &[std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function delete​

Delete a VerifiedIssuer
[code] 
    **public** **fun** [delete](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_delete>)(verified_issuer: [sui::zklogin_verified_issuer::VerifiedIssuer](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_VerifiedIssuer>))
    
[/code]

## Function verify_zklogin_issuer​

Verify that the caller's address was created using zklogin with the given issuer. If so, a VerifiedIssuer object with the issuers id transferred to the caller.

Aborts with [EInvalidProof](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_EInvalidProof>) if the verification fails.
[code] 
    **public** **fun** [verify_zklogin_issuer](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_verify_zklogin_issuer>)(address_seed: u256, [issuer](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_issuer>): [std::string::String](</references/framework/sui_std/string#std_string_String>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function check_zklogin_issuer​

Returns true if **address** was created using zklogin with the given issuer and address seed.
[code] 
    **public** **fun** [check_zklogin_issuer](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_check_zklogin_issuer>)(**address** : **address** , address_seed: u256, [issuer](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_issuer>): &[std::string::String](</references/framework/sui_std/string#std_string_String>)): bool
    
[/code]

## Function check_zklogin_issuer_internal​

Returns true if **address** was created using zklogin with the given issuer and address seed.

Aborts with [EInvalidInput](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_EInvalidInput>) if the iss input is not a valid UTF-8 string.
[code] 
    **fun** [check_zklogin_issuer_internal](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_check_zklogin_issuer_internal>)(**address** : **address** , address_seed: u256, [issuer](</references/framework/sui_sui/zklogin_verified_issuer#sui_zklogin_verified_issuer_issuer>): &vector<u8>): bool
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/zklogin_verified_issuer.md>)

[Previouszklogin_verified_id](</references/framework/sui_sui/zklogin_verified_id>)[Nextsui:sui system](</references/framework/sui_sui_system>)
