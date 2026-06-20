<!-- Source: https://docs.sui.io/onchain-finance/payment-kit -->

* [](</>)
  * Payment Kit


On this page

# Payment Kit Standard

The Sui Payment Kit is a framework for secure, flexible payment processing on Sui. It provides persistent and ephemeral payment options, event-driven architecture, and built-in duplicate prevention.

The Payment Kit standardizes payment processing on Sui, enabling developers to build robust payment flows without reimplementing common payment verification and receipt management logic. Applications using the Payment Kit benefit from battle-tested security patterns and consistent payment handling across the ecosystem.

## Key features​

The Payment Kit provides the following core capabilities:

  * **Secure payment processing** : Validates payment amounts and transfers coins safely.
  * **Payment registries** : Optional persistent storage for payment receipts with duplicate detection.
  * **Flexible receipt management** : Generates receipts for payment tracking and verification.
  * **Event-driven architecture** : Emits events for offchain tracking and integration.
  * **Multi-coin support** : Works with any Sui coin type.
  * **Transaction URIs**: Standardized URI format to create encoded links for user-friendly payment flows.


## Architecture components​

The Payment Kit consists of the following main components:

### Payment processing core​

Handles coin transfers, payment validation, and receipt generation. The core validates that:

  * Payment amounts match expected values
  * Coins have sufficient balance
  * Transfers complete successfully
  * Receipts contain accurate payment information


### Registry system​

Optional persistent storage that tracks payment history and prevents duplicate payments. Registries provide:

  * Payment record storage with composite keys
  * Configurable expiration policies for payment records
  * Withdrawal capabilities for accumulated funds
  * Administrative controls through capabilities


## Core concepts​

### Payment modes​

The Payment Kit supports two payment processing modes:

**1\. Registry payments** : Process payments through a `PaymentRegistry` with duplicate prevention and persistent receipts. Use this mode when:

  * You need to prevent duplicate payments
  * Payment history must be tracked
  * Compliance or auditing requires payment records
  * Funds should accumulate in a managed registry


**2\. Ephemeral payments** : Process one-time payments without persistent storage. Use this mode when:

  * Duplicate prevention is not enforced


### Duplicate prevention​

Duplicate prevention is enforced when processing payments through a `PaymentRegistry`. The system uses a composite `PaymentKey` derived from:

  * **Nonce** : Unique identifier for each payment `(UUIDv4)`.
  * **Amount** : Payment value in coin units.
  * **Coin type** : The specific coin type.
  * **Receiver address**: Destination address for the payment.


This composite key ensures that the same payment cannot be processed twice, even if individual components (like amount or receiver) are reused across different payments.

### Payment receipts​

Every processed payment generates a `PaymentReceipt` object containing:

  * Payment nonce for reference
  * Amount paid
  * Coin type used
  * Receiver address
  * Timestamp of payment
  * Registry information (for registry payments; not applicable to ephemeral payments)


Receipts serve as proof of payment and can be used for offchain verification, accounting, or integration with other systems.

### Payment records​

When payments are processed through a `PaymentRegistry`, the system creates and stores `PaymentRecord` objects internally to track payment history and enable duplicate prevention.

Payment records differ from payment receipts in key ways:

**PaymentRecords vs PaymentReceipts:**

  * **`PaymentRecords`** : Internal registry storage structures that persist payment metadata for duplicate detection. These are stored within the registry's internal tables and are not directly accessible as objects.
  * **`PaymentReceipts`** : User-facing objects returned after payment processing that serve as proof of payment. These can be stored, transferred, or used for offchain verification.


**`PaymentRecord` lifecycle:**

  1. **Creation** : When `process_registry_payment` is called, a `PaymentRecord` is created and stored in the registry using the composite `PaymentKey`.
  2. **Storage** : Records persist in the registry's internal table, indexed by their unique payment key.
  3. **Expiration** : Records become eligible for deletion after the registry's configured `epoch_expiration_duration` has passed.
  4. **Deletion** : Expired records can be removed using `delete_payment_record` to reclaim storage and reduce gas costs.


**`PaymentRecord` expiration:**

A `PaymentRecord` includes an expiration epoch calculated at the time of payment creation. This expiration mechanism:

  * Prevents indefinite storage growth in registries
  * Allows for eventual cleanup of historical payment data
  * Balances duplicate prevention needs with storage efficiency
  * Can be configured per-registry through `set_config_epoch_expiration_duration`


