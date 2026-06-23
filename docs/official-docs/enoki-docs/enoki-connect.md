# Enoki Connect

Many decentralized applications (dApps) rely on embedded zkLogin wallets to simplify and streamline the user onboarding process. This approach offers a seamless and frictionless experience, allowing users to create and use wallets effortlessly without the complexities of traditional crypto wallet management. However, a key limitation of this model is that the wallet is tightly bound to the specific dApp where it was created. With Enoki Connect, users can use their dApp-specific accounts across different dApps, enabling a more unified and consistent experience.

## How it works

**Enoki Connect** enables users to access their **dApp-specific zkLogin accounts** across multiple applications through three simple components:

1. ***Enoki Connect Wallet*** — a lightweight wallet interface for users to access their zkLogin accounts.

2. **Source dApp Setup** — builders enable Enoki Connect in the Enoki Portal.

3. ***Other dApps Integration*** — builders of other dApps register the same wallet by adding a small code snippet that references the source dApp's public app slug.

## Integration Steps

### Enoki Portal Source dApp Configuration

Enoki zkLogin Required

For **Enoki Connect** to work, the source dApp must use Enoki zkLogin for managing its zkLogin accounts. This includes using the default salt provided by Enoki. Custom zkLogin configurations are not supported.

The source dApp — the application where users initially create and manage their zkLogin accounts — must first enable Enoki Connect in the Enoki Portal. Follow these steps to enable Enoki Connect for your application:

1. Sign in to the [Enoki Portal](https://portal.enoki.mystenlabs.com).

2. Select your application from the dashboard.

3. In the side panel, click Enoki Connect.

4. Click Enable, fill in the required details, and click Enable again to activate Enoki Connect for your app.

5. Add the Enoki Connect Wallet Callback URL. For each of your Authentication Providers, add the callback URL (e.g., *https://[YOUR_PUBLIC_APP_SLUG].connect.enoki.mystenlabs.com/auth/callback*) as an **Authorized Redirect URI**. You can find this exact URL in the Enoki Portal once Enoki Connect is enabled.

Public App Slug

Select your apps **Public App Slug** carefully as it cannot change at the moment. (It has to be unique across all apps)

Enoki ZkLogin API Key

Enoki Connect Wallet requires a ZkLogin API Key to work.

### Wallet Registration by Other dApps

Any other dApp that wants to allow users to access their zkLogin accounts from the source dApp can do so by registering the **Enoki Connect Wallet**. This is done by adding a small code snippet that references the source dApp's **public app slug**.

```
// in an entry file of your dApp eg. main.ts
import { registerEnokiConnectWallets } from '@mysten/enoki-connect';

registerEnokiConnectWallets({
	publicAppSlugs: ['Replace_With_Source_Public_App_Slug'],
	dappName: 'Other DApp name',
});
```

You can find an example dApp [here](https://github.com/MystenLabs/ts-sdks/tree/main/packages/enoki-connect/demo-dapp).