# Sponsored Transactions

Enoki provides sponsored transactions, which allow you to send transactions to zkLogin accounts without the need to on-ramp users to Sui.

Using Enoki you can:

- Integrate sponsored transactions with less effort.
- Safely sponsor transactions without introducing excessive costs or opportunities for misuse.
- Sponsor transactions in development environments before introducing them into production.

## Implementation

Sponsoring transactions requires using private API keys.

When using private API keys, you execute your sponsored transactions through a backend service that interacts with the [Enoki API](../http-api/index.md). The backend service allows you to make transactions without exposing your private API keys.

### Enoki API

Use a backend service with private API keys to perform sponsored transactions using Enoki.

To use Enoki APIs:

1. Construct `transactionBlockKindBytes` with `txb.build({ provider, onlyTransactionKind: true })`.

    ```
    const client = useSuiClient();
    const txb = new Transaction();

    // ... add some transactions...

    const transactionBlockKindBytes = await txb.build({ client, onlyTransactionKind: true });
    ```

2. Pass the `transactionBlockKindBytes` value to your backend service. The backend calls `transaction-blocks/sponsor` with method `POST` and provides:
    - `zklogin-jwt` value as part of the header.
    - `network` and `transactionBlockKindBytes` values in the body.

    If successful, the response includes the bytes for the transaction and the transaction digest.

3. Sign the returned transaction bytes with your key pair.

4. From your backend service, call `transaction-blocks/sponsor/:digest` with method `POST`, and provide the signature you create in the previous step in the body of the call. If successful, the response includes a sponsor-signed base64-encoded transaction.