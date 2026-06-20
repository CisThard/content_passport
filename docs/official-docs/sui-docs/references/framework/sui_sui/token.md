<!-- Source: https://docs.sui.io/references/framework/sui_sui/token -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * token


# Module sui::token

The Token module which implements a Closed Loop Token with a configurable policy. The policy is defined by a set of rules that must be satisfied for an action to be performed on the token.

The module is designed to be used with a TreasuryCap to allow for minting and burning of the [Token](</references/framework/sui_sui/token#sui_token_Token>)s. And can act as a replacement / extension or a companion to existing open-loop (Coin) systems.
[code] 
    Module:      sui::balance       sui::coin             sui::token.<br/>  
    Main type:   Balance<T>         Coin<T>               Token<T>.<br/>  
    Capability:  Supply<T>  <---->  TreasuryCap<T> <----> TreasuryCap<T>.<br/>  
    Abilities:   store              key + store           key  
    
[/code]

The Token system allows for fine-grained control over the actions performed on the token. And hence it is highly suitable for applications that require control over the currency which a simple open-loop system can't provide.
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

## Struct Token​

A single [Token](</references/framework/sui_sui/token#sui_token_Token>) with Balance inside. Can only be owned by an address, and actions performed on it must be confirmed in a matching [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).
[code] 
    **public** **struct** [Token](</references/framework/sui_sui/token#sui_token_Token>)<**phantom** T> **has** [key](</references/framework/sui_sui/token#sui_token_key>)
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[balance](</references/framework/sui_sui/balance#sui_balance>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
     The Balance of the [Token](</references/framework/sui_sui/token#sui_token_Token>). 

## Struct TokenPolicyCap​

A Capability that manages a single [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) specified in the **for** field. Created together with [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) in the new function.
[code] 
    **public** **struct** [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>)<**phantom** T> **has** [key](</references/framework/sui_sui/token#sui_token_key>), store
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
**for** : [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    

## Struct TokenPolicy​

[TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) represents a set of rules that define what actions can be performed on a [Token](</references/framework/sui_sui/token#sui_token_Token>) and which Rules must be satisfied for the action to succeed.

  * For the sake of availability, [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) is a [key](</references/framework/sui_sui/token#sui_token_key>)-only object.
  * Each [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) is managed by a matching [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>).
  * For an action to become available, there needs to be a record in the [rules](</references/framework/sui_sui/token#sui_token_rules>) VecMap. To allow an action to be performed freely, there's an [allow](</references/framework/sui_sui/token#sui_token_allow>) function that can be called by the [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>) owner.


[code] 
    **public** **struct** [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<**phantom** T> **has** [key](</references/framework/sui_sui/token#sui_token_key>)
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
[spent_balance](</references/framework/sui_sui/token#sui_token_spent_balance>): [sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>
     The balance that is effectively spent by the user on the "spend" action. However, actual decrease of the supply can only be done by the TreasuryCap owner when [flush](</references/framework/sui_sui/token#sui_token_flush>) is called.  
This balance is effectively spent and cannot be accessed by anyone but the TreasuryCap owner. 
[rules](</references/framework/sui_sui/token#sui_token_rules>): [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<[std::string::String](</references/framework/sui_std/string#std_string_String>), [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)>>
     The set of rules that define what actions can be performed on the token. For each "action" there's a set of Rules that must be satisfied for the [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>) to be confirmed. 

## Struct ActionRequest​

A request to perform an "Action" on a token. Stores the information about the action to be performed and must be consumed by the [confirm_request](</references/framework/sui_sui/token#sui_token_confirm_request>) or [confirm_request_mut](</references/framework/sui_sui/token#sui_token_confirm_request_mut>) functions when the Rules are satisfied.
[code] 
    **public** **struct** [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>)<**phantom** T>
    
[/code]

Click to openFields

name: [std::string::String](</references/framework/sui_std/string#std_string_String>)
     Name of the Action to look up in the Policy. Name can be one of the default actions: [transfer](</references/framework/sui_sui/transfer#sui_transfer>), [spend](</references/framework/sui_sui/token#sui_token_spend>), [to_coin](</references/framework/sui_sui/token#sui_token_to_coin>), [from_coin](</references/framework/sui_sui/token#sui_token_from_coin>) or a custom action. 
[amount](</references/framework/sui_sui/token#sui_token_amount>): u64
     Amount is present in all of the txs 
[sender](</references/framework/sui_sui/token#sui_token_sender>): **address**
     Sender is a permanent field always 
[recipient](</references/framework/sui_sui/token#sui_token_recipient>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<**address** >
     Recipient is only available in [transfer](</references/framework/sui_sui/transfer#sui_transfer>) action. 
[spent_balance](</references/framework/sui_sui/token#sui_token_spent_balance>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>>
     The balance to be "spent" in the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>), only available in the [spend](</references/framework/sui_sui/token#sui_token_spend>) action. 
[approvals](</references/framework/sui_sui/token#sui_token_approvals>): [sui::vec_set::VecSet](</references/framework/sui_sui/vec_set#sui_vec_set_VecSet>)<[std::type_name::TypeName](</references/framework/sui_std/type_name#std_type_name_TypeName>)>
     Collected approvals (stamps) from completed Rules. They're matched against [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).[rules](</references/framework/sui_sui/token#sui_token_rules>) to determine if the request can be confirmed. 

## Struct RuleKey​

Dynamic field key for the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) to store the Config for a specific action Rule. There can be only one configuration per Rule per [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).
[code] 
    **public** **struct** [RuleKey](</references/framework/sui_sui/token#sui_token_RuleKey>)<**phantom** T> **has** **copy** , drop, store
    
[/code]

Click to openFields

is_protected: bool
    

## Struct TokenPolicyCreated​

An event emitted when a [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) is created and shared. Because [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) can only be shared (and potentially frozen in the future), we emit this event in the [share_policy](</references/framework/sui_sui/token#sui_token_share_policy>) function and mark it as mutable.
[code] 
    **public** **struct** [TokenPolicyCreated](</references/framework/sui_sui/token#sui_token_TokenPolicyCreated>)<**phantom** T> **has** **copy** , drop
    
[/code]

Click to openFields

id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
     ID of the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) that was created. 
is_mutable: bool
     Whether the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) is "shared" (mutable) or "frozen" (immutable) - TBD. 

## Constants​

The action is not allowed (defined) in the policy.
[code] 
    **const** [EUnknownAction](</references/framework/sui_sui/token#sui_token_EUnknownAction>): u64 = 0;
    
[/code]

The rule was not approved.
[code] 
    **const** [ENotApproved](</references/framework/sui_sui/token#sui_token_ENotApproved>): u64 = 1;
    
[/code]

Trying to perform an admin action with a wrong cap.
[code] 
    **const** [ENotAuthorized](</references/framework/sui_sui/token#sui_token_ENotAuthorized>): u64 = 2;
    
[/code]

The balance is too low to perform the action.
[code] 
    **const** [EBalanceTooLow](</references/framework/sui_sui/token#sui_token_EBalanceTooLow>): u64 = 3;
    
[/code]

The balance is not zero.
[code] 
    **const** [ENotZero](</references/framework/sui_sui/token#sui_token_ENotZero>): u64 = 4;
    
[/code]

The balance is not zero when trying to confirm with TransferPolicyCap.
[code] 
    **const** [ECantConsumeBalance](</references/framework/sui_sui/token#sui_token_ECantConsumeBalance>): u64 = 5;
    
[/code]

Rule is trying to access a missing config (with type).
[code] 
    **const** [ENoConfig](</references/framework/sui_sui/token#sui_token_ENoConfig>): u64 = 6;
    
[/code]

Using [confirm_request_mut](</references/framework/sui_sui/token#sui_token_confirm_request_mut>) without [spent_balance](</references/framework/sui_sui/token#sui_token_spent_balance>). Immutable version of the function must be used instead.
[code] 
    **const** [EUseImmutableConfirm](</references/framework/sui_sui/token#sui_token_EUseImmutableConfirm>): u64 = 7;
    
[/code]

A Tag for the [spend](</references/framework/sui_sui/token#sui_token_spend>) action.
[code] 
    **const** [SPEND](</references/framework/sui_sui/token#sui_token_SPEND>): vector<u8> = vector[115, 112, 101, 110, 100];
    
[/code]

A Tag for the [transfer](</references/framework/sui_sui/transfer#sui_transfer>) action.
[code] 
    **const** [TRANSFER](</references/framework/sui_sui/token#sui_token_TRANSFER>): vector<u8> = vector[116, 114, 97, 110, 115, 102, 101, 114];
    
[/code]

A Tag for the [to_coin](</references/framework/sui_sui/token#sui_token_to_coin>) action.
[code] 
    **const** [TO_COIN](</references/framework/sui_sui/token#sui_token_TO_COIN>): vector<u8> = vector[116, 111, 95, 99, 111, 105, 110];
    
[/code]

A Tag for the [from_coin](</references/framework/sui_sui/token#sui_token_from_coin>) action.
[code] 
    **const** [FROM_COIN](</references/framework/sui_sui/token#sui_token_FROM_COIN>): vector<u8> = vector[102, 114, 111, 109, 95, 99, 111, 105, 110];
    
[/code]

## Function new_policy​

Create a new [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) and a matching [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>).  
The [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) must then be shared using the [share_policy](</references/framework/sui_sui/token#sui_token_share_policy>) method.

TreasuryCap guarantees full ownership over the currency, and is unique, hence it is safe to use it for authorization.
[code] 
    **public** **fun** [new_policy](</references/framework/sui_sui/token#sui_token_new_policy>)<T>(_treasury_cap: &[sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>, [sui::token::TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>)<T>)
    
[/code]

## Function share_policy​

Share the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>). Due to [key](</references/framework/sui_sui/token#sui_token_key>)-only restriction, it must be shared after initialization.
[code] 
    **public** **fun** [share_policy](</references/framework/sui_sui/token#sui_token_share_policy>)<T>(policy: [sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>)
    
[/code]

## Function transfer​

Transfer a [Token](</references/framework/sui_sui/token#sui_token_Token>) to a [recipient](</references/framework/sui_sui/token#sui_token_recipient>). Creates an [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>) for the "transfer" action. The [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>) contains the [recipient](</references/framework/sui_sui/token#sui_token_recipient>) field to be used in verification.
[code] 
    **public** **fun** [transfer](</references/framework/sui_sui/transfer#sui_transfer>)<T>(t: [sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>, [recipient](</references/framework/sui_sui/token#sui_token_recipient>): **address** , ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::token::ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>)<T>
    
[/code]

## Function spend​

Spend a [Token](</references/framework/sui_sui/token#sui_token_Token>) by unwrapping it and storing the Balance in the [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>) for the "spend" action. The [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>) contains the [spent_balance](</references/framework/sui_sui/token#sui_token_spent_balance>) field to be used in verification.

Spend action requires [confirm_request_mut](</references/framework/sui_sui/token#sui_token_confirm_request_mut>) to be called to confirm the request and join the spent balance with the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).[spent_balance](</references/framework/sui_sui/token#sui_token_spent_balance>).
[code] 
    **public** **fun** [spend](</references/framework/sui_sui/token#sui_token_spend>)<T>(t: [sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::token::ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>)<T>
    
[/code]

## Function to_coin​

Convert [Token](</references/framework/sui_sui/token#sui_token_Token>) into an open Coin. Creates an [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>) for the "to_coin" action.
[code] 
    **public** **fun** [to_coin](</references/framework/sui_sui/token#sui_token_to_coin>)<T>(t: [sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, [sui::token::ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>)<T>)
    
[/code]

## Function from_coin​

Convert an open Coin into a [Token](</references/framework/sui_sui/token#sui_token_Token>). Creates an [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>) for the "from_coin" action.
[code] 
    **public** **fun** [from_coin](</references/framework/sui_sui/token#sui_token_from_coin>)<T>([coin](</references/framework/sui_sui/coin#sui_coin>): [sui::coin::Coin](</references/framework/sui_sui/coin#sui_coin_Coin>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>, [sui::token::ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>)<T>)
    
[/code]

## Function join​

Join two [Token](</references/framework/sui_sui/token#sui_token_Token>)s into one, always available.
[code] 
    **public** **fun** [join](</references/framework/sui_sui/token#sui_token_join>)<T>([token](</references/framework/sui_sui/token#sui_token>): &**mut** [sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>, another: [sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>)
    
[/code]

## Function split​

Split a [Token](</references/framework/sui_sui/token#sui_token_Token>) with [amount](</references/framework/sui_sui/token#sui_token_amount>).  
Aborts if the [Token](</references/framework/sui_sui/token#sui_token_Token>).[balance](</references/framework/sui_sui/balance#sui_balance>) is lower than [amount](</references/framework/sui_sui/token#sui_token_amount>).
[code] 
    **public** **fun** [split](</references/framework/sui_sui/token#sui_token_split>)<T>([token](</references/framework/sui_sui/token#sui_token>): &**mut** [sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>, [amount](</references/framework/sui_sui/token#sui_token_amount>): u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>
    
[/code]

## Function zero​

Create a zero [Token](</references/framework/sui_sui/token#sui_token_Token>).
[code] 
    **public** **fun** [zero](</references/framework/sui_sui/token#sui_token_zero>)<T>(ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>
    
[/code]

## Function destroy_zero​

Destroy an empty [Token](</references/framework/sui_sui/token#sui_token_Token>), fails if the balance is non-zero.  
Aborts if the [Token](</references/framework/sui_sui/token#sui_token_Token>).[balance](</references/framework/sui_sui/balance#sui_balance>) is not zero.
[code] 
    **public** **fun** [destroy_zero](</references/framework/sui_sui/token#sui_token_destroy_zero>)<T>([token](</references/framework/sui_sui/token#sui_token>): [sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>)
    
[/code]

## Function keep​

Transfer the [Token](</references/framework/sui_sui/token#sui_token_Token>) to the transaction sender.
[code] 
    **public** **fun** [keep](</references/framework/sui_sui/token#sui_token_keep>)<T>([token](</references/framework/sui_sui/token#sui_token>): [sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function new_request​

Create a new [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>).  
Publicly available method to allow for custom actions.
[code] 
    **public** **fun** [new_request](</references/framework/sui_sui/token#sui_token_new_request>)<T>(name: [std::string::String](</references/framework/sui_std/string#std_string_String>), [amount](</references/framework/sui_sui/token#sui_token_amount>): u64, [recipient](</references/framework/sui_sui/token#sui_token_recipient>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<**address** >, [spent_balance](</references/framework/sui_sui/token#sui_token_spent_balance>): [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<[sui::balance::Balance](</references/framework/sui_sui/balance#sui_balance_Balance>)<T>>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::token::ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>)<T>
    
[/code]

## Function confirm_request​

Confirm the request against the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) and return the parameters of the request: (Name, Amount, Sender, Recipient).

Cannot be used for [spend](</references/framework/sui_sui/token#sui_token_spend>) and similar actions that deliver [spent_balance](</references/framework/sui_sui/token#sui_token_spent_balance>) to the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>). For those actions use [confirm_request_mut](</references/framework/sui_sui/token#sui_token_confirm_request_mut>).

Aborts if:

  * the action is not allowed (missing record in [rules](</references/framework/sui_sui/token#sui_token_rules>))
  * action contains [spent_balance](</references/framework/sui_sui/token#sui_token_spent_balance>) (use [confirm_request_mut](</references/framework/sui_sui/token#sui_token_confirm_request_mut>))
  * the [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>) does not meet the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) rules for the action


[code] 
    **public** **fun** [confirm_request](</references/framework/sui_sui/token#sui_token_confirm_request>)<T>(policy: &[sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>, request: [sui::token::ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>)<T>, _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([std::string::String](</references/framework/sui_std/string#std_string_String>), u64, **address** , [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<**address** >)
    
[/code]

## Function confirm_request_mut​

Confirm the request against the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) and return the parameters of the request: (Name, Amount, Sender, Recipient).

Unlike [confirm_request](</references/framework/sui_sui/token#sui_token_confirm_request>) this function requires mutable access to the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) and must be used on [spend](</references/framework/sui_sui/token#sui_token_spend>) action. After dealing with the spent balance it calls [confirm_request](</references/framework/sui_sui/token#sui_token_confirm_request>) internally.

See [confirm_request](</references/framework/sui_sui/token#sui_token_confirm_request>) for the list of abort conditions.
[code] 
    **public** **fun** [confirm_request_mut](</references/framework/sui_sui/token#sui_token_confirm_request_mut>)<T>(policy: &**mut** [sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>, request: [sui::token::ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>)<T>, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([std::string::String](</references/framework/sui_std/string#std_string_String>), u64, **address** , [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<**address** >)
    
[/code]

## Function confirm_with_policy_cap​

Confirm an [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>) as the [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>) owner. This function allows [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) owner to perform Capability-gated actions ignoring the ruleset specified in the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).

Aborts if request contains [spent_balance](</references/framework/sui_sui/token#sui_token_spent_balance>) due to inability of the [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>) to decrease supply. For scenarios like this a TreasuryCap is required (see [confirm_with_treasury_cap](</references/framework/sui_sui/token#sui_token_confirm_with_treasury_cap>)).
[code] 
    **public** **fun** [confirm_with_policy_cap](</references/framework/sui_sui/token#sui_token_confirm_with_policy_cap>)<T>(_policy_cap: &[sui::token::TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>)<T>, request: [sui::token::ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>)<T>, _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([std::string::String](</references/framework/sui_std/string#std_string_String>), u64, **address** , [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<**address** >)
    
[/code]

## Function confirm_with_treasury_cap​

Confirm an [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>) as the TreasuryCap owner. This function allows TreasuryCap owner to perform Capability-gated actions ignoring the ruleset specified in the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).

Unlike [confirm_with_policy_cap](</references/framework/sui_sui/token#sui_token_confirm_with_policy_cap>) this function allows [spent_balance](</references/framework/sui_sui/token#sui_token_spent_balance>) to be consumed, decreasing the total_supply of the [Token](</references/framework/sui_sui/token#sui_token_Token>).
[code] 
    **public** **fun** [confirm_with_treasury_cap](</references/framework/sui_sui/token#sui_token_confirm_with_treasury_cap>)<T>(treasury_cap: &**mut** [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, request: [sui::token::ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>)<T>, _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): ([std::string::String](</references/framework/sui_std/string#std_string_String>), u64, **address** , [std::option::Option](</references/framework/sui_std/option#std_option_Option>)<**address** >)
    
[/code]

## Function add_approval​

Add an "approval" to the [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>) by providing a Witness.  
Intended to be used by Rules to add their own approvals, however, can be used to add arbitrary approvals to the request (not only the ones required by the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)).
[code] 
    **public** **fun** [add_approval](</references/framework/sui_sui/token#sui_token_add_approval>)<T, W: drop>(_t: W, request: &**mut** [sui::token::ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>)<T>, _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function add_rule_config​

Add a Config for a Rule in the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>). Rule configuration is independent from the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).[rules](</references/framework/sui_sui/token#sui_token_rules>) and needs to be managed by the.  
Rule itself. Configuration is stored per Rule and not per Rule per Action to allow reuse in different actions.

  * Rule witness guarantees that the Config is approved by the Rule.
  * [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>) guarantees that the Config setup is initiated by the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) owner.


[code] 
    **public** **fun** [add_rule_config](</references/framework/sui_sui/token#sui_token_add_rule_config>)<T, Rule: drop, Config: store>(_rule: Rule, self: &**mut** [sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>, cap: &[sui::token::TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>)<T>, [config](</references/framework/sui_sui/config#sui_config>): Config, _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function rule_config​

Get a Config for a Rule in the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>). Requires Rule witness, hence can only be read by the Rule itself. This requirement guarantees safety of the stored Config and allows for simpler dynamic field management inside the Rule Config (custom type keys are not needed for access gating).

Aborts if the Config is not present.
[code] 
    **public** **fun** [rule_config](</references/framework/sui_sui/token#sui_token_rule_config>)<T, Rule: drop, Config: store>(_rule: Rule, self: &[sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>): &Config
    
[/code]

## Function rule_config_mut​

Get mutable access to the Config for a Rule in the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).  
Requires Rule witness, hence can only be read by the Rule itself, as well as [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>) to guarantee that the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) owner is the one who initiated the Config modification.

Aborts if:

  * the Config is not present
  * [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>) is not matching the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)


[code] 
    **public** **fun** [rule_config_mut](</references/framework/sui_sui/token#sui_token_rule_config_mut>)<T, Rule: drop, Config: store>(_rule: Rule, self: &**mut** [sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>, cap: &[sui::token::TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>)<T>): &**mut** Config
    
[/code]

## Function remove_rule_config​

Remove a Config for a Rule in the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).  
Unlike the [add_rule_config](</references/framework/sui_sui/token#sui_token_add_rule_config>), this function does not require a Rule witness, hence can be performed by the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) owner on their own.

Rules need to make sure that the Config is present when performing verification of the [ActionRequest](</references/framework/sui_sui/token#sui_token_ActionRequest>).

Aborts if:

  * the Config is not present
  * [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>) is not matching the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)


[code] 
    **public** **fun** [remove_rule_config](</references/framework/sui_sui/token#sui_token_remove_rule_config>)<T, Rule, Config: store>(self: &**mut** [sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>, cap: &[sui::token::TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>)<T>, _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): Config
    
[/code]

## Function has_rule_config​

Check if a config for a Rule is set in the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) without checking the type of the Config.
[code] 
    **public** **fun** [has_rule_config](</references/framework/sui_sui/token#sui_token_has_rule_config>)<T, Rule>(self: &[sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>): bool
    
[/code]

## Function has_rule_config_with_type​

Check if a Config for a Rule is set in the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>) and that it matches the type provided.
[code] 
    **public** **fun** [has_rule_config_with_type](</references/framework/sui_sui/token#sui_token_has_rule_config_with_type>)<T, Rule, Config: store>(self: &[sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>): bool
    
[/code]

## Function allow​

Allows an [action](</references/framework/sui_sui/token#sui_token_action>) to be performed on the [Token](</references/framework/sui_sui/token#sui_token_Token>) freely by adding an empty set of Rules for the [action](</references/framework/sui_sui/token#sui_token_action>).

Aborts if the [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>) is not matching the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).
[code] 
    **public** **fun** [allow](</references/framework/sui_sui/token#sui_token_allow>)<T>(self: &**mut** [sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>, cap: &[sui::token::TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>)<T>, [action](</references/framework/sui_sui/token#sui_token_action>): [std::string::String](</references/framework/sui_std/string#std_string_String>), _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function disallow​

Completely disallows an [action](</references/framework/sui_sui/token#sui_token_action>) on the [Token](</references/framework/sui_sui/token#sui_token_Token>) by removing the record from the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).[rules](</references/framework/sui_sui/token#sui_token_rules>).

Aborts if the [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>) is not matching the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).
[code] 
    **public** **fun** [disallow](</references/framework/sui_sui/token#sui_token_disallow>)<T>(self: &**mut** [sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>, cap: &[sui::token::TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>)<T>, [action](</references/framework/sui_sui/token#sui_token_action>): [std::string::String](</references/framework/sui_std/string#std_string_String>), _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function add_rule_for_action​

Adds a Rule for an action with name in the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).

Aborts if the [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>) is not matching the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).
[code] 
    **public** **fun** [add_rule_for_action](</references/framework/sui_sui/token#sui_token_add_rule_for_action>)<T, Rule: drop>(self: &**mut** [sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>, cap: &[sui::token::TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>)<T>, [action](</references/framework/sui_sui/token#sui_token_action>): [std::string::String](</references/framework/sui_std/string#std_string_String>), ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function remove_rule_for_action​

Removes a rule for an action with name in the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>). Returns the config object to be handled by the sender (or a Rule itself).

Aborts if the [TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>) is not matching the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).
[code] 
    **public** **fun** [remove_rule_for_action](</references/framework/sui_sui/token#sui_token_remove_rule_for_action>)<T, Rule: drop>(self: &**mut** [sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>, cap: &[sui::token::TokenPolicyCap](</references/framework/sui_sui/token#sui_token_TokenPolicyCap>)<T>, [action](</references/framework/sui_sui/token#sui_token_action>): [std::string::String](</references/framework/sui_std/string#std_string_String>), _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function mint​

Mint a [Token](</references/framework/sui_sui/token#sui_token_Token>) with a given [amount](</references/framework/sui_sui/token#sui_token_amount>) using the TreasuryCap.
[code] 
    **public** **fun** [mint](</references/framework/sui_sui/token#sui_token_mint>)<T>(cap: &**mut** [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, [amount](</references/framework/sui_sui/token#sui_token_amount>): u64, ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): [sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>
    
[/code]

## Function burn​

Burn a [Token](</references/framework/sui_sui/token#sui_token_Token>) using the TreasuryCap.
[code] 
    **public** **fun** [burn](</references/framework/sui_sui/token#sui_token_burn>)<T>(cap: &**mut** [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, [token](</references/framework/sui_sui/token#sui_token>): [sui::token::Token](</references/framework/sui_sui/token#sui_token_Token>)<T>)
    
[/code]

## Function flush​

Flush the [TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>).[spent_balance](</references/framework/sui_sui/token#sui_token_spent_balance>) into the TreasuryCap. This action is only available to the TreasuryCap owner.
[code] 
    **public** **fun** [flush](</references/framework/sui_sui/token#sui_token_flush>)<T>(self: &**mut** [sui::token::TokenPolicy](</references/framework/sui_sui/token#sui_token_TokenPolicy>)<T>, cap: &**mut** [sui::coin::TreasuryCap](</references/framework/sui_sui/coin#sui_coin_TreasuryCap>)<T>, _ctx: &**mut** [sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): u64
    
[/code]

* * *

_This page has been truncated because it exceeds the maximum character limit.[View the full source](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui/token.md>)._

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/token.md>)

[Previoustable_vec](</references/framework/sui_sui/table_vec>)[Nexttransfer](</references/framework/sui_sui/transfer>)
