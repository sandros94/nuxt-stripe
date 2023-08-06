// https://vitest.dev/guide/debugging.html#vscode to debug tests

import { describe, it, expect } from 'vitest'
import { fileURLToPath } from 'node:url'
import { setup, $fetch } from '@nuxt/test-utils'

const stripeTest = {
  publishableKey: 'pk_test_123',
  apiKey: 'sk_test_123',
  clientOptions: {
    apiVersion: '2022-11-15'
  }
}

// const stripeCustomClientTest = {
//   publishableKey: 'pk_test_456',
//   clientOptions: {
//     apiVersion: '2022-08-01'
//   }
// }

const stripeCustomServerTest = {
  apiKey: 'sk_test_456',
  serverOptions: {
    apiVersion: '2022-08-01'
  }
}

describe('ssr', async () => {
  const rootDir = fileURLToPath(new URL('../playground', import.meta.url))
  await setup({ rootDir })

  it('renders the index page', async () => {
    const html = await $fetch('/')
    expect(html).toContain('<h1>Nuxt - Stripe module playground</h1>')
  })

  it('overrides the default config exposing only public key', async () => {
    const html = await $fetch('/')

    expect(html).toContain(`publishableKey:"${stripeTest.publishableKey}"`)
    expect(html).toContain(`apiVersion:"${stripeTest.clientOptions.apiVersion}"`)
    expect(html).not.toContain(`apiKey:"${stripeTest.apiKey}"`)
  })

  /** The following test is currently disabled because of a lack for browser testing.
   * Source: https://nuxt.com/docs/getting-started/testing#testing-in-a-browser
   * Tests should be processed manually using playground.
   * 
  it('correctly overriding default useClientStripe configs', async () => {
    const html = await $fetch('/stripe-client-custom')

    expect(html).not.toContain(`publishableKey:"${stripeTest.publishableKey}"`)
    expect(html).toContain(`publishableKey:"${stripeCustomClientTest.publishableKey}"`)
    expect(html).toContain(`apiVersion:"${stripeCustomClientTest.clientOptions.apiVersion}"`)
    expect(html).not.toContain(`apiKey:"${stripeTest.apiKey}"`)
  })
   */

  it('correctly returns from server API', async () => {
    const response = await $fetch('/api/stripe', { method: 'GET' })
  
    expect(response.status).toBe(200)
    expect(response.version).toBe("12.17.0")
  })

  // this needs improvement, currently to check if the server is using the correct config
  it('correctly overriding default useServerStripe configs', async () => {

    const response = await $fetch('/api/stripe-custom', { method: 'POST', body: JSON.stringify(stripeCustomServerTest) })

    expect(response.status).toBe(200)
    expect(response.version).toBe("12.17.0")
    expect(response.body).toStrictEqual(stripeCustomServerTest)
  })

  // add propper ssr and hydration tests
  // thise requires browser testing, not available atm
  // https://nuxt.com/docs/getting-started/testing#testing-in-a-browser
})
