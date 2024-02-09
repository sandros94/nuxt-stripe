import { defu } from 'defu'
import Stripe from 'stripe'
import { useRuntimeConfig } from '#imports'
import { H3Event } from 'h3'

interface useStripeServerOptions {
  apiKey?: string
  serverOptions?: Stripe.StripeConfig
}

/**
 * useStripeServer is a utility function that initializes and returns a Stripe instance
 * for server-side usage in Nuxt. It ensures that only one instance of Stripe is created
 * per event context, avoiding unnecessary re-initializations.
 *
 * @param {H3Event} event - The event object passed to the Nuxt event handler
 * @param {useStripeServerOptions} options.apiKey - Object to override the default Stripe apiKey
 * @param {useStripeServerOptions} options.serverOptions - Object to override the default Stripe configuration
 * @return {Promise<Stripe>} - A Promise that resolves to the Stripe server instance for the event context
 */
export const useStripeServer = async(
    event: H3Event, {
      apiKey, serverOptions
    }: useStripeServerOptions = {}
  ): Promise<Stripe> => {
  const {
    stripe: {
      apiKey: defaultApiKey,
      serverOptions: defaultServerOptions
    }
  } = useRuntimeConfig()

  const aKey = apiKey ?? defaultApiKey
  const sOptions = defu(serverOptions, defaultServerOptions)

  if (!aKey) {
    throw new Error('Missing apiKey option.')
  }

  // Return Stripe's instance if already initialized in event context
  if ( event.context._stripe ) return event.context._stripe

  // Initialize Stripe instance
  const stripe = new Stripe(aKey, sOptions)

  // Store the initialized Stripe instance in the event context for future use
  event.context._stripe = stripe

  return event.context._stripe
}