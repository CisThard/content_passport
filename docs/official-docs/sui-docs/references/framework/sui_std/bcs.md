<!-- Source: https://docs.sui.io/references/framework/sui_std/bcs -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [std](</references/framework/sui_std>)
  * bcs


# Module std::bcs

Utility for converting a Move value to its binary representation in BCS (Binary Canonical.  
Serialization). BCS is the binary encoding for Move resources and other non-module values published on-chain. See <https://github.com/diem/bcs#binary-canonical-serialization-bcs> for more details on BCS.

## Function to_bytes​

Return the binary representation of v in BCS (Binary Canonical Serialization) format
[code] 
    **public** **fun** [to_bytes](</references/framework/sui_std/bcs#std_bcs_to_bytes>)<MoveValue>(v: &MoveValue): [vector](</references/framework/sui_std/vector#std_vector>)<[u8](</references/framework/sui_std/u8#std_u8>)>
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_std/bcs.md>)

[Previousascii](</references/framework/sui_std/ascii>)[Nextbit_vector](</references/framework/sui_std/bit_vector>)
