<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/enums/address-transaction-relationship -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Enums
  * AddressTransactionRelationship


# AddressTransactionRelationship

The possible relationship types for a transaction: sent or affected.
[code] 
    enum AddressTransactionRelationship {  
      SENT  
      AFFECTED  
    }  
    
[/code]

### Values​

#### `AddressTransactionRelationship.**SENT**`​

Transactions this address has sent.

#### `AddressTransactionRelationship.**AFFECTED**`​

Transactions that this address was involved in, either as the sender, sponsor, or as the owner of some object that was created, modified or transferred.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/enums/address-transaction-relationship.mdx>)
