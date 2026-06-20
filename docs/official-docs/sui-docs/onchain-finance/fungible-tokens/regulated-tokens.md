<!-- Source: https://docs.sui.io/onchain-finance/fungible-tokens/regulated-tokens -->

* [](</>)
  * [Fungible Tokens](</onchain-finance/fungible-tokens/>)
  * Regulated Currencies


On this page

# Regulated Currencies

Regulated currencies are assets with access control managed through a **deny list**. A deny list identifies addresses that cannot send or receive that asset. For example, stablecoins are a type of regulated currency.

To create regulated currencies on Sui, the Currency Standard's Coin Registry provides regulatory features through the `sui::coin_registry` module. It has built-in support for global pause functionality and ecosystem integration.

Advantages of these regulatory features include:

  * **Centralized tracking:** Regulatory status is stored in the registry for easy discovery.
  * **Global pause support:** Pause or unpause functionality for emergency situations.
  * **Compliance tooling:** Integration with wallets, exchanges, and compliance systems.
  * **Migration support:** Seamless migration from legacy regulated coins.


## `DenyList`​

The `DenyList` is a shared object on the network. An address with `DenyCapV2` can access it to specify a list of addresses that cannot use a Sui core type. The primary use case for `DenyList` focuses on limiting access to coins or currencies of a specific type. Regulated coins on Sui satisfy regulations that require the ability to prevent known bad actors from accessing those coins.

info

The `DenyList` object is a system object at address `0x403`. You cannot create it yourself.

To learn about available features, see [Currency Standard](</onchain-finance/fungible-tokens/currency>) and the `coin_registry` module in the Sui framework.

## Create regulated currency​

To use regulatory features, you will need to [create a currency](</onchain-finance/fungible-tokens/create-a-fungible-token>). During currency initialization, use the `make_regulated()` function on the `CurrencyInitializer<T>` before calling `finalize()`. This adds deny list capabilities to the `Currency<T>` and tracks the regulatory status within the registry system:

Click to open

Regulated currency creation

