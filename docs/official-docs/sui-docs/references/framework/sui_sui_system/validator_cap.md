<!-- Source: https://docs.sui.io/references/framework/sui_sui_system/validator_cap -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [system](</references/framework/sui_sui_system>)
  * validator_cap


# Module sui_system::validator_cap
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

## Struct UnverifiedValidatorOperationCap​

The capability object is created when creating a new Validator or when the validator explicitly creates a new capability object for rotation/revocation.  
The holder address of this object can perform some validator operations on behalf of the authorizer validator. Thus, if a validator wants to separate the keys for operation (such as reference gas price setting or tallying rule reporting) from fund/staking, it could transfer this capability object to another address.  
To facilitate rotating/revocation, Validator stores the ID of currently valid [UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>). Thus, before converting [UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>) to [ValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap>), verification needs to be done to make sure the cap object is still valid.
[code] 
    **public** **struct** [UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
authorizer_validator_address: **address**
    

## Struct ValidatorOperationCap​

Privileged operations require [ValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap>) for permission check.  
This is only constructed after successful verification.
[code] 
    **public** **struct** [ValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap>) **has** drop
    
[/code]

Click to openFields

authorizer_validator_address: **address**
    

## Function unverified_operation_cap_address​
[code] 
    **public**(package) **fun** [unverified_operation_cap_address](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_unverified_operation_cap_address>)(cap: &[sui_system::validator_cap::UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>)): &**address**
    
[/code]

## Function verified_operation_cap_address​
[code] 
    **public**(package) **fun** [verified_operation_cap_address](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_verified_operation_cap_address>)(cap: &[sui_system::validator_cap::ValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap>)): **address**
    
[/code]

## Function new_unverified_validator_operation_cap_and_transfer​

Should be only called by the friend modules when adding a Validator or rotating an existing validaotr's operation_cap_id.
[code] 
    **public**(package) **fun** [new_unverified_validator_operation_cap_and_transfer](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_new_unverified_validator_operation_cap_and_transfer>)(validator_address: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function into_verified​

Convert an [UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>) to [ValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap>).  
Should only be called by [validator_set](</references/framework/sui_sui_system/validator_set#sui_system_validator_set>) module AFTER verification.
[code] 
    **public**(package) **fun** [into_verified](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_into_verified>)(cap: &[sui_system::validator_cap::UnverifiedValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap>)): [sui_system::validator_cap::ValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui_system/validator_cap.md>)

[Previousvalidator](</references/framework/sui_sui_system/validator>)[Nextvalidator_set](</references/framework/sui_sui_system/validator_set>)
