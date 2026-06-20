<!-- Source: https://docs.sui.io/onchain-finance/deepbookv3/contract-information/balance-manager -->

* [](</>)
  * [DeepBookV3](</onchain-finance/deepbookv3/deepbook>)
  * [Contract Information](</onchain-finance/deepbookv3/contract-information>)
  * BalanceManager


On this page

# BalanceManager

The `BalanceManager` shared object holds all balances for different assets. To perform trades, pass a combination of `BalanceManager` and `TradeProof` into a [pool](</onchain-finance/deepbookv3/design#pool>). `TradeProof`s are generated in one of two ways, either by the `BalanceManager` owner directly, or by any `TradeCap` owner. The owner can generate a `TradeProof` without the risk of equivocation. The `TradeCap` owner, because it's an owned object, risks equivocation when generating a `TradeProof`. Generally, a high frequency trading engine trades as the default owner.

With exception to swaps, all interactions with DeepBookV3 require a `BalanceManager` as one of its inputs. When orders are matched, funds are transferred to or from the `BalanceManager`. You can use a single `BalanceManager` between all pools.

## API​

Following are the different public functions that the `BalanceManager` exposes.

Click to openCreate a `BalanceManager`

The `new()` function creates a `BalanceManager`. Combine it with `share`, or else the transaction fails. You can combine the transaction with deposit calls, allowing you to create, deposit, then share the balance manager in one transaction.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCreate a `BalanceManager` with custom owner

The `new_with_custom_owner()` function creates a `BalanceManager` with a custom owner. Combine it with `share`, or else the transaction fails. You can combine the transaction with deposit calls, allowing you to create, deposit, then share the balance manager in one transaction.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCreate a `BalanceManager` with custom owner and capabilities

The `new_with_custom_owner_caps<App>()` function creates a `BalanceManager` with a custom owner and returns all three capabilities (`DepositCap`, `WithdrawCap`, and `TradeCap`) in a single call. This function requires authorization through the DeepBook Registry with a specific `App` type. Combine the balance manager with `share`, or else the transaction fails. This is a convenient way to set up a complete balance manager with all necessary capabilities in one transaction.

caution

Move code using DeepBookV3 uses `DepositCap`, `WithdrawCap`, and `TradeCap`, while the DeepBookV3 SDK uses `depositCap`, `withdrawCap`, and `tradeCap`.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openMint a `TradeCap`

The owner of a `BalanceManager` can mint a `TradeCap` and send it to another address. Upon receipt, that address will have the capability to place orders with this `BalanceManager`. The address owner cannot deposit or withdraw funds, however. The maximum total number of `TradeCap`, `WithdrawCap`, and `DepositCap` that can be assigned for a `BalanceManager` is `1000`. If this limit is reached, one or more existing caps must be revoked before minting new ones. You can also use `revoke_trade_cap` to revoke `DepositCap` and `WithdrawCap`.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openMint a `DepositCap` or `WithdrawCap`

The owner of a `BalanceManager` can mint a `DepositCap` or `WithdrawCap` and send it to another address. Upon receipt, that address will have the capability to deposit in or withdraw from `BalanceManager`. The address owner cannot execute trades, however. The maximum total number of `TradeCap`, `WithdrawCap`, and `DepositCap` that can be assigned for a `BalanceManager` is `1000`. If this limit is reached, one or more existing caps must be revoked before minting new ones.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openGenerate a `TradeProof`

To call any function that requires a balance check or transfer, the user must provide their `BalanceManager` as well as a `TradeProof`. There are two ways to generate a trade proof, one used by the owner and another used by a `TradeCap` owner.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openDeposit funds

Only the owner can call this function to deposit funds into the `BalanceManager`.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openWithdraw funds

Only the owner can call this function to withdraw funds from the `BalanceManager`.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openDeposit funds using `DepositCap`

Only holders of a `DepositCap` for the `BalanceManager` can call this function to deposit funds into the `BalanceManager`.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openWithdraw funds using WithdrawCap

Only holders of a `WithdrawCap` for the `BalanceManager` can call this function to withdraw funds from the `BalanceManager`.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openSet and unset referral

The owner of a `TradeCap` can set or unset a pool-specific referral for the balance manager. Setting a referral allows the balance manager to be associated with a `DeepBookPoolReferral` for that pool, which can track and earn referral fees. Each balance manager can have different referrals for different pools.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRegister balance manager

Register a balance manager with the registry. This adds the balance manager to the owner's list of managers in the registry.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRead endpoints

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

## Events​

Click to open`BalanceManagerEvent`

Emitted when a new balance manager is created.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openBalanceEvent

Emitted when a deposit or withdrawal occurs.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbookv3/contract-information/balance-manager.mdx>)

[PreviousContract Information](</onchain-finance/deepbookv3/contract-information>)[NextOrders](</onchain-finance/deepbookv3/contract-information/orders>)

  * API
  * Events
