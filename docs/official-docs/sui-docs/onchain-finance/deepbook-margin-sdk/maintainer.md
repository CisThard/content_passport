<!-- Source: https://docs.sui.io/onchain-finance/deepbook-margin-sdk/maintainer -->

* [](</>)
  * [DeepBook Margin](</onchain-finance/deepbook-margin/>)
  * [DeepBook Margin SDK](</onchain-finance/deepbook-margin-sdk/>)
  * Maintainer


On this page

# Maintainer SDK

The Maintainer SDK provides administrative functions for managing margin pools, configuring interest rates, and controlling which DeepBook pools can access margin lending. These functions are restricted to maintainers with the appropriate capabilities.

## Maintainer functions​

The DeepBook Margin SDK provides the following functions for pool administration and configuration.

### `createMarginPool`​

Use `createMarginPool` to create a new margin pool for a specific asset. Requires the maintainer capability. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `coinKey`: String that identifies the asset type.
  * `poolConfig`: `TransactionArgument` representing the protocol configuration.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginMaintainer.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `newProtocolConfig`​

Use `newProtocolConfig` to create a new protocol configuration object combining margin pool settings and interest parameters. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `coinKey`: String that identifies the asset type.
  * `marginPoolConfig`: `MarginPoolConfigParams` object with pool settings.
  * `interestConfig`: `InterestConfigParams` object with interest rate parameters.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginMaintainer.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `newMarginPoolConfig`​

Use `newMarginPoolConfig` to create a margin pool configuration object. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `coinKey`: String that identifies the asset type.
  * `marginPoolConfig`: `MarginPoolConfigParams` object containing:
    * `supplyCap`: Number representing maximum supply allowed
    * `maxUtilizationRate`: Number representing maximum utilization (such as 0.8 for 80%)
    * `referralSpread`: Number representing protocol spread percentage
    * `minBorrow`: Number representing minimum borrow amount


File not found in manifest: `packages/deepbook-v3/src/transactions/marginMaintainer.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `newInterestConfig`​

Use `newInterestConfig` to create an interest configuration object. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `interestConfig`: `InterestConfigParams` object containing:
    * `baseRate`: Number representing base interest rate
    * `baseSlope`: Number representing interest rate slope before kink
    * `optimalUtilization`: Number representing the kink point (such as 0.8)
    * `excessSlope`: Number representing interest rate slope after kink


File not found in manifest: `packages/deepbook-v3/src/transactions/marginMaintainer.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `enableDeepbookPoolForLoan`, `disableDeepbookPoolForLoan`​

Use these functions to control which DeepBook pools can borrow from the margin pool. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `deepbookPoolKey`: String that identifies the DeepBook pool.
  * `coinKey`: String that identifies the margin pool asset.
  * `marginPoolCap`: String representing the margin pool capability ID.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginMaintainer.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `updateInterestParams`​

Use `updateInterestParams` to update the interest rate parameters for a margin pool. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `coinKey`: String that identifies the margin pool asset.
  * `marginPoolCap`: String representing the margin pool capability ID.
  * `interestConfig`: `InterestConfigParams` object with new interest parameters.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginMaintainer.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `updateMarginPoolConfig`​

Use `updateMarginPoolConfig` to update the configuration settings for a margin pool. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `coinKey`: String that identifies the margin pool asset.
  * `marginPoolCap`: String representing the margin pool capability ID.
  * `marginPoolConfig`: `MarginPoolConfigParams` object with new pool settings.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginMaintainer.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `withdrawMaintainerFees`​

Use `withdrawMaintainerFees` to withdraw accumulated maintainer fees from a margin pool. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `coinKey`: String that identifies the margin pool asset.
  * `marginPoolCap`: String representing the margin pool capability ID.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginMaintainer.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `withdrawProtocolFees`​

Use `withdrawProtocolFees` to withdraw accumulated protocol fees from a margin pool. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `coinKey`: String that identifies the margin pool asset.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginMaintainer.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `adminWithdrawDefaultReferralFees`​

Use `adminWithdrawDefaultReferralFees` to withdraw default referral fees from a margin pool. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `coinKey`: String that identifies the margin pool asset.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginMaintainer.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Examples​

The following examples demonstrate common maintainer operations.

