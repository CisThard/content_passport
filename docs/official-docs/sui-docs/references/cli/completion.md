<!-- Source: https://docs.sui.io/references/cli/completion -->

* [](</>)
  * [Sui CLI](</references/cli>)
  * Sui CLI Completions


On this page

# Sui CLI Completions

The Sui CLI `completion` command generates shell completion scripts for the `sui` command. Install the generated script for your shell to complete Sui commands, subcommands, flags, and values from your command line.

## Check Sui CLI installation​

Before you can use the Sui CLI, you must install it. To check if the CLI exists on your system, open a terminal or console and type the following command:
[code] 
    $ sui --version  
    
[/code]

If the terminal or console responds with a version number, you already have the Sui CLI installed.

If the command is not found, follow the instructions in [Install Sui](</getting-started/onboarding/sui-install>) to get the Sui CLI on your system.

## Commands​
[code] 
    $ sui completion --help  
    
[/code]

The command outputs the following help text:
[code] 
    Generate shell completion scripts for CLI  
      
    Usage: sui completion [OPTIONS] --generate <GENERATOR>  
      
    Options:  
          --generate <GENERATOR>  If provided, outputs the completion file for given shell [possible values: bash, elvish, fish, powershell, zsh]  
      -q, --quiet                 Display less output  
      -h, --help                  Print help  
      -V, --version               Print version  
    
[/code]

## Generate completion scripts​

Redirect the command output to a file for your shell:
[code] 
    $ sui completion --generate bash > sui.bash  
    $ sui completion --generate zsh > _sui  
    $ sui completion --generate fish > sui.fish  
    
[/code]

The command also supports `elvish` and `powershell` values for `--generate`.

## Install completions​

Install the generated script in a directory loaded by your shell. Restart your shell after installation, or source the completion file directly if your shell supports it.

### Bash​

For Bash, install the generated `sui.bash` file in a Bash completion directory. Use one of the following common locations:

  * Linux: `/etc/bash_completion.d/sui` for all users.
  * Linux: `~/.local/share/bash-completion/completions/sui` for one user.
  * macOS with Homebrew: `$(brew --prefix)/etc/bash_completion.d/sui`.


For example, to install it for one user on Linux:
[code] 
    $ mkdir -p ~/.local/share/bash-completion/completions  
    $ cp sui.bash ~/.local/share/bash-completion/completions/sui  
    
[/code]

To load the completion script for your current shell session only, run:
[code] 
    $ source sui.bash  
    
[/code]

### Zsh​

For Zsh, copy the generated `_sui` file to a directory in your `fpath`, then rebuild the completion cache:
[code] 
    $ mkdir -p ~/.zsh/completions  
    $ cp _sui ~/.zsh/completions/_sui  
    
[/code]

Add the directory to `fpath` before `compinit` in your `~/.zshrc` if it is not already configured:
[code] 
    $ fpath=(~/.zsh/completions $fpath)  
    $ autoload -Uz compinit  
    $ compinit  
    
[/code]

After you copy or update the completion file, you might need to remove the Zsh completion cache and start a new shell:
[code] 
    $ rm -f ~/.zcompdump  
    
[/code]

### Fish​

For Fish, copy the generated `sui.fish` file to your Fish completions directory:
[code] 
    $ mkdir -p ~/.config/fish/completions  
    $ cp sui.fish ~/.config/fish/completions/sui.fish  
    
[/code]

Fish loads completion files from this directory automatically.

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/cli/completion.mdx>)

[PreviousSui Client PTB CLI](</references/cli/ptb>)[NextSui Keytool CLI](</references/cli/keytool>)

  * Commands
  * Generate completion scripts
  * Install completions
    * Bash
    * Zsh
    * Fish
