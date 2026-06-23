# Signing in with Enoki

Once Enoki Wallets have been registered via the wallet standard, you can integrate login capabilities with `dapp-kit`'s `ConnectButton` component or the `useConnectWallet` hook.

## Using the Connect Button

The following example assumes that you have set up the dapp-kit providers and have registered Enoki wallets via the `registerEnokiWallets` method.

```
import { ConnectButton } from '@mysten/dapp-kit';

export function YourApp() {
	return <ConnectButton />;
}
```

When the user taps or clicks the **Connect** button, the Connect modal will include entries for signing in with each of the configured auth providers. If the user selects one of Auth providers from the list of registered Enoki wallets, the Enoki SDK will automatically handle the OAuth flow in a pop-up window and connect that Enoki wallet as the current active account.

## Using custom login buttons

To customize the login experience, you can use the `useConnectWallet` and `useWallets` hooks to create your own login buttons:

```
import { useConnectWallet, useCurrentAccount, useWallets } from '@mysten/dapp-kit';
import { isEnokiWallet, EnokiWallet, AuthProvider } from '@mysten/enoki';
import { type EnokiWallet } from '@mysten/enoki';

function YourLoginComponent() {
	const currentAccount = useCurrentAccount();
	const { connect } = useConnectWallet();

	const wallets = useWallets().filter(isEnokiWallet);
	const walletsByProvider = wallets.reduce(
		(map, wallet) => map.set(wallet.provider, wallet),
		new Map<AuthProvider, EnokiWallet>(),
	);

	const googleWallet = walletsByProvider.get('google');
	const facebookWallet = walletsByProvider.get('facebook');

	if (currentAccount) {
		return <div>Current address: {currentAccount.address}</div>;
	}

	return (
		<>
			{googleWallet ? (
				<button
					onClick={() => {
						connect({ wallet: googleWallet });
					}}
				>
					Sign in with Google
				</button>
			) : null}
			{facebookWallet ? (
				<button
					onClick={() => {
						connect({ wallet: facebookWallet });
					}}
				>
					Sign in with Facebook
				</button>
			) : null}
		</>
	);
}
```

## Removing Enoki wallets from the ConnectButton modal

If your app supports both Enoki and normal wallets, and you have implemented custom login buttons, you can hide the Enoki wallets from the ConnectButton modal by using the `walletFilter` prop of the `ConnectButton` component:

```
import { ConnectButton } from '@mysten/dapp-kit';
import { isEnokiWallet } from '@mysten/enoki';

export function YourApp() {
	return <ConnectButton walletFilter={(wallet) => !isEnokiWallet(wallet)} />;
}
```