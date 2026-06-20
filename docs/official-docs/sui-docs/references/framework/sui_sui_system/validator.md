<!-- Source: https://docs.sui.io/references/framework/sui_sui_system/validator -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [system](</references/framework/sui_sui_system>)
  * validator


# Module sui_system::validator
[code]
    **use** [std::address](</references/framework/sui_std/address#std_address>);
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::internal](</references/framework/sui_std/internal#std_internal>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::type_name](</references/framework/sui_std/type_name#std_type_name>);
    **use** [std::u128](</references/framework/sui_std/u128#std_u128>);
    **use** [std::u64](</references/framework/sui_std/u64#std_u64>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::accumulator](</references/framework/sui_sui/accumulator#sui_accumulator>);
    **use** [sui::accumulator_settlement](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::bag](</references/framework/sui_sui/bag#sui_bag>);
    **use** [sui::balance](</references/framework/sui_sui/balance#sui_balance>);
    **use** [sui::bcs](</references/framework/sui_sui/bcs#sui_bcs>);
    **use** [sui::coin](</references/framework/sui_sui/coin#sui_coin>);
    **use** [sui::config](</references/framework/sui_sui/config#sui_config>);
    **use** [sui::deny_list](</references/framework/sui_sui/deny_list#sui_deny_list>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::dynamic_object_field](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field>);
    **use** [sui::event](</references/framework/sui_sui/event#sui_event>);
    **use** [sui::funds_accumulator](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator>);
    **use** [sui::hash](</references/framework/sui_sui/hash#sui_hash>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::protocol_config](</references/framework/sui_sui/protocol_config#sui_protocol_config>);
    **use** [sui::sui](</references/framework/sui_sui/sui#sui_sui>);
    **use** [sui::table](</references/framework/sui_sui/table#sui_table>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::types](</references/framework/sui_sui/types#sui_types>);
    **use** [sui::url](</references/framework/sui_sui/url#sui_url>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::vec_set](</references/framework/sui_sui/vec_set#sui_vec_set>);
    **use** [sui_system::staking_pool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool>);
    **use** [sui_system::validator_cap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap>);
    
[/code]

## Struct ValidatorMetadata​
[code] 
    **public** **struct** [ValidatorMetadata](</references/framework/sui_sui_system/validator#sui_system_validator_ValidatorMetadata>) **has** store
    
[/code]

Click to openFields

[sui_address](</references/framework/sui_sui_system/validator#sui_system_validator_sui_address>): **address**
     The Sui Address of the validator. This is the sender that created the Validator object, and also the address to send validator/coins to during withdraws. 
[protocol_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_protocol_pubkey_bytes>): vector<u8>
     The public key bytes corresponding to the private key that the validator holds to sign transactions. For now, this is the same as AuthorityName. 
[network_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_network_pubkey_bytes>): vector<u8>
     The public key bytes corresponding to the private key that the validator uses to establish TLS connections 
[worker_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_worker_pubkey_bytes>): vector<u8>
     The public key bytes correstponding to the Narwhal Worker 
[proof_of_possession](</references/framework/sui_sui_system/validator#sui_system_validator_proof_of_possession>): vector<u8>
     This is a proof that the validator has ownership of the private key 
[name](</references/framework/sui_sui_system/validator#sui_system_validator_name>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     A unique human-readable name of this validator. 
[description](</references/framework/sui_sui_system/validator#sui_system_validator_description>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[image_url](</references/framework/sui_sui_system/validator#sui_system_validator_image_url>): [sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>)
    
[project_url](</references/framework/sui_sui_system/validator#sui_system_validator_project_url>): [sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>)
    
net_address: [std::string::String](</references/framework/sui_std/string#std_string_String>)
     The network address of the validator (could also contain extra info such as port, DNS and etc.). 
[p2p_address](</references/framework/sui_sui_system/validator#sui_system_validator_p2p_address>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     The address of the validator used for p2p activities such as state sync (could also contain extra info such as port, DNS and etc.). 
[primary_address](</references/framework/sui_sui_system/validator#sui_system_validator_primary_address>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     The address of the narwhal primary 
[worker_address](</references/framework/sui_sui_system/validator#sui_system_validator_worker_address>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     The address of the narwhal worker 
[next_epoch_protocol_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_protocol_pubkey_bytes>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
     "next_epoch" metadata only takes effects in the next epoch.  
If none, current value will stay unchanged. 
[next_epoch_proof_of_possession](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_proof_of_possession>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
    
[next_epoch_network_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_network_pubkey_bytes>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
    
[next_epoch_worker_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_worker_pubkey_bytes>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
    
next_epoch_net_address: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[std::string::String](</references/framework/sui_std/string#std_string_String>)>
    
[next_epoch_p2p_address](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_p2p_address>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[std::string::String](</references/framework/sui_std/string#std_string_String>)>
    
[next_epoch_primary_address](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_primary_address>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[std::string::String](</references/framework/sui_std/string#std_string_String>)>
    
[next_epoch_worker_address](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_worker_address>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[std::string::String](</references/framework/sui_std/string#std_string_String>)>
    
extra_fields: [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     Any extra fields that's not defined statically. 

## Struct Validator​
[code] 
    **public** **struct** [Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>) **has** store
    
[/code]

Click to openFields

[metadata](</references/framework/sui_sui_system/validator#sui_system_validator_metadata>): [sui_system::validator::ValidatorMetadata](</references/framework/sui_sui_system/validator#sui_system_validator_ValidatorMetadata>)
     Summary of the validator. 
[voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power>): u64
     The voting power of this validator, which might be different from its stake amount. 
[operation_cap_id](</references/framework/sui_sui_system/validator#sui_system_validator_operation_cap_id>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     The ID of this validator's current valid UnverifiedValidatorOperationCap
[gas_price](</references/framework/sui_sui_system/validator#sui_system_validator_gas_price>): u64
     Gas price quote, updated only at end of epoch. 
[staking_pool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool>): [sui_system::staking_pool::StakingPool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakingPool>)
     Staking pool for this validator. 
[commission_rate](</references/framework/sui_sui_system/validator#sui_system_validator_commission_rate>): u64
     Commission rate of the validator, in basis point. 
next_epoch_stake: u64
     Total amount of stake that would be active in the next epoch. 
[next_epoch_gas_price](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_gas_price>): u64
     This validator's gas price quote for the next epoch. 
next_epoch_commission_rate: u64
     The commission rate of the validator starting the next epoch, in basis point. 
extra_fields: [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     Any extra fields that's not defined statically. 

## Struct StakingRequestEvent​

Event emitted when a new stake request is received.
[code] 
    **public** **struct** [StakingRequestEvent](</references/framework/sui_sui_system/validator#sui_system_validator_StakingRequestEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

pool_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
validator_address: **address**
    
staker_address: **address**
    
epoch: u64
    
amount: u64
    

## Struct UnstakingRequestEvent​

Event emitted when a new unstake request is received.
[code] 
    **public** **struct** [UnstakingRequestEvent](</references/framework/sui_sui_system/validator#sui_system_validator_UnstakingRequestEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

pool_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
validator_address: **address**
    
staker_address: **address**
    
stake_activation_epoch: u64
    
unstaking_epoch: u64
    
principal_amount: u64
    
reward_amount: u64
    

## Struct ConvertingToFungibleStakedSuiEvent​

Event emitted when a staked SUI is converted to a fungible staked SUI.
[code] 
    **public** **struct** [ConvertingToFungibleStakedSuiEvent](</references/framework/sui_sui_system/validator#sui_system_validator_ConvertingToFungibleStakedSuiEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

pool_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
stake_activation_epoch: u64
    
staked_sui_principal_amount: u64
    
fungible_staked_sui_amount: u64
    

## Struct RedeemingFungibleStakedSuiEvent​

Event emitted when a fungible staked SUI is redeemed.
[code] 
    **public** **struct** [RedeemingFungibleStakedSuiEvent](</references/framework/sui_sui_system/validator#sui_system_validator_RedeemingFungibleStakedSuiEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

pool_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
fungible_staked_sui_amount: u64
    
sui_amount: u64
    

## Constants​

Invalid proof_of_possession field in ValidatorMetadata
[code] 
    **const** [EInvalidProofOfPossession](</references/framework/sui_sui_system/validator#sui_system_validator_EInvalidProofOfPossession>): u64 = 0;
    
[/code]

Invalid pubkey_bytes field in ValidatorMetadata
[code] 
    **const** [EMetadataInvalidPubkey](</references/framework/sui_sui_system/validator#sui_system_validator_EMetadataInvalidPubkey>): u64 = 1;
    
[/code]

Invalid network_pubkey_bytes field in ValidatorMetadata
[code] 
    **const** [EMetadataInvalidNetPubkey](</references/framework/sui_sui_system/validator#sui_system_validator_EMetadataInvalidNetPubkey>): u64 = 2;
    
[/code]

Invalid worker_pubkey_bytes field in ValidatorMetadata
[code] 
    **const** [EMetadataInvalidWorkerPubkey](</references/framework/sui_sui_system/validator#sui_system_validator_EMetadataInvalidWorkerPubkey>): u64 = 3;
    
[/code]

Invalid net_address field in ValidatorMetadata
[code] 
    **const** [EMetadataInvalidNetAddr](</references/framework/sui_sui_system/validator#sui_system_validator_EMetadataInvalidNetAddr>): u64 = 4;
    
[/code]

Invalid p2p_address field in ValidatorMetadata
[code] 
    **const** [EMetadataInvalidP2pAddr](</references/framework/sui_sui_system/validator#sui_system_validator_EMetadataInvalidP2pAddr>): u64 = 5;
    
[/code]

Invalid primary_address field in ValidatorMetadata
[code] 
    **const** [EMetadataInvalidPrimaryAddr](</references/framework/sui_sui_system/validator#sui_system_validator_EMetadataInvalidPrimaryAddr>): u64 = 6;
    
[/code]

Invalid worker_address field in ValidatorMetadata
[code] 
    **const** [EMetadataInvalidWorkerAddr](</references/framework/sui_sui_system/validator#sui_system_validator_EMetadataInvalidWorkerAddr>): u64 = 7;
    
[/code]

Commission rate set by the validator is higher than the threshold
[code] 
    **const** [ECommissionRateTooHigh](</references/framework/sui_sui_system/validator#sui_system_validator_ECommissionRateTooHigh>): u64 = 8;
    
[/code]

Validator Metadata is too long
[code] 
    **const** [EValidatorMetadataExceedingLengthLimit](</references/framework/sui_sui_system/validator#sui_system_validator_EValidatorMetadataExceedingLengthLimit>): u64 = 9;
    
[/code]

Intended validator is not a candidate one.
[code] 
    **const** [ENotValidatorCandidate](</references/framework/sui_sui_system/validator#sui_system_validator_ENotValidatorCandidate>): u64 = 10;
    
[/code]

Stake amount is invalid or wrong.
[code] 
    **const** [EInvalidStakeAmount](</references/framework/sui_sui_system/validator#sui_system_validator_EInvalidStakeAmount>): u64 = 11;
    
[/code]

Function called during non-genesis times.
[code] 
    **const** [ECalledDuringNonGenesis](</references/framework/sui_sui_system/validator#sui_system_validator_ECalledDuringNonGenesis>): u64 = 12;
    
[/code]

New Capability is not created by the validator itself
[code] 
    **const** [ENewCapNotCreatedByValidatorItself](</references/framework/sui_sui_system/validator#sui_system_validator_ENewCapNotCreatedByValidatorItself>): u64 = 100;
    
[/code]

Capability code is not valid
[code] 
    **const** [EInvalidCap](</references/framework/sui_sui_system/validator#sui_system_validator_EInvalidCap>): u64 = 101;
    
[/code]

Validator trying to set gas price higher than threshold.
[code] 
    **const** [EGasPriceHigherThanThreshold](</references/framework/sui_sui_system/validator#sui_system_validator_EGasPriceHigherThanThreshold>): u64 = 102;
    
[/code]

Invalid protocol public key length.
[code] 
    **const** [EInvalidProtocolPubKeyLength](</references/framework/sui_sui_system/validator#sui_system_validator_EInvalidProtocolPubKeyLength>): u64 = 16;
    
[/code]
[code] 
    **const** [MAX_COMMISSION_RATE](</references/framework/sui_sui_system/validator#sui_system_validator_MAX_COMMISSION_RATE>): u64 = 2000;
    
[/code]
[code] 
    **const** [MAX_VALIDATOR_METADATA_LENGTH](</references/framework/sui_sui_system/validator#sui_system_validator_MAX_VALIDATOR_METADATA_LENGTH>): u64 = 256;
    
[/code]

Max gas price a validator can set is 100K MIST.
[code] 
    **const** [MAX_VALIDATOR_GAS_PRICE](</references/framework/sui_sui_system/validator#sui_system_validator_MAX_VALIDATOR_GAS_PRICE>): u64 = 100000;
    
[/code]

## Function new_metadata​
[code] 
    **public**(package) **fun** [new_metadata](</references/framework/sui_sui_system/validator#sui_system_validator_new_metadata>)([sui_address](</references/framework/sui_sui_system/validator#sui_system_validator_sui_address>): **address** , [protocol_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_protocol_pubkey_bytes>): vector<u8>, [network_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_network_pubkey_bytes>): vector<u8>, [worker_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_worker_pubkey_bytes>): vector<u8>, [proof_of_possession](</references/framework/sui_sui_system/validator#sui_system_validator_proof_of_possession>): vector<u8>, [name](</references/framework/sui_sui_system/validator#sui_system_validator_name>): [std::string::String](</references/framework/sui_std/string#std_string_String>), [description](</references/framework/sui_sui_system/validator#sui_system_validator_description>): [std::string::String](</references/framework/sui_std/string#std_string_String>), [image_url](</references/framework/sui_sui_system/validator#sui_system_validator_image_url>): [sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>), [project_url](</references/framework/sui_sui_system/validator#sui_system_validator_project_url>): [sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>), net_address: [std::string::String](</references/framework/sui_std/string#std_string_String>), [p2p_address](</references/framework/sui_sui_system/validator#sui_system_validator_p2p_address>): [std::string::String](</references/framework/sui_std/string#std_string_String>), [primary_address](</references/framework/sui_sui_system/validator#sui_system_validator_primary_address>): [std::string::String](</references/framework/sui_std/string#std_string_String>), [worker_address](</references/framework/sui_sui_system/validator#sui_system_validator_worker_address>): [std::string::String](</references/framework/sui_std/string#std_string_String>), extra_fields: [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)): [sui_system::validator::ValidatorMetadata](</references/framework/sui_sui_system/validator#sui_system_validator_ValidatorMetadata>)
    
[/code]

## Function new​
[code] 
    **public**(package) **fun** [new](</references/framework/sui_sui_system/validator#sui_system_validator_new>)([sui_address](</references/framework/sui_sui_system/validator#sui_system_validator_sui_address>): **address** , [protocol_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_protocol_pubkey_bytes>): vector<u8>, [network_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_network_pubkey_bytes>): vector<u8>, [worker_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_worker_pubkey_bytes>): vector<u8>, [proof_of_possession](</references/framework/sui_sui_system/validator#sui_system_validator_proof_of_possession>): vector<u8>, [name](</references/framework/sui_sui_system/validator#sui_system_validator_name>): vector<u8>, [description](</references/framework/sui_sui_system/validator#sui_system_validator_description>): vector<u8>, [image_url](</references/framework/sui_sui_system/validator#sui_system_validator_image_url>): vector<u8>, [project_url](</references/framework/sui_sui_system/validator#sui_system_validator_project_url>): vector<u8>, net_address: vector<u8>, [p2p_address](</references/framework/sui_sui_system/validator#sui_system_validator_p2p_address>): vector<u8>, [primary_address](</references/framework/sui_sui_system/validator#sui_system_validator_primary_address>): vector<u8>, [worker_address](</references/framework/sui_sui_system/validator#sui_system_validator_worker_address>): vector<u8>, [gas_price](</references/framework/sui_sui_system/validator#sui_system_validator_gas_price>): u64, [commission_rate](</references/framework/sui_sui_system/validator#sui_system_validator_commission_rate>): u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)
    
[/code]

## Function deactivate​

Mark Validator's StakingPool as inactive by setting the deactivation_epoch.
[code] 
    **public**(package) **fun** [deactivate](</references/framework/sui_sui_system/validator#sui_system_validator_deactivate>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), deactivation_epoch: u64)
    
[/code]

## Function activate​

Activate Validator's StakingPool by setting the activation_epoch.
[code] 
    **public**(package) **fun** [activate](</references/framework/sui_sui_system/validator#sui_system_validator_activate>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), activation_epoch: u64)
    
[/code]

## Function adjust_stake_and_gas_price​

Process pending stake and pending withdraws, and update the gas price.
[code] 
    **public**(package) **fun** [adjust_stake_and_gas_price](</references/framework/sui_sui_system/validator#sui_system_validator_adjust_stake_and_gas_price>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>))
    
[/code]

## Function request_add_stake​

Request to add stake to the validator's staking pool, processed at the end of the epoch.
[code] 
    **public**(package) **fun** [request_add_stake](</references/framework/sui_sui_system/validator#sui_system_validator_request_add_stake>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), stake: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, staker_address: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>)
    
[/code]

## Function convert_to_fungible_staked_sui​
[code] 
    **public**(package) **fun** [convert_to_fungible_staked_sui](</references/framework/sui_sui_system/validator#sui_system_validator_convert_to_fungible_staked_sui>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>)
    
[/code]

## Function redeem_fungible_staked_sui​
[code] 
    **public**(package) **fun** [redeem_fungible_staked_sui](</references/framework/sui_sui_system/validator#sui_system_validator_redeem_fungible_staked_sui>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), fungible_staked_sui: [sui_system::staking_pool::FungibleStakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_FungibleStakedSui>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function request_add_stake_at_genesis​

Request to add stake to the validator's staking pool at genesis
[code] 
    **public**(package) **fun** [request_add_stake_at_genesis](</references/framework/sui_sui_system/validator#sui_system_validator_request_add_stake_at_genesis>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), stake: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>, staker_address: **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function request_withdraw_stake​

Request to withdraw stake from the validator's staking pool, processed at the end of the epoch.
[code] 
    **public**(package) **fun** [request_withdraw_stake](</references/framework/sui_sui_system/validator#sui_system_validator_request_withdraw_stake>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), staked_sui: [sui_system::staking_pool::StakedSui](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_StakedSui>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function request_set_gas_price​

Request to set new gas price for the next epoch.  
Need to present a ValidatorOperationCap.
[code] 
    **public**(package) **fun** [request_set_gas_price](</references/framework/sui_sui_system/validator#sui_system_validator_request_set_gas_price>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), verified_cap: [sui_system::validator_cap::ValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap>), new_price: u64)
    
[/code]

## Function set_candidate_gas_price​

Set new gas price for the candidate validator.
[code] 
    **public**(package) **fun** [set_candidate_gas_price](</references/framework/sui_sui_system/validator#sui_system_validator_set_candidate_gas_price>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), verified_cap: [sui_system::validator_cap::ValidatorOperationCap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap>), new_price: u64)
    
[/code]

## Function request_set_commission_rate​

Request to set new commission rate for the next epoch.
[code] 
    **public**(package) **fun** [request_set_commission_rate](</references/framework/sui_sui_system/validator#sui_system_validator_request_set_commission_rate>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), new_commission_rate: u64)
    
[/code]

## Function set_candidate_commission_rate​

Set new commission rate for the candidate validator.
[code] 
    **public**(package) **fun** [set_candidate_commission_rate](</references/framework/sui_sui_system/validator#sui_system_validator_set_candidate_commission_rate>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), new_commission_rate: u64)
    
[/code]

## Function deposit_stake_rewards​

Deposit stakes rewards into the validator's staking pool, called at the end of the epoch.
[code] 
    **public**(package) **fun** [deposit_stake_rewards](</references/framework/sui_sui_system/validator#sui_system_validator_deposit_stake_rewards>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), reward: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>)
    
[/code]

## Function process_pending_stakes_and_withdraws​

Process pending stakes and withdraws, called at the end of the epoch.
[code] 
    **public**(package) **fun** [process_pending_stakes_and_withdraws](</references/framework/sui_sui_system/validator#sui_system_validator_process_pending_stakes_and_withdraws>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function is_preactive​

Returns true if the validator is preactive.
[code] 
    **public** **fun** [is_preactive](</references/framework/sui_sui_system/validator#sui_system_validator_is_preactive>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): bool
    
[/code]

## Function metadata​
[code] 
    **public** **fun** [metadata](</references/framework/sui_sui_system/validator#sui_system_validator_metadata>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[sui_system::validator::ValidatorMetadata](</references/framework/sui_sui_system/validator#sui_system_validator_ValidatorMetadata>)
    
[/code]

## Function sui_address​
[code] 
    **public** **fun** [sui_address](</references/framework/sui_sui_system/validator#sui_system_validator_sui_address>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): **address**
    
[/code]

## Function name​
[code] 
    **public** **fun** [name](</references/framework/sui_sui_system/validator#sui_system_validator_name>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function description​
[code] 
    **public** **fun** [description](</references/framework/sui_sui_system/validator#sui_system_validator_description>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function image_url​
[code] 
    **public** **fun** [image_url](</references/framework/sui_sui_system/validator#sui_system_validator_image_url>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>)
    
[/code]

## Function project_url​
[code] 
    **public** **fun** [project_url](</references/framework/sui_sui_system/validator#sui_system_validator_project_url>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>)
    
[/code]

## Function network_address​
[code] 
    **public** **fun** [network_address](</references/framework/sui_sui_system/validator#sui_system_validator_network_address>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function p2p_address​
[code] 
    **public** **fun** [p2p_address](</references/framework/sui_sui_system/validator#sui_system_validator_p2p_address>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function primary_address​
[code] 
    **public** **fun** [primary_address](</references/framework/sui_sui_system/validator#sui_system_validator_primary_address>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function worker_address​
[code] 
    **public** **fun** [worker_address](</references/framework/sui_sui_system/validator#sui_system_validator_worker_address>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function protocol_pubkey_bytes​
[code] 
    **public** **fun** [protocol_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_protocol_pubkey_bytes>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &vector<u8>
    
[/code]

## Function proof_of_possession​
[code] 
    **public** **fun** [proof_of_possession](</references/framework/sui_sui_system/validator#sui_system_validator_proof_of_possession>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &vector<u8>
    
[/code]

## Function network_pubkey_bytes​
[code] 
    **public** **fun** [network_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_network_pubkey_bytes>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &vector<u8>
    
[/code]

## Function worker_pubkey_bytes​
[code] 
    **public** **fun** [worker_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_worker_pubkey_bytes>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &vector<u8>
    
[/code]

## Function next_epoch_network_address​
[code] 
    **public** **fun** [next_epoch_network_address](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_network_address>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[std::string::String](</references/framework/sui_std/string#std_string_String>)>
    
[/code]

## Function next_epoch_p2p_address​
[code] 
    **public** **fun** [next_epoch_p2p_address](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_p2p_address>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[std::string::String](</references/framework/sui_std/string#std_string_String>)>
    
[/code]

## Function next_epoch_primary_address​
[code] 
    **public** **fun** [next_epoch_primary_address](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_primary_address>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[std::string::String](</references/framework/sui_std/string#std_string_String>)>
    
[/code]

## Function next_epoch_worker_address​
[code] 
    **public** **fun** [next_epoch_worker_address](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_worker_address>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[std::string::String](</references/framework/sui_std/string#std_string_String>)>
    
[/code]

## Function next_epoch_protocol_pubkey_bytes​
[code] 
    **public** **fun** [next_epoch_protocol_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_protocol_pubkey_bytes>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
    
[/code]

## Function next_epoch_proof_of_possession​
[code] 
    **public** **fun** [next_epoch_proof_of_possession](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_proof_of_possession>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
    
[/code]

## Function next_epoch_network_pubkey_bytes​
[code] 
    **public** **fun** [next_epoch_network_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_network_pubkey_bytes>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
    
[/code]

## Function next_epoch_worker_pubkey_bytes​
[code] 
    **public** **fun** [next_epoch_worker_pubkey_bytes](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_worker_pubkey_bytes>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<u8>>
    
[/code]

## Function operation_cap_id​
[code] 
    **public** **fun** [operation_cap_id](</references/framework/sui_sui_system/validator#sui_system_validator_operation_cap_id>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): &[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function next_epoch_gas_price​
[code] 
    **public** **fun** [next_epoch_gas_price](</references/framework/sui_sui_system/validator#sui_system_validator_next_epoch_gas_price>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): u64
    
[/code]

## Function total_stake_amount​
[code] 
    **public** **fun** [total_stake_amount](</references/framework/sui_sui_system/validator#sui_system_validator_total_stake_amount>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): u64
    
[/code]

## Function stake_amount​
[code] 
    **public** **fun** [stake_amount](</references/framework/sui_sui_system/validator#sui_system_validator_stake_amount>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): u64
    
[/code]

## Function total_stake​

Return the total amount staked with this validator
[code] 
    **public** **fun** [total_stake](</references/framework/sui_sui_system/validator#sui_system_validator_total_stake>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): u64
    
[/code]

## Function voting_power​

Return the voting power of this validator.
[code] 
    **public** **fun** [voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): u64
    
[/code]

## Function set_voting_power​

Set the voting power of this validator, called only from validator_set.
[code] 
    **public**(package) **fun** [set_voting_power](</references/framework/sui_sui_system/validator#sui_system_validator_set_voting_power>)(self: &**mut** [sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), new_voting_power: u64)
    
[/code]

## Function pending_stake_amount​
[code] 
    **public** **fun** [pending_stake_amount](</references/framework/sui_sui_system/validator#sui_system_validator_pending_stake_amount>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): u64
    
[/code]

## Function pending_stake_withdraw_amount​
[code] 
    **public** **fun** [pending_stake_withdraw_amount](</references/framework/sui_sui_system/validator#sui_system_validator_pending_stake_withdraw_amount>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): u64
    
[/code]

## Function gas_price​
[code] 
    **public** **fun** [gas_price](</references/framework/sui_sui_system/validator#sui_system_validator_gas_price>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): u64
    
[/code]

## Function commission_rate​
[code] 
    **public** **fun** [commission_rate](</references/framework/sui_sui_system/validator#sui_system_validator_commission_rate>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): u64
    
[/code]

## Function pool_token_exchange_rate_at_epoch​
[code] 
    **public** **fun** [pool_token_exchange_rate_at_epoch](</references/framework/sui_sui_system/validator#sui_system_validator_pool_token_exchange_rate_at_epoch>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>), epoch: u64): [sui_system::staking_pool::PoolTokenExchangeRate](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool_PoolTokenExchangeRate>)
    
[/code]

## Function staking_pool_id​
[code] 
    **public** **fun** [staking_pool_id](</references/framework/sui_sui_system/validator#sui_system_validator_staking_pool_id>)(self: &[sui_system::validator::Validator](</references/framework/sui_sui_system/validator#sui_system_validator_Validator>)): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

* * *

_This page has been truncated because it exceeds the maximum character limit.[View the full source](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui_system/validator.md>)._

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui_system/validator.md>)

[Previoussui_system_state_inner](</references/framework/sui_sui_system/sui_system_state_inner>)[Nextvalidator_cap](</references/framework/sui_sui_system/validator_cap>)
