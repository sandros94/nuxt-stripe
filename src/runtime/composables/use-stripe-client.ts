import { useRuntimeConfig } from '#imports'
import { defu } from 'defu'
import { type StripeConstructorOptions, loadStripe } from '@stripe/stripe-js'

interface useStripeClientOptions {
  publishableKey?: string
  clientOptions?: StripeConstructorOptions
}

/**
 * useStripeClient function
 *
 * This function is a helper to easily access the Stripe instance provided by the Nuxt plugin.
 * It can be used in components or pages to interact with the Stripe.js library.
 *
 * @param {useStripeClientOptions} options.publishableKey - Object to override the default Stripe-js publishableKey
 * @param {useStripeClientOptions} options.clientOptions - Object to override the default Stripe-js configuration
 */

export default function useStripeClient(
    { publishableKey, clientOptions }: useStripeClientOptions = {}
  ) {
  const {
    stripe: {
      publishableKey: defaultPublishableKey,
      clientOptions: defaultClientOptions
    }
  } = useRuntimeConfig().public

  const pKey = publishableKey ?? defaultPublishableKey
  const cOptions = defu( clientOptions, defaultClientOptions)

  if (!pKey) {
    throw new Error('Missing publishableKey option.')
  }

  return loadStripe(pKey, cOptions)
}
