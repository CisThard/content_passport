<!-- Source: https://docs.sui.io/references/framework/sui_sui/authenticator_state -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * authenticator_state


# Module sui::authenticator_state
[code]
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::u64](</references/framework/sui_std/u64#std_u64>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::dynamic_field](</references/framework/sui_sui/dynamic_field#sui_dynamic_field>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::transfer](</references/framework/sui_sui/transfer#sui_transfer>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct AuthenticatorState​

Singleton shared object which stores the global authenticator state.  
The actual state is stored in a dynamic field of type AuthenticatorStateInner to support future versions of the authenticator state.
[code] 
    **public** **struct** [AuthenticatorState](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorState>) **has** key
    
[/code]

Click to openFields

id: [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>)
    
version: u64
    

## Struct AuthenticatorStateInner​
[code] 
    **public** **struct** [AuthenticatorStateInner](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorStateInner>) **has** store
    
[/code]

Click to openFields

version: u64
    
active_jwks: vector<[sui::authenticator_state::ActiveJwk](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk>)>
     List of currently active JWKs. 

## Struct JWK​

Must match the JWK struct in fastcrypto-zkp
[code] 
    **public** **struct** [JWK](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_JWK>) **has** **copy** , drop, store
    
[/code]

Click to openFields

kty: [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
e: [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
n: [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
alg: [std::string::String](</references/framework/sui_std/string#std_string_String>)
    

## Struct JwkId​

Must match the JwkId struct in fastcrypto-zkp
[code] 
    **public** **struct** [JwkId](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_JwkId>) **has** **copy** , drop, store
    
[/code]

Click to openFields

iss: [std::string::String](</references/framework/sui_std/string#std_string_String>)
    
kid: [std::string::String](</references/framework/sui_std/string#std_string_String>)
    

## Struct ActiveJwk​
[code] 
    **public** **struct** [ActiveJwk](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk>) **has** **copy** , drop, store
    
[/code]

Click to openFields

jwk_id: [sui::authenticator_state::JwkId](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_JwkId>)
    
jwk: [sui::authenticator_state::JWK](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_JWK>)
    
epoch: u64
    

## Constants​

Sender is not @0x0 the system address.
[code] 
    **const** [ENotSystemAddress](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_ENotSystemAddress>): u64 = 0;
    
[/code]
[code] 
    **const** [EWrongInnerVersion](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_EWrongInnerVersion>): u64 = 1;
    
[/code]
[code] 
    **const** [EJwksNotSorted](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_EJwksNotSorted>): u64 = 2;
    
[/code]
[code] 
    **const** [CurrentVersion](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_CurrentVersion>): u64 = 1;
    
[/code]

## Function active_jwk_equal​
[code] 
    **fun** [active_jwk_equal](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_active_jwk_equal>)(a: &[sui::authenticator_state::ActiveJwk](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk>), b: &[sui::authenticator_state::ActiveJwk](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk>)): bool
    
[/code]

## Function jwk_equal​
[code] 
    **fun** [jwk_equal](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_jwk_equal>)(a: &[sui::authenticator_state::JWK](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_JWK>), b: &[sui::authenticator_state::JWK](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_JWK>)): bool
    
[/code]

## Function jwk_id_equal​
[code] 
    **fun** [jwk_id_equal](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_jwk_id_equal>)(a: &[sui::authenticator_state::JwkId](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_JwkId>), b: &[sui::authenticator_state::JwkId](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_JwkId>)): bool
    
[/code]

## Function string_bytes_lt​
[code] 
    **fun** [string_bytes_lt](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_string_bytes_lt>)(a: &[std::string::String](</references/framework/sui_std/string#std_string_String>), b: &[std::string::String](</references/framework/sui_std/string#std_string_String>)): bool
    
[/code]

## Function jwk_lt​
[code] 
    **fun** [jwk_lt](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_jwk_lt>)(a: &[sui::authenticator_state::ActiveJwk](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk>), b: &[sui::authenticator_state::ActiveJwk](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk>)): bool
    
[/code]

## Function create​

Create and share the AuthenticatorState object. This function is call exactly once, when the authenticator state object is first created.  
Can only be called by genesis or change_epoch transactions.
[code] 
    **fun** [create](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_create>)(ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function load_inner_mut​
[code] 
    **fun** [load_inner_mut](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_load_inner_mut>)(self: &**mut** [sui::authenticator_state::AuthenticatorState](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorState>)): &**mut** [sui::authenticator_state::AuthenticatorStateInner](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorStateInner>)
    
[/code]

## Function load_inner​
[code] 
    **fun** [load_inner](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_load_inner>)(self: &[sui::authenticator_state::AuthenticatorState](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorState>)): &[sui::authenticator_state::AuthenticatorStateInner](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorStateInner>)
    
[/code]

## Function check_sorted​
[code] 
    **fun** [check_sorted](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_check_sorted>)(new_active_jwks: &vector<[sui::authenticator_state::ActiveJwk](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk>)>)
    
[/code]

## Function update_authenticator_state​

Record a new set of active_jwks. Called when executing the AuthenticatorStateUpdate system transaction. The new input vector must be sorted and must not contain duplicates.  
If a new JWK is already present, but with a previous epoch, then the epoch is updated to indicate that the JWK has been validated in the current epoch and should not be expired.
[code] 
    **fun** [update_authenticator_state](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_update_authenticator_state>)(self: &**mut** [sui::authenticator_state::AuthenticatorState](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorState>), new_active_jwks: vector<[sui::authenticator_state::ActiveJwk](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk>)>, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function deduplicate​
[code] 
    **fun** [deduplicate](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_deduplicate>)(jwks: vector<[sui::authenticator_state::ActiveJwk](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk>)>): vector<[sui::authenticator_state::ActiveJwk](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk>)>
    
[/code]

## Function expire_jwks​
[code] 
    **fun** [expire_jwks](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_expire_jwks>)(self: &**mut** [sui::authenticator_state::AuthenticatorState](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorState>), min_epoch: u64, ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>))
    
[/code]

## Function get_active_jwks​

Get the current active_jwks. Called when the node starts up in order to load the current.  
JWK state from the chain.
[code] 
    **fun** [get_active_jwks](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_get_active_jwks>)(self: &[sui::authenticator_state::AuthenticatorState](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_AuthenticatorState>), ctx: &[sui::tx_context::TxContext](</references/framework/sui_sui/tx_context#sui_tx_context_TxContext>)): vector<[sui::authenticator_state::ActiveJwk](</references/framework/sui_sui/authenticator_state#sui_authenticator_state_ActiveJwk>)>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/authenticator_state.md>)

[Previousaddress_alias](</references/framework/sui_sui/address_alias>)[Nextbag](</references/framework/sui_sui/bag>)
