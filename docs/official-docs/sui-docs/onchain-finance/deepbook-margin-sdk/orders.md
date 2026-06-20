<!-- Source: https://docs.sui.io/onchain-finance/deepbook-margin-sdk/orders -->

* [](</>)
  * [DeepBook Margin](</onchain-finance/deepbook-margin/>)
  * [DeepBook Margin SDK](</onchain-finance/deepbook-margin-sdk/>)
  * Orders


On this page

# Orders SDK

Placing and managing orders through margin managers enables leveraged trading on DeepBook. The Orders SDK provides functions for placing limit and market orders, managing positions, and participating in governance.

## Order functions​

The DeepBook Margin SDK provides the following functions for managing orders through margin managers.

### `placeLimitOrder`​

Use `placeLimitOrder` to place a limit order through a margin manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `params`: `PlaceMarginLimitOrderParams` object containing:
    * `poolKey`: String that identifies the DeepBook pool
    * `marginManagerKey`: String that identifies the margin manager
    * `clientOrderId`: String for the client-side order ID
    * `price`: Number representing the order price
    * `quantity`: Number representing the order quantity
    * `isBid`: Boolean indicating if this is a buy order
    * `expiration`: Optional number for order expiration timestamp
    * `orderType`: Optional `OrderType` enum
    * `selfMatchingOption`: Optional `SelfMatchingOptions` enum
    * `payWithDeep`: Optional boolean to pay fees with DEEP tokens


File not found in manifest: `packages/deepbook-v3/src/transactions/poolProxy.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `placeMarketOrder`​

Use `placeMarketOrder` to place a market order through a margin manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `params`: `PlaceMarginMarketOrderParams` object containing similar parameters to limit orders (without price and expiration).


File not found in manifest: `packages/deepbook-v3/src/transactions/poolProxy.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `placeReduceOnlyLimitOrder`​

Use `placeReduceOnlyLimitOrder` to place a limit order that can only reduce your existing debt position. Useful when margin trading is disabled and you need to close positions. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `params`: `PlaceMarginLimitOrderParams` object (same as `placeLimitOrder`).


File not found in manifest: `packages/deepbook-v3/src/transactions/poolProxy.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `placeReduceOnlyMarketOrder`​

Use `placeReduceOnlyMarketOrder` to place a market order that can only reduce your existing debt position. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `params`: `PlaceMarginMarketOrderParams` object (same as `placeMarketOrder`).


File not found in manifest: `packages/deepbook-v3/src/transactions/poolProxy.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `modifyOrder`​

Use `modifyOrder` to modify the quantity of an existing order. The call returns a function that takes a `Transaction` object.

warning

The `orderId` is the protocol `orderId` generated during order placement, which is different from the client `orderId`.

**Parameters**

  * `marginManagerKey`: String that identifies the margin manager.
  * `orderId`: String of the protocol order ID.
  * `newQuantity`: Number representing the new order quantity.


File not found in manifest: `packages/deepbook-v3/src/transactions/poolProxy.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `cancelOrder`, `cancelOrders`, `cancelAllOrders`​

Use these functions to cancel orders for a margin manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `marginManagerKey`: String that identifies the margin manager.
  * `orderId` (cancelOrder only): String of the protocol order ID.
  * `orderIds` (cancelOrders only): Array of protocol order IDs.


File not found in manifest: `packages/deepbook-v3/src/transactions/poolProxy.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `withdrawSettledAmounts`​

Use `withdrawSettledAmounts` to withdraw settled amounts from completed trades. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `marginManagerKey`: String that identifies the margin manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/poolProxy.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `stake`, `unstake`​

Use these functions to stake and unstake DEEP tokens through the margin manager for trading fee benefits. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `marginManagerKey`: String that identifies the margin manager.
  * `stakeAmount` (stake only): Number representing the amount to stake.


File not found in manifest: `packages/deepbook-v3/src/transactions/poolProxy.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `submitProposal`, `vote`​

Use these functions to participate in pool governance through the margin manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `marginManagerKey`: String that identifies the margin manager.
  * `params` (submitProposal): `MarginProposalParams` object with `takerFee`, `makerFee`, and `stakeRequired`.
  * `proposalId` (vote): String representing the proposal ID.


File not found in manifest: `packages/deepbook-v3/src/transactions/poolProxy.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `claimRebate`​

Use `claimRebate` to claim trading rebates earned through the margin manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `marginManagerKey`: String that identifies the margin manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/poolProxy.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `withdrawMarginSettledAmounts`​

Use `withdrawMarginSettledAmounts` to permissionlessly withdraw settled amounts for any margin manager by its object ID. Unlike `withdrawSettledAmounts` which requires ownership, this can be called by anyone. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the DeepBook pool.
  * `marginManagerId`: String representing the object ID of the margin manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/poolProxy.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `updateCurrentPrice`​

Use `updateCurrentPrice` to update the current price for a pool using the Pyth oracle. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the DeepBook pool.


