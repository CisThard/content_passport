<!-- Source: https://docs.sui.io/onchain-finance/examples-patterns/fixed-supply -->

* [](</>)
  * [Example Asset Patterns](</onchain-finance/examples-patterns/>)
  * Fixed Supply


# Fixed Supply

This fixed supply example mints the total supply of 10,000,000,000,000,000,000 coins and transfers the coins to the sender. Then, the treasury cap is locked as a dynamic object field to prevent further modifications.

To further ensure that the package cannot be modified in the future, burn the upgrade cap rather than transferring it.

File not found in manifest: `I2/fixed_supply/sources/silver.move`. You probably need to run `pnpm prebuild` and restart the site.

[View the full example on GitHub](<https://github.com/MystenLabs/sui-move-bootcamp/tree/solution/I2>).

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/examples-patterns/fixed-supply.mdx>)

[PreviousExample Asset Patterns](</onchain-finance/examples-patterns/>)[NextLoyalty Tokens](</onchain-finance/examples-patterns/loyalty-tokens>)