A `PaymentRecord` cannot be deleted before its expiration epoch, ensuring a minimum retention period for duplicate detection. After expiration, administrators or users can delete records to free storage, though deletion is optional.

## Working with payment registries​

### Creating a registry​

To create a new payment registry, you need to provide a `name`, which is an ASCII-based string used to derive an address for the registry. In addition to a `name`, you must also provide the package `Namespace` object. `Namespace` provides a higher-order organizational structure for managing multiple payment registries.
[code] 
    module sui::payment_kit;  
      
    public fun create_registry(  
        namespace: &mut Namespace,  
        name: String,  
        ctx: &mut TxContext  
    )  
    
[/code]

This function creates a `PaymentRegistry` and a `RegistryAdminCap` for administrative control. The `RegistryAdminCap` is initially owned by the creator and can be shared or transferred as needed.

#### Namespace objects​
[code] 
    mainnet: 0xccd3e4c7802921991cd9ce488c4ca0b51334ba75483702744242284ccf3ae7c2  
    
[/code]
[code] 
    testnet: 0xa5016862fdccba7cc576b56cc5a391eda6775200aaa03a6b3c97d512312878db  
    
[/code]

### Processing registry payments​

Process payments through a registry with duplicate prevention:
[code] 
    module sui::payment_kit;  
      
    public fun process_registry_payment<T>(  
        registry: &mut PaymentRegistry,  
        nonce: String,  
        payment_amount: u64,  
        coin: Coin<T>,  
        receiver: Option<address>,  
        clock: &Clock,  
        ctx: &mut TxContext  
    )  
    
[/code]

**Parameters:**

  * `registry`: Mutable reference to the payment registry.
  * `nonce`: Unique payment identifier (prevents duplicates).
  * `payment_amount`: Expected payment amount in coin units.
  * `coin`: Payment coin object.
  * `receiver`: Optional receiver address (if `None`, funds stay in registry).
  * `clock`: Sui clock object for timestamping.
  * `ctx`: Transaction context.


The function:

  1. Verifies the payment amount matches the coin value
  2. Checks for duplicate payments using the composite key
  3. Records the payment in the registry
  4. Transfers funds to `receiver` or the registry (based on configuration)
  5. Generates and returns a `PaymentReceipt`
  6. Emits a payment event


**Error conditions:**

  * `EDuplicatePayment`: Payment with same composite key already exists.
  * `EPaymentAmountMismatch`: Coin value doesn't match expected amount.


### Managing payment records​

Delete an expired `PaymentRecord` to free up storage:
[code] 
    module sui::payment_kit;  
      
    public fun delete_payment_record<T>(  
        registry: &mut PaymentRegistry,  
        payment_key: PaymentKey<T>,  
        ctx: &mut TxContext  
    )  
    
[/code]

Records can only be deleted after they expire based on the registry's configured expiration duration. Create a `PaymentKey` using the `create_payment_key` function with the original payment parameters.

### Configuring registries​

Registry administrators can update configuration settings using the `RegistryAdminCap`:

**Set expiration duration:**
[code] 
    module sui::payment_kit;  
      
    public fun set_config_epoch_expiration_duration(  
        registry: &mut PaymentRegistry,  
        cap: &RegistryAdminCap,  
        epoch_expiration_duration: u64,  
        ctx: &mut TxContext  
    )  
    
[/code]

**Set`PaymentRegistry` to receive funds:**
[code] 
    module sui::payment_kit;  
      
    public fun set_config_registry_managed_funds(  
        registry: &mut PaymentRegistry,  
        cap: &RegistryAdminCap,  
        registry_managed_funds: bool,  
        ctx: &mut TxContext  
    )  
    
[/code]

When `registry_managed_funds` is `true`, payments accumulate in the registry for later withdrawal. When `false`, payments transfer immediately to receivers.

### Withdrawing from a registry​

If a `PaymentRegistry` is set to manage funds, an administrator can withdraw accumulated funds:
[code] 
    module sui::payment_kit;  
      
    public fun withdraw_from_registry<T>(  
        registry: &mut PaymentRegistry,  
        cap: &RegistryAdminCap,  
        ctx: &mut TxContext  
    )  
    
