import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    chunkSizeWarningLimit: 1500 // default is 500 KB
  }
});
