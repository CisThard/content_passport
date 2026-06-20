<!-- Source: https://docs.sui.io/onchain-finance/deepbookv3/contract-information/staking-governance -->

* [](</>)
  * [DeepBookV3](</onchain-finance/deepbookv3/deepbook>)
  * [Contract Information](</onchain-finance/deepbookv3/contract-information>)
  * Staking and Governance


On this page

# Staking and Governance

DeepBook's novel approach to governance allows users to update a single pool's three parameters:

  * Taker fee rate
  * Maker fee rate
  * Stake required


Stake required is the amount of DEEP tokens a user must have staked in the pool to take advantage of taker and maker incentives. Each individual DeepBook pool has independent governance, and governance can be conducted every epoch. See [Design](</onchain-finance/deepbookv3/design#governance>) to learn more about governance.

![DeepBook Governance Timeline.png](/assets/images/governance-166bcc0f64efe0075432b3afc50f1f0a.png)

## API​

`Pool` exposes the following endpoints for staking and governance.

Click to openStake

DEEP tokens must be available in the `balance_manager` for staking. A user's stake becomes active in the following epoch. If the user's active stake is greater than the stake required, the user can get reduced taker fees and can accumulate trading fee rebates during that epoch.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openUnstake

All of the user's active and inactive stake are removed and added back into the `BalanceManager`. Any casted votes are removed. Maker rebates for the epoch are forfeited, and any reduced taker fees for the remaining epoch are disabled.

The `balance_manager` must have enough staked DEEP tokens. The `balance_manager` data is updated with the unstaked amount. Balance is transferred to the `balance_manager` immediately.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openSubmit proposal

Users with a nonzero active stake can submit proposals. One proposal per user. The user automatically votes for the proposal they submit.

Submit a proposal to change the taker fee, maker fee, and stake required. The `balance_manager` must have enough staked DEEP tokens to participate. Each `balance_manager` can only submit one proposal per epoch. If the maximum proposal is reached, the proposal with the lowest vote is removed. If the `balance_manager` has less voting power than the lowest voted proposal, the proposal is not added.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openVote

Users with nonzero voting power can vote on a proposal. All voting power is used on a single proposal. If the user has voted on a different proposal during this epoch, then that vote is removed and recasted into the new proposal. The `balance_manager` must have enough staked DEEP tokens to participate.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openClaim rebates

Use `claim_rebates` to claim the rewards for the `balance_manager`. The `balance_manager` must have rewards to claim. The `balance_manager` data is updated with the claimed rewards.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbookv3/contract-information/staking-governance.mdx>)

[PreviousSwaps](</onchain-finance/deepbookv3/contract-information/swaps>)[NextPermissionless Pool Creation](</onchain-finance/deepbookv3/contract-information/permissionless-pool>)

  * API
