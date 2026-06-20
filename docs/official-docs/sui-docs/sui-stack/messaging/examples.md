<!-- Source: https://docs.sui.io/sui-stack/messaging/examples -->

* [](</>)
  * [Messaging SDK](</sui-stack/messaging/>)
  * Getting Started
  * Example Patterns


On this page

# Example Patterns

These examples assume a client has been created through `createMessagingGroupsClient()` and a relayer is running. See [Setup](</sui-stack/messaging/setup>) for client configuration and [Relayer](</sui-stack/messaging/relayer>) for running the relayer.

## Create a group and send messages​
[code] 
    import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';  
      
    const keypair = Ed25519Keypair.generate();  
      
    // Create a group with initial members  
    await client.messaging.createAndShareGroup({  
      signer: keypair,  
      name: 'Project Chat',  
      initialMembers: ['0xAlice...', '0xBob...'],  
    });  
      
    // Send a message  
    const { messageId } = await client.messaging.sendMessage({  
      signer: keypair,  
      groupRef: { uuid: 'project-chat-uuid' },  
      text: 'Hello team!',  
    });  
      
    // Fetch recent messages  
    const { messages, hasNext } = await client.messaging.getMessages({  
      signer: keypair,  
      groupRef: { uuid: 'project-chat-uuid' },  
      limit: 50,  
    });  
      
    for (const msg of messages) {  
      console.log(`${msg.senderAddress}: ${msg.text} (verified: ${msg.senderVerified})`);  
    }  
    
[/code]

## Real-time subscription​
[code] 
    const controller = new AbortController();  
      
    for await (const msg of client.messaging.subscribe({  
      signer: keypair,  
      groupRef: { uuid: 'project-chat-uuid' },  
      signal: controller.signal,  
    })) {  
      console.log(`[${msg.senderAddress}] ${msg.text}`);  
      
      if (msg.isEdited) {  
        console.log('(edited)');  
      }  
    }  
      
    // To stop the subscription  
    controller.abort();  
      
    // Disconnect the transport when done (cleans up underlying resources)  
    client.messaging.disconnect();  
    
[/code]

Resume from a known position by passing `afterOrder`:
[code] 
    for await (const msg of client.messaging.subscribe({  
      signer: keypair,  
      groupRef: { uuid: 'project-chat-uuid' },  
      afterOrder: lastSeenOrder,  
      signal: controller.signal,  
    })) {  
      // Only messages after lastSeenOrder  
    }  
    
[/code]

## File attachments​

Requires an `attachments` config with a `StorageAdapter` at client creation. See [Setup](</sui-stack/messaging/setup>). For the full encryption model, see [Attachments](</sui-stack/messaging/attachments>).
[code] 
    // Send a message with files  
    const fileData = new TextEncoder().encode('Report content...');  
      
    await client.messaging.sendMessage({  
      signer: keypair,  
      groupRef: { uuid: 'project-chat-uuid' },  
      text: 'Here is the report',  
      files: [  
        { fileName: 'report.txt', mimeType: 'text/plain', data: fileData },  
      ],  
    });  
      
    // Download attachments from a received message  
    for (const attachment of msg.attachments) {  
      console.log(`${attachment.fileName} (${attachment.fileSize} bytes)`);  
      const bytes = await attachment.data(); // download + decrypt on demand  
    }  
    
[/code]

## Edit and delete messages​
[code] 
    // Edit a message (only the original sender can edit)  
    await client.messaging.editMessage({  
      signer: keypair,  
      groupRef: { uuid: 'project-chat-uuid' },  
      messageId: 'abc123',  
      text: 'Updated text',  
    });  
      
    // Edit with attachment changes  
    await client.messaging.editMessage({  
      signer: keypair,  
      groupRef: { uuid: 'project-chat-uuid' },  
      messageId: 'abc123',  
      text: 'Updated with new attachment',  
      attachments: {  
        current: originalMsg.attachments.map(a => a.wire),  
        remove: ['old-storage-id'],  
        new: [{ fileName: 'new.pdf', mimeType: 'application/pdf', data: pdfBytes }],  
      },  
    });  
      
    // Soft-delete a message (only the original sender can delete)  
    await client.messaging.deleteMessage({  
      signer: keypair,  
      groupRef: { uuid: 'project-chat-uuid' },  
      messageId: 'abc123',  
    });  
    
[/code]

