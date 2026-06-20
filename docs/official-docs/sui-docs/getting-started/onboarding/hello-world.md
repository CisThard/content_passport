<!-- Source: https://docs.sui.io/getting-started/onboarding/hello-world -->

* [](</>)
  * [Hello, World!](</getting-started/onboarding/>)
  * Build and Publish a Package


On this page

# Build and Publish a Package

Using an agent? Try this prompt
[code]
    Clone the https://github.com/MystenLabs/sui-stack-hello-world example app, build and publish the Move package at move/hello-world to Testnet, then call its entry function and show me the resulting object and transaction on SuiVision.
[/code]

Copy prompt

Open in agent▾

You'll build a "Hello, World!" program to learn the fundamentals of programming on Sui. You create programs on Sui by writing and deploying smart contracts to the network.

The most basic unit of storage on Sui is an [object](</develop/sui-architecture/object-model>). Other blockchains typically structure storage using key-value stores. Sui centers storage around objects with unique ID addresses onchain. Every Sui smart contract is an object that manipulates other objects.

Objects can be immutable or mutable:

  * **Immutable** objects cannot be transferred, changed, or deleted. No one owns them and anyone can access them publicly.

  * **Mutable** objects can be transferred, changed, and deleted. A Sui address can own them, or they can be shared for public access.


Every object's unique ID and version number references it onchain. Every transaction on the network takes objects as input, then reads, writes, and mutates the inputs to produce new or altered objects as output. Every object knows the hash of the transaction that produced it.

When an object is modified by a transaction, the transaction's output writes the object's mutated contents to the same object ID but with a new version number.

