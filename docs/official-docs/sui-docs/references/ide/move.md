<!-- Source: https://docs.sui.io/references/ide/move -->

* [](</>)
  * [Sui IDE Support](</references/ide/>)
  * Move Analyzer


On this page

# Move Analyzer VS Code Extension

The Move Analyzer extension for Visual Studio Code provides language support features for the Move programming language. It enables syntax highlighting, code completion, and advanced features like definition linking and type checking.

## Install​

You can install the Move extension from the Visual Studio Code Marketplace:

  1. Open VS Code.
  2. Open the **Extensions** view (`⇧` \+ `⌘` \+ `X` on macOS, `Ctrl` \+ `Shift` \+ `X` on Windows/Linux).
  3. Search for `mysten.move`.
  4. Click **Install** on the Move extension by Mysten Labs.


Alternative install methods include:

  * Use `Ctrl` \+ `P` or `⌘` \+ `P` and type `ext install mysten.move`.

  * Use the command line:
[code] $ code --install-extension mysten.move  
        
[/code]


The following extensions are included in the Move extension install:

  * [Move Syntax](<https://marketplace.visualstudio.com/items?itemName=damirka.move-syntax>)
  * [Move Trace Debugger](</references/ide/debugger>)


### Install move-analyzer​

The Move extension attempts to install the appropriate `move-analyzer` binary for your platform. If this doesn't work, or you prefer to install it manually, build it with Cargo:
[code] 
    $ cargo install --git https://github.com/MystenLabs/sui.git sui-move-lsp  
    
[/code]

By default, the Move extension expects to find the `move-analyzer` binary in `~/.sui/bin`. You can either copy the binary to this location, or configure the extension to use a different path.

## Features​

The Move extension supports most Language Server Protocol features, as well as basic commands for building, testing, and tracing Move code.

### Build, test, and trace​

The Move extension installs command palette commands for building, testing, and tracing Move code.

![Move commands in the command palette](/assets/images/commands-d1f415b9a3db72f125c75fa9d122fe6c.png)

These commands find the `Move.toml` file for the open Move source file and open a terminal to run the appropriate `sui move` command.

To execute these commands you must have `sui` binary installed, in particular, to generate a trace, the `sui` binary version must be trace-generation capable. See [Debugger](</references/ide/debugger#install>) for installation instructions. The extension will search for the `sui` binary on a system path but you can configure the extension to use a different path.

### Syntax highlighting​

The [Move Syntax](<https://marketplace.visualstudio.com/items?itemName=damirka.move-syntax>) extension provides syntax highlighting.

### Hover information​

Hovering over identifiers shows type information, struct fields and attributes, and docstrings (if any) for the identifier. This works for all Move symbols including macros.

  * Hover over structs to see structure and definition.

![Struct hoverover](/assets/images/hover_struct-555cd8135daa0469ad1f822a41f85ec3.png)

  * Hover over functions for details and definition.

![Function hoverover](/assets/images/hover_fun-72f450e3d92510e4a5909e4fe79e44c6.png)

  * Hover over macros for their functionality.

![Macro hoverover](/assets/images/hover_macros-cc91f2d3fce2be4a58a40e81a49cc0fa.png)


### Code completion​

The Move extension autocompletes upon a dot operator, displaying the available methods and fields for the type.

![Code completion](/assets/images/dot_completion-e8a87068cc9fd9c5ee126c220f50172e.png)

The Move extension also autocompletes after a `::` operator.

![Type completion](/assets/images/colon_completion-7f004292d8090173687b87450c355796.png)

Finally, the Move extension provides inlay hints, where the plugin automatically inserts the correct type after a variable declaration, unpack, function parameters, and other places.

![Inlay hints](/assets/images/inlay_hint-e30731ba0e388835b5b53f28a9e683ab.png)

### Navigation​

The Move extension supports `go-to-definition` navigation for all Move symbols including types, functions, and macros, as long as the type was present when `move-analyzer` last built the file.

The extension also supports `find-references` for functions, macros, constants, and types.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/ide/move.mdx>)

[PreviousSui IDE Support](</references/ide/>)[NextMove Trace Debugger](</references/ide/debugger>)

  * Install
    * Install move-analyzer
  * Features
    * Build, test, and trace
    * Syntax highlighting
    * Hover information
    * Code completion
    * Navigation
