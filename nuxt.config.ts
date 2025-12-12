// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
				srcDir: "app/",
				compatibilityDate: "2025-05-15",
				devtools: { enabled: false },
				modules: [
								"@unocss/nuxt",
								"@vueuse/nuxt",
								"@pinia/nuxt",
								"@nuxt/content",
				],
				nitro: {
								preset: "cloudflare",
				},
				content: {
								database: {
												driver: 'fs'
								}
				},
});
