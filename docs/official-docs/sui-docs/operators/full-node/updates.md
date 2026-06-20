<!-- Source: https://docs.sui.io/operators/full-node/updates -->

* [](</>)
  * [Full Nodes](</operators/full-node/>)
  * Updating


On this page

# Updating a Full Node

## Sui release process​

Each Sui network is deployed on a consistent schedule. Extenuating circumstances might delay releases occasionally, but these delays are rare and communicated through official channels.

  * `devnet`: Deployed every week on Mondays.
  * `testnet`: Deployed every week on Tuesdays.
  * `mainnet`: Deployed every two weeks on Wednesdays.


info

For additional details, see each network's [release schedule and configuration](<https://sui.io/networkinfo>).

Whenever Sui releases a new version, you must update your full node with the release to ensure compatibility with the network it connects to. For example, if you use Sui Testnet you should install the version of Sui running on Sui Testnet.

Any release that contains a protocol change needs to be applied before the protocol upgrade takes place (when enough stake within the validator set upgrades, the new protocol version is enacted in the next epoch). If you do not update your full node, it cannot connect to the network after the protocol upgrade takes place.

## Communication​

Releases are announced on the [Sui Discord server](<https://discord.com/invite/sui>) and the [node-operators](<https://groups.google.com/a/groups.sui.io/g/node-operators>) Google group.

### Discord channels​

  * `devnet`: [`#devnet-updates`](<https://discord.com/channels/916379725201563759/1004638487078772736>)
  * `testnet`: [`#tn-validator-announcements`](<https://discord.com/channels/916379725201563759/1003660994381353101>), [`#testnet-updates`](<https://discord.com/channels/916379725201563759/1095151359642304612>), and [`#node-announcements`](<https://discord.com/channels/916379725201563759/1002231298888306718>) channels.
  * `mainnet`: [`#mn-validator-announcements`](<https://discord.com/channels/916379725201563759/1093852827627040768>), [`#mainnet-updates`](<https://discord.com/channels/916379725201563759/1103082453792464906>), and [`#node-announcements`](<https://discord.com/channels/916379725201563759/1002231298888306718>) channels.


## Update your full node​

You can track the latest version of Sui on the [Sui Releases](<https://github.com/MystenLabs/sui/releases>) page on GitHub. The schedule for each network is available in the [Network Release Schedule](<https://sui.io/networkinfo>) page.

It is reasonable to have to shut down your full node to perform an update, whether that be a rolling restart in Kubernetes, or a systemctl stop on a Linux machine to replace the sui-node binary.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/operators/full-node/updates.mdx>)

[PreviousMonitoring](</operators/full-node/monitoring>)[NextData Indexing and Archives](</operators/data-management/>)

  * Sui release process
  * Communication
    * Discord channels
  * Update your full node
