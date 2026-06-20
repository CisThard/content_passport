<!-- Source: https://docs.sui.io/onchain-finance/deepbook-margin/contract-information/orders -->

* [](</>)
  * [DeepBook Margin](</onchain-finance/deepbook-margin/>)
  * [Contract Information](</onchain-finance/deepbook-margin/contract-information>)
  * Orders


On this page

# Orders

The `pool_proxy` module provides wrapper functions for trading with margin managers. These functions enable placing orders, modifying and canceling them, and managing staking and governance participation through a margin manager. All trading operations require the margin manager to be associated with the correct DeepBook pool.

## API​

Following are the different public functions for managing orders with margin managers.

Click to openPlace orders

Place limit and market orders through a margin manager. Orders can only be placed if margin trading is enabled for the pool.

File not found in manifest: `packages/deepbook_margin/sources/pool_proxy.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openPlace reduce-only orders

Place reduce-only orders that can only decrease your debt position. These orders are useful when margin trading is disabled and you need to close existing positions.

File not found in manifest: `packages/deepbook_margin/sources/pool_proxy.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openModify order

Modify an existing order by changing its quantity.

File not found in manifest: `packages/deepbook_margin/sources/pool_proxy.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCancel orders

Cancel one, multiple, or all orders for the margin manager.

File not found in manifest: `packages/deepbook_margin/sources/pool_proxy.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openWithdraw settled amounts

Withdraw settled amounts from completed trades back to the margin manager's balance manager.

File not found in manifest: `packages/deepbook_margin/sources/pool_proxy.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openStaking

Stake and unstake DEEP tokens through the margin manager. Margin managers for pools with DEEP as base or quote asset cannot stake.

File not found in manifest: `packages/deepbook_margin/sources/pool_proxy.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openGovernance

Submit proposals and vote on governance decisions through the margin manager.

File not found in manifest: `packages/deepbook_margin/sources/pool_proxy.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openClaim rebates

Claim trading rebates earned through the margin manager.

File not found in manifest: `packages/deepbook_margin/sources/pool_proxy.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-margin/contract-information/orders.mdx>)

[PreviousMargin Pool](</onchain-finance/deepbook-margin/contract-information/margin-pool>)[NextMaintainer](</onchain-finance/deepbook-margin/contract-information/maintainer>)

  * API
