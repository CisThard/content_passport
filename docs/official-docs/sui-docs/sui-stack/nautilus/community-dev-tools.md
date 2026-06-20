<!-- Source: https://docs.sui.io/sui-stack/nautilus/community-dev-tools -->

* [](</>)
  * [Nautilus](</sui-stack/nautilus/>)
  * Community Developer Tools


On this page

# Nautilus Community Developer Tools

The following are community-contributed developer tools designed to enhance workflows for Nautilus.

caution

These tools are developed and maintained by Sui community members. Do your own due diligence for security, performance, and other guarantees if you decide to use these in a production environment.

## Deploy Dockerized Nautilus apps to Marlin​

Marlin Oyster integrates with the Nautilus framework to remove the operational overhead of managing enclave infrastructure.

To use Nautilus, you can either manage AWS Nitro Enclaves yourself or use Marlin Oyster. When you manage enclaves yourself, you must manage AWS accounts, networking configurations, enclave images, and attestation infrastructure.

Marlin Oyster handles deterministic enclave builds, provisioning, and attestation. You deploy enclave-powered apps with only a Docker image, Oyster CLI, and Sui. No direct AWS interaction is required. Marlin Oyster preserves all cryptographic guarantees, including hardware-backed Nitro security, reproducible enclave measurements (Platform Configuration Registers (PCRs)), and trust-minimized execution.

It transforms Trusted Execution Environment (TEE) access into a transparent and decentralized marketplace. An abstracted Sui Move contract enables you to submit jobs, pay with stablecoins, and expose workloads to Oyster operators. Builds are deterministic, meaning enclave integrity and identity are fully verifiable.

You can learn more about Marlin Oyster and Nautilus in [Marlin docs](<https://docs.marlin.org/oyster/build-cvm/guides/sui-oyster/>).

### How it works​

Marlin Oyster uses the following workflow:

  1. Build your application and package it into a Docker image.
  2. Deploy the Docker image as a job on the Oyster marketplace. You pay for the job with stablecoin.
  3. Oyster operators claim the job submission, provision a Nitro Enclave, and run the workload. Oyster operators cannot alter the application logic.
  4. The enclave generates a PCR measurement that acts as a cryptographic verification of the application code. A Sui Move contract can verify this PCR measurement on chain.


This workflow provides the same cryptographic guarantees as a self-managed Nautilus deployment.

### Custom PCR verification​

Sui supports custom PCR verification. AWS Nitro Enclaves use PCR verification to confirm that code running in an isolated environment is authentic and unmodified. Nautilus uses custom PCR verification to provide verifiable confidential compute without trust assumptions and to enable use cases where confidential apps can prove their code is running in a TEE and has not been tampered with.

### Example​

You can use the [Sui Oyster demo application](<https://github.com/marlinprotocol/sui-oyster-demo>) as a reference implementation to begin building. This example application creates and deploys a decentralized price oracle using Oyster enclaves. In the example, data is fetched securely, signed with a Nitro Enclave, and verified with signatures on chain using PCR attestation.

You can learn more in the project [README](<https://github.com/marlinprotocol/sui-oyster-demo>).

## Nautilus-Ops​

Nautilus-Ops is a command-line tool you can use to build and deploy enclave images, register enclaves on chain, and verify enclave signatures.

[Learn more on the project GitHub](<https://github.com/Ashwin-3cS/nautilus-ops>).

## nautilus-ts​

nautilus-ts is a TypeScript framework for building Nautilus apps inside AWS Nitro Enclaves using SDKs such as `@mysten/sui` and `@mysten/seal`. The framework handles VSOCK networking, NSM attestation, traffic forwarding, and key management.

[Learn more on the project GitHub](<https://github.com/unconfirmedlabs/nautilus-ts>).

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/sui-stack/nautilus/community-dev-tools.mdx>)

[PreviousEncrypt Enclave Secrets with Seal](</sui-stack/nautilus/seal>)[NextzkLogin Integration](</sui-stack/zklogin-integration/>)

  * Deploy Dockerized Nautilus apps to Marlin
    * How it works
    * Custom PCR verification
    * Example
  * Nautilus-Ops
  * nautilus-ts
