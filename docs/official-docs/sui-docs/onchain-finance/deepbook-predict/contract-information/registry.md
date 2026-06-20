<!-- Source: https://docs.sui.io/onchain-finance/deepbook-predict/contract-information/registry -->

* [](</>)
  * [DeepBook Predict](</onchain-finance/deepbook-predict/>)
  * [Contract Information](</onchain-finance/deepbook-predict/contract-information>)
  * Registry


On this page

# Registry

The `Registry` shared object tracks the Predict object ID and the oracle IDs created by each `OracleSVICap`. The registry module also exposes admin entry points for setup, quote asset management, oracle creation, pricing configuration, risk configuration, and the withdrawal limiter.

Most app integrations do not call these functions directly. They are operator and governance surfaces for deploying and maintaining the protocol.

## API​

Click to openRead registered object IDs

Use these functions to read the active Predict object ID and the oracle IDs associated with an oracle cap.

File not found in manifest: `packages/predict/sources/registry.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCreate the Predict object

The `create_predict()` function creates the shared `Predict` object once for a quote asset and records its ID in the registry.

File not found in manifest: `packages/predict/sources/registry.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCreate and register oracle caps

Oracle caps authorize oracle operators to update oracles and tighten per-oracle ask bounds.

File not found in manifest: `packages/predict/sources/registry.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCreate an oracle

The `create_oracle()` function creates an `OracleSVI`, associates it with the calling cap, and initializes the Predict vault's strike grid for that oracle.

File not found in manifest: `packages/predict/sources/registry.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openManage quote assets

Admins can enable or disable quote assets for new supply and mint inflows.

File not found in manifest: `packages/predict/sources/registry.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openConfigure pricing

These functions control global spread, minimum spread, utilization multiplier, and global ask price bounds.

File not found in manifest: `packages/predict/sources/registry.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openConfigure oracle ask bounds

Oracle ask-bound overrides are authorized by the oracle's cap and can only tighten the global bounds.

File not found in manifest: `packages/predict/sources/registry.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openConfigure trading and risk controls

These functions control the trading pause, max total exposure percentage, and LP withdrawal limiter.

File not found in manifest: `packages/predict/sources/registry.move`. You probably need to run `pnpm prebuild` and restart the site.

## Structs and events​

Click to open`Registry` and `AdminCap`

File not found in manifest: `packages/predict/sources/registry.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRegistry events

File not found in manifest: `packages/predict/sources/registry.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-predict/contract-information/registry.mdx>)

[PreviousVault](</onchain-finance/deepbook-predict/contract-information/vault>)[NextKiosk](</onchain-finance/kiosk/>)

  * API
  * Structs and events
