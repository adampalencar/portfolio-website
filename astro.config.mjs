import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://adampalencar.netlify.app',
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Inter',
      cssVariable: '--font-inter',
      weights: ['100 900'],
      styles: ['normal'],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-jetbrains-mono',
      weights: ['100 800'],
      styles: ['normal'],
      fallbacks: ['Courier New', 'monospace'],
    },
  ],
});
