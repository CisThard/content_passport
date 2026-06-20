<!-- Source: https://docs.sui.io/references/framework/sui_sui/kiosk_extension -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * kiosk_extension


On this page

# Module sui::kiosk_extension

This module implements the Kiosk Extensions functionality. It allows exposing previously protected (only-owner) methods to third-party apps.

A Kiosk Extension is a module that implements any functionality on top of the Kiosk without discarding nor blocking the base. Given that Kiosk itself is a trading primitive, most of the extensions are expected to be related to trading. However, there's no limit to what can be built using the [kiosk_extension](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension>) module, as it gives certain benefits such as using Kiosk as the storage for any type of data / assets.

#### Flow:​

  * An extension can only be installed by the Kiosk Owner and requires an authorization via the KioskOwnerCap.
  * When installed, the extension is given a permission bitmap that allows it to perform certain protected actions (eg [place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_place>), [lock](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_lock>)). However, it is possible to install an extension that does not have any permissions.
  * Kiosk Owner can [disable](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_disable>) the extension at any time, which prevents it from performing any protected actions. The storage is still available to the extension until it is completely removed.
  * A disabled extension can be [enable](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_enable>)d at any time giving the permissions back to the extension.
  * An extension permissions follow the all-or-nothing policy. Either all of the requested permissions are granted or none of them (can't install).


#### Examples:​

  * An Auction extension can utilize the storage to store Auction-related data while utilizing the same Kiosk object that the items are stored in.
  * A Marketplace extension that implements custom events and fees for the default trading functionality.


#### Notes:​

  * Trading functionality can utilize the PurchaseCap to build a custom logic around the purchase flow. However, it should be carefully managed to prevent asset locking.
  * [kiosk_extension](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension>) is a friend module to [kiosk](</references/framework/sui_sui/kiosk#sui_kiosk>) and has access to its internal functions (such as place_internal and lock_internal to implement custom authorization scheme for [place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_place>) and [lock](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_lock>) respectively).


[code] 
    **use** [std::address](</references/framework/sui_std/address#std_address>);
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::internal](</references/framework/sui_std/internal#std_internal>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::type_name](</references/framework/sui_std/type_name#std_type_name>);
    **use** [std::u128](</references/framework/sui_std/u128#std_u128>);
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
    **use** [sui::event](</references/framework/sui_sui/event#sui_event>);
    **use** [sui::funds_accumulator](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator>);
    **use** [sui::hash](</references/framework/sui_sui/hash#sui_hash>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::kiosk](</references/framework/sui_sui/kiosk#sui_kiosk>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::package](</references/framework/sui_sui/package#sui_package>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::protocol_config](</references/framework/sui_sui/protocol_config#sui_protocol_config>);
    **use** [sui::sui](</references/framework/sui_sui/sui#sui_sui>);
    **use** [sui::table](</references/framework/sui_sui/table#sui_table>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::transfer_policy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::types](</references/framework/sui_sui/types#sui_types>);
    **use** [sui::url](</references/framework/sui_sui/url#sui_url>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::vec_set](</references/framework/sui_sui/vec_set#sui_vec_set>);
    
[/code]

## Struct Extension​

The Extension struct contains the data used by the extension and the configuration for this extension. Stored under the [ExtensionKey](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_ExtensionKey>) dynamic field.
[code] 
    **public** **struct** [Extension](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_Extension>) **has** store
    
[/code]

Click to openFields

[storage](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_storage>): [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
     Storage for the extension, an isolated Bag. By putting the extension into a single dynamic field, we reduce the amount of fields on the top level (eg items / listings) while giving extension developers the ability to store any data they want. 
permissions: u128
     Bitmap of permissions that the extension has (can be revoked any moment). It's all or nothing policy - either the extension has the required permissions or no permissions at all. 1st bit - [place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_place>) \- allows to place items for sale 2nd bit - [lock](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_lock>) and [place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_place>) \- allows to lock items (and place).  
For example: \- 10 \- allows to place items and lock them. \- 11 \- allows to place items and lock them ([lock](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_lock>) includes [place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_place>)). \- 01 \- allows to place items, but not lock them. \- 00 \- no permissions. 
[is_enabled](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_is_enabled>): bool
     Whether the extension can call protected actions. By default, all extensions are enabled (on [add](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_add>) call), however the Kiosk owner can disable them at any time.  
Disabling the extension does not limit its access to the storage. 

## Struct ExtensionKey​

The [ExtensionKey](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_ExtensionKey>) is a typed dynamic field key used to store the extension configuration and data. Ext is a phantom type that is used to identify the extension witness.
[code] 
    **public** **struct** [ExtensionKey](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_ExtensionKey>)<**phantom** Ext> **has** **copy** , drop, store
    
[/code]

## Constants​

Trying to add an extension while not being the owner of the Kiosk.
[code] 
    **const** [ENotOwner](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_ENotOwner>): u64 = 0;
    
[/code]

Extension is trying to access a permissioned action while not having the required permission.
[code] 
    **const** [EExtensionNotAllowed](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_EExtensionNotAllowed>): u64 = 2;
    
[/code]

Extension is not installed in the Kiosk.
[code] 
    **const** [EExtensionNotInstalled](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_EExtensionNotInstalled>): u64 = 3;
    
[/code]

Value that represents the [place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_place>) permission in the permissions bitmap.
[code] 
    **const** [PLACE](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_PLACE>): u128 = 1;
    
[/code]

Value that represents the [lock](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_lock>) and [place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_place>) permission in the permissions bitmap.
[code] 
    **const** [LOCK](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_LOCK>): u128 = 2;
    
[/code]

## Function add​

Add an extension to the Kiosk. Can only be performed by the owner. The extension witness is required to allow extensions define their set of permissions in the custom [add](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_add>) call.
[code] 
    **public** **fun** [add](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_add>)<Ext: drop>(_ext: Ext, self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), permissions: u128, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function disable​

Revoke permissions from the extension. While it does not remove the extension completely, it keeps it from performing any protected actions.  
The storage is still available to the extension (until it's removed).
[code] 
    **public** **fun** [disable](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_disable>)<Ext: drop>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>))
    
[/code]

## Function enable​

Re-enable the extension allowing it to call protected actions (eg [place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_place>), [lock](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_lock>)). By default, all added extensions are enabled. Kiosk owner can disable them via [disable](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_disable>) call.
[code] 
    **public** **fun** [enable](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_enable>)<Ext: drop>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>))
    
[/code]

## Function remove​

Remove an extension from the Kiosk. Can only be performed by the owner, the extension storage must be empty for the transaction to succeed.
[code] 
    **public** **fun** [remove](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_remove>)<Ext: drop>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>))
    
[/code]

## Function storage​

Get immutable access to the extension storage. Can only be performed by the extension as long as the extension is installed.
[code] 
    **public** **fun** [storage](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_storage>)<Ext: drop>(_ext: Ext, self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): &[sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
    
[/code]

## Function storage_mut​

Get mutable access to the extension storage. Can only be performed by the extension as long as the extension is installed. Disabling the extension does not prevent it from accessing the storage.

Potentially dangerous: extension developer can keep data in a Bag therefore never really allowing the KioskOwner to remove the extension.  
However, it is the case with any other solution (1) and this way we prevent intentional extension freeze when the owner wants to ruin a trade (2) - eg locking extension while an auction is in progress.

Extensions should be crafted carefully, and the KioskOwner should be aware of the risks.
[code] 
    **public** **fun** [storage_mut](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_storage_mut>)<Ext: drop>(_ext: Ext, self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): &**mut** [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
    
[/code]

## Function place​

Protected action: place an item into the Kiosk. Can be performed by an authorized extension. The extension must have the [place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_place>) permission or a [lock](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_lock>) permission.

To prevent non-tradable items from being placed into Kiosk the method requires a TransferPolicy for the placed type to exist.
[code] 
    **public** **fun** [place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_place>)<Ext: drop, T: key, store>(_ext: Ext, self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), item: T, _policy: &[sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>)
    
[/code]

## Function lock​

Protected action: lock an item in the Kiosk. Can be performed by an authorized extension. The extension must have the [lock](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_lock>) permission.
[code] 
    **public** **fun** [lock](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_lock>)<Ext: drop, T: key, store>(_ext: Ext, self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), item: T, _policy: &[sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>)
    
[/code]

## Function is_installed​

Check whether an extension of type Ext is installed.
[code] 
    **public** **fun** [is_installed](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_is_installed>)<Ext: drop>(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): bool
    
[/code]

## Function is_enabled​

Check whether an extension of type Ext is enabled.
[code] 
    **public** **fun** [is_enabled](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_is_enabled>)<Ext: drop>(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): bool
    
[/code]

## Function can_place​

Check whether an extension of type Ext can [place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_place>) into Kiosk.
[code] 
    **public** **fun** [can_place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_can_place>)<Ext: drop>(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): bool
    
[/code]

## Function can_lock​

Check whether an extension of type Ext can [lock](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_lock>) items in Kiosk.  
Locking also enables [place](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_place>).
[code] 
    **public** **fun** [can_lock](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_can_lock>)<Ext: drop>(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): bool
    
[/code]

## Function extension​

Internal: get a read-only access to the Extension.
[code] 
    **fun** [extension](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_extension>)<Ext: drop>(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): &[sui::kiosk_extension::Extension](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_Extension>)
    
[/code]

## Function extension_mut​

Internal: get a mutable access to the Extension.
[code] 
    **fun** [extension_mut](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_extension_mut>)<Ext: drop>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): &**mut** [sui::kiosk_extension::Extension](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension_Extension>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/kiosk_extension.md>)

[Previouskiosk](</references/framework/sui_sui/kiosk>)[Nextlinked_table](</references/framework/sui_sui/linked_table>)
