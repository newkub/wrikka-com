// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-05-15",
	devtools: { enabled: true },
	modules: ["@unocss/nuxt", "@vueuse/nuxt"],
	unocss: {
		// ตั้งค่า UnoCSS
		configFile: "./uno.config.ts",
	},
	css: ["@unocss/reset/tailwind.css", "~/assets/css/global.css"],
});
