<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ActiveJwk


# ActiveJwk
[code]
    type ActiveJwk {  
      alg: String  
      e: String  
      epoch: Epoch  
      iss: String  
      kid: String  
      kty: String  
      n: String  
    }  
    
[/code]

### Fields​

#### `ActiveJwk.**alg**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The JWK algorithm parameter, (RFC 7517, Section 4.4).

#### `ActiveJwk.**e**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The JWK RSA public exponent, (RFC 7517, Section 9.3).

#### `ActiveJwk.**epoch**` ● [`**Epoch**`](</references/sui-api/sui-graphql/beta/reference/types/objects/epoch>) object​

The most recent epoch in which the JWK was validated.

#### `ActiveJwk.**iss**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The string (Issuing Authority) that identifies the OIDC provider.

#### `ActiveJwk.**kid**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The string (Key ID) that identifies the JWK among a set of JWKs, (RFC 7517, Section 4.5).

#### `ActiveJwk.**kty**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The JWK key type parameter, (RFC 7517, Section 4.1).

#### `ActiveJwk.**n**` ● [`**String**`](</references/sui-api/sui-graphql/beta/reference/types/scalars/string>) scalar​

The JWK RSA modulus, (RFC 7517, Section 9.3).

### Member Of​

[`ActiveJwkConnection`](</references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk-connection>) object ● [`ActiveJwkEdge`](</references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk-edge>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/active-jwk.mdx>)
