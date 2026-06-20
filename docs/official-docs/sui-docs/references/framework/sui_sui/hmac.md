<!-- Source: https://docs.sui.io/references/framework/sui_sui/hmac -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * hmac


# Module sui::hmac

## Function hmac_sha3_256​

@param key: HMAC key, arbitrary bytes. @param msg: message to sign, arbitrary bytes.  
Returns the 32 bytes digest of HMAC-SHA3-256(key, msg).
[code] 
    **public** **fun** [hmac_sha3_256](</references/framework/sui_sui/hmac#sui_hmac_hmac_sha3_256>)(key: &vector<u8>, msg: &vector<u8>): vector<u8>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/hmac.md>)

[Previoushex](</references/framework/sui_sui/hex>)[Nextkiosk](</references/framework/sui_sui/kiosk>)
