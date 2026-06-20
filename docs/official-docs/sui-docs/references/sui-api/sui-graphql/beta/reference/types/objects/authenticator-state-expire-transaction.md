<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/authenticator-state-expire-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * AuthenticatorStateExpireTransaction


# AuthenticatorStateExpireTransaction

System transaction that is executed at the end of an epoch to expire JSON Web Keys (JWKs) that are no longer valid, based on their associated epoch. This is part of the on-chain state management for zkLogin and authentication.
[code] 
    type AuthenticatorStateExpireTransaction {  
      authenticatorObjInitialSharedVersion: UInt53  
      minEpoch: Epoch  
    }  
    
[/code]

### Fields​

#### `AuthenticatorStateExpireTransaction.**authenticatorObjInitialSharedVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The initial version that the AuthenticatorStateUpdate was shared at.

#### `AuthenticatorStateExpireTransaction.**minEpoch**` ● [`**Epoch**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object​

Expire JWKs that have a lower epoch than this.

### Implemented By​

[`EndOfEpochTransactionKind`](</references/sui-api/sui-graphql/beta/reference/types/unions/end-of-epoch-transaction-kind>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/authenticator-state-expire-transaction.mdx>)
