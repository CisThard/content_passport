<!-- Source: https://docs.sui.io/onchain-finance/deepbookv3-sdk/balance-manager -->

* [](</>)
  * [DeepBookV3](</onchain-finance/deepbookv3/deepbook>)
  * [DeepBookV3 SDK](</onchain-finance/deepbookv3-sdk/>)
  * BalanceManager


On this page

# BalanceManager SDK

The `BalanceManager` is a core component of DeepBookV3 that holds all asset balances. The SDK provides comprehensive functions to create, manage, and interact with balance managers.

## Balance manager functions​

The DeepBookV3 SDK provides the following functions for managing balance managers.

Click to opencreateAndShareBalanceManager

Use `createAndShareBalanceManager` to create a new balance manager and automatically share it. The call returns a function that takes a `Transaction` object.

File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to opencreateBalanceManagerWithOwner

Use `createBalanceManagerWithOwner` to create a new balance manager with a custom owner. Returns the manager object. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `ownerAddress`: String representing the address of the owner.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to openshareBalanceManager

Use `shareBalanceManager` to share a balance manager that was created but not yet shared. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `manager`: `TransactionArgument` representing the balance manager to share.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Deposit and withdraw functions​

Click to opendepositIntoManager

Use `depositIntoManager` to deposit funds into a balance manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.
  * `coinKey`: String that identifies the coin to deposit.
  * `amountToDeposit`: Number representing the amount to deposit.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to openwithdrawFromManager

Use `withdrawFromManager` to withdraw funds from a balance manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.
  * `coinKey`: String that identifies the coin to withdraw.
  * `amountToWithdraw`: Number representing the amount to withdraw.
  * `recipient`: String representing the recipient address.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to openwithdrawAllFromManager

Use `withdrawAllFromManager` to withdraw all funds of a specific coin type from a balance manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.
  * `coinKey`: String that identifies the coin to withdraw.
  * `recipient`: String representing the recipient address.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to opencheckManagerBalance

Use `checkManagerBalance` to check the balance of a specific coin in a balance manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.
  * `coinKey`: String that identifies the coin to check.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Trade proof functions​

Click to opengenerateProof

Use `generateProof` to generate a trade proof for the balance manager. Automatically calls the appropriate function based on whether a `tradeCap` is set. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to opengenerateProofAsOwner

Use `generateProofAsOwner` to generate a trade proof as the owner of the balance manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerId`: String representing the ID of the balance manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to opengenerateProofAsTrader

Use `generateProofAsTrader` to generate a trade proof using a `tradeCap`. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerId`: String representing the ID of the balance manager.
  * `tradeCapId`: String representing the ID of the trade cap.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Capability functions​

Click to openmintTradeCap

Use `mintTradeCap` to mint a `tradeCap` for the balance manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to openmintDepositCap

Use `mintDepositCap` to mint a `depositCap` for the balance manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to openmintWithdrawalCap

Use `mintWithdrawalCap` to mint a `withdrawCap` for the balance manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to opendepositWithCap

Use `depositWithCap` to deposit funds into a balance manager using a `depositCap`. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.
  * `coinKey`: String that identifies the coin to deposit.
  * `amountToDeposit`: Number representing the amount to deposit.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to openwithdrawWithCap

Use `withdrawWithCap` to withdraw funds from a balance manager using a `withdrawCap`. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.
  * `coinKey`: String that identifies the coin to withdraw.
  * `amountToWithdraw`: Number representing the amount to withdraw.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to openrevokeTradeCap

Use `revokeTradeCap` to revoke a `TradeCap`. This also revokes the associated `DepositCap` and `WithdrawCap`. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.
  * `tradeCapId`: String representing the ID of the TradeCap to revoke.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Referral functions​

Click to opensetBalanceManagerReferral

Use `setBalanceManagerReferral` to set a pool-specific referral for the balance manager. Requires a `tradeCap` for permission checking. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.
  * `referral`: String representing the referral ID (DeepBookPoolReferral).
  * `tradeCap`: `TransactionArgument` representing the trade cap for permission.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to openunsetBalanceManagerReferral

