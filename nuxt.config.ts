// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: true },
	modules: [
		'@unocss/nuxt',
		"@vueuse/nuxt",
		["@nuxtjs/color-mode", {
			preference: 'system',
			fallback: 'light',
			classSuffix: ''
		}]
	],
	css: ["~/assets/css/global.css"],
	nitro: {
		preset: 'bun'
	},
});
