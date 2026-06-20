<!-- Source: https://docs.sui.io/sui-stack/messaging/setup -->

* [](</>)
  * [Messaging SDK](</sui-stack/messaging/>)
  * Getting Started
  * Developer Setup


On this page

# Developer Setup

This SDK follows the [MystenLabs TS SDK building guidelines](<https://sdk.mystenlabs.com/sui/sdk-building>). It uses the client extension pattern: you extend a base Sui client with messaging, groups, and Seal extensions.

## Architecture at a glance​

The SDK is one client in a system that talks to four independent services. Encryption is end-to-end, so none of them see plaintext.

Service| What it does| Who runs it  
---|---|---  
Sui RPC (fullnode / gRPC)| Chain reads and transaction submission| Public endpoint or your own  
Relayer| Accepts ciphertext, indexes membership, serves messages back| You run it. No public canonical relayer exists, so fork the reference at [`relayer/`](<https://github.com/MystenLabs/sui-stack-messaging/tree/main/relayer/>). See [Relayer](</sui-stack/messaging/relayer>).  
Seal key servers| Threshold-encrypt and decrypt DEKs| Mysten Labs operates the canonical allowlist; you reference their objectIds in `seal.serverConfigs`. See [Seal docs](<https://github.com/MystenLabs/seal>).  
Walrus publisher and aggregator (optional, attachments only)| Stores encrypted file bytes| Public Testnet endpoints, your own, or skip them entirely and talk to Walrus through the [`@mysten/walrus`](<https://www.npmjs.com/package/@mysten/walrus>) SDK (see [Extending](</sui-stack/messaging/extending>)).  
  
## Prerequisites​

Before writing SDK code, confirm:

  * A running relayer reachable from your app. For development, see [`relayer/README.md`](<https://github.com/MystenLabs/sui-stack-messaging>); for production, fork the reference and operate your own.
  * Seal `serverConfigs`, the canonical key-server object IDs for your network. See [Seal docs](<https://github.com/MystenLabs/seal>) for the current allowlist.
  * A Sui RPC URL for the right network (Testnet, Mainnet, or Localnet).
  * (Optional) A Walrus publisher and aggregator if you need attachments, or commit to the `@mysten/walrus` SDK path (see [Attachments](</sui-stack/messaging/attachments>), [Extending](</sui-stack/messaging/extending>)).


## Quick setup with `createSuiStackMessagingClient()`​

This factory function composes all three extensions for you:
[code] 
    import { SuiGrpcClient } from '@mysten/sui/grpc';  
    import { createSuiStackMessagingClient } from '@mysten/sui-stack-messaging';  
      
    const client = createSuiStackMessagingClient(  
      new SuiGrpcClient({  
        baseUrl: 'https://fullnode.testnet.sui.io:443',  
        network: 'testnet',  
      }),  
      {  
        seal: {  
          serverConfigs: [  
            { objectId: '0x...', weight: 1 },  
            { objectId: '0x...', weight: 1 },  
          ],  
        },  
        encryption: {  
          sessionKey: { signer: keypair },  
        },  
        relayer: {  
          relayerUrl: 'https://your-relayer.example.com',  
        },  
      },  
    );  
    
[/code]

After creation, the client exposes four namespaces:

Namespace| Purpose  
---|---  
`client.messaging`| E2EE messaging, group creation, key rotation  
`client.groups`| Permission management ([Sui Groups docs](<https://github.com/MystenLabs/sui-groups>))  
`client.seal`| Seal encryption/decryption (used by `messaging`)  
`client.core`| Base Sui RPC methods  
  
## Manual extension chain (advanced)​

For custom extension names or full control, use `$extend()` directly:
[code] 
    import { SuiGrpcClient } from '@mysten/sui/grpc';  
    import { SealClient } from '@mysten/seal';  
    import { suiGroups } from '@mysten/sui-groups';  
    import { suiStackMessaging } from '@mysten/sui-stack-messaging';  
      
    const base = new SuiGrpcClient({  
      baseUrl: 'https://fullnode.testnet.sui.io:443',  
      network: 'testnet',  
    });  
      
    // Step 1: extend with groups + seal (independent of each other)  
    const withGroupsAndSeal = base.$extend(  
      suiGroups({  
        witnessType: `${MESSAGING_PACKAGE_ID}::messaging::Messaging`,  
      }),  
      {  
        name: 'seal' as const,  
        register: (c) =>  
          new SealClient({  
            suiClient: c,  
            serverConfigs: [  
              { objectId: '0x...', weight: 1 },  
              { objectId: '0x...', weight: 1 },  
            ],  
          }),  
      },  
    );  
      
    // Step 2: extend with messaging (depends on both groups and seal)  
    const client = withGroupsAndSeal.$extend(  
      suiStackMessaging({  
        encryption: { sessionKey: { signer: keypair } },  
        relayer: { relayerUrl: 'https://your-relayer.example.com' },  
      }),  
    );  
    
[/code]

## Configuration reference​

### `encryption` (required)​

Controls how the SDK obtains Seal session keys and encrypts/decrypts messages.

#### Session key tiers​

##### Tier 1: Signer-based (recommended)​

Works with `@mysten/dapp-kit`'s `CurrentAccountSigner`, a `Keypair`, or Enoki.
[code] 
    encryption: {  
      sessionKey: { signer: keypair },  
    }  
    
[/code]

The SDK derives the address through `signer.toSuiAddress()`, creates a `SessionKey`, and handles certification automatically.

##### Tier 2: Callback-based (when you only have a `signPersonalMessage` surface, not a full `Signer`):​
[code] 
    encryption: {  
      sessionKey: {  
        address: '0x...',  
        onSign: async (message: Uint8Array) => {  
          // Sign with your wallet adapter and return the signature string  
          return signPersonalMessage(message);  
        },  
      },  
    }  
    
[/code]

The SDK creates the session key, then calls `onSign()` with the personal-message bytes.

##### Tier 3: Consumer-managed (full control over the `SessionKey` lifecycle):​
[code] 
    encryption: {  
      sessionKey: {  
        getSessionKey: () => myManagedSessionKey,  
      },  
    }  
    
[/code]

#### Session key options (Tier 1 and 2)​

Option| Default| Description  
---|---|---  
`ttlMin`| 10| Session-key TTL in minutes; also sets the DEK cache TTL  
`refreshBufferMs`| 60000| Refresh this many ms before expiry  
`mvrName`| (none)| MVR name for Seal package resolution  
  
Tier 3's variant excludes these options; its DEK cache falls back to the 10-minute default regardless of your `SessionKey`'s own TTL.

#### Encryption options​

Option| Default| Description  
---|---|---  
`sealThreshold`| 2| Number of key servers needed for decryption  
`cryptoPrimitives`| Web Crypto| Custom AES-GCM implementation  
`sealPolicy`| `DefaultSealPolicy`| Custom Seal access control policy (see [Extending](</sui-stack/messaging/extending>))  
  
### `relayer` (required)​

The relayer must be running and reachable before any message operation succeeds. `sendMessage`, `getMessages`, `subscribe`, and friends all go through it. No public canonical relayer exists, so see [`relayer/README.md`](<https://github.com/MystenLabs/sui-stack-messaging>) to spin up the reference for development, or fork it for production.

Either provide a URL for the built-in HTTP transport, or supply a custom transport instance:
[code] 
    // Built-in HTTP transport  
    relayer: {  
      relayerUrl: 'https://your-relayer.example.com',  
      pollingIntervalMs: 3000,  // default  
      timeout: 30_000,          // default (ms)  
      onError: (err) => console.error(err),  
    }  
      
    // Custom transport  
    relayer: {  
      transport: myCustomTransport,  // implements RelayerTransport  
    }  
    
[/code]

See [Relayer](</sui-stack/messaging/relayer>) for the wire protocol and `RelayerTransport` interface.

### `attachments` (optional)​

Enable file attachment support by providing a storage adapter:
[code] 
    import { WalrusHttpStorageAdapter } from '@mysten/sui-stack-messaging';  
      
    attachments: {  
      storageAdapter: new WalrusHttpStorageAdapter({  
        publisherUrl: 'https://publisher.walrus-testnet.walrus.space',  
        aggregatorUrl: 'https://aggregator.walrus-testnet.walrus.space',  
        epochs: 5,  
      }),  
      maxAttachments: 10,                // default  
      maxFileSizeBytes: 10_485_760,      // 10 MB default  
      maxTotalFileSizeBytes: 52_428_800, // 50 MB default  
    }  
    
[/code]

When omitted, `sendMessage` cannot include files and received attachment metadata is not resolvable. See [Attachments](</sui-stack/messaging/attachments>), and [Extending](</sui-stack/messaging/extending>) for non-HTTP and `@mysten/walrus`-SDK adapters.

### `packageConfig` (optional)​

Auto-detected for Testnet and Mainnet. Required for Localnet or custom deployments. The shape differs between the factory and the manual chain.

Factory (`createSuiStackMessagingClient`):
[code] 
    packageConfig: {  
      messaging: {  
        originalPackageId: '0x...',  // First published: type names, BCS, Seal namespace  
        latestPackageId: '0x...',    // Current: moveCall targets  
        namespaceId: '0x...',        // MessagingNamespace shared object  
        versionId: '0x...',          // Version shared object  
      },  
      permissionedGroups: {          // optional, also auto-detected  
        originalPackageId: '0x...',  
        latestPackageId: '0x...',  
      },  
    }  
    
[/code]

Manual (`suiStackMessaging({...})`): a flat `SuiStackMessagingPackageConfig`, just the four messaging fields above. The `permissionedGroups` config is passed separately into `suiGroups({ packageConfig })` within the same `$extend` call.

### `suinsConfig` (optional)​

Auto-detected for Testnet and Mainnet. Only needed for SuiNS reverse lookup operations (`setSuinsReverseLookup`, `unsetSuinsReverseLookup`).

### `seal` (factory only)​

When using `createSuiStackMessagingClient`, pass either a pre-built `SealClient` or Seal config options:
[code] 
    // Config options (SealClient created internally)  
    seal: {  
      serverConfigs: [  
        { objectId: '0x...', weight: 1 },  
        { objectId: '0x...', weight: 1 },  
      ],  
    }  
      
    // Pre-built SealClient  
    seal: existingSealClient,  
    
[/code]

In the manual chain you construct the `SealClient` directly inside the `$extend` `register` callback (see the example above).

## Sub-modules​

The `client.messaging` object exposes several sub-modules:

Sub-module| Purpose| Example  
---|---|---  
`call`| PTB thunks: composable transaction steps| `tx.add(client.messaging.call.createAndShareGroup(opts))`  
`tx`| Full transactions: ready to sign| `client.messaging.tx.createAndShareGroup(opts)`  
`view`| Read-only queries (no gas)| `client.messaging.view.groupsMetadata(opts)`  
`bcs`| BCS type definitions for parsing| `client.messaging.bcs.EncryptionHistory`  
`derive`| Deterministic address derivation| `client.messaging.derive.groupId({ uuid })`  
`encryption`| Low-level encrypt/decrypt| `client.messaging.encryption.encrypt(opts)`  
`transport`| Direct relayer access| `client.messaging.transport.fetchMessages(opts)`  
  
### When to use which​

  * Top-level imperative methods (for example, `client.messaging.sendMessage()`): simplest path, sign, encrypt, and send in one call.
  * `tx.*`: when you need a `Transaction` object to inspect or modify before signing (for example, with dapp-kit's `signAndExecuteTransaction`).
  * `call.*`: when composing multiple operations into a single PTB.
  * `view.*`: for read-only queries that don't require a signer.


## The `GroupRef` pattern​

Most messaging methods accept a `GroupRef`, either a UUID or explicit object IDs:
[code] 
    // By UUID (simpler: derives both IDs internally)  
    await client.messaging.sendMessage({  
      signer: keypair,  
      groupRef: { uuid: 'my-group-uuid' },  
      text: 'Hello!',  
    });  
      
    // By explicit IDs  
    await client.messaging.sendMessage({  
      signer: keypair,  
      groupRef: {  
        groupId: '0x...',  
        encryptionHistoryId: '0x...',  
      },  
      text: 'Hello!',  
    });  
    
[/code]

Using UUIDs is recommended. See [Group Discovery](</sui-stack/messaging/group-discovery>) for details on UUID derivation and tracking.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/sui-stack/messaging/setup.mdx>)

[PreviousInstallation](</sui-stack/messaging/installation>)[NextExample Patterns](</sui-stack/messaging/examples>)

  * Architecture at a glance
  * Prerequisites
  * Quick setup with `createSuiStackMessagingClient()`
  * Manual extension chain (advanced)
  * Configuration reference
    * `encryption` (required)
    * `relayer` (required)
    * `attachments` (optional)
    * `packageConfig` (optional)
    * `suinsConfig` (optional)
    * `seal` (factory only)
  * Sub-modules
    * When to use which
  * The `GroupRef` pattern