Use `unsetBalanceManagerReferral` to remove a referral from the balance manager for a specific pool. Requires a `tradeCap` for permission checking. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.
  * `poolKey`: String that identifies the pool to unset the referral for.
  * `tradeCap`: `TransactionArgument` representing the trade cap for permission.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to opengetBalanceManagerReferralId

Use `getBalanceManagerReferralId` to get the referral ID associated with a balance manager for a specific pool. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.
  * `poolKey`: String that identifies the pool.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Registry functions​

Click to openregisterBalanceManager

Use `registerBalanceManager` to register a balance manager with the registry. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Read-only functions​

Click to openowner

Use `owner` to get the owner address of a balance manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to openid

Use `id` to get the ID of a balance manager. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `managerKey`: String that identifies the balance manager.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to openbalanceManagerReferralOwner

Use `balanceManagerReferralOwner` to get the owner address of a pool referral (DeepBookPoolReferral). The call returns a function that takes a `Transaction` object.

**Parameters**

  * `referralId`: String representing the ID of the referral.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

Click to openbalanceManagerReferralPoolId

Use `balanceManagerReferralPoolId` to get the pool ID associated with a pool referral (DeepBookPoolReferral). The call returns a function that takes a `Transaction` object.

**Parameters**

  * `referralId`: String representing the ID of the referral.


