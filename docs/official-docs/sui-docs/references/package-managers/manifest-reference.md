<!-- Source: https://docs.sui.io/references/package-managers/manifest-reference -->

* [](</>)
  * [Move](</references/sui-move>)
  * Packages
  * Manifest Reference


# Manifest Reference

This section provides sample manifest files for you to use as templates in your project.

For a basic project that only depends on `sui` and `std`, the minimal lockfile is:
[code] 
    [package]  
    name = "example"  
    
[/code]

For a package that has a `mvr` dependency and a git dependency with different Mainnet and Testnet branches:
[code] 
    [package]  
    name = "example"  
      
    [dependencies]  
    ascii = { r.mvr = "@potatoes/ascii" }  
    usdc = { git = "https://github.com/circlefin/stablecoin-sui.git", subdir = "packages/usdc", rev = "releases/testnet" }  
      
    [dep-replacements.mainnet]  
    usdc = { git = "https://github.com/circlefin/stablecoin-sui.git", subdir = "packages/usdc", rev = "releases/mainnet" }  
    
[/code]

For a package that defines a `testnet_alpha` environment:
[code] 
    [package]  
    name = "example"  
      
    [environments]  
    testnet_alpha = "4c78adac"  
      
    [dependencies]  
    ascii = { r.mvr = "@potatoes/ascii" }  
    usdc = { git = "https://github.com/circlefin/stablecoin-sui.git", subdir = "packages/usdc", rev = "releases/testnet" }  
      
    [dep-replacements.mainnet]  
    usdc = { git = "https://github.com/circlefin/stablecoin-sui.git", subdir = "packages/usdc", rev = "releases/testnet" }  
      
    [dep-replacements.testnet_alpha]  
    ascii = { use-environment = "ascii" }  
    usdc = { use-environment = "testnet" }  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/package-managers/manifest-reference.mdx>)

[NextPTB Commands](</references/ptb-commands>)
