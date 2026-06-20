<!-- Source: https://docs.sui.io/onchain-finance/deepbookv3/contract-information/flash-loans -->

* [](</>)
  * [DeepBookV3](</onchain-finance/deepbookv3/deepbook>)
  * [Contract Information](</onchain-finance/deepbookv3/contract-information>)
  * Flash Loans


On this page

# Flash Loans

Flash loans by definition are uncollateralized loans that are borrowed and repaid within the same programmable transaction block. Users can borrow flash loans in the base or quote asset from any DeepBookV3 pool. Flash loans return a `FlashLoan` hot potato (struct with no abilities), which must be returned back to the pool by the end of the call. The transaction is atomic, so the entire transaction fails if the loan is not returned.

The quantity borrowed can be the maximum amount that the pool owns. Borrowing from a pool and trading in the same pool can result in failures because trading requires the movement of funds. If the funds are borrowed, then there are no funds to move.

## API​

Following are the endpoints that the `Pool` exposes for flash loans.

Click to openBorrow flash loan base

Borrow base assets from the `Pool`. The function returns a hot potato, forcing the borrower to return the assets within the same transaction.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openBorrow flash loan quote

Borrow quote assets from the `Pool`. The function returns a hot potato, forcing the borrower to return the assets within the same transaction.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRetrieve flash loan base

Return the flash loaned base assets to the `Pool`. `FlashLoan` object is unwrapped only if the assets are returned, otherwise the transaction fails.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

Click to openRetrieve flash loan quote

Return the flash loaned quote assets to the `Pool`. `FlashLoan` object is unwrapped only if the assets are returned, otherwise the transaction fails.

File not found in manifest: `packages/deepbook/sources/pool.move`. You probably need to run `pnpm prebuild` and restart the site.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/deepbookv3/contract-information/flash-loans.mdx>)

[PreviousOrders](</onchain-finance/deepbookv3/contract-information/orders>)[NextSwaps](</onchain-finance/deepbookv3/contract-information/swaps>)

  * API
