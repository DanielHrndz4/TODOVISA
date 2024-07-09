import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@emotion/react/jsx-runtime']
    }
  },
  resolve: {
    alias: {
      '@': '/src',
      '@emotion/react': '@emotion/react',
      '@emotion/styled': '@emotion/styled'
    }
  },
});