<!-- Source: https://docs.sui.io/references/framework/sui_sui/package -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * package


# Module sui::package

Functions for operating on Move packages from within Move:

  * Creating proof-of-publish objects from one-time witnesses
  * Administering package upgrades through upgrade policies.


[code] 
    **use** [std::address](</references/framework/sui_std/address#std_address>);
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::type_name](</references/framework/sui_std/type_name#std_type_name>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::types](</references/framework/sui_sui/types#sui_types>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct Publisher​

This type can only be created in the transaction that generates a module, by consuming its one-time witness, so it can be used to identify the address that published the package a type originated from.
[code] 
    **public** **struct** [Publisher](</references/framework/sui_sui/package#sui_package_Publisher>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[package](</references/framework/sui_sui/package#sui_package>): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
module_name: [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    

## Struct UpgradeCap​

Capability controlling the ability to upgrade a package.
[code] 
    **public** **struct** [UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>) **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[package](</references/framework/sui_sui/package#sui_package>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     (Mutable) ID of the package that can be upgraded. 
[version](</references/framework/sui_sui/package#sui_package_version>): u64
     (Mutable) The number of upgrades that have been applied successively to the original package. Initially 0. 
policy: u8
     What kind of upgrades are allowed. 

## Struct UpgradeTicket​

Permission to perform a particular upgrade (for a fixed version of the package, bytecode to upgrade with and transitive dependencies to depend against).

An [UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>) can only issue one ticket at a time, to prevent races between concurrent updates or a change in its upgrade policy after issuing a ticket, so the ticket is a "Hot Potato" to preserve forward progress.
[code] 
    **public** **struct** [UpgradeTicket](</references/framework/sui_sui/package#sui_package_UpgradeTicket>)
    
[/code]

Click to openFields

cap: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     (Immutable) ID of the [UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>) this originated from. 
[package](</references/framework/sui_sui/package#sui_package>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     (Immutable) ID of the package that can be upgraded. 
policy: u8
     (Immutable) The policy regarding what kind of upgrade this ticket permits. 
digest: vector<u8>
     (Immutable) SHA256 digest of the bytecode and transitive dependencies that will be used in the upgrade. 

## Struct UpgradeReceipt​

Issued as a result of a successful upgrade, containing the information to be used to update the [UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>). This is a "Hot.  
Potato" to ensure that it is used to update its [UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>) before the end of the transaction that performed the upgrade.
[code] 
    **public** **struct** [UpgradeReceipt](</references/framework/sui_sui/package#sui_package_UpgradeReceipt>)
    
[/code]

Click to openFields

cap: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     (Immutable) ID of the [UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>) this originated from. 
[package](</references/framework/sui_sui/package#sui_package>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     (Immutable) ID of the package after it was upgraded. 

## Constants​

Tried to create a [Publisher](</references/framework/sui_sui/package#sui_package_Publisher>) using a type that isn't a one-time witness.
[code] 
    **const** [ENotOneTimeWitness](</references/framework/sui_sui/package#sui_package_ENotOneTimeWitness>): u64 = 0;
    
[/code]

Tried to set a less restrictive policy than currently in place.
[code] 
    **const** [ETooPermissive](</references/framework/sui_sui/package#sui_package_ETooPermissive>): u64 = 1;
    
[/code]

This [UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>) has already authorized a pending upgrade.
[code] 
    **const** [EAlreadyAuthorized](</references/framework/sui_sui/package#sui_package_EAlreadyAuthorized>): u64 = 2;
    
[/code]

This [UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>) has not authorized an upgrade.
[code] 
    **const** [ENotAuthorized](</references/framework/sui_sui/package#sui_package_ENotAuthorized>): u64 = 3;
    
[/code]

Trying to commit an upgrade to the wrong [UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>).
[code] 
    **const** [EWrongUpgradeCap](</references/framework/sui_sui/package#sui_package_EWrongUpgradeCap>): u64 = 4;
    
[/code]

Update any part of the package (function implementations, add new functions or types, change dependencies)
[code] 
    **const** [COMPATIBLE](</references/framework/sui_sui/package#sui_package_COMPATIBLE>): u8 = 0;
    
[/code]

Add new functions or types, or change dependencies, existing functions can't change.
[code] 
    **const** [ADDITIVE](</references/framework/sui_sui/package#sui_package_ADDITIVE>): u8 = 128;
    
[/code]

Only be able to change dependencies.
[code] 
    **const** [DEP_ONLY](</references/framework/sui_sui/package#sui_package_DEP_ONLY>): u8 = 192;
    
[/code]

## Function claim​

Claim a Publisher object.  
Requires a One-Time-Witness to prove ownership. Due to this constraint there can be only one Publisher object per module but multiple per package (!).
[code] 
    **public** **fun** [claim](</references/framework/sui_sui/package#sui_package_claim>)<OTW: drop>(otw: OTW, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>)
    
[/code]

## Function claim_and_keep​

Claim a Publisher object and send it to transaction sender.  
Since this function can only be called in the module initializer, the sender is the publisher.
[code] 
    **public** **fun** [claim_and_keep](</references/framework/sui_sui/package#sui_package_claim_and_keep>)<OTW: drop>(otw: OTW, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function burn_publisher​

Destroy a Publisher object effectively removing all privileges associated with it.
[code] 
    **public** **fun** [burn_publisher](</references/framework/sui_sui/package#sui_package_burn_publisher>)(self: [sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>))
    
[/code]

## Function from_package​

Check whether type belongs to the same package as the publisher object.
[code] 
    **public** **fun** [from_package](</references/framework/sui_sui/package#sui_package_from_package>)<T>(self: &[sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>)): bool
    
[/code]

## Function from_module​

Check whether a type belongs to the same module as the publisher object.
[code] 
    **public** **fun** [from_module](</references/framework/sui_sui/package#sui_package_from_module>)<T>(self: &[sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>)): bool
    
[/code]

## Function published_module​

Read the name of the module.
[code] 
    **public** **fun** [published_module](</references/framework/sui_sui/package#sui_package_published_module>)(self: &[sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>)): &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function published_package​

Read the package address string.
[code] 
    **public** **fun** [published_package](</references/framework/sui_sui/package#sui_package_published_package>)(self: &[sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>)): &[std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function upgrade_package​

The ID of the package that this cap authorizes upgrades for.  
Can be 0x0 if the cap cannot currently authorize an upgrade because there is already a pending upgrade in the transaction.  
Otherwise guaranteed to be the latest version of any given package.
[code] 
    **public** **fun** [upgrade_package](</references/framework/sui_sui/package#sui_package_upgrade_package>)(cap: &[sui::package::UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>)): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function version​

The most recent version of the package, increments by one for each successfully applied upgrade.
[code] 
    **public** **fun** [version](</references/framework/sui_sui/package#sui_package_version>)(cap: &[sui::package::UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>)): u64
    
[/code]

## Function upgrade_policy​

The most permissive kind of upgrade currently supported by this cap.
[code] 
    **public** **fun** [upgrade_policy](</references/framework/sui_sui/package#sui_package_upgrade_policy>)(cap: &[sui::package::UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>)): u8
    
[/code]

## Function ticket_package​

The package that this ticket is authorized to upgrade
[code] 
    **public** **fun** [ticket_package](</references/framework/sui_sui/package#sui_package_ticket_package>)(ticket: &[sui::package::UpgradeTicket](</references/framework/sui_sui/package#sui_package_UpgradeTicket>)): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function ticket_policy​

The kind of upgrade that this ticket authorizes.
[code] 
    **public** **fun** [ticket_policy](</references/framework/sui_sui/package#sui_package_ticket_policy>)(ticket: &[sui::package::UpgradeTicket](</references/framework/sui_sui/package#sui_package_UpgradeTicket>)): u8
    
[/code]

## Function receipt_cap​

ID of the [UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>) that this receipt should be used to update.
[code] 
    **public** **fun** [receipt_cap](</references/framework/sui_sui/package#sui_package_receipt_cap>)(receipt: &[sui::package::UpgradeReceipt](</references/framework/sui_sui/package#sui_package_UpgradeReceipt>)): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function receipt_package​

ID of the package that was upgraded to: the latest version of the package, as of the upgrade represented by this receipt.
[code] 
    **public** **fun** [receipt_package](</references/framework/sui_sui/package#sui_package_receipt_package>)(receipt: &[sui::package::UpgradeReceipt](</references/framework/sui_sui/package#sui_package_UpgradeReceipt>)): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function ticket_digest​

A hash of the package contents for the new version of the package. This ticket only authorizes an upgrade to a package that matches this digest. A package's contents are identified by two things:

  * modules: [[u8]] a list of the package's module contents
  * deps: [[u8; 32]] a list of 32 byte ObjectIDs of the package's transitive dependencies


A package's digest is calculated as:

sha3_256(sort(modules ++ deps))
[code] 
    **public** **fun** [ticket_digest](</references/framework/sui_sui/package#sui_package_ticket_digest>)(ticket: &[sui::package::UpgradeTicket](</references/framework/sui_sui/package#sui_package_UpgradeTicket>)): &vector<u8>
    
[/code]

## Function compatible_policy​

Expose the constants representing various upgrade policies
[code] 
    **public** **fun** [compatible_policy](</references/framework/sui_sui/package#sui_package_compatible_policy>)(): u8
    
[/code]

## Function additive_policy​
[code] 
    **public** **fun** [additive_policy](</references/framework/sui_sui/package#sui_package_additive_policy>)(): u8
    
[/code]

## Function dep_only_policy​
[code] 
    **public** **fun** [dep_only_policy](</references/framework/sui_sui/package#sui_package_dep_only_policy>)(): u8
    
[/code]

## Function only_additive_upgrades​

Restrict upgrades through this upgrade cap to just add code, or change dependencies.
[code] 
    **public** **entry** **fun** [only_additive_upgrades](</references/framework/sui_sui/package#sui_package_only_additive_upgrades>)(cap: &**mut** [sui::package::UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>))
    
[/code]

## Function only_dep_upgrades​

Restrict upgrades through this upgrade cap to just change dependencies.
[code] 
    **public** **entry** **fun** [only_dep_upgrades](</references/framework/sui_sui/package#sui_package_only_dep_upgrades>)(cap: &**mut** [sui::package::UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>))
    
[/code]

## Function make_immutable​

Discard the [UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>) to make a package immutable.
[code] 
    **public** **entry** **fun** [make_immutable](</references/framework/sui_sui/package#sui_package_make_immutable>)(cap: [sui::package::UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>))
    
[/code]

## Function authorize_upgrade​

Issue a ticket authorizing an upgrade to a particular new bytecode (identified by its digest). A ticket will only be issued if one has not already been issued, and if the policy requested is at least as restrictive as the policy set out by the cap.

The digest supplied and the policy will both be checked by validators when running the upgrade. I.e. the bytecode supplied in the upgrade must have a matching digest, and the changes relative to the parent package must be compatible with the policy in the ticket for the upgrade to succeed.
[code] 
    **public** **fun** [authorize_upgrade](</references/framework/sui_sui/package#sui_package_authorize_upgrade>)(cap: &**mut** [sui::package::UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>), policy: u8, digest: vector<u8>): [sui::package::UpgradeTicket](</references/framework/sui_sui/package#sui_package_UpgradeTicket>)
    
[/code]

## Function commit_upgrade​

Consume an [UpgradeReceipt](</references/framework/sui_sui/package#sui_package_UpgradeReceipt>) to update its [UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>), finalizing the upgrade.
[code] 
    **public** **fun** [commit_upgrade](</references/framework/sui_sui/package#sui_package_commit_upgrade>)(cap: &**mut** [sui::package::UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>), receipt: [sui::package::UpgradeReceipt](</references/framework/sui_sui/package#sui_package_UpgradeReceipt>))
    
[/code]

## Function restrict​
[code] 
    **fun** [restrict](</references/framework/sui_sui/package#sui_package_restrict>)(cap: &**mut** [sui::package::UpgradeCap](</references/framework/sui_sui/package#sui_package_UpgradeCap>), policy: u8)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/package.md>)

[Previousobject_table](</references/framework/sui_sui/object_table>)[Nextparty](</references/framework/sui_sui/party>)
