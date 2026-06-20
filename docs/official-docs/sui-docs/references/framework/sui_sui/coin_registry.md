<!-- Source: https://docs.sui.io/references/framework/sui_sui/coin_registry -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * coin_registry


# Module sui::coin_registry

Defines the system object for managing coin data in a central registry. This module provides a centralized way to store and manage metadata for all currencies in the Sui ecosystem, including their supply information, regulatory status, and metadata capabilities.
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
    **use** [sui::derived_object](</references/framework/sui_sui/derived_object#sui_derived_object>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::dynamic_object_field](</references/framework/sui_sui/dynamic_object_field#sui_dynamic_object_field>);
    **use** [sui::event](</references/framework/sui_sui/event#sui_event>);
    **use** [sui::funds_accumulator](</references/framework/sui_sui/funds_accumulator#sui_funds_accumulator>);
    **use** [sui::hash](</references/framework/sui_sui/hash#sui_hash>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::protocol_config](</references/framework/sui_sui/protocol_config#sui_protocol_config>);
    **use** [sui::table](</references/framework/sui_sui/table#sui_table>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::types](</references/framework/sui_sui/types#sui_types>);
    **use** [sui::url](</references/framework/sui_sui/url#sui_url>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::vec_set](</references/framework/sui_sui/vec_set#sui_vec_set>);
    
[/code]

## Struct CoinRegistry​

System object found at address 0xc that stores coin data for all registered coin types. This is a shared object that acts as a central registry for coin metadata, supply information, and regulatory status.
[code] 
    **public** **struct** [CoinRegistry](</references/framework/sui_sui/coin_registry#sui_coin_registry_CoinRegistry>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    

## Struct ExtraField​

Store only object that enables more flexible coin data registration, allowing for additional fields to be added without changing the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) structure.
[code] 
    **public** **struct** [ExtraField](</references/framework/sui_sui/coin_registry#sui_coin_registry_ExtraField>) **has** store
    
[/code]

Click to openFields

0: [std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)
    
1: vector<u8>
    

## Struct CurrencyKey​

Key used to derive addresses when creating [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T> objects.
[code] 
    **public** **struct** [CurrencyKey](</references/framework/sui_sui/coin_registry#sui_coin_registry_CurrencyKey>)<**phantom** T> **has** **copy** , drop, store
    
[/code]

## Struct LegacyMetadataKey​

Key used to store the legacy CoinMetadata for a [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>).
[code] 
    **public** **struct** [LegacyMetadataKey](</references/framework/sui_sui/coin_registry#sui_coin_registry_LegacyMetadataKey>) **has** **copy** , drop, store
    
[/code]

## Struct MetadataCap​

Capability object that gates metadata (name, description, icon_url, symbol) changes in the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>). It can only be created (or claimed) once, and can be deleted to prevent changes to the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) metadata.
[code] 
    **public** **struct** [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>)<**phantom** T> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    

## Struct Borrow​

Potato callback for the legacy CoinMetadata borrowing.
[code] 
    **public** **struct** [Borrow](</references/framework/sui_sui/coin_registry#sui_coin_registry_Borrow>)<**phantom** T>
    
[/code]

## Struct Currency​

Currency stores metadata such as name, symbol, decimals, icon_url and description, as well as supply states (optional) and regulatory status.
[code] 
    **public** **struct** [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<**phantom** T> **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[decimals](</references/framework/sui_sui/coin_registry#sui_coin_registry_decimals>): u8
     Number of decimal places the coin uses for display purposes. 
[name](</references/framework/sui_sui/coin_registry#sui_coin_registry_name>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     Human-readable name for the coin. 
[symbol](</references/framework/sui_sui/coin_registry#sui_coin_registry_symbol>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     Short symbol/ticker for the coin. 
[description](</references/framework/sui_sui/coin_registry#sui_coin_registry_description>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     Detailed description of the coin. 
[icon_url](</references/framework/sui_sui/coin_registry#sui_coin_registry_icon_url>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
     URL for the coin's icon/logo. 
supply: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::coin_registry::SupplyState](</references/framework/sui_sui/coin_registry#sui_coin_registry_SupplyState>)<T>>
     Current supply state of the coin (fixed supply or unknown).  
Note: We're using Option because [SupplyState](</references/framework/sui_sui/coin_registry#sui_coin_registry_SupplyState>) does not have drop, meaning we cannot swap out its value at a later state. 
regulated: [sui::coin_registry::RegulatedState](</references/framework/sui_sui/coin_registry#sui_coin_registry_RegulatedState>)
     Regulatory status of the coin (regulated with deny cap or unknown) 
[treasury_cap_id](</references/framework/sui_sui/coin_registry#sui_coin_registry_treasury_cap_id>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)>
     ID of the treasury cap for this coin type, if registered. 
[metadata_cap_id](</references/framework/sui_sui/coin_registry#sui_coin_registry_metadata_cap_id>): [sui::coin_registry::MetadataCapState](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCapState>)
     ID of the metadata capability for this coin type, if claimed. 
extra_fields: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<[std::string::String](</references/framework/sui_std/string#std_string_String>), [sui::coin_registry::ExtraField](</references/framework/sui_sui/coin_registry#sui_coin_registry_ExtraField>)>
     Additional fields for extensibility. 

## Struct CurrencyInitializer​

Hot potato wrapper to enforce registration after "new_currency" data creation.  
Destroyed in the [finalize](</references/framework/sui_sui/coin_registry#sui_coin_registry_finalize>) call and either transferred to the [CoinRegistry](</references/framework/sui_sui/coin_registry#sui_coin_registry_CoinRegistry>) (in case of an OTW registration) or shared directly (for dynamically created currencies).
[code] 
    **public** **struct** [CurrencyInitializer](</references/framework/sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer>)<**phantom** T>
    
[/code]

Click to openFields

currency: [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>
    
extra_fields: [sui::bag::Bag](</references/framework/sui_sui/bag#sui_bag_Bag>)
    
is_otw: bool
    

## Enum SupplyState​

Supply state marks the type of Currency Supply, which can be

  * Fixed: no minting or burning;
  * BurnOnly: no minting, burning is allowed;
  * Unknown: flexible (supply is controlled by its TreasuryCap);


[code] 
    **public** **enum** [SupplyState](</references/framework/sui_sui/coin_registry#sui_coin_registry_SupplyState>)<**phantom** T> **has** store
    
[/code]

Click to openVariants

Variant Fixed
     Coin has a fixed supply with the given Supply object. 

0: [sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>
    
Variant BurnOnly
     Coin has a supply that can ONLY decrease. 

0: [sui::balance::Supply](</references/framework/sui_sui/balance#sui_balance_Supply>)<T>
    
Variant Unknown
     Supply information is not yet known or registered. 

## Enum RegulatedState​

Regulated state of a coin type.

  * Regulated: DenyCap exists or a RegulatedCoinMetadata used to mark currency as regulated;
  * Unregulated: the currency was created without deny list;
  * Unknown: the regulatory status is unknown.


[code] 
    **public** **enum** [RegulatedState](</references/framework/sui_sui/coin_registry#sui_coin_registry_RegulatedState>) **has** **copy** , drop, store
    
[/code]

Click to openVariants

Variant Regulated
     Coin is regulated with a deny cap for address restrictions. allow_global_pause is None if the information is unknown (has not been migrated from DenyCapV2). 

cap: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

allow_global_pause: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<bool>
    

variant: u8
    
Variant Unregulated
     The coin has been created without deny list. 
Variant Unknown
     Regulatory status is unknown.  
Result of a legacy migration for that coin (from [coin](</references/framework/sui_sui/coin#sui_coin>).**move** constructors) 

## Enum MetadataCapState​

State of the [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>) for a single [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>).
[code] 
    **public** **enum** [MetadataCapState](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCapState>) **has** **copy** , drop, store
    
[/code]

Click to openVariants

Variant Claimed
     The metadata cap has been claimed. 

0: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
Variant Unclaimed
     The metadata cap has not been claimed. 
Variant Deleted
     The metadata cap has been claimed and then deleted. 

## Constants​

Metadata cap already claimed
[code] 
    #[error]
    **const** [EMetadataCapAlreadyClaimed](</references/framework/sui_sui/coin_registry#sui_coin_registry_EMetadataCapAlreadyClaimed>): vector<u8> = b"Metadata cap already claimed";
    
[/code]

Only the system address can create the registry
[code] 
    #[error]
    **const** [ENotSystemAddress](</references/framework/sui_sui/coin_registry#sui_coin_registry_ENotSystemAddress>): vector<u8> = b"Only the system can [create](</references/framework/sui_sui/coin_registry#sui_coin_registry_create>) the registry.";
    
[/code]

Currency for this coin type already exists
[code] 
    #[error]
    **const** [ECurrencyAlreadyExists](</references/framework/sui_sui/coin_registry#sui_coin_registry_ECurrencyAlreadyExists>): vector<u8> = b"[Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) **for** this [coin](</references/framework/sui_sui/coin#sui_coin>) type already [exists](</references/framework/sui_sui/coin_registry#sui_coin_registry_exists>).";
    
[/code]

Attempt to set the deny list state permissionlessly while it has already been set.
[code] 
    #[error]
    **const** [EDenyListStateAlreadySet](</references/framework/sui_sui/coin_registry#sui_coin_registry_EDenyListStateAlreadySet>): vector<u8> = b"Cannot set the deny list state **as** it **has** already been set.";
    
[/code]

Attempt to update [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) with legacy metadata after the [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>) has been claimed. Updates are only allowed if the [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>) has not yet been claimed or deleted.
[code] 
    #[error]
    **const** [ECannotUpdateManagedMetadata](</references/framework/sui_sui/coin_registry#sui_coin_registry_ECannotUpdateManagedMetadata>): vector<u8> = b"Cannot update metadata whose [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>) **has** already been claimed";
    
[/code]

Attempt to set the symbol to a non-ASCII printable character
[code] 
    #[error]
    **const** [EInvalidSymbol](</references/framework/sui_sui/coin_registry#sui_coin_registry_EInvalidSymbol>): vector<u8> = b"Symbol **has** to be ASCII printable";
    
[/code]
[code] 
    #[error]
    **const** [EDenyCapAlreadyCreated](</references/framework/sui_sui/coin_registry#sui_coin_registry_EDenyCapAlreadyCreated>): vector<u8> = b"Cannot claim the deny cap twice";
    
[/code]

Attempt to migrate legacy metadata for a [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) that already exists.
[code] 
    #[error]
    **const** [ECurrencyAlreadyRegistered](</references/framework/sui_sui/coin_registry#sui_coin_registry_ECurrencyAlreadyRegistered>): vector<u8> = b"[Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) already registered";
    
[/code]
[code] 
    #[error]
    **const** [EEmptySupply](</references/framework/sui_sui/coin_registry#sui_coin_registry_EEmptySupply>): vector<u8> = b"Supply cannot be empty";
    
[/code]
[code] 
    #[error]
    **const** [ESupplyNotBurnOnly](</references/framework/sui_sui/coin_registry#sui_coin_registry_ESupplyNotBurnOnly>): vector<u8> = b"Cannot [burn](</references/framework/sui_sui/coin_registry#sui_coin_registry_burn>) on a non [burn](</references/framework/sui_sui/coin_registry#sui_coin_registry_burn>)-only supply";
    
[/code]
[code] 
    #[error]
    **const** [EInvariantViolation](</references/framework/sui_sui/coin_registry#sui_coin_registry_EInvariantViolation>): vector<u8> = b"Code **invariant** violation";
    
[/code]
[code] 
    #[error]
    **const** [EDeletionNotSupported](</references/framework/sui_sui/coin_registry#sui_coin_registry_EDeletionNotSupported>): vector<u8> = b"Deleting legacy metadata is not supported";
    
[/code]
[code] 
    #[error]
    **const** [ENotOneTimeWitness](</references/framework/sui_sui/coin_registry#sui_coin_registry_ENotOneTimeWitness>): vector<u8> = b"Type is expected to be OTW";
    
[/code]
[code] 
    #[error]
    **const** [EBorrowLegacyMetadata](</references/framework/sui_sui/coin_registry#sui_coin_registry_EBorrowLegacyMetadata>): vector<u8> = b"Cannot [borrow](</references/framework/sui_sui/borrow#sui_borrow>) legacy metadata **for** migrated currency";
    
[/code]
[code] 
    #[error]
    **const** [EDuplicateBorrow](</references/framework/sui_sui/coin_registry#sui_coin_registry_EDuplicateBorrow>): vector<u8> = b"Attempt to **return** duplicate borrowed CoinMetadata";
    
[/code]

Incremental identifier for regulated coin versions in the deny list.  
We start from 0 in the new system, which aligns with the state of DenyCapV2.
[code] 
    **const** [REGULATED_COIN_VERSION](</references/framework/sui_sui/coin_registry#sui_coin_registry_REGULATED_COIN_VERSION>): u8 = 0;
    
[/code]

Marker used in metadata to indicate that the currency is not migrated.
[code] 
    **const** [NEW_CURRENCY_MARKER](</references/framework/sui_sui/coin_registry#sui_coin_registry_NEW_CURRENCY_MARKER>): vector<u8> = vector[105, 115, 95, 110, 101, 119, 95, 99, 117, 114, 114, 101, 110, 99, 121];
    
[/code]

## Function new_currency​

Creates a new currency.

Note: This constructor has no long term difference from [new_currency_with_otw](</references/framework/sui_sui/coin_registry#sui_coin_registry_new_currency_with_otw>).  
This can be called from the module that defines T any time after it has been published.
[code] 
    **public** **fun** [new_currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_new_currency>)<T: key>(registry: &**mut** [sui::coin_registry::CoinRegistry](</references/framework/sui_sui/coin_registry#sui_coin_registry_CoinRegistry>), [decimals](</references/framework/sui_sui/coin_registry#sui_coin_registry_decimals>): u8, [symbol](</references/framework/sui_sui/coin_registry#sui_coin_registry_symbol>): [std::string::String](</references/framework/sui_std/string#std_string_String>), [name](</references/framework/sui_sui/coin_registry#sui_coin_registry_name>): [std::string::String](</references/framework/sui_std/string#std_string_String>), [description](</references/framework/sui_sui/coin_registry#sui_coin_registry_description>): [std::string::String](</references/framework/sui_std/string#std_string_String>), [icon_url](</references/framework/sui_sui/coin_registry#sui_coin_registry_icon_url>): [std::string::String](</references/framework/sui_std/string#std_string_String>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::coin_registry::CurrencyInitializer](</references/framework/sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer>)<T>, [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>)
    
[/code]

## Function new_currency_with_otw​

Creates a new currency with using an OTW as proof of uniqueness.

This is a two-step operation:

  1. [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) is constructed in the init function and sent to the [CoinRegistry](</references/framework/sui_sui/coin_registry#sui_coin_registry_CoinRegistry>);
  2. [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) is promoted to a shared object in the [finalize_registration](</references/framework/sui_sui/coin_registry#sui_coin_registry_finalize_registration>) call;


[code] 
    **public** **fun** [new_currency_with_otw](</references/framework/sui_sui/coin_registry#sui_coin_registry_new_currency_with_otw>)<T: drop>(otw: T, [decimals](</references/framework/sui_sui/coin_registry#sui_coin_registry_decimals>): u8, [symbol](</references/framework/sui_sui/coin_registry#sui_coin_registry_symbol>): [std::string::String](</references/framework/sui_std/string#std_string_String>), [name](</references/framework/sui_sui/coin_registry#sui_coin_registry_name>): [std::string::String](</references/framework/sui_std/string#std_string_String>), [description](</references/framework/sui_sui/coin_registry#sui_coin_registry_description>): [std::string::String](</references/framework/sui_std/string#std_string_String>), [icon_url](</references/framework/sui_sui/coin_registry#sui_coin_registry_icon_url>): [std::string::String](</references/framework/sui_std/string#std_string_String>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::coin_registry::CurrencyInitializer](</references/framework/sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer>)<T>, [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>)
    
[/code]

## Function claim_metadata_cap​

Claim a [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>) for a coin type.  
Only allowed from the owner of TreasuryCap, and only once.

Aborts if the [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>) has already been claimed.  
Deleted [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>) cannot be reclaimed.
[code] 
    **public** **fun** [claim_metadata_cap](</references/framework/sui_sui/coin_registry#sui_coin_registry_claim_metadata_cap>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, _: &[sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin_registry::MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>)<T>
    
[/code]

## Function make_regulated​

Allows converting a currency, on init, to regulated, which creates a DenyCapV2 object, and a denylist entry. Sets regulated state to Regulated.

This action is irreversible.
[code] 
    **public** **fun** [make_regulated](</references/framework/sui_sui/coin_registry#sui_coin_registry_make_regulated>)<T>(init: &**mut** [sui::coin_registry::CurrencyInitializer](</references/framework/sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer>)<T>, allow_global_pause: bool, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::DenyCapV2](</references/framework/sui_sui/coin#sui_coin_DenyCapV2>)<T>
    
[/code]

## Function make_supply_fixed_init​

Initializer function to make the supply fixed.  
Aborts if Supply is 0 to enforce minting during initialization.
[code] 
    **public** **fun** [make_supply_fixed_init](</references/framework/sui_sui/coin_registry#sui_coin_registry_make_supply_fixed_init>)<T>(init: &**mut** [sui::coin_registry::CurrencyInitializer](</references/framework/sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer>)<T>, cap: [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>)
    
[/code]

## Function make_supply_burn_only_init​

Initializer function to make the supply burn-only.  
Aborts if Supply is 0 to enforce minting during initialization.
[code] 
    **public** **fun** [make_supply_burn_only_init](</references/framework/sui_sui/coin_registry#sui_coin_registry_make_supply_burn_only_init>)<T>(init: &**mut** [sui::coin_registry::CurrencyInitializer](</references/framework/sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer>)<T>, cap: [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>)
    
[/code]

## Function make_supply_fixed​

Freeze the supply by destroying the TreasuryCap and storing it in the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>).
[code] 
    **public** **fun** [make_supply_fixed](</references/framework/sui_sui/coin_registry#sui_coin_registry_make_supply_fixed>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, cap: [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>)
    
[/code]

## Function make_supply_burn_only​

Make the supply BurnOnly by giving up the TreasuryCap, and allowing burning of Coins through the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>).
[code] 
    **public** **fun** [make_supply_burn_only](</references/framework/sui_sui/coin_registry#sui_coin_registry_make_supply_burn_only>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, cap: [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>)
    
[/code]

## Function finalize​

Finalize the coin initialization, returning [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>)
[code] 
    **public** **fun** [finalize](</references/framework/sui_sui/coin_registry#sui_coin_registry_finalize>)<T>(builder: [sui::coin_registry::CurrencyInitializer](</references/framework/sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin_registry::MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>)<T>
    
[/code]

## Function finalize_and_delete_metadata_cap​

Does the same as [finalize](</references/framework/sui_sui/coin_registry#sui_coin_registry_finalize>), but also deletes the [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>) after finalization.
[code] 
    **public** **fun** [finalize_and_delete_metadata_cap](</references/framework/sui_sui/coin_registry#sui_coin_registry_finalize_and_delete_metadata_cap>)<T>(builder: [sui::coin_registry::CurrencyInitializer](</references/framework/sui_sui/coin_registry#sui_coin_registry_CurrencyInitializer>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function finalize_registration​

The second step in the "otw" initialization of coin metadata, that takes in the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T> that was transferred from init, and transforms it in to a "derived address" shared object.

Can be performed by anyone.
[code] 
    **public** **fun** [finalize_registration](</references/framework/sui_sui/coin_registry#sui_coin_registry_finalize_registration>)<T>(registry: &**mut** [sui::coin_registry::CoinRegistry](</references/framework/sui_sui/coin_registry#sui_coin_registry_CoinRegistry>), currency: [sui::transfer::Receiving](</references/framework/sui_sui/transfer#sui_transfer_Receiving>)<[sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>>, _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function delete_metadata_cap ​

Delete the metadata cap making further updates of [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) metadata impossible.  
This action is IRREVERSIBLE, and the [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>) can no longer be claimed.
[code] 
    **public** **fun** [delete_metadata_cap](</references/framework/sui_sui/coin_registry#sui_coin_registry_delete_metadata_cap>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, cap: [sui::coin_registry::MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>)<T>)
    
[/code]

## Function burn​

Burn the Coin if the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) has a BurnOnly supply state.
[code] 
    **public** **fun** [burn](</references/framework/sui_sui/coin_registry#sui_coin_registry_burn>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, [coin](</references/framework/sui_sui/coin#sui_coin>): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>)
    
[/code]

## Function burn_balance​

Burn the Balance if the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) has a BurnOnly supply state.
[code] 
    **public** **fun** [burn_balance](</references/framework/sui_sui/coin_registry#sui_coin_registry_burn_balance>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, [balance](</references/framework/sui_sui/balance#sui_balance>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>)
    
[/code]

## Function set_name​

Update the name of the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>).
[code] 
    **public** **fun** [set_name](</references/framework/sui_sui/coin_registry#sui_coin_registry_set_name>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, _: &[sui::coin_registry::MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>)<T>, [name](</references/framework/sui_sui/coin_registry#sui_coin_registry_name>): [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

## Function set_description​

Update the description of the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>).
[code] 
    **public** **fun** [set_description](</references/framework/sui_sui/coin_registry#sui_coin_registry_set_description>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, _: &[sui::coin_registry::MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>)<T>, [description](</references/framework/sui_sui/coin_registry#sui_coin_registry_description>): [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

## Function set_icon_url​

Update the icon URL of the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>).
[code] 
    **public** **fun** [set_icon_url](</references/framework/sui_sui/coin_registry#sui_coin_registry_set_icon_url>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, _: &[sui::coin_registry::MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>)<T>, [icon_url](</references/framework/sui_sui/coin_registry#sui_coin_registry_icon_url>): [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

## Function set_treasury_cap_id​

Register the treasury cap ID for a migrated [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>). All currencies created with [new_currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_new_currency>) or [new_currency_with_otw](</references/framework/sui_sui/coin_registry#sui_coin_registry_new_currency_with_otw>) have their treasury cap ID set during initialization.
[code] 
    **public** **fun** [set_treasury_cap_id](</references/framework/sui_sui/coin_registry#sui_coin_registry_set_treasury_cap_id>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, cap: &[sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>)
    
[/code]

## Function migrate_legacy_metadata​

Register CoinMetadata in the [CoinRegistry](</references/framework/sui_sui/coin_registry#sui_coin_registry_CoinRegistry>). This can happen only once, if the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) did not exist yet. Further updates are possible through [update_from_legacy_metadata](</references/framework/sui_sui/coin_registry#sui_coin_registry_update_from_legacy_metadata>).
[code] 
    **public** **fun** [migrate_legacy_metadata](</references/framework/sui_sui/coin_registry#sui_coin_registry_migrate_legacy_metadata>)<T>(registry: &**mut** [sui::coin_registry::CoinRegistry](</references/framework/sui_sui/coin_registry#sui_coin_registry_CoinRegistry>), legacy: &[sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>, _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_from_legacy_metadata​

Update [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) from CoinMetadata if the [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>) is not claimed. After the [MetadataCap](</references/framework/sui_sui/coin_registry#sui_coin_registry_MetadataCap>) is claimed, updates can only be made through set_* functions.
[code] 
    **public** **fun** [update_from_legacy_metadata](</references/framework/sui_sui/coin_registry#sui_coin_registry_update_from_legacy_metadata>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, legacy: &[sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>)
    
[/code]

## Function delete_migrated_legacy_metadata​
[code] 
    **public** **fun** [delete_migrated_legacy_metadata](</references/framework/sui_sui/coin_registry#sui_coin_registry_delete_migrated_legacy_metadata>)<T>(_: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, _: [sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>)
    
[/code]

## Function migrate_regulated_state_by_metadata​

Allow migrating the regulated state by access to RegulatedCoinMetadata frozen object.  
This is a permissionless operation which can be performed only once.
[code] 
    **public** **fun** [migrate_regulated_state_by_metadata](</references/framework/sui_sui/coin_registry#sui_coin_registry_migrate_regulated_state_by_metadata>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, metadata: &[sui::coin::RegulatedCoinMetadata](</references/framework/sui_sui/coin#sui_coin_RegulatedCoinMetadata>)<T>)
    
[/code]

## Function migrate_regulated_state_by_cap​

Mark regulated state by showing the DenyCapV2 object for the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>).
[code] 
    **public** **fun** [migrate_regulated_state_by_cap](</references/framework/sui_sui/coin_registry#sui_coin_registry_migrate_regulated_state_by_cap>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, cap: &[sui::coin::DenyCapV2](</references/framework/sui_sui/coin#sui_coin_DenyCapV2>)<T>)
    
[/code]

## Function borrow_legacy_metadata​

Borrow the legacy CoinMetadata from a new [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>). To preserve the ID of the legacy CoinMetadata, we create it on request and then store it as a dynamic field for future borrows.

[Borrow](</references/framework/sui_sui/coin_registry#sui_coin_registry_Borrow>)<T> ensures that the CoinMetadata is returned in the same transaction.
[code] 
    **public** **fun** [borrow_legacy_metadata](</references/framework/sui_sui/coin_registry#sui_coin_registry_borrow_legacy_metadata>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>, [sui::coin_registry::Borrow](</references/framework/sui_sui/coin_registry#sui_coin_registry_Borrow>)<T>)
    
[/code]

## Function return_borrowed_legacy_metadata​

Return the borrowed CoinMetadata and the [Borrow](</references/framework/sui_sui/coin_registry#sui_coin_registry_Borrow>) potato to the [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>).

Note to self: Borrow requirement prevents deletion through this method.
[code] 
    **public** **fun** [return_borrowed_legacy_metadata](</references/framework/sui_sui/coin_registry#sui_coin_registry_return_borrowed_legacy_metadata>)<T>(currency: &**mut** [sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>, legacy: [sui::coin::CoinMetadata](</references/framework/sui_sui/coin#sui_coin_CoinMetadata>)<T>, [borrow](</references/framework/sui_sui/borrow#sui_borrow>): [sui::coin_registry::Borrow](</references/framework/sui_sui/coin_registry#sui_coin_registry_Borrow>)<T>, _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function decimals​

Get the number of decimal places for the coin type.
[code] 
    **public** **fun** [decimals](</references/framework/sui_sui/coin_registry#sui_coin_registry_decimals>)<T>(currency: &[sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>): u8
    
[/code]

## Function name​

Get the human-readable name of the coin.
[code] 
    **public** **fun** [name](</references/framework/sui_sui/coin_registry#sui_coin_registry_name>)<T>(currency: &[sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function symbol​

Get the symbol/ticker of the coin.
[code] 
    **public** **fun** [symbol](</references/framework/sui_sui/coin_registry#sui_coin_registry_symbol>)<T>(currency: &[sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function description​

Get the description of the coin.
[code] 
    **public** **fun** [description](</references/framework/sui_sui/coin_registry#sui_coin_registry_description>)<T>(currency: &[sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function icon_url​

Get the icon URL for the coin.
[code] 
    **public** **fun** [icon_url](</references/framework/sui_sui/coin_registry#sui_coin_registry_icon_url>)<T>(currency: &[sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>): [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
[/code]

## Function is_metadata_cap_claimed​

Check if the metadata capability has been claimed for this [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) type.
[code] 
    **public** **fun** [is_metadata_cap_claimed](</references/framework/sui_sui/coin_registry#sui_coin_registry_is_metadata_cap_claimed>)<T>(currency: &[sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>): bool
    
[/code]

## Function is_metadata_cap_deleted​

Check if the metadata capability has been deleted for this [Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>) type.
[code] 
    **public** **fun** [is_metadata_cap_deleted](</references/framework/sui_sui/coin_registry#sui_coin_registry_is_metadata_cap_deleted>)<T>(currency: &[sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>): bool
    
[/code]

## Function metadata_cap_id​

Get the metadata cap ID, or none if it has not been claimed.
[code] 
    **public** **fun** [metadata_cap_id](</references/framework/sui_sui/coin_registry#sui_coin_registry_metadata_cap_id>)<T>(currency: &[sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)>
    
[/code]

## Function treasury_cap_id​

Get the treasury cap ID for this coin type, if registered.
[code] 
    **public** **fun** [treasury_cap_id](</references/framework/sui_sui/coin_registry#sui_coin_registry_treasury_cap_id>)<T>(currency: &[sui::coin_registry::Currency](</references/framework/sui_sui/coin_registry#sui_coin_registry_Currency>)<T>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)>
    
[/code]

* * *

_This page has been truncated because it exceeds the maximum character limit.[View the full source](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui/coin_registry.md>)._

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/coin_registry.md>)

[Previouscoin](</references/framework/sui_sui/coin>)[Nextconfig](</references/framework/sui_sui/config>)
