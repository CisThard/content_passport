<!-- Source: https://docs.sui.io/onchain-finance/deepbook-margin-sdk/margin-pool -->

* [](</>)
  * [DeepBook Margin](</onchain-finance/deepbook-margin/>)
  * [DeepBook Margin SDK](</onchain-finance/deepbook-margin-sdk/>)
  * Margin Pool


On this page

# Margin Pool SDK

Supplying liquidity to margin pools enables lenders to earn interest on their assets while providing borrowing capacity for margin traders. The Margin Pool SDK provides functions for managing liquidity positions and earning referral fees.

## Margin pool functions​

The DeepBook Margin SDK provides the following functions for interacting with margin pools.

### `mintSupplierCap`​

Use `mintSupplierCap` to create a new supplier capability that can be used to supply and withdraw from margin pools. One `SupplierCap` can be used across multiple margin pools. The call returns a function that takes a `Transaction` object.

File not found in manifest: `packages/deepbook-v3/src/transactions/marginPool.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `supplyToMarginPool`​

Use `supplyToMarginPool` to supply assets to a margin pool and earn interest. You can optionally provide a referral ID to share fees with the referrer. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `coinKey`: String that identifies the asset type.
  * `supplierCap`: `TransactionObjectArgument` representing the supplier cap.
  * `amountToDeposit`: Number representing the amount to supply.
  * `referralId`: Optional string representing the referral ID.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginPool.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `withdrawFromMarginPool`​

Use `withdrawFromMarginPool` to withdraw supplied assets from a margin pool. If no amount is specified, it withdraws all available shares. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `coinKey`: String that identifies the asset type.
  * `supplierCap`: `TransactionObjectArgument` representing the supplier cap.
  * `amountToWithdraw`: Optional number representing the amount to withdraw.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginPool.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `mintSupplyReferral`​

Use `mintSupplyReferral` to create a supply referral for earning fees. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `coinKey`: String that identifies the asset type.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginPool.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `withdrawReferralFees`​

Use `withdrawReferralFees` to withdraw accumulated referral fees. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `coinKey`: String that identifies the asset type.
  * `referralId`: String representing the referral ID.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginPool.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Read-only functions​

The following functions query margin pool state without modifying it.

### Pool information​

Query basic pool information and configuration.

File not found in manifest: `packages/deepbook-v3/src/transactions/marginPool.ts`. You probably need to run `pnpm prebuild` and restart the site.

### Supply and borrow metrics​

Query current supply and borrow amounts and shares.

File not found in manifest: `packages/deepbook-v3/src/transactions/marginPool.ts`. You probably need to run `pnpm prebuild` and restart the site.

### Interest rate​

Query the current interest rate based on utilization.

File not found in manifest: `packages/deepbook-v3/src/transactions/marginPool.ts`. You probably need to run `pnpm prebuild` and restart the site.

### User positions​

Query a supplier's position in the pool.

File not found in manifest: `packages/deepbook-v3/src/transactions/marginPool.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Examples​

The following examples demonstrate common margin pool operations.

### Create a supplier cap​
[code] 
    /**  
     * @description Mint a supplier cap for margin pool  
     * @returns A function that takes a Transaction object  
     */  
    mintSupplierCap = () => (tx: Transaction) => {};  
      
    // Example usage  
    createSupplierCap = (tx: Transaction) => {  
    	const supplierCap = tx.add(this.marginPoolContract.mintSupplierCap());  
    	// Transfer to user or store for later use  
    	tx.transferObjects([supplierCap], tx.pure.address(this.config.address));  
    };  
    
[/code]

### Supply liquidity​
[code] 
    // Example: Supply 1000 USDC to the margin pool  
    supplyLiquidity = (tx: Transaction) => {  
    	const coinKey = 'USDC';  
    	const supplierCapId = '0x...'; // ID of your supplier cap  
    	const supplierCap = tx.object(supplierCapId);  
    	const amountToSupply = 1000;  
      
    	tx.add(  
    		this.marginPoolContract.supplyToMarginPool(  
    			coinKey,  
    			supplierCap,  
    			amountToSupply,  
    			// Optional: provide referral ID  
    		),  
    	);  
    };  
    