[/code]

This function requires the `RegistryAdminCap` and returns all accumulated coins of type `T` from the registry. Only use this when the registry is configured to retain funds (controlled by the `registry_managed_funds` configuration setting).

## Processing ephemeral payments​

For scenarios that don't require duplicate prevention or persistent records, use ephemeral payments:
[code] 
    module sui::payment_kit;  
      
    public fun process_ephemeral_payment<T>(  
        nonce: String,  
        payment_amount: u64,  
        coin: Coin<T>,  
        receiver: address,  
        clock: &Clock,  
        ctx: &mut TxContext  
    )  
    
[/code]

Ephemeral payments:

  * Do not check for duplicates
  * Do not store payment records onchain
  * Transfer funds immediately to the receiver
  * Generate receipts for the transaction
  * Emit payment events for offchain tracking
  * Have lower gas costs than registry payments


This mode is ideal for:

  * Duplicate prevention is not required
  * Applications with external payment tracking systems


## Transaction URIs​

The Payment Kit defines a standard URI format for encoding payment requests. Transaction URIs allow applications to generate payment links that wallets and other clients can parse and execute.

### URI format​

Payment Kit Transaction URIs use the following format:
[code] 
    sui:pay?receiver=<receiverAddress>  
        &amount=<amount>  
        &coinType=<coinType>  
        &nonce=<nonce>  
        &label=<label>  
        &iconUrl=<iconUrl>  
        &message=<message>  
        &registry=<registry>  
    
[/code]

### URI parameters​

#### `receiver`​

The destination address to receive the payment funds. Must be a valid Sui address.

#### `amount`​

The `amount` field is a required query parameter. The value must be a positive `u64`. This field represents the native amount of a specified coin type (for example, 100000000 MISTS represents 0.1 SUI).

#### `nonce`​

The `nonce` field is a required query parameter. This represents a unique ASCII-based identifier for this payment. Must be unique within the registry to prevent duplicate payments. Recommended format is `UUIDv4`. Cannot exceed 36 characters.

#### `coinType`​

The `coinType` field is a required query parameter. The full type identifier of the coin to be transferred (for example, `0x2::sui::SUI` or `0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI`).

#### `label`​

A human-readable name for the merchant or application receiving payment.

#### `iconUrl`​

A URL pointing to an icon image for the merchant or application. This URL might be displayed to users during payment confirmation.

#### `message`​

A description or context for the payment. This message might be displayed to users to explain the purpose of the payment.

#### `registry`​

The object ID or ASCII-represented `name` of the `PaymentRegistry` to use for processing the payment. If provided, the payment is processed through the registry with duplicate prevention. If omitted, the payment is processed as an ephemeral payment.

### Example URIs​

**Basic SUI payment:**
[code] 
    sui:pay?receiver=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef  
        &amount=1000000000  
        &coinType=0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI  
        &nonce=550e8400-e29b-41d4-a716-446655440000  
    
[/code]

**Payment with display metadata:**
[code] 
    sui:pay?receiver=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef  
        &amount=1000000000  
        &coinType=0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI  
        &nonce=550e8400-e29b-41d4-a716-446655440000  
        &label=Coffee%20Shop  
        &iconUrl=https://example.com/icon.png  
        &message=Espresso%20and%20croissant  
    
[/code]

**Registry-based payment (registry object ID):**
[code] 
    sui:pay?receiver=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef  
        &amount=1000000000  
        &coinType=0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI  
        &nonce=550e8400-e29b-41d4-a716-446655440000  
        &registry=0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890  
    
[/code]

**Registry-based payment (registry ASCII name):**
[code] 
    sui:pay?receiver=0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef  
        &amount=1000000000  
        &coinType=0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI  
        &nonce=550e8400-e29b-41d4-a716-446655440000  
        &registry=default-payment-registry  
    
[/code]

### URI encoding​

All parameter values must be properly URL-encoded according to RFC 3986. Special characters in parameter values (such as spaces, colons, slashes) must be percent-encoded. Examples include:

  * Space: `%20`
  * Colon: `%3A`
  * Slash: `%2F`
  * Double colon (`::`): `%3A%3A`


### Implementation notes​

