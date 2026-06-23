# Register Enoki Wallets

## Initializing

To register Enoki wallets using the [wallet-standard](https://docs.sui.io/standards/wallet-standard), you can use the `registerEnokiWallets` function. This will add a wallet for each of the configured auth providers. These wallets implement all the standard wallet standard features, and can be interacted with like any other Sui wallet.

Note that Enoki wallets are bound to a specific network, so you will need to re-register your Enoki wallets using an updated client instance and network configuration whenever the targeted network changes. See the [React integration](./register.md#react-integration) section below for how this is handled.

```
import { registerEnokiWallets } from '@mysten/enoki';

const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') });

registerEnokiWallets({
	client: suiClient,
	network: 'testnet',
	apiKey: 'YOUR_PUBLIC_ENOKI_API_KEY',
	providers: {
		google: {
			clientId: 'YOUR_GOOGLE_CLIENT_ID',
		},
		facebook: {
			clientId: 'YOUR_FACEBOOK_CLIENT_ID',
		},
		twitch: {
			clientId: 'YOUR_TWITCH_CLIENT_ID',
		},
	},
});
```

When the `standard:connect` feature is called, the Enoki SDK will open a pop-up window to handle the OAuth flow. Once the Oauth flow has completed, the wallet will now be connected, and can be used to sign transactions or personal messages.

## React integration

First, set up the dapp-kit providers as described in the [dapp-kit docs](https://sdk.mystenlabs.com/dapp-kit#setting-up-providers). Next, create a component to register the Enoki wallets using the `registerEnokiWallets` function. This component should be rendered before the wallet provider.

```
import {
	createNetworkConfig,
	SuiClientProvider,
	useSuiClientContext,
	WalletProvider,
} from '@mysten/dapp-kit';
import { isEnokiNetwork, registerEnokiWallets } from '@mysten/enoki';
import { getFullnodeUrl } from '@mysten/sui/client';
import { useEffect } from 'react';

const { networkConfig } = createNetworkConfig({
	testnet: { url: getFullnodeUrl('testnet') },
	mainnet: { url: getFullnodeUrl('mainnet') },
});

function App() {
	return (
		<SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
			<RegisterEnokiWallets />
			<WalletProvider autoConnect>
				<YourApp />
			</WalletProvider>
		</SuiClientProvider>
	);
}

function RegisterEnokiWallets() {
	const { client, network } = useSuiClientContext();

	useEffect(() => {
		if (!isEnokiNetwork(network)) return;

		const { unregister } = registerEnokiWallets({
			apiKey: 'YOUR_PUBLIC_ENOKI_API_KEY',
			providers: {
				// Provide the client IDs for each of the auth providers you want to use:
				google: {
					clientId: 'YOUR_GOOGLE_CLIENT_ID',
				},
				facebook: {
					clientId: 'YOUR_FACEBOOK_CLIENT_ID',
				},
				twitch: {
					clientId: 'YOUR_TWITCH_CLIENT_ID',
				},
			},
			client,
			network,
		});

		return unregister;
	}, [client, network]);

	return null;
}
```