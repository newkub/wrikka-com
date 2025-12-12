// https://nuxt.com/docs/api/configuration/nuxt-config
import checker from "vite-plugin-checker";

export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: true },
	modules: [
		"nuxt-mcp-dev",
		"@pinia/nuxt",
		"@unocss/nuxt",
		"@vueuse/nuxt",
		"@nuxtjs/color-mode",
		"@vue-macros/nuxt",
	],
	nitro: {
		preset: "cloudflare_module",
	},

	typescript: {
		typeCheck: true,
		strict: true,
	},
	vite: {
		plugins: [
			checker({
				overlay: {
					initialIsOpen: false,
				},
				typescript: true,
				vueTsc: true,
				oxlint: true,
			}),
		],
	},
});
