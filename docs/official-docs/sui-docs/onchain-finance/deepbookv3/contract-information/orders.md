<!-- Source: https://docs.sui.io/onchain-finance/deepbookv3/contract-information/orders -->

* [](</>)
  * [DeepBookV3](</onchain-finance/deepbookv3/deepbook>)
  * [Contract Information](</onchain-finance/deepbookv3/contract-information>)
  * Orders


On this page

# Orders

Users can create limit or market orders, modify orders, and cancel orders. The `BalanceManager` must have the necessary funds to process orders. DeepBookV3 has four order options and three self matching options. If you set the `pay_with_deep` flag to `true`, trading fees are paid with the DEEP token. If you set the `pay_with_deep` flag to `false`, trading fees are paid with the input token.

Users can modify their existing order, reducing the size, lowering the expiration time, or both. Users cannot modify their order to increase their size or increase their expiration time. To do that, they must cancel the original order and place a new order.

Users can cancel a single order or cancel all of their orders.

## API​

Following are the order related endpoints that `Pool` exposes.

Click to openOrder options

The following constants define the options available for orders.

File not found in manifest: `packages/deepbook/sources/helper/constants.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openSelf-matching options

The following constants define the options available for self-matching orders.

File not found in manifest: `packages/deepbook/sources/helper/constants.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openOrderInfo struct

Placing a limit order or a market order creates and returns an `OrderInfo` object. DeepBookV3 automatically drops this object after the order completes or is placed in the book. Use `OrderInfo` to inspect the execution details of the request as it represents all order information. DeepBookV3 does not catch any errors, so if there's a failure of any kind, then the entire transaction fails.

File not found in manifest: `packages/deepbook/sources/book/order_info.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`OrderDeepPrice` struct

The `OrderDeepPrice` struct represents the conversion rate of DEEP at the time the order was placed.

File not found in manifest: `packages/deepbook/sources/vault/deep_price.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`Fill` struct

The `Fill` struct represents the results of a match between two orders. Use this struct to update the state.

File not found in manifest: `packages/deepbook/sources/book/fill.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openPlace limit order

Place a limit order. Quantity is in base asset terms. For current version `pay_with_deep` must be true, so the fee is paid with DEEP tokens.

You must combine a `BalanceManager` call of generating a `TradeProof` before placing orders.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openPlace market order

Place a market order. Quantity is in base asset terms. Calls `place_limit_order` with a price of `MAX_PRICE` for bids and `MIN_PRICE` for asks. DeepBookV3 cancels the order for any quantity not filled.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openModify order

Modifies an order given `order_id` and `new_quantity`. New quantity must be less than the original quantity and more than the filled quantity. Order must not have already expired.

The `modify_order` function does not return anything. If the transaction is successful, then assume the modification was successful.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCancel order

Cancel an order. The order must be owned by the `balance_manager`. The order is removed from the book and the `balance_manager` open orders. The `balance_manager` balance is updated with the order's remaining quantity.

Similar to modify, `cancel_order` does not return anything. DeepBookV3 emits `OrderCanceled` event.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCancel multiple orders

Cancel multiple orders within a vector. The orders must be owned by the `balance_manager`. The orders are removed from the book and the `balance_manager` open orders. If any order fails to cancel, no orders will be cancelled (atomic operation).

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openCancel all orders

Cancel all open orders placed by the balance manager in the pool. This is a convenience function that cancels every order associated with the balance manager.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openWithdraw settled amounts

Withdraw settled amounts to the `balance_manager`. All orders automatically withdraw settled amounts. This can be called explicitly to withdraw all settled funds from the pool.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openWithdraw settled amounts permissionless

Withdraw settled amounts to the `balance_manager` without requiring a `TradeProof`. This is a permissionless version that anyone can call to settle a balance manager's funds.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

## Events​

Click to open`OrderFilled`

Emitted when a maker order is filled.

File not found in manifest: `packages/deepbook/sources/book/order_info.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`OrderCanceled`

Emitted when a maker order is canceled.

File not found in manifest: `packages/deepbook/sources/book/order.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`OrderModified`

Emitted when a maker order is modified.

File not found in manifest: `packages/deepbook/sources/book/order.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to open`OrderPlaced`

Emitted when a maker order is placed into the order book.

File not found in manifest: `packages/deepbook/sources/book/order_info.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbookv3/contract-information/orders.mdx>)

[PreviousBalanceManager](</onchain-finance/deepbookv3/contract-information/balance-manager>)[NextFlash Loans](</onchain-finance/deepbookv3/contract-information/flash-loans>)

  * API
  * Events
