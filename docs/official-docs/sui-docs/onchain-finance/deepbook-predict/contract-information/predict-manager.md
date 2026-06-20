<!-- Source: https://docs.sui.io/onchain-finance/deepbook-predict/contract-information/predict-manager -->

* [](</>)
  * [DeepBook Predict](</onchain-finance/deepbook-predict/>)
  * [Contract Information](</onchain-finance/deepbook-predict/contract-information>)
  * Predict Manager


On this page

# Predict Manager

The `PredictManager` is a per-user shared account object. It wraps a DeepBook `BalanceManager`, stores quote balances, and tracks Predict positions internally.

Each user should create one manager and reuse it. Binary positions and vertical ranges are not separate onchain objects; they are quantities stored inside the manager.

## API​

Click to openRead owner, balances, and position quantities

Use these functions to read the manager owner, deposited asset balances, binary position quantities, and range quantities.

File not found in manifest: `packages/predict/sources/predict_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openDeposit quote assets

The manager owner deposits quote assets before minting positions or ranges.

File not found in manifest: `packages/predict/sources/predict_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openWithdraw quote assets

The manager owner can withdraw quote assets from the manager.

File not found in manifest: `packages/predict/sources/predict_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

## Events​

Click to open`PredictManagerCreated`

Emitted when a new `PredictManager` is created.

File not found in manifest: `packages/predict/sources/predict_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-predict/contract-information/predict-manager.mdx>)

[PreviousPredict](</onchain-finance/deepbook-predict/contract-information/predict>)[NextMarket Keys](</onchain-finance/deepbook-predict/contract-information/market-keys>)

  * API
  * Events