Sui has limits on the maximum transaction size (128KB) and number of objects (2,048) used in a transaction. For more information on limits, see [Building Against Limits](<https://move-book.com/guides/building-against-limits/>) in The Move Book.

## What is Move?​

[Move](</develop/write-move/sui-move-concepts>) is the programming language Sui uses to create smart contracts. It is platform agnostic and enables common libraries, tooling, and developer communities across blockchains with vastly different data and execution models. There are three ways to use Move in the context of Sui: Move packages, Move modules, and Move objects.

A Sui **Move package** is also referred to as a Move smart contract. It is a set of Move bytecode published to the Sui network. It is immutable and cannot be changed or removed, but you can upgrade it. Upgrading creates a new version of the package object onchain, leaving the original intact. All prior versions of a package still exist onchain. Once you publish it, other packages can import and use the modules it provides. Anyone can view a package's contents and use a Sui Explorer to see how its logic manipulates other objects.

Every Move package on Sui includes one or more **Sui Move modules** that define the package's interaction with onchain objects. A module's name is always unique within the package that contains it.

A Sui Move module governs a Sui **Move object**, which is typed data from a Sui Move package. Each Move object value is a struct with fields that can contain primitive types, such as integers and addresses, other objects, and non-object structs.

## Clone "Hello, World!"​

  * Prerequisites


  * [Install the latest version of Sui](</getting-started/onboarding/sui-install>).

  * [Configure the Sui client](</getting-started/onboarding/configure-sui-client>).

  * [Create a Sui address](</getting-started/onboarding/get-address>).

  * [Get SUI Testnet tokens](</getting-started/onboarding/get-coins>).

  * Download and install an IDE. The following are recommended, as they offer Move extensions:

    * [VSCode](<https://code.visualstudio.com/>), corresponding [Move extension](<https://marketplace.visualstudio.com/items?itemName=mysten.move>)

    * [Emacs](<https://www.gnu.org/software/emacs/>), corresponding [Move extension](<https://github.com/amnn/move-mode>)

    * [Vim](<https://www.vim.org/download.php>), corresponding [Move extension](<https://github.com/yanganto/move.vim>)

    * [Zed](<https://zed.dev/>), corresponding [Move extension](<https://github.com/Tzal3x/move-zed-extension>)

Alternatively, you can use the [Move web IDE](<https://www.playmove.dev/>), which does not require a download. It does not support all functions necessary for this guide, however.

  * [Download and install Git](<https://git-scm.com/downloads>).


To demonstrate creating objects, packages, and how to build your first Sui application, start by cloning the "Hello, World!" example:
[code] 
    $ git clone \  
      https://github.com/MystenLabs/sui-stack-hello-world.git  
    $ cd sui-stack-hello-world/move/hello-world  
    
[/code]

In this project, there are two important files that define the package's logic, information, and its dependencies:

  * `move/hello-world/sources/greeting.move`: Defines the package's logic. In this example, it defines a basic shared greeting object and public functions to interact with it.

  * `move/hello-world/Move.toml`: The package's configuration file that defines the package name, dependencies, and addresses.


Click to open`move/hello-world/Move.toml`

File not found in manifest: `move/hello-world/Move.toml`. You probably need to run `pnpm prebuild` and restart the site.

### View the smart contract code​

Open the `greeting.move` file in your IDE of choice. You can see the following Move code:

File not found in manifest: `move/hello-world/sources/greeting.move`. You probably need to run `pnpm prebuild` and restart the site.

### Code explanation​

First, this code defines a module called `greeting`:
[code] 
    module hello_world::greeting {  
      use std::string;  
      ...  
    }  
    
[/code]

Then, it defines a public struct called `Greeting` that contains a unique object ID and text. A struct is a type of resource:

File not found in manifest: `move/hello-world/sources/greeting.move`. You probably need to run `pnpm prebuild` and restart the site.

Then, it defines the function `new` that makes an API call to the `Greeting` struct and initializes it with the text `"Hello world!"`, storing it in a new shared object:

File not found in manifest: `move/hello-world/sources/greeting.move`. You probably need to run `pnpm prebuild` and restart the site.

Lastly, the package defines a function called `update_text` that can be called to update the text stored in `Greeting`:

File not found in manifest: `move/hello-world/sources/greeting.move`. You probably need to run `pnpm prebuild` and restart the site.

### Resource safety​

A unique aspect of programming applications on Sui is the resource safety that the Move Bytecode Verifier enforces. Move packages must satisfy the following resource safety parameters:

  * All resources must be either moved into global storage or destroyed by the end of a transaction.

  * Resources cannot be copied.


In the "Hello, World!" example, the struct `Greeting` is a resource type.

To satisfy the requirement that all resources must be moved or destroyed by the end of a transaction, `Greeting` is assigned to `new_greeting`, which the call to `transfer::share_object(new_greeting)` then moves into global storage.

To mutate `Greeting`, the function `update_text` takes the input `(&mut Greeting)` rather than the resource itself. This function satisfies resource safety because the function does not copy the resource and mutates it through a reference.

[Learn more](<https://github.com/MystenLabs/sui/blob/main/external-crates/move/move-execution/v1/crates/move-bytecode-verifier/README.md>) about the Move Bytecode Verifier.

#### How does this differ from EVM applications?​

The Ethereum Virtual Machine adopts a gas-based resource safety strategy. Every opcode on an EVM chain has an associated gas price that makes transactions costly, preventing the network from running a single transaction indefinitely.

## Build the Move package​

Before you can publish a Move package to the network, you must first build it. Building your package is necessary because the `.move` source file is a human-readable piece of code, while the network can only understand bytecode.

To build your "Hello, World!" package, first confirm your working directory is `~/sui-stack-hello-world/move/hello-world`, then run the following command:
[code] 
    $ sui move build  
    
[/code]

The build process fetches and compiles the dependencies defined in the `Move.toml` file. The Move compiler checks your `.move` code for type errors, syntax errors, and enforces resource safety, then translates your `.move` code into bytecode that Sui can execute.

info

Both `sui move test` and `sui client publish` automatically build your package first, so running `sui move build` separately is optional. It is useful for catching compilation errors early before you test or publish.

## Publish the Move package​

Now that your package has been built, you need to publish it. After you publish it, other packages and users can use the package's modules and functions by making calls to the package ID.

First, confirm your client is configured to use Testnet as the active environment:
[code] 
    $ sui client active-env  
    
[/code]

This should return `testnet`. If it does not return `testnet`, follow the [client configuration instructions](</getting-started/onboarding/configure-sui-client>) before continuing.

Then, check your balance of SUI tokens to confirm you have enough to publish to Testnet:
[code] 
    $ sui client balance   
    
[/code]

You should have a balance of SUI tokens:
[code] 
    ╭────────────────────────────────────────────╮  
    │ Balance of coins owned by this address     │  
    ├────────────────────────────────────────────┤  
    │ ╭────────────────────────────────────────╮ │  
    │ │ coin       balance (raw)  balance      │ │  
    │ ├────────────────────────────────────────┤ │  
    │ │ Sui        56804696124     0.50 SUI    │ │  
    │ ╰────────────────────────────────────────╯ │  
    ╰────────────────────────────────────────────╯  
    
[/code]

If you do not have a balance, follow the [SUI faucet instructions](</getting-started/onboarding/get-coins>).

Now, publish the package to Testnet with the command:
[code] 
    $ sui client publish   
    
[/code]

Click to openOutput
[code]
    Transaction Digest: 8R39iKKLGPDG3QkW2SrRW3QX71csRP2BLhK9H7oz9SwW  
    ╭──────────────────────────────────────────────────────────────────────────────────────────────────────────────╮  
    │ Transaction Data                                                                                             │  
    ├──────────────────────────────────────────────────────────────────────────────────────────────────────────────┤  
    │ Sender: 0x9ac241b2b3cb87ecd2a58724d4d182b5cd897ad307df62be2ae84beddc9d9803                                   │  
    │ Gas Owner: 0x9ac241b2b3cb87ecd2a58724d4d182b5cd897ad307df62be2ae84beddc9d9803                                │  
    │ Gas Budget: 9843200 MIST                                                                                     │  
    │ Gas Price: 1000 MIST                                                                                         │  
    │ Gas Payment:                                                                                                 │  
    │  ┌──                                                                                                         │  
    │  │ ID: 0x816e5ec6ff457f18232498b57af8a0e1e219307a3a43fb5df5a4c2198296510c                                    │  
    │  │ Version: 591332925                                                                                        │  
    │  │ Digest: FLC4NXntT7WiHcqCkpDuBUq14DFTfi3EFeUiJcSNHdPu                                                      │  
    │  └──                                                                                                         │  
    │                                                                                                              │  
    │ Transaction Kind: Programmable                                                                               │  
    │ ╭──────────────────────────────────────────────────────────────────────────────────────────────────────────╮ │  
    │ │ Input Objects                                                                                            │ │  
    │ ├──────────────────────────────────────────────────────────────────────────────────────────────────────────┤ │  
    │ │ 0   Pure Arg: Type: address, Value: "0x9ac241b2b3cb87ecd2a58724d4d182b5cd897ad307df62be2ae84beddc9d9803" │ │  
    │ ╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯ │  
    │ ╭─────────────────────────────────────────────────────────────────────────╮                                  │  
    │ │ Commands                                                                │                                  │  
    │ ├─────────────────────────────────────────────────────────────────────────┤                                  │  
    │ │ 0  Publish:                                                             │                                  │  
    │ │  ┌                                                                      │                                  │  
    │ │  │ Dependencies:                                                        │                                  │  
    │ │  │   0x0000000000000000000000000000000000000000000000000000000000000001 │                                  │  
    │ │  │   0x0000000000000000000000000000000000000000000000000000000000000002 │                                  │  
    │ │  └                                                                      │                                  │  
    │ │                                                                         │                                  │  
    │ │ 1  TransferObjects:                                                     │                                  │  
    │ │  ┌                                                                      │                                  │  
    │ │  │ Arguments:                                                           │                                  │  
    │ │  │   Result 0                                                           │                                  │  
    │ │  │ Address: Input  0                                                    │                                  │  
    │ │  └                                                                      │                                  │  
    │ ╰─────────────────────────────────────────────────────────────────────────╯                                  │  
    │                                                                                                              │  
    │ Signatures:                                                                                                  │  
    │    mUxqMIofPq+yIzPxxYM+2mSIPTFneDxhWGGxJ7tM02hnRBRy5/FosnnWKxd4OSAjmaw6FNylwVdqUoUlJSxWCQ==                  │  
    │                                                                                                              │  
    ╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────╯  
    ╭──────────────────  ─────────────────────────────────────────────────────────────────────────────────╮  
    │ Transaction Effects                                                                               │  
    ├───────────────────────────────────────────────────────────────────────────────────────────────────┤  
    │ Digest: 8R39iKKLGPDG3QkW2SrRW3QX71csRP2BLhK9H7oz9SwW                                              │  
    │ Status: Success                                                                                   │  
    │ Executed Epoch: 875                                                                               │  
    │                                                                                                   │  
    │ Created Objects:                                                                                  │  
    │  ┌──                                                                                              │  
    │  │ ID: 0x136e41f505888066f189fb823d710ec96ab4fd75144b3d8008b91d58de85fd12                         │  
    │  │ Owner: Account Address ( 0x9ac241b2b3cb87ecd2a58724d4d182b5cd897ad307df62be2ae84beddc9d9803 )  │  
    │  │ Version: 591332926                                                                             │  
    │  │ Digest: BGfc1tihsYPTLLozrj58HmRkDeQ1DWZfqeaR4SZDb1cX                                           │  
    │  └──                                                                                              │  
    │  ┌──                                                                                              │  
    │  │ ID: 0xa7ed855d30500c485a94c0849f70b508d6b6adf6b0767ab93cc0756c075ecbb1                         │  
    │  │ Owner: Immutable                                                                               │  
    │  │ Version: 1                                                                                     │  
    │  │ Digest: EtGAG9RHHCsguX4iuX1cbRDvW4QAkJXgDCMJjiufHtxB                                           │  
    │  └──                                                                                              │  
    │ Mutated Objects:                                                                                  │  
    │  ┌──                                                                                              │  
    │  │ ID: 0x816e5ec6ff457f18232498b57af8a0e1e219307a3a43fb5df5a4c2198296510c                         │  
    │  │ Owner: Account Address ( 0x9ac241b2b3cb87ecd2a58724d4d182b5cd897ad307df62be2ae84beddc9d9803 )  │  
    │  │ Version: 591332926                                                                             │  
    │  │ Digest: CiU5KNZALUmuckc2YUFmJq5YXgbB8oG3rs4cnh2rdDXd                                           │  
    │  └──                                                                                              │  
    │ Gas Object:                                                                                       │  
    │  ┌──                                                                                              │  
    │  │ ID: 0x816e5ec6ff457f18232498b57af8a0e1e219307a3a43fb5df5a4c2198296510c                         │  
    │  │ Owner: Account Address ( 0x9ac241b2b3cb87ecd2a58724d4d182b5cd897ad307df62be2ae84beddc9d9803 )  │  
    │  │ Version: 591332926                                                                             │  
    │  │ Digest: CiU5KNZALUmuckc2YUFmJq5YXgbB8oG3rs4cnh2rdDXd                                           │  
    │  └──                                                                                              │  
    │ Gas Cost Summary:                                                                                 │  
    │    Storage Cost: 7843200 MIST                                                                     │  
    │    Computation Cost: 1000000 MIST                                                                 │  
    │    Storage Rebate: 978120 MIST                                                                    │  
    │    Non-refundable Storage Fee: 9880 MIST                                                          │  
    │                                                                                                   │  
    │ Transaction Dependencies:                                                                         │  
    │    2dkJtqsoQcyCZJvjZnskNVPQeynwVtwCcA9goAru6tTi                                                   │  
    │    7PStztXyh92keJmrDD1aghHaKVdgCoVkVx4ZmLUfmQeK                                                   │  
    │    Dd9pn1zFcSJjinxQewFd2gQdR4XKsHxFioD5MYnwLZQz                                                   │  
    ╰───────────────────────────────────────────────────────────────────────────────────────────────────╯  
    ╭─────────────────────────────╮  
    │ No transaction block events │  
    ╰─────────────────────────────╯  
      
    ╭─────────────────────────────────────────────  ─────────────────────────────────────────────────────╮  
    │ Object Changes                                                                                   │  
    ├──────────────────────────────────────────────────────────────────────────────────────────────────┤  
    │ Created Objects:                                                                                 │  
    │  ┌──                                                                                             │  
    │  │ ObjectID: 0x136e41f505888066f189fb823d710ec96ab4fd75144b3d8008b91d58de85fd12                  │  
    │  │ Sender: 0x9ac241b2b3cb87ecd2a58724d4d182b5cd897ad307df62be2ae84beddc9d9803                    │  
    │  │ Owner: Account Address ( 0x9ac241b2b3cb87ecd2a58724d4d182b5cd897ad307df62be2ae84beddc9d9803 ) │  
    │  │ ObjectType: 0x2::package::UpgradeCap                                                          │  
    │  │ Version: 591332926                                                                            │  
    │  │ Digest: BGfc1tihsYPTLLozrj58HmRkDeQ1DWZfqeaR4SZDb1cX                                          │  
    │  └──                                                                                             │  
    │ Mutated Objects:                                                                                 │  
    │  ┌──                                                                                             │  
    │  │ ObjectID: 0x816e5ec6ff457f18232498b57af8a0e1e219307a3a43fb5df5a4c2198296510c                  │  
    │  │ Sender: 0x9ac241b2b3cb87ecd2a58724d4d182b5cd897ad307df62be2ae84beddc9d9803                    │  
    │  │ Owner: Account Address ( 0x9ac241b2b3cb87ecd2a58724d4d182b5cd897ad307df62be2ae84beddc9d9803 ) │  
    │  │ ObjectType: 0x2::coin::Coin<0x2::sui::SUI>                                                    │  
    │  │ Version: 591332926                                                                            │  
    │  │ Digest: CiU5KNZALUmuckc2YUFmJq5YXgbB8oG3rs4cnh2rdDXd                                          │  
    │  └──                                                                                             │  
    │ Published Objects:                                                                               │  
    │  ┌──                                                                                             │  
    │  │ PackageID: 0xa7ed855d30500c485a94c0849f70b508d6b6adf6b0767ab93cc0756c075ecbb1                 │  
    │  │ Version: 1                                                                                    │  
    │  │ Digest: EtGAG9RHHCsguX4iuX1cbRDvW4QAkJXgDCMJjiufHtxB                                          │  
    │  │ Modules: greeting                                                                             │  
    │  └──                                                                                             │  
    ╰──────────────────────────────────────────────────────────────────────────────────────────────────╯  
    ╭───────────────────────────────────────────────────────────────────────────────────────────────────╮  
    │ Balance Changes                                                                                   │  
    ├───────────────────────────────────────────────────────────────────────────────────────────────────┤  
    │  ┌──                                                                                              │  
    │  │ Owner: Account Address ( 0x9ac241b2b3cb87ecd2a58724d4d182b5cd897ad307df62be2ae84beddc9d9803 )  │  
    │  │ CoinType: 0x2::sui::SUI                                                                        │  
    │  │ Amount: -7865080                                                                               │  
    │  └──                                                                                              │  
    ╰───────────────────────────────────────────────────────────────────────────────────────────────────╯  
    
[/code]

When you publish a Move package to the network, the network uploads and stores the bytecode as a Move package with a unique package ID and version number. The network consumes SUI tokens as gas and processes the transaction onchain.

After successfully executing, the output provides details about the transaction used to publish the package, including the gas cost, transaction digest, dependencies, owner, and sender.

For this guide, the most important section is **Published Objects** , which includes the package's ID, version, and its modules:
[code] 
    │ Published Objects:                                                                               │  
    │  ┌──                                                                                             │  
    │  │ PackageID: 0xa7ed855d30500c485a94c0849f70b508d6b6adf6b0767ab93cc0756c075ecbb1                 │  
    │  │ Version: 1                                                                                    │  
    │  │ Digest: EtGAG9RHHCsguX4iuX1cbRDvW4QAkJXgDCMJjiufHtxB                                          │  
    │  │ Modules: greeting                                                                             │  
    │  └──       
    
[/code]

Both the package ID and module are required to interact with the package from the command line. Take note of both values for future use in the [Connecting a Frontend](</getting-started/onboarding/app-frontends>) guide.

## Interact with the Move package​

Interact with the newly published package by first making a call to the `new` function that creates a new `Greeting` object and initializes it with the text "Hello world!":
[code] 
    $ sui client call --package <PACKAGE_ID> --module greeting --function new    
    
[/code]

Replace `<PACKAGE_ID>` with the package ID the output of the `sui client publish` command returned. You must include the `--package`, `--module`, and `--function` flags.

The output of this call includes a newly created object:
[code] 
    ╭───────────────────────────────────────────────────────────────────────────────────────────────────╮  
    │ Transaction Effects                                                                               │  
    ├───────────────────────────────────────────────────────────────────────────────────────────────────┤  
    │ Digest: 6xB9Foy5vyhXG99xppaCxrNvpPTV3UZsH39zqUKNoGsD                                              │  
    │ Status: Success                                                                                   │  
    │ Executed Epoch: 875                                                                               │  
    │                                                                                                   │  
    │ Created Objects:                                                                                  │  
    │  ┌──                                                                                              │  
    │  │ ID: 0x2834aa3d2ed1b5060f4e5d400092544fa9c95430fd894b139b7dfb0312501594                         │  
    │  │ Owner: Shared( 591332927 )                                                                     │  
    │  │ Version: 591332927                                                                             │  
    │  │ Digest: 8xJRijHHp3gNXLExTG98KX5jYAQDVKqsBD8ATFMJXCbA                                           │  
    │  └──                                 
    ...                         
    
[/code]

To verify that the object contains the text `"Hello world!"`, make a call to query the object's information:
[code] 
    $ sui client object <OBJECT_ID>  
    
[/code]

Replace `<OBJECT_ID>` with the value under `Created Objects, ID:`.

You should see the object's details, including a value of `text: Hello world!`:
[code] 
    ╭───────────────┬──────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮  
    │ objectId      │  0x2834aa3d2ed1b5060f4e5d400092544fa9c95430fd894b139b7dfb0312501594                                              │  
    │ version       │  591332927                                                                                                       │  
    │ digest        │  8xJRijHHp3gNXLExTG98KX5jYAQDVKqsBD8ATFMJXCbA                                                                    │  
    │ objType       │  0xa7ed855d30500c485a94c0849f70b508d6b6adf6b0767ab93cc0756c075ecbb1::greeting::Greeting                          │  
    │ owner         │ ╭────────┬──────────────────────────────────────────╮                                                            │  
    │               │ │ Shared │ ╭────────────────────────┬─────────────╮ │                                                            │  
    │               │ │        │ │ initial_shared_version │  591332927  │ │                                                            │  
    │               │ │        │ ╰────────────────────────┴─────────────╯ │                                                            │  
    │               │ ╰────────┴──────────────────────────────────────────╯                                                            │  
    │ prevTx        │  6xB9Foy5vyhXG99xppaCxrNvpPTV3UZsH39zqUKNoGsD                                                                    │  
    │ storageRebate │  1413600                                                                                                         │  
    │ content       │ ╭───────────────────┬──────────────────────────────────────────────────────────────────────────────────────────╮ │  
    │               │ │ dataType          │  moveObject                                                                              │ │  
    │               │ │ type              │  0xa7ed855d30500c485a94c0849f70b508d6b6adf6b0767ab93cc0756c075ecbb1::greeting::Greeting  │ │  
    │               │ │ hasPublicTransfer │  false                                                                                   │ │  
    │               │ │ fields            │ ╭──────┬───────────────────────────────────────────────────────────────────────────────╮ │ │  
    │               │ │                   │ │ id   │ ╭────┬──────────────────────────────────────────────────────────────────────╮ │ │ │  
    │               │ │                   │ │      │ │ id │  0x2834aa3d2ed1b5060f4e5d400092544fa9c95430fd894b139b7dfb0312501594  │ │ │ │  
    │               │ │                   │ │      │ ╰────┴──────────────────────────────────────────────────────────────────────╯ │ │ │  
    │               │ │                   │ │ text │  Hello world!                                                                 │ │ │  
    │               │ │                   │ ╰──────┴───────────────────────────────────────────────────────────────────────────────╯ │ │  
    │               │ ╰───────────────────┴──────────────────────────────────────────────────────────────────────────────────────────╯ │  
    ╰───────────────┴──────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯  
    
[/code]

### Important transaction considerations​

You cannot send 2 or more transactions simultaneously, otherwise you encounter an error such as:
[code] 
    Failed to sign transaction by a quorum of validators because one or more of its objects is reserved for another transaction.  
    
[/code]

If you receive this error, you must wait until the current epoch is over before submitting your transaction again. You can see how long is left in the current epoch using [Sui Explorer](<https://suivision.xyz/>) or another network explorer like [SuiScan](<https://suiscan.xyz/mainnet/home>).

To prevent the same object from being modified by multiple transactions at once, your address 'locks' the object to prevent conflicting modifications. If you'd like to batch multiple transaction commands together, you can use [programmable transaction blocks](</develop/transactions/ptbs/prog-txn-blocks>).

Transactions also have limitations regarding total size, number of objects, and number of inputs. Learn more about limitations in [Building Against Limits](<https://move-book.com/guides/building-against-limits/>) in The Move Book.

### Next steps

## Create a Full Stack App

Connect a frontend interface to your "Hello, World!" smart contract.

## Access Sui Data

Learn more about accessing data on Sui.

## Join the Community

Join the Sui developer community, try out other example projects, or read more documentation.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/getting-started/onboarding/hello-world.mdx>)

  * What is Move?
  * Clone "Hello, World!"
    * View the smart contract code
    * Code explanation
    * Resource safety
  * Build the Move package
  * Publish the Move package
  * Interact with the Move package
    * Important transaction considerations
