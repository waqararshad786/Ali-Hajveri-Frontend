import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  build: {
    // Force output to ES2015 syntax so react-snap's old Chromium
    // can parse it (fixes: "SyntaxError: Unexpected token '?'")
    target: 'es2015',

    // Keep minification but via esbuild (Vite's default, safe with es2015)
    minify: 'esbuild',

    // Bump warning threshold — your main bundle is ~1.5 MB, that's fine
    chunkSizeWarningLimit: 1600,
  },
})