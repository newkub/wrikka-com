// https://nuxt.com/docs/api/configuration/nuxt-config
import checker from "vite-plugin-checker";

export default defineNuxtConfig({
	compatibilityDate: "2026-01-08",
	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
			link: [
				{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
				{ rel: "manifest", href: "/site.webmanifest" },
			],
		},
	},
	devtools: { enabled: true },
	runtimeConfig: {
		githubToken: process.env.GITHUB_TOKEN,
		public: {
			githubUsername: process.env.GITHUB_USERNAME ?? "",
			siteUrl: process.env.SITE_URL ?? "https://wrikka.com",
		},
	},
	colorMode: {
		preference: "system",
		fallback: "light",
	},
	css: ["~/assets/css/theme.css"],
	/*
	typescript: {
		strict: true,
		typeCheck: true,
	},*/
	modules: [
		"nuxt-mcp-dev",
		"@pinia/nuxt",
		"@unocss/nuxt",
		"@vueuse/nuxt",
		"@nuxtjs/color-mode",
		"@vue-macros/nuxt",
		"@nuxt/icon",
		"@scalar/nuxt",
		"@nuxtjs/google-fonts",
		"../../packages/content/src/module",
	],
	icon: {
		serverBundle: {
			collections: ["mdi", "logos"],
		},
	},
	nitro: {
		preset: "cloudflare_module",
		cloudflare: {
			deployConfig: true,
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
		prerender: {
			crawlLinks: true,
			routes: ["/"],
		},
	},

	scalar: {
		url: "https://registry.scalar.com/@scalar/apis/galaxy?format=yaml",
	},
	googleFonts: {
		families: {
			"Noto+Sans+Thai": [400, 500, 600, 700],
		},
		display: "swap",
		preload: true,
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
