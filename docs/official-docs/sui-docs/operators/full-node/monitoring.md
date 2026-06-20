<!-- Source: https://docs.sui.io/operators/full-node/monitoring -->

* [](</>)
  * [Full Nodes](</operators/full-node/>)
  * Monitoring


On this page

# Sui Node Monitoring

info

These instructions are for advanced users. If you just need a local development environment, you should instead follow the instructions in [Create a Local Sui Network](</getting-started/onboarding/local-network>) to create a local full node, validators, and faucet.

Nodes expose metrics on `localhost:9184/metrics` by default.

You can view the metrics in the metrics UI, or use a tool like `curl` to get the metrics in a format that is easy to parse.
[code] 
    $ curl -s http://localhost:9184/metrics | grep -E 'sui_validator|sui_fullnode'  
    
[/code]

## Production monitoring​

For production monitoring, [Prometheus](<https://prometheus.io/>) and [Grafana](<https://grafana.com/>) are recommended.

You can use Grafana Agent, Grafana Alloy, or another tool to scrape the metrics from your node.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/operators/full-node/monitoring.mdx>)

[PreviousConfiguration](</operators/full-node/sui-full-node>)[NextUpdating](</operators/full-node/updates>)

  * Production monitoring
