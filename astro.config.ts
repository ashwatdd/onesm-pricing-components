import { fileURLToPath, URL } from 'node:url'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  site: 'https://onesm.ashwatdd.com',

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },

  integrations: [vue()],

  experimental: {
    fonts: [{
      provider: fontProviders.google(),
      name: 'Lexend',
      cssVariable: '--font-lexend',
    }, {
      provider: fontProviders.google(),
      name: 'DM Sans',
      cssVariable: '--font-secondary',
    }],
  },
})
