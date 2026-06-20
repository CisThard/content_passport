<!-- Source: https://docs.sui.io/onchain-finance/deepbookv3/contract-information/referral -->

* [](</>)
  * [DeepBookV3](</onchain-finance/deepbookv3/deepbook>)
  * [Contract Information](</onchain-finance/deepbookv3/contract-information>)
  * Referrals


On this page

# Referrals

The DeepBook referral system allows users to earn fees by referring traders to the platform. Referrers can mint a `DeepBookPoolReferral` object for a specific pool, and traders can associate their `BalanceManager` with a referral. When traders with an associated referral execute trades, a portion of their trading fees is allocated to the referrer based on the referral multiplier.

## How referrals work​

  1. **Mint a referral:** Anyone can mint a `DeepBookPoolReferral` for a specific pool with a specified multiplier. The referral is permanently tied to the pool it was minted from and can only earn fees from trades in that pool.
  2. **Set referral:** Traders associate their `BalanceManager` with a pool-specific referral using a `TradeCap`. Each `BalanceManager` can be associated with different referrals from different pools simultaneously.
  3. **Earn fees:** When taker orders are executed by the balance manager in that pool, referral fees are automatically allocated based on the multiplier. Maker orders do not generate referral fees.
  4. **Claim rewards:** Referrers can claim their accumulated fees in base, quote, and DEEP tokens.


## API​

The following are the referral-related functions that DeepBook exposes.

Click to openMint a referral

Mint a new `DeepBookPoolReferral` object for a specific pool with a specified multiplier. The multiplier determines the portion of trading fees allocated to the referrer. The multiplier must be a multiple of 0.1 (such as 0.1, 0.2, or 0.3) and cannot exceed 2.0. Returns the ID of the created referral.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openUpdate referral multiplier

Update the multiplier for an existing pool referral. Only the referral owner can update the multiplier. The new multiplier must be a multiple of 0.1 and cannot exceed 2.0.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openClaim referral rewards

Claim accumulated referral fees for a pool referral. Only the referral owner can claim rewards. Returns three `Coin` objects representing the accumulated fees in base asset, quote asset, and DEEP tokens.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openGet referral balances

View the current accumulated balances for a pool referral without claiming them. Returns the amounts in base, quote, and DEEP tokens.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openGet referral multiplier

Get the current multiplier for a pool referral.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

## `BalanceManager` referral functions​

These functions are available on the `BalanceManager` to associate or disassociate a referral.

Click to openSet referral

Associate a `BalanceManager` with a pool-specific referral. Requires a `TradeCap` to authorize the operation. Once set, all trades executed by this balance manager in the referral's pool will generate referral fees according to the referral's multiplier. Any previously set referral for the same pool is replaced.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openUnset referral

Remove the referral association from a `BalanceManager` for a specific pool. Requires a `TradeCap` to authorize the operation. After unsetting, trades in that pool will no longer generate referral fees.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openGet referral ID

Retrieve the referral ID currently associated with a `BalanceManager` for a specific pool, if any. Returns `Option<ID>` which is `none` if no referral is set for that pool.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openGet referral owner

Get the owner address of a pool referral object.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openGet referral pool ID

Get the pool ID associated with a pool referral object.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

## Events​

Click to open`DeepBookReferralCreatedEvent`

Emitted when a new referral is minted.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`DeepBookReferralSetEvent`

Emitted when a referral is set or unset on a balance manager.

File not found in manifest: `packages/deepbook/sources/balance_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`ReferralClaimed`

Emitted when a referral owner claims their accumulated fees.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`ReferralFeeEvent`

Emitted when referral fees are allocated during trade execution.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbookv3/contract-information/referral.mdx>)

[PreviousQuery the Pool](</onchain-finance/deepbookv3/contract-information/query-the-pool>)[NextEWMA Gas Price Penalty](</onchain-finance/deepbookv3/contract-information/ewma>)

  * How referrals work
  * API
  * `BalanceManager` referral functions
  * Events
