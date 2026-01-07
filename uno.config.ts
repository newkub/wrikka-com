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
			darkMode: "class",
			preflights: {
				reset: true,
			},
		}),
	],
	transformers: [transformerVariantGroup(), transformerDirectives(), transformerCompileClass()],
	theme: {
		breakpoints: {
			"sm": "640px",
			"md": "768px",
			"lg": "1024px",
			"xl": "1280px",
			"2xl": "1536px",
		},
		fontFamily: {
			sans: ["\"Noto Sans Thai\"", "sans-serif"],
		},
		colors: {
			// Main theme colors
			primary: {
				DEFAULT: "#1f2937",
				light: "#1f2937",
				dark: "#f8fafc",
			},
			secondary: {
				DEFAULT: "#6b7280",
				light: "#6b7280",
				dark: "#cbd5e1",
			},
			accent: {
				DEFAULT: "#3b82f6",
				light: "#3b82f6",
				dark: "#60a5fa",
			},
			surface: {
				DEFAULT: "#ffffff",
				light: "#ffffff",
				dark: "#1e293b",
				100: {
					DEFAULT: "#f1f5f9",
					light: "#f1f5f9",
					dark: "#1e293b",
				},
				200: {
					DEFAULT: "#e2e8f0",
					light: "#e2e8f0",
					dark: "#334155",
				},
				700: {
					DEFAULT: "#334155",
					light: "#334155",
					dark: "#64748b",
				},
				800: {
					DEFAULT: "#1e293b",
					light: "#1e293b",
					dark: "#475569",
				},
			},
			card: {
				DEFAULT: "#ffffff",
				light: "#ffffff",
				dark: "#1e293b",
			},
			// Menu colors
			menu: {
				learn: "#10b981", // emerald-500
				blog: "#f59e0b", // amber-500
				project: "#8b5cf6", // violet-500
			},
			// Tech stack colors
			tech: {
				vue: "#42b883",
				nuxt: "#00dc82",
				typescript: "#3178c6",
				nodejs: "#68a063",
				python: "#f9c43d",
				database: "#336791",
			},
			// Social media colors
			social: {
				github: {
					DEFAULT: "#334155",
					dark: "#cbd5e1",
				},
				twitter: "#1da1f2",
				linkedin: "#0a66c2",
			},
			// Project status colors
			status: {
				completed: "#22c55e", // green-500
				inProgress: "#3b82f6", // blue-500
				planning: "#f97316", // orange-500
			},
		},
	},
});
