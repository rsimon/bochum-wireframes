import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  base: '',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    chunkSizeWarningLimit: 1024,
    rollupOptions: {
      output: {
        manualChunks: {
          'dep-annotorious': ['@annotorious/react'],
          'dep-recogito': ['@recogito/react-text-annotator']
        }
      }
    }
  }
});