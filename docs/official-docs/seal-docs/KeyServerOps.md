<!-- Source: https://seal-docs.wal.app/KeyServerOps -->

* [](</>)
  * Operator Guide
  * Key Server Operations for Independent Server Type


On this page

# Key server operations for Independent server type

This guide covers how to set up and operate an **independent server type** key server. For an overview comparing decentralized and independent server types, see [Seal Server Overview](</ServerOverview>).

Use this guide to operate a Seal key server in either of the following scenarios:

  * **As a service provider:** Run a key server as a service for developers.
  * **As a developer:** Run a key server for your own development and testing.


## Network configurationâ

Use the relevant package ID `<SEAL_PACKAGE_ID>` to register your key server on the Sui network `<NETWORK>`:

Network| Package ID  
---|---  
Testnet| `0xdccbeb87767be2b2346af5575eb139807205e4c23ec53dc616f951fe1d814112`  
Mainnet| `0x931739224160073d8e391c9aa6e7ade9818e9814b4907066b7efa058636c4e45`  
  
## Independent server type modesâ

When running an independent server, you can choose between Open or Permissioned mode:

  * **Open mode** : In Open mode, the key server accepts decryption requests for any onchain package. It uses a single master key to serve all access policies across packages. This mode is suitable for public or general-purpose deployments where package-level isolation is not required.
  * **Permissioned mode** : In Permissioned mode, the key server restricts access to a manually approved list of packages associated with specific clients or applications. Each client is served using a dedicated master key.
    * This mode also supports importing or exporting the client-specific key if needed, for purposes such as disaster recovery or key server rotation.
    * The approved package ID for a client **must** be the package's **first published version**. This ensures that the key server continues to recognize the package after upgrades. You do not need to add new versions of the package to a client's allowlist.


You can choose the option that best fits your deployment model and security requirements. The following sections provide more details on both options. Also see [Seal CLI](</SealCLI>) for reference.

## Open modeâ

In Open mode, the key server allows decryption requests for Seal policies from any package. This mode is ideal for testing or for deployments where the key server is operated as a best-effort service without direct user liability.

Before starting the key server, you must generate a BLS master key pair. This command outputs both the master secret key and the public key.
[code] 
    cargo run --bin seal-cli genkey  
    Master key: <MASTER_KEY>  
    Public key: <MASTER_PUBKEY>  
    
[/code]

To make the key server discoverable by Seal clients, register it onchain using `create_and_transfer_v2_independent_server`:
[code] 
    sui client switch --env <NETWORK>  
    sui client active-address # fund this if necessary  
    sui client call --function create_and_transfer_v2_independent_server --module key_server --package <SEAL_PACKAGE_ID> --args <YOUR_SERVER_NAME> https://<YOUR_URL> 0 <MASTER_PUBKEY>  
      
    # outputs object of type key_server::KeyServer <KEY_SERVER_OBJECT_ID> (may output additional objects)  
    
[/code]

