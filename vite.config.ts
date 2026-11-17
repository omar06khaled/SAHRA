import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { sahraPacks } from './scripts/packsPlugin.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sahraPacks()],
})
