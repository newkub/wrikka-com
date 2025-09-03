import {
	defineConfig,
	presetIcons,
	presetWind4,
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
	rules: [
		// Line clamp utilities
		['line-clamp-1', { 'display': '-webkit-box', '-webkit-line-clamp': '1', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }],
		['line-clamp-2', { 'display': '-webkit-box', '-webkit-line-clamp': '2', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }],
		['line-clamp-3', { 'display': '-webkit-box', '-webkit-line-clamp': '3', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }],
		['line-clamp-4', { 'display': '-webkit-box', '-webkit-line-clamp': '4', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }],
		['line-clamp-5', { 'display': '-webkit-box', '-webkit-line-clamp': '5', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }],
		['line-clamp-6', { 'display': '-webkit-box', '-webkit-line-clamp': '6', '-webkit-box-orient': 'vertical', 'overflow': 'hidden' }],
		['line-clamp-none', { 'display': 'block', '-webkit-line-clamp': 'unset', '-webkit-box-orient': 'unset', 'overflow': 'visible' }],
	],
	theme: {
		colors: {
			// Brand Colors
			primary: {
				DEFAULT: 'var(--color-primary)',
				light: 'var(--color-primary-light)',
				dark: 'var(--color-primary-dark)',
			},
			secondary: {
				DEFAULT: 'var(--color-secondary)',
				light: 'var(--color-secondary-light)',
				dark: 'var(--color-secondary-dark)',
			},
			accent: {
				DEFAULT: 'var(--color-accent)',
				light: 'var(--color-accent-light)',
				dark: 'var(--color-accent-dark)',
			},
			// Background Colors
			background: {
				DEFAULT: 'var(--color-background)',
				secondary: 'var(--color-background-secondary)',
				tertiary: 'var(--color-background-tertiary)',
			},
			surface: {
				DEFAULT: 'var(--color-surface)',
				elevated: 'var(--color-surface-elevated)',
			},
			// Text Colors
			text: {
				DEFAULT: 'var(--color-text)',
				secondary: 'var(--color-text-secondary)',
				tertiary: 'var(--color-text-tertiary)',
				muted: 'var(--color-text-muted)',
				inverse: 'var(--color-text-inverse)',
			},
			// Border Colors
			border: {
				DEFAULT: 'var(--color-border)',
				light: 'var(--color-border-light)',
			},
			divider: 'var(--color-divider)',
			// Status Colors
			error: {
				DEFAULT: 'var(--color-error)',
				light: 'var(--color-error-light)',
				dark: 'var(--color-error-dark)',
			},
			success: {
				DEFAULT: 'var(--color-success)',
				light: 'var(--color-success-light)',
				dark: 'var(--color-success-dark)',
			},
			warning: {
				DEFAULT: 'var(--color-warning)',
				light: 'var(--color-warning-light)',
				dark: 'var(--color-warning-dark)',
			},
			info: {
				DEFAULT: 'var(--color-info)',
				light: 'var(--color-info-light)',
				dark: 'var(--color-info-dark)',
			},
		},
		spacing: {
			xs: 'var(--spacing-xs)',
			sm: 'var(--spacing-sm)',
			DEFAULT: 'var(--spacing)',
			md: 'var(--spacing-md)',
			lg: 'var(--spacing-lg)',
			xl: 'var(--spacing-xl)',
			'2xl': 'var(--spacing-2xl)',
			'3xl': 'var(--spacing-3xl)',
		},
		borderRadius: {
			xs: 'var(--rounded-xs)',
			sm: 'var(--rounded-sm)',
			DEFAULT: 'var(--rounded)',
			md: 'var(--rounded-md)',
			lg: 'var(--rounded-lg)',
			xl: 'var(--rounded-xl)',
			'2xl': 'var(--rounded-2xl)',
			full: 'var(--rounded-full)',
		},
		boxShadow: {
			sm: 'var(--shadow-sm)',
			DEFAULT: 'var(--shadow)',
			md: 'var(--shadow-md)',
			lg: 'var(--shadow-lg)',
			xl: 'var(--shadow-xl)',
		},
		fontFamily: {
			sans: 'var(--font-family-sans)',
			mono: 'var(--font-family-mono)',
		},
		fontSize: {
			xs: 'var(--font-size-xs)',
			sm: 'var(--font-size-sm)',
			base: 'var(--font-size-base)',
			lg: 'var(--font-size-lg)',
			xl: 'var(--font-size-xl)',
			'2xl': 'var(--font-size-2xl)',
			'3xl': 'var(--font-size-3xl)',
			'4xl': 'var(--font-size-4xl)',
		},
		lineHeight: {
			tight: 'var(--line-height-tight)',
			normal: 'var(--line-height-normal)',
			relaxed: 'var(--line-height-relaxed)',
		},
		transitionDuration: {
			fast: 'var(--transition-fast)',
			DEFAULT: 'var(--transition-normal)',
			slow: 'var(--transition-slow)',
		},
	},
});
