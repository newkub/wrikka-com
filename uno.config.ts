import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    breakpoints: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    colors: {
      navbar: {
        bg: {
          light: '#ffffff',
          dark: '#1e1e2e',
        },
        text: {
          light: '#333333',
          dark: '#f8f8f2',
        },
      },
      content: {
        bg: {
          light: '#f8f9fa',
          dark: '#282a36',
        },
        text: {
          light: '#333333',
          dark: '#f8f8f2',
        },
        heading: {
          light: '#1a73e8',
          dark: '#8be9fd',
        },
      },
    },
  },
})