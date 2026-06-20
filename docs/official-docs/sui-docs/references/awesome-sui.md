<!-- Source: https://docs.sui.io/references/awesome-sui -->

* [](</>)
  * Awesome Sui


On this page

# Awesome Sui

info

Visit the [Awesome Sui repo](<https://github.com/sui-foundation/awesome-sui/tree/main>) on GitHub for the source content of these pages.

Sui is the first blockchain built for internet scale, enabling fast, scalable, and low-latency transactions. It's programmable and composable, powered by the Move language, making it easy to build and integrate dApps. Sui prioritizes developer experience and frictionless user interactions, designed to support next-gen decentralized applications with minimal complexity.

> ⚠️ This warning icon means that the tool may not be functioning correctly at the moment. Please check these tools carefully.

[**Submit your own developer tool here**](<https://github.com/sui-foundation/awesome-sui/blob/main/CONTRIBUTING.md>)

## Move IDEs​

### Web IDEs​

#### BitsLab IDE

Online Move code editor that requires no configuration and supports Move code syntax highlighting. Beginner friendly and supports interacting with Sui.

  * [Homepage](<https://www.bitslab.xyz/bitslabide>)
  * [IDE](<https://ide.bitslab.xyz/>)
  * [Tutorial](<https://www.youtube.com/watch?v=-9-WkqQwtu8>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

BitsLab IDE is an out-of-the-box, configuration-free online development environment that supports end-to-end development of Move smart contracts. It is powerful, easy to use, user friendly, includes built-in tutorials, and supports plugin extensions.

**Features**

  * Move
    * Move 2024 is supported
    * Compilation
    * Unit Testing
    * Deployment
    * Multiple `sui` binary versions to choose from
  * Project Management
    * Multiple workspaces
    * Persistent session
    * Share project snapshot link
    * Import from local file system
  * Utilities
    * Lightweight object explorer
    * Lightweight package explorer
    * Package function call
  * Example templates


**Latest Version Number of Sui Tested On**

  * Devnet v1.31.0
  * Testnet v1.32.0
  * Mainnet v1.31.0


#### MoveStudio

Online IDE for Sui smart contract development.

  * [Homepage](<https://www.movestudio.dev/>)
  * [GitHub](<https://github.com/dantheman8300/move-studio>)
  * [IDE](<https://www.movestudio.dev/build>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

Online IDE for Sui smart contract development

**Features**

  * Move
    * Move 2024 is supported
    * Compilation
    * Unit Testing
    * Deployment
    * Only support one default `sui` binary version
  * Project Management
    * Multiple workspaces
    * Persistent session
    * Import from local file system
  * Utilities
    * Lightweight object explorer
    * Lightweight package explorer
    * Package function call
  * Example templates


**Latest Version Number of Sui Tested On**

  * `sui 1.25.0-b10ea7331e1c`


#### ChainIDE

Move Cloud-Powered Development Platform.

  * [Homepage](<https://chainide.com>)
  * [Documentation](<https://chainide.gitbook.io/chainide-english-1/ethereum-ide-1/9.-sui-ide>)
  * [IDE](<https://chainide.com/s/sui>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

ChainIDE is cloud-based IDE for creating decentralized applications to deploy on blockchains. It supports Sui smart contract development.

**Features**

  * Move
    * Move 2024 is supported
    * Compilation
    * Unit Testing
    * Deployment
  * Project Management
    * Multiple workspaces
    * Persistent session
    * Integrated terminal
  * Utilities
    * Lightweight object explorer
    * Lightweight package explorer
    * Package function call
  * Example templates


**Latest Version Number of Sui Tested On**

#### ⚠️ WELLDONE Code

Remix IDE plugin supports non-EVM smart contract development including Sui.

  * [Homepage](<https://docs.welldonestudio.io/code>)
  * [Documentation & Tutorial](<https://docs.welldonestudio.io/code/deploy-and-run/sui>)


##### Further Information​

> [!WARNING] The tool is currently not working.

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

WELLDONE Code is a Remix IDE Plugin. Using WELLDONE Code, developers can easily develop and test smart contracts in Remix IDE for non-EVM networks such as NEAR and Cosmos, in addition to EVM-compatible networks. Sui is also supported.

**Features**

  * Move
    * ❌ Move 2024 not supported
    * Compilation
    * Unit Testing
    * Deployment
  * Project Management
    * Multiple workspaces
    * Persistent session
  * Utilities
    * Lightweight object explorer
    * Lightweight package explorer
    * Package function call
  * Example templates


**Latest Version Number of Sui Tested On**

⚠️ N/A

### Desktop IDEs​

#### VSCode Move by Mysten Labs

VSCode Extension supports Move on Sui development with LSP features through Move Analyzer developed by Mysten Labs.

  * [GitHub](<https://github.com/MystenLabs/sui/tree/main/external-crates/move/crates/move-analyzer>)
  * [Documentation & Tutorial](<https://marketplace.visualstudio.com/items?itemName=mysten.move>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

  * VSCode Extension for Move on Sui smart contract development powered by LSP Move Analyzer language server developed by Mysten Labs.


**Features**

  * Autocomplete
  * On-hover support
  * Real-time diagnostics
  * Go to definition
  * Inlay hints
  * Go/Find references
  * Move
    * Move 2024 is supported
    * Move 2024 syntax highlight ([VSCode Move Syntax](<https://marketplace.visualstudio.com/items?itemName=damirka.move-syntax>))
  * Utilities
    * Integration with `sui` binary (Sui CLI)


**Latest Version Number of Sui Tested On**

Testnet v1.32.0

#### VSCode Sui Move Analyzer by MoveBit

Alternative VSCode extension developed by MoveBit.

  * [Homepage](<https://movebit.xyz/analyzer>)
  * [GitHub](<https://github.com/movebit/sui-move-analyzer>)
  * [Documentation & Tutorial](<https://marketplace.visualstudio.com/items?itemName=MoveBit.sui-move-analyzer>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

  * VSCode Extension for Move on Sui smart contract development powered by LSP Sui Move Analyzer language server developed by Movebit.


**Features**

  * Autocomplete
  * On-hover support
  * Real-time diagnostics
  * Go to definition
  * Go/Find references
  * Move
    * ⚠️ Latest Move 2024 is not supported (`2024.alpha` supported while latest is `2024.beta`)
    * Move 2024 syntax highlight ([VSCode Move-Msl-Syx](<https://marketplace.visualstudio.com/items?itemName=MoveBit.move-msl-syx>))
  * Utilities
    * Integration with `sui` binary (Sui CLI)


**Latest Version Number of Sui Tested On**

⚠️ Testnet v1.32.0

#### IntelliJ Sui Move Language Plugin

IntelliJ-based plugin for Move on Sui development.

  * [Homepage](<https://plugins.jetbrains.com/plugin/23301-sui-move-language>)
  * [GitHub](<https://github.com/movefuns/intellij-move>)


#### [Emacs move-mode](<https://github.com/amnn/move-mode>)

The move-mode package is an Emacs major-mode for editing smart contracts written in the Move programming language.

#### [Move.vim](<https://github.com/yanganto/move.vim>)

Syntax highlighting that supports the Move 2024 edition.

### IDE Utilities​

#### [Prettier Move Plugin](<https://github.com/MystenLabs/sui/tree/main/external-crates/move/crates/move-analyzer/prettier-plugin>)

A Move language plugin for the Prettier code formatter.

#### [Sui Extension](<https://github.com/zktx-io/sui-extension>)

The Sui extension provides seamless support for compiling, deploying, and testing Sui smart contracts directly within VS Code.

  * [Homepage](<https://marketplace.visualstudio.com/items?itemName=zktxio.sui-extension>)
  * [Documentation](<https://docs.zktx.io/vsce/sui/>)


#### ⚠️ Sui Simulator

VSCode Extension to streamline Sui development workflow with intuitive UI.

  * [Homepage](<https://marketplace.visualstudio.com/items?itemName=weminal-labs.sui-simulator-vscode>)
  * [GitHub](<https://github.com/Weminal-labs/sui-simulator-vscode>)
  * [Demo](<https://www.youtube.com/watch?v=BHRxeF_visM&pp=ygUMd2VtaW5hbCBsYWIg>)


#### [Tree Sitter Move](<https://github.com/tzakian/tree-sitter-move>)

Tree Sitter for Move.

## Client SDKs & Libraries​

### Client SDKs​

#### Sui TypeScript SDK (Mysten Labs)

TypeScript modular library of tools for interacting with the Sui blockchain.

  * [GitHub](<https://github.com/MystenLabs/sui/tree/main/sdk/typescript>)
  * [Documentation](<https://sdk.mystenlabs.com/typescript>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

The Sui TypeScript SDK is a modular library of tools for interacting with the Sui blockchain. Use it to send queries to RPC nodes, build and sign transactions, and interact with a Sui or local network.

**Features**

  * [Module packages](<https://sdk.mystenlabs.com/typescript#module-packages>)
  * [GraphQL (RPC 2.0)](<https://sdk.mystenlabs.com/typescript/graphql>) is supported.
  * [Sui BCS types are supported](<https://github.com/MystenLabs/sui/blob/main/sdk/typescript/src/bcs>)
  * [Kiosk SDK](<https://sdk.mystenlabs.com/kiosk>)
  * [zkSend (Stashed) SDK](<https://sdk.mystenlabs.com/zksend>)
  * [DeepBookV3 SDK](<https://docs.sui.io/standards/deepbookv3-sdk>)
  * [SuiNS SDK](<https://docs.suins.io/developer/sdk>)


#### Sui Kit(Scallop)

Toolkit for interacting with the Sui network in TypeScript.

  * [GitHub](<https://github.com/scallop-io/sui-kit>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

TypeScript Client Kit SDK for Sui blockchain

**Features**

  * Transfer SUI, Custom Coin, and objects.
  * Move call functionality.
  * Programmable transaction support.
  * Query on-chain data.
  * HD wallet with multi-account management.


#### Sui Rust SDK (Mysten Labs)

Rust SDK to interact with Sui blockchain.

  * [GitHub](<https://github.com/MystenLabs/sui/tree/main/crates/sui-sdk>)
  * [Documentation](<https://mystenlabs.github.io/sui/sui_sdk/index.html>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

Sui Rust SDK contains APIs to interact with Sui blockchain.

**Features**

  * [Supported operations](<https://arc.net/l/quote/gmkrkhqg>)
  * ⚠️ GraphQL is not supported yet
  * [Sui BCS types are supported](<https://github.com/MystenLabs/sui/blob/main/crates/sui-types/src/base_types.rs>)


#### Pysui

Python SDK to interact with Sui blockchain.

  * [GitHub](<https://github.com/FrankC01/pysui?tab=readme-ov-file>)
  * [Documentation](<https://pysui.readthedocs.io/en/latest/index.html>)
  * [Pypi](<https://pypi.org/project/pysui/>)
  * [Discord](<https://discord.gg/uCGYfY4Ph4>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

Python Client SDK for Sui blockchain

**Features**

  * [Supported features](<https://pysui.readthedocs.io/en/latest/index.html>)
  * GraphQL (beta) is supported.
  * [Sui BCS types are supported](<https://github.com/FrankC01/pysui/blob/main/pysui/sui/sui_types/bcs.py>)
  * [Pysui Gadgets](<https://github.com/FrankC01/pysui_gadgets>) \- Sui utilities built on top of Pysui


#### Sui Go SDK (SuiVision)

Golang SDK to interact with Sui blockchain.

  * [GitHub](<https://github.com/block-vision/sui-go-sdk>)
  * [API Documentation](<https://pkg.go.dev/github.com/block-vision/sui-go-sdk>)
  * [Examples](<https://github.com/block-vision/sui-go-sdk?tab=readme-ov-file#examples>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

The Sui-Go-SDK provided by BlockVision aims to offer access to all Sui RPC methods with Golang and also offers some additional features that make the integration easier. Sui-Go-SDK is designed for Sui in Go programming language.

**Features**

  * [Features](<https://github.com/block-vision/sui-go-sdk?tab=readme-ov-file#examples>)
  * ⚠️ GraphQL is not supported yet.


#### Sui Go SDK (Pattonkan)

Golang SDK to interact with Sui blockchain. Support PTB and devInspect.

  * [Github](<https://github.com/pattonkan/sui-go>)
  * [API Documentation](<https://pkg.go.dev/github.com/pattonkan/sui-go>)
  * [Examples](<https://github.com/pattonkan/sui-go/tree/main/examples>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

The go-sui tool from Pattonkan facilitates basic Sui interactions. Additionally, this SDK features cleaner type definitions, supports devInspect transactions, and includes PTB by default.

**Features**

  * [Features](<https://github.com/pattonkan/sui-go/tree/main/examples>)
  * [GraphQL](<https://github.com/pattonkan/sui-go/pull/118>) is supported.


#### Sui Dart SDK

Dart SDK to interact with Sui blockchain.

  * [GitHub](<https://github.com/mofalabs/sui>)
  * [API documentation](<https://pub.dev/documentation/sui/latest/>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

Dart Client SDK for Sui blockchain

**Features**

  * [Features](<https://github.com/mofalabs/sui?tab=readme-ov-file#usage>)
  * ⚠️ GraphQL is not supported yet.
  * [Sui BCS types are supported](<https://github.com/mofalabs/sui/tree/main/lib/bcs>)
  * [zkLogin SDK](<https://github.com/mofalabs/zklogin>)
  * ⚠️ [Deepbook SDK](<https://github.com/mofalabs/deepbook>) (not actively maintained)


#### Sui Kotlin SDK

Kotlin Multiplatform (KMP) SDK for integrating with the Sui blockchain.

  * [GitHub](<https://github.com/mcxross/ksui>)
  * [Documentation](<https://suicookbook.com>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

Kotlin Multiplatform (KMP) SDK for integrating with the Sui blockchain. It is designed to be a type-safe, client-configurable, and multiplatform SDK that can be used across different platforms such as Android, iOS, JS, and JVM. It is built on top of the KMM toolchain and is designed to be extensible and easy to use.

**Features**

  * [Features](<https://github.com/mcxross/ksui?tab=readme-ov-file#features>)
  * GraphQL is supported
  * [Sui BCS types are supported](<https://github.com/mcxross/ksui/tree/master/lib/src/commonMain/kotlin/xyz/mcxross/ksui/serializer>)


#### SuiKit (OpenDive)

Swift SDK natively designed to make developing for the Sui blockchain easy.

  * [GitHub](<https://github.com/opendive/suikit?tab=readme-ov-file>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

SuiKit is a Swift SDK natively designed to make developing for the Sui Blockchain easy.

**Features**

  * [Features](<https://github.com/OpenDive/SuiKit/tree/main?tab=readme-ov-file#features>)
  * ⚠️ `Bech32` encoded private key is not supported.
  * ⚠️ GraphQL is partially supported.
  * [Sui BCS types are supported](<https://github.com/OpenDive/SuiKit/tree/main/Sources/SuiKit/Types>)
  * ⚠️ [Kiosk is supported](<https://github.com/OpenDive/SuiKit/tree/main/Sources/SuiKit/Types/Structs/Kiosk>) (might not be actively maintained)
  * ⚠️ [SuiNS is supported](<https://github.com/OpenDive/SuiKit/tree/main/Sources/SuiKit/Types/Structs/SuiNS>) (might not be actively maintained)


#### Sui Unity SDK (OpenDive)

The OpenDive Sui Unity SDK is the first fully-featured Unity SDK with offline transaction building.

  * [GitHub](<https://github.com/OpenDive/Sui-Unity-SDK>)


##### Further Information​

**Tooling Category**

  * dApp Development
  * Explorer
  * IDE
  * Indexer
  * Oracle
  * SDK


**Description**

The OpenDive Sui Unity SDK is the first fully-featured Unity SDK with offline transaction building.

This means that games built with our SDK can directly craft custom Move calls without relying Sui's "unsafe" RPC calls under the [Transaction Builder API](<https://docs.sui.io/sui-api-ref#transaction-builder-api>) \-- which in turn reduces the number of RPC / Network requests.

**Features**

  * [Features](<https://github.com/OpenDive/Sui-Unity-SDK?tab=readme-ov-file#features>)
  * ⚠️ `Bech32` encoded private key is not supported.
  * ⚠️ GraphQL is not supported.
  * Sui BCS types are supported


#### Dubhe Client (Dubhe Engine)

Supports various platforms including browsers, Node.js, and game engine. It provides a simple interface to interact with your Sui Move contracts.

  * [GitHub](<https://github.com/0xobelisk/dubhe/tree/main/packages/sui-client>)
  * [Documentation](<https://dubhe.obelisk.build/dubhe/sui/client>)


### DeFi SDKs​

#### [NAVI Protocol SDK](<https://github.com/naviprotocol/navi-sdk>)

The NAVI TypeScript SDK Client provides tools for interacting with the Sui blockchain networks, designed for handling transactions, accounts, and smart contracts efficiently.

#### [Bucket Protocol SDK](<https://github.com/Bucket-Protocol/bucket-protocol-sdk>)

The TypeScript SDK for interacting with Bucket Protocol.

#### [Suilend SDK](<https://github.com/solendprotocol/suilend-public/tree/production/sdk>)

The TypeScript SDK for interacting with the Suilend program published on npm as [`@suilend/sdk`](<https://www.npmjs.com/package/@suilend/sdk>).

#### [Scallop SDK](<https://github.com/scallop-io/sui-scallop-sdk>)

The TypeScript SDK for interacting with the Scallop lending protocol on the Sui network.

#### [Cetus CLMM SDK](<https://github.com/CetusProtocol/cetus-clmm-sui-sdk>)

The official Cetus SDK specifically designed for seamless integration with Cetus-CLMM on Sui.

#### [Aftermath SDK](<https://github.com/AftermathFinance/aftermath-ts-sdk>)

The TypeScript SDK for interacting with Aftermath Protocol.

#### [FlowX SDK](<https://github.com/FlowX-Finance/sdk>)

The official FlowX TypeScript SDK that allows developers to interact with FlowX protocols using the TypeScript programming language.

#### [7k Aggregator SDK](<https://github.com/7k-ag/7k-sdk-ts>)

The TypeScript SDK for interacting with 7k Aggregator protocol.

#### [Hop Aggregator SDK](<https://docs.hop.ag/hop-sdk>)

The TypeScript SDK for interacting with Hop Aggregator.

### Client Libraries​

#### [BCS TypeScript (Mysten Labs)](<https://sdk.mystenlabs.com/bcs>)

BCS with TypeScript.

#### [BCS Rust](<https://github.com/zefchain/bcs>)

BCS with Rust.

#### [BCS Dart](<https://github.com/mofalabs/bcs>)

BCS with Dart.

#### BCS Kotlin

BCS with Kotlin.

  * [GitHub](<https://github.com/mcxross/kotlinx-serialization-bcs>)
  * [Documentation](<https://suicookbook.com/bcs.html>)


#### [BCS Swift](<https://github.com/OpenDive/SuiKit/tree/main/Sources/SuiKit/Utils/BCS>)

BCS with Swift.

#### [BCS Unity](<https://github.com/OpenDive/Sui-Unity-SDK/tree/main/Assets/Sui-Unity-SDK/Code/OpenDive.BCS>)

BCS with Unity C#.

#### [Sui Client Gen (Kuna Labs)](<https://github.com/kunalabs-io/sui-client-gen/tree/master>)

A tool for generating TS SDKs for Sui Move smart contracts. Supports code generation both for source code and on-chain packages with no IDLs or ABIs required.

#### [TypeMove (Sentio)](<https://github.com/sentioxyz/typemove/blob/main/packages/sui/Readme.md>)

Generate TypeScript bindings for Sui contracts.

#### Sui Wallet Standard (Mysten Labs)

A suite of standard utilities for implementing wallets and libraries based on the [Wallet Standard](<https://github.com/wallet-standard/wallet-standard/>).

  * [GitHub](<https://github.com/MystenLabs/sui/tree/main/sdk/wallet-standard>)
  * [Documentation](<https://docs.sui.io/standards/wallet-standard>)


#### [CoinMeta (Polymedia)](<https://github.com/juzybits/polymedia-coinmeta>)

Library for fetching coin metadata for Sui coins.

#### [Dubhe Client BCS Decoding (Dubhe Engine)](<https://github.com/0xobelisk/dubhe-docs/blob/main/pages/dubhe/sui/client.mdx#bcs-data-decoding>)

Library for supports automatic parsing of BCS types based on contract metadata information and automatic conversion formatting.

## dApp Development​

### dApp Toolkits​

#### [@mysten/create-dapp](<https://sdk.mystenlabs.com/dapp-kit/create-dapp>)

CLI tool that helps you create Sui dApp projects.

#### Sui dApp Kit (Mysten Labs)

Set of React components, hooks, and utilities to help you build a dApp for the Sui ecosystem.

  * [GitHub](<https://github.com/MystenLabs/sui/tree/main/sdk/dapp-kit>)
  * [Documentation](<https://sdk.mystenlabs.com/dapp-kit>)


#### Sui dApp Starter

Full-stack boilerplate which lets you scaffold a solid foundation for your Sui project and focus on the business logic of your dapp from day one.

  * [GitHub](<https://github.com/suiware/sui-dapp-starter?tab=readme-ov-file>)
  * [Documentation](<https://sui-dapp-starter.dev/docs/>)
  * [Demo app](<https://demo.sui-dapp-starter.dev/>)


#### Suiet Wallet Kit

React toolkit for aApps to interact with all wallet types in Sui easily.

  * [GitHub](<https://github.com/suiet/wallet-kit>)
  * [Documentation](<https://kit.suiet.app/docs/QuickStart>)


#### SmartKit

React library that allows your dapp to connect to the Sui network in a simple way.

  * [Homepage](<https://smartkit.vercel.app/>)
  * [GitHub](<https://github.com/heapup-tech/smartkit>)


#### [Sui Suitcase](<https://github.com/juzybits/polymedia-suitcase>)

Sui utilities for TypeScript, Node, and React.

#### [Sui MultiSig Toolkit (Mysten Labs)](<https://multisig-toolkit.vercel.app/offline-signer>)

Toolkit for transaction signing.

#### [Sui dApp Scaffold (Bucket Protocol)](<https://github.com/Bucket-Protocol/sui-dapp-scaffold-v1>)

A frontend scaffold for a decentralized application (dApp) on the Sui blockchain.

#### [Wormhole Kit (zktx.io)](<https://github.com/zktx-io/wormhole-kit-monorepo>)

React library that enables instant integration of Wormhole into your dapp.

#### SuiBase

Suibase makes it easy to create "workdirs", each defining a distinct development environment targeting a network.

  * [GitHub](<https://github.com/chainmovers/suibase>)
  * [Documentation](<https://suibase.io/>)


#### [create-dubhe (Dubhe Engine)](<https://github.com/0xobelisk/dubhe/tree/main/packages/create-dubhe>)

Create a new Dubhe project on Sui.

  * [Documentation](<https://dubhe.obelisk.build/dubhe/sui/quick-start>)


#### [Sui Tools](<https://sui-tools.vercel.app/ptb-generator>)

Scaffolding TypeScript PTBs for any on-chain function you might want to invoke.

#### [Enoki (Mysten Labs)](<https://docs.enoki.mystenlabs.com/>)

Make zkLogin and Sponsored Transactions more accessible.

#### [Sui Gas Pool (Mysten Labs)](<https://github.com/MystenLabs/sui-gas-pool>)

Service that powers sponsored transactions on Sui at scale.

#### [useSuiZkLogin](<https://github.com/pixelbrawlgames/use-sui-zklogin>)

React hook and functions for seamless zkLogin integration on Sui.

#### @suiware/kit

Opinionated React components and hooks for Sui dApps.

  * [Homepage](<https://kit.suiware.io/>)
  * [Documentation](<https://github.com/suiware/kit/tree/main/packages/kit#readme>)
  * [GitHub](<https://github.com/suiware/kit>)


#### React ZK Login Kit

Ready-to-use Component with Hook (sign-in + sign-transaction)

  * [GitHub](<https://github.com/denyskozak/react-sui-zk-login-kit>)
  * [YouTube Guide](<https://www.youtube.com/watch?v=2qnjmKg3ugY>)


### zkLogin​

#### [zkLogin Demo (Polymedia)](<https://github.com/juzybits/polymedia-zklogin-demo>)

#### [Sui zkLogin Demo by @jovicheng](<https://github.com/jovicheng/sui-zklogin-demo>)

#### [Sui zkWallet Demo by @ronanyeah](<https://github.com/ronanyeah/sui-zk-wallet>)

#### [zkLogin Demo using use-sui-zklogin by @pixelbrawlgames](<https://pixelbrawlgames.github.io/use-sui-zklogin/>)

#### [zkLogin Demo using react-zk-login-kit by @denyskozak](<https://demo.react-sui-zk-login.com>)

### Misc​

#### [`sui-sniffer`](<https://www.app.kriya.finance/sui-sniffer/>)

Checking security of Sui tokens.

#### RPC Tools (Polymedia)

A webapp that lets users find the fastest RPC for their location.

  * [GitHub](<https://github.com/juzybits/polymedia-rpcs>)
  * [Documentation](<https://rpcs.polymedia.app/>)


#### [Polymedia Commando (Polymedia)](<https://github.com/juzybits/polymedia-commando>)

Sui command line tools to help with Sui airdrops (send coins to many addresses), gather data from different sources (Sui RPCs, Indexer.xyz, Suiscan), and more.

#### [YubiSui (MystenLabs)](<https://github.com/MystenLabs/yubigen>)

Create a Sui Wallet inside a yubikey and sign Sui transactions with it.

#### [`sui-dapp-kit-theme-creator`](<https://sui-dapp-kit-theme-creator.app/>)

Build custom Sui dApp Kit themes.

#### [Minting Server (Mysten Labs)](<https://github.com/MystenLabs/minting-server>)

A scalable system architecture that can process multiple Sui transactions in parallel using a producer-consumer worker scheme.

#### [SuiInfra](<https://suinfra.io/>)

Provide users and developers with up-to-date recommendations on the ideal RPCs to use for their needs.

#### [Sui RPC Proxy](<https://github.com/SuiSec/sui-rpc-proxy>)

Monitor and analyze the network requests made by the Sui wallet application and Sui dApps.

#### [PTB Studio](<https://ptb.studio>)

Visual Programmable Transaction Block Builder.

  * [Documentation](<https://suicookbook.com/ptb-studio.html>)


#### [Indexer generator](<https://www.npmjs.com/package/sui-events-indexer>)

Code generating tool that will generate an indexer given a smart contract for all the events present. After that the user should remove unwanted events and fix the database schema and handlers (that write to the DB) according to their needs. The tool is written in typescript and uses prisma as an ORM.

* * *

info

This page has been truncated to stay within size limits. View the full list on the [Awesome Sui GitHub repo](<https://github.com/sui-foundation/awesome-sui/blob/main/README.md>).

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/awesome-sui.mdx>)

[PreviousGlossary](</references/sui-glossary>)[NextAwesome Sui Gaming](</references/awesome-sui-gaming>)

  * Move IDEs
    * Web IDEs
    * Desktop IDEs
    * IDE Utilities
  * Client SDKs & Libraries
    * Client SDKs
    * DeFi SDKs
    * Client Libraries
  * dApp Development
    * dApp Toolkits
    * zkLogin
    * Misc
