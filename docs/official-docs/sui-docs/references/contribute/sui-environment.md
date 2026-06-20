<!-- Source: https://docs.sui.io/references/contribute/sui-environment -->

* [](</>)
  * [Contribute](</references/contribute/contribution-process>)
  * Sui Environment Setup


On this page

# Sui Environment Setup

Before you start developing with Sui and Move, you should familiarize yourself with how to contribute to Sui, how Sui is structured, what tools and SDKs exist, and what plugins are available to use in your IDE.

## Fork the Sui repository​

The recommended way to contribute to the Sui repository is to fork the project, make changes on your fork, then submit a pull request (PR). The Sui repository is available on GitHub: <https://github.com/MystenLabs/sui>.

To create a local Sui repository:

  1. Go to the [Sui repository](<https://github.com/MystenLabs/sui>) on GitHub.

  2. Click the **Fork** button to create a copy of the repository in your account.

![Fork Sui repo](data:image/png;base64,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)

  3. In your forked repository on GitHub, click the green `Code <>` button and copy the **HTTPS** URL GitHub provides.

![Copy URL](/assets/images/gh-url-ee80fb7d30edd9a2722b4d2cbd0a34fc.png)

  4. Open a terminal or console on your system at the location you want to save the repository locally. Type `git clone ` and paste the URL you copied in the previous step and press `Enter`.

  5. Type `cd sui` to make `sui` the active directory.


You can use any [branching strategy](<https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-and-deleting-branches-within-your-repository>) you prefer on your Sui fork. Make your changes locally and push to your repository, submitting PRs to the official Sui repository from your fork as needed.

tip

Be sure to synchronize your fork frequently to keep it up-to-date with active development.

## Sui repository and how to contribute​

The Sui repo is a monorepo, containing all the source code that is used to build and run the Sui network, as well as this documentation.

The root folder of the Sui monorepo has the following top-level folders:

  * [apps](<https://github.com/MystenLabs/apps>): Contains the source code for the main web applications that Mysten Labs runs.
  * [consensus](<https://github.com/MystenLabs/sui/tree/main/consensus>): Contains the source code of consensus.
  * [crates](<https://github.com/MystenLabs/sui/tree/main/crates>): Contains all the Rust crates that are part of the Sui system.
  * [dapps](<https://github.com/MystenLabs/sui/tree/main/dapps>): Contains some examples of decentralized applications built on top of Sui, such as Kiosk or Sponsored Transactions.
  * [dashboards](<https://github.com/MystenLabs/sui/tree/main/dashboards>): Currently empty.
  * [doc](<https://github.com/MystenLabs/sui/tree/main/doc>): Contains deprecated documentation related to Move and Sui.
  * [docker](<https://github.com/MystenLabs/sui/tree/main/docker>): Contains the docker files needed to spin up a node, an indexer, a full node or other services.
  * [docs](<https://github.com/MystenLabs/sui/tree/main/docs>): Contains this documentation and the source for this site.
  * [examples](<https://github.com/MystenLabs/sui/tree/main/examples>): Contains examples of apps written for Sui and smart contracts written in Move.
  * [external-crates](<https://github.com/MystenLabs/sui/tree/main/external-crates>): Contains the source code for the Move programming language.
  * [kiosk](<https://github.com/MystenLabs/sui/tree/main/kiosk>): Contains the source code of the Mysten Labs Kiosk extensions and rules, as well as examples.
  * [nre](<https://github.com/MystenLabs/sui/tree/main/nre>): Contains information about node and network reliability engineering.
  * [scripts](<https://github.com/MystenLabs/sui/tree/main/scripts>): Contains a number of scripts that are used internally.
  * [sui-execution](<https://github.com/MystenLabs/sui/tree/main/sui-execution>): Contains the source code responsible for abstracting access to the execution layer.


The following primary directories offer a good starting point for exploring the Sui codebase:

  * [move](<https://github.com/MystenLabs/sui/tree/main/external-crates/move>): Move VM, compiler, and tools.
  * [consensus](<https://github.com/MystenLabs/sui/tree/main/consensus>): Consensus engine.
  * [typescript-sdk](<https://github.com/MystenLabs/ts-sdks/tree/main/packages/typescript/>): Sui TypeScript SDK.
  * [wallet](<https://chromewebstore.google.com/detail/slush-%E2%80%94-a-sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil>): Chrome extension wallet for Sui.
  * [sui](<https://github.com/MystenLabs/sui/tree/main/crates/sui>): Sui command line tool.
  * [sui-core](<https://github.com/MystenLabs/sui/tree/main/crates/sui-core>): Core Sui components.
  * [sui-execution](<https://github.com/MystenLabs/sui/tree/main/sui-execution>): Execution Layer (programmable transactions, execution integration).
  * [sui-framework](<https://github.com/MystenLabs/sui/tree/main/crates/sui-framework>): Move system packages (0x1, 0x2, 0x3, 0xdee9).
  * [sui-network](<https://github.com/MystenLabs/sui/tree/main/crates/sui-network>): Networking interfaces.
  * [sui-node](<https://github.com/MystenLabs/sui/tree/main/crates/sui-node>): Validator and full node software.
  * [sui-protocol-config](<https://github.com/MystenLabs/sui/tree/main/crates/sui-protocol-config>): Onchain system configuration and limits.
  * [sui-rust-sdk](<https://github.com/MystenLabs/sui-rust-sdk>): Sui Rust SDK.
  * [sui-types](<https://github.com/MystenLabs/sui/tree/main/crates/sui-types>): Sui object types, such as coins and gas.


## Development branches​

The Sui repository includes four primary branches: `devnet`, `testnet`, `mainnet`, and `main`.

The `devnet` branch includes the latest stable build of Sui. Choose the `devnet` branch if you want to build or test on Sui Devnet. If you encounter an issue or find a bug, it might already be fixed in the `main` branch. To submit a PR, you should push commits to your fork of the `main` branch.

The `testnet` branch includes the code running on the Sui Testnet network.

The `mainnet` branch includes the code running on the Sui Mainnet network.

The `main` branch includes the most recent changes and updates. Use the `main` branch if you want to contribute to the Sui project or to experiment with cutting-edge functionality. The `main` branch might include unreleased changes and experimental features, so use it at your own risk.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/contribute/sui-environment.mdx>)

[PreviousDocs Contribution](</references/contribute/contribution-process>)[NextContribute to Sui Repositories](</references/contribute/contribute-to-sui-repos>)

  * Fork the Sui repository
  * Sui repository and how to contribute
  * Development branches
