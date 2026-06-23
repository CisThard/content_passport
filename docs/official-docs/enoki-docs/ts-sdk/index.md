# Enoki TypeScript SDK

The Enoki TypeScript SDK is in active development. Expect the implementation to change frequently.

Integrate Enoki into your dApps with the TypeScript SDK. Wrapping your main app with the Enoki context provider delivers Enoki functions and state across all your components.

With Enoki integrated in your app, users receive a Sui address based on their Web 2.0 authentication flow, so each authorized user always has the same address. The salt Enoki uses to create the address is per app, however, so the same user has different addresses across multiple apps using Enoki.

## Getting started

Include the Enoki SDK in your app to provide Sui blockchain functionality without having to manage any cryptographic keys. Your app users don't need to install a wallet, either. They complete the authorization flow from Web 2.0 identity providers, like Google, Apple, or Twitch, and can then perform on-chain transactions using your app.

### Install

To begin, add the [`@mysten/enoki`](https://www.npmjs.com/package/@mysten/enoki) package to your project using a package manager:

npm

pnpm

yarn

bun

```
npm install @mysten/enoki
```