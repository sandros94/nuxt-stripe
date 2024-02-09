import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => { 
  const stripe = await useStripeServer(event)
  console.info("Stripe instance:", stripe)

  return {
    message: 'Inspect your terminal to see stripe server object',
    status: 200,
    // @ts-ignore
    version: stripe.VERSION,
  }
})
