<!-- Source: https://seal-docs.wal.app/Aggregator -->

* [](</>)
  * Operator Guide
  * Aggregator Server


On this page

# Aggregator Server

The Aggregator Server supports Seal MPC committees by acting as a gateway between clients and committee members' key servers. It fetches encrypted partial key shares from committee members, verifies their encrypted signatures, aggregates the shares into a single encrypted key, and returns the result to the client. The aggregator authenticates to a decentralized key server using private API keys.

Because the aggregator never holds or stores cryptographic key material, it is trustless â anyone can run one. The aggregator's correctness can be verified independently: all partial shares are cryptographically signed by their respective committee members, so a misbehaving aggregator cannot produce a valid response without honest member participation.

## Overviewâ

The aggregator server performs the following tasks:

  1. Loads the committee's configuration from the network, including the threshold, member URLs, and partial public keys.
  2. Receives fetch key requests from clients.
  3. Fans out each request to committee member servers until it collects responses from enough members to satisfy the threshold.
  4. Verifies each encrypted signature using the corresponding partial public key.
  5. Aggregates the encrypted partial responses using Lagrange interpolation.
  6. Returns the aggregated encrypted key to the client.


## Setupâ

The aggregator authenticates with each committee member's key server using private API keys.

### Initial setup (fresh DKG)â

After a fresh DKG completes, the coordinator shares the following information with the aggregator operator:

  * **Key server object ID** (`KEY_SERVER_OBJ_ID`): The object ID created when the committee is finalized onchain.
  * **API credentials for all committee members** , including:
    * The onchain server name
    * The API key name
    * The API key


The aggregator operator configures these values in `aggregator-config.yaml` and then deploys the aggregator server.

### Key rotationâ

If new members join the committee during key rotation, the coordinator shares their API credentials with the aggregator operator. The aggregator operator adds the new credentials to `aggregator-config.yaml` and restarts the server.

The aggregator configuration can include credentials for both old and new member names. The aggregator periodically reads the current committee state from the network and uses the latest onchain member list to determine which credentials to use.

## Running the serverâ

Edit `aggregator-config.yaml` to match your environment. Set the target network, the key server object ID provided by the coordinator, and the API credentials for all committee members:
[code] 
    # The network for the object.  
    network: !Testnet  
    # The decentralized server object ID.  
    key_server_object_id: '0x0000000000000000000000000000000000000000000000000000000000000000'  
      
    # API credentials for committee members.  
    api_credentials:  
        server1: # onchain server name  
          api_key_name: keyname1  
          api_key: key1  
        server2:  
          api_key_name: keyname2  
          api_key: key2  
    
[/code]

Then run:
[code] 
    CONFIG_PATH=crates/key-server/src/aggregator/aggregator-config.yaml cargo run --bin aggregator-server  
    
[/code]

### Running with Dockerâ

Build the image:
[code] 
    docker build -f Dockerfile.aggregator -t aggregator-server:latest .  
    
[/code]

Run the server:
[code] 
    docker run -p 2024:2024 \  
      -v $(pwd)/crates/key-server/src/aggregator/aggregator-config.yaml:/config/aggregator-config.yaml \  
      -e CONFIG_PATH=/config/aggregator-config.yaml \  
      aggregator-server  
    
[/code]

## Infrastructure requirementsâ

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

[PreviousKey Server Operations for Decentralized Server Type](</KeyServerCommitteeOps>)[NextSeal CLI](</SealCLI>)

  * Overview
  * Setup
    * Initial setup (fresh DKG)
    * Key rotation
  * Running the server
    * Running with Docker
  * Infrastructure requirements
    * CORS configuration
