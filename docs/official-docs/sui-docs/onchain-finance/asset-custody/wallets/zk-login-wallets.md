<!-- Source: https://docs.sui.io/onchain-finance/asset-custody/wallets/zk-login-wallets -->

* [](</>)
  * [Asset Custody](</onchain-finance/asset-custody/>)
  * [Wallets](</onchain-finance/asset-custody/wallets/>)
  * zkLogin Wallets


On this page

# zkLogin Wallets

zkLogin wallets derive a Sui address from an OAuth credential rather than a traditional private key or recovery passphrase. The user signs in with a provider they already use (Google, Apple, Twitch, and others), and the wallet generates a Sui address tied to that credential. No seed phrase is created, and no persistent private key is stored by the OAuth provider. [zkLogin is a primitive native to Sui](</sui-stack/zklogin-integration/zklogin>), designed to remove the key management burden for users who are new to onchain applications.

## How zkLogin wallets work​

At a high level, a zkLogin wallet works as follows:

  1. The app generates an [ephemeral key pair](</sui-stack/zklogin-integration/zklogin#how-zklogin-works>), valid for a limited number of epochs.
  2. The user authenticates with an OAuth provider. The provider returns a [JSON Web Token (JWT)](</sui-stack/zklogin-integration/zklogin#json-web-token-jwt>) that contains a nonce derived from the ephemeral public key.
  3. The app or a proving service uses the JWT to generate a zero-knowledge proof (ZKP). The proof confirms the user holds a valid OAuth credential without revealing the credential onchain.
  4. The app uses the JWT, a [per-user salt](</sui-stack/zklogin-integration/zklogin#user-salt>), and the issuer URL to [derive a stable Sui address](</sui-stack/zklogin-integration/zklogin#address-definition>) for the user. The same credential always produces the same address for a given app and salt.
  5. Transactions are signed with the [ephemeral private key](</sui-stack/zklogin-integration/zklogin#ephemeral-private-key>) and submitted alongside the ZKP. Validators verify the proof and execute the transaction.


Because zkLogin is a two-factor scheme, an attacker who compromises an OAuth account cannot sign transactions unless they also compromise the per-user salt.

## Enoki​

[Enoki](<https://enoki.mystenlabs.com/>) is a Mysten Labs platform that wraps zkLogin and sponsored transactions behind a straightforward API. Rather than managing proof generation, salt storage, and OAuth configuration yourself, you register your app on the Enoki Developer Portal, configure your OAuth providers, and use the [`@mysten/enoki` SDK](<https://docs.enoki.mystenlabs.com/>) to handle the rest.

Enoki implements the [Wallet Standard](</onchain-finance/asset-custody/wallets/wallet-standard>) and integrates with [Sui dApp Kit](<https://sdk.mystenlabs.com/dapp-kit>) through `registerEnokiWallets`. Once registered, they appear in the standard connection UI alongside any other installed wallets.

File not found in manifest: `packages/enoki/src/wallet/register.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Playtron wallet​

The [Playtron](<https://www.playtron.one/>) wallet is the default zkLogin wallet on the [SuiPlay0X1](</sui-stack/suiplay0x1/wallet-integration>). Every SuiPlay0X1 user has a Playtron account, and every Playtron account has an associated zkLogin wallet derived from those credentials.

Games running on the SuiPlay0X1 must support the Playtron wallet as the default option. Off-device versions of those games should use Sui dApp Kit to allow users to connect their Playtron wallet through a web interface.

## zkLogin SDK​

The [`@mysten/sui/zklogin` module in the Sui TypeScript SDK](<https://sdk.mystenlabs.com/sui/zklogin>) provides utilities for building zkLogin wallets and apps directly, without using a managed service like Enoki. Use this SDK when you need full control over proof generation, salt management, and address derivation.

Install the Sui TypeScript SDK:
[code] 
    npm i @mysten/sui  
    
[/code]

### Core utilities​

All zkLogin utilities are exported from `@mysten/sui/zklogin`.

**Derive a Sui address from a JWT:**

File not found in manifest: `packages/sui/src/zklogin/address.ts`. You probably need to run `pnpm prebuild` and restart the site.

**Derive an address from a parsed JWT:**

File not found in manifest: `packages/sui/src/zklogin/address.ts`. You probably need to run `pnpm prebuild` and restart the site.

**Derive an address from an address seed:**

File not found in manifest: `packages/sui/src/zklogin/address.ts`. You probably need to run `pnpm prebuild` and restart the site.

**Serialize a zkLogin signature for transaction submission:**

File not found in manifest: `packages/sui/src/zklogin/signature.ts`. You probably need to run `pnpm prebuild` and restart the site.

**Parse an existing serialized zkLogin signature:**

File not found in manifest: `packages/sui/src/zklogin/signature.ts`. You probably need to run `pnpm prebuild` and restart the site.

### Proof generation​

The Sui TypeScript SDK handles address derivation and signature serialization, but it does not generate ZKPs. Proof generation requires a prover service:

  * **Mysten Labs prover:** A publicly accessible proving service maintained by Mysten Labs. Suitable for Testnet and Devnet development. See [zkLogin integration guide](</sui-stack/zklogin-integration>) for the endpoint and request format.
  * **Self-hosted prover:** You run your own prover for production environments where you need full control over the proving infrastructure.


[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/asset-custody/wallets/zk-login-wallets.mdx>)

[PreviousSelf-Custodial Wallets](</onchain-finance/asset-custody/wallets/self-custody>)[NextSuiLink](</onchain-finance/asset-custody/wallets/suilink>)

  * How zkLogin wallets work
  * Enoki
  * Playtron wallet
  * zkLogin SDK
    * Core utilities
    * Proof generation
