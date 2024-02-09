import { defineNuxtModule, addImportsDir, addServerImportsDir, createResolver } from '@nuxt/kit'
import defu from 'defu'
import { fileURLToPath } from 'url'
import { Stripe } from 'stripe'
import type { StripeConstructorOptions } from '@stripe/stripe-js'

export interface ModuleOptionsPublic {
  /**
   * Stripe publishable key for client side only
   * @example 'pk_test_yOipfsEBmvrjWhSJFMCMX0yf'
   * @type string | null
   * @docs https://stripe.com/docs/js/initializing
   */
  publishableKey: string | null,

  /**
   * Stripe config options for client side only
   * @docs https://stripe.com/docs/js/initializing
   */
  clientOptions?: StripeConstructorOptions,
}

export interface ModuleOptionsPrivate {
  /**
   * Stripe private key for server side only
   * @example 'pk_test_yOipfsEBmvrjWhSJFMCMX0yf'
   * @type string | null
   * @docs https://stripe.com/docs/api/authentication
   */
  apiKey: string | null,

  /**
   * Stripe config options for server side only
   * @docs https://github.com/stripe/stripe-node#configuration
   */
  serverOptions?: Stripe.StripeConfig
}

export type ModuleOptions = ModuleOptionsPublic & ModuleOptionsPrivate

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@sandros94/nuxt-stripe',
    configKey: 'stripe',
    compatibility: {
      nuxt: '^3.0.0'
    }
  },
  defaults: {
    publishableKey: '' as string,
    apiKey: '' as string,
    clientOptions: {
      apiVersion: '2022-11-15' as Stripe.LatestApiVersion
    },
    serverOptions: {
      apiVersion: '2022-11-15' as Stripe.LatestApiVersion
    }
  },
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Public runtimeConfig
    nuxt.options.runtimeConfig.public.stripe = defu<
    ModuleOptionsPublic,
    ModuleOptionsPublic[]
  >(nuxt.options.runtimeConfig.public.stripe, {
      publishableKey: options.publishableKey,
      clientOptions: options.clientOptions
    })

    // Private runtimeConfig
    nuxt.options.runtimeConfig.stripe = defu<
    ModuleOptionsPrivate,
    ModuleOptionsPrivate[]
  >(nuxt.options.runtimeConfig.stripe, {
      apiKey: options.apiKey,
      serverOptions: options.serverOptions
    })

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // Add Composables
    addImportsDir(resolve(runtimeDir, 'composables'))

    // Add Server Utils
    addServerImportsDir(resolve(runtimeDir, 'server/utils'))
  }
})

declare module '@nuxt/schema' {
  interface NuxtOptions {
    stripe?: ModuleOptions;
    runtimeConfig: {
      stripe: ModuleOptionsPrivate;
      public: {
        stripe: ModuleOptionsPublic;
      };
    };
  }
}
