# Welcome to Enoki

Enoki gets its name from a type of Japanese mushroom. In the same way that Enoki and all other fungi and plants sprout from vast networks of mycelium (shared root system), Enoki on Sui acts as the root system and gateway to build Web3 applications. Offering straightforward and accessible developer experience, and high quality user experience, Enoki empowers builders with the ability to exploit blockchain superpowers with the ease and convenience we are all familiar with in Web 2.0.

## Non-custodial account management

To unburden your users from having to think about Web3 technologies, you can use Enoki to create a Sui address from a Web 2.0 login. End users log in using Web 2.0 systems they are already familiar with, like Google login, and are able to perform transactions on the Sui network. The creation of a Sui address is handled for them and is tied to their Web 2.0 credentials.

Enoki uses zkLogin to generate self-custodial Sui addresses, with just a simple web credential login. Using the OAuth2 OpenID Connect standard, users can sign in with Google, Apple, Twitch [and more](https://docs.sui.io/concepts/cryptography/zklogin#openid-providers). The user's on-chain address is linked to an active JSON Web Token (JWT) from their web credential. Enoki generates a salt and address, using [zkLogin](https://docs.sui.io/concepts/cryptography/zklogin) proofs that allow a user to sign transactions just by logging into their web credential.

Through Enoki Developer Portal, you control and configure the login providers you want your users to authenticate with.

## Sponsored transactions

Enoki allows builders to fully sponsor all end-user transactions, and Enoki Developer Portal provides the tools to setup and manage these transactions. Using these, you can pay for transactions on the Sui network on behalf of your users. Doing so further removes complexity for your end users, as they don't need to understand gas fees or even know what a SUI token is, or that they are even conducting transactions on a blockchain. This puts you in control of revenue collection and keeps your users focused on the benefits of your app rather than its Web3 interactions.

## Documentation

To learn more about how to integrate Enoki in your apps, check out the [Enoki TypeScript SDK](./ts-sdk/index.md) to create transactions directly from your frontend or use the [HTTP API](./http-api/index.md) methods to call Enoki from a backend service.