// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: true },
	modules: [
		"@unocss/nuxt",
		"@vueuse/nuxt",
		"@pinia/nuxt",
		"@nuxt/content",
	],
	typescript: {
		strict: true,
		typeCheck: true,
	},
	nitro: {
		preset: "cloudflare_module",
	},
});
