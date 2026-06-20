<!-- Source: https://docs.sui.io/getting-started/onboarding/sui-install -->

* [](</>)
  * [Hello, World!](</getting-started/onboarding/>)
  * Install Sui


On this page

# Install Sui

Using an agent? Try this prompt
[code]
    Set up this machine for Sui development: Install the Sui CLI with curl -sSfL https://raw.githubusercontent.com/MystenLabs/suiup/main/install.sh | sh, then run suiup install sui@testnet to get the Testnet-compatible toolchain. Run sui client to generate your keys and config, then prompt me to visit faucet.sui.io, enter the generated address, and fund it with test tokens.
[/code]

Copy prompt

Open in agent▾

Sui is a scalable and performant layer-1 blockchain that is home to a complete stack of native primitives ideal for building decentralized applications. Such primitives, such as those for [encryption](<https://seal-docs.wal.app/UsingSeal/>), [data storage](<https://docs.wal.app/usage/setup>), verification, and access control, provide developers with every piece of the application stack without needing to use layer-2 chains or offchain solutions.

In contrast to other chains, Sui uses an [object-centric model](</develop/sui-architecture/object-model>), where every item on the network is an object. [Transactions](</develop/transactions/txn-overview>) use objects as input, which mutate an existing object or create new objects. Each object has a unique onchain ID.

To create objects, submit transactions, and start building an application on Sui, first you must install Sui. This installation includes the [Sui CLI](</references/cli>), a tool that creates and manages address balances, builds and publishes smart contracts, and queries information from the network.

  * Prerequisites


  * Have a machine with one of the following supported operating systems:
    * Linux: Ubuntu version 22.04 (Jammy Jellyfish) or newer
    * macOS: macOS Monterey or newer
    * Microsoft Windows: Windows 10 or 11


## Quick install​

You use the Sui CLI to interact with the Sui network, deploy packages, and manage assets. To install the Sui CLI, you can use [`suiup`](<https://github.com/MystenLabs/suiup>).

[`suiup`](<https://github.com/MystenLabs/suiup>) is the most effective installation method, as it allows you to easily install and switch between different versions of not only the Sui CLI but also other Sui stack components like [`walrus`](<https://docs.wal.app/usage/setup>) and [`mvr`](<https://github.com/MystenLabs/mvr>).

Alternative quick install instructions for [Homebrew](<https://brew.sh/>) or [Chocolately](<https://chocolatey.org/>) do not support installing other Sui stack components. You need to install other components through their individual binaries if you'd like to use them in the future.

caution

Installations using Homebrew or Chocolatey might take several minutes if you do not have any of the [Sui prerequisites](</getting-started/onboarding/install-source>) installed. Using `suiup` is often much faster and highly recommended.

  * suiup
  * Homebrew
  * Chocolatey


First, install `suiup`:
[code]
    $ curl -sSfL \  
      https://raw.githubusercontent.com/Mystenlabs/suiup/main/install.sh \  
      | sh  
    
[/code]

Then, install Sui:
[code]
    $ suiup install sui@testnet  
    
[/code]

For alternative installation methods, refer to the [`suiup` repository](<https://github.com/MystenLabs/suiup>).

danger

Installing Sui with `suiup` does not configure the client. To use `sui` commands, you must [configure the Sui client](</getting-started/onboarding/configure-sui-client>).

To confirm that Sui installed correctly:

  1. Open a terminal or console
  2. Type `sui --version` and press Enter


If you receive a "command not found" error, verify the Sui binaries directory is in your `PATH` environment variable.

You must have [Homebrew](<https://brew.sh/>) installed before running the following command:
[code]
    $ brew install sui  
    
[/code]

To confirm that Sui installed correctly:

  1. Open a terminal or console
  2. Type `sui --version` and press Enter


If you receive a "command not found" error, verify the Sui binaries directory is in your `PATH` environment variable.

You must have [Chocolately](<https://chocolatey.org/>) installed before running the following command:
[code]
    $ choco install sui  
    
[/code]

Find more [versions of Sui for Windows](<https://community.chocolatey.org/packages/sui>) on the Chocolatey community website.

To confirm that Sui installed correctly:

  1. Open a terminal or console
  2. Type `sui --version` and press Enter


If you receive a "command not found" error, verify the Sui binaries directory is in your `PATH` environment variable.

The quick install is suitable for most use cases. For those wanting more control over the installation process, you can [install from source](</getting-started/onboarding/install-source>) or [install binaries](</getting-started/onboarding/install-binaries>).

If Sui is already installed from a previous development environment, be sure to upgrade to the [latest version](</getting-started/onboarding/install-binaries>).

Looking for a project to clone?

Before you can create and publish a smart contract, you must [configure a Sui client](</getting-started/onboarding/configure-sui-client>) and [obtain SUI tokens](</getting-started/onboarding/get-coins>).

Then, you can [create a "Hello, World!" example](</getting-started/onboarding/hello-world>).

## Installation details​

### `suiup` installation details​

Refer to the `suiup` repository's [README](<https://github.com/MystenLabs/suiup?tab=readme-ov-file#paths-used-by-the-suiup-tool>) for information regarding installation files and their locations.

### Default configuration file​

Regardless of whether you used `suiup`, Homebrew, or Chocolately, Sui stores a primary configuration in the `~/.sui/sui_config/client.yaml` file. This file defines settings and preferences for your environment, such as:

  * Network environment details for Mainnet, Testnet, Devnet, and Localnet networks.

  * Active environment, which specifies the network the CLI commands target.

  * Active address, which specifies the Sui address the CLI uses for transactions and queries.

  * Keystore location, which specifies where Sui stores your address' private keys.


### Next steps

## Configure a Sui Client

Configure a Sui client to get a Sui address and connect to Testnet.

## Get SUI from Faucet

Obtain SUI from a faucet to deploy packages on Testnet.

## Hello, World!

Clone the "Hello, World!" project.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/getting-started/onboarding/sui-install.mdx>)

  * Quick install
  * Installation details
    * `suiup` installation details
    * Default configuration file
