import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue({
      features: {
        customElement: true,
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/webcomponent.ts'),
      name: 'OneSM',
      fileName: format => `onesm.${format}.js`,
    },
  },
  define: { 'process.env.NODE_ENV': '"production"' },
})
