<!-- Source: https://docs.sui.io/onchain-finance/examples-patterns/soulbound-tokens -->

* [](</>)
  * [Example Asset Patterns](</onchain-finance/examples-patterns/>)
  * Soulbound NFTs


# Soulbound NFTs

A soulbound non-fungible token (NFT) is an NFT that is non-transferable. After an NFT is minted to a Sui account, the NFT is bound to that account and cannot be transferred. This implementation uses the custom logic of the Sui framework `transfer` functions. The [`sui::transfer` module](</references/framework/sui-framework/sui_sui/transfer>) contains 2 functions that transfer objects: [`transfer::transfer`](</references/framework/sui-framework/sui_sui/transfer#function-transfer>) and [`transfer::public_transfer`](</references/framework/sui-framework/sui_sui/transfer#function-public_transfer>).

Typically, when you define new NFTs or object types on Sui, you do not need to create a transfer function because the Sui framework offers `transfer::public_transfer`, which anyone can use to transfer objects. `transfer::public_transfer` requires that transferred objects have the `key` and `store` abilities. Therefore, if you define a new NFT type that has the `key` ability (meaning it is a Sui object) but not the `store` ability, holders cannot use `transfer::public_transfer`. This results in a soulbound NFT.

You can also create custom transfer logic for NFTs on Sui. The `transfer::transfer` function has custom rules performed by the Sui Move bytecode verifier that ensure the transferred objects are defined in the module where transfer is invoked. While removing the `store` ability from a struct definition makes `transfer::public_transfer` unusable, you can still use `transfer::transfer` as long as you invoke it in the module that defined that object type. This allows the module owner to provide custom transfer logic for soulbound NFTs.

The following example creates a soulbound NFT on Sui. The `TestnetSoulboundNFT` struct defines the NFT with `id`, `name`, `description`, and `url` fields:

[examples/move/nft-soulbound/sources/testnet_soulbound_nft.move](<https://github.com/MystenLabs/sui/blob/main/examples/move/nft-soulbound/sources/testnet_soulbound_nft.move>)
[code]
    public struct TestnetSoulboundNFT has key {  
        id: UID,  
        name: string::String,  
        description: string::String,  
        url: Url,  
    }  
    
[/code]

The `TestnetSoulboundNFT` struct has the `key` ability but not the `store` ability. This means you cannot transfer it with `transfer::public_transfer`. Instead, use `transfer::transfer` with custom transfer logic implemented in the same module.

This example also shows how to provide custom transfer logic using the `transfer::transfer` function. This is where you can add additional logic, such as resetting the NFT stats or requiring a payment. Do not provide this functionality if the NFT is fully soulbound:

[examples/move/nft-soulbound/sources/testnet_soulbound_nft.move](<https://github.com/MystenLabs/sui/blob/main/examples/move/nft-soulbound/sources/testnet_soulbound_nft.move>)
[code]
    /// Transfer `nft` to `recipient`  
    /// Do not include this if you want the NFT fully soulbound  
    public fun transfer(nft: TestnetSoulboundNFT, recipient: address, _: &mut TxContext) {  
        // Add custom logic for transferring the NFT  
        transfer::transfer(nft, recipient)  
    }  
    
[/code]

[View the full example on GitHub](<https://github.com/MystenLabs/sui/tree/main/examples/move/nft-soulbound/sources/testnet_soulbound_nft.move>).

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/examples-patterns/soulbound-tokens.mdx>)

[PreviousIn-Game Currencies](</onchain-finance/examples-patterns/in-game-currency>)[NextNFT Rentals](</onchain-finance/examples-patterns/nft-rental>)
