# Signing Transactions

The Enoki SDK uses the [wallet-standard](https://docs.sui.io/standards/wallet-standard) to allow signing transactions to be handle the same way it is done with other wallets. You can use the [`useSignAndExecuteTransaction` hook from dapp-kit](https://sdk.mystenlabs.com/dapp-kit/wallet-hooks/useSignAndExecuteTransaction) to sign and execute transactions

## Example

Consider the following code example. Unseen here, the [SuiClientProvider](https://sdk.mystenlabs.com/dapp-kit/sui-client-provider) wraps the root of this app and the Enoki wallets are already [registered](./register.md#react-integration) through the wallet standard. Doing this enables the wallet related hooks from dapp-kit to work with Enoki.

When the user taps or clicks the **Sign and execute transaction** button, if the currently connected wallet is an Enoki wallet, the Enoki SDK will automatically generate a signature for the transaction, before it is executed with dapp-kit.

```
import { Transaction } from '@mysten/sui/transactions';
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit';

function Demo() {
	const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction();

	async function handleButtonClick() {
		const transaction = new Transaction();
		// Add some commands to the transaction...

		// Executes the transaction using the currently connected wallet
		const { digest } = await signAndExecuteTransaction({
			transaction,
		});
	}

	return <button onClick={handleButtonClick}>Sign and execute transaction</button>;
}
```

Unlike other wallets, signing does not require confirmation to approve the transaction. In a production app, you should provide logic that informs the user they are performing a transaction and allow them to cancel it if it was unintended.