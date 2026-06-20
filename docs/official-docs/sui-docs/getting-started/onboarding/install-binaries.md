<!-- Source: https://docs.sui.io/getting-started/onboarding/install-binaries -->

* [](</>)
  * [Hello, World!](</getting-started/onboarding/>)
  * [Install Sui](</getting-started/onboarding/sui-install>)
  * Install from Binaries


On this page

# Install from Binaries

tip

These instructions are for special use cases. For most users, [Quick Install](</getting-started/onboarding/sui-install>) shows the best way to install Sui.

Each Sui release provides a set of binaries for several operating systems. You can download these binaries from GitHub and use them to install Sui.

  * Linux
  * macOS
  * Windows


  1. Go to the [Sui GitHub repository](<https://github.com/MystenLabs/sui>).

  2. In the right pane, find the **Releases** section.

![Sui releases in GitHub](/assets/images/releases-508571c4e1b0f73222ac83d4bb30a4c2.png)

  3. Click the release tagged **Latest** to open the release's page.

  4. In the **Assets** section of the release, select the .tgz compressed file that corresponds to your operating system.

  5. Extract all files from the .tgz file into the preferred location on your system. These instructions assume you extract the files into a `sui` folder at the user root of your system for demonstration purposes. Replace references to this location in subsequent steps if you choose a different directory.

  6. Navigate to the expanded folder. You should have the following extracted files:

Name| Description  
---|---  
`move-analyzer`| Language Server Protocol implementation.  
`sui`| Main Sui binary.  
`sui-bridge`| Sui native bridge.  
`sui-data-ingestion`| Capture full node data for indexer to store in a database.  
`sui-faucet`| Local faucet to mint coins on local network.  
`sui-node`| Run a local node.  
`sui-test-validator`| Run test validators on a local network for development.  
`sui-tool`| Provides utilities for Sui.  
  7. Add the folder containing the extracted files to your `PATH` variable. To do so, you can update your `~/.bashrc` to include the location of the Sui binaries. If using the suggested location, you type `export PATH=$PATH:~/sui` and press Enter.

  8. Start a new terminal session or type `source ~/.bashrc` to load the new `PATH` value.


  1. Go to the [Sui GitHub repository](<https://github.com/MystenLabs/sui>).

  2. In the right pane, find the **Releases** section.

![Sui releases in GitHub](/assets/images/releases-508571c4e1b0f73222ac83d4bb30a4c2.png)

  3. Click the release tagged **Latest** to open the release's page.

  4. In the **Assets** section of the release, select the .tgz compressed file that corresponds to your operating system.

  5. Extract all files from the .tgz file into the preferred location on your system. These instructions assume you extract the files into a `sui` folder at the user root of your system. Replace references to this location in subsequent steps if you choose a different directory.

  6. Navigate to the expanded folder. You should have the following extracted files:

Name| Description  
---|---  
`move-analyzer`| Language Server Protocol implementation.  
`sui`| Main Sui binary.  
`sui-bridge`| Sui native bridge.  
`sui-data-ingestion`| Capture full node data for indexer to store in a database.  
`sui-faucet`| Local faucet to mint coins on local network.  
`sui-node`| Run a local node.  
`sui-test-validator`| Run test validators on a local network for development.  
`sui-tool`| Provides utilities for Sui.  
  7. Add the folder containing the extracted files to your `PATH` variable. To do so, you can update your `~/.zshrc` or `~/.bashrc` to include the location of the Sui binaries. If using the suggested location, you type `export PATH=$PATH:~/sui` and press Enter.

  8. Start a new console session or type `source ~/.zshrc` (or `.bashrc`) to load the new `PATH` value.

  9. If running the binaries for the first time, you might receive an error from MacOS that prevents the binaries from running. If you receive this error, close the dialog and type `xattr -d com.apple.quarantine ~/sui/*` in your console and press `Enter` (be sure to adjust the path if different).


  1. Go to the [Sui GitHub repository](<https://github.com/MystenLabs/sui>).

  2. In the right pane, find the **Releases** section.

![Sui releases in GitHub](/assets/images/releases-508571c4e1b0f73222ac83d4bb30a4c2.png)

  3. Click the release tagged **Latest** to open the release's page.

  4. In the **Assets** section of the release, select the .tgz compressed file that corresponds to your operating system.

  5. Extract all files from the .tgz file into the preferred location on your system. These instructions assume you extract the files into a `sui` folder at the root of your C drive. Replace references to this location in subsequent steps if you choose a different directory.

info

Windows does not natively support .tgz files, but you can use a free compressed file app like [7Zip](<https://7-zip.org/>) to extract.

  6. Navigate to the expanded folder. You should have the following extracted files:

Name| Description  
---|---  
`move-analyzer`| Language Server Protocol implementation.  
`sui`| Main Sui binary.  
`sui-bridge`| Sui native bridge.  
`sui-data-ingestion`| Capture full node data for indexer to store in a database.  
`sui-faucet`| Local faucet to mint coins on local network.  
`sui-node`| Run a local node.  
`sui-test-validator`| Run test validators on a local network for development.  
`sui-tool`| Provides utilities for Sui.  
  7. Add the folder containing the extracted files to your `PATH` variable. There are several ways to get to the setting depending on your version of Windows. One way that works on all versions of Windows is to type `sysdm.cpl` in a console to open the System Properties window. Under the **Advanced** tab, click the **Environment Variables...** button.

  8. In the Environment Variables window, select the `Path` variable and click the **Edit...** button.

  9. In the Edit environment variable window, click **New** and add the path to your expanded folder. Using the example path, this would be `C:\sui`.

  10. Click **OK**.


## Build binaries locally​

You can download the Sui repo and build the binaries locally. The binaries are exported to the `target/release` directory.
[code] 
    $ cargo build --profile release --bin sui  
    
[/code]

Include other packages as needed.

Name| Description  
---|---  
`move-analyzer`| Language Server Protocol implementation.  
`sui`| Main Sui binary.  
`sui-bridge`| Sui native bridge.  
`sui-data-ingestion`| Capture full node data for indexer to store in a database.  
`sui-faucet`| Local faucet to mint coins on local network.  
`sui-node`| Run a local node.  
`sui-test-validator`| Run test validators on a local network for development.  
`sui-tool`| Provides utilities for Sui.  
  
## Upgrade from Cargo​

If you previously installed the Sui binaries, you can update them to the most recent release with the same command you used to install them (changing `testnet` to the desired branch):
[code] 
    $ cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui --features tracing  
    
[/code]

info

The `tracing` feature enables Move test coverage and debugger support in the Sui CLI. These features are not available unless you enable tracing.

## Install `sui-node` for Ubuntu from AWS​

info

The `sui-node` binary from AWS only supports Ubuntu version 22.04.

The `sui-node` binaries for Ubuntu 22.04 are available for download from AWS. You can use either the commit SHA or version tag in the URL to retrieve the specific version of Sui you want. Use one of these values to construct the AWS download URL.

The URL is in the form:
[code] 
    https://sui-releases.s3-accelerate.amazonaws.com/<SHA-OR-TAG>/sui-node  
    
[/code]

Replace `<SHA-OR-TAG>` with the proper value. For example, the URL is `https://sui-releases.s3-accelerate.amazonaws.com/00544a588bb71c395d49d91f756e8bfe96067eca/sui-node` to download the release with the relevant commit SHA. If you visit the URL using a browser, the binary downloads automatically.

After downloading, open a console to the file's location and change its permission to `755`.
[code] 
    $ chmod 755 sui-node  
    
[/code]

Add the file's location to your `$PATH` variable if its directory is not already included. Follow the steps in [Configure a Sui full node](</operators/full-node/sui-full-node>) to complete the setup.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/getting-started/onboarding/install-binaries.mdx>)

[PreviousInstall Sui](</getting-started/onboarding/sui-install>)[NextInstall from Source](</getting-started/onboarding/install-source>)

  * Build binaries locally
  * Upgrade from Cargo
  * Install `sui-node` for Ubuntu from AWS
