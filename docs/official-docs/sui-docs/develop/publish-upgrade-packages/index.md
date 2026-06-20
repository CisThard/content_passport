<!-- Source: https://docs.sui.io/develop/publish-upgrade-packages/ -->

* [](</>)
  * Deploying and Upgrading Packages


# Packages

Using an agent? Try this prompt
[code]
    Prepare this package for Mainnet publishing: verify tests, dependencies, addresses, upgrade policy, gas requirements, signer/custody plan, and produce a launch checklist.
[/code]

Copy prompt

Open in agent▾

A Move package on Sui includes one or more modules that define the package's interaction with onchain objects. You develop the logic for those modules in Move, compile them into an object, and publish that package object to a Sui network.

## [UpgradingSui provides a method of upgrading your packages while still retaining their immutable properties.→](</develop/publish-upgrade-packages/upgrade>)## [Custom Upgrade PoliciesCustom upgrade policies are used to upgrade live packages while addressing the security risks of single key ownership upgrades.→](</develop/publish-upgrade-packages/custom-policies>)## [VersioningVersioning provides the ability to upgrade packages on the Sui network.→](</develop/publish-upgrade-packages/versioning>)

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/publish-upgrade-packages/index.mdx>)

[NextUpgrading](</develop/publish-upgrade-packages/upgrade>)
