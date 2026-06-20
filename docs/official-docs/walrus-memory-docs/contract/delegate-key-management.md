# Delegate Key Management

Delegate keys are lightweight Ed25519 keys used for SDK authentication. They are registered onchain in a MemWalAccount and verified by the relayer on every request.

## Creating a delegate key

Generate a new Ed25519 keypair using the SDK:

```typescript
import { generateDelegateKey } from "@mysten-incubation/memwal/account";

const { privateKey, publicKey, suiAddress } = generateDelegateKey();
```

## Registering a delegate key

Delegate keys are registered onchain through the Walrus Memory smart contract. Use the dashboard or the SDK's account management utilities:

```typescript
import { addDelegateKey } from "@mysten-incubation/memwal/account";

await addDelegateKey({
  key: "<owner-private-key>",
  accountId: "<memwal-account-id>",
  delegatePublicKey: "<new-delegate-public-key>",
  label: "my-app",
});
```

## Removing a delegate key

```typescript
import { removeDelegateKey } from "@mysten-incubation/memwal/account";

await removeDelegateKey({
  key: "<owner-private-key>",
  accountId: "<memwal-account-id>",
  delegatePublicKey: "<delegate-public-key-to-remove>",
});
```

## How delegate keys are verified

Every protected API call goes through Ed25519 signature verification:

1. The SDK signs a message using the delegate private key
2. The relayer verifies the Ed25519 signature against the provided public key
3. The relayer resolves the public key to a MemWalAccount using the priority chain
4. The onchain account is fetched to verify the delegate key is registered in `delegate_keys`
5. The resolved owner address is used to scope all subsequent operations
