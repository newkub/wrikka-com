import {
	defineConfig,
	presetWind4,
	presetIcons,
	presetTypography,
	transformerVariantGroup,
	transformerDirectives,
} from "unocss";

export default defineConfig({
	presets: [
		presetWind4(),
		presetIcons({
			collections: {
				mdi: () =>
					import("@iconify-json/mdi/icons.json").then((i) => i.default),
			},
		}),
		presetTypography(),
	],
	transformers: [transformerVariantGroup(), transformerDirectives()],
	theme: {

		colors: {
			// Main theme colors
			primary: {
				DEFAULT: '#1f2937',
				light: '#1f2937',
				dark: '#f8fafc',
			},
			secondary: {
				DEFAULT: '#6b7280',
				light: '#6b7280',
				dark: '#cbd5e1',
			},
			accent: {
				DEFAULT: '#3b82f6',
				light: '#3b82f6',
				dark: '#60a5fa',
			},
			surface: {
				DEFAULT: '#ffffff',
				light: '#ffffff',
				dark: '#0f172a',
				100: {
					DEFAULT: '#f1f5f9',
					light: '#f1f5f9',
					dark: '#1e293b',
				},
				200: {
					DEFAULT: '#e2e8f0',
					light: '#e2e8f0',
					dark: '#334155',
				},
				700: {
					DEFAULT: '#334155',
					light: '#334155',
					dark: '#64748b',
				},
				800: {
					DEFAULT: '#1e293b',
					light: '#1e293b',
					dark: '#475569',
				}
			},
			card: {
				DEFAULT: '#ffffff',
				light: '#ffffff',
				dark: '#1e293b',
			},
			// Menu colors
			menu: {
				learn: '#10b981', // emerald-500
				blog: '#f59e0b', // amber-500  
				project: '#8b5cf6', // violet-500
			}
		}
	}
});
