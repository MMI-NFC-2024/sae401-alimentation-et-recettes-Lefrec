// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  security: {
    checkOrigin: false
  },

  output: 'server',

  adapter: node({
    mode: 'standalone'
  })
});