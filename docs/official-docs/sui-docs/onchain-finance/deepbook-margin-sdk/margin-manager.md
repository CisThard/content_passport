<!-- Source: https://docs.sui.io/onchain-finance/deepbook-margin-sdk/margin-manager -->

* [](</>)
  * [DeepBook Margin](</onchain-finance/deepbook-margin/>)
  * [DeepBook Margin SDK](</onchain-finance/deepbook-margin-sdk/>)
  * Margin Manager


On this page

# Margin Manager SDK

Managing margin accounts is essential for leveraged trading on DeepBook. The Margin Manager SDK provides functions for creating margin managers, depositing collateral, borrowing assets, and managing risk.

## Margin manager functions​

The DeepBook Margin SDK provides the following functions for managing margin accounts.

### `newMarginManager`​

Use `newMarginManager` to create and share a new margin manager in one transaction. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the DeepBook pool.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `newMarginManagerWithInitializer`​

Use `newMarginManagerWithInitializer` to create a margin manager and return it with an initializer. You must call `shareMarginManager` afterward to share it. The call returns an object with `manager` and `initializer`.

**Parameters**

  * `poolKey`: String that identifies the DeepBook pool.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `shareMarginManager`​

Use `shareMarginManager` to share a margin manager created with `newMarginManagerWithInitializer`. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the DeepBook pool.
  * `manager`: `TransactionArgument` representing the margin manager.
  * `initializer`: `TransactionArgument` representing the initializer.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `depositDuringInitialization`​

Use `depositDuringInitialization` to deposit funds into a margin manager during its creation, before it is shared. This must be called in the same transaction as `newMarginManagerWithInitializer` and before `shareMarginManager`. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `manager`: `TransactionArgument` representing the margin manager returned by `newMarginManagerWithInitializer`.
  * `poolKey`: String that identifies the DeepBook pool.
  * `coinType`: String identifying the coin type to deposit (for example, `'SUI'`, `'DBUSDC'`, `'DEEP'`).
  * `amount`: Number representing the amount to deposit (provide either `amount` or `coin`, not both).
  * `coin`: `TransactionArgument` representing a coin object to deposit (provide either `amount` or `coin`, not both).


File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `depositBase`, `depositQuote`, `depositDeep`​

Use these functions to deposit assets into a margin manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the margin manager.
  * `amount`: Number representing the amount to deposit.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `withdrawBase`, `withdrawQuote`, `withdrawDeep`​

Use these functions to withdraw assets from a margin manager. Withdrawals are subject to risk ratio limits. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the margin manager.
  * `amount`: Number representing the amount to withdraw.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `borrowBase`, `borrowQuote`​

Use these functions to borrow assets from margin pools. Borrowing is subject to risk ratio limits. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the margin manager.
  * `amount`: Number representing the amount to borrow.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `repayBase`, `repayQuote`​

Use these functions to repay borrowed assets. If no amount is specified, it repays the maximum available balance up to the total debt. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the margin manager.
  * `amount`: Optional number representing the amount to repay.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `liquidate`​

Use `liquidate` to liquidate an undercollateralized margin manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerAddress`: String representing the address of the margin manager to liquidate.
  * `poolKey`: String that identifies the DeepBook pool.
  * `debtIsBase`: Boolean indicating whether the debt is in the base asset.
  * `repayCoin`: `TransactionArgument` representing the coin to use for repayment.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `setMarginManagerReferral`​

Use `setMarginManagerReferral` to set a pool-specific referral for the margin manager. The referral must be a `DeepBookPoolReferral` minted for the pool associated with the margin manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the margin manager.
  * `referral`: String representing the referral ID.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `unsetMarginManagerReferral`​

Use `unsetMarginManagerReferral` to remove the referral association from a margin manager for a specific pool. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the margin manager.
  * `poolKey`: String that identifies the DeepBook pool.


File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Read-only functions​

The following functions query margin manager state without modifying it.

### `managerState`​

Query comprehensive state information for a margin manager, including risk ratio, assets, debts, and Pyth price data.

File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `owner`, `deepbookPool`, `marginPoolId`​

Query basic margin manager information.

File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `baseBalance`, `quoteBalance`, `deepBalance`​

Query individual asset balances held in the margin manager.

File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `borrowedShares`, `borrowedBaseShares`, `borrowedQuoteShares`, `hasBaseDebt`​

Query borrowed position information.

File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `balanceManager`, `calculateAssets`, `calculateDebts`​

Query balance and debt information.

File not found in manifest: `packages/deepbook-v3/src/transactions/marginManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Examples​

The following examples demonstrate common margin manager operations.

### Create a margin manager​
[code] 
    /**  
     * @description Create a new margin manager  
     * @param {string} poolKey The key to identify the pool  
     * @returns A function that takes a Transaction object  
     */  
    newMarginManager = (poolKey: string) => (tx: Transaction) => {};  
      
    // Example usage  
    createMarginManager = (tx: Transaction) => {  
    	const poolKey = 'SUI_DBUSDC';  
    	tx.add(this.marginContract.newMarginManager(poolKey));  
    };  
    
[/code]

### Deposit collateral​
[code] 
    // Example: Deposit 100 SUI as collateral  
    depositCollateral = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	tx.add(this.marginContract.depositBase(managerKey, 100));  
    };  
    
[/code]

### Borrow assets​
[code] 
    // Example: Borrow 500 USDC  
    borrowFunds = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	tx.add(this.marginContract.borrowQuote(managerKey, 500));  
    };  
    
[/code]

### Repay loan​
[code] 
    // Example: Repay all borrowed quote assets  
    repayLoan = (tx: Transaction) => {  
    	const managerKey = 'MARGIN_MANAGER_1';  
    	// No amount specified = repay all  
    	tx.add(this.marginContract.repayQuote(managerKey));  
    };  
    
[/code]

### Liquidate a position​
[code] 
    // Example: Liquidate an undercollateralized position  
    liquidatePosition = (tx: Transaction) => {  
    	const managerAddress = '0x...'; // Address of margin manager to liquidate  
    	const poolKey = 'SUI_DBUSDC';  
    	const debtIsBase = false; // Debt is in USDC (quote)  
    	const repayCoin = tx.splitCoins(tx.gas, [500 * 1_000_000]); // 500 USDC  
    	tx.add(this.marginContract.liquidate(managerAddress, poolKey, debtIsBase, repayCoin));  
    };  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbook-margin-sdk/margin-manager.mdx>)

[PreviousDeepBook Margin SDK](</onchain-finance/deepbook-margin-sdk/>)[NextMargin Pool](</onchain-finance/deepbook-margin-sdk/margin-pool>)

  * Margin manager functions
    * `newMarginManager`
    * `newMarginManagerWithInitializer`
    * `shareMarginManager`
    * `depositDuringInitialization`
    * `depositBase`, `depositQuote`, `depositDeep`
    * `withdrawBase`, `withdrawQuote`, `withdrawDeep`
    * `borrowBase`, `borrowQuote`
    * `repayBase`, `repayQuote`
    * `liquidate`
    * `setMarginManagerReferral`
    * `unsetMarginManagerReferral`
  * Read-only functions
    * `managerState`
    * `owner`, `deepbookPool`, `marginPoolId`
    * `baseBalance`, `quoteBalance`, `deepBalance`
    * `borrowedShares`, `borrowedBaseShares`, `borrowedQuoteShares`, `hasBaseDebt`
    * `balanceManager`, `calculateAssets`, `calculateDebts`
  * Examples
    * Create a margin manager
    * Deposit collateral
    * Borrow assets
    * Repay loan
    * Liquidate a position
