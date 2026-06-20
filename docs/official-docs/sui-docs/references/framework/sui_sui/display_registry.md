<!-- Source: https://docs.sui.io/references/framework/sui_sui/display_registry -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * display_registry


# Module sui::display_registry
[code]
    **use** [std::address](</references/framework/sui_std/address#std_address>);
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::internal](</references/framework/sui_std/internal#std_internal>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::type_name](</references/framework/sui_std/type_name#std_type_name>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::accumulator](</references/framework/sui_sui/accumulator#sui_accumulator>);
    **use** [sui::accumulator_settlement](</references/framework/sui_sui/accumulator_settlement#sui_accumulator_settlement>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::bcs](</references/framework/sui_sui/bcs#sui_bcs>);
    **use** [sui::derived_object](</references/framework/sui_sui/derived_object#sui_derived_object>);
    **use** [sui::display](</references/framework/sui_sui/display#sui_display>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::event](</references/framework/sui_sui/event#sui_event>);
    **use** [sui::hash](</references/framework/sui_sui/hash#sui_hash>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::package](</references/framework/sui_sui/package#sui_package>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::types](</references/framework/sui_sui/types#sui_types>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct DisplayRegistry​

The root of display, to enable derivation of addresses.  
The address is system-generated at 0xd
[code] 
    **public** **struct** [DisplayRegistry](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayRegistry>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    

## Struct SystemMigrationCap​

A singleton capability object to enable migrating all V1 displays into V2.
[code] 
    **public** **struct** [SystemMigrationCap](</references/framework/sui_sui/display_registry#sui_display_registry_SystemMigrationCap>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    

## Struct Display​

This is the struct that holds the display values for a type T.
[code] 
    **public** **struct** [Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<**phantom** T> **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[fields](</references/framework/sui_sui/display_registry#sui_display_registry_fields>): [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<[std::string::String](</references/framework/sui_std/string#std_string_String>), [std::string::String](</references/framework/sui_std/string#std_string_String>)>
     All the (key,value) entries for a given display object. 
[cap_id](</references/framework/sui_sui/display_registry#sui_display_registry_cap_id>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)>
     The capability object ID. It's Option because legacy Displays will need claiming. 

## Struct DisplayCap​

The capability object that is used to manage the display.
[code] 
    **public** **struct** [DisplayCap](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayCap>)<**phantom** T> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    

## Struct DisplayKey​

The key used for deriving the instance of [Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>).
[code] 
    **public** **struct** [DisplayKey](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayKey>)<**phantom** T> **has** **copy** , drop, store
    
[/code]

## Constants​

This is a multi-sig address responsible for the migration of V1 displays into V2.
[code] 
    **const** [SYSTEM_MIGRATION_ADDRESS](</references/framework/sui_sui/display_registry#sui_display_registry_SYSTEM_MIGRATION_ADDRESS>): **address** = 0x80e8249451c1a94b0d4ec317d9dd040f11344dcce6f917218086caf2bb1d7bdd;
    
[/code]
[code] 
    #[error]
    **const** [ENotSystemAddress](</references/framework/sui_sui/display_registry#sui_display_registry_ENotSystemAddress>): vector<u8> = b"This is only callable from system **address**.";
    
[/code]
[code] 
    #[error]
    **const** [EDisplayAlreadyExists](</references/framework/sui_sui/display_registry#sui_display_registry_EDisplayAlreadyExists>): vector<u8> = b"[Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>) **for** the supplied type already exists.";
    
[/code]
[code] 
    #[error]
    **const** [ECapAlreadyClaimed](</references/framework/sui_sui/display_registry#sui_display_registry_ECapAlreadyClaimed>): vector<u8> = b"Cap **for** this [display](</references/framework/sui_sui/display#sui_display>) [object](</references/framework/sui_sui/object#sui_object>) **has** already been claimed.";
    
[/code]
[code] 
    #[error]
    **const** [ENotValidPublisher](</references/framework/sui_sui/display_registry#sui_display_registry_ENotValidPublisher>): vector<u8> = b"The publisher is not valid **for** the supplied type.";
    
[/code]
[code] 
    #[error]
    **const** [EFieldDoesNotExist](</references/framework/sui_sui/display_registry#sui_display_registry_EFieldDoesNotExist>): vector<u8> = b"Field does not exist in the [display](</references/framework/sui_sui/display#sui_display>).";
    
[/code]
[code] 
    #[error]
    **const** [ECapNotClaimed](</references/framework/sui_sui/display_registry#sui_display_registry_ECapNotClaimed>): vector<u8> = b"Cap **for** this [display](</references/framework/sui_sui/display#sui_display>) [object](</references/framework/sui_sui/object#sui_object>) **has** not been claimed so you cannot delete the legacy [display](</references/framework/sui_sui/display#sui_display>) yet.";
    
[/code]

## Function new​

Create a new Display object for a given type T using internal::Permit to prove type ownership.
[code] 
    **public** **fun** [new](</references/framework/sui_sui/display_registry#sui_display_registry_new>)<T>(registry: &**mut** [sui::display_registry::DisplayRegistry](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayRegistry>), _: [std::internal::Permit](</references/framework/sui_std/internal#std_internal_Permit>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>, [sui::display_registry::DisplayCap](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayCap>)<T>)
    
[/code]

## Function new_with_publisher​

Create a new display object using the Publisher object.
[code] 
    **public** **fun** [new_with_publisher](</references/framework/sui_sui/display_registry#sui_display_registry_new_with_publisher>)<T>(registry: &**mut** [sui::display_registry::DisplayRegistry](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayRegistry>), publisher: &**mut** [sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>, [sui::display_registry::DisplayCap](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayCap>)<T>)
    
[/code]

## Function unset​

Unset a key from display.
[code] 
    **public** **fun** [unset](</references/framework/sui_sui/display_registry#sui_display_registry_unset>)<T>([display](</references/framework/sui_sui/display#sui_display>): &**mut** [sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>, _: &[sui::display_registry::DisplayCap](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayCap>)<T>, name: [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

## Function set​

Set a value for the specified key, replaces existing value if it exists.
[code] 
    **public** **fun** [set](</references/framework/sui_sui/display_registry#sui_display_registry_set>)<T>([display](</references/framework/sui_sui/display#sui_display>): &**mut** [sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>, _: &[sui::display_registry::DisplayCap](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayCap>)<T>, name: [std::string::String](</references/framework/sui_std/string#std_string_String>), value: [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

## Function clear​

Clear the display vec_map, allowing a fresh re-creation of fields
[code] 
    **public** **fun** [clear](</references/framework/sui_sui/display_registry#sui_display_registry_clear>)<T>([display](</references/framework/sui_sui/display#sui_display>): &**mut** [sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>, _: &[sui::display_registry::DisplayCap](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayCap>)<T>)
    
[/code]

## Function share​

Share the [Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>) object to finalize the creation.
[code] 
    **public** **fun** [share](</references/framework/sui_sui/display_registry#sui_display_registry_share>)<T>([display](</references/framework/sui_sui/display#sui_display>): [sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>)
    
[/code]

## Function claim​

Allow a legacy Display holder to claim the capability object.
[code] 
    **public** **fun** [claim](</references/framework/sui_sui/display_registry#sui_display_registry_claim>)<T: key>([display](</references/framework/sui_sui/display#sui_display>): &**mut** [sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>, legacy: [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::display_registry::DisplayCap](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayCap>)<T>
    
[/code]

## Function claim_with_publisher​

Allow claiming a new display using Publisher as proof of ownership.
[code] 
    **public** **fun** [claim_with_publisher](</references/framework/sui_sui/display_registry#sui_display_registry_claim_with_publisher>)<T: key>([display](</references/framework/sui_sui/display#sui_display>): &**mut** [sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>, publisher: &**mut** [sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::display_registry::DisplayCap](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayCap>)<T>
    
[/code]

## Function system_migration​

Allow the [SystemMigrationCap](</references/framework/sui_sui/display_registry#sui_display_registry_SystemMigrationCap>) holder to create display objects with supplied values. The migration is performed once on launch of the DisplayRegistry, further migrations will have to be performed for each object, and will only be possible until legacy [display](</references/framework/sui_sui/display#sui_display>) methods are finally deprecated.
[code] 
    **public** **fun** [system_migration](</references/framework/sui_sui/display_registry#sui_display_registry_system_migration>)<T: key>(registry: &**mut** [sui::display_registry::DisplayRegistry](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayRegistry>), _: &[sui::display_registry::SystemMigrationCap](</references/framework/sui_sui/display_registry#sui_display_registry_SystemMigrationCap>), keys: vector<[std::string::String](</references/framework/sui_std/string#std_string_String>)>, values: vector<[std::string::String](</references/framework/sui_std/string#std_string_String>)>, _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function migrate_v1_to_v2​

Enables migrating legacy display into the new one, if a new one has not yet been created.
[code] 
    **public** **fun** [migrate_v1_to_v2](</references/framework/sui_sui/display_registry#sui_display_registry_migrate_v1_to_v2>)<T: key>(registry: &**mut** [sui::display_registry::DisplayRegistry](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayRegistry>), legacy: [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>, [sui::display_registry::DisplayCap](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayCap>)<T>)
    
[/code]

## Function destroy_system_migration_cap​

Destroy the [SystemMigrationCap](</references/framework/sui_sui/display_registry#sui_display_registry_SystemMigrationCap>) after successfully migrating all V1 instances.
[code] 
    **entry** **fun** [destroy_system_migration_cap](</references/framework/sui_sui/display_registry#sui_display_registry_destroy_system_migration_cap>)(cap: [sui::display_registry::SystemMigrationCap](</references/framework/sui_sui/display_registry#sui_display_registry_SystemMigrationCap>))
    
[/code]

## Function transfer_migration_cap​
[code] 
    **entry** **fun** [transfer_migration_cap](</references/framework/sui_sui/display_registry#sui_display_registry_transfer_migration_cap>)(cap: [sui::display_registry::SystemMigrationCap](</references/framework/sui_sui/display_registry#sui_display_registry_SystemMigrationCap>), recipient: **address**)
    
[/code]

## Function delete_legacy​

Allow deleting legacy display objects, as long as the cap has been claimed first.
[code] 
    **public** **fun** [delete_legacy](</references/framework/sui_sui/display_registry#sui_display_registry_delete_legacy>)<T: key>([display](</references/framework/sui_sui/display#sui_display>): &[sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>, legacy: [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>)
    
[/code]

## Function fields​

Get a reference to the fields of display.
[code] 
    **public** **fun** [fields](</references/framework/sui_sui/display_registry#sui_display_registry_fields>)<T>([display](</references/framework/sui_sui/display#sui_display>): &[sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>): &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<[std::string::String](</references/framework/sui_std/string#std_string_String>), [std::string::String](</references/framework/sui_std/string#std_string_String>)>
    
[/code]

## Function cap_id​

Get the cap ID for the display.
[code] 
    **public** **fun** [cap_id](</references/framework/sui_sui/display_registry#sui_display_registry_cap_id>)<T>([display](</references/framework/sui_sui/display#sui_display>): &[sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)>
    
[/code]

## Function migration_cap_receiver​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [migration_cap_receiver](</references/framework/sui_sui/display_registry#sui_display_registry_migration_cap_receiver>)(): **address**
    
[/code]

## Function new_display​
[code] 
    **fun** [new_display](</references/framework/sui_sui/display_registry#sui_display_registry_new_display>)<T>(registry: &**mut** [sui::display_registry::DisplayRegistry](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayRegistry>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::display_registry::Display](</references/framework/sui_sui/display_registry#sui_display_registry_Display>)<T>, [sui::display_registry::DisplayCap](</references/framework/sui_sui/display_registry#sui_display_registry_DisplayCap>)<T>)
    
[/code]

## Function create​

Create a new display registry object callable only from 0x0 (end of epoch)
[code] 
    **fun** [create](</references/framework/sui_sui/display_registry#sui_display_registry_create>)(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/display_registry.md>)

[Previousdisplay](</references/framework/sui_sui/display>)[Nextdynamic_field](</references/framework/sui_sui/dynamic_field>)