To start the key server in Open mode, run the command `cargo run --bin key-server`, but before running the server, set the following environment variables:

  * `MASTER_KEY`: The master secret key generated using the `seal-cli` tool.
  * `CONFIG_PATH`: The path to a .yaml configuration file that specifies key server settings. For the configuration file format, see the [example config](<https://github.com/MystenLabs/seal/tree/main/crates/key-server/key-server-config.yaml>).


In the config file, make sure to:

  * Set the network to `Testnet`, `Mainnet`, or `!Devnet` (which requires a `seal_package` field).
    * To use a custom RPC endpoint for any network, either specify `node_url` in the config or set the `NODE_URL` environment variable.
  * Set the mode to `!Open`.
  * Set the `key_server_object_id` field to `<KEY_SERVER_OBJECT_ID>`, the ID of the key server object you registered onchain.


[code] 
    CONFIG_PATH=crates/key-server/key-server-config.yaml MASTER_KEY=<MASTER_KEY> cargo run --bin key-server  
      
    # Or with a custom RPC endpoint via environment variable:  
    # NODE_URL=https://your-custom-rpc.example.com CONFIG_PATH=crates/key-server/key-server-config.yaml MASTER_KEY=<MASTER_KEY> cargo run --bin key-server  
    
[/code]

Alternatively, run with Docker:
[code] 
    docker build -t seal-key-server . --build-arg GIT_REVISION="$(git describe --always --abbrev=12 --dirty --exclude '*')"   
      
    docker run -p 2024:2024 -v $(pwd)/crates/key-server/key-server-config.yaml:/config/key-server-config.yaml \  
      -e CONFIG_PATH=/config/key-server-config.yaml \  
       -e MASTER_KEY=<MASTER_KEY> \  
       seal-key-server  
    
[/code]

## Permissioned modeâ

In Permissioned mode, the key server only allows decryption requests for Seal policies from explicitly allowlisted packages. This is the recommended mode for B2B deployments where tighter access control and client-specific key separation are required.

Start by generating a master seed for the key server. Use the `seal-cli` tool as `cargo run --bin seal-cli gen-seed`. This command outputs the secret master seed which should be stored securely.
[code] 
    cargo run --bin seal-cli gen-seed  
    Seed: <MASTER_SEED>  
    
[/code]

Next, create a configuration file in `.yaml` format following the instructions in the [example configuration](<https://github.com/MystenLabs/seal/tree/main/crates/key-server/key-server-config.yaml>) and with the following properties:

  * Set the mode to `!Permissioned`.
  * Initialize with empty client configurations (clients can be added later).


[code] 
      server_mode: !Permissioned  
        client_configs:  
    
[/code]

Set the environment variable `MASTER_KEY` to the master secret seed generated by the `seal-cli` tool, and the environment variable `CONFIG_PATH` pointing to a .yaml configuration file. Run the server using `cargo run --bin key-server`. It should abort after printing a list of unassigned derived public keys (search for logs with the text `Unassigned derived public key`).
[code] 
    # MASTER_KEY=<MASTER_SEED> CONFIG_PATH=crates/key-server/key-server-config.yaml cargo run --bin key-server   
      
    MASTER_KEY=0x680d7268095510940a3cce0d0cfdbd82b3422f776e6da46c90eb36f25ce2b30e CONFIG_PATH=crates/key-server/key-server-config.yaml cargo run --bin key-server   
    
[/code]
[code] 
    2025-06-15T02:02:56.303459Z  INFO key_server: Unassigned derived public key with index 0: "<PUBKEY_0>"  
    2025-06-15T02:02:56.303957Z  INFO key_server: Unassigned derived public key with index 1: "<PUBKEY_1>"  
    2025-06-15T02:02:56.304418Z  INFO key_server: Unassigned derived public key with index 2: "<PUBKEY_2>"  
    
[/code]

Each supported client must have a registered onchain key server object to enable discovery and policy validation.

### Register a clientâ

Follow these steps to add every new client to a Permissioned key server:

  * The client sends the key server provider a list of Seal policy package IDs to allow on the key server (for example, `<POLICY_PACKAGE_ID_0>`, `<POLICY_PACKAGE_ID_1>`).
  * The key server provider registers a new key server onchain with an **unassigned derived public key** using `create_and_transfer_v2_independent_server`.
    * Copy an unassigned derived public key from the server logs (see preceding section). Use the next available derivation index (for the first client, `0`; for the nth client, `n-1`).

Index| Derived Public Key  
---|---  
0| `<PUBKEY_0>`  
1| `<PUBKEY_1>`  
`<INDEX>`| `<PUBKEY_<INDEX>>`
[code] 
    # The 0 between the key server URL and public key arguments is a fixed or static value for all client registrations  
    sui client call --function create_and_transfer_v2_independent_server --module key_server --package <SEAL_PACKAGE_ID> --args <YOUR_SERVER_NAME> https://<YOUR_URL> 0 <PUBKEY_<INDEX>>  
      
    # outputs object of type key_server::KeyServer <KEY_SERVER_OBJECT_ID_<INDEX>> (may output additional objects)  
    
[/code]  
  
  * Add an entry in config file:
    * Set `client_master_key` to type `Derived`.
    * Set `derivation_index` as `<INDEX>` (use `0` for the first client; for the nth client, use `n-1`).
    * Set `key_server_object_id` to the value `<KEY_SERVER_OBJECT_ID_<INDEX>>` from the registration output in the preceding section.
    * Include the list of Seal policy packages IDs that the client provided, under `package_ids`.


info

You can map multiple different packages from a developer to the same client (for example, for different features or apps). However, if the developer later decides to export the client key, access will be revoked for **all** packages mapped to that client. Confirm whether they prefer separate client per package (allowing for granular revocation) or a single consolidated client (allowing for simpler operations).

info

When adding a package for a feature or app, you must add the package ID of the package's **first published version**. This ensures that the key server continues to recognize the package after upgrades. You do not need to add new versions of a package to a client's allowlist.

For example:
[code] 
        - name: "alice" # not used in code, identifier for your own information  
          client_master_key: !Derived  
            derivation_index: <INDEX>  
          key_server_object_id: "<KEY_SERVER_OBJECT_ID_<INDEX>>"  
          package_ids:  
            - "<POLICY_PACKAGE_ID_1>"  
            - "<POLICY_PACKAGE_ID_2>"  
    
[/code]

  * Restart the key server to apply the config changes.
  * Share the new key server object ID `<KEY_SERVER_OBJECT_ID_<INDEX>>` with the client.


[code] 
    MASTER_KEY=<MASTER_SEED> CONFIG_PATH=crates/key-server/key-server-config.yaml cargo run --bin key-server   
    
[/code]

Or with Docker:
[code] 
    docker run -p 2024:2024 \  
      -v $(pwd)/crates/key-server/key-server-config.yaml:/config/key-server-config.yaml \  
      -e CONFIG_PATH=/config/key-server-config.yaml \  
      -e MASTER_KEY=<MASTER_SEED> \  
      seal-key-server  
    
[/code]

To add another client in the future, repeat the preceding steps. Register a new unassigned derived public key onchain, note the returned `key_server_object_id`, add a config entry with the next `derivation_index` and the client's `package_ids`, then restart the server. The logs show the next unassigned indices and public keys.

### Export and import keysâ

In rare cases where you need to export a client key:

  * Use the `seal-cli` tool as `cargo run --bin seal-cli derive-key --seed $MASTER_SEED --index X`. Replace `X` with the `derivation_index` of the key you want to export. The tool outputs the corresponding master key, which can be imported by another key server if needed.


Here's an example command assuming the key server owner is exporting the key at index 0:
[code] 
    cargo run --bin seal-cli derive-key --seed <MASTER_SEED> --index 0  
      
    Master key: <CLIENT_MASTER_KEY>  
    Public key: <CLIENT_MASTER_PUBKEY>  
    
[/code]

  * Disable this key on the current server:
    * Change the client's `client_master_key` type to `Exported`.
    * Set the `deprecated_derivation_index` field with the derivation index.


For example:
[code] 
         - name: "bob"  
           client_master_key: !Exported  
             deprecated_derivation_index: 0  
    
[/code]

  * To import a client master key into a different key server, first transfer the existing key server object to the target server's owner. After completing the transfer, the new owner should update the object's URL to point to their key server.


Here's an example Sui CLI command assuming the export of `<KEY_SERVER_OBJECT_ID_0>`:
[code] 
    sui transfer --object-id <KEY_SERVER_OBJECT_ID_0> --to <NEW_OWNER_ADDRESS>  
    
[/code]

The owner of `<NEW_OWNER_ADDRESS>` can now run:
[code] 
    sui client call --function update --module key_server --package <SEAL_PACKAGE_ID> --args <KEY_SERVER_OBJECT_ID_0> https://<NEW_URL>  
    
[/code]

  * The new key server owner can now add it to their config file:
    * `client_master_key` set to type `Imported`.
    * The name of the environment variable containing the key, for example, `BOB_BLS_KEY`. This name is used later.
    * The key server object registered onchain for this client earlier, for example, `<KEY_SERVER_OBJECT_ID_0>`.
    * The list of packages associated with the client.


For example:
[code] 
         - name: "bob"  
           client_master_key: !Imported  
             env_var: "BOB_BLS_KEY"  
           key_server_object_id: "<KEY_SERVER_OBJECT_ID_0>"  
           package_ids:  
             - "<POLICY_PACKAGE_ID>"  
    
[/code]

  * Run the key server using the client master key as the configured environment variable.


[code] 
    CONFIG_PATH=crates/key-server/key-server-config.yaml BOB_BLS_KEY=<CLIENT_MASTER_KEY> MASTER_KEY=<MASTER_SEED> cargo run --bin key-server  
    
[/code]

Or run with Docker:
[code] 
    docker run -p 2024:2024 \  
      -v $(pwd)/crates/key-server/key-server-config.yaml:/config/key-server-config.yaml \  
      -e CONFIG_PATH=/config/key-server-config.yaml \  
      -e BOB_BLS_KEY=<CLIENT_MASTER_KEY> \  
      -e MASTER_KEY=<MASTER_SEED> \  
      seal-key-server  
    
[/code]

## Infrastructure requirementsâ

The server is initialized with a master key (or seed), which must be kept secure. You can store this key using a cloud-based Key Management System (KMS), or in a self-managed software or hardware vault. If you're importing keys, those should be protected using the same secure storage approach.

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

[PreviousSecurity Best Practices and Risk Mitigations](</SecurityBestPractices>)[NextKey Server Operations for Decentralized Server Type](</KeyServerCommitteeOps>)

  * Network configuration
  * Independent server type modes
  * Open mode
  * Permissioned mode
    * Register a client
    * Export and import keys
  * Infrastructure requirements
    * CORS configuration
