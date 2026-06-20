<!-- Source: https://docs.sui.io/getting-started/onboarding/install-source -->

* [](</>)
  * [Hello, World!](</getting-started/onboarding/>)
  * [Install Sui](</getting-started/onboarding/sui-install>)
  * Install from Source


# Install from Source

tip

These instructions are for special use cases. For most users, [Quick Install](</getting-started/onboarding/sui-install>) shows the best way to install Sui.

You can install Sui from source, either locally or directly from GitHub. At minimum, you need Rust and Cargo installed for the Sui framework:

  * Download and install Rust:
[code] $ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh  
        
[/code]

If you have Rust installed, update to the latest version:
[code]$ rustup update stable  
        
[/code]

  * Download and install Cargo:
[code] $ curl https://sh.rustup.rs -sSf | sh  
        
[/code]

Depending on your operating system, you might require additional prerequisites.


Click to open

Additional prerequisites

  * macOS
  * Linux
  * Windows


Most modern MacOS systems have Homebrew and cURL preinstalled.

  * Download and install [Homebrew](<https://brew.sh/>):
[code] $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"  
        
[/code]

  * Download and install CMake:
[code] $ brew install cmake  
        
[/code]

Verify installation with
[code]$ cmake --version  
        
[/code]

  * Download and install **libpq** :
[code] $ brew install libpq  
        
[/code]

Verify installation with
[code]$ libpq --version  
        
[/code]

  * Download and install [PostgreSQL](<https://wiki.postgresql.org/wiki/Main_Page>).


These prerequisites use the `apt` package manager for Linux. Adjust the commands accordingly per your package manager.

tip

You can install all of the prerequisites for Linux at once using the following command:
[code]
    $ sudo apt-get install curl git-all cmake gcc libssl-dev pkg-config libclang-dev libpq-dev build-essential  
    
[/code]

  * Download and install Rust:
[code] $ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh  
        
[/code]

If you have Rust installed, update to the latest version:
[code]$ rustup update stable  
        
[/code]

  * Download and install Cargo
[code] $ curl https://sh.rustup.rs -sSf | sh  
        
[/code]

  * Download and install cURL:
[code] $ sudo apt-get install curl  
        
[/code]

Verify installation with
[code]$ curl --version  
        
[/code]

  * Download and install Git CLI:
[code] $ sudo apt-get install git-all  
        
[/code]

Verify installation with
[code]$ git --version  
        
[/code]

  * Download and install CMake:
[code] $ sudo apt-get install cmake  
        
[/code]

Verify installation with
[code]$ cmake --version  
        
[/code]

  * Download and install GCC:
[code] $ sudo apt-get install gcc  
        
[/code]

Verify installation with
[code]$ gcc --version  
        
[/code]

  * Download and install **libssl-dev** :
[code] $ sudo apt-get install libssl-dev  
        
[/code]

If the version of Linux you use doesn't support **libssl-dev** , find an equivalent package for it on the [ROS Index](<https://index.ros.org/d/libssl-dev/>).

If you have OpenSSL you might also need to also install **pkg-config** :
[code]$ sudo apt-get install pkg-config  
        
[/code]

  * Download and install **libclang-dev** :
[code] $ sudo apt-get install libclang-dev  
        
[/code]

If the version of Linux you use doesn't support **libclang-dev** , find an equivalent package for it on the [ROS Index](<https://index.ros.org/d/libclang-dev/>).

  * If you plan to use the `--with-indexer` and `--with-graphql` options with `sui start`, download and install **libpq-dev** :
[code] $ sudo apt-get install libpq-dev  
        
[/code]

See [Local Network](</getting-started/onboarding/local-network>) for more information.

If the version of Linux you use doesn't support **libpq-dev** , find an equivalent package for it on the [ROS Index](<https://index.ros.org/d/libpq-dev/>).

  * Download and install **build-essential** :
[code] $ sudo apt-get install build-essential  
        
[/code]


  * Windows 11 ships with a Microsoft version of [cURL](<https://curl.se/windows/microsoft>) already installed; however, if you are using Windows 10 or want to use the cURL project version instead, download and install it from <https://curl.se/windows/>.

  * Download and install the [Git command line interface](<https://git-scm.com/download/>).

  * Download and install [CMake](<https://cmake.org/download/>).

  * Download and install the [LLVM Compiler Infrastructure](<https://releases.llvm.org/>). Look for a file with a name similar to `LLVM-15.0.7-win64.exe` for 64-bit Windows, or `LLVM-15.0.7-win32.exe` for 32-bit Windows.

  * Download and install [C++ build tools](<https://visualstudio.microsoft.com/downloads/>) before downloading Rust.

  * Download and install Rust.

If you use Windows 11, see information about using the [Rust installer](<https://www.rust-lang.org/tools/install>) on the Rust website. The installer checks for C++ build tools and prompts you to install them if necessary. Select the option that best defines your environment and follow the instructions in the install wizard.

If you have Rust installed, update to the latest version:
[code]$ rustup update stable  
        
[/code]

  * Download and install Cargo: Download and install [`rustup-init.exe`](<https://win.rustup.rs/>)

  * Download [Protocol Buffers](<https://github.com/protocolbuffers/protobuf/releases>) (`protoc-xx.x-win32.zip` or `protoc-xx.x-win64.zip`) and add the `\bin` directory to your Windows `PATH` environment variable.

  * For Windows on ARM64 only: Download and install [Visual Studio 2022 Preview](<https://visualstudio.microsoft.com/vs/preview/>).


You can install from source either directly from GitHub or from your local drive. Regardless of which install from source method you use, the installer places the Sui components in the `~/.cargo/bin` folder.

You can also download the [source code](</references/contribute/sui-environment>) to locally access files.

  * GitHub source
  * Local source


Use Cargo to install Sui directly from the GitHub repo:
[code]
    $ cargo install --locked --git https://github.com/MystenLabs/sui.git --branch testnet sui --features tracing  
    
[/code]

info

The tracing feature enables trace-based debugging, profiling, and Move test coverage support in the Sui CLI. It adds minimal runtime overhead unless you are actively using those features.

Replace the `testnet` branch in the previous command if necessary. Available options are:

  * `main`: Latest updates. Least stable.
  * `devnet`: Includes experimental features.
  * `testnet`: Includes beta features.
  * `mainnet`: Stable release.


You can build and install additional packages as needed. Replace `sui` in the previous command with the package name in the following table.

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
  
You can clone the public Sui repo and install from source on your local machine.

  1. Fork the [Sui repo](<https://github.com/MystenLabs/sui>).

  2. Use a console to clone the fork to the desired directory.
[code] $ git clone https://github.com/YourOrg/sui.git  
         
[/code]

  3. Navigate to the repo directory and switch to the branch you want to build against.

     * `main`: Latest updates. Least stable.
     * `devnet`: Includes experimental features.
     * `testnet`: Includes beta features.
     * `mainnet`: Stable release.
[code] $ git switch testnet  
    
[/code]

  4. Run the `cargo install` command from the repo root.
[code] $ cargo install --locked --path crates/sui --features tracing  
         
[/code]


info

The tracing feature enables trace-based debugging, profiling, and Move test coverage support in the Sui CLI. It adds minimal runtime overhead unless you are actively using those features.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/getting-started/onboarding/install-source.mdx>)

[PreviousInstall from Binaries](</getting-started/onboarding/install-binaries>)[NextConnecting to a Local Network](</getting-started/onboarding/local-network>)
