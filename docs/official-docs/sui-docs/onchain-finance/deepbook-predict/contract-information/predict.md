<!-- Source: https://docs.sui.io/onchain-finance/deepbook-predict/contract-information/predict -->

* [](</>)
  * [DeepBook Predict](</onchain-finance/deepbook-predict/>)
  * [Contract Information](</onchain-finance/deepbook-predict/contract-information>)
  * Predict


On this page

# Predict

The `Predict` shared object is the main protocol entry point. It coordinates user actions across manager balances, oracle state, pricing config, risk config, and vault accounting.

## API​

Following are the public functions that applications use most often.

Click to openCreate a `PredictManager`

The `create_manager()` function creates a new shared `PredictManager` for the caller and returns its object ID.

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openPreview binary position amounts

The `get_trade_amounts()` function returns the mint cost and redeem payout for a binary position at the requested quantity.

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openMint a binary position

The `mint()` function buys a binary position using an enabled quote asset deposited in the caller's `PredictManager`.

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRedeem a binary position

The `redeem()` function sells a binary position and deposits the payout back into the owner's `PredictManager`.

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRedeem a settled binary position permissionlessly

The `redeem_permissionless()` function lets anyone redeem a settled position into the owner's `PredictManager`.

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openPreview range amounts

The `get_range_trade_amounts()` function returns the mint cost and redeem payout for a vertical range at the requested quantity.

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openMint a vertical range

The `mint_range()` function buys a bounded range position. The range is keyed by oracle ID, expiry, lower strike, and higher strike.

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRedeem a vertical range

The `redeem_range()` function sells a range position and deposits the payout into the owner's `PredictManager`.

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openSupply vault liquidity

The `supply()` function deposits an accepted quote asset into the vault and returns `PLP` shares.

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openWithdraw vault liquidity

The `withdraw()` function burns `PLP` shares and returns the selected quote asset when the requested amount is available after max payout coverage.

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCompact settled oracle exposure

The `compact_settled_oracle()` function lets an authorized oracle operator compact settled strike-matrix exposure into constant-size settled state.

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRead protocol configuration

These read functions expose trading pause state, accepted quote assets, pricing parameters, risk limits, ask bounds, and currently available withdrawal amount.

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

## Events​

Click to openTrading events

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openLiquidity events

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openConfiguration events

File not found in manifest: `packages/predict/sources/predict.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-predict/contract-information/predict.mdx>)

[PreviousContract Information](</onchain-finance/deepbook-predict/contract-information>)[NextPredict Manager](</onchain-finance/deepbook-predict/contract-information/predict-manager>)

  * API
  * Events
