<!-- Source: https://docs.sui.io/references/framework/sui_bridge/message -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [bridge](</references/framework/sui_bridge>)
  * message


# Module bridge::message
[code]
    **use** [bridge::chain_ids](</references/framework/sui_bridge/chain_ids#bridge_chain_ids>);
    **use** [bridge::message_types](</references/framework/sui_bridge/message_types#bridge_message_types>);
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::bcs](</references/framework/sui_sui/bcs#sui_bcs>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    
[/code]

## Struct BridgeMessage​
[code] 
    **public** **struct** [BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>) **has** **copy** , drop, store
    
[/code]

Click to openFields

[message_type](</references/framework/sui_bridge/message#bridge_message_message_type>): u8
    
[message_version](</references/framework/sui_bridge/message#bridge_message_message_version>): u8
    
[seq_num](</references/framework/sui_bridge/message#bridge_message_seq_num>): u64
    
[source_chain](</references/framework/sui_bridge/message#bridge_message_source_chain>): u8
    
[payload](</references/framework/sui_bridge/message#bridge_message_payload>): vector<u8>
    

## Struct BridgeMessageKey​
[code] 
    **public** **struct** [BridgeMessageKey](</references/framework/sui_bridge/message#bridge_message_BridgeMessageKey>) **has** **copy** , drop, store
    
[/code]

Click to openFields

[source_chain](</references/framework/sui_bridge/message#bridge_message_source_chain>): u8
    
[message_type](</references/framework/sui_bridge/message#bridge_message_message_type>): u8
    
bridge_seq_num: u64
    

## Struct TokenTransferPayload​
[code] 
    **public** **struct** [TokenTransferPayload](</references/framework/sui_bridge/message#bridge_message_TokenTransferPayload>) **has** drop
    
[/code]

Click to openFields

sender_address: vector<u8>
    
target_chain: u8
    
target_address: vector<u8>
    
[token_type](</references/framework/sui_bridge/message#bridge_message_token_type>): u8
    
amount: u64
    

## Struct TokenTransferPayloadV2​
[code] 
    **public** **struct** [TokenTransferPayloadV2](</references/framework/sui_bridge/message#bridge_message_TokenTransferPayloadV2>) **has** drop
    
[/code]

Click to openFields

sender_address: vector<u8>
    
target_chain: u8
    
target_address: vector<u8>
    
[token_type](</references/framework/sui_bridge/message#bridge_message_token_type>): u8
    
amount: u64
    
[timestamp_ms](</references/framework/sui_bridge/message#bridge_message_timestamp_ms>): u64
    

## Struct EmergencyOp​
[code] 
    **public** **struct** [EmergencyOp](</references/framework/sui_bridge/message#bridge_message_EmergencyOp>) **has** drop
    
[/code]

Click to openFields

op_type: u8
    

## Struct Blocklist​
[code] 
    **public** **struct** [Blocklist](</references/framework/sui_bridge/message#bridge_message_Blocklist>) **has** drop
    
[/code]

Click to openFields

[blocklist_type](</references/framework/sui_bridge/message#bridge_message_blocklist_type>): u8
    
validator_eth_addresses: vector<vector<u8>>
    

## Struct UpdateBridgeLimit​
[code] 
    **public** **struct** [UpdateBridgeLimit](</references/framework/sui_bridge/message#bridge_message_UpdateBridgeLimit>) **has** drop
    
[/code]

Click to openFields

receiving_chain: u8
    
sending_chain: u8
    
limit: u64
    

## Struct UpdateAssetPrice​
[code] 
    **public** **struct** [UpdateAssetPrice](</references/framework/sui_bridge/message#bridge_message_UpdateAssetPrice>) **has** drop
    
[/code]

Click to openFields

token_id: u8
    
new_price: u64
    

## Struct AddTokenOnSui​
[code] 
    **public** **struct** [AddTokenOnSui](</references/framework/sui_bridge/message#bridge_message_AddTokenOnSui>) **has** drop
    
[/code]

Click to openFields

native_token: bool
    
[token_ids](</references/framework/sui_bridge/message#bridge_message_token_ids>): vector<u8>
    
[token_type_names](</references/framework/sui_bridge/message#bridge_message_token_type_names>): vector<[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)>
    
[token_prices](</references/framework/sui_bridge/message#bridge_message_token_prices>): vector<u64>
    

## Struct ParsedTokenTransferMessage​
[code] 
    **public** **struct** [ParsedTokenTransferMessage](</references/framework/sui_bridge/message#bridge_message_ParsedTokenTransferMessage>) **has** drop
    
[/code]

Click to openFields

[message_version](</references/framework/sui_bridge/message#bridge_message_message_version>): u8
    
[seq_num](</references/framework/sui_bridge/message#bridge_message_seq_num>): u64
    
[source_chain](</references/framework/sui_bridge/message#bridge_message_source_chain>): u8
    
[payload](</references/framework/sui_bridge/message#bridge_message_payload>): vector<u8>
    
parsed_payload: [bridge::message::TokenTransferPayload](</references/framework/sui_bridge/message#bridge_message_TokenTransferPayload>)
    

## Constants​
[code] 
    **const** [CURRENT_MESSAGE_VERSION](</references/framework/sui_bridge/message#bridge_message_CURRENT_MESSAGE_VERSION>): u8 = 1;
    
[/code]
[code] 
    **const** [TOKEN_TRANSFER_MESSAGE_VERSION_V2](</references/framework/sui_bridge/message#bridge_message_TOKEN_TRANSFER_MESSAGE_VERSION_V2>): u8 = 2;
    
[/code]
[code] 
    **const** [ECDSA_ADDRESS_LENGTH](</references/framework/sui_bridge/message#bridge_message_ECDSA_ADDRESS_LENGTH>): u64 = 20;
    
[/code]
[code] 
    **const** [ETrailingBytes](</references/framework/sui_bridge/message#bridge_message_ETrailingBytes>): u64 = 0;
    
[/code]
[code] 
    **const** [EInvalidAddressLength](</references/framework/sui_bridge/message#bridge_message_EInvalidAddressLength>): u64 = 1;
    
[/code]
[code] 
    **const** [EEmptyList](</references/framework/sui_bridge/message#bridge_message_EEmptyList>): u64 = 2;
    
[/code]
[code] 
    **const** [EInvalidMessageType](</references/framework/sui_bridge/message#bridge_message_EInvalidMessageType>): u64 = 3;
    
[/code]
[code] 
    **const** [EInvalidEmergencyOpType](</references/framework/sui_bridge/message#bridge_message_EInvalidEmergencyOpType>): u64 = 4;
    
[/code]
[code] 
    **const** [EInvalidPayloadLength](</references/framework/sui_bridge/message#bridge_message_EInvalidPayloadLength>): u64 = 5;
    
[/code]
[code] 
    **const** [EMustBeTokenMessage](</references/framework/sui_bridge/message#bridge_message_EMustBeTokenMessage>): u64 = 6;
    
[/code]
[code] 
    **const** [EInvalidMessageVersion](</references/framework/sui_bridge/message#bridge_message_EInvalidMessageVersion>): u64 = 7;
    
[/code]
[code] 
    **const** [PAUSE](</references/framework/sui_bridge/message#bridge_message_PAUSE>): u8 = 0;
    
[/code]
[code] 
    **const** [UNPAUSE](</references/framework/sui_bridge/message#bridge_message_UNPAUSE>): u8 = 1;
    
[/code]

## Function extract_token_bridge_payload​
[code] 
    **public** **fun** [extract_token_bridge_payload](</references/framework/sui_bridge/message#bridge_message_extract_token_bridge_payload>)([message](</references/framework/sui_bridge/message#bridge_message>): &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): [bridge::message::TokenTransferPayload](</references/framework/sui_bridge/message#bridge_message_TokenTransferPayload>)
    
[/code]

## Function extract_token_bridge_payload_v2​
[code] 
    **public** **fun** [extract_token_bridge_payload_v2](</references/framework/sui_bridge/message#bridge_message_extract_token_bridge_payload_v2>)([message](</references/framework/sui_bridge/message#bridge_message>): &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): [bridge::message::TokenTransferPayloadV2](</references/framework/sui_bridge/message#bridge_message_TokenTransferPayloadV2>)
    
[/code]

## Function to_token_payload_v1​
[code] 
    **public**(package) **fun** [to_token_payload_v1](</references/framework/sui_bridge/message#bridge_message_to_token_payload_v1>)(self: &[bridge::message::TokenTransferPayloadV2](</references/framework/sui_bridge/message#bridge_message_TokenTransferPayloadV2>)): [bridge::message::TokenTransferPayload](</references/framework/sui_bridge/message#bridge_message_TokenTransferPayload>)
    
[/code]

## Function extract_emergency_op_payload​

Emergency op payload is just a single byte
[code] 
    **public** **fun** [extract_emergency_op_payload](</references/framework/sui_bridge/message#bridge_message_extract_emergency_op_payload>)([message](</references/framework/sui_bridge/message#bridge_message>): &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): [bridge::message::EmergencyOp](</references/framework/sui_bridge/message#bridge_message_EmergencyOp>)
    
[/code]

## Function extract_blocklist_payload​
[code] 
    **public** **fun** [extract_blocklist_payload](</references/framework/sui_bridge/message#bridge_message_extract_blocklist_payload>)([message](</references/framework/sui_bridge/message#bridge_message>): &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): [bridge::message::Blocklist](</references/framework/sui_bridge/message#bridge_message_Blocklist>)
    
[/code]

## Function extract_update_bridge_limit​
[code] 
    **public** **fun** [extract_update_bridge_limit](</references/framework/sui_bridge/message#bridge_message_extract_update_bridge_limit>)([message](</references/framework/sui_bridge/message#bridge_message>): &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): [bridge::message::UpdateBridgeLimit](</references/framework/sui_bridge/message#bridge_message_UpdateBridgeLimit>)
    
[/code]

## Function extract_update_asset_price​
[code] 
    **public** **fun** [extract_update_asset_price](</references/framework/sui_bridge/message#bridge_message_extract_update_asset_price>)([message](</references/framework/sui_bridge/message#bridge_message>): &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): [bridge::message::UpdateAssetPrice](</references/framework/sui_bridge/message#bridge_message_UpdateAssetPrice>)
    
[/code]

## Function extract_add_tokens_on_sui​
[code] 
    **public** **fun** [extract_add_tokens_on_sui](</references/framework/sui_bridge/message#bridge_message_extract_add_tokens_on_sui>)([message](</references/framework/sui_bridge/message#bridge_message>): &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): [bridge::message::AddTokenOnSui](</references/framework/sui_bridge/message#bridge_message_AddTokenOnSui>)
    
[/code]

## Function serialize_message​
[code] 
    **public** **fun** [serialize_message](</references/framework/sui_bridge/message#bridge_message_serialize_message>)([message](</references/framework/sui_bridge/message#bridge_message>): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): vector<u8>
    
[/code]

## Function create_token_bridge_message​

Token Transfer Message Format: [message_type: u8] [version:u8] [nonce:u64] [source_chain: u8] [sender_address_length:u8] [sender_address: byte[]] [target_chain:u8] [target_address_length:u8] [target_address: byte[]] [token_type:u8] [amount:u64]
[code] 
    **public** **fun** [create_token_bridge_message](</references/framework/sui_bridge/message#bridge_message_create_token_bridge_message>)([source_chain](</references/framework/sui_bridge/message#bridge_message_source_chain>): u8, [seq_num](</references/framework/sui_bridge/message#bridge_message_seq_num>): u64, sender_address: vector<u8>, target_chain: u8, target_address: vector<u8>, [token_type](</references/framework/sui_bridge/message#bridge_message_token_type>): u8, amount: u64): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)
    
[/code]

## Function create_token_bridge_message_v2​

Token Transfer Message Format: [message_type: u8] [version:u8] [nonce:u64] [source_chain: u8] [sender_address_length:u8] [sender_address: byte[]] [target_chain:u8] [target_address_length:u8] [target_address: byte[]] [token_type:u8] [amount:u64] [timestamp:u64]
[code] 
    **public** **fun** [create_token_bridge_message_v2](</references/framework/sui_bridge/message#bridge_message_create_token_bridge_message_v2>)([source_chain](</references/framework/sui_bridge/message#bridge_message_source_chain>): u8, [seq_num](</references/framework/sui_bridge/message#bridge_message_seq_num>): u64, sender_address: vector<u8>, target_chain: u8, target_address: vector<u8>, [token_type](</references/framework/sui_bridge/message#bridge_message_token_type>): u8, amount: u64, timestamp: u64): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)
    
[/code]

## Function create_emergency_op_message​

Emergency Op Message Format: [message_type: u8] [version:u8] [nonce:u64] [chain_id: u8] [op_type: u8]
[code] 
    **public** **fun** [create_emergency_op_message](</references/framework/sui_bridge/message#bridge_message_create_emergency_op_message>)([source_chain](</references/framework/sui_bridge/message#bridge_message_source_chain>): u8, [seq_num](</references/framework/sui_bridge/message#bridge_message_seq_num>): u64, op_type: u8): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)
    
[/code]

## Function create_blocklist_message​

Blocklist Message Format: [message_type: u8] [version:u8] [nonce:u64] [chain_id: u8] [blocklist_type: u8] [validator_length: u8] [validator_ecdsa_addresses: byte[][]]
[code] 
    **public** **fun** [create_blocklist_message](</references/framework/sui_bridge/message#bridge_message_create_blocklist_message>)([source_chain](</references/framework/sui_bridge/message#bridge_message_source_chain>): u8, [seq_num](</references/framework/sui_bridge/message#bridge_message_seq_num>): u64, [blocklist_type](</references/framework/sui_bridge/message#bridge_message_blocklist_type>): u8, validator_ecdsa_addresses: vector<vector<u8>>): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)
    
[/code]

## Function create_update_bridge_limit_message​

Update bridge limit Message Format: [message_type: u8] [version:u8] [nonce:u64] [receiving_chain_id: u8] [sending_chain_id: u8] [new_limit: u64]
[code] 
    **public** **fun** [create_update_bridge_limit_message](</references/framework/sui_bridge/message#bridge_message_create_update_bridge_limit_message>)(receiving_chain: u8, [seq_num](</references/framework/sui_bridge/message#bridge_message_seq_num>): u64, sending_chain: u8, new_limit: u64): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)
    
[/code]

## Function create_update_asset_price_message​

Update asset price message [message_type: u8] [version:u8] [nonce:u64] [chain_id: u8] [token_id: u8] [new_price:u64]
[code] 
    **public** **fun** [create_update_asset_price_message](</references/framework/sui_bridge/message#bridge_message_create_update_asset_price_message>)(token_id: u8, [source_chain](</references/framework/sui_bridge/message#bridge_message_source_chain>): u8, [seq_num](</references/framework/sui_bridge/message#bridge_message_seq_num>): u64, new_price: u64): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)
    
[/code]

## Function create_add_tokens_on_sui_message​

Update Sui token message [message_type:u8] [version:u8] [nonce:u64] [chain_id: u8] [native_token:bool] [token_ids:vector] [token_type_name:vector] [token_prices:vector]
[code] 
    **public** **fun** [create_add_tokens_on_sui_message](</references/framework/sui_bridge/message#bridge_message_create_add_tokens_on_sui_message>)([source_chain](</references/framework/sui_bridge/message#bridge_message_source_chain>): u8, [seq_num](</references/framework/sui_bridge/message#bridge_message_seq_num>): u64, native_token: bool, [token_ids](</references/framework/sui_bridge/message#bridge_message_token_ids>): vector<u8>, type_names: vector<[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)>, [token_prices](</references/framework/sui_bridge/message#bridge_message_token_prices>): vector<u64>): [bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)
    
[/code]

## Function create_key​
[code] 
    **public** **fun** [create_key](</references/framework/sui_bridge/message#bridge_message_create_key>)([source_chain](</references/framework/sui_bridge/message#bridge_message_source_chain>): u8, [message_type](</references/framework/sui_bridge/message#bridge_message_message_type>): u8, bridge_seq_num: u64): [bridge::message::BridgeMessageKey](</references/framework/sui_bridge/message#bridge_message_BridgeMessageKey>)
    
[/code]

## Function key​
[code] 
    **public** **fun** [key](</references/framework/sui_bridge/message#bridge_message_key>)(self: &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): [bridge::message::BridgeMessageKey](</references/framework/sui_bridge/message#bridge_message_BridgeMessageKey>)
    
[/code]

## Function message_version​
[code] 
    **public** **fun** [message_version](</references/framework/sui_bridge/message#bridge_message_message_version>)(self: &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): u8
    
[/code]

## Function message_type​
[code] 
    **public** **fun** [message_type](</references/framework/sui_bridge/message#bridge_message_message_type>)(self: &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): u8
    
[/code]

## Function seq_num​
[code] 
    **public** **fun** [seq_num](</references/framework/sui_bridge/message#bridge_message_seq_num>)(self: &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): u64
    
[/code]

## Function source_chain​
[code] 
    **public** **fun** [source_chain](</references/framework/sui_bridge/message#bridge_message_source_chain>)(self: &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): u8
    
[/code]

## Function payload​
[code] 
    **public** **fun** [payload](</references/framework/sui_bridge/message#bridge_message_payload>)(self: &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): vector<u8>
    
[/code]

## Function token_target_chain​
[code] 
    **public** **fun** [token_target_chain](</references/framework/sui_bridge/message#bridge_message_token_target_chain>)(self: &[bridge::message::TokenTransferPayload](</references/framework/sui_bridge/message#bridge_message_TokenTransferPayload>)): u8
    
[/code]

## Function token_target_address​
[code] 
    **public** **fun** [token_target_address](</references/framework/sui_bridge/message#bridge_message_token_target_address>)(self: &[bridge::message::TokenTransferPayload](</references/framework/sui_bridge/message#bridge_message_TokenTransferPayload>)): vector<u8>
    
[/code]

## Function token_type​
[code] 
    **public** **fun** [token_type](</references/framework/sui_bridge/message#bridge_message_token_type>)(self: &[bridge::message::TokenTransferPayload](</references/framework/sui_bridge/message#bridge_message_TokenTransferPayload>)): u8
    
[/code]

## Function token_amount​
[code] 
    **public** **fun** [token_amount](</references/framework/sui_bridge/message#bridge_message_token_amount>)(self: &[bridge::message::TokenTransferPayload](</references/framework/sui_bridge/message#bridge_message_TokenTransferPayload>)): u64
    
[/code]

## Function timestamp_ms​
[code] 
    **public** **fun** [timestamp_ms](</references/framework/sui_bridge/message#bridge_message_timestamp_ms>)(self: &[bridge::message::TokenTransferPayloadV2](</references/framework/sui_bridge/message#bridge_message_TokenTransferPayloadV2>)): u64
    
[/code]

## Function emergency_op_type​
[code] 
    **public** **fun** [emergency_op_type](</references/framework/sui_bridge/message#bridge_message_emergency_op_type>)(self: &[bridge::message::EmergencyOp](</references/framework/sui_bridge/message#bridge_message_EmergencyOp>)): u8
    
[/code]

## Function blocklist_type​
[code] 
    **public** **fun** [blocklist_type](</references/framework/sui_bridge/message#bridge_message_blocklist_type>)(self: &[bridge::message::Blocklist](</references/framework/sui_bridge/message#bridge_message_Blocklist>)): u8
    
[/code]

## Function blocklist_validator_addresses​
[code] 
    **public** **fun** [blocklist_validator_addresses](</references/framework/sui_bridge/message#bridge_message_blocklist_validator_addresses>)(self: &[bridge::message::Blocklist](</references/framework/sui_bridge/message#bridge_message_Blocklist>)): &vector<vector<u8>>
    
[/code]

## Function update_bridge_limit_payload_sending_chain​
[code] 
    **public** **fun** [update_bridge_limit_payload_sending_chain](</references/framework/sui_bridge/message#bridge_message_update_bridge_limit_payload_sending_chain>)(self: &[bridge::message::UpdateBridgeLimit](</references/framework/sui_bridge/message#bridge_message_UpdateBridgeLimit>)): u8
    
[/code]

## Function update_bridge_limit_payload_receiving_chain​
[code] 
    **public** **fun** [update_bridge_limit_payload_receiving_chain](</references/framework/sui_bridge/message#bridge_message_update_bridge_limit_payload_receiving_chain>)(self: &[bridge::message::UpdateBridgeLimit](</references/framework/sui_bridge/message#bridge_message_UpdateBridgeLimit>)): u8
    
[/code]

## Function update_bridge_limit_payload_limit​
[code] 
    **public** **fun** [update_bridge_limit_payload_limit](</references/framework/sui_bridge/message#bridge_message_update_bridge_limit_payload_limit>)(self: &[bridge::message::UpdateBridgeLimit](</references/framework/sui_bridge/message#bridge_message_UpdateBridgeLimit>)): u64
    
[/code]

## Function update_asset_price_payload_token_id​
[code] 
    **public** **fun** [update_asset_price_payload_token_id](</references/framework/sui_bridge/message#bridge_message_update_asset_price_payload_token_id>)(self: &[bridge::message::UpdateAssetPrice](</references/framework/sui_bridge/message#bridge_message_UpdateAssetPrice>)): u8
    
[/code]

## Function update_asset_price_payload_new_price​
[code] 
    **public** **fun** [update_asset_price_payload_new_price](</references/framework/sui_bridge/message#bridge_message_update_asset_price_payload_new_price>)(self: &[bridge::message::UpdateAssetPrice](</references/framework/sui_bridge/message#bridge_message_UpdateAssetPrice>)): u64
    
[/code]

## Function is_native​
[code] 
    **public** **fun** [is_native](</references/framework/sui_bridge/message#bridge_message_is_native>)(self: &[bridge::message::AddTokenOnSui](</references/framework/sui_bridge/message#bridge_message_AddTokenOnSui>)): bool
    
[/code]

## Function token_ids​
[code] 
    **public** **fun** [token_ids](</references/framework/sui_bridge/message#bridge_message_token_ids>)(self: &[bridge::message::AddTokenOnSui](</references/framework/sui_bridge/message#bridge_message_AddTokenOnSui>)): vector<u8>
    
[/code]

## Function token_type_names​
[code] 
    **public** **fun** [token_type_names](</references/framework/sui_bridge/message#bridge_message_token_type_names>)(self: &[bridge::message::AddTokenOnSui](</references/framework/sui_bridge/message#bridge_message_AddTokenOnSui>)): vector<[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)>
    
[/code]

## Function token_prices​
[code] 
    **public** **fun** [token_prices](</references/framework/sui_bridge/message#bridge_message_token_prices>)(self: &[bridge::message::AddTokenOnSui](</references/framework/sui_bridge/message#bridge_message_AddTokenOnSui>)): vector<u64>
    
[/code]

## Function emergency_op_pause​
[code] 
    **public** **fun** [emergency_op_pause](</references/framework/sui_bridge/message#bridge_message_emergency_op_pause>)(): u8
    
[/code]

## Function emergency_op_unpause​
[code] 
    **public** **fun** [emergency_op_unpause](</references/framework/sui_bridge/message#bridge_message_emergency_op_unpause>)(): u8
    
[/code]

## Function required_voting_power​

Return the required signature threshold for the message, values are voting power in the scale of 10000
[code] 
    **public** **fun** [required_voting_power](</references/framework/sui_bridge/message#bridge_message_required_voting_power>)(self: &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): u64
    
[/code]

## Function to_parsed_token_transfer_message​
[code] 
    **public** **fun** [to_parsed_token_transfer_message](</references/framework/sui_bridge/message#bridge_message_to_parsed_token_transfer_message>)([message](</references/framework/sui_bridge/message#bridge_message>): &[bridge::message::BridgeMessage](</references/framework/sui_bridge/message#bridge_message_BridgeMessage>)): [bridge::message::ParsedTokenTransferMessage](</references/framework/sui_bridge/message#bridge_message_ParsedTokenTransferMessage>)
    
[/code]

## Function token_transfer_message_version​
[code] 
    **public** **fun** [token_transfer_message_version](</references/framework/sui_bridge/message#bridge_message_token_transfer_message_version>)(): u8
    
[/code]

## Function reverse_bytes​
[code] 
    **fun** [reverse_bytes](</references/framework/sui_bridge/message#bridge_message_reverse_bytes>)(bytes: vector<u8>): vector<u8>
    
[/code]

## Function peel_u64_be​
[code] 
    **fun** [peel_u64_be](</references/framework/sui_bridge/message#bridge_message_peel_u64_be>)(bcs: &**mut** [sui::bcs::BCS](</references/framework/sui_sui/bcs#sui_bcs_BCS>)): u64
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_bridge/message.md>)

[Previouslimiter](</references/framework/sui_bridge/limiter>)[Nextmessage_types](</references/framework/sui_bridge/message_types>)
