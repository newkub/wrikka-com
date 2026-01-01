// https://nuxt.com/docs/api/configuration/nuxt-config
import checker from "vite-plugin-checker";

export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
		},
	},
	devtools: { enabled: true },
	runtimeConfig: {
		githubToken: process.env.GITHUB_TOKEN,
		public: {
			githubUsername: process.env.GITHUB_USERNAME ?? "",
		},
	},
	modules: [
		"nuxt-mcp-dev",
		"@pinia/nuxt",
		"@unocss/nuxt",
		"@vueuse/nuxt",
		"@nuxtjs/color-mode",
		"@vue-macros/nuxt",
	],
	routeRules: {
		"/": { prerender: true },
		"/blog/**": { isr: 3600 }, // Stale-while-revalidate for 1 hour
		"/api/**": { cors: true },
	},
	nitro: {
		prerender: {
			crawlLinks: true,
			routes: ["/"],
		},
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
