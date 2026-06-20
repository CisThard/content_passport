<!-- Source: https://docs.sui.io/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-proof -->

* [](</>)
  * [Sui RPC](</references/sui-api>)
  * [GraphQL](</references/sui-graphql>)
  * [Beta](</references/sui-api/sui-graphql/beta/reference>)
  * Types
  * Objects
  * ZkLoginProof


# ZkLoginProof

The zero-knowledge proof consisting of three elliptic curve points.
[code] 
    type ZkLoginProof {  
      a: CircomG1  
      b: CircomG2  
      c: CircomG1  
    }  
    
[/code]

### Fields​

#### `ZkLoginProof.**a**` ● [`**CircomG1**`](</references/sui-api/sui-graphql/beta/reference/types/objects/circom-g1>) object​

G1 point 'a'.

#### `ZkLoginProof.**b**` ● [`**CircomG2**`](</references/sui-api/sui-graphql/beta/reference/types/objects/circom-g2>) object​

G2 point 'b'.

#### `ZkLoginProof.**c**` ● [`**CircomG1**`](</references/sui-api/sui-graphql/beta/reference/types/objects/circom-g1>) object​

G1 point 'c'.

### Member Of​

[`ZkLoginInputs`](</references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-inputs>) object

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/sui-api/sui-graphql/beta/reference/types/objects/zk-login-proof.mdx>)
