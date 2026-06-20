<!-- Source: https://docs.sui.io/develop/transactions/transaction-auth/intent-signing -->

* [](</>)
  * [Building Transactions](</develop/transactions/>)
  * [Transaction Authentication](</develop/transactions/transaction-auth/>)
  * Intent Signing


On this page

# Intent Signing

An intent is a compact struct that serves as the domain separator for a message that a signature commits to. The data that the signature commits to is an intent message. All signatures in Sui must commit to an intent message rather than the message itself.

The intent signing standard provides a compact domain separator to the data being signed for both user signatures and authority signatures. It has several benefits:

  * The intent scope is replaced by a `u8` representation instead of a Rust struct tag name string.

  * In addition to the intent scope, you can commit other important domain separators as well (such as intent version and app ID).

  * The data itself no longer needs to implement the `Signable` trait, it just needs to implement `Serialize`.

  * All signatures can adopt the same intent message structure, including both user signatures (only to commit to `TransactionData`) and authority signature (commits to all internal intent scopes such as `TransactionEffects`, `ProofOfPossession`, and `SenderSignedTransaction`).


## Structs​

The `IntentMessage` struct consists of the intent and the serialized data value.
[code] 
    pub struct IntentMessage<T> {  
      pub intent: Intent,  
      pub value: T,  
    }  
    
[/code]

To create an intent struct, include the `IntentScope` (type of message), `IntentVersion` (version the network supports), and `AppId` (application the signature refers to).
[code] 
    pub struct Intent {  
      scope: IntentScope,  
      version: IntentVersion,  
      app_id: AppId,  
    }  
    
[/code]

For detailed field definitions, see the enum definitions in the source code:

[crates/shared-crypto/src/intent.rs](<https://github.com/MystenLabs/sui/blob/main/crates/shared-crypto/src/intent.rs>)
[code]
    pub enum IntentScope {  
        TransactionData = 0,         // Used for a user signature on a transaction data.  
        TransactionEffects = 1,      // Used for an authority signature on transaction effects.  
        CheckpointSummary = 2,       // Used for an authority signature on a checkpoint summary.  
        PersonalMessage = 3,         // Used for a user signature on a personal message.  
        SenderSignedTransaction = 4, // Used for an authority signature on a user signed transaction.  
        ProofOfPossession = 5, // Used as a signature representing an authority's proof of possession of its authority protocol key.  
        HeaderDigest = 6,      // Used for narwhal authority signature on header digest.  
        BridgeEventUnused = 7, // for bridge purposes but it's currently not included in messages.  
        ConsensusBlock = 8,    // Used for consensus authority signature on block's digest.  
        DiscoveryPeers = 9,    // Used for reporting peer addresses in discovery.  
    }  
    pub enum IntentVersion {  
        V0 = 0,  
    }  
    pub enum AppId {  
        #[default]  
        Sui = 0,  
        Narwhal = 1,  
        Consensus = 2,  
    }  
    pub enum HashingIntentScope {  
        ChildObjectId = 0xf0,  
        RegularObjectId = 0xf1,  
    }  
    
[/code]

The serialization of an `Intent` is a 3-byte array where each field is represented by a byte.

The serialization of an `IntentMessage<T>` is the 3 bytes of the intent concatenated with the BCS serialized message.

## User signature​

To create a user signature, construct an intent message first, then create the signature over the 32-byte Blake2b hash of the BCS serialized value of the intent message of the transaction data (`intent || message`).

The following examples demonstrate this:

  * Rust
  * TypeScript


[code]
    let intent = Intent::default();  
    let intent_msg = IntentMessage::new(intent, data);  
    let signature = Signature::new_secure(&intent_msg, signer);  
    
[/code]
[code]
    const intentMessage = messageWithIntent('TransactionData', transactionBytes);  
    const signature = await this.sign(intentMessage);  
    
[/code]

Under the hood, the `new_secure` method in Rust and the `signData` method in TypeScript do the following:

  1. Serialize the intent message as the 3-byte intent concatenated with the BCS serialized bytes of the transaction data.

  2. Apply Blake2b hash to get the 32-byte digest.

  3. Pass the digest to the signing API for each corresponding scheme of the signer. The supported signature schemes are pure Ed25519, ECDSA Secp256k1, and ECDSA Secp256r1. See [Sui Signatures](</develop/transactions/transaction-auth/auth-overview#signature-requirements>) for requirements of each scheme.


## Authority signature​

The authority signature is created using the protocol key. The data that it commits to is also an intent message `intent || message`. See all available intent scopes [in the source code](<https://github.com/MystenLabs/sui/blob/0dc1a38f800fc2d8fabe11477fdef702058cf00d/crates/sui-types/src/intent.rs#L66>).

### Generating proof of possession for an authority​

When an authority requests to join the network, the protocol public key and its proof of possession (PoP) are required. PoP is required to prevent [rogue key attack](<https://crypto.stanford.edu/~dabo/pubs/papers/BLSmultisig>).

The proof of possession is a BLS signature created using the authority protocol private key, committed over the following message: `intent || pubkey || address || epoch`. The values are as follows:

  * `intent`: Serialized to `[5, 0, 0]` representing an intent with scope as `Proof of Possession`, `version` as `V0`, and `app_id` as `Sui`.

  * `pubkey`: The serialized public key bytes of the authority BLS protocol key.

  * `address`: The account address associated with the authority account key.

  * `epoch`: Serialized to `[0, 0, 0, 0, 0, 0, 0, 0]`.


To generate a proof of possession in Rust, see the implementation at `fn generate_proof_of_possession`. For test vectors, see `fn test_proof_of_possession`.

## Verifying signatures in Move​

You can verify a personal-message signature onchain using the `sui::ed25519` or `sui::ecdsa_k1` module:
[code] 
    use sui::ed25519;  
      
    public fun verify_personal_message(  
        signature: vector<u8>,  
        public_key: vector<u8>,  
        message: vector<u8>,  
    ) {  
        // The client signs: Blake2b-256(BCS(IntentMessage { intent: Intent::personal_message(), value: PersonalMessage { message } }))  
        // The intent prefix for PersonalMessage is [3, 0, 0]  
        assert!(  
            ed25519::ed25519_verify(&signature, &public_key, &message),  
            0  
        );  
    }  
    
[/code]

On the client side (TypeScript), produce the signature:
[code] 
    const { signature } = await wallet.signPersonalMessage({  
      message: new TextEncoder().encode('Hello from Sui'),  
    });  
    
[/code]

info

This page covers Sui transaction intent signing (the cryptographic envelope format). For cross-chain bridge integrations, see the [Wormhole](<https://wormhole.com/docs/>) or [Axelar](<https://docs.axelar.dev/>) documentation.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/transactions/transaction-auth/intent-signing.mdx>)

[PreviousMultisig Authentication](</develop/transactions/transaction-auth/multisig>)[NextOffline Signing](</develop/transactions/transaction-auth/offline-signing>)

  * Structs
  * User signature
  * Authority signature
    * Generating proof of possession for an authority
  * Verifying signatures in Move
