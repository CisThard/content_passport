<!-- Source: https://docs.sui.io/references/framework/sui_sui/borrow -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * borrow


# Module sui::borrow

A simple library that enables hot-potato-locked borrow mechanics.

With Programmable transactions, it is possible to borrow a value within a transaction, use it and put back in the end. Hot-potato [Borrow](</references/framework/sui_sui/borrow#sui_borrow_Borrow>) makes sure the object is returned and was not swapped for another one.
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    
[/code]

## Struct Referent​

An object wrapping a T and providing the borrow API.
[code] 
    **public** **struct** [Referent](</references/framework/sui_sui/borrow#sui_borrow_Referent>)<T: key, store> **has** store
    
[/code]

Click to openFields

id: **address**
    
value: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<T>
    

## Struct Borrow​

A hot potato making sure the object is put back once borrowed.
[code] 
    **public** **struct** [Borrow](</references/framework/sui_sui/borrow#sui_borrow_Borrow>)
    
[/code]

Click to openFields

ref: **address**
    
obj: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Constants​

The [Borrow](</references/framework/sui_sui/borrow#sui_borrow_Borrow>) does not match the [Referent](</references/framework/sui_sui/borrow#sui_borrow_Referent>).
[code] 
    **const** [EWrongBorrow](</references/framework/sui_sui/borrow#sui_borrow_EWrongBorrow>): u64 = 0;
    
[/code]

An attempt to swap the [Referent](</references/framework/sui_sui/borrow#sui_borrow_Referent>).value with another object of the same type.
[code] 
    **const** [EWrongValue](</references/framework/sui_sui/borrow#sui_borrow_EWrongValue>): u64 = 1;
    
[/code]

## Function new​

Create a new [Referent](</references/framework/sui_sui/borrow#sui_borrow_Referent>) struct
[code] 
    **public** **fun** [new](</references/framework/sui_sui/borrow#sui_borrow_new>)<T: key, store>(value: T, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::borrow::Referent](</references/framework/sui_sui/borrow#sui_borrow_Referent>)<T>
    
[/code]

## Function borrow​

Borrow the T from the [Referent](</references/framework/sui_sui/borrow#sui_borrow_Referent>), receiving the T and a [Borrow](</references/framework/sui_sui/borrow#sui_borrow_Borrow>) hot potato.
[code] 
    **public** **fun** [borrow](</references/framework/sui_sui/borrow#sui_borrow>)<T: key, store>(self: &**mut** [sui::borrow::Referent](</references/framework/sui_sui/borrow#sui_borrow_Referent>)<T>): (T, [sui::borrow::Borrow](</references/framework/sui_sui/borrow#sui_borrow_Borrow>))
    
[/code]

## Function put_back​

Put an object and the [Borrow](</references/framework/sui_sui/borrow#sui_borrow_Borrow>) hot potato back.
[code] 
    **public** **fun** [put_back](</references/framework/sui_sui/borrow#sui_borrow_put_back>)<T: key, store>(self: &**mut** [sui::borrow::Referent](</references/framework/sui_sui/borrow#sui_borrow_Referent>)<T>, value: T, [borrow](</references/framework/sui_sui/borrow#sui_borrow>): [sui::borrow::Borrow](</references/framework/sui_sui/borrow#sui_borrow_Borrow>))
    
[/code]

## Function destroy​

Unpack the [Referent](</references/framework/sui_sui/borrow#sui_borrow_Referent>) struct and return the value.
[code] 
    **public** **fun** [destroy](</references/framework/sui_sui/borrow#sui_borrow_destroy>)<T: key, store>(self: [sui::borrow::Referent](</references/framework/sui_sui/borrow#sui_borrow_Referent>)<T>): T
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/borrow.md>)

[Previousbls12381](</references/framework/sui_sui/bls12381>)[Nextclock](</references/framework/sui_sui/clock>)
