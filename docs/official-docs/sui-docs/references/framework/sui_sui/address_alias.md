<!-- Source: https://docs.sui.io/references/framework/sui_sui/address_alias -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * address_alias


# Module sui::address_alias
[code]
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::derived_object](</references/framework/sui_sui/derived_object#sui_derived_object>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::vec_set](</references/framework/sui_sui/vec_set#sui_vec_set>);
    
[/code]

## Struct AddressAliasState​

Singleton shared object which manages creation of AddressAliases state.  
The actual alias configs are created as derived objects with this object as the parent.
[code] 
    **public** **struct** [AddressAliasState](</references/framework/sui_sui/address_alias#sui_address_alias_AddressAliasState>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
version: u64
    

## Struct AddressAliases​

Tracks the set of addresses allowed to act as a given sender.

An alias allows transactions signed by the alias address to act as the original address. For example, if address X sets an alias of address Y, then then a transaction signed by Y can set its sender address to X.
[code] 
    **public** **struct** [AddressAliases](</references/framework/sui_sui/address_alias#sui_address_alias_AddressAliases>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
aliases: [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<**address** >
    

## Struct AliasKey​

Internal key used for derivation of AddressAliases object addresses.
[code] 
    **public** **struct** [AliasKey](</references/framework/sui_sui/address_alias#sui_address_alias_AliasKey>) **has** **copy** , drop, store
    
[/code]

Click to openFields

0: **address**
    

## Constants​
[code] 
    #[error]
    **const** [ENotSystemAddress](</references/framework/sui_sui/address_alias#sui_address_alias_ENotSystemAddress>): vector<u8> = b"Only the system can [create](</references/framework/sui_sui/address_alias#sui_address_alias_create>) the alias state [object](</references/framework/sui_sui/object#sui_object>).";
    
[/code]
[code] 
    #[error]
    **const** [ENoSuchAlias](</references/framework/sui_sui/address_alias#sui_address_alias_ENoSuchAlias>): vector<u8> = b"Given alias does not exist.";
    
[/code]
[code] 
    #[error]
    **const** [EAliasAlreadyExists](</references/framework/sui_sui/address_alias#sui_address_alias_EAliasAlreadyExists>): vector<u8> = b"Alias already exists.";
    
[/code]
[code] 
    #[error]
    **const** [ECannotRemoveLastAlias](</references/framework/sui_sui/address_alias#sui_address_alias_ECannotRemoveLastAlias>): vector<u8> = b"Cannot [remove](</references/framework/sui_sui/address_alias#sui_address_alias_remove>) the last alias.";
    
[/code]
[code] 
    #[error]
    **const** [ETooManyAliases](</references/framework/sui_sui/address_alias#sui_address_alias_ETooManyAliases>): vector<u8> = b"The number of aliases exceeds the maximum allowed.";
    
[/code]
[code] 
    **const** [CURRENT_VERSION](</references/framework/sui_sui/address_alias#sui_address_alias_CURRENT_VERSION>): u64 = 0;
    
[/code]
[code] 
    **const** [MAX_ALIASES](</references/framework/sui_sui/address_alias#sui_address_alias_MAX_ALIASES>): u64 = 8;
    
[/code]

## Function create​

Create and share the AddressAliasState object. This function is called exactly once, when the address alias state object is first created.  
Can only be called by genesis or change_epoch transactions.
[code] 
    **fun** [create](</references/framework/sui_sui/address_alias#sui_address_alias_create>)(ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function enable​

Enables address alias configuration for the sender address.

By default, an address is its own alias. The provided [AddressAliases](</references/framework/sui_sui/address_alias#sui_address_alias_AddressAliases>) object can be used to change the set of allowed aliases after enabling.
[code] 
    **entry** **fun** [enable](</references/framework/sui_sui/address_alias#sui_address_alias_enable>)(address_alias_state: &**mut** [sui::address_alias::AddressAliasState](</references/framework/sui_sui/address_alias#sui_address_alias_AddressAliasState>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function add​

Adds the provided address to the set of aliases for the sender.
[code] 
    **entry** **fun** [add](</references/framework/sui_sui/address_alias#sui_address_alias_add>)(aliases: &**mut** [sui::address_alias::AddressAliases](</references/framework/sui_sui/address_alias#sui_address_alias_AddressAliases>), alias: **address**)
    
[/code]

## Function replace_all​

Overwrites the aliases for the sender's address with the given set.
[code] 
    **entry** **fun** [replace_all](</references/framework/sui_sui/address_alias#sui_address_alias_replace_all>)(aliases: &**mut** [sui::address_alias::AddressAliases](</references/framework/sui_sui/address_alias#sui_address_alias_AddressAliases>), new_aliases: vector<**address** >)
    
[/code]

## Function remove​

Removes the given alias from the set of aliases for the sender's address.
[code] 
    **entry** **fun** [remove](</references/framework/sui_sui/address_alias#sui_address_alias_remove>)(aliases: &**mut** [sui::address_alias::AddressAliases](</references/framework/sui_sui/address_alias#sui_address_alias_AddressAliases>), alias: **address**)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/address_alias.md>)

[Previousaddress](</references/framework/sui_sui/address>)[Nextauthenticator_state](</references/framework/sui_sui/authenticator_state>)
