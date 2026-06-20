<!-- Source: https://docs.sui.io/develop/objects/object-ownership/immutable -->

* [](</>)
  * [Using Objects](</develop/objects/>)
  * [Types of Object Ownership](</develop/objects/object-ownership/>)
  * Immutable Objects


On this page

# Immutable Objects

Objects on Sui can either be immutable or mutable. An immutable object cannot be mutated, transferred, or deleted. These objects have no owner and are freely accessible to everyone.

## Create immutable objects​

To make an object immutable, call the [`sui::transfer::public_freeze_object`](</references/framework/sui_sui/transfer#sui_transfer_public_freeze_object>) function from the [transfer module](<https://github.com/MystenLabs/sui/blob/main/crates/sui-framework/packages/sui-framework/sources/transfer.move>):
[code] 
    public native fun public_freeze_object<T: key>(obj: T);  
    
[/code]

This call permanently makes the object immutable. The operation cannot be reversed. Only freeze objects when you are certain they never need modification.

You can see this function used in the [`color_object` example module](<https://github.com/MystenLabs/sui/blob/main/examples/move/color_object/sources/example.move>) tests. The test creates a new address-owned `ColorObject` object, then calls `public_freeze_object` to turn it into an immutable object.

[examples/move/color_object/sources/example.move](<https://github.com/MystenLabs/sui/blob/main/examples/move/color_object/sources/example.move>)
[code]
    #[test]  
    fun test_immutable() {  
        let mut ts = ts::begin(@0x0);  
        let alice = @0xA;  
        let bob = @0xB;  
      
        {  
            ts.next_tx(alice);  
            let c = new(255, 0, 255, ts.ctx());  
            transfer::public_freeze_object(c);  
        };  
      
        {  
            ts.next_tx(alice);  
            assert!(!ts.has_most_recent_for_sender<ColorObject>(), 0);  
        };  
      
        {  
            ts.next_tx(bob);  
            let object: ColorObject = ts.take_immutable();  
            let (red, green, blue) = object.get_color();  
            assert!(red == 255 && green == 0 && blue == 255, 0);  
            ts::return_immutable(object);  
        };  
      
        ts.end();  
    }  
    
[/code]

In this test, you must own a `ColorObject` initially. After freezing, the object becomes immutable and ownerless.

The [`sui::transfer::public_freeze_object`](</references/framework/sui_sui/transfer#sui_transfer_public_freeze_object>) function requires that you pass the object by value. If you are allowed to pass the object by a mutable reference, you could still mutate the object after the [`sui::transfer::public_freeze_object`](</references/framework/sui_sui/transfer#sui_transfer_public_freeze_object>) call. This contradicts the fact that it should have become immutable.

Alternatively, you can also provide an API that creates an immutable object at creation:
[code] 
    public fun create_immutable(red: u8, green: u8, blue: u8, ctx: &mut TxContext) {  
        let color_object = new(red, green, blue, ctx);  
        transfer::public_freeze_object(color_object)  
    }  
    
[/code]

This function creates a new `ColorObject` and immediately makes it immutable before it has an owner.

## When to use immutable objects​

After an object becomes immutable, the rules of who can use this object in Move calls change:

  1. You can only pass an immutable object as a read-only, immutable reference to Move functions as `&T`.

  2. All network participants can access immutable objects.


Consider a function that copies the value of one object to another:
[code] 
    public fun copy_into(from: &ColorObject, into: &mut ColorObject);  
    
[/code]

In this function, anyone can pass an immutable object as the first argument, `from`, but not the second argument. Because you can never change immutable objects, there is no data race, even when multiple transactions are using the same immutable object at the same time. The existence of immutable objects does not pose any requirement on consensus.

## Interact with immutable objects​

First, view the objects you own:
[code] 
    $ export ADDR=`sui client active-address`  
    
[/code]
[code] 
    $ sui client objects $ADDR  
    
[/code]

Publish the `ColorObject` code onchain using the Sui CLI:

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

You should see an object with the ID you used for `$OBJECT`. To turn it into an immutable object:
[code] 
    $ sui client call --gas-budget <GAS-AMOUNT> --package $PACKAGE --module "color_object" --function "freeze_object" --args \"$OBJECT\"  
    
[/code]

View the list of objects again:
[code] 
    $ sui client objects $ADDR  
    
[/code]

`$OBJECT` is no longer listed. It is no longer owned by anyone. You can see that it is now immutable by querying the object information:
[code] 
    $ sui client object $OBJECT  
    
[/code]

The response includes:
[code] 
    Owner: Immutable  // This field shows the object's immutable status  
    
[/code]

If you try to mutate it:
[code] 
    $ sui client call --gas-budget <GAS-AMOUNT> --package $PACKAGE --module "color_object" --function "update" --args \"$OBJECT\" 0 0 0  
    
[/code]

The response indicates that you cannot pass an immutable object to a mutable argument.

## Test immutable objects​

You can interact with immutable objects in unit tests using `test_scenario::take_immutable<T>` to take an immutable object wrapper from global storage, and `test_scenario::return_immutable` to return the wrapper back to the global storage.

The `test_scenario::take_immutable<T>` function is required because you can access immutable objects solely through read-only references. The `test_scenario` runtime keeps track of the usage of this immutable object. If the compiler does not return the object through `test_scenario::return_immutable` before the start of the next transaction, the test stops.
[code] 
    let sender1 = @0x1;  
    let scenario_val = test_scenario::begin(sender1);  
    let scenario = &mut scenario_val;  
    {  
        let ctx = test_scenario::ctx(scenario);  
        color_object::create_immutable(255, 0, 255, ctx);  
    };  
    scenario.next_tx(sender1);  
    {  
        // has_most_recent_for_sender returns false for immutable objects.  
        assert!(!test_scenario::has_most_recent_for_sender<ColorObject>(scenario))  
    };  
    
[/code]

This test submits a transaction as `sender1`, which tries to create an immutable object.

The `has_most_recent_for_sender<ColorObject>` function no longer returns `true`, because the object is no longer owned.

To show that this object is indeed not owned by anyone, start the next transaction with `sender2`. It uses `take_immutable` and succeeds. This means that any sender can take an immutable object. To return the object, call the `return_immutable` function.
[code] 
    // Any sender can work.  
    let sender2 = @0x2;  
    scenario.next_tx(sender2);  
    {  
        let object = test_scenario::take_immutable<ColorObject>(scenario);  
        let (red, green, blue) = color_object::get_color(object);  
        assert!(red == 255 && green == 0 && blue == 255)  
        test_scenario::return_immutable(object);  
    };  
    
[/code]

To verify immutability, create a function attempting to modify a `ColorObject`:
[code] 
    public fun update(  
        object: &mut ColorObject,  
        red: u8, green: u8, blue: u8,  
    ) {  
        object.red = red;  
        object.green = green;  
        object.blue = blue;  
    }  
    
[/code]

The function fails because the `ColorObject` is immutable.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/objects/object-ownership/immutable.mdx>)

[PreviousShared Objects](</develop/objects/object-ownership/shared>)[NextWrapped Objects](</develop/objects/object-ownership/wrapped>)

  * Create immutable objects
  * When to use immutable objects
  * Interact with immutable objects
  * Test immutable objects
