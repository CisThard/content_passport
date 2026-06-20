<!-- Source: https://docs.sui.io/operators/bridge-node-configuration -->

* [](</>)
  * Bridge Node Configuration


On this page

# Sui Bridge Validator Node Configuration

Running a bridge validator node (bridge node) requires registering your node with the bridge committee. Correct configuration of your node ensures optimal performance and valid metrics data. Follow this topic to make sure your bridge node is set up properly.

  * Prerequisites


  * Install `sui` and `sui-bridge-cli`.


Click to open

Installation instructions

To set up and run a bridge node, you need to You can install them using one of the following options:

Install from tip of `main`:
[code]
    $ cargo install --locked --git "https://github.com/MystenLabs/sui.git" sui sui-bridge-cli  
    
[/code]

Install with a commit sha:
[code]
    $ cargo install --locked --git "https://github.com/MystenLabs/sui.git" --rev {SHA} sui sui-bridge-cli  
    
[/code]

## Committee registration​

To join the network you must first register with the bridge validator committee.

### Prepare for metadata​

The required metadata includes two things:

  * `BridgeAuthorityKey`, an ECDSA key to sign messages. Because this is a hot key that stays in memory, you can use the following tool to generate one and write it to file.
  * A REST API URL where the bridge node listens to and serves requests, for example `https://bridge.example-sui-validator.io:443`. Make sure the port is correct and the URL does not contain any invalid characters.


To create a `BridgeAuthorityKey`, run
[code] 
    $ sui-bridge-cli create-bridge-validator-key <PATH-TO-WRITE>  
    
[/code]

where `<PATH-TO-WRITE>` is the location to write the key pair to.

info

Create a new key pair in a secure environment (for example, on the same machine where your node runs) to avoid key compromise.

### Registration​

After you have both authority key file and REST API URL ready, you can register them by using Sui CLI:
[code] 
    $ sui validator register-bridge-committee --bridge-authority-key-path <BRIDGE-AUTHORITY-KEY-PATH> --bridge-authority-url <BRIDGE-AUTHORITY-URL>  
    
[/code]

#### Offline signing​

If you keep your validator account key in cold storage or you want to perform offline signing, use flags `--print-only` and `--validator-address` (with the value for the validator address). This prints serialized unsigned transaction bytes, then you can use your preferred signing process to produce signed bytes.

Run the following command to execute it:
[code] 
    $ sui client execute-signed-tx  
    
[/code]

#### Update metadata (before committee is finalized)​

Both key and URL are changeable **before the committee is finalized**. If you want to update metadata, rerun `sui validator register-bridge-committee`.

#### View registered metadata​

To double check you registered the correct metadata on chain, run
[code] 
    $ sui-bridge-cli view-bridge-registration --sui-rpc-url {SUI-FULLNODE-URL}  
    
[/code]

## Update metadata (after committee is finalized)​

Use the following command to update bridge node URL:
[code] 
    $ sui validator update-bridge-committee-node-url  
    
[/code]

See the offline signing section on this page for how to sign the transaction offline.

Authority key rotation is not supported yet.

## Bridge node​

You have several options when configuring your bridge node for performance and metrics monitoring. Follow the instructions in this section to configure your node for best results in your environment.

### Bridge node hardware requirements​

Suggested hardware requirements:

  * CPU: 6 physical cores
  * Memory: 16GB
  * Storage: 200GB
  * Network: 100Mbps


### Web application firewall (WAF) protection for bridge node​

To protect against distributed denial of service (DDoS) attacks and similar attacks intended to expend validator resources, you must provide rate limit protection for the bridge server.

In addition to protection, this gives node operators fine-grained control over the rate of requests they receive, and observability into those requests.

The currently recommended rate limit is `50 requests/second per unique IP`.

#### Web application firewall (WAF) options​

