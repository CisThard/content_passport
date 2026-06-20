<!-- Source: https://docs.sui.io/operators/validator/node-tools -->

* [](</>)
  * [Validators](</operators/validator/>)
  * Tools


On this page

# Validator Node Tools

This guide focuses on using the Sui CLI `validator` commands.

info

This tool supports only pending validators and active validators.

  * Prerequisites


  * Complete all [Sui installation prerequisites](</getting-started/onboarding/sui-install>).

  * Build the `sui` binary, which you need for the genesis ceremony. You can do this on any computer.


Click to open

View `sui` binary installation details.

  1. Clone the git repo:

`$ git clone git@github.com:MystenLabs/sui.git && cd sui`

  2. Check out the commit to use for Testnet:

`$ git checkout testnet`

  3. Build `sui` binary

`$ cargo build --bin sui`

  4. Remember the path to your binary:

`$ export SUI_BINARY="$(pwd)/target/debug/sui"`


  * Set up your Sui account and CLI environment.


Click to open

View Sui account and CLI environment instructions.

  * If this is the first time running this program, it asks you to provide a Sui full node server URL and a meaningful environment alias. It also generates a random key pair in `sui.keystore` and a config `client.yaml`. Swap in your validator account key if you already have one.

By default, the `client.yaml` and `sui.keystore` files are located in `~/.sui/sui_config`. For more information, refer to the [Sui client CLI tutorial](</references/cli/client>).
[code] $ sui client  
        
[/code]

  * If you already set it up, just make sure:

    * `rpc` is correct in `client.yaml`.
    * `active_address` is correct in `client.yaml`.
    * `sui.keystore` contains your account key pair.


  * Test your network connection and configuration by displaying your validator information:


[code]
    $ sui validator display-metadata  
    
[/code]

## Using Sui CLI​

Use the Sui CLI to perform validator tasks.

### Print help information​
[code] 
    $ sui validator --help  
    
[/code]

### Become a validator or join committee​

To become a validator candidate, first run:
[code] 
    $ sui validator make-validator-info <name> <description> <image-url> <project-url> <host-name> <gas_price>  
    
[/code]

This generates a `validator.info` file and key pair files. The output of this command includes:

  1. Four [key pair files](</operators/validator/validator-tasks#key-management>). **Set their permissions with the minimal visibility (`chmod 600`, for example) and store them securely**. You need them when running the validator node. a. If you follow this guide thoroughly, this key pair is actually copied from your `sui.keystore` file.
  2. `validator.info` file that contains your validator information. Double-check that all information is correct.


Then run:
[code] 
    $ sui validator become-candidate path/to/validator.info  
    
[/code]

This submits an onchain transaction for you to become a validator candidate. The parameter is the file path to the `validator.info` file you generated in the previous step. **Make sure the transaction succeeds (printed in the output).**

At this point, you are a validator candidate and can start to accept self-staking and delegated staking.

If you have not already, start a full node now to catch up with the network. When you officially join the committee but are not fully up-to-date, you cannot make meaningful contributions to the network and might be subject to peer reporting. This imposes the risk of reduced staking rewards for you and your delegators.

Then, you must acquire 30M SUI and stake it to the validator staking pool. You can add Sui to the validator staking pool with the command:
[code] 
    $ sui client call --package 0x3 --module sui_system --function request_add_stake --args 0x5 {sui_object_id} {validator_address}  
    
[/code]

This creates a stake object (of type `0x3::staking_pool::StakedSui`). You can withdraw this object with the following command:
[code] 
    $ sui client call --package 0x3 --module sui_system --function request_withdraw_stake --args 0x5 {stake_object_id}  
    
[/code]

tip

You cannot withdraw non-activated stake from an inactive validator. If that is the case, you can withdraw after the next epoch change when the stake becomes active.

After you have staked enough, run:
[code] 
    $ sui validator join-committee  
    
[/code]

Joining the committee makes you a pending validator. A pending validator becomes active and joins the committee starting from the next epoch.

### Leave committee​

To leave the committee, run:
[code] 
    $ sui validator leave-committee  
    
[/code]

The network removes you from the committee starting from the next epoch.

### Proof of possession: Generate the payload​

Serialize the payload that you use to generate proof of possession. This allows the signer to take the payload offline for an authority protocol BLS key pair to sign.
[code] 
    $ sui validator serialize-payload-pop --account-address $ACCOUNT_ADDRESS --protocol-public-key $BLS_PUBKEY  
    
[/code]
[code] 
    Serialized payload: $PAYLOAD_TO_SIGN  
    
[/code]

### Display validator metadata​

Display metadata about your local validator:
[code] 
    $ sui validator display-metadata  
    
[/code]

Display metadata about another validator through its validator address:
[code] 
    $ sui validator display-metadata <validator-address>  
    
[/code]

### Update validator metadata​

Run the following to see how to update validator metadata. Read the description carefully about when the change takes effect.
[code] 
    $ sui validator update-metadata --help  
    
[/code]

You can update the following onchain metadata:

  * Name
  * Description
  * Image URL
  * Project URL
  * Network address
  * P2P address
  * Primary address
  * Worker address
  * Protocol public key
  * Network public key
  * Worker public key


info

Only the first four metadata listed above take effect immediately. The others change only after the next epoch. For those, restart the validator program immediately after the next epoch, with the new key files and updated `validator.yaml` config.

Make sure the new address is not behind a firewall.

Run the following to see how to update each metadata field.
[code] 
    $ sui validator update-metadata --help  
    
[/code]

### Operation Cap​

Operation Cap allows a validator to authorize another account to perform certain actions on behalf of this validator. [Learn more about Operation Cap](</operators/validator/validator-tasks#operation-cap>).

The Operation Cap holder (either the validator itself or the delegatee) updates its gas price and reports validator peers with the Operation Cap.

### Update gas price​

If your account is a validator and holds the Operation Cap, update the gas price with:
[code] 
    $ sui validator update-gas-price <gas-price>  
    
[/code]

If your account is a delegatee:
[code] 
    $ sui validator update-gas-price --operation-cap-id <operation-cap-id> <gas-price>  
    
[/code]

### Report validators​

If your account is a validator and holds the Operation Cap, report validator peers with:
[code] 
    $ sui validator report-validator <reportee-address>  
    
[/code]

Add the `--undo-report false` argument if you intend to undo an existing report.

Similarly, if your account is a delegatee, add the `--operation-cap-id <operation-cap-id>` option to the command.

If your account is a delegatee, run:
[code] 
    $ sui validator update-gas-price --operation-cap-id <operation-cap-id> <gas-price>  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/operators/validator/node-tools.mdx>)

[PreviousManagement](</operators/validator/validator-tasks>)[NextRewards](</operators/validator/validator-rewards>)

  * Using Sui CLI
    * Print help information
    * Become a validator or join committee
    * Leave committee
    * Proof of possession: Generate the payload
    * Display validator metadata
    * Update validator metadata
    * Operation Cap
    * Update gas price
    * Report validators
