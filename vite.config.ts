import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // maplibre-gl ships its own web worker; låt Vite hantera den som en riktig
  // beroende-modul istället för att förbunta den (undviker worker-varningen i dev).
  optimizeDeps: {
    exclude: ['maplibre-gl'],
  },
})
