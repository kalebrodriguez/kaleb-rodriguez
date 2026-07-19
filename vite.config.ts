import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Project pages are served from https://kalebrodriguez.github.io/kaleb-rodriguez/
export default defineConfig({
  base: '/kaleb-rodriguez/',
  plugins: [react(), tailwindcss()],
})
