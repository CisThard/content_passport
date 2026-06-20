<!-- Source: https://docs.sui.io/onchain-finance/deepbook-margin/ -->

* [](</>)
  * DeepBook Margin


On this page

# DeepBook Margin

DeepBook Margin extends the trading capabilities of DeepBookV3 by enabling leveraged trading positions. With margin trading, users can borrow funds to increase their buying power.

## Key features​

DeepBook Margin provides the following capabilities:

  * **Leveraged positions** : Trade with borrowed funds to increase position sizes beyond available capital
  * **Risk management** : Built-in liquidation mechanisms to protect lenders and maintain system solvency
  * **Collateral flexibility** : Support for multiple assets as collateral for isolated margin positions
  * **Interest accrual** : Transparent interest rate calculations for borrowed funds


## Risk considerations​

Margin trading carries additional risks, including the potential for liquidation if positions move against the trader. Users should understand these risks before engaging in margin trading on DeepBookV3.

### Liquidation mechanisms​

When a margin position falls below the maintenance margin requirement, the position is liquidated to protect lenders and maintain system solvency. The liquidation engine operates onchain through smart contracts, ensuring transparent and fair execution.

### Interest rates​

Interest rates for borrowed funds are calculated transparently based on utilization rates and market conditions.

## [DesignLearn about DeepBook Margin design, including MarginPool, MarginManager, and MarginRegistry shared objects.→](</onchain-finance/deepbook-margin/design>)## [Margin RisksUnderstand the risks of margin trading on DeepBook, including liquidation, interest rate fluctuations, and how to protect your positions.→](</onchain-finance/deepbook-margin/margin-risks>)## [Contract InformationIn this section

  * Margin Manager
  * Margin Pool
  * Orders
  * Maintainer
  * Take Profit Stop Loss
  * Interest Rates

\+ 2 more→](</onchain-finance/deepbook-margin/contract-information>)## [DeepBook Margin SDKIn this section

  * Margin Manager
  * Margin Pool
  * Orders
  * Maintainer
  * Take Profit Stop Loss

→](</onchain-finance/deepbook-margin-sdk/>)## [IndexerDeepBook Margin Indexer provides access to margin trading events including loans, liquidations, and margin pool operations.→](</onchain-finance/deepbook-margin/deepbook-margin-indexer>)

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-margin/deepbook-margin.mdx>)

[PreviousIndexer](</onchain-finance/deepbookv3/deepbookv3-indexer>)[NextDesign](</onchain-finance/deepbook-margin/design>)

  * Key features
  * Risk considerations
    * Liquidation mechanisms
    * Interest rates
