<!-- Source: https://developer.android.com/privacy-and-security/cryptography -->

* [ Android Developers ](<https://developer.android.com/>)
  * [ Design & Plan ](<https://developer.android.com/design>)
  * [ Security ](<https://developer.android.com/security>)
  * [ Guides ](<https://developer.android.com/privacy-and-security/security-tips>)


#  Cryptography Stay organized with collections  Save and categorize content based on your preferences. 

This document describes the proper way to use Android's cryptographic facilities and includes some examples of their use. If your app requires greater key security, use the [Android Keystore system](</training/articles/keystore>).

**Note:** Except where specified, this advice applies to all Android versions.

## Specify a provider only with the Android Keystore system

If you're using the Android Keystore system, you **must** specify a provider.

In other situations, however, Android doesn't guarantee a particular provider for a given algorithm. Specifying a provider without using the Android Keystore system can cause compatibility problems in future releases.

## Choose a recommended algorithm

When you have the freedom to choose which algorithm to use (such as when you don't require compatibility with a third-party system), we recommend using the following algorithms:

Class | Recommendation  
---|---  
Cipher | AES in either CBC or GCM mode with 256-bit keys (such as `AES/GCM/NoPadding`)  
MessageDigest | SHA-2 family (such as `SHA-256`)  
Mac | SHA-2 family HMAC (such as `HMACSHA256`)  
Signature | SHA-2 family with ECDSA (such as `SHA256withECDSA`)  
**Note:** When reading and writing local files, your app can use the [Security library](</topic/security/data>) to perform these actions in a more secure manner. The library specifies a recommended encryption algorithm.

## Perform common cryptographic operations

The following sections include snippets that demonstrate how you can complete common cryptographic operations in your app.

### Encrypt a message

### Kotlin
[code] 
    val plaintext: ByteArray = ...
    val keygen = KeyGenerator.getInstance("AES")
    keygen.init(256)
    val key: SecretKey = keygen.generateKey()
    val cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING")
    cipher.init(Cipher.ENCRYPT_MODE, key)
    val ciphertext: ByteArray = cipher.doFinal(plaintext)
    val iv: ByteArray = cipher.iv
[/code]

### Java
[code] 
    byte[] plaintext = ...;
    KeyGenerator keygen = KeyGenerator.getInstance("AES");
    keygen.init(256);
    SecretKey key = keygen.generateKey();
    Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
    cipher.init(Cipher.ENCRYPT_MODE, key);
    byte[] ciphertext = cipher.doFinal(plaintext);
    byte[] iv = cipher.getIV();
[/code]

### Generate a message digest

### Kotlin
[code] 
    val message: ByteArray = ...
    val md = MessageDigest.getInstance("SHA-256")
    val digest: ByteArray = md.digest(message)
[/code]

### Java
[code] 
    byte[] message = ...;
    MessageDigest md = MessageDigest.getInstance("SHA-256");
    byte[] digest = md.digest(message);
[/code]

### Generate a digital signature

You need to have a [`PrivateKey`](</reference/java/security/PrivateKey>) object containing the signing key, which you can generate at runtime, read from a file bundled with your app, or obtain from some other source depending on your needs.

### Kotlin
[code] 
    val message: ByteArray = ...
    val key: PrivateKey = ...
    val s = Signature.getInstance("SHA256withECDSA")
            .apply {
                initSign(key)
                update(message)
            }
    val signature: ByteArray = s.sign()
[/code]

### Java
[code] 
    byte[] message = ...;
    PrivateKey key = ...;
    Signature s = Signature.getInstance("SHA256withECDSA");
    s.initSign(key);
    s.update(message);
    byte[] signature = s.sign();
[/code]

### Verify a digital signature

You need to have a [`PublicKey`](</reference/kotlin/java/security/PublicKey>) object containing the signer's public key, which you can read from a file bundled with your app, [extract from a certificate](</reference/javax/security/cert/Certificate#getPublicKey\(\)>), or obtain from some other source depending on your needs.

### Kotlin
[code] 
    val message: ByteArray = ...
    val signature: ByteArray = ...
    val key: PublicKey = ...
    val s = Signature.getInstance("SHA256withECDSA")
            .apply {
                initVerify(key)
                update(message)
            }
    val valid: Boolean = s.verify(signature)
[/code]

### Java
[code] 
    byte[] message = ...;
    byte[] signature = ...;
    PublicKey key = ...;
    Signature s = Signature.getInstance("SHA256withECDSA");
    s.initVerify(key);
    s.update(message);
    boolean valid = s.verify(signature);
[/code]

## Implementation complexities

There are some details of the Android cryptography implementation that seem unusual but are present due to compatibility concerns. This section discusses the ones that you'll most likely encounter.

### OAEP MGF1 message digest

RSA OAEP ciphers are parameterized by two different message digests: the “main” digest and the MGF1 digest. There are [`Cipher`](</reference/javax/crypto/Cipher>) identifiers that include digest names, such as `Cipher.getInstance("RSA/ECB/OAEPwithSHA-256andMGF1Padding")`, which specifies the main digest and leaves the MGF1 digest unspecified. For Android Keystore, SHA-1 is used for the MGF1 digest, whereas for other Android cryptographic providers, the two digests are the same.

To have more control over the digests that your app uses, request a cipher with OAEPPadding, as in `Cipher.getInstance("RSA/ECB/OAEPPadding")`, and provide an `OAEPParameterSpec` to `init()` to explicitly choose both digests. This is shown in the code that follows:

### Kotlin
[code] 
    val key: Key = ...
    val cipher = Cipher.getInstance("RSA/ECB/OAEPPadding")
            .apply {
                // To use SHA-256 the main digest and SHA-1 as the MGF1 digest
                init(Cipher.ENCRYPT_MODE, key, OAEPParameterSpec("SHA-256", "MGF1", MGF1ParameterSpec.SHA1, PSource.PSpecified.DEFAULT))
                // To use SHA-256 for both digests
                init(Cipher.ENCRYPT_MODE, key, OAEPParameterSpec("SHA-256", "MGF1", MGF1ParameterSpec.SHA256, PSource.PSpecified.DEFAULT))
            }
[/code]

### Java
[code] 
    Key key = ...;
    Cipher cipher = Cipher.getInstance("RSA/ECB/OAEPPadding");
    // To use SHA-256 the main digest and SHA-1 as the MGF1 digest
    cipher.init(Cipher.ENCRYPT_MODE, key, new OAEPParameterSpec("SHA-256", "MGF1", MGF1ParameterSpec.SHA1, PSource.PSpecified.DEFAULT));
    // To use SHA-256 for both digests
    cipher.init(Cipher.ENCRYPT_MODE, key, new OAEPParameterSpec("SHA-256", "MGF1", MGF1ParameterSpec.SHA256, PSource.PSpecified.DEFAULT));
[/code]

## Deprecated functionality

The following sections describe deprecated functionality. Don't use it in your app.

### Bouncy Castle algorithms

The [Bouncy Castle](<https://www.bouncycastle.org/>) implementations of many algorithms [are deprecated](<https://android-developers.googleblog.com/2018/03/cryptography-changes-in-android-p.html>). This only affects cases where you explicitly request the Bouncy Castle provider, as shown in the following example:

### Kotlin
[code] 
    Cipher.getInstance("AES/CBC/PKCS7PADDING", "BC")
    // OR
    Cipher.getInstance("AES/CBC/PKCS7PADDING", Security.getProvider("BC"))
[/code]

### Java
[code] 
    Cipher.getInstance("AES/CBC/PKCS7PADDING", "BC");
    // OR
    Cipher.getInstance("AES/CBC/PKCS7PADDING", Security.getProvider("BC"));
[/code]

As noted in the section about specifying a provider only with the Android Keystore system, requesting a specific provider is discouraged. If you follow that guideline, this deprecation doesn't affect you.

### Password-based encryption ciphers without an initialization vector

Password-based encryption (PBE) ciphers that require an initialization vector (IV) can obtain it from the key, if it's suitably constructed, or from an explicitly passed IV. If you pass a PBE key that doesn't contain an IV and don't pass an explicit IV, the PBE ciphers on Android currently assume an IV of zero.

When using PBE ciphers, always pass an explicit IV, as shown in the following code snippet:

### Kotlin
[code] 
    val key: SecretKey = ...
    val cipher = Cipher.getInstance("PBEWITHSHA256AND256BITAES-CBC-BC")
    val iv = ByteArray(16)
    SecureRandom().nextBytes(iv)
    cipher.init(Cipher.ENCRYPT_MODE, key, IvParameterSpec(iv))
[/code]

### Java
[code] 
    SecretKey key = ...;
    Cipher cipher = Cipher.getInstance("PBEWITHSHA256AND256BITAES-CBC-BC");
    byte[] iv = new byte[16];
    new SecureRandom().nextBytes(iv);
    cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(iv));
[/code]

### Crypto provider

As of Android 9 (API level 28), the Crypto Java Cryptography Architecture (JCA) provider has been removed. If your app requests an instance of the Crypto provider, such as by calling the following method, a [`NoSuchProviderException`](</reference/java/security/NoSuchProviderException>) occurs.

### Kotlin
[code] 
    SecureRandom.getInstance("SHA1PRNG", "Crypto")
[/code]

### Java
[code] 
    SecureRandom.getInstance("SHA1PRNG", "Crypto");
[/code]

### Jetpack security-crypto library

All APIs in the [`security-crypto`](</reference/androidx/security/crypto/package-summary>) Jetpack library were deprecated in the stable release of [version `1.1.0`](</jetpack/androidx/releases/security#security-crypto_version_110_2>). There won't be any subsequent releases of this library.

The deprecation annotations are visible if you have any of the following dependencies in your app module's `build.gradle` file:

### Groovy
[code] 
    dependencies {
        implementation "androidx.security:security-crypto:1.1.0"
        // or
        implementation "androidx.security:security-crypto-ktx:1.1.0"
    }
[/code]

### Kotlin
[code] 
    dependencies {
        implementation("androidx.security:security-crypto:1.1.0")
        // or
        implementation("androidx.security:security-crypto-ktx:1.1.0")
    }
[/code]

## Supported algorithms

These are the JCA algorithm identifiers that are supported on Android:

  * [`AlgorithmParameterGenerator`](</reference/java/security/AlgorithmParameterGenerator>)
  * [`AlgorithmParameters`](</reference/java/security/AlgorithmParameters>)
  * [`CertPathBuilder`](</reference/java/security/cert/CertPathBuilder>)
  * [`CertPathValidator`](</reference/java/security/cert/CertPathValidator>)
  * [`CertStore`](</reference/java/security/cert/CertStore>)
  * [`CertificateFactory`](</reference/java/security/cert/CertificateFactory>)
  * [`Cipher`](</reference/kotlin/javax/crypto/Cipher>)
  * [`KeyAgreement`](</reference/kotlin/javax/crypto/KeyAgreement>)
  * [`KeyFactory`](</reference/java/security/KeyFactory>)
  * [`KeyGenerator`](</reference/kotlin/javax/crypto/KeyGenerator>)
  * [`KeyManagerFactory`](</reference/javax/net/ssl/KeyManagerFactory>)
  * [`KeyPairGenerator`](</reference/java/security/KeyPairGenerator>)
  * [`KeyStore`](</reference/java/security/KeyStore>)
  * [`Mac`](</reference/kotlin/javax/crypto/Mac>)
  * [`MessageDigest`](</reference/java/security/MessageDigest>)
  * [`SSLContext`](</reference/javax/net/ssl/SSLContext>)
  * [`SSLEngine.Supported`](</reference/javax/net/ssl/SSLEngine>)
  * [`SSLSocket.Supported`](</reference/javax/net/ssl/SSLSocket>)
  * [`SecretKeyFactory`](</reference/kotlin/javax/crypto/SecretKeyFactory>)
  * [`SecureRandom`](</reference/java/security/SecureRandom>)
  * [`Signature`](</reference/java/security/Signature>)
  * [`TrustManagerFactory`](</reference/javax/net/ssl/TrustManagerFactory>)


Content and code samples on this page are subject to the licenses described in the [Content License](</license>). Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates.

Last updated 2026-03-06 UTC.

[[["Easy to understand","easyToUnderstand","thumb-up"],["Solved my problem","solvedMyProblem","thumb-up"],["Other","otherUp","thumb-up"]],[["Missing the information I need","missingTheInformationINeed","thumb-down"],["Too complicated / too many steps","tooComplicatedTooManySteps","thumb-down"],["Out of date","outOfDate","thumb-down"],["Samples / code issue","samplesCodeIssue","thumb-down"],["Other","otherDown","thumb-down"]],["Last updated 2026-03-06 UTC."],[],[]]
