

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    // Ensure Vite is configured to handle CSS imports
    preprocessorOptions: {
      // You can add custom configurations here if needed
    },
  },
  define: {
    global: {},
  },
});