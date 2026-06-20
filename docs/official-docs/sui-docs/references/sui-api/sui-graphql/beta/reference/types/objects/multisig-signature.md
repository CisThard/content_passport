<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/multisig-signature -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * MultisigSignature


# MultisigSignature

An aggregated multisig signature.
[code] 
    type MultisigSignature {  
      bitmap: Int  
      committee: MultisigCommittee  
      signatures: [SignatureScheme!]  
    }  
    
[/code]

### Fields​

#### `MultisigSignature.**bitmap**` ● [`**Int**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/int>) scalar​

A bitmap indicating which members of the committee signed.

#### `MultisigSignature.**committee**` ● [`**MultisigCommittee**`](</references/sui-api/sui-graphql/beta/reference/types/objects/multisig-committee>) object​

The multisig committee (public keys + weights + threshold).

#### `MultisigSignature.**signatures**` ● [`**[SignatureScheme!]**`](</references/sui-api/sui-graphql/beta/reference/types/unions/signature-scheme>) list union​

The individual member signatures, one per signer who participated. Compressed signatures within a multisig do not include the signer's public key, so `publicKey` will be `null` for simple signature schemes (Ed25519, Secp256k1, Secp256r1).

### Implemented By​

[`SignatureScheme`](</references/sui-api/sui-graphql/beta/reference/types/unions/signature-scheme>) union

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/multisig-signature.mdx>)
