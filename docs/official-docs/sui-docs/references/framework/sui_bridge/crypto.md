<!-- Source: https://docs.sui.io/references/framework/sui_bridge/crypto -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [bridge](</references/framework/sui_bridge>)
  * crypto


# Module bridge::crypto
[code]
    **use** [sui::ecdsa_k1](</references/framework/sui_sui/ecdsa_k1#sui_ecdsa_k1>);
    **use** [sui::hash](</references/framework/sui_sui/hash#sui_hash>);
    
[/code]

## Function ecdsa_pub_key_to_eth_address​
[code] 
    **public**(package) **fun** [ecdsa_pub_key_to_eth_address](</references/framework/sui_bridge/crypto#bridge_crypto_ecdsa_pub_key_to_eth_address>)(compressed_pub_key: &vector<u8>): vector<u8>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_bridge/crypto.md>)

[Previouscommittee](</references/framework/sui_bridge/committee>)[Nextlimiter](</references/framework/sui_bridge/limiter>)
