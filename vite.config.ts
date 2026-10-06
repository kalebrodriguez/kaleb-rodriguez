import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Project pages are served from https://kalebrodriguez.github.io/kaleb-rodriguez/
// options.html, notebook.html and magazine.html are design options under review.
export default defineConfig({
  base: '/kaleb-rodriguez/',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        options: resolve(__dirname, 'options.html'),
        notebook: resolve(__dirname, 'notebook.html'),
        magazine: resolve(__dirname, 'magazine.html'),
      },
    },
  },
})
