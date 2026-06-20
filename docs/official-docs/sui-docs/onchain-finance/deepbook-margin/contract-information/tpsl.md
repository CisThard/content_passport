<!-- Source: https://docs.sui.io/onchain-finance/deepbook-margin/contract-information/tpsl -->

* [](</>)
  * [DeepBook Margin](</onchain-finance/deepbook-margin/>)
  * [Contract Information](</onchain-finance/deepbook-margin/contract-information>)
  * Take Profit Stop Loss


On this page

# Take Profit Stop Loss

The Take Profit Stop Loss (TPSL) module enables conditional orders that automatically execute when certain price conditions are met. This allows traders to set up automated trading strategies that protect against losses (stop loss) or lock in profits (take profit) without requiring constant monitoring.

## How TPSL works​

  1. **Create a condition:** Define whether the order should trigger when the price goes above or below a specified trigger price.
  2. **Create a pending order:** Specify the order details (limit or market order) that will be placed when the condition is met.
  3. **Add conditional order:** Combine the condition and pending order, and add them to your margin manager.
  4. **Execution:** Anyone can call the permissionless `execute_conditional_orders` function to execute orders whose conditions are met. This is typically handled by keepers or bots monitoring the market.


Conditional orders are stored in sorted vectors for efficient execution:

  * `trigger_below`: Orders that trigger when price falls below the trigger price (sorted high to low)
  * `trigger_above`: Orders that trigger when price rises above the trigger price (sorted low to high)


## API​

### Helper functions​

Use these functions to create conditions and pending orders for conditional orders.

Click to openCreate a condition

Create a new condition that specifies when the order should trigger.

File not found in manifest: `packages/deepbook_margin/sources/tpsl.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCreate a pending limit order

Create a pending limit order that will be placed when the condition is met. Order type must be `no_restriction` or `immediate_or_cancel`.

File not found in manifest: `packages/deepbook_margin/sources/tpsl.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCreate a pending market order

Create a pending market order that will be placed when the condition is met.

File not found in manifest: `packages/deepbook_margin/sources/tpsl.move`. You probably need to run `pnpm prebuild` and restart the site.

### Manage conditional orders​

These functions are exposed on the `MarginManager` to manage conditional orders.

Click to openAdd conditional order

Add a conditional order to the margin manager. The order will be placed when the condition is met. Validates that the trigger condition is valid relative to the current price.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCancel conditional order

Cancel a specific conditional order by ID.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCancel all conditional orders

Cancel all conditional orders for the margin manager.

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openExecute conditional orders

Execute conditional orders that have been triggered. This is a permissionless function that can be called by anyone (typically keepers or bots).

File not found in manifest: `packages/deepbook_margin/sources/margin_manager.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRead endpoints

File not found in manifest: `packages/deepbook_margin/sources/tpsl.move`. You probably need to run `pnpm prebuild` and restart the site.

## Events​

Click to open`ConditionalOrderAdded`

Emitted when a conditional order is added to a margin manager.

File not found in manifest: `packages/deepbook_margin/sources/tpsl.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`ConditionalOrderCancelled`

Emitted when a conditional order is cancelled.

File not found in manifest: `packages/deepbook_margin/sources/tpsl.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`ConditionalOrderExecuted`

Emitted when a conditional order is executed.

File not found in manifest: `packages/deepbook_margin/sources/tpsl.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`ConditionalOrderInsufficientFunds`

Emitted when a conditional order cannot be executed due to insufficient funds.

File not found in manifest: `packages/deepbook_margin/sources/tpsl.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-margin/contract-information/tpsl.mdx>)

[PreviousMaintainer](</onchain-finance/deepbook-margin/contract-information/maintainer>)[NextInterest Rates](</onchain-finance/deepbook-margin/contract-information/interest-rates>)

  * How TPSL works
  * API
    * Helper functions
    * Manage conditional orders
  * Events
