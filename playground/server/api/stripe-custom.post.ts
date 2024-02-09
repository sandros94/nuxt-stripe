import { defineEventHandler } from 'h3'
import type { Stripe } from 'stripe'

export default defineEventHandler(async (event) => {

  // read body of request
  const body: {
    apiKey: string
    serverOptions: Stripe.StripeConfig
  } = await readBody(event)

  const stripe = await useStripeServer(event, body )
  console.info("Stripe instance:", stripe)

  return {
    message: 'Inspect your terminal to see stripe server object',
    status: 200,
    // @ts-ignore
    version: stripe.VERSION,
    body
  }
})
