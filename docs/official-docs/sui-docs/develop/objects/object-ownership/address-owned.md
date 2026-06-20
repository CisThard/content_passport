<!-- Source: https://docs.sui.io/develop/objects/object-ownership/address-owned -->

* [](</>)
  * [Using Objects](</develop/objects/>)
  * [Types of Object Ownership](</develop/objects/object-ownership/>)
  * Address-Owned Objects


On this page

# Address-Owned Objects

Address-owned objects are owned by a 32-byte address. 32-byte addresses are either an account address derived from a particular signature scheme or an object ID. An address-owned object is only accessible to its owner. You can transfer objects that you own to different addresses.

## Create address-owned objects​

Use these [`transfer` module](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/transfer.move>) functions to create address-owned objects:

  * Use the [`sui::transfer::transfer`](</references/framework/sui_sui/transfer#sui_transfer_transfer>) function if you are defining [custom transfer rules](</develop/objects/transfers/custom-rules>) for the object.

  * Use the [`sui::transfer::public_transfer`](</references/framework/sui_sui/transfer#sui_transfer_public_transfer>) function to create an address-owned object if the object has the `store` capability.


[code] 
    public fun transfer<T: key>(obj: T, recipient: address)  
    public fun public_transfer<T: key + store>(obj: T, recipient: address)  
    
[/code]

An object's ownership can change over the life of that object, either by adding it as a [dynamic object field](</develop/objects/dynamic-fields>), transferring it to a different address, or making it [immutable](</develop/objects/object-ownership/immutable>). However, after you create an object and set its ownership, it cannot be [shared](</develop/objects/object-ownership/shared>).

[examples/move/basics/sources/object_basics.move](<https://github.com/MystenLabs/sui/blob/main/examples/move/basics/sources/object_basics.move>)
[code]
    public fun create(value: u64, recipient: address, ctx: &mut TxContext) {  
        transfer::public_transfer(  
            Object { id: object::new(ctx), value },  
            recipient,  
        )  
    }  
    
[/code]

## When to use address-owned objects​

Use address-owned objects when you need:

  * Single ownership

  * Better performance than shared objects

  * Avoidance of consensus sequencing


## Interact with address-owned objects​

You can access address-owned objects in 2 different ways depending on whether the address owner of the object corresponds to an address or an object ID.

If the address owner of the object is an account address, then you can use and access it directly as an owned object during the execution of a transaction signed by that address. Other addresses cannot access owned objects in any way.

If the address owner of the object corresponds to an object ID, then you must access and dynamically authenticate it during the execution of the transaction using the mechanisms defined in [Transfer to Object](</develop/objects/transfers/transfer-to-object>).

To interact with an address-owned object through the CLI, first view the objects you own:
[code] 
    $ export ADDR=`sui client active-address`  
    
[/code]
[code] 
    $ sui client objects $ADDR  
    
[/code]

You can see [`sui::transfer::public_transfer`](</references/framework/sui_sui/transfer#sui_transfer_public_transfer>) function used in the [`color_object` example module](<https://github.com/MystenLabs/sui/blob/main/examples/move/color_object/sources/example.move>) tests. The test creates a new address-owned `ColorObject` object, then calls `public_transfer` to transfer it to the owner's address.

Save the [`color_object` example code](<https://github.com/MystenLabs/sui/blob/main/examples/move/color_object/sources/example.move>), then publish the `ColorObject` code onchain using the Sui CLI:

tip

Beginning with the Sui `v1.24.1` [release](<https://github.com/MystenLabs/sui/releases/tag/mainnet-v1.24.1>), the `--gas-budget` option is no longer required for CLI commands.
[code] 
    $ sui client publish $ROOT/examples/move/color_object --gas-budget <GAS-AMOUNT>  
    
[/code]

Set the package object ID to the `$PACKAGE` environment variable, if you have it set. Then create a new `ColorObject`:
[code] 
    $ sui client call --gas-budget <GAS-AMOUNT> --package $PACKAGE --module "color_object" --function "create" --args 0 255 0  
    
[/code]

Set the newly created object ID to `$OBJECT`. To view the objects in the current active address:
[code] 
    $ sui client objects $ADDR  
    
[/code]

You can see that it is now owned by your address by querying the object information and viewing the `Owner` field in the output:
[code] 
    $ sui client object $OBJECT  
    
[/code]

## Test address-owned objects​

The following test creates an address-owned object, transfers it to the owner, then verifies that the owner field is correct:

[examples/move/color_object/sources/example.move](<https://github.com/MystenLabs/sui/blob/main/examples/move/color_object/sources/example.move>)
[code]
    #[test]  
    fun test_transfer() {  
        let mut ts = ts::begin(@0x0);  
        let sender = @0xA;  
        let recipient = @0xB;  
      
        // Create a ColorObject and transfer it to sender.  
        {  
            ts.next_tx(sender);  
            let c = new(255, 0, 255, ts.ctx());  
            transfer::public_transfer(c, @0xA);  
        };  
      
        // Transfer the object to recipient.  
        {  
            ts.next_tx(sender);  
            let object: ColorObject = ts.take_from_sender();  
            transfer::public_transfer(object, recipient);  
        };  
      
        // Check that sender no longer owns the object.  
        {  
            ts.next_tx(sender);  
            assert!(!ts.has_most_recent_for_sender<ColorObject>(), 0);  
        };  
      
        // Check that recipient now owns the object.  
        {  
            ts.next_tx(recipient);  
            assert!(ts.has_most_recent_for_sender<ColorObject>(), 0);  
        };  
      
        ts.end();  
    }  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/objects/object-ownership/address-owned.mdx>)

[PreviousTypes of Object Ownership](</develop/objects/object-ownership/>)[NextShared Objects](</develop/objects/object-ownership/shared>)

  * Create address-owned objects
  * When to use address-owned objects
  * Interact with address-owned objects
  * Test address-owned objects
