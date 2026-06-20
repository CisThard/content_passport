# Changelog

### Added

- Accept HTTPS dashboard sign-in callbacks to the local 127.0.0.1 MCP listener.
- Reload credentials after `memwal login` so memory tools work without restarting the MCP client.
- Rebranded package metadata and documentation from Walrus Memory to Walrus Memory.

### Internal

- Update `@mysten-incubation/memwal` dependency to `^0.0.2`

### Initial release

- NemoClaw/OpenClaw memory plugin powered by Walrus Memory
- Automatic memory recall through `before_prompt_build` hook
- Automatic fact capture through `agent_end` hook
- Session summary on `before_reset` hook
- CLI commands: `openclaw memwal stats`, `openclaw memwal search`
- LLM tools: `memory_search`, `memory_store`
