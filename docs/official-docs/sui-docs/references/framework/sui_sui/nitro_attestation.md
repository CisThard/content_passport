<!-- Source: https://docs.sui.io/references/framework/sui_sui/nitro_attestation -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * nitro_attestation


# Module sui::nitro_attestation
[code]
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::clock](</references/framework/sui_sui/clock#sui_clock>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct PCREntry​

Represents a PCR entry with an index and value.
[code] 
    **public** **struct** [PCREntry](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_PCREntry>) **has** drop
    
[/code]

Click to openFields

[index](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_index>): u8
    
[value](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_value>): vector<u8>
    

## Struct NitroAttestationDocument​

Nitro Attestation Document defined for AWS.
[code] 
    **public** **struct** [NitroAttestationDocument](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument>) **has** drop
    
[/code]

Click to openFields

[module_id](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_module_id>): vector<u8>
     Issuing Nitro hypervisor module ID. 
[timestamp](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_timestamp>): u64
     UTC time when document was created, in milliseconds since UNIX epoch. 
[digest](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_digest>): vector<u8>
     The digest function used for calculating the register values. 
[pcrs](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_pcrs>): vector<[sui::nitro_attestation::PCREntry](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_PCREntry>)>
     A list of PCREntry containing the index and the PCR bytes. . 
[public_key](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_public_key>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
     An optional DER-encoded key the attestation, consumer can use to encrypt data with. 
[user_data](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_user_data>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
     Additional signed user data, defined by protocol. 
[nonce](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_nonce>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
     An optional cryptographic nonce provided by the attestation consumer as a proof of authenticity. 

## Constants​

Error that the feature is not available on this network.
[code] 
    **const** [ENotSupportedError](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_ENotSupportedError>): u64 = 0;
    
[/code]

Error that the attestation input failed to be parsed.
[code] 
    **const** [EParseError](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_EParseError>): u64 = 1;
    
[/code]

Error that the attestation failed to be verified.
[code] 
    **const** [EVerifyError](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_EVerifyError>): u64 = 2;
    
[/code]

Error that the PCRs are invalid.
[code] 
    **const** [EInvalidPCRsError](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_EInvalidPCRsError>): u64 = 3;
    
[/code]

## Function load_nitro_attestation​

@param attestation: attesttaion documents bytes data. @param clock: the clock object.

Returns the parsed NitroAttestationDocument after verifying the attestation, may abort with errors described above.
[code] 
    **entry** **fun** [load_nitro_attestation](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_load_nitro_attestation>)(attestation: vector<u8>, [clock](</references/framework/sui_sui/clock#sui_clock>): &[sui::clock::Clock](</references/framework/sui_sui/clock#sui_clock_Clock>)): [sui::nitro_attestation::NitroAttestationDocument](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument>)
    
[/code]

## Function module_id​
[code] 
    **public** **fun** [module_id](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_module_id>)(attestation: &[sui::nitro_attestation::NitroAttestationDocument](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument>)): &vector<u8>
    
[/code]

## Function timestamp​
[code] 
    **public** **fun** [timestamp](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_timestamp>)(attestation: &[sui::nitro_attestation::NitroAttestationDocument](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument>)): &u64
    
[/code]

## Function digest​
[code] 
    **public** **fun** [digest](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_digest>)(attestation: &[sui::nitro_attestation::NitroAttestationDocument](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument>)): &vector<u8>
    
[/code]

## Function pcrs​

Returns a list of mapping PCREntry containg the index and the PCR bytes.  
AWS supports PCR0-31. Required PCRs (index 0-4 & 8) are always included regardless of their value. Additional custom PCRs (index 5-7, 9-31) are also included if they are nonzeros.
[code] 
    **public** **fun** [pcrs](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_pcrs>)(attestation: &[sui::nitro_attestation::NitroAttestationDocument](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument>)): &vector<[sui::nitro_attestation::PCREntry](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_PCREntry>)>
    
[/code]

## Function public_key​
[code] 
    **public** **fun** [public_key](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_public_key>)(attestation: &[sui::nitro_attestation::NitroAttestationDocument](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument>)): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
    
[/code]

## Function user_data​
[code] 
    **public** **fun** [user_data](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_user_data>)(attestation: &[sui::nitro_attestation::NitroAttestationDocument](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument>)): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
    
[/code]

## Function nonce​
[code] 
    **public** **fun** [nonce](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_nonce>)(attestation: &[sui::nitro_attestation::NitroAttestationDocument](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument>)): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
    
[/code]

## Function index​
[code] 
    **public** **fun** [index](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_index>)(**entry** : &[sui::nitro_attestation::PCREntry](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_PCREntry>)): u8
    
[/code]

## Function value​
[code] 
    **public** **fun** [value](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_value>)(**entry** : &[sui::nitro_attestation::PCREntry](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_PCREntry>)): &vector<u8>
    
[/code]

## Function load_nitro_attestation_internal​

Internal native function
[code] 
    **fun** [load_nitro_attestation_internal](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_load_nitro_attestation_internal>)(attestation: &vector<u8>, current_timestamp: u64): [sui::nitro_attestation::NitroAttestationDocument](</references/framework/sui_sui/nitro_attestation#sui_nitro_attestation_NitroAttestationDocument>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/nitro_attestation.md>)

[Previousmath](</references/framework/sui_sui/math>)[Nextobject](</references/framework/sui_sui/object>)
