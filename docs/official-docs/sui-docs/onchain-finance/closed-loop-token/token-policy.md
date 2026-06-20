<!-- Source: https://docs.sui.io/onchain-finance/closed-loop-token/token-policy -->

* [](</>)
  * [Closed-Loop Token](</onchain-finance/closed-loop-token/>)
  * Token Policy


On this page

# Token Policy

`TokenPolicy` is a shared object that a token owner can create using the `TreasuryCap`. Having a publicly available `TokenPolicy` enables onchain discovery of allowed actions and their conditions. This is useful for wallets and other services that want to provide a better user experience for token holders.

## Create and share​

You create a new `TokenPolicy` using the `token::new_policy` function. The function takes the `TreasuryCap` as an argument and returns a `TokenPolicy` object and a managing capability.
[code] 
    // module: sui::token  
    public fun new_policy<T>(  
        treasury_cap: &TreasuryCap<T>,  
        ctx: &mut TxContext  
    ): (TokenPolicy<TokenType>, TokenPolicyCap<TokenType>);  
    
[/code]

You must use the `token::share_policy` function to share the `TokenPolicy` object.

## Allow and disallow​

To allow methods without any conditions, use the `token::allow` function. The function takes a `TokenPolicy` and `TokenPolicyCap` as arguments. If allowed, the action can be confirmed in the `TokenPolicy` using the `token::confirm_request` function (see [`ActionRequest`](</onchain-finance/closed-loop-token/action-request#confirming-with-tokenpolicy>)).
[code] 
    // module sui::token  
    public fun allow<T>(  
        policy: &mut TokenPolicy<T>,  
        policy_cap: &TokenPolicyCap<T>,  
        action: String,  
        ctx: &mut TxContext  
    );  
    
[/code]

Similarly, you can use the `token::disallow` function to completely disable an action; it takes the same arguments as `token::allow`.

## Adding rules​

`TokenPolicy` can specify custom conditions for each action. These conditions are called rules and are typically implemented as separate Move modules. The identifier of the rule is its type. See [Rules](</onchain-finance/closed-loop-token/rules>) for more information.

The pseudo-code structure of the `TokenPolicy` is as follows. Each action can have multiple rules associated with it.
[code] 
    TokenPolicy  
      rules:  
        - action: "transfer"  
          rules:  
            - 0x0...::denylist::Denylist  
        - action: "to_coin"  
          rules:  
            - 0x0...::limiter::Limiter  
            - 0x0...::allowlist::Allowlist  
        ...  
    
[/code]

To add a rule for an action, use the `token::add_rule_for_action` function. The function takes a `TokenPolicy` and `TokenPolicyCap` as arguments. The rule is specified by its type (for example, `0x0...::denylist::Denylist`).
[code] 
    // module: sui::token  
    public fun add_rule_for_action<T, Rule: drop>(  
        policy: &mut TokenPolicy<T>,  
        policy_cap: &TokenPolicyCap<T>,  
        action: String,  
        ctx: &mut TxContext  
    );  
    
[/code]

Signature for the reverse operation `token::remove_rule_for_action` is symmetrical to `token::add_rule_for_action`.

## Consume spent balance​

Spent balance can be consumed from the `TokenPolicy` using the `token::flush` function. It requires a `TreasuryCap`.
[code] 
    // module sui::token  
    public fun flush<T>(  
        policy: &mut TokenPolicy<T>,  
        treasury_cap: &mut TreasuryCap<T>,  
        ctx: &mut TxContext  
    );  
    
[/code]

## Cheat sheet: TokenPolicy API​

Function| Note  
---|---  
new_policy| Create a new `TokenPolicy` using the `TreasuryCap`  
allow| Allow an action in the `TokenPolicy`  
disallow| Disallow an action in the `TokenPolicy`  
add_rule_for_action| Add a rule for an action in the `TokenPolicy`  
remove_rule_for_action| Remove a rule for an action in the `TokenPolicy`  
confirm_request| Confirm an `ActionRequest` with a `TokenPolicy`  
confirm_request_mut| Similar to `confirm_request` but only works for `spend` action  
flush| Flush the spent balance from the `TokenPolicy` (see [Spending](</onchain-finance/closed-loop-token/spending>))  
  
[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/closed-loop-token/token-policy.mdx>)

[PreviousClosed-Loop Token](</onchain-finance/closed-loop-token/>)[NextAction Request](</onchain-finance/closed-loop-token/action-request>)

  * Create and share
  * Allow and disallow
  * Adding rules
  * Consume spent balance
  * Cheat sheet: TokenPolicy API
