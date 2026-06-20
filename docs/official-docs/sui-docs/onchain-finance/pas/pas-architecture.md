<!-- Source: https://docs.sui.io/onchain-finance/pas/pas-architecture -->

* [](</>)
  * [Permissioned Asset Standard](</onchain-finance/pas/>)
  * What is Permissioned Asset Standard?


On this page

# What is Permissioned Asset Standard?

On Sui, any object with the `store` ability can be freely transferred by its owner. `Balance` and `Coin` both have `store`, meaning if you hold them, you can send them anywhere on the network with no restrictions.

This works well for general-purpose assets, but creates a problem for regulated assets that need transfer controls, compliance checks, or issuer oversight.

The Permissioned Asset Standard (PAS) solves this by proxying asset ownership through **Accounts:** objects that hold assets and enforce a closed-loop system where every movement is gated by programmable approval logic.

You can use PAS through the [TypeScript package](<https://www.npmjs.com/package/@mysten/pas>) or learn more in the [GitHub repo](<https://github.com/MystenLabs/pas>).

## How it works​

For each wallet address (or object ID), PAS creates a one-to-one derived Account. An Account is a shared object that holds assets on behalf of that address. The owner can prove ownership through an `Auth` proof, but cannot freely transfer the assets. This creates a proxy of ownership where the assets follow the constraints of PAS modules, and sequentially, the rules that an issuer defines across one or more packages through approval witnesses.

Every time funds move, they go through hot potato requests that must collect a predefined set of approval stamps (witness structs) before they can resolve within the transaction. Hot potato requests have no `drop` or `store` ability, so the transaction aborts if the request is not resolved.

The following diagrams compare asset ownership with and without PAS:

**Without PAS**

![Unrestricted asset ownership without PAS](data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTQ3Ni41ODM2MzMxNzIwODg5IDM0OS4wNzg1ODQxMzQzNDUiIHdpZHRoPSI3MzgiIGhlaWdodD0iMTc1Ij48IS0tIHN2Zy1zb3VyY2U6ZXhjYWxpZHJhdyAtLT48bWV0YWRhdGE+PC9tZXRhZGF0YT48ZGVmcz48c3R5bGUgY2xhc3M9InN0eWxlLWZvbnRzIj4KICAgICAgQGZvbnQtZmFjZSB7IGZvbnQtZmFtaWx5OiBOdW5pdG87IHNyYzogdXJsKGRhdGE6Zm9udC93b2ZmMjtiYXNlNjQsZDA5R01nQUJBQUFBQUFvY0FBOEFBQUFBRTZRQUFBbkNBQUVBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUdqWWJoVmdjZ2lRR1lEOVRWRUZVUkFDQkZCRUlDcE5Ranl3TE9BQUJOZ0lrQTJ3RUlBV0VKQWNnRzBjUUl4RW1oYzQzc3I5S3NBMVkrWU05SkRWVlV4MmYzUW1CNGZaZk9teVhJNnRFaVBBWUlyeDJSTDdUSEEvUGo3MDc5MzN4TnZVOEQwazF6eEdOVUplWHdSdUVTSXVXS1AzK1BHMzcvdHlaQVhHZ0orM3hQZDU3WUFhZ0FrWmpFVVpoOVVKdjRtN2ovMjNVYm10dmRCdS9JaGpiR2pyc2Y0QjhnUUV3TU0rUTYxS1FLcVFTeEJ2ejd0ZnEvcDFIUWxjTEJScWhFQktsM0hhNk4zWXV6UkJOL2hGTk5JaUVLcHJNckZxb05CNmQwSUtIWEhoYzFseXNMWGg5ZzBUMzlzVERUY0MvL09CL3VRQ21nQzVRaDhnZ0NBTWhvRWdHREE2UlE1Um9DSU9CUVVCYm1oTDR4bGFUSGVpN3NHY0c2TmR1M3h6UUNFRCtPeUJlUGZITWdRUUlJQkF3RWxqeElHSHhtd2hRbGpFTTFCUXVEUGs1Y1UvRm45NnVYbEFYU2YzbmlLNUVNZjVLUHAwSjBpQWZsclpaeW5mc2poV0dPTGR6OVY0R0FEaklzODEwMkJVMENjQVZlVUFUb1h0dEMrUU5JNmltVGdnZ0Q1VEp5RGxwekhhM3RqUlNPQmNTQ3pJTVRPUTdrcWRwblpPRGpPMWxuUGRFVFNnMml1UXJrMGxIQ05zNXRMaUVXVXVtekNFdWxKWGo4YWc4Y3hDd1hkcFlZaVFwbEZJR0J5cEVlVEVrNUhuNXVIZzRCVVJDU2t5T0lBTUtKUUJWc1dLUVZBRFVJQ29FVUtHbEZRL0JrZVNVc01HNFlxRlRXZERXSUpyVDNDeCsxbExKME1WWm93QWt5SC8vdVdsQlpEdXRPemhCZFA5MmZoWU0vMHRpSDVEM2VuTGNEUm12NTRkbjRQSmIvNndIQkNBZ3lRVXFUbytpY3RFWXQ0TEh5TUZSTG1mb0RnbkVxUVljQkVaUTlJYWxFTW9UOHYvTndEZ25QSjBBU212SlF5STkxNUdHREljWUp0dGkzWTNJRWFVSS9RVkVvRHhpbmNBK2RDY3VKY1lGMkdZTzZPOWFuek84QW9KUTVjLy9RNkM2aGpJRVFKOEJpUDk3TlRBRmh5QVNHTkIzQStiS3ZYODI0VU1BZnNkbVFHaW9oQ0I1c0VqdGdvUTIxbEQrTVlWVXFpTUtBZkw1UlFDTVVjSEpDSEpZVld2aTRPSTJadEljbjFEK0M4SzFjTzNjWVk3bmZYWURsMDNGWVRGb0pCd0NETm5tQlpUL3oxQXlLcGoxaVNkQlpSR2c4anZRZDZqeFZtSGZxTEZUKy94L0FBcm9nS3g4Vk16RnhxWlNYSXErV0oraXlOQXJaQXB0VW42bUxndnVTYVpTeVJ5UHU1c0owMXRIMHFXRHVNbU45UWZJNkdHOHMxUm10Sy92VDNlbXlYWGQwdWdoRWkwZVNhVkxwNmNRT2JFak5SWHA3Q3lkbzhVemtrUWJSYUhoeVpjT0lMSlB5b0FybzFCUnd1YTRNWG1Fdmh5bDBKS0VrQWpWMmRhSWNKb2Rleml0WDJub1RrNHFPT0w3Ti92YnRZOGMrSzZEZk8vNlBvbGhLUi9KRVQwN1E0dWZuMHVsNFBwUFhvRElwMmlSajE5SGFQRzE1K1ZMbG5jM043ZTQ1ODhucGNjZXlzUkZTTHI5eW9sYmYzNGVuS3QwWldOOStRSDI4QzB5K3M0TEp6QU0zOXZwYXpzQkM3MWZDQ3BYS29tUFMxNUxpYmg3VHB4TDUvT2lqNTZVcWxuUThPbnByRmlSWEl1UWoxYlNXdm5uWlo4NWNVUVBFWjRTblZSWFFldTY0cGVveXN1MDlvMVBBQVk2ODZUSElvV1VkOGI5ZnJJVVlRWFpSaWNZK0RWZTZMTi9Sa1k3WitIanRYK2V1OVlPNGpiMnRkcUJvWG5jZ21GMWMydHRqM24yVkxyME1WcDhyc2o1MWxTb2ZvYkFleVUrZ01pTGhZNzhrSTVXalNaQVVhT0tZYzhJa1ZlbFMzdlN0UldJck5QTFR6aFVzYzBFRnppL0xXRFJIY1pCdWo3dmlXSWJ2QjA1UHI2Y1BkdGxuVkw3aHdlU3d0bmprYUNubkpLSzFNMm5aOFBzanZiVkRwR1RaWkVxcElnamFBeVQxOTlmbFh6bEhldlMwY1AzWDlyMmorK1J6VVVOek5BZzFyUVlGMVNUTnorbVZ0KzNEQ011WkpScmFOOU5OVHQ3eDNzWHM5L1NydXpmV3ZCTmpXd3Z3RzM4QnQrblR1NjM5V1BwaFcwR1M2UExvbERXUyt6ZDlmMVhqeXg4VXZlMnJkRlVVZEZvdEwzZDhIUlRrOGxnWUphbXB5dU11RUJaTlZRbFZmZkxmQ3BmcS9LazlpOTFEcVp1a3NQTjdCM3NHQmRrdlZ4Tk9STWZtYTVpSUh0Y2lLdi9ObVZYMmc1S1NpNTNTbFhSMzY3bkptQld6WlMydGs0N1UzY0RIMkM1QUgvdHRIdGlZT0NnbTc3V0JPeEhmc09BZWZGNkN4aEhlLzNmbkwxMVBvRnFHM21uV2Z0aG82OURRMVdPdnRzZ3ZOYzgzRTV6QTRGdno0MTRhY2JyZnkyYmZUM0hOd3cvbHRkNkphTXlyYWp2aHZpWmJFTm1jNmM4TCtXS08rZnljckxlYS94TGFXcTF1djFuOXRmRU95ZFBPaldYTFIwNnZkMHE0VndNUGM3Vnh2cWVOQ2RDZ29icDhsS1B6U0QwbEprN1Uwc3VOak9TUFh2MTc5eHZYOVhDWDdwdGhqS25PMW9HNi9ueXhiZmJmMWN3dXZ2M1JnWXc1a0ZUb2FmWlZyQUFwMmV4OUpuL0trM2x4bGcyd0htNElNc0V1WjU3Zjk1dlNhL05NT3N2dEJnN20zdXM2V2JkeGMwZm9hMFg5Rm9XVEdVTHpVMm1xNllxcW5OdHduV0puU1VxUWVNMFZNZ0xrdXQyTW5JcU15NjJGb3E3SFQxdGdsWDVrMTlFL2xldzlnMXhOdzlmRTdOQkxtelM1S25VdVJySGJaZmMvU005TVQvOFlXSkgxZmZ2YVgyaTE2VDd5RXZscWxWNTFGZzRHL3hsd3R5WCtSRERodmd2YzVOc2I4SnYrUGhmSlNTOUY4OS9FTGxtOEk4SmN1dGNnR0hHdVBhSDZ2cEx5NHlOK2tzT3E1Z2JaOWtnaHl3SnhlWW1XK1Z2c2lFNGp2VHdtOGwvdThxcytCOXljS3pJb3JLSWEyb3Jmc1dOd3g5a2R0UGgzWnUxMzdjK05WcW4xaFlIVXhOdDQ3MmE3NWFiOHpOenJLNkxwUmsyOW05UGpWUjl0LzJ0MTE5SkxwcThFSStLZXpWbXVjVlVVRFZsQXcyalRYKzV4ZkEzOHlRbk1NOXlBWllkNDJiREU5dHArSGZGNTRYVUtobjVrRkxjK3ZyakFXaC9aWnY4bGVPenpIdmYvaVRKVXR3L3ZYM0hROExldnoydFVsbENxZTU1VTNmMCtmZVRyTjFmZmk3bGE4OXR6U1J4eHNIZTRSN0pxOGcwWFAxOTZhTTNsUm5ZdXRYc0JCL2x1amcyelBuUHd0bEVmL3gzK1BodnhTZk8zVTdUWFgzOWN3OEhTKzZlYTJ1NzVycW5IdldYM0R2YjBXWnJiYjdqYTE5cnVyVU53SzJTcDE4TExLTE9NVE5ieEhwdXZYbFRXMitmbWlsaTJsWTNqY3lQYWpiMXJicUdOT2FITlJ1Nk5sMFRkQTgvejhjOUV4ZS9IeGQzQ09JRlVBQjE4ZTlBM0FBT3hBZ2dFYkRtdTJQc2xZUmdVRzk1S3dSVXZpWHR2bkc5ZVVCcCtpc2MvMFhBYjI3bkZJQi9lVHVGLzQ5aGFnYWhBbENIQVFUNGNZTlBFQkNESFBaMnR0SDRDK1NWN3lhVVBYQ1Voa3RHdTdxQi9PN2J0VlpiWFNvTUZNU25aWlJHQnRnVVlZZjdMWmlZK3BqV1lvTDZtRjN2ajh1TXNmeE1BNW5GQUhqcGxCL1hFdGpiaWdESUlnU002aVV5aFJnR1pTN1dFUVVjcXNZQytBSC9lSXBBY3J3VGdWRjRMZ0pYSmRDY3dDTkU0dldHaTJYSktvTUF1aTV3QnZHUHNZeUlUejZuVkJLZ2ZYN1dQZGM4T2pMcG42MzN1V2NtaDEyamsrTVRQcHQvYnRJM1h4M3llZHhOV012TUJtSTZSejNlbDg3UENmbFpSVGw1RDhtTnRoWmJkV00yekxUamNZNW44SmFlYW0wTG00ekM0Slh6QzJFUE5tSmVUbTZCWUhmQWFHME4ybG85Z0tlQ1pKaUtMUWoya2NqOEJCMkNyZ21iYjhFb2Fjak9IcTlXZnNJL2xEV2NaaGlBVUg1K2ZHWjBMQzNZUjhiWm9Pd29wTWUzMmYyZlRRUT0pOyB9PC9zdHlsZT48L2RlZnM+PGcgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCAxMCkgcm90YXRlKDAgMTY0LjExODI2ODgxMDUyMjU4IDEwNy4xMzMxMjIxNjU3NDQ1OCkiPjxwYXRoIGQ9Ik0wIDAgQzcxLjg3IDAsIDE0My43NSAwLCAzMjguMjQgMCBNMzI4LjI0IDAgQzMyOC4yNCA3Ni44OCwgMzI4LjI0IDE1My43NiwgMzI4LjI0IDIxNC4yNyBNMzI4LjI0IDIxNC4yNyBDMjA4LjQgMjE0LjI3LCA4OC41NiAyMTQuMjcsIDAgMjE0LjI3IE0wIDIxNC4yNyBDMCAxNjcuNCwgMCAxMjAuNTMsIDAgMCIgc3Ryb2tlPSIjNmM3NTg0IiBzdHJva2Utd2lkdGg9IjEuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRhc2hhcnJheT0iOCA5Ij48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEwOC4wMDEzMTQ3MDY3NDIyOCAxMDguNjU2NDY5Mzk2OTE2NjkpIHJvdGF0ZSgwIDYxLjg0OTk5ODQ3NDEyMTA5NCAxMi41KSI+PHRleHQgeD0iMCIgeT0iMTkuMDgiIGZvbnQtZmFtaWx5PSJOdW5pdG8sIHNhbnMtc2VyaWYsIFNlZ29lIFVJIEVtb2ppIiBmb250LXNpemU9IjIwcHgiIGZpbGw9IiMxZTFlMWUiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9IndoaXRlLXNwYWNlOiBwcmU7IiBkaXJlY3Rpb249Imx0ciIgZG9taW5hbnQtYmFzZWxpbmU9ImFscGhhYmV0aWMiPldBTExFVCAweEE8L3RleHQ+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYxMi44OTQ4MzA2NjA5MDggNjMuNjYzODY2MDU2NTE0MjgpIHJvdGF0ZSgwIDEzMy41NTAwMDMwNTE3NTc4NyAxNy41KSI+PHRleHQgeD0iMTMzLjU1MDAwMzA1MTc1NzgiIHk9IjI2LjcxMiIgZm9udC1mYW1pbHk9Ik51bml0bywgc2Fucy1zZXJpZiwgU2Vnb2UgVUkgRW1vamkiIGZvbnQtc2l6ZT0iMjhweCIgZmlsbD0iIzNkNDM1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgc3R5bGU9IndoaXRlLXNwYWNlOiBwcmU7IiBkaXJlY3Rpb249Imx0ciIgZG9taW5hbnQtYmFzZWxpbmU9ImFscGhhYmV0aWMiPlVucmVzdHJpY3RlZCBUcmFuc2ZlcjwvdGV4dD48L2c+PGcgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTM4LjM0NzA5NTU1MTA0MzggMTAuNjU2MTkyNDMwNjQxNzk1KSByb3RhdGUoMCAxNjQuMTE4MjY4ODEwNTIyNTIgMTA3LjEzMzEyMjE2NTc0NDU4KSI+PHBhdGggZD0iTTAgMCBDOTIuODIgMCwgMTg1LjY0IDAsIDMyOC4yNCAwIE0zMjguMjQgMCBDMzI4LjI0IDY4LjE5LCAzMjguMjQgMTM2LjM4LCAzMjguMjQgMjE0LjI3IE0zMjguMjQgMjE0LjI3IEMyMTAuNzUgMjE0LjI3LCA5My4yNiAyMTQuMjcsIDAgMjE0LjI3IE0wIDIxNC4yNyBDMCAxNjYuMjUsIDAgMTE4LjI0LCAwIDAiIHN0cm9rZT0iIzZjNzU4NCIgc3Ryb2tlLXdpZHRoPSIxLjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjggOSI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMjM2LjM0ODQxMDI1Nzc4NjMgMTA5LjMxMjY2MTgyNzU1ODQ5KSByb3RhdGUoMCA2MS4yOTk5OTkyMzcwNjA1NSAxMi41KSI+PHRleHQgeD0iMCIgeT0iMTkuMDgiIGZvbnQtZmFtaWx5PSJOdW5pdG8sIHNhbnMtc2VyaWYsIFNlZ29lIFVJIEVtb2ppIiBmb250LXNpemU9IjIwcHgiIGZpbGw9IiMxZTFlMWUiIHRleHQtYW5jaG9yPSJzdGFydCIgc3R5bGU9IndoaXRlLXNwYWNlOiBwcmU7IiBkaXJlY3Rpb249Imx0ciIgZG9taW5hbnQtYmFzZWxpbmU9ImFscGhhYmV0aWMiPldBTExFVCAweEI8L3RleHQ+PC9nPjxnIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQzLjczNjUzNzYyMTA0NTE2IDExNy4wMzMxMjIxNjU3NDQ1NCkgcm90YXRlKDAgMzk0LjU1NTI3ODk2NDk5OTMzIDAuMzI4MDk2MjE1MzIwODk3NSkiPjxwYXRoIGQ9Ik0wIDAgQzI2MC4yMiAwLjIyLCA1MjAuNDQgMC40MywgNzg5LjExIDAuNjYgTTAgMCBDMjg4LjE2IDAuMjQsIDU3Ni4zMiAwLjQ4LCA3ODkuMTEgMC42NiIgc3Ryb2tlPSIjMjk4ZGZmIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzQzLjczNjUzNzYyMTA0NTE2IDExNy4wMzMxMjIxNjU3NDQ1NCkgcm90YXRlKDAgMzk0LjU1NTI3ODk2NDk5OTMzIDAuMzI4MDk2MjE1MzIwODk3NSkiPjxwYXRoIGQ9Ik03ODkuMTEgMC42NiBMNzc1LjUxIDYuOTggTDc3NS41MiAtNS42OSBMNzg5LjExIDAuNjYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBmaWxsPSIjMjk4ZGZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjwvcGF0aD48cGF0aCBkPSJNNzg5LjExIDAuNjYgQzc4NC42MyAyLjc0LCA3ODAuMTQgNC44MywgNzc1LjUxIDYuOTggTTc4OS4xMSAwLjY2IEM3ODQuMTQgMi45NywgNzc5LjE4IDUuMjgsIDc3NS41MSA2Ljk4IE03NzUuNTEgNi45OCBDNzc1LjUxIDMuNTUsIDc3NS41MiAwLjExLCA3NzUuNTIgLTUuNjkgTTc3NS41MSA2Ljk4IEM3NzUuNTEgMy4xLCA3NzUuNTIgLTAuNzksIDc3NS41MiAtNS42OSBNNzc1LjUyIC01LjY5IEM3NzguODggLTQuMTIsIDc4Mi4yNCAtMi41NSwgNzg5LjExIDAuNjYgTTc3NS41MiAtNS42OSBDNzgwLjY5IC0zLjI4LCA3ODUuODcgLTAuODYsIDc4OS4xMSAwLjY2IE03ODkuMTEgMC42NiBDNzg5LjExIDAuNjYsIDc4OS4xMSAwLjY2LCA3ODkuMTEgMC42NiBNNzg5LjExIDAuNjYgQzc4OS4xMSAwLjY2LCA3ODkuMTEgMC42NiwgNzg5LjExIDAuNjYiIHN0cm9rZT0iIzI5OGRmZiIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIj48L3BhdGg+PC9nPjwvZz48bWFzaz48L21hc2s+PGcgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzOS41NDcwOTY0MDM5ODQ5NCAyMjkuMDc4NTg0MTM0MzQ1MDIpIHJvdGF0ZSgwIDEyNi4xMzg4OTc2MjcwMzQ5MSA1NSkiPjxwYXRoIGQ9Ik0wIDAgTDI1Mi4yOCAwIEwyNTIuMjggMTEwIEwwIDExMCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIGZpbGw9IiMyOThkZmYiPjwvcGF0aD48cGF0aCBkPSJNMCAwIEM3My4yOSAwLCAxNDYuNTkgMCwgMjUyLjI4IDAgTTAgMCBDNjguMzkgMCwgMTM2Ljc4IDAsIDI1Mi4yOCAwIE0yNTIuMjggMCBDMjUyLjI4IDMzLjQ4LCAyNTIuMjggNjYuOTYsIDI1Mi4yOCAxMTAgTTI1Mi4yOCAwIEMyNTIuMjggMzMuMzEsIDI1Mi4yOCA2Ni42MiwgMjUyLjI4IDExMCBNMjUyLjI4IDExMCBDMTk5Ljc0IDExMCwgMTQ3LjIgMTEwLCAwIDExMCBNMjUyLjI4IDExMCBDMTg5LjY3IDExMCwgMTI3LjA3IDExMCwgMCAxMTAgTTAgMTEwIEMwIDc2LjczLCAwIDQzLjQ2LCAwIDAgTTAgMTEwIEMwIDczLjksIDAgMzcuODEsIDAgMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTM1LjAyNjAyODUxNTg4MzEzIDI3MS41Nzg1ODQxMzQzNDUpIHJvdGF0ZSgwIDMwLjY1OTk2NTUxNTEzNjcyIDEyLjUpIj48dGV4dCB4PSIzMC42NTk5NjU1MTUxMzY3MiIgeT0iMTkuMDgiIGZvbnQtZmFtaWx5PSJOdW5pdG8sIHNhbnMtc2VyaWYsIFNlZ29lIFVJIEVtb2ppIiBmb250LXNpemU9IjIwcHgiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHN0eWxlPSJ3aGl0ZS1zcGFjZTogcHJlOyIgZGlyZWN0aW9uPSJsdHIiIGRvbWluYW50LWJhc2VsaW5lPSJhbHBoYWJldGljIj5Bc3NldHM8L3RleHQ+PC9nPjxnIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTE3My44NTM2NjI2NDg5NzQgMjI5LjA3ODU4NDEzNDM0NTAyKSByb3RhdGUoMCAxMjYuMTM4ODk3NjI3MDM0OTEgNTUpIj48cGF0aCBkPSJNMCAwIEwyNTIuMjggMCBMMjUyLjI4IDExMCBMMCAxMTAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBmaWxsPSIjMjk4ZGZmIj48L3BhdGg+PHBhdGggZD0iTTAgMCBDNzguNyAwLCAxNTcuMzkgMCwgMjUyLjI4IDAgTTAgMCBDNTUuMzIgMCwgMTEwLjY1IDAsIDI1Mi4yOCAwIE0yNTIuMjggMCBDMjUyLjI4IDQwLjY3LCAyNTIuMjggODEuMzQsIDI1Mi4yOCAxMTAgTTI1Mi4yOCAwIEMyNTIuMjggMzQuOTksIDI1Mi4yOCA2OS45OCwgMjUyLjI4IDExMCBNMjUyLjI4IDExMCBDMTg3LjEgMTEwLCAxMjEuOTIgMTEwLCAwIDExMCBNMjUyLjI4IDExMCBDMTg5Ljc4IDExMCwgMTI3LjI3IDExMCwgMCAxMTAgTTAgMTEwIEMwIDgxLjcxLCAwIDUzLjQyLCAwIDAgTTAgMTEwIEMwIDczLjE5LCAwIDM2LjM4LCAwIDAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIj48L3BhdGg+PC9nPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNjkuMzMyNTk0NzYwODcyMyAyNzEuNTc4NTg0MTM0MzQ1KSByb3RhdGUoMCAzMC42NTk5NjU1MTUxMzY3MiAxMi41KSI+PHRleHQgeD0iMzAuNjU5OTY1NTE1MTM2NzIiIHk9IjE5LjA4IiBmb250LWZhbWlseT0iTnVuaXRvLCBzYW5zLXNlcmlmLCBTZWdvZSBVSSBFbW9qaSIgZm9udC1zaXplPSIyMHB4IiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBzdHlsZT0id2hpdGUtc3BhY2U6IHByZTsiIGRpcmVjdGlvbj0ibHRyIiBkb21pbmFudC1iYXNlbGluZT0iYWxwaGFiZXRpYyI+QXNzZXRzPC90ZXh0PjwvZz48L3N2Zz4=)

**With PAS**

![Restricted asset ownership with PAS](/assets/images/restricted-ownership-2ff25a4beb7cff735dcbea383bf039f9.svg)

Each asset type can have its own policy that defines which witnesses are required to approve each action. This means different assets can adhere to completely different rules. One asset might require a single compliance stamp, while another might need approvals from multiple independent contracts.

The result is that assets are held in a closed system where every movement is gated by programmable, composable approval logic that the issuer defines at the policy level.

There is no way to transfer a managed `Balance<C>` out of the system without going through a request that collects the required approvals.

For currencies, this is enforced at the Move type level:

  * `Balance<C>` is stored inside Accounts using `balance::send_funds` and `balance::redeem_funds` (derived object storage).

  * The only way to move funds is through request hot potatoes that must be resolved in the same transaction.

  * Resolution requires matching the approval set defined in the `Policy<Balance<C>>`.


## Object model​

The following diagram shows the PAS object hierarchy:
[code] 
    Namespace (shared, singleton)  
    ├── Account (@0xAlice)      ← derived from (namespace_id, AccountKey(alice_addr))  
    ├── Account (@0xBob)        ← derived from (namespace_id, AccountKey(bob_addr))  
    ├── Policy<Balance<C>>    ← derived from (namespace_id, PolicyKey<Balance<C>>)  
    │   └── PolicyCap<Balance<C>>  ← derived from (policy_id, PolicyCapKey)  
    └── Templates             ← derived from (namespace_id, TemplateKey)  
    
[/code]

All objects use derived addresses (`sui::derived_object`), making them deterministic and queryable without onchain lookups.

### Namespace​

The Namespace is the root of the system. Its responsibilities include:

  * Deriving addresses for Accounts, policies, and templates

  * Holding the `Versioning` state for emergency version blocking

  * Keeping the `UpgradeCap` UID to gate admin operations (version blocking, setup)


### Account​

Accounts are shared objects derived from the Namespace UID and the owner address.

**Property**| **Detail**  
---|---  
**Creation**|  Permissionless. Anyone can create an Account for any address.  
**Ownership**|  Wallet address (`ctx.sender()`) or object (`UID`).  
**Storage**|  Holds `Balance<C>` as object balance, or `T` directly as objects on the Account UID.  
**Derivation**| `derived_object::claim(namespace_uid, AccountKey(owner))`.  
  
### Policy​

A `Policy<T>` defines resolvable actions for a managed asset type `T`:

  * **Required approvals:** Per action type (`send_funds`, `unlock_funds`, `clawback_funds`).

  * **Clawback flag:** Whether issuer clawback is allowed.

  * **Versioning:** Synced from Namespace. Can block package versions.


For currencies, you create a `Policy<Balance<C>>` through `policy::new_for_currency(&mut namespace, &mut treasury_cap, clawback_allowed)`. This requires `TreasuryCap<C>` as proof of currency ownership.

### `PolicyCap`​

The capability to manage a policy. Derived one-to-one from the policy UID and `PolicyCapKey`. You use it to:

  * Set or update required approvals per action

  * Remove action approvals (makes requests for that action unresolvable)


## The request pattern​

Every state-changing operation in PAS follows the request hot potato pattern:

  1. **Create:** An Account method wraps data `T` into a `Request<Action<T>>`. The request starts with an empty approval set.

  2. **Approve:** Your package calls `request.approve(MyWitness())` to stamp the request with a type-level proof. You can collect multiple approvals from different packages.

  3. **Resolve:** A resolution function verifies that the collected approvals exactly match the required approvals in the policy, destroys the request object, and either executes an action or unwraps data.


### Request types​

The following are the available request types:

  * `Request<SendFunds<T>>`: Transfer between accounts

  * `Request<ClawbackFunds<T>>`: Issuer funds withdrawal

  * `Request<UnlockFunds<T>>`: Withdraw from system as the owner of funds


### Approval matching​

Approvals are matched by type identity using `TypeName`. The approval set must be exactly equal (same types, same count, same order through `VecSet` insertion) to the policy required approvals.

info

In the current version, each action supports only a single approval witness. Multi-approval support (requiring stamps from multiple independent contracts) is planned for a future release.

For example, a `TransferApproval` witness struct defined in your contracts:
[code] 
    // Policy requires: { TransferApproval }  
    // Request has:     { TransferApproval }  ← resolves  
    // Request has:     { TransferApproval, ExtraApproval }  ← aborts (count mismatch)  
    // Request has:     { WrongApproval }  ← aborts (type mismatch)  
    
[/code]

## Balance tracking​

PAS uses Sui [Address Balances](</onchain-finance/asset-custody/address-balances/using-address-balances>):

### How balances are stored​

The following diagram shows how balances attach to an Account:
[code] 
    Account (shared object)  
      └── UID  
           └── Balance<MY_COIN> stored via balance::send_funds(balance, account_object_address)  
    
[/code]

Balances are not stored as fields on the `Account` struct. They are stored as object balance on the Account UID, using `balance::send_funds` to send funds to the Account object address and `balance::withdraw_funds_from_object` (through `UID.withdraw_funds_from_object`) to pull them out.

### Balance flow​

The following diagram shows deposit and withdrawal paths:

Deposits are permissionless (anyone can deposit into any Account). Withdrawals are internal (`public(package)`). Only PAS modules can withdraw, and only through requests.

## Wallet ownership compared to object ownership​

Accounts can be owned by wallet addresses or objects.

The following example shows both authentication methods:
[code] 
    // Wallet-owned: proves ownership via transaction sender  
    let auth = account::new_auth(ctx);  
      
    // Object-owned: proves ownership via UID reference  
    let auth = account::new_auth_as_object(&mut my_object_uid);  
    
[/code]

## Derived object addresses​

All PAS objects (Accounts, policies) use deterministic derived addresses. You can compute them offchain:
[code] 
    // Get the account address for an owner  
    let account_addr: address = namespace.account_address(@0xAlice);  
      
    // Get the policy address for a type  
    let policy_addr: address = namespace.policy_address<Balance<MY_COIN>>();  
    
[/code]

## Security model​

PAS guarantees the following:

  * **Closed loop:** Managed assets cannot leave the system without going through a request with matching approvals.

  * **Type-safe approvals:** Approval witnesses are checked by `TypeName`. You cannot forge an approval from a different package.

  * **Atomic resolution:** Requests are hot potatoes. They must be resolved in the same transaction or the transaction aborts.

  * **Deterministic addressing:** All objects use derived addresses. There is no hidden state and no non-deterministic object creation.


PAS does not support or guarantee the following:

  * **Access control:** PAS does not decide who can transfer. That is your contract's job through approval witnesses.

  * **Compliance rules:** PAS does not enforce rules. Your contract implements those before calling `request.approve()`.


### Trust boundaries​

**Component**| **Trust level**  
---|---  
`PolicyCap<T>` holder| Can change approval requirements for `T`.  
`TreasuryCap<C>` holder| Can create a policy (one-time) for `Balance<C>`.  
Account owner (`Auth`)| Can initiate send or unlock from their Account.  
Anyone| Can create Accounts, deposit, sync versioning.  
Approval witness package| Controls who can approve requests.  
  
[Edit this page](<https://github.com/MystenLabs/sui/tree/main/docs/docs/../content/onchain-finance/pas/pas-architecture.mdx>)

[PreviousPermissioned Asset Standard](</onchain-finance/pas/>)[NextActions](</onchain-finance/pas/pas-workflows>)

  * How it works
  * Object model
    * Namespace
    * Account
    * Policy
    * `PolicyCap`
  * The request pattern
    * Request types
    * Approval matching
  * Balance tracking
    * How balances are stored
    * Balance flow
  * Wallet ownership compared to object ownership
  * Derived object addresses
  * Security model
    * Trust boundaries
