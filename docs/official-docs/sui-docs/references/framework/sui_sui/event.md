<!-- Source: https://docs.sui.io/references/framework/sui_sui/event -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * event


# Module sui::event

Events module. Defines the [sui::event::emit](</references/framework/sui_sui/event#sui_event_emit>) function which creates and sends a custom MoveEvent as a part of the effects certificate of the transaction.

Every MoveEvent has the following properties:

  * sender
  * type signature (T)
  * event data (the value of T)
  * timestamp (local to a node)
  * transaction digest


Example:
[code] 
    module my::marketplace \{  
       use sui::event;  
       /* ... */  
       struct ItemPurchased has copy, drop {  
         item_id: ID, buyer: address  
       \}  
       entry fun buy(/* .... */) \{  
          /* ... */  
          event::emit(ItemPurchased { item_id: ..., buyer: .... \})  
       }  
    }  
    
[/code]
[code] 
    **use** [std::address](</references/framework/sui_std/address#std_address>);
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::type_name](</references/framework/sui_std/type_name#std_type_name>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::accumulator](</references/framework/sui_sui/accumulator#sui_accumulator>);
    **use** [sui::accumulator_settlement](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement>);
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

## Function emit​

Emit a custom Move event, sending the data offchain.

Used for creating custom indexes and tracking onchain activity in a way that suits a specific application the most.

The type T is the main way to index the event, and can contain phantom parameters, eg [emit](</references/framework/sui_sui/event#sui_event_emit>)(MyEvent<**phantom** T>).
[code] 
    **public** **fun** [emit](</references/framework/sui_sui/event#sui_event_emit>)<T: **copy** , drop>([event](</references/framework/sui_sui/event#sui_event>): T)
    
[/code]

## Function emit_authenticated​

Emits a custom Move event which can be authenticated by a light client.

This method emits the authenticated event to the event stream for the Move package that defines the event type T.  
Only the package that defines the type T can emit authenticated events to this stream.
[code] 
    **public** **fun** [emit_authenticated](</references/framework/sui_sui/event#sui_event_emit_authenticated>)<T: **copy** , drop>([event](</references/framework/sui_sui/event#sui_event>): T)
    
[/code]

## Function emit_authenticated_impl​
[code] 
    **fun** [emit_authenticated_impl](</references/framework/sui_sui/event#sui_event_emit_authenticated_impl>)<StreamHeadT, T: **copy** , drop>(accumulator_id: **address** , stream: **address** , [event](</references/framework/sui_sui/event#sui_event>): T)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/event.md>)

[Previoused25519](</references/framework/sui_sui/ed25519>)[Nextfunds_accumulator](</references/framework/sui_sui/funds_accumulator>)
