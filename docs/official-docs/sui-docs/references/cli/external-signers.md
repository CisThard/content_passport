<!-- Source: https://docs.sui.io/references/cli/external-signers -->

* [](</>)
  * [Sui CLI](</references/cli>)
  * Sui External Signers CLI


On this page

# Sui External Signers CLI

The Sui CLI supports external signers through implementations found in the [Rust Signers repository](<https://github.com/MystenLabs/rust-signers>). These integration tools allow you to sign transactions using hardware devices, enhancing security by keeping private keys off your local machine.

note

External signer support was introduced in Sui CLI version 1.66.2.

## Architecture​

## Supported devices​

  * **[Ledger hardware wallets](<https://github.com/MystenLabs/rust-signers/tree/main/ledger>)**
  * **[Yubikey devices](<https://github.com/MystenLabs/rust-signers/tree/main/yubikey>)**


## Installation​

You can install the external signer binaries with [`suiup`](<https://github.com/MystenLabs/suiup>), from the [Releases page](<https://github.com/MystenLabs/rust-signers/releases>), or build them from source.

### Install with `suiup`​

If you already use `suiup`, install the signer binary you need:
[code] 
    suiup install ledger-signer  
    suiup install yubikey-signer  
    
[/code]

### From Source​

Make sure you have Rust installed on your system, which you can do using [rustup](<https://rustup.rs/>).
[code] 
    cargo install --locked --git https://github.com/MystenLabs/rust-signers ledger-signer  
    cargo install --locked --git https://github.com/MystenLabs/rust-signers yubikey-signer  
    
[/code]

Ensure the installed binaries (`ledger-signer`, `yubikey-signer`) are in your system's `PATH`.

## Usage​

External signers are managed through the `sui external-keys` command.
[code] 
    $ sui external-keys --help  
    
[/code]

The following examples demonstrate how to manage keys and sign transactions using an external signer. Replace `<SIGNER_BINARY>` with `ledger-signer` or `yubikey-signer` depending on your device.

### List available keys​

View the keys available on your connected device.
[code] 
    $ sui external-keys list-keys <SIGNER_BINARY>  
    
[/code]

### Add a key​

Add a specific key to your Sui keystore. You can specify the key by its ID found in the `list-keys` output. The format of the ID depends on the signer implementation:

  * **Ledger** : Derivation path (e.g., `m/44'/784'/0'/0'/0'`)
  * **Yubikey** : Yubikey slot (e.g., `retired slot 1` or a specific slot ID)


[code] 
    $ sui external-keys add-existing "<KEY_ID>" <SIGNER_BINARY>  
    
[/code]

Signers generally support creating new keys directly:
[code] 
    $ sui external-keys generate <SIGNER_BINARY>  
    
[/code]

### Sign a transaction​

Once the key is added to your keystore, you can use it just like any other key. Switch to the address associated with the external key, and the Sui CLI will automatically delegate signing to the device.
[code] 
    # Switch to the new address  
    $ sui client switch --address [SUI_ADDRESS]  
      
    # Perform a transaction  
    $ sui client transfer --object-id [OBJECT_ID] --to [TO_ADDRESS]  
    
[/code]

When you execute a command that requires signing, you may need to confirm the action on your hardware device.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/cli/external-signers.mdx>)

[PreviousSui Keytool CLI](</references/cli/keytool>)[NextSui Move CLI](</references/cli/move>)

  * Architecture
  * Supported devices
  * Installation
    * Install with `suiup`
    * From Source
  * Usage
    * List available keys
    * Add a key
    * Sign a transaction
