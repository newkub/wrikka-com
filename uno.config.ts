import {
	defineConfig,
	presetIcons,
	presetWind4,
	presetTypography,
	presetWebFonts,
	transformerVariantGroup,
	transformerDirectives,
} from "unocss";
import { createLocalFontProcessor } from "@unocss/preset-web-fonts/local";

export default defineConfig({
	presets: [
		presetWind4(),
		presetIcons({
			collections: {
				mdi: () =>
					import("@iconify-json/mdi/icons.json").then((i) => i.default),
			}
		}),
		presetTypography(),
		presetWebFonts({
			provider: "none",
			fonts: {
				sans: ["Noto Sans Thai", "sans-serif"],
				mono: "Fira Code",
			},
			processors: createLocalFontProcessor({
				cacheDir: "node_modules/.cache/unocss/fonts",
				fontAssetsDir: "public/assets/fonts",
				fontServeBaseUrl: "/assets/fonts",
			}),
		}),
	],
	transformers: [transformerVariantGroup(), transformerDirectives()],
});
