// https://nuxt.com/docs/api/configuration/nuxt-config
import checker from "vite-plugin-checker";

export default defineNuxtConfig({
	devtools: { enabled: true },
	runtimeConfig: {
		githubToken: process.env.GITHUB_TOKEN,
		public: {
			githubUsername: process.env.GITHUB_USERNAME ?? "",
		},
	},
	icon: {
		serverBundle: {
			collections: ["mdi"],
		},
	},
	modules: [
		"nuxt-mcp-dev",
		"@nuxt/icon",
		"@pinia/nuxt",
		"@unocss/nuxt",
		"@vueuse/nuxt",
		"@nuxtjs/color-mode",
		"@vue-macros/nuxt",
	],
	nitro: {
		preset: "cloudflare_module",
		cloudflare: {
			nodeCompat: true,
			wrangler: {
				routes: [
					{
						pattern: "*wrikka.com",
						custom_domain: true,
					},
				],
			},
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
