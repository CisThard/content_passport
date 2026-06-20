<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/unions/owner -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Unions
  * Owner


# Owner

The object's owner kind.
[code] 
    union Owner = AddressOwner | ObjectOwner | Shared | Immutable | ConsensusAddressOwner  
    
[/code]

### Possible types​

#### [`Owner.**AddressOwner**`](</references/sui-api/sui-graphql/beta/reference/types/objects/address-owner>) object​

Object is exclusively owned by a single address, and is mutable.

#### [`Owner.**ObjectOwner**`](</references/sui-api/sui-graphql/beta/reference/types/objects/object-owner>) object​

Object is exclusively owned by a single object, and is mutable. Note that the owning object may be inaccessible because it is wrapped.

#### [`Owner.**Shared**`](</references/sui-api/sui-graphql/beta/reference/types/objects/shared>) object​

Object is shared, can be used by any address, and is mutable.

#### [`Owner.**Immutable**`](</references/sui-api/sui-graphql/beta/reference/types/objects/immutable>) object​

Object is accessible to all addresses, and is immutable.

#### [`Owner.**ConsensusAddressOwner**`](</references/sui-api/sui-graphql/beta/reference/types/objects/consensus-address-owner>) object​

Object is exclusively owned by a single adderss and sequenced via consensus.

### Member Of​

[`CoinMetadata`](</references/sui-api/sui-graphql/beta/reference/types/objects/coin-metadata>) object ● [`DynamicField`](</references/sui-api/sui-graphql/beta/reference/types/objects/dynamic-field>) object ● [`IObject`](</references/sui-api/sui-graphql/beta/reference/types/interfaces/iobject>) interface ● [`MoveObject`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-object>) object ● [`MovePackage`](</references/sui-api/sui-graphql/beta/reference/types/objects/move-package>) object ● [`Object`](</references/sui-api/sui-graphql/beta/reference/types/objects/object>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/unions/owner.mdx>)
