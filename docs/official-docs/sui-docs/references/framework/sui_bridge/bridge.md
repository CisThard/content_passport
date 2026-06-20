<!-- Source: https://docs.sui.io/references/framework/sui_bridge/bridge -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [bridge](</references/framework/sui_bridge>)
  * bridge


# Module bridge::bridge
[code]
    **use** [bridge::chain_ids](</references/framework/sui_bridge/chain_ids#bridge_chain_ids>);
    **use** [bridge::committee](</references/framework/sui_bridge/committee#bridge_committee>);
    **use** [bridge::crypto](</references/framework/sui_bridge/crypto#bridge_crypto>);
    **use** [bridge::limiter](</references/framework/sui_bridge/limiter#bridge_limiter>);
    **use** [bridge::message](</references/framework/sui_bridge/message#bridge_message>);
    **use** [bridge::message_types](</references/framework/sui_bridge/message_types#bridge_message_types>);
    **use** [bridge::treasury](</references/framework/sui_bridge/treasury#bridge_treasury>);
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
    **use** [sui::clock](</references/framework/sui_sui/clock#sui_clock>);
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
    **use** [sui::linked_table](</references/framework/sui_sui/linked_table#sui_linked_table>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::object_bag](</references/framework/sui_sui/object_bag#sui_object_bag>);
    **use** [sui::package](</references/framework/sui_sui/package#sui_package>);
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

## Struct Bridge​
[code] 
    **public** **struct** [Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
inner: [sui::versioned::Versioned](</references/framework/sui_sui/versioned#sui_versioned_Versioned>)
    

## Struct BridgeInner​
[code] 
    **public** **struct** [BridgeInner](</references/framework/sui_bridge/bridge#bridge_bridge_BridgeInner>) **has** store
    
[/code]

Click to openFields

bridge_version: u64
    
message_version: u8
    
chain_id: u8
    
sequence_nums: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<u8, u64>
    
[committee](</references/framework/sui_bridge/committee#bridge_committee>): [bridge::committee::BridgeCommittee](</references/framework/sui_bridge/committee#bridge_committee_BridgeCommittee>)
    
[treasury](</references/framework/sui_bridge/treasury#bridge_treasury>): [bridge::treasury::BridgeTreasury](</references/framework/sui_bridge/treasury#bridge_treasury_BridgeTreasury>)
    
token_transfer_records: [sui::linked_table::LinkedTable](</references/framework/sui_sui/linked_table#sui_linked_table_LinkedTable>)<[bridge::message::BridgeMessageKey](</references/framework/sui_bridge/message#bridge_message_BridgeMessageKey>), [bridge::bridge::BridgeRecord](</references/framework/sui_bridge/bridge#bridge_bridge_BridgeRecord>)>
    
[limiter](</references/framework/sui_bridge/limiter#bridge_limiter>): [bridge::limiter::TransferLimiter](</references/framework/sui_bridge/limiter#bridge_limiter_TransferLimiter>)
    
paused: bool
    

## Struct TokenDepositedEvent​
[code] 
    **public** **struct** [TokenDepositedEvent](</references/framework/sui_bridge/bridge#bridge_bridge_TokenDepositedEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

seq_num: u64
    
source_chain: u8
    
sender_address: vector<u8>
    
target_chain: u8
    
target_address: vector<u8>
    
token_type: u8
    
amount: u64
    

## Struct TokenDepositedEventV2​
[code] 
    **public** **struct** [TokenDepositedEventV2](</references/framework/sui_bridge/bridge#bridge_bridge_TokenDepositedEventV2>) **has** **copy** , drop
    
[/code]

Click to openFields

seq_num: u64
    
source_chain: u8
    
sender_address: vector<u8>
    
target_chain: u8
    
target_address: vector<u8>
    
token_type: u8
    
amount: u64
    
timestamp_ms: u64
    

## Struct EmergencyOpEvent​
[code] 
    **public** **struct** [EmergencyOpEvent](</references/framework/sui_bridge/bridge#bridge_bridge_EmergencyOpEvent>) **has** **copy** , drop
    
[/code]

Click to openFields

frozen: bool
    

## Struct BridgeRecord​
[code] 
    **public** **struct** [BridgeRecord](</references/framework/sui_bridge/bridge#bridge_bridge_BridgeRecord>) **has** drop, store
    
[/code]

Click to openFields

[message](</references/framework/sui_bridge/message#bridge_message>): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)
    
verified_signatures: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<vector<u8>>>
    
claimed: bool
    

## Struct TokenTransferApproved​
[code] 
    **public** **struct** [TokenTransferApproved](</references/framework/sui_bridge/bridge#bridge_bridge_TokenTransferApproved>) **has** **copy** , drop
    
[/code]

Click to openFields

message_key: [bridge::message::BridgeMessageKey](</references/framework/sui_bridge/message#bridge_message_BridgeMessageKey>)
    

## Struct TokenTransferClaimed​
[code] 
    **public** **struct** [TokenTransferClaimed](</references/framework/sui_bridge/bridge#bridge_bridge_TokenTransferClaimed>) **has** **copy** , drop
    
[/code]

Click to openFields

message_key: [bridge::message::BridgeMessageKey](</references/framework/sui_bridge/message#bridge_message_BridgeMessageKey>)
    

## Struct TokenTransferAlreadyApproved​
[code] 
    **public** **struct** [TokenTransferAlreadyApproved](</references/framework/sui_bridge/bridge#bridge_bridge_TokenTransferAlreadyApproved>) **has** **copy** , drop
    
[/code]

Click to openFields

message_key: [bridge::message::BridgeMessageKey](</references/framework/sui_bridge/message#bridge_message_BridgeMessageKey>)
    

## Struct TokenTransferAlreadyClaimed​
[code] 
    **public** **struct** [TokenTransferAlreadyClaimed](</references/framework/sui_bridge/bridge#bridge_bridge_TokenTransferAlreadyClaimed>) **has** **copy** , drop
    
[/code]

Click to openFields

message_key: [bridge::message::BridgeMessageKey](</references/framework/sui_bridge/message#bridge_message_BridgeMessageKey>)
    

## Struct TokenTransferLimitExceed​
[code] 
    **public** **struct** [TokenTransferLimitExceed](</references/framework/sui_bridge/bridge#bridge_bridge_TokenTransferLimitExceed>) **has** **copy** , drop
    
[/code]

Click to openFields

message_key: [bridge::message::BridgeMessageKey](</references/framework/sui_bridge/message#bridge_message_BridgeMessageKey>)
    

## Constants​
[code] 
    **const** [MESSAGE_VERSION](</references/framework/sui_bridge/bridge#bridge_bridge_MESSAGE_VERSION>): u8 = 1;
    
[/code]
[code] 
    **const** [TRANSFER_STATUS_PENDING](</references/framework/sui_bridge/bridge#bridge_bridge_TRANSFER_STATUS_PENDING>): u8 = 0;
    
[/code]
[code] 
    **const** [TRANSFER_STATUS_APPROVED](</references/framework/sui_bridge/bridge#bridge_bridge_TRANSFER_STATUS_APPROVED>): u8 = 1;
    
[/code]
[code] 
    **const** [TRANSFER_STATUS_CLAIMED](</references/framework/sui_bridge/bridge#bridge_bridge_TRANSFER_STATUS_CLAIMED>): u8 = 2;
    
[/code]
[code] 
    **const** [TRANSFER_STATUS_NOT_FOUND](</references/framework/sui_bridge/bridge#bridge_bridge_TRANSFER_STATUS_NOT_FOUND>): u8 = 3;
    
[/code]
[code] 
    **const** [EVM_ADDRESS_LENGTH](</references/framework/sui_bridge/bridge#bridge_bridge_EVM_ADDRESS_LENGTH>): u64 = 20;
    
[/code]
[code] 
    **const** [EUnexpectedMessageType](</references/framework/sui_bridge/bridge#bridge_bridge_EUnexpectedMessageType>): u64 = 0;
    
[/code]
[code] 
    **const** [EUnauthorisedClaim](</references/framework/sui_bridge/bridge#bridge_bridge_EUnauthorisedClaim>): u64 = 1;
    
[/code]
[code] 
    **const** [EMalformedMessageError](</references/framework/sui_bridge/bridge#bridge_bridge_EMalformedMessageError>): u64 = 2;
    
[/code]
[code] 
    **const** [EUnexpectedTokenType](</references/framework/sui_bridge/bridge#bridge_bridge_EUnexpectedTokenType>): u64 = 3;
    
[/code]
[code] 
    **const** [EUnexpectedChainID](</references/framework/sui_bridge/bridge#bridge_bridge_EUnexpectedChainID>): u64 = 4;
    
[/code]
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_bridge/bridge#bridge_bridge_ENotSystemAddress>): u64 = 5;
    
[/code]
[code] 
    **const** [EUnexpectedSeqNum](</references/framework/sui_bridge/bridge#bridge_bridge_EUnexpectedSeqNum>): u64 = 6;
    
[/code]
[code] 
    **const** [EWrongInnerVersion](</references/framework/sui_bridge/bridge#bridge_bridge_EWrongInnerVersion>): u64 = 7;
    
[/code]
[code] 
    **const** [EBridgeUnavailable](</references/framework/sui_bridge/bridge#bridge_bridge_EBridgeUnavailable>): u64 = 8;
    
[/code]
[code] 
    **const** [EUnexpectedOperation](</references/framework/sui_bridge/bridge#bridge_bridge_EUnexpectedOperation>): u64 = 9;
    
[/code]
[code] 
    **const** [EInvariantSuiInitializedTokenTransferShouldNotBeClaimed](</references/framework/sui_bridge/bridge#bridge_bridge_EInvariantSuiInitializedTokenTransferShouldNotBeClaimed>): u64 = 10;
    
[/code]
[code] 
    **const** [EMessageNotFoundInRecords](</references/framework/sui_bridge/bridge#bridge_bridge_EMessageNotFoundInRecords>): u64 = 11;
    
[/code]
[code] 
    **const** [EUnexpectedMessageVersion](</references/framework/sui_bridge/bridge#bridge_bridge_EUnexpectedMessageVersion>): u64 = 12;
    
[/code]
[code] 
    **const** [EBridgeAlreadyPaused](</references/framework/sui_bridge/bridge#bridge_bridge_EBridgeAlreadyPaused>): u64 = 13;
    
[/code]
[code] 
    **const** [EBridgeNotPaused](</references/framework/sui_bridge/bridge#bridge_bridge_EBridgeNotPaused>): u64 = 14;
    
[/code]
[code] 
    **const** [ETokenAlreadyClaimedOrHitLimit](</references/framework/sui_bridge/bridge#bridge_bridge_ETokenAlreadyClaimedOrHitLimit>): u64 = 15;
    
[/code]
[code] 
    **const** [EInvalidBridgeRoute](</references/framework/sui_bridge/bridge#bridge_bridge_EInvalidBridgeRoute>): u64 = 16;
    
[/code]
[code] 
    **const** [EMustBeTokenMessage](</references/framework/sui_bridge/bridge#bridge_bridge_EMustBeTokenMessage>): u64 = 17;
    
[/code]
[code] 
    **const** [EInvalidEvmAddress](</references/framework/sui_bridge/bridge#bridge_bridge_EInvalidEvmAddress>): u64 = 18;
    
[/code]
[code] 
    **const** [ETokenValueIsZero](</references/framework/sui_bridge/bridge#bridge_bridge_ETokenValueIsZero>): u64 = 19;
    
[/code]
[code] 
    **const** [CURRENT_VERSION](</references/framework/sui_bridge/bridge#bridge_bridge_CURRENT_VERSION>): u64 = 1;
    
[/code]

## Function create​
[code] 
    **fun** [create](</references/framework/sui_bridge/bridge#bridge_bridge_create>)(id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), chain_id: u8, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function init_bridge_committee​
[code] 
    **fun** [init_bridge_committee](</references/framework/sui_bridge/bridge#bridge_bridge_init_bridge_committee>)([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), active_validator_voting_power: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , u64>, min_stake_participation_percentage: u64, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function committee_registration​
[code] 
    **public** **fun** [committee_registration](</references/framework/sui_bridge/bridge#bridge_bridge_committee_registration>)([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), system_state: &**mut** [sui_system::sui_system::SuiSystemState](</references/framework/sui_sui_system/sui_system#sui_system_sui_system_SuiSystemState>), bridge_pubkey_bytes: vector<u8>, http_rest_url: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_node_url​
[code] 
    **public** **fun** [update_node_url](</references/framework/sui_bridge/bridge#bridge_bridge_update_node_url>)([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), new_url: vector<u8>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function register_foreign_token​
[code] 
    **public** **fun** [register_foreign_token](</references/framework/sui_bridge/bridge#bridge_bridge_register_foreign_token>)<T>([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), tc: [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, uc: [sui::package::UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>), metadata: &[sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>)
    
[/code]

## Function send_token​
[code] 
    **public** **fun** [send_token](</references/framework/sui_bridge/bridge#bridge_bridge_send_token>)<T>([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), target_chain: u8, target_address: vector<u8>, token: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function send_token_v2​
[code] 
    **public** **fun** [send_token_v2](</references/framework/sui_bridge/bridge#bridge_bridge_send_token_v2>)<T>([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), target_chain: u8, target_address: vector<u8>, token: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, clock: &[sui::clock::Clock](</references/framework/sui_sui/clock#sui_clock_Clock>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function approve_token_transfer​
[code] 
    **public** **fun** [approve_token_transfer](</references/framework/sui_bridge/bridge#bridge_bridge_approve_token_transfer>)([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), [message](</references/framework/sui_bridge/message#bridge_message>): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>), signatures: vector<vector<u8>>)
    
[/code]

## Function claim_token​
[code] 
    **public** **fun** [claim_token](</references/framework/sui_bridge/bridge#bridge_bridge_claim_token>)<T>([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), clock: &[sui::clock::Clock](</references/framework/sui_sui/clock#sui_clock_Clock>), source_chain: u8, bridge_seq_num: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>
    
[/code]

## Function claim_and_transfer_token​
[code] 
    **public** **fun** [claim_and_transfer_token](</references/framework/sui_bridge/bridge#bridge_bridge_claim_and_transfer_token>)<T>([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), clock: &[sui::clock::Clock](</references/framework/sui_sui/clock#sui_clock_Clock>), source_chain: u8, bridge_seq_num: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function execute_system_message​
[code] 
    **public** **fun** [execute_system_message](</references/framework/sui_bridge/bridge#bridge_bridge_execute_system_message>)([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), [message](</references/framework/sui_bridge/message#bridge_message>): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>), signatures: vector<vector<u8>>)
    
[/code]

## Function get_token_transfer_action_status​
[code] 
    **fun** [get_token_transfer_action_status](</references/framework/sui_bridge/bridge#bridge_bridge_get_token_transfer_action_status>)([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &[bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), source_chain: u8, bridge_seq_num: u64): u8
    
[/code]

## Function get_token_transfer_action_signatures​
[code] 
    **fun** [get_token_transfer_action_signatures](</references/framework/sui_bridge/bridge#bridge_bridge_get_token_transfer_action_signatures>)([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &[bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), source_chain: u8, bridge_seq_num: u64): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<vector<vector<u8>>>
    
[/code]

## Function load_inner​
[code] 
    **fun** [load_inner](</references/framework/sui_bridge/bridge#bridge_bridge_load_inner>)([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &[bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>)): &[bridge::bridge::BridgeInner](</references/framework/sui_bridge/bridge#bridge_bridge_BridgeInner>)
    
[/code]

## Function load_inner_mut​
[code] 
    **fun** [load_inner_mut](</references/framework/sui_bridge/bridge#bridge_bridge_load_inner_mut>)([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>)): &**mut** [bridge::bridge::BridgeInner](</references/framework/sui_bridge/bridge#bridge_bridge_BridgeInner>)
    
[/code]

## Function claim_token_internal​
[code] 
    **fun** [claim_token_internal](</references/framework/sui_bridge/bridge#bridge_bridge_claim_token_internal>)<T>([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), clock: &[sui::clock::Clock](</references/framework/sui_sui/clock#sui_clock_Clock>), source_chain: u8, bridge_seq_num: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>>, **address**)
    
[/code]

## Function send_token_internal​
[code] 
    **fun** [send_token_internal](</references/framework/sui_bridge/bridge#bridge_bridge_send_token_internal>)<T>(inner: &**mut** [bridge::bridge::BridgeInner](</references/framework/sui_bridge/bridge#bridge_bridge_BridgeInner>), target_chain: u8, token: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, [message](</references/framework/sui_bridge/message#bridge_message>): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>))
    
[/code]

## Function execute_emergency_op​
[code] 
    **fun** [execute_emergency_op](</references/framework/sui_bridge/bridge#bridge_bridge_execute_emergency_op>)(inner: &**mut** [bridge::bridge::BridgeInner](</references/framework/sui_bridge/bridge#bridge_bridge_BridgeInner>), payload: [bridge::message::EmergencyOp](</references/framework/sui_bridge/message#bridge_message_EmergencyOp>))
    
[/code]

## Function execute_update_bridge_limit​
[code] 
    **fun** [execute_update_bridge_limit](</references/framework/sui_bridge/bridge#bridge_bridge_execute_update_bridge_limit>)(inner: &**mut** [bridge::bridge::BridgeInner](</references/framework/sui_bridge/bridge#bridge_bridge_BridgeInner>), payload: [bridge::message::UpdateBridgeLimit](</references/framework/sui_bridge/message#bridge_message_UpdateBridgeLimit>))
    
[/code]

## Function execute_update_asset_price​
[code] 
    **fun** [execute_update_asset_price](</references/framework/sui_bridge/bridge#bridge_bridge_execute_update_asset_price>)(inner: &**mut** [bridge::bridge::BridgeInner](</references/framework/sui_bridge/bridge#bridge_bridge_BridgeInner>), payload: [bridge::message::UpdateAssetPrice](</references/framework/sui_bridge/message#bridge_message_UpdateAssetPrice>))
    
[/code]

## Function execute_add_tokens_on_sui​
[code] 
    **fun** [execute_add_tokens_on_sui](</references/framework/sui_bridge/bridge#bridge_bridge_execute_add_tokens_on_sui>)(inner: &**mut** [bridge::bridge::BridgeInner](</references/framework/sui_bridge/bridge#bridge_bridge_BridgeInner>), payload: [bridge::message::AddTokenOnSui](</references/framework/sui_bridge/message#bridge_message_AddTokenOnSui>))
    
[/code]

## Function get_current_seq_num_and_increment​
[code] 
    **fun** [get_current_seq_num_and_increment](</references/framework/sui_bridge/bridge#bridge_bridge_get_current_seq_num_and_increment>)([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &**mut** [bridge::bridge::BridgeInner](</references/framework/sui_bridge/bridge#bridge_bridge_BridgeInner>), msg_type: u8): u64
    
[/code]

## Function get_parsed_token_transfer_message​
[code] 
    **fun** [get_parsed_token_transfer_message](</references/framework/sui_bridge/bridge#bridge_bridge_get_parsed_token_transfer_message>)([bridge](</references/framework/sui_bridge/bridge#bridge_bridge>): &[bridge::bridge::Bridge](</references/framework/sui_bridge/bridge#bridge_bridge_Bridge>), source_chain: u8, bridge_seq_num: u64): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[bridge::message::ParsedTokenTransferMessage](</references/framework/sui_bridge/message#bridge_message_ParsedTokenTransferMessage>)>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_bridge/bridge.md>)

[Previoussui:bridge](</references/framework/sui_bridge>)[Nextchain_ids](</references/framework/sui_bridge/chain_ids>)
