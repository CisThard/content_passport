<!-- Source: https://docs.sui.io/references/framework/sui_sui/zklogin_verified_id -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * zklogin_verified_id


# Module sui::zklogin_verified_id
[code]
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    
[/code]

## Struct VerifiedID​

Possession of a VerifiedID proves that the user's address was created using zklogin and the given parameters.
[code] 
    **public** **struct** [VerifiedID](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
     The ID of this VerifiedID 
[owner](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_owner>): **address**
     The address this VerifiedID is associated with 
[key_claim_name](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_key_claim_name>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     The name of the key claim 
[key_claim_value](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_key_claim_value>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     The value of the key claim 
[issuer](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_issuer>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     The issuer 
[audience](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_audience>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     The audience (wallet) 

## Constants​
[code] 
    **const** [EFunctionDisabled](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_EFunctionDisabled>): u64 = 0;
    
[/code]

## Function owner​

Returns the address associated with the given VerifiedID
[code] 
    **public** **fun** [owner](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_owner>)(verified_id: &[sui::zklogin_verified_id::VerifiedID](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID>)): **address**
    
[/code]

## Function key_claim_name​

Returns the name of the key claim associated with the given VerifiedID
[code] 
    **public** **fun** [key_claim_name](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_key_claim_name>)(verified_id: &[sui::zklogin_verified_id::VerifiedID](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID>)): &[std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function key_claim_value​

Returns the value of the key claim associated with the given VerifiedID
[code] 
    **public** **fun** [key_claim_value](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_key_claim_value>)(verified_id: &[sui::zklogin_verified_id::VerifiedID](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID>)): &[std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function issuer​

Returns the issuer associated with the given VerifiedID
[code] 
    **public** **fun** [issuer](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_issuer>)(verified_id: &[sui::zklogin_verified_id::VerifiedID](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID>)): &[std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function audience​

Returns the audience (wallet) associated with the given VerifiedID
[code] 
    **public** **fun** [audience](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_audience>)(verified_id: &[sui::zklogin_verified_id::VerifiedID](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID>)): &[std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function delete​

Delete a VerifiedID
[code] 
    **public** **fun** [delete](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_delete>)(verified_id: [sui::zklogin_verified_id::VerifiedID](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_VerifiedID>))
    
[/code]

## Function verify_zklogin_id​

This function has been disabled.
[code] 
    **public** **fun** [verify_zklogin_id](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_verify_zklogin_id>)(_key_claim_name: [std::string::String](</references/framework/sui_std/string#std_string_String>), _key_claim_value: [std::string::String](</references/framework/sui_std/string#std_string_String>), _issuer: [std::string::String](</references/framework/sui_std/string#std_string_String>), _audience: [std::string::String](</references/framework/sui_std/string#std_string_String>), _pin_hash: u256, _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function check_zklogin_id​

This function has been disabled.
[code] 
    **public** **fun** [check_zklogin_id](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_check_zklogin_id>)(_address: **address** , _key_claim_name: &[std::string::String](</references/framework/sui_std/string#std_string_String>), _key_claim_value: &[std::string::String](</references/framework/sui_std/string#std_string_String>), _issuer: &[std::string::String](</references/framework/sui_std/string#std_string_String>), _audience: &[std::string::String](</references/framework/sui_std/string#std_string_String>), _pin_hash: u256): bool
    
[/code]

## Function check_zklogin_id_internal​

Returns true if **address** was created using zklogin and the given parameters.

Aborts with EInvalidInput if any of kc_name, kc_value, iss and aud is not a properly encoded UTF-8 string or if the inputs are longer than the allowed upper bounds: kc_name must be at most 32 characters, kc_value must be at most 115 characters and aud must be at most 145 characters.
[code] 
    **fun** [check_zklogin_id_internal](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_check_zklogin_id_internal>)(**address** : **address** , [key_claim_name](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_key_claim_name>): &vector<u8>, [key_claim_value](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_key_claim_value>): &vector<u8>, [issuer](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_issuer>): &vector<u8>, [audience](</references/framework/sui_sui/zklogin_verified_id#sui_zklogin_verified_id_audience>): &vector<u8>, pin_hash: u256): bool
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/zklogin_verified_id.md>)

[Previousversioned](</references/framework/sui_sui/versioned>)[Nextzklogin_verified_issuer](</references/framework/sui_sui/zklogin_verified_issuer>)
