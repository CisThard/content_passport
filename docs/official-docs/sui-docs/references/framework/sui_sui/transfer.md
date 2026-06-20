<!-- Source: https://docs.sui.io/references/framework/sui_sui/transfer -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * transfer


# Module sui::transfer
[code]
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::bcs](</references/framework/sui_std/bcs#std_bcs>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::string](</references/framework/sui_std/string#std_string>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::address](</references/framework/sui_sui/address#sui_address>);
    **use** [sui::hex](</references/framework/sui_sui/hex#sui_hex>);
    **use** [sui::object](</references/framework/sui_sui/object#sui_object>);
    **use** [sui::party](</references/framework/sui_sui/party#sui_party>);
    **use** [sui::tx_context](</references/framework/sui_sui/tx_context#sui_tx_context>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct Receiving​

This represents the ability to [receive](</references/framework/sui_sui/transfer#sui_transfer_receive>) an object of type T.  
This type is ephemeral per-transaction and cannot be stored on-chain.  
This does not represent the obligation to receive the object that it references, but simply the ability to receive the object with object ID id at version version if you can prove mutable access to the parent object during the transaction.  
Internals of this struct are opaque outside this module.
[code] 
    **public** **struct** [Receiving](</references/framework/sui_sui/transfer#sui_transfer_Receiving>)<**phantom** T: key> **has** drop
    
[/code]

Click to openFields

id: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
version: u64
    

## Constants​

Shared an object that was previously created. Shared objects must currently be constructed in the transaction they are created.
[code] 
    **const** [ESharedNonNewObject](</references/framework/sui_sui/transfer#sui_transfer_ESharedNonNewObject>): u64 = 0;
    
[/code]

Serialization of the object failed.
[code] 
    **const** [EBCSSerializationFailure](</references/framework/sui_sui/transfer#sui_transfer_EBCSSerializationFailure>): u64 = 1;
    
[/code]

The object being received is not of the expected type.
[code] 
    **const** [EReceivingObjectTypeMismatch](</references/framework/sui_sui/transfer#sui_transfer_EReceivingObjectTypeMismatch>): u64 = 2;
    
[/code]

Represents both the case where the object does not exist and the case where the object is not able to be accessed through the parent that is passed-in.
[code] 
    **const** [EUnableToReceiveObject](</references/framework/sui_sui/transfer#sui_transfer_EUnableToReceiveObject>): u64 = 3;
    
[/code]

Shared object operations such as wrapping, freezing, and converting to owned are not allowed.
[code] 
    **const** [ESharedObjectOperationNotSupported](</references/framework/sui_sui/transfer#sui_transfer_ESharedObjectOperationNotSupported>): u64 = 4;
    
[/code]

Operation is not yet supported by the network. The functionality might still be in development.
[code] 
    **const** [ENotSupported](</references/framework/sui_sui/transfer#sui_transfer_ENotSupported>): u64 = 5;
    
[/code]
[code] 
    #[error]
    **const** [EInvalidPartyPermissions](</references/framework/sui_sui/transfer#sui_transfer_EInvalidPartyPermissions>): vector<u8> = b"Party [transfer](</references/framework/sui_sui/transfer#sui_transfer>) is currently limited to one [party](</references/framework/sui_sui/party#sui_party>).";
    
[/code]

## Function transfer​

Transfer ownership of obj to recipient. obj must have the key attribute, which (in turn) ensures that obj has a globally unique ID. Note that if the recipient address represents an object ID, the obj sent will be inaccessible after the transfer (though they will be retrievable at a future date once new features are added).  
This function has custom rules performed by the Sui Move bytecode verifier that ensures that T is an object defined in the module where [transfer](</references/framework/sui_sui/transfer#sui_transfer>) is invoked. Use [public_transfer](</references/framework/sui_sui/transfer#sui_transfer_public_transfer>) to transfer an object with store outside of its module.
[code] 
    **public** **fun** [transfer](</references/framework/sui_sui/transfer#sui_transfer>)<T: key>(obj: T, recipient: **address**)
    
[/code]

## Function public_transfer​

Transfer ownership of obj to recipient. obj must have the key attribute, which (in turn) ensures that obj has a globally unique ID. Note that if the recipient address represents an object ID, the obj sent will be inaccessible after the transfer (though they will be retrievable at a future date once new features are added).  
The object must have store to be transferred outside of its module.
[code] 
    **public** **fun** [public_transfer](</references/framework/sui_sui/transfer#sui_transfer_public_transfer>)<T: key, store>(obj: T, recipient: **address**)
    
[/code]

## Function party_transfer​

Transfer ownership of obj to the [party](</references/framework/sui_sui/party#sui_party>). This transfer behaves similar to both [transfer](</references/framework/sui_sui/transfer#sui_transfer>) and [share_object](</references/framework/sui_sui/transfer#sui_transfer_share_object>). It is similar to [transfer](</references/framework/sui_sui/transfer#sui_transfer>) in that the object is authorized for use only by the recipient(s), in this case the [party](</references/framework/sui_sui/party#sui_party>). This means that only the members can use the object as an input to a transaction. It is similar to [share_object](</references/framework/sui_sui/transfer#sui_transfer_share_object>) two ways. One in that the object can potentially be used by anyone, as defined by the default permissions of the Party value. The other in that the object must be used in consensus and cannot be used in the fast path.  
This function has custom rules performed by the Sui Move bytecode verifier that ensures that T is an object defined in the module where [transfer](</references/framework/sui_sui/transfer#sui_transfer>) is invoked. Use [public_party_transfer](</references/framework/sui_sui/transfer#sui_transfer_public_party_transfer>) to transfer an object with store outside of its module.
[code] 
    **public** **fun** [party_transfer](</references/framework/sui_sui/transfer#sui_transfer_party_transfer>)<T: key>(obj: T, [party](</references/framework/sui_sui/party#sui_party>): [sui::party::Party](</references/framework/sui_sui/party#sui_party_Party>))
    
[/code]

## Function public_party_transfer​

Transfer ownership of obj to the [party](</references/framework/sui_sui/party#sui_party>). This transfer behaves similar to both [transfer](</references/framework/sui_sui/transfer#sui_transfer>) and [share_object](</references/framework/sui_sui/transfer#sui_transfer_share_object>). It is similar to [transfer](</references/framework/sui_sui/transfer#sui_transfer>) in that the object is authorized for use only by the recipient(s), in this case the [party](</references/framework/sui_sui/party#sui_party>). This means that only the members can use the object as an input to a transaction. It is similar to [share_object](</references/framework/sui_sui/transfer#sui_transfer_share_object>) two ways. One in that the object can potentially be used by anyone, as defined by the default permissions of the Party value. The other in that the object must be used in consensus and cannot be used in the fast path.  
The object must have store to be transferred outside of its module.
[code] 
    **public** **fun** [public_party_transfer](</references/framework/sui_sui/transfer#sui_transfer_public_party_transfer>)<T: key, store>(obj: T, [party](</references/framework/sui_sui/party#sui_party>): [sui::party::Party](</references/framework/sui_sui/party#sui_party_Party>))
    
[/code]

## Function freeze_object​

Freeze obj. After freezing obj becomes immutable and can no longer be transferred or mutated.  
This function has custom rules performed by the Sui Move bytecode verifier that ensures that T is an object defined in the module where [freeze_object](</references/framework/sui_sui/transfer#sui_transfer_freeze_object>) is invoked. Use [public_freeze_object](</references/framework/sui_sui/transfer#sui_transfer_public_freeze_object>) to freeze an object with store outside of its module.
[code] 
    **public** **fun** [freeze_object](</references/framework/sui_sui/transfer#sui_transfer_freeze_object>)<T: key>(obj: T)
    
[/code]

## Function public_freeze_object​

Freeze obj. After freezing obj becomes immutable and can no longer be transferred or mutated.  
The object must have store to be frozen outside of its module.
[code] 
    **public** **fun** [public_freeze_object](</references/framework/sui_sui/transfer#sui_transfer_public_freeze_object>)<T: key, store>(obj: T)
    
[/code]

## Function share_object​

Turn the given object into a mutable shared object that everyone can access and mutate.  
This is irreversible, i.e. once an object is shared, it will stay shared forever.  
Aborts with [ESharedNonNewObject](</references/framework/sui_sui/transfer#sui_transfer_ESharedNonNewObject>) of the object being shared was not created in this transaction. This restriction may be relaxed in the future.  
This function has custom rules performed by the Sui Move bytecode verifier that ensures that T is an object defined in the module where [share_object](</references/framework/sui_sui/transfer#sui_transfer_share_object>) is invoked. Use [public_share_object](</references/framework/sui_sui/transfer#sui_transfer_public_share_object>) to share an object with store outside of its module.
[code] 
    **public** **fun** [share_object](</references/framework/sui_sui/transfer#sui_transfer_share_object>)<T: key>(obj: T)
    
[/code]

## Function public_share_object​

Turn the given object into a mutable shared object that everyone can access and mutate.  
This is irreversible, i.e. once an object is shared, it will stay shared forever.  
Aborts with [ESharedNonNewObject](</references/framework/sui_sui/transfer#sui_transfer_ESharedNonNewObject>) of the object being shared was not created in this transaction. This restriction may be relaxed in the future.  
The object must have store to be shared outside of its module.
[code] 
    **public** **fun** [public_share_object](</references/framework/sui_sui/transfer#sui_transfer_public_share_object>)<T: key, store>(obj: T)
    
[/code]

## Function receive​

Given mutable (i.e., locked) access to the parent and a [Receiving](</references/framework/sui_sui/transfer#sui_transfer_Receiving>) argument referencing an object of type T owned by parent use the to_receive argument to receive and return the referenced owned object of type T.  
This function has custom rules performed by the Sui Move bytecode verifier that ensures that T is an object defined in the module where [receive](</references/framework/sui_sui/transfer#sui_transfer_receive>) is invoked. Use [public_receive](</references/framework/sui_sui/transfer#sui_transfer_public_receive>) to receivne an object with store outside of its module.
[code] 
    **public** **fun** [receive](</references/framework/sui_sui/transfer#sui_transfer_receive>)<T: key>(parent: &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), to_receive: [sui::transfer::Receiving](</references/framework/sui_sui/transfer#sui_transfer_Receiving>)<T>): T
    
[/code]

## Function public_receive​

Given mutable (i.e., locked) access to the parent and a [Receiving](</references/framework/sui_sui/transfer#sui_transfer_Receiving>) argument referencing an object of type T owned by parent use the to_receive argument to receive and return the referenced owned object of type T.  
The object must have store to be received outside of its defining module.
[code] 
    **public** **fun** [public_receive](</references/framework/sui_sui/transfer#sui_transfer_public_receive>)<T: key, store>(parent: &**mut** [sui::object::UID](</references/framework/sui_sui/object#sui_object_UID>), to_receive: [sui::transfer::Receiving](</references/framework/sui_sui/transfer#sui_transfer_Receiving>)<T>): T
    
[/code]

## Function receiving_object_id​

Return the object ID that the given [Receiving](</references/framework/sui_sui/transfer#sui_transfer_Receiving>) argument references.
[code] 
    **public** **fun** [receiving_object_id](</references/framework/sui_sui/transfer#sui_transfer_receiving_object_id>)<T: key>(receiving: &[sui::transfer::Receiving](</references/framework/sui_sui/transfer#sui_transfer_Receiving>)<T>): [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>)
    
[/code]

## Function freeze_object_impl​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [freeze_object_impl](</references/framework/sui_sui/transfer#sui_transfer_freeze_object_impl>)<T: key>(obj: T)
    
[/code]

## Function share_object_impl​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [share_object_impl](</references/framework/sui_sui/transfer#sui_transfer_share_object_impl>)<T: key>(obj: T)
    
[/code]

## Function party_transfer_impl​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [party_transfer_impl](</references/framework/sui_sui/transfer#sui_transfer_party_transfer_impl>)<T: key>(obj: T, default_permissions: u64, addresses: vector<**address** >, permissions: vector<u64>)
    
[/code]

## Function transfer_impl​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [transfer_impl](</references/framework/sui_sui/transfer#sui_transfer_transfer_impl>)<T: key>(obj: T, recipient: **address**)
    
[/code]

## Function receive_impl​
[code] 
    **fun** [receive_impl](</references/framework/sui_sui/transfer#sui_transfer_receive_impl>)<T: key>(parent: **address** , to_receive: [sui::object::ID](</references/framework/sui_sui/object#sui_object_ID>), version: u64): T
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/transfer.md>)

[Previoustoken](</references/framework/sui_sui/token>)[Nexttransfer_policy](</references/framework/sui_sui/transfer_policy>)
