<template>
  <main>
    <h1>Nuxt - Stripe module playground</h1>
    <section>
      <h2>Stripe client</h2>
      <code>
        {{ stripeClient ? stripeClient : 'Loading...' }}
      </code>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useClientStripe } from '#imports'

const stripeOptions = {
  publishableKey: 'pk_test_456',
  clientOptions: {
    apiVersion: '2022-08-01'
  }
}

const stripeClient = await useClientStripe(stripeOptions)
</script>