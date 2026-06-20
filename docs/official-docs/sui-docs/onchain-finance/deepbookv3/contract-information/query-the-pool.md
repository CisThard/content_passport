<!-- Source: https://docs.sui.io/onchain-finance/deepbookv3/contract-information/query-the-pool -->

* [](</>)
  * [DeepBookV3](</onchain-finance/deepbookv3/deepbook>)
  * [Contract Information](</onchain-finance/deepbookv3/contract-information>)
  * Query the Pool


On this page

# Query the Pool

The `Pool` shared object represents a market, such as a SUI/USDC market. That `Pool` is the only one representing that unique pairing (SUI/USDC) and the pairing is the only member of that particular `Pool`. See [DeepBookV3 Design](</onchain-finance/deepbookv3/design#pool>) to learn more about the structure of pools.

To perform trades, you pass a `BalanceManager` and `TradeProof` into the relevant `Pool`. Unlike `Pool`s, `BalanceManager` shared objects can contain any type of token, such that the same `BalanceManager` can access multiple `Pool`s to interact with many different trade pairings. See [BalanceManager](</onchain-finance/deepbookv3/contract-information/balance-manager>) to learn more.

## API​

DeepBookV3 exposes a set of endpoints that can be used to query any pool.

Click to openCheck whitelist status

Accessor to check whether the pool is whitelisted.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCheck quote quantity against base (DEEP fees)

Dry run to determine the quote quantity out for a given base quantity. Uses DEEP as fee.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCheck base quantity against quote (DEEP fees)

Dry run to determine the base quantity out for a given quote quantity. Uses DEEP as fee.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCheck quote quantity against base (input token fees)

Dry run to determine the quote quantity out for a given base quantity. Uses input token as fee.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCheck base quantity against quote (input token fees)

Dry run to determine the base quantity out for a given quote quantity. Uses input token as fee.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCheck quote quantity against quote or base

Dry run to determine the quantity out for a given base or quote quantity. Only one out of base or quote quantity should be nonzero. Returns the (`base_quantity_out`, `quote_quantity_out`, `deep_quantity_required`).

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCheck fee required

Returns the DEEP required for an order if it's a taker or maker given quantity and price (`deep_required_taker`, `deep_required_maker`).

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRetrieve mid price for a pool

Returns the mid price of the pool.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRetrieve order IDs

Returns the `order_id` for all open orders for the `balance_manager` in the pool.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRetrieve prices and quantities for an order book

Returns vectors holding the prices (`price_vec`) and quantities (`quantity_vec`) for the level2 order book. The `price_low` and `price_high` are inclusive, all orders within the range are returned. `is_bid` is `true` for bids and `false` for asks.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Returns vectors holding the prices (`price_vec`) and quantities (`quantity_vec`) for the level2 order book. `ticks` are the maximum number of ticks to return starting from best bid and best ask. (`bid_price`, `bid_quantity`, `ask_price`, `ask_quantity`) are returned as four vectors. The price vectors are sorted in descending order for bids and ascending order for asks.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRetrieve balances

Get all balances held in this pool.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRetrieve pool ID

Get the ID of the pool given the asset types.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRetrieve order information

Returns the `Order` struct using the order ID.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Returns a vector of `Order` structs using a vector of order IDs.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Returns a vector of `Order` structs for all orders that belong to a `BalanceManager` in the pool.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRetrieve locked balance

Returns the locked balance for a `BalanceManager` in the pool (`base_quantity`, `quote_quantity`, `deep_quantity`).

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRetrieve pool parameters

Returns the trade parameters for the pool (`taker_fee`, `maker_fee`, `stake_required`).

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Returns the trade parameters for the next epoch for the currently leading proposal of the pool (`taker_fee`, `maker_fee`, `stake_required`).

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Returns the quorum needed to pass proposal in the current epoch.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Returns the book parameters for the pool (`tick_size`, `lot_size`, `min_size`).

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Returns the `OrderDeepPrice` struct for the pool, which determines the conversion for DEEP fees.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRetrieve reverse quantity calculations

Dry run to determine the base quantity needed to receive a given quote quantity out.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Dry run to determine the quote quantity needed to receive a given base quantity out.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openPre-trade validation

Check if a limit order can be placed with the given parameters. Returns `true` if the order can be placed, `false` otherwise.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Check if a market order can be placed with the given parameters. Returns `true` if the order can be placed, `false` otherwise.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Validate limit order parameters and return detailed error information if invalid.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Validate market order parameters and return detailed error information if invalid.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openPool status

Check if the pool is a stable pool (uses stable curve pricing).

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Check if the pool is registered in the registry.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openAccount queries

Check if an account exists for a `BalanceManager` in the pool.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Get the `Account` struct for a `BalanceManager` in the pool.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbookv3/contract-information/query-the-pool.mdx>)

[PreviousPermissionless Pool Creation](</onchain-finance/deepbookv3/contract-information/permissionless-pool>)[NextReferrals](</onchain-finance/deepbookv3/contract-information/referral>)

  * API