File not found in manifest: `packages/deepbook-v3/src/transactions/balanceManager.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Examples​

The following examples demonstrate common balance manager operations.

### Create and share a balance manager​
[code] 
    // Example: Create and share a new balance manager  
    createBalanceManager = (tx: Transaction) => {  
    	tx.add(this.balanceManager.createAndShareBalanceManager());  
    };  
    
[/code]

### Create a balance manager with custom owner​
[code] 
    // Example: Create a balance manager with custom owner and share it  
    createManagerWithOwner = (tx: Transaction) => {  
    	const ownerAddress = '0x123...';  
      
    	// Create the manager with custom owner  
    	const manager = tx.add(this.balanceManager.createBalanceManagerWithOwner(ownerAddress));  
      
    	// Share the manager  
    	tx.add(this.balanceManager.shareBalanceManager(manager));  
    };  
    
[/code]

### Deposit and withdraw funds​
[code] 
    // Example: Deposit USDC into a balance manager  
    depositFunds = (tx: Transaction) => {  
    	const managerKey = 'MANAGER_1';  
    	const coinKey = 'DBUSDC';  
    	const amount = 1000; // 1000 USDC  
      
    	tx.add(this.balanceManager.depositIntoManager(managerKey, coinKey, amount));  
    };  
      
    // Example: Withdraw SUI from a balance manager  
    withdrawFunds = (tx: Transaction) => {  
    	const managerKey = 'MANAGER_1';  
    	const coinKey = 'SUI';  
    	const amount = 100; // 100 SUI  
    	const recipient = '0x456...';  
      
    	tx.add(this.balanceManager.withdrawFromManager(managerKey, coinKey, amount, recipient));  
    };  
      
    // Example: Withdraw all DEEP from a balance manager  
    withdrawAllDeep = (tx: Transaction) => {  
    	const managerKey = 'MANAGER_1';  
    	const coinKey = 'DEEP';  
    	const recipient = '0x456...';  
      
    	tx.add(this.balanceManager.withdrawAllFromManager(managerKey, coinKey, recipient));  
    };  
    
[/code]

### Mint and use capabilities​
[code] 
    // Example: Mint a TradeCap and use it  
    mintAndUseTradeCap = async (tx: Transaction) => {  
    	const managerKey = 'MANAGER_1';  
      
    	// Mint the TradeCap  
    	const tradeCap = tx.add(this.balanceManager.mintTradeCap(managerKey));  
      
    	// Transfer to a trader  
    	const traderAddress = '0x789...';  
    	tx.transferObjects([tradeCap], traderAddress);  
    };  
      
    // Example: Use DepositCap to deposit funds  
    depositWithCapability = (tx: Transaction) => {  
    	const managerKey = 'MANAGER_1';  
    	const coinKey = 'DBUSDC';  
    	const amount = 5000; // 5000 USDC  
      
    	tx.add(this.balanceManager.depositWithCap(managerKey, coinKey, amount));  
    };  
      
    // Example: Use WithdrawCap to withdraw funds  
    withdrawWithCapability = (tx: Transaction) => {  
    	const managerKey = 'MANAGER_1';  
    	const coinKey = 'SUI';  
    	const amount = 50; // 50 SUI  
      
    	const withdrawnCoin = tx.add(this.balanceManager.withdrawWithCap(managerKey, coinKey, amount));  
      
    	// Transfer the withdrawn coin  
    	tx.transferObjects([withdrawnCoin], '0xabc...');  
    };  
    
[/code]

### Generate trade proofs​
[code] 
    // Example: Generate a trade proof and use it to place an order  
    placeOrderWithProof = (tx: Transaction) => {  
    	const managerKey = 'MANAGER_1';  
    	const poolKey = 'SUI_DBUSDC';  
      
    	// Generate proof automatically (uses owner or tradeCap method)  
    	const proof = tx.add(this.balanceManager.generateProof(managerKey));  
      
    	// Use the proof to place an order  
    	tx.add(  
    		this.deepBook.placeLimitOrder({  
    			poolKey: poolKey,  
    			balanceManagerKey: managerKey,  
    			clientOrderId: '12345',  
    			price: 2.5,  
    			quantity: 100,  
    			isBid: true,  
    			payWithDeep: true,  
    		}),  
    	);  
    };  
    
[/code]

### Set and manage referrals​
[code] 
    // Example: Set a pool-specific referral for a balance manager  
    setManagerReferral = (tx: Transaction) => {  
    	const managerKey = 'MANAGER_1';  
    	const referralId = '0xdef...'; // DeepBookPoolReferral ID  
      
    	// Get or create the TradeCap  
    	const tradeCap = tx.object('0x...'); // Assuming tradeCap is already minted  
      
    	tx.add(this.balanceManager.setBalanceManagerReferral(managerKey, referralId, tradeCap));  
    };  
      
    // Example: Unset a referral for a specific pool  
    unsetManagerReferral = (tx: Transaction) => {  
    	const managerKey = 'MANAGER_1';  
    	const poolKey = 'SUI_DBUSDC';  
    	const tradeCap = tx.object('0x...');  
      
    	tx.add(this.balanceManager.unsetBalanceManagerReferral(managerKey, poolKey, tradeCap));  
    };  
    
[/code]

### Complete workflow​
[code] 
    // Example: Complete balance manager setup workflow  
    completeSetup = async (tx: Transaction) => {  
    	const ownerAddress = '0x123...';  
      
    	// Step 1: Create manager with custom owner  
    	const manager = tx.add(this.balanceManager.createBalanceManagerWithOwner(ownerAddress));  
      
    	// Step 2: Share the manager  
    	tx.add(this.balanceManager.shareBalanceManager(manager));  
      
    	// Step 3: Mint capabilities  
    	const tradeCap = tx.add(this.balanceManager.mintTradeCap('MANAGER_1'));  
    	const depositCap = tx.add(this.balanceManager.mintDepositCap('MANAGER_1'));  
    	const withdrawCap = tx.add(this.balanceManager.mintWithdrawalCap('MANAGER_1'));  
      
    	// Step 4: Transfer capabilities to owner  
    	tx.transferObjects([depositCap, withdrawCap, tradeCap], ownerAddress);  
    };  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbookv3-sdk/balance-manager.mdx>)

[PreviousDeepBookV3 SDK](</onchain-finance/deepbookv3-sdk/>)[NextPools](</onchain-finance/deepbookv3-sdk/pools>)

  * Balance manager functions
  * Deposit and withdraw functions
  * Trade proof functions
  * Capability functions
  * Referral functions
  * Registry functions
  * Read-only functions
  * Examples
    * Create and share a balance manager
    * Create a balance manager with custom owner
    * Deposit and withdraw funds
    * Mint and use capabilities
    * Generate trade proofs
    * Set and manage referrals
    * Complete workflow
