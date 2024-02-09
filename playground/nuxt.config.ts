export default defineNuxtConfig({
  alias: {
    '@sandros94/nuxt-stripe': '../src/module'
  },
  modules: ['@sandros94/nuxt-stripe'],
  stripe: {
    publishableKey: 'pk_test_123',
    apiKey: 'sk_test_123'
  }
})
