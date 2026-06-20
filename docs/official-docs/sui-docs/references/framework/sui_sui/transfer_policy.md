<!-- Source: https://docs.sui.io/references/framework/sui_sui/transfer_policy -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * transfer_policy


# Module sui::transfer_policy

Defines the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>) type and the logic to approve [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>)s.

  * TransferPolicy - is a highly customizable primitive, which provides an interface for the type owner to set custom transfer rules for every deal performed in the Kiosk or a similar system that integrates with TP.

  * Once a [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T> is created for and shared (or frozen), the type T becomes tradable in Kiosks. On every purchase operation, a [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>) is created and needs to be confirmed by the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>) hot potato or transaction will fail.

  * Type owner (creator) can set any Rules as long as the ecosystem supports them. All of the Rules need to be resolved within a single transaction (eg pay royalty and pay fixed commission). Once required actions are performed, the [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>) can be "confirmed" via [confirm_request](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_confirm_request>) call.

  * [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>) aims to be the main interface for creators to control trades of their types and collect profits if a fee is required on sales. Custom policies can be removed at any moment, and the change will affect all instances of the type at once.


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
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::types](</references/framework/sui_sui/types#sui_types>);
    **use** [sui::url](</references/framework/sui_sui/url#sui_url>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    **use** [sui::vec_set](</references/framework/sui_sui/vec_set#sui_vec_set>);
    
[/code]

## Struct TransferRequest​

A "Hot Potato" forcing the buyer to get a transfer permission from the item type (T) owner on purchase attempt.
[code] 
    **public** **struct** [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>)<**phantom** T>
    
[/code]

Click to openFields

[item](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_item>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     The ID of the transferred item. Although the T has no constraints, the main use case for this module is to work with Objects. 
[paid](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_paid>): u64
     Amount of SUI paid for the item. Can be used to calculate the fee / transfer policy enforcement. 
[from](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_from>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     The ID of the Kiosk / Safe the object is being sold from.  
Can be used by the TransferPolicy implementors. 
receipts: [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)>
     Collected Receipts. Used to verify that all of the rules were followed and [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>) can be confirmed. 

## Struct TransferPolicy​

A unique capability that allows the owner of the T to authorize transfers. Can only be created with the Publisher object. Although there's no limitation to how many policies can be created, for most of the cases there's no need to create more than one since any of the policies can be used to confirm the [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>).
[code] 
    **public** **struct** [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<**phantom** T> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[balance](</references/framework/sui_sui/balance#sui_balance>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
     The Balance of the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>) which collects SUI.  
By default, transfer policy does not collect anything , and it's a matter of an implementation of a specific rule - whether to add to balance and how much. 
[rules](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_rules>): [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)>
     Set of types of attached rules - used to verify receipts when a [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>) is received in [confirm_request](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_confirm_request>) function.  
Additionally provides a way to look up currently attached Rules. 

## Struct TransferPolicyCap​

A Capability granting the owner permission to add/remove rules as well as to [withdraw](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_withdraw>) and [destroy_and_withdraw](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_destroy_and_withdraw>) the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>).
[code] 
    **public** **struct** [TransferPolicyCap](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap>)<**phantom** T> **has** key, store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
policy_id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Struct TransferPolicyCreated​

Event that is emitted when a publisher creates a new [TransferPolicyCap](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap>) making the discoverability and tracking the supported types easier.
[code] 
    **public** **struct** [TransferPolicyCreated](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCreated>)<**phantom** T> **has** **copy** , drop
    
[/code]

Click to openFields

id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Struct TransferPolicyDestroyed​

Event that is emitted when a publisher destroys a [TransferPolicyCap](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap>).  
Allows for tracking supported policies.
[code] 
    **public** **struct** [TransferPolicyDestroyed](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyDestroyed>)<**phantom** T> **has** **copy** , drop
    
[/code]

Click to openFields

id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Struct RuleKey​

Key to store "Rule" configuration for a specific [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>).
[code] 
    **public** **struct** [RuleKey](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_RuleKey>)<**phantom** T: drop> **has** **copy** , drop, store
    
[/code]

## Constants​

The number of receipts does not match the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>) requirement.
[code] 
    **const** [EPolicyNotSatisfied](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_EPolicyNotSatisfied>): u64 = 0;
    
[/code]

A completed rule is not set in the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>).
[code] 
    **const** [EIllegalRule](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_EIllegalRule>): u64 = 1;
    
[/code]

A Rule is not set.
[code] 
    **const** [EUnknownRequirement](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_EUnknownRequirement>): u64 = 2;
    
[/code]

Attempting to create a Rule that is already set.
[code] 
    **const** [ERuleAlreadySet](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_ERuleAlreadySet>): u64 = 3;
    
[/code]

Trying to [withdraw](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_withdraw>) or close_and_withdraw with a wrong Cap.
[code] 
    **const** [ENotOwner](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_ENotOwner>): u64 = 4;
    
[/code]

Trying to [withdraw](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_withdraw>) more than there is.
[code] 
    **const** [ENotEnough](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_ENotEnough>): u64 = 5;
    
[/code]

## Function new_request​

Construct a new [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>) hot potato which requires an approving action from the creator to be destroyed / resolved. Once created, it must be confirmed in the [confirm_request](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_confirm_request>) call otherwise the transaction will fail.
[code] 
    **public** **fun** [new_request](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_new_request>)<T>([item](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_item>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>), [paid](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_paid>): u64, [from](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_from>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)): [sui::transfer_policy::TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>)<T>
    
[/code]

## Function new​

Register a type in the Kiosk system and receive a [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>) and a [TransferPolicyCap](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap>) for the type. The [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>) is required to confirm kiosk deals for the T. If there's no [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>) available for use, the type can not be traded in kiosks.
[code] 
    **public** **fun** [new](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_new>)<T>(pub: &[sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>, [sui::transfer_policy::TransferPolicyCap](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap>)<T>)
    
[/code]

## Function default​

Initialize the Transfer Policy in the default scenario: Create and share the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>), transfer [TransferPolicyCap](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap>) to the transaction sender.
[code] 
    **entry** **fun** [default](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_default>)<T>(pub: &[sui::package::Publisher](</references/framework/sui_sui/package#sui_package_Publisher>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function withdraw​

Withdraw some amount of profits from the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>). If amount is not specified, all profits are withdrawn.
[code] 
    **public** **fun** [withdraw](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_withdraw>)<T>(self: &**mut** [sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>, cap: &[sui::transfer_policy::TransferPolicyCap](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap>)<T>, amount: [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<u64>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function destroy_and_withdraw​

Destroy a TransferPolicyCap.  
Can be performed by any party as long as they own it.
[code] 
    **public** **fun** [destroy_and_withdraw](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_destroy_and_withdraw>)<T>(self: [sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>, cap: [sui::transfer_policy::TransferPolicyCap](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>
    
[/code]

## Function confirm_request​

Allow a [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>) for the type T. The call is protected by the type constraint, as only the publisher of the T can get [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>.

Note: unless there's a policy for T to allow transfers,.  
Kiosk trades will not be possible.
[code] 
    **public** **fun** [confirm_request](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_confirm_request>)<T>(self: &[sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>, request: [sui::transfer_policy::TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>)<T>): ([sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>), u64, [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>))
    
[/code]

## Function add_rule​

Add a custom Rule to the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>). Once set, [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>) must receive a confirmation of the rule executed so the hot potato can be unpacked.

  * T: the type to which TransferPolicy is applied.
  * Rule: the witness type for the Custom rule
  * Config: a custom configuration for the rule


Config requires drop to allow creators to remove any policy at any moment, even if graceful unpacking has not been implemented in a "rule module".
[code] 
    **public** **fun** [add_rule](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_add_rule>)<T, Rule: drop, Config: drop, store>(_: Rule, policy: &**mut** [sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>, cap: &[sui::transfer_policy::TransferPolicyCap](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap>)<T>, cfg: Config)
    
[/code]

## Function get_rule​

Get the custom Config for the Rule (can be only one per "Rule" type).
[code] 
    **public** **fun** [get_rule](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_get_rule>)<T, Rule: drop, Config: drop, store>(_: Rule, policy: &[sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>): &Config
    
[/code]

## Function add_to_balance​

Add some SUI to the balance of a [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>).
[code] 
    **public** **fun** [add_to_balance](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_add_to_balance>)<T, Rule: drop>(_: Rule, policy: &**mut** [sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>, [coin](</references/framework/sui_sui/coin#sui_coin>): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<[sui::sui::SUI](</references/framework/sui_sui/sui#sui_sui_SUI>)>)
    
[/code]

## Function add_receipt​

Adds a Receipt to the [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>), unblocking the request and confirming that the policy requirements are satisfied.
[code] 
    **public** **fun** [add_receipt](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_add_receipt>)<T, Rule: drop>(_: Rule, request: &**mut** [sui::transfer_policy::TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>)<T>)
    
[/code]

## Function has_rule​

Check whether a custom rule has been added to the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>).
[code] 
    **public** **fun** [has_rule](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_has_rule>)<T, Rule: drop>(policy: &[sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>): bool
    
[/code]

## Function remove_rule​

Remove the Rule from the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>).
[code] 
    **public** **fun** [remove_rule](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_remove_rule>)<T, Rule: drop, Config: drop, store>(policy: &**mut** [sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>, cap: &[sui::transfer_policy::TransferPolicyCap](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap>)<T>)
    
[/code]

## Function uid​

Allows reading custom attachments to the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>) if there are any.
[code] 
    **public** **fun** [uid](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_uid>)<T>(self: &[sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>): &[sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function uid_mut_as_owner​

Get a mutable reference to the self.id to enable custom attachments to the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>).
[code] 
    **public** **fun** [uid_mut_as_owner](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_uid_mut_as_owner>)<T>(self: &**mut** [sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>, cap: &[sui::transfer_policy::TransferPolicyCap](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicyCap>)<T>): &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[/code]

## Function rules​

Read the [rules](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_rules>) field from the [TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>).
[code] 
    **public** **fun** [rules](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_rules>)<T>(self: &[sui::transfer_policy::TransferPolicy](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferPolicy>)<T>): &[sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)>
    
[/code]

## Function item​

Get the [item](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_item>) field of the [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>).
[code] 
    **public** **fun** [item](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_item>)<T>(self: &[sui::transfer_policy::TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>)<T>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function paid​

Get the [paid](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_paid>) field of the [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>).
[code] 
    **public** **fun** [paid](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_paid>)<T>(self: &[sui::transfer_policy::TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>)<T>): u64
    
[/code]

## Function from​

Get the [from](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_from>) field of the [TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>).
[code] 
    **public** **fun** [from](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_from>)<T>(self: &[sui::transfer_policy::TransferRequest](</references/framework/sui_sui/transfer_policy#sui_transfer_policy_TransferRequest>)<T>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/transfer_policy.md>)

[Previoustransfer](</references/framework/sui_sui/transfer>)[Nexttx_context](</references/framework/sui_sui/tx_context>)
