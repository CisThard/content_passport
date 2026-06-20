<!-- Source: https://docs.sui.io/sui-stack/messaging/installation -->

* [](</>)
  * [Messaging SDK](</sui-stack/messaging/>)
  * Getting Started
  * Installation


On this page

# Installation

The Messaging SDK is a TypeScript package that provides end-to-end encrypted group messaging on Sui. It requires a small set of peer dependencies and communicates with an offchain relayer for message delivery.

## Prerequisites​

  * Prerequisites


  * Node.js >= 22
  * pnpm >= 10.17.0


  * Node.js >= 22
  * pnpm >= 10.17.0


[code] 
    pnpm add @mysten/sui-stack-messaging @mysten/sui-groups @mysten/seal @mysten/sui @mysten/bcs  
    
[/code]

The last four are peer dependencies. If your project already depends on them, you only need:
[code] 
    pnpm add @mysten/sui-stack-messaging @mysten/sui-groups  
    
[/code]

### Peer dependency versions​

Package| Minimum version  
---|---  
`@mysten/sui-groups`| *  
`@mysten/seal`| ^1.1.0  
`@mysten/sui`| ^2.6.0  
`@mysten/bcs`| ^2.0.2  
  
## Build from source​
[code] 
    git clone https://github.com/MystenLabs/sui-stack-messaging.git  
    cd sui-stack-messaging/ts-sdks  
    pnpm install  
    pnpm build  
    
[/code]

## Smart contracts​

The messaging Move package is pre-deployed on Testnet and on Mainnet. The SDK auto-detects the correct package IDs based on the client's network.

For localnet or custom deployments, you must deploy both the `sui_groups` and `sui_stack_messaging` packages (`sui_stack_messaging` depends on `sui_groups`). Refer to the [Sui Groups Installation guide](<https://github.com/MystenLabs/sui-groups>) for deploying the base package first, then deploy the messaging package on top.

Provide a `packageConfig` when instantiating the client to point at your custom deployment. See [Setup](</sui-stack/messaging/setup>) for details.

## Relayer​

The SDK communicates with an offchain relayer for message storage and delivery. See [Relayer](</sui-stack/messaging/relayer>) for integration details and the [relayer README](<https://github.com/MystenLabs/sui-stack-messaging>) for running the reference implementation.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/sui-stack/messaging/installation.mdx>)

[PreviousMessaging SDK](</sui-stack/messaging/>)[NextDeveloper Setup](</sui-stack/messaging/setup>)

  * Prerequisites
    * Peer dependency versions
  * Build from source
  * Smart contracts
  * Relayer
