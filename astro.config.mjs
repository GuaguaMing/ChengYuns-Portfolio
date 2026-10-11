// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://guaguaming.github.io',
  base: '/ChengYuns-Portfolio',
  vite: {
    plugins: [tailwindcss()]
  }
});