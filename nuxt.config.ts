// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	//devtools: { enabled: true },
	modules: [
		"@unocss/nuxt",
		"@vueuse/nuxt",
		"@nuxtjs/google-fonts",
		[
			"@nuxtjs/color-mode",
			{
				preference: "system",
				fallback: "light",
				classSuffix: "",
			},
		],
	],
	googleFonts: {
		families: {
			"Noto Sans Thai": [300, 400, 500, 600, 700],
			Inter: [300, 400, 500, 600, 700],
			"Fira Code": [300, 400, 500, 600, 700],
		},
		display: "swap",
		preconnect: true,
		prefetch: true,
		preload: true,
	},
	css: ["~/assets/css/global.css", "@unocss/reset/tailwind-compat.css"],
	nitro: {
		preset: "cloudflare",
	},
});
