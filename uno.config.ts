import {
  defineConfig,
  presetUno,
  presetAttributify,
  presetIcons,
  transformerAttributifyJsx,
  presetWebFonts,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetWebFonts(),
    presetTypography(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
        // ...
      },
    }),
  ],
  transformers: [
    transformerAttributifyJsx(),
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
