import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Keep the production bundle portable so dist/index.html can be opened
  // from a local folder as well as served from a static host.
  base: './',
  plugins: [react()],
})
