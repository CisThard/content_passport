<!-- Source: https://docs.wal.app/docs/walrus-client/json-mode -->

* [](</>)
  * [Walrus Client](</docs/walrus-client>)
  * JSON Mode


# JSON Mode

All Walrus client commands are available in JSON mode, which simplifies programmatic access to the [CLI](</docs/walrus-client/storing-blobs>). You can specify all command-line flags of the original CLI command in JSON format.

To store a blob, run the following command:
[code] 
    $ walrus json \  
        '{  
            "config": "path/to/client_config.yaml",  
            "command": {  
                "store": {  
                    "files": ["README.md", "LICENSE"],  
                    "epochs": 100  
                }  
            }  
        }'  
    
[/code]

To read a blob using the blob ID:
[code] 
    $ walrus json \  
        '{  
            "config": "path/to/client_config.yaml",  
            "command": {  
                "read": {  
                    "blobId": "4BKcDC0Ih5RJ8R0tFMz3MZVNZV8b2goT6_JiEEwNHQo"  
                }  
            }  
        }'  
    
[/code]

All options, default values, and commands are the same as those in the [standard CLI mode](</docs/walrus-client/storing-blobs>), except that they use camelCase instead of kebab-case.

The `json` command also accepts input from `stdin`.

The output of a `json` command is JSON-formatted to simplify parsing results programmatically. You can pipe the JSON output to the `jq` command to parse and extract relevant fields.

[Edit this page](<https://github.com/MystenLabs/walrus/tree/main/docs/site/../content/walrus-client/json-mode.mdx>)

[PreviousManaging Blobs](</docs/walrus-client/managing-blobs>)[NextQuilts](</docs/walrus-client/quilts>)
