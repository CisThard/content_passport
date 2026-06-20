<!-- Source: https://docs.sui.io/onchain-finance/deepbook-predict/contract-information/market-keys -->

* [](</>)
  * [DeepBook Predict](</onchain-finance/deepbook-predict/>)
  * [Contract Information](</onchain-finance/deepbook-predict/contract-information>)
  * Market Keys


On this page

# Market Keys

`MarketKey` and `RangeKey` identify the internal position quantities stored in a `PredictManager`.

Use `MarketKey` for binary positions keyed by oracle ID, expiry, strike, and direction. Use `RangeKey` for vertical ranges keyed by oracle ID, expiry, lower strike, and higher strike.

## Binary position keys​

Click to openCreate `MarketKey` values

Use `up()`, `down()`, or `new()` to create keys for binary positions.

File not found in manifest: `packages/predict/sources/market_key/market_key.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRead `MarketKey` fields

File not found in manifest: `packages/predict/sources/market_key/market_key.move`. You probably need to run `pnpm prebuild` and restart the site.

## Range keys​

Click to openCreate `RangeKey` values

Use `new()` to create a vertical range key. It aborts if `lower_strike` is not less than `higher_strike`.

File not found in manifest: `packages/predict/sources/market_key/range_key.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRead `RangeKey` fields

File not found in manifest: `packages/predict/sources/market_key/range_key.move`. You probably need to run `pnpm prebuild` and restart the site.

## Structs​

Click to open`MarketKey`

File not found in manifest: `packages/predict/sources/market_key/market_key.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`RangeKey`

File not found in manifest: `packages/predict/sources/market_key/range_key.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-predict/contract-information/market-keys.mdx>)

[PreviousPredict Manager](</onchain-finance/deepbook-predict/contract-information/predict-manager>)[NextOracle](</onchain-finance/deepbook-predict/contract-information/oracle>)

  * Binary position keys
  * Range keys
  * Structs