[/code]

### Supply with referral​
[code] 
    // Example: Supply 1000 USDC with a referral  
    supplyWithReferral = (tx: Transaction) => {  
    	const coinKey = 'USDC';  
    	const supplierCapId = '0x...';  
    	const supplierCap = tx.object(supplierCapId);  
    	const referralId = '0x...'; // Referral object ID  
      
    	tx.add(  
    		this.marginPoolContract.supplyToMarginPool(  
    			coinKey,  
    			supplierCap,  
    			1000,  
    			referralId, // Referral will earn fees  
    		),  
    	);  
    };  
    
[/code]

### Withdraw liquidity​
[code] 
    // Example: Withdraw 500 USDC from the margin pool  
    withdrawLiquidity = (tx: Transaction) => {  
    	const coinKey = 'USDC';  
    	const supplierCapId = '0x...';  
    	const supplierCap = tx.object(supplierCapId);  
      
    	tx.add(this.marginPoolContract.withdrawFromMarginPool(coinKey, supplierCap, 500));  
    };  
      
    // Example: Withdraw all available liquidity  
    withdrawAll = (tx: Transaction) => {  
    	const coinKey = 'USDC';  
    	const supplierCapId = '0x...';  
    	const supplierCap = tx.object(supplierCapId);  
      
    	// No amount specified = withdraw all  
    	tx.add(this.marginPoolContract.withdrawFromMarginPool(coinKey, supplierCap));  
    };  
    
[/code]

### Create and manage referrals​
[code] 
    // Example: Create a supply referral  
    createReferral = (tx: Transaction) => {  
    	const coinKey = 'USDC';  
    	tx.add(this.marginPoolContract.mintSupplyReferral(coinKey));  
    };  
      
    // Example: Withdraw referral fees  
    claimReferralFees = (tx: Transaction) => {  
    	const coinKey = 'USDC';  
    	const referralId = '0x...'; // Your referral object ID  
    	tx.add(this.marginPoolContract.withdrawReferralFees(coinKey, referralId));  
    };  
    
[/code]

### Query pool state​
[code] 
    // Example: Check interest rate and utilization  
    checkPoolMetrics = async (tx: Transaction) => {  
    	const coinKey = 'USDC';  
      
    	// Get total supply and borrow  
    	const totalSupply = tx.add(this.marginPoolContract.totalSupply(coinKey));  
    	const totalBorrow = tx.add(this.marginPoolContract.totalBorrow(coinKey));  
      
    	// Get current interest rate  
    	const interestRate = tx.add(this.marginPoolContract.interestRate(coinKey));  
      
    	// Query user position  
    	const supplierCapId = '0x...';  
    	const userShares = tx.add(this.marginPoolContract.userSupplyShares(coinKey, supplierCapId));  
    	const userAmount = tx.add(this.marginPoolContract.userSupplyAmount(coinKey, supplierCapId));  
    };  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-margin-sdk/margin-pool.mdx>)

[PreviousMargin Manager](</onchain-finance/deepbook-margin-sdk/margin-manager>)[NextOrders](</onchain-finance/deepbook-margin-sdk/orders>)

  * Margin pool functions
    * `mintSupplierCap`
    * `supplyToMarginPool`
    * `withdrawFromMarginPool`
    * `mintSupplyReferral`
    * `withdrawReferralFees`
  * Read-only functions
    * Pool information
    * Supply and borrow metrics
    * Interest rate
    * User positions
  * Examples
    * Create a supplier cap
    * Supply liquidity
    * Supply with referral
    * Withdraw liquidity
    * Create and manage referrals
    * Query pool state
