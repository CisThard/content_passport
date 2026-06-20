<!-- Source: https://docs.sui.io/onchain-finance/deepbook-margin-sdk/tpsl -->

* [](</>)
  * [DeepBook Margin](</onchain-finance/deepbook-margin/>)
  * [DeepBook Margin SDK](</onchain-finance/deepbook-margin-sdk/>)
  * Take Profit Stop Loss


On this page

# Take Profit Stop Loss SDK

The TPSL (Take Profit Stop Loss) SDK provides functions for managing conditional orders that automatically execute when certain price conditions are met.

## TPSL functions​

The DeepBook Margin SDK provides the following functions for managing conditional orders.

### `addConditionalOrder`​

Use `addConditionalOrder` to add a conditional order that executes when a price condition is met. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `marginManagerKey`: String that identifies the margin manager.
  * `conditionalOrderId`: Number representing the unique ID for this conditional order.
  * `triggerBelowPrice`: Boolean indicating whether to trigger when price falls below the trigger price.
  * `triggerPrice`: Number representing the price at which to trigger the order.
  * `pendingOrder`: Object containing the order details (either `PendingLimitOrderParams` or `PendingMarketOrderParams`).


File not found in manifest: `packages/deepbook-v3/src/transactions/marginTPSL.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `cancelConditionalOrder`​

Use `cancelConditionalOrder` to cancel a specific conditional order. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `marginManagerKey`: String that identifies the margin manager.
  * `conditionalOrderId`: String representing the ID of the conditional order to cancel.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginTPSL.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `cancelAllConditionalOrders`​

Use `cancelAllConditionalOrders` to cancel all conditional orders for a margin manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `marginManagerKey`: String that identifies the margin manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginTPSL.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `executeConditionalOrders`​

Use `executeConditionalOrders` to execute conditional orders that have been triggered. This is a permissionless function that can be called by anyone. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerAddress`: String representing the address of the margin manager whose orders to execute.
  * `poolKey`: String that identifies the DeepBook pool.
  * `maxOrdersToExecute`: Number representing the maximum number of orders to execute in this call.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginTPSL.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Helper functions​

These helper functions create conditions and pending orders for conditional orders.

### `newCondition`​

Use `newCondition` to create a trigger condition for a conditional order. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the pool.
  * `triggerBelowPrice`: Boolean indicating whether to trigger when price falls below the trigger price.
  * `triggerPrice`: Number representing the price at which to trigger.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginTPSL.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `newPendingLimitOrder`​

Use `newPendingLimitOrder` to create a pending limit order for use in conditional orders. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the pool.
  * `params`: `PendingLimitOrderParams` object containing:
    * `clientOrderId`: Number for client tracking.
    * `orderType`: Optional order type (default: `NO_RESTRICTION`).
    * `selfMatchingOption`: Optional self-matching option (default: `SELF_MATCHING_ALLOWED`).
    * `price`: Number representing the limit price.
    * `quantity`: Number representing the order quantity.
    * `isBid`: Boolean indicating if this is a buy order.
    * `payWithDeep`: Optional boolean for fee payment (default: `true`).
    * `expireTimestamp`: Optional expiration timestamp.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginTPSL.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `newPendingMarketOrder`​

Use `newPendingMarketOrder` to create a pending market order for use in conditional orders. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the pool.
  * `params`: `PendingMarketOrderParams` object containing:
    * `clientOrderId`: Number for client tracking.
    * `selfMatchingOption`: Optional self-matching option (default: `SELF_MATCHING_ALLOWED`).
    * `quantity`: Number representing the order quantity.
    * `isBid`: Boolean indicating if this is a buy order.
    * `payWithDeep`: Optional boolean for fee payment (default: `true`).


File not found in manifest: `packages/deepbook-v3/src/transactions/marginTPSL.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Read-only functions​

### `conditionalOrderIds`​

Query all conditional order IDs for a margin manager.

File not found in manifest: `packages/deepbook-v3/src/transactions/marginTPSL.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `conditionalOrder`​

Query a specific conditional order by ID.

File not found in manifest: `packages/deepbook-v3/src/transactions/marginTPSL.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `lowestTriggerAbovePrice`, `highestTriggerBelowPrice`​

Query trigger prices for conditional orders. `lowestTriggerAbovePrice` returns the lowest trigger price among trigger-above orders (or `max_u64` if none exist). `highestTriggerBelowPrice` returns the highest trigger price among trigger-below orders (or `0` if none exist).

File not found in manifest: `packages/deepbook-v3/src/transactions/marginTPSL.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Examples​

### Set up a stop loss order​
[code] 
    // Example: Create a stop loss order that sells when price drops below 2.0  
    const setStopLoss = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	traderClient.marginTPSL.addConditionalOrder({  
    		marginManagerKey: managerKey,  
    		conditionalOrderId: 1,  
    		triggerBelowPrice: true, // Trigger when price falls below  
    		triggerPrice: 2.0,  
    		pendingOrder: {  
    			clientOrderId: 100,  
    			quantity: 50,  
    			isBid: false, // Sell order  
    			payWithDeep: true,  
    		},  
    	})(tx);  
    };  
    
[/code]

### Set up a take profit order​
[code] 
    // Example: Create a take profit order that sells when price rises above 5.0  
    const setTakeProfit = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	traderClient.marginTPSL.addConditionalOrder({  
    		marginManagerKey: managerKey,  
    		conditionalOrderId: 2,  
    		triggerBelowPrice: false, // Trigger when price rises above  
    		triggerPrice: 5.0,  
    		pendingOrder: {  
    			clientOrderId: 101,  
    			price: 5.0, // Limit order at 5.0  
    			quantity: 50,  
    			isBid: false, // Sell order  
    			payWithDeep: true,  
    		},  
    	})(tx);  
    };  
    
[/code]

### Execute triggered orders (keeper)​
[code] 
    // Example: Execute conditional orders as a keeper  
    const executeOrders = (tx: Transaction) => {  
    	const managerAddress = '0x...'; // Address of margin manager  
    	// Execute up to 10 triggered orders  
    	traderClient.marginTPSL.executeConditionalOrders(managerAddress, 'SUI_USDC', 10)(tx);  
    };  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-margin-sdk/tpsl.mdx>)

[PreviousMaintainer](</onchain-finance/deepbook-margin-sdk/maintainer>)[NextIndexer](</onchain-finance/deepbook-margin/deepbook-margin-indexer>)

  * TPSL functions
    * `addConditionalOrder`
    * `cancelConditionalOrder`
    * `cancelAllConditionalOrders`
    * `executeConditionalOrders`
  * Helper functions
    * `newCondition`
    * `newPendingLimitOrder`
    * `newPendingMarketOrder`
  * Read-only functions
    * `conditionalOrderIds`
    * `conditionalOrder`
    * `lowestTriggerAbovePrice`, `highestTriggerBelowPrice`
  * Examples
    * Set up a stop loss order
    * Set up a take profit order
    * Execute triggered orders (keeper)
