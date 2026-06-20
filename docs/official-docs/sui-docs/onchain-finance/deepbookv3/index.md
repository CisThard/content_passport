<!-- Source: https://docs.sui.io/onchain-finance/deepbookv3/deepbook -->

* [](</>)
  * DeepBookV3


On this page

# DeepBookV3

DeepBookV3 is a next-generation decentralized central limit order book (CLOB) built on Sui. DeepBookV3 leverages Sui's parallel execution and low transaction fees to bring a highly performant, low-latency exchange on chain.

The latest version delivers new features including flash loans, governance, improved account abstraction, and enhancements to the existing matching engine. This version also introduces its own tokenomics with the [DEEP token](<https://suivision.xyz/coin/0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP>), which you can stake for additional benefits.

DeepBookV3 does not include an end-user interface for token trading. Rather, it offers built-in trading functionality that can support token trades from decentralized exchanges, wallets, or other apps. The available SDK abstracts away a lot of the complexities of interacting with the chain and building programmable transaction blocks, lowering the barrier of entry for active market making.

info

The documentation refers to the DeepBook standard as "DeepBookV3" to avoid confusion with the recently deprecated version of DeepBook (DeepBookV2).

## DeepBookV3 tokenomics​

The DEEP token pays for trading fees on the exchange. Users can pay trading fees using DEEP tokens or input tokens, but owning, using, and staking DEEP continues to provide the most benefits to active DeepBookV3 traders on the Sui network.

As an example, governance determines the fee for paying in DEEP tokens, which is 20% lower than the fee for using input tokens.

Users that stake DEEP can enjoy taker and maker incentives. Taker incentives can reduce trading fees by half, dropping them to as low as 0.25 basis points (bps) on stable pairs and 2.5 bps on volatile pairs. Maker incentives are rebates earned based on maker volume generated.

## Liquidity support​

Similar to order books for other market places, DeepBookV3's CLOB architecture enables you to enter market and limit orders. You can sell SUI tokens, referred to as an ask, can set your price, referred to as a limit order, or sell at the market's going rate. If you are seeking to buy SUI, referred to as a bid, you can pay the current market price or set a limit price. Limit orders only get fulfilled if the CLOB finds a match between a buyer and seller.

If you put in a limit order for 1,000 SUI, and no single seller is currently offering that quantity of tokens, DeepBookV3 automatically pools the current asks to meet the quantity of your bid.

## Transparency and privacy​

As a CLOB, DeepBookV3 works like a digital ledger, logging bids and asks in chronological order and automatically finding matches between the two sides. It takes into account user parameters on trades such as prices.

The digital ledger is open so people can view the trades and prices, giving clear proof of fairness. You can use this transparency to create metrics and dashboards to monitor trading activity.

## Documentation​

This documentation outlines the design of DeepBookV3, its public endpoints, and provides guidance for integrations. The SDK abstracts away a lot of the complexities of interacting with the chain and building programmable transaction blocks, lowering the barrier of entry for active market making.

## Open source​

DeepBookV3 is open for community development. You can use the [Sui Improvement Proposals](<https://github.com/sui-foundation/sips?ref=blog.sui.io>) (SIPs) process to suggest changes to make DeepBookV3 better.

## [DesignLearn about DeepBookV3 design, including the Pool, PoolRegistry, and BalanceManager shared objects.→](</onchain-finance/deepbookv3/design>)## [Contract InformationIn this section

  * BalanceManager
  * Orders
  * Flash Loans
  * Swaps
  * Staking and Governance
  * Permissionless Pool Creation

\+ 3 more→](</onchain-finance/deepbookv3/contract-information>)## [DeepBookV3 SDKIn this section

  * BalanceManager
  * Pools
  * Orders
  * Flash Loans
  * Swaps
  * Staking and Governance

→](</onchain-finance/deepbookv3-sdk/>)## [IndexerDeepBookV3 Indexer provides streamlined, real-time access to order book and trading data from the DeepBookV3 protocol. It acts as a centralized service to aggregate and expose critical data points.→](</onchain-finance/deepbookv3/deepbookv3-indexer>)

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbookv3/deepbook.mdx>)

[NextDesign](</onchain-finance/deepbookv3/design>)

  * DeepBookV3 tokenomics
  * Liquidity support
  * Transparency and privacy
  * Documentation
  * Open source
