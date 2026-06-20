<!-- Source: https://docs.sui.io/references/framework/sui_bridge/committee -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [bridge](</references/framework/sui_bridge>)
  * committee


# Module bridge::committee
[code]
    **use** [bridge::chain_ids](</references/framework/sui_bridge/chain_ids#bridge_chain_ids>);
    **use** [bridge::crypto](</references/framework/sui_bridge/crypto#bridge_crypto>);
    **use** [bridge::message](</references/framework/sui_bridge/message#bridge_message>);
    **use** [bridge::message_types](</references/framework/sui_bridge/message_types#bridge_message_types>);
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
    **use** [sui::ecdsa_k1](</references/framework/sui_sui/ecdsa_k1#sui_ecdsa_k1>);
    **use** [sui::event](</references/framework/sui_sui/event#sui_event>);
    **use** [sui::funds_accumulator](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator>);
    **use** [sui::hash](</references/framework/sui_sui/hash#sui_hash>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::priority_queue](</references/framework/sui_sui/priority_queue#sui_priority_queue>);
    **use** [sui::protocol_config](</references/framework/sui_sui/protocol_config#sui_protocol_config>);
    **use** [sui::sui](</references/framework/sui_sui/sui#sui_sui>);
    **use** [sui::table](</references/framework/sui_sui/table#sui_table>);
    **use** [sui::table_vec](</references/framework/sui_sui/table_vec#sui_table_vec>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::types](</references/framework/sui_sui/types#sui_types>);
    **use** [sui::url](</references/framework/sui_sui/url#sui_url>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::vec_set](</references/framework/sui_sui/vec_set#sui_vec_set>);
    **use** [sui::versioned](</references/framework/sui_sui/versioned#sui_versioned>);
    **use** [sui_system::stake_subsidy](</references/framework/sui_sui_system/stake_subsidy#sui_system_stake_subsidy>);
    **use** [sui_system::staking_pool](</references/framework/sui_sui_system/staking_pool#sui_system_staking_pool>);
    **use** [sui_system::storage_fund](</references/framework/sui_sui_system/storage_fund#sui_system_storage_fund>);
    **use** [sui_system::sui_system](</references/framework/sui_sui_system/sui_system#sui_system_sui_system>);
    **use** [sui_system::sui_system_state_inner](</references/framework/sui_sui_system/sui_system_state_inner#sui_system_sui_system_state_inner>);
    **use** [sui_system::validator](</references/framework/sui_sui_system/validator#sui_system_validator>);
    **use** [sui_system::validator_cap](</references/framework/sui_sui_system/validator_cap#sui_system_validator_cap>);
    **use** [sui_system::validator_set](</references/framework/sui_sui_system/validator_set#sui_system_validator_set>);
    **use** [sui_system::validator_wrapper](</references/framework/sui_sui_system/validator_wrapper#sui_system_validator_wrapper>);
    **use** [sui_system::voting_power](</references/framework/sui_sui_system/voting_power#sui_system_voting_power>);
    
[/code]

## Struct BlocklistValidatorEvent​
[code] 
    **public** **struct** [BlocklistValidatorEvent](</references/framework/sui_bridge/committee#bridge_committee_BlocklistValidatorEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

blocklisted: bool
    
public_keys: vector<vector<u8>>
    

## Struct BridgeCommittee​
[code] 
    **public** **struct** [BridgeCommittee](</references/framework/sui_bridge/committee#bridge_committee_BridgeCommittee>) **has** store
    
[/code]

Click to openFields

members: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<vector<u8>, [bridge::committee::CommitteeMember](</references/framework/sui_bridge/committee#bridge_committee_CommitteeMember>)>
    
member_registrations: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , [bridge::committee::CommitteeMemberRegistration](</references/framework/sui_bridge/committee#bridge_committee_CommitteeMemberRegistration>)>
    
last_committee_update_epoch: u64
    

## Struct CommitteeUpdateEvent​
[code] 
    **public** **struct** [CommitteeUpdateEvent](</references/framework/sui_bridge/committee#bridge_committee_CommitteeUpdateEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

members: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<vector<u8>, [bridge::committee::CommitteeMember](</references/framework/sui_bridge/committee#bridge_committee_CommitteeMember>)>
    
stake_participation_percentage: u64
    

## Struct CommitteeMemberUrlUpdateEvent​
[code] 
    **public** **struct** [CommitteeMemberUrlUpdateEvent](</references/framework/sui_bridge/committee#bridge_committee_CommitteeMemberUrlUpdateEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

member: vector<u8>
    
new_url: vector<u8>
    

## Struct CommitteeMember​
[code] 
    **public** **struct** [CommitteeMember](</references/framework/sui_bridge/committee#bridge_committee_CommitteeMember>) **has** **copy** , drop, store
    
[/code]

Click to openFields

sui_address: **address**
     The Sui Address of the validator 
bridge_pubkey_bytes: vector<u8>
     The public key bytes of the bridge key 
voting_power: u64
     Voting power, values are voting power in the scale of 10000. 
http_rest_url: vector<u8>
     The HTTP REST URL the member's node listens to it looks like b'https://127.0.0.1:9191'
blocklisted: bool
     If this member is blocklisted 

## Struct CommitteeMemberRegistration​
[code] 
    **public** **struct** [CommitteeMemberRegistration](</references/framework/sui_bridge/committee#bridge_committee_CommitteeMemberRegistration>) **has** **copy** , drop, store
    
[/code]

Click to openFields

sui_address: **address**
     The Sui Address of the validator 
bridge_pubkey_bytes: vector<u8>
     The public key bytes of the bridge key 
http_rest_url: vector<u8>
     The HTTP REST URL the member's node listens to it looks like b'https://127.0.0.1:9191'

## Constants​
[code] 
    **const** [ESignatureBelowThreshold](</references/framework/sui_bridge/committee#bridge_committee_ESignatureBelowThreshold>): u64 = 0;
    
[/code]
[code] 
    **const** [EDuplicatedSignature](</references/framework/sui_bridge/committee#bridge_committee_EDuplicatedSignature>): u64 = 1;
    
[/code]
[code] 
    **const** [EInvalidSignature](</references/framework/sui_bridge/committee#bridge_committee_EInvalidSignature>): u64 = 2;
    
[/code]
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_bridge/committee#bridge_committee_ENotSystemAddress>): u64 = 3;
    
[/code]
[code] 
    **const** [EValidatorBlocklistContainsUnknownKey](</references/framework/sui_bridge/committee#bridge_committee_EValidatorBlocklistContainsUnknownKey>): u64 = 4;
    
[/code]
[code] 
    **const** [ESenderNotActiveValidator](</references/framework/sui_bridge/committee#bridge_committee_ESenderNotActiveValidator>): u64 = 5;
    
[/code]
[code] 
    **const** [EInvalidPubkeyLength](</references/framework/sui_bridge/committee#bridge_committee_EInvalidPubkeyLength>): u64 = 6;
    
[/code]
[code] 
    **const** [ECommitteeAlreadyInitiated](</references/framework/sui_bridge/committee#bridge_committee_ECommitteeAlreadyInitiated>): u64 = 7;
    
[/code]
[code] 
    **const** [EDuplicatePubkey](</references/framework/sui_bridge/committee#bridge_committee_EDuplicatePubkey>): u64 = 8;
    
[/code]
[code] 
    **const** [ESenderIsNotInBridgeCommittee](</references/framework/sui_bridge/committee#bridge_committee_ESenderIsNotInBridgeCommittee>): u64 = 9;
    
[/code]
[code] 
    **const** [SUI_MESSAGE_PREFIX](</references/framework/sui_bridge/committee#bridge_committee_SUI_MESSAGE_PREFIX>): vector<u8> = vector[83, 85, 73, 95, 66, 82, 73, 68, 71, 69, 95, 77, 69, 83, 83, 65, 71, 69];
    
[/code]
[code] 
    **const** [ECDSA_COMPRESSED_PUBKEY_LENGTH](</references/framework/sui_bridge/committee#bridge_committee_ECDSA_COMPRESSED_PUBKEY_LENGTH>): u64 = 33;
    
[/code]

## Function verify_signatures​
[code] 
    **public** **fun** [verify_signatures](</references/framework/sui_bridge/committee#bridge_committee_verify_signatures>)(self: &[bridge::committee::BridgeCommittee](</references/framework/sui_bridge/committee#bridge_committee_BridgeCommittee>), [message](</references/framework/sui_bridge/message#bridge_message>): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>), signatures: vector<vector<u8>>)
    
[/code]

## Function create​
[code] 
    **public**(package) **fun** [create](</references/framework/sui_bridge/committee#bridge_committee_create>)(ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [bridge::committee::BridgeCommittee](</references/framework/sui_bridge/committee#bridge_committee_BridgeCommittee>)
    
[/code]

## Function register​
[code] 
    **public**(package) **fun** [register](</references/framework/sui_bridge/committee#bridge_committee_register>)(self: &**mut** [bridge::committee::BridgeCommittee](</references/framework/sui_bridge/committee#bridge_committee_BridgeCommittee>), system_state: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), bridge_pubkey_bytes: vector<u8>, http_rest_url: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function try_create_next_committee​
[code] 
    **public**(package) **fun** [try_create_next_committee](</references/framework/sui_bridge/committee#bridge_committee_try_create_next_committee>)(self: &**mut** [bridge::committee::BridgeCommittee](</references/framework/sui_bridge/committee#bridge_committee_BridgeCommittee>), active_validator_voting_power: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , u64>, min_stake_participation_percentage: u64, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function execute_blocklist​
[code] 
    **public**(package) **fun** [execute_blocklist](</references/framework/sui_bridge/committee#bridge_committee_execute_blocklist>)(self: &**mut** [bridge::committee::BridgeCommittee](</references/framework/sui_bridge/committee#bridge_committee_BridgeCommittee>), blocklist: [bridge::message::Blocklist](</references/framework/sui_bridge/message#bridge_message_Blocklist>))
    
[/code]

## Function committee_members​
[code] 
    **public**(package) **fun** [committee_members](</references/framework/sui_bridge/committee#bridge_committee_committee_members>)(self: &[bridge::committee::BridgeCommittee](</references/framework/sui_bridge/committee#bridge_committee_BridgeCommittee>)): &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<vector<u8>, [bridge::committee::CommitteeMember](</references/framework/sui_bridge/committee#bridge_committee_CommitteeMember>)>
    
[/code]

## Function update_node_url​
[code] 
    **public**(package) **fun** [update_node_url](</references/framework/sui_bridge/committee#bridge_committee_update_node_url>)(self: &**mut** [bridge::committee::BridgeCommittee](</references/framework/sui_bridge/committee#bridge_committee_BridgeCommittee>), new_url: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function check_uniqueness_bridge_keys​
[code] 
    **fun** [check_uniqueness_bridge_keys](</references/framework/sui_bridge/committee#bridge_committee_check_uniqueness_bridge_keys>)(self: &[bridge::committee::BridgeCommittee](</references/framework/sui_bridge/committee#bridge_committee_BridgeCommittee>), bridge_pubkey_bytes: vector<u8>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_bridge/committee.md>)

[Previouschain_ids](</references/framework/sui_bridge/chain_ids>)[Nextcrypto](</references/framework/sui_bridge/crypto>)