### Create a margin pool​
[code] 
    // Example: Create a USDC margin pool  
    createUsdcMarginPool = (tx: Transaction) => {  
    	const coinKey = 'USDC';  
      
    	// Create pool configuration  
    	const poolConfig = tx.add(  
    		this.maintainerContract.newProtocolConfig(  
    			coinKey,  
    			{  
    				supplyCap: 10_000_000, // 10M USDC  
    				maxUtilizationRate: 0.8, // 80%  
    				referralSpread: 0.1, // 10% protocol spread  
    				minBorrow: 100, // 100 USDC minimum  
    			},  
    			{  
    				baseRate: 0.02, // 2% base rate  
    				baseSlope: 0.1, // 10% slope before kink  
    				optimalUtilization: 0.8, // 80% kink point  
    				excessSlope: 1.0, // 100% slope after kink  
    			},  
    		),  
    	);  
      
    	// Create the pool  
    	tx.add(this.maintainerContract.createMarginPool(coinKey, poolConfig));  
    };  
    
[/code]

### Enable a DeepBook pool for borrowing​
[code] 
    // Example: Allow SUI/USDC pool to borrow from USDC margin pool  
    enablePoolForBorrowing = (tx: Transaction) => {  
    	const deepbookPoolKey = 'SUI_DBUSDC';  
    	const coinKey = 'USDC';  
    	const marginPoolCapId = '0x...'; // Margin pool cap ID  
      
    	tx.add(  
    		this.maintainerContract.enableDeepbookPoolForLoan(deepbookPoolKey, coinKey, marginPoolCapId),  
    	);  
    };  
    
[/code]

### Update interest rate parameters​
[code] 
    // Example: Update USDC margin pool interest rates  
    updateInterestRates = (tx: Transaction) => {  
    	const coinKey = 'USDC';  
    	const marginPoolCapId = '0x...';  
      
    	tx.add(  
    		this.maintainerContract.updateInterestParams(coinKey, marginPoolCapId, {  
    			baseRate: 0.03, // Increase to 3% base rate  
    			baseSlope: 0.12, // Increase slope  
    			optimalUtilization: 0.75, // Lower kink to 75%  
    			excessSlope: 1.5, // Steeper excess slope  
    		}),  
    	);  
    };  
    
[/code]

### Update margin pool configuration​
[code] 
    // Example: Update USDC margin pool limits  
    updatePoolConfig = (tx: Transaction) => {  
    	const coinKey = 'USDC';  
    	const marginPoolCapId = '0x...';  
      
    	tx.add(  
    		this.maintainerContract.updateMarginPoolConfig(coinKey, marginPoolCapId, {  
    			supplyCap: 20_000_000, // Increase to 20M USDC  
    			maxUtilizationRate: 0.85, // Allow 85% utilization  
    			referralSpread: 0.12, // Increase protocol spread  
    			minBorrow: 50, // Lower minimum to 50 USDC  
    		}),  
    	);  
    };  
    
[/code]

### Complete pool setup workflow​
[code] 
    // Example: Complete workflow for setting up a new margin pool  
    setupNewMarginPool = (tx: Transaction) => {  
    	const coinKey = 'SUI';  
      
    	// Step 1: Create protocol config  
    	const poolConfig = tx.add(  
    		this.maintainerContract.newProtocolConfig(  
    			coinKey,  
    			{  
    				supplyCap: 1_000_000, // 1M SUI  
    				maxUtilizationRate: 0.75,  
    				referralSpread: 0.1,  
    				minBorrow: 10,  
    			},  
    			{  
    				baseRate: 0.01,  
    				baseSlope: 0.08,  
    				optimalUtilization: 0.8,  
    				excessSlope: 0.8,  
    			},  
    		),  
    	);  
      
    	// Step 2: Create the margin pool  
    	tx.add(this.maintainerContract.createMarginPool(coinKey, poolConfig));  
      
    	// Step 3: Enable specific DeepBook pools for borrowing  
    	const marginPoolCapId = '0x...'; // Get from pool creation event  
    	tx.add(this.maintainerContract.enableDeepbookPoolForLoan('SUI_DBUSDC', coinKey, marginPoolCapId));  
    	tx.add(this.maintainerContract.enableDeepbookPoolForLoan('SUI_USDT', coinKey, marginPoolCapId));  
    };  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-margin-sdk/maintainer.mdx>)

[PreviousOrders](</onchain-finance/deepbook-margin-sdk/orders>)[NextTake Profit Stop Loss](</onchain-finance/deepbook-margin-sdk/tpsl>)

  * Maintainer functions
    * `createMarginPool`
    * `newProtocolConfig`
    * `newMarginPoolConfig`
    * `newInterestConfig`
    * `enableDeepbookPoolForLoan`, `disableDeepbookPoolForLoan`
    * `updateInterestParams`
    * `updateMarginPoolConfig`
    * `withdrawMaintainerFees`
    * `withdrawProtocolFees`
    * `adminWithdrawDefaultReferralFees`
  * Examples
    * Create a margin pool
    * Enable a DeepBook pool for borrowing
    * Update interest rate parameters
    * Update margin pool configuration
    * Complete pool setup workflow
