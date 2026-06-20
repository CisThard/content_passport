<!-- Source: https://docs.sui.io/references/framework/sui_sui/protocol_config -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * protocol_config


On this page

# Module sui::protocol_config

This module provides access to protocol configuration feature flags.  
Feature flags control the availability of various protocol features and are enabled/disabled at specific protocol versions during epoch changes.

## Function is_feature_enabled​

Checks if a specific protocol feature flag is enabled.

Restricted to internal use within the sui-framework package only.  
If we need to use it in sui-system, we can add friend declarations.  
We should never need to expose this to user packages.

### Arguments​

  * feature_flag_name \- The name of the feature flag as bytes (e.g., b"enable_vdf") 
    * It is expected to be a valid UTF-8 string
    * The flag should exist in the protocol config


### Returns​

  * **true** if the feature is enabled in the current protocol version
  * **false** if the feature is disabled


### Example (for framework use only)​
[code] 
    use sui::protocol_config;  
      
    if (protocol_config::is_feature_enabled(b"enable_accumulators")) \{  
        // Accumulators are available  
    \};  
    
[/code]
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [is_feature_enabled](</references/framework/sui_sui/protocol_config#sui_protocol_config_is_feature_enabled>)(feature_flag_name: vector<u8>): bool
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/protocol_config.md>)

[Previouspriority_queue](</references/framework/sui_sui/priority_queue>)[Nextprover](</references/framework/sui_sui/prover>)

  * Arguments
  * Returns
  * Example (for framework use only)
