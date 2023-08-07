<template>
  <main>
    <h1>Nuxt - Stripe module playground</h1>
    <section>
      <h2>Stripe client</h2>
      <ClientOnly>
        <code>
          {{ stripeClient ? stripeClient : 'Loading...' }}
        </code>
      </ClientOnly>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useClientStripe } from '#imports'

const stripeClient = await useClientStripe()
</script>