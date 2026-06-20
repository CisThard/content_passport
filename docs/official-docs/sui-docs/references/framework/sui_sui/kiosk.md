<!-- Source: https://docs.sui.io/references/framework/sui_sui/kiosk -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * kiosk


On this page

# Module sui::kiosk

Kiosk is a primitive for building safe, decentralized and trustless trading experiences. It allows storing and trading any types of assets as long as the creator of these assets implements a TransferPolicy for them.

#### Principles and philosophy:​

  * Kiosk provides guarantees of "true ownership"; - just like single owner objects, assets stored in the Kiosk can only be managed by the Kiosk owner.  
Only the owner can [place](</references/framework/sui_sui/kiosk#sui_kiosk_place>), [take](</references/framework/sui_sui/kiosk#sui_kiosk_take>), [list](</references/framework/sui_sui/kiosk#sui_kiosk_list>), perform any other actions on assets in the Kiosk.

  * Kiosk aims to be generic - allowing for a small set of default behaviors and not imposing any restrictions on how the assets can be traded. The only default scenario is a [list](</references/framework/sui_sui/kiosk#sui_kiosk_list>) \+ [purchase](</references/framework/sui_sui/kiosk#sui_kiosk_purchase>) flow; any other trading logic can be implemented on top using the [list_with_purchase_cap](</references/framework/sui_sui/kiosk#sui_kiosk_list_with_purchase_cap>) (and a matching [purchase_with_cap](</references/framework/sui_sui/kiosk#sui_kiosk_purchase_with_cap>)) flow.

  * For every transaction happening with a third party a TransferRequest is created - this way creators are fully in control of the trading experience.


#### Asset states in the Kiosk:​

  * placed \- An asset is [place](</references/framework/sui_sui/kiosk#sui_kiosk_place>)d into the Kiosk and can be [take](</references/framework/sui_sui/kiosk#sui_kiosk_take>)n out by the Kiosk owner; it's freely tradable and modifiable via the [borrow_mut](</references/framework/sui_sui/kiosk#sui_kiosk_borrow_mut>) and [borrow_val](</references/framework/sui_sui/kiosk#sui_kiosk_borrow_val>) functions.

  * locked \- Similar to placed except that [take](</references/framework/sui_sui/kiosk#sui_kiosk_take>) is disabled and the only way to move the asset out of the Kiosk is to [list](</references/framework/sui_sui/kiosk#sui_kiosk_list>) it or [list_with_purchase_cap](</references/framework/sui_sui/kiosk#sui_kiosk_list_with_purchase_cap>) therefore performing a trade (issuing a TransferRequest). The check on the [lock](</references/framework/sui_sui/kiosk#sui_kiosk_lock>) function makes sure that the TransferPolicy exists to not lock the item in a [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) forever.

  * listed \- A [place](</references/framework/sui_sui/kiosk#sui_kiosk_place>)d or a [lock](</references/framework/sui_sui/kiosk#sui_kiosk_lock>)ed item can be [list](</references/framework/sui_sui/kiosk#sui_kiosk_list>)ed for a fixed price allowing anyone to [purchase](</references/framework/sui_sui/kiosk#sui_kiosk_purchase>) it from the Kiosk. While listed, an item can not be taken or modified. However, an immutable borrow via [borrow](</references/framework/sui_sui/borrow#sui_borrow>) call is still available. The [delist](</references/framework/sui_sui/kiosk#sui_kiosk_delist>) function returns the asset to the previous state.

  * listed_exclusively \- An item is listed via the [list_with_purchase_cap](</references/framework/sui_sui/kiosk#sui_kiosk_list_with_purchase_cap>) function (and a [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) is created). While listed this way, an item can not be [delist](</references/framework/sui_sui/kiosk#sui_kiosk_delist>)-ed unless a [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) is returned. All actions available at this item state require a [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>):


  1. [purchase_with_cap](</references/framework/sui_sui/kiosk#sui_kiosk_purchase_with_cap>) \- to purchase the item for a price equal or higher than the min_price set in the [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>).
  2. [return_purchase_cap](</references/framework/sui_sui/kiosk#sui_kiosk_return_purchase_cap>) \- to return the [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) and return the asset into the previous state.


When an item is listed exclusively it cannot be modified nor taken and losing a [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) would lock the item in the Kiosk forever. Therefore, it is recommended to only use [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) functionality in trusted applications and not use it for direct trading (eg sending to another account).

#### Using multiple Transfer Policies for different "tracks":​

Every [purchase](</references/framework/sui_sui/kiosk#sui_kiosk_purchase>) or purchase_with_purchase_cap creates a TransferRequest hot potato which must be resolved in a matching TransferPolicy for the transaction to pass. While the default scenario implies that there should be a single TransferPolicy<T> for T; it is possible to have multiple, each one having its own set of rules.

#### Examples:​

  * I create one TransferPolicy with "Royalty Rule" for everyone
  * I create a special TransferPolicy for bearers of a "Club Membership" object so they don't have to pay anything
  * I create and wrap a TransferPolicy so that players of my game can transfer items between [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)s in game without any charge (and maybe not even paying the price with a 0 SUI PurchaseCap)


[code] 
    Kiosk -> (Item, TransferRequest)  
    ... TransferRequest ------> Common Transfer Policy  
    ... TransferRequest ------> In-game Wrapped Transfer Policy  
    ... TransferRequest ------> Club Membership Transfer Policy  
    
[/code]

See [transfer_policy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy>) module for more details on how they function.
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

## Struct Kiosk​

An object which allows selling collectibles within "kiosk" ecosystem.  
By default gives the functionality to list an item openly - for anyone to purchase providing the guarantees for creators that every transfer needs to be approved via the TransferPolicy.
[code] 
    **public** **struct** [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
profits: [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
     Balance of the Kiosk - all profits from sales go here. 
[owner](</references/framework/sui_sui/kiosk#sui_kiosk_owner>): **address**
     Always point to sender of the transaction.  
Can be changed by calling [set_owner](</references/framework/sui_sui/kiosk#sui_kiosk_set_owner>) with Cap. 
[item_count](</references/framework/sui_sui/kiosk#sui_kiosk_item_count>): u32
     Number of items stored in a Kiosk. Used to allow unpacking an empty Kiosk if it was wrapped or has a single owner. 
allow_extensions: bool
     [DEPRECATED] Please, don't use the allow_extensions and the matching [set_allow_extensions](</references/framework/sui_sui/kiosk#sui_kiosk_set_allow_extensions>) function - it is a legacy feature that is being replaced by the [kiosk_extension](</references/framework/sui_sui/kiosk_extension#sui_kiosk_extension>) module and its Extensions API.  
Exposes [uid_mut](</references/framework/sui_sui/kiosk#sui_kiosk_uid_mut>) publicly when set to **true** , set to **false** by default. 

## Struct KioskOwnerCap​

A Capability granting the bearer a right to [place](</references/framework/sui_sui/kiosk#sui_kiosk_place>) and [take](</references/framework/sui_sui/kiosk#sui_kiosk_take>) items from the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) as well as to [list](</references/framework/sui_sui/kiosk#sui_kiosk_list>) them and [list_with_purchase_cap](</references/framework/sui_sui/kiosk#sui_kiosk_list_with_purchase_cap>).
[code] 
    **public** **struct** [KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
**for** : [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Struct PurchaseCap​

A capability which locks an item and gives a permission to purchase it from a [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) for any price no less than min_price.

Allows exclusive listing: only bearer of the [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) can purchase the asset. However, the capability should be used carefully as losing it would lock the asset in the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>).

The main application for the [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) is building extensions on top of the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>).
[code] 
    **public** **struct** [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>)<**phantom** T: key, store> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
kiosk_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     ID of the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) the cap belongs to. 
item_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     ID of the listed item. 
min_price: u64
     Minimum price for which the item can be purchased. 

## Struct Borrow​

Hot potato to ensure an item was returned after being taken using the [borrow_val](</references/framework/sui_sui/kiosk#sui_kiosk_borrow_val>) call.
[code] 
    **public** **struct** [Borrow](</references/framework/sui_sui/kiosk#sui_kiosk_Borrow>)
    
[/code]

Click to openFields

kiosk_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
item_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Struct Item​

Dynamic field key for an item placed into the kiosk.
[code] 
    **public** **struct** [Item](</references/framework/sui_sui/kiosk#sui_kiosk_Item>) **has** **copy** , drop, store
    
[/code]

Click to openFields

id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Struct Listing​

Dynamic field key for an active offer to purchase the T. If an item is listed without a [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>), exclusive is set to **false**.
[code] 
    **public** **struct** [Listing](</references/framework/sui_sui/kiosk#sui_kiosk_Listing>) **has** **copy** , drop, store
    
[/code]

Click to openFields

id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
is_exclusive: bool
    

## Struct Lock​

Dynamic field key which marks that an item is locked in the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) and can't be [take](</references/framework/sui_sui/kiosk#sui_kiosk_take>)n. The item then can only be listed / sold via the PurchaseCap.  
Lock is released on [purchase](</references/framework/sui_sui/kiosk#sui_kiosk_purchase>).
[code] 
    **public** **struct** [Lock](</references/framework/sui_sui/kiosk#sui_kiosk_Lock>) **has** **copy** , drop, store
    
[/code]

Click to openFields

id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Struct ItemListed​

Emitted when an item was listed by the safe owner. Can be used to track available offers anywhere on the network; the event is type-indexed which allows for searching for offers of a specific T
[code] 
    **public** **struct** [ItemListed](</references/framework/sui_sui/kiosk#sui_kiosk_ItemListed>)<**phantom** T: key, store> **has** **copy** , drop
    
[/code]

Click to openFields

[kiosk](</references/framework/sui_sui/kiosk#sui_kiosk>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
price: u64
    

## Struct ItemPurchased​

Emitted when an item was purchased from the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>). Can be used to track finalized sales across the network. The event is emitted in both cases: when an item is purchased via the [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) or when it's purchased directly (via [list](</references/framework/sui_sui/kiosk#sui_kiosk_list>) \+ [purchase](</references/framework/sui_sui/kiosk#sui_kiosk_purchase>)).

The price is also emitted and might differ from the price set in the [ItemListed](</references/framework/sui_sui/kiosk#sui_kiosk_ItemListed>) event. This is because the [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) only sets a minimum price for the item, and the actual price is defined by the trading module / extension.
[code] 
    **public** **struct** [ItemPurchased](</references/framework/sui_sui/kiosk#sui_kiosk_ItemPurchased>)<**phantom** T: key, store> **has** **copy** , drop
    
[/code]

Click to openFields

[kiosk](</references/framework/sui_sui/kiosk#sui_kiosk>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
price: u64
    

## Struct ItemDelisted​

Emitted when an item was delisted by the safe owner. Can be used to close tracked offers.
[code] 
    **public** **struct** [ItemDelisted](</references/framework/sui_sui/kiosk#sui_kiosk_ItemDelisted>)<**phantom** T: key, store> **has** **copy** , drop
    
[/code]

Click to openFields

[kiosk](</references/framework/sui_sui/kiosk#sui_kiosk>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Constants​

Trying to withdraw profits and sender is not owner.
[code] 
    **const** [ENotOwner](</references/framework/sui_sui/kiosk#sui_kiosk_ENotOwner>): u64 = 0;
    
[/code]

Coin paid does not match the offer price.
[code] 
    **const** [EIncorrectAmount](</references/framework/sui_sui/kiosk#sui_kiosk_EIncorrectAmount>): u64 = 1;
    
[/code]

Trying to withdraw higher amount than stored.
[code] 
    **const** [ENotEnough](</references/framework/sui_sui/kiosk#sui_kiosk_ENotEnough>): u64 = 2;
    
[/code]

Trying to close a Kiosk and it has items in it.
[code] 
    **const** [ENotEmpty](</references/framework/sui_sui/kiosk#sui_kiosk_ENotEmpty>): u64 = 3;
    
[/code]

Attempt to take an item that has a [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) issued.
[code] 
    **const** [EListedExclusively](</references/framework/sui_sui/kiosk#sui_kiosk_EListedExclusively>): u64 = 4;
    
[/code]

[PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) does not match the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>).
[code] 
    **const** [EWrongKiosk](</references/framework/sui_sui/kiosk#sui_kiosk_EWrongKiosk>): u64 = 5;
    
[/code]

Trying to exclusively list an already listed item.
[code] 
    **const** [EAlreadyListed](</references/framework/sui_sui/kiosk#sui_kiosk_EAlreadyListed>): u64 = 6;
    
[/code]

Trying to call [uid_mut](</references/framework/sui_sui/kiosk#sui_kiosk_uid_mut>) when allow_extensions set to false.
[code] 
    **const** [EUidAccessNotAllowed](</references/framework/sui_sui/kiosk#sui_kiosk_EUidAccessNotAllowed>): u64 = 7;
    
[/code]

Attempt to [take](</references/framework/sui_sui/kiosk#sui_kiosk_take>) an item that is locked.
[code] 
    **const** [EItemLocked](</references/framework/sui_sui/kiosk#sui_kiosk_EItemLocked>): u64 = 8;
    
[/code]

Taking or mutably borrowing an item that is listed.
[code] 
    **const** [EItemIsListed](</references/framework/sui_sui/kiosk#sui_kiosk_EItemIsListed>): u64 = 9;
    
[/code]

Item does not match [Borrow](</references/framework/sui_sui/kiosk#sui_kiosk_Borrow>) in [return_val](</references/framework/sui_sui/kiosk#sui_kiosk_return_val>).
[code] 
    **const** [EItemMismatch](</references/framework/sui_sui/kiosk#sui_kiosk_EItemMismatch>): u64 = 10;
    
[/code]

An is not found while trying to borrow.
[code] 
    **const** [EItemNotFound](</references/framework/sui_sui/kiosk#sui_kiosk_EItemNotFound>): u64 = 11;
    
[/code]

Delisting an item that is not listed.
[code] 
    **const** [ENotListed](</references/framework/sui_sui/kiosk#sui_kiosk_ENotListed>): u64 = 12;
    
[/code]

## Function default​

Creates a new Kiosk in a default configuration: sender receives the [KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>) and becomes the Owner, the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) is shared.
[code] 
    **entry** **fun** [default](</references/framework/sui_sui/kiosk#sui_kiosk_default>)(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function new​

Creates a new [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) with a matching [KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>).
[code] 
    **public** **fun** [new](</references/framework/sui_sui/kiosk#sui_kiosk_new>)(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), [sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>))
    
[/code]

## Function close_and_withdraw​

Unpacks and destroys a Kiosk returning the profits (even if "0").  
Can only be performed by the bearer of the [KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>) in the case where there's no items inside and a [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) is not shared.
[code] 
    **public** **fun** [close_and_withdraw](</references/framework/sui_sui/kiosk#sui_kiosk_close_and_withdraw>)(self: [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: [sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function set_owner​

Change the [owner](</references/framework/sui_sui/kiosk#sui_kiosk_owner>) field to the transaction sender.  
The change is purely cosmetical and does not affect any of the basic kiosk functions unless some logic for this is implemented in a third party module.
[code] 
    **public** **fun** [set_owner](</references/framework/sui_sui/kiosk#sui_kiosk_set_owner>)(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function set_owner_custom​

Update the [owner](</references/framework/sui_sui/kiosk#sui_kiosk_owner>) field with a custom address. Can be used for implementing a custom logic that relies on the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) owner.
[code] 
    **public** **fun** [set_owner_custom](</references/framework/sui_sui/kiosk#sui_kiosk_set_owner_custom>)(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), [owner](</references/framework/sui_sui/kiosk#sui_kiosk_owner>): **address**)
    
[/code]

## Function place​

Place any object into a Kiosk.  
Performs an authorization check to make sure only owner can do that.
[code] 
    **public** **fun** [place](</references/framework/sui_sui/kiosk#sui_kiosk_place>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), item: T)
    
[/code]

## Function lock​

Place an item to the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) and issue a [Lock](</references/framework/sui_sui/kiosk#sui_kiosk_Lock>) for it. Once placed this way, an item can only be listed either with a [list](</references/framework/sui_sui/kiosk#sui_kiosk_list>) function or with a [list_with_purchase_cap](</references/framework/sui_sui/kiosk#sui_kiosk_list_with_purchase_cap>).

Requires policy for T to make sure that there's an issued TransferPolicy and the item can be sold, otherwise the asset might be locked forever.
[code] 
    **public** **fun** [lock](</references/framework/sui_sui/kiosk#sui_kiosk_lock>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), _policy: &[sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>, item: T)
    
[/code]

## Function take​

Take any object from the Kiosk.  
Performs an authorization check to make sure only owner can do that.
[code] 
    **public** **fun** [take](</references/framework/sui_sui/kiosk#sui_kiosk_take>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): T
    
[/code]

## Function list​

List the item by setting a price and making it available for purchase.  
Performs an authorization check to make sure only owner can sell.
[code] 
    **public** **fun** [list](</references/framework/sui_sui/kiosk#sui_kiosk_list>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>), price: u64)
    
[/code]

## Function place_and_list​

Calls [place](</references/framework/sui_sui/kiosk#sui_kiosk_place>) and [list](</references/framework/sui_sui/kiosk#sui_kiosk_list>) together - simplifies the flow.
[code] 
    **public** **fun** [place_and_list](</references/framework/sui_sui/kiosk#sui_kiosk_place_and_list>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), item: T, price: u64)
    
[/code]

## Function delist​

Remove an existing listing from the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) and keep the item in the user Kiosk. Can only be performed by the owner of the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>).
[code] 
    **public** **fun** [delist](</references/framework/sui_sui/kiosk#sui_kiosk_delist>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>))
    
[/code]

## Function purchase​

Make a trade: pay the owner of the item and request a Transfer to the target kiosk (to prevent item being taken by the approving party).

Received TransferRequest needs to be handled by the publisher of the T, if they have a method implemented that allows a trade, it is possible to request their approval (by calling some function) so that the trade can be finalized.
[code] 
    **public** **fun** [purchase](</references/framework/sui_sui/kiosk#sui_kiosk_purchase>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>), payment: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>): (T, [sui::transfer_policy::TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>)<T>)
    
[/code]

## Function list_with_purchase_cap​

Creates a [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) which gives the right to purchase an item for any price equal or higher than the min_price.
[code] 
    **public** **fun** [list_with_purchase_cap](</references/framework/sui_sui/kiosk#sui_kiosk_list_with_purchase_cap>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>), min_price: u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::kiosk::PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>)<T>
    
[/code]

## Function purchase_with_cap​

Unpack the [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) and call [purchase](</references/framework/sui_sui/kiosk#sui_kiosk_purchase>). Sets the payment amount as the price for the listing making sure it's no less than min_amount.
[code] 
    **public** **fun** [purchase_with_cap](</references/framework/sui_sui/kiosk#sui_kiosk_purchase_with_cap>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), purchase_cap: [sui::kiosk::PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>)<T>, payment: [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>): (T, [sui::transfer_policy::TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>)<T>)
    
[/code]

## Function return_purchase_cap​

Return the [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) without making a purchase; remove an active offer and allow the item for taking. Can only be returned to its [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), aborts otherwise.
[code] 
    **public** **fun** [return_purchase_cap](</references/framework/sui_sui/kiosk#sui_kiosk_return_purchase_cap>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), purchase_cap: [sui::kiosk::PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>)<T>)
    
[/code]

## Function withdraw​

Withdraw profits from the Kiosk.
[code] 
    **public** **fun** [withdraw](</references/framework/sui_sui/kiosk#sui_kiosk_withdraw>)(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), amount: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u64>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function lock_internal​

Internal: "lock" an item disabling the [take](</references/framework/sui_sui/kiosk#sui_kiosk_take>) action.
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [lock_internal](</references/framework/sui_sui/kiosk#sui_kiosk_lock_internal>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), item: T)
    
[/code]

## Function place_internal​

Internal: "place" an item to the Kiosk and increment the item count.
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [place_internal](</references/framework/sui_sui/kiosk#sui_kiosk_place_internal>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), item: T)
    
[/code]

## Function uid_mut_internal​

Internal: get a mutable access to the UID.
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [uid_mut_internal](</references/framework/sui_sui/kiosk#sui_kiosk_uid_mut_internal>)(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function has_item​

Check whether the item is present in the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>).
[code] 
    **public** **fun** [has_item](</references/framework/sui_sui/kiosk#sui_kiosk_has_item>)(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): bool
    
[/code]

## Function has_item_with_type​

Check whether the item is present in the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) and has type T.
[code] 
    **public** **fun** [has_item_with_type](</references/framework/sui_sui/kiosk#sui_kiosk_has_item_with_type>)<T: key, store>(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): bool
    
[/code]

## Function is_locked​

Check whether an item with the id is locked in the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>). Meaning that the only two actions that can be performed on it are [list](</references/framework/sui_sui/kiosk#sui_kiosk_list>) and [list_with_purchase_cap](</references/framework/sui_sui/kiosk#sui_kiosk_list_with_purchase_cap>), it cannot be [take](</references/framework/sui_sui/kiosk#sui_kiosk_take>)n out of the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>).
[code] 
    **public** **fun** [is_locked](</references/framework/sui_sui/kiosk#sui_kiosk_is_locked>)(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): bool
    
[/code]

## Function is_listed​

Check whether an item is listed (exclusively or non exclusively).
[code] 
    **public** **fun** [is_listed](</references/framework/sui_sui/kiosk#sui_kiosk_is_listed>)(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): bool
    
[/code]

## Function is_listed_exclusively​

Check whether there's a [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>) issued for an item.
[code] 
    **public** **fun** [is_listed_exclusively](</references/framework/sui_sui/kiosk#sui_kiosk_is_listed_exclusively>)(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): bool
    
[/code]

## Function has_access​

Check whether the [KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>) matches the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>).
[code] 
    **public** **fun** [has_access](</references/framework/sui_sui/kiosk#sui_kiosk_has_access>)(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>)): bool
    
[/code]

## Function uid_mut_as_owner​

Access the UID using the [KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>).
[code] 
    **public** **fun** [uid_mut_as_owner](</references/framework/sui_sui/kiosk#sui_kiosk_uid_mut_as_owner>)(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>)): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function uid​

Get the immutable UID for dynamic field access.  
Always enabled.

Given the &UID can be used for reading keys and authorization, its access
[code] 
    **public** **fun** [uid](</references/framework/sui_sui/kiosk#sui_kiosk_uid>)(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function uid_mut​

Get the mutable UID for dynamic field access and extensions.  
Aborts if allow_extensions set to **false**.
[code] 
    **public** **fun** [uid_mut](</references/framework/sui_sui/kiosk#sui_kiosk_uid_mut>)(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function owner​

Get the owner of the Kiosk.
[code] 
    **public** **fun** [owner](</references/framework/sui_sui/kiosk#sui_kiosk_owner>)(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): **address**
    
[/code]

## Function item_count​

Get the number of items stored in a Kiosk.
[code] 
    **public** **fun** [item_count](</references/framework/sui_sui/kiosk#sui_kiosk_item_count>)(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): u32
    
[/code]

## Function profits_amount​

Get the amount of profits collected by selling items.
[code] 
    **public** **fun** [profits_amount](</references/framework/sui_sui/kiosk#sui_kiosk_profits_amount>)(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>)): u64
    
[/code]

## Function profits_mut​

Get mutable access to profits \- owner only action.
[code] 
    **public** **fun** [profits_mut](</references/framework/sui_sui/kiosk#sui_kiosk_profits_mut>)(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>)): &**mut** [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function borrow​

Immutably borrow an item from the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>). Any item can be [borrow](</references/framework/sui_sui/borrow#sui_borrow>)ed at any time.
[code] 
    **public** **fun** [borrow](</references/framework/sui_sui/borrow#sui_borrow>)<T: key, store>(self: &[sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): &T
    
[/code]

## Function borrow_mut​

Mutably borrow an item from the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>).  
Item can be [borrow_mut](</references/framework/sui_sui/kiosk#sui_kiosk_borrow_mut>)ed only if it's not [is_listed](</references/framework/sui_sui/kiosk#sui_kiosk_is_listed>).
[code] 
    **public** **fun** [borrow_mut](</references/framework/sui_sui/kiosk#sui_kiosk_borrow_mut>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): &**mut** T
    
[/code]

## Function borrow_val​

Take the item from the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>) with a guarantee that it will be returned.  
Item can be [borrow_val](</references/framework/sui_sui/kiosk#sui_kiosk_borrow_val>)-ed only if it's not [is_listed](</references/framework/sui_sui/kiosk#sui_kiosk_is_listed>).
[code] 
    **public** **fun** [borrow_val](</references/framework/sui_sui/kiosk#sui_kiosk_borrow_val>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>), id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): (T, [sui::kiosk::Borrow](</references/framework/sui_sui/kiosk#sui_kiosk_Borrow>))
    
[/code]

## Function return_val​

Return the borrowed item to the [Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>). This method cannot be avoided if [borrow_val](</references/framework/sui_sui/kiosk#sui_kiosk_borrow_val>) is used.
[code] 
    **public** **fun** [return_val](</references/framework/sui_sui/kiosk#sui_kiosk_return_val>)<T: key, store>(self: &**mut** [sui::kiosk::Kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_Kiosk>), item: T, [borrow](</references/framework/sui_sui/borrow#sui_borrow>): [sui::kiosk::Borrow](</references/framework/sui_sui/kiosk#sui_kiosk_Borrow>))
    
[/code]

## Function kiosk_owner_cap_for​

Get the **for** field of the [KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>).
[code] 
    **public** **fun** [kiosk_owner_cap_for](</references/framework/sui_sui/kiosk#sui_kiosk_kiosk_owner_cap_for>)(cap: &[sui::kiosk::KioskOwnerCap](</references/framework/sui_sui/kiosk#sui_kiosk_KioskOwnerCap>)): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function purchase_cap_kiosk​

Get the kiosk_id from the [PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>).
[code] 
    **public** **fun** [purchase_cap_kiosk](</references/framework/sui_sui/kiosk#sui_kiosk_purchase_cap_kiosk>)<T: key, store>(self: &[sui::kiosk::PurchaseCap](</references/framework/sui_sui/kiosk#sui_kiosk_PurchaseCap>)<T>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

* * *

_This page has been truncated because it exceeds the maximum character limit.[View the full source](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui/kiosk.md>)._

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/kiosk.md>)

[Previoushmac](</references/framework/sui_sui/hmac>)[Nextkiosk_extension](</references/framework/sui_sui/kiosk_extension>)