## Member management and key rotation​
[code] 
    import { messagingPermissionTypes } from '@mysten/sui-stack-messaging';  
      
    const perms = messagingPermissionTypes(MESSAGING_PACKAGE_ID);  
      
    // Add a member with specific permissions (via the groups extension)  
    await client.groups.grantPermissions({  
      signer: keypair,  
      groupId: '0x...',  
      member: '0xNewMember...',  
      permissionTypes: [perms.MessagingSender, perms.MessagingReader],  
    });  
      
    // Remove a member and rotate the encryption key atomically  
    await client.messaging.removeMembersAndRotateKey({  
      signer: keypair,  
      groupRef: { uuid: 'project-chat-uuid' },  
      members: ['0xFormerMember...'],  
    });  
      
    // Rotate the key without removing anyone (periodic rotation)  
    await client.messaging.rotateEncryptionKey({  
      signer: keypair,  
      groupRef: { uuid: 'project-chat-uuid' },  
    });  
    
[/code]

See [Security](</sui-stack/messaging/security>) for why `removeMembersAndRotateKey()` is recommended over standalone member removal.

## Using `tx.*` with dApp Kit​

When integrating with `@mysten/dapp-kit`, use `tx.*` methods to get a `Transaction` object for the wallet to sign:
[code] 
    // In a React component using dapp-kit  
    const { mutate: signAndExecute } = useSignAndExecuteTransaction();  
      
    const handleCreateGroup = () => {  
      const uuid = crypto.randomUUID();  
      
      const tx = client.messaging.tx.createAndShareGroup({  
        name: groupName,  
        uuid,  
        initialMembers: selectedMembers,  
      });  
      
      signAndExecute({ transaction: tx });  
    };  
      
    const handleRotateKey = () => {  
      const tx = client.messaging.tx.rotateEncryptionKey({  
        uuid: groupUuid,  
      });  
      
      signAndExecute({ transaction: tx });  
    };  
      
    const handleRemoveMember = (memberAddress: string) => {  
      const tx = client.messaging.tx.removeMembersAndRotateKey({  
        uuid: groupUuid,  
        members: [memberAddress],  
      });  
      
      signAndExecute({ transaction: tx });  
    };  
    
[/code]

## Composing with `call.*` thunks​

Use `call.*` with `tx.add()` to compose operations into a single PTB. This follows the [MystenLabs SDK transaction thunks pattern](<https://sdk.mystenlabs.com/sui/sdk-building#transaction-thunks>).
[code] 
    import { Transaction } from '@mysten/sui/transactions';  
      
    const tx = new Transaction();  
      
    // Create an unshared group (returns TransactionArguments for the objects)  
    const [group, encryptionHistory] = tx.add(  
      client.messaging.call.createGroup({ name: 'Team Chat' }),  
    );  
      
    // Share both objects  
    tx.add(client.messaging.call.shareGroup({ group, encryptionHistory }));  
      
    await keypair.signAndExecuteTransaction({ transaction: tx, client });  
    
[/code]

For granting extra permissions beyond the initial members, use a separate transaction after the group is created, or pass all initial members through the `initialMembers` parameter.

## Filtering system objects from member lists​

Groups contain system actor objects (GroupLeaver, GroupManager) as members. Filter them for user-facing displays:
[code] 
    const { members } = await client.groups.view.getMembers({  
      groupId: '0x...',  
      exhaustive: true,  
    });  
      
    const systemAddresses = client.messaging.derive.systemObjectAddresses();  
    const humanMembers = members.filter(m => !systemAddresses.has(m.address));  
    
[/code]

## Archive a group​

Permanently freeze a group by pausing it and burning the `UnpauseCap`:
[code] 
    await client.messaging.archiveGroup({  
      signer: keypair,  
      groupId: '0x...',  
    });  
      
    // The group is now permanently paused. No further mutations are possible.  
    // Existing messages remain readable by members.  
    
[/code]

## Recover messages from Walrus​

Requires a `RecoveryTransport` configured at client creation. See [Archive and Recovery](</sui-stack/messaging/archive-recovery>).
[code] 
    const { messages, hasNext } = await client.messaging.recoverMessages({  
      groupRef: { uuid: 'project-chat-uuid' },  
      limit: 100,  
    });  
      
    for (const msg of messages) {  
      // Recovered messages are decrypted and verified like real-time messages  
      console.log(`${msg.text} (verified: ${msg.senderVerified})`);  
    }  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/sui-stack/messaging/examples.mdx>)

[PreviousDeveloper Setup](</sui-stack/messaging/setup>)[NextEncryption](</sui-stack/messaging/encryption>)

  * Create a group and send messages
  * Real-time subscription
  * File attachments
  * Edit and delete messages
  * Member management and key rotation
  * Using `tx.*` with dApp Kit
  * Composing with `call.*` thunks
  * Filtering system objects from member lists
  * Archive a group
  * Recover messages from Walrus