[examples/move/coin/sources/regcoin_new.move](<https://github.com/MystenLabs/sui/blob/main/examples/move/coin/sources/regcoin_new.move>)
[code]
    module examples::regcoin_new;  
      
    use sui::coin::{Self, DenyCapV2};  
    use sui::coin_registry;  
    use sui::deny_list::DenyList;  
      
    public struct REGCOIN_NEW has drop {}  
      
    fun init(witness: REGCOIN_NEW, ctx: &mut TxContext) {  
        let (mut currency, treasury_cap) = coin_registry::new_currency_with_otw(  
            witness,  
            6, // Decimals  
            b"REGCOIN".to_string(), // Symbol  
            b"Regulated Coin".to_string(), // Name  
            b"Currency with DenyList Support".to_string(), // Description  
            b"https://example.com/regcoin.png".to_string(), // Icon URL  
            ctx,  
        );  
      
        // Claim `DenyCapV2` and mark currency as regulated.  
        let deny_cap = currency.make_regulated(true, ctx);  
        let metadata_cap = currency.finalize(ctx);  
        let sender = ctx.sender();  
      
        transfer::public_transfer(treasury_cap, sender);  
        transfer::public_transfer(metadata_cap, sender);  
        transfer::public_transfer(deny_cap, sender)  
    }  
    public fun add_addr_from_deny_list(  
        denylist: &mut DenyList,  
        denycap: &mut DenyCapV2<REGCOIN_NEW>,  
        denyaddy: address,  
        ctx: &mut TxContext,  
    ) {  
        coin::deny_list_v2_add(denylist, denycap, denyaddy, ctx);  
    }  
      
    public fun remove_addr_from_deny_list(  
        denylist: &mut DenyList,  
        denycap: &mut DenyCapV2<REGCOIN_NEW>,  
        denyaddy: address,  
        ctx: &mut TxContext,  
    ) {  
        coin::deny_list_v2_remove(denylist, denycap, denyaddy, ctx);  
    }  
    
[/code]

After calling `finalize()`, the registry automatically tracks regulatory status in the `RegulatedState` enum.

## Example​

  * Prerequisites


  * [Install the latest version of Sui](</getting-started/onboarding/sui-install>).

  * Set up your Sui account and CLI environment.


Click to open

Create Sui account and setup CLI environment
[code]
    $ sui client  
    
[/code]

If this is the first time running the `sui client` CLI tool, it asks you to provide a Sui full node server URL and a meaningful environment alias. It also generates an address with a random key pair in `sui.keystore` and a config `client.yaml`.

By default, the `client.yaml` and `sui.keystore` files are located in `~/.sui/sui_config`. For more information, refer to the [Sui client CLI tutorial](</references/cli/client>).

If this is not your first time running `sui client`, then you already have a `client.yaml` file in your local environment. If you'd like to create a new address for this tutorial, use the command:
[code]
    $ sui client new-address ed25519  
    
[/code]

  * Obtain test tokens.


Click to open

How to obtain tokens

If you are connected to Devnet or Testnet networks, use the [Faucet UI](<https://faucet.sui.io/>) to request tokens.

If you are connected to a local full node, [learn how to get local network tokens](</getting-started/onboarding/local-network>).

The example uses a single file to create the smart contract for the project (`regulated_coin.move`). The contract defines the regulated coin when you publish it to the network. The treasury capability (`TreasuryCap`) and deny capability (`DenyCapV2`) transfer to the address that publishes the contract. `TreasuryCap` permits the bearer to mint or burn coins (`REGULATED_COIN` in this example), and the `DenyCapV2` bearer can add and remove addresses from the list of unauthorized users.

Click to open

`regulated_coin.move`

[examples/regulated-coin/move/sources/regulated_coin.move](<https://github.com/MystenLabs/sui/blob/main/examples/regulated-coin/move/sources/regulated_coin.move>)
[code]
    module regulated_coin_example::regulated_coin;  
      
    use sui::coin_registry;  
      
    /// OTW for the coin.  
    public struct REGULATED_COIN has drop {}  
      
    fun init(otw: REGULATED_COIN, ctx: &mut TxContext) {  
        // Creates a new currency using `create_currency`, but with an extra capability that  
        // allows for specific addresses to have their coins frozen. Those addresses cannot interact  
        // with the coin as input objects.  
        let (mut currency, treasury_cap) = coin_registry::new_currency_with_otw(  
            otw,  
            5, // Decimals  
            b"$TABLE".to_string(), // Symbol  
            b"RegulaCoin".to_string(), // Name  
            b"Example Regulated Coin".to_string(), // Description  
            b"https://example.com/regulated_coin.png".to_string(), // Icon URL  
            ctx,  
        );  
      
        // Mark the currency as regulated, issue a `DenyCapV2`.  
        let deny_cap = currency.make_regulated(true, ctx);  
        let metadata_cap = currency.finalize(ctx);  
        let sender = ctx.sender();  
      
        // Transfer the treasury cap, deny cap, and metadata cap to the publisher.  
        transfer::public_transfer(treasury_cap, sender);  
        transfer::public_transfer(deny_cap, sender);  
        transfer::public_transfer(metadata_cap, sender);  
    }  
    
[/code]

**Constant name**| **Description**  
---|---  
`PACKAGE_ID`| Object ID of the package you publish. This data is part of the response that Sui provides on publish.  
`ADMIN_SECRET_KEY`| The secret key for the address that publishes the package. You can use `sui keytool export --key-identity <SUI_ADDRESS>` or a wallet UI to get the value. Do not expose the value to the public.  
`ADMIN_ADDRESS`| The address that publishes the contract.  
`DENY_CAP_ID`| Deny capability object ID. This data is part of the response that Sui provides on publish.  
`TREASURY_CAP_ID`| The treasury cap object ID that allows the bearer to mint new coins. This data is part of the response that Sui provides on publish.  
`MODULE_NAME`| The name of the module you publish.  
`COIN_NAME`| The name of your regulated coin.  
`SUI_FULLNODE_URL`| The URL to the full node network that processes transactions. For Testnet this value is `https://fullnode.testnet.sui.io:443`.  
  
The TypeScript and Rust clients handle the call to the `coin` package `mint` function. The `coin` package also includes a `mint_and_transfer` function you could use to perform the same task, but the composability of minting the coin in one command and transferring with another is preferable. Using 2 explicit commands allows you to implement future logic between minting and transfer. The structure of programmable transaction blocks means you still make and pay for a single transaction on the network.

  * TypeScript
  * Rust


[examples/regulated-coin/ts-client/src/main.ts](<https://github.com/MystenLabs/sui/blob/main/examples/regulated-coin/ts-client/src/main.ts>)
[code]
    program.command('mint-and-transfer')  
        .description('Mints coins and transfers to an address.')  
        .requiredOption('--amount <amount>', 'The amount of coins to mint.')  
        .requiredOption('--address <address>', 'Address to send coins.')  
      
        .action((options) => {  
            console.log("Executing mint new coins and transfer to address...");  
      
            console.log("Amount to mint: ", options.amount);  
            console.log("Address to send coins: ", options.address);  
            console.log("TREASURY_CAP_ID: ", TREASURY_CAP_ID);  
            console.log("COIN_TYPE: ", COIN_TYPE);  
      
            if(!TREASURY_CAP_ID) throw new Error("TREASURY_CAP_ID environment variable is not set.");  
      
            const txb = new Transaction();  
      
            const coin = txb.moveCall({  
                target: `0x2::coin::mint`,  
                arguments: [  
                    txb.object(TREASURY_CAP_ID),  
                    txb.pure.u64(options.amount),  
                ],  
                typeArguments: [COIN_TYPE],  
            });  
      
            txb.transferObjects([coin], txb.pure.address(options.address));  
      
            executeTx(txb);  
        });  
    
[/code]

[examples/regulated-coin/rust-client/src/tx_run/coin.rs](<https://github.com/MystenLabs/sui/blob/main/examples/regulated-coin/rust-client/src/tx_run/coin.rs>)
[code]
    pub async fn mint_and_transfer(  
        client: &SuiClient,  
        signer: &SuiKeyPair,  
        type_tag: TypeTag,  
        treasury_cap: ObjectRef,  
        to_address: SuiAddress,  
        balance: u64,  
    ) -> Result<SuiTransactionBlockResponse> {  
        info!("MINTING COIN OF BALANCE {balance} TO ADDRESS {to_address}");  
        let signer_addr = SuiAddress::from(&signer.public());  
        let gas_data = select_gas(client, signer_addr, None, None, vec![], None).await?;  
      
        let mut ptb = ProgrammableTransactionBuilder::new();  
      
        let treasury_cap = ptb.obj(ObjectArg::ImmOrOwnedObject(treasury_cap))?;  
        let balance = ptb.pure(balance)?;  
        ptb.command(Command::move_call(  
            SUI_FRAMEWORK_PACKAGE_ID,  
            Identifier::from(COIN_MODULE_NAME),  
            Identifier::from_str("mint")?,  
            vec![type_tag],  
            vec![treasury_cap, balance],  
        ));  
        ptb.transfer_arg(to_address, Argument::Result(0));  
      
        let builder = ptb.finish();  
      
        // Sign transaction  
        let msg = IntentMessage {  
            intent: Intent::sui_transaction(),  
            value: TransactionData::new_programmable(  
                signer_addr,  
                vec![gas_data.object],  
                builder,  
                gas_data.budget,  
                gas_data.price,  
            ),  
        };  
        let sig = Signature::new_secure(&msg, signer);  
      
        let res = client  
            .quorum_driver_api()  
            .execute_transaction_block(  
                Transaction::from_data(msg.value, vec![sig]),  
                SuiTransactionBlockResponseOptions::new()  
                    .with_effects()  
                    .with_object_changes()  
                    .with_input(),  
                Some(ExecuteTransactionRequestType::WaitForLocalExecution),  
            )  
            .await?;  
      
        Ok(res)  
    }  
    
[/code]

For all `Coin` functions available, see the Sui framework [`coin` module documentation](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/docs/sui/coin.md>). The most common functions follow:

Click to open

`coin::mint<T>`

[crates/sui-framework/packages/sui-framework/sources/coin.move](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/coin.move>)
[code]
    /// Create a coin worth `value` and increase the total supply  
    /// in `cap` accordingly.  
    public fun mint<T>(cap: &mut TreasuryCap<T>, value: u64, ctx: &mut TxContext): Coin<T> {  
        Coin {  
            id: object::new(ctx),  
            balance: cap.total_supply.increase_supply(value),  
        }  
    }  
    
[/code]

Click to open

`coin::mint_balance<T>`

[crates/sui-framework/packages/sui-framework/sources/coin.move](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/coin.move>)
[code]
    /// Mint some amount of T as a `Balance` and increase the total  
    /// supply in `cap` accordingly.  
    /// Aborts if `value` + `cap.total_supply` >= U64_MAX  
    public fun mint_balance<T>(cap: &mut TreasuryCap<T>, value: u64): Balance<T> {  
        cap.total_supply.increase_supply(value)  
    }  
    
[/code]

Click to open

`coin::mint_and_transfer<T>`

[crates/sui-framework/packages/sui-framework/sources/coin.move](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/coin.move>)
[code]
    // === Entrypoints ===  
      
    #[allow(lint(public_entry))]  
    /// Mint `amount` of `Coin` and send it to `recipient`. Invokes `mint()`.  
    public entry fun mint_and_transfer<T>(  
        c: &mut TreasuryCap<T>,  
        amount: u64,  
        recipient: address,  
        ctx: &mut TxContext,  
    ) {  
        transfer::public_transfer(c.mint(amount, ctx), recipient)  
    }  
    
[/code]

Click to open

`coin::burn<T>`

[crates/sui-framework/packages/sui-framework/sources/coin.move](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/coin.move>)
[code]
    #[allow(lint(public_entry))]  
    /// Destroy the coin `c` and decrease the total supply in `cap`  
    /// accordingly.  
    public entry fun burn<T>(cap: &mut TreasuryCap<T>, c: Coin<T>): u64 {  
        let Coin { id, balance } = c;  
        id.delete();  
        cap.total_supply.decrease_supply(balance)  
    }  
    
[/code]

### Managing the deny list​

The frontend code provides functions to manage the addresses assigned to the deny list for your coin. These call the `deny_list_v2_add` and `deny_list_v2_remove` functions in the `coin` module.

If you add an address to the deny list, you might notice that you can still send tokens to that address. The address can still receive coins until the end of the epoch in which you called the function. If you try to send the regulated coin from the blocked address, the attempt results in an error. After the next epoch starts, the address can no longer receive the coins either. If you remove the address, it can receive coins immediately but must wait until the epoch after removal before the address can include the coins as transaction inputs.

To use these functions, pass the address you want to add or remove. The frontend function then calls the relevant Move module in the framework, adding the `DenyList` object (`0x403`) and your `DenyCapV2` object ID. You receive the `DenyCapV2` ID at the time of publishing the smart contract. In this example, you add that value to the `.env` file that the frontend function reads from.

  * TypeScript
  * Rust


[examples/regulated-coin/ts-client/src/main.ts](<https://github.com/MystenLabs/sui/blob/main/examples/regulated-coin/ts-client/src/main.ts>)
[code]
    program.command('deny-list-add')  
        .description('Adds an address to the deny list.')  
        .requiredOption('--address <address>', 'Address to add.')  
      
        .action((options) => {  
            console.log("Executing addition to deny list...");  
            console.log("Address to add to deny list: ", options.address);  
            const txb = new Transaction();  
      
            txb.moveCall({  
                target: `0x2::coin::deny_list_v2_add`,  
                arguments: [  
                    txb.object(SUI_DENY_LIST_OBJECT_ID),  
                    txb.object(DENY_CAP_ID),  
                    txb.pure.address(options.address),  
                ],  
                typeArguments: [COIN_TYPE],  
            });  
      
            executeTx(txb);  
        });  
      
      
    program.command('deny-list-remove')  
        .description('Removes an address from the deny list.')  
        .requiredOption('--address <address>', 'Address to add.')  
        .requiredOption('--deny_list <address>', 'Deny list object ID.')  
      
        .action((options) => {  
            console.log("Executing removal from deny list...");  
            console.log("Address to remove in deny list: ", options.address);  
      
            if(!DENY_CAP_ID) throw new Error("DENY_CAP_ID environment variable is not set. Are you sure the active address owns the deny list object?");  
      
            const txb = new Transaction();  
      
            txb.moveCall({  
                target: `0x2::coin::deny_list_v2_remove`,  
                arguments: [  
                    txb.object(SUI_DENY_LIST_OBJECT_ID),  
                    txb.object(DENY_CAP_ID),  
                    txb.pure.address(options.address),  
                ],  
                typeArguments: [COIN_TYPE],  
            });  
      
            executeTx(txb);  
        });  
    
[/code]

[examples/regulated-coin/rust-client/src/tx_run/deny.rs](<https://github.com/MystenLabs/sui/blob/main/examples/regulated-coin/rust-client/src/tx_run/deny.rs>)
[code]
    pub async fn deny_list_add(  
        client: &SuiClient,  
        signer: &SuiKeyPair,  
        otw_type: TypeTag,  
        deny_list: (ObjectID, SequenceNumber),  
        deny_cap: ObjectRef,  
        addr: SuiAddress,  
    ) -> Result<SuiTransactionBlockResponse> {  
        info!("ADDING {addr} TO DENY_LIST");  
        deny_list_cmd(  
            client,  
            signer,  
            DenyListCommand::Add(addr),  
            otw_type,  
            deny_list,  
            deny_cap,  
        )  
        .await  
    }  
      
    pub async fn deny_list_remove(  
        client: &SuiClient,  
        signer: &SuiKeyPair,  
        otw_type: TypeTag,  
        deny_list: (ObjectID, SequenceNumber),  
        deny_cap: ObjectRef,  
        addr: SuiAddress,  
    ) -> Result<SuiTransactionBlockResponse> {  
        info!("REMOVING {addr} FROM DENY_LIST");  
        deny_list_cmd(  
            client,  
            signer,  
            DenyListCommand::Remove(addr),  
            otw_type,  
            deny_list,  
            deny_cap,  
        )  
        .await  
    }  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/fungible-tokens/regulated-tokens.mdx>)

[PreviousCreate Fungible Tokens: Currency Standard](</onchain-finance/fungible-tokens/create-a-fungible-token>)[NextToken Vesting Strategies](</onchain-finance/fungible-tokens/token-vesting-strategies>)

  * `DenyList`
  * Create regulated currency
  * Example
    * Managing the deny list
