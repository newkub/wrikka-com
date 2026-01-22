import {
	defineConfig,
	presetWind4,
	transformerCompileClass,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

export default defineConfig({
	presets: [
		presetWind4({
			preflights: {
				reset: true,
				preflights: {
					theme: {
						mode: "on-demand",
					},
				},
			},
		}),
	],
	transformers: [
		transformerVariantGroup(),
		transformerDirectives(),
		transformerCompileClass(),
	],
	theme: {
		colors: {
			primary: {
				DEFAULT: "hsl(var(--color-primary))",
				hover: "hsl(var(--color-primary-hover))",
				active: "hsl(var(--color-primary-active))",
				foreground: "hsl(var(--color-primary-foreground))",
			},
			secondary: {
				DEFAULT: "hsl(var(--color-secondary))",
				hover: "hsl(var(--color-secondary-hover))",
				active: "hsl(var(--color-secondary-active))",
				foreground: "hsl(var(--color-secondary-foreground))",
			},
			success: {
				DEFAULT: "hsl(var(--color-success))",
				foreground: "hsl(var(--color-success-foreground))",
			},
			warning: {
				DEFAULT: "hsl(var(--color-warning))",
				foreground: "hsl(var(--color-warning-foreground))",
			},
			destructive: {
				DEFAULT: "hsl(var(--color-destructive))",
				hover: "hsl(var(--color-destructive-hover))",
				active: "hsl(var(--color-destructive-active))",
				foreground: "hsl(var(--color-destructive-foreground))",
			},
			background: {
				DEFAULT: "hsl(var(--color-background))",
			},
			foreground: {
				DEFAULT: "hsl(var(--color-foreground))",
			},
			surface: {
				DEFAULT: "hsl(var(--color-surface))",
				elevated: "hsl(var(--color-surface-elevated))",
				foreground: "hsl(var(--color-surface-foreground))",
			},
			muted: {
				DEFAULT: "hsl(var(--color-muted))",
				foreground: "hsl(var(--color-muted-foreground))",
			},
			accent: {
				DEFAULT: "hsl(var(--color-accent))",
				hover: "hsl(var(--color-accent-hover))",
				foreground: "hsl(var(--color-accent-foreground))",
			},
			border: {
				DEFAULT: "hsl(var(--color-border))",
				hover: "hsl(var(--color-border-hover))",
			},
			focus: {
				DEFAULT: "hsl(var(--color-focus))",
			},
			overlay: {
				DEFAULT: "hsl(var(--color-overlay))",
			},
			skeleton: {
				DEFAULT: "hsl(var(--color-skeleton))",
				shine: "hsl(var(--color-skeleton-shine))",
			},
		},
	},
});
