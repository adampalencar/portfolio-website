import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://adampalencar.netlify.app',
  image: { quality: 80 },
  integrations: [icon(), mdx(), sitemap()],
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
    {
      provider: fontProviders.fontsource(),
      name: 'Geist',
      cssVariable: '--font-display',
      weights: ['500 800'],
      subsets: ['latin', 'latin-ext'],
      styles: ['normal'],
      display: 'block',
      optimizedFallbacks: false,
      fallbacks: ['Inter', 'system-ui', 'sans-serif'],
    },
  ],
});