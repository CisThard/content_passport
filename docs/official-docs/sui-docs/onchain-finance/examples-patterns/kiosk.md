<!-- Source: https://docs.sui.io/onchain-finance/examples-patterns/kiosk -->

* [](</>)
  * [Example Asset Patterns](</onchain-finance/examples-patterns/>)
  * Kiosk Joining Patterns


On this page

# Kiosk Joining Patterns

This reference implementation uses the [Kiosk standard](</onchain-finance/kiosk>) to ensure that tokenized assets operate within their defined policy. Use the implementation as presented to have marketable tokenized assets that support rules like royalties and commissions.

If Kiosk is not a requirement, you can exclude the unlock module and the proxy methods related to transfer policies.

Instead of implementing the unlock functionality in multiple steps inside a PTB, you could create a method that performs the purchase, borrowing, unlocking, and joining of an asset all in one function. The following example shows how that would look for the joining operation:
[code] 
    public fun kiosk_join<T>(  
    	kiosk: &mut Kiosk,  
      kiosk_cap: &KioskOwnerCap,  
    	protected_tp: &ProtectedTP<TokenizedAsset<T>>,  
      ta1_id: ID,  
      ta2_id: ID,  
      ctx: &mut TxContext  
    ) {  
      
    	kiosk::list<TokenizedAsset<T>>(kiosk, kiosk_cap, ta2_id, 0);  
    	let (ta1, promise_ta1) = kiosk::borrow_val(kiosk, kiosk_cap, ta1_id);  
    	let coin = coin::zero<SUI>(ctx);  
    	let (ta2, request) = kiosk::purchase(kiosk, ta2_id, coin);  
      
    	let tp_ref = proxy::transfer_policy(protected_tp);  
    	let (_item, _paid, _from) = transfer_policy::confirm_request(  
    	    tp_ref,  
    	    request  
    	);  
      
    	tokenized_asset::join(&mut ta1, ta2);  
      
    	kiosk::return_val(kiosk, ta1, promise_ta1);  
    }  
    
[/code]

### Example alteration for use case​

caution

The following example splits (effectively replacing) the `AssetCap<T>` into two new objects: the `Treasury<T>` and the `AdminCap<T>`. Carefully re-design the access to methods defined in the original package because this change can introduce unwanted effects. This required re-design is not entirely contained in this example and only some methods are changed for demonstration purposes.

Assume you want to allow users to also burn assets, not only admins. This still needs to be an authorized operation, but it allows the flexibility of consuming tokenized assets for a use case-specific purpose (for example, burning all of the collectibles you have gathered to combine them). To achieve this, the admin can mint tickets that contain the ID of the asset they are allowed to burn. To support this functionality, you must redesign the smart contract and separate the admin from the asset treasury of each asset, which now holds only supply-related information. The following sample changes are needed:

#### Structs​

Create a ticket that has only the `key` ability so that the receiver cannot trade it:
[code] 
    struct BurnTicket<phantom T> has key {  
    	id: UID,  
    	tokenized_asset_id: ID // the tokenized asset that this ticket gives access to burn  
    }  
    
[/code]

The struct that now holds only treasury-related information (resulting from splitting the `AssetCap`, which is no longer part of this design) is created as a shared object. Change functions like `mint` to also take as input both the `Treasury` object and the `AdminCap` object:
[code] 
    struct Treasury<phantom T> has key, store {  
    	id: UID,  
    	supply: Supply<T>,  
      total_supply: u64,  
    }  
    
[/code]

The other half of the `AssetCap` functionality retains the admin capability and the configuration of burnability. It is an owned object sent to the creator of type `<T>`:
[code] 
    struct AdminCap<phantom T> has key, store {  
    	id: UID,  
    	burnable: bool  
    }  
    
[/code]

#### Method signatures​

The `AdminCap` here acts both as an admin capability and a type insurance, encoding the information of both the asset type that is allowed to be deleted with this ticket. This function should assert that the asset `T` is burnable and return a `BurnTicket<T>`:
[code] 
    public fun mint_burn_ticket<T>(  
    	cap: &AdminCap<T>,  
    	tokenized_asset_id: ID,  
    	ctx: &mut TxContext  
    ): BurnTicket  
    
[/code]

Burning on the user side requires accessing the shared `Treasury` object. This function burns the tokenized asset and decreases the supply:
[code] 
    public fun burn_with_ticket<T>(  
    	treasury: &mut Treasury<T>,  
    	self: TokenizedAsset<T>,  
    	ticket: BurnTicket<T>)  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/examples-patterns/kiosk.mdx>)

[PreviousNFT Rentals](</onchain-finance/examples-patterns/nft-rental>)[NextWebAssembly and Template Pattern](</onchain-finance/examples-patterns/wasm-template>)

  * Example alteration for use case
