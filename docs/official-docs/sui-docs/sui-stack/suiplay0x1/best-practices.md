<!-- Source: https://docs.sui.io/sui-stack/suiplay0x1/best-practices -->

* [](</>)
  * [SuiPlay0X1](</sui-stack/suiplay0x1/>)
  * Best Practices


On this page

# Best Practices

tip

This guide will be updated as the Playtron SDK and additional tooling become available. Check back regularly for the latest recommendations and implementation details.

There are some best practices to consider when developing for SuiPlay0X1.

## Handling transactions​

Avoid frequent micro-transactions: If players are using their self-custody wallets and transactions require explicit player signatures, then you should avoid frequent micro-transactions, particularly during gameplay. Signing a transaction requires popping up an on-device visual element or an off-device browser dialog to approve, breaking the gameplay flow. This is not a concern if you are managing custodial wallets on behalf of the player. See [Wallet Integration Options](</sui-stack/suiplay0x1/wallet-integration>) for more information on available wallet integrations.

Many onchain actions do not require explicit user approval. For example, dropping rewards to a user, incrementing their currency, and so on. The game can handle these whenever appropriate, even silently in the background during gameplay.

## Managing gas​

If using a third-party wallet service ([Beamable](<https://beamable.com/>), [Shinami](<https://www.shinami.com/>)), leverage gas sponsorship for custodial implementations to abstract from users. Consider tradeoffs between aggregated and individual wallets and batch transactions whenever possible to reduce gas costs.

## Data management​

Proper data management design can augment the user experience.

### Onchain versus offchain storage​

Consider where best to store your data:

  * **Onchain:** Assets and currencies that can be traded or sold.
  * **Offchain:** Game state, progress, and so on using traditional game servers.


While you can store any information onchain, consider whether it’s important to your game for that data to exist there. If not, leverage traditional game server backends, which makes data syncing and updating easier.

### Session start protocol​

Always check wallet state at session beginning and don't cache wallet data between sessions as assets can change externally.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/sui-stack/suiplay0x1/best-practices.mdx>)

[PreviousWallet Integration Options](</sui-stack/suiplay0x1/wallet-integration>)[NextBroader Sui Ecosystem Support](</sui-stack/suiplay0x1/migration-strategies>)

  * Handling transactions
  * Managing gas
  * Data management
    * Onchain versus offchain storage
    * Session start protocol
