import { useRuntimeConfig } from '#imports'
import { defu } from 'defu'
import { loadStripe } from '@stripe/stripe-js'
import type { StripeConstructorOptions } from '@stripe/stripe-js'

interface useClientStripeOptions {
  publishableKey?: string
  clientOptions?: StripeConstructorOptions
}

/**
 * useClientStripe function
 *
 * This function is a helper to easily access the Stripe instance provided by the Nuxt plugin.
 * It can be used in components or pages to interact with the Stripe.js library.
 *
 * @param {useClientStripeOptions} options.publishableKey - Object to override the default Stripe-js publishableKey
 * @param {useClientStripeOptions} options.clientOptions - Object to override the default Stripe-js configuration
 */

export default function useClientStripe( { publishableKey, clientOptions }: useClientStripeOptions = {} ) {
  const { public: {stripe: { publishableKey: defaultPublishableKey, clientOptions: defaultClientOptions }} } = useRuntimeConfig()

  const pKey = publishableKey ?? defaultPublishableKey
  const cOptions = defu( clientOptions, defaultClientOptions)

  if (!pKey) {
    throw new Error('Missing publishableKey option.')
  }

  return loadStripe(pKey, cOptions)
}