You can use a managed cloud service, for example:

  * [Cloudflare WAF](<https://www.cloudflare.com/en-ca/application-services/products/waf/>)
  * [AWS WAF](<https://aws.amazon.com/waf/>)
  * [GCP Cloud Armor](<https://cloud.google.com/security/products/armor>)


You can also use an open source load balancer, such as [HAProxy](<https://www.haproxy.org/>) for a practical, IP-based rate limit.

A shortened example HAProxy configuration looks like the following:
[code] 
    frontend http-in  
        bind *:80  
        # Define an ACL to count requests per IP and block if over limit  
        acl too_many_requests src_http_req_rate() gt 50  
        # Track the request rate per IP  
        stick-table type ip size 1m expire 1m store http_req_rate(1s)  
        # Check request rate and deny if the limit is exceeded  
        http-request track-sc0 src  
        http-request deny if too_many_requests  
      
        default_backend bridgevalidator  
      
    backend bridgevalidator  
        # Note the port needs to match the value in bridge node config, default is 9191  
        server bridgevalidator 0.0.0.0:9191  
    
[/code]

If choosing to use an open source load balancing option, make sure to set up metrics collection and alerting on the service.

### Bridge node config​

Use `sui-bridge-cli` command to create a template. If you want to run `BridgeClient` (see the following section), pass `--run-client` as a parameter.
[code] 
    $ sui-bridge-cli create-bridge-node-config-template {PATH}  
    $ sui-bridge-cli create-bridge-node-config-template --run-client {PATH}  
    
[/code]

The generated configuration includes the following parameters:

Parameter| Description  
---|---  
`server-listen-port`| The port that bridge node listens to for handling requests.  
`metrics-port`| Port to export Prometheus metrics.  
`bridge-authority-key-path`| The path to the Bridge Validator key, generated from `sui-bridge-cli create-bridge-validator-key` command referenced previously.  
`run-client`| Whether Bridge Client should be enabled in bridge node (more instructions follow).  
`approved-governance-actions`| A list of governance actions that you want to support.  
`sui:sui-rpc-url`| Sui RPC URL.  
`sui:sui-bridge-chain-id`| `0` for Sui Mainnet, `1` for Sui Testnet.  
`eth:eth-rpc-url`| Ethereum RPC URL.  
`eth:eth-bridge-proxy-address`| The proxy address for Bridge Solidity contracts on Ethereum.  
`eth:eth-bridge-chain-id`| `10` for Ethereum Mainnet, `11` for Sepolia Testnet.  
`eth:eth-contracts-start-block-fallback`| The starting block BridgeNodes queries for from Ethereum FullNode. This number should be the block where Solidity contracts are deployed or slightly before.  
`metrics:push-url`| The URL of the remote Sui metrics pipeline (for example, `https://metrics-proxy.[testnet_OR_mainnet].sui.io:8443/publish/metrics`). See the metrics push section for more details.  
  
With `run-client: true`, you can find these additional fields in the generated config:

Parameter| Description  
---|---  
`db-path`| Path of BridgeClient database, for BridgeClient.  
`sui:bridge-client-key-path`| The file path of Bridge Client key. You can generate this key with `sui-bridge-cli create-bridge-client-key` as previously shown. When `run-client` is true but you do not provide `sui:bridge-client-key-path`, the node defaults to use the Bridge Validator key to submit transactions on Sui. This is not recommended for the sake of key separation.  
  
### BridgeClient​

`BridgeClient` orchestrates bridge transfer requests. It is **optional** to run for a `BridgeNode`. `BridgeClient` submits transaction on the Sui network. Thus when it's enabled, you need a Sui account key with enough SUI balance.

To enable `bridge_client` feature on a `BridgeNode`, set the following parameters in `BridgeNodeConfig`:
[code] 
    run-client: true  
    db-path: <PATH-TO-DB>  
    sui:  
        bridge-client-key-path: <PATH-TO-BRIDGE-CLIENT-KEY>  
    
[/code]

To create a `BridgeClient` key pair, run
[code] 
    $ sui-bridge-cli create-bridge-client-key <PATH_TO_BRIDGE_CLIENT_KEY>  
    
[/code]

This prints the newly created Sui Address. Then fund this address with some SUI for operations.

### Build bridge node​

Build or install bridge node in one of the following ways:

  * Use `cargo install`.
[code] $ cargo install --locked --git "https://github.com/MystenLabs/sui.git" --branch {BRANCH-NAME} sui-bridge  
        
[/code]

Or
[code] $ cargo install --locked --git "https://github.com/MystenLabs/sui.git" --rev {SHA-NAME} sui-bridge  
        
[/code]

  * Compile from source code
[code] $ git clone https://github.com/MystenLabs/sui.git  
        
[/code]
[code] $ cd sui  
        
[/code]
[code] $ git fetch origin {BRANCH-NAME|SHA}  
        
[/code]
[code] $ git checkout {BRANCH-NAME|SHA}  
        
[/code]
[code] $ cargo build --release --bin sui-bridge  
        
[/code]

  * Use `curl`/`wget` pre-built binaries (for Linux/AMD64 only).
[code] $ curl https://sui-releases.s3.us-east-1.amazonaws.com/{SHA}/sui-bridge -o sui-bridge  
        
[/code]

  * Use pre-built Docker image. Pull from Docker Hub: `mysten/sui-tools:{SHA}`


### Run bridge node​

Running bridge node is similar to running a Sui node using systemd or Ansible. The command to start the bridge node is:
[code] 
    $ RUST_LOG=info,sui_bridge=debug sui-bridge --config-path {BRIDGE-NODE-CONFIG-PATH}  
    
[/code]

### Ingress​

Bridge node listens for TCP connections over port `9191` (or the preferred port in the configuration file). You must allow incoming connections for that port on the host that is running bridge node.

Test ingress with `curl` on a remote machine and expect a `200` response:
[code] 
    $ curl -v {YOUR_BRIDGE_URL}  
    
[/code]

### Bridge node monitoring​

Use `uptime` to check if the node is running.

You can find a full list of bridge node metrics and their descriptions in the [`sui-bridge` crate](<https://github.com/MystenLabs/sui/blob/main/crates/sui-bridge/src/metrics.rs>).

#### When `run-client: false`​

In this case bridge node runs as a passive observer and does not proactively poll onchain activities. Important metrics to monitor in this case are the request handling metrics, such as:

  * `bridge_requests_received`
  * `bridge_requests_ok`
  * `bridge_err_requests`
  * `bridge_requests_inflight`
  * `bridge_eth_rpc_queries`
  * `bridge_eth_rpc_queries_latency`
  * `bridge_signer_with_cache_hit`
  * `bridge_signer_with_cache_miss`
  * `bridge_sui_rpc_errors`


#### When `run-client: true`​

In this case, Bridge Client is toggled on and syncs with blockchains proactively. The best metrics to track progress are:

  * `bridge_last_synced_sui_checkpoints`
  * `bridge_last_synced_eth_blocks`
  * `bridge_last_finalized_eth_block`
  * `bridge_sui_watcher_received_events`
  * `bridge_eth_watcher_received_events`
  * `bridge_sui_watcher_received_actions`
  * `bridge_eth_watcher_received_actions`


`bridge_gas_coin_balance` is also a critical metric to track the balance of your client gas coin, and top up after it dips below a certain threshold.

### Metrics push​

The Bridge Nodes can push metrics to the remote proxy for network-level observability.

To enable metrics push, set the following parameters in `BridgeNodeConfig`:
[code] 
    metrics:  
        push-url: https://metrics-proxy.[testnet|mainnet].sui.io:8443/publish/metrics  
    
[/code]

The proxy authenticates pushed metrics by using the metrics key pair. It is similar to `sui-node` pushing metrics with `NetworkKey`. Unlike `NetworkKey`, the bridge node metrics key is not recorded on chain and can be ephemeral. The metrics key is loaded from the `metrics-key-pair` field in `BridgeNodeConfig` if provided, otherwise a new key pair is generated on the fly. The proxy queries node public keys periodically by hitting the metrics public API key of each node.

When bridge node starts, it might log this line once:
[code] 
    unable to push metrics: error sending request for url (xyz); new client will be created  
    
[/code]

This is okay to ignore as long as it does not persist. Otherwise, try:
[code] 
    $ curl -i  {your-bridge-node-url-on-chain}/metrics_pub_key  
    
[/code]

and make sure the public key is correctly returned.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/operators/bridge-node-configuration.mdx>)

[PreviousExchange Integration](</operators/exchange-integration>)

  * Committee registration
    * Prepare for metadata
    * Registration
  * Update metadata (after committee is finalized)
  * Bridge node
    * Bridge node hardware requirements
    * Web application firewall (WAF) protection for bridge node
    * Bridge node config
    * BridgeClient
    * Build bridge node
    * Run bridge node
    * Ingress
    * Bridge node monitoring
    * Metrics push
