<!-- Source: https://docs.sui.io/references/framework/sui_sui/accumulator_metadata -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * accumulator_metadata


# Module sui::accumulator_metadata
[code]
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::accumulator](</references/framework/sui_sui/accumulator#sui_accumulator>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::bag](</references/framework/sui_sui/bag#sui_bag>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct OwnerKey​

=== Accumulator metadata ===

Metadata system has been removed, but structs must remain for backwards compatibility.
[code] 
    **public** **struct** [OwnerKey](</references/framework/sui_sui/accumulator_metadata#sui_accumulator_metadata_OwnerKey>) **has** **copy** , drop, store
    
[/code]

Click to openFields

owner: **address**
    

## Struct Owner​

An owner field, to which all AccumulatorMetadata fields for the owner are attached.
[code] 
    **public** **struct** [Owner](</references/framework/sui_sui/accumulator_metadata#sui_accumulator_metadata_Owner>) **has** store
    
[/code]

Click to openFields

balances: [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     The individual balances owned by the owner. 
owner: **address**
    

## Struct MetadataKey​
[code] 
    **public** **struct** [MetadataKey](</references/framework/sui_sui/accumulator_metadata#sui_accumulator_metadata_MetadataKey>)<**phantom** T> **has** **copy** , drop, store
    
[/code]

## Struct Metadata​

A metadata field for a balance field with type T.
[code] 
    **public** **struct** [Metadata](</references/framework/sui_sui/accumulator_metadata#sui_accumulator_metadata_Metadata>)<**phantom** T> **has** store
    
[/code]

Click to openFields

fields: [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     Any per-balance fields we wish to add in the future. 

## Struct AccumulatorObjectCountKey​

=== Accumulator object count storage ===.  
Key for storing the net count of accumulator objects as a dynamic field on the accumulator root.
[code] 
    **public** **struct** [AccumulatorObjectCountKey](</references/framework/sui_sui/accumulator_metadata#sui_accumulator_metadata_AccumulatorObjectCountKey>) **has** **copy** , drop, store
    
[/code]

## Constants​
[code] 
    **const** [EInvariantViolation](</references/framework/sui_sui/accumulator_metadata#sui_accumulator_metadata_EInvariantViolation>): u64 = 0;
    
[/code]

## Function record_accumulator_object_changes​

Records changes in the net count of accumulator objects. Called by the barrier transaction as part of accumulator settlement.

This value is copied to the Sui system state object at end-of-epoch by the.  
WriteAccumulatorStorageCost transaction, for use in storage fund accounting. Copying once at end-of-epoch lets us avoid depending on the Sui system state object in the settlement barrier transaction.
[code] 
    **fun** [record_accumulator_object_changes](</references/framework/sui_sui/accumulator_metadata#sui_accumulator_metadata_record_accumulator_object_changes>)(accumulator_root: &**mut** [sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>), objects_created: u64, objects_destroyed: u64)
    
[/code]

## Function get_accumulator_object_count​

Returns the current count of accumulator objects stored as a dynamic field.
[code] 
    **fun** [get_accumulator_object_count](</references/framework/sui_sui/accumulator_metadata#sui_accumulator_metadata_get_accumulator_object_count>)(accumulator_root: &[sui::accumulator::AccumulatorRoot](</references/framework/sui_sui/accumulator#sui_accumulator_AccumulatorRoot>)): u64
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/accumulator_metadata.md>)

[Previousaccumulator](</references/framework/sui_sui/accumulator>)[Nextaccumulator_settlement](</references/framework/sui_sui/accumulator_settlement>)
