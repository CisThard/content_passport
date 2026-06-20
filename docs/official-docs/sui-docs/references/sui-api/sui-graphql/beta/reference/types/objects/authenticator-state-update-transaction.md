<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/authenticator-state-update-transaction -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * AuthenticatorStateUpdateTransaction


# AuthenticatorStateUpdateTransaction
[code]
    type AuthenticatorStateUpdateTransaction {  
      authenticatorObjInitialSharedVersion: UInt53  
      epoch: Epoch  
      newActiveJwks(  
        first: Int  
        after: String  
        last: Int  
        before: String  
      ): ActiveJwkConnection  
      round: UInt53  
    }  
    
[/code]

### Fields​

#### `AuthenticatorStateUpdateTransaction.**authenticatorObjInitialSharedVersion**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

The initial version of the authenticator object that it was shared at.

#### `AuthenticatorStateUpdateTransaction.**epoch**` ● [`**Epoch**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object​

Epoch of the authenticator state update transaction.

#### `AuthenticatorStateUpdateTransaction.**newActiveJwks**` ● [`**ActiveJwkConnection**`](</references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk-connection>) object​

Newly active JWKs (JSON Web Keys).

##### `AuthenticatorStateUpdateTransaction.newActiveJwks.**first**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `AuthenticatorStateUpdateTransaction.newActiveJwks.**after**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

##### `AuthenticatorStateUpdateTransaction.newActiveJwks.**last**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

##### `AuthenticatorStateUpdateTransaction.newActiveJwks.**before**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

#### `AuthenticatorStateUpdateTransaction.**round**` ● [`**UInt53**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/uint-53>) scalar​

Consensus round of the authenticator state update.

### Implemented By​

[`TransactionKind`](</references/sui-api/sui-graphql/beta/reference/types/unions/transaction-kind>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/authenticator-state-update-transaction.mdx>)
