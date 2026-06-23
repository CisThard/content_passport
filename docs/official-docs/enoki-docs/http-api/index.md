# HTTP API Reference

Enoki provides several HTTP APIs, which expose all of the core Enoki functionality. Our API accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication.

**Base URL:** `https://api.enoki.mystenlabs.com`

## Versioning

The Enoki API is currently version `v1`. The API version must be included as a path prefix to requests made to the API.

**Versioned Base URL:** `https://api.enoki.mystenlabs.com/v1`

## Authentication

The Enoki API uses API keys to authenticate requests. You can view and manage your API keys in the Enoki Developer Portal. You can create both private and public API keys. Public keys are meant to be used when calling Enoki from a frontend or used in publicly available code. If you're calling the API from a backend service instead, use either a public or private API key to construct your `Authorization` header. The benefit of using a private key is to avoid public key rate limits. Format the header as follows:

```
Authorization: Bearer <YOUR_ENOKI_API_KEY>
```

## Request IDs

If you would like to debug a request, you can include a `Request-Id` header in your request. This is expected to be a globally identifier (often a UUID) that you generate on the client when initiating a request.

```
Request-Id: <UUID>
```

## API endpoints

You can find the full list of API endpoints in the [OpenAPI specification](./openapi.md).