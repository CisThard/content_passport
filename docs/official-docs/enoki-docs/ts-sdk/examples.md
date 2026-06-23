# Enoki SDK Examples

The following examples highlight some common workflows for onboarding users using Enoki.

## Sponsored transactions using client-side signatures

To sponsor and execute transactions in your backend service using client-side signatures:

1. Log in to the Enoki Portal and select the desired app from your team's dashboard.

2. Create a `public` API key enabled for **zkLogin** and the network you want to target.

3. Use the dashboard to add an auth provider and configure the Client ID value it provides.

4. Log in to the Enoki Portal and select the desired app from your team's dashboard.

5. Create a `private` API key enabled for **Sponsored Transactions** and the networks you want to target.

6. Create an Enoki client in your backend service using the key you create in the previous step.

    Keep your secret key in an `env` variable and take care not to expose it publicly.

    ```
    import { EnokiClient } from '@mysten/enoki';

    export const enokiClient = new EnokiClient({
    	apiKey: process.env.ENOKI_SECRET_KEY!,
    });
    ```

7. Create a new `Transaction`, add the needed commands and serialize the transaction kind to bytes (Uint8Array). The following example sets the owner of a kiosk and transfers the `kioskOwnerCap` to the recipient.

    ```
    const tx = new Transaction();
    tx.moveCall({
    	target: '0x2::kiosk::set_owner_custom',
    	arguments: [tx.object(kioskId), tx.object(user.kioskOwnerCapId), tx.pure(recipient)],
    });
    tx.transferObjects([tx.object(user.kioskOwnerCapId)], recipient);

    const txBytes = await tx.build({
    	client: suiClient,
    	onlyTransactionKind: true,
    });
    ```

8. Make a call to the `enokiClient` to sponsor the transaction. The response returned will be the bytes and digest of the `transaction`, which is later used to execute the transaction:

    ```
    const resp = await enokiClient.createSponsoredTransaction({
    	network: ENOKI_CLIENT_NETWORK,
    	transactionKindBytes: toB64(txBytes),
    	sender: address,
    	allowedMoveCallTargets: ['0x2::kiosk::set_owner_custom'],
    	allowedAddresses: [recipient],
    });
    ```

    Set the sender of the transaction, include the move call you are going to invoke in the `allowedMoveCallTargets` field and the recipient (if any) in the `allowedAddresses` field. You can also configure these values in the Enoki Portal project dashboard.

9. Execute the sponsored transaction. You need both the user's signature and the digest to execute the transaction. The previous call returns the digest but you must collect the signature from the user. Assuming the user session is on the client side, you need to return the transaction bytes to the client and collect the signature as shown:

    ```
    import { useSignTransaction } from '@mysten/dapp-kit';

    export default function Example() {
       const { mutateAsync: signTransaction } = useSignTransaction();

       const getSignature = async () => {
          // use bytes returned from your backend after sponsoring the transaction
          const { signature } = await signTransaction({ transaction: bytes });
          if (!signature) {
             throw new Error('Error signing transaction block');
          }
          ...
       }
    }
    ```

    The code snippet gets the `bytes` value from the `createSponsoredTransaction()` response, which it uses to collect the user signature. The code then needs to return that signature to the backend service, along with the digest, to execute the transaction:

    ```
    const resp = await enokiClient.executeSponsoredTransaction({
    	digest,
    	signature,
    });
    ```

## Backend sponsor, execute, and sign transactions

When sponsoring, executing, and signing transactions from a backend, you don't need to transfer the transaction bytes to the client to get the signature. Instead, you can use the initial steps from the previous example to get the API key and create the Enoki client, then execute the following code from the backend:

```
const tx = new Transaction();
tx.moveCall({
	target: '0x2::kiosk::set_owner_custom',
	arguments: [tx.object(kioskId), tx.object(kioskOwnerCapId), tx.pure(address)],
});
tx.transferObjects([tx.object(kioskOwnerCapId)], address);

const txBytes = await tx.build({
	client: suiClient,
	onlyTransactionKind: true,
});
const sponsored = await enokiClient.createSponsoredTransaction({
	network: ENOKI_CLIENT_NETWORK,
	transactionKindBytes: toB64(txBytes),
	sender: getAddress(process.env.ADMIN_SECRET_KEY!),
	allowedMoveCallTargets: [
		'0x0000000000000000000000000000000000000000000000000000000000000002::kiosk::set_owner_custom',
	],
	allowedAddresses: [address],
});
const signer = getSigner(process.env.ADMIN_SECRET_KEY!);
const { signature } = await signer.signTransaction(fromB64(sponsored.bytes));
await enokiClient.executeSponsoredTransaction({
	digest: sponsored.digest,
	signature,
});
```

The backend service executes this code without the need to transfer from server side to client side, because the backend stores the signer.

## Migrating a dApp to Mainnet

During dApp development, you typically implement the Enoki workflows in these examples on one of the Sui development networks, Testnet or Devnet. Before migrating an Enoki-enhanced dApp from development networks to Mainnet, check that:

- You set the network parameter that might be passed to the `enokiClient.createAuthorizationURL` or to the `enokiClient.createSponsoredTransaction` functions is set to `mainnet`.
- In the Enoki Portal, make sure you have **Mainnet** enabled in the networks list for the API keys that are used for the sponsorship.