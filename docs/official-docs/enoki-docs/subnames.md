# Identity Subnames

Identity Subnames allow you to create human-readable identities for your users on the Sui blockchain using SuiNS (Sui Name Service). Instead of users having to remember and share long hexadecimal addresses like `0x1234...`, they can use simple, memorable names like `alice@yourapp`.

## How it works

Subnames are built on top of SuiNS domains that you own. Once you link a domain to your app in the Enoki Portal, you can create subnames for your users through the API. These subnames resolve to user addresses on the Sui network, making it easier for users to send and receive assets.

### Key Features

- **Human-readable addresses** — Users get memorable identities instead of complex hexadecimal addresses
- **Built on SuiNS** — Leverages the native Sui Name Service for on-chain resolution
- **Easy integration** — Simple REST API to create, query, and delete subnames

## Getting Started

### Prerequisites

1. **A SuiNS domain** — You need to own a `.sui` domain on the network (testnet or mainnet) where you want to create subnames.

2. **Enoki Portal setup** — Link your domain to your application in the Enoki Portal:

    - Navigate to your app in the [Enoki Portal](https://portal.enoki.mystenlabs.com)
    - Go to the Subnames section
    - Connect your wallet and link your SuiNS domain
    - Publish the domain to make it active (this makes the domain visible to the API and allows adding and deleting subnames)

3. **API Key with Subnames feature** — Create or configure an API key with the `SUBNAMES` feature enabled.

### Linking a Domain

To link a domain to your application:

1. In the Enoki Portal, navigate to your app's Subnames page
2. Click "Link a Domain"
3. Connect your Sui wallet that owns the domain
4. Select the network
5. Select the domain you want to link
6. Transfer the domain to the Enoki-managed contract

Enoki-Managed Contract

When you transfer your domain to Enoki, it's held in a secure on-chain contract that only allows Enoki to borrow the domain (to register or delete a subname) and then put it back to the contract. You retain the ability to reclaim your domain at any time through the Enoki Portal.

Domain Status

Domains must be in **LIVE** status before you can create subnames via the API. Use the "Publish Domain" action in the portal to activate newly linked domains.

## Creating Subnames

You can create subnames using the REST API with either a public or private API key. Alternatively, admins can create and manage subnames directly through the Enoki Portal.

For complete API details, see the [HTTP API Reference](./http-api/openapi.md).

### With Public API Key (Recommended for user-facing apps)

When using a public API key, include the user's zkLogin JWT to automatically associate the subname with their address:

```
const response = await fetch('https://api.enoki.mystenlabs.com/v1/subnames', {
	method: 'POST',
	headers: {
		Authorization: `Bearer ${publicApiKey}`,
		'zklogin-jwt': userJwt,
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		domain: 'yourapp.sui',
		network: 'mainnet',
		subname: 'alice',
	}),
});

const data = await response.json();
// { name: 'alice@yourapp.sui', status: 'PENDING', createdAt: '2025-08-06T14:30:00.000Z' }
```

One Subname Per User

When using a public API key with zkLogin, each user can only have one subname per domain. Attempting to create a second subname for the same user will result in an error.

### With Private API Key (For backend use)

When using a private API key, you must specify the `targetAddress`:

```
const response = await fetch('https://api.enoki.mystenlabs.com/v1/subnames', {
	method: 'POST',
	headers: {
		Authorization: `Bearer ${privateApiKey}`,
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		domain: 'yourapp.sui',
		network: 'mainnet',
		subname: 'alice',
		targetAddress: '0x1234567890abcdef...',
	}),
});
```

## Querying Subnames

Retrieve subnames associated with an address:

```
const response = await fetch(
	'https://api.enoki.mystenlabs.com/v1/subnames?' +
		new URLSearchParams({
			network: 'mainnet',
			address: '0x1234567890abcdef...',
			domain: 'yourapp.sui',
		}),
	{
		headers: {
			Authorization: `Bearer ${apiKey}`,
		},
	},
);

const data = await response.json();
// {
//   subnames: [
//     { name: 'alice@yourapp.sui', status: 'ACTIVE', createdAt: '2025-08-06T14:30:00.000Z' }
//   ]
// }
```

## Deleting Subnames

Remove subnames using a private API key:

```
const response = await fetch('https://api.enoki.mystenlabs.com/v1/subnames', {
	method: 'DELETE',
	headers: {
		Authorization: `Bearer ${privateApiKey}`,
		'Content-Type': 'application/json',
	},
	body: JSON.stringify({
		domain: 'yourapp.sui',
		network: 'mainnet',
		subname: 'alice',
	}),
});
```

Private API Key Required

Deleting subnames requires a private API key for security reasons.

## Subname Status

Subnames go through the following states:

- **PENDING** — The subname has been submitted and is being processed (typically takes a few seconds)
- **ACTIVE** — The subname is live and resolving on-chain
- **FAILED** — The creation failed (this status is filtered out from API responses)

After creating a subname, poll the GET endpoint or check the subname resolution on-chain to confirm it's active.

## Best Practices

1. **Check status after creation** — Use the GET endpoint to monitor when a subname becomes ACTIVE
2. **Handle async nature** — Don't assume immediate availability; subnames are processed asynchronously
3. **Validate input** — Validate subname format on the client side before making API calls
4. **Use public keys for user actions** — Let users create their own subnames with public API keys and zkLogin
5. **Reserve private keys for admin** — Use private API keys only for backend operations where you need to specify target addresses

## Domain Renewals

SuiNS domains have expiration dates and must be renewed periodically to maintain ownership and functionality. Understanding the expiration timeline is critical:

- **Before expiration** — Renew your domain at any time through the [SuiNS platform](https://docs.suins.io/user/renew)
- **After expiration** — Once your domain expires, you cannot register or delete subnames, and existing subnames will stop resolving
- **Grace period** — You have a [30-day grace period](https://docs.suins.io/user/renew#renewal-grace-period) to renew the domain and restore functionality
- **After grace period** — Once the grace period ends, the domain becomes available for anyone to register, and you will lose ownership permanently
- You can check your domain's expiration date in the Enoki Portal on the Subnames page

Domain Expiration

Renew your domain before the 30-day grace period ends to prevent losing ownership. After the grace period, anyone can register your domain, and all associated subnames will stop resolving. Set up reminders well in advance of the expiration date.

### Auto-Renewals

Enoki supports automatic domain renewals for domains linked to your application. When enabled, domains will automatically renew around 30 days before expiration, ensuring uninterrupted service for your users' subnames without manual intervention.

Auto-Renewal Timeline

Domains automatically renew around 30 days before expiration. The exact timing may vary slightly based on network conditions and processing schedules. Renewal fees (based on domain length and market rates) apply only to mainnet domains and will be charged to your account.

**Key Points:**

- Auto-renewals work for both **mainnet and testnet** domains
- Renewal fees are automatically charged to your Enoki billing account (mainnet only)
- Domains are renewed for 1 year
- You can monitor your domain's expiration date and renewal history in the Enoki Portal

**Manual Renewal:**

If you prefer to renew your domain manually:

1. In the Enoki Portal, reclaim your domain to your wallet using the "Reclaim Domain" action
2. Go to [SuiNS](https://suins.io) and renew your domain
3. Transfer the domain back to Enoki through the Portal

Service Interruption During Manual Renewal

While your domain is reclaimed to your wallet, Enoki cannot manage subnames. Creating and deleting subnames will be blocked until you transfer the domain back to Enoki.

## Network Support

Subnames are available on both:

- **Testnet** — For development and testing
- **Mainnet** — For production use

Make sure your domain is registered on the same network where you want to create subnames, and that your API key has the corresponding network enabled.