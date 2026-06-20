<!-- Source: https://docs.sui.io/onchain-finance/deepbookv3-sdk/pools -->

* [](</>)
  * [DeepBookV3](</onchain-finance/deepbookv3/deepbook>)
  * [DeepBookV3 SDK](</onchain-finance/deepbookv3-sdk/>)
  * Pools


On this page

# Pools SDK

Pools are shared objects that represent a market. See [Query the Pool](</onchain-finance/deepbookv3/contract-information/query-the-pool>) for more information on pools.

## Pool functions​

The DeepBookV3 SDK exposes functions that you can call to read the state of a pool. These functions typically require a `managerKey`, `coinKey`, `poolKey`, or a combination of these. For details on these keys, see [DeepBookV3 SDK](</onchain-finance/deepbookv3-sdk#keys>). The SDK includes some default keys that you can view in the `constants.ts` file.

SDK unit handling

Input amounts, quantities, and prices should be provided in standard decimal format (such as `10.5` SUI or `0.00001` nBTC). The SDK handles conversion to base units internally. Returned amounts are also in standard decimal format.

### account​

Use `account` to retrieve the account information for a `BalanceManager` in a pool, which has the following form:
[code] 
    {  
      epoch: '511',  
      open_orders: {  
        constants: [  
          '170141211130585342296014727715884105730',  
          '18446744092156295689709543266',  
          '18446744092156295689709543265'  
        ]  
      },  
      taker_volume: 0,  
      maker_volume: 0,  
      active_stake: 0,  
      inactive_stake: 0,  
      created_proposal: false,  
      voted_proposal: null,  
      unclaimed_rebates: { base: 0, quote: 0, deep: 0 },  
      settled_balances: { base: 0, quote: 0, deep: 0 },  
      owed_balances: { base: 0, quote: 0, deep: 0 }  
    }  
    
[/code]

**Parameters**

  * `poolKey`: String that identifies the pool to query.
  * `balanceManagerKey`: key of the balance manager defined in the SDK.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### accountOpenOrders​

Use `accountOpenOrders` to retrieve open orders for the balance manager and pool with the IDs you provide. The call returns a `Promise` that contains an array of open order IDs.

**Parameters**

  * `poolKey`: String that identifies the pool to query.
  * `managerKey`: String that identifies the balance manager to query.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### checkManagerBalance​

Use `checkManagerBalance` to check the balance manager for a specific coin. The call returns a `Promise` in the form:
[code] 
    {  
      coinType: string,  
      balance: number  
    }  
    
[/code]

**Parameters**

  * `managerKey`: String that identifies the balance manager to query.
  * `coinKey`: String that identifies the coin to query the balance of.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### getOrder​

Use `getOrder` to retrieve an order's information. The call returns a `Promise` in the `Order` struct, which has the following form:
[code] 
    {  
      balance_manager_id: {  
        bytes: '0x6149bfe6808f0d6a9db1c766552b7ae1df477f5885493436214ed4228e842393'  
      },  
      order_id: '9223372036873222552073709551614',  
      client_order_id: '888',  
      quantity: '50000000',  
      filled_quantity: '0',  
      fee_is_deep: true,  
      order_deep_price: { asset_is_base: false, deep_per_asset: '0' },  
      epoch: '440',  
      status: 0,  
      expire_timestamp: '1844674407370955161'  
    }  
    
[/code]

**Parameters**

`poolKey`: String that identifies the pool to query. `orderId`: ID of the order to query.

File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### getQuoteQuantityOut​

Use `getQuoteQuantityOut` to retrieve the quote quantity out for the base quantity you provide. The call returns a `Promise` in the form:
[code] 
    {  
      baseQuantity: number,  
      baseOut: number,  
      quoteOut: number,  
      deepRequired: number  
    }  
    
[/code]

where `deepRequired` is the amount of DEEP required for the dry run.

**Parameters**

  * `poolKey`: String that identifies the pool to query.
  * `baseQuantity`: Number that defines the base quantity you want to convert.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### getBaseQuantityOut​

Use `getBaseQuantityOut` to retrieve the base quantity out for the quote quantity that you provide. The call returns a `Promise` in the form:
[code] 
    {  
      quoteQuantity: number,  
      baseOut: number,  
      quoteOut: number,  
      deepRequired: number  
    }  
    
[/code]

where `deepRequired` is the amount of DEEP required for the dry run.

**Parameters**

  * `poolKey`: String that identifies the pool to query.
  * `quoteQuantity`: Number that defines the quote quantity you want to convert.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### getQuantityOut​

Use `getQuantityOut` to retrieve the output quantities for the base or quote quantity you provide. You provide values for both quantities, but only one of them can be nonzero. The call returns a `Promise` with the form:
[code] 
    {  
      baseQuantity: number,  
      quoteQuantity: number,  
      baseOut: number,  
      quoteOut: number,  
      deepRequired: number  
    }  
    
[/code]

where `deepRequired` is the amount of DEEP required for the dry run.

**Parameters**

  * `poolKey`: String that identifies the pool to query.
  * `baseQuantity`: Number that defines the base quantity you want to convert. Set to `0` if using quote quantity.
  * `quoteQuantity`: Number that defines the quote quantity you want to convert. Set to `0` if using base quantity.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### getLevel2Range​

Use `getLevel2Range` to retrieve level 2 order book within the boundary price range you provide. The call returns a `Promise` in the form:
[code] 
    {  
      prices: Array<number>,  
      quantities: Array<number>  
    }  
    
[/code]

**Parameters**

  * `poolKey`: String that identifies the pool to query.
  * `priceLow`: Number for lower bound of price range.
  * `priceHigh`: Number for upper bound of price range.
  * `isBid`: Boolean when set to `true` gets bid orders, else retrieve ask orders.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### getLevel2TicksFromMid​

Use `getLevel2TicksFromMid` to retrieve level 2 order book ticks from mid-price for a pool with the ID you provide. The call returns a `Promise` in the form:
[code] 
    {  
      bid_prices: Array<number>,  
      bid_quantities: Array<number>,  
      ask_prices: Array<number>,  
      ask_quantities: Array<number>  
    }  
    
[/code]

**Parameters**

  * `poolKey`: String that identifies the pool to query.
  * `ticks`: Number of ticks from mid-price.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### lockedBalance​

Use `lockedBalance` to retrieve a `BalanceManager` locked balance in the pool. The call returns a `Promise` in the `Order` struct, which has the following form:
[code] 
    {  
      base: 5.5,  
    	quote: 2,  
    	deep: 0.15,  
    }  
    
[/code]

**Parameters**

`poolKey`: String that identifies the pool to query. `balanceManagerKey`: key of the balance manager defined in the SDK.

File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### poolTradeParams​

Use `poolTradeParams` to retrieve the trade params for the pool, which has the following form:
[code] 
    {  
      takerFee: 0.001,  
    	makerFee: 0.0005,  
    	stakeRequired: 100,  
    }  
    
[/code]

**Parameters**

  * `poolKey`: String that identifies the pool to query.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### vaultBalances​

Use `vaultBalances` to get the vault balances for a pool with the ID you provide. The call returns a `Promise` in the form:
[code] 
    {  
      base: number,  
      quote: number,  
      deep: number  
    }  
    
[/code]

**Parameters**

  * `poolKey`: String that identifies the pool to query.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### getPoolIdByAssets​

Use `getPoolIdByAssets` to retrieve the pool ID for the asset types you provide. The call returns a `Promise` with the address of the pool if it's found.

**Parameters**

  * `baseType`: String of the type of base asset.
  * `quoteType`: String of the type of quote asset.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### midPrice​

Use `midPrice` to retrieve the mid price for a pool with the ID that you provide. The call returns a `Promise` with the mid price.

**Parameters**

  * `poolKey`: String that identifies the pool to query.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `whitelisted`​

Use `whitelisted` to check if the pool with the ID you provide is whitelisted. The call returns a `Promise` as a boolean indicating whether the pool is whitelisted.

**Parameters**

  * `poolKey`: String that identifies the pool to query.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `poolBookParams`​

Use `poolBookParams` to retrieve the book parameters for a pool, including tick size, lot size, and min size. The call returns a `Promise` with the book parameters.

**Parameters**

  * `poolKey`: String that identifies the pool to query.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `getOrders`​

Use `getOrders` to retrieve multiple orders from a pool. The call returns a `Promise` with an array of order information.

**Parameters**

  * `poolKey`: String that identifies the pool to query.
  * `orderIds`: Array of strings representing the order IDs to retrieve.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `getPoolDeepPrice`​

Use `getPoolDeepPrice` to get the DEEP price conversion for a pool. The call returns a `Promise` with the DEEP price information.

**Parameters**

  * `poolKey`: String that identifies the pool to query.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Administrative functions​

The SDK provides administrative functions for pool management.

### `addDeepPricePoint`​

Use `addDeepPricePoint` to add a DEEP price point for a target pool using a reference pool. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `targetPoolKey`: String that identifies the target pool.
  * `referencePoolKey`: String that identifies the reference pool.


File not found in manifest: `packages/deepbook-v3/src/transactions/deepbook.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `updatePoolAllowedVersions`​

Use `updatePoolAllowedVersions` to update the allowed package versions for a pool. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the pool.


File not found in manifest: `packages/deepbook-v3/src/transactions/deepbook.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `createPermissionlessPool`​

Use `createPermissionlessPool` to create a new permissionless pool. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `params`: `CreatePermissionlessPoolParams` object containing:
    * `baseCoinKey`: String that identifies the base coin.
    * `quoteCoinKey`: String that identifies the quote coin.
    * `tickSize`: Number representing the tick size.
    * `lotSize`: Number representing the lot size.
    * `minSize`: Number representing the minimum order size.
    * `deepCoin`: Optional `TransactionArgument` for DEEP token payment.


File not found in manifest: `packages/deepbook-v3/src/transactions/deepbook.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `getBalanceManagerIds`​

Use `getBalanceManagerIds` to get all balance manager IDs for a specific owner. The call returns a `Promise` with an array of balance manager IDs.

**Parameters**

  * `owner`: String representing the owner address.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Referral functions​

The SDK provides functions to manage referrals and earn referral fees from trading activity.

### `mintReferral`​

Use `mintReferral` to create a new referral for a pool with a specified multiplier. The multiplier determines what percentage of trading fees are allocated to the referrer. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the pool.
  * `multiplier`: Number representing the referral multiplier (such as 0.1 for 10%).


File not found in manifest: `packages/deepbook-v3/src/transactions/deepbook.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `updateReferralMultiplier`​

Use `updateReferralMultiplier` to update the multiplier for an existing referral. Only the referral owner can update the multiplier. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the pool.
  * `referral`: String representing the referral ID.
  * `multiplier`: Number representing the new referral multiplier.


File not found in manifest: `packages/deepbook-v3/src/transactions/deepbook.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `claimReferralRewards`​

Use `claimReferralRewards` to claim accumulated referral fees. Returns an object with `baseRewards`, `quoteRewards`, and `deepRewards`. The call returns a function that takes a `Transaction` object.

**Parameters**

  * `poolKey`: String that identifies the pool.
  * `referral`: String representing the referral ID.


File not found in manifest: `packages/deepbook-v3/src/transactions/deepbook.ts`. You probably need to run `pnpm prebuild` and restart the site.

### `getReferralBalances`​

Use `getReferralBalances` to view the current accumulated balances for a referral without claiming them. The call returns a `Promise` with the balances in base, quote, and DEEP tokens.

**Parameters**

  * `poolKey`: String that identifies the pool.
  * `referral`: String representing the referral ID.


File not found in manifest: `packages/deepbook-v3/src/client.ts`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbookv3-sdk/pools.mdx>)

[PreviousBalanceManager](</onchain-finance/deepbookv3-sdk/balance-manager>)[NextOrders](</onchain-finance/deepbookv3-sdk/orders>)

  * Pool functions
    * account
    * accountOpenOrders
    * checkManagerBalance
    * getOrder
    * getQuoteQuantityOut
    * getBaseQuantityOut
    * getQuantityOut
    * getLevel2Range
    * getLevel2TicksFromMid
    * lockedBalance
    * poolTradeParams
    * vaultBalances
    * getPoolIdByAssets
    * midPrice
    * `whitelisted`
    * `poolBookParams`
    * `getOrders`
    * `getPoolDeepPrice`
  * Administrative functions
    * `addDeepPricePoint`
    * `updatePoolAllowedVersions`
    * `createPermissionlessPool`
    * `getBalanceManagerIds`
  * Referral functions
    * `mintReferral`
    * `updateReferralMultiplier`
    * `claimReferralRewards`
    * `getReferralBalances`
