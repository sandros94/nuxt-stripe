import { defu } from 'defu'
import { useRuntimeConfig } from '#imports'
import { loadStripe } from '@stripe/stripe-js'
import type { Stripe, StripeConstructorOptions } from '@stripe/stripe-js'

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

export default async function useClientStripe( { publishableKey, clientOptions }: useClientStripeOptions = {} ) {
  const { public: {stripe: { publishableKey: defaultPublishableKey, clientOptions: defaultClientOptions }} } = useRuntimeConfig()

  const stripe = useState<Stripe>('stripe-client', () => null)
  const isLoading = useState('stripe-client-loading', () => false)

  const pKey = publishableKey ?? defaultPublishableKey
  const cOptions = defu( clientOptions, defaultClientOptions)

  if (!pKey) {
    throw new Error('Missing publishableKey option.')
  }

  async function _loadStripe() {
    if (stripe.value){
      return stripe.value
    }
  
    isLoading.value = true
  
    return await loadStripe(pKey, cOptions)
  }

  onMounted(async () => {
    if (!isLoading.value) {
      const _stripe = await _loadStripe()
      stripe.value = _stripe
      isLoading.value = false
    }
  })

  return stripe 
}
