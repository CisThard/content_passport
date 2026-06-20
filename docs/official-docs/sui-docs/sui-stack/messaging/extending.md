<!-- Source: https://docs.sui.io/sui-stack/messaging/extending -->

* [](</>)
  * [Messaging SDK](</sui-stack/messaging/>)
  * Guides
  * Extending


On this page

# Extending

The messaging layer is itself an extension of `@mysten/sui-groups` (see the [Sui Groups Extending guide](<https://github.com/MystenLabs/sui-groups>) for foundational patterns). You can extend it further at four levels:

Extension point| What it controls| Interface  
---|---|---  
Seal policy| Who can decrypt messages| `SealPolicy<TApproveContext>`  
Relayer transport| How messages are delivered and stored| `RelayerTransport`  
Attachment storage| Where file attachments are stored| `StorageAdapter`  
Recovery transport| Where messages are recovered from| `RecoveryTransport`  
  
## Custom Seal policy​

The default Seal policy (`DefaultSealPolicy`) gates decryption on `MessagingReader` permission through the `seal_approve_reader` Move function. To implement custom access control (subscription-based, token-gated, NFT-gated), you write a custom Move `seal_approve` function and a TypeScript `SealPolicy` implementation.

### The `SealPolicy` interface​
[code] 
    interface SealPolicy<TApproveContext = void> {  
      /** Package ID used as the Seal encryption namespace. */  
      readonly packageId: string;  
      
      /**  
       * Build a seal_approve transaction thunk for Seal decryption.  
       * Called lazily at decrypt time.  
       */  
      sealApproveThunk(  
        identityBytes: Uint8Array,  
        groupId: string,  
        encryptionHistoryId: string,  
        ...context: TApproveContext extends void ? [] : [context: TApproveContext]  
      ): (tx: Transaction) => TransactionResult;  
    }  
    
[/code]

The `TApproveContext` generic lets you pass runtime context (for example, subscription object IDs) through `sendMessage`, `getMessages`, and other SDK methods that trigger encryption or decryption.

### Example: Subscription-based access (Move)​

File not found in manifest: `move/packages/example_app/sources/custom_seal_policy.move`. You probably need to run `pnpm prebuild` and restart the site.

Key design points:

  * No wrapper around `PermissionedGroup` is needed. The custom policy references the group by ID.
  * Identity bytes always use the standard format (`[groupId][keyVersion]`), enforced by `validate_identity()`.
  * This package's ID becomes the Seal encryption namespace (instead of the messaging package).


### Example: Subscription-based access (TypeScript)​
[code] 
    import type { SealPolicy } from '@mysten/sui-stack-messaging';  
    import { Transaction, type TransactionResult } from '@mysten/sui/transactions';  
      
    const CUSTOM_PKG = '0xYOUR_CUSTOM_SEAL_POLICY_PKG';  
      
    interface SubContext {  
      serviceId: string;  
      subscriptionId: string;  
    }  
      
    class SubscriptionSealPolicy implements SealPolicy<SubContext> {  
      readonly packageId = CUSTOM_PKG;  
      
      sealApproveThunk(  
        identityBytes: Uint8Array,  
        groupId: string,  
        encryptionHistoryId: string,  
        context: SubContext,  
      ) {  
        return (tx: Transaction): TransactionResult => {  
          return tx.moveCall({  
            target: `${CUSTOM_PKG}::custom_seal_policy::seal_approve`,  
            typeArguments: ['0x2::sui::SUI'],  
            arguments: [  
              tx.pure.vector('u8', identityBytes),  
              tx.object(context.subscriptionId),  
              tx.object(context.serviceId),  
              tx.object(groupId),  
              tx.object(encryptionHistoryId),  
              tx.object('0x6'), // Clock  
            ],  
          });  
        };  
      }  
    }  
    
[/code]

Wire it up at client creation:
[code] 
    const client = createMessagingGroupsClient<SubContext>(baseClient, {  
      encryption: {  
        sessionKey: { signer: keypair },  
        sealPolicy: new SubscriptionSealPolicy(),  
      },  
      relayer: { relayerUrl: '...' },  
    });  
      
    // TApproveContext flows through to messaging methods  
    await client.messaging.sendMessage({  
      signer: keypair,  
      groupRef: { uuid: 'my-group' },  
      text: 'Hello!',  
      approveContext: { serviceId: '0x...', subscriptionId: '0x...' },  
    });  
    
[/code]

## Token-gated groups (paid join rule)​

This example uses the actor object pattern from `@mysten/sui-groups` to implement payment-gated membership. See the [Sui Groups Extending guide](<https://github.com/MystenLabs/sui-groups>) for the actor pattern fundamentals.

### Move side​

File not found in manifest: `move/packages/example_app/sources/paid_join_rule.move`. You probably need to run `pnpm prebuild` and restart the site.

### Setup flow​
[code] 
    // 1. Create group  
    let (mut group, encryption_history) = messaging::messaging::create_group(...);  
      
    // 2. Create paid join rule (1 SUI fee)  
    let rule = paid_join_rule::new<SUI>(object::id(&group), 1_000_000_000, ctx);  
    let rule_address = object::id(&rule).to_address();  
      
    // 3. Grant the rule actor ExtensionPermissionsAdmin so it can add members  
    group.grant_permission<Messaging, ExtensionPermissionsAdmin>(rule_address, ctx);  
      
    // 4. Grant FundsManager to a treasurer  
    group.grant_permission<Messaging, FundsManager>(treasurer, ctx);  
      
    // 5. Share both objects  
    transfer::share_object(group);  
    transfer::share_object(rule);  
    
[/code]

### TypeScript side​
[code] 
    const tx = new Transaction();  
      
    // Call join with a payment coin  
    tx.moveCall({  
      target: `${EXAMPLE_PKG}::paid_join_rule::join`,  
      typeArguments: ['0x2::sui::SUI'],  
      arguments: [  
        tx.object(ruleId),  
        tx.object(groupId),  
        tx.object(paymentCoinId),  
      ],  
    });  
      
    await keypair.signAndExecuteTransaction({ transaction: tx, client });  
    
[/code]

## Custom RelayerTransport​

Implement `RelayerTransport` to replace the built-in HTTP polling transport with any delivery backend:
[code] 
    interface RelayerTransport {  
      sendMessage(params: SendMessageParams): Promise<SendMessageResult>;  
      fetchMessages(params: FetchMessagesParams): Promise<FetchMessagesResult>;  
      fetchMessage(params: FetchMessageParams): Promise<RelayerMessage>;  
      updateMessage(params: UpdateMessageParams): Promise<void>;  
      deleteMessage(params: DeleteMessageParams): Promise<void>;  
      subscribe(params: SubscribeParams): AsyncIterable<RelayerMessage>;  
      disconnect(): void;  
    }  
    
[/code]

Provide your implementation through config:
[code] 
    const client = createMessagingGroupsClient(baseClient, {  
      encryption: { sessionKey: { signer: keypair } },  
      relayer: { transport: myCustomTransport },  
    });  
    
[/code]

Use cases for custom transports:

  * WebSocket or SSE for lower-latency subscriptions
  * On-chain message storage for applications that prefer full verifiability over cost/speed
  * Custom backend with application-specific routing or filtering logic


See [Relayer](</sui-stack/messaging/relayer>) for the full type definitions of all parameter and result types.

## Custom attachment `StorageAdapter`​

The `StorageAdapter` interface controls where file attachments are stored. This is separate from the relayer's Walrus Sync (which handles message archival) and the walrus-discovery-indexer (which handles message recovery). See [Attachments](</sui-stack/messaging/attachments>) for the full attachment encryption flow.

Implement `StorageAdapter` to replace the built-in Walrus adapter:
[code] 
    interface StorageAdapter {  
      /** Upload one or more entries as a batch. */  
      upload(entries: StorageEntry[]): Promise<StorageUploadResult>;  
      /** Download a single entry by its ID. */  
      download(id: string): Promise<Uint8Array>;  
      /** Optional: delete entries by ID. */  
      delete?(ids: string[]): Promise<void>;  
    }  
    
[/code]

The adapter is encryption-unaware: data arrives already encrypted by the SDK. Provide your implementation through config:
[code] 
    import { WalrusHttpStorageAdapter } from '@mysten/sui-stack-messaging';  
      
    // Built-in Walrus adapter  
    const client = createMessagingGroupsClient(baseClient, {  
      // ...  
      attachments: {  
        storageAdapter: new WalrusHttpStorageAdapter({  
          publisherUrl: 'https://publisher.walrus-testnet.walrus.space',  
          aggregatorUrl: 'https://aggregator.walrus-testnet.walrus.space',  
          epochs: 5,  
        }),  
      },  
    });  
      
    // Or a custom adapter (e.g., IPFS, S3)  
    const client = createMessagingGroupsClient(baseClient, {  
      // ...  
      attachments: {  
        storageAdapter: myIpfsAdapter,  
      },  
    });  
    
[/code]

## Custom RecoveryTransport​

Implement `RecoveryTransport` to enable message recovery from an alternative storage backend (for example, Walrus):
[code] 
    interface RecoveryTransport {  
      recoverMessages(params: RecoverMessagesParams): Promise<FetchMessagesResult>;  
    }  
    
[/code]

When provided, the client exposes a `recoverMessages()` method for fetching messages from the recovery backend. Recovery is read-only and does not require a signer. See [Archive and Recovery](</sui-stack/messaging/archive-recovery>) for the full recovery pipeline.
[code] 
    const client = createMessagingGroupsClient(baseClient, {  
      // ...  
      recovery: myWalrusRecoveryTransport,  
    });  
      
    // Recover messages from Walrus  
    const result = await client.messaging.recoverMessages({  
      groupRef: { uuid: 'my-group' },  
    });  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/sui-stack/messaging/extending.mdx>)

[PreviousGroup Discovery](</sui-stack/messaging/group-discovery>)[NextSDK API reference](</sui-stack/messaging/api-reference>)

  * Custom Seal policy
    * The `SealPolicy` interface
    * Example: Subscription-based access (Move)
    * Example: Subscription-based access (TypeScript)
  * Token-gated groups (paid join rule)
    * Move side
    * Setup flow
    * TypeScript side
  * Custom RelayerTransport
  * Custom attachment `StorageAdapter`
  * Custom RecoveryTransport
