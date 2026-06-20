<!-- Source: https://docs.sui.io/develop/objects/object-ownership/wrapped -->

* [](</>)
  * [Using Objects](</develop/objects/>)
  * [Types of Object Ownership](</develop/objects/object-ownership/>)
  * Wrapped Objects


On this page

# Wrapped Objects

Wrapping refers to nesting structs to organize data structures in Move. When an object is wrapped, the object no longer exists independently onchain. You can no longer look up the object by its ID, as the object becomes part of the data of the object that wraps it. Most importantly, you can no longer pass the wrapped object as an argument in a Move call. The only access point is through the object that wraps it.

It is not possible to create circular wrapping behavior, where A wraps B, B wraps C, and C also wraps A.

This example shows a basic wrapper pattern:
[code] 
    public struct Foo has key {  
        id: UID,  
        bar: Bar,  
    }  
      
    public struct Bar has store {  
        value: u64,  
    }  
    
[/code]

To embed a struct type in an object with a `key` ability, the struct type must have the `store` ability.

In the preceding example, `Bar` is a normal struct, but it is not an object because it doesn't have the `key` ability. The following code turns `Bar` into an object:
[code] 
    public struct Bar has key, store {  
        id: UID,  
        value: u64,  
    }  
    
[/code]

If you put the object of type `Bar` into an object of type `Foo`, the object type `Foo` wraps the object type `Bar`. The object type `Foo` is the wrapper or wrapping object.

## Create a wrapped object​

This example shows a basic function used to wrap an object:

