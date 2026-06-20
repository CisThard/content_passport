<!-- Source: https://docs.sui.io/references/cli -->

* [](</>)
  * Sui CLI


On this page

# Sui CLI

Sui provides a command line interface (CLI) tool to interact with the Sui network, its features, and the Move programming language. The complete suite of tools is called the Sui CLI, with commands grouped together by feature. Each group of commands is commonly referred to by its top-level command or utility: Sui Client CLI, Sui Keytool CLI, Sui Move CLI, Sui Completion CLI, and Sui Validator CLI.

## Check Sui CLI installation​

Before you can use the Sui CLI, you must install it. To check if the CLI exists on your system, open a terminal or console and type the following command:
[code] 
    $ sui --version  
    
[/code]

If the terminal or console responds with a version number, you already have the Sui CLI installed.

If the command is not found, follow the instructions in [Install Sui](</getting-started/onboarding/sui-install>) to get the Sui CLI on your system.

## Update CLI​

The recommended way to manage Sui CLI installations and versions is through `suiup`: <https://github.com/MystenLabs/suiup>.

info

The `tracing` feature is important because it adds Move test coverage and debugger support in the Sui CLI. Unless you enable it, you cannot use these two features.

## Sui CLI commands​

There are a number of top-level commands available. Use the `help` flag for the commands that are not documented yet. For example, `sui validator --help`.

  * **[Sui Client CLI](</references/cli/client>):** Use the `sui client` commands to interact with the Sui network.
  * **[Sui Client PTB CLI](</references/cli/ptb>):** Use the `sui client ptb` command to build and execute PTBs.
  * **[Sui Completion CLI](</references/cli/completion>):** Use the `sui completion` command to generate shell completion scripts.
  * **[Sui External Keys CLI](</references/cli/external-signers>):** Use the `sui external-keys` commands to manage keys on external hardware signers (Ledger, YubiKey).
  * **[Sui Keytool CLI](</references/cli/keytool>):** Use the `sui keytool` commands to access cryptography utilities.
  * **[Sui Move CLI](</references/cli/move>):** Use the `sui move` commands to work with the Move programming language.
  * **[Sui Replay CLI](</references/cli/replay>):** Use the `sui replay` command to replay a transaction and generate transaction traces for the Move Debugger and trace analysis tools.
  * **[Sui Validator CLI](</references/cli/validator>):** Use the `sui validator` commands to access tools useful for Sui validators.


[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/cli.mdx>)

[NextSui CLI Cheat Sheet](</references/cli/cheatsheet>)

  * Update CLI
  * Sui CLI commands
