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
});
