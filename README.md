# Nuxt module for Stripe

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

Fully featured Stripe module for Nuxt 3. Checkout [Stripe Docs](https://stripe.com/docs) for more information about how to use.

## Features

This Nuxt module provides an easy, fully typed, way to integrate Stripe in your Nuxt 3 application, both on the client-side and server-side. Respectively it utilizes the official packages of [@stripe/stripe-js](https://www.npmjs.com/package/@stripe/stripe-js) and [stripe](https://www.npmjs.com/package/stripe).

## Initial Setup

1. Add `@sandros94/nuxt-stripe` dependency to your project

```bash
# Using npm
npm install --save-dev @sandros94/nuxt-stripe

# Using yarn
yarn add --dev @sandros94/nuxt-stripe

# Using pnpm
pnpm add -D @sandros94/nuxt-stripe
```

2. Add `@sandros94/nuxt-stripe` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    '@sandros94/nuxt-stripe'
  ],
})
```

## Configuration

Stripe keys can be added and edited at runtime via environment variables...

```env
NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
NUXT_STRIPE_API_KEY="sk_live_..."
```

...or to the Nuxt configuration file like:


```ts
export default defineNuxtConfig({
  modules: [
    '@sandros94/nuxt-stripe'
  ],
  stripe: {
    // Client
    publishableKey: 'pk_test_123', // required
    clientOptions: {
      apiVersion: '2022-11-15', // optional, default is '2022-11-15'
      /** other stripe-js options */
    }
    // Server
    apiKey: 'sk_test_123', // required
    serverOptions: {
      apiVersion: '2022-11-15', // optional, default is '2022-11-15'
      /** other stripe options */
    }
  }
})
```

For all available `serverOptions` options take a look at the [official repo README](https://github.com/stripe/stripe-node#configuration). While for the `clientOptions` options take a look at the [official docs](https://stripe.com/docs/js/initializing#init_stripe_js-options).

> We highly recommend you put your **production** keys in your `.env` file to avoid committing them

### Client-side usage

For client-side usage you can use the `useClientStripe` function to get a `stripe-js` instance.
This composable is a wrap around the [`loadStripe`](https://github.com/stripe/stripe-js#loadstripe) and can be used in pages or plugins. Remember to wrap `useClientStripe()` in a `ClientOnly` built-in composable or use it in a client-only composable like `Checkout.client.vue`

#### Example
```vue
<template>
  <div>
    <h1>Nuxt Stripe instance</h1>
    <ClientOnly>
      {{ stripe ? stripe : 'Loading...'}}
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// Call the composable to get the Stripe instance
const stripe = await useClientStripe()

// Use the Stripe instance to interact with the stripe.js library
// stripe.redirectToCheckout(...)
</script>
```

### Server-side usage

For server-side usage you can use the `useServerStripe` function to create a `stripe` instance.
This instance should be used server-side to interact with the Stripe API.

#### Example
```ts
import { defineEventHandler } from 'h3'
import { useServerStripe } from '#stripe/server'

export default defineEventHandler(async (event) => {
  const stripe = await useServerStripe(event)
  console.info("Stripe instance:", stripe)

  return {
    version: stripe.VERSION
  }
})
```

## Contribution

Clone this repository and then:

```bash
# Install dependencies
pnpm install

# Generate type stubs
pnpm run dev:prepare

# Develop with the playground
pnpm run dev

# Build the playground
pnpm run dev:build

# Run ESLint
pnpm run lint

# Run Vitest
pnpm run test

# Release new version
pnpm run release
```

## Notes

This module was originally a fork of [fuentesloic/nuxt-stripe](https://github.com/fuentesloic/nuxt-stripe) and it was ment for Nuxt 3 only, if you are looking for a Nuxt 2 version take a look at the original work [WilliamDASILVA/nuxt-stripe](https://github.com/WilliamDASILVA/nuxt-stripe-module).

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@sandros94/nuxt-stripe/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/@sandros94/nuxt-stripe

[npm-downloads-src]: https://img.shields.io/npm/dm/@sandros94/nuxt-stripe.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/@sandros94/nuxt-stripe

[license-src]: https://img.shields.io/npm/l/@sandros94/nuxt-stripe.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/@sandros94/nuxt-stripe

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
