<!-- Source: https://seal-docs.wal.app/KeyServerCommitteeOps -->

* [](</>)
  * Operator Guide
  * Key Server Operations for Decentralized Server Type


On this page

# Key Server Operations for Decentralized Server Type

This guide explains how to set up and operate a key server as a decentralized server type. For an overview of decentralized vs independent server types, see [Seal Server Overview](</ServerOverview>).

## Overviewâ

Decentralized key server type embeds distributed key trust directly into the infrastructure layer. To your application, it looks like a single logical key server. Internally, it enforces threshold cryptography across multiple independent operators.

Any group of operators can set up a committee â there is no central authority or permission required. Operators participate in a Distributed Key Generation (DKG) ceremony that produces distributed key shares. Each operator runs a key server that holds only its partial share. No single operator ever holds the full master key.

In addition to setting up the members of a decentralized key server, an **[aggregator server](</Aggregator>)** setup is also required. The aggregator collects encrypted partial responses from operators and combines them into a single encrypted result for clients. Because the aggregator is trustless and holds no key material, it can be operated by anyone, including a third party.

**What you 'll learn:**

  * How to run a fresh DKG to bootstrap a new committee and generate the initial key shares
  * How to configure and start a key server for a committee member
  * How to perform coordinated rotation ceremonies to update membership while preserving the same public key and object ID
  * How to update a running key server to use the new key share after rotation


**How DKG works:**

The DKG process involves two roles: a **coordinator** that orchestrates the workflow, and **committee members** that participate in key generation and rotation. Both fresh DKG and key rotation follow the same three-phase process:

  * **Phase A â Registration:** Members generate encryption keys and register them onchain
  * **Phase B â Message creation:** Members create and exchange DKG messages off-chain
  * **Phase C â Finalization:** Members process messages and propose the committee configuration onchain


The coordinator signals members when to move from one phase to the next.

**Guide organization:**

  * Fresh DKG coordinator runbook
  * Fresh DKG member runbook (includes key server setup)
  * Key rotation coordinator runbook
  * Key rotation member runbook (includes key server configuration updates)


## Prerequisitesâ

