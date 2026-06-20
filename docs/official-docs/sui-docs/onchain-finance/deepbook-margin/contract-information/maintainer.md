<!-- Source: https://docs.sui.io/onchain-finance/deepbook-margin/contract-information/maintainer -->

* [](</>)
  * [DeepBook Margin](</onchain-finance/deepbook-margin/>)
  * [Contract Information](</onchain-finance/deepbook-margin/contract-information>)
  * Maintainer


On this page

# Maintainer

The maintainer module provides functions for managing margin pools, configuring interest rates, and controlling which DeepBook pools can access margin lending. These functions are restricted to maintainers with the appropriate capabilities.

## API​

Following are the different maintainer functions that the `MarginPool` exposes.

Click to openCreate a margin pool

Creates and registers a new margin pool for a specific asset. Only one margin pool can exist per asset type.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openEnable or disable DeepBook pools

Control which DeepBook pools can borrow from this margin pool. Only margin managers associated with enabled pools can take loans.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openUpdate pool parameters

Update interest rate parameters and margin pool configuration settings.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openWithdraw fees

Withdraw accumulated maintainer and protocol fees from the margin pool.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

## Events​

Click to open`MaintainerCapUpdated`

Emitted when a maintainer capability is updated.

File not found in manifest: `packages/deepbook_margin/sources/margin_registry.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`PauseCapUpdated`

Emitted when a pause capability is updated.

File not found in manifest: `packages/deepbook_margin/sources/margin_registry.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`DeepbookPoolRegistered`

Emitted when a DeepBook pool is registered in the margin registry.

File not found in manifest: `packages/deepbook_margin/sources/margin_registry.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`DeepbookPoolUpdatedRegistry`

Emitted when a DeepBook pool's enabled status is updated in the registry.

File not found in manifest: `packages/deepbook_margin/sources/margin_registry.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`DeepbookPoolConfigUpdated`

Emitted when a DeepBook pool's configuration is updated in the registry.

File not found in manifest: `packages/deepbook_margin/sources/margin_registry.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-margin/contract-information/maintainer.mdx>)

[PreviousOrders](</onchain-finance/deepbook-margin/contract-information/orders>)[NextTake Profit Stop Loss](</onchain-finance/deepbook-margin/contract-information/tpsl>)

  * API
  * Events
