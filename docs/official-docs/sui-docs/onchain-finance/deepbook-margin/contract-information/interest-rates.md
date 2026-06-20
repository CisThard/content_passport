<!-- Source: https://docs.sui.io/onchain-finance/deepbook-margin/contract-information/interest-rates -->

* [](</>)
  * [DeepBook Margin](</onchain-finance/deepbook-margin/>)
  * [Contract Information](</onchain-finance/deepbook-margin/contract-information>)
  * Interest Rates


On this page

# Interest Rates

Margin pools use a kinked interest rate model where the borrow rate increases gradually up to an optimal utilization point, then rises sharply to discourage excessive borrowing and maintain liquidity for withdrawals.

## Borrow interest formula​

The formula for the borrow interest rate (APR) is:
[code] 
    if utilization < optimalUtilization:  
        borrowRate = baseRate + utilization × baseSlope  
    else:  
        borrowRate = baseRate + optimalUtilization × baseSlope + (utilization - optimalUtilization) × excessSlope  
    
[/code]

Where:

  * **Utilization** : The ratio of total borrowed assets to total supplied assets
  * **Base Rate** : The minimum interest rate when utilization is 0%
  * **Base Slope** : The rate of increase in interest below optimal utilization
  * **Optimal Utilization** : The target utilization rate (typically 80%)
  * **Excess Slope** : The steep rate of increase above optimal utilization


## Current parameters​

Asset| Base Rate| Base Slope| Optimal Utilization| Excess Slope| Max Utilization  
---|---|---|---|---|---  
USDC| 0%| 15%| 80%| 500%| 90%  
SUIUSDE| 0%| 15%| 80%| 500%| 90%  
SUI| 3%| 20%| 80%| 500%| 90%  
DEEP| 5%| 25%| 80%| 500%| 90%  
WAL| 5%| 25%| 80%| 500%| 90%  
  
The **Max Utilization** rate caps how much of the pool's liquidity can be borrowed, ensuring suppliers can always withdraw a portion of their funds.

## Examples​

**At 50% utilization in the USDC pool (below optimal):**
[code] 
    borrowRate = 0% + 50% × 15% = 0% + 7.5% = 7.5% APR  
    
[/code]

**At 80% utilization (at optimal):**
[code] 
    borrowRate = 0% + 80% × 15% = 0% + 12% = 12% APR  
    
[/code]

**At 85% utilization (above optimal, below max):**
[code] 
    borrowRate = 0% + 80% × 15% + (85% - 80%) × 500% = 0% + 12% + 25% = 37% APR  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-margin/contract-information/interest-rates.mdx>)

[PreviousTake Profit Stop Loss](</onchain-finance/deepbook-margin/contract-information/tpsl>)[NextRisk Ratio](</onchain-finance/deepbook-margin/contract-information/risk-ratio>)

  * Borrow interest formula
  * Current parameters
  * Examples
