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
	],
	icon: {
		serverBundle: {
			collections: ["mdi", "logos"],
		},
	},
	routeRules: {
		// Static pages - prerender at build time
		"/": { prerender: true },
		"/projects": { prerender: true },
		"/contact": { prerender: true },
		"/facebook": { prerender: true },
		"/youtube": { prerender: true },
		"/x": { prerender: true },

		// Blog routes - ISR with different revalidation times
		"/blog": { isr: 3600 }, // Blog listing - revalidate every 1 hour
		"/blog/**": { isr: 7200 }, // Individual blog posts - revalidate every 2 hours

		// API routes - cache with CORS
		"/api/github/**": {
			cors: true,
			cache: {
				maxAge: 60 * 5, // 5 minutes
			},
		},
		"/api/facebook/**": {
			cors: true,
			cache: {
				maxAge: 60 * 10, // 10 minutes
			},
		},
		"/api/contact": {
			cors: true,
		},

		// Static assets - long-term caching
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
		"/robots.txt": {
			headers: {
				"cache-control": "public, max-age=3600",
			},
		},
		"/.well-known/**": {
			headers: {
				"cache-control": "public, max-age=3600",
			},
		},
		"/sitemap.xml": {
			headers: {
				"cache-control": "public, max-age=3600",
			},
		},

		// Global headers for all routes
		"/**": {
			headers: {
				"X-Content-Type-Options": "nosniff",
				"X-Frame-Options": "SAMEORIGIN",
				"Referrer-Policy": "strict-origin-when-cross-origin",
				"Permissions-Policy": "camera=(), microphone=(), geolocation=()",
			},
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
