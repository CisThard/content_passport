<!-- Source: https://docs.sui.io/onchain-finance/deepbook-predict/contract-information/vault -->

* [](</>)
  * [DeepBook Predict](</onchain-finance/deepbook-predict/>)
  * [Contract Information](</onchain-finance/deepbook-predict/contract-information>)
  * Vault


On this page

# Vault

The Predict vault holds accepted quote assets and takes the opposite side of every trade. `predict.move` owns pricing and trading orchestration; `vault.move` is the state machine for balances, exposure, mark-to-market liability, max payout, and settled-oracle compaction.

LPs interact with the vault through `predict::supply` and `predict::withdraw`, which mint and burn `PLP` shares. See [Predict](</onchain-finance/deepbook-predict/contract-information/predict>) for those public liquidity entry points.

## Read functions​

Click to openVault balances and value

Use these functions to read total vault balance, concrete asset balances, total mark-to-market liability, vault value, and total max payout.

File not found in manifest: `packages/predict/sources/vault/vault.move`. You probably need to run `pnpm prebuild` and restart the site.

## Structs​

Click to open`Vault`

File not found in manifest: `packages/predict/sources/vault/vault.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`SettledOracleState`

After settlement compaction, the vault stores compact per-oracle remaining quantity and liability.

File not found in manifest: `packages/predict/sources/vault/vault.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`PLP`

`PLP` is the LP share coin minted when users supply vault liquidity.

File not found in manifest: `packages/predict/sources/vault/plp.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-predict/contract-information/vault.mdx>)

[PreviousOracle](</onchain-finance/deepbook-predict/contract-information/oracle>)[NextRegistry](</onchain-finance/deepbook-predict/contract-information/registry>)

  * Read functions
  * Structs