Before running the DKG or key rotation workflows, both the coordinator and all committee members must complete the following steps.

  1. Establish a trusted communication channel (e.g. group chat, email) with all other participants. This channel is used for the coordinator and members to share files at certain steps of the workflow, for the coordinator to announce phase transitions, and to verify each other's onchain addresses. Address verification can also happen onchain (for example, via a governance action).

  2. Install Sui by following the [official installation guide](<https://docs.sui.io/guides/developer/getting-started/sui-install>).


[code] 
    sui --version  
    
[/code]

  3. Make sure you have a CLI wallet ready on the expected network with gas. This is the address you will use throughout the rest of the workflows, and the one you should share with the group for verification.


[code] 
    sui client active-env  
    sui client active-address  
    sui client gas  
      
    # to create new wallet  
    sui client new-address ed25519  
      
    # switch if needed  
    sui client switch --env testnet  
    sui client switch --address 0x...  
      
    # to fund wallet gas on testnet: faucet.sui.io  
    
[/code]

  4. Clone the [Seal repository](<https://github.com/MystenLabs/seal>) and set it as your working directory.


[code] 
    git clone https://github.com/MystenLabs/seal.git  
    cd seal  
    
[/code]

  5. Build the seal-committee-cli tool.


[code] 
    cargo run --bin seal-committee-cli -- --help  
    
[/code]

## Fresh DKG processâ

### Fresh DKG coordinator runbookâ

Follow these steps to initialize a new multi-party computation (MPC) committee using a fresh DKG.

  1. **Prepare DKG configuration**


a. Make sure your CLI has the expected network and active address with gas.
[code] 
    sui client active-env  
    sui client active-address  
      
    # switch if needed  
    sui client switch --env testnet  
    sui client switch --address 0x...  
    
[/code]

b. Create a clean working directory named `dkg-state` and copy the example configuration file:
[code] 
    # in seal/  
    rm -rf dkg-state && mkdir dkg-state  
    cp crates/seal-committee-cli/dkg.example.yaml dkg-state/dkg.yaml  
    
[/code]

c. Collect the onchain addresses of all participating members. Then open `dkg-state/dkg.yaml` and update the following fields:
[code] 
    init-params:  
      NETWORK: Testnet # Target network  
      THRESHOLD: 2 # Committee threshold (t of n)  
      MEMBERS: # Addresses of all participating members  
        - 0x...  
        - 0x...  
        - 0x...  
    
[/code]

  2. **Publish and initialize the committee**


Run the publish-and-init command:
[code] 
    cargo run --bin seal-committee-cli -- publish-and-init  
    
[/code]

This command:

  * Publishes the `seal_committee` package onchain with upgrade capability
  * Extracts the UpgradeCap from the publish transaction
  * Initializes the committee state and attaches the UpgradeManager (which holds the UpgradeCap) to the committee
  * Appends the committee identifiers to `dkg.yaml`


For example:
[code] 
    publish-and-init:  
      COMMITTEE_PKG: 0x5b788ac96879a752afbd3608a202207d75cf0f03387bcb744bfb4930cc544a70  
      COMMITTEE_ID: 0x55241859c52f51dd149763769b8aa1e54de39b55acacda3f3a67629691247985  
      COORDINATOR_ADDRESS: 0xef91ea73b4423e3a6176b0a1c9c6e4619de45c9c4e7c0b4aae358e292707d8c2  
    
[/code]

  3. **Distribute configuration and notify Phase A (Registration)**


Share the updated `dkg.yaml` file with all committee members. Notify members to begin **Phase A (Registration)**.

  4. **Monitor member registration**


Check onchain registration status:
[code] 
    cargo run --bin seal-committee-cli -- check-committee  
    
[/code]

The output shows which members have registered and which are still pending. Wait until all are registered.

  5. **Notify Phase B (Message creation)**


Once all members are registered:

  * Notify members to begin **Phase B (Message creation)**.
  * Monitor the off-chain storage (e.g. group chat) until all members upload their DKG message files.


  6. **Collect and share DKG messages and notify Phase C (Finalization)**


Collect message files into a single directory and share it with members. The number of messages must equal exactly the total number of committee members.
[code] 
    rm -rf dkg-messages && mkdir dkg-messages  
    mv path/to/message_0.json dkg-messages/  
    mv path/to/message_1.json dkg-messages/  
    # repeat until all n members have contributed a message  
    
[/code]

Notify members to begin **Phase C (Finalization)**.

  7. **Confirm committee finalization**


Monitor onchain state until all members have proposed and the committee is finalized:
[code] 
    cargo run --bin seal-committee-cli -- check-committee  
    
[/code]

When finalization completes, the output includes the `KEY_SERVER_OBJ_ID`. Share this object ID with all members so they can configure their key servers.

  8. **Verify partial public keys and collect API keys for the[aggregator server](</Aggregator>)**


After all committee members have their key servers running, ask each member to send you the full curl request and response from the `/v1/debug/committee_partial_pk` endpoint (this includes their API key name and key).

Confirm that the `partial_pk` returned in their curl response matches the onchain partial public key for their address. The onchain partial public keys for the committee can be fetched:
[code] 
    cargo run --bin seal-committee-cli -- check-committee  
    
[/code]

If they are mismatched, ask the member to double check the `MASTER_SHARE_V0` environment variable.

Then collect and share the following with the aggregator operator:

  * API credentials for each committee member, including:
    * The onchain server name (the `PartialKeyServer.name` field)
    * The API key name
    * The API key
  * The committee's `KEY_SERVER_OBJ_ID` from the previous step.


With this information, the aggregator operator can add each key server to the aggregator configuration and run the aggregator server. For configuration and startup instructions, see [Aggregator Server](</Aggregator>).

### Fresh DKG member runbookâ

Follow these steps to participate as a member in a fresh DKG.

  1. **Share your address with the coordinator**


Share your wallet address (`MY_ADDRESS`) with the coordinator. This address is used for all onchain actions during the DKG.

Make sure:

  * Your wallet is connected to the correct network.
  * You have enough gas to submit transactions.


[code] 
    # check values  
    sui client active-address  
    sui client active-env  
    sui client gas  
      
    # switch values if needed  
    sui client switch --address <MY_ADDRESS>  
    sui client switch --env testnet  
    
[/code]

  2. **Generate keys and register (Phase A: Registration)**


a. Wait for the coordinator to announce **Phase A (Registration)** and send you the `dkg.yaml` file containing `COMMITTEE_PKG` and `COMMITTEE_ID`. Create a local working directory named `dkg-state` and move the file there:
[code] 
    # in seal/  
    rm -rf dkg-state && mkdir dkg-state  
    mv path/to/dkg.yaml dkg-state/  
    
[/code]

b. Look up the committee object ID on a Sui Explorer and verify that its member addresses and threshold match both `dkg.yaml` and the addresses shared in the trusted communication channel.

c. Then run the command to generate your keys and register them onchain by providing your server URL and name:
[code] 
    cargo run --bin seal-committee-cli -- genkey-and-register \  
      -u <YOUR_SERVER_URL> \  
      -n <YOUR_SERVER_NAME>  
    
[/code]

To print the unsigned transaction data, add `--sender-address <MY_ADDRESS> --unsigned`. Sign and execute the transaction elsewhere to complete this phase.

This command:

  * Generates DKG key material and stores it in `dkg-state/`. Keep this directory secure.
  * Appends `DKG_ENC_PK`, `DKG_SIGNING_PK`, `MY_SERVER_URL`, `MY_SERVER_NAME`, and `MY_ADDRESS` (from `sui client active-address`) to `dkg.yaml`.
  * Registers your public keys onchain.


  3. **Create and share your DKG message (Phase B: Message creation)**


a. Wait for the coordinator to announce **Phase B (Message creation)**. Then initialize your local DKG state and generate your message file:
[code] 
    cargo run --bin seal-committee-cli -- create-message  
    
[/code]

This command outputs a file named `dkg-state/message_P.json`, where `P` is your party ID.

b. Share this file with the coordinator.

  4. **Process messages and propose the committee (Phase C: Finalization)**


Wait for the coordinator to announce **Phase C (Finalization)** and provide a directory containing messages (for example, `path/to/dkg-messages`).

Move the directory into `dkg-state` and process the messages:
[code] 
    mv path/to/dkg-messages dkg-state/  
      
    cargo run --bin seal-committee-cli -- process-all-and-propose  
    
[/code]

To print the unsigned transaction data, add `--sender-address <MY_ADDRESS> --unsigned`. Sign and execute the transaction elsewhere to complete this phase.

This command:

  * Processes all DKG messages from the directory.
  * Appends the following fields to `dkg.yaml`:
    * `KEY_SERVER_PK`: New key server public key.
    * `PARTIAL_PKS_V0`: Partial public keys for all members.
    * `MASTER_SHARE_V0`: Your master share, used to start the key server. Back it up securely and do not share it with anyone.
  * Proposes the committee onchain by calling the `propose` function.


  5. **Configure and start your key server**


a. Wait for the coordinator to confirm that the DKG is complete and share the `KEY_SERVER_OBJ_ID`.

b. Create a `key-server-config.yaml` file with your address (`MY_ADDRESS`) and the key server object ID (`KEY_SERVER_OBJ_ID`), and set the committee state to active:

Example config file:
[code] 
    network: Testnet  
    server_mode: !Committee  
      member_address: '<MY_ADDRESS>'  
      key_server_obj_id: '<KEY_SERVER_OBJ_ID>'  
      committee_state: !Active  
    
[/code]

c. Start the key server, setting the config path and your master key share from `dkg.yaml` (use `MASTER_SHARE_V0` for a fresh DKG):
[code] 
    CONFIG_PATH=crates/key-server/key-server-config.yaml MASTER_SHARE_V0=0x... cargo run --bin key-server  
    
[/code]

For infrastructure and deployment recommendations, see Infrastructure requirements.

  6. **Generate API credentials for the[aggregator](</Aggregator>)**


After your key server is running successfully, generate an **API key name** and **API key** for your key server. These credentials let the aggregator authenticate its requests to your key server.

  7. **Share your credentials and verify your partial public key**


Query your server's debug endpoint using the API credentials you just generated:
[code] 
    curl -H "<YOUR_API_KEY_NAME>:<YOUR_API_KEY>" \  
      -H "Client-Sdk-Version: 0.6.0" \  
      -H "Content-Type: application/json" \  
      https://<YOUR_SERVER_URL>/v1/debug/committee_partial_pk  
    
[/code]

Send the coordinator the full curl request and response (which include your API key name and key). The coordinator uses these to verify your partial public key against the onchain value and to configure the aggregator.

  8. **Enable metrics push (Optional)**


If a metrics collector is configured, wait for the coordinator to share a `metrics_push_config` block containing a `bearer_token` and `push_url`. Add it to your `key-server-config.yaml` and restart your server to begin pushing metrics:
[code] 
    metrics_push_config:  
      bearer_token: '<BEARER_TOKEN>'  
      push_url: '<PUSH_URL>'  
    
[/code]

  9. **Backup and clean up local DKG state**


Once your key server is running successfully, back up the `MASTER_SHARE_V0` value. Then you can safely delete the local DKG state directory:
[code] 
    rm -rf dkg-state  
    
[/code]

## Key rotation processâ

Use key rotation to update the committee membership. When rotating a committee, the set of continuing members, including those present in both the current and next committee, must be large enough to meet the threshold of the current committee.

This guide assumes:

  * The current committee version is `X`, and
  * The rotation produces the next committee version `X+1`.


### Key rotation coordinator runbookâ

  1. **Prepare DKG configuration**


a. Make sure your CLI has the expected network and active address with gas.
[code] 
    sui client active-env  
    sui client active-address  
      
    # switch if needed  
    sui client switch --env testnet  
    sui client switch --address 0x...  
    
[/code]

b. Create a clean working directory named `dkg-state` and copy the rotation example configuration:
[code] 
    # in seal/  
    rm -rf dkg-state && mkdir dkg-state  
    cp crates/seal-committee-cli/dkg-rotation.example.yaml dkg-state/dkg.yaml  
    
[/code]

c. Collect the addresses of all members in the **new committee** (including continuing members). Open `dkg-state/dkg.yaml` and update the following fields.

You can obtain `KEY_SERVER_OBJ_ID` from the key server configuration of any continuing member in the current committee.
[code] 
    init-params:  
      NETWORK: Testnet # Target network  
      THRESHOLD: 3  # Threshold for the new committee (t of n)  
      MEMBERS:  # New committee members (may include continuing members)  
        - 0x...  
        - 0x...  
        - 0x...  
        - 0x...  
      
    # Rotation only params  
    init-rotation-params:  
      KEY_SERVER_OBJ_ID: 0x...  # Key server object ID from the current committee  
    
[/code]

  2. **Initialize the rotation**


[code] 
    cargo run --bin seal-committee-cli -- init-rotation  
    
[/code]

This command:

  * Fetches the current key server object to determine the existing committee ID and package ID.
  * Initializes the new committee object onchain.
  * Appends the following fields to the `init-rotation` section in `dkg.yaml`:
    * `COORDINATOR_ADDRESS`: Address executing the rotation
    * `COMMITTEE_PKG`: Package ID of the committee contract
    * `CURRENT_COMMITTEE_ID`: Current committee object ID
    * `COMMITTEE_ID`: New committee object ID


  3. **Distribute configuration and notify Phase A (Registration)**


Share the updated `dkg.yaml` file with all committee members. Notify members to begin **Phase A (Registration)**.

  4. **Monitor member registration**


Check onchain registration status:
[code] 
    cargo run --bin seal-committee-cli -- check-committee  
    
[/code]

The output shows which members have registered and which are still pending. Wait until all are registered.

  5. **Notify Phase B (Message creation)**


Once all members are registered:

  * Notify members to begin **Phase B (Message creation)**.
  * Monitor the offchain storage (for example, group chat) until continuing members have uploaded exactly the old committee threshold number of DKG message files. New members run `init-state` and do not upload message files.


  6. **Collect and share DKG messages and notify Phase C (Finalization)**


a. Collect message files into a single directory and share it with members. The number of messages must equal exactly the threshold of the current committee.
[code] 
    rm -rf dkg-messages && mkdir dkg-messages  
    mv path/to/message_0.json dkg-messages/  
    mv path/to/message_1.json dkg-messages/  
    # repeat till the number of messages equals the threshold  
    
[/code]

b. Notify members to begin **Phase C (Finalization)**.

c. Remind members that the current committee is at version `X` (e.g. 0) and it is rotating to target version `X+1` (e.g. 1). This is used to annotate `MASTER_SHARE_VX` and `MASTER_SHARE_VX+1` in the member commands.

  7. **Confirm committee finalization**


Monitor onchain state until all members have proposed and the committee is finalized:
[code] 
    cargo run --bin seal-committee-cli -- check-committee  
    
[/code]

  8. **Collect API keys for[aggregator server](</Aggregator>)**


If new members join the committee during rotation or existing members change API credentials, ask each member to send API credentials for the aggregator.

Collect and share the following with the aggregator operator:

  * API credentials for each committee member, including:
    * The onchain server name (the `PartialKeyServer.name` field)
    * The API key name
    * The API key


With this information, the aggregator operator can update the configuration and run the aggregator server. For configuration and startup instructions, see [Aggregator Server](</Aggregator>).

### Key rotation member runbookâ

Follow these steps to participate as a member in a key rotation.

  1. **Share your address with the coordinator**


Share your wallet address (`MY_ADDRESS`) with the coordinator. This address is used for all onchain actions during the rotation.

Make sure:

  * Your wallet is connected to the correct network.
  * You have enough gas to submit transactions.


  2. **Generate keys and register (Phase A: Registration)**


a. Wait for the coordinator to announce **Phase A (Registration)** and send you the `dkg.yaml` file. The file includes `COMMITTEE_PKG`, `CURRENT_COMMITTEE_ID`, and `COMMITTEE_ID`. Create a local working directory named `dkg-state` and move the file there:
[code] 
    # in seal/  
    rm -rf dkg-state && mkdir dkg-state  
    mv path/to/dkg.yaml dkg-state/  
    
[/code]

b. Look up the committee object ID on a Sui Explorer and verify that its member addresses and threshold match both `dkg.yaml` and the addresses shared in the trusted communication channel.

c. Then run the command to generate your keys and register them onchain by providing your server URL and name:
[code] 
    cargo run --bin seal-committee-cli -- genkey-and-register \  
      -u <YOUR_SERVER_URL> \  
      -n <YOUR_SERVER_NAME>  
    
[/code]

To print the unsigned transaction data, add `--sender-address <MY_ADDRESS> --unsigned`. Sign and execute the transaction elsewhere to complete this phase.

This command:

  * Generates sensitive key material and stores it in `dkg-state/`. Keep this directory secure.
  * Appends `DKG_ENC_PK`, `DKG_SIGNING_PK`, `MY_SERVER_URL`, `MY_SERVER_NAME`, and `MY_ADDRESS` (from `sui client active-address`) to `dkg.yaml`.
  * Registers your public keys onchain.


  3. **Create and share your DKG message (Phase B: Message creation)**


Wait for the coordinator to announce **Phase B (Message creation)**.

**For continuing members** :

a. Initialize your DKG state and generate your message file. You must pass your current master share (`MASTER_SHARE_VX`). This is the master share environment variable value that your key server is currently running with.
[code] 
    cargo run --bin seal-committee-cli -- create-message -o <MASTER_SHARE_VX>  
    
[/code]

This command outputs `dkg-state/message_P.json`, where `P` is your party ID.

b. Share this file with the coordinator.

**For new members** :

Initialize your DKG state. No message file is generated (new members don't create messages during rotation).
[code] 
    cargo run --bin seal-committee-cli -- init-state  
    
[/code]

  4. **Process messages and propose the rotation (Phase C: Finalization)**


Wait for the coordinator to announce **Phase C (Finalization)** and provide a directory containing exactly the old committee threshold number of DKG messages from continuing members (for example, `path/to/dkg-messages`).

Move the directory into `dkg-state` and process the messages:
[code] 
    mv path/to/dkg-messages dkg-state/  
      
    cargo run --bin seal-committee-cli -- process-all-and-propose  
    
[/code]

To print the unsigned transaction data, add `--sender-address <MY_ADDRESS> --unsigned`. Sign and execute the transaction elsewhere to complete this phase.

This command:

  * Processes all messages from the directory.
  * Appends the following fields to `dkg.yaml`:
    * `PARTIAL_PKS_VX+1`: New partial public keys for all members.
    * `MASTER_SHARE_VX+1`: Your new master share, used to start the key server. Back it up securely and do not share it with anyone.
  * Proposes the rotation onchain by calling `propose_for_rotation`.


  5. **Start or update your key server**


**For continuing members:** a. Update `key-server-config.yaml`

  * Change the committee state from _Active_ to **Rotation** mode.
  * Set the target committee version to `X+1` (increment 1 from the current version `X`). If you are not sure what `X` is in this rotation, check with your coordinator.
  * Leave other settings unchanged.


Example config file:
[code] 
    network: Testnet  
    server_mode: !Committee  
      member_address: '<MY_ADDRESS>'  
      key_server_obj_id: '<KEY_SERVER_OBJ_ID>'  
      committee_state: !Rotation  
        target_version: <X+1> # Increment this  
    
[/code]

b. Restart the key server with both the old and new master shares (`MASTER_SHARE_VX` corresponds to the current committee version `X` and `MASTER_SHARE_VX+1` corresponds to the next committee version `X+1`). The server monitors onchain state and selects the correct share automatically.
[code] 
    CONFIG_PATH=crates/key-server/key-server-config.yaml \  
      MASTER_SHARE_VX=<MASTER_SHARE_VX> \  
      MASTER_SHARE_VX+1=<MASTER_SHARE_VX+1> \  
      cargo run --bin key-server  
    
[/code]

c. Wait for the coordinator to confirm that rotation is complete. Then update the config to **Active** mode and restart the server with only the new master share.

Example config file:
[code] 
    network: Testnet  
    server_mode: !Committee  
      member_address: '<MY_ADDRESS>'  
      key_server_obj_id: '<KEY_SERVER_OBJ_ID>'  
      committee_state: !Active  
    
[/code]
[code] 
    CONFIG_PATH=crates/key-server/key-server-config.yaml \  
      MASTER_SHARE_VX+1=<MASTER_SHARE_VX+1> \  
      cargo run --bin key-server  
    
[/code]

**For new members:**

a. Create `key-server-config.yaml`. Since `X+1` is your first committee version, start the key server directly in **Active** mode.

Example config file:
[code] 
    network: Testnet  
    server_mode: !Committee  
      member_address: '<MY_ADDRESS>'  
      key_server_obj_id: '<KEY_SERVER_OBJ_ID>'  
      committee_state: !Active  
    
[/code]

b. Start the key server with the new master share `MASTER_SHARE_VX+1` that corresponds to the new committee version `X+1`.
[code] 
    CONFIG_PATH=crates/key-server/key-server-config.yaml \  
      MASTER_SHARE_VX+1=<MASTER_SHARE_VX+1> \  
      cargo run --bin key-server  
    
[/code]

For infrastructure and deployment recommendations, see Infrastructure requirements.

  6. **Generate API credentials for the[aggregator](</Aggregator>) (new members only)**


If you are joining the committee as a new member during rotation, generate API credentials after your key server is up and running and share them with the coordinator.

a. Generate an **API key name** and **API key** for your key server. b. Share the following with the coordinator:

  * Your server name (`MY_SERVER_NAME` from `dkg.yaml`, corresponding to the onchain `PartialKeyServer.name`)
  * API key name
  * API key


The coordinator passes these credentials to the aggregator operator, who uses them to authenticate requests to your key server.

note

Continuing members typically do not need to share new credentials, since their existing API keys should already be configured in the aggregator. Share new credentials only if you are rotating your API keys.

  7. **Backup and clean up local DKG state**


Once your key server is running successfully, back up the `MASTER_SHARE_VX+1` value. Then you can safely delete the local DKG state directory:
[code] 
    rm -rf dkg-state  
    
[/code]

## Package Upgradeâ

The committee can upgrade the `seal_committee` Move package through a voting process. A contract upgrade can only happen if a threshold of committee members approves the new package digest.

The upgrade follows these steps:

  1. **Compute package digest** : Build the updated package and extract its digest.
  2. **Committee voting** : Committee members vote for the new package digest.
  3. **Execute the upgrade** : Once threshold is reached, authorize, execute and commit the upgrade.


### Prerequisitesâ

  1. Make sure you are on the expected network.
  2. Make sure you are using the same address as the one you used to participate in the current active committee.
  3. `<KEY_SERVER_OBJ_ID>` can be found in your server's config file `key-server-config.yaml`.


[code] 
    sui client active-env  
    sui client active-address  
      
    # Verify the current key server status and its committee members (that contains your address).  
    cargo run --bin seal-committee-cli -- check-key-server-status \  
      -k <KEY_SERVER_OBJ_ID> \  
      -n <NETWORK>  
    
[/code]

### Stepsâ

#### 1\. Compute the package digestâ

Pull the updated package code locally and verify updates. This command computes the package digest for the committee package (`move/committee`). Make sure that all committee members have the same digest and are ready for upgrade.
[code] 
    # in seal/  
    cargo run --bin seal-committee-cli -- package-digest -n <NETWORK>  
    
[/code]

This outputs:
[code] 
    Digest for package 'committee': 0xd0f13987e824f0f462911bc45d5a45004f4e3d752de2be939111274e862cc00c  
    
[/code]

#### 2\. Approve the upgradeâ

Each committee member approves for the upgrade using the locally built package, run:
[code] 
    cargo run --bin seal-committee-cli -- approve-upgrade \  
      -k <KEY_SERVER_OBJ_ID> \  
      -n <NETWORK>  
    
[/code]

To print the unsigned transaction data, add `--sender-address <MEMBER_ADDRESS> --unsigned`. Sign and execute the transaction elsewhere to complete this phase.
[code] 
    cargo run --bin seal-committee-cli -- \  
      --sender-address <MEMBER_ADDRESS> \  
      approve-upgrade \  
      -k <KEY_SERVER_OBJ_ID> \  
      -n <NETWORK> \  
      --unsigned  
    
[/code]

**Notes:**

  1. To check the current upgrade proposal status (digest, votes, threshold), run:


[code] 
    cargo run --bin seal-committee-cli -- check-key-server-status \  
      -k <KEY_SERVER_OBJ_ID> \  
      -n <NETWORK>  
    
[/code]

  2. If you do not want to approve the current onchain upgrade proposal, reject it:


[code] 
    cargo run --bin seal-committee-cli -- reject-upgrade \  
      -k <KEY_SERVER_OBJ_ID> \  
      -n <NETWORK>  
    
[/code]

`reject-upgrade` also accepts `--sender-address <MEMBER_ADDRESS> --unsigned` to print the unsigned transaction data. Sign and execute the transaction elsewhere to complete this phase.

  3. If needed, can run `approve-upgrade` or `reject-upgrade` again to change your vote option.

  4. If needed, if a threshold of committee members reject the upgrade, any member can reset the proposal to allow a new upgrade proposal.


[code] 
    cargo run --bin seal-committee-cli -- reset-proposal \  
      -k <KEY_SERVER_OBJ_ID> \  
      -n <NETWORK>  
    
[/code]

#### 3\. Authorize, execute and commit the upgradeâ

Once the threshold number of committee members approves the digest, any member run this to execute the upgrade:
[code] 
    cargo run --bin seal-committee-cli -- authorize-and-upgrade \  
      -k <KEY_SERVER_OBJ_ID> \  
      -n <NETWORK>  
    
[/code]

To print the unsigned transaction data, add `--sender-address <MEMBER_ADDRESS> --unsigned`. Sign and execute the transaction elsewhere to complete this phase.

This command:

  * Authorizes the upgrade (gets an UpgradeTicket).
  * Performs the package upgrade with the ticket (gets an UpgradeReceipt).
  * Commits the upgrade receipt.


## Quick reference: Fresh DKG vs Key rotationâ

Aspect| Fresh DKG| Key rotation  
---|---|---  
Purpose| Create a brand-new committee and keys| Update committee membership or threshold  
Committee version| Starts at `V0`| Rotates from `VX` to `VX+1`  
Coordinator init command| `publish-and-init`| `init-rotation`  
Continuing members required| N/A| Must meet current threshold  
Member Phase B command| All members: `create-message`| Continuing members: `create-message -o <OLD_SHARE>`  
New members: `init-state`  
Old master share needed| N/A| Yes (continuing members must provide via `-o` flag)  
Message creation| All members create messages| Only continuing members create messages  
Key server startup| Start with `MASTER_SHARE_V0`| Transition from `MASTER_SHARE_VX` to `MASTER_SHARE_VX+1`  
onchain proposal function| `propose`| `propose_for_rotation`  
Result| New key server object| Updated key server object's version  
  
## Infrastructure requirementsâ

The decentralized key server is initialized with a master share generated during the DKG ceremony, which must be kept secure. You can store it using a cloud-based Key Management System (KMS), or in a self-managed software or hardware vault.

The server is a lightweight, stateless service designed for easy horizontal scaling. Because it doesn't require persistent storage, you can run multiple instances behind a load balancer to increase availability and resilience. Each instance must have access to a trusted [Sui full node](<https://docs.sui.io/guides/operator/sui-full-node>) â ideally one that's geographically close to reduce latency during policy checks and key operations.

To operate the server securely, it is recommended to place it behind an API gateway or reverse proxy. This allows you to:

  * Expose the service over HTTPS and terminate SSL/TLS at the edge
  * Enforce rate limiting and prevent abuse
  * Authenticate requests using API keys or access tokens
  * Optionally integrate usage tracking for commercial or billable offerings, such as logging access frequency per client or package


For observability, the server exposes Prometheus-compatible metrics on port `9184`. You can access raw metrics by running `curl http://0.0.0.0:9184`. These metrics can also be visualized using tools like Grafana. The key server also includes a basic health check endpoint on port `2024`: `curl http://0.0.0.0:2024/health`.

### CORS configurationâ

Configure Cross-Origin Resource Sharing (CORS) on your server to allow applications to make requests directly from the browser. Use the following recommended headers:
[code] 
    Access-Control-Allow-Origin: *  
    Access-Control-Allow-Methods: GET, POST, OPTIONS  
    Access-Control-Allow-Headers: Request-Id, Client-Sdk-Type, Client-Sdk-Version  
    Access-Control-Expose-Headers: x-keyserver-version  
    
[/code]

If your server requires an API key, make sure to include the corresponding HTTP header name in `Access-Control-Allow-Headers` as well.

[PreviousKey Server Operations for Independent Server Type](</KeyServerOps>)[NextAggregator Server](</Aggregator>)

  * Overview
  * Prerequisites
  * Fresh DKG process
    * Fresh DKG coordinator runbook
    * Fresh DKG member runbook
  * Key rotation process
    * Key rotation coordinator runbook
    * Key rotation member runbook
  * Package Upgrade
    * Prerequisites
    * Steps
  * Quick reference: Fresh DKG vs Key rotation
  * Infrastructure requirements
    * CORS configuration
