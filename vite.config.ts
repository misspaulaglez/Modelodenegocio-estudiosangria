import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// BASE_PATH lo define GitHub Pages (p. ej. /estudio-sangria/). En local vale "/".
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  test: { environment: 'jsdom' },
})
