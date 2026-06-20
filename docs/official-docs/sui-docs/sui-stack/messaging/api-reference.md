<!-- Source: https://docs.sui.io/sui-stack/messaging/api-reference -->

* [](</>)
  * [Messaging SDK](</sui-stack/messaging/>)
  * Reference
  * SDK API reference


On this page

# SDK API reference

The Messaging SDK APIs follow the lifecycle of a secure communication system: create groups, manage membership, send messages, and maintain encryption state.

All methods are accessed through the `client.messaging` namespace after [setup](</sui-stack/messaging/setup>).

For permission management (grant, revoke, check membership), use `client.groups`. See the [Sui Groups API Reference](<https://github.com/MystenLabs/sui-groups>).

## Key types​

### `GroupRef`​

Most methods accept a `GroupRef` to identify a group. Either form works:
[code] 
    type GroupRef =  
      | { uuid: string }                                        // derives both IDs  
      | { groupId: string; encryptionHistoryId: string };       // explicit IDs  
    
[/code]

### `DecryptedMessage`​

Returned by `getMessage`, `getMessages`, and `subscribe`:
[code] 
    interface DecryptedMessage {  
      messageId: string;  
      groupId: string;  
      order: number;  
      text: string;                    // empty string for deleted or attachment-only messages  
      senderAddress: string;  
      createdAt: number;               // unix timestamp (seconds)  
      updatedAt: number;  
      isEdited: boolean;  
      isDeleted: boolean;  
      syncStatus?: SyncStatus;         // Walrus sync state (when relayer archives)  
      attachments: AttachmentHandle[]; // lazy-download handles  
      senderVerified: boolean;         // per-message signature verified  
    }  
    
[/code]

### `AttachmentHandle`​

Resolved attachment with lazy download:
[code] 
    interface AttachmentHandle {  
      fileName: string;  
      mimeType: string;  
      fileSize: number;  
      extras?: Record<string, unknown>;  
      wire: Attachment;                // raw wire format (for edits)  
      data(): Promise<Uint8Array>;    // download + decrypt on demand  
    }  
    
[/code]

### `GetMessagesResult`​
[code] 
    interface GetMessagesResult {  
      messages: DecryptedMessage[];  
      hasNext: boolean;  
    }  
    
[/code]

### `EditAttachments`​
[code] 
    interface EditAttachments {  
      current: Attachment[];    // current attachments on the message  
      remove?: string[];        // storageIds to remove  
      new?: AttachmentFile[];   // new files to upload  
    }  
    
[/code]

## Messaging methods​

These methods handle E2EE messaging through the relayer transport. Encryption and decryption are automatic. See [Encryption](</sui-stack/messaging/encryption>) for the underlying encryption model.

### `sendMessage(options)`​

Encrypt and send a message to a group.

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Signs the message and authenticates with the relayer  
`groupRef`| `GroupRef`| Yes| Target group  
`text`| `string`| No*| Message text  
`files`| `AttachmentFile[]`| No*| Files to attach (requires attachments config)  
`sealApproveContext`| `TApproveContext`| Only with custom SealPolicy| Context for custom Seal policies  
  
*At least one of `text` or `files` must be provided.

**Returns:** `{ messageId: string }`
[code] 
    const { messageId } = await client.messaging.sendMessage({  
      signer: keypair,  
      groupRef: { uuid: 'my-group' },  
      text: 'Hello!',  
    });  
    
[/code]

### `getMessage(options)`​

Fetch and decrypt a single message by ID.

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Authenticates with the relayer  
`groupRef`| `GroupRef`| Yes| Target group  
`messageId`| `string`| Yes| Message ID  
  
**Returns:** `DecryptedMessage`
[code] 
    const msg = await client.messaging.getMessage({  
      signer: keypair,  
      groupRef: { uuid: 'my-group' },  
      messageId: 'abc123',  
    });  
    
[/code]

### `getMessages(options)`​

Fetch and decrypt a paginated list of messages.

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Authenticates with the relayer  
`groupRef`| `GroupRef`| Yes| Target group  
`afterOrder`| `number`| No| Fetch messages after this order (exclusive)  
`beforeOrder`| `number`| No| Fetch messages before this order (exclusive)  
`limit`| `number`| No| Max messages to return  
  
**Returns:** `GetMessagesResult`

Messages that fail decryption (for example, key not available) are silently skipped.
[code] 
    const { messages, hasNext } = await client.messaging.getMessages({  
      signer: keypair,  
      groupRef: { uuid: 'my-group' },  
      limit: 50,  
    });  
    
[/code]

### `editMessage(options)`​

Re-encrypt and update an existing message. Only the original sender can edit.

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Must be the original sender  
`groupRef`| `GroupRef`| Yes| Target group  
`messageId`| `string`| Yes| Message to edit  
`text`| `string`| Yes| New message text  
`attachments`| `EditAttachments`| No| Attachment changes (omit to leave unchanged)  
  
**Returns:** `void`
[code] 
    await client.messaging.editMessage({  
      signer: keypair,  
      groupRef: { uuid: 'my-group' },  
      messageId: 'abc123',  
      text: 'Updated text',  
      attachments: {  
        current: originalMsg.attachments.map(a => a.wire),  
        remove: ['old-storage-id'],  
        new: [{ fileName: 'new.txt', mimeType: 'text/plain', data: bytes }],  
      },  
    });  
    
[/code]

### `deleteMessage(options)`​

Soft-delete a message. Only the original sender can delete.

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Must be the original sender  
`groupRef`| `GroupRef`| Yes| Target group  
`messageId`| `string`| Yes| Message to delete  
  
**Returns:** `void`

### `subscribe(options)`​

Subscribe to real-time messages for a group. Returns an `AsyncIterable` that yields decrypted messages as they arrive.

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Authenticates with the relayer  
`groupRef`| `GroupRef`| Yes| Target group  
`afterOrder`| `number`| No| Resume from this order (exclusive)  
`signal`| `AbortSignal`| No| Cancel the subscription  
  
**Returns:** `AsyncIterable<DecryptedMessage>`

Messages that fail decryption are silently skipped.
[code] 
    const controller = new AbortController();  
      
    for await (const msg of client.messaging.subscribe({  
      signer: keypair,  
      groupRef: { uuid: 'my-group' },  
      signal: controller.signal,  
    })) {  
      console.log(msg.text, msg.senderVerified);  
    }  
    
[/code]

### `disconnect()`​

Disconnect the underlying transport. Active subscriptions complete.
[code] 
    client.messaging.disconnect();  
    
[/code]

### `recoverMessages(options)`​

Recover messages from an alternative storage backend (for example, Walrus). Requires a `RecoveryTransport` to be configured at client creation. See [Archive and Recovery](</sui-stack/messaging/archive-recovery>).

Unlike other messaging methods, this does not require a `signer` because recovery is read-only.

Parameter| Type| Required| Description  
---|---|---|---  
`groupRef`| `GroupRef`| Yes| Target group  
`afterOrder`| `number`| No| Fetch messages after this order (exclusive)  
`beforeOrder`| `number`| No| Fetch messages before this order (exclusive)  
`limit`| `number`| No| Max messages to return  
  
**Returns:** `GetMessagesResult`

Messages that fail decryption are silently dropped.
[code] 
    const { messages, hasNext } = await client.messaging.recoverMessages({  
      groupRef: { uuid: 'my-group' },  
      limit: 50,  
    });  
    
[/code]

## Group management methods​

Onchain transactions for group lifecycle. Each method signs and executes a transaction.

### `createAndShareGroup(options)`​

Create a new messaging group and share both objects (PermissionedGroup and EncryptionHistory). The transaction sender becomes the creator with all permissions.

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Transaction sender (becomes group creator)  
`name`| `string`| Yes| Human-readable group name  
`uuid`| `string`| No| UUID for deterministic addressing (generated if omitted)  
`initialMembers`| `string[]`| No| Addresses to grant `MessagingReader` on creation  
  
**Returns:** `{ digest: string; effects: TransactionEffects }`
[code] 
    await client.messaging.createAndShareGroup({  
      signer: keypair,  
      name: 'My Group',  
      initialMembers: ['0xAlice...', '0xBob...'],  
    });  
    
[/code]

### `rotateEncryptionKey(options)`​

Rotate the DEK for a group. Generates a new Seal-encrypted DEK for the next key version. Requires `EncryptionKeyRotator` permission. See [Encryption](</sui-stack/messaging/encryption>) for key versioning details.

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Must have `EncryptionKeyRotator` permission  
`groupRef`| `GroupRef`| Yes| Target group (through uuid or explicit IDs)  
  
**Returns:** `{ digest: string; effects: TransactionEffects }`

### `removeMembersAndRotateKey(options)`​

Atomically remove members and rotate the encryption key in a single PTB. This is the recommended way to remove members. See [Security](</sui-stack/messaging/security>).

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Must have permission to remove members and rotate keys  
`groupRef`| `GroupRef`| Yes| Target group  
`members`| `string[]`| Yes| Addresses to remove  
  
**Returns:** `{ digest: string; effects: TransactionEffects }`
[code] 
    await client.messaging.removeMembersAndRotateKey({  
      signer: keypair,  
      groupRef: { uuid: 'my-group' },  
      members: ['0xAlice...'],  
    });  
    
[/code]

### `leave(options)`​

Remove the transaction sender from a group.

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| The member leaving  
`groupId`| `string`| Yes| PermissionedGroup object ID  
  
**Returns:** `{ digest: string; effects: TransactionEffects }`

`leave()` does not rotate the encryption key. See [Security](</sui-stack/messaging/security>) for implications.

### `archiveGroup(options)`​

Permanently archive a group. Pauses the group and burns the `UnpauseCap`, making it impossible to unpause. Requires `PermissionsAdmin` permission.

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Must have `PermissionsAdmin` permission  
`groupId`| `string`| Yes| PermissionedGroup object ID  
  
**Returns:** `{ digest: string; effects: TransactionEffects }`

## Metadata methods​

Onchain key-value metadata for groups. All require `MetadataAdmin` permission.

### `setGroupName(options)`​

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Must have `MetadataAdmin` permission  
`groupId`| `string`| Yes| PermissionedGroup object ID  
`name`| `string`| Yes| New group name  
  
**Returns:** `{ digest: string; effects: TransactionEffects }`

### `insertGroupData(options)`​

Insert a key-value pair into the group's onchain metadata map.

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Must have `MetadataAdmin` permission  
`groupId`| `string`| Yes| PermissionedGroup object ID  
`key`| `string`| Yes| Metadata key  
`value`| `string`| Yes| Metadata value  
  
**Returns:** `{ digest: string; effects: TransactionEffects }`

### `removeGroupData(options)`​

Remove a key-value pair from the group's metadata map.

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Must have `MetadataAdmin` permission  
`groupId`| `string`| Yes| PermissionedGroup object ID  
`key`| `string`| Yes| Metadata key to remove  
  
**Returns:** `{ digest: string; effects: TransactionEffects }`

## SuiNS methods​

Manage SuiNS reverse lookup for human-readable group names. Require `SuiNsAdmin` permission.

### `setSuinsReverseLookup(options)`​

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Must have `SuiNsAdmin` permission  
`groupId`| `string`| Yes| PermissionedGroup object ID  
`domainName`| `string`| Yes| SuiNS domain name  
  
**Returns:** `{ digest: string; effects: TransactionEffects }`

### `unsetSuinsReverseLookup(options)`​

Parameter| Type| Required| Description  
---|---|---|---  
`signer`| `Signer`| Yes| Must have `SuiNsAdmin` permission  
`groupId`| `string`| Yes| PermissionedGroup object ID  
  
**Returns:** `{ digest: string; effects: TransactionEffects }`

## Verification​

### `verifyMessageSender(params)`​

Verify that a message was signed by the claimed sender. Reconstructs the canonical message, rebuilds the serialized signature, and verifies against the public key.

Parameter| Type| Description  
---|---|---  
`groupId`| `string`| Group ID  
`encryptedText`| `Uint8Array`| Ciphertext  
`nonce`| `Uint8Array`| AES-GCM nonce  
`keyVersion`| `bigint`| Key version  
`senderAddress`| `string`| Claimed sender  
`signature`| `string`| Hex-encoded 64-byte raw signature  
`publicKey`| `string`| Hex-encoded public key with scheme flag prefix  
  
**Returns:** `boolean`

The SDK automatically verifies sender signatures during decryption and populates `DecryptedMessage.senderVerified`. Use this method only if you need to re-verify manually.

## View methods (`client.messaging.view`)​

Read-only queries that fetch onchain state through RPC. No gas required.

### `encryptedKey(options)`​

Fetch the encrypted DEK for a specific key version.

Parameter| Type| Description  
---|---|---  
`encryptionHistoryId` or `uuid`| `string`| EncryptionHistory reference  
`version`| `bigint | number`| Key version (0-indexed)  
  
**Returns:** `Uint8Array`

### `currentEncryptedKey(options)`​

Fetch the encrypted DEK for the latest key version. Always makes at least two RPC calls (one for current size, one for the entry).

Parameter| Type| Description  
---|---|---  
`encryptionHistoryId` or `uuid`| `string`| EncryptionHistory reference  
  
**Returns:** `Uint8Array`

### `getCurrentKeyVersion(options)`​

Return the current (latest) key version number.

Parameter| Type| Description  
---|---|---  
`encryptionHistoryId` or `uuid`| `string`| EncryptionHistory reference  
  
**Returns:** `bigint`

### `groupsMetadata(options)`​

Return multiple groups' onchain metadata (name, uuid, creator, data map). Results are cached; pass `refresh: true` to bypass.

Parameter| Type| Description  
---|---|---  
`groupIds`| `string[]`| PermissionedGroup object IDs  
`refresh`| `boolean`| Bypass cache (optional)  
  
**Returns:** `Record<string, ParsedMetadata>` where each key is a group ID and value is `{ name: string; uuid: string; creator: string; data: Map<string, string> }`

## Derive methods (`client.messaging.derive`)​

Pure, synchronous address derivation. No network calls.

### `groupId({ uuid })`​

Derive the `PermissionedGroup<Messaging>` object ID from a UUID.

**Returns:** `string`

### `encryptionHistoryId({ uuid })`​

Derive the `EncryptionHistory` object ID from a UUID.

**Returns:** `string`

### `resolveGroupRef(ref)`​

Resolve a `GroupRef` to explicit `{ groupId, encryptionHistoryId }`. When a UUID is provided, both IDs are derived. When explicit IDs are provided, they pass through.

**Returns:** `{ groupId: string; encryptionHistoryId: string }`

### `groupLeaverId()`​

Derive the `GroupLeaver` singleton object ID. Used internally by `leave()`.

**Returns:** `string`

### `groupManagerId()`​

Derive the `GroupManager` singleton object ID. Used internally by metadata and SuiNS methods.

**Returns:** `string`

### `systemObjectAddresses()`​

Return the addresses of system-level actor objects (GroupLeaver, GroupManager) that are automatically added to every group. Useful for filtering system entries from member lists in UI:

**Returns:** `Set<string>`
[code] 
    const system = client.messaging.derive.systemObjectAddresses();  
    const humanMembers = allMembers.filter(m => !system.has(m.address));  
    
[/code]

## Transaction builders (`tx.*`)​

Return `Transaction` objects ready for signing. Same parameters as imperative methods (minus `signer`). Use these when you need to inspect or modify the transaction before signing (for example, with dapp-kit's `signAndExecuteTransaction`).
[code] 
    const tx = client.messaging.tx.createAndShareGroup({  
      name: 'My Group',  
      initialMembers: ['0xAlice...'],  
    });  
      
    const result = await keypair.signAndExecuteTransaction({ transaction: tx, client });  
    
[/code]

Available: `createAndShareGroup`, `rotateEncryptionKey`, `removeMembersAndRotateKey`, `archiveGroup`, `leave`, `setGroupName`, `insertGroupData`, `removeGroupData`, `setSuinsReverseLookup`, `unsetSuinsReverseLookup`.

## Call builders (`call.*`)​

Return [transaction thunks](<https://sdk.mystenlabs.com/sui/sdk-building#transaction-thunks>) for composing multiple operations into a single PTB through `tx.add()`.
[code] 
    import { Transaction } from '@mysten/sui/transactions';  
      
    const tx = new Transaction();  
    tx.add(client.messaging.call.createAndShareGroup({ name: 'My Group' }));  
    tx.add(client.groups.call.grantPermission({ groupId, member, permissionType }));  
    await keypair.signAndExecuteTransaction({ transaction: tx, client });  
    
[/code]

Available: same as `tx.*`, plus `createGroup` (returns unshared objects for manual composition with `shareGroup`), and `shareGroup` (shares the objects returned by `createGroup`).

## BCS parsing (`bcs.*`)​

BCS type definitions for parsing onchain data and constructing event type strings for GraphQL queries.

**Messaging types:**

  * `bcs.Messaging` \-- the `Messaging` witness type
  * `bcs.MessagingNamespace` \-- the shared namespace object
  * `bcs.EncryptionHistory` \-- encryption key history
  * `bcs.EncryptionHistoryCreated`, `bcs.EncryptionKeyRotated` \-- encryption events
  * `bcs.EncryptionHistoryTag`, `bcs.PermissionedGroupTag` \-- derivation key types
  * `bcs.Metadata`, `bcs.MetadataKey` \-- group metadata
  * `bcs.GroupManager`, `bcs.GroupLeaver` \-- system actor objects


**Permission types:**

  * `bcs.MessagingSender`, `bcs.MessagingReader`, `bcs.MessagingEditor`, `bcs.MessagingDeleter`
  * `bcs.EncryptionKeyRotator`, `bcs.SuiNsAdmin`, `bcs.MetadataAdmin`


Each BCS type exposes a `.name` property with the fully-qualified Move type name, useful for GraphQL event queries and permission checks.

## Encryption (`encryption.*`)​

Low-level encryption module. Most developers do not need this directly because `sendMessage`, `getMessages`, and `subscribe` handle encryption automatically. See [Encryption](</sui-stack/messaging/encryption>) for the full encryption model.

  * `encrypt(options)` \-- encrypt data with a group's DEK
  * `decrypt(options)` \-- decrypt data with a group's DEK
  * `generateGroupDEK(uuid?)` \-- generate a new Seal-encrypted DEK for group creation
  * `generateRotationDEK(options)` \-- generate a new Seal-encrypted DEK for key rotation
  * `clearCache(groupId?)` \-- clear cached DEKs (all or per-group)


## Transport (`transport`)​

Direct access to the underlying `RelayerTransport` instance. Useful for low-level operations or debugging:
[code] 
    // Direct relayer access (bypasses encryption)  
    const raw = await client.messaging.transport.fetchMessages({ ... });  
    
[/code]

See [Relayer](</sui-stack/messaging/relayer>) for the `RelayerTransport` interface definition.

## Permission types​

The messaging package defines these permission types, accessible through `messagingPermissionTypes(packageId)`:

Permission| Purpose  
---|---  
`MessagingSender`| Send messages  
`MessagingReader`| Decrypt messages (controls DEK access through Seal)  
`MessagingEditor`| Edit own messages  
`MessagingDeleter`| Delete own messages  
`EncryptionKeyRotator`| Rotate the group's DEK  
`SuiNsAdmin`| Manage SuiNS reverse lookup  
`MetadataAdmin`| Manage group metadata  
  
Use `defaultMemberPermissionTypes(packageId)` for the four core messaging permissions (Sender, Reader, Editor, Deleter), the baseline for regular group members.

Grant permissions through the groups extension:
[code] 
    import { messagingPermissionTypes } from '@mysten/sui-stack-messaging';  
      
    const perms = messagingPermissionTypes(MESSAGING_PACKAGE_ID);  
      
    await client.groups.grantPermission({  
      signer: keypair,  
      groupId: '0x...',  
      member: '0xAlice...',  
      permissionType: perms.EncryptionKeyRotator,  
    });  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/sui-stack/messaging/api-reference.mdx>)

[PreviousExtending](</sui-stack/messaging/extending>)[NextTesting](</sui-stack/messaging/testing>)

  * Key types
    * `GroupRef`
    * `DecryptedMessage`
    * `AttachmentHandle`
    * `GetMessagesResult`
    * `EditAttachments`
  * Messaging methods
    * `sendMessage(options)`
    * `getMessage(options)`
    * `getMessages(options)`
    * `editMessage(options)`
    * `deleteMessage(options)`
    * `subscribe(options)`
    * `disconnect()`
    * `recoverMessages(options)`
  * Group management methods
    * `createAndShareGroup(options)`
    * `rotateEncryptionKey(options)`
    * `removeMembersAndRotateKey(options)`
    * `leave(options)`
    * `archiveGroup(options)`
  * Metadata methods
    * `setGroupName(options)`
    * `insertGroupData(options)`
    * `removeGroupData(options)`
  * SuiNS methods
    * `setSuinsReverseLookup(options)`
    * `unsetSuinsReverseLookup(options)`
  * Verification
    * `verifyMessageSender(params)`
  * View methods (`client.messaging.view`)
    * `encryptedKey(options)`
    * `currentEncryptedKey(options)`
    * `getCurrentKeyVersion(options)`
    * `groupsMetadata(options)`
  * Derive methods (`client.messaging.derive`)
    * `groupId({ uuid })`
    * `encryptionHistoryId({ uuid })`
    * `resolveGroupRef(ref)`
    * `groupLeaverId()`
    * `groupManagerId()`
    * `systemObjectAddresses()`
  * Transaction builders (`tx.*`)
  * Call builders (`call.*`)
  * BCS parsing (`bcs.*`)
  * Encryption (`encryption.*`)
  * Transport (`transport`)
  * Permission types