File not found in manifest: `packages/deepbook-v3/src/transactions/poolProxy.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Examples​

The following examples demonstrate common margin order operations.

### Place a limit order​
[code] 
    // Params for limit order  
    interface PlaceMarginLimitOrderParams {  
    	poolKey: string;  
    	marginManagerKey: string;  
    	clientOrderId: string;  
    	price: number;  
    	quantity: number;  
    	isBid: boolean;  
    	expiration?: number | bigint;  
    	orderType?: OrderType;  
    	selfMatchingOption?: SelfMatchingOptions;  
    	payWithDeep?: boolean;  
    }  
      
    // Example: Place a buy limit order for 10 SUI at $2.50  
    placeLimitOrder = (tx: Transaction) => {  
    	const poolKey = 'SUI_DBUSDC';  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	tx.add(  
    		this.poolProxyContract.placeLimitOrder({  
    			poolKey,  
    			marginManagerKey: managerKey,  
    			clientOrderId: '12345',  
    			price: 2.5,  
    			quantity: 10,  
    			isBid: true,  
    			payWithDeep: true,  
    		}),  
    	);  
    };  
    
[/code]

### Place a market order​
[code] 
    // Example: Place a market sell order for 5 SUI  
    placeMarketOrder = (tx: Transaction) => {  
    	const poolKey = 'SUI_DBUSDC';  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	tx.add(  
    		this.poolProxyContract.placeMarketOrder({  
    			poolKey,  
    			marginManagerKey: managerKey,  
    			clientOrderId: '12346',  
    			quantity: 5,  
    			isBid: false,  
    			payWithDeep: true,  
    		}),  
    	);  
    };  
    
[/code]

### Place a reduce-only order​
[code] 
    // Example: Place a reduce-only limit order to close a position  
    placeReduceOnly = (tx: Transaction) => {  
    	const poolKey = 'SUI_DBUSDC';  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	tx.add(  
    		this.poolProxyContract.placeReduceOnlyLimitOrder({  
    			poolKey,  
    			marginManagerKey: managerKey,  
    			clientOrderId: '12347',  
    			price: 2.6,  
    			quantity: 10,  
    			isBid: true, // Buying back to reduce short position  
    			payWithDeep: true,  
    		}),  
    	);  
    };  
    
[/code]

### Modify and cancel orders​
[code] 
    // Example: Modify order quantity  
    modifyExistingOrder = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	const orderId = '123456789'; // Protocol order ID  
    	const newQuantity = 8; // Reduce from 10 to 8  
    	tx.add(this.poolProxyContract.modifyOrder(managerKey, orderId, newQuantity));  
    };  
      
    // Example: Cancel a single order  
    cancelSingleOrder = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	const orderId = '123456789';  
    	tx.add(this.poolProxyContract.cancelOrder(managerKey, orderId));  
    };  
      
    // Example: Cancel multiple orders  
    cancelMultipleOrders = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	const orderIds = ['123456789', '987654321'];  
    	tx.add(this.poolProxyContract.cancelOrders(managerKey, orderIds));  
    };  
      
    // Example: Cancel all orders  
    cancelAll = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	tx.add(this.poolProxyContract.cancelAllOrders(managerKey));  
    };  
    
[/code]

### Stake and participate in governance​
[code] 
    // Example: Stake DEEP tokens  
    stakeDeep = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	const stakeAmount = 1000; // Stake 1000 DEEP  
    	tx.add(this.poolProxyContract.stake(managerKey, stakeAmount));  
    };  
      
    // Example: Submit a governance proposal  
    submitGovernanceProposal = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	tx.add(  
    		this.poolProxyContract.submitProposal(managerKey, {  
    			takerFee: 0.0005, // 5 bps  
    			makerFee: 0.0002, // 2 bps  
    			stakeRequired: 1000,  
    		}),  
    	);  
    };  
      
    // Example: Vote on a proposal  
    voteOnProposal = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	const proposalId = '0x...';  
    	tx.add(this.poolProxyContract.vote(managerKey, proposalId));  
    };  
      
    // Example: Claim trading rebates  
    claimTradingRebate = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	tx.add(this.poolProxyContract.claimRebate(managerKey));  
    };  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-margin-sdk/orders.mdx>)

[PreviousMargin Pool](</onchain-finance/deepbook-margin-sdk/margin-pool>)[NextMaintainer](</onchain-finance/deepbook-margin-sdk/maintainer>)

  * Order functions
    * `placeLimitOrder`
    * `placeMarketOrder`
    * `placeReduceOnlyLimitOrder`
    * `placeReduceOnlyMarketOrder`
    * `modifyOrder`
    * `cancelOrder`, `cancelOrders`, `cancelAllOrders`
    * `withdrawSettledAmounts`
    * `stake`, `unstake`
    * `submitProposal`, `vote`
    * `claimRebate`
    * `withdrawMarginSettledAmounts`
    * `updateCurrentPrice`
  * Examples
    * Place a limit order
    * Place a market order
    * Place a reduce-only order
    * Modify and cancel orders
    * Stake and participate in governance
