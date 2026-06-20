<!-- Source: https://docs.sui.io/getting-started/onboarding/configure-sui-client -->

* [](</>)
  * [Hello, World!](</getting-started/onboarding/>)
  * Configure a Sui Client


On this page

# Configure a Sui Client

The Sui client configuration specifies which network to connect to and which address to send transactions.

  * Prerequisites


First, confirm that Sui has been installed successfully:
[code]
    $ sui --version  
    
[/code]

If this command returns `sui not found`, then Sui is not installed and you must [follow the installation instructions](</getting-started/onboarding/sui-install>).

## `sui client`​

Run the Sui CLI with the command:
[code] 
    $ sui client  
    
[/code]

info

If a previous Sui installation stored a `client.yaml` file locally, you receive the `sui client --help` output in the console. You can delete the existing `~/.sui/sui_config/client.yaml` file if you'd like to start fresh, or you can continue using the existing configuration.

The prompt asks if you want to create the `client.yaml` file, select `Y` or press enter. You can skip the prompt with `sui client -y`.
[code] 
    No sui config found in `~/.sui/sui_config/client.yaml`, create one [Y/n]?  
    
[/code]

You see the following output:
[code] 
    Generated new keypair ...  
      secret recovery phrase : [recovery phrase words are here]  
    Created "~/.sui/sui_config/client.yaml"  
    Set active environment to testnet  
    
[/code]

caution

Store recovery phrases securely and do not share them with anyone, as they provide access to any objects and tokens that an address owns.

The recovery phrase is not visible again once the CLI history disappears.

[Learn more](</getting-started/onboarding/get-address>) about Sui addresses, key generation, and recovery phrases.

## `client.yaml`​

Your Sui client is now configured. By default, Sui stores this information in either the `~/.sui/sui_config/client.yaml` file (macOS/Linux) or `%USERPROFILE%\.sui\sui_config\client.yaml` file (Windows). You can store a `client.yaml` file in a different location, if preferred, and specify its location with the `--client.config` flag.

The `client.yaml` contains the configuration for connecting to different Sui networks (Testnet, Mainnet, Devnet, and Localnet), as well as your current active environment, which tells the CLI which network to use when you don't explicitly specify one.

You can modify your configuration using the `sui client` subcommands. See the output of `sui client --help` for more information.

Sui stores the key for the Sui address in a separate file, `~/.sui/sui_config/sui.keystore` (macOS/Linux) or `%USERPROFILE/.sui/sui_config/sui.keystore` (Windows). Learn more about Sui addresses in [Create a Sui Address](</getting-started/onboarding/get-address>).

### Next steps

## Learn More About Sui Addresses

Now that you have created a Sui address, learn about address management, key pairs, and recovery phrase best practices.

## Get SUI from Faucet

Obtain SUI from a faucet to deploy packages on Testnet.

## Hello, World!

Clone the "Hello, World!" project.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/getting-started/onboarding/configure-sui-client.mdx>)

  * `sui client`
  * `client.yaml`
