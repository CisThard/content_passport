<!-- Source: https://docs.sui.io/develop/objects/display/display-overview -->

* [](</>)
  * [Using Objects](</develop/objects/>)
  * [Object Display](</develop/objects/display/>)
  * What is Object Display?


On this page

# What is Object Display?

Using an agent? Try this prompt
[code]
    Find Display V1 usage in this package or docs and migrate it to Display V2 and display_registry patterns.
[/code]

Copy prompt

Open in agent▾

Object Display is a way to render any object on Sui using templating syntax. It renders Sui Move object values into human-readable strings, JSON, or encoded representations. A Display object defines a set of key-value pairs where both keys and values are format strings.

Object Display enables onchain management of offchain representation for a type. You can create fully composable and dynamic NFTs by substituting data for an object into a template string.

Check out the [interactive preview application](</develop/objects/display/display-preview>) to see how you can use Object Display.

## Current standard: Display V2​

Object Display V2 is the current Object Display standard. It replaces the legacy V1 event-discovery model with a registry-backed model where each type has one deterministic `Display<T>` derived from the global display registry and the type.

Use the `sui::display_registry` APIs when creating a display from Move code. For legacy displays, use `migrate_v1_to_v2` only if you are explicitly migrating a V1 display that was not already migrated by the system snapshot.

Display V2 brings a richer templating model, improved rendering pipeline, and better tooling, including:

  * **Collection access** : Use vectors, sets, and maps directly in your display templates.

  * **Dynamic field access** : Reference dynamic fields on objects in your templates.

  * **Object loading**: Load and reference objects when resolving display.

  * **GraphQL** : Rich APIs to use display as a querying tool, not just for rendering.


[Read more about the templating language and try the visual display builder](</develop/objects/display/display-preview>).

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/develop/objects/display/display-overview.mdx>)

[PreviousObject Display](</develop/objects/display/>)[NextCreating Displays](</develop/objects/display/using-display>)

  * Current standard: Display V2
