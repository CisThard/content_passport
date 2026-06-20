<!-- Source: https://docs.sui.io/references/framework/sui_sui/accumulator_settlement -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * accumulator_settlement


# Module sui::accumulator_settlement
[code]
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::accumulator](</references/framework/sui_sui/accumulator#sui_accumulator>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::bcs](</references/framework/sui_sui/bcs#sui_bcs>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::hash](</references/framework/sui_sui/hash#sui_hash>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct EventStreamHead​
[code] 
    **public** **struct** [EventStreamHead](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement_EventStreamHead>) **has** store
    
[/code]

Click to openFields

mmr: vector<u256>
     Merkle Mountain Range of all events in the stream. 
checkpoint_seq: u64
     Checkpoint sequence number at which the event stream was written. 
num_events: u64
     Number of events in the stream. 

## Constants​
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement_ENotSystemAddress>): u64 = 0;
    
[/code]
[code] 
    **const** [EInvalidSplitAmount](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement_EInvalidSplitAmount>): u64 = 1;
    
[/code]

## Function settlement_prologue​

Called by settlement transactions to ensure that the settlement transaction has a unique digest.
[code] 
    **fun** [settlement_prologue](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement_settlement_prologue>)(_accumulator_root: &**mut** [sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>), _epoch: u64, _checkpoint_height: u64, _idx: u64, input_sui: u64, output_sui: u64, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function settle_u128​
[code] 
    **fun** [settle_u128](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement_settle_u128>)<T>(accumulator_root: &**mut** [sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>), owner: **address** , merge: u128, split: u128, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function record_settlement_sui_conservation​

Called by the settlement transaction to track conservation of SUI.
[code] 
    **fun** [record_settlement_sui_conservation](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement_record_settlement_sui_conservation>)(input_sui: u64, output_sui: u64)
    
[/code]

## Function add_to_mmr​
[code] 
    **fun** [add_to_mmr](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement_add_to_mmr>)(new_val: u256, mmr: &**mut** vector<u256>)
    
[/code]

## Function u256_from_bytes​
[code] 
    **fun** [u256_from_bytes](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement_u256_from_bytes>)(bytes: vector<u8>): u256
    
[/code]

## Function hash_two_to_one_u256​
[code] 
    **fun** [hash_two_to_one_u256](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement_hash_two_to_one_u256>)(left: u256, right: u256): u256
    
[/code]

## Function new_stream_head​
[code] 
    **fun** [new_stream_head](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement_new_stream_head>)(new_root: u256, event_count_delta: u64, checkpoint_seq: u64): [sui::accumulator_settlement::EventStreamHead](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement_EventStreamHead>)
    
[/code]

## Function settle_events​
[code] 
    **fun** [settle_events](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement_settle_events>)(accumulator_root: &**mut** [sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>), stream_id: **address** , new_root: u256, event_count_delta: u64, checkpoint_seq: u64, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/accumulator_settlement.md>)

[Previousaccumulator_metadata](</references/framework/sui_sui/accumulator_metadata>)[Nextaddress](</references/framework/sui_sui/address>)
