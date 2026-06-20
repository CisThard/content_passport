<!-- Source: https://docs.sui.io/references/framework/sui_sui/funds_accumulator -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * funds_accumulator


# Module sui::funds_accumulator

A module for accumulating funds, i.e. Balance-like types.
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::internal](</references/framework/sui_std/internal#std_internal>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::accumulator](</references/framework/sui_sui/accumulator#sui_accumulator>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::protocol_config](</references/framework/sui_sui/protocol_config#sui_protocol_config>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct Withdrawal​

Allows for withdrawing funds from a given address. The [Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>) can be created in PTBs for the transaction sender, or dynamically from an object via [withdraw_from_object](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_withdraw_from_object>).  
The redemption of the funds must be initiated from the module that defines T.
[code] 
    **public** **struct** [Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<**phantom** T: store> **has** drop
    
[/code]

Click to openFields

owner: **address**
     The owner of the funds, either an object or a transaction sender 
limit: u256
     At signing we check the limit <= balance when taking this as a call arg.  
If this was generated from an object, we cannot check this until redemption. 

## Constants​

Attempted to withdraw more than the maximum value of the underlying integer type.
[code] 
    **const** [EOverflow](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_EOverflow>): u64 = 0;
    
[/code]

Attempt to split more than the current limit of a [Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>).
[code] 
    #[error]
    **const** [EInvalidSubLimit](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_EInvalidSubLimit>): vector<u8> = b"Sub-limit exceeds current withdrawal limit";
    
[/code]

Attempted to join two withdrawals with different owners.
[code] 
    #[error]
    **const** [EOwnerMismatch](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_EOwnerMismatch>): vector<u8> = b"[Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>) owners do not match";
    
[/code]

Attempted to withdraw funds from an object when the feature flag is not enabled.
[code] 
    #[error]
    **const** [EObjectFundsWithdrawNotEnabled](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_EObjectFundsWithdrawNotEnabled>): vector<u8> = b"Object funds withdraw is not enabled";
    
[/code]

## Function withdrawal_owner​

Returns the owner, either a sender's address or an object, of the withdrawal.
[code] 
    **public** **fun** [withdrawal_owner](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_withdrawal_owner>)<T: store>(withdrawal: &[sui::funds_accumulator::Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<T>): **address**
    
[/code]

## Function withdrawal_limit​

Returns the remaining limit of the withdrawal.
[code] 
    **public** **fun** [withdrawal_limit](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_withdrawal_limit>)<T: store>(withdrawal: &[sui::funds_accumulator::Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<T>): u256
    
[/code]

## Function withdrawal_split​

Split a [Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>) and take a sub-withdrawal from it with the specified sub-limit.
[code] 
    **public** **fun** [withdrawal_split](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_withdrawal_split>)<T: store>(withdrawal: &**mut** [sui::funds_accumulator::Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<T>, sub_limit: u256): [sui::funds_accumulator::Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<T>
    
[/code]

## Function withdrawal_join​

Join two withdrawals together, increasing the limit of self by the limit of other.  
Aborts with [EOwnerMismatch](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_EOwnerMismatch>) if the owners are not equal.  
Aborts with [EOverflow](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_EOverflow>) if the resulting limit would overflow u256.
[code] 
    **public** **fun** [withdrawal_join](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_withdrawal_join>)<T: store>(withdrawal: &**mut** [sui::funds_accumulator::Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<T>, other: [sui::funds_accumulator::Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<T>)
    
[/code]

## Function redeem​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [redeem](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_redeem>)<T: store>(withdrawal: [sui::funds_accumulator::Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<T>, _: [std::internal::Permit](</references/framework/sui_std/internal#std_internal_Permit>)<T>): T
    
[/code]

## Function withdraw_from_object​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [withdraw_from_object](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_withdraw_from_object>)<T: store>(obj: &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), limit: u256): [sui::funds_accumulator::Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<T>
    
[/code]

## Function add_impl​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [add_impl](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_add_impl>)<T: store>(value: T, recipient: **address**)
    
[/code]

## Function withdraw_impl​
[code] 
    **fun** [withdraw_impl](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_withdraw_impl>)<T: store>(owner: **address** , value: u256): T
    
[/code]

## Function add_to_accumulator_address​
[code] 
    **fun** [add_to_accumulator_address](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_add_to_accumulator_address>)<T: store>([accumulator](</references/framework/sui_sui/accumulator#sui_accumulator>): **address** , recipient: **address** , value: T)
    
[/code]

## Function withdraw_from_accumulator_address​
[code] 
    **fun** [withdraw_from_accumulator_address](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_withdraw_from_accumulator_address>)<T: store>([accumulator](</references/framework/sui_sui/accumulator#sui_accumulator>): **address** , owner: **address** , value: u256): T
    
[/code]

## Function create_withdrawal​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [create_withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_create_withdrawal>)<T: store>(owner: **address** , limit: u256): [sui::funds_accumulator::Withdrawal](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator_Withdrawal>)<T>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/funds_accumulator.md>)

[Previousevent](</references/framework/sui_sui/event>)[Nextgroth16](</references/framework/sui_sui/groth16>)
