<!-- Source: https://docs.sui.io/operators/validator/alerts -->

* [](</>)
  * [Validators](</operators/validator/>)
  * Alert Reference


On this page

# Sui Validator Alert Reference

When running a Sui Validator or full node, it is recommended to monitor the health of the nodes and set up alerts on problems. Besides alerting on crashes and other common issues, you might also want to configure alerting based on the following example rules.

The following sections cover the alert queries, but the details are meant to be customized to suit your infrastructure.

## High-priority health alerts​

These alerts should receive the most immediate attention from you or your team.

### Crash loop​

Key| Value  
---|---  
**Name**| `Crash loop`  
**Summary**|  Node is crash looping  
**Duration**|  Recommended to trigger after `15m`
[code] 
    max without(version) (uptime) < 60 or absent(uptime)  
    
[/code]  
  
Node is not staying up longer than 60s. Possible reasons:

  * Binary version too old.
  * Incorrect configuration.
  * Software bug.


Please notify Sui community on Discord if this cannot be resolved on your own.

### Consensus proposals failure​

Key| Value  
---|---  
**Name**| `Consensus proposals failure`  
**Summary**|  Consensus block proposal rate is low  
**Duration**|  Recommended to trigger after `1h`
[code] 
    sum without(force) (rate(consensus_proposed_blocks[5m])) < 1.0  
    
[/code]  
  
Validators with a slow consensus proposal rate can hurt network latency and throughput. It is usually due to network, disk or CPU performance issues.

### Checkpoint execution rate is low​

Key| Value  
---|---  
**Name**| `Checkpoint execution rate is low`  
**Summary**|  Validator is not executing checkpoints quickly enough  
**Duration**|  Recommended to trigger after `1h`
[code] 
    rate(last_executed_checkpoint[5m]) < 1.0  
    
[/code]  
  
Validators and full nodes with slow checkpoint execution will not have up-to-date information from the network. It is usually due to network, disk or CPU performance issues.

### Safe mode during reconfiguration​

Key| Value  
---|---  
**Name**| `Safe mode during reconfiguration`  
**Summary**|  Validator or full node failed to advance the epoch and entered safe mode  
**Duration**|  Recommended to trigger after `15m`
[code] 
    is_safe_mode > 0.5  
    
[/code]  
  
Usually this issue is outside the control of validator or full node operators. Please notify Sui community on Discord when this is observed.

## Non-urgent and warning alerts​

All alerts are important, but the following alerts and warnings can be addressed within the normal node maintenance workflow.

### System invariant violations​

Key| Value  
---|---  
**Name**| `System invariant violations`  
**Summary**|  The node reports an invariant violation  
**Duration**|  Recommended to trigger after `15m`
[code] 
    system_invariant_violations > 0  
    
[/code]  
  
Usually this issue is outside the control of validator or full node operators. Please notify Sui community on Discord when this is observed.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/operators/validator/alerts.mdx>)

[PreviousRewards](</operators/validator/validator-rewards>)[NextExchange Integration](</operators/exchange-integration>)

  * High-priority health alerts
    * Crash loop
    * Consensus proposals failure
    * Checkpoint execution rate is low
    * Safe mode during reconfiguration
  * Non-urgent and warning alerts
    * System invariant violations
