<!-- Source: https://docs.sui.io/onchain-finance/examples-patterns/in-game-currency -->

* [](</>)
  * [Example Asset Patterns](</onchain-finance/examples-patterns/>)
  * In-Game Currencies


On this page

# In-Game Currencies

Using the Sui [Closed-Loop Token](</onchain-finance/closed-loop-token>) standard, you can create in-game currencies. These might be in the form of in-game assets such as gems and diamonds that you can grant to players for their actions or make available for purchase. You mint the currency on Sui, but players can only use the currency within the economy of the game itself. You typically mint them in predefined amounts to maintain scarcity and the game economy.

This example implements a governance-controlled currency in Move. Transferring the currency requires an approval, which is implemented using custom rule logic. The currency in this example is called King Credits, and it can only be transferred with approval from the Crown Council.

## Initialize the currency​

To create the King Credits currency, initialize the currency using the `coin_registry::new_currency_with_otw` module and configure the currency policy with `token::add_rule_for_action`:

File not found in manifest: `I3/king_credits/sources/king_credits.move`. You probably need to run `pnpm prebuild` and restart the site.

info

`init` functions run only during the package publish event.

## Set custom transfer rules​

In another Move package, implement the `add_rule_config` function to initialize the rule configuration with initial council members and set a limit on the maximum number of members, including a check to ensure the count does not exceed that maximum.

The `add_council_member` and `remove_council_member` functions add and remove members from the council. The `prove` function checks whether the request sender is a council member and adds an approval for the rule if they are:

File not found in manifest: `I3/king_credits/sources/crown_council_rule.move`. You probably need to run `pnpm prebuild` and restart the site.

[View the full example on GitHub](<https://github.com/MystenLabs/sui-move-bootcamp/tree/solution/I3>).

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/examples-patterns/in-game-currency.mdx>)

[PreviousLoyalty Tokens](</onchain-finance/examples-patterns/loyalty-tokens>)[NextSoulbound NFTs](</onchain-finance/examples-patterns/soulbound-tokens>)

  * Initialize the currency
  * Set custom transfer rules
