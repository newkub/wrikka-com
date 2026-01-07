// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
	css: ["~/assets/css/responsive.css"],
	app: {
		head: {
			htmlAttrs: {
				lang: "en",
			},
			link: [
				{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
				{ rel: "manifest", href: "/site.webmanifest" },
				{ rel: "preconnect", href: "https://fonts.googleapis.com" },
				{ rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
				{
					href: "https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;700&display=swap",
					rel: "stylesheet",
				},
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
	alias: {
		"~/shared": "./shared",
	},
	typescript: {
		strict: true,
		typeCheck: true,
	},
	modules: [
		"nuxt-mcp-dev",
		"@pinia/nuxt",
		"@unocss/nuxt",
		"@vueuse/nuxt",
		"@nuxtjs/color-mode",
		"@vue-macros/nuxt",
		"@nuxt/icon",
		"@scalar/nuxt",
	],
	icon: {
		serverBundle: {
			collections: ["mdi", "carbon"],
		},
	},
	routeRules: {
		"/": { prerender: true },
		"/blog/**": { isr: 3600 }, // Stale-while-revalidate for 1 hour
		"/api/**": { cors: true },
		"/_nuxt/**": {
			headers: {
				"cache-control": "public, max-age=31536000, immutable",
			},
		},
		"/favicon.ico": {
			headers: {
				"cache-control": "public, max-age=31536000, immutable",
			},
		},
		"/site.webmanifest": {
			headers: {
				"cache-control": "public, max-age=86400",
			},
		},
		"/sitemap.xml": {
			headers: {
				"cache-control": "public, max-age=3600",
			},
		},
	},
	nitro: {
		prerender: {
			crawlLinks: true,
			routes: ["/"],
		},
	},

	vite: {
		/*
		plugins: [
			checker({
				overlay: {
					initialIsOpen: false,
				},
				typescript: true,
				vueTsc: true,
				oxlint: true,
			}),
		],*/
	},
});
