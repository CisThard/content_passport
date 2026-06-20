<!-- Source: https://docs.sui.io/onchain-finance/deepbook-predict/contract-information/oracle -->

* [](</>)
  * [DeepBook Predict](</onchain-finance/deepbook-predict/>)
  * [Contract Information](</onchain-finance/deepbook-predict/contract-information>)
  * Oracle


On this page

# Oracle

`OracleSVI` is the market state for one underlying asset and one expiry. It stores spot and forward prices, SVI volatility surface parameters, activation state, the last update timestamp, and the settlement price after expiry.

## Lifecycle​

An oracle starts inactive, becomes active after `activate()`, accepts live price and SVI updates before expiry, enters pending settlement at expiry, and becomes settled when the first post-expiry price update freezes the settlement price.

Mints require a live oracle. Redeems can use quoteable live or settled oracle state. After settlement, price and SVI updates are rejected.

## API​

Click to openActivate an oracle

The `activate()` function moves an oracle into the active state before expiry.

File not found in manifest: `packages/predict/sources/oracle.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openUpdate prices

The `update_prices()` function pushes high-frequency spot and forward prices. If the oracle is past expiry and not yet settled, this call freezes the settlement price instead of recording another live update.

File not found in manifest: `packages/predict/sources/oracle.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openUpdate SVI parameters

The `update_svi()` function pushes lower-frequency SVI volatility surface parameters before expiry.

File not found in manifest: `packages/predict/sources/oracle.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRead oracle state

Use these functions to read oracle identifiers, underlying asset, prices, SVI parameters, expiry, timestamp, settlement, and lifecycle status.

File not found in manifest: `packages/predict/sources/oracle.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCreate price and SVI data

These helper constructors build `PriceData` and `SVIParams` values for oracle updates.

File not found in manifest: `packages/predict/sources/oracle.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRead status constants

These functions return the numeric status values used by `status()`.

File not found in manifest: `packages/predict/sources/oracle.move`. You probably need to run `pnpm prebuild` and restart the site.

## Structs​

Click to open`OracleSVI`

File not found in manifest: `packages/predict/sources/oracle.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`PriceData` and `SVIParams`

File not found in manifest: `packages/predict/sources/oracle.move`. You probably need to run `pnpm prebuild` and restart the site.

## Events​

Click to openOracle events

File not found in manifest: `packages/predict/sources/oracle.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-predict/contract-information/oracle.mdx>)

[PreviousMarket Keys](</onchain-finance/deepbook-predict/contract-information/market-keys>)[NextVault](</onchain-finance/deepbook-predict/contract-information/vault>)

  * Lifecycle
  * API
  * Structs
  * Events
