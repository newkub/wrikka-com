import {
	defineConfig,
	presetIcons,
	presetMini,
	presetTypography,
	presetWebFonts,
	transformerVariantGroup,
	transformerDirectives,
} from "unocss";
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local';

export default defineConfig({
	presets: [
		presetMini({
			dark: "class",
			cssVariables: true,
		}),
		presetIcons({
			collections: {
				mdi: () =>
					import("@iconify-json/mdi/icons.json").then((i) => i.default),
			},
		}),
		presetTypography(),
		presetWebFonts({
			provider: 'none',
			fonts: {
				sans: ['Noto Sans Thai', 'sans-serif'],
				mono: "Fira Code",
			},
			processors: createLocalFontProcessor({
				cacheDir: 'node_modules/.cache/unocss/fonts',
				fontAssetsDir: 'public/assets/fonts',
				fontServeBaseUrl: '/assets/fonts'
			})
		}),
	],
	transformers: [transformerVariantGroup(), transformerDirectives()],
	theme: {
		colors: {
			primary: "var(--color-primary)",
			secondary: "var(--color-secondary)",
			background: "var(--color-background)",
			"background-block": "var(--color-background-block)",
			text: "var(--color-text)",
			"text-secondary": "var(--color-text-secondary)",
			blue: "var(--color-blue)",
			error: "var(--color-error)",
			success: "var(--color-success)",
			warning: "var(--color-warning)",
		},
		borderRadius: {
			sm: "var(--rounded-sm)",
			DEFAULT: "var(--rounded)",
			lg: "var(--rounded-lg)",
		},
		spacing: {
			sm: "var(--spacing-sm)",
			DEFAULT: "var(--spacing)",
			lg: "var(--spacing-lg)",
		},
	},
	shortcuts: [
		["btn", "px-4 py-2 rounded font-medium"],
		["btn-primary", "bg-primary text-white hover:bg-primary-600"],
		["btn-secondary", "bg-secondary text-white hover:bg-secondary-600"],
		["card", "bg-background-block rounded-lg shadow p-4"],
	],
});
