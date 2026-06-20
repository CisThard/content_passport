<!-- Source: https://docs.sui.io/references/framework/sui_sui/clock -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * clock


# Module sui::clock

APIs for accessing time from move calls, via the [Clock](</references/framework/sui_sui/clock#sui_clock_Clock>): a unique shared object that is created at 0x6 during genesis.
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct Clock​

Singleton shared object that exposes time to Move calls. This object is found at address 0x6, and can only be read (accessed via an immutable reference) by entry functions.

Entry Functions that attempt to accept [Clock](</references/framework/sui_sui/clock#sui_clock_Clock>) by mutable reference or value will fail to verify, and honest validators will not sign or execute transactions that use [Clock](</references/framework/sui_sui/clock#sui_clock_Clock>) as an input parameter, unless it is passed by immutable reference.
[code] 
    **public** **struct** [Clock](</references/framework/sui_sui/clock#sui_clock_Clock>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[timestamp_ms](</references/framework/sui_sui/clock#sui_clock_timestamp_ms>): u64
     The clock's timestamp, which is set automatically by a system transaction every time consensus commits a schedule, or by sui::clock::increment_for_testing during testing. 

## Constants​

Sender is not @0x0 the system address.
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_sui/clock#sui_clock_ENotSystemAddress>): u64 = 0;
    
[/code]

## Function timestamp_ms​

The [clock](</references/framework/sui_sui/clock#sui_clock>)'s current timestamp as a running total of milliseconds since an arbitrary point in the past.
[code] 
    **public** **fun** [timestamp_ms](</references/framework/sui_sui/clock#sui_clock_timestamp_ms>)([clock](</references/framework/sui_sui/clock#sui_clock>): &[sui::clock::Clock](</references/framework/sui_sui/clock#sui_clock_Clock>)): u64
    
[/code]

## Function create​

Create and share the singleton Clock -- this function is called exactly once, during genesis.
[code] 
    **fun** [create](</references/framework/sui_sui/clock#sui_clock_create>)(ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function consensus_commit_prologue​
[code] 
    **fun** [consensus_commit_prologue](</references/framework/sui_sui/clock#sui_clock_consensus_commit_prologue>)([clock](</references/framework/sui_sui/clock#sui_clock>): &**mut** [sui::clock::Clock](</references/framework/sui_sui/clock#sui_clock_Clock>), [timestamp_ms](</references/framework/sui_sui/clock#sui_clock_timestamp_ms>): u64, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/clock.md>)

[Previousborrow](</references/framework/sui_sui/borrow>)[Nextcoin](</references/framework/sui_sui/coin>)