When implementing transaction URI support:

  1. **Validate all parameters** : Ensure addresses are valid Sui addresses, amounts are positive `u64` values, nonces do not exceed 36 characters, and coin types follow the correct format.
  2. **Generate unique nonces** : Use UUIDv4 or another cryptographically secure random identifier to prevent accidental duplicates.
  3. **Display metadata to users** : Show the `label`, `iconUrl`, and `message` parameters to users during payment confirmation to provide context.
  4. **Route to correct payment function** : Use `process_registry_payment` when `registry` is provided, otherwise use `process_ephemeral_payment`.


## Key structures​

### `Namespace`​

Represents the higher-order namespace for organizing payment registries:
[code] 
    public struct Namespace has key, store {  
        id: UID,  
    }  
    
[/code]

### `PaymentRegistry`​

Tracks payments and receipts with duplicate prevention:
[code] 
    public struct PaymentRegistry has key {  
        id: UID,  
        cap_id: ID,  
        config: VecMap<String, Value>,  
        version: u16,  
    }  
    
[/code]

### `RegistryAdminCap`​

Provides administrative capabilities for a specific registry:
[code] 
    public struct RegistryAdminCap has key, store {  
        id: UID,  
        registry_id: ID,  
    }  
    
[/code]

### `PaymentType`​

Enum representing the type of payment: Ephemeral (one-time) or Registry (tracked in a registry).
[code] 
    public enum PaymentType has copy, drop, store {  
        Ephemeral,  
        Registry(ID),  
    }  
    
[/code]

### `PaymentReceipt`​

Contains details of a processed payment:
[code] 
    public struct PaymentReceipt has key, store {  
        payment_type: PaymentType,  
        nonce: String,  
        payment_amount: u64,  
        receiver: address,  
        coin_type: String,  
        timestamp_ms: u64,  
    }  
    
[/code]

### `PaymentKey`​

Unique key for identifying payment records:
[code] 
    public struct PaymentKey<phantom T> has copy, drop, store {  
        nonce: String,  
        payment_amount: u64,  
        receiver: address,  
    }  
    
[/code]

### `PaymentRecord`​

Internal structure storing payment record information:
[code] 
    public struct PaymentRecord has store {  
        epoch_at_time_of_record: u64,  
    }  
    
[/code]

## Events​

The Payment Kit emits events for offchain tracking and integration. Payment processing functions emit events containing:

  * Payment nonce
  * Payment amount
  * Coin type
  * Receiver address
  * Timestamp
  * Registry information (for registry payments)


Use these events to:

  * Track payment history offchain
  * Trigger external workflows
  * Update application state
  * Generate reports and analytics
  * Integrate with accounting systems


## Error codes​

The Payment Kit defines the following error conditions:

  * **Duplicate payment detection** : Payment with the same composite key already processed.
  * **Payment amount mismatch** : Coin value doesn't match expected payment amount.
  * **Payment record not found** : Attempted to access non-existent payment record.
  * **Payment record not expired** : Attempted to delete a record before expiration.
  * **Unauthorized admin** : Operation requires `RegistryAdminCap`.
  * **Registry already exists** : Attempted to create duplicate registry in namespace.
  * **Invalid registry name** : Registry name doesn't meet requirements.


## Source code​

  * [Move Package](<https://github.com/MystenLabs/sui-payment-kit>)
  * [SDK](<https://github.com/MystenLabs/ts-sdks/tree/main/packages/payment-kit>)


[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/payment-kit.mdx>)

[NextPayment Intents](</onchain-finance/payment-intents>)

  * Key features
  * Architecture components
    * Payment processing core
    * Registry system
  * Core concepts
    * Payment modes
    * Duplicate prevention
    * Payment receipts
    * Payment records
  * Working with payment registries
    * Creating a registry
    * Processing registry payments
    * Managing payment records
    * Configuring registries
    * Withdrawing from a registry
  * Processing ephemeral payments
  * Transaction URIs
    * URI format
    * URI parameters
    * Example URIs
    * URI encoding
    * Implementation notes
  * Key structures
    * `Namespace`
    * `PaymentRegistry`
    * `RegistryAdminCap`
    * `PaymentType`
    * `PaymentReceipt`
    * `PaymentKey`
    * `PaymentRecord`
  * Events
  * Error codes
  * Source code
