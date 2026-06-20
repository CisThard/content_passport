<!-- Source: https://docs.sui.io/references/framework/sui_sui/url -->

* [](</>)
  * [Move](</references/sui-move>)
  * [Framework](</references/framework>)
  * [sui](</references/framework/sui_sui>)
  * url


# Module sui::url

URL: standard Uniform Resource Locator string
[code] 
    **use** [std::ascii](</references/framework/sui_std/ascii#std_ascii>);
    **use** [std::option](</references/framework/sui_std/option#std_option>);
    **use** [std::vector](</references/framework/sui_std/vector#std_vector>);
    
[/code]

## Struct Url​

Standard Uniform Resource Locator (URL) string.
[code] 
    **public** **struct** [Url](</references/framework/sui_sui/url#sui_url_Url>) **has** **copy** , drop, store
    
[/code]

Click to openFields

[url](</references/framework/sui_sui/url#sui_url>): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    

## Function new_unsafe​

Create a [Url](</references/framework/sui_sui/url#sui_url_Url>), with no validation
[code] 
    **public** **fun** [new_unsafe](</references/framework/sui_sui/url#sui_url_new_unsafe>)([url](</references/framework/sui_sui/url#sui_url>): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)): [sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>)
    
[/code]

## Function new_unsafe_from_bytes​

Create a [Url](</references/framework/sui_sui/url#sui_url_Url>) with no validation from bytes.  
Note: this will abort if bytes is not valid ASCII
[code] 
    **public** **fun** [new_unsafe_from_bytes](</references/framework/sui_sui/url#sui_url_new_unsafe_from_bytes>)(bytes: vector<u8>): [sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>)
    
[/code]

## Function inner_url​

Get inner URL
[code] 
    **public** **fun** [inner_url](</references/framework/sui_sui/url#sui_url_inner_url>)(self: &[sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>)): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>)
    
[/code]

## Function update​

Update the inner URL
[code] 
    **public** **fun** [update](</references/framework/sui_sui/url#sui_url_update>)(self: &**mut** [sui::url::Url](</references/framework/sui_sui/url#sui_url_Url>), [url](</references/framework/sui_sui/url#sui_url>): [std::ascii::String](</references/framework/sui_std/ascii#std_ascii_String>))
    
[/code]

[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/references/framework/sui_sui/url.md>)

[Previoustypes](</references/framework/sui_sui/types>)[Nextvdf](</references/framework/sui_sui/vdf>)
