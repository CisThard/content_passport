<!-- Source: https://docs.sui.io/develop/cryptography/signing -->

* [](</>)
  * [Cryptography](</develop/cryptography/>)
  * Signature Verification


On this page

# Signature Verification in Move

Move contracts in Sui support verifications for several signature schemes onchain. Not all signatures supported in onchain verification are supported as user signature verification. See [Sui Signatures](</develop/transactions/transaction-auth/auth-overview>) for valid signature schemes for transaction authorization.

caution

This guide includes information on how to use [`fastcrypto`](<https://github.com/MystenLabs/fastcrypto>)'s CLI tool to create a signature of a given scheme. This is for testing and debugging only, **do not** use in production.

## Setup `fastcrypto` CLI binary​
[code] 
    git@github.com:MystenLabs/fastcrypto.git  
    cd fastcrypto/  
    cargo build --bin sigs-cli  
    
[/code]

## Sign with CLI and submit to onchain Move method​

### Ed25519 signature (64 bytes)​

#### Step 1: Generate a key and sign a message.​
[code] 
    target/debug/sigs-cli keygen --scheme ed25519 --seed 0000000000000000000000000000000000000000000000000000000000000000                  
    Private key in hex: $SK  
    Public key in hex: $PK  
      
    target/debug/sigs-cli sign --scheme ed25519 --msg $MSG --secret-key  $SK  
      
    Signature in hex: $SIG  
    Public key in hex: $PK  
    
[/code]

#### Step 2:Call the verify method in Move. All inputs are represented in bytes in hex format:​
[code] 
        use sui::ed25519;  
      
        let msg = x"$MSG";  
        let pk = x"$PK";  
        let sig = x"$SIG";  
        let verify = ed25519::ed25519_verify(&sig, &pk, &msg);  
        assert!(verify == true, 0);  
    
[/code]

### Secp256k1 non-recoverable signature (64 bytes)​

#### Step 1: Generate a key and sign a message.​
[code] 
    target/debug/sigs-cli keygen --scheme secp256k1 --seed 0000000000000000000000000000000000000000000000000000000000000000                  
    Private key in hex: $SK  
    Public key in hex: $PK  
      
    target/debug/sigs-cli sign --scheme secp256k1 --msg $MSG --secret-key $SK  
      
    Signature in hex: $SIG  
    Public key in hex: $PK  
    
[/code]

#### Step 2:Call the verify method in Move.​
[code] 
        use sui::ecdsa_k1;  
          
        let msg = x"$MSG";  
        let pk = x"$PK";  
        let sig = x"$SIG";  
        // The last param 1 represents the hash function used is SHA256, the default hash function used when signing in CLI.  
        let verify = ecdsa_k1::secp256k1_verify(&sig, &pk, &msg, 1);  
        assert!(verify == true, 0);  
    
[/code]

### Secp256k1 recoverable signature (65 bytes)​

#### Step 1: Generate a key and sign a message.​
[code] 
    target/debug/sigs-cli keygen --scheme secp256k1-rec --seed 0000000000000000000000000000000000000000000000000000000000000000                  
    Private key in hex: $SK  
    Public key in hex: $PK  
      
    target/debug/sigs-cli sign --scheme secp256k1-rec --msg $MSG --secret-key $SK  
      
    Signature in hex: $SIG  
    Public key in hex: $PK  
    
[/code]

#### Step 2:Call the ecrecover method in Move and check equality.​
[code] 
        use sui::ecdsa_k1;  
      
        let msg = x"$MSG";  
        let pk = x"$PK";  
        let sig = x"$SIG";  
        // The last param 1 represents the hash function used is SHA256, the default hash function used when signing in CLI.  
        let recovered = ecdsa_k1::secp256k1_ecrecover(&sig, &msg, 1);  
        assert!(pk == recovered, 0);  
    
[/code]

### Secp256r1 non-recoverable signature (64 bytes)​

#### Step 1: Generate a key and sign a message.​
[code] 
    target/debug/sigs-cli keygen --scheme secp256r1 --seed 0000000000000000000000000000000000000000000000000000000000000000                  
    Private key in hex: $SK  
    Public key in hex: $PK  
      
    target/debug/sigs-cli sign --scheme secp256r1 --msg $MSG --secret-key $SK  
      
    Signature in hex: $SIG  
    Public key in hex: $PK  
    
[/code]

#### Step 2:Call the verify method in Move.​
[code] 
        use sui::ecdsa_r1;  
      
        let msg = x"$MSG";  
        let pk = x"$PK";  
        let sig = x"$SIG";  
        // The last param 1 represents the hash function used is SHA256, the default hash function used when signing in CLI.  
        let verify = ecdsa_r1::secp256r1_verify(&sig, &pk, &msg, 1);  
        assert!(verify == true, 0);  
    
[/code]

### Secp256r1 recoverable signature (65 bytes)​

#### Step 1: Generate a key and sign a message.​
[code] 
    target/debug/sigs-cli keygen --scheme secp256r1-rec --seed 0000000000000000000000000000000000000000000000000000000000000000                  
    Private key in hex: $SK  
    Public key in hex: $PK  
      
    target/debug/sigs-cli sign --scheme secp256r1-rec --msg $MSG --secret-key $SK  
      
    Signature in hex: $SIG  
    Public key in hex: $PK  
    
[/code]

#### Step 2:Call the ecrecover method in Move and check equality.​
[code] 
        use sui::ecdsa_r1;  
      
        let msg = x"$MSG";  
        let pk = x"$PK";  
        let sig = x"$SIG";  
        // The last param 1 represents the hash function used is SHA256, the default hash function used when signing in CLI.  
        let recovered = ecdsa_r1::secp256r1_ecrecover(&sig, &msg, 1);  
        assert!(pk == recovered, 0);  
    
[/code]

### BLS G1 signature (48 bytes, minSig setting)​

#### Step 1: Generate a key and sign a message.​
[code] 
    target/debug/sigs-cli keygen --scheme bls12381-minsig --seed 0000000000000000000000000000000000000000000000000000000000000000                  
    Private key in hex: $SK  
    Public key in hex: $PK  
      
    target/debug/sigs-cli sign --scheme bls12381-minsig --msg $MSG --secret-key $SK  
      
    Signature in hex: $SIG  
    Public key in hex: $PK  
    
[/code]

#### Step 2:Call the verify method in Move.​
[code] 
        use sui::bls12381;  
      
        let msg = x"$MSG";  
        let pk = x"$PK";  
        let sig = x"$SIG";  
        let verified = bls12381::bls12381_min_sig_verify(&sig, &pk, &msg);  
        assert!(verified == true, 0);  
    
[/code]

### BLS G1 signature (96 bytes, minPk setting)​

#### Step 1: Generate a key and sign a message.​
[code] 
    target/debug/sigs-cli keygen --scheme bls12381-minpk --seed 0000000000000000000000000000000000000000000000000000000000000000                  
    Private key in hex: $SK  
    Public key in hex: $PK  
      
    target/debug/sigs-cli sign --scheme bls12381-minpk --msg $MSG --secret-key $SK  
      
    Signature in hex: $SIG  
    Public key in hex: $PK  
    
[/code]

#### Step 2:Call the verify method in Move.​
[code] 
        use sui::bls12381;  
      
        let msg = x"$MSG";  
        let pk = x"$PK";  
        let sig = x"$SIG";  
        let verified = bls12381::bls12381_min_pk_verify(&sig, &pk, &msg);  
        assert!(verified == true, 0);  
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/cryptography/signing.mdx>)

[PreviousCryptography](</develop/cryptography/>)[NextHashing](</develop/cryptography/hashing>)

  * Setup `fastcrypto` CLI binary
  * Sign with CLI and submit to onchain Move method
    * Ed25519 signature (64 bytes)
    * Secp256k1 non-recoverable signature (64 bytes)
    * Secp256k1 recoverable signature (65 bytes)
    * Secp256r1 non-recoverable signature (64 bytes)
    * Secp256r1 recoverable signature (65 bytes)
    * BLS G1 signature (48 bytes, minSig setting)
    * BLS G1 signature (96 bytes, minPk setting)
