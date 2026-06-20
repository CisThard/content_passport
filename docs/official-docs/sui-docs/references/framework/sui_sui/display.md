<!-- Source: https://docs.sui.io/references/framework/sui_sui/display -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * display


# Module sui::display

Defines a Display struct which defines the way an Object should be displayed. The intention is to keep data as independent from its display as possible, protecting the development process and keeping it separate from the ecosystem agreements.

Each of the fields of the Display object should allow for pattern substitution and filling-in the pieces using the data from the object T.

More entry functions might be added in the future depending on the use cases.
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

## Struct Display​

The Display object. Defines the way a T instance should be displayed. Display object can only be created and modified with a PublisherCap, making sure that the rules are set by the owner of the type.

Each of the display properties should support patterns outside of the system, making it simpler to customize Display based on the property values of an Object.
[code] 
    // Example of a display object.<br/>  
    Display<0x...::capy::Capy> {  
     fields:  
       <name, "Capy { genes }">  
       <link, "https://capy.art/capy/{ id }">  
       <image, "https://api.capy.art/capy/{ id }/svg">  
       <description, "Lovely Capy, one of many">  
    }  
    
[/code]

Uses only String type due to external-facing nature of the object, the property names have a priority over their types.
[code] 
    **public** **struct** [Display](</references/framework/sui_sui/display#sui_display_Display>)<**phantom** T: key> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[fields](</references/framework/sui_sui/display#sui_display_fields>): [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<[std::string::String](</references/framework/sui_std/string#std_string_String>), [std::string::String](</references/framework/sui_std/string#std_string_String>)>
     Contains fields for display. Currently supported fields are: name, link, image and description. 
[version](</references/framework/sui_sui/display#sui_display_version>): u16
     Version that can only be updated manually by the Publisher. 

## Struct DisplayCreated​

Event: emitted when a new Display object has been created for type T.  
Type signature of the event corresponds to the type while id serves for the discovery.

Since Sui RPC supports querying events by type, finding a Display for the T would be as simple as looking for the first event with [Display](</references/framework/sui_sui/display#sui_display_Display>)<T>.
[code] 
    **public** **struct** [DisplayCreated](</references/framework/sui_sui/display#sui_display_DisplayCreated>)<**phantom** T: key> **has** **copy** , drop
    
[/code]

Click to openFields

id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Struct VersionUpdated​

Version of Display got updated -
[code] 
    **public** **struct** [VersionUpdated](</references/framework/sui_sui/display#sui_display_VersionUpdated>)<**phantom** T: key> **has** **copy** , drop
    
[/code]

Click to openFields

id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[version](</references/framework/sui_sui/display#sui_display_version>): u16
    
[fields](</references/framework/sui_sui/display#sui_display_fields>): [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<[std::string::String](</references/framework/sui_std/string#std_string_String>), [std::string::String](</references/framework/sui_std/string#std_string_String>)>
    

## Constants​

For when T does not belong to the package Publisher.
[code] 
    **const** [ENotOwner](</references/framework/sui_sui/display#sui_display_ENotOwner>): u64 = 0;
    
[/code]

For when vectors passed into one of the multiple insert functions don't match in their lengths.
[code] 
    **const** [EVecLengthMismatch](</references/framework/sui_sui/display#sui_display_EVecLengthMismatch>): u64 = 1;
    
[/code]

## Function new​

Create an empty Display object. It can either be shared empty or filled with data right away via cheaper set_owned method.
[code] 
    **public** **fun** [new](</references/framework/sui_sui/display#sui_display_new>)<T: key>(pub: &[sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>
    
[/code]

## Function new_with_fields​

Create a new Display object with a set of fields.
[code] 
    **public** **fun** [new_with_fields](</references/framework/sui_sui/display#sui_display_new_with_fields>)<T: key>(pub: &[sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>), [fields](</references/framework/sui_sui/display#sui_display_fields>): vector<[std::string::String](</references/framework/sui_std/string#std_string_String>)>, values: vector<[std::string::String](</references/framework/sui_std/string#std_string_String>)>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>
    
[/code]

## Function create_and_keep​

Create a new empty Display object and keep it.
[code] 
    **public** **entry** **fun** [create_and_keep](</references/framework/sui_sui/display#sui_display_create_and_keep>)<T: key>(pub: &[sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function update_version​

Manually bump the version and emit an event with the updated version's contents.
[code] 
    **public** **entry** **fun** [update_version](</references/framework/sui_sui/display#sui_display_update_version>)<T: key>([display](</references/framework/sui_sui/display#sui_display>): &**mut** [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>)
    
[/code]

## Function add​

Sets a custom name field with the value.
[code] 
    **public** **entry** **fun** [add](</references/framework/sui_sui/display#sui_display_add>)<T: key>(self: &**mut** [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>, name: [std::string::String](</references/framework/sui_std/string#std_string_String>), value: [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

## Function add_multiple​

Sets multiple [fields](</references/framework/sui_sui/display#sui_display_fields>) with values.
[code] 
    **public** **entry** **fun** [add_multiple](</references/framework/sui_sui/display#sui_display_add_multiple>)<T: key>(self: &**mut** [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>, [fields](</references/framework/sui_sui/display#sui_display_fields>): vector<[std::string::String](</references/framework/sui_std/string#std_string_String>)>, values: vector<[std::string::String](</references/framework/sui_std/string#std_string_String>)>)
    
[/code]

## Function edit​

Change the value of the field.  
TODO (long run): version changes;
[code] 
    **public** **entry** **fun** [edit](</references/framework/sui_sui/display#sui_display_edit>)<T: key>(self: &**mut** [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>, name: [std::string::String](</references/framework/sui_std/string#std_string_String>), value: [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

## Function remove​

Remove the key from the Display.
[code] 
    **public** **entry** **fun** [remove](</references/framework/sui_sui/display#sui_display_remove>)<T: key>(self: &**mut** [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>, name: [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

## Function is_authorized​

Authorization check; can be performed externally to implement protection rules for Display.
[code] 
    **public** **fun** [is_authorized](</references/framework/sui_sui/display#sui_display_is_authorized>)<T: key>(pub: &[sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>)): bool
    
[/code]

## Function version​

Read the [version](</references/framework/sui_sui/display#sui_display_version>) field.
[code] 
    **public** **fun** [version](</references/framework/sui_sui/display#sui_display_version>)<T: key>(d: &[sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>): u16
    
[/code]

## Function fields​

Read the [fields](</references/framework/sui_sui/display#sui_display_fields>) field.
[code] 
    **public** **fun** [fields](</references/framework/sui_sui/display#sui_display_fields>)<T: key>(d: &[sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>): &[sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<[std::string::String](</references/framework/sui_std/string#std_string_String>), [std::string::String](</references/framework/sui_std/string#std_string_String>)>
    
[/code]

## Function destroy​

Allow destroying legacy display objects.
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [destroy](</references/framework/sui_sui/display#sui_display_destroy>)<T: key>([display](</references/framework/sui_sui/display#sui_display>): [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>)
    
[/code]

## Function create_internal​

Internal function to create a new [Display](</references/framework/sui_sui/display#sui_display_Display>)<T>.
[code] 
    **fun** [create_internal](</references/framework/sui_sui/display#sui_display_create_internal>)<T: key>(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>
    
[/code]

## Function add_internal​

Private method for inserting fields without security checks.
[code] 
    **fun** [add_internal](</references/framework/sui_sui/display#sui_display_add_internal>)<T: key>([display](</references/framework/sui_sui/display#sui_display>): &**mut** [sui::display::Display](</references/framework/sui_sui/display#sui_display_Display>)<T>, name: [std::string::String](</references/framework/sui_std/string#std_string_String>), value: [std::string::String](</references/framework/sui_std/string#std_string_String>))
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/display.md>)

[Previousderived_object](</references/framework/sui_sui/derived_object>)[Nextdisplay_registry](</references/framework/sui_sui/display_registry>)
