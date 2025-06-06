import { defineConfig, presetIcons, presetMini, transformerVariantGroup } from "unocss";

export default defineConfig({
    presets: [
        presetMini(),
        presetIcons({
            collections: {
                mdi: () => import("@iconify-json/mdi/icons.json").then((i) => i.default),
            },
        }),
    ],
    transformers: [transformerVariantGroup()],
    theme: {

    },
});
