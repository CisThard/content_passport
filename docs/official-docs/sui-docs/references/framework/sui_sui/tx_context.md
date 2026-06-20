<!-- Source: https://docs.sui.io/references/framework/sui_sui/tx_context -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * tx_context


# Module sui::tx_context
[code]
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    
[/code]

## Struct TxContext​

Information about the transaction currently being executed.  
This cannot be constructed by a transaction--it is a privileged object created by the VM and passed in to the entrypoint of the transaction as &**mut** [TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>).
[code] 
    **public** **struct** [TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>) **has** drop
    
[/code]

Click to openFields

[sender](</references/framework/sui_sui/tx_context#sui_tx_context_sender>): **address**
     The address of the user that signed the current transaction 
tx_hash: vector<u8>
     Hash of the current transaction 
[epoch](</references/framework/sui_sui/tx_context#sui_tx_context_epoch>): u64
     The current epoch number 
[epoch_timestamp_ms](</references/framework/sui_sui/tx_context#sui_tx_context_epoch_timestamp_ms>): u64
     Timestamp that the epoch started at 
ids_created: u64
     Counter recording the number of fresh id's created while executing this transaction. Always 0 at the start of a transaction 

## Function sender​

Return the address of the user that signed the current transaction
[code] 
    **public** **fun** [sender](</references/framework/sui_sui/tx_context#sui_tx_context_sender>)(_self: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): **address**
    
[/code]

## Function native_sender​
[code] 
    **fun** [native_sender](</references/framework/sui_sui/tx_context#sui_tx_context_native_sender>)(): **address**
    
[/code]

## Function digest​

Return the transaction digest (hash of transaction inputs).  
Please do not use as a source of randomness.
[code] 
    **public** **fun** [digest](</references/framework/sui_sui/tx_context#sui_tx_context_digest>)(self: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): &vector<u8>
    
[/code]

## Function epoch​

Return the current epoch
[code] 
    **public** **fun** [epoch](</references/framework/sui_sui/tx_context#sui_tx_context_epoch>)(_self: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): u64
    
[/code]

## Function native_epoch​
[code] 
    **fun** [native_epoch](</references/framework/sui_sui/tx_context#sui_tx_context_native_epoch>)(): u64
    
[/code]

## Function epoch_timestamp_ms​

Return the epoch start time as a unix timestamp in milliseconds.
[code] 
    **public** **fun** [epoch_timestamp_ms](</references/framework/sui_sui/tx_context#sui_tx_context_epoch_timestamp_ms>)(_self: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): u64
    
[/code]

## Function native_epoch_timestamp_ms​
[code] 
    **fun** [native_epoch_timestamp_ms](</references/framework/sui_sui/tx_context#sui_tx_context_native_epoch_timestamp_ms>)(): u64
    
[/code]

## Function sponsor​

Return the adress of the transaction sponsor or None if there was no sponsor.
[code] 
    **public** **fun** [sponsor](</references/framework/sui_sui/tx_context#sui_tx_context_sponsor>)(_self: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<**address** >
    
[/code]

## Function fresh_object_address​

Create an **address** that has not been used. As it is an object address, it will never occur as the address for a user.  
In other words, the generated address is a globally unique object ID.
[code] 
    **public** **fun** [fresh_object_address](</references/framework/sui_sui/tx_context#sui_tx_context_fresh_object_address>)(_ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): **address**
    
[/code]

## Function fresh_id​
[code] 
    **fun** [fresh_id](</references/framework/sui_sui/tx_context#sui_tx_context_fresh_id>)(): **address**
    
[/code]

## Function reference_gas_price​

Return the reference gas price in effect for the epoch the transaction is being executed in.
[code] 
    **public** **fun** [reference_gas_price](</references/framework/sui_sui/tx_context#sui_tx_context_reference_gas_price>)(_self: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): u64
    
[/code]

## Function native_rgp​
[code] 
    **fun** [native_rgp](</references/framework/sui_sui/tx_context#sui_tx_context_native_rgp>)(): u64
    
[/code]

## Function gas_price​

Return the gas price submitted for the current transaction.  
That is the value the user submitted with the transaction data.
[code] 
    **public** **fun** [gas_price](</references/framework/sui_sui/tx_context#sui_tx_context_gas_price>)(_self: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): u64
    
[/code]

## Function native_gas_price​
[code] 
    **fun** [native_gas_price](</references/framework/sui_sui/tx_context#sui_tx_context_native_gas_price>)(): u64
    
[/code]

## Function native_ids_created​
[code] 
    **fun** [native_ids_created](</references/framework/sui_sui/tx_context#sui_tx_context_native_ids_created>)(): u64
    
[/code]

## Function native_gas_budget​
[code] 
    **fun** [native_gas_budget](</references/framework/sui_sui/tx_context#sui_tx_context_native_gas_budget>)(): u64
    
[/code]

## Function option_sponsor​
[code] 
    **fun** [option_sponsor](</references/framework/sui_sui/tx_context#sui_tx_context_option_sponsor>)(): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<**address** >
    
[/code]

## Function native_sponsor​
[code] 
    **fun** [native_sponsor](</references/framework/sui_sui/tx_context#sui_tx_context_native_sponsor>)(): vector<**address** >
    
[/code]

## Function derive_id​

Native function for deriving an ID via hash(tx_hash || ids_created)
[code] 
    **fun** [derive_id](</references/framework/sui_sui/tx_context#sui_tx_context_derive_id>)(tx_hash: vector<u8>, ids_created: u64): **address**
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/tx_context.md>)

[Previoustransfer_policy](</references/framework/sui_sui/transfer_policy>)[Nexttypes](</references/framework/sui_sui/types>)
