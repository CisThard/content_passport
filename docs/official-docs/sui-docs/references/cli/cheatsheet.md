<!-- Source: https://docs.sui.io/references/cli/cheatsheet -->

* [](</>)
  * [Sui CLI](</references/cli>)
  * Sui CLI Cheat Sheet


On this page

# Sui CLI Cheat Sheet

The cheat sheet highlights common Sui CLI commands.

tip

[Download sheet as PDF](</doc/sui-cli-cheatsheet.pdf>)

## Addresses and aliases​

Command| Description  
---|---  
`sui client active-address`| Get the active address  
`sui client addresses`| List the addresses, their aliases, and the active address  
`sui client new-address ed25519`| Create a new address with ED25519 scheme  
`sui client new-address ed25519 MY_ALIAS`| Create a new address with ED25519 scheme and alias  
`sui client switch --address ADDRESS`| Make this the active address (accepts also an alias)  
`sui keytool convert PRIVATE_KEY`| Convert private key in Hex or Base64 to new format (Bech32 encoded 33 byte flag || private key starting with "suiprivkey")  
`sui keytool generate ed25519`| Generate a new keypair with ED25519 scheme and save it to file  
`sui keytool import INPUT KEY_SCHEME`| Add a new key to Sui CLI Keystore using either the input mnemonic phrase or a Bech32 encoded 33-byte flag || privkey starting with "suiprivkey"  
`sui keytool update-alias OLD_ALIAS NEW_ALIAS`| Update the alias of an address  
  
## Faucet and gas​

Command| Description  
---|---  
`sui client faucet`| Get a SUI coin from the faucet associated with the active network  
`sui client faucet --address ADDRESS`| Get a SUI coin for the address (accepts also an alias)  
`sui client faucet --url CUSTOM_FAUCET_URL`| Get a SUI coin from custom faucet  
`sui client gas`| List the gas coins for the active address  
`sui client gas ADDRESS`| List the gas coins for the given address (accepts also an alias)  
  
## Network command description​

Command| Description  
---|---  
`sui client active-env`| Get the active environment  
`sui client envs`| List defined environments  
`sui client new-env --rpc URL --alias ALIAS`| Create a new environment with URL and alias  
`sui client switch --env ENV_ALIAS`| Switch to the given environment  
`sui genesis`| Bootstrap and initialize a new Sui network  
`sui start`| Start the local Sui network  
`sui-faucet`| Start a local faucet (this is a different binary)  
  
## Create, build, and test a Move project​

Command| Description  
---|---  
`sui move build`| Build the Move project in the current directory  
`sui move build --path PATH`| Build the Move project from the given path  
`sui move migrate PATH`| Migrate to Move 2024 for the package at provided path  
`sui move new PROJECT_NAME`| Create a new Move project in the given folder  
`sui move test`| Test the Move project in the current directory  
`sui move test --trace`| Create an execution trace for the Move tests in the current directory. Use with the [Move Trace Debugger](<https://marketplace.visualstudio.com/items?itemName=mysten.move-trace-debug>) extension.  
  
## Executing transactions​

Command| Description  
---|---  
`sui client call \`  
`--package PACKAGE \`  
`--module MODULE \`  
`--function FUNCTION`| Call a Move package  
`sui client ptb \`  
`--merge-coins @PRIMARY_COIN_ID \`  
`"[@COIN_ID]"`| Merge one or more coins into a primary coin  
`sui client ptb \`  
`--split-coins @COIN_ID \`  
`"[1000]"`| Split a coin into two coins: one with 1000 MIST and the rest  
`sui client ptb \`  
`--split-coins gas "[100000000]" \`  
`--assign coin \`  
`--transfer-objects "[coin]" ADDRESS`| Transfer 0.1 SUI to an address using the gas coin  
`sui client ptb \`  
`--transfer-objects "[gas]" ADDRESS`| Transfer the full gas coin balance to an address  
  
## Programmable transaction blocks (PTBs)​

Command| Description  
---|---  
`sui client ptb --move-call p::m::f "<type>" args`| Call a Move function from a package and module  
`sui client ptb --make-move-vec "<u64>" "[1000,2000]"`| Make a Move vector with two elements of type u64  
`sui client ptb \`  
`--split-coins gas "[1000]" \`  
`--assign new_coins \`  
`--transfer-objects "[new_coins]" ADDRESS`| Split a gas coin and transfer it to address  
`sui client ptb --transfer-objects "[object_id]" ADDRESS`| Transfer an object to an address. You can pass multiple objects in the array  
`sui client ptb \`  
`--move-call sui::tx_context::sender \`  
`--assign sender \`  
`--publish "." \`  
`--assign upgrade_cap \`  
`--transfer-objects "[upgrade_cap]" sender`| Publish a Move package, and transfer the upgrade capability to sender  
`sui client ptb --move-call p::m::f "<type>" args --dry-run`| Simulate a PTB execution without committing the transaction  
`sui client ptb --move-call p::m::f "<type>" args --preview`| Preview PTB commands instead of executing the transaction  
`sui client ptb --move-call p::m::f "<type>" args --summary`| Show a short summary for a PTB (digest, status, gas cost)  
`sui client ptb \`  
`--move-call p::m::f "<type>" args \`  
`--serialize-unsigned-transaction`| Serialize the unsigned PTB as base64 instead of executing it  
  
[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/cli/cheatsheet.mdx>)

[PreviousSui CLI](</references/cli>)[NextSui Client CLI](</references/cli/client>)

  * Addresses and aliases
  * Faucet and gas
  * Network command description
  * Create, build, and test a Move project
  * Executing transactions
  * Programmable transaction blocks (PTBs)
