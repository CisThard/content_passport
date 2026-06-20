<!-- Source: https://docs.sui.io/references/framework/sui_sui/party -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * party


# Module sui::party
[code]
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    **use** [sui::vec_map](</references/framework/sui_sui/vec_map#sui_vec_map>);
    
[/code]

## Struct Party​

The permissions that apply to a party object. If the transaction sender has an entry in the members map, the permissions in that entry apply. Otherwise, the default permissions are used.  
If the party has the [READ](</references/framework/sui_sui/party#sui_party_READ>) permission, the object can be taken as an immutable input.  
If the party has the [WRITE](</references/framework/sui_sui/party#sui_party_WRITE>), [DELETE](</references/framework/sui_sui/party#sui_party_DELETE>), or [TRANSFER](</references/framework/sui_sui/party#sui_party_TRANSFER>) permissions, the object can be taken as a mutable input. Additional restrictions pertaining to each permission are checked at the end of transaction execution.
[code] 
    **public** **struct** [Party](</references/framework/sui_sui/party#sui_party_Party>) **has** **copy** , drop
    
[/code]

Click to openFields

default: [sui::party::Permissions](</references/framework/sui_sui/party#sui_party_Permissions>)
     The permissions that apply if no specific permissions are set in the members map. 
members: [sui::vec_map::VecMap](</references/framework/sui_sui/vec_map#sui_vec_map_VecMap>)<**address** , [sui::party::Permissions](</references/framework/sui_sui/party#sui_party_Permissions>)>
     The permissions per transaction sender. 

## Struct Permissions​

The permissions that a party has. The permissions are a bitset of the [READ](</references/framework/sui_sui/party#sui_party_READ>), [WRITE](</references/framework/sui_sui/party#sui_party_WRITE>), [DELETE](</references/framework/sui_sui/party#sui_party_DELETE>), and [TRANSFER](</references/framework/sui_sui/party#sui_party_TRANSFER>) constants.
[code] 
    **public** **struct** [Permissions](</references/framework/sui_sui/party#sui_party_Permissions>) **has** **copy** , drop
    
[/code]

Click to openFields

0: u64
    

## Constants​

A party can read the object, taking it as an immutable argument. This restriction is checked when sending the transaction.
[code] 
    **const** [READ](</references/framework/sui_sui/party#sui_party_READ>): u8 = 1;
    
[/code]

The party can mutate the object, but not change its owner or delete it. This is checked at end end of transaction execution.
[code] 
    **const** [WRITE](</references/framework/sui_sui/party#sui_party_WRITE>): u8 = 2;
    
[/code]

The party can delete the object, but not otherwise modify it. This is checked at the end of transaction execution.
[code] 
    **const** [DELETE](</references/framework/sui_sui/party#sui_party_DELETE>): u8 = 4;
    
[/code]

The party can change the owner of the object, but not otherwise modify it. This is checked at the end of transaction execution.
[code] 
    **const** [TRANSFER](</references/framework/sui_sui/party#sui_party_TRANSFER>): u8 = 8;
    
[/code]

No permissions.
[code] 
    **const** [NO_PERMISSIONS](</references/framework/sui_sui/party#sui_party_NO_PERMISSIONS>): u64 = 0;
    
[/code]

All permissions.
[code] 
    **const** [ALL_PERMISSIONS](</references/framework/sui_sui/party#sui_party_ALL_PERMISSIONS>): u64 = 15;
    
[/code]

## Function single_owner​

Creates a [Party](</references/framework/sui_sui/party#sui_party_Party>) value with a single "owner" that has all permissions. No other party has any permissions. And there are no default permissions.
[code] 
    **public** **fun** [single_owner](</references/framework/sui_sui/party#sui_party_single_owner>)(owner: **address**): [sui::party::Party](</references/framework/sui_sui/party#sui_party_Party>)
    
[/code]

## Macro function transfer​

A helper **macro** that calls [sui::transfer::party_transfer](</references/framework/sui_sui/transfer#sui_transfer_party_transfer>).
[code] 
    **public** **macro** **fun** [transfer](</references/framework/sui_sui/transfer#sui_transfer>)<$T: key>($self: [sui::party::Party](</references/framework/sui_sui/party#sui_party_Party>), $obj: $T)
    
[/code]

## Macro function public_transfer​

A helper **macro** that calls [sui::transfer::public_party_transfer](</references/framework/sui_sui/transfer#sui_transfer_public_party_transfer>).
[code] 
    **public** **macro** **fun** [public_transfer](</references/framework/sui_sui/party#sui_party_public_transfer>)<$T: key, store>($self: [sui::party::Party](</references/framework/sui_sui/party#sui_party_Party>), $obj: $T)
    
[/code]

## Function empty​
[code] 
    **fun** [empty](</references/framework/sui_sui/party#sui_party_empty>)(): [sui::party::Party](</references/framework/sui_sui/party#sui_party_Party>)
    
[/code]

## Function set_permissions​
[code] 
    **fun** [set_permissions](</references/framework/sui_sui/party#sui_party_set_permissions>)(p: &**mut** [sui::party::Party](</references/framework/sui_sui/party#sui_party_Party>), **address** : **address** , permissions: [sui::party::Permissions](</references/framework/sui_sui/party#sui_party_Permissions>))
    
[/code]

## Function is_single_owner​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [is_single_owner](</references/framework/sui_sui/party#sui_party_is_single_owner>)(p: &[sui::party::Party](</references/framework/sui_sui/party#sui_party_Party>)): bool
    
[/code]

## Function into_native​
[code] 
    **public**([package](</references/framework/sui_sui/package#sui_package>)) **fun** [into_native](</references/framework/sui_sui/party#sui_party_into_native>)(p: [sui::party::Party](</references/framework/sui_sui/party#sui_party_Party>)): (u64, vector<**address** >, vector<u64>)
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/party.md>)

[Previouspackage](</references/framework/sui_sui/package>)[Nextpay](</references/framework/sui_sui/pay>)
