<!-- Source: https://docs.sui.io/getting-started/onboarding/app-frontends -->

* [](</>)
  * [Hello, World!](</getting-started/onboarding/>)
  * Connect a Frontend


On this page

# Connect a Frontend to a Move Package

In the previous guide, ["Hello, World!"](</getting-started/onboarding/hello-world>), you deployed a Move package and interacted with it to create an object that stored the text "Hello world!".

This guide demonstrates how to connect a React interface to that "Hello, World!" package, giving any user a way to interact with the Move package from their browser and set a custom greeting.

  * Prerequisites


  * [Install the latest version of Sui](</getting-started/onboarding/sui-install>).

  * [Configure the Sui client](</getting-started/onboarding/configure-sui-client>).

  * [Create a Sui address](</getting-started/onboarding/get-address>).

  * [Get SUI Testnet tokens](</getting-started/onboarding/get-coins>).

  * Complete the ["Hello, World!"](</getting-started/onboarding/hello-world>) guide and have your published Move package's ID.

  * Install [`pnpm`](<https://pnpm.io/installation>) to use as the package manager.

  * Create a [Slush](<https://slush.app/>) wallet.


## Call the Move package​

First, confirm that you have [followed the "Hello, World!"](<https://github.com/MystenLabs/sui-stack-hello-world.git>) example guide and are within the `sui-stack-hello-world/move/hello-world` directory in your CLI.

Then, verify your Move package is still available on Testnet by obtaining its object information:
[code] 
    $ sui client object <PACKAGE_ID>  
    
[/code]

Replace `<PACKAGE_ID>` with your Move package's ID.

danger

If your package no longer exists, or if you need to obtain the package ID again, follow the steps in the ["Hello, World!"](<https://github.com/MystenLabs/sui-stack-hello-world.git>) guide.

## View the frontend source code​

In the "Hello, World!" example project, the subdirectory `sui-stack-hello-world/ui` contains the frontend interface source code files:
[code] 
    .  
    ├── eslint.config.js  
    ├── index.html  
    ├── package.json  
    ├── pnpm-lock.yaml  
    ├── prettier.config.cjs  
    ├── src  
    │   ├── App.tsx  
    │   ├── constants.ts  
    │   ├── CreateGreeting.tsx  
    │   ├── dapp-kit.ts  
    │   ├── Greeting.tsx  
    │   ├── main.tsx  
    │   ├── networkConfig.ts  
    │   └── vite-env.d.ts  
    ├── tsconfig.json  
    ├── tsconfig.node.json  
    └── vite.config.mts  
    
[/code]

### `App.tsx`​

The `App.tsx` file contains code that creates a basic starter template for your React app. It includes a button to connect a Slush wallet to the app and a button to open the Sui Faucet to obtain Testnet SUI.

File not found in manifest: `ui/src/App.tsx`. You probably need to run `pnpm prebuild` and restart the site.

### `CreateGreeting.tsx`​

The `CreateGreeting.tsx` file contains logic that creates and sends a transaction to your Move package. The transaction calls the `new` function of the package, which creates a Move object with the value `Hello world!`. In the ["Hello, World!"](</getting-started/onboarding/hello-world>) guide, you called this function manually through the CLI with the command `sui client call --package <PACKAGE_ID> --module greeting --function new`.

File not found in manifest: `ui/src/CreateGreeting.tsx`. You probably need to run `pnpm prebuild` and restart the site.

### `Greeting.tsx`​

The `Greeting.tsx` file also contains logic that creates and sends a transaction to your Move package. However, this transaction calls the `update_text` function of the package, which modifies the text to replace "Hello world!" with the text of your choosing.

File not found in manifest: `ui/src/Greeting.tsx`. You probably need to run `pnpm prebuild` and restart the site.

## Connect the React interface to your Move package​

The `constants.ts` file is where you connect the React app to your Move package. This file contains a single line that sets your Move package ID as a constant `TESTNET_HELLO_WORLD_PACKAGE_ID`. By default, this file contains a sample package ID.

Modify this file to include your Move package ID instead.

File not found in manifest: `ui/src/constants.ts`. You probably need to run `pnpm prebuild` and restart the site.

The `networkConfig.ts` file uses this constant:

File not found in manifest: `ui/src/networkConfig.ts`. You probably need to run `pnpm prebuild` and restart the site.

## Install frontend dependencies​

Now, navigate into the `sui-stack-hello-world/ui` directory if you are not already there and install the necessary frontend dependencies:
[code] 
    $ pnpm install  
    
[/code]

## Run the React application​

Start the React application in your local development environment:
[code] 
    $ pnpm dev  
    
[/code]

Then, open `http://localhost:5173/` in your browser. The app prompts you to connect your Slush wallet. Click **Connect Wallet** , authenticate when prompted, then approve the connection.

## Send SUI tokens to your Slush wallet​

If you sent SUI tokens to an address used in the CLI in previous guides, then created a new Slush wallet in your browser, you likely need to send SUI tokens to the Slush wallet. The Slush wallet address is different and separate from the address created and used in the CLI.

Follow the [Testnet SUI](</getting-started/onboarding/get-coins>) instructions to send Testnet tokens to your Slush address.

## Use the frontend interface​

Next, click the **Create Greeting** button. In the code, this button activates the logic stored in `CreateGreeting.ts` to send a transaction to the Move package that calls the `new` function and creates the `Greeting` object.

The Slush wallet prompts you to approve this transaction.

danger

If there is a problem, the prompt to approve the transaction displays the error message. Common errors include "Unable to Process Transaction" due to either insufficient gas coins or an incorrect Move package ID.

[Obtain Testnet SUI](</getting-started/onboarding/get-coins>) or [confirm you have the correct Move package ID](</getting-started/onboarding/hello-world>) to resolve these errors.

After you approve the transaction, the browser window displays the `Greeting` object's ID and its content, which by default is "Hello world!"

To change this text, enter a different greeting in the text box below the default value and click **Update**. The Slush wallet prompts you to approve the transaction.

![&quot;Hello, World!&quot; default greeting](/assets/images/hello-world-default-0fcfacae6b53e45549d6717a6d6d764e.png)

After you approve the transaction, the new greeting is displayed:

![&quot;Hello, World!&quot; modified greeting](/assets/images/hello-world-modified-38de29a83f7a3ce99b97c691d4833920.png)

### Next steps

## Access Sui Data

Learn more about accessing data on Sui.

## Join the Community

Join the Sui developer community, try out other example projects, or read more documentation.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/getting-started/onboarding/app-frontends.mdx>)

  * Call the Move package
  * View the frontend source code
    * `App.tsx`
    * `CreateGreeting.tsx`
    * `Greeting.tsx`
  * Connect the React interface to your Move package
  * Install frontend dependencies
  * Run the React application
  * Send SUI tokens to your Slush wallet
  * Use the frontend interface
