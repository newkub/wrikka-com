// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '~/types': './types'
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@unocss/nuxt",
    "@vueuse/nuxt",
    '@nuxt/content',
    '@nuxt/content'
  ],
  css: ["@unocss/reset/tailwind-compat.css"],
  nitro: {
    preset: "cloudflare",
  },
});