[examples/move/basics/sources/object_basics.move](<https://github.com/MystenLabs/sui/blob/main/examples/move/basics/sources/object_basics.move>)
[code]
    public fun wrap(o: Object, ctx: &mut TxContext) {  
        transfer::transfer(Wrapper { id: object::new(ctx), o }, ctx.sender());  
    }  
    
[/code]

## Unwrap a wrapped object​

You can take out the wrapped object and transfer it to an address, modify it, delete it, or freeze it. This is called unwrapping. When an object is unwrapped, it becomes an independent object again and can be accessed directly onchain. The object's ID stays the same across wrapping and unwrapping.

This example shows a basic function used to unwrap an object:

[examples/move/basics/sources/object_basics.move](<https://github.com/MystenLabs/sui/blob/main/examples/move/basics/sources/object_basics.move>)
[code]
    #[lint_allow(self_transfer)]  
    public fun unwrap(w: Wrapper, ctx: &TxContext) {  
        let Wrapper { id, o } = w;  
        id.delete();  
        transfer::public_transfer(o, ctx.sender());  
    }  
    
[/code]

## Direct wrapping​

Direct wrapping occurs when an object type contains another object type as a direct field. In direct wrapping, the wrapped object cannot be extracted without destroying the wrapper. This provides strong encapsulation guarantees and is ideal for implementing object locking patterns. Direct wrapping requires explicit contract calls to modify access.

The following example implementation of a trusted swap demonstrates how to use direct wrapping. Assume there is an NFT-style `Object` type that has `scarcity` and `style`. In this example, `scarcity` determines how rare the object is, and `style` determines the object content or how it's rendered. You are only willing to trade this `Object` with one that has identical `scarcity` but with a different `style`.

First, define an object type:
[code] 
    public struct Object has key, store {  
        id: UID,  
        scarcity: u8,  
        style: u8,  
    }  
    
[/code]

In a real application, you might make sure that there is a limited supply of the objects and a mechanism to mint them to a list of owners. For demonstration purposes, this example simplifies creation:
[code] 
    public fun new(scarcity: u8, style: u8, ctx: &mut TxContext): Object {  
        Object { id: object::new(ctx), scarcity, style }  
    }  
    
[/code]

Only object owners can send a transaction to mutate the object. One person cannot send a transaction that would swap their own object with someone else's object.

To swap objects, the same address must own both objects. Anyone who wants to swap their object can send their objects to the third party, such as a site that offers swapping services, and the third party helps perform the swap and send the objects to the appropriate owner.

To ensure that you retain custody of your objects and not give full custody to the third party, use direct wrapping. To define a wrapper object type:
[code] 
    public struct SwapRequest has key {  
        id: UID,  
        owner: address,  
        object: Object,  
        fee: Balance<SUI>,  
    }  
    
[/code]

`SwapRequest` defines a Sui object type, wraps the `object` to swap, and tracks the original `owner` of the object. To define an interface to request a swap by someone who owns an `Object`:
[code] 
    public fun request_swap(  
        object: Object,  
        fee: Coin<SUI>,  
        service: address,  
        ctx: &mut TxContext,  
    ) {  
        assert!(coin::value(&fee) >= MIN_FEE, EFeeTooLow);  
      
        let request = SwapRequest {  
            id: object::new(ctx),  
            owner: ctx.sender(),  
            object,  
            fee: coin::into_balance(fee),  
        };  
      
        transfer::transfer(request, service)  
    }  
      
    
[/code]

In the preceding function, you must pass the object by value so that it is fully consumed and wrapped into `SwapRequest`. The example also provides a fee of type `Coin<SUI>` and checks that the fee is sufficient. The example turns `Coin` into `Balance` when it's put into the `wrapper` object. This is because `Coin` is only used to pass objects, such as transaction inputs or objects sent to addresses. For coin balances that need to be embedded in other structs, use `Balance` instead to avoid the overhead of carrying around an unnecessary `UID` field.

The wrapper object is then sent to the service operator with the address specified in the call as `service`.

The interface for the function that the service operator can call to perform a swap between 2 objects sent from 2 addresses resembles:
[code] 
    public fun execute_swap(s1: SwapRequest, s2: SwapRequest): Balance<SUI>;  
    
[/code]

`s1` and `s2` are 2 wrapped objects that were sent from different object owners to the service operator. Both wrapped objects are passed by value because they eventually need to be [unpacked](<https://move-book.com/move-basics/struct#destructing-structures>).

First, unpack the 2 objects to obtain the inner fields:
[code] 
    let SwapRequest {id: id1, owner: owner1, object: o1, fee: fee1} = s1;  
    let SwapRequest {id: id2, owner: owner2, object: o2, fee: fee2} = s2;  
    
[/code]

Then, check that the swap is legitimate and the 2 objects have identical scarcity but different styles:
[code] 
    assert!(o1.scarcity == o2.scarcity, EBadSwap);  
    assert!(o1.style != o2.style, EBadSwap);  
    
[/code]

To perform the actual swap:
[code] 
    transfer::transfer(o1, owner2);  
    transfer::transfer(o2, owner1);  
    
[/code]

Next, send `o1` to the original owner of `o2`, and send `o2` to the original owner of `o1`. The service can then delete the wrapping `SwapRequest` objects:
[code] 
    id1.delete();  
    id2.delete();  
    
[/code]

Finally, the service merges together `fee1` and `fee2` and returns the result. The service provider can turn the result into a coin or merge it into some larger pool where it collects all fees:
[code] 
    fee1.join(fee2);  
    
[/code]

After this call, the 2 objects are swapped and the service provider collects the service fee.

Because the contract defined only 1 way to deal with `SwapRequest` (`execute_swap`), there is no other way the service operator can interact with `SwapRequest` despite its ownership.

View the full source code in the [`trusted_swap`](<https://github.com/MystenLabs/sui/blob/main/examples/move/trusted_swap>) example.

## Wrapping through `Option`​

When an object `Bar` is directly wrapped into `Foo`, there is not much flexibility, as a `Foo` object must have a `Bar` object in it, and to take out the `Bar` object you must destroy the `Foo` object.

For more flexibility, the wrapping type might not always have the wrapped object in it and the wrapped object might be replaced with a different object at some point.

To demonstrate this consider the following example for creating a warrior game character with a sword and shield. The warrior might have a sword and shield or it might not have either. The warrior should be able to add a sword and shield and replace the current ones at any time. To design this, define a `SimpleWarrior` type:
[code] 
    public struct SimpleWarrior has key {  
        id: UID,  
        sword: Option<Sword>,  
        shield: Option<Shield>,  
    }  
    
[/code]

Each `SimpleWarrior` type has an optional `sword` and `shield` wrapped in it, defined as:
[code] 
    public struct Sword has key, store {  
        id: UID,  
        strength: u8,  
    }  
      
    public struct Shield has key, store {  
        id: UID,  
        armor: u8,  
    }  
    
[/code]

When you create a new warrior, set the `sword` and `shield` to `none` to indicate there is no equipment yet:
[code] 
    public fun create_warrior(ctx: &mut TxContext) {  
        let warrior = SimpleWarrior {  
            id: object::new(ctx),  
            sword: option::none(),  
            shield: option::none(),  
        };  
        transfer::transfer(warrior, ctx.sender())  
    }  
    
[/code]

You can then define functions to equip new swords or new shields:
[code] 
    public fun equip_sword(warrior: &mut SimpleWarrior, sword: Sword, ctx: &mut TxContext) {  
        if (warrior.sword.is_some()) {  
            let old_sword = warrior.sword.extract();  
            transfer::transfer(old_sword, ctx.sender());  
        };  
        warrior.sword.fill(sword);  
    }  
    
[/code]

The function passes a `warrior` as a mutable reference of `SimpleWarrior`, and passes a `sword` by value to wrap it into the `warrior`.

Because `Sword` is a Sui object type without `drop` ability, if the warrior already has a sword equipped, the warrior can't drop that sword. If you call `option::fill` without first calling `equip_sword`, an error occurs. `equip_sword` checks whether there is already a sword equipped and if so, removes it and sends it back to the sender. To the player, this returns an equipped sword to their inventory when they equip the different sword.

View the source code in the [`simple_warrior`](<https://github.com/MystenLabs/sui/tree/main/examples/move/simple_warrior>) example or check out the [`hero`](<https://github.com/MystenLabs/sui/tree/main/examples/move/hero>) example for a more complex implementation.

## Wrapping through `vector`​

The concept of wrapping objects in a `vector` field of another object is similar to wrapping through `Option`, as an object can contain 0, 1, or many wrapped objects of the same type.

To wrap an object through `vector`:
[code] 
    public struct Pet has key, store {  
        id: UID,  
        cuteness: u64,  
    }  
      
    public struct Farm has key {  
        id: UID,  
        pets: vector<Pet>,  
    }  
    
[/code]

This example wraps a `vector` of `Pet` in `Farm` and can be accessed only through the `Farm` object.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/objects/object-ownership/wrapped.mdx>)

[PreviousImmutable Objects](</develop/objects/object-ownership/immutable>)[NextParty Objects](</develop/objects/object-ownership/party>)

  * Create a wrapped object
  * Unwrap a wrapped object
  * Direct wrapping
  * Wrapping through `Option`
  * Wrapping through `vector`
