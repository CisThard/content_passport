<!-- Source: https://docs.sui.io/onchain-finance/deepbook-margin/contract-information/margin-pool -->

* [](</>)
  * [DeepBook Margin](</onchain-finance/deepbook-margin/>)
  * [Contract Information](</onchain-finance/deepbook-margin/contract-information>)
  * Margin Pool


On this page

# Margin Pool

The `MarginPool` is a shared object that manages liquidity for a specific asset, enabling lenders to supply assets and margin traders to borrow them. Each margin pool tracks supply and borrow positions, accrues interest over time, and enforces risk parameters to maintain system health.

Margin pools use a shares-based accounting system where suppliers receive shares representing their proportion of the total supply. Interest accrues continuously, increasing the value of these shares over time. Borrowers can only borrow from pools that have enabled their specific DeepBook trading pool.

## API​

Following are the different public functions that the `MarginPool` exposes.

Click to openMint a `SupplierCap`

Create a new `SupplierCap` that can be used to supply and withdraw from margin pools. One `SupplierCap` can be used across multiple margin pools.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openSupply liquidity

Supply assets to the margin pool to earn interest. Returns the total supply shares owned by the supplier after this operation.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openWithdraw liquidity

Withdraw supplied assets from the margin pool. You can specify an exact amount or withdraw all available shares.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRead endpoints

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

## Events​

Click to open`MarginPoolCreated`

Emitted when a new margin pool is created.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`DeepbookPoolUpdated`

Emitted when a DeepBook pool is enabled or disabled for lending.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`InterestParamsUpdated`

Emitted when interest rate parameters are updated.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`MarginPoolConfigUpdated`

Emitted when margin pool configuration is updated.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`SupplierCapMinted`

Emitted when a new supplier cap is minted.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`AssetSupplied`

Emitted when assets are supplied to a margin pool.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`AssetWithdrawn`

Emitted when assets are withdrawn from a margin pool.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`MaintainerFeesWithdrawn`

Emitted when maintainer fees are withdrawn.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`ProtocolFeesWithdrawn`

Emitted when protocol fees are withdrawn.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`ProtocolFeesIncreased`

Emitted when protocol fees are accrued from interest payments.

File not found in manifest: `packages/deepbook_margin/sources/margin_pool/protocol_fees.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-margin/contract-information/margin-pool.mdx>)

[PreviousMargin Manager](</onchain-finance/deepbook-margin/contract-information/margin-manager>)[NextOrders](</onchain-finance/deepbook-margin/contract-information/orders>)

  * API
  * Events
