<!-- Source: https://docs.sui.io/references/framework/sui_bridge/chain_ids -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [bridge](</references/framework/sui_bridge>)
  * chain_ids


# Module bridge::chain_ids
[code]
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    
[/code]

## Struct BridgeRoute​
[code] 
    **public** **struct** [BridgeRoute](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute>) **has** **copy** , drop, store
    
[/code]

Click to openFields

source: u8
    
destination: u8
    

## Constants​
[code] 
    **const** [SUI_MAINNET](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_SUI_MAINNET>): u8 = 0;
    
[/code]
[code] 
    **const** [SUI_TESTNET](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_SUI_TESTNET>): u8 = 1;
    
[/code]
[code] 
    **const** [SUI_CUSTOM](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_SUI_CUSTOM>): u8 = 2;
    
[/code]
[code] 
    **const** [ETH_MAINNET](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_ETH_MAINNET>): u8 = 10;
    
[/code]
[code] 
    **const** [ETH_SEPOLIA](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_ETH_SEPOLIA>): u8 = 11;
    
[/code]
[code] 
    **const** [ETH_CUSTOM](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_ETH_CUSTOM>): u8 = 12;
    
[/code]
[code] 
    **const** [EInvalidBridgeRoute](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_EInvalidBridgeRoute>): u64 = 0;
    
[/code]

## Function sui_mainnet​
[code] 
    **public** **fun** [sui_mainnet](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_sui_mainnet>)(): u8
    
[/code]

## Function sui_testnet​
[code] 
    **public** **fun** [sui_testnet](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_sui_testnet>)(): u8
    
[/code]

## Function sui_custom​
[code] 
    **public** **fun** [sui_custom](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_sui_custom>)(): u8
    
[/code]

## Function eth_mainnet​
[code] 
    **public** **fun** [eth_mainnet](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_eth_mainnet>)(): u8
    
[/code]

## Function eth_sepolia​
[code] 
    **public** **fun** [eth_sepolia](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_eth_sepolia>)(): u8
    
[/code]

## Function eth_custom​
[code] 
    **public** **fun** [eth_custom](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_eth_custom>)(): u8
    
[/code]

## Function route_source​
[code] 
    **public** **fun** [route_source](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_route_source>)(route: &[bridge::chain_ids::BridgeRoute](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute>)): &u8
    
[/code]

## Function route_destination​
[code] 
    **public** **fun** [route_destination](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_route_destination>)(route: &[bridge::chain_ids::BridgeRoute](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute>)): &u8
    
[/code]

## Function assert_valid_chain_id​
[code] 
    **public** **fun** [assert_valid_chain_id](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_assert_valid_chain_id>)(id: u8)
    
[/code]

## Function valid_routes​
[code] 
    **public** **fun** [valid_routes](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_valid_routes>)(): vector<[bridge::chain_ids::BridgeRoute](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute>)>
    
[/code]

## Function is_valid_route​
[code] 
    **public** **fun** [is_valid_route](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_is_valid_route>)(source: u8, destination: u8): bool
    
[/code]

## Function get_route​
[code] 
    **public** **fun** [get_route](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_get_route>)(source: u8, destination: u8): [bridge::chain_ids::BridgeRoute](</references/framework/sui_bridge/chain_ids#bridge_chain_ids_BridgeRoute>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_bridge/chain_ids.md>)

[Previousbridge](</references/framework/sui_bridge/bridge>)[Nextcommittee](</references/framework/sui_bridge/committee>)
