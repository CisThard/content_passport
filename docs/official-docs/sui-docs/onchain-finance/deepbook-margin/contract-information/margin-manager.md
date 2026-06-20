<!-- Source: https://docs.sui.io/onchain-finance/deepbook-margin/contract-information/margin-manager -->

* [](</>)
  * [DeepBook Margin](</onchain-finance/deepbook-margin/>)
  * [Contract Information](</onchain-finance/deepbook-margin/contract-information>)
  * Margin Manager


On this page

# Margin Manager

The `MarginManager` is a shared object that wraps a `BalanceManager` and provides the necessary capabilities to deposit, withdraw, trade, and manage leveraged positions. It enables users to borrow assets from margin pools to amplify their trading positions while managing risk through collateralization.

Each `MarginManager` is associated with a specific DeepBook pool and can borrow from margin pools that allow trading on that pool. The margin manager tracks borrowed positions and enforces risk ratio limits to maintain system solvency.

## API​

Following are the different public functions that the `MarginManager` exposes.

Click to openCreate a `MarginManager`

The `new()` function creates and shares a `MarginManager` in one transaction. It validates that margin trading is enabled for the specified pool.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCreate a `MarginManager` with initializer

The `new_with_initializer()` function creates a `MarginManager` and returns it along with an initializer hot potato. The initializer ensures the margin manager is properly shared after creation using the `share()` function.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openSet or unset referral

The owner of a `MarginManager` can set or unset a pool-specific referral for trading fee benefits. The referral must be a `DeepBookPoolReferral` minted for the pool associated with the margin manager. Each margin manager can have different referrals for different pools.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openDeposit funds

Only the owner can deposit funds into the `MarginManager`. The deposited asset must be either the base asset, quote asset, or DEEP token.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openWithdraw funds

Only the owner can withdraw funds from the `MarginManager`. Withdrawals are subject to risk ratio limits when the manager has active loans.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openBorrow assets

Borrow base or quote assets from margin pools to increase position sizes. Borrowing is subject to risk ratio limits and the margin pool must allow trading on the manager's DeepBook pool.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRepay loans

Repay borrowed assets to reduce debt. You can specify an exact amount or repay all available balance up to the total debt.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openLiquidate position

Liquidate an undercollateralized margin manager. The liquidator provides repayment and receives collateral assets plus a liquidation reward. The margin pool might also receive a reward or incur bad debt depending on the position's health.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCalculate risk ratio

Returns the risk ratio of the margin manager, which represents the ratio of assets to debt. Higher ratios indicate healthier positions.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRead endpoints

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

## Events​

Click to open`MarginManagerCreatedEvent`

Emitted when a new margin manager is created.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`DepositCollateralEvent`

Emitted when collateral is deposited into a margin manager.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`WithdrawCollateralEvent`

Emitted when collateral is withdrawn from a margin manager.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`LoanBorrowedEvent`

Emitted when assets are borrowed from a margin pool.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`LoanRepaidEvent`

Emitted when borrowed assets are repaid.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`LiquidationEvent`

Emitted when a margin manager is liquidated.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-margin/contract-information/margin-manager.mdx>)

[PreviousContract Information](</onchain-finance/deepbook-margin/contract-information>)[NextMargin Pool](</onchain-finance/deepbook-margin/contract-information/margin-pool>)

  * API
  * Events